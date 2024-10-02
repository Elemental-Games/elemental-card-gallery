import { HomeIcon, LayoutGridIcon, GamepadIcon, InfoIcon, UserPlusIcon, MapIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import CardGalleryPage from "./pages/CardListPage.jsx";
import DeckBuilderPage from "./pages/DeckBuilderPage.jsx";
import GameplayPage from "./pages/GameplayPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
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
    title: "Card Gallery",
    to: "/card-gallery",
    icon: <LayoutGridIcon className="h-4 w-4" />,
    page: <CardGalleryPage />,
  },
  {
    title: "Deck Builder",
    to: "/deck-builder",
    icon: <LayoutGridIcon className="h-4 w-4" />,
    page: <DeckBuilderPage />,
  },
  {
    title: "Gameplay",
    to: "/gameplay",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <GameplayPage />,
  },
  {
    title: "Rules",
    to: "/rules",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <RulesPage />,
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
    page: <div>About Us Page</div>, // Placeholder for now
  },
  {
    title: "Join Now",
    to: "/join",
    icon: <UserPlusIcon className="h-4 w-4" />,
    page: <div>Join Now Page</div>, // Placeholder for now
  },
];