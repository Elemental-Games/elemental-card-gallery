import { 
  Map,
  Info as InfoIcon,
  Gamepad as GamepadIcon,
  Users,
} from "lucide-react";
import CardGalleryPage from "./pages/CardGalleryPage.jsx";
import KinbroldPage from "./pages/KinbroldPage.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import ElekinPage from "./pages/ElekinPage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";
import TCGLanding from "./pages/TCGLanding.jsx";
import ElekinRoadmap from "./pages/ElekinRoadmap.jsx";
import AlphaPage from "./pages/AlphaPage.jsx";
import CreatorsPage from "./pages/CreatorsPage.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
export const navItems = [
  {
    title: "Community",
    to: "/community",
    icon: <Users className="h-4 w-4" />,
    page: <CommunityPage />,
  },
  {
    title: "Lore",
    to: "/kinbrold",
    icon: <Map className="h-4 w-4" />,
    page: <KinbroldPage />,
  },
  {
    title: "Creators",
    to: "/creators",
    icon: <Users className="h-4 w-4" />,
    page: <CreatorsPage />,
  },
  {
    title: "About",
    to: "/about",
    icon: <InfoIcon className="h-4 w-4" />,
    page: <AboutUsPage />,
  },
  {
    title: "TCG",
    to: "/elekin",
    icon: <GamepadIcon className="h-4 w-4" />,
    page: <ElekinPage />,
    subPages: [
      {
        title: "Overview",
        to: "/elekin/overview",
        page: <ElekinPage />,
      },
      {
        title: "How to Play",
        to: "/elekin/how-to-play",
        page: <HowToPlayPage />,
      },
      {
        title: "Card Gallery",
        to: "/cards",
        page: <CardGalleryPage />,
      },
      {
        title: "TCG Beta",
        to: "/tcg",
        page: <TCGLanding />,
      },
      {
        title: "TCG Roadmap",
        to: "/roadmap",
        page: <ElekinRoadmap />,
      },
      {
        title: "Shop",
        to: "/shop",
      },
    ],
  },
];

// Landing remains at / via App.jsx; Alpha via CTA
export const alphaNav = {
  title: "Alpha",
  to: "/alpha",
  page: <AlphaPage />,
};
