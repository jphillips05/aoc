import { Treehouse } from "./2022/Treehouse.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day8.txt')


    const t = new Treehouse(data)
    console.log(t.countTrees())
}

if(import.meta.main) main()