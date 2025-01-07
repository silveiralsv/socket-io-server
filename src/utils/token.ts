import jwt from 'jsonwebtoken'

type GenerateTokenArgs = {
  name: string
  email: string
  id: number
}
export function generateToken(user: GenerateTokenArgs) {
  return jwt.sign({ user }, 'batatinhapingamelelimao', {
    expiresIn: '2h',
  }) // TODO change with env variable
}

export function verifyToken(token: string) {
  const payload: any = jwt.verify(token, 'batatinhapingamelelimao') // TODO change with env variable
  return {
    userEmail: payload.user.email,
    userId: payload.user.id,
  }
}
