// import { NavLink, useLocation } from "react-router-dom";
// import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import { workwave } from "../assets";
// import { navigation } from "./constants";
// import Button from "./Button";
// import MenuSvg from "../assets/svg/MenuSvg";
// import { HamburgerMenu } from "./design/Header";
// import { useState } from "react";

// const Header = () => {
//   const pathname = useLocation(); // Fixed: destructure pathname
//   const [openNavigation, setOpenNavigation] = useState(false);

//   const toggleNavigation = () => {
//     if (openNavigation) {
//       setOpenNavigation(false);
//       enablePageScroll();
//     } else {
//       setOpenNavigation(true);
//       disablePageScroll();
//     }
//   };

//   const handleClick = () => {
//     if (!openNavigation) return;

//     enablePageScroll();
//     setOpenNavigation(false);
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
//         }`}
//     >
//       <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
//         <a className="block w-[12rem] xl:mr-8" href="#hero">
//           <img src={workwave} width={190} height={40} alt="workwave" />
//         </a>

//         <nav
//           className={`${openNavigation ? "flex" : "hidden"
//             } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
//         >
//           <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
//             {navigation.map((item) => (
//               <NavLink
//                 key={item.id}
//                 to={item.to}
//                 onClick={handleClick}
//                 className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""
//                   } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${pathname.pathname === item.to
//                     ? "z-2 lg:text-n-1"
//                     : "lg:text-n-1/50"
//                   } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
//               >
//                 {item.title}
//               </NavLink>
//             ))}
//           </div>

//           <HamburgerMenu />
//         </nav>

//         <a
//           href="#buisness"
//           className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
//         >
//           Add Buisness
//         </a>

//         <NavLink to="/adminsignup">
//           <Button className="hidden lg:flex">
//             Sign in
//           </Button>
//         </NavLink>

//         <Button
//           className="ml-auto lg:hidden"
//           px="px-3"
//           onClick={toggleNavigation}
//         >
//           <MenuSvg openNavigation={openNavigation} />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
// import { ReactComponent as ArrowRight } from '../assets/arrow-right.svg';
import Logo from "../assets/logosaas.png";
// import { ReactComponent as MenuIcon } from '../assets/menu.svg';
import { NavLink } from "react-router-dom";
import Button from "./Button"

const Header = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 ${
        scroll ? "bg-[#0E0C17]" : "bg-[#0E0C17]"
      } transition-colors text-white `}
    >
      {/* <div className='flex justify-center items-center py-3 bg-black text-white text-sm gap-3'>
        <p className='text-white/60 hidden md:block'>Streamline your workflow and boost your productivity</p>
        <div className='inline-flex gap-1 items-center'>
          <p>Get Started for free</p>
          <ArrowRight className='h-4 w-4 inline-flex justify-center items-center '/>
        </div>
      </div> */}
      <div className="py-5 flex justify-center items-center bg-black text-white text-sm gap-3 ">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <img src={Logo} alt="saaslogo" height={40} width={40} />
              <h1 className="font-bold text-[1.4rem] ml-1">WorkWave</h1>
            </div>
            {/* <MenuIcon className='h-5 w-5 md:hidden' /> */}
            <nav className="hidden md:flex gap-10 text-white/60 items-center">
              <NavLink to="/">Home</NavLink>
              {/* <NavLink to="/BusinessList">Services</NavLink> */}
              <NavLink to="/businessForm">Add Business</NavLink>
              <a href="#customer">Testimonials</a>
              <a href="#help">Help</a>
              <NavLink to="/loginAdmin">
                {/* <button className="bg-white text-black px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                  Login
                </button> */}
                <Button>Login</Button>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
