import z from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({
            message: "Id id required!"
        }),
        password: z.string({
            message: "Password required!"
        })
    })
})

const changePasswordValidationSchema = z.object({
    body: z.object({
       oldPassword: z.string({
        message: "Old Password is required!"
       }),
        newPassword: z.string({
            message: "Password required!"
        })
    })
})

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema
}