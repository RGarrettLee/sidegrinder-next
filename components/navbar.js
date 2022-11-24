import React from 'react';
import Link from 'next/link';

const Navbar = function() {
    return (
    <div className="flex py-10 px-5">
        <ul className="list-none inline">
            <Link href='/'><li className="hover:text-blue-200 inline px-2">home</li></Link>
            <Link href='/feedback'><li className="hover:text-blue-200 inline px-2">feedback</li></Link>
            <Link href='#discord-login'><li className="hover:text-blue-200 inline px-2">login</li></Link>
        </ul>
      </div>
    )
}

export default Navbar;