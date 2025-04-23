import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";
import {UploadedFile} from 'express-fileupload'
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINAY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductsController { 
    async handle(req: Request, res: Response) {
        
        const { name, price, description, category_id } = req.body;

        const createProductService = new  CreateProductService();

        if (!req.files || Object.keys(req.files).length === 0) {
            throw new Error("error upload file");
        } else {
            const file: UploadedFile = req.files['file'];

            const resultFile = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, function(error, result) {
                    if ( error ) {
                        reject(error)
                        return;
                    }

                    resolve(result)
                }).end(file.data)
            })

            const { originalname, filename: banner } = req.file;

            const product = await createProductService.execute({
                name, 
                price, 
                description, 
                banner, 
                category_id
            });

            return res.json(product)
        }


    }
}

export { CreateProductsController }