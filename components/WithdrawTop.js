import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CoinModal from "./CoinModal";
import NetworkModal from "./NetworkModal";

function WithdrawTop() {
	const [coinOpen, setCoinOpen] = useState(false);
	const [networkOpen, setNetworkOpen] = useState(false);
	return (
		<div>
			{/* // Modals
        // Coin Modal */}
			{coinOpen && <CoinModal open={coinOpen} setOpen={setCoinOpen} />}
			{networkOpen && (
				<NetworkModal open={networkOpen} setOpen={setNetworkOpen} />
			)}
			<h1 className='mb-8'>Withdraw Crypto</h1>
			<div>
				<div className='flex flex-col space-y-8 justify-start'>
					<div className='flex gap-14 w-full items-center'>
						<h2>Select Coin</h2>
						<div className='w-[60%] '>
							<p className='text-sm text-gray-400'>Coin</p>
							<div
								className='bg-gray-300 rounded-md px-2 py-4 flex-grow flex cursor-pointer justify-between'
								onClick={() => {
									setCoinOpen(true);
								}}
							>
								<div>
									<h1>
										BTC <span className='text-gray-500'>Bitcoin</span>
									</h1>
								</div>
								<ChevronDownIcon className='w-4 h-4' />
							</div>
						</div>
					</div>

					<div className='flex gap-4 w-full items-center'>
						<h2>Select a Network</h2>
						<div className='w-[60%] '>
							<div className='flex gap-4 mb-8 border-2 border-b-gray-400 border-transparent w-full md:w-[14rem]'>
								<h1>Wallet Address</h1>
								<h1>KuCoin User</h1>
							</div>

							<div className="flex flex-col space-y-6 ">
								<div>
                                <p className='text-sm text-gray-400'>Wallet Address</p>
								<input
									className='bg-gray-300 rounded-md px-2 py-4 outline-green-300 w-full'
									type='text'
									placeholder='Enter Withdrawal Address'
								/>
                                </div>

								<div>
                                <p className='text-sm text-gray-400'>Network</p>
								<div
									className='bg-gray-300 rounded-md px-2 py-4 flex-grow flex cursor-pointer justify-between'
									onClick={() => {
										setNetworkOpen(true);
									}}
								>
									<h1 className='text-gray-500'>Select a Network</h1>
									<ChevronDownIcon className='w-4 h-4' />
								</div>
                                </div>
							</div>
						</div>
					</div>
				</div>

				{/* FAQ */}
				<div></div>
			</div>
		</div>
	);
}

export default WithdrawTop;
