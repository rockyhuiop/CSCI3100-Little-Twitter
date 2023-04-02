import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import FancyInput from "./FancyInput";
import FooterActionForm from "./FooterActionForm";

const Reg = ({ onClose, isShowing, showLogin }) => {
    return (
        <Modal isShowing={isShowing} onClose={onClose} width={"420px"}>
            <ModalHeader>
                <ModalCross />
            </ModalHeader>
            <ModalBody>
                <FooterActionForm
                    alternativeText={"Already got an account?"}
                    alternativeLinkText={"Login"}
                    showAlternative={showLogin}
                    onSubmit={() => {}}
                    submitButtonText={"Register"}
                    title={"Register"}
                >
                    <FancyInput
                        label={"Username"}
                        name="username"
                        placeholder={"Enter username..."}
                    />
                    <FancyInput
                        label={"E-mail"}
                        name="email"
                        placeholder={"Enter email..."}
                    />
                    <FancyInput
                        label="Password"
                        name="password"
                        password="password"
                        type="password"
                        placeholder={"Enter password..."}
                    />
                    <FancyInput
                        label="Confirm Password"
                        name="confirm-password"
                        type="password"
                        placeholder={"Confirm password..."}
                    />
                </FooterActionForm>
            </ModalBody>
        </Modal>
    );
};
export default Reg;
