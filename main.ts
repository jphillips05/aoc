import { Reservoir } from "./2022/Reservoir.ts"


const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day14.txt')
// data = 
// `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`

const r = new Reservoir(data)
console.log(r.floor)
console.log(r.exec())

}

if(import.meta.main) main()