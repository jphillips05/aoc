export class Bridge {
  h: number[] = [0, 0];
  t: number[][] = [];

  moves: string[];
  visited: string[] = ['0,0']

  constructor(private data: string) {
    this.moves = data.split("\n");
    [...Array(9)].forEach(_i => this.t.push([0,0]))
  }

  exec(): number {
    let i = 0;
    while (i < this.moves.length) {
      this.next(this.moves[i]);
      i++
    }

    return this.visited.length
  }

  next(step: string) {
    const [dir, count] = step.split(" ");
    for (let i = 0; i < parseInt(count); i++) {
      this.stepHead(dir);
      
      for(let i = 0; i < this.t.length; i++) {
        if(i === 0) {
            this.stepTail(this.h, this.t[i]);
        } else {
            this.stepTail(this.t[i-1], this.t[i])
        }

        if(i === this.t.length-1) {
            const key = `${this.t[i][0]},${this.t[i][1]}`
            if(!this.visited.includes(key)) {
                this.visited.push(key)
            }
        }
      }
      
    }
  }

  stepTail(h: number[], t: number[]) {
    const [hy, hx] = h;
    const [ty, tx] = t;

    if (Math.abs(hy - ty) > 1) {
      this.stepTailY(t, hy, ty);

      if (Math.abs(hx - tx) === 1) {
        this.stepTailX(t, hx, tx);
      }
    }

    if (Math.abs(hx - tx) > 1) {
      this.stepTailX(t, hx, tx);

      if (Math.abs(hy - ty) === 1) {
        this.stepTailY(t, hy, ty);
      }
    }
  }

  private stepTailX(tail: number[], hx: number, tx: number) {
    if (hx - tx > 0) {
      tail[1]++;
    } else {
      tail[1]--;
    }
  }

  private stepTailY(tail: number[], hy: number, ty: number) {
    if (hy - ty > 0) {
      tail[0]++;
    } else {
      tail[0]--;
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

  console() {
    console.log('\n\n')
    const gridSize = 20
    let retval: string[][] = []
    for(let y = 0; y < gridSize; y++) {
        const row: string[] = []
        for(let x = 0; x < gridSize; x++) {
            row.push('.')
        }
        retval.push(row)
    }

    retval[this.h[0]][this.h[1]] = 'H'
    this.t.forEach((t, idx) => {
        if(retval[t[0]][t[1]] === '.') {
            retval[t[0]][t[1]] = (idx+1).toString()
        }
    })
    console.log(retval.reverse().map(r => r.join(' ')).join('\n'))
  }

}
