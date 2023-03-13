import React from "react";
import {useState, useRef} from "react"
import {useRouter} from "next/router"
import axios from "axios";
import BeatLoader from 'react-spinners/BeatLoader'

function EmailToken() {
    const [Load, setLoad] = useState(false)
    const [msg, setMsg] = useState(false)
    const [Verify, setVerify] = useState(false)
    const [VerifyLoad, setVerifyLoad] = useState(false)
    const inputRef = useRef()
	const router = useRouter();

	const TokenUrl = "https://copyoptions.onrender.com/api/user/resend-pin";
    const VerifyUrl = "https://copyoptions.onrender.com/api/user/confirm-email"

	const sendToken = async () => {
        setLoad(true)
		
        await axios.post(
			TokenUrl,
			{
				email: cookies.userData.email,
			},
			{
				headers: {
					Authorization: `Bearer ${cookies.userToken}`,
				},
			},
		).then((res)=> {
            setLoad(false)
            setMsg(true)
        }).catch((err)=> {
            alert(err)
        })

	};


    const VerifyToken = async () => {
        // console.log( typeof inputRef.current.value)
        // setVerifyLoad(true)
		
        // await axios.put(
		// 	VerifyUrl,
		// 	{
		// 		pin: inputRef.current.value
		// 	},
		// 	{
		// 		headers: {
		// 			// Authorization: `Bearer ${cookies.userToken}`,
		// 		},
		// 	},
		// ).then((res)=> {
        //     setVerifyLoad(false)
        //     setVerify(true)
        //     // router.push("/account/verify")
        // }).catch((err)=> {
        //     alert(err)
        // })(
        JSON.parse(localStorage.getItem("userData")).role === "Admin" ? router.push("/admin") : router.push("/assets")
	};

    

    

	return (
		<div className='flex items-center justify-center items-center  h-[100vh]'>
			<div className='bg-gray-100 shadow-md shadow-gray-700 w-[95%] p-4 md:w-[50rem] mx-auto py-[4rem] '>
				<div className='flex flex-col space-y-4  justify-center'>
					<p className='text-[1.2rem] font-bold text-center mb-6'>
						{Verify === true ? "Email Verified Successfully" : msg ? "Token Sent Successfully" : `Please input the token sent to to verify
						your email`}
					</p>

					<label className='md:w-[40%] w-[70%] mx-auto'>						
						<input
							type='text'
                            ref={inputRef}
							placeholder='Enter Token'
							className='p-2 outline-none w-full mx-auto rounded-md'
						/>
					</label>
					<div
						className='text-white  cursor-pointer !mt-14  font-semibold rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={sendToken}
					>
						{Load ? <BeatLoader color="white" /> : "Request Token"}                    
                        
					</div>

					<div className='text-white  cursor-pointer font-semibold rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={VerifyToken}
                    
                    >
						{VerifyLoad ? <BeatLoader color="white" /> : "Submit"} 
					</div>
				</div>
			</div>
		</div>
	);
}

export default EmailToken;
