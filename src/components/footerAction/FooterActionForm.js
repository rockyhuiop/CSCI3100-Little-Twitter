import Button from "../reusable/Button";
import styles from "./FooterActionForm.module.css";

/**
 * For both of the forms in footer action component
 *
 * children: the form content
 * title: bold title on top of the form
 * showAlternative: this handler will be invoked when the user wants to see another form (e.g. they want the register form instead of the login form)
 * alternativeText: the small hint below the form, telling the users that they can switch forms if needed
 * alternativeLinkText: the clickable link in the small hint
 * onSubmit: when the user presses the submit button
 * submitButtonText: self explanatory
 */
const FooterActionForm = ({
    children,
    title,
    showAlternative,
    onSubmit,
    submitButtonText,
    alternativeText,
    alternativeLinkText,
}) => {
    return (
        <div className={styles.form}>
            <form>
                <h2 align="center">{title}</h2>
                {children}
                <div className={styles.full}>
                    <Button scheme={"secondary"} onClick={onSubmit}>
                        {submitButtonText}
                    </Button>
                </div>
                <p className={styles.hint}>
                    {alternativeText}
                    <span onClick={showAlternative}>{alternativeLinkText}</span>
                </p>
            </form>
        </div>
    );
};

export default FooterActionForm;
