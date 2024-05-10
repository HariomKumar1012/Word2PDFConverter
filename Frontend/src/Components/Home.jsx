import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";
import axios from 'axios';


const Home = () => {
    const [selectFile, setSelectFile] = useState(null);
    const [convert, setConvert] = useState("");
    const [downloadError, setDownloadError] = useState("");
    console.log(selectFile);

    const handleFileChange = (e)=>{
        setSelectFile(e.target.files[0]);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!selectFile){
            setConvert("Please select the file");
            return;
        }
        const formData = new FormData();
        formData.append("file",selectFile);
        try{
            const response = await axios.post("http://localhost:3000/convertFile",formData,{
                responseType: "blob",
            })
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download",selectFile.name.replace(/\.[^/.]+$/,"")+".pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setSelectFile(null);
            setDownloadError("");
            setConvert("File Converted to PDF Successfully");
        }catch(err){
            console.log(err);
            if(err.response && err.response.status == 400){
                setDownloadError("Error Occured: ",err.response.data.message);
            }else{
                setConvert("");
            }
        }
    }
    return (
        <>
            <div className='max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 bg-gray-800'>
                <div className='flex h-screen items-center justify-center'>
                    <div className='border-2 border-solid border-indigo-300 rounded-2xl shadow-2xl shadow-indigo-600 py-2 px-4 md:px-8 md:py-6'>
                        <h1 className='text-3xl font-bold text-center mb-4 text-white'>Convert <span className='text-blue-600'>Word</span> to <span className='text-blue-600'>PDF</span></h1>
                        <p className='text-sm text-center mb-5 text-white'>
                            Convert your Word documents to PDF easily and make your documents portable
                        </p>
                        <div className='flex flex-col items-center space-y-4'>
                            <input type='file' accept='.doc,.docx' onChange={handleFileChange} className='hidden' id='FileInput'></input>
                            <label htmlFor='FileInput' className='w-full flex item-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-400 hover:bg-blue-600 duration-300 hover:text-white'>
                                <FaFileWord className='text-3xl mr-4' />
                                <span className='text-2xl mr-2'>{selectFile?selectFile.name:"Choose File"}</span>
                            </label>
                            <button onClick={handleSubmit} disabled = {!selectFile} className='text-white bg-blue-500 hover:bg-blue-800 duration-300 font-bold px-4 py-2 rounded-lg disabled:bg-gray-500 disabled:pointer-events-none'>Convert File</button>
                            {convert && (<div className='text-green-500 text-center'>{convert}</div>)}
                            {downloadError && (<div className='text-red-500 text-center'>{downloadError}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
