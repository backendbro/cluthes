import React from "react";
import { AssetsHeaderData } from "../data/AssetsHeaderData";
import { AssetsHeaderDataLeft } from "../data/AssetsHeaderDataLeft";
import NavLink from "./NavLink";

function AssetsHeader() {
	return (
		<div className='mb-20 bg-gray-200 py-2 pb-0 px-4 overflow-x-scroll w-screen scroll-hidden'>
			<div className='overflow-hidden w-full lg:w-[90%] lg:mx-auto min-w-[62rem] flex lg:justify-between gap-4 '>
				<div className='flex justify-between w-[62%]   lg:w-[50%]'>
					{AssetsHeaderData.map((item, index) => (
						<NavLink href={item.href} key={index}>
							<h1> {item.name} </h1>
						</NavLink>
					))}
				</div>

				<div className='flex justify-between w-[38%] lg:w-[30%]'>
					{AssetsHeaderDataLeft.map((item, index) => (
						<NavLink href={item.href} key={index}>
							<h1> {item.name} </h1>
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
}

export default AssetsHeader;
