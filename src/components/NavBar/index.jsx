import Link from 'next/link'
import {forwardRef} from 'react'

const NavBar = forwardRef (({className}, ref) => {
  return (
    <nav ref={ref} className = {`${className} bg-blue-400`}>
      <ul>
        <li><Link href ="/home">Home</Link></li>
        <li><Link href ="/quotations">Quotations</Link></li>
        <li><Link href ="/services">Services</Link></li>
        <li><Link href ="/users">Users</Link></li>
      </ul>
    </nav>
  )
})

NavBar.displayName = 'NavBar'; // This is necessary for better debugging in React DevTools
export default NavBar;