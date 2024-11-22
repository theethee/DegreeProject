import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavigationLinks() {
  return (
    <ul className="flex flex-col fixed w-full h-full items-center justify-center ">
      <li className="font-bold text-3xl p-8">
        <Link to="/">Hem</Link>
      </li>
      <li className="font-bold text-3xl p-8">
        <Link to="/gallery">Galleri</Link>
      </li>
      <li className="font-bold text-3xl p-8">
        <Link to="/blog">Blogg</Link>
      </li>
      <li className="font-bold text-3xl p-8">
        <Link to="/login">Admin</Link>
      </li>
    </ul>
  );
}

function NavBar() {
  const [nav, setNav] = useState(false);

  const handleBurger = () => {
    setNav(!nav);
  };

  return (
    <>
      {/*absolute justify-between items-center */}
      <div className="absolute items-center justify-between w-full flex p-4">
        <h1 className="text-white font-bold text-2xl z-20">
          {/* När tiden stannar */}
        </h1>
        <HiMenuAlt3
          onClick={handleBurger}
          className="text-gray-400 z-20 cursor-pointer"
          size={25}
        />

        <div
          className={
            nav
              ? " ease-in duration-300 fixed text-gray-300 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 flex-col z-10"
              : "absolute top-0 h-screen left-[-100%] ease-in duration-500 z-10 "
          }
        >
          {nav && <NavigationLinks />}
        </div>
      </div>
    </>
  );
}

export default NavBar;
