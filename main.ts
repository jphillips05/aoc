import Raindeer from './2015/Reindeer.ts'

const main = () => {
    const raindeerMap = new Array<Raindeer>() 
    // raindeerMap.push(new Raindeer('commet', 14, 10, 127))
    // raindeerMap.push(new Raindeer('dancer', 16, 11, 162))

    raindeerMap.push(new Raindeer('Rudolph', 22, 8, 165))
    raindeerMap.push(new Raindeer('Cupid', 8, 17, 114))
    raindeerMap.push(new Raindeer('Prancer', 18, 6, 103))
    raindeerMap.push(new Raindeer('Donner', 25, 6, 145))
    raindeerMap.push(new Raindeer('Dasher', 11, 12, 125))
    raindeerMap.push(new Raindeer('Comet', 21, 6, 121))
    raindeerMap.push(new Raindeer('Blitzen', 18, 3, 50 ))
    raindeerMap.push(new Raindeer('Vixen', 20, 4, 75 ))
    raindeerMap.push(new Raindeer('Dancer', 7, 20, 119))

    for(let i = 0; i < 2503; i++) {
        for(const r of raindeerMap) {
            r.next()
        }

        givePoints(raindeerMap)
     
    }
    
    console.log(raindeerMap.map(r => r.Points))
    

}

const givePoints = (raindeerMap: Array<Raindeer>) => {
    const lead = raindeerMap.sort((a, b) => b.total - a.total)
    for(const r of raindeerMap) {
        if(r.total === lead[0].total) {
            r.Points ++
        }
    }
}


if(import.meta.main) main()


