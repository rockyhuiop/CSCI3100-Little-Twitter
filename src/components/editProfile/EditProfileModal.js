import { useMemo, useRef, useState } from "react";
import { SERVER_ADDRESS } from "../../utils/constants";
import Button from "../reusable/Button";
import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import EditableAvatar from "./EditableAvatar";
import EditableBanner from "./EditableBanner";
import EditProfileForm from "./EditProfileForm";
import styles from "./EditProfileModal.module.css";

const EditProfileModal = ({ user, onClose, isShowing, editCallback }) => {
    const formRef = useRef(null);
    const [error, setError] = useState(null);

    // these two fields stores the changes
    const [banner, setBanner] = useState(null);
    const [avatar, setAvatar] = useState(null);

    // when the save button is clicked, call this
    const initiateSubmit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    const formData = new FormData();

    // we still have to pass this down to the form... :(
    const handleSubmit = async (values) => {
        try {
            formData.append("name", values.name);
            formData.append("biography", values.biography);
            // don't send null files to the server
            if (banner) {
                formData.append("banner", banner);
            }
            if (avatar) {
                formData.append("avatar", avatar);
            }
            const response = await fetch("/profile/update", {
                method: "POST",
                body: formData,
            });
            const json = await response.json();

            if (json.error) {
                throw new Error(json.error);
            } else {
                editCallback(json.data);
                onClose();
            }
        } catch (error) {
            setError(error);
        }
    };

    const bannerChanged = (file) => {
        setBanner(file);
    };

    const avatarChanged = (file) => {
        setAvatar(file);
    };

    const bannerURL = useMemo(() => {
        return banner ? URL.createObjectURL(banner) : null;
    }, [banner]);

    const avatarURL = useMemo(() => {
        return avatar ? URL.createObjectURL(avatar) : null;
    }, [avatar]);

    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"640px"}>
            <ModalHeader>
                <div className={styles.left}>
                    <ModalCross />
                    <span>Edit Profile</span>
                </div>
                <Button
                    scheme={"secondary"}
                    onClick={initiateSubmit}
                    type="submit"
                >
                    Save
                </Button>
            </ModalHeader>
            {/* I placed the banner OUTSIDE of the modal body because banner need to have no margin. Noramlly all contents should be inside modal body */}
            <EditableBanner
                onBannerChange={bannerChanged}
                url={bannerURL || (user.banner && SERVER_ADDRESS + user.banner)}
            />
            <ModalBody>
                <div className={styles.avatar}>
                    <EditableAvatar
                        size="smaller"
                        onAvatarChange={avatarChanged}
                        avatar={
                            avatarURL ||
                            (user.avatar && SERVER_ADDRESS + user.avatar)
                        }
                        username={user.name}
                    />
                </div>
                <EditProfileForm
                    user={user}
                    ref={formRef}
                    handleSubmit={handleSubmit}
                />
                {error ? <p className={styles.error}>{error.message}</p> : null}
            </ModalBody>
        </Modal>
    );
};

export default EditProfileModal;
