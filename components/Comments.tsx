import { DocumentData } from "firebase/firestore";
import Moment from "react-moment";

type Props = {
  comment: DocumentData;
  id: string;
};
function Comments({ comment, id }: Props) {
  return (
    <div className="flex items-center space-x-2 mb-3">
      <img
        src={comment.userImage}
        className="rounded-full object-cover h-7"
        alt=""
      />
      <p className="flex-1 text-sm space-x-2">
        <span className="font-bold">{comment.userName} </span> {comment.comment}
        <Moment fromNow className="pr-5 text-xs text-gray-400">
          {comment?.timestamp?.toDate()}
        </Moment>
        {/* <span>{new Date(comment.timestamp).toLocaleString()}</span> */}
      </p>
    </div>
  );
}

export default Comments;
