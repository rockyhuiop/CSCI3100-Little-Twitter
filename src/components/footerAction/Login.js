import Modal from "../reusable/modal/Modal";
import ModalBody from "../reusable/modal/ModalBody";
import ModalCross from "../reusable/modal/ModalCross";
import ModalHeader from "../reusable/modal/ModalHeader";
import FancyInput from "./FancyInput";
import FooterActionForm from "./FooterActionForm";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({ isShowing, onClose, showRegister }) => {
    const nav=useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const handleSubmit = async(e) =>{
        e.preventDefault()

        var details = {
            "email": username,
            "password": password
        };
        
        var user = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          user.push(encodedKey + "=" + encodedValue);
        }

        const response = await fetch("/login",{
            method: "POST",
            body: user.join("&"),
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
            }
        })
        
        const json = await response.json()
        if (!response.ok){
            setError(json.error);
            console.log(error);
        } else if (response.ok){
            setUsername("");
            setPassword("");
            setError(null);
            console.log("ok");
            nav("/bookmark", { replace: true });
        }

    }
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
                    onSubmit={handleSubmit}
                    submitButtonText={"Login"}
                    title={"Login"}
                >
                    <FancyInput
                        onChange={(e) => setUsername(e.target.value)}
                        label={"Username"}
                        name="username"
                        type="text"
                        placeholder={"Enter username..."}
                    />
                    <FancyInput
                        onChange={(e) => setPassword(e.target.value)}
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
