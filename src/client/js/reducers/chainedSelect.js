export default (state = {}, action) => {
  switch (action.type) {
  case 'CHAINED_SELECT_SET_STATE':
    let newState = {
      ...state,
      [action.payload.name]: action.payload.state
    };

    return newState;

  default:
    return state;
  }
};
