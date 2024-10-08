import { z } from "zod";
import { ROLE, STATUS } from '../models/User';

// Validation schema for updating user status
export const updateUserStatusSchema = z.object({
    status: z.enum([STATUS.ACTIVE, STATUS.INACTIVE, STATUS.PENDING, STATUS.SUSPENDED]),
});

// Validation schema for updating user role
export const updateUserRoleSchema = z.object({
    role: z.enum([ROLE.USER, ROLE.MODERATOR, ROLE.ADMIN]),
});

// Schema for pagination query params
export const paginationSchema = z.object({
    page: z.number().default(1).optional(),
    limit: z.number().default(10).optional(),
    search: z.string().optional(),
});
