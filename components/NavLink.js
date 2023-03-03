import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function NavLink({children,href, active = false}) {
    const child = React.Children.only(children)
    const router = useRouter()
  return (
    <Link href={href}>
        {React.cloneElement(child, {
            "aria-current":router.pathname === href || active ? "page" : null 
        })}
    </Link>
  )
}

export default NavLink