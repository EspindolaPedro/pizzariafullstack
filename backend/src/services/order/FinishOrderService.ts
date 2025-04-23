import prismaClient from "../../prisma";

interface IdOrder {
    order_id: string
}

class FinishOrderService {
    async exec({order_id}: IdOrder) {

        const orders = await prismaClient.order.update({
            where: {
                id: order_id
            }, 
            data: {
                status: true
            }
        });

        return orders;


    }
}

export { FinishOrderService }