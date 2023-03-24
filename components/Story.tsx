type Props = {
  username: string;
  img: string;
};

function Story({ username, img }: Props) {
  return (
    <div>
      <img
        src={img}
        className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition-transform duration-200 ease-out"
        alt=""
      />
      <p className="text-sm w-14 truncate text-center">{username}</p>
    </div>
  );
}

export default Story;
