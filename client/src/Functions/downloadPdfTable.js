import storage from '../firebase';

const storageRef = storage.ref();
//Import notes to PDF in table format and Download
const downloadPdfTable=async (app,data)=>{
    var pdfRef = storageRef.child('pdf/notesTable.pdf')

    const pdfBuffer = await app.currentUser.functions.pdfTableBuffer(data);

    var bufferArr = new Uint8Array(Object.values(pdfBuffer));

    var blobPDF =  new Blob([ bufferArr ], { type : 'application/pdf'});
    const upload = await pdfRef.put(blobPDF)
    const getUrl = await pdfRef.getDownloadURL()
    console.log(upload);

    return getUrl;  
   }

export {downloadPdfTable};

//*using jspdf and jspdf-autotable
/*
   const doc = new jsPDF();
    var col = ["Title","Contents"];
    var rows=[];
    doc.text(13, 10, 'NOTES');
    doc.setFontSize(9);
    data.forEach((obj,i)=>{
     var temp = [obj.title,obj.content];
     rows.push(temp);
    });
    doc.autoTable(col, rows,{startY: 20});
*/