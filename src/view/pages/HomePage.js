import { Component } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Search from "../../nonview/core/Search";
import SearchResultListView from "../molecules/SearchResultListView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CONFIG_LIST from "../../nonview/core/CONFIG_LIST";
import URLContext from "../../nonview/utils/URLContext";
export default class HomePage extends Component {
  constructor(props) {
    super(props);

    const context = URLContext.getContext();
    const keywords = context.keywords || "";
    const configList = Search.search(keywords);

    this.state = {
      configList,
      keywords,
    };
  }

  handleOnChangeSearchKeywords(keywords) {
    const configList = Search.search(keywords);
    URLContext.setContext({ keywords });
    this.setState({ configList, keywords });
  }

  renderDevAlert() {
    return (
      <Alert severity="warning" sx={{ margin: 1 }}>
        This tool is still in development.{" "}
        <strong>{CONFIG_LIST.length.toLocaleString()}</strong> datasets are
        currently available. More datasets will be availble in the future.
      </Alert>
    );
  }

  renderCBSLLink() {
    return (
      <Link href="https://www.cbsl.lk/eresearch/" target="_blank">
        Economic Data Library
      </Link>
    );
  }

  renderCBSLBanner() {
    return (
      <Box>
        <Typography variant="subtitle2">
          Central Bank of Sri Lanka's {this.renderCBSLLink()}
        </Typography>
        <Typography variant="h5">Search Tool</Typography>
      </Box>
    );
  }

  render() {
    const { keywords, configList } = this.state;

    const onChange = function (e) {
      this.handleOnChangeSearchKeywords(e.target.value);
    }.bind(this);

    const nConfigList = configList.length;
    let message = nConfigList + " Random datasets.";
    if (keywords !== "") {
      message = nConfigList + ' datasets matching "' + keywords + '".';
    }

    return (
      <Box sx={{ margin: 2, padding: 1 }}>
        {this.renderDevAlert()}

        {this.renderCBSLBanner()}

        <TextField
          required
          label="Search Keywords"
          defaultValue={keywords}
          onChange={onChange}
          sx={{ margin: 1 }}
        />
        <Alert severity="info" sx={{ margin: 1 }}>
          {message}
        </Alert>

        <SearchResultListView configList={configList} />
      </Box>
    );
  }
}
