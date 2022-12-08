import { Filesystem } from "./2022/Filesystem.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day7.txt')

    const f = new Filesystem(data)

    console.log(f.exec())
    
}

if(import.meta.main) main()