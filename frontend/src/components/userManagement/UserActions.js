import { Snackbar } from "@mui/material";
import { useState } from "react";
import { Delete, Edit } from "react-feather";
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
import { BACK_SER } from "../../utils/constants";

/**
 * The last column of the users' table
 * Users can be delete and ~~edited~~.
 * user: It needs to know what user to act on
 */
const UserActions = ({ user }) => {
    // the edit profile modal will be shown when the admin clicks on the edit button
    // currently it uses the exact same modal from the profile page
    const {
        onClose: onEditClose,
        isShowing: isEditShowing,
        onOpen: onEditOpen,
    } = useModal();
    // there will be a confirmation modal when admin clicks on the delete button
    // in the modal there will be extra buttons for confirm and cancel (see the JSX below)
    const {
        onClose: onDeleteClose,
        isShowing: isDeleteShowing,
        onOpen: onDeleteOpen,
    } = useModal();
    // for the success notification for editing users
    const [open, setOpen] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const { updateUser, removeUser } = useUserMangement();

    // const onPause = () => {};

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

    // sends a delete requests to the server
    // if it is successful, update the user interface
    // by removing it from the users' table, else do nothing.
    const deleteBtnClicked = async () => {
        try {
            const response = await fetch(BACK_SER+`/dashboard/${user.tweetID}`, {
                method: "DELETE",
                credentials: "include",
            });
            const json = await response.json();

            if (!json.data) {
                throw new Error("cannot delete user");
            } else if (json.error) {
                throw new Error(json.error);
            }
            if (json.data && json.data.deletedCount === 0) {
                throw new Error(
                    "User cannot be deleted. Perhaps he is already not in the database?"
                );
            } else {
                removeUser(user._id);
                setDeleteError("");
                onDeleteClose();
            }
        } catch (error) {
            setDeleteError(error.message ? error.message : error);
        }
    };

    return (
        <td>
            <IconMenu
                // names={["Suspend", "Edit", "Remove"]}
                names={["Edit", "Remove"]}
                keySuffix={user.id}
                // clickHandlers={[onPause, onEdit, onDelete]}
                clickHandlers={[onEdit, onDelete]}
                icons={[
                    // <Pause size={16} />,
                    <Edit size={16} />,
                    <Delete size={16} />,
                ]}
            />
            {/* this WILL NOT show if the admin doesn't click on the edit button */}
            <EditProfileModal
                user={user}
                onClose={onEditClose}
                isShowing={isEditShowing}
                editCallback={afterEdit}
            />
            {/* this WILL NOT show if the admin doesn't click on the delete button */}
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
                        onClick={deleteBtnClicked}
                    >
                        Delete User!
                    </Button>
                    <p>{deleteError}</p>
                </ModalBody>
            </Modal>
            {/* show a confirmation notification when the profile is saved */}
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
