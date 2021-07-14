import storage from '../firebase';
// import XLSX from 'xlsx';

const storageRef = storage.ref();

function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

const downloadExcel=async (app,data)=>{
    var excelRef = storageRef.child('excel/notes.xlsx');

     const fileType = 'application/xlsx;charset=UTF-8';
    // // convert ObjectId to string
    // const dataString = data;
    // dataString.forEach((obj)=>obj._id=obj._id.toString());
    // const ws = XLSX.utils.json_to_sheet(dataString);
    // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    // const excelB64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    const excelB64 = await app.currentUser.functions.excelB64(data);
    const excelBuffer=base64ToArrayBuffer(excelB64);
    const excelBlob = new Blob([excelBuffer], {type: fileType});
    const upload = await excelRef.put(excelBlob)
    const getUrl = await excelRef.getDownloadURL()
    console.log(upload);

    return getUrl;  
}

export {downloadExcel};
