export default class StreetGrid {
    X = 0
    Y = 0

    DirectionArray = ['N', 'E', 'S', 'W']
    CurrentDirectionIdx = 0

    instructions: string[];
    constructor(data: string) {
        this.instructions = data.split(', ')
    }

    run() {
        for(const i of this.instructions) {
            this.setDirection(i[1] === 'R')
            this.walk(parseInt(i[0]))
        }

    }
    setDirection(pos: boolean) {
        if(pos) {
            this.CurrentDirectionIdx = (this.CurrentDirectionIdx ++) % this.DirectionArray.length
        } else {
            this.CurrentDirectionIdx = (this.CurrentDirectionIdx --) % this.DirectionArray.length
        }
    }

    walk(steps: number) {
        switch(this.DirectionArray[this.CurrentDirectionIdx]) {
            case 'N':
                this.X += steps
                break
            case 'S':
                this.X -= steps
                break
            case 'E':
                this.Y += steps
                break
            case 'W':
                this.Y -= steps
                break
        }
    }
}