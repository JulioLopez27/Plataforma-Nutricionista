/*archivo de configuración de las rutas http
a ser usadas*/
import Router from '@koa/router'
import { Nutricionista } from './models/nutricionista.js'

export const router = new Router()




router.get('/login', async (ctx) => { await Nutricionista.login(ctx) })
router.post('/signup', async (ctx) => { await Nutricionista.signup(ctx) })

router.get('/getSpecialty', async (ctx) => { await Nutricionista.getSpecialty(ctx) })
router.get('/getCountries', async (ctx) => { await Nutricionista.getCountries(ctx) })

router.get('/getProfileData', async (ctx) => { await Nutricionista.getProfileData(ctx) })
router.put('/updateProfileData', async (ctx) => { await Nutricionista.updateProfile(ctx) })

router.get('/getConsultants', async (ctx) => { await Nutricionista.getConsultantes(ctx) })
router.get('/getHistory', async (ctx) => { await Nutricionista.getHistory(ctx) })
router.get('/getHistoryInformes', async (ctx) => { await Nutricionista.getHistoryInformes(ctx) })
