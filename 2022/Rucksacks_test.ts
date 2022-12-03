import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import Rucksack from "./Rucksack.ts";

const data = 
`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const r = new Rucksack(data)
Deno.test('break a sack', () => {
    assertEquals(2, r.break('vJrwpWtwJgWrhcsFMMfFFhFp').length)
    assertEquals(['vJrwpWtwJgWr', 'hcsFMMfFFhFp'], r.break('vJrwpWtwJgWrhcsFMMfFFhFp'))
})

Deno.test('find', () => {
    const parts = r.break('vJrwpWtwJgWrhcsFMMfFFhFp')
    assertEquals('p', r.findMany(parts))

    assertEquals('r', r.findMany(['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg']))
    assertEquals('Z', r.findMany(['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw']))
})

Deno.test('exec', () => {
    assertEquals(70, r.exec())
})
