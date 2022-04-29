import Konva from "konva"
import Stage from "./Stage"
import Robowo from "../assets/robowo.png"
import HandleRobots from "./HandleRobots";

type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}

export default class Robot{
  m_width: number = 48.49;
  m_height: number = 47.98;
  m_robot: Konva.Image;
  m_robotIndex: Konva.Text;
  m_robotRotator: Konva.Transformer;
  m_x: number;
  m_y: number;
  m_bearing: number;
  constructor(stage: Stage,index: number, updatePos: (index: number, robot: robotSkeleton) => void, x: number, y: number, bearing: number) {
    this.m_x = x
    this.m_y = y
    this.m_bearing = bearing
    const robotImage = new Image()
    robotImage.onload = () => {
      this.m_robot = new Konva.Image({
        x,
        y,
        image: robotImage,
        width: this.m_width,
        height: this.m_height,
        draggable: true,
      })

      this.m_robot.on('dragmove', () => {
        const robotSkeleton: robotSkeleton = {
          x: this.m_robot.x(),
          y: this.m_robot.y(),
          bearing: this.m_bearing,
        }
        updatePos(index, robotSkeleton)
        this.m_robotIndex.x(this.m_robot.x() - 7)
        this.m_robotIndex.y(this.m_robot.y() - 10)
      })

      stage.m_robotImageGroup.add(this.m_robot)

      this.m_robotIndex = new Konva.Text({
        x: this.m_robot.x() + 18,
        y: this.m_robot.y() + 10,
        text: index.toString(),
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'white',
        align: 'center',
      })

      stage.m_robotImageGroup.add(this.m_robotIndex)

      this.m_robotRotator = new Konva.Transformer({
        nodes: [this.m_robot],
        centeredScaling: true,
        resizeEnabled: false,
        rotateAnchorOffset: 10,
        rotationSnaps: [0, 90, 180, 270],
        shouldOverdrawWholeArea: true
      })

      this.m_robotRotator.on('transform', () => {
        const robotSkeleton: robotSkeleton = {
          x: this.m_robot.x(),
          y: this.m_robot.y(),
          bearing: this.m_robotRotator.rotation(),
        }
        this.m_bearing = this.m_robotRotator.rotation()
        updatePos(index, robotSkeleton)
      })
      

      // rotates robot off its center point (extra code is so it rotates around center not top left)
      // I HAVE NO IDEA HOW TF THIS WORKS BUT MAGIC IS GOOD
      // https://longviewcoder.com/2020/12/15/konva-rotate-a-shape-around-any-point/
      const robotNode =  this.m_robotRotator.getNode()

      robotNode.offsetX(robotNode.width() /2)
      robotNode.offsetY(robotNode.height() /2)
      robotNode.rotate(this.m_bearing)
      robotNode.x(robotNode.x() + robotNode.width() /2)
      robotNode.y(robotNode.y() + robotNode.height() /2)

      stage.m_robotImageGroup.add(this.m_robotRotator)
    }
    robotImage.src = Robowo
  }

  setX(x: number) {
    this.m_robot.x(x)
  }

  setY(y: number) {
    this.m_robot.y(y)
  }

  setBearing(bearing: number) {
    this.m_robotRotator.rotation(bearing)
  }

  setAll(x: number, y: number, bearing: number) {
    this.m_robot.x(x)
    this.m_robot.y(y)
    this.m_robotRotator.rotation(bearing)
  }

}