/*
  recebe order_id
  product_id
  amout

  inicia o service
  executa a acao
 */

import { AddItemService } from "../../services/order/AddItemService";
import { Request, Response } from "express";
  
class AddItemController{
    async handle(req:Request,res:Response){
        const {order_id, product_id, amount} = req.body;

        const addItemService = new AddItemService();
        
        const item = await addItemService.exec({
            order_id,
            product_id,
            amount
        });
        return res.json(item)


    }
}

export {AddItemController}