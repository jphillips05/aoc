export default class Reindeer {
    Name: string;
    Speed: number;
    Distance: number;
    Timeout: number;

    distanceLeft = 0
    restTimeout = 0
    total = 0

    Points = 0;

    constructor(name: string, speed: number, distance: number, timeout: number) {
        this.Name = name
        this.Speed = speed
        this.Distance = distance
        this.Timeout = timeout

        this.distanceLeft = distance
    }

    next() {

        if(this.distanceLeft > 0) {
            this.total += this.Speed
            this.distanceLeft --

            if(this.distanceLeft === 0) {
                this.restTimeout += this.Timeout
            }

            return

        }

        //we are on a timeout
        this.restTimeout --
        if(this.restTimeout === 0) {
            this.distanceLeft += this.Distance
        }

    }

    givePint() {
        this.Points ++
    }

   

}

// const main = () => {
//     const raindeerMap = new Array<Raindeer>() 
//     // raindeerMap.push(new Raindeer('commet', 14, 10, 127))
//     // raindeerMap.push(new Raindeer('dancer', 16, 11, 162))

//     raindeerMap.push(new Raindeer('Rudolph', 22, 8, 165))
//     raindeerMap.push(new Raindeer('Cupid', 8, 17, 114))
//     raindeerMap.push(new Raindeer('Prancer', 18, 6, 103))
//     raindeerMap.push(new Raindeer('Donner', 25, 6, 145))
//     raindeerMap.push(new Raindeer('Dasher', 11, 12, 125))
//     raindeerMap.push(new Raindeer('Comet', 21, 6, 121))
//     raindeerMap.push(new Raindeer('Blitzen', 18, 3, 50 ))
//     raindeerMap.push(new Raindeer('Vixen', 20, 4, 75 ))
//     raindeerMap.push(new Raindeer('Dancer', 7, 20, 119))

//     for(let i = 0; i < 2503; i++) {
//         for(const r of raindeerMap) {
//             r.next()
//         }

//         givePoints(raindeerMap)
     
//     }
    
//     console.log(raindeerMap.map(r => r.Points))
    

// }

// const givePoints = (raindeerMap: Array<Raindeer>) => {
//     const lead = raindeerMap.sort((a, b) => b.total - a.total)
//     for(const r of raindeerMap) {
//         if(r.total === lead[0].total) {
//             r.Points ++
//         }
//     }
// }