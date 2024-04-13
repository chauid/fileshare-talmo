import { Prisma } from '@prisma/client';

import { ISignUpSchema } from '@lib/schemas/sign-up-schema';
import client from '@lib/server/prisma-client';

export async function findUserById(id: string) {
  const isExist = await client.users.findFirst({
    where: { id },
    select: { id: true, email: true, name: true, password: true, is_admin: true },
  });
  return isExist;
}

export async function registerUser({ id, email, name, password, phone, birth }: ISignUpSchema) {
  const regist = await client.users.create({
    data: {
      id,
      email,
      name,
      password,
      phone,
      birth,
      is_admin: false,
    },
  });
  return regist;
}

/** Return Type */
export type TFindUserId = Prisma.PromiseReturnType<typeof findUserById>;
export type TRegisterUser = Prisma.PromiseReturnType<typeof registerUser>;
