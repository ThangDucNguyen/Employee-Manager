import { reduxGenerator } from "utils/reduxHelpers";

const { reducer, actions, selectors: userSelectors } = reduxGenerator("user");

export { reducer, actions as userActions, userSelectors };
