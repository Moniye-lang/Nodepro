import { FaShieldAlt } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { FaGhost } from "react-icons/fa";
import { FaRainbow } from "react-icons/fa";
import { FaFingerprint } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { SiEthereum } from "react-icons/si";
import { FaQrcode } from "react-icons/fa";
import { AiFillCopyrightCircle } from "react-icons/ai";



export const routes = [
    { path: "/security", name: "Security", icon: <FaShieldAlt /> },
  { path: "/dashboard", name: "Dashboard", icon: <FaGhost /> },
  { path: "/settings", name: "Settings", icon: <FaRainbow /> },
  { path: "/coins", name: "Coins", icon: <FaCoins /> },
  { path: "/keys", name: "Keys", icon: <FaFingerprint /> },
  { path: "/",name:"Bolt", icon: <MdElectricBolt />},
];

export const routes1 =[
     { path: "/ethereum", name: "MetaMask", icon: < SiEthereum/> },
  { path: "/wconnect", name: "WalletConnect", icon: <FaQrcode /> },
  { path: "/cbwallet", name: "Coinbase Wallet", icon: <AiFillCopyrightCircle /> },
];