import { TiStarFullOutline } from "react-icons/ti";
import { FaWrench } from "react-icons/fa6";
import { FaKey, FaCoins } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routes, routes1 } from "./herodata";
import { IoChevronForward } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";


export default function Features() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = (route, route1) => {
    setSelectedWallet(route || route1);
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const success = false;
      setIsLoading(false);
      if (!success) setError("Connection Failed!");
    }, 4000);
  };

  // Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="grid justify-center py-10 px-4 lg:px-0">
      {/* Title */}
      <div className="flex items-center justify-center gap-2 text-[34px] font-bold text-[rgb(9,15,34)] mb-10">
        <TiStarFullOutline className="text-[45px]" />
        <div>Features</div>
      </div>

      {/* Feature Buttons */}
      <div className="grid lg:grid-cols-3 gap-6 justify-items-center">
        <button
          className="h-[130px] w-[400px] flex justify-center items-center border border-[#c8c8c8] rounded-[15px] cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl hover:border-[#4179f4]"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <FaWrench className="text-[#fff] bg-[#4179f4] p-[12px] rounded-[15px] h-[50px] w-[55px]" />
            <div className="ml-4">
              <div className="text-[21px] font-bold">Rectification</div>
              <div className="text-[#636363]">Fix and optimize your wallet settings</div>
            </div>
          </div>
        </button>

        <button
          className="h-[130px] w-[400px] flex justify-center items-center border border-[#c8c8c8] rounded-[15px] cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl hover:border-[#4179f4]"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <FaShieldAlt className="text-[#fff] bg-[#4179f4] p-[12px] rounded-[15px] h-[50px] w-[55px]" />
            <div className="ml-4">
              <div className="text-[21px] font-bold">Validation</div>
              <div className="text-[#636363]">Verify and secure your wallet</div>
            </div>
          </div>
        </button>

        <button
          className="h-[130px] w-[400px] flex justify-center items-center border border-[#c8c8c8] rounded-[15px] cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl hover:border-[#4179f4]"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <FaKey className="text-[#fff] bg-[#4179f4] p-[12px] rounded-[15px] h-[50px] w-[55px]" />
            <div className="ml-4">
              <div className="text-[21px] font-bold">Recovery</div>
              <div className="text-[#636363]">Recover lost wallet access</div>
            </div>
          </div>
        </button>

        <button
          className="h-[130px] w-[400px] flex justify-center items-center border border-[#c8c8c8] rounded-[15px] cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl hover:border-[#4179f4]"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <FaCoins className="text-[#fff] bg-[#4179f4] p-[12px] rounded-[15px] h-[50px] w-[55px]" />
            <div className="ml-4">
              <div className="text-[21px] font-bold">Staking</div>
              <div className="text-[#636363]">Earn rewards on your assets</div>
            </div>
          </div>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>

          <div className="relative w-[460px] h-[650px] bg-white rounded-[15px] p-[30px] shadow-xl overflow-y-auto z-[1010]">
            <div className="flex justify-between items-center">
              <div className="text-[23px] font-bold text-[rgb(9,15,34)]">
                Connect a Wallet
              </div>
              <button
                className="text-[#ababab] font-bold text-[15px] hover:text-black"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <hr className="my-4 border-[#c8c8c8]" />

            {/* Popular Wallets */}
            <div className="text-[#929292] mb-2">POPULAR</div>
            <div className="space-y-4">
              {routes1.map((route1) => (
                <button
                  key={route1.path}
                  className="flex justify-between items-center w-full h-[55px] rounded-[15px] border border-[#c8c8c8] pl-[10px] pr-[10px] hover:bg-[rgb(9,15,34)] hover:text-white transition-all duration-300"
                  onClick={() => connectWallet(route1)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[30px] h-[30px] text-[24px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center text-[#4179f4]">
                      {route1.icon}
                    </div>
                    <div className="font-medium">{route1.name}</div>
                  </div>
                  <IoChevronForward />
                </button>
              ))}
            </div>

            {/* More Wallets */}
            <hr className="my-4 border-[#c8c8c8]" />
            <div className="text-[#565656] mb-2">MORE WALLETS</div>
            <div className="space-y-4">
              {routes.map((route) => (
                <button
                  key={route.path}
                  className="flex justify-between items-center w-full h-[55px] rounded-[15px] border border-[#c8c8c8] pl-[10px] pr-[10px] hover:bg-[rgb(9,15,34)] hover:text-white transition-all duration-300"
                  onClick={() => connectWallet(route)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[30px] h-[30px] text-[24px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center text-[#4179f4]">
                      {route.icon}
                    </div>
                    <div className="font-medium">{route.name}</div>
                  </div>
                  <IoChevronForward />
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
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-[1000] backdrop-blur-sm">
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="grid items-center justify-center">
              <div className="w-[40px] h-[40px] text-[40px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center text-[#4179f4] m-auto">
                {selectedWallet.icon}
              </div>
              <div className="text-[20px] font-medium pt-2">
                Connecting {selectedWallet.name}...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-[1000] backdrop-blur-sm">
          <div className="bg-white shadow-lg rounded-2xl w-[350px] p-8 flex flex-col items-center gap-4">
            <FaCircleExclamation className="text-[40px] text-red-500" />
            <div className="font-bold text-[25px]">{error}</div>
            <div className="text-[18px] text-center text-[#858585]">
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
