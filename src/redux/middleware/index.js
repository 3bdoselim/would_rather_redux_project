import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware } from "redux";

const middleware = applyMiddleware(logger, thunk)

export default middleware
