/*archivo de configuración de las rutas http
a ser usadas*/
import Router from '@koa/router'
import { Nutricionista } from './models/nutricionista.js'

export const router = new Router()




router.post('/login', async (ctx) => { await Nutricionista.login(ctx) })
router.post('/signup', async (ctx) => { await Nutricionista.signup(ctx) })
router.get('/getSpecialty', async (ctx) => { await Nutricionista.getSpecialty(ctx) })
router.get('/getCountries', async (ctx) => { await Nutricionista.getCountries(ctx) })