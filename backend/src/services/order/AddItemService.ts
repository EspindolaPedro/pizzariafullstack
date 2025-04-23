/*
recebe order_id
product_id
amount int

cria um pedido no banco de dados 

*/

import prismaClient from "../../prisma";

interface AddItemReq{
    order_id:string;
    product_id:string;
    amount:number;
}

class AddItemService{
    async exec({order_id, product_id, amount}:AddItemReq) {

        const item = await prismaClient.item.create({
            data:{
            order_id: order_id,
            product_id: product_id,
            amout: amount
            }
        })
        return item;


    }
}

export { AddItemService }