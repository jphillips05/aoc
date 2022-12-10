import { Bridge } from "./2022/Bridge.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day9.txt')
//     data = 
// `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`
    const b = new Bridge(data)
    console.log(b.exec())
}

if(import.meta.main) main()