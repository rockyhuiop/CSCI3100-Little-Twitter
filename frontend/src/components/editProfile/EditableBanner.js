import { useRef } from "react";
import { Camera } from "react-feather";
import styles from "./EditableBanner.module.css";

/**
 * Shows the banner and a button to edit it
 *
 * url: the url of the current banner
 * onBannerChange: the callback invoke when the banner is changed
 */
const EditableBanner = ({ url, onBannerChange }) => {
    // for the hidden file input
    const bannerRef = useRef(null);

    // only use the first file that the user has selected
    const onChange = (event) => {
        onBannerChange(event.target.files[0]);
    };

    return (
        <div
            className={styles.banner}
            style={
                url
                    ? {
                          backgroundImage: `url(${url})`,
                      }
                    : null
            }
        >
            {/* only show when the icon is clicked */}
            <input
                type="file"
                multiple={false}
                className={styles.hide}
                onChange={onChange}
                ref={bannerRef}
            />
            {/* the icon */}
            <div
                className={styles.edit}
                onClick={() => bannerRef.current.click()}
            >
                <Camera />
            </div>
        </div>
    );
};

export default EditableBanner;
