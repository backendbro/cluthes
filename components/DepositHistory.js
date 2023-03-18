import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
	TrashIcon,
	PencilSquareIcon,
	EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";



const DepositHistory = () => {
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
		getDeposit();
		// getWithdrawal();
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
					userId: JSON.parse(localStorage.getItem("userData"))._id,
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
				console.log(rep);
				setDepositData(rep);
				console.log("DEpositt Success");
			})
			.catch((err) => {
				console.log("DEpositt fail");

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
				console.log(rep);
				setWithdrawlData(rep.withDrawalRequests);
				console.log("Withdraw Success");
			})
			.catch((err) => {
				console.log("Withdraw fail");

				console.log(err);
			});
	};

			return (
                deposit && (
                    <div>		
                    <h1 className="text-[1.5rem] font-bold green">Deposit History</h1>

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
									</tr>
								))}
							</tbody>
						</table>
					</div>
                )
            )

		
};

export default DepositHistory;
