type robotSkeleton = {
  x: number,
  y: number,
  bearing: number,
}

export default class Storage {
  static setRobots(robots: robotSkeleton[]) {
    localStorage.setItem('robots', JSON.stringify(robots))
  }

  static getRobots(): robotSkeleton[] | [] {
    const storage = localStorage.getItem('robots')
    if (storage == null) {
      return []
    }
    return JSON.parse(storage)
  }
}