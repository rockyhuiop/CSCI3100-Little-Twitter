import { useRef } from "react";
import { Camera } from "react-feather";
import styles from "./EditableBanner.module.css";

const EditableBanner = ({ url, onBannerChange }) => {
    const bannerRef = useRef(null);

    const onChange = (event) => {
        onBannerChange(event.target.files[0]);
    };

    return (
        <div
            className={styles.banner}
            style={
                url
                    ? {
                          background: `url(${url})`,
                      }
                    : null
            }
        >
            {
                <input
                    type="file"
                    multiple={false}
                    className={styles.hide}
                    onChange={onChange}
                    ref={bannerRef}
                />
            }
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
