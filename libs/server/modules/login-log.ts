import client from '@lib/server/prisma-client';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

export async function createLog(user_id: string, agent: string) {
  await client.loginLog.create({
    data: {
      user_id,
      agent,
      created_at: DateTime.now().plus({ hours: 9 }).toJSDate(),
    },
  });
}

interface IGetAllLogProps {
  start_at: DateTime;
  end_at: DateTime;
  order: 'asc' | 'desc';
}

export async function readAllLog({ start_at, end_at, order }: IGetAllLogProps) {
  const logs = await client.loginLog.findMany({
    where: {
      created_at: {
        lte: start_at.toJSDate(),
        gte: end_at.toJSDate(),
      },
    },
    orderBy: { created_at: order },
  });
  return logs;
}

interface IGetLogByIdProps {
  user_id: string;
  start_at: DateTime;
  end_at: DateTime;
  order: 'asc' | 'desc';
}

export async function readLogById({ user_id, start_at, end_at, order }: IGetLogByIdProps) {
  const logs = await client.loginLog.findMany({
    where: {
      user_id,
      created_at: {
        lte: start_at.toJSDate(),
        gte: end_at.toJSDate(),
      },
    },
    orderBy: { created_at: order },
  });
  return logs;
}

/** Return Type */
export type TReadAllLog = Prisma.PromiseReturnType<typeof readAllLog>;
