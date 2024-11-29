import Link from 'next/link'
import {forwardRef} from 'react'

const NavBar = forwardRef (({className}, ref) => {
  return (
    <nav ref={ref} className = {`${className} bg-blue-400`}>
      <ul>
        <li><Link href ="">Home</Link></li>
        <li><Link href ="">Quotations</Link></li>
        <li><Link href ="">Services</Link></li>
        <li><Link href ="">Users</Link></li>
      </ul>
    </nav>
  )
})

NavBar.displayName = 'NavBar'; // This is necessary for better debugging in React DevTools
export default NavBar;