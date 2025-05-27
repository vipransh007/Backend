import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    cloudinary.config({ 
        cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
        api_key: 'process.env.CLOUDINARy_API_KEY', 
        api_secret: 'process.env.CLOUDINARY_API_SECRET' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath) return null
            // uploading the file on cloudinary
           const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            // file uploadation is successfull
            console.log("file has been uploaded ", response.url);
            return response
            
        } catch (error) {
            fs.unlinkSync(localFilePath) //removing localy saved file and then unlinks the file
        }
     }
export {uploadOnCloudinary}

