import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/router";

function WithdrawModal({ open, setOpen, amount, verified, setVerified }) {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	const [Error, setError] = useState(true);
	const [Confirm, setConfirm] = useState(true);
	const [userData, setUserData] = useState()
    const [early, setEarly] = useState(false)
    const router = useRouter()


	
	const handleError = async () => { 


       
            setConfirm(false)
            setError(true);
            axios.post("https://cluth-space.onrender.com/api/withdrawal/request", {
                amount: amount,
            }, 		{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            },).then((res)=> {
                setError(false);
              
            }).catch((err)=> {
               
                if(err.response.data.message === "YOU CANNOT WITHDRAW IN THE NEXT 48HRS"){
                    setError(false)
                    setEarly(true)
                }
            })
    
    
          
            setTimeout(() => {
            }, 5000);       
        
      
	};

	

    const cancel = () => {
        setOpen(false)
        router.reload("/Withdraw")
    }


	return (
		<div className='modBg '>
			<div className='relative bg-transparent h-screen w-screen'>
				<div className='bg-white shadow-md shadow-gray-400 rounded-sm  w-[95%] md:w-[30rem] mx-auto modal px-8 py-4 flex flex-col space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className='text-black font-semibold'>Withdraw</h1>
						<XMarkIcon
							className='w-4 h-4 cursor-pointer'
							onClick={() => {
								cancel();
							}}
						/>
					</div>
					{verified ? (<div className="flex flex-col space-y-4 items-center">
							<p>
								Only verified accounts are allowed to withdraw
							</p>

							<button
								className='px-6 py-2 text-center bg-green rounded-md text-white'
								onClick={()=> router.push("/Verification")}
							>
								Verifiy Account
							</button>
						</div>) : Confirm ? (
						<div className="flex flex-col space-y-4 items-center">
							<p>
								Please make sure your wallet address is correct, or funds maybe
								lost{" "}
							</p>

							<button
								className='px-6 py-2 text-center bg-green rounded-md text-white'
								onClick={handleError}
							>
								Confirm
							</button>
						</div>
					) : Error ? (
						<div className='flex flex-col space-y-4 text-center items-center justify-center mt-24'>
							<MoonLoader color='#36d7b7' />
							Please Wait...
						</div>
					) : early ? (
                        <div className="flex flex-col space-y-4 ">
                            <p className='text-center'>
								<span className="text-[1.2rem] font-bold">Withdrawal is temporarily unavialible</span> <br/>
                                Withdrawal can only be made after 48 hours of deposit
							</p>
							<button className='px-6 py-2 text-center bg-green rounded-md text-white mx-auto' onClick={()=> {
                                router.push("/SendMail")
                            }}>
								Contact Admin
							</button>
                        </div>
                    ) : (
						<div className='flex flex-col space-y-4 mt-24 items-center justify-center'>
							{/* <CheckCircleIcon className='w-24 h-24 text-red-600' /> */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none"
							 viewBox="0 0 24 24" stroke-width="2.5" 
							 stroke="yellow" 
							 class="w-20 h-20">
  							<path stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
							</svg>

							<p className='text-center'>
							<span className="text-[1.2rem] font-bold">Your account is in a state of restricted withdrawal</span> <br/>
							 Your account may be at risk. In order to keep funds safe, withdrawals have been temporarily disabled. 
							   Please contact Customer Assistance for more
							</p>
							<button className='px-6 py-2 text-center bg-green rounded-md text-white' onClick={()=> {
                                router.push("/SendMail")
                            }}>
								Contact Assistance
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default WithdrawModal;
