export class Treehouse {

    x: Map<number, number> = new Map<number, number>()
    y: Map<number, number> = new Map<number, number>()
    grid: number[][];
    areaArray: number[] = [];

    constructor(private data: string) {
        this.grid = this.createGrid(data)
    }

    countTrees(): number {
        let retVal = 0
        for(let y = 0 ; y< this.grid.length; y++) {
            for(let x = 0; x < this.grid[0].length; x++) {
                if(this.isVisable(y, x)) {
                    retVal ++
                }
            }
        }

        return retVal
    }

    getArea() {
        for(let y = 0 ; y< this.grid.length; y++) {
            for(let x = 0; x < this.grid[0].length; x++) { 
                this.areaArray.push(this.area(y, x))
            }
        }

        this.areaArray.sort((a, b) => a-b)
        return this.areaArray.pop()
    }

    area(y: number, x: number) {
        return this.up(y, x) * this.down(y, x) * this.left(y, x) * this.right(y, x)
    }

    isVisable(y: number, x: number) {
        return this.up(y, x) || this.down(y, x) || this.left(y, x) || this.right(y, x)
    }

    up(y: number, x: number) {
        let retVal = 0
        const val = this.grid[y][x]

        let i = y-1
        while(i >= 0) {
            retVal ++
            if(this.grid[i][x] >= val) return retVal
            i--
        }

        return retVal
    }

    down(y: number, x: number) {
        let retVal = 0
        const val = this.grid[y][x]

        let i = y+1
        while(i < this.grid.length) {
            retVal ++
            if(this.grid[i][x] >= val) return retVal
            i++
        }

        return retVal
    }

    left(y: number, x: number): number {
        let retVal = 0
        const val = this.grid[y][x]

        let i = x-1
        while(i >= 0) {
            retVal ++
            if(this.grid[y][i] >= val) return retVal
            i--
            
        }

        return retVal
    }

    right(y: number, x: number) {
        let retVal = 0
        const val = this.grid[y][x]

        let i = x+1
        while(i < this.grid[0].length) {
            retVal ++
            if(this.grid[y][i] >= val) return retVal
            i++
        }

        return retVal
    }

    createGrid(data: string) {
        const retVal: number[][] = []
        const yRow = data.split('\n')
        for(let y = 0; y < yRow.length; y++) {
            let row = []
            const xRow = yRow[y].split('')
            for(let x = 0; x < xRow.length; x++) {
                const val = parseInt(xRow[x])
                
                if(val > (this.x.get(y) ?? 0)) {
                    this.x.set(y, val)
                }

                if(val > (this.y.get(x) ?? 0)) {
                    this.y.set(x, val)
                }

                row.push(val)
            }
            retVal.push(row)
        }

        return retVal
    }


}