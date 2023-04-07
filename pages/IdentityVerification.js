import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import {useRouter} from "next/router"

import { BeatLoader } from "react-spinners";


const IdentityVerification = () => {

    const [loader, setloader] = useState(false)
    const [file, setFile] = useState()
    const [msg, setMsg] = useState(false)
    const [Image1, setImage1] = useState()
    const [Image2, setImage2] = useState()
    const [file2, setFile2] = useState()  
    const router  = useRouter()
    var i ;

    

    const handlePhoto = (event, i) => {
        if(i === 1){
            setFile(event.target.files[0])  
            let reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
          
            reader.onload = function() {      
               setImage1(reader.result)                               
            };
          
            reader.onerror = function() {
             return
            };
        }

        if(i === 2){
            setFile2(event.target.files[0])  
            let reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
          
            reader.onload = function() {      
               setImage2(reader.result)
            };
          
            reader.onerror = function() {
              return
            };
        }            

         
    }

    const submitPhoto = async () => {
        if (file) {
            setloader(true)

           

            // initialize the form data
            const formData = new FormData()

            // append the file form data to 
            formData.append("frontImage", file)
            formData.append("backImage", file2)
      



            await axios.put(" https://cluth-space.onrender.com/api/verify/front-back",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                })
                .then(function (response) {
                   
                    if (response.data.message == "IMAGE UPLOADED") {                        
                        setloader(true)
                        setMsg(true)

                        setTimeout(() => {
                            router.push("/Verification")
                        }, 3000);
                    }
                })
                .catch((err) => {
                
                    alert(err)
                    setloader(false)
                })


        } else {
            alert("SELECT A FILE")
            return
        }
    }

    return (
        <div className="idv__container">
            <div className="idv__con">
                <div className="idv__box">
                    <div className="idv__head">
                        <h1>Verify Your Identity</h1>
                        <p>
                            Please verify your identity by uploading a valid government issued
                            identification card.
                        </p>
                    </div>

                    <div className="idv__inputs">
                        <p>
                            You may experience difficulties when uploading from an ios device. Make
                            sure your browser has camera access in your ios settings.
                        </p>
                        <div className="idv__input__div">
                            <div className="rounded-md p-2">
                            </div>
                            <label style={{ width: "100%", cursor: "pointer" }} htmlFor="front" className="idv__input__button">
                                

                                {Image1 ? <img src={Image1} width="300px"  alt="image" /> : "Select front"}
                            </label>
                            <input
                                type="file"
                                id="front"
                                hidden
                                placeholder=""
                                value=""
                                onChange={(event) => handlePhoto(event, i = 1)}
                            />
                            <p>{file?.name}</p>
                        </div>
                        <div className="idv__input__div">
                            <label htmlFor="back" style={{ width: "100%", cursor: "pointer" }} className="idv__input__button">
                                

                                {Image2 ? <img src={Image2} width="300px" alt="image"  /> : "Select back"}

                            </label>
                            <input
                                type="file"
                                id="back"
                                hidden
                                placeholder=""
                                value=""
                                onChange={(event) => handlePhoto(event, i = 2)}
                            />
                            {file2?.name}
                        </div>

                            {msg && <p className="text-center text-green-500">Image Uploaded Successfully</p>}

                        <div className="bg-green rounded-lg w-full py-4 !text-white" onClick={submitPhoto} style={{ cursor: "pointer" }}>
                        {loader ? <BeatLoader color='#FFF' size={7} /> : <p className="!text-white">Submit</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdentityVerification
