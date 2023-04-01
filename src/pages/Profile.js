import { createContext, useState } from "react";
import { createPortal } from "react-dom";
import EditProfileModal from "../components/editProfile/EditProfileModal";
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
    // a state for managing edit profile modal open and close
    const [editInfoOpened, setEditInfoOpened] = useState(false);

    const openEditInfo = () => {
        setEditInfoOpened(true);
    };

    const closeEditInfo = () => {
        setEditInfoOpened(false);
    };

    return (
        <div>
            <ProfileContext.Provider
                value={{
                    editInfoOpened,
                    openEditInfo,
                    closeEditInfo,
                }}
            >
                <Banner user={user} />
                <UserInfo user={user} />
                {/* pull the modal out of the profile component */}
                {editInfoOpened
                    ? createPortal(
                          <EditProfileModal {...user} />,
                          document.body
                      )
                    : null}
            </ProfileContext.Provider>
        </div>
    );
};

export default Profile;
