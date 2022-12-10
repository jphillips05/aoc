
export class CRT {
    values: Map<number, number> = new Map()
    value = 1
    cycle = 1

    instructions: string[];
    constructor(private data: string) {
        this.instructions = data.split('\n')
        this.values.set(0, 1)
    }

    exec() {
        for(const ins of this.instructions) {
            if(ins === 'noop') {
                // this.cycle ++
                this.values.set(this.cycle++, this.value)
            } else {
                this.values.set(this.cycle++, this.value)
                this.values.set(this.cycle++, this.value)

                const [key, valueString] = ins.split(' ')
                this.value += parseInt(valueString)
            }
            
        }
    }

    sumAt(keys: number[]): number {
        return keys.reduce((p, c) => {
            p += (this.values.get(c) ?? 0) * c
            return p
        }, 0)
    }


}