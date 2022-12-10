
export class CRT {
    values: Map<number, number> = new Map()
    value = 1
    cycle = 1
    pos = 0
    screen: Array<string> = []

    instructions: string[];
    constructor(private data: string) {
        this.instructions = data.split('\n')
        this.values.set(0, 1)
    }

    exec() {
        for(const ins of this.instructions) {
            this.tick()
            if(ins !== 'noop') {
                this.tick()
                const [key, valueString] = ins.split(' ')
                this.value += parseInt(valueString)
            }
        }

        [...Array(6)].forEach(_i => console.log(this.screen.splice(0, 40).join('')))

    }

    checkScreen() {
        if(this.isLit(this.pos, this.value)) {
            this.screen.push('#')
        } else {
            this.screen.push('.')
        }
        this.pos ++
    }

    isLit(pos: number, addx: number) {
        if(pos%40 - 1 === addx) return true
        if(pos%40 == addx) return true
        if(pos%40 + 1 === addx) return true

        return false;
    }

    tick() {
        
        this.checkScreen()
        this.values.set(this.cycle++, this.value)
            
    }

    sumAt(keys: number[]): number {
        return keys.reduce((p, c) => {
            p += (this.values.get(c) ?? 0) * c
            return p
        }, 0)
    }


}