import React, { useState,useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';  
import {send_mail} from '../../Functions/realm';
import {textToPdf} from '../../Functions/textToPdf';
import convertFromHtml from 'html-to-draft'
import {convertFromHTML, ContentState,convertToRaw,
    EditorState,} from 'draft-js'
import "../Note/Styles/RichEditor.css";

const Richtexttable =(props)=> {
 
    const [email,setEmail] = useState("");
    const [url, setUrl] = useState("");
    const content = {"entityMap":{},"blocks":[{"key":"637gr","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};   
    const [contentState,setContentState]=useState(content);

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );

    const handleEditorChange = (state) => {
        setEditorState(state);
        setContentState(convertToRaw(editorState.getCurrentContent()));
        console.log(ContentState)
    }  

    const sendMail = async (event)=>{
        event.preventDefault();
        console.log(contentState);
        // send_mail(props.app,email,'tempfile',url).then((res)=>{
        //     console.log("sent mail!");
        //     console.log(res);
        // }).catch(err=>{
        //     console.log(err);
        // });
      }
      
      const handleChange =(e,html)=>{
          e.preventDefault();
          console.log(html)
        const blocksFromHTML = convertFromHTML(html);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
          );
          console.log(convertToRaw(state));
      }

  const editorRef = useRef(null);


  return (
    <div className="App">
      <h1>React Editors</h1>
      <Editor
         editorState={editorState}
            onEditorStateChange={handleEditorChange}
         apiKey="juw0tabw0tn3hwrq1h2wqvlt3zf5up5rzrv5kb7yyodd8e5z"
         onInit={(evt, editor) => editorRef.current = editor}
         init={{
           height: 400,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onChange={(e)=>handleChange(e,editorRef.current.getContent())}
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
            onClick={(e)=>
                textToPdf(props.app,contentState).then((res)=>{
                            setUrl(res.url);
            })}
        >
            generate pdf
        </button>  
            <br/>
            <br/>
        {url? <a href = {url}  className="link">Download Pdf</a>:<span></span>}
            <br/>
    </div>
  );
}

export {Richtexttable}