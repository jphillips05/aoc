import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Signal } from "./Signal.ts";

let s = new Signal('mjqjpqmgbljsphdztnvjfqwrcgsmlb')

Deno.test('header', () => {
    
    assertEquals('jpqm', s.findHeader('mjqjpqmgbljsphdztnvjfqwrcgsmlb'))
})

Deno.test('marker', () => {
    let s = new Signal('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
    assertEquals(7, s.exec())

    s = new Signal('bvwbjplbgvbhsrlpgdmjqwftvncz')
    assertEquals(5, s.exec())

    s = new Signal('nppdvjthqldpwncqszvftbrmjlhg')
    assertEquals(6, s.exec())

    s = new Signal('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
    assertEquals(10, s.exec())

    s = new Signal('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
    assertEquals(11, s.exec())

})