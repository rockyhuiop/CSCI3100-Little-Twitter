import { Formik } from "formik";
import * as Yup from "yup";
import Button from "../reusable/Button";
import FancyInput from "./FancyInput";
import FancyPasswordInput from "./FancyPasswordInput";
import styles from "./Forms.module.css";

const LoginForm = ({ handleSubmit }) => {
    // just name the email or tweetID field as email to make it simpler
    // since the user now can type tweetID in the input box
    // it may not be an email
    // so the email validation must be removed
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <form onSubmit={formik.handleSubmit}>
                        <FancyInput
                            label={"Email or TweetID"}
                            name="email"
                            type="text"
                        />
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
