import { usePostApi, usePostApiWithAuth } from "../shared/ApiHook";
import { FileUploadUri } from "./BlobApiUri";
import { FileUploadRequest, FileUploadResponse } from "./BlobApiModel";

export function useFileUpload() {
  return usePostApiWithAuth<FileUploadRequest, FileUploadResponse>(FileUploadUri, "multipart");
}