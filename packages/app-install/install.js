#!/usr/bin/env node

let dir1 = import.meta.url
let dir2 = process.cwd()
console.log('install', {dir1, dir2})