
import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { CRT } from "./CRT.ts";
const data = 
`noop
addx 3
addx -5`
const crt = new CRT(data)

Deno.test('simple', () => {
    crt.exec()
    console.log(crt.values)
    assertEquals(-1, crt.value)
})

Deno.test('long', () => {
    const data = 
`addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

    const crt = new CRT(data)
    crt.exec()
    assertEquals(21, crt.values.get(20))
    assertEquals(19, crt.values.get(60))
    assertEquals(18, crt.values.get(100))
    assertEquals(21, crt.values.get(140))
    assertEquals(16, crt.values.get(180))
    assertEquals(18, crt.values.get(220))

    assertEquals(13140, crt.sumAt([20,60,100,140,180,220]))

})