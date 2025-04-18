import { handleSignup } from "./signUp";

const handlers = {
    REGISTER_REQUEST:[1001,handleSignup],
};

export default handlers;