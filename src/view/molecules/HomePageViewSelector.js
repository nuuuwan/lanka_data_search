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
    const disabled = homePageViewName === homePageView.name;
    const opacity = disabled ? 0.2 : 1;
    const color = disabled ? "#888" : "primary";

    return (
      <BottomNavigationAction
        key={key}
        onClick={onClick}
        icon={<homePageView.Icon color={color} />}
        sx={{ opacity }}
        disabled={disabled}
      />
    );
  });
}
