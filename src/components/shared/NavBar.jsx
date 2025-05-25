import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef(null);

    const navLinks = (
        <>
            <li>
                <details>
                    <summary>Shop</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </details>
            </li>
            <li><NavLink to="/shop">On Sale</NavLink></li>
            <li><NavLink to="/new">New Arrival</NavLink></li>
        </>
    );

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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl flex items-center">
                        <img className="w-10" src="/logo.png" alt="" />
                        BANYAN</a>
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
                  ${isSearchOpen ? 'w-40' : 'w-0'}
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
                    <Link to={'/login'}>
                        <User className="w-6 h-6 cursor-pointer" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
