import Posts from "./Posts";
import Stories from "./Stories";

function Feed() {
  const session = false;
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${
        !session && "!grid-cols-1 !max-w-3xl"
      }`}
    >
      <section className="col-span-2 space-y-2">
        <Stories />
        <Posts />
      </section>
    </main>
  );
}

export default Feed;
