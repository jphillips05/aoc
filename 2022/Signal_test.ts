import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Signal } from "./Signal.ts";

let s = new Signal('mjqjpqmgbljsphdztnvjfqwrcgsmlb')

Deno.test('header', () => {
    
    assertEquals('jpqm', s.findHeader('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4))
})

Deno.test('marker', () => {
    let s = new Signal('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
    assertEquals(7, s.exec(4))

    s = new Signal('bvwbjplbgvbhsrlpgdmjqwftvncz')
    assertEquals(5, s.exec(4))

    s = new Signal('nppdvjthqldpwncqszvftbrmjlhg')
    assertEquals(6, s.exec(4))

    s = new Signal('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
    assertEquals(10, s.exec(4))

    s = new Signal('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
    assertEquals(11, s.exec(4))

})

Deno.test('messageMarker', () => {
    let s = new Signal('mjqjpqmgbljsphdztnvjfqwrcgsmlb')
    assertEquals(19, s.exec(14))

    s = new Signal('bvwbjplbgvbhsrlpgdmjqwftvncz')
    assertEquals(23, s.exec(14))

    s = new Signal('nppdvjthqldpwncqszvftbrmjlhg')
    assertEquals(23, s.exec(14))

    s = new Signal('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
    assertEquals(29, s.exec(14))

    s = new Signal('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')
    assertEquals(26, s.exec(14))
})