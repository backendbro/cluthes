import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { BounceLoader, BeatLoader } from "react-spinners";
import Link from "next/link";

const User = () => {
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

	// console.log(ID)

	useEffect(() => {
		getUser();
		getDeposit();
		getWithdrawal();
	}, []);

	const getUser = async () => {
		console.log("getting" + ID);
		setLoad(true);
		console.log(localStorage.getItem("userToken"));
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
				console.log(rep);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getDeposit = async () => {
		console.log("DEpositt");
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
				console.log(rep);
				console.log("DEpositt Success");

				console.log(depositData);
				console.log(depositData[0].createdAt);
			})
			.catch((err) => {
				console.log("DEpositt fail");

				console.log(err);
			});
	};

	const deleteDeposit = async (id) => {
		await axios
			.delete(
				` https://cluth-space.onrender.com/api/deposit/delete-deposit
                `,
				{
					depositId: "640bb0420edec0524c2ea43b",
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
				// setDepositData(rep);
				console.log(rep);
				// console.log(depositData);
				// console.log(depositData[0].createdAt);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getWithdrawal = async () => {
		console.log("Withdraw");
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
				console.log(rep)    ;
                setWithdrawlData(rep.withDrawalRequests)
				console.log("Withdraw Success");
			})
			.catch((err) => {
				console.log("Withdraw fail");

				console.log(err);
			});
	};

	return Load ? (
		<div className='flex items-center justify-center h-screen'>
			<BounceLoader color='#36d7b7' size={200} />
		</div>
	) : (
		<div className='w-[95%] md:w-[80%] lg:w[60%] mx-auto flex flex-col space-y-8 py-6  '>
			<div className='mx-auto flex flex-row md:flex-row gap-4 md:items-center p-4 '>
				<div className='w-[30%] rounded-full overflow-hid'>
					<img src='/images/z.png' width='100%' className='rounded-full' />
				</div>
				<div className='flex flex-col sapce-y-12 '>
					<div className=' flex flex-col space-y-2'>
						<div className='flex gap-2 text-sm text-gray-400'>
							<p className='user__p1'>EMAIL</p>
							<p className='text-xs'>: {user?.email}</p>
						</div>

						<div className='flex gap-2 text-sm text-gray-400'>
							<p className='user__p1'>PHONE NUMBER</p>
							<p className='text-xs'>{user?.phoneNumber}</p>
						</div>
						<div className='flex gap-2 text-sm text-gray-400'>
							<p className='user__p1'>USERNAME</p>
							<p className='text-xs'>{user?.username}</p>
						</div>
					</div>

					<Link
						className='mt-4 py-2 px-4 w-full rounded-md green bg-green border border-green-200 !text-white text-center'
						href={`/admin/SendEmail?ID=${user?._id}&email=${user?.email}`}
						style={{ color: "#cf2465", cursor: "pointer" }}
					>
						Send Email
					</Link>
				</div>
			</div>

			<div className='w-full flex flex-col space-y-4'>
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
										{months[new Date(item.createdAt).getMonth() - 1]}{" "}
										<span>{new Date(item.createdAt).getDate()}</span>{" "}
									</td>
									<td className='py-1 px-6'> {item.amount} </td>
									<td className=' '>
										<span className=' bg-green-200  green py-1 px-6 rounded-lg'>
											{item.status}
										</span>
									</td>
									<td>
										<TrashIcon
											className='w-6 h-6  cursor-pointer'
											onClick={() => {
												deleteDeposit(item._id);
											}}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{!deposit && (
					<div>
						<h1 className='mb-4 text-gray-400'>Withdrawal Request</h1>

						<table className='p-4 rounded-lg w-full bg-gray-100'>
							<thead className=''>
								<tr className='text-center'>
									<th className='text-sm font-medium p-2'>Date</th>
									<th className='text-sm font-medium p-2'>Amount</th>									
								</tr>
							</thead>
							<tbody>								

                                {withdrawlData?.map((item, index = item._id) => (

                                    <>                                    
								<tr className='text-center mt-4 p-4 cursor-pointer ' key={index} >

									{/* <td className='py-1 px-6'>
										{months[new Date(item.createdAt).getMonth() - 1]}{" "}
										<span>{new Date(item.createdAt).getDate()}</span>{" "}
									</td> */}
									<td className='py-1 px-6'> {item.amount} </td>
									<td className=''>
										{item.status == "Approved" && (
											<span
												className='cursor-pointer bg-green-200 green py-1 px-4 rounded-lg'
												onClick={() => {
													setaccept(false);
												}}
											>
												Approved
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
									<td>
										<Link   href={`/admin/UpdateWithdraw?ID=${item._id}`} className="bg-green text-white text-center py-1 px-4 rounded-md"> Update </Link>
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
	);
};

export default User;
