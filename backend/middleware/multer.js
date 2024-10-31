import multer from "multer"

const storage= multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload=multer({storage})

export default upload


// multer.diskStorage: This function creates a storage engine for storing files locally on the disk.

// filename: This option specifies how the files will be named when saved. It takes a function with parameters req, file, and callback.

// req: The HTTP request object.

// file: The file object being uploaded.

// callback: A function to pass the result. In this case, the filename callback sets the file's name to its original name (file.originalname).

// file.originalname: This is the name of the file as it was uploaded from the client side 