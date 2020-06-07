import { BlobHost } from "../shared/ApiUri";

export const FileUploadUri = `${BlobHost}files/temp`;
export const GetFileUri =(id)=> `${BlobHost}files/${id}`;