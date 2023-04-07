import React from "react";
import {useState, useRef} from "react"
import {useRouter} from "next/router"
import axios from "axios";
import BeatLoader from 'react-spinners/BeatLoader'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function ChangePassword() {
    const [Loader, setLoader] = useState(false)
    const [msg, setMsg] = useState(false)
    const [Verify, setVerify] = useState(false)
    const [name, setName] = useState("");
    const [show_1, setShow_1] = useState(false);
    const [show_2, setShow_2] = useState(false);
    
    const oldPasswordRef = useRef(null)
    const newPasswordRef = useRef(null)
	const router = useRouter();

		


    const changePassword = async () => {        
        setLoader(true)
		
		if(!oldPasswordRef.current.value  || !newPasswordRef.current.value){
			setMsg("Please fill in the empty field(s).")
			setLoader(false);
			return 
		}
		
        await axios.put( "https://cluth-space.onrender.com/api/auth/reset-current-password",
			{
				currentPassword: oldPasswordRef.current.value,
				newPassword:newPasswordRef.current.value
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					"Content-Type": "application/json",
				}
			},
		).then((res)=> {
			
			setMsg(res.data.message)
            setLoader(false)        
            setVerify(true)

			oldPasswordRef.current.value = " "
			newPasswordRef.current.value = " "
        
           
        }).catch((err)=> {
			
			if(err.response.data.message == "INCORRECT PASSWORD"){
				setMsg(err.response.data.message)
				setLoader(false)
				
				return;
			}

			setMsg("An error occured. Try again")
			setLoader(false)
			return;
        })
        
	};

    

    

	return (
		<div className='flex items-center justify-center h-[100vh]'> 
		<form className='w-[95%] mx-auto flex flex-col justify-start rounded-md space-y-8 md:w-[60%] bg-gray-100 !shadow-md shadow-gray-300  md:px-[2rem] py-8 px-6'>

				<div className='flex flex-col space-y-4  justify-center'>
					<p className='text-[1.1rem] font-medium text-center mb-6' style={{ color: "#051036" }}>
						{Verify === true ? "Password Changed Successfully" : msg ? msg : `Change Password`}
					</p>

					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                    <label for='username'> Current Password:</label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type={`${show_1 ? "text" : "password"}`}
						required
                        ref={oldPasswordRef}
						id='username'
						placeholder='Enter current password'
					/>

						{!show_1 && (
										<EyeIcon
											onClick={() => {
												setShow_1(true);
											}}
											className='w-6 h-6 text-black cursor-pointer bg-white'
										/>
									)}
									{show_1 && (
										<EyeSlashIcon
											onClick={() => {
												setShow_1(false);
											}}
											className='w-6 h-6 cursor-pointer text-black bg-white'
										/>
									)}

                    </div>	
				

					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center !mt-10">
                    <label for='username'> New Password: </label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type={`${show_2 ? "text" : "password"}`}
                        ref={newPasswordRef}
						required
						id='username'
						placeholder='Enter new password'
					/>
					
					{!show_2 && (
										<EyeIcon
											onClick={() => {
												setShow_2(true);
											}}
											className='w-6 h-6 text-black cursor-pointer bg-white'
										/>
									)}
									{show_2 && (
										<EyeSlashIcon
											onClick={() => {
												setShow_2(false);
											}}
											className='w-6 h-6 cursor-pointer text-black bg-white'
										/>
									)}

                    </div>
					
					
					<div className='text-white  cursor-pointer  !mt-14 font-medium rounded-lg bg-green py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
						onClick={changePassword}
                    
                    >
						{Loader ? <BeatLoader color="white" /> : "Submit"} 
					</div>
					
					


					
				</div>
			</form>
		</div>
	);
}

export default ChangePassword;
