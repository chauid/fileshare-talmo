import { Users } from '@prisma/client';
import { JSONSchemaType } from 'ajv';

export interface IPOSTSignUpSchema extends Pick<Users, 'id' | 'email' | 'name' | 'password' | 'phone'> {
  birth: string; // Date
}

export const POSTSignUpSchema: JSONSchemaType<IPOSTSignUpSchema> = {
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

export interface IPUTSignUpSchema {
  id: string;
}

export const PUTSignUpSchema: JSONSchemaType<IPUTSignUpSchema> = {
  type: 'object',
  properties: { id: { type: 'string' } },
  required: ['id'],
  additionalProperties: false,
};
