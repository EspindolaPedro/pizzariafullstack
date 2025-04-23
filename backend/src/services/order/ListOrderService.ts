import prismaClient from "../../prisma";
// Busque na table orders o que nao esta em rascunho e nao terminou o pedido.
// orderBy: ... qual criou primeiro (desc),  
// rotorna 

class ListOrderService {
    async exec() {

        const orders = await prismaClient.order.findMany({
            where: {
                draft: false,
                status: false,
            },
            orderBy: {
                created_at:'desc'
            }                 
        });

        return orders;


    }
}

export {ListOrderService}