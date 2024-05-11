import { IPOSTSignUpSchema } from '@lib/schemas/sign-up-schema';
import client from '@lib/server/prisma-client';
import { Prisma } from '@prisma/client';

export async function readUserById(id: string) {
  const user = await client.users.findFirst({ where: { id } });
  return user;
}

export async function readUserByIdWithoutPrivate(id: string) {
  const user = await client.users.findFirst({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      birth: true,
      profile_image: true,
      description: true,
      is_admin: true,
      created_at: true,
    },
  });
  return user;
}

export async function createUser({ id, email, name, password, phone, birth }: IPOSTSignUpSchema) {
  const create = await client.users.create({
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
  return create;
}

/** Return Type */
export type TReadUserById = Prisma.PromiseReturnType<typeof readUserById>;
export type TReadUserByIdWithoutPrivate = Prisma.PromiseReturnType<typeof readUserByIdWithoutPrivate>;
export type TCreateUser = Prisma.PromiseReturnType<typeof createUser>;
