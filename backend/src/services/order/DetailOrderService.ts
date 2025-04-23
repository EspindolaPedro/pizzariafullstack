
// Busca todos os items que pertecem a um pedido dica no prismaClient: (findMany)
// inclui os detalhes de produtos e da ordem apos o where atraves do relacionamento
import prismaClient from "../../prisma";

interface OrderReq {
    order_id:string
}

class DetailOrderService {
    async exec({order_id}: OrderReq) {

        const orders = await prismaClient.item.findMany({
            where: {
               order_id,
            },
            include: {
                product:true,
                order:true
            }
        });
        return orders;

    }
}
export { DetailOrderService }