import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./NewComment.module.scss";

type Props = {
  onAddComment: (commentData: {
    email: string;
    name: string;
    text: string;
  }) => void;
};

export const NewComment: React.FC<Props> = ({ onAddComment }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const sendCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddComment({
      email,
      name,
      text,
    });

    setEmail("");
    setName("");
    setText("");
  };

  return (
    <form onSubmit={sendCommentHandler}>
      <FormControl className={styles["new-comment"]}>
        <div className={styles["new-comment__top"]}>
          <TextField
            value={email}
            id="text"
            type="email"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            className={styles["new-comment__input"]}
            required
          />

          <TextField
            value={name}
            id="text"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            required
            className={styles["new-comment__input"]}
          />
        </div>

        <div className={styles["new-comment__bottom"]}>
          <TextField
            id="text"
            label="Comment"
            variant="outlined"
            onChange={(e) => setText(e.target.value)}
            required
            multiline
            className={styles["new-comment__comment"]}
            rows={5}
          />
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
