import { z } from 'zod'

export const createRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').max(100, 'Room name too long'),
})

export const updateRoomSchema = z.object({
  name: z.string().min(1, 'Room name is required').max(100, 'Room name too long'),
})

export type CreateRoomDto = z.infer<typeof createRoomSchema>
export type UpdateRoomDto = z.infer<typeof updateRoomSchema> 