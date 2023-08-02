import BarChartIcon from "@mui/icons-material/BarChart";
import ListIcon from "@mui/icons-material/List";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export default class HomePageView {
  constructor(name, Icon) {
    this.name = name;
    this.Icon = Icon;
  }
}

export const HOME_PAGE_VIEW_LIST = [
  new HomePageView("Datasets", ListIcon),
  new HomePageView("Sources", AccountTreeIcon),
  new HomePageView("Chart", BarChartIcon),
];

export const DEFAULT_HOME_PAGE_VIEW_NAME = HOME_PAGE_VIEW_LIST[2].name;
