import { assert, assertArrayIncludes, assertEquals, assertFalse, assertRejects } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Hill } from "./Hill.ts";

const data = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

Deno.test('setup', () => {
    const test = [['a','a','b','q','p','o','n','m'],['a','b','c','r','y','x','x','l'],['a','c','c','s','z','z','x','k'],['a','c','c','t','u','v','w','j'],['a','b','d','e','f','g','h','i']]
    const hill = new Hill(data)
    assertEquals(test, hill.generateGrid(data))

    assertEquals('a', hill.getVal(hill.grid, [0,0]))
    assertEquals(1, hill.calculateWeight('a', 'b'))
    assertEquals(2, hill.calculateWeight('a', 'c'))
    assertEquals(2, hill.calculateWeight('c', 'a'))

    assert(hill.canTravel(hill.grid, [4,0], [4,1]))
    console.log(hill.grid[0][0], hill.grid[1][0])
    
    assert(hill.canTravel(hill.grid, [1,0], [1,1]))
    assert(hill.canTravel(hill.grid, [1,1], [1,2]))
    assertFalse(hill.canTravel(hill.grid, [1,0], [1,2]))
    assertFalse(hill.canTravel(hill.grid, [2,0], [2,1]))

    assertEquals([0,0], hill.start)
    assertEquals([2,5], hill.end)

    assert(hill.canTravel(hill.grid, [2,4], [2,5]))

    assertArrayIncludes(hill.getAdj(hill.grid, [0,0]), [[0,1],[1,0]])
    assertArrayIncludes(hill.getAdj(hill.grid, [0,1]), [[0,0],[1,1],[0,2]])
    assertArrayIncludes(hill.getAdj(hill.grid, [1,1]), [[0,1],[2,1],[1,0],[1,2]])
    assertArrayIncludes(hill.getAdj(hill.grid, [0,7]), [[0,6],[1,7]])
    assertArrayIncludes(hill.getAdj(hill.grid, [4,7]), [[4,6],[3,7]])
    assertArrayIncludes(hill.getAdj(hill.grid, [7,0]), [[6,0],[7,1]])

    assertEquals(31, hill.exec())

})