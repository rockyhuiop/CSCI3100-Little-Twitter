import RepliesTab from "../../components/profile/RepliesTab";
import TweetTab from "../../components/profile/TweetTab";
import Tabs from "../../components/reusable/Tabs";

const ProfileTabs = ({ user }) => {
    return (
        <Tabs tabNames={["Tweets", "Replies"]}>
            <TweetTab user={user} />
            <RepliesTab user={user} />
        </Tabs>
    );
};

export default ProfileTabs;
