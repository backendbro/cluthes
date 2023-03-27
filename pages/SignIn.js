import React, { useEffect } from "react";
import Image from "next/legacy/image";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function SignIn() {
	const [number, isNumber] = useState(false);
	const [show, setShow] = useState(false);
	const router = useRouter();
	const emailRef = useRef();
	const phoneNoRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const [btnLoad, setBtnLoad] = useState(false);

	useEffect(() => {
		checkWidth()
	})

	const signup = async (e) => {
		setBtnLoad(true);
		console.log(
			emailRef.current.value,
			usernameRef.current.value,
			phoneNoRef.current.value,
			passwordRef.current.value,
		);
		e.preventDefault();
		try {
			console.log("trying");
			await axios
				.post(
					"https://cluth-space.onrender.com/api/auth/register",
					{
						email: emailRef.current.value,
						username: usernameRef.current.value,
						phoneNumber: phoneNoRef.current.value,
						password: passwordRef.current.value,
					},
					{
						headers: { "Content-Type": "application/json" },
					},
				)
				.then((res) => {
					console.log("Success");
                    localStorage.setItem("userEmail", JSON.stringify(emailRef.current.value))
					setBtnLoad(false);
					router.push("/VerifyEmail");
				});
		} catch (error) {
			setBtnLoad(false);
			alert(error);
			console.log(error);
		}
	};

	

	// For some reason I couuldnt change the width from the css file, I had to do it here.
	function checkWidth() {
		let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		console.log(width)
		if(width >= 600){
			const btn = document.querySelector('.btn')
			btn.style.width = "480px"	
		}
		
		if(width <= 600){
			const btn = document.querySelector('.btn')
			btn.style.width = "320px"	
		}
	}

	return (
		<div className=' flex flex-col space-y-4 md:space-y-0 py-4 px-8 md:p-0  md:flex-row w-full min-h-[100vh] h-full bg-white '>
			<div className=' w-[40%] relative'>
				<div className='flex h-full w-full md:hidden'>
					<Image
						src='https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg'
						width={100}
						height={100}
						alt='logo'
					/>
				</div>

				<div className='hidden md:flex z-50 bg-green'>
					<Image
						src=' https://assets.staticimg.com/public-web/2.6.10/static/logo-en.9ef1fe14.svg'
						width={200}
						height={100}
						alt='logo'
					/>
				</div>

				<div className=' h-full w-full relative hidden md:block  bg-green'>
					<div className='text-white ml-24 mb-12'>
						<h1 className='text-[2rem] font-bold'>Sign up now </h1>
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
			<div className='p-1 md:p-4 gap-y-4 flex space-y-4 flex-col-reverse md:flex-col md:space-y-20  w-full md:w-[80%] lg:[60%] bg-white'>
				<p className=' text-left md:text-right text-[.8rem] text-gray-800 w-full md:w-[60%] mx-auto '>
					Already have an account?{" "}
					<span
						className='green cursor-pointer'
						onClick={() => router.push("/Login")}
					>
						Log in
					</span>{" "}
				</p>

				<div className='text-gray-400 w-full md:w-[60%] mx-auto'>
					<h4 className='text-[2rem] mb-10 text-black font-bold'>Sign Up</h4>
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
					<form className='flex flex-col space-y-8'>
						

						<div class="mb-2 input-div">
						<label for="exampleFormControlInput1"  id="labelForFormControl" class="form-label">
						<p className='text-s text-black mb-2'>Email</p>
						</label>
						<input type="email" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="Email" ref={emailRef} />
						</div>

	

						<div class="mb-2 input-div" >
						<label for="exampleFormControlInput1" id="labelForFormControl" class="form-label">
						<p className='text-s text-black mb-2'>Phone Number</p>
						</label>
						<input type="number" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="Phone Number" ref={phoneNoRef} />
						</div>


						<div class="mb-2 input-div" >
                    <label for="exampleFormControlInput1" id="labelForFormControl" class="form-label">
					<p className='text-s text-black mb-2'>Username</p>
					</label>
                    <input type="text" class="form-control shadow-none" id="exampleFormControlInput1" placeholder="Username" ref={usernameRef}/> 
                  </div>

				  <div class="mb-2 input-div" >
                    <label for="exampleFormControlInput1" id="labelForFormControl" class="form-label">
					<p className='text-s text-black mb-2'>Password</p>
					</label>
					<input
						type={`${show ? "text" : "password"}`}
						class="pass-stuff shadow-none"
						placeholder="Password"
						ref={passwordRef}
					/>
					{!show && (
									<EyeIcon
										onClick={() => {
											setShow(true);
										}}
										class="eyeIcon"
									/>
								)}
								{show && (
									<EyeSlashIcon
										onClick={() => {
											setShow(false);
										}}
										class="eyeIcon"
									/>
								)}
                  </div>

						

						{/* <div className='flex gap-2'>
							<input type='checkbox' />
							<p className='text-xs'>
								I have read and agree to the{" "}
								<span>
									<a href='#'>Terms of Use</a>{" "}
								</span>{" "}
							</p>
						</div> */}

						<div class="terms">
						<input class="form-check-input  shadow-none" type="checkbox" value="" id="flexCheckDefault" />
						<label class="form-check-label" for="flexCheckDefault">
						<span> &nbsp; I have read and agree to the <a href="#">Terms of Use.</a> </span>
						</label>
					</div>

					<div class="btn-div mb-3 mt-3">
					<button class="btn" type="button" onClick={signup}>{btnLoad ? <BeatLoader color='#36d7b7' size={7} /> : "Sign Up"}</button>
                 </div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
