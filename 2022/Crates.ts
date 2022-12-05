import Stack from "../Stack.ts";

const numberTest = /\d+/g

export default class Crates {
    instructions: number[][] = []
    parts: string[];

    constructor(data: string) {
        this.parts = data.split('\n\n')
    }

    exec(): string{
        const stacks = this.buildStacks(this.parts[0])
        this.instructions = this.buildInstructions(this.parts[1].split('\n'))
        for(const instruction of this.instructions) {
            for(let i = 0; i < instruction[0]; i++) {
                const fromStack = stacks.get(instruction[1])
                const toStack = stacks.get(instruction[2])
                if(!fromStack || !toStack) throw 'Could not get stack'
                this.move(fromStack, toStack)
            }
        }

        const retVal: Array<string> = []

        stacks.forEach(stack => {
            if(stack.size() > 0) {
                retVal.push(stack.pop() ?? '')
            }
        })

        return retVal.join('')
    }
    
    move(fromStack: Stack<string>, toStack: Stack<string>) {
        const val = fromStack.pop()
        if(!val) throw 'could not get value'
        toStack.push(val)
    }

    buildStacks(stackString: string): Map<number, Stack<string>> {
        const split = stackString.split('\n')
        const names = split.pop()
        
        if(!names) throw 'Cannot get names for stacks'

        const retVal = new Map<number, Stack<string>>()
        for(let i = 0; i < (names.length ?? 0); i++) {
            if(names[i] !== ' ') {
                retVal.set(retVal.size+1, this.buildStack(split, i))
            }
        }

        return retVal
    }

    buildStack(arr: string[], idx: number): Stack<string> {
        const retVal = new Stack<string>()

        for(let i = arr.length-1; i >=0; i--) {
            if(arr[i][idx] !== ' ') {
                retVal.push(arr[i][idx])
            }
        }

        return retVal
    }

    buildInstructions(stringInstructions: string[]): number[][] {
        let retVal: number[][] = []
        for(const stringInstruction of stringInstructions) {
            retVal.push(this.buildInstruction(stringInstruction))
        }

        return retVal
    }

    buildInstruction(stringInstruction: string): number[] {
        const retVal = stringInstruction.match(numberTest)
        if(!retVal) {
            return []
        }

        return retVal.map(n => parseInt(n))
    }

    
}