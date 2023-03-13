import React from 'react'
import { useRouter } from "next/router"
function MakeDeposit ()  {
    const router = useRouter()

    const {ID} = router.query
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-300 rounded-md ">

        </div>
    </div>
  )
}

export default MakeDeposit
