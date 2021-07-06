import { ACTIONS } from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.CALENDAR_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ACTIONS.EDIT_CALENDAR:
      return {
        ...state,
        edit: action.payload,
      };
    case ACTIONS.ADD_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
