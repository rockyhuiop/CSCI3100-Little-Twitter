import Tabs from "../reusable/Tabs";
import Avatar from "./Avatar";
import Biography from "./Biography";
import DisplayNameWithHandle from "./DisplayNameWithHandle";
import FollowInfo from "./FollowInfo";
import ProfileActions from "./ProfileActions";
import RepliesTab from "./RepliesTab";
import Stat from "./Stat";
import TweetTab from "./TweetTab";
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
            <Tabs tabNames={["Tweets", "Replies"]}>
                <TweetTab user={user} />
                <RepliesTab user={user} />
            </Tabs>
        </div>
    );
};

export default UserInfo;
