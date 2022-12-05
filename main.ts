import Crates from "./2022/Crates.ts"
const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day5.txt')
    const c = new Crates(data)
    // c.isWin('X', 'C')

    console.log(c.exec())
}

if(import.meta.main) main()


