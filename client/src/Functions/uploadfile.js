import storage from '../firebase';

const storageRef = storage.ref();

const uploadfile =async (bsonobj)=>{ //bson object from webhook (object of objects)
    
    var pdfRef = storageRef.child('pdf/text.pdf')

    var bsonarr= Object.values(bsonobj);  //converting object of objects to array of objects
    var bufferarr = [];
    bsonarr.forEach(obj=>{
        bufferarr.push(parseInt(Object.values(obj)))  //converting array of objects to an array of integers
    })

    var bytearr = new Uint8Array(bufferarr);  //converting array to Uint8Array/byte array

    var blobPDF =  new Blob([ bytearr ], { type : 'application/pdf'});
    const upload = await pdfRef.put(blobPDF);
    const getUrl = await pdfRef.getDownloadURL();
    console.log(upload);
    const res = {
        url: getUrl,
        file: bufferarr
    }
    return res;  
} 

export {uploadfile};