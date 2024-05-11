import { Users } from '@prisma/client';
import { JSONSchemaType } from 'ajv';

export interface IProfileSchema extends Pick<Users, 'email' | 'name' | 'phone' | 'profile_image' | 'description'> {
  birth: string; // Date
}

export const ProfileSchema: JSONSchemaType<IProfileSchema> = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    name: { type: 'string' },
    phone: { type: 'string' },
    birth: { type: 'string' },
    profile_image: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
  },
  required: ['email', 'name', 'phone', 'birth'],
  additionalProperties: false,
};
