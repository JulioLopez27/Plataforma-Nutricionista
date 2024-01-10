/*archivo de configuración de las rutas http
a ser usadas*/
import Router from '@koa/router'
import * as nutricionista from '../api/nutricionista/index.js'

export const router = new Router()




router.post('/login',nutricionista.login)
router.post('/signup', nutricionista.signup)
router.get('/getSpecialty',nutricionista.getSpecialty)
router.get('/getCountries',nutricionista.getCountries)