import { Request, Response } from "express";

import  { CreateCategoryService }  from '../../services/category/CreateCategoryService';

class CreateCategoryController {
    async handle(req: Request, res: Response) {

        const {name} = req.body;
        //inicia o servico
        const createCategoryService = new CreateCategoryService();
        //executa o servico
        const category  = await createCategoryService.execute({
            name
        }); 
        //retorna o servico
        return res.json(category);

    }


}

export {CreateCategoryController}