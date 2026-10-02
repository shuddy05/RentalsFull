import { IoFlashOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import pass from "../assets/images/newpass.jpg";
import newpass from "../assets/images/p.jpg";
import line from "../assets/images/v.png";

export const reasons = [
  {
    id: 1,
    icons: IoFlashOutline,
    title: "Fast & Easy Process",
    text: "From searching to listing, everything is designed to be simple, quick, and hassle-free.",
  },
  {
    id: 2,
    icons: FaHandshakeSimple,
    title: "Direct Communication",
    text: "Connect instantly with landlords, buyers, or sellers without delays or middlemen.",
  },
  {
    id: 3,
    icons: MdOutlineSecurity,
    title: "Verified Listings",
    text: "Every property goes through a verification process to ensure you’re browsing genuine",
  },
];

export const testimonials = [
  {
    id: 1,
    position: "Renter",
    image: pass,
    title: "Ibrahim Moshood",
    text: "Finding a place used to be stressful, but this platform made it so easy. I was able to browse, connect, and move in within days.",
    line: line,
  },
  {
    id: 2,
    position: "Renter",
    image: newpass,
    title: "Olabode Shdddy",
    line: line,
    text: "Finding a place used to be stressful, but this platform made it so easy. I was able to browse, connect, and move in within days.",
  },
  {
    id: 3,
    position: "Buyer",
    image: pass,
    title: "Shina Martins",
    line: line,
    text: "Finding a place used to be stressful, but this platform made it so easy. I was able to browse, connect, and move in within days.",
  },
];
