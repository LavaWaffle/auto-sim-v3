
type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}
export default class RobotUL{
  m_robotUnorderedList: HTMLUListElement | null
  m_robots: robotSkeleton[] = []; 
  constructor() {
    this.m_robotUnorderedList = document.getElementById("robotUL") as HTMLUListElement | null
  }

  setRobots(robots: robotSkeleton[]) {
    this.m_robots = robots
  }

  createListItems() {
    this.m_robots.map((robot: robotSkeleton, index: number) => {})
  }
}