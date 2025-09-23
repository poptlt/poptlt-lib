import server from '@poptlt-lib/node-http'
import app from '@poptlt-lib/node-app'

const handlers = {
    test() { return 123 },
    test2() { return this.session },
}

server({
    port: 3000, 
    app: app({handlers})
})

