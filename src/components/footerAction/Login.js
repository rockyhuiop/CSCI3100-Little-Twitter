import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import FancyInput from "./FancyInput";
import FooterActionForm from "./FooterActionForm";

const Login = ({ isShowing, onClose, showRegister }) => {
    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"420px"}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <FooterActionForm
                    alternativeText={"Do not have an account?"}
                    alternativeLinkText={"Register"}
                    showAlternative={showRegister}
                    onSubmit={() => {}}
                    submitButtonText={"Login"}
                    title={"Login"}
                >
                    <FancyInput
                        label={"Username"}
                        name="username"
                        placeholder={"Enter username..."}
                    />
                    <FancyInput
                        label={"Password"}
                        name="password"
                        type="password"
                        placeholder={"Enter password"}
                    />
                </FooterActionForm>
            </ModalBody>
        </Modal>
    );
};
export default Login;
