import { postNewsletterEmail } from "@/helpers/api";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { NotificationContext } from "@/store/NotificationContext";
import { NotificationText } from "@/types/NotificationText";
import { PendingContext } from "@/store/PendingContext";

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
    <section>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHander}>
        <FormControl>
          <InputLabel htmlFor="my-input">Your email</InputLabel>
          <Input
            value={email}
            id="my-input"
            type="email"
            onChange={(e) => onChangeInput(e.target.value)}
          />
        </FormControl>
        <Button type="submit">Register</Button>
      </form>
    </section>
  );
};
