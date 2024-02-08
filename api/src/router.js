/*archivo de configuración de las rutas http
a ser usadas*/
import Router from '@koa/router'
import { Nutricionista } from './models/nutricionista.js'


export const router = new Router()



router.put('/getConsultants', async (ctx) => { await Nutricionista.traerConsultantes(ctx) })
router.post('/login',nutricionista.login)
router.post('/signup', nutricionista.signup)
router.get('/getConsultants', nutricionista.traerConsultantes)
router.get('/getSpecialty',nutricionista.getSpecialty)
router.get('/getCountries',nutricionista.getCountries)