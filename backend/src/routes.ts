import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import LibrariesController from './controllers/LibrariesController';

const routes = Router();
const upload = multer(uploadConfig);

//list, show, create, update, delete

routes.get('/libraries', LibrariesController.index);
routes.get('/libraries/:id', LibrariesController.show);
routes.post('/libraries', upload.array('images'), LibrariesController.create);

export default routes;