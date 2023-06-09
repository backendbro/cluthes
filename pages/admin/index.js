import React from "react";
// import { Link } from "next/link"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AdminHeader from "../../components/AdminHeader"
import { BounceLoader, BeatLoader } from "react-spinners";
import { useRouter } from "next/router"
import Link from "next/link";
import Image from "next/legacy/image";

const UserList = () => {
	const router = useRouter();

	const [userList, setUserList] = useState(null);
	const [load, setload] = useState(false);
    const [delLoad, setDelLoad] = useState(false)
    const [search, setSearch] = useState()
    const [searchloader, setSearchLoader] = useState(false)

    const [id, setId] = useState("")


    useEffect(()=> {
        // setUserList([{
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // }, {
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // }, {
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // },{
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // },{
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // },{
        //     username: "glory",
        //     email:"ezomonglory01@gmail.com"
        // }])

        getUser()
    
    }, [])

	const url =
		" https://cluth-space.onrender.com/api/user/";

	

	const getUser = async () => {
        setload(true)
	
        await axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			})
			.then(function (response) {
				
				setUserList(response.data);
				setload(false);
			})
			.catch((err) => {
				setUserList(null);
				
			});
	};



	const deleteUser = async (id) => {
        setId(id)
        setDelLoad(true)
	
		await axios
			.delete(
				`https://copyoptions.onrender.com/api/admin-user/delete-user`,
				{
					headers: {
						Authorization: `Bearer ${cookies.userToken}`,
					},
					data: {
						id: id,
					},
				},
			)
			.then(function (response) {
				
                setDelLoad(false)
				getUser();
			})
			.catch((err) => {
				
                setDelLoad(false)
			});
	};

   


    
	

	return load ? (
	<div className="flex items-center justify-center h-screen">
    	<BounceLoader
  color="#36d7b7"
  size={200} />        
    </div>

	) : (
		<>			
        <AdminHeader />
			<div className='userlist-con'>				
				<div className='userlist-card-con'>
					{searchloader ? <BeatLoader className="py-4" /> : 
                        userList?.map((item, key) => (
                            <div
                                key={key}
                                className='userlist-card'
                                style={{ cursor: "pointer" }}
                            >
                                <Link
                                   href={`/admin/User?ID=${item._id}`}
                                    className='userlist-img'
                                >
                                    {item.profilePicture ? <Image src={item.profilePicture} alt="Profile Picture" /> : <Image
                                        src='https://t3.ftcdn.net/jpg/03/05/37/70/360_F_305377064_hcyh2OfYl94tMARpvLw8Rzigdx442ajZ.jpg'
                                        alt='User Profile Picture'
					width={200}
					height={200}
                                    />}
                                </Link>
                                <Link
                                  href={`/admin/User?ID=${item._id}`}
                                    className='userlist-text'
                                >
                                    <h3>                                        
                                        <span> {item.firstName}</span>
                                    </h3>                                    
                                    <p>{item.email}</p>
                                    <p> {item.username} </p>
                                </Link>
                                <div
                                    className='userlist-btn'
                                    onClick={() => deleteUser(item._id)}
                                >
                                {/* {delLoad ? id === item._id && <ScaleLoader className="w-12 h-6 text-red-500 mr-4" color="red" />  :
                                    // <AiTwotoneDelete />
                                } */}
                                </div>
                            </div>
                        )
                    )}
				</div>
			</div>
		</>
	);
};

export default UserList;
