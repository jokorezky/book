import _ from 'lodash';
import { FEEDBACK, POST_FEEDBACK} from '../../constants/manifests';
import { post } from '../../helpers/http';
import { updateStore, buildGenericInitialState, handleError } from '../../helpers/store';

/**
 * @param {String} id
 * @returns {Promise}
 */

 export const addFeedback = formData => async (dispatch) => {
  try {
    const response = await post(dispatch, POST_FEEDBACK, FEEDBACK, formData, true, false);
    if (response) {
      return Promise.resolve({shouldRedirect: true});
    }
  } catch (err) {
    await handleError(dispatch, err, POST_FEEDBACK);
  }
};
const INITIAL_STATE = {
  ...buildGenericInitialState([POST_FEEDBACK]),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_FEEDBACK:
      return updateStore(state, action, {
        data: _.get(action, "payload")
      });
    default:
      return state;
  }
};



