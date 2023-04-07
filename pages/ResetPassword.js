import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import {useRouter} from "next/router"
import axios from "axios";
import {BeatLoader} from "react-spinners";

const ResetPassword = () => {
	const router = useRouter();
    

	const [name, setName] = useState("");
	const [body, setBody] = useState("");
	const [loader, setLoader] = useState(false);
	const [msg, setMsg] = useState("");    	
    const codeRef = useRef(null)
    const passwordRef = useRef(null)
    

	
    const [Verify, setVerify] = useState(false)
    const [VerifyLoad, setVerifyLoad] = useState(false)
	

	

	const ResetPassword = async (e) => {
		
        
		
		e.preventDefault();		
		setLoader(true);
		axios
			.post(
                "https://cluth-space.onrender.com/api/auth/reset-password",
				{
					password:passwordRef.current.value,
					pin: codeRef.current.value
					
				}
			)
			.then((res) => {
				console.log(res.data)
				return 
				setLoader(false);
                  
                codeRef.current.value  = ""          
                passwordRef.current.value = ""
                setMsg("Password changed successfully")
				
				setTimeout(() => {
					router.push('/Login')
				}, 500)
			})
			.catch((err) => {
				
				setLoader(false);
                setMsg("An Error Occurred, Please Try Again")

			});
	};



	return (
		<>			
			<div className='flex items-center justify-center h-[100vh]'> 
				<form className='w-[95%] mx-auto flex flex-col justify-start rounded-md space-y-8 md:w-[60%] bg-gray-100 !shadow-md shadow-gray-300  md:px-[2rem] py-8 px-6'>
                    
				<p className='text-[1.1rem] font-medium text-center mb-6' style={{ color: "#051036" }}>
						{Verify === true ? "Reset password code have been sent to this email." : msg ? "Token Sent Successfully" : `Please enter the code sent to your email`}
					</p>

					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                    <label for='username'> Code:</label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type='text'
						required
                        ref={codeRef}
						id='username'
						placeholder='Code'
					/>

                    </div>

					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                    <label for='username'> Password: </label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type='text'
						required
                        ref={passwordRef}
						id='username'
						placeholder='Enter new password'
					/>

                    </div>


					<button
						className='text-white bg-green rounded-lg cursor-pointer  font-semibold bg-[#0086dc] py-[1rem] !text-center md:w-[30%] w-[100%] mx-auto'
						onClick={ResetPassword}
					>
						{" "}
						{loader ? <BeatLoader color='white' /> : "Submit"}{" "}
					</button>

					<p
						style={{
							width: "100%",
							textAlign: "center",
							margin: "20px 0",
							color: "#313bac",
						}}
					>
						{msg}
					</p>
				</form>
			</div>
		</>
	);
};

export default ResetPassword;
