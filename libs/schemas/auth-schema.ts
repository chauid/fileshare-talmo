import { Users } from '@prisma/client';
import { JSONSchemaType } from 'ajv';

export interface IAuthSchema extends Pick<Users, 'id' | 'password'> {
  id_cookie: boolean;
}

export const AuthSchema: JSONSchemaType<IAuthSchema> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    password: { type: 'string' },
    id_cookie: { type: 'boolean' },
  },
  required: ['id', 'password', 'id_cookie'],
  additionalProperties: false,
};
