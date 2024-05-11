import path from 'path';

import { GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import client from '@lib/server/prisma-client';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession } from '@lib/server/server-session';
import { Prisma } from '@prisma/client';

/* eslint-disable import/prefer-default-export */
export async function GET() {
  const cwd = path.join(__dirname, '..');
  const destFileName = path.join(cwd, 'download.png');
  const fileName = 'generate1.png';

  const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials: { client_email: process.env.GCS_CLIENT_EMAIL, private_key: process.env.GCS_PRIVATE_KEY },
  });

  async function generateV4ReadSignedUrl() {
    // These options will allow temporary read access to the file
    const options: GetSignedUrlConfig = {
      version: 'v2',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    // Get a v4 signed URL for reading the file
    const [url] = await storage
      .bucket(process.env.GCS_BUCKET_NAME || '')
      .file(fileName)
      .getSignedUrl(options);

    // console.log('Generated GET signed URL:');
    // console.log(url);
    // console.log('You can use this URL with any user agent, for example:');
    // console.log(`curl '${url}'`);
  }

  // eslint-disable-next-line no-console
  generateV4ReadSignedUrl().catch(console.error);

  const session = await getAuthSession();

  const apireturn = await client.users.findMany();

  return Response.json({ message: 'session test', apireturn }, { status: 200 });
}

export interface IGETAPI extends IResponseDefault {
  session: Prisma.PromiseReturnType<typeof getAuthSession>;
  apireturn: Prisma.PromiseReturnType<typeof client.users.findMany>;
}
