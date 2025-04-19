import { handleSignup } from "./signUp.js";

const handlers = {
    REGISTER_REQUEST:[1001,handleSignup],
};

export default handlers;