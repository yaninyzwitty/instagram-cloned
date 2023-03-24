import Feed from "@/components/Feed";
import Modal from "@/components/Modal";

function Homepage() {
  return (
    <div className="h-screen overflow-y-scroll bg-gray-100">
      <Feed />
      <Modal />
    </div>
  );
}

export default Homepage;
