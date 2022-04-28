import Stage from "./stage"
import Konva from "konva"

type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}

export default class RobotLines{
  m_stage: Stage;
  m_robots: robotSkeleton[] = [];
  constructor(stage: Stage) {
    this.m_stage = stage
  }

  setRobots(robots: robotSkeleton[]){
    this.m_robots = robots
    this.drawLines()
  }

  drawLines() {
    
  }
}