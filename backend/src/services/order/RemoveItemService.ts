/**
    deletar item

    recebe o item_id

    deleta no db

 */

import prismaClient from "../../prisma"

interface itemRemove{
    item_id:string
}

class RemoveItemService{
    async exec({item_id}:itemRemove){

        const order = await prismaClient.item.delete({
            where:{
                id:item_id
            }
        })
        return order;

    }
}

export {RemoveItemService}