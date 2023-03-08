import Image from "next/image";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
	EyeIcon,
	EyeSlashIcon,
	Squares2X2Icon,
	ListBulletIcon,
} from "@heroicons/react/24/outline";
import {
	BellIcon,
	DocumentTextIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
	const [userDetails, setUserDetails] = useState();
    const [userMail, setUserMail] = useState("")
    const router = useRouter()
    let userToken, userData;

	useEffect(() => {
        userToken = localStorage.getItem("userToken");
	    userData = JSON.parse(localStorage.getItem("userData"));  
        let  email = userData.email.slice(0, 2);
         setUserMail(email)
		getUserDetails();
	}, []);

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
        router.push("./Login")
    }
	
    console.log(userMail)

	return (
		<div className='flex justify-between p-4 items-center'>
			<div className='w-[80%] flex gap-2 items-center '>
				{/* logo */}
				<Image
					src='https://assets.staticimg.com/cms/media/1lB3PkckFDyfxz6VudCEACBeRRBi6sQQ7DDjz0yWM.svg'
					width={100}
					height={100}
					alt='logo'
				/>

				<Squares2X2Icon className='h-6 w-6 text-black' />

				<ul className='gap-8 flex-grow items-center hidden lg:flex'>
					<li>
						<a href='#'>Buy Crypto</a>
					</li>
					<li>
						<a href='#'>Markets</a>
					</li>
					<li>
						<a href='#'>Trades</a>
					</li>
					<li>
						<a href='#'>Derivatives</a>
					</li>
					<li>
						<a href='#'>Earn</a>
					</li>
					<li>
						<a href='#'>NFT</a>
					</li>
					<li>
						<a href='#'>Wallets</a>
					</li>
					<button className='green bg-green-100 h-8  py-1 px-2 rounded-lg text-sm'>
						Beginner Zone
					</button>
				</ul>
			</div>

			<div className='w-[50%] md:w-[20%]  flex gap-4 justify-end lg:justify-evenly items-center'>
				<BellIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2 hidden lg:block' />
				<DocumentTextIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2 hidden  lg:flex' />
				<CreditCardIcon className='w-8 h-8 rounded-lg bg-gray-300 px-2 py-2 hidden  lg:flex' />
				<div className='h-8 w-8 flex items-center justify-center rounded-full border border-black text-sm uppercase text-black'>
					{userMail}
				</div>
				<div className='h-6 px-2 text-sm items-center justify-center rounded-md border cursor-pointer  border-black text-center ' onClick={()=> {
                    logout()
                }}>
					Logout
				</div>
				<ListBulletIcon className='h-6 w-6 flex lg:hidden' />
			</div>
		</div>
	);
}
