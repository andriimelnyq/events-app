import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {
  onAddComment: (commentData: {
    email: string;
    name: string;
    text: string;
  }) => void;
};

export const NewComment: React.FC<Props> = ({ onAddComment }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const sendCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({
      email,
      name,
      text,
    });
  };

  return (
    <form onSubmit={sendCommentHandler}>
      <FormControl>
        <TextField
          value={email}
          id="text"
          type="email"
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          value={name}
          id="text"
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="text"
          label="Comment"
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
        />
      </FormControl>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <Button type="submit">Submit</Button>
    </form>
  );
};
