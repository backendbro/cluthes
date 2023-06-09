import React from "react";
import { AssetsHeaderData, AssetDataMobile } from "../data/AssetsHeaderData";
import { AssetsHeaderDataLeft } from "../data/AssetsHeaderDataLeft";
import NavLink from "./NavLink";

function AssetsHeader() {
	return (
		<div className='mb-16 bg-gray-200 py-2 pb-0 px-4 overflow-x-scroll w-[98vw]  scroll-hidden mx-auto hidden lg:block'>
			<div className='overflow-hidden  lg:w-[90%] lg:mx-auto w-[50rem]  flex lg:justify-between gap-4 '>
				<div className='hidden md:flex gap-8 w-[62%]   lg:w-[50%]'>
					{AssetsHeaderData.map((item, index) => (
						<NavLink href={item.href} key={index}>
							<h1> {item.name} </h1>
						</NavLink>
					))}
				</div>

                <div className='md:hidden flex gap-8 w-[62%]   lg:w-[50%]'>
					{AssetDataMobile.map((item, index) => (
						<NavLink href={item.href} key={index}>
							<h1> {item.name} </h1>
						</NavLink>
					))}
				</div>

				<div className='flex gap-8 w-[70%]  lg:w-[40%] -ml-[25rem] md:-ml-0' >
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
