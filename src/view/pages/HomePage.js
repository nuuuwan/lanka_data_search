import { Component } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Search from "../../nonview/core/Search";
import SearchResultListView from "../molecules/SearchResultListView";
import Alert from "@mui/material/Alert";
const STYLE = {
  margin: 2,
  padding: 2,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configList: Search.search(""),
      latestKeywords: "",
    };
  }
  render() {
    const { configList } = this.state;

    const onChange = function (e) {
      const keywords = e.target.value;
      const configList = Search.search(keywords);
      this.setState({ configList, latestKeywords: keywords });
    }.bind(this);

    const nConfigList = configList.length;
    let message = nConfigList + " Random results.";
    if (this.state.latestKeywords !== "") {
      message =
        nConfigList + ' Results matching "' + this.state.latestKeywords + '".';
    }

    return (
      <Box sx={STYLE}>
        <TextField
          required
          label="Search Keywords"
          defaultValue=""
          onChange={onChange}
          sx={{ margin: 1, width: "90%" }}
        />
        <Alert severity="info" sx={{ margin: 1, width: "90%" }}>
          {message}
        </Alert>
        <SearchResultListView configList={configList} />
      </Box>
    );
  }
}
