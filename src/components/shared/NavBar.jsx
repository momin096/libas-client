import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);
    const { user, logOut } = useAuth();

    const navLinks = (
        <>
            {/* <li>
                <details>
                    <summary>Shop</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li> */}
            <li><NavLink to="/products">All Products</NavLink></li>
            <li><NavLink to="/shop">On Sale</NavLink></li>
            <li><NavLink to="/new-arrivals">New Arrival</NavLink></li>
            <li><NavLink to="/add-product">Add Product</NavLink></li>
            <li><NavLink to="/manage-products">Manage Products Product</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(res => console.log(res))

    }

    const handleBlur = () => {
        // Only auto-close on small screens
        if (window.innerWidth < 1024) {
            setIsSearchOpen(false);
        }
    };

    const handleSearchClick = () => {
        if (!isSearchOpen) {
            setIsSearchOpen(true);
            // Focus the input after it's open
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <nav>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <Menu className="h-5 w-5" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow space-y-3"
                        >
                            {navLinks}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-xl flex items-center">
                        LIBAS</Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end flex gap-2 items-center">
                    <div className="relative">
                        <div
                            className="flex items-center  rounded-full px-3 py-2 cursor-pointer"
                            onClick={handleSearchClick}
                        >
                            <Search className="text-gray-500" />

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for products..."
                                className={`
                  bg-transparent ml-2 outline-none text-sm transition-all duration-300
                  ${isSearchOpen ? 'w-34' : 'w-0'}
                  lg:w-64
                `}
                                style={{
                                    minWidth: isSearchOpen ? '100px' : '0px',
                                    overflow: 'hidden'
                                }}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>

                    <ShoppingCart className="w-6 h-6 cursor-pointer mx-4" />
                    <div className="mr-2">
                        {
                            user ?
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-md">
                                            <img src={user?.photoURL} alt="User" />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
                                        <li>
                                            <a className="pointer-events-none text-gray-600">
                                                {user?.displayName || "Anonymous"}
                                            </a>
                                        </li>
                                        <li>
                                            <button onClick={handleLogOut}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                :
                                <Link to={'/login'}>
                                    <User className="w-6 h-6 cursor-pointer" />
                                </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
