import { Button, Nav, NavItem } from "reactstrap";  // Corrected import
import Logo from "../assets/logosaas.png";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Alert",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Bookings",
    href: "/table",
    icon: "bi bi-patch-check",
  },
  {
    title: "Chat",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Add Services",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  {
    title: "Sales Tracker",
    href: "/grid",
    icon: "bi bi-columns",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();

  return (
    <div className="p-4">
      <div className="flex items-center">
        <img src={Logo} alt="saaslogo" className="h-10 w-10" />
        <h3 className="ml-2 text-xl font-bold">WorkWave</h3>
        <span className="ms-auto block lg:hidden">
          <Button
            close
            size="sm"
            onClick={showMobilemenu}
            className="lg:hidden"
          />
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="space-y-2">
          {navigation.map((navi, index) => (
            <NavItem key={index}>
              <Link
                to={navi.href}
                className={`${
                  location.pathname === navi.href
                    ? "text-blue-500"
                    : "text-gray-700"
                } flex items-center py-3 hover:text-blue-500 transition-colors duration-200`}
              >
                <i className={`${navi.icon} text-xl mr-3`}></i>
                <span>{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
