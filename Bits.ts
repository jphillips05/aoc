class Header {
    Version: number
    TypeId: number
    constructor(version: number, typeId: number) {
        this.Version = version
        this.TypeId = typeId
    }
}

export default class Bits {
    
    Data: string;
    Header: Header

    constructor(headerLength: number, versionTypeLength: number, data: string) {

        this.Data = data
        this.Header = new Header(
            parseInt(this.Data.slice(0, headerLength), 2), 
            parseInt(this.Data.slice(headerLength, headerLength + versionTypeLength), 2))

        this.parse(headerLength + versionTypeLength)
    }

    parse(start: number) {
        let idx = start
        let retVal = ''

        while(idx + 4 <= this.Data.length-6) {
            if(idx % 2 === 0) {
                retVal += this.take(idx, 4)

                if(this.take(idx, 1) === 1) {
                    break
                }
            }

            //take 4


        }
    }

    take(start: number, count: number): number {
        return parseInt(this.Data.substring(start, count))
    }

}
