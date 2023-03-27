import React from "react";
import {useRouter} from "next/router"

function VerifyEmail() {
	const router = useRouter();
	return (
		<div className='flex items-center justify-center   h-[70vh]'>
			<div className='bg-gray-100 shadow-md shadow-gray-700 w-[95%] rounded-md p-4 md:w-[50rem] mx-auto py-[4rem] '>
				<div className='flex flex-col space-y-4  justify-center'>
					<h4 className='text-capitalize text-center font-bold text-[2rem] capitalize '>
						Verify your email
					</h4>
					<p className='text-center font-medium'>
						Please click the button below to verify your email
					</p>

					<div
						onClick={() => router.push("/EmailToken")}
						className='text-white  cursor-pointer !mt-14  font-semibold bg-green rounded-lg py-[1rem] px-[3rem] text-center md:w-[30%] w-[70%] mx-auto'
					>
						Verify
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerifyEmail;
