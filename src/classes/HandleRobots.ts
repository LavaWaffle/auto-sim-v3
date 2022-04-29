import Konva from "konva";
import Robot from "./Robot"
import Stage from "./Stage"
import Storage from "./Storage"
import RobotLines from "./RobotLines"
import RobotUL from "./RobotUL";

type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}

export default class HandleRobots{
  m_stage: Stage;
  m_robots: robotSkeleton[] = [];
  m_robotLines: RobotLines;
  m_robotUL: RobotUL;
  m_robotWidth: number = 48.49;
  m_robotHeight: number = 47.98;
  m_toggleRobotsInput: HTMLInputElement | null;
  constructor(stage: Stage){
    this.m_toggleRobotsInput = document.getElementById("toggleRobots") as HTMLInputElement | null
    this.m_toggleRobotsInput?.addEventListener("change", () => {
      if (this.m_toggleRobotsInput?.checked) {
        stage.m_robotImageGroup.show()
        stage.m_robotLineGroup.show()
      } else {
        stage.m_robotImageGroup.hide()
        stage.m_robotLineGroup.hide()
      }
    })
    this.m_stage = stage
    this.m_robots = this.getRobots()

    this.m_robotLines = new RobotLines(this.m_stage)
    
    this.m_robotUL = new RobotUL()
    
    this.updateSubclasses()

    // needed if "this" is undefined
    this.setOneRobot = this.setOneRobot.bind(this)
    this.addRobotAtMouse = this.addRobotAtMouse.bind(this)
    this.saveRobots = this.saveRobots.bind(this)
    this.updateSubclasses = this.updateSubclasses.bind(this)
    stage.m_stage.on('click', this.addRobotAtMouse)
  }
  // adds a robot at the mouse position
  addRobotAtMouse() {
    if (this.m_toggleRobotsInput?.checked) {
      const mouse = this.m_stage.m_stage.getRelativePointerPosition()
      const robot: robotSkeleton = {
        x: mouse.x,
        y: mouse.y,
        bearing: 0,
      }
      this.m_robots.push(robot)
      this.drawRobots(true)
      this.saveRobots()
      this.updateSubclasses()
    }
  }

  // sets the robots list to a new one and saves it
  setRobots(robots: robotSkeleton[]){
    this.m_robots = robots
    this.saveRobots()
    this.updateSubclasses()
  }

  // sets one robot to a new position and saves it
  setOneRobot = (index: number, robot: robotSkeleton, updateRobot: boolean = false) => {
    this.m_robots[index] = robot
    this.saveRobots()
    this.updateSubclasses(!updateRobot)
    if (updateRobot) {
      this.drawRobots()
    }
  }

  // update subclasses
  updateSubclasses(UpdateRobotUL: boolean = true) {
    this.m_robotLines.setRobots(this.m_robots)
    this.m_robotLines.drawLines()
    this.m_robotUL.setRobots(this.m_robots)
    if (UpdateRobotUL) {
      this.m_robotUL.drawListItems(this.setOneRobot)
    }
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