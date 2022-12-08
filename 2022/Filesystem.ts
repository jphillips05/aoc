

interface hash {
    [key: string]: number;
}



export class Filesystem {
    logs: string[];
    hash: hash = {}
    // dirList: string[] = []
    completedArr: string[][] = []
    breadCrumb: string[] = []

    constructor(private data: string) {
        this.logs = data.split('\n')
    }

    exec() {
        
        for(const log of this.logs) {
            const parts = log.split(' ')
            if(this.isCommand(parts[0])) {
                this.cmd(parts)
            } else {
                const size = this.getSize(parts[0])
               
                if(size > 0) {
                    const key =this.breadCrumb.join(',')
                    this.hash[key] = this.hash[key] || 0
                    this.hash[key] += size
                    if(isNaN(this.hash[key])) { 
                        debugger
                    }
                    for(let i = this.breadCrumb.length-1; i > 0; i --) {
                        const key = this.breadCrumb.slice(0, i).join(',')
                        this.hash[key] += size
                    }

                }
                // this.completedArr.push(parts[1])
                // const size = this.getSize(parts[0])
                // this.addSizeToDriectory(size, this.dirList[this.dirList.length-1])
            }
        }

        // this.completedArr.sort((a, b) => {
        //     return (a[0].split('/').length ?? 0) - (b[0].split('/').length ?? 0)
        // })
    

        let retVal = 0
        for(const key of Object.keys(this.hash)) {
            if(this.hash[key] > 100000) continue
            
            retVal += this.hash[key]
        }

        return retVal
    }

    getSize(arg0: string): number {
        const size = parseInt(arg0)
        if(!isNaN(size)) {
            return size
        }
        
        return 0
    }

    cmd(cmdParts: string[]) {
        const dir = cmdParts[2]
        if(cmdParts[1] === 'cd') {
            this.cd(dir)
        }
    }

    cd(dir: string) {
        if(dir === '..') {
            this.breadCrumb.pop()
        } else {
            this.breadCrumb.push(dir)
            this.hash[this.breadCrumb.join(',')] = 0
        }
    }

    isCommand(log: string) {
        return log.split(' ')[0] === '$'
    }


}