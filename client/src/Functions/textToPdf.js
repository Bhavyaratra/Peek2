import storage from '../firebase';
// import jsPDF from 'jspdf';
//import pdf from 'pdfjs';


const storageRef = storage.ref();

const textToPdf = async(app,data)=>{
    
    var pdfRef = storageRef.child('pdf/text.pdf')
   
    const pdfBuffer = await app.currentUser.functions.pdftextwithtable(data);

    var bufferArr = new Uint8Array(Object.values(pdfBuffer));

    var blobPDF =  new Blob([ bufferArr ], { type : 'application/pdf'});
    const upload = await pdfRef.put(blobPDF)
    const getUrl = await pdfRef.getDownloadURL()
    console.log(upload);
    const res = {
        url: getUrl,
        file: bufferArr
    }
    return res;  
}

export {textToPdf};