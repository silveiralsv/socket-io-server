import prisma from '@prisma'
import { hash, compare } from '../../utils/hash'
import { generateToken } from '../../utils/token'

type CreateUserArgs = {
  name: string
  email: string
  password: string
}
export async function createUser(args: CreateUserArgs) {
  const hashedPassword = await hash(args.password)

  const newUser = await prisma.user.create({
    data: {
      name: args.name,
      email: args.email,
      password: hashedPassword,
    },
  })
  return newUser
}

type LoginArgs = {
  email: string
  password: string
}
export async function login(args: LoginArgs) {
  const user = await prisma.user.findUnique({
    where: {
      email: args.email,
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await compare(args.password, user.password)

  if (!isPasswordValid) {
    throw new Error('Invalid credentials')
  }

  const token = generateToken({
    email: user.email,
    id: user.id,
    name: user.name,
  })

  return { ...user, token }
}
