import { CommentType } from "@/types/CommentType";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  comments: CommentType[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment, i) => (
        <>
          <ListItem>
            <ListItemText
              primary={comment.text}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ fontStyle: "italic", textAlign: "end" }}
                    variant="body2"
                  >
                    By {comment.name}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {i !== comments.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};
