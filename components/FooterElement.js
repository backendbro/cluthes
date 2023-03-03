import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function FooterElement({ title, list, index, number }) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<div
				className='flex justify-between'
				onClick={() => {
					setOpen(!open);
				}}
			>
				<h1 className='font-semibold text-[1.2rem] mb-4'> {title} </h1>

				<ChevronDownIcon className='text-black w-4 h-4 md:hidden' />
			</div>
			{open ? (
				number === index && (
					<ul className='block'>
						{list.map((item, index) => (
							<li
								className='block text-gray-400 text-[.8rem] my-2 list-style-none'
								key={index}
							>
								{item}
							</li>
						))}
					</ul>
				)
			) : (
				<ul className='hidden md:block'>
					{list.map((item, index) => (
						<li
							className='block text-gray-400 my-2 text-[.8rem] list-style-none'
							key={index}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default FooterElement;
