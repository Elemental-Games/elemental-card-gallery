import { 
  Map,
  Info as InfoIcon,
  UserPlus as UserPlusIcon,
  Gamepad as GamepadIcon,
  LayoutGrid as LayoutGridIcon
} from "lucide-react";
import { HomeIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import CardGalleryPage from "./pages/CardGalleryPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import JoinNowPage from "./pages/JoinNowPage.jsx";
import ElekinPage from "./pages/ElekinPage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <LandingPage />,
  },
  {
    title: "Elekin TCG",
    to: "/elekin",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <ElekinPage />,
    subPages: [
      {
        title: "How to Play",
        to: "/elekin/how-to-play",
        page: <HowToPlayPage />,
      }
    ]
  },
  {
    title: "Card Reveals",
    to: "/cards/campaign",
    icon: <LayoutGridIcon className="h-4 w-4" />,
    page: <CardGalleryPage />,
  },
  { 
    title: "Lore", 
    to: "/kinbrold", 
    icon: <Map className="h-4 w-4" />, 
    page: <KinbroldPage /> 
  },
  { 
    title: "About Us", 
    to: "/about", 
    icon: <InfoIcon className="h-4 w-4" />, 
    page: <AboutUsPage /> 
  },
  { 
    title: "Join Now", 
    to: "/join", 
    icon: <UserPlusIcon className="h-4 w-4" />, 
    page: <JoinNowPage /> 
  },
];
