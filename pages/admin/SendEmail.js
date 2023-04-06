import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import {useRouter} from "next/router"
import AdminHeader from "../../components/AdminHeader"
import axios from "axios";
import {BeatLoader} from "react-spinners";

const SendEmail = () => {
	const router = useRouter();
    

	const [name, setName] = useState("");
	const [body, setBody] = useState("");
	const [loader, setLoader] = useState(false);
	const [msg, setMsg] = useState("");    	
    const nameRef = useRef(null)
    const bodyRef = useRef(null)
    const {ID, email} = router.query
	

	

	const sendMail = async (e) => {
        // nameRef.current.value  = ""          
        // bodyRef.current.value = ""
		e.preventDefault();		
		setLoader(true);
		axios
			.post(
                "https://cluth-space.onrender.com/api/contact/admin",
				{
					userId: ID,
					email: email,
					message: body,
					issue:name,
					subject:"Donicoin Team"
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then((res) => {
				
				setLoader(false);
               
                nameRef.current.value  = ""          
                bodyRef.current.value = ""
                router.push(`/admin/User?ID=${ID}`)
			})
			.catch((err) => {
				console.log(err.message);
				setLoader(false);
			});
	};

   


	return (
		<>			
        <AdminHeader />
			<div className='flex items-center justify-center h-screen'>
				<form className='w-[95%] mx-auto flex flex-col justify-start rounded-md space-y-8 md:w-[60%] bg-gray-200 !shadow-md shadow-gray-600  md:px-[2rem] py-8 px-6'>
					<div className="flex flex-col md:flex-row gap-2 w-full md:items-center">
                    <label for='username'>Subject</label>
					<input
						onChange={(e) => setName(e.target.value)}
						className='p-2 outline-none rounded-md w-full'
						type='text'
						required
                        ref={nameRef}
						id='username'
						placeholder='Subject'
					/>

                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                    <label for='username'>Body</label>
					{/* <input onChange={(e) => setBody(e.target.value)} style={{ height: "100px" }} className='payout-input' type="text" required id="username" /> */}
					<textarea
						placeholder='Body...'
						className='payout-input outline-none !h-[200px] !p-4 w-full rounded-lg'
						onChange={(e) => setBody(e.target.value)}
						required
                        ref={bodyRef}
						id='username'
					></textarea>
                    </div>

					<button
						className='text-white bg-green rounded-lg cursor-pointer  font-semibold bg-[#0086dc] py-[1rem] !text-center md:w-[30%] w-[100%] mx-auto'
						onClick={sendMail}
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

export default SendEmail;
