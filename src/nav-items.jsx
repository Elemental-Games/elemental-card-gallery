import { HomeIcon, LayoutGridIcon, GamepadIcon, InfoIcon, UserPlusIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <LandingPage />,
  },
  {
    title: "Cards",
    to: "/cards",
    icon: <LayoutGridIcon className="h-4 w-4" />,
    page: <CardsPage />,
  },
  {
    title: "Gameplay",
    to: "/gameplay",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <div>Gameplay Page</div>, // Placeholder for now
  },
  {
    title: "About Us",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <div>About Us Page</div>, // Placeholder for now
  },
  {
    title: "Join Now",
    to: "/join",
    icon: <UserPlusIcon className="h-4 w-4" />,
    page: <div>Join Now Page</div>, // Placeholder for now
  },
];
