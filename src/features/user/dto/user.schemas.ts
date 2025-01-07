import zod from 'zod'

export const createUserSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  name: zod.string(),
})

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
})
