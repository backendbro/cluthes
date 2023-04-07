import axios from "axios";
import AdminHeader from "../../components/AdminHeader"
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
	TrashIcon,
	PencilSquareIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { BounceLoader, BeatLoader } from "react-spinners";
import Link from "next/link";

const User = () => {
	const [user, setUser] = useState(null);
	const [getBalance, setBalance] = useState(null);
	const [Load, setLoad] = useState(false);
	const [open, setOpen] = useState(false);
	const [deposit, setDeposit] = useState(true);
	const [withdrawlData, setWithdrawlData] = useState();
	const [depositData, setDepositData] = useState();
	const [accept, setaccept] = useState(true);
	// const [cookies, setCookie] = useCookies(['user']);
	// const [singleUsercookies, setSingleUserCookie] = useCookies(["singleUser"]);
	const router = useRouter();
	const { ID } = router.query;
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
		getUser();
		fetchBalance();
		getDeposit();
		getWithdrawal();
	}, []);
	

	async function fetchBalance  () {
		
		const url = "https://cluth-space.onrender.com/api/deposit/get-balance"
		try {
			
			const res = await axios.post(url, 
				{ userId:String(ID) }, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
						'Content-Type': 'application/json'
					}
				});
				
				const balance = res.data
				setLoad(false);
				setBalance(balance)
			} catch (error) {
				return
			}
			
		}

	async function getUser () {
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

	async function getDeposit  ()  {
		
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

	return Load ? (
		<div className='flex items-center justify-center h-screen'>
			<BounceLoader color='#36d7b7' size={200} />
		</div>
	) : (
		<>
        <AdminHeader />
        <div className='w-[95%] md:w-[80%] lg:w[60%] mx-auto flex flex-col space-y-8 py-6  '>
			<div className='mx-auto flex flex-row md:flex-row gap-4 md:items-center p-4 '>
				<div className='w-[30%] rounded-full overflow-hid'>
					<img src='/images/z.png' width='100%' className='rounded-full' />
				</div>
				<div className='flex flex-col sapce-y-12 '>
					<div className=' flex flex-col space-y-2'>
						<div className='flex gap-2 text-xs text-gray-400'>
							<p className='user__p1 '>EMAIL</p>
							<p className='text-xs'>: {user?.email}</p>
						</div>

						<div className='flex gap-2 text-xs text-gray-400'>
							<p className='user__p1 '>PHONE NUMBER</p>
							<p className='text-xs'>: {user?.phoneNumber}</p>
						</div>
						<div className='flex gap-2 text-xs text-gray-400'>
							<p className='user__p1 '>USERNAME</p>
							<p className='text-xs'>: {user?.username}</p>
						</div>

						<div className='flex gap-2 text-xs  text-gray-400'>
							<p className='user__p1 '>BALANCE</p>
							<p className='text-xs'>: ${getBalance?.balance.balance}</p>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center md:space-x-4 ">
                    <Link
						className='mt-4 py-2 px-4 w-full rounded-md green bg-green border border-green-200 !text-white text-center'
						href={`/admin/SendEmail?ID=${user?._id}&email=${user?.email}`}
						style={{ color: "#cf2465", cursor: "pointer" }}
					>
						Send Email
					</Link>

                    <Link
						className='mt-4 py-2 px-4  rounded-md green bg-green border border-green-200 !text-white text-center'
						href={`/admin/AdminUserVerification?ID=${user?._id}`}
						style={{ color: "#cf2465", cursor: "pointer" }}
					>
						Verification
					</Link>
                    </div>

                  
				</div>
			</div>

			<div className='w-full flex flex-col space-y-4'>
				<div className='flex gap-4 items-center '>
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
					<>
						<div
							className='flex gap-4 text-white px-8 py-4 rounded-lg bg-green w-full md:w-[30%] cursor-pointer'
							onClick={() => {
								router.push(`/admin/makeDeposit?ID=${ID}`);
							}}
						>
							<PencilSquareIcon className='w-6 h-6 text-white' />

							<h1>Add Deposit</h1>
						</div>

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
											{months[new Date(item.createdAt).getMonth() - 1]}{" "}
											<span>{new Date(item.createdAt).getDate()}</span>{" "}
										</td>
										<td className='py-1 px-6'> {item.amount} </td>
										<td className=' '>
											<span className=' bg-green-200  green py-1 px-6 rounded-lg'>
												{item.status}
											</span>
										</td>
										<td className='hidden md:table-cell'>
											<div
												className='relative group flex flex-col items-center cursor-pointer'
												onClick={() => {
													deleteDeposit(item._id);
												}}
											>
												{/* <TrashIcon className='w-6 h-6' />
												<div className='bg-gray-200  text-gray-400 absolute top-6 -left-6 rounded-md px-6 py-2 hidden text-center group-hover:block z-30'>
													Delete
												</div> */}
											</div>
										</td>

										<td className='block md:hidden'>
											<div
												className='relative group flex flex-col items-center cursor-pointer'
												onClick={() => {
													setOpen(!open);
												}}
											>
												<EllipsisHorizontalIcon className='w-6 h-6' />
												{open && (
													<div className='bg-gray-200  text-gray-400 absolute top-6 right-0 rounded-md px-6 py-2 hidden text-center group-hover:block w-[10rem] z-30'>
														<p
															className='mb-4 hover:underline'
															onClick={() => {
																deleteDeposit(item._id);
															}}
														>
															Delete
														</p>
														<p
															className='hover:underline'
															onClick={() => {
																router.push(
																	`/admin/makeDeposit?ID=${item.user}`,
																);
															}}
														>
															{" "}
															Make Deposit
														</p>
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				)}

				{!deposit && (
					<div>
						<h1 className='mb-4 text-gray-400'>Withdrawal Request</h1>

						<table className='p-4 rounded-lg w-full bg-gray-100'>
							<thead className=''>
								<tr className='text-center'>
									<th className='text-sm font-medium p-2'>Amount</th>
									<th className='text-sm font-medium p-2'>Status </th>
								</tr>
							</thead>
							<tbody class='space-y-8'>
								{withdrawlData?.map((item, index = item._id) => (
									<>
										<tr
											className='text-center mt-4 p-8 cursor-pointer '
											key={index}
										>
											{/* <td className='py-1 px-6'>
										{months[new Date(item.createdAt).getMonth() - 1]}{" "}
										<span>{new Date(item.createdAt).getDate()}</span>{" "}
									</td> */}
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
											

											<td className='hidden md:table-cell'>
												<div
													className='relative group flex flex-col items-center cursor-pointer'
													onClick={() => {
														router.push(`/admin/UpdateWithdraw?ID=${item._id}`);
													}}
												>
													<PencilSquareIcon className='w-6 h-6' />
													<div className='bg-gray-200  text-gray-400 absolute top-6 -left-12 rounded-md px-6 py-2 hidden text-center group-hover:block md:w-[10rem]'>
														Update Withdraw
													</div>
												</div>
											</td>

											<td className='block md:hidden'>
												<div
													className='relative group flex flex-col items-center cursor-pointer'
													onClick={() => {
														setOpen(!open);
													}}
												>
													<EllipsisHorizontalIcon className='w-6 h-6' />
													{open && (
														<div className='bg-gray-200  text-gray-400 absolute top-6 right-0 rounded-md px-6 py-2 hidden text-center group-hover:block w-[12rem]'>
														
															<p
																className='hover:underline'
																onClick={() => {
																	router.push(
																		`/admin/UpdateWithdraw?ID=${item._id}`,
																	);
																}}
															>
																{" "}
																Update Withdraw
															</p>
														</div>
													)}
												</div>
											</td>
										</tr>
									</>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
        </>
	);
};

export default User;
