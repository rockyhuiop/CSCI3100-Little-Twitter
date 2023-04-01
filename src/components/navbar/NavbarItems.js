import NavbarItem from "./NavbarItem";
import styles from "./NavbarItems.module.css";

const NavbarItems = ({ links, spacing = 48 }) => {
    return (
        <div
            className={styles.links}
            style={{
                "--spacing": spacing + "px",
            }}
        >
            {links.map(({ to, icon, name }, index) => {
                return (
                    <NavbarItem
                        to={to}
                        icon={icon}
                        name={name}
                        key={`nav-item-${index}`}
                    />
                );
            })}
        </div>
    );
};

export default NavbarItems;
