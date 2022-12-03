//                                          ('r','p','s')
const strategy = new Array<string>          ('A','B','C')
const encryptedStrategy = new Array<string> ('X','Y','Z')

export default class RPC {

    Data: string;
    Rounds: string[];
    Score = 0

    constructor(data: string) {
        this.Data = data
        this.Rounds = this.Data.split('\n')
    }

    exec() {
        for(const round of this.Rounds) {
            const [thiers, mine] = round.split(' ')
            const newMine = this.mapMine(mine, thiers)
            if(newMine === undefined) return

            this.Score += this.getRollScore(newMine)
            if(this.isWin(newMine, thiers)) {
                this.Score += 6
            } else if(this.isTie(newMine, thiers)) {
                this.Score +=3
            } else {
                this.Score +=0
            }
        }
    }

    getRollScore(mine: string): number {
        return encryptedStrategy.indexOf(mine) + 1
    }

    isWin(mine: string, thiers: string) {
        return ((encryptedStrategy.indexOf(mine) - strategy.indexOf(thiers)) + 3) % 3 === 1
    }

    isTie(mine: string, thiers: string) {
        return encryptedStrategy.indexOf(mine) === strategy.indexOf(thiers)
    }

    mapMine(mine: string, thiers: string) {
        switch(mine) {
            case 'X': return this.getLoss(thiers)
            case 'Y': return this.getTie(thiers)
            case 'Z': return this.getWin(thiers)
        }
    }

    getWin(thiers: string) {
        const idx = strategy.indexOf(thiers)
        return encryptedStrategy.at((idx + 3 + 1) % 3)
    }

    getTie(thiers: string) {
        const idx = strategy.indexOf(thiers)
        return encryptedStrategy.at(idx)
    }

    getLoss(thiers: string) {
        const idx = strategy.indexOf(thiers)
        return encryptedStrategy.at((idx + 3 - 1) % 3)
    }

}

    
