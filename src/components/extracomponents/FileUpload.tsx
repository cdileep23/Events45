import React, { Dispatch, SetStateAction } from 'react'

type FileUploaderProps={
    imageUrl:string,
    onFieldChange:(value:String)=>void,
    setFiles:Dispatch<SetStateAction<File[]>>
}

const FileUpload = ({imageUrl,onFieldChange,setFiles}:FileUploaderProps) => {
  return (
    <div>FileUpload</div>
  )
}

export default FileUpload