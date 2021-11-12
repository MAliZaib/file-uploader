import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FileUploadProgress  from 'react-fileupload-progress';
 import axios from "axios" ; 
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { useState } from 'react';
// import { ProgressBar } from 'react-bootstrap';
import ProgressBar from "@ramonak/react-progress-bar";
export default function Home() {
  const [percent , setPercent] = useState(0)
 /*  const fileParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' }
}

const onFileChange = ({ meta, file }, status) => { 
    console.log(status, meta, file) 
}

const onSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove())
}

const getFilesFromEvent = e => {
    return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
        })
    })
} */

/* const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'

    return (
        <label className="btn btn-danger mt-4">
            {textMsg}
            <input
                style={{ display: 'none' }}
                type="file"
                accept={accept}
                multiple
                onChange={e => {
                    getFilesFromEvent(e).then(chosenFiles => {
                        onFiles(chosenFiles)
                    })
                }}
            />
        </label>
    )
} */
const fileUpload = ({target: {files}}) => {
  console.log(files[0]) ; 
  let data = new FormData() ; 
  data.append("file" ,  files[0])

  console.log("data is here" , data)

  const options ={
    onUploadProgress: (progressEvent) =>{
      const {loaded , total} = progressEvent ;
      let percentage = Math.floor((loaded * 100) / total)  ;
      console.log("Percentage is here" , percentage , "% Loaded" , loaded , "of total of" , total )
      if(percentage < 100){
        setPercent(percentage )
      }
    }
  }
  axios.post("https://httpbin.org/post" , data , options)
  .then((res)=>{
    console.log("res is heree" , res)
    setPercent(100) ; 
    setTimeout(()=>{
      setPercent(0) ;
    } , 2000)
  })

}
  return (
		<div className="container mx-auto">
			{/* <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 600, height: 400 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
        <h3>Default style</h3> */}
			{/* <FileUploadProgress key='ex1' url='http://localhost:3000/api/upload'
          onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
          onLoad={ (e, request) => {console.log('load', e, request);}}
          onError={ (e, request) => {console.log('error', e, request);}}
          onAbort={ (e, request) => {console.log('abort', e, request);}}
          /> */}

			<h1>File upload system</h1>
			<input type="file" onChange={fileUpload} />
			{/* <div className="bg-gray-400 w-1/2 mt-4 border border-gray-400 "> */}
      <p>{percent + "%"}</p>
			<div >
        <div>
          {percent > 0 && <ProgressBar bgColor="#60A5FA" isLabelVisible={false} borderRadius={"50px"} completed={percent} />}
        </div>
        
			</div>
		</div>
  );
}
