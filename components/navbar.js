import React from 'react';

const Navbar = function() {
    return (
    <div className="flex py-10 px-5">
        <ul className="list-none inline">
          <a href='/'><li className="hover:text-blue-200 inline px-2">home</li></a>
          <a href='/feedback'><li className="hover:text-blue-200 inline px-2">feedback</li></a>
          <a href='#discord link'><li className="hover:text-blue-200 inline px-2">login</li></a>
        </ul>
      </div>
    )
}

export default Navbar;