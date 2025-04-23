import prismaClient from "../../prisma";

interface OrderReq{
    order_id:string;
}


class RemoveOrderService {
    async exec({ order_id }:OrderReq) {

        const order = await prismaClient.order.delete({
            where:{
                id:order_id,
            }
        })

        return order;

    }
}

export { RemoveOrderService }