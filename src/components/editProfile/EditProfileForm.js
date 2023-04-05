import { Formik } from "formik";
import { forwardRef } from "react";
import * as Yup from "yup";
import TextInput from "../reusable/form/TextInput";
import styles from "./EditProfileForm.module.css";

// The submit button is outside of the form
// I have to hook a ref to Formik
const EditProfileForm = forwardRef(({ user, handleSubmit }, ref) => {
    return (
        <Formik
            initialValues={{
                username: user.username,
                biography: user.biography,
            }}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                biography: Yup.string().required(),
            })}
            innerRef={ref}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <form
                        className={styles.form}
                        onSubmit={formik.handleSubmit}
                    >
                        <TextInput
                            label={"Username"}
                            name="username"
                            type="text"
                        />
                        <TextInput
                            label={"Biography"}
                            type={"textarea"}
                            name="biography"
                        />
                    </form>
                );
            }}
        </Formik>
    );
});

export default EditProfileForm;
