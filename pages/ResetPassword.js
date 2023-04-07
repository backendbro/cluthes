import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import {useRouter} from "next/router"
import axios from "axios";
import {BeatLoader} from "react-spinners";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
	const router = useRouter();
    
	
	const [show, setShow] = useState(false);
	const [Load, setLoad] = useState(false)
	const [Loader, setLoader] = useState(false)
	const [name, setName] = useState("");
	const [body, setBody] = useState("");

	const [msg, setMsg] = useState("");    	
    const codeRef = useRef(null)
    const passwordRef = useRef(null)
    

	
    const [Verify, setVerify] = useState(false)
    const [VerifyLoad, setVerifyLoad] = useState(false)
	

	

	const ResetPassword = async (e) => {

		e.preventDefault();		

		setLoader(true);
		
		if(!codeRef.current.value  || !passwordRef.current.value){
			setMsg("Please fill in the empty field(s).")
			setLoader(false);
			return 
		}


		
		axios
			.put(
                "https://cluth-space.onrender.com/api/auth/reset-password",
				{
					pin: codeRef.current.value,
					password:passwordRef.current.value
					
				}
			)
			.then((res) => {
				
				
				if(res.data.message == "TOKEN EXPIRED"){
					setMsg("Code has expired, request for a new one.")
					setLoader(false);
					return
				}


                codeRef.current.value  = ""          
                passwordRef.current.value = ""
                setMsg("Password changed successfully")
				setLoader(false);
				
				setTimeout(() => {
					router.push('/Login')
				}, 1500)
			})
			.catch((err) => {
				console.log(err.message)
				setLoader(false);
                setMsg("An Error Occurred, Please Try Again")

			});
	};

	const sendToken = async () => {
  
	  setLoad(true)
        await axios.put(
			"https://cluth-space.onrender.com/api/auth/resend-pin",
			{
				email: JSON.parse(localStorage.getItem("userEmail")),
			}
		).then((res)=> {	
            setLoad(false)
			setMsg(true)
            setVerify(true)

        }).catch((err)=> {
            alert(err)
            setLoad(false)
        })

	};



	return (
		<div className='flex items-center justify-center h-[100vh]'> 
		<form className='w-[95%] mx-auto flex flex-col justify-start rounded-md space-y-8 md:w-[60%] bg-gray-100 !shadow-md shadow-gray-300  md:px-[2rem] py-8 px-6'>

				<div className='flex flex-col space-y-4  justify-center'>
					<p className='text-[1.1rem] font-medium text-center mb-6' style={{ color: "#051036" }}>
						{Verify === true ? "Code Resent Successfully" : msg ? msg : `Please enter the verification code that was sent to your email`}
					</p>

					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                    <label for='username'> Code:</label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type='text'
						
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
						type={`${show ? "text" : "password"}`}
                        ref={passwordRef}
						id='username'
						placeholder='Enter new password'
					/>
					
					{!show && (
										<EyeIcon
											onClick={() => {
												setShow(true);
											}}
											className='w-6 h-6 text-black cursor-pointer bg-white'
										/>
									)}
									{show && (
										<EyeSlashIcon
											onClick={() => {
												setShow(false);
											}}
											className='w-6 h-6 cursor-pointer text-black bg-white'
										/>
									)}

                    </div>
					
					
					<div className='text-white  cursor-pointer  !mt-14 font-medium rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={ResetPassword}
                    
                    >
						{Loader ? <BeatLoader color="white" /> : "Submit"} 
					</div>
					
					<div
						className= 'text-white bg-green rounded-lg !mt-5 cursor-pointer  font-semibold bg-[#0086dc] py-[1rem] !text-center md:w-[30%] w-[100%] mx-auto'
						onClick={sendToken}
					>
						{Load ? <BeatLoader color="white" /> : "Resend Code"}                    
                        
					</div>


					
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
