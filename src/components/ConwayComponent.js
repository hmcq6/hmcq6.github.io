import React, { Component } from "react";

const PixelWidth = 15;
const PixelHeight = 15;

const NameMask = [
  [
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true
  ],
  [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true
  ],
  [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true
  ],
  [
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true
  ],
  [
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true
  ]
];

export default class GameOfLife extends Component {
  render() {
    return (
      <div width="100%" height="100%">
        <canvas id="GameOfLife" onClick={(e) => this.handleClick(e)}></canvas>
      </div>
    );
  }

  componentDidMount() {
    const canvas = document.getElementById("GameOfLife");
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const pixelsHeigh = Math.max(Math.floor(height / PixelHeight), 10);
    const pixelsWide = Math.max(Math.floor(width / PixelWidth), 100);

    const dataRow = Array(pixelsHeigh).fill(false);
    const matrix = [...Array(pixelsWide)].map(() => Array.from(dataRow));

    const midHeight = Math.floor(pixelsHeigh / 2);
    const midWidth = Math.floor(pixelsWide / 2);

    for (let j = 0; j < NameMask.length; j++) {
      for (let i = 0; i < NameMask[0].length; i++) {
        matrix[i + Math.floor(midWidth / 2)][j + midHeight] = NameMask[j][i];
      }
    }

    this.setState({
      canvas,
      ctx,
      matrix,
      width,
      height
    });

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#02e03d";

    this.drawMatrix(ctx, matrix, width, height);
    setTimeout(() => {
      this.setState({
        raf: window.requestAnimationFrame(this.step.bind(this))
      });
    }, 2000);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.raf);
  }

  drawMatrix(ctx, matrix, width, height) {
    for (let i = 0; i < Math.floor(width / PixelWidth); i++) {
      for (let j = 0; j < Math.floor(height / PixelHeight); j++) {
        if (matrix[i][j] === true) {
          ctx.fillRect(
            i * PixelWidth,
            j * PixelHeight,
            PixelWidth - 1,
            PixelHeight - 1
          );
        }
      }
    }
  }

  calculate() {
    const matrix = this.state.matrix.map((row) => Array.from(row));

    for (let i = 0; i < Math.floor(this.state.width / PixelWidth); i++) {
      for (let j = 0; j < Math.floor(this.state.height / PixelHeight); j++) {
        const neighbors = [
          matrix[i - 1]?.[j],
          matrix[i + 1]?.[j],
          matrix[i][j - 1],
          matrix[i][j + 1],
          matrix[i - 1]?.[j - 1],
          matrix[i - 1]?.[j + 1],
          matrix[i + 1]?.[j + 1],
          matrix[i + 1]?.[j - 1]
        ];
        const liveNeighborCount = neighbors.filter((val) => {
          return val;
        }).length;
        if (
          this.state.matrix[i][j] &&
          (liveNeighborCount == 2 || liveNeighborCount == 3)
        ) {
        } else {
          this.state.matrix[i][j] = liveNeighborCount == 3;
        }
      }
    }
    this.clear();
    this.drawMatrix(
      this.state.ctx,
      this.state.matrix,
      this.state.width,
      this.state.height
    );
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

  clear() {
    this.state.ctx.fillStyle = "black";
    this.state.ctx.fillRect(0, 0, this.state.width, this.state.height);
    this.state.ctx.fillStyle = "#02e03d";
  }

  handleClick({ pageX, pageY }) {
    const pixelX = Math.ceil(pageX / PixelWidth) - 1;
    const pixelY = Math.ceil(pageY / PixelHeight) - 1;
    const matrix = this.state.matrix;
    matrix[pixelX][pixelY] = !matrix[pixelX][pixelY];

    this.clear();
    this.drawMatrix(
      this.state.ctx,
      matrix,
      this.state.width,
      this.state.height
    );
  }
}
