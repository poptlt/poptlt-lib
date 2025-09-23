#!/usr/bin/env node
import { intro, outro } from '@clack/prompts'

intro(`create-my-app`)

let dir1 = import.meta.url
let dir2 = process.cwd()
console.log('install', {dir1, dir2})