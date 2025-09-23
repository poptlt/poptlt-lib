// import { tmpdir } from 'os'
// import { execSync } from 'child_process'
import path from 'path'

import copy_github_folder from './copy_github_folder.js'

copy_github_folder({
    repo: 'https://github.com/poptlt/poptlt-lib',
    source: 'packages/node/http_server',
    dest: path.join(process.cwd(), './test1')
})

// console.log('current1', process.cwd())

// let temp = tmpdir()
// process.chdir(temp)

// console.log('current2', process.cwd())

// try {

//     let res = execSync('git --version').toString()
//     console.log({res})

//     try {

//         let res = execSync('git clone --no-checkout https://github.com/poptlt/poptlt-lib').toString()
//         console.log({res})

//         try {

//             process.chdir(path.join(temp, 'poptlt-lib'))
//             console.log('current3', process.cwd())

//             try {

//                 let res = execSync('git sparse-checkout init --cone').toString()
//                 console.log({res})

//                 try {

//                     let res = execSync('git sparse-checkout set packages/node/http_server').toString()
//                     console.log({res})

//                     try {

//                         let res = execSync('git checkout @').toString()
//                         console.log({res})

//                     }
//                     catch(err) { console.log({err}) }

//                 }
//                 catch(err) { console.log({err}) }
//             }
//             catch(err) { console.log({err}) }
//         }
//         catch(err) { console.log({err}) }
//     }
//     catch(err) { console.log({err}) }
// }
// catch(err) { console.log({err}) }