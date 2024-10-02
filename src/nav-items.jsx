import { HomeIcon, GamepadIcon, LayoutGridIcon, MapIcon, InfoIcon, UserPlusIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import GameplayPage from "./pages/GameplayPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import JoinNowPage from "./pages/JoinNowPage.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <LandingPage />,
  },
  {
    title: "Gameplay",
    to: "/gameplay",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <GameplayPage />,
  },
  {
    title: "Cards",
    to: "/cards",
    icon: <LayoutGridIcon className="h-4 w-4" />,
    page: <CardsPage />,
  },
  {
    title: "Kinbrold",
    to: "/kinbrold",
    icon: <MapIcon className="h-4 w-4" />,
    page: <KinbroldPage />,
  },
  {
    title: "About Us",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <AboutUsPage />,
  },
  {
    title: "Join Now",
    to: "/join",
    icon: <UserPlusIcon className="h-4 w-4" />,
    page: <JoinNowPage />,
  },
];