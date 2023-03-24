"use client";
import { modalState } from "@/app/Atoms/modalState";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { FormEvent, Fragment, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { CameraIcon } from "@heroicons/react/24/outline";
function Modal() {
  const [open, setOpen] = useRecoilState(modalState);

  const { data: session } = useSession();
  const captionRef = useRef<HTMLInputElement>(null);
  const filePicker = useRef<HTMLInputElement>(null); //HtmlImageElement
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // implemeting
  const addImageToPost = async (e: any) => {
    const reader = new FileReader();
    // if file selected; function reads the contents of the file using the readAsDataURL method of the FileReader object. This method reads the contents of the file and converts it to a base64-encoded string.
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent: any) => {
      //readerEvent contains the base event encoded string
      setSelectedFile(readerEvent.target.result);
    };
    // upload post
  };
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);
    // create a post add to firestore
    // ref to doc...id
    // upload image to firebase storage with post id
    // get download url from fb storage and update original post
    const docRef = await addDoc(collection(db, "posts"), {
      userName: session?.user?.name!,
      caption: captionRef?.current?.value,
      profileImage: session?.user?.image!,
      timestamp: serverTimestamp(),
    });
    console.log("Document added with id", docRef.id);

    //  firebase storage-->
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile!, "data_url").then(
      async (snapshot) => {
        console.log(snapshot);
        console.log(snapshot.metadata);
        // if(snapshot.image === "undefined")
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };
  //   upload to firebase

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          {/* Trick the browser to center the modal contents */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    onClick={() => filePicker?.current?.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePicker}
                        onChange={addImageToPost}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        className="border-none focus:ring-0 w-full text-center"
                        ref={captionRef}
                        placeholder="Please enter a caption"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border norder-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;

// function Modal() {
//   const [open, setOpen] = useRecoilState(modalState);

//   const { data: session } = useSession();
//   const captionRef = useRef<HTMLInputElement>(null);
//   const filePicker = useRef<HTMLInputElement>(null); //HtmlImageElement
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // implemeting
//   const addImageToPost = async (e: any) => {
//     const reader = new FileReader();
//     // if file selected; function reads the contents of the file using the readAsDataURL method of the FileReader object. This method reads the contents of the file and converts it to a base64-encoded string.
//     if (e.target.files[0]) {
//       reader.readAsDataURL(e.target.files[0]);
//     }
//     reader.onload = (readerEvent: any) => {
//       //readerEvent contains the base event encoded string
//       setSelectedFile(readerEvent.target.result);
//     };
//     // upload post
//   };
//   const uploadPost = async () => {
//     if (loading) return;
//     setLoading(false);
//     // create a post add to firestore
//     // ref to doc...id
//     // upload image to firebase storage with post id
//     // get download url from fb storage and update original post
//     const docRef = await addDoc(collection(db, "posts"), {
//       userName: session?.user?.name!,
//       caption: captionRef?.current?.value,
//       profileImage: session?.user?.image!,
//       timestamp: serverTimestamp(),
//     });
//     console.log("Document added with id", docRef.id);

//     //  firebase storage-->
//     const imageRef = ref(storage, `posts/${docRef.id}/image`);
//     await uploadString(imageRef, selectedFile!, "data_url").then(
//       async (snapshot) => {
//         console.log(snapshot);
//         const downloadURL = await getDownloadURL(imageRef);
//         await updateDoc(doc(db, "posts", docRef.id), {
//           image: downloadURL,
//         });
//       }
//     );
//     setOpen(!true);
//     setLoading(false);
//     setSelectedFile(null);
//   };

//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed z-10 inset-0 overflow-y-auto"
//         onClose={setOpen}
//       >
//         <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition.Child>
//           {/* Trick the browser to center the modal contents */}
//           <span
//             className="hidden sm:inline-block sm:align-middle sm:h-screen"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
//               <div>
//                 <div>
//                   <div className="mt-3 text-center sm:mt-5">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg leading-6 font-bold text-gray-900"
//                     >
//                       Upload a photo
//                     </Dialog.Title>

//                     <div>
//                       <input
//                         type="file"
//                         // hidden
//                         ref={filePicker}
//                         onChange={addImageToPost}
//                       />
//                     </div>

//                     <div>
//                       <input
//                         type="text"
//                         className="border-none focus:ring-0 w-full text-center"
//                         placeholder="Please enter a caption"
//                         ref={captionRef}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-5 sm:mt-6">
//                   <button
//                     type="button"
//                     disabled={!selectedFile && !captionRef}
//                     className="inline-flex justify-center w-full rounded-md border norder-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
//                     onClick={uploadPost}
//                   >
//                     {loading ? "Uploading..." : "Upload Post"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// export default Modal;
