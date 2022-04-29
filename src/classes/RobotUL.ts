
type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}
export default class RobotUL{
  m_robotUnorderedList: HTMLUListElement | null
  m_robots: robotSkeleton[] = []; 
  m_setOneRobot: (index: number, robot: robotSkeleton) => void
  constructor() {
    this.m_robotUnorderedList = document.getElementById("robotUL") as HTMLUListElement | null
  }

  setRobots(robots: robotSkeleton[]) {
    this.m_robots = robots
  }

  deleteChildren(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

  checkValues(x: any, y: any, bearing: any): {x: number, y: number, bearing: number} {
    let newX: number;
    let newY: number;
    let newBearing: number;
    if (x < 0 || isNaN(x)) {
      newX = 0
    } else {
      newX = x
    }
    if (y < 0 || isNaN(y)) {
      newY = 0
    } else {
      newY = y
    }
    if (bearing < 0 || isNaN(bearing)) {
      newBearing = 0
    } else {
      newBearing = bearing
    }
    console.log(newX, newY, newBearing)
    return {x: newX, y: newY, bearing: newBearing}
  }

  drawListItems(updatePos: (index: number, robot: robotSkeleton, updateRobot: boolean) => void) {
    if (this.m_robotUnorderedList) {
      this.deleteChildren(this.m_robotUnorderedList!)
    
      this.m_robots?.map((robot: robotSkeleton, index: number) => {
        
        const li = document.createElement("li") as HTMLLIElement
        const p = document.createElement("p") as HTMLParagraphElement
        p.innerText = `Robot: ${index}`
        const div = document.createElement("div") as HTMLDivElement
        
        const spanX = document.createElement("span") as HTMLSpanElement
        const inputX = document.createElement("input") as HTMLInputElement
        spanX.innerText = `X: `
        inputX.type = "number"
        inputX.defaultValue = Math.round(robot.x).toString()
        spanX.append(inputX)
        inputX.addEventListener("input", () => {
          const {x, y, bearing} = this.checkValues(parseInt(inputX.value), parseInt(inputY.value), parseInt(inputBearing.value))
          updatePos(index, {
            x,
            y,
            bearing,
          }, true)
        })

        const spanY = document.createElement("span") as HTMLSpanElement
        const inputY = document.createElement("input") as HTMLInputElement
        spanY.innerText = `Y: `
        inputY.type = "number"
        inputY.defaultValue = Math.round(robot.y).toString()
        spanY.append(inputY)
        inputY.addEventListener("input", () => {
          const {x, y, bearing} = this.checkValues(parseInt(inputX.value), parseInt(inputY.value), parseInt(inputBearing.value))
          updatePos(index, {
            x,
            y,
            bearing,
          }, true)
        })

        const spanBearing = document.createElement("span") as HTMLSpanElement
        const inputBearing = document.createElement("input") as HTMLInputElement
        spanBearing.innerText = `Bearing: `
        inputBearing.type = "number"
        inputBearing.defaultValue = Math.round(robot.bearing).toString()
        spanBearing.append(inputBearing)
        inputBearing.addEventListener("input", () => {
          const {x, y, bearing} = this.checkValues(parseInt(inputX.value), parseInt(inputY.value), parseInt(inputBearing.value))
          updatePos(index, {
            x,
            y,
            bearing,
          }, true)
        })

        div.append(spanX, spanY, spanBearing)
        li.classList.add("robot-list-item")
        li.appendChild(p)
        li.appendChild(div)
        this.m_robotUnorderedList?.appendChild(li)
      })
    }
  }
}