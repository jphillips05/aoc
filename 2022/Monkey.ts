

export class Monkey {

    items: number[];
    operation: string[];
    test: number;
    nextMonkeyTrue: number;
    nextMonkeyFalse: number;
    
    inspected: number = 0

    constructor(items: number[], operation: string[], test: number, nextMonkeyTrue: number, nextMonkeyFalse: number){
        this.items = items
        this.operation = operation
        this.test = test
        this.nextMonkeyTrue = nextMonkeyTrue
        this.nextMonkeyFalse = nextMonkeyFalse

        // this.inspected = this.items.length
    }

    worryLevel(item: number): number {
        //do operation
        this.inspected ++
        return eval(`'use strict'; ${this.getExpression(item)}`)
    }

    getBored(worryLevel: number) {
        return Math.floor(worryLevel/3)
    }

    nextMonkey(worryLevel: number): number[] {
        if(worryLevel % this.test === 0) {
            return [this.nextMonkeyTrue, worryLevel]
        }

        return [this.nextMonkeyFalse, worryLevel]

    }

    removeItem(item: number) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    addItem(item: number) {
        this.items.push(item)
    }

    getExpression(item: number) {
        let retVal = ''
        if(this.operation[0] === 'old') {
            retVal += item.toString()
        } else {
            retVal += this.operation[0]
        }

        retVal += ` ${this.operation[1] }`

        if(this.operation[2] === 'old') {
            retVal += item.toString()
        } else {
            retVal += this.operation[2]
        }

        return retVal
    }

}

export class MonkyInTheMiddle {
    monkeys: Monkey[] = []
    constructor(private data: string) {
        const mStrings = data.split('\n\n')
        for(let i = 0; i < mStrings.length; i++) {
            this.monkeys.push(this.buildMonkey(mStrings[i]))
        }
    }

    exec() {
        for(let i = 0; i < 20; i++) {
            this.turn()
        } 

        this.monkeys.sort((a, b) => b.inspected - a.inspected)
        return this.monkeys[0].inspected * this.monkeys[1].inspected
    }

    turn() {

        for(let m = 0; m < this.monkeys.length; m++) {
            const items = this.monkeys[m].items
            this.monkeys[m].items = []
            items.forEach(i => {
                const [next, worryLevel] = this.monkeys[m].nextMonkey(this.monkeys[m].getBored(this.monkeys[m].worryLevel(i)))
                this.monkeys[next].addItem(worryLevel)
            })

        }
    }

    buildMonkey(data: string): Monkey {
        const [monkeyIndexString, itemsString, opertationString, testString, trueString, falseString] = data.replaceAll('\t','') .split('\n')
        const items = this.parseItems(itemsString)
        const operation = this.parseOpertation(opertationString)
        const test = this.parseTest(testString)
        const nextMonkeyTrue = this.parseNextMonkey(trueString)
        const nextMonkeyFalse = this.parseNextMonkey(falseString)
        return new Monkey(items, operation, test, nextMonkeyTrue, nextMonkeyFalse)

    }

    parseNextMonkey(trueString: string): number {
        return parseInt(trueString.split(' monkey ')[1])
    }

    parseTest(testString: string): number {
        return parseInt(testString.split(' by ')[1])
    }

    parseOpertation(opertationString: string): string[] {
        return opertationString.split(' = ')[1].split(' ')
    }

    parseItems(itemsString: string): number[] {
        return itemsString.split(': ')[1].split(', ').map(s => parseInt(s))
    }
    
}