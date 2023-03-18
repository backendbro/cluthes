import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

function AssetsTop() {
	const router = useRouter();

	const [userDetails, setUserDetails] = useState();
	const [userBal, setUserBal] = useState();
	const [converter, setConverter] = useState(null);
	let userData, userID;

	// useEffect(() => {	
    //     getBalance();
    // }, []);
	
	// const url = "https://cluth-space.onrender.com/api/deposit/user-deposit";

	// async function getBalance() {
    //     const bearer_token = localStorage.getItem("userToken");	
	// 	const response = await fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			Authorization: `Bearer ${bearer_token}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			userId: JSON.parse(localStorage.getItem("userData"))._id,
	// 		}),
	// 	});

	// 	const json = await response.json();
	// 	setUserBal(json[0].balance);
        
	// }
    
    

    async function getConverter() {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${userBal}`).then((res)=> {
            console.log(res.data)
            setConverter(res.data)
        }).catch((err)=> console.log(err))
    }

    getConverter()

	

	return (
		<div className='mt- flex flex-col space-y-8  md:flex-row md: justify-between md:items-end'>
			<div className='flex flex-col space-y-8'>
				<div className='flex items-center gap-2'>
					<h1 className='text-[1.8rem] font-medium'>Asset Overview</h1>
					<EyeIcon className='h-4 w-4 text-gray-500 mt-2' />
				</div>
				<div className='flex items-center gap-2'>
					<Image
						src='https://assets.staticimg.com/kucoin-main-web/1.11.10/static/dashedCircle.63d836e1.svg'
						width={25}
						height={25}
						alt='svg'
					/>
					<p>
						{converter}TC <span className='text-xs text-gray-300'>={userBal} USD</span>
					</p>
					<div className='bg-gray-100 px-4 py-1 flex items-center justify-center rounded-full'>
						BTC
					</div>
				</div>
			</div>
			<div className='flex gap-4 w-full md:w-[50%] lg:w-[40%]'>
				<button
					className='py-2 px-4 w-full rounded-md text-white bg-green '
					onClick={() => {
						router.push("./Deposit");
					}}
				>
					Deposit
				</button>
				<button
					className='py-2 px-4 w-full rounded-md green bg-white border border-green-200 '
					onClick={() => {
						router.push("./Deposit");
					}}
				>
					Buy Crypto
				</button>
				<button
					className='py-2 px-4 w-full rounded-md green bg-white border border-green-200 '
					onClick={() => {
						router.push("./Withdraw");
					}}
				>
					Widthdraw
				</button>
			</div>
		</div>
	);
}

export default AssetsTop;
