import { assertMatch } from "https://deno.land/std@0.167.0/testing/asserts.ts"

export class Reservoir {
    xLow = Number.MAX_SAFE_INTEGER
    xHigh = -1
    yHigh = -1
    taken: string[] = []

    startY = 0
    startX = 500
    sand = 0
    floor = 0

    constructor(private data: string) {
        this.taken = this.buildGrid(data.split('\n'))
        this.floor = this.yHigh + 2
    }

    exec() {
        while(true) {
            this.sand ++
            if(!this.drop()) {
                break
            }

            if(this.sand % 1000 === 0) {
                console.log(this.sand)
            }
        }

        return(this.sand)
    }

    dropAmount(amount: number) {
        for(let i = 0; i < amount; i++) {
            this.sand ++
            if(!this.drop()) {
                break
            }
        }

        return(this.sand-1)
    }

    drop(): boolean {
        let [y, x] = [this.startY, this.startX]
        while(true) {
            if(this.outOfBounds(y+1, x)) {
                return false
            }

            //not blocked we continue down
            if(!this.blocked(y+1, x)) {
                y++
                continue
            }

            //down left
            if(!this.blocked(y+1, x-1)) {
                y++
                x--
                continue
            }

            //down right
            if(!this.blocked(y+1, x+1)) {
                y++
                x++
                continue
            }

            //cant drop
            if(y === this.startY && x == this.startX) {
                return false
            }

            //rest
            this.taken.push(this.keyFromYX(y, x))
            return true

        }

    }

    keyFromYX(y: number, x: number) {
        return `${y},${x}`
    }

    outOfBounds(y: number,x: number) {
        return false
    }

    blocked(y: number, x: number) {
        return this.taken.indexOf(this.keyFromYX(y,x)) > -1 || y === this.floor
        // return this.taken.some(t => t === this.keyFromYX(y, x)) || y === this.floor
        // return this.taken.includes(this.keyFromYX(y, x)) || y === this.floor
    }

    buildGrid(instructions: string[]) {
        const taken: string[] = []
        for(const ins of instructions) {
            const parts = ins.split(' -> ')
            
            let i = 0
            while(i < parts.length-1) {
                this.addPoints(taken, parts[i], parts[++i])
            }
        }

        return taken

    }

    addPoints(taken: string[], fromPart: string, toPart: string) {
        const [fromX, fromY] = fromPart.split(',')
        const [toX, toY] = toPart.split(',')

        this.range(parseInt(fromY), parseInt(toY)).forEach(y => {
            this.range(parseInt(fromX), parseInt(toX)).forEach(x => {
                if(taken.indexOf(this.keyFromYX(y, x)) === -1) {
                //if(!taken.includes(this.keyFromYX(y, x))) {
                    if(x > this.xHigh) this.xHigh = x
                    if(y > this.yHigh) this.yHigh = y
                    if(x < this.xLow) this.xLow = x
                    
                    taken.push(this.keyFromYX(y, x))
                }
            })
        })

    }

    getGridValue(y: number, x: number): string {
        return this.taken.indexOf(this.keyFromYX(y,x)) > -1 ? '#' : '.'
        // return this.taken.some(t => t === this.keyFromYX(y,x)) ? '#' : '.'
        // return this.taken.includes(this.keyFromYX(y, x)) ? '#' : '.'
    }

    

    range(start: number, stop:number, step = 1) {
        if(start < stop) {
            return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
        }

        return Array.from({ length: (start - stop) / step + 1 }, (_, i) => stop + i * step);

    }
    
}   