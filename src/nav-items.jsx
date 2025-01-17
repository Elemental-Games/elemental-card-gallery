import { HomeIcon, GamepadIcon, LayoutGridIcon, MapIcon, InfoIcon, UserPlusIcon, HeartIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import JoinNowPage from "./pages/JoinNowPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import BattleSimulationPage from "./pages/BattleSimulationPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <LandingPage />,
  },
  {
    title: "How to Play",
    to: "/how-to-play",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <HowToPlayPage />,
    subPages: [
      {
        title: "Rules",
        to: "/how-to-play/rules",
        page: <RulesPage />,
        subPages: [
          {
            title: "Quick Start",
            to: "/how-to-play/rules/quick-start",
          },
          {
            title: "Full Rules",
            to: "/how-to-play/rules/full-rules",
          },
          {
            title: "Deck Building",
            to: "/how-to-play/rules/deck-building",
          },
          {
            title: "Card Types",
            to: "/how-to-play/rules/card-types",
          },
          {
            title: "Gameplay",
            to: "/how-to-play/rules/gameplay",
          },
          {
            title: "Combat",
            to: "/how-to-play/rules/combat",
          },
          {
            title: "FAQ",
            to: "/how-to-play/rules/faq",
          },
        ],
      },
      {
        title: "Battle Simulation",
        to: "/how-to-play/battle-simulation",
        page: <BattleSimulationPage />,
      },
    ],
  },
  { 
    title: "Cards", 
    to: "/cards", 
    icon: <LayoutGridIcon className="h-4 w-4" />, 
    page: <CardsPage /> 
  },
  { 
    title: "Kinbrold", 
    to: "/kinbrold", 
    icon: <MapIcon className="h-4 w-4" />, 
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
  { 
    title: "Donate", 
    to: "/donate", 
    icon: <HeartIcon className="h-4 w-4" />, 
    page: <DonatePage /> 
  },
];
