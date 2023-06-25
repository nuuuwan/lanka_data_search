import { Component } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Search from "../../nonview/core/Search";
import SearchResultListView from "../molecules/SearchResultListView";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

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
      <Box sx={{margin: 1, padding:1}}>
        <Typography variant="caption">
          Search Tool
          for the Central Bank of Sri Lanka's
          {' '}
          <Link href="https://www.cbsl.lk/eresearch/">
          Economic Data Library
          </Link>
        </Typography>
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
