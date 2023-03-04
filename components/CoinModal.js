import React, { useRef, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function CoinModal({ open, setOpen }) {
	const inputRef = useRef(null);
	const [isFocused, setIsFocused] = useState(false);

	const onFocus = () => setIsFocused(true);
	const onBlur = () => setIsFocused(false);
	return (
		<div className='modBg '>
			<div className='relative bg-transparent h-screen w-screen'>
				<div className='bg-white shadow-md shadow-gray-400 rounded-sm  min-h-[70vh] w-[95%] md:w-[30rem] mx-auto modal px-8 py-4 flex flex-col space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className="text-black font-semibold">Coin</h1>
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
					<div>
						<h1 className='text-gray-500 text-xs mb-2'>Top</h1>
						<div className='flex flex-wrap gap-4 w-full'>
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								USDT
							</h1>
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								TRX
							</h1>{" "}
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								BTC
							</h1>{" "}
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								ENQ
							</h1>{" "}
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								ETH
							</h1>
							<h1 className='text-xs text-gray-400 bg-gray-200 py-1 px-2 rounded-md'>
								XRP
							</h1>
						</div>
					</div>
                    <div className="overflow-y-scroll h-[35vh] ">
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                        <h1>d</h1>
                    </div>
				</div>
			</div>
		</div>
	);
}

export default CoinModal;
