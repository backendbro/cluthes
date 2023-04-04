import Image from "next/image";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
	EyeIcon,
	EyeSlashIcon,
	Squares2X2Icon,
	Bars3Icon,
} from "@heroicons/react/24/outline";
import {
	BellIcon,
	DocumentTextIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function AdminHeader() {
	const [userDetails, setUserDetails] = useState();
	const [userMail, setUserMail] = useState("");
	const router = useRouter();
	let userToken, userData;
	

	const getUserDetails = async () => {
		try {
			await axios
				.get(" https://cluth-space.onrender.com/api/auth/logged-in-user  ", {
					headers: {
						"Content-Type": "application/json",
						Authorization: ` Bearer ${userToken}`,
					},
				})
				.then((res) => {
					console.log(res);
					setUserDetails(res.data);
				});
		} catch (err) {
			console.log(err);
		}
	};

	const logout = () => {
		router.push("./Login");
	};

	console.log(userMail);

	return (
		<div className='flex justify-between p-4 items-center mb-8 lg:mb-0 shadow-md shadow-gray-400'>
			<div className='w-[80%] flex gap-2 items-center '>
				{/* logo */}
				<Image
					src='https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg'
					width={100}
					height={100}
					alt='logo'
				/>

				<Squares2X2Icon className='h-6 w-6 text-black' />
			
			</div>

			<div className='w-[50%] md:w-[20%]  flex  justify-end lg:justify-evenly items-center'>											
				<div
					className='h-6 px-2 text-sm items-center justify-center rounded-md border cursor-pointer  border-black text-center  '
					onClick={() => {
						logout();
					}}
				>
					Logout
				</div>
				
			</div>
		</div>
	);
}
