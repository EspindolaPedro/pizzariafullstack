import prismaClient from "../../prisma";

interface OrderReq{
    table:number;
    name?:string;
}

class CreateOrderService {
    async exec({table, name}:OrderReq) {

        const order = await prismaClient.order.create({
            data:{
                table,
                name
            }
        })
        return order;
    }

}

export { CreateOrderService }