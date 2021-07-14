import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './Styles/Filedata.css'
import XLSX from 'xlsx';
import DataTable from "react-data-table-component";
import {create_many} from "../../Functions/realm";

export default function Filedata(props){
    
    const [items, setItems] = useState([]);
    const [userid,setUserid]= useState(""); 

    useEffect(()=>{
      let userstring = localStorage.getItem('user');
      setUserid(userstring);
    },[])

    const readExcel = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);  
        };
      });
      promise.then((data)=>{
        setItems(data);
      })
    };

    const handleSubmit=async (e)=>{
      e.preventDefault();
      const res =await create_many(props.app,items,userid);
      console.log(res);
    }
    
    const columns = [
      {
        name: "Title",
        selector: "title",
      },
      {
        name: "Content",
        selector: "content",
      },
    ];
  


    return (
      <div className="filedata_container">
        <Link style={{ textDecoration: 'none' }} to="/">
                <Button className="fd_btn" variant="contained" color="primary">Home</Button>
        </Link>
          <input className="fd_input"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log(file);
              readExcel(file);
            }}
          />
          <div className="fd_table">

            <DataTable
              className="fd"
              title="File Data"
              columns={columns}
              data={items}
            />  
          </div>

          <div className="fd_submit_div">
            <input
                  type="submit"
                  className="fd_submit" 
                  value="submit"
                  onClick={handleSubmit}
            />
          </div>
    </div>)
}