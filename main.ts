import { Hill } from "./2022/Hill.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day12.txt')
// data = 
// `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`

    const h = new Hill(data)
    console.log(h.exec())

}

if(import.meta.main) main()