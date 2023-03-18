import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";

const MakeDeposit = () => {
	const [user, setUser] = useState({});
	const [status, setStatus] = useState("Pending");
	const [withdraw, setWithdraw] = useState();
	const btnRef = useRef(null);
	const [load, setLoad] = useState(false);
	const router = useRouter();
    const inputRef = useRef()
	const { ID } = router.query;

	// const MonthArr = [
	// 	"JAN",
	// 	"FEB",
	// 	"MAR",
	// 	"APR",
	// 	"MAY",
	// 	"JUN",
	// 	"JUL",
	// 	"AUG",
	// 	"SEP",
	// 	"OCT",
	// 	"NOV",
	// 	"DEC",
	// ];
	
//     URL: https://cluth-space.onrender.com/api/deposit
// BODY: {
//     "amount" : 500,
//     "userId":"64151c7047e97749edac1855"
// }

	const makeDeposit = async () => {
		console.log("updating");
        console.log(ID)
		setLoad(true);
		await axios
			.post(
				"https://cluth-space.onrender.com/api/deposit",
				{
					amount: inputRef.current.value,
					userId: ID,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then(function (response) {
				console.log(response);
				setLoad(false);
				router.push(`/admin/User?ID=${ID}`);
			})
			.catch((err) => {
				setLoad(false);
				// router.push(`/admin/User?ID=${ID}`);
				console.log(err);
			});
	};

	return (
		<div className='flex items-center justify-center h-screen px-4'>
			<div className='bg-gray-200 p-6 w-full flex flex-col space-y-6 md:w-[30rem] rounded-lg'>
				<h1 className="font-bold green text-[1.5rem]">Make Deposit </h1>

				<label className="flex flex-col space-y-4">
					<h1>Please type in amount to be deposited</h1>
					<input
						type='number'
						className='w-full py-4 px-2 rounded-lg outline-none text-gray-400'
                        ref={inputRef}
					/>
				</label>

				<button
					className='bg-green py-2 px-6 text-white text-center rounded-lg'
					onClick={() => {
						makeDeposit();
					}}
				>
					{load ? <BeatLoader color='#fff' size={7} /> : "Confirm"}
				</button>
			</div>
		</div>
	);
};

export default MakeDeposit;
