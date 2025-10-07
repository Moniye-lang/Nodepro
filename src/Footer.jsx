import { FaWallet, FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="h-auto grid items-center p-6 relative bg-white py-10 gap-10">
            <hr className="text-[#c8c8c8]" />

            <div className="flex flex-col lg:flex-row justify-around gap-10">
                {/* Brand */}
                <div>
                    <Link className="text-[20px] flex items-center gap-[7px]">
                        <FaWallet className="text-[#4179f4]" /> 
                        <div className="font-medium">DappsTools</div>
                    </Link>
                    <div className="text-[#717171] max-w-[250px]">
                        Secure wallet management across multiple blockchains
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col lg:flex-row gap-10">
                    <div>
                        <div className="font-bold mb-5">Quick Links</div>
                        <div className="grid gap-y-[15px]">
                            <Link to="/" className="text-[#4f4e4e] hover:text-black">Home</Link>
                            <Link to="/" className="text-[#4f4e4e] hover:text-black">Swap</Link>
                            <Link to="/Connect" className="text-[#4f4e4e] hover:text-black">Help</Link>
                        </div>
                    </div>

                    <div>
                        <div className="font-bold mb-5">Social</div>
                        <div className="grid gap-y-[16px]">
                            <Link className="flex items-center gap-[5px] text-[17px] text-[#4f4e4e] hover:text-black">
                                <FaTwitter /> <div>Twitter</div>
                            </Link>
                            <Link className="flex items-center gap-[5px] text-[17px] text-[#4f4e4e] hover:text-black">
                                <FaTelegram /> <div>Telegram</div>
                            </Link>
                            <Link className="flex items-center gap-[5px] text-[17px] text-[#4f4e4e] hover:text-black">
                                <FaDiscord /> <div>Discord</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <hr className="text-[#c8c8c8] w-[70%] m-auto" />
                <div className="text-[#717171] text-center text-[15px] mt-5">
                    © 2024 DappsTools. All rights reserved.
                </div>
            </div>
        </div>
    );
}
