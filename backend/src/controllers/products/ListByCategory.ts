import { Request,Response } from "express";
import { ListByCategoryService } from "../../services/products/ListByCategoryService";

class ListByCategoryController{
    async handle(req: Request, res: Response) {
        
        const category_id = req.query.category_id as string;
        
        if (category_id === '') return false;
        
        const listByCategory = new ListByCategoryService();
        const products = await listByCategory.exec({
            category_id
        });
        return res.json(products)
    }
}

export {ListByCategoryController}