export class Treehouse {

    x: Map<number, number> = new Map<number, number>()
    y: Map<number, number> = new Map<number, number>()
    grid: number[][];

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

    isVisable(y: number, x: number) {
        return this.up(y, x) || this.down(y, x) || this.left(y, x) || this.right(y, x)
    }

    up(y: number, x: number) {
        const val = this.grid[y][x]

        let i = y-1
        while(i >= 0) {
            if(this.grid[i][x] >= val) return false
            i--
        }

        return true
    }

    down(y: number, x: number) {
        const val = this.grid[y][x]

        let i = y+1
        while(i < this.grid.length) {
            if(this.grid[i][x] >= val) return false
            i++
        }

        return true
    }

    left(y: number, x: number) {
        const val = this.grid[y][x]

        let i = x-1
        while(i >= 0) {
            if(this.grid[y][i] >= val) return false
            i--
        }

        return true
    }

    right(y: number, x: number): boolean {
        const val = this.grid[y][x]

        let i = x+1
        while(i < this.grid[0].length) {
            if(this.grid[y][i] >= val) return false
            i++
        }

        return true
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