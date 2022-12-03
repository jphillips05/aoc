import Rucksack from "./2022/Rucksack.ts"

const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day3.txt')
    const c = new Rucksack(data)
    // c.isWin('X', 'C')

    console.log(c.exec())
}

if(import.meta.main) main()


