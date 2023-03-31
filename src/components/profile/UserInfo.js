import Avatar from "./Avatar";
import Biography from "./Biography";
import DisplayNameWithHandle from "./DisplayNameWithHandle";
import FollowInfo from "./FollowInfo";
import ProfileActions from "./ProfileActions";
import Stat from "./Stat";
import Tabs from "./Tabs";
import styles from "./UserInfo.module.css";

/**
 * This component represents everything below the banner
 * Receives a user object
 */
const UserInfo = ({ user }) => {
    return (
        <div className={styles.info}>
            <div className={styles["avatar-with-name"]}>
                <Avatar {...user} />
                <DisplayNameWithHandle {...user} />
            </div>
            <ProfileActions />
            <Biography {...user} />
            <div className={styles.stats}>
                <Stat name={"Following"} count={user.following} />
                <Stat name={"Followers"} count={user.followers} />
            </div>
            <FollowInfo {...user} />
            <Tabs {...user} />
        </div>
    );
};

export default UserInfo;
