import React from "react";
import {useState, useRef} from "react"
import {useRouter} from "next/router"
import axios from "axios";
import BeatLoader from 'react-spinners/BeatLoader'

function ForgotPassword() {
    const [Load, setLoad] = useState(false)
    const [msg, setMsg] = useState(false)
    const [Verify, setVerify] = useState(false)
    const [VerifyLoad, setVerifyLoad] = useState(false)
    const inputRef = useRef()
	const router = useRouter();

	

    const ForgotPassword = async () => {        
        setVerifyLoad(true)
		
		
        await axios.post("https://cluth-space.onrender.com/api/auth/forgot-password",
			{
				email: inputRef.current.value
			},
		).then((res)=> {
            setVerifyLoad(false)        
            setVerify(true)
			
			
			setTimeout(() => {
				router.push("/ResetPassword")
			}, 2000)
        }).catch((err)=> {
            return 
        })
        
	};

    

    

	return (
		<div className='flex items-center justify-center items-center  h-[100vh]'>
			<div className='bg-gray-100 shadow-md shadow-gray-400 w-[95%] p-4 md:w-[50rem] mx-auto py-[4rem] '>
				<div className='flex flex-col space-y-4  justify-center'>
					<p className='text-[1.1rem] font-medium text-center mb-6' style={{ color: "#051036" }}>
						{Verify === true ? "Reset password code have been sent to this email." : msg ? "Token Sent Successfully" : `Please enter your registered email address`}
					</p>

					<label className='md:w-[40%] w-[70%] mx-auto'>						
						<input
							type='text'
                            ref={inputRef}
							placeholder='Enter Email'
							className='p-2 outline-none w-full mx-auto rounded-md'
							style={{
									color:"rgb(0, 13, 29)",
									background: "rgba(125, 135, 146, 0.08)"
								}}
						/>
					</label>
					
					
					<div className='text-white  cursor-pointer  !mt-10 font-medium rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={ForgotPassword}
                    
                    >
						{VerifyLoad ? <BeatLoader color="white" /> : "Submit"} 
					</div>
					
					


					
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
