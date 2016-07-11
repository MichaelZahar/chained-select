export const setChainedSelectState = (name, state) => {
  return {
    type: 'CHAINED_SELECT_SET_STATE',
    payload: {
      name,
      state
    }
  };
};
