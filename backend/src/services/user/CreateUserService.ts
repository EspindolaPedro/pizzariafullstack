import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string,
    email: string,
    password: string,
}

class CreateUserService {

    /*
    *gerar novo usuário
    */
    async execute({name, email, password}: UserRequest) {
        
        if (!email) {
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }
        const hashpass = await hash(password, 8)
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: hashpass
            },
            select: {
                id:true,
                email:true,
                name:true
            }
        })

        return { user }

    }
}

export { CreateUserService }