import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { BounceLoader } from "react-spinners";
import AdminHeader from "../../components/AdminHeader";
import MoonLoader from "react-spinners/MoonLoader";
import { useRouter } from "next/router";
const AdminUserVerification = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [Load, setLoad] = useState(false);
	const [loader, setloader] = useState(false);
	const [amount, setAmount] = useState(null);
	const [msg, setMsg] = useState(false);
	const [err, setErr] = useState(false);
	const IDref = useRef();
	const addRef = useRef();
	const accRef = useRef();
	const msgRef = useRef();
	const errRef = useRef();
	const tradingBalRef = useRef();
	const { ID } = router.query;

	useEffect(() => {
		async function getUser() {
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
		
					return;
				});
		}

		getUser();
	}, []);

	const updatProfile = async () => {
		setLoad(true);
		
		await axios
			.put(
				"  https://cluth-space.onrender.com/api/user/update-profile",
				{
					userId: ID,
					idVerification: IDref.current.value,					
					accountStatus: accRef.current.value,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			)
			.then((res) => {
			
				setLoad(false);
				setErr(false);
				setMsg(true);
			})
			.catch((err) => {
				alert(err);
            
				setLoad(false);
				setMsg(false);
				setErr(true);
			});
	};

	return Load ? (
		<div className='flex items-center justify-center h-screen'>
			<BounceLoader color='#36d7b7' size={200} />
		</div>
	) : (
		<>
			<AdminHeader />
			<div className='admin__user__profile rounded-xl !flex-col justify-center items-center p-4'>
				{msg && (
					<p						
						className='text-center mt-1 text-[1.5rem] md:text-[2rem] w-full '
					>
						{" "}
						Profile Updated{" "}
					</p>
				)}
				{err && (
					<p						
						className='text-center mt-1 text-[1.5rem] md:text-[2rem] w-full text-red-500 hidden'
					>
						{" "}
						An Error occured please try again or reload the page{" "}
					</p>
				)}
				<div className='admin__user__profile__con rounded-xl items-center justify-center'>
					<div className='admin__user__profile__con__second flex flex-col gap-4'>
						<h2 className='capitalise font-bold !text-gray-500'>Id Card</h2>
						<div>
							<p className='text-sm'>Front: </p>
							<div className='flex gap-2 items-center'>
								{user?.frontImageUrl ? (
									<>
										<img src={user?.frontImageUrl} alt='image' width='30%' />
										<a href={user?.frontImageUrl} target='_blank'>
											<button className='text-xs bg-gray-400 text-black py-1 px-2'>
												View
											</button>
										</a>
									</>
								) : (
									" No image "
								)}
							</div>
						</div>
						<div>
							<p className='text-sm'>Back: </p>
							<div className='flex gap-2 items-center'>
								{user?.backImageUrl ? (
									<>
										<img src={user?.backImageUrl} alt='image' width='30%' />
										<a href={user?.backImageUrl} target='_blank'>
											<button className='text-xs bg-gray-400 text-black py-1 px-2'>
												View
											</button>
										</a>
									</>
								) : (
									" No image "
								)}
							</div>
						</div>
						{/* <div className='mt-8'>
							<h2 className='capitalise font-bold !text-gray-500 mb-2'>
								Address Bill
							</h2>

							<div className='flex gap-2 items-center'>
								{user?.addressBillPic ? (
									<>
										{" "}
										<img src={user?.addressBillPic} alt='image' width='30%' />
										<a href={user?.addressBillPic} target='_blank'>
											<button className='text-xs bg-gray-400 text-black py-1 px-2'>
												View
											</button>
										</a>
									</>
								) : (
									" No image "
								)}
							</div>
						</div> */}
					</div>

					<div className='admin__user__profile__con__third'>
						<form className='flex flex-col space-y-4'>
							<div>
								<label>Id Verification</label>
								<select ref={IDref}>
									{user?.idVerification === "Pending" ? (
										<option value='Pending' selected>
											Pending
										</option>
									) : (
										<option value='Pending'>Pending</option>
									)}
									{user?.idVerification === "Skipped" ? (
										<option value='Skipped' selected>
											Skipped
										</option>
									) : (
										<option value='Skipped'>Skipped</option>
									)}
									{user?.idVerification === "Completed" ? (
										<option value='Completed' selected>
											Completed
										</option>
									) : (
										<option value='Completed'>Completed</option>
									)}
									{user?.idVerification === "In Progress" ? (
										<option value='In Progress' selected>
											In Progress
										</option>
									) : (
										<option value='In Progress'>In Progress</option>
									)}
								</select>
							</div>
							{/* <div>
								<label>Address Verification</label>
								<select ref={addRef}>
									{user?.addressVerification === "Pending" ? (
										<option value='Pending' selected>
											Pending
										</option>
									) : (
										<option value='Pending' selected=''>
											Pending
										</option>
									)}
									{user?.addressVerification === "Completed" ? (
										<option value='Completed' selected>
											Completed
										</option>
									) : (
										<option value='Completed'>Completed</option>
									)}
									{user?.addressVerification === "In Progress" ? (
										<option value='In Progress' selected>
											In Progress
										</option>
									) : (
										<option value='In Progress'>In Progress</option>
									)}
								</select>
							</div> */}
							<div>
								<label>Account Status</label>
								<select ref={accRef}>
									{user?.accountStatus === "Review" ? (
										<option value='Review' selected>
											Review
										</option>
									) : (
										<option value='Review'>Review</option>
									)}
									{user?.accountStatus === "Active" ? (
										<option value='Active' selected>
											Active
										</option>
									) : (
										<option value='Active'>Active</option>
									)}
									{user?.accountStatus === "Locked" ? (
										<option value='Locked' selected>
											Locked
										</option>
									) : (
										<option value='Locked'>Locked</option>
									)}
								</select>
							</div>
							<br />
							<div></div>
						</form>
					</div>
					{loader ? (
						<MoonLoader color='red' />
					) : (
						<button
							className='py-2 px-20 mx-auto bg-green bot text-white col-span-3 rounded-xl'
							onClick={updatProfile}
						>
							Submit
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default AdminUserVerification;
