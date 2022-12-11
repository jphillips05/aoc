import { assert, assertArrayIncludes, assertEquals, assertFalse, assertRejects } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Monkey, MonkyInTheMiddle } from "./Monkey.ts";


const monkey0 = 
`Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`
const monkey1 = 
`Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0`

  const monkey2 = 
`Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3`

const monkey3 = 
  `Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`


let mim = new MonkyInTheMiddle(monkey0)

Deno.test('build Monkeys', () => {
    assertEquals([79, 98], mim.parseItems('Starting items: 79, 98'))
    assertEquals(['old','*','19'], mim.parseOpertation('Operation: new = old * 19'))
    assertEquals(23, mim.parseTest('Test: divisible by 23'))
    assertEquals(2, mim.parseNextMonkey('If true: throw to monkey 2'))

    let m: Monkey = mim.buildMonkey(monkey0)
    assertEquals([79, 98], m.items)
    assertEquals(['old','*','19'], m.operation)
    assertEquals(23, m.test)
    assertEquals(2, m.nextMonkeyTrue)

    let item = 79
    assertEquals(1501, m.worryLevel(item))
    assertEquals(500, m.getBored(m.worryLevel(item)))
    assertEquals([3, 500], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 98
    assertEquals(1862, m.worryLevel(item))
    assertEquals(620, m.getBored(m.worryLevel(item)))
    assertEquals([3, 620], m.nextMonkey(m.getBored(m.worryLevel(item))))

    m = mim.buildMonkey(monkey1)
    item = 54
    assertEquals(60, m.worryLevel(item))
    assertEquals(20, m.getBored(m.worryLevel(item)))
    assertEquals([0, 20], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 65
    assertEquals(71, m.worryLevel(item))
    assertEquals(23, m.getBored(m.worryLevel(item)))
    assertEquals([0, 23], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 75
    assertEquals(81, m.worryLevel(item))
    assertEquals(27, m.getBored(m.worryLevel(item)))
    assertEquals([0, 27], m.nextMonkey(m.getBored(m.worryLevel(item))))

    m = mim.buildMonkey(monkey2)
    item = 79
    assertEquals(6241, m.worryLevel(item))
    assertEquals(2080, m.getBored(m.worryLevel(item)))
    assertEquals([1, 2080], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 60
    assertEquals(3600, m.worryLevel(item))
    assertEquals(1200, m.getBored(m.worryLevel(item)))
    assertEquals([3, 1200], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 97
    assertEquals(9409, m.worryLevel(item))
    assertEquals(3136, m.getBored(m.worryLevel(item)))
    assertEquals([3, 3136], m.nextMonkey(m.getBored(m.worryLevel(item))))

    m = mim.buildMonkey(monkey3)
    item = 74
    assertEquals(77, m.worryLevel(item))
    assertEquals(25, m.getBored(m.worryLevel(item)))
    assertEquals([1, 25], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 500
    assertEquals(503, m.worryLevel(item))
    assertEquals(167, m.getBored(m.worryLevel(item)))
    assertEquals([1, 167], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 620
    assertEquals(623, m.worryLevel(item))
    assertEquals(207, m.getBored(m.worryLevel(item)))
    assertEquals([1, 207], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 1200
    assertEquals(1203, m.worryLevel(item))
    assertEquals(401, m.getBored(m.worryLevel(item)))
    assertEquals([1, 401], m.nextMonkey(m.getBored(m.worryLevel(item))))

    item = 3136
    assertEquals(3139, m.worryLevel(item))
    assertEquals(1046, m.getBored(m.worryLevel(item)))
    assertEquals([1, 1046], m.nextMonkey(m.getBored(m.worryLevel(item))))

})

Deno.test('exec', () => {
    const d = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

    let mim = new MonkyInTheMiddle(d)
    //1
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [20, 23, 27, 26])
    assertArrayIncludes(mim.monkeys[1].items, [2080, 25, 167, 207, 401, 1046])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //2
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [695, 10, 71, 135, 350])
    assertArrayIncludes(mim.monkeys[1].items, [43, 49, 58, 55, 362])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //3
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [16, 18, 21, 20, 122])
    assertArrayIncludes(mim.monkeys[1].items, [1468, 22, 150, 286, 739])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //4
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [491, 9, 52, 97, 248, 34])
    assertArrayIncludes(mim.monkeys[1].items, [39, 45, 43, 258])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //5
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [15, 17, 16, 88, 1037])
    assertArrayIncludes(mim.monkeys[1].items, [20, 110, 205, 524, 72])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //6
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [8, 70, 176, 26, 34])
    assertArrayIncludes(mim.monkeys[1].items, [481, 32, 36, 186, 2190])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //7
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [162, 12, 14, 64, 732, 17])
    assertArrayIncludes(mim.monkeys[1].items, [148, 372, 55, 72])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //8
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [51, 126, 20, 26, 136])
    assertArrayIncludes(mim.monkeys[1].items, [343, 26, 30, 1546, 36])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //9
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [116, 10, 12, 517, 14])
    assertArrayIncludes(mim.monkeys[1].items, [108, 267, 43, 55, 288])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    //10
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [91, 16, 20, 98])
    assertArrayIncludes(mim.monkeys[1].items, [481, 245, 22, 26, 1092, 30])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])

    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    mim.turn()
    assertArrayIncludes(mim.monkeys[0].items, [10, 12, 14, 26, 34])
    assertArrayIncludes(mim.monkeys[1].items, [245, 93, 53, 199, 115])
    assertArrayIncludes(mim.monkeys[2].items, [])
    assertArrayIncludes(mim.monkeys[3].items, [])
    
    assertEquals(101, mim.monkeys[0].inspected)
    assertEquals(95, mim.monkeys[1].inspected)
    assertEquals(7, mim.monkeys[2].inspected)
    assertEquals(105, mim.monkeys[3].inspected)
    
    mim = new MonkyInTheMiddle(d)
    assertEquals(10605, mim.exec())

})