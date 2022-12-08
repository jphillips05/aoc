import { Filesystem } from "./2022/Filesystem.ts"

const main = async () => {
    let data = await Deno.readTextFile('./data/2022/day7.txt')

//     data = 
// `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`

// data =    
// `$ cd /
// $ ls
// dir a
// $ cd a
// $ ls
// dir a
// 2 a.txt
// $ cd a
// $ ls
// 99999 a.txt`

//1163150
//1163150
//1163150
//
//

    const f = new Filesystem(data)

    console.log(f.exec())
    
}

if(import.meta.main) main()