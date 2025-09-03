export default function({handlers}) {

    return async function(data) {


        const {session, requests} = data

        let results = requests.map(async request => {

            const {method, params = [], id} = request

            return new Promise(async (resolve) => {

                let result, error

                const handler = method.split('.').reduce((cur, item, i) => {

                    const last_index = method.split('.').length - 1
                    if (!cur[item]) error = {
                        code: 'SYSTEM',
                        message: `Не найден обработчик метода ${method}`,
                    }
                    
                    if (i == last_index) return cur[item]
                    else return (typeof cur[item] == 'function') ? cur[item]() : cur[item]
                }, handlers)
                
                const ctx = {session}
                
                if (!error) {
                    try {

                        result = await handler.bind(ctx)(...params)
                    }
                    catch(err) {

                        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        error = {...err}
                    }
                }
    
                resolve({result, error, id})
            })
        })

        return await Promise.all(results)
    }
}