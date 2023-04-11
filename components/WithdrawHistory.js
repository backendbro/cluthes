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

const WithdrawHistory = () => {
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

	
	useEffect(() => {
	
		getWithdrawal();
	},[]);




	const getWithdrawal = async () => {
	
		await axios
			.post(
				` https://cluth-space.onrender.com/api/withdrawal/single-user`,
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
				
				setWithdrawlData(rep.withDrawalRequests);
				
			})
			.catch((err) => {
				return
			});
	};

	return (
		<div>
			<h1 className='text-[1.5rem] font-bold green'>Withdraw History</h1>

			<table className='p-4 rounded-lg w-full bg-gray-100'>
				<thead className=''>
					<tr className='text-center'>
						{/* <th className='text-sm font-medium p-2'>Date</th> */}
						<th className='text-sm font-medium p-2'>Amount</th>
						<th className='text-sm font-medium p-2'>Status</th>
					</tr>
				</thead>
				<tbody>
					{withdrawlData?.map((item, i) => (
						<tr className='text-center mt-4 p-4' key={i}>
							{/* <td className='py-1 px-6'>
								{months[new Date(item.createdAt).getMonth()]}{" "}
								<span>{new Date(item.createdAt).getDate()}</span>{" "}
							</td> */}
							<td className='py-1 px-6'> {item.amount} </td>
							<td className=' '>
								{item.status === "Confirmed" && <span className=' bg-green-200  green py-1 px-6 rounded-lg'>
									{item.status}
								</span>}

                                {item.status === "Failed" && <span className=' bg-red-200  text-red-500 py-1 px-10 rounded-lg'>
									{item.status}
								</span>}

                                {item.status === "Pending" && <span className=' bg-gray-200  text-gray-400 py-1 px-8 rounded-lg'>
									{item.status}
								</span>}
							</td>							

							
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WithdrawHistory;
