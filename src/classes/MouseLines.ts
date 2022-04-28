import Konva from "konva"
import Stage from "./Stage"

export default class MouseLines{
  m_xLine: Konva.Line;
  m_yLine: Konva.Line;
  constructor(stage: Stage) {
    this.m_xLine = new Konva.Line({
      points: [10, 0, 10, stage.m_height],
      stroke: 'red',
      strokeWidth: 1,
    })

    this.m_yLine = new Konva.Line({
      points: [0, 10, stage.m_width, 10],
      stroke: 'red',
      strokeWidth: 1,
    })
    
    stage.m_stage.on('dragmove', () => {
      this.moveMouseLines(stage)
    })

    stage.m_stage.on('mousemove', () => {
      this.moveMouseLines(stage)
    })

    stage.m_mouseLineGroup.add(this.m_xLine, this.m_yLine)
  }

  moveMouseLines(stage: Stage) {  
    const offset = 0.5;
    // get mouse coordinates
    const mouse = stage.m_stage.getPointerPosition()

    if (mouse) {
      // if mouse isn't null
      // set x and y lines to mouse coordinates
      this.m_xLine.points([mouse.x+offset, 0, mouse.x+offset, stage.m_height])
      this.m_yLine.points([0, mouse.y+offset, stage.m_width, mouse.y+offset])
    }
  }


}