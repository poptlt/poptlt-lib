import { tmpdir } from 'os'
import { execSync } from 'child_process'
import path from 'path'
import { existsSync, rmdirSync, mkdirSync, cpSync, rm } from 'fs'

export default function({repo, source, dest}) {

    let temp = tmpdir()
    process.chdir(temp)

    let repo_name
    try { 

        let repo_url = new URL(repo)

        let parts = (repo_url.pathname.split('/').filter(part => part != ''))
        repo_name = parts[1]

        if (!(repo_url.host == 'github.com' && parts.length == 2)) 
            throw new Error(`Что-то не то с url репозитория (${err})`)
    }
    catch(err) { throw new Error(`Что-то не то с url репозитория (${err})`) }

    let temp_path
    try {

        let res = execSync('git --version').toString()
        const [git, version, number] = res.split(' ')
        if (git == 'git' && version == 'version') {

            const [f, s] = number.split('.')
            if (!(parseInt(f) > 2 || parseInt(f) == 2 && parseInt(s) >= 25))
                throw new Error(`Для копирования данных с github необходим установленный git версии не ниже 2.25 (${err})`)
        }
        else throw new Error(`Для копирования данных с github необходим установленный git (${err})`)
    
        temp_path = path.join(temp, repo_name)

        if (existsSync(temp_path)) {
            try {
                console.log(`Удаляем старый временный каталог ${temp_path}\n`)
                rmdirSync(temp_path, {recursive: true})
            }
            catch(err) { throw new Error(`Не удалось удалить временный каталог ${temp_path} (${err})`) }
        }

    }
    catch(err) { throw new Error(`Для копирования данных с github необходим установленный git (${err})`) }

    try {

        console.log(`Настраиваем клонирование каталога ${source} репозитория ${repo} во временный каталог ${temp_path}\n`)
        execSync('git clone --no-checkout https://github.com/poptlt/poptlt-lib')
        process.chdir(temp_path)
        execSync('git sparse-checkout init --cone')
        execSync(`git sparse-checkout set ${source}`)

    }
    catch(err) { throw new Error(`Не удалось настроить клонирование части репозитория во временный каталог (${err})`) }

    try {

        console.log('Запускаем клонирование\n')
        execSync('git checkout @')
    }
    catch(err) { throw new Error(`Не удалось клонировать часть репозитория во временный каталог (${err})`) }

    if (existsSync(dest)) throw new Error(`Каталог ${dest} уже существует`)
    
    let temp_folder = path.join(temp_path, source)

    try {
        cpSync(temp_folder, dest, {recursive: true})
    }
    catch(err) { throw new Error(`Не удалось скопировать файлы из временного каталога`) }

    console.log(`Удаляем временный каталог ${temp_path}\n`)
    try {
        rmdirSync(temp_path, {recursive: true})
    }
    catch(err) { console.log(`Не удалось удалить временный каталог ${temp_path} (${err})`)}
}