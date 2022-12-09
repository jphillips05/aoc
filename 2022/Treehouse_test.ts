import { assert, assertEquals, assertIsError } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Treehouse } from './Treehouse.ts'
const data = 
`30373
25512
65332
33549
35390`

const t = new Treehouse(data)

Deno.test('grid', () => {
    const d = [[3,0,3,7,3],[2,5,5,1,2],[6,5,3,3,2],[3,3,5,4,9],[3,5,3,9,0]]
    t.createGrid(data)
    assertEquals(d, t.grid)

    assertEquals(t.x.get(0), 7)
    assertEquals(t.x.get(1), 5)
    assertEquals(t.x.get(2), 6)
    assertEquals(t.x.get(3), 9)
    assertEquals(t.x.get(4), 9)

    assertEquals(t.y.get(0), 6)
    assertEquals(t.y.get(1), 5)
    assertEquals(t.y.get(2), 5)
    assertEquals(t.y.get(3), 9)
    assertEquals(t.y.get(4), 9)

})

Deno.test('check right and left', () => {

    let t = new Treehouse('65332')
    assertEquals(true, t.right(0,1))
    assertEquals(false, t.left(0,1))
    assertEquals(false, t.right(0,2))
    assertEquals(false, t.left(0,2))
    assertEquals(true, t.right(0,3))
    assertEquals(false, t.left(0,3))
    
    t = new Treehouse('33549')
    assertEquals(true, t.left(0, 2))
    assertEquals(false, t.right(0, 2))
    assertEquals(false, t.left(0, 1))
    assertEquals(false, t.right(0, 1))
    assertEquals(false, t.left(0, 3))
    assertEquals(false, t.right(0, 3))
})

Deno.test('up and down', () => {
    let d = 
`3
2
6
3
3`
    let t = new Treehouse(d)
    assertEquals(true, t.up(2,0))
    assertEquals(true, t.down(2,0))
    assertEquals(false, t.up(1,0))
    assertEquals(false, t.down(1,0))


})

Deno.test('check height', () => {
    assertEquals(true, t.isVisable(1,1))
    assertEquals(true, t.isVisable(1,2))
    assertEquals(false, t.isVisable(1,3))
    assertEquals(true, t.isVisable(3,2))
    assertEquals(true, t.isVisable(2,1))
    assertEquals(false, t.isVisable(2,2))
    assertEquals(true, t.isVisable(2,3))

    assertEquals(true, t.left(1,1))
    assertEquals(true, t.up(1,1))
    assertEquals(false, t.right(1,1))
    assertEquals(false, t.down(1,1))

    assertEquals(true, t.up(1, 2))
    assertEquals(true, t.right(1, 2))
    assertEquals(false, t.down(1, 2))
    assertEquals(false, t.left(1, 2))

    assertEquals(false, t.up(1, 3))
    assertEquals(false, t.right(1, 3))
    assertEquals(false, t.down(1, 3))
    assertEquals(false, t.left(1, 3))

    assertEquals(false, t.up(2, 1))
    assertEquals(true, t.right(2, 1))
    assertEquals(false, t.down(2, 1))
    assertEquals(false, t.left(2, 1))

    assertEquals(false, t.up(2, 2))
    assertEquals(false, t.right(2, 2))
    assertEquals(false, t.down(2, 2))
    assertEquals(false, t.left(2, 2))

    assertEquals(false, t.up(2, 3))
    assertEquals(true, t.right(2, 3))
    assertEquals(false, t.down(2, 3))
    assertEquals(false, t.left(2, 3))

})

Deno.test('count', () => {
    assertEquals(21, t.countTrees())
})