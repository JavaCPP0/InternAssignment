import click from "./click.js";
import { signin } from "./signin.js";


const handlers = {
    CLICK_REQUEST:[1001,click],
    LOGIN_REQUEST:[1002,signin],

};

export default handlers;