import Link from 'next/link';

const Navbar = function({ user }) {
    return (
    <>
        <div className="flex justify-end py-10 px-5">
            <ul className="list-none inline">
                <Link href='/'><li className="hover:text-blue-200 inline px-2">home</li></Link>
                {/*<Link href='blog'><li className="hover:text-blue-200 inline px-2">blog</li></Link>*/}
                <Link href='apps'><li className="hover:text-blue-200 inline px-2">apps</li></Link>
                {/*<Link href='portfolio'><li className="hover:text-blue-200 inline px-2">portfolio</li></Link>*/}
                {!user.email ? (
                    <Link href='login'><li className="hover:text-blue-200 inline px-2">login</li></Link>
                ) : (
                    <Link href='logout'><li className="hover:text-blue-200 inline px-2">logout</li></Link>
                )}
            </ul>
        </div>
    </>
    )
}

export default Navbar;