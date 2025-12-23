import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex">
            <Link
              to={item.url}
              key={index}
              className={`${
                active === index + 1 ? "text-[#FFD700]" : "text-[#fff]"
              } px-6 cursor-pointer py-3 font-semibold `}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
