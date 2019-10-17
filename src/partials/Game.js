import {SVG_NS, KEYS} from '../settings'
import Board from './Board';
import Paddle from './Paddle'
import Ball from './Ball';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element)

    //creates a new instance of board. height and width passed through from Game object
    this.board = new Board(this.width, this.height)

    this.paddleWidth = 8
    this.paddleHeight = 56
    this.boardGap = 10 //this is your x value for Paddle

    //create ball
    this.ball = new Ball(8, this.width, this.height)

    //creates Player 1 paddle
    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight) / 2),
      KEYS.a,
      KEYS.z
    )
    //create Player 2 paddle
    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight) / 2),
      KEYS.up,
      KEYS.down
    )
    console.log(this.board)

  }

  render() {
    let svg = document.createElementNS(SVG_NS, 'svg')
    
    this.gameElement.innerHTML = ''

    svg.setAttributeNS(null, 'width', this.width)
    svg.setAttributeNS(null, 'height', this.height)
    svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)

    this.board.render(svg)
    this.player1.render(svg)
    this.player2.render(svg)

    this.ball.render(svg, this.player1, this.player2)
  }
}
