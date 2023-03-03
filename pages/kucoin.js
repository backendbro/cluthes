import React from "react";
import Image from "next/legacy/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


function Kucoin () {
	const [number, isNumber] = useState(false);
    const [show, setShow] = useState(false)
	return (
		<div className=' flex flex-col space-y-12 md:space-y-0 py-4 px-8 md:p-0  md:flex-row w-full min-h-[100vh] h-full bg-white '>
			<div className=' w-[40%] relative' >
				<div className="flex h-full w-full md:hidden" >
                <Image src="https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg" width={100} height={100}  />
                </div>

                <div className="hidden md:flex z-50" style={{ backgroundColor: "rgb(1, 188, 141)" }} >
                <Image src=" https://assets.staticimg.com/public-web/2.6.10/static/logo-en.9ef1fe14.svg" width={200} height={100}  />               
                </div>              
                
				<div className=" h-full w-full relative hidden md:block " style={{ backgroundColor: "rgb(1, 188, 141)" }}>
                    <div className="text-white ml-24 mb-12">
                    <h1 className="text-[2rem] font-bold">Sign up now </h1>
                    <h2 className="text-[1.2rem]">To claim a mystery box</h2>
                    <h1 className="text-[2rem] font-bold">Worth</h1>
                    <h1 className="text-[2rem] font-bold">Up to <span className="text-yellow-300">$500</span></h1>
                    </div>

                    <div className="relative w-full h-[50vh]">
                    <Image src="/images/z.png" layout="fill" className="" />
                    </div>

                {/* <Image src='https://assets.staticimg.com/cms/media/2OuQLG4JvS9XoundliPb57B446zJEXAwQ7AeTgeAv.png' layout='fill' alt='hooll'  /> */}
                </div>
			</div>
			<div className='p-1 md:p-4 gap-y-4 flex space-y-4 flex-col-reverse md:flex-col md:space-y-24  w-full md:w-[60%] bg-white'>
				<p className=' text-left md:text-right text-[.8rem] text-gray-800 w-full md:w-[60%] mx-auto '>
					Already have an account?{" "}
					<span style={{ color: "rgb(1, 188, 141)" }} className=''>
						Log in
					</span>{" "}
				</p>

				<div className='text-gray-400 w-full md:w-[60%] mx-auto'>
					<h1 className='text-[2rem] mb-8 text-black font-bold'>Sign Up</h1>
					<div className='flex gap-4 mb-8'>
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
					</div>
					<form className='flex flex-col space-y-12'>
						{!number && (<label>
							<p className='text-xs mb-2'>Email</p>
							<input
								type='email'
								placeholder='Email'
								className='bg-gray-200 w-full p-2 outline-none'
							/>
						</label>)}

						{number && (
							<label>
								<p className='text-xs mb-2'>Phone Number </p>
								<input
									type='text'
									placeholder='Phone Number'
									className='bg-gray-200 w-full p-2'
								/>
							</label>
						)}

						<label className="group">
							<p className='text-xs mb-2'>Password</p>
							<div className='flex gap-2 bg-gray-200 p-2'>
								<input
									type={`${show ? "text" : "password"}`}
									className='bg-transparent outline-none w-full'
								/>
								{!show && <EyeIcon onClick={()=> {setShow(true)}} className='w-6 h-6 text-black cursor-pointer' />}
								{show && <EyeSlashIcon onClick={()=> { setShow(false)}} className='w-6 h-6 cursor-pointer text-black' />}
							</div>
						</label>

						<div className='flex gap-2'>
							<input type='checkbox' />
							<p>
								I have read and agree to the{" "}
								<span>
									<a href='#'>Terms of Use</a>{" "}
								</span>{" "}
							</p>
						</div>

						<button
							className='w-full py-2 rounded-md text-white font-medium text-[1.5rem] '
							style={{ backgroundColor: "rgb(1, 188, 141)" }}
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Kucoin;
