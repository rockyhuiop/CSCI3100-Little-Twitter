import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import styles from "./ProfileHeader.module.css";

const ProfileHeader = ({ user }) => {
    const navigate = useNavigate();

    const goBackToPreviousPage = () => {
        // this -1 means previous page...
        navigate(-1);
    };

    return (
        <div className={styles.header}>
            <ArrowLeft
                size={24}
                onClick={goBackToPreviousPage}
                className={styles.arrow}
            />
            <h2>{user.name}</h2>
            <p className={styles.faint}>
                Followed by {user.followers.length} users
            </p>
        </div>
    );
};

export default ProfileHeader;
