import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../utils/UserContext";
import EditProfile from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import SnackBox from "../reusable/snack-boxes/SnackBox";
import styles from "./ProfileActions.module.css";

const ProfileActions = ({ user }) => {
    const { onClose, isShowing, onOpen } = useModal();
    const { setUser, user: currentUser } = useUser();
    const [open, setOpen] = useState(false);

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

    return (
        <div className={styles.group}>
            {!isCurrentUser() ? (
                <Button scheme={"primary"}>Follow</Button>
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
