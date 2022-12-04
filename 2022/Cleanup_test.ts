import { assert, assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import Cleanup from "./Cleanup.ts";


const data =     
`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const c = new Cleanup(data)

Deno.test('range', () => {
    assertEquals([2,3,4], c.makeRange('2-4'))
    assertEquals([6], c.makeRange('6-6'))
})

Deno.test('has', () => {
    assertEquals(true, c.has([3,4,5,6,7], [2,3,4,5,6,7,8]))
    assertEquals(false, c.has([1,2,3,4,5,6,7], [2,3,4,5,6,7,8]))
})

Deno.test('check sections', () => {
    assertEquals(true, c.checkSections(['2-8','3-7']))
    assertEquals(true, c.checkSections(['6-6','4-6']))
    assertEquals(false, c.checkSections(['2-4','6-8']))
})

Deno.test('exec', () => {
    assertEquals(2, c.exec())
})