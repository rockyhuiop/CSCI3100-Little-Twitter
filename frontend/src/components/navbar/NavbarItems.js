import NavbarItem from "./NavbarItem";
import styles from "./NavbarItems.module.css";

/**
 * Renders a lists of links
 *
 * links: the lists of links, receives the following properties.
 *  to: to which url
 *  icon: which icon to show on the left
 *  name: name of the link
 * spacing: how much margin between each link
 */
const NavbarItems = ({ links, spacing = 32 }) => {
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
