import express from 'express';
import multer from 'multer';
import path from 'path';


const router = express.Router();


const storage = multer.diskStorage({
    destination(req,file,cb)
    {
        cb(null,'uploads/')
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const checkFileType = (file,cb)=>{
    console.log(file.originalname);
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname));
    const mimeType = fileTypes.test(file.mimetype);
    if(extname && mimeType)
    {
        return cb(null,true)
    }else{
        return cb('Invalid file type');
    }
}
const upload =multer({
    storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
})

router.post('/',upload.single('image'),(req,res)=>{
    console.log(req.file.path);
    res.send(`/${req.file.path}`);
})



export default router;