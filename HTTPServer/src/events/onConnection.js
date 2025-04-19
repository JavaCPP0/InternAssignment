import onData from "../../src/events/onData.js";
import onEnd from "./onEnd.js";
import onError from "./onError.js";

const onConnection = (req, res) => {
    console.log('HTTP 클라이언트 연결됨');
    onData(req,res);
};

export default onConnection;