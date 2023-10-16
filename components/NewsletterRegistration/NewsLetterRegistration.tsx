import { postNewsletterEmail } from "@/helpers/api";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { NotificationContext } from "@/store/NotificationContext";
import { NotificationText } from "@/types/NotificationText";
import { PendingContext } from "@/store/PendingContext";
import styles from "./NewsletterRegistration.module.scss";

export const NewsletterRegistration = () => {
  const [email, setEmail] = useState("");
  const { setNotification } = useContext(NotificationContext);
  const { setPending } = useContext(PendingContext);

  const onChangeInput = (value: string) => setEmail(value);

  const registrationHander = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPending(true);
      await postNewsletterEmail(email);

      setNotification({
        text: NotificationText.NEWSLETTER_REG_SUCCESS,
        severity: "success",
      });
    } catch {
      setNotification({
        text: NotificationText.NEWSLETTER_REG_ERROR,
        severity: "error",
      });
    } finally {
      setPending(false);
    }

    setEmail("");
  };

  return (
    <section className={styles["news-letter-registration"]}>
      <Typography variant="h5" gutterBottom>
        Sign up to stay updated!
      </Typography>
      <form
        onSubmit={registrationHander}
        className={styles["news-letter-registration__form"]}
      >
        <FormControl>
          <TextField
            variant="outlined"
            value={email}
            label="Your email"
            type="email"
            onChange={(e) => onChangeInput(e.target.value)}
          />
        </FormControl>
        <Button type="submit" disabled={!email} variant="contained">
          Register
        </Button>
      </form>
    </section>
  );
};
