import { image, title } from "framer-motion/client";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.jpg";
import image3 from "../assets/images/3.jpg";
import image4 from "../assets/images/4.jpg";
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

export const properties = [
  {
    id: 1,
    image: image1,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 2,
    image: image2,
    name: "City Apartment",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 3,
    image: image3,
    name: "Cozy Townhouse",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Sale",
  },
  {
    id: 4,
    image: image4,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 5,
    image: image1,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Sale",
  },
  {
    id: 6,
    image: image2,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 7,
    image: image4,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Sale",
  },
  {
    id: 8,
    image: image1,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 9,
    image: image2,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 10,
    image: image4,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
  },
  {
    id: 11,
    image: image1,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Sale",
  },
  {
    id: 12,
    image: image2,
    name: "Modern Villa",
    location: "Badagry, Ogun Nigeria",
    price: "4,000,000",
    feature: { rooms: "4 Bedrooms", bath: "3 Bathrooms" },
    status: "For Rent",
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
