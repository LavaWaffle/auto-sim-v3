import Konva from "konva"
import Stage from "./Stage"
import Field from "../assets/hotField.png"

export default class Background{
  constructor(stage: Stage) {
    const backgroundImage = new Image()
    backgroundImage.onload = () => {
      const background = new Konva.Image({
        x: 0,
        y: 0,
        image: backgroundImage,
        width: stage.m_width,
        height: stage.m_height
      })

      // ADD FUTURE ON CLICK AND HOVER EVENTS HERE

      stage.m_backgroundLayer.add(background)
    }
    backgroundImage.src = Field
  }
}