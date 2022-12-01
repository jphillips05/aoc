export default class Calories {
  data: string;
  calArr: Array<number> = []
  constructor(data: string) {
    this.data = data;
  }

  exec() {
    const parts = this.data.split('\n\n')
    for(const part of parts) {
        this.calArr.push(part.split('\n').map(p => parseInt(p)).reduce((p, c) => p += c))
    }

    this.calArr.sort((a, b) => b-a)
  }

  getCalories(top: number) {
    return this.calArr.splice(0, top).reduce((p, c) => p += c)
  }

}
