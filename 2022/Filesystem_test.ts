import { assert, assertArrayIncludes, assertEquals, assertRejects, assertThrows } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import { Filesystem } from "./Filesystem.ts";


const data = 
`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const f = new Filesystem(data)

Deno.test('change directory', () => {
    f.cd('/')
    f.cd('a')
    assertArrayIncludes<string>(['/','a'], f.breadCrumb)
    f.cd('..')
    f.cd('..')
})

Deno.test('command', () => {
    assertEquals(true, f.isCommand('$ cd ..'))
    assertEquals(false, f.isCommand('4060174 j'))
})

Deno.test('is file', () => {
    assertEquals(4060174, f.getSize('4060174 j'))
    assertEquals(0, f.getSize('$ ls'))
})

// Deno.test('exec', () => {
//     const f = new Filesystem(data)
//     assertEquals(95437, f.exec())
//     assertEquals(584, f.hash['/,a,e'])
//     assertEquals(94853, f.hash['/,a'])
//     assertEquals(24933642, f.hash['/,d'])
//     assertEquals(48381165, f.hash['/'])
// })

Deno.test('space', () => {
    const f = new Filesystem(data)
    assertEquals(24933642, f.exec())
    assertEquals(21618835, f.unused)
})

