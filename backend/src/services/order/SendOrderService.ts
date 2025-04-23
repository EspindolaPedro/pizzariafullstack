import prismaClient from "../../prisma";

interface OrderReq{
    order_id: string;
}
// update na tablea order (tirar de rascunho)
// pegar onde esta o id enviado e mudar o rascunho para false

class SendOrderService {
    async exec({ order_id }: OrderReq) {
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data: {
                draft: false
            }
        });
        return order;

    }


}

export { SendOrderService }