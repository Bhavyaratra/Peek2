import storage from '../firebase';
// import jsPDF from 'jspdf';
// import pdf from 'pdfjs';
import {comments} from '../json/comments'
import {styles} from '../json/styles'
const storageRef = storage.ref();

const downloadPDF = async(app,data)=>{
    
    var pdfRef = storageRef.child('pdf/comments.pdf')

    const pdfBuffer = await app.currentUser.functions.pdfBuffer(comments,styles);

    var bufferArr = new Uint8Array(Object.values(pdfBuffer));
    var blobPDF =  new Blob([ bufferArr ], { type : 'application/pdf'});
    const upload = await pdfRef.put(blobPDF)
    const getUrl = await pdfRef.getDownloadURL()
    console.log(upload);
    //var file = new File([blobPDF], "generatedPdf.pdf");
    const res = {
        url: getUrl,
        file: bufferArr
    }
    return res;  


    // const doc = new pdf.Document({
    //     font:    require('pdfjs/font/Helvetica'),
    //     paddingTop: 30 ,
    //     paddingLeft: 50 ,
    //     paddingRight: 50 ,
    //   });
   
    // const header = doc.header()
    // header.pageNumber({textAlign: 'right'})  
    // header.text('This is a header')

    // const footer = doc.footer()
    // footer.pageNumber({ textAlign: 'center' })
    // footer.text("this is footer",{ textAlign: 'right' })
    
   
    // const text = doc.text({fontSize: 22,textAlign:'center'})
    // text.br();
    // text.add("POSTS",{underline:true})
    // text.br();
    // var page = 1;
    // comments.forEach((comment,i)=>{
    //     const heading1 = doc.text({fontSize: 17,destination: page })
    //     heading1.add('Title '+comment.id);
    //     const title = doc.text({fontSize: 14,textAlign:'center',destination: page })
    //     title.add(comment.title)
    //     title.br();
    //     const body = doc.text({fontSize: 11})
    //     body.add('Body: ',{fontSize: 17})
    //     body.br();
    //     body.add(comment.body);
    //     body.br();
     
    //     if((i+1)%3===0){
    //         doc.pageBreak();
    //         page++;
    //     }
    // })
    //  const pdfBuffer = await doc.asBuffer();
 
}


//*jspdf
/*
const downloadPDF=async (data)=>{
    var pdfRef = storageRef.child('pdf/notes.pdf')
    const doc = new jsPDF();
    doc.text(15, 10, 'Text');
    doc.setFontSize(9);

    var splitData = doc.splitTextToSize(data, 180);
    doc.text(15, 20, splitData);
    
    var blobPDF =  new Blob([ doc.output() ], { type : 'application/pdf'});
    const upload = await pdfRef.put(blobPDF)
    const getUrl = await pdfRef.getDownloadURL()
    console.log(upload);
    return getUrl;  
    //doc.save('notes.pdf')
   }
*/   

export {downloadPDF};