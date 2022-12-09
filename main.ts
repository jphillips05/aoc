import { Treehouse } from "./2022/Treehouse.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day8.txt')


    // data = 
    // `3
    // 5
    // 3
    // 5
    // 3`
    const t = new Treehouse(data)
    console.log(t.getArea())
}

if(import.meta.main) main()