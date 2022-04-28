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
    this.m_stage.m_robotLineGroup.removeChildren()
    let previous: [number, number] = [-1, -1]
    let current: [number, number] = [-1, -1]
    // loop through robots array
    this.m_robots.forEach((robot, index) => {
      // if there is more than one robot
      if (this.m_robots.length > 1) {
        // set current robot to the current robot
        current = [robot.x, robot.y]
        // if there is more than one robot
        if (index > 0) {
          // set previous robot to the previous robot
          
          previous = [this.m_robots[index - 1].x, this.m_robots[index - 1].y]
        }
        // draw line from previous robot to current robot
        if (previous[0] !== -1 && current[0] !== -1) {
          this.drawLine(previous, current)
        }
      }
    })
  }

  drawLine(previous: [number, number], current: [number, number]) {
    // create line
    const line = new Konva.Line({
      points: [previous[0], previous[1], current[0], current[1]],
      stroke: 'red',
      strokeWidth: 2,
      lineCap: 'round',
      lineJoin: 'round',
      draggable: false,
      listening: false,
    });
    // add line to the line group
    this.m_stage.m_robotLineGroup.add(line);
  }
  
}