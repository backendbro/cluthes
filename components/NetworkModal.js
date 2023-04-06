import React, { useRef, useState, useEffect } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MoonLoader } from "react-spinners";
import Image from "next/image"
import axios from "axios"

function NetworkModal({ open, setOpen, setNetwork }) {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);
	const [data, setData] = useState();

	const onFocus = () => setIsFocused(true);
	const onBlur = () => setIsFocused(false);


	useEffect(() => {
		getNetwork();
	}, []);

    const getNetwork = async () => {
		try {
			const res = await axios.get(
				" https://cluth-space.onrender.com/api/stock/network",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
					},
				},
			);
			console.log(res);
			setData(res.data.network);
		} catch (error) {
			console.log(error);
        }
    }
	



	return (
		<div className='modBg '>
			<div className='relative bg-transparent h-screen w-screen'>
				<div className='bg-white shadow-md shadow-gray-400 rounded-sm  min-h-[70vh] w-[95%] md:w-[30rem] mx-auto modal px-8 py-4 flex flex-col space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className="text-black font-semibold">Network</h1>
						<XMarkIcon className='w-4 h-4 cursor-pointer' onClick={()=> {setOpen(false)}} />
					</div>
					<div
						className={`flex gap-2 bg-gray-200 rounded-md items-center py-1 px-2 ${
							isFocused && "border border-green-400"
						}`}
					>
						<MagnifyingGlassIcon className='w-4 h-4 text-gray-400' />
						<input
							ref={inputRef}
							type='text'
							placeholder='Search'
							className='outline-none w-full bg-transparent text-gray-400'
							onFocus={onFocus}
							onBlur={onBlur}
						/>
					</div>					
                    <div className="overflow-y-scroll h-[45vh] ">
                    {data ? (
                            
							Object.keys(data)?.map((cryp, i) => (
                                
								<div
									key={i}
									className='flex gap-4 rounded-lg mb-2 items-center hover:bg-gray-300 cursor-pointer text-gray-400 py-4 px-4'
                                    onClick={()=>{
                                        setOpen(false)
                                        setNetwork(data[cryp])
                                    }}
								>									
									<h1 value={cryp} key={i}>
										{data[cryp].displayName}
									</h1>
								</div>
							))
						) : (
							<div className='flex flex-col space-y-4 text-center items-center justify-center mt-24'>
								<MoonLoader color='#36d7b7' />
								Please Wait...
							</div>
						)}
                    </div>

                    
				</div>
			</div>
		</div>
	);
}

export default NetworkModal;
