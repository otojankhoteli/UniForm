import {Service} from 'typedi';
import mongoose from 'mongoose';


@Service()
export class FilePersistenceService {
  constructor() {
  };

  private async _getGridFSBucket(collection) {
    const db = mongoose.connection.db;
    return new mongoose.mongo.GridFSBucket(db, {bucketName: collection});
  };

  public async createWriteStream(bucketName, file, options?) {
    const gridFSBucket = await this._getGridFSBucket(bucketName);
    return gridFSBucket.openUploadStream(file, options);
  }

  public async createReadStream(bucketName, fileId) {
    const gridFSBucket = await this._getGridFSBucket(bucketName);

    return gridFSBucket.openDownloadStream(new mongoose.mongo.ObjectId(fileId));
  }

  public async findById(id, collectionName?) {
    collectionName = collectionName ?? 'files.files';
    const collection = mongoose.connection.db.collection(collectionName);
    return collection.findOne({_id: new mongoose.mongo.ObjectId(id)});
  }
}
