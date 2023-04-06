import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

function AssetsTop() {
	const router = useRouter();

	const [userDetails, setUserDetails] = useState();
	const [userBal, setUserBal] = useState(0.00);
	const [converter, setConverter] = useState(null);
	let userData, userID;



	useEffect(() => {	
        getBalance();
    }, []);
	
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

    const getBalance = async () => {
		const url = "https://cluth-space.onrender.com/api/deposit/get-balance";
		try {
			const res = await axios.post(
				url,
				{ userId: String(JSON.parse(localStorage.getItem("userData"))._id) },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			const bal = res.data;
			console.log(bal.balance.balance);
			setUserBal(bal.balance.balance);			
			getConverter();
		} catch (error) {
			console.log(error);
		}
	};
	getConverter();
    

    async function getConverter() {
        const res = await axios.get(`https://api.coinconvert.net/convert/usdt/usd?amount=${userBal}`).then((res)=> {
            setConverter(res.data.USDT)
        }).catch((err)=> console.log(err))
    }


		

	return (
		<div className='mt- flex flex-col space-y-8  md:flex-row md: justify-between md:items-end'>
			<div className='flex flex-col space-y-8'>
				<div className='flex items-center gap-2'>
					<h1 className='text-[1.8rem] font-medium'>Asset Overview</h1>
					<EyeIcon className='h-4 w-4 text-gray-500 mt-2'/>
				</div>
				<div className='flex items-center gap-2'>
					<Image
						src='https://assets.staticimg.com/kucoin-main-web/1.11.10/static/dashedCircle.63d836e1.svg'
						width={25}
						height={25}
						alt='svg'
					/>
					<p>
						{converter}USDT <span className='text-s text-gray-500'> = {userBal} USD </span>
					</p>
					{/* <div className='bg-gray-100 px-4 py-1 flex items-center justify-center rounded-full'>
						BTC	
					</div> */}
				</div>
			</div>
			<div className='flex gap-4 w-full md:w-[50%] lg:w-[40%]'>
				<button	
					className='py-2 px-4 w-full rounded-md text-white bg-green'
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
