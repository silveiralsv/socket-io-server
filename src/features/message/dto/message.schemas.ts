import { z } from 'zod'

export const createMessageSchema = z.object({
  text: z.string().min(1, 'Message text is required').max(1000, 'Message too long'),
  roomId: z.number().int().positive('Room ID must be a positive integer'),
})

export const updateMessageSchema = z.object({
  text: z.string().min(1, 'Message text is required').max(1000, 'Message too long'),
})

export const messageQuerySchema = z.object({
  roomId: z.string().optional(),
  userId: z.string().optional(),
  page: z.string().optional().transform(val => parseInt(val || '1')),
  limit: z.string().optional().transform(val => parseInt(val || '20')),
})

export type CreateMessageDto = z.infer<typeof createMessageSchema>
export type UpdateMessageDto = z.infer<typeof updateMessageSchema>
export type MessageQueryDto = z.infer<typeof messageQuerySchema> 