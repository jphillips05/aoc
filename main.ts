import Cleanup from "./2022/Cleanup.ts"
const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day4.txt')
    const c = new Cleanup(data)
    // c.isWin('X', 'C')

    console.log(c.exec())
}

if(import.meta.main) main()


