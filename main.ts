import { Signal } from "./2022/Signal.ts"
const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day6.txt')
    const c = new Signal(data)
    // c.isWin('X', 'C')

    console.log(c.exec(14))
}

if(import.meta.main) main()


