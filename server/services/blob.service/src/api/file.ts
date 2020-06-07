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

const multerOptions = {limits: {fieldSize: 100 * 1024 * 1024}};
const MAX_ALLOWED = 5;
const upload = multer(multerOptions);

router.post('/',
    upload.fields([{name: 'files', maxCount: MAX_ALLOWED}]),
    asyncMw(async (req, res, _) => {
      if (!req?.files?.files || req?.files?.files.length === 0) {
        throw new AppError(400, 'File not specified');
      }

      const bucketName = 'files';
      const files = req.files['files'];
      const uploadedFiles = [];
      for (const file of files) {
        const src = new Readable();
        src.push(file.buffer);
        src.push(null);

        const uploadStream = await filePersistenceServiceInstance.createWriteStream(bucketName, file.originalname, {
          contentType: file.mimetype,
        });

        src.pipe(uploadStream);
        uploadedFiles.push({fileId: uploadStream.id, name: file.originalname});
      }

      res.send(uploadedFiles);
    }));

router.post('/temp',
    upload.fields([{name: 'files', maxCount: MAX_ALLOWED}]),
    asyncMw(async (req, res, _) => {
      const content = req.body.files;
      const type = req.body.type;

      const bucketName = 'files';
      const src = new Readable();
      src.push(new Buffer(content, 'base64'));
      src.push(null);

      const uploadStream = await filePersistenceServiceInstance.createWriteStream(bucketName, 'test', {
        contentType: type,
      });

      src.pipe(uploadStream);

      res.send({fileId: uploadStream.id});
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
