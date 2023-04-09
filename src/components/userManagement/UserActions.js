import { Snackbar } from "@mui/material";
import { useState } from "react";
import { Delete, Edit, Pause } from "react-feather";
import EditProfileModal from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import IconMenu from "../reusable/IconMenu";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import { useModal } from "../reusable/modal/useModal";
import SnackBox from "../reusable/snack-boxes/SnackBox";
import styles from "./UserActions.module.css";
import { useUserMangement } from "./UserManagementContext";

/**
 * It needs to know what user to act on
 */
const UserActions = ({ user }) => {
    const {
        onClose: onEditClose,
        isShowing: isEditShowing,
        onOpen: onEditOpen,
    } = useModal();
    const {
        onClose: onDeleteClose,
        isShowing: isDeleteShowing,
        onOpen: onDeleteOpen,
    } = useModal();
    const [open, setOpen] = useState(false);
    const { updateUser } = useUserMangement();

    const onPause = () => {};

    const onEdit = () => {
        onEditOpen();
    };

    const onDelete = () => {
        onDeleteOpen();
    };

    // I should use a new edit form to be honest
    // this is getting out of control
    const afterEdit = (data) => {
        updateUser(data);
        onEditClose();
        setOpen(true);
    };

    return (
        <td>
            <IconMenu
                names={["Suspend", "Edit", "Remove"]}
                keySuffix={user.id}
                clickHandlers={[onPause, onEdit, onDelete]}
                icons={[
                    <Pause size={16} />,
                    <Edit size={16} />,
                    <Delete size={16} />,
                ]}
            />
            <EditProfileModal
                user={user}
                onClose={onEditClose}
                isShowing={isEditShowing}
                editCallback={afterEdit}
            />
            <Modal isShowing={isDeleteShowing} onClose={onDeleteClose}>
                <ModalHeader>
                    <ModalCross />
                </ModalHeader>
                <ModalBody>
                    <p className={styles.text}>
                        Are you sure that <b>{user.username}</b> should be
                        deleted? This cannot be undone!
                    </p>
                    {/* currently it does nothing */}
                    <Button
                        size="big"
                        scheme={"danger"}
                        onClick={onDeleteClose}
                    >
                        Delete User!
                    </Button>
                </ModalBody>
            </Modal>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={4000}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <SnackBox variant={"success"}>Profile Saved</SnackBox>
            </Snackbar>
        </td>
    );
};

export default UserActions;
