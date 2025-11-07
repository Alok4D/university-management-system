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

export const AuthValidation = {
    loginValidationSchema
}