
export class Hill {

    grid: string[][] = []
    cameFrom: Map<string, string | null> = new Map<string, string | null>()
    visited: Map<string, boolean> = new Map<string, boolean>()
    start: number[] = []
    end: number[] = []

    constructor(private data: string) {
        this.grid = this.generateGrid(data)
    }

    

    exec() {
        const queue: number[][] = []
        queue.push(this.end.concat(0))
        let tick = 0
        while(queue.length > 0) {
            tick ++

            if(queue.length > this.visited.size) {
                throw 'too big'
            }

            const point = queue.shift()
            if(!point) break

            if(point[0] === this.start[0] && point[1] === this.start[1]) {
                return point[2]
            }
            const level = point[2] + 1

            const adj = this.getAdj(this.grid, [point[0], point[1]])
            for(const adjNode of adj) {
                const k = this.keyFromPoint([adjNode[0],adjNode[1]])
                if(this.visited.get(k)) {
                    continue
                    
                }
                if(!this.canTravel(this.grid, [point[0], point[1]], adjNode)) {
                    continue
                }

                this.visited.set(k, true)
                queue.push(adjNode.concat(level))
            }
            
        }

        console.log(tick)
        return -1
        
    }

    keyFromPoint(point: number[]): string {
        let retVal = ''
        point.forEach(p => retVal += p)
        return retVal
    }

    getAdj(grid: string[][], node: number[]): number[][] {
        const retVal: number[][] = []
        
        if(node[0] + 1 < grid.length) {
            retVal.push([node[0]+1, node[1]])
        }

        if(node[0] - 1 >= 0) {
            retVal.push([node[0]-1, node[1]])
        }

        if(node[1] + 1 < grid[0].length) {
            retVal.push([node[0], node[1]+1])
        }

        if(node[1] - 1 >= 0) {
            retVal.push([node[0], node[1]-1])
        }

        return retVal
    }

    generateGrid(data: string) {
        const retVal: string[][] = []
        const rows = data.split('\n')
        for(let y = 0; y < rows.length; y++) {
            const row: string[] = []
            for(let x = 0; x < rows[y].length; x++) {
                
                this.visited.set(`${y}${x}`, false)
                if(rows[y][x] === 'S') {
                    this.start = [y, x]
                    row.push('a')
                } else if(rows[y][x] === 'E') {
                    this.end = [y, x]
                    row.push('z')
                } else {
                    row.push(rows[y][x])
                }
            }
            retVal.push(row)
        }

        return retVal
    }

    calculateWeight(a: string, b: string): number {
        return Math.abs(a.charCodeAt(0) - b.charCodeAt(0))
    }

    canTravel(grid: string[][], from: number[], to: number[]): boolean {
        let fromVal = this.getVal(grid, from)
        let toVal = this.getVal(grid, to)

        const weight = this.calculateWeight(fromVal, toVal)
        return weight <= 1
    }

    getVal(grid: string[][], point: number[]): string {
        return grid[point[0]][point[1]]
    }

}