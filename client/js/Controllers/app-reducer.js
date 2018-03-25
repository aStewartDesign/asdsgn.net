const initialState = {
  name: 'world',
  adj: 'wonderful',
  isReactive: false
};

const TOGGLE_REACTIVE = 'toggle-reactive';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REACTIVE:
      return Object.assign({}, state, { isReactive: !state.isReactive });
  
    default:
      return state;
  }
}

export const actions = {
  toggleReactive() {
    return {
        type: TOGGLE_REACTIVE
    };
  }
};
