import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import Stack from "../Stack.ts";
import Crates from "./Crates.ts";

const data = 
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const c = new Crates(data)

Deno.test('build instructions', () => {
    assertEquals([1,2,1], c.buildInstruction('move 1 from 2 to 1'))
    assertEquals([3,1,3], c.buildInstruction('move 3 from 1 to 3'))
    assertEquals([2,2,1], c.buildInstruction('move 2 from 2 to 1'))
    assertEquals([1,1,2], c.buildInstruction('move 1 from 1 to 2'))
    assertEquals([19,7,9], c.buildInstruction('move 19 from 7 to 9'))

})

Deno.test('buid stack', () => {
    const d = data.split('\n\n')[0].split('\n')
    d.pop()

    let stactTest = new Stack()
    stactTest.push('Z')
    stactTest.push('N')
    assertEquals(stactTest, c.buildStack(d, 1))
    assertEquals('N', stactTest.pop())
    
    stactTest = new Stack()
    stactTest.push('M')
    stactTest.push('C')
    stactTest.push('D')
    assertEquals(stactTest, c.buildStack(d, 5))
    assertEquals('D', stactTest.pop())


    stactTest = new Stack()
    stactTest.push('P')
    assertEquals(stactTest, c.buildStack(d, 9))
    assertEquals('P', stactTest.pop())    

})

Deno.test('move', () => {
    const fromStack = new Stack<string>()
    fromStack.push('A')
    const toStack = new Stack<string>()
    toStack.push('B')

    const testStack = new Stack<string>()
    testStack.push('B')
    testStack.push('A')

    c.move(fromStack, toStack)
    assertEquals(testStack, toStack)

})

Deno.test('exec', () => {
    const d = data.split('\n\n')[0]
    assertEquals('MCD', c.exec())

})