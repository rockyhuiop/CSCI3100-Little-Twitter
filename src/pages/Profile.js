import Banner from "../components/profile/Banner";
import UserInfo from "../components/profile/UserInfo";

// PRETEND WE HAVE A USER
const user = {
    avatar: "",
    banner: "",
    biography:
        "Lorem ipsum sit amet, consectur adipiscing whatever the hell it means.",
    followers: 128,
    following: 35,
    username: "Lorem Ipsum User",
    handle: "lorem1",
    tweets: [],
    replies: [],
};

const Profile = () => {
    return (
        <div>
            <Banner user={user} />
            <UserInfo user={user} />
        </div>
    );
};

export default Profile;
