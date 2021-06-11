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
      <canvas
        ref={this.c}
        id={this.state.id}
        height={this.state.canvasHeight}
        width={this.state.canvasWidth}
        onClick={(e) => this.handleClick(e)}>
      </canvas>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      canvasHeight: props.height,
      canvasWidth: props.width,
      backgroundColor: props.backgroundColor || 'black'
    }
    this.c = React.createRef();
  }

  componentDidMount() {
    const canvas = this.c.current;
    if (!this.state.canvasWidth) canvas.width = canvas.parentElement.offsetWidth;
    if (!this.state.canvasHeight) canvas.height = canvas.parentElement.offsetHeight;
    //canvas.width = this.state.canvasWidth
    //canvas.height = this.state.canvasHeight
    const ctx = canvas.getContext("2d");

    const width = (canvas.width );
    const height = (canvas.height );

    const pixelsHigh = Math.max(Math.floor(height / PixelHeight), 5);
    const pixelsWide = Math.max(Math.floor(width / PixelWidth), 50);

    const dataRow = Array(pixelsHigh).fill(false);
    const matrix = [...Array(pixelsWide)].map(() => Array.from(dataRow));

    const midHeight = Math.max(Math.floor((pixelsHigh - NameMask.length) / 2), 0);
    const midWidth = Math.max(Math.floor((pixelsWide - NameMask[0].length) / 2), 0);

    for (let j = 0; j < NameMask.length; j++) {
      for (let i = 0; i < NameMask[0].length; i++) {
        matrix[i + midWidth][j + midHeight] = NameMask[j][i];
      }
    }

    this.setState({
      canvas,
      ctx,
      matrix,
      width,
      height,
      pixelsHigh,
      pixelsWide
    });

    ctx.fillStyle = this.state.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#34FAA8";

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
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
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

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        const neighbors = [
          matrix[i - 1]?.[j],
          matrix[i + 1]?.[j],
          matrix[i]?.[j - 1],
          matrix[i]?.[j + 1],
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
    this.state.ctx.fillStyle = this.state.backgroundColor;
    this.state.ctx.fillRect(0, 0, this.state.width, this.state.height);
    this.state.ctx.fillStyle = "#34FAA8";
  }

  handleClick({ pageX, pageY, target: { offsetTop }}) {
    const pixelX = Math.ceil(pageX / PixelWidth) - 1;
    const pixelY = Math.ceil((pageY - offsetTop) / PixelHeight) - 1;
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
