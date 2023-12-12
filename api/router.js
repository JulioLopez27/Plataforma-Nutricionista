//archivo de configuración de las rutas http
//a ser usadas

import Router from '@koa/router'

export const router = new Router()

//simula una base de datos
const users = []


router.get('/users', async ctx => {
    ctx.body = users
})

router.post('/', async ctx => {
    const user = {
        username: ctx.request.body.username
    }
    users.push(user)
    ctx.body = user
})