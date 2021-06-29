import { ACTIONS } from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TITLE:
      return {
        ...state,
        title: action.payload,
      };
  }
};

export default reducers;
