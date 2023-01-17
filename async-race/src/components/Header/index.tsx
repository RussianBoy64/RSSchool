import { NavLink } from "react-router-dom";
import routes from "../../routes";

function Header() {
  return (
    <header>
      {routes.map((route) => (
        <NavLink to={route.path}>{route.page}</NavLink>
      ))}
    </header>
  );
}

export default Header;
