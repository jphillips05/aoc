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