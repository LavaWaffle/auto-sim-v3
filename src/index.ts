import "./styles/global.css"
import Stage from "./classes/Stage"
import Background from "./classes/Background"
import MouseLines from "./classes/MouseLines"
import Robot from "./classes/Robot";
import HandleRobots from "./classes/HandleRobots"

type robot = {
  x: number,
  y: number,
  bearing: number,
}

// constant width and height values
// 2 to 1 image ratio
const width = 2000/2.2, height = 1000/2.2;
// creates a new stage
const stage = new Stage()
// sets stage width and height (idk why these can't go in params of new Stage())
stage.construct(width, height)
// creates background on stage
const background = new Background(stage)
// creates mouse lines on stage
const mouseLines = new MouseLines(stage)

const robots = new HandleRobots(stage)

robots.drawRobots()