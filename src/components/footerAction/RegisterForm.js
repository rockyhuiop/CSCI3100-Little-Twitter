import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../reusable/Button";
import FancyInput from "./FancyInput";
import FancyPasswordInput from "./FancyPasswordInput";
import styles from "./Forms.module.css";

const LoginForm = ({ handleSubmit }) => {
    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                password2: "",
            }}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                password: Yup.string().required(),
                email: Yup.string()
                    .email("This should be a valid email.")
                    .required(),
                // password2  must equal password
                password2: Yup.string().oneOf(
                    [Yup.ref("password"), null],
                    "This does not match the password."
                ),
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <FancyInput
                            label={"Username"}
                            name="username"
                            type="text"
                        />
                        <FancyInput label={"Email"} name="email" type="text" />
                        <FancyPasswordInput
                            label={"Password"}
                            name="password"
                        />
                        <FancyPasswordInput
                            label={"Confirm Password"}
                            name="password2"
                        />
                        <div className={styles.full}>
                            <Button scheme={"secondary"} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
