export default class Cleanup {
  groups: string[];
  constructor(data: string) {
    this.groups = data.split("\n");
  }

  exec() {
    let retVal = 0;
    for (const group of this.groups) {
      const parts = group.split(",");
      if (this.checkSections(parts)) {
        retVal++;
      }
    }

    return retVal;
  }

  checkSections(parts: string[]): boolean {
    const range = this.makeRange(parts[0])
    const range1 = this.makeRange(parts[1])

    if(range.length < range1.length) {
        return this.has(range, range1)
    }

    return this.has(range1, range)
  }

  has(a: Array<number>, b: Array<number>): boolean {
    for(let i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) > -1) {
        return true;
      }
    }

    return false;
  }

  makeRange(section: string): Array<number> {
    const parts = section.split("-");
    return this.range(parseInt(parts[0]), parseInt(parts[1]));
  }

  range = (start: number, stop: number, step = 1): Array<number> => {
    if (start === stop) return [start];

    return [...Array(stop - start + 1).keys()]
      .filter((i) => !(i % Math.round(step)))
      .map((v) => start + v);
  };
}
