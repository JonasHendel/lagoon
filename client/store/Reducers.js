import { ACTIONS } from './Actions';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.CALENDAR_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case ACTIONS.ADD_LESSONS:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
