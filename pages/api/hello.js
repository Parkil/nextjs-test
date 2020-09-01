// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// api별 설정
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}

function runMiddleware(req, res) {
    console.log('middleware called')
    return new Promise((resolve, reject) => {
        /*
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })*/

        return resolve(req, res)
    })
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}


// pages/api는 next에서 지정한 api호출 경로임
export default async (req, res) => {


    let randomInt = getRandomInt(1,100)
    let result = await fetch('https://jsonplaceholder.typicode.com/todos/'+randomInt)
    result = await result.json()

    res.setPreviewData({ id : 'preview'})

    res.statusCode = 200
    res.json(result)

    // Run the middleware
    //await runMiddleware(req, res)
    //res.statusCode = 200
    //res.json({ name: 'John Doe' })
    //res.redirect('/')
}
