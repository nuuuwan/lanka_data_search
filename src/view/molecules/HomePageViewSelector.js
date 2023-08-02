import { HOME_PAGE_VIEW_LIST } from "../pages/HomePageView";
import { BottomNavigationAction } from "@mui/material";

export default function HomePageViewSelector({
  homePageViewName,
  handleOnChangeHomePageViewName,
}) {
  return HOME_PAGE_VIEW_LIST.map(function (homePageView) {
    const onClick = function () {
      handleOnChangeHomePageViewName(homePageView.name);
    };
    const key = "home-page-view-selector-" + homePageView.name;
    const isActive = homePageViewName === homePageView.name;
    const sx = {
      opacity: isActive ? 0.05 : 1,
    };

    return (
      <BottomNavigationAction
        key={key}
        onClick={onClick}
        icon={<homePageView.Icon color="primary" />}
        sx={sx}
      />
    );
  });
}
