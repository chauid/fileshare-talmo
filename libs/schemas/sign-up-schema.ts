import { Users } from '@prisma/client';
import { JSONSchemaType } from 'ajv';

export interface ISignUpSchema extends Pick<Users, 'id'| 'email' | 'name' | 'password' | 'phone'> {
  birth: string; // Date
}

export const SignUpSchema: JSONSchemaType<ISignUpSchema> = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    name: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    birth: { type: 'string' },
  },
  required: ['id', 'email', 'name', 'password', 'phone', 'birth'],
  additionalProperties: false,
};
