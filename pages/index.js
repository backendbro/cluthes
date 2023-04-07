import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BounceLoader, BeatLoader } from "react-spinners";

const Index = () => {
	const router = useRouter();
	const [load, setload] = useState(true);

	useEffect(() => {
		const data = localStorage.getItem("userToken");

		if (data) {
			const verifyToken = async () => {
				try {
					await axios
						.get(
							" https://cluth-space.onrender.com/api/auth/logged-in-user  ",
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: ` Bearer ${data}`,
								},
							},
						)
						.then((res) => {
							router.push("/assets");
							console.log(res);
						});
				} catch (err) {
					router.push("/Login");
					setload(false);
					console.log(err);
				}
			};
			verifyToken();
		} else {
			router.push("/Login");
		}
	});

	return (
		<div className='flex items-center justify-center h-screen'>
			<BounceLoader color='#36d7b7' size={200} />
		</div>
	);  
};

export default Index;
