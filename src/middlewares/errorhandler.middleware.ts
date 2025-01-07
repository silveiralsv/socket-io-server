import zod from 'zod'

// formatter for zod errors
export function formatZodErrors(error: zod.ZodError) {
  return error.errors.map((err) => {
    return {
      field: err.path.join('.'),
      message: err.message,
    }
  })
}

// Error middleware
export const errorMiddleware = (err: any, req: any, res: any, next: any) => {
  let statusCode = err?.statusCode || err?.status || 500
  let message = err.message || 'Internal Server Error'
  let errors = undefined

  // If the error is not operational, avoid leaking sensitive info
  if (!err.isOperational && !(err instanceof zod.ZodError)) {
    statusCode = 500
    message = 'Internal server error'
  } else if (err instanceof zod.ZodError) {
    statusCode = 400
    message = 'Invalid request data. Please review request and try again'
    errors = formatZodErrors(err)
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      errors,
      //   ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  })
}
