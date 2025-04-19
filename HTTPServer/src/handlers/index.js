import { signin } from "./signin.js";
import { signup } from "./signUp.js";

const handlers = {
    REGISTER_REQUEST:[1001,signup],
    LOGIN_REQUEST:[1002,signin],
};

export default handlers;