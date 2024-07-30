import { z } from 'zod'
import * as m from '$lib/paraglide/messages'

export const loginSchema = z.object({
  email: z
    .string({ message: m.must_be_a_string() })
    .email({ message: m.must_be_a_valid_email() }),
  password: z
    .string({ message: m.p_must_be_a_string() })
    .min(8, { message: m.p_must_be_at_least_8_characters() }),
})

export const registerSchema = z
  .object({
    email: z
      .string({ message: m.must_be_a_string() })
      .email({ message: m.must_be_a_valid_email() }),
    password: z
      .string({ message: m.p_must_be_a_string() })
      .min(8, { message: m.p_must_be_at_least_8_characters() })
      .regex(/[a-z]/, {
        message: m.p_must_contain_at_least_one_lowercase_letter(),
      })
      .regex(/[A-Z]/, {
        message: m.p_must_contain_at_least_one_uppercase_letter(),
      })
      .regex(/\d/, { message: m.p_must_contain_at_least_one_number() })
      .regex(/[\W_]/, {
        message: m.p_must_contain_at_least_one_special_character(),
      }),
    confirmPassword: z.string({ message: m.must_be_a_string() }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: m.passwords_dont_match(),
    path: ['confirmPassword'],
  })

export const passwordResetSchema = z.object({
  email: z
    .string({ message: m.must_be_a_string() })
    .email({ message: m.must_be_a_valid_email() }),
})

export const passwordConfirmSchema = z
  .object({
    password: z
      .string({ message: m.p_must_be_a_string() })
      .min(8, { message: m.p_must_be_at_least_8_characters() })
      .regex(/[a-z]/, {
        message: m.p_must_contain_at_least_one_lowercase_letter(),
      })
      .regex(/[A-Z]/, {
        message: m.p_must_contain_at_least_one_uppercase_letter(),
      })
      .regex(/\d/, { message: m.p_must_contain_at_least_one_number() })
      .regex(/[\W_]/, {
        message: m.p_must_contain_at_least_one_special_character(),
      }),
    confirmPassword: z.string({ message: m.must_be_a_string() }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: m.passwords_dont_match(),
    path: ['confirmPassword'],
  })

export type LoginSchema = typeof loginSchema
export type RegisterSchema = typeof registerSchema
export type PasswordResetSchema = typeof passwordResetSchema
export type PasswordConfirmSchema = typeof passwordConfirmSchema
