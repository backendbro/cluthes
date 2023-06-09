import React, { useEffect } from "react";
import Image from "next/legacy/image";
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BeatLoader } from "react-spinners";


// bg color rgb(1, 188, 141);

const Login = () => {
	const [number, isNumber] = useState(false);
	const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("")
	const router = useRouter();
	const emailRef = useRef();	
	const passwordRef = useRef();
	const [btnLoad, setBtnLoad] = useState(false);

	

	//     https://cluth-space.onrender.com/api/auth/login
	// method: post
	// body:{
	// {
	//     "email":"backendbomafiaso@gmail.com",
	//     "password":"password"
	// }

	const Login = async (e) => {
		e.preventDefault();
		
		setBtnLoad(true);
        
		
		try {
			
			await axios
				.post(
					"https://cluth-space.onrender.com/api/auth/login",
					{
						email: emailRef.current.value,
						password: passwordRef.current.value,
					},
					{
						headers: { "Content-Type": "application/json" },
					},
				)
				.then((res) => {
					
                    localStorage.setItem("userToken", res.data.token)
                    localStorage.setItem("userData", JSON.stringify(res.data.user))
                    res.data.user.role === "Admin" ? router.push("/admin") : router.push("/assets")
					setBtnLoad(false);
                    
				});
		} catch (error) {
			setBtnLoad(false);
			   
			

            if (error.response.data.message === "EMAIL DOES NOT EXIST"){
				router.push("/SignIn")
            }           
            
            if (error.response.data.message === "YOUR ACCOUNT IS UNDER REVIEW"){
                setMsg(error.response.data.message)
            }           
            if(error.response.data.message === "VERIFY YOUR ACCOUNT"){
                localStorage.setItem("userEmail", JSON.stringify(emailRef.current.value))
                setTimeout(() => {
					router.push("/EmailToken")
				}, 1200)
            }	
            setMsg(error.response.data.message)			
		}
	};


	
		
		return (
			<div className=' flex flex-col space-y-4 md:space-y-0 py-4 px-8 md:p-0  md:flex-row w-full min-h-[100vh] h-full bg-white '>
				<div className=' w-[45%] relative'>
				<div className='flex h-full w-full md:hidden'>
					<Image
						src='/images/logo.jpeg'
						width={200}
						height={100}
						alt='logo'
					/>
				</div>

				<div className='hidden md:flex z-500 bg-green text-white font-bold pl-8 text-[2rem] pb-10 pt-2'>
					{/* <Image
						src='/images/logo.png'
						width={200}
						height={100}
						alt='logo'
					/> */}

                    DONICOIN
				</div>

				<div className=' h-full w-full relative hidden md:block  bg-green'>
					<div className='text-white ml-24 mb-12'>
						<h1 className='text-[2rem] font-bold'>Log in now </h1>
						<h2 className='text-[1.2rem]'>To claim a mystery box</h2>
						<h1 className='text-[2rem] font-bold'>Worth</h1>
						<h1 className='text-[2rem] font-bold'>
							Up to <span className='text-yellow-300'>$500</span>
						</h1>
					</div>

					<div className='relative w-full h-[50vh]'>
						<Image src='/images/z.png' layout='fill' className='' alt='logo' />
					</div>

					{/* <Image src='https://assets.staticimg.com/cms/media/2OuQLG4JvS9XoundliPb57B446zJEXAwQ7AeTgeAv.png' layout='fill' alt='hooll'  /> */}
				</div>
			</div>
				<div className='p-1 md:p-4 gap-y-4 flex space-y-2 flex-col-reverse md:flex-col md:space-y-20  w-full md:w-[60%] bg-white'>
					<p className=' text-left md:text-right text-[.8rem] text-gray-800 w-full md:w-[60%] mx-auto  md:block'>
						Dont have an account?{" "}
						<span
							className='green cursor-pointer '
							onClick={() => router.push("/SignIn")}
						>
							Sign Up Now
						</span>{" "}
					</p>
	
					<div className='text-gray-400 w-full md:w-[60%] mx-auto !mt-8'>
						<h1 className='text-[2rem] mb-8 text-black font-bold'>Log In</h1>
						{/* <div className='flex gap-4 mb-8'>
							<h1
							className="cursor-pointer "
								onClick={() => {
									isNumber(false);
								}}
								style={{ color: `${ !number ? "rgb(1, 188, 141)": "gray" }` }}
							>
								Email
							</h1>
							<h1
							className="cursor-pointer "
								onClick={() => {
									isNumber(true);
								}}
								style={{ color: `${ number? "rgb(1, 188, 141)" : "gray"}` }}
							>
								Phone Number
							</h1>
						</div> */}
						<form className='flex flex-col space-y-6'>
							<label>
								<p className='text-xs mb-2'>Email</p>
								<input
									type='email'
									placeholder='Email'
									className='bg-gray-200 w-full p-2 outline-none rounded-lg '
									ref={emailRef}
								/>
							</label>
	
							{/* 						
								<label>
									<p className='text-xs mb-2'>Phone Number </p>
									<input
										type='text'
										placeholder='Phone Number'
										className='bg-gray-200 w-full p-2 '
									/>
								</label>
							 */}
	
							<label className='group'>
								<p className='text-xs mb-2'>Password</p>
								<div className='flex gap-2 bg-gray-200 p-2'>
									<input
										type={`${show ? "text" : "password"}`}
										className='bg-transparent outline-none rounded-lg w-full'
										placeholder="Password"
										ref={passwordRef}
									/>
									{!show && (
										<EyeIcon
											onClick={() => {
												setShow(true);
											}}
											className='w-4 h-4 text-black cursor-pointer'
										/>
									)}
									{show && (
										<EyeSlashIcon
											onClick={() => {
												setShow(false);
											}}
											className='w-4 h-4 cursor-pointer text-black'
										/>
									)}
								</div>
							</label>
	
							<div>
                                <p className="text-red-500 text-center">{msg}</p>
								<button
									className='w-full py-2 rounded-md text-white font-medium  mt-6 '
									style={{ backgroundColor: "rgb(1, 188, 141)" }}
									onClick={Login}
								>
									{btnLoad ? <BeatLoader color='#36d7b7' size={7} /> : "Login"}
								</button>
	
								{/* <a
									href='#'
									className='align-right text-decoration-none text-xs w-full'
								>
									Forgot Password?
								</a> */}
								<Link href="/ForgotPassword" className='align-right text-decoration-none text-xs w-full green'>
								Forgot Password?
								</Link>
								
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	};

	

export default Login;
