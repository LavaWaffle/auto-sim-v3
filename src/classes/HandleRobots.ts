import Konva from "konva";
import Robot from "./Robot"
import Stage from "./Stage"
import Storage from "./Storage"

type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}

export default class HandleRobots{
  m_stage: Stage;
  m_robots: robotSkeleton[] = [];
  m_robotWidth: number = 48.49;
  m_robotHeight: number = 47.98;
  constructor(stage: Stage){
    this.m_stage = stage
    this.m_robots = this.getRobots()

    // needed if "this" is undefined
    this.setOneRobot = this.setOneRobot.bind(this)
    this.addRobotAtMouse = this.addRobotAtMouse.bind(this)
    stage.m_stage.on('click', this.addRobotAtMouse)
  }
  // adds a robot at the mouse position
  addRobotAtMouse() {
    const mouse = this.m_stage.m_stage.getRelativePointerPosition()
    const robot: robotSkeleton = {
      x: mouse.x,
      y: mouse.y,
      bearing: 0,
    }
    this.m_robots.push(robot)
    this.drawRobots(true)
    this.saveRobots()
  }

  // sets the robots list to a new one and saves it
  setRobots(robots: robotSkeleton[]){
    this.m_robots = robots
    this.saveRobots()
  }

  // sets one robot to a new position and saves it
  setOneRobot(index: number, robot: robotSkeleton) {
    this.m_robots[index] = robot
    this.saveRobots()
  }

  // saves the robots list to local storage
  saveRobots() {
    Storage.setRobots(this.m_robots)
  }

  // gets the robots list from local storage
  getRobots(): robotSkeleton[] | [] {
    return Storage.getRobots()
  }

  // draws the robots in robot list
  drawRobots(onlyLast: boolean = false) {
    if (onlyLast == false) {
      // if call wants to draw all robots
      // delete any children of robotImageGroup
      this.m_stage.m_robotImageGroup.destroyChildren()
      // loop through robot list
      this.m_robots.map((robotSkele, index) => {
        // draw robot
        const robot = new Robot(this.m_stage, index, this.setOneRobot, robotSkele.x - this.m_robotWidth/2, robotSkele.y - this.m_robotHeight/2, robotSkele.bearing)
      })
    } else {
      // if call wants to draw only the last robot
      // draw robot at last index of robot list
      const robot = new Robot(this.m_stage, this.m_robots.length - 1, this.setOneRobot, this.m_robots[this.m_robots.length - 1].x - this.m_robotWidth/2, this.m_robots[this.m_robots.length - 1].y - this.m_robotHeight / 2, this.m_robots[this.m_robots.length - 1].bearing)
    }
    
  }
}