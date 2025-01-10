import { HomeIcon, GamepadIcon, LayoutGridIcon, MapIcon, InfoIcon, UserPlusIcon, HeartIcon } from "lucide-react";
import LandingPage from "./pages/LandingPage.jsx";
import GameplayPage from "./pages/GameplayPage.jsx";
import CardsPage from "./pages/CardsPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import JoinNowPage from "./pages/JoinNowPage.jsx";
import RulesPage from "./pages/RulesPage.jsx";
import LearnToPlayPage from "./pages/LearnToPlayPage.jsx";
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
    title: "Gameplay",
    to: "/gameplay",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <GameplayPage />,
    subPages: [
      {
        title: "Rules",
        to: "/gameplay/rules",
        page: <RulesPage />,
        subPages: [
          {
            title: "Quick Start",
            to: "/gameplay/rules/quick-start",
          },
          {
            title: "Full Rules",
            to: "/gameplay/rules/full-rules",
          },
          {
            title: "Deck Building",
            to: "/gameplay/rules/deck-building",
          },
          {
            title: "Card Types",
            to: "/gameplay/rules/card-types",
          },
          {
            title: "Gameplay",
            to: "/gameplay/rules/gameplay",
          },
          {
            title: "Combat",
            to: "/gameplay/rules/combat",
          },
          {
            title: "FAQ",
            to: "/gameplay/rules/faq",
          },
        ],
      },
      {
        title: "Learn More",
        to: "/gameplay/learn",
        page: <LearnToPlayPage />,
      },
      {
        title: "Battle Simulation",
        to: "/gameplay/battle-simulation",
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
