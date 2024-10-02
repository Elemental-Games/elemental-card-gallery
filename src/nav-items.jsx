import { HomeIcon, LayoutGridIcon, GamepadIcon, InfoIcon, UserPlusIcon, MapIcon, BookOpenIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import CardGalleryPage from "./pages/CardListPage.jsx";
import DeckBuilderPage from "./pages/DeckBuilderPage.jsx";
import GameplayPage from "./pages/GameplayPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";
import LearnToPlayPage from "./pages/LearnToPlayPage.jsx";
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
    title: "Learn to Play",
    to: "/learn-to-play",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <LearnToPlayPage />,
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