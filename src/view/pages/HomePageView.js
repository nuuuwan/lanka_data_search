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
  new HomePageView("Chart", BarChartIcon),
  new HomePageView("Datasets", ListIcon),
  new HomePageView("Sources", AccountTreeIcon),
];

export const DEFAULT_HOME_PAGE_VIEW_NAME = HOME_PAGE_VIEW_LIST[0].name;
