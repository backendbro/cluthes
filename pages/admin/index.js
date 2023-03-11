import React from "react";
// import { Link } from "next/link"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BounceLoader, BeatLoader } from "react-spinners";
import { useRouter } from "next/router"
import Link from "next/link";

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
		console.log("getting")
        await axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("userToken")}`,
				},
			})
			.then(function (response) {
				console.log(response);
				setUserList(response.data);
				setload(false);
			})
			.catch((err) => {
				setUserList(null);
				console.log(err);
			});
	};

	// useEffect(() => {
	// 	setload(true);
	// 	getUser();
	// }, []);
	// console.log(userList, "jk");

	const deleteUser = async (id) => {
        setId(id)
        setDelLoad(true)
		console.log(id);
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
				console.log(response);
                setDelLoad(false)
				getUser();
			})
			.catch((err) => {
				console.log(err);
                setDelLoad(false)
			});
	};

    const handleSearch = async (e) => {
        setSearchLoader(true)
        console.log(search)
        e.preventDefault()
     
        await axios
			.get(   `https://copyoptions.onrender.com/api/admin-user/search-user/searchString?name=${search}`, {
				headers: {
					Authorization: `Bearer ${cookies.userToken}`,
				},
			})
			.then(function (response) {
				console.log(response);				
                setSearchLoader(false)
				setUserList(response.data.searchedUser);
			})
			.catch((err) => {
				setUserList(null);
				console.log(err);
                setSearchLoader(false)
			});
    }


    
	// console.log(userList)

	return load ? (
	<div className="flex items-center justify-center h-screen">
    	<BounceLoader
  color="#36d7b7"
  size={200} />        
    </div>

	) : (
		<>			
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
                                    {item.profilePicture ? <img src={item.profilePicture}  /> : <img
                                        src='https://protradeoptions.live/uploads/images/1664319566CE58F48A-7F6C-404A-B09D-586541DFE14D.jpeg'
                                        alt=''
                                    />}
                                </Link>
                                <Link
                                  href={`/admin/User?ID=${item._id}`}
                                    className='userlist-text'
                                >
                                    <h3>
                                        {key + 1}
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
