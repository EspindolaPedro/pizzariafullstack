import prismaClient from "../../prisma";

interface ProductReq{
    category_id:string;
}

class ListByCategoryService {
    async exec({ category_id }: ProductReq ) {
        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id
            }
        })

        return findByCategory;
    }   
}

export {ListByCategoryService}