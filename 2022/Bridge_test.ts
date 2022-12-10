import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Bridge } from "./Bridge.ts"

const data = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const b = new Bridge(data)

Deno.test('stepHead', () => {
    b.h = [0,0]
    b.t = [0,0]

    b.stepHead('R')
    assertEquals([0, 1], b.h)
    b.stepHead('R')
    assertEquals([0, 2], b.h)
    b.stepHead('U')
    assertEquals([1, 2], b.h)
    b.stepHead('L')
    assertEquals([1, 1], b.h)
})

Deno.test('step tail', () => {
    b.h = [0,2]
    b.t = [0,0]
    b.stepTail()
    assertEquals([0, 1], b.t)

    b.h = [2,0]
    b.t = [0,0]
    b.stepTail()
    assertEquals([1, 0], b.t)

    b.h = [2,4]
    b.t = [0,3]
    b.stepTail()
    assert([1,4])

})

Deno.test('ins', () => {
    b.h = [0,0]
    b.t = [0,0]
    b.next('R 4')
    assertEquals([0, 4], b.h)
    assertEquals([0, 3], b.t)

    b.next('U 4')
    assertEquals([4, 4], b.h)
    assertEquals([3, 4], b.t)

    b.next('L 3')
    assertEquals([4, 1], b.h)
    assertEquals([4, 2], b.t)

    b.next('D 1')
    assertEquals([3, 1], b.h)
    assertEquals([4, 2], b.t)

    b.next('R 4')
    assertEquals([3, 5], b.h)
    assertEquals([3, 4], b.t)

    b.next('D 1')
    assertEquals([2, 5], b.h)
    assertEquals([3, 4], b.t)

    b.next('L 5')
    assertEquals([2, 0], b.h)
    assertEquals([2, 1], b.t)

    b.next('R 2')
    assertEquals([2, 2], b.h)
    assertEquals([2, 1], b.t)    

})

Deno.test('count', () => {
    const b = new Bridge(data)
    assertEquals(13, b.exec())
})
