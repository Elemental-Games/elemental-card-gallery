import { HomeIcon, LayoutGridIcon, GamepadIcon, InfoIcon, UserPlusIcon, BookOpenIcon, LayersIcon, GraduationCapIcon, MapIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";
import CardListPage from "./pages/CardListPage.jsx";
import DeckBuilderPage from "./pages/DeckBuilderPage.jsx";
import GameplayPage from "./pages/GameplayPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import LearnToPlayPage from "./pages/LearnToPlayPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";

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
    subItems: [
      {
        title: "Card Gallery",
        to: "card-list",
        icon: <LayoutGridIcon className="h-4 w-4" />,
        page: <CardListPage />,
      },
      {
        title: "Deck Builder",
        to: "deck-builder",
        icon: <LayersIcon className="h-4 w-4" />,
        page: <DeckBuilderPage />,
      },
    ],
  },
  {
    title: "Gameplay",
    to: "/gameplay",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <GameplayPage />,
    subItems: [
      {
        title: "Learn to Play",
        to: "learn",
        icon: <GraduationCapIcon className="h-4 w-4" />,
        page: <LearnToPlayPage />,
      },
      {
        title: "Rules",
        to: "rules",
        icon: <BookOpenIcon className="h-4 w-4" />,
        page: <RulesPage />,
      },
    ],
  },
  {
    title: "Rules",
    to: "/rules",
    icon: <BookOpenIcon className="h-4 w-4" />,
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