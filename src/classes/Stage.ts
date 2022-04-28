import Konva from "konva"
import Robot from "./Robot"

export default class Stage{
  m_width: number;
  m_height: number;
  m_stage: Konva.Stage;
  m_backgroundLayer: Konva.Layer;
  m_animatedLayer: Konva.Layer;
  m_mouseLineGroup: Konva.Group;
  m_robotImageGroup: Konva.Group;
  m_robotLineGroup: Konva.Group;

  construct(width: number, height: number) {
    this.m_width = width
    this.m_height = height
    this.m_stage = new Konva.Stage({
      container: "canvas",
      width,
      height,
    })
    // layer and group creation
    this.m_backgroundLayer = new Konva.Layer();
    this.m_animatedLayer = new Konva.Layer();

    this.m_mouseLineGroup = new Konva.Group();
    this.m_robotImageGroup = new Konva.Group();
    this.m_robotLineGroup = new Konva.Group();

    this.m_animatedLayer.add(this.m_robotLineGroup, this.m_robotImageGroup, this.m_mouseLineGroup)

    this.m_stage.add(this.m_backgroundLayer, this.m_animatedLayer);
  }

  getStage(): Konva.Stage {
    return this.m_stage;
  }
}