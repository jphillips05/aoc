export class Signal {
    Marker = 0;

    constructor(private signal: string) {
    }

    exec() {
        this.findHeader(this.signal)
        return this.Marker
    }

    findHeader(message: string) {
        let retVal: Array<string> = []
        while(this.Marker < message.length) {

            if(retVal.length === 4) {
                
                return retVal.join('')
            }

            if(retVal.indexOf(message[this.Marker]) > -1) {
                //remove 0 to index of the same
                retVal.splice(0, retVal.indexOf(message[this.Marker])+1)
            }

            retVal.push(message[this.Marker])
            this.Marker ++
            
        }
    }

}