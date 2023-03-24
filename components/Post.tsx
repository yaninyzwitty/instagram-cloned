"use client";
import { db } from "@/firebase";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as WhiteHeartIcon } from "@heroicons/react/24/outline";

import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Comments from "./Comments";

type Props = {
  id: string;
  post: DocumentData;
};
function Post({ id, post }: Props) {
  // hoooks
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const [likes, setLikes] = useState<DocumentData>([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  // sets the likes -->to likes donna know how to xplain

  // useeffect

  // liking -->
  const [allLikes] = useCollection(collection(db, "posts", id, "likes"));

  // getting all comments from database

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [db, id]);

  const [allComments] = useCollection(
    query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc"))
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like: any) => like.id === session?.user?.email) !== -1
    );
  }, [likes]);

  // get all likes from the database
  // liking the post
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.email!));
    } else {
      setDoc(doc(db, "posts", id, "likes", session?.user?.email!), {
        username: session?.user?.name!,
        image: session?.user?.image!,
      });
    }
  };
  // addComment to the db
  const sendComment = async (e: FormEvent) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      userName: session?.user?.name!,
      userImage: session?.user?.image!,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-7 border rounded-sm ">
      <div className="flex items-center p-5">
        <img
          src={post.image}
          className="object-cover"
          loading="lazy"
          alt={post.caption}
        />
      </div>
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 items-center mb-3">
            {hasLiked ? (
              <HeartIcon onClick={likePost} className="btn text-red-500" />
            ) : (
              <WhiteHeartIcon onClick={likePost} className="btn" />
            )}
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn -rotate-90" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <div></div>
      <p className="p-5 truncate">
        {/* likes */}
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} likes</p>
        )}

        <span className="font-bold mr-1">{post.userName}</span>
        {post.caption}
      </p>
      {/* comments */}
      <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
        {allComments?.docs.map((doc) => (
          <Comments key={doc.id} id={id} comment={doc.data()} />
        ))}
      </div>

      {session && (
        <form className="flex items-center p-4" onSubmit={sendComment}>
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            className="border-none flex-1 focus-within:ring-0 outline-none"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            // onClick={sendComment}
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400 cursor-pointer"
          >
            post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
