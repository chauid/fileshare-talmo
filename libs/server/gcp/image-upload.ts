import { Stream } from 'stream';
import { MIMEType } from 'util';

import { UploadOptions } from '@google-cloud/storage';
import storage from '@lib/server/gcp-client';

export default async function imageUpload(file: File, path: string) {
  const bucketName = process.env.GCS_IMAGE_BUCKET_NAME || '';
  const bucket = storage.bucket(bucketName);

  const filename = `${Date.now()}-${file.name}`;
  const blob = bucket.file(filename);
  const blobStream = blob.createWriteStream({ metadata: MIMEType });
  blobStream.on('finish', () => {
    console.log('finish');
  });

  blobStream.end(file.arrayBuffer());
  // const result = await storage.bucket(bucketName).upload(path, options);

  // console.log(`${filePath} uploaded to ${bucketName}`);
  // return result;
}
