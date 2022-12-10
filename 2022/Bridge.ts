export class Bridge {
  h: number[] = [0, 0];
  t: number[] = [0, 0];
  moves: string[];
  visited: string[] = ['0,0']

  constructor(private data: string) {
    this.moves = data.split("\n");
  }

  exec(): number {
    let i = 0;
    while (i < this.moves.length) {
      this.next(this.moves[i]);
      i++
    }

    console.log(this.visited)
    return this.visited.length
  }

  next(step: string) {
    const [dir, count] = step.split(" ");
    for (let i = 0; i < parseInt(count); i++) {
      this.stepHead(dir);
      this.stepTail();
    }
  }

  stepTail() {
    const [hy, hx] = this.h;
    const [ty, tx] = this.t;

    if (Math.abs(hy - ty) > 1) {
      this.stepTailY(hy, ty);

      if (Math.abs(hx - tx) === 1) {
        this.stepTailX(hx, tx);
      }
    }

    if (Math.abs(hx - tx) > 1) {
      this.stepTailX(hx, tx);

      if (Math.abs(hy - ty) === 1) {
        this.stepTailY(hy, ty);
      }
    }

    const key = `${this.t[0]},${this.t[1]}`
    if(!this.visited.includes(key)) {
        this.visited.push(key)
    }
  }

  private stepTailX(hx: number, tx: number) {
    if (hx - tx > 0) {
      this.t[1]++;
    } else {
      this.t[1]--;
    }
  }

  private stepTailY(hy: number, ty: number) {
    if (hy - ty > 0) {
      this.t[0]++;
    } else {
      this.t[0]--;
    }
  }

  stepHead(dir: string) {
    switch (dir) {
      case "R":
        this.h[1]++;
        break;
      case "U":
        this.h[0]++;
        break;
      case "L":
        this.h[1]--;
        break;
      case "D":
        this.h[0]--;
        break;
    }
  }
}
