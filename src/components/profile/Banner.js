import classnames from "classnames";
import { useImage } from "../../utils/useImage";
import styles from "./Banner.module.css";

const Banner = ({ user: { banner: _banner } }) => {
    // I will supply the banner as a CSS property than an actual image
    // maybe bad for accessibility but it should be easier
    let style = {};

    const banner = useImage(_banner);

    // If there is banner, use the banner url instead
    // of the linear gradient background.
    // The gradient-banner class is the background
    // This class will not be applied when there is a banner url
    if (banner) {
        style.backgroundImage = `url(${banner})`;
    }

    return (
        <div
            style={style}
            className={classnames(
                banner ? "" : styles["gradient-banner"],
                styles.banner
            )}
        ></div>
    );
};

export default Banner;
