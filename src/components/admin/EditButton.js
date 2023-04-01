import { Fragment } from "react";
import EditProfileModal from "../editProfile/EditProfileModal";
import Button from "../reusable/Button";
import { useModal } from "../reusable/modal/useModal";

const EditButton = ({ user }) => {
    const { isShowing, onClose, onOpen } = useModal();

    return (
        <Fragment>
            <Button size="small" onClick={onOpen}>
                More & Edit
            </Button>
            {/* reuse the edit profile modal (super lazy) */}
            <EditProfileModal
                user={user}
                onClose={onClose}
                isShowing={isShowing}
            />
        </Fragment>
    );
};

export default EditButton;
