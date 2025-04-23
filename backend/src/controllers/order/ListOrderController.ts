
// O service náo esepra nadam apenas instancia e retorna.
import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
    async handle(req:Request, res:Response) {

        const listOrderService = new ListOrderService();
        
        const orders = await listOrderService.exec();

        return res.json(orders)


    }
}

export {ListOrderController}