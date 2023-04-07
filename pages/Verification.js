import React, { useEffect, useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import {useRouter} from "next/router"

import axios from "axios";
import AssetsHeader from "../components/AssetsHeader";
import Header from "../components/Header";

const Verification = () => {	
    const [userData, setUserData] = useState()
    const [userMail, setUserMail] = useState()
    const router = useRouter()

    useEffect(() => {
		
		setUserData(JSON.parse(localStorage.getItem("userData")));

		let email = userData?.email.slice(0, 2);
		setUserMail(email);		
	}, []);

     

	useEffect(() => {
      
		let data = async () => {
         
			await axios
				.get("https://cluth-space.onrender.com/api/auth/logged-in-user", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				})
				.then((res) => {
							
            		setUserData(res.data.user);

				})
				.catch((err) => {
					return
				});
		};
		data();
	}, []);

	return (
		<>
        <Header />
        <AssetsHeader />

        <div className='verification__container'>
			<div className='verification__con'>
				<div className='images__head'>
                <div className='h-16 w-16 flex items-center justify-center rounded-full border border-black text-lg uppercase text-black mb-6'>
					{userMail}
				</div>

					<p>VERIFICATIONS</p>
				</div>
				<div className='verification__icons'>					

					<div
						className='verification__icon'
						onClick={
                                userData?.idVerification === "Completed"
								? () => {}
								: () => router.push("/IdentityVerification")
						}
					>
						<div className='verification__icon__div2'>
							<BsFillPersonFill className='icon' />
						</div>
						<div className='verification__text__div'>
							<p>Identity Verification</p>
							<p className='p__status'>
								{" "}
								{userData?.idVerification}{" "}
							</p>
						</div>
					</div>

					
				</div>

				<div className='verification__icons'>					

					<div
						className='verification__icon'
						onClick={ 
							() => {
                                router.push("/ChangePassword")

							}
						}
					>
						<div className='verification__icon__div2'>
							<HiLockClosed className='icon' />
						</div>
						<div className='verification__text__div'>
							<p>Change Password</p>
							
						</div>
					</div>

					{/* <div
						className='verification__icon'
						onClick={
							userData?.addressVerification === "Completed"
								? () => {}
								: () => router.push("/AddressVerification")
						}
					>
						<div className='verification__icon__div3'>
							<BsFillHouseDoorFill className='icon' />
						</div>
						<div className='verification__text__div'>
							<p>Address Verification</p>
							<p className='p__status'>
								{" "}
								{userData?.addressVerification}{" "}
							</p>
						</div>
					</div> */}
				</div>
			</div>
		</div>
        </>
	);
};

export default Verification;
