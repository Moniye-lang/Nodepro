import { useState, useEffect } from "react";
import { FaPlug, FaCoins, FaShieldAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoChevronForward } from "react-icons/io5";
import { routes, routes1 } from "./herodata";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const connectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const success = false;
      setIsLoading(false);
      if (!success) setError("Connection Failed!");
    }, 4000);
  };

return (
    <div className="relative grid justify-center gap-8 px-4 sm:px-6 lg:px-20 pt-20 pb-20 bg-[rgb(9,15,34)]">
        {/* Hero Title */}
        <div className="text-center">
            <div className="text-[50px] font-bold text-[#fff] lg:mt-[50px]">
                Trusted platform to manage
            </div>
            <div className="text-[50px] font-bold text-[#4179f4] lg:mt-[-15px]">
                Decentralised Apps
            </div>
            <div className="text-[22px] text-[#b4b4b4] lg:mt-[20px]">
                Connect and manage your digital assets securely across multiple blockchains
            </div>
        </div>

        {/* Connect Wallet Button */}
        <button
            className="flex items-center justify-center gap-x-[10px] w-[220px] h-[50px] m-auto bg-[#437af3d7] text-[#fff] rounded-[5px] cursor-pointer hover:bg-[#417af4] hover:translate-y-[-2px] transition duration-500 lg:pr-[20px]"
            onClick={() => setOpen(true)}
        >
            <FaPlug className="text-[20px] lg:ml-[30px]" />
            <div className="text-[20px] font-semibold">Connect Wallet</div>
        </button>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-[50px] lg:mt-[50px]">
            <div className="flex justify-center w-full sm:w-auto">
                <div className="backdrop-brightness-200 w-[160px] h-[160px] grid pt-[20px] rounded-[15px]">
                    <IoIosPeople className="text-[#4179f4] text-[40px] m-auto" />
                    <p className="text-[#fff] text-[24px] font-bold text-center mt-2">$1M+</p>
                    <p className="text-[#b4b4b4] text-center mt-1">Active Users</p>
                </div>
            </div>

            <div className="flex justify-center w-full sm:w-auto">
                <div className="backdrop-brightness-200 w-[160px] h-[160px] grid pt-[20px] rounded-[15px]">
                    <AiOutlineLineChart className="text-[#4179f4] text-[40px] m-auto" />
                    <p className="text-[#fff] text-[24px] font-bold text-center mt-2">$500M+</p>
                    <p className="text-[#b4b4b4] text-center mt-1">Trading Volume</p>
                </div>
            </div>
        </div>


        {open && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />

                <div className="relative ml-auto w-[460px] h-[650px] bg-white rounded-[15px] p-[30px] shadow-xl overflow-y-auto z-[101]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[23px] font-bold text-[rgb(9,15,34)]">Connect a Wallet</h2>
                        <button
                            className="self-end text-[15px] font-bold text-[#ababab] hover:text-black"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <hr className="my-4 text-[#c8c8c8]" />

                    <div className="text-[#929292]">POPULAR</div>
                    <div className="mt-4 space-y-4">
                        {routes1.map((wallet) => (
                            <button
                                key={wallet.path}
                                className="w-[100%] h-[55px] flex items-center border-1 border-[#c8c8c8] rounded-[15px] justify-between pl-[10px] cursor-pointer hover:bg-[rgb(9,15,34)] hover:text-[#fff] transition-all duration-500"
                                onClick={() => connectWallet(wallet)}
                            >
                                <div className="flex items-center pl-[10px] justify-center">
                                    <div className="w-[30px] h-[30px] p-[4px] bg-[#e5e5e5] text-[20px] text-[#4179f4] rounded-[10px] flex items-center justify-center">
                                        {wallet.icon}
                                    </div>
                                    <div className="font-medium p-[10px]">{wallet.name}</div>
                                </div>
                                <IoChevronForward className="pr-[10px] text-[#565656] text-[30px]" />
                            </button>
                        ))}
                    </div>

                    <hr className="my-4 text-[#c8c8c8]" />

                    <div className="text-[#565656]">MORE WALLETS</div>
                    <div className="mt-3 space-y-3">
                        {routes.map((wallet) => (
                            <button
                                key={wallet.path}
                                className="w-[100%] h-[55px] flex items-center border-1 border-[#c8c8c8] rounded-[15px] justify-between pl-[10px] cursor-pointer hover:bg-[rgb(9,15,34)] hover:text-[#fff] transition-all duration-500"
                                onClick={() => connectWallet(wallet)}
                            >
                                <div className="flex items-center pl-[10px]">
                                    <div className="w-[30px] h-[30px] p-[4px] text-[20px] bg-[#e5e5e5] text-[#4179f4] rounded-[10px] flex items-center justify-center">
                                        {wallet.icon}
                                    </div>
                                    <div className="font-medium p-[10px]">{wallet.name}</div>
                                </div>
                                <IoChevronForward className="pr-[10px] text-[#565656] text-[30px]" />
                            </button>
                        ))}
                    </div>

                    <div className="h-auto bg-[#f1f1f1] rounded-[10px] mt-4"> <div className="grid gap-y-[7px] grid-cols-1 p-[10px]">
                        <div className="flex items-center gap-2 font-bold text-[20px] mb-2 mt-2">
                             <div><FaWallet className="text-[rgb(9,15,34)]"></FaWallet></div>
                        <div>What is a Wallet?
                            
                        </div>
                        </div>
                       

                        <div className="font-medium ">Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.</div>
                        </div></div>
                </div>
            </div>
        )}

        {/* Loading */}
        {isLoading && selectedWallet && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                <div className="bg-white p-8 rounded-2xl shadow flex flex-col items-center gap-4">
                    <div className="w-[40px] h-[40px] text-[40px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center text-[#4179f4] m-auto">
                        {selectedWallet.icon}
                    </div>
                    <div className="text-[20px] font-medium">Connecting {selectedWallet.name}...</div>
                </div>
            </div>
        )}

        {/* Error */}
        {error && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                <div className="bg-white w-[350px] p-8 rounded-2xl shadow flex flex-col items-center gap-4">
                    <FaCircleExclamation className="text-red-500 text-[40px]" />
                    <div className="font-bold text-[25px]">{error}</div>
                    <div className="text-center text-[#858585] text-[18px]">
                        Error connecting automatically. Please try connecting manually.
                    </div>
                    <Link
                        to="/Connect"
                        className="flex items-center justify-center bg-red-500 text-white h-[50px] w-full rounded-[15px] text-[18px] font-semibold hover:bg-red-600 transition"
                    >
                        Connect Manually
                    </Link>
                </div>
            </div>
        )}
    </div>
);
}
