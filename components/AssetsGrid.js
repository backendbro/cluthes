import React, { useEffect, useState } from "react";
import GridElement from './GridElement'
import axios from "axios";


function AssetsGrid() {

	const [userBal, setUserBal] = useState(0.00);
	const [converter, setConverter] = useState(null);



	useEffect(() => {	
        getBalance();
    }, []);
	


    const getBalance = async () => {
		const url = "https://cluth-space.onrender.com/api/deposit/get-balance";
		try {
			const res = await axios.post(
				url,
				{ userId: String(JSON.parse(localStorage.getItem("userData"))._id) },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("userToken")}`,
						"Content-Type": "application/json",
					},
				},
			);

			const bal = res.data;
			setUserBal(bal.balance.balance);			
			getConverter();
		} catch (error) {
			console.log(error);
		}
	};

	getConverter();
    async function getConverter() {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${userBal}`).then((res)=> {
            setConverter(res.data)
        }).catch((err)=> { 
			return
		})
    }


	

  return (
    <div className='mt-20 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 '>
        <GridElement title="Main Account" amount={converter} subAmount={userBal} color="border-t-green-300"/>
        <GridElement title="Trading Account" amount="0.00" subAmount="0.00" color="border-t-blue-300" />
        <GridElement title="Futures Account" amount="0.00" subAmount="0.00" color="border-t-gray-400" />
        <GridElement title="Trading Bot Account" amount="0.00" subAmount="0.00" color="border-t-blue-300" />
        <GridElement title="Financial Account" amount="0.00" subAmount="0.00" color="border-t-gray-400" />
    </div>
  )
}

export default AssetsGrid