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
                name: "",
                tweetID: "",
                email: "",
                password: "",
                password2: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                tweetID: Yup.string().required(),
                password: Yup.string().required(),
                email: Yup.string()
                    .email("This should be a valid email.")
                    .required(),
                // password2  must equal password
                password2: Yup.string()
                    .oneOf(
                        [Yup.ref("password"), null],
                        "This does not match the password."
                    )
                    .required("Confirm password is a required field"),
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.row}>
                            <FancyInput
                                label={"Username"}
                                name="name"
                                type="text"
                            />
                            <FancyInput
                                label={"Tweet ID"}
                                name="tweetID"
                                type="text"
                            />
                        </div>
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
