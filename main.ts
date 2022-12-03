import RPC from "./2022/RPS.ts"

const data = 
`A Y
B X
C Z`

const main = async () => {
    const data = await Deno.readTextFile('./data/2022/day2.txt')
    const c = new RPC(data)
    // c.isWin('X', 'C')

    c.exec()
    console.log(c.Score)
}

if(import.meta.main) main()


