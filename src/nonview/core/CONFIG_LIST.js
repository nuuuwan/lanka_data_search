import RAW_CONFIG_LIST from "../../nonview/core/RAW_CONFIG_LIST";
import Config from "../../nonview/core/Config";

const CONFIG_LIST = RAW_CONFIG_LIST.map((d) => Config.fromRaw(d));

export default CONFIG_LIST;
