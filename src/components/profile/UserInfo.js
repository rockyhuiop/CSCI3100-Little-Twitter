import Avatar from "./Avatar";
import Biography from "./Biography";
import DisplayNameWithHandle from "./DisplayNameWithHandle";
import FollowInfo from "./FollowInfo";
import ProfileActions from "./ProfileActions";
import Stat from "./Stat";
import styles from "./UserInfo.module.css";

/**
 * This component represents everything below the banner
 * Receives a user object
 */
const UserInfo = ({ user }) => {
    return (
        <div className={styles.info}>
            <div className={styles["avatar-with-name"]}>
                <Avatar user={user} reduceMargin={true} />
                <DisplayNameWithHandle user={user} />
            </div>
            <ProfileActions user={user} />
            <Biography user={user} />
            <div className={styles.stats}>
                <Stat name={"Following"} count={user.followings.length} />
                <Stat name={"Followers"} count={user.followers.length} />
            </div>
            <FollowInfo user={user} />
        </div>
    );
};

export default UserInfo;
