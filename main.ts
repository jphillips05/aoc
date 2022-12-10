import { Bridge } from "./2022/Bridge.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day9.txt')
//     data = 
// `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`
    const b = new Bridge(data)
    console.log(b.exec())
}

if(import.meta.main) main()