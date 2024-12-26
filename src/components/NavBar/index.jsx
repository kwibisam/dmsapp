import Link from 'next/link'
import {forwardRef} from 'react'

const NavBar = forwardRef (({className}, ref) => {
  return (
    <nav ref={ref} className = {`${className} py-4`}>
      <ul className='flex flex-col gap-4'>
        <li><LinkItem href="/home">Home</LinkItem></li>
        <li><LinkItem href="/quotations">Quotations</LinkItem></li>
        <li><LinkItem href="/services">Services</LinkItem></li>
        <li><LinkItem href="/users">Users</LinkItem></li>
      </ul>
    </nav>
  )
})


const LinkItem = ({ href, children }) => {
  return (
    <Link className='block px-4 py-0 font-semibold text-lg' style={{color: '#184160'}} href={href}>{children}</Link>
  );
};

NavBar.displayName = 'NavBar'; // This is necessary for better debugging in React DevTools
export default NavBar;