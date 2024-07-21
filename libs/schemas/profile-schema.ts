import { Users } from '@prisma/client';
import { JSONSchemaType } from 'ajv';

export interface IPUTProfileSchema extends Pick<Users, 'email' | 'name' | 'phone' | 'profile_image' | 'description'> {
  birth: string; // Date
  file: object;
}

export const PUTProfileSchema: JSONSchemaType<IPUTProfileSchema> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    name: { type: 'string' },
    phone: { type: 'string' },
    birth: { type: 'string' },
    profile_image: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
    file: { type: 'object' },
  },
  required: ['email', 'name', 'phone', 'birth', 'file'],
  additionalProperties: false,
};
