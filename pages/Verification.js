import React, { useEffect, useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillHouseDoorFill } from "react-icons/bs";
import {useRouter} from "next/router"

import axios from "axios";

const Verification = () => {	
    const [userData, setUserData] = useState()
    const router = useRouter()

	// useEffect( ()=> {
	//  axios.get("https://copyoptions.onrender.com/api/user/get-user", {})
	// }, [cookies])

     

	useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("userData")))
		let data = async () => {
			await axios
				.get("https://copyoptions.onrender.com/api/user/get-user", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				})
				.then((res) => {
					console.log(res);					
				})
				.catch((err) => {
					console.log(err);
				});
		};
		data();
	}, []);
	

	return (
		<div className='verification__container'>
			<div className='verification__con'>
				<div className='images__head'>
					{userData?.profilePicture ? (
						<img
							src={userData?.profilePicture}
							className='h-[100px] w-[100px] rounded-[50%]'
							alt='profile-picture'
						/>
					) : (
						<div className='h-[100px] w-[100px] border border-gray-400 p-[1rem] rounded-[50%]'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke=''
								className='w-full h-full '
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
								/>
							</svg>
						</div>
					)}
					<h1>{userData?.firstName}</h1>
					<p>VERIFICATIONS</p>
				</div>
				<div className='verification__icons'>					

					<div
						className='verification__icon'
						onClick={
                                userData?.idVerification === "Completed"
								? () => {}
								: () => router.push("/IdentityVerification")
						}
					>
						<div className='verification__icon__div2'>
							<BsFillPersonFill className='icon' />
						</div>
						<div className='verification__text__div'>
							<p>Identity Verification</p>
							<p className='p__status'>
								{" "}
								{userData?.idVerification}{" "}
							</p>
						</div>
					</div>

					<div
						className='verification__icon'
						onClick={
							userData?.addressVerification === "Completed"
								? () => {}
								: () => router.push("/AddressVerification")
						}
					>
						<div className='verification__icon__div3'>
							<BsFillHouseDoorFill className='icon' />
						</div>
						<div className='verification__text__div'>
							<p>Address Verification</p>
							<p className='p__status'>
								{" "}
								{userData?.addressVerification}{" "}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Verification;
