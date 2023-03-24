"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "@/firebase";
import Post from "./Post";

function Posts() {
  const { data: session } = useSession();
  const [posts] = useCollection(
    session && query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );
  // posts?.docs.map((doc) => console.log(doc.data()));
  // implementation of firebase
  return (
    <div>
      {posts?.docs.map((doc) => (
        <Post key={doc.id} id={doc.id} post={doc.data()} />
      ))}
    </div>
  );
}

export default Posts;
