import {Router} from 'express';
import multer from 'multer';
import asyncMw from '../util/AsyncMW';
import {Readable} from 'stream';
import {Container} from 'typedi';
import {FilePersistenceService} from '../service/filePersistence';
import AppError from '../util/error/AppError';
import mime from 'mime-types';
const filePersistenceServiceInstance = Container.get(FilePersistenceService);

const router = Router();

const multerOptions = {limits: {fileSize: 5 * 1024 * 1024}};
const upload = multer();


router.post('/',
    upload.fields([{name: 'file', maxCount: 1}]),
    asyncMw(async (req, res, _) => {
      if (!req?.files?.file || req?.files?.file.length === 0) {
        throw new AppError(400, 'File not specified');
      }

      const bucketName = 'files';

      const file = req.files['file'][0];

      const src = new Readable();
      src.push(file.buffer);
      src.push(null);

      const uploadStream = await filePersistenceServiceInstance.createWriteStream(bucketName, file.originalname, {
        contentType: '',
      });

      src.pipe(uploadStream);
      res.send({fileId: uploadStream.id, name: file.originalname});
    }));


router.get('/:id', asyncMw(async (req, res, _) => {
  const bucketName = 'files';

  const downloadStream = await filePersistenceServiceInstance.createReadStream(bucketName, req.params.id);

  downloadStream.once('error', (e) => res.status(404).send(e.message));
  const file = await filePersistenceServiceInstance.findById(req.params.id);
  console.log(file);

  res.setHeader('Content-disposition', 'attachment');
  // res.setHeader('Content-Type', mime.contentType('image/png'));

  downloadStream.pipe(res);
}));

export {router as fileRouter};
