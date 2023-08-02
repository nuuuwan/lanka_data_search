import * as React from "react";
import Paper from "@mui/material/Paper";
import HomePageViewSelector from "./HomePageViewSelector";
import BottomNavigation from "@mui/material/BottomNavigation";

export default function CustomBottomNavigator({
  handleOnChangeHomePageViewName,
  homePageViewName,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      {" "}
      <BottomNavigation>
        <HomePageViewSelector
          handleOnChangeHomePageViewName={handleOnChangeHomePageViewName}
          homePageViewName={homePageViewName}
        />
      </BottomNavigation>
    </Paper>
  );
}
