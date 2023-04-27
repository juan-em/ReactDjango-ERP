'use strict';

import express from 'express'
import indexRoutes from './src/routes/index.routes.js'
import {PORT} from './src/config.js'

const HOST = '0.0.0.0';
const app = express();

app.use(express.json())

app.use(indexRoutes)

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});