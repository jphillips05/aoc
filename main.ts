import Calories from "./2022/Calories.ts"

const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day1.txt')
    const c = new Calories(data)
    c.exec()
    console.log(c.getCalories(3))
}

if(import.meta.main) main()


