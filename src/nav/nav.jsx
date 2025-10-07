import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdSwap } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaPlug } from "react-icons/fa6";

export default function Nav() {
  return (
    <div className="flex gap-[40px] justify-center items-center h-[10vh] bg-[#fff] px-4">
      <div className="flex items-center">
        <Link to='/' className="flex items-center gap-1.5 text-[24px] font-bold">
          <FaWallet className="text-[#4179f4]" />
          <span>DappsTools</span>
        </Link>
      </div>

      <div className="flex items-center gap-[26px]">
        {/* Hide all links except Connect on small screens */}
        <div className="hidden sm:flex items-center gap-[26px]">
          <Link
            to="/"
            className="flex items-center gap-[10px] text-[19px] text-[#4f4e4e] hover:text-black hover:cursor-pointer focus:text-black"
          >
            <AiFillHome className="text-[24px]" />
            <div className="font-semibold">Home</div>
          </Link>

          <Link to="/">
            <div className="flex items-center gap-1.5 text-[19px] text-[#4f4e4e] hover:text-black hover:cursor-pointer focus:text-black">
              <IoMdSwap className="text-[24px]" />
              <div className="font-semibold">Swap</div>
            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center gap-1.5 text-[19px] text-[#4f4e4e] hover:text-black hover:cursor-pointer focus:text-black">
              <AiFillQuestionCircle className="text-[24px]" />
              <div className="font-semibold">Help</div>
            </div>
          </Link>
        </div>

        {/* Connect button always visible */}
        <Link to="/Connect">
          <div className="bg-[#4179f4] text-[14px] rounded-[10px] h-[40px] w-[115px] gap-[5px] flex items-center justify-center text-[#fff]">
            <FaPlug />
            <div>Connect</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
