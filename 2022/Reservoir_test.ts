import { assert, assertArrayIncludes, assertEquals, assertFalse, assertRejects, assertThrows } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Reservoir } from './Reservoir.ts'

const data =
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

Deno.test('out of bounds', () => {
    const r = new Reservoir(data)
    assertEquals(r.outOfBounds(9, 493), false)
    assertEquals(r.outOfBounds(9, 494), false)
})

Deno.test('build', () => {

    const r = new Reservoir(data)
    assertEquals(r.getGridValue(4, 498), '#')
    assertEquals(r.getGridValue(6, 498), '#')
    assertEquals(r.getGridValue(6, 496), '#')

    assertEquals(r.getGridValue(4, 503), '#')
    assertEquals(r.getGridValue(4, 502), '#')
    assertEquals(r.getGridValue(9, 502), '#')
    assertEquals(r.getGridValue(9, 494), '#')

    assertEquals(r.getGridValue(0, 0), '.')

})

Deno.test('drop', () => {
    const r = new Reservoir(data)
    r.dropAmount(1)
    assertArrayIncludes(r.taken, ['8,500'])
    r.dropAmount(1)
    assertArrayIncludes(r.taken, ['8,499'])
    r.dropAmount(1)
    assertArrayIncludes(r.taken, ['8,501'])
    r.dropAmount(1)
    assertArrayIncludes(r.taken, ['7,500'])
    r.dropAmount(1)
    assertArrayIncludes(r.taken, ['8,498'])

    r.dropAmount(17)
    assertArrayIncludes(r.taken, ['2,500', '3,500', '4,500', '5,500', '6,500', '7,500', '8,500'])
    assertArrayIncludes(r.taken, ['3,499', '4,499', '5,499', '6,499', '7,499', '8,499'])
    assertArrayIncludes(r.taken, ['3,501', '4,501', '5,501', '6,501', '7,501', '8,501'])
    assertArrayIncludes(r.taken, ['8,497', '8,498', '7,498'])
    r.dropAmount(2)

    assertArrayIncludes(r.taken, ['8,495', '5,497'])

    assert(r.taken.indexOf('8,494') === -1)
    assert(r.taken.indexOf('8,496') === -1)
    assert(r.taken.indexOf('7,494') === -1)
    assert(r.taken.indexOf('7,495') === -1)
    assert(r.taken.indexOf('7,496') === -1)

})

Deno.test('floor', () => {
    const r = new Reservoir(data)
    assertEquals(r.floor, 11)
})