import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function WithdrawModal({ open, setOpen, user }) {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);

	const onFocus = () => setIsFocused(true);
	const onBlur = () => setIsFocused(false);
	return (
		<div className='modBg '>
			<div className='relative bg-transparent h-screen w-screen'>
				<div className='bg-white shadow-md shadow-gray-400 rounded-sm  min-h-[70vh] w-[95%] md:w-[30rem] mx-auto modal px-8 py-4 flex flex-col space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className='text-black font-semibold'>Update Withrawal</h1>
						<XMarkIcon
							className='w-4 h-4 cursor-pointer'
							onClick={() => {
								setOpen(false);
							}}
						/>
					</div>

					<div className='bg-gray-200 p-6 w-full flex flex-col space-y-6 md:w-[30rem] rounded-lg'>
						<p className='even'>ID: dsklafkadf </p>
						<p className='odd'> UserID: dsaklfndsaf </p>
						<p className='even'>Amount: 100 </p>
						<div className='flex gap-2'>
							<label for='action'>Status</label>
							<select
								id='select'
								required
								className='admin-select bg-transparent w-full'
								onChange={(e) => setStatus(e.target.value)}
							>
								{user?.status === "Pending" ? (
									<option selected>Pending</option>
								) : (
									<option>Pending</option>
								)}
								{user?.status === "Approved" ? (
									<option selected>Approved</option>
								) : (
									<option>Approved</option>
								)}
								{user?.status === "Failed" ? (
									<option selected>Failed</option>
								) : (
									<option>Failed</option>
								)}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WithdrawModal;
