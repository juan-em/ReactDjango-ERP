import {Router} from 'express'
import {get, ping} from '../controllers/index.controller.js'

const router  = Router()

router.get('/',get)
router.get('/ping', ping)

export default router