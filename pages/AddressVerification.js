import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import { BeatLoader } from "react-spinners";


const AddressVerification = () => {    

    const [profile, setProfile] = useState(null)
    const [file, setFile] = useState()
    const [loader, setloader] = useState(false)
    const router = useRouter();
    const url = " https://cluth-space.onrender.com/api/verify/address-bill"
   

    const handlePhoto = async () => {
        if (file) {
            setloader(true)

            console.log('starting')


            // initialize the form data
            const formData = new FormData()

            // append the file form data to 
            formData.append("addressBill", file)
            console.log(formData)



            await axios.put(url,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                })
                .then(function (response) {
                    console.log(response)
                    if (response.data.message == "IMAGE UPLOADED") {                        
                        setloader(false)
                        router.push("/assets")
                        
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
        <div className="adv__container">
            <div className="adv__con">
                <div className="adv__box">
                    <div className="adv__box__info">
                        <div className="adv__head">
                            <h1>Address Verification</h1>
                            <p>Please verify your address by uploading a recent utility bill</p>                           
                        </div>

                        <div className="adv__inputs">
                            <div className="adv__input__div">
                                <label style={{ width: "100%", cursor: "pointer" }} htmlFor="address" className="adv__input__button">
                                    Select bill
                                </label>
                                <input
                                    type="file"
                                    placeholder=""
                                    value=""
                                    onChange={(event) => setFile(event.target.files[0])}
                                    hidden
                                    id="address"
                                />
                                <p>{file?.name}</p>
                            </div>

                            <div className="btn bg-green py-2 text-white px-12 w-full rounded-lg" style={{ cursor: "pointer" }} onClick={handlePhoto}>
                            {loader ?<BeatLoader color='#36d7b7' size={7} /> : <p className="!text-white">Submit</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressVerification
