import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./styles.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      {routes.map((route) => (
        <NavLink className={styles.link} key={route.id} to={route.path}>
          {route.page}
        </NavLink>
      ))}
    </header>
  );
}

export default Header;
