import { CRT } from "./2022/CRT.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day10.txt')

    const crt = new CRT(data)
    crt.exec()
    console.log(crt.sumAt([20,60,100,140,180,220]))
}

if(import.meta.main) main()