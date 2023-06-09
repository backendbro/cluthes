import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import AdminHeader from "../../components/AdminHeader"
import { useRouter } from "next/router";

const UpdateWithdraw = () => {
	const [user, setUser] = useState({});
	const [status, setStatus] = useState("Pending");
	const [withdraw, setWithdraw] = useState();
	const btnRef = useRef(null);
	const [load, setLoad] = useState(false);
	const router = useRouter();
	const { ID } = router.query;

	const MonthArr = [
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
	}, []);

	const getWithdrawal = async () => {
		
		await axios
			.post(
				` https://cluth-space.onrender.com/api/withdrawal/single-withdraw`,
				{
					withDrawalId: ID,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then((res) => {
			
				const rep = res.data;
				
				setWithdraw(rep.withDrawalRequest);
				
			})
			.catch((err) => {
				return 
			});
	};

	const updateWithdrawal = async () => {
	
		setLoad(true);
		await axios
			.put(
				"https://cluth-space.onrender.com/api/withdrawal/confirm-withdraw",
				{
					userId: withdraw?.user,
					withDrawalId: withdraw?._id,
					status: document.getElementById("select").value,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then(function (response) {
			
				setLoad(false);
				router.push(`/admin/User?ID=${withdraw?.user}`);
			})
			.catch((err) => {
				setLoad(false);
				router.push(`/admin/User?ID=${withdraw?.user}`);
			
			});
	};

	return (
		<>
        <AdminHeader />
        <div className='flex items-center justify-center h-screen'>
			<div className='bg-gray-200 p-6 w-full flex flex-col space-y-6 md:w-[30rem] rounded-lg'>
				<p className='even'>ID: {withdraw?._id} </p>
				<p className='odd'> UserID: {withdraw?.user} </p>
				<p className='even'>Amount: {withdraw?.amount} </p>
				<div className='flex gap-2'>
					<label for='action'>Status</label>
					<select
						id='select'
						required
						className='admin-select bg-transparent w-full'
						onChange={(e) => setStatus(e.target.value)}
					>
						{withdraw?.status === "Pending" ? (
							<option selected>Pending</option>
						) : (
							<option>Pending</option>
						)}
						{withdraw?.status === "Confirmed" ? (
							<option selected>Confirmed</option>
						) : (
							<option>Confirmed</option>
						)}
						{withdraw?.status === "Failed" ? (
							<option selected>Failed</option>
						) : (
							<option>Failed</option>
						)}
					</select>
				</div>

				{withdraw?.status === "Confirmed" || withdraw?.status ==="Failed"  ? (
					<button
						className='bg-green py-2 px-6 text-white text-center rounded-lg'
						onClick={() => {
							router.push(`/admin/User?ID=${withdraw?.user}`);
						}}
					>
						&larr; Go Back
					</button>
				) : (
					<button
						className='bg-green py-2 px-6 text-white text-center rounded-lg'
						onClick={() => {
							updateWithdrawal();
						}}
					>
						{load ? <BeatLoader color='#fff' size={7} /> : "Confirm"}
					</button>
				)}
			</div>
		</div>
        </>
	);
};

export default UpdateWithdraw;
