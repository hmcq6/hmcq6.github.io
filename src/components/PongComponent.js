import React, { Component } from "react";

export default class PongComponent extends Component {
  render() {
    return (
        <canvas
          id="PongCanvas"
          onClick={(e) => this.handleClick(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
          onKeyUp={(e) => this.handleKeyUp(e)}
          height={this.state.canvasHeight}
          width={this.state.canvasWidth}
          tabIndex="1"
        ></canvas>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: props.width,
      canvasHeight: props.height
    };
  }

  handleKeyDown({ keyCode }) {
    switch (keyCode) {
      case 38:
      case 87:
        this.state.keysPressed.add(Symbol.for("up"));
        break;
      case 40:
      case 83:
        this.state.keysPressed.add(Symbol.for("down"));
        break;
    }
  }
  handleKeyUp({ keyCode }) {
    switch (keyCode) {
      case 38:
      case 87:
        this.state.keysPressed.delete(Symbol.for("up"));
        break;
      case 40:
      case 83:
        this.state.keysPressed.delete(Symbol.for("down"));
        break;
    }
  }

  componentDidMount() {
    const canvas = document.getElementById("PongCanvas");
    const ctx = canvas.getContext("2d");

    //const width = (canvas.width = window.innerWidth);
    //const height = (canvas.height = window.innerHeight);
    if (!this.state.canvasWidth) canvas.width = canvas.parentElement.clientWidth;
    if (!this.state.canvasHeight) canvas.height = canvas.parentElement.clientHeight;
    const width = canvas.width;
    const height = canvas.height;

    const ballX = Math.floor(Math.random() * (width / 2) + width / 4);
    const ballY = Math.floor(Math.random() * (height / 2) + height / 4);

    const dirLR = ballX < width / 2 ? Symbol.for("right") : Symbol.for("left");
    const dirUD = ballX < width / 2 ? Symbol.for("right") : Symbol.for("left");

    this.setState({
      canvas,
      ctx,
      width,
      height,
      player1Y: 20,
      player2Y: 20,
      ballX,
      ballY,
      dirLR,
      dirUD,
      player1Score: 0,
      player2Score: 0,
      keysPressed: new Set()
    });

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    this.drawPaddles(ctx, width, 20, 20);

    setTimeout(() => {
      this.setState({
        raf: window.requestAnimationFrame(this.step.bind(this))
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.raf);
  }

  calculate(
    keysPressed = this.state.keysPressed,
    width = this.state.width,
    height = this.state.height,
    player1Y = this.state.player1Y,
    player2Y = this.state.player2Y,
    ballX = this.state.ballX,
    ballY = this.state.ballY,
    dirLR = this.state.dirLR,
    dirUD = this.state.dirUD
  ) {
    // Move Player 1 paddle
    if (keysPressed.has(Symbol.for("up"))) {
      this.setState({ player1Y: player1Y - 10, player2Y: player1Y - 10 });
    } else if (keysPressed.has(Symbol.for("down"))) {
      this.setState({ player1Y: player1Y + 10, player2Y: player1Y + 10 });
    }

    // Move ball in direction it is going
    if (dirLR === Symbol.for("right")) {
      this.setState({ ballX: ballX + 5 });
    } else {
      this.setState({ ballX: ballX - 5 });
    }
    if (dirUD === Symbol.for("up")) {
      this.setState({ ballY: ballY + 5 });
    } else {
      this.setState({ ballY: ballY - 5 });
    }

    // Ball hits ceiling
    if (ballY < 0) {
      this.setState({ dirUD: Symbol.for("up") });
    }
    // Ball hits floor
    if (ballY > height) {
      this.setState({ dirUD: Symbol.for("down") });
    }

    // Ball connects with Player 1 paddle
    if (ballX < 30 && ballX > 10 && ballY > player1Y && ballY < player1Y + 50) {
      this.setState({ dirLR: Symbol.for("right") });
    }
    // Ball connects with Player 2 paddle
    if (
      ballX > width - 30 &&
      ballX < width - 10 &&
      ballY > player2Y &&
      ballY < player2Y + 50
    ) {
      this.setState({ dirLR: Symbol.for("left") });
    }

    if (ballX < 0) {
      this.playerScored(2);
      //player 2 score
    }
    if (ballX > width) {
      //player 1 score
      this.playerScored(1);
    }

    this.clear();
    this.drawPaddles();
    this.drawBall();
    this.printScore();
  }

  printScore(
    ctx = this.state.ctx,
    player1Score = this.state.player1Score,
    player2Score = this.state.player2Score,
    width = this.state.width
  ) {
    ctx.fillStyle = "white";
    ctx.font = "26 Arial";
    ctx.fillText(`Player 1: ${player1Score}`, width / 2 + 40, 20);
    ctx.fillStyle = "red";
    ctx.fillText(`Player 2: ${player2Score}`, width / 2 + 100, 20);
    ctx.fillStyle = "black";
  }

  playerScored(
    playerNumber,
    width = this.state.width,
    height = this.state.height
  ) {
    const ballX = Math.floor(Math.random() * (width / 2) + width / 4);
    const ballY = Math.floor(Math.random() * (height / 2) + height / 4);

    const dirLR = ballX < width / 2 ? Symbol.for("right") : Symbol.for("left");
    const dirUD = ballX < width / 2 ? Symbol.for("right") : Symbol.for("left");

    this.setState({
      ballX,
      ballY,
      dirLR,
      dirUD,
      [`player${playerNumber}Score`]:
        this.state[`player${playerNumber}Score`] + 1
    });
  }

  step(timestamp) {
    if (this.state.start === undefined) this.setState({ start: timestamp });
    const elapsed = timestamp - this.state.start;
    window.requestAnimationFrame(this.step.bind(this));

    if (elapsed > 60) {
      this.calculate();
      this.setState({ start: timestamp });
    }
  }

  clear(
    ctx = this.state.ctx,
    width = this.state.width,
    height = this.state.height
  ) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";

    ctx.fillRect(Math.floor(width / 2), 0, 10, height);
  }

  drawBall() {
    this.state.ctx.fillStyle = "white";
    this.state.ctx.fillRect(this.state.ballX, this.state.ballY, 10, 10);
    this.state.ctx.fillStyle = "black";
  }

  drawPaddles(
    ctx = this.state.ctx,
    width = this.state.width,
    player1Y = this.state.player1Y,
    player2Y = this.state.player2Y
  ) {
    ctx.fillStyle = "white";
    ctx.fillRect(10, player1Y, 20, 50);
    ctx.fillRect(width - 30, player2Y, 20, 50);
    ctx.fillStyle = "black";
  }

  handleClick(e) {
    this.drawPaddles();
  }
}
