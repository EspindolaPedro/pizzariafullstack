import { Request,  Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController {
    
    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const authUserService = await new AuthUserService().execute({
            email,
            password
        });

        return res.json(authUserService)
    }
}

export { AuthUserController }