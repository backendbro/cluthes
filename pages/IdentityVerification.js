import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"

import { ScaleLoader } from "react-spinners";


const IdentityVerification = () => {

    const [loader, setloader] = useState(false)
    const [file, setFile] = useState()
    const [file2, setFile2] = useState()    


    // useEffect(() => {
    //     if (cookies.userData.role == "user") {
    //         console.log("authorized")
    //     } else {
    //         navigate('/login')
    //     }
    // }, [cookies])
    

    const handlePhoto = async () => {
        if (file) {
            setloader(true)

            console.log('starting')


            // initialize the form data
            const formData = new FormData()

            // append the file form data to 
            formData.append("frontImage", file)
            formData.append("backImage", file2)
            console.log(formData)



            await axios.put(url,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.userToken}`
                    }
                })
                .then(function (response) {
                    console.log(response)
                    if (response.data.message == "IMAGE UPLOADED") {
                        setCookie('userData', response.data.user, { path: '/' });
                        setloader(true)
                        router.push("/assets")
                    }
                })
                .catch((err) => {
                    // setWithdraw(null)
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
                            <label style={{ width: "100%", cursor: "pointer" }} htmlFor="front" className="idv__input__button">
                                Select front
                            </label>
                            <input
                                type="file"
                                id="front"
                                hidden
                                placeholder=""
                                value=""
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                            <p>{file?.name}</p>
                        </div>
                        <div className="idv__input__div">
                            <label htmlFor="back" style={{ width: "100%", cursor: "pointer" }} className="idv__input__button">
                                Select back
                            </label>
                            <input
                                type="file"
                                id="back"
                                hidden
                                placeholder=""
                                value=""
                                onChange={(event) => setFile2(event.target.files[0])}
                            />
                            {file2?.name}
                        </div>
                        <div className="idv__button" onClick={handlePhoto} style={{ cursor: "pointer" }}>
                        {loader ? <ScaleLoader className="w-12 h-6 mx-auto" color="white" /> : <p>Submit</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IdentityVerification
