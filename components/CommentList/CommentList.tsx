import { CommentType } from "@/types/CommentType";

type Props = {
  comments: CommentType[];
};

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>{comment.text}</li>
      ))}
    </ul>
  );
};
