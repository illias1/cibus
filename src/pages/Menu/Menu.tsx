/*
===================
depreceated - only use MenuScreen
===================
*/

import React, { Suspense, lazy } from "react";
import { useTypedSelector } from "../../store/types";
// fallbacks
import MenuFallback from "./components/MenuFallback";
// import GuideFallback from "./components/GuideFallback";
import WelcomeFallback from "./components/WelcomeFallback";
// screens and components
const MenuScreen = lazy(() => import("./components/MenuScreen.tsx"));
// const GuideScreen = lazy(() => import("./components/GuideScreen"));
const WelcomeScreen = lazy(() => import("./components/WelcomeScreen"));

type IMenuProps = {};

const Menu: React.FC<IMenuProps> = ({ ...props }) => {
  const { userName } = useTypedSelector((state) => state);
  React.useEffect(() => {
    console.log(Boolean(userName), "userName");
  }, [userName]);
  if (!Boolean(userName)) {
    return (
      <Suspense fallback={<WelcomeFallback />}>
        <WelcomeScreen />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<MenuFallback />}>
        <MenuScreen />
      </Suspense>
    );
  }
};

export default Menu;
