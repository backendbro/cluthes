import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
	TrashIcon,
	PlusCircleIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { BounceLoader, BeatLoader } from "react-spinners";
import Link from "next/link";

function HeaderTop() {
	const [user, setUser] = useState(null);
	const [Load, setLoad] = useState(false);
	const [open, setOpen] = useState(false);
	const [deposit, setDeposit] = useState(true);
	const [withdrawlData, setWithdrawlData] = useState();
	const [depositData, setDepositData] = useState();
	const [accept, setaccept] = useState(true);
	// const [cookies, setCookie] = useCookies(['user']);
	// const [singleUsercookies, setSingleUserCookie] = useCookies(["singleUser"]);
	const router = useRouter();
    let  ID ;
	const months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];



    useEffect(() => {
        ID = JSON.parse(localStorage.getItem("userData"))._id
		// getUser();
		getDeposit();
		getWithdrawal();
	}, []);

	const getUser = async () => {
		setLoad(true);
		
		await axios
			.get(`https://cluth-space.onrender.com/api/user/${ID}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			})
			.then((res) => {
				setLoad(false);
				const rep = res.data;
				setUser(rep);
				
			})
			.catch((err) => {
				return
			});
	};

	const getDeposit = async () => {
		
		await axios
			.post(
				`https://cluth-space.onrender.com/api/deposit/user-deposit`,
				{
					userId: ID,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then((res) => {
				setLoad(false);
				const rep = res.data;
				
				setDepositData(rep);
			
			})
			.catch((err) => {
				return
			});
	};

	const deleteDeposit = async (id) => {
		await axios
			.delete(
				"https://cluth-space.onrender.com/api/deposit/delete-deposit",
				{
					depositId: "640bb0420edec0524c2ea43b",
				},
				{
					headers: {
						Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTUxNzUyMmIwZjJlZmRjMTcwZGNjYiIsImlhdCI6MTY3OTEwMzg1OCwiZXhwIjoxNjgwODMxODU4fQ.5hRMuI5nPLyiykNWk3JtxJKJv55Kdu-4H6crS5pMX4w`,
					},
				},
			)
			.then((res) => {
				setLoad(false);
				const rep = res.data;
				
			})
			.catch((err) => {
				return
			});
	};

	const getWithdrawal = async () => {
		
		await axios
			.post(
				` https://cluth-space.onrender.com/api/withdrawal/single-user`,
				{
					userId: ID,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then((res) => {
				setLoad(false);
				const rep = res.data;
				
				setWithdrawlData(rep.withDrawalRequests);
				
			})
			.catch((err) => {
			return
			});
	};



	return (
		<div className='w-full flex flex-col space-y-4'>
            <h1 className="font-bold text-xl">History</h1>
			<div className='flex gap-4 '>
				<h1
					className={`${
						deposit ? "green cursor-pointer" : "cursor-pointer text-gray-400"
					} `}
					onClick={() => setDeposit(true)}
				>
					Deposits{" "}
				</h1>

				<h1
					className={`${
						deposit ? "text-gray-400 cursor-pointer" : "green cursor-pointer"
					} `}
					onClick={() => setDeposit(false)}
				>
					Withdrawals
				</h1>
			</div>

			{deposit && (
				<table className='p-4 rounded-lg w-full bg-gray-100'>
					<thead className=''>
						<tr className='text-center'>
							<th className='text-sm font-medium p-2'>Date</th>
							<th className='text-sm font-medium p-2'>Amount</th>
							<th className='text-sm font-medium p-2'>Status</th>
						</tr>
					</thead>
					<tbody>
						{depositData?.map((item, i) => (
							<tr className='text-center mt-4 p-4' key={i}>
								<td className='py-1 px-6'>
									{months[new Date(item.createdAt).getMonth()]}{" "}
									<span>{new Date(item.createdAt).getDate()}</span>{" "}
								</td>
								<td className='py-1 px-6'> {item.amount} </td>
								<td className=' '>
									<span className=' bg-green-200  green py-1 px-6 rounded-lg'>
										{item.status}
									</span>
								</td>
																				
							</tr>
						))}
					</tbody>
				</table>
			)}

			{!deposit && (
				<div>
					{/* <h1 className='mb-4 text-gray-400'>Withdrawal Request</h1> */}

					<table className='p-4 rounded-lg w-full bg-gray-100'>
						<thead className=''>
							<tr className='text-center'>
								<th className='text-sm font-medium p-2'>Date</th>
								<th className='text-sm font-medium p-2'>Amount</th>
								<th className='text-sm font-medium p-2'>Status </th>
							</tr>
						</thead>
						<tbody>
							{withdrawlData?.map((item, index = item._id) => (
								
								<>
									<tr
										className='text-center mt-4 p-4 cursor-pointer '
										key={index}
									>
										<td className='py-1 px-6'>
									{months[new Date(item.createdAt).getMonth()]}{" "}
									<span>{new Date(item.createdAt).getDate()}</span>{" "}
									</td>
										<td className='py-1 px-6'>
											{" "}
											{new Intl.NumberFormat().format(item.amount)}{" "}
										</td>
										<td className=''>
											{item.status == "Confirmed" && (
												<span
													className='cursor-pointer bg-green-200 green py-1 px-4 rounded-lg'
													onClick={() => {
														setaccept(false);
													}}
												>
													Confirmed
												</span>
											)}

											{item.status == "Pending" && (
												<span
													className='cursor-pointer bg-gray-200 text-gray-500 py-1 px-4 rounded-lg'
													onClick={() => {
														setaccept(true);
													}}
												>
													Pending
												</span>
											)}

											{item.status == "Failed" && (
												<span
													className='cursor-pointer bg-red-200 text-red-500 py-1 px-4 rounded-lg'
													onClick={() => {
														setaccept(true);
													}}
												>
													Failed
												</span>
											)}
										</td>										
									</tr>
								</>
							))
							}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default HeaderTop;
