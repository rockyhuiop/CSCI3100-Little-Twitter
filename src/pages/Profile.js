import { createContext } from "react";
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

// reduce prop drilling into the buttons component
export const ProfileContext = createContext({
    editInfoOpened: false,
    openEditInfo: () => {},
    closeEditInfo: () => {},
});

const Profile = () => {
    return (
        <div>
            <Banner user={user} />
            <UserInfo user={user} />
            {/* pull the modal out of the profile component */}
        </div>
    );
};

export default Profile;
