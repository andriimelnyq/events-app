import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { NewComment } from "../NewComment";
import { CommentList } from "../CommentList";
import { getCommentsById, postComment } from "../../helpers/api";
import { CommentType } from "../../types/CommentType";
import { NotificationContext } from "../../store/NotificationContext";
import { NotificationText } from "../../types/NotificationText";
import { PendingContext } from "../../store/PendingContext";
import styles from "./Comments.module.scss";

type Props = {
  eventId: string;
};

export const Commments: React.FC<Props> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const { setNotification } = useContext(NotificationContext);
  const { setPending } = useContext(PendingContext);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData: {
    email: string;
    name: string;
    text: string;
  }) => {
    try {
      setPending(true);

      const res = await postComment(eventId, commentData);

      if (comments) {
        setComments([...comments, res.comment]);
        setNotification({
          text: NotificationText.COMMENT_POST_SUCCESS,
          severity: "success",
        });
      }
    } catch {
      setNotification({
        text: NotificationText.COMMENT_POST_ERROR,
        severity: "error",
      });
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);

        const res = await getCommentsById(eventId);

        setComments(res);
      } catch {
        setNotification({
          text: NotificationText.COMMENTS_LOAD_ERROR,
          severity: "error",
        });
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, [eventId, setNotification, setPending]);

  return (
    <section className={styles["comments"]}>
      <Button onClick={toggleCommentsHandler} variant="contained">
        {showComments ? "Hide" : "Show"} Comments
      </Button>

      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && comments && <CommentList comments={comments} />}
    </section>
  );
};
