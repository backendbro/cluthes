import React from 'react'
// import InsideNav from '../components/Dashboard/Deposit/InsideNav/InsideNav'

import { useRouter } from "next/router"
// import { FaUserFriends, FaPiggyBank } from 'react-icons/fa'
// import { MdAttachMoney } from 'react-icons/md'
// import { RiPagesLine } from 'react-icons/ri'
// import { AiFillWallet } from 'react-icons/ai'
// import { BsShieldShaded } from 'react-icons/bs'

const Admin = () => {
    const router = useRouter()

    return (
        <>            
            <div className='admin__con'>
                {/* <div className="admin__wal">
                    <p>BTC -bc1qu46s440fv3732etygcz5ng23fr9jylkjf062fk</p>
                    <p>ETH -0x0b4c000816Ccc252E77D1bF5A31D54F6f5F8a21c</p>

                    <h2>Control Panel</h2>
                </div> */}
                <div className="admin__control">
                    <div className="admin__tab" onClick={() => router.push("./admin/UserList")}>
                        <div className="admin__icon">
                            
                        </div>
                        <p>USERS</p>
                    </div>
                    <div className="admin__tab" onClick={() => router.push("/admin/plans/list")}>
                        <div className="admin__icon" >
                            
                        </div>
                        <p>PLANS</p>
                    </div>
                    <div className="admin__tab" onClick={() => router.push("/admin/trader/list")}>
                        <div className="admin__icon">
                            
                        </div>
                        <p>TRADERS</p>
                    </div>
                    {/* <div className="admin__tab">
                        <div className="admin__icon">
                            <RiPagesLine />
                        </div>
                        <p>PAGES</p>
                    </div> */}
                    <div className="admin__tab" onClick={() => router.push("/admin/wallet/list")}>
                        <div className="admin__icon">
                            
                        </div>
                        <p>WALLETS</p>
                    </div>
                    <div className="admin__tab" onClick={() => router.push("/admin/payout/list")}>
                        <div className="admin__icon">                            
                        </div>
                        <p>ACTIONS</p>
                    </div>
                    <div className="admin__tab" onClick={() => router.push("/admin/account/password")}>
                        <div className="admin__icon">                            
                        </div>
                        <p>PASSWORD</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin