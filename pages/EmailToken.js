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

		



	const sendToken = async () => {
        setLoad(true)
        await axios.put(
			"https://cluth-space.onrender.com/api/auth/resend-pin",
			{
				email: JSON.parse(localStorage.getItem("userEmail")),
			},		
		).then((res)=> {
            setLoad(false)
            setMsg(true)
        }).catch((err)=> {
            alert(err)
            setLoad(false)
        })

	};


    const VerifyToken = async () => {        
        setVerifyLoad(true)
		
        await axios.put( "https://cluth-space.onrender.com/api/auth/confirm-pin",
			{
				pin: inputRef.current.value
			},
			{
				
			},
		).then((res)=> {
            setVerifyLoad(false)        
            setVerify(true)
            router.push("/Login")
            localStorage.removeItem("userEmail")
        }).catch((err)=> {
            alert(err)
        })
        
	};

    

    

	return (
		<div className='flex items-center justify-center items-center  h-[100vh]'>
			<div className='bg-gray-100 shadow-md shadow-gray-400 w-[95%] p-4 md:w-[50rem] mx-auto py-[4rem] '>
				<div className='flex flex-col space-y-4  justify-center'>
					<p className='text-[1.1rem] font-medium text-center mb-6' style={{ color: "#051036" }}>
						{Verify === true ? "Email Verified Successfully" : msg ? "Code Sent Successfully" : `Please enter the verification code that was sent to your email`}
					</p>

					<label className='md:w-[40%] w-[70%] mx-auto'>						
						<input
							type='text'
                            ref={inputRef}
							placeholder='Enter Code'
							className='p-2 outline-none w-full mx-auto rounded-md'
							style={{
									color:"rgb(0, 13, 29)",
									background: "rgba(125, 135, 146, 0.08)"
								}}
						/>
					</label>
					
					
					<div className='text-white  cursor-pointer  !mt-14 font-medium rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={VerifyToken}
                    
                    >
						{VerifyLoad ? <BeatLoader color="white" /> : "Submit"} 
					</div>
					
					<div
						className='text-white  cursor-pointer  font-medium rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={sendToken}
					>
						{Load ? <BeatLoader color="white" /> : "Resend Code"}                    
                        
					</div>


					
				</div>
			</div>
		</div>
	);
}

export default EmailToken;
