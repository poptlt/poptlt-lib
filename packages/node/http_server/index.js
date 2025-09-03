import express from 'express'
import asyncHandler from 'express-async-handler'

export default function({port=3000, html, app}) {

    const server = express()

    if (html) server.use(express.static(html))

    server.use(express.json())        
    
    server.post('/exec', asyncHandler(async (req, res) => {

        try {
            const answer = await app(req.body)
           
            res.json(answer)
        }
        catch(err) {

            console.log(`Не удалось получить от приложения ответ на запрос ${req.body} (${err})`)
            throw new Error('Системная ошибка')
        }
    }))

    server.listen(port)
}
