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
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <FancyInput label={"Email"} name="email" type="text" />
                        <FancyPasswordInput
                            label={"Password"}
                            name="password"
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
