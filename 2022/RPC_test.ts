import { assert, assertEquals, assertFalse, assertRejects } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import RPC from "./RPS.ts";

const data = 
`A Y
B X
C Z`

const rcp = new RPC(data)

Deno.test('roll score', () => {
    assertEquals(1, rcp.getRollScore('X'))
    assertEquals(2, rcp.getRollScore('Y'))
    assertEquals(3, rcp.getRollScore('Z'))
})

Deno.test('win', () => {
    assertEquals(true, rcp.isWin('X', 'C')) //r, s
    assertEquals(true, rcp.isWin('Y', 'A')) //p r
    assertEquals(true, rcp.isWin('Z', 'B')) //s p

    assertEquals(false, rcp.isWin('X', 'A'))
    assertEquals(false, rcp.isWin('Y', 'C'))
    assertEquals(false, rcp.isWin('Z', 'A'))
})

Deno.test('tie', () => {
    assertEquals(true, rcp.isTie('Z', 'C'))
    assertEquals(true, rcp.isTie('Y', 'B'))
    assertEquals(true, rcp.isTie('X', 'A'))
    assertEquals(false, rcp.isTie('X', 'B'))
})

Deno.test('getWin', () => {
    assertEquals('X', rcp.getWin('C'))
    assertEquals('Y', rcp.getWin('A'))
    assertEquals('Z', rcp.getWin('B'))
})

Deno.test('getTie', () => {
    assertEquals('X', rcp.getTie('A'))
    assertEquals('Y', rcp.getTie('B'))
    assertEquals('Z', rcp.getTie('C'))
})


Deno.test('score', () => {
    rcp.exec()
    assertEquals(12, rcp.Score)
})