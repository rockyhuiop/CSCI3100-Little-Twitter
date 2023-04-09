import { Snackbar } from "@mui/material";
import { useState } from "react";
import EditProfile from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";
import SnackBox from "../reusable/snack-boxes/SnackBox";
import styles from "./ProfileActions.module.css";

const ProfileActions = ({ user }) => {
    const { onClose, isShowing, onOpen } = useModal();
    const [open, setOpen] = useState(false);

    const afterEdit = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.group}>
            <Button scheme={"primary"}>Follow</Button>
            <Button scheme={"primary"} variant={"outlined"} onClick={onOpen}>
                Edit
            </Button>
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
