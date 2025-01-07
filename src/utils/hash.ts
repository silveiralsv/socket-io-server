import bcrypt from 'bcrypt'

export async function hash(password: string, slatRounds = 10) {
  return bcrypt.hash(password, slatRounds)
}

export async function compare(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}
