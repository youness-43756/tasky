export const loginSchema = (loginData: any) => {
  let data = { email: "", name: "", password: "", confirmPassword: "" };
  const dataLength: Number = 6;

  if (loginData.name?.length < dataLength) {
    data = { ...data, name: "*name must be at least 6 long." };
  }
  if (loginData.email.length < dataLength) {
    data = { ...data, email: "*Invalid email." };
  }
  if (loginData.password.length < dataLength) {
    data = { ...data, password: "*password must be at least 6 long." };
  }
  if (
    loginData.confirmPassword !== loginData.password ||
    loginData.confirmPassword.length < dataLength
  ) {
    data = { ...data, confirmPassword: "*password not mutch." };
  }
  return data;
};

// import { z } from 'zod'

// export const SignupFormSchema = z.object({
//   name: z
//     .string()
//     .min(2, { message: 'Name must be at least 2 characters long.' })
//     .trim(),
//     username: z.string().email({ message: 'Please enter a valid email.' }).trim(),
//   password: z
//     .string()
//     .min(8, { message: 'Be at least 8 characters long' })
//     .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
//     .regex(/[0-9]/, { message: 'Contain at least one number.' })
//     .regex(/[^a-zA-Z0-9]/, {
//       message: 'Contain at least one special character.',
//     })
//     .trim(),
// })

// export type FormState =
//   | {
//       errors?: {
//         name?: string[]
//         email?: string[]
//         password?: string[]
//       }
//       message?: string
//     }
//   | undefined
