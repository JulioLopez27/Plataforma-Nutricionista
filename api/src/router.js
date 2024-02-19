/*archivo de configuración de las rutas http
a ser usadas*/
import Router from '@koa/router'
import { Nutricionista } from './models/nutricionista.js'
import { Consultante } from './models/consultante.js'
export const router = new Router()




router.get('/login', async (ctx) => { await Nutricionista.login(ctx) })
router.post('/signup', async (ctx) => { await Nutricionista.signup(ctx) })

//route abierta para exponer los nutricionistas activos
router.post('/getNutritionist',async(ctx)=>{await Nutricionista.getNutricionistas(ctx)})
//ruta para dejar expuesto la api para cuando se acepte el registro del nutricionista
router.put('/acceptRegistration', async (ctx) => { await Nutricionista.acceptRegistration(ctx) })
// router.post('/test', async (ctx) => { await Nutricionista.envioDeEmail(ctx) })
router.get('/getSpecialty', async (ctx) => { await Nutricionista.getSpecialty(ctx) })
router.get('/getCountries', async (ctx) => { await Nutricionista.getCountries(ctx) })

router.get('/getProfileData', async (ctx) => { await Nutricionista.getProfileData(ctx) })
router.put('/updateProfileData', async (ctx) => { await Nutricionista.updateProfile(ctx) })

router.get('/getConsultants', async (ctx) => { await Nutricionista.getConsultantes(ctx) })
router.get('/getHistory', async (ctx) => { await Nutricionista.getHistory(ctx) })
router.get('/getHistoryInformes', async (ctx) => { await Nutricionista.getHistoryInformes(ctx) })
router.post('/saveReport', async (ctx) => { await Nutricionista.saveReport(ctx) })
router.get('/getReport', async (ctx) => { await Nutricionista.getReport(ctx) })

router.post('/createNewConsultant', async (ctx) => {await Consultante.createNewConsultant(ctx)})
router.post('/detalleConsultante', async (ctx) => {await Nutricionista.getConsultantDataForId(ctx)})
router.post('/detalleConsultante/anamnesis', async (ctx) => {await Nutricionista.getAnamnesisForId(ctx)})
router.post('/detalleConsultante/afecciones', async (ctx) => {await Nutricionista.getAfeccionesForId(ctx)})
router.post('/detalleConsultante/tipodieta', async (ctx) => {await Nutricionista.getTipoDietaForId(ctx)})

