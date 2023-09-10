const z = require('zod');

const UserSchemaValidator = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre no es válido' })
    .refine((value) => !/\d/.test(value), {
      message: 'El nombre no puede contener números',
    })
    .refine((value) => !/\d/.test(value), {
      message: 'El nombre no puede contener números',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'El nombre no puede estar vacío',
    }),
  email: z.string().email({ message: 'EL email no es válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'La contraseña no puede estar vacía',
    }),
  role: z.enum(['RECEPCION', 'SUPERVISOR']),
});

const LoginSchemaValidator = z.object({
  email: z.string().email({ message: 'EL email no es válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .refine((value) => value.trim().length > 0, {
      message: 'La contraseña no puede estar vacía',
    }),
});

module.exports = { UserSchemaValidator, LoginSchemaValidator };
