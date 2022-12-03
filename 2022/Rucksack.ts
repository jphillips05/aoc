export default class Rucksack {
    Sacks: string[] = []
    constructor(data: string) {
        data.split('\n').forEach(d => {
            this.Sacks.push(d)
        })
    }

    exec(): number {
        const retVal = []
        // for(const sack of this.Sacks) {
        //     const parts = this.break(sack)
        //     retVal.push(this.findMany(parts))
        // }

        let parts = []

        for(let i = 0; i < this.Sacks.length; i++) {
            parts.push(this.Sacks[i])
            if(i % 3 == 2) {
                retVal.push(this.findMany(parts))
                parts = []
            }
        }

        return this.score(retVal)        
    }

    score(retVal: string[]) {
        return retVal.reduce((p, c) => {
            if(c.toUpperCase() === c) {
                p += c.charCodeAt(0) - 38
            } else {
                p += c.charCodeAt(0) - 96
            }

            return p
        }, 0)
    }

    break(sack: string): Array<string> {
        const middle = Math.floor(sack.length/2)
        return [sack.substring(0, middle), sack.substring(middle, sack.length)]
    }

    findMany(parts: Array<string>) {
        let retVal = parts[0]
        for(let i = 1; i < parts.length; i++) {
            retVal = this.find(retVal, parts[i])
        }

        return retVal[0]
    }

    find(part1: string, part2: string): string {
        let retVal = ''
        for(const c of [...part1]) {
            if(part2.indexOf(c) > -1) {
                retVal += c
            }
        }

        return retVal
    } 

    
}