import React from 'react';
import {useState} from "react";
import {send_mail} from '../../Functions/realm';
import {uploadfile} from '../../Functions/uploadfile';
import {posttextapi} from '../../Functions/api/posttextapi';
import { EditorState } from 'draft-js';
import { convertToRaw  } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../Note/Styles/RichEditor.css';
import { tabledata } from '../../json/tabledata';

export const InputPDF =(props)=>{
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );


    const [email,setEmail] = useState("");
    const [url, setUrl] = useState("");
    const content = {"entityMap":{},"blocks":[{"key":"637gr","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};   
    const [contentState,setContentState]=useState(content);

    const handleEditorChange = (state) => {
        setEditorState(state);
        setContentState(convertToRaw(editorState.getCurrentContent()));
    }

    const sendMail = async (event)=>{
        event.preventDefault();
        console.log(contentState)
        send_mail(props.app,email,'tempfile',url).then((res)=>{
            console.log("sent mail!");
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
      }
      
    const handleAddtable=()=>{
        contentState.table=tabledata;
        setContentState({...contentState})
    }  
    return(
    <div>
        
        <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
                options: ['inline', 'fontSize', 'textAlign', 'remove', 'history'],
                inline:{
                    options:['bold','italic','underline','strikethrough']
                }

            }}
        />
        <div className ="input-mail-container" >
            <p>Enter Mail</p>
                <input 
                    className="input-mail"
                    type="text"
                    required
                    placeholder="Enter mail"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            <button 
                type="submit"
                className="input-mail-btn"
                onClick={(e)=>sendMail(e)}
            >
                send mail
            </button>    
        </div>
        <button 
                type="submit"
                className="input-pdf-btn"
                onClick={(e)=>posttextapi(contentState).then(res=>{
                    uploadfile(res)
                    .then(data=>{
                        setUrl(data.url);
                    })
                })}
            >
                generate pdf
            </button>   
        <button 
                type="submit"
                className="input-pdf-btn"
                onClick={handleAddtable}
            >
               Add table
            </button>   
                <br/>
                <br/>
            {url? <a href = {url}  className="link">Download Pdf</a>:<span></span>}
                <br/>
           
    </div>)

}