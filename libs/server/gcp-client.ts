import { Storage } from '@google-cloud/storage';

const storageClietSingleton = () =>
  new Storage({ credentials: { client_email: process.env.GCS_CLIENT_EMAIL || '', private_key: process.env.GCS_PRIVATE_KEY || '' } });

declare const globalThis: {
  storageGlobal: ReturnType<typeof storageClietSingleton>;
} & typeof global;

const storage = globalThis.storageGlobal ?? storageClietSingleton();

export default storage;

if (process.env.NODE_ENV !== 'production') globalThis.storageGlobal = storage;
