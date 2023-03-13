import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/router";

function WithdrawModal({ open, setOpen }) {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	const [Error, setError] = useState(true);
	const [Confirm, setConfirm] = useState(true);
    const router = useRouter()


	useEffect(() => {
		// getCoin();
	}, []);

	const handleError = () => {
        alert("dsd")
        setConfirm(false)
		setTimeout(() => {
			setError(false);
		}, 5000);
	};

	const getCoin = async () => {
		try {
			await axios
				.get(
					"https://api.coingecko.com/api/v3/coins/list?include_platform=true",
				)
				.then((res) => {
					console.log(res);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='modBg '>
			<div className='relative bg-transparent h-screen w-screen'>
				<div className='bg-white shadow-md shadow-gray-400 rounded-sm  w-[95%] md:w-[30rem] mx-auto modal px-8 py-4 flex flex-col space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className='text-black font-semibold'>Withdraw</h1>
						<XMarkIcon
							className='w-4 h-4 cursor-pointer'
							onClick={() => {
								setOpen(false);
							}}
						/>
					</div>
					{Confirm ? (
						<div className="flex flex-col space-y-4 items-center">
							<p>
								Please make sure your wallet address is correct, or funds maybe
								lost{" "}
							</p>

							<button
								className='px-6 py-2 text-center bg-green rounded-md text-white'
								onClick={handleError}
							>
								Confirm
							</button>
						</div>
					) : Error ? (
						<div className='flex flex-col space-y-4 text-center items-center justify-center mt-24'>
							<MoonLoader color='#36d7b7' />
							Please Wait...
						</div>
					) : (
						<div className='flex flex-col space-y-4 mt-24 items-center justify-center'>
							<ExclamationCircleIcon className='w-24 h-24 text-red-600' />
							<p className='text-center'>
								An Error Occured, Please contact admin for more information
							</p>
							<button className='px-6 py-2 text-center bg-green rounded-md text-white' onClick={()=> {
                                router.push(`/admin/SendEmail?ID=${JSON.parse(localStorage.getItem("userData"))._id}&email=${JSON.parse(localStorage.getItem("userData")).email}`)
                            }}>
								Send Mail
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default WithdrawModal;
