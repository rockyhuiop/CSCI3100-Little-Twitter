import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../utils/UserContext";
import EditProfile from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import SnackBox from "../reusable/snack-boxes/SnackBox";
import styles from "./ProfileActions.module.css";

const ProfileActions = ({ user, setData }) => {
    const { onClose, isShowing, onOpen } = useModal();
    const { setUser, user: currentUser, refreshUser } = useUser();
    const [open, setOpen] = useState(false);
    const [hasFollowed, setHasFollowed] = useState(() => {
        return (
            !!currentUser &&
            user.followers.some((u) => u === currentUser.tweetID)
        );
    });

    const afterEdit = (data) => {
        setOpen(true);
        setUser(data);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isCurrentUser = () => {
        return currentUser && currentUser.tweetID === user.tweetID;
    };

    const followOrUnfollowUser = async () => {
        try {
            // this route follows or unfollows a user
            const response = await fetch(`/user/follow/${user.tweetID}`, {
                method: "POST",
            });
            const json = await response.json();
            if (json.error) {
                throw new Error(json.error);
            }
            // the fetched user also needs to be updated
            // very messy logic...
            setData((d) => {
                const copy = [...d.followers];
                // if the user is NOT followed yet
                // then the request above follows that user
                // so we push the current user into the array
                if (!hasFollowed) {
                    copy.push(currentUser.tweetID);
                }
                // if the user is followed alaready
                // then the request above unfollows that user
                // so we remove the current user from that array
                else {
                    const index = copy.findIndex(
                        (n) => n === currentUser.tweetID
                    );
                    copy.splice(index);
                }
                return {
                    ...d,
                    followers: copy,
                };
            });
            setHasFollowed((f) => !f);
            // the current user needs to know that he has followed somebody
            refreshUser();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.group}>
            {!isCurrentUser() ? (
                <Button scheme={"primary"} onClick={followOrUnfollowUser}>
                    {hasFollowed ? "Unfollow" : "Follow"}
                </Button>
            ) : null}
            {isCurrentUser() ? (
                <Button
                    scheme={"primary"}
                    variant={"outlined"}
                    onClick={onOpen}
                >
                    Edit
                </Button>
            ) : null}
            <EditProfile
                isShowing={isShowing}
                onClose={onClose}
                user={user}
                editCallback={afterEdit}
            />
            <Snackbar
                open={open}
                onClose={handleClose}
                autoHideDuration={4000}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <SnackBox variant={"success"}>Profile saved!</SnackBox>
            </Snackbar>
        </div>
    );
};

export default ProfileActions;
