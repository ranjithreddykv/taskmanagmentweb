import { MdOutlineSearch } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./user/UserAvatar";
import NotificationPanel from "./NotificationPanel";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState(searchParams.get("search") || "");

  // 🔥 whenever text changes → update URL
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        searchParams.set("search", text);
      } else {
        searchParams.delete("search");
      }
      setSearchParams(searchParams);
    }, 500); // debounce typing

    return () => clearTimeout(delay);
  }, [text]);

  return (
    <div className="flex justify-between items-center w-full bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          <RxHamburgerMenu />
        </button>

        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            value={text}
            placeholder="Search ..."
            onChange={(e) => setText(e.target.value)}
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
