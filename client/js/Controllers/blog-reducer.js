import _ from 'lodash';

const actionPrefix = 'blog__';
const initialState = {
    posts: [],
    isLoading: true
};

export default function reducer(state = initialState, action = {}) {
    const {type} = action;

    switch(type) {

        case `${actionPrefix}load`:
            return _.assign({}, state, {
                isLoading: true
            });
            break;

        case `${actionPrefix}load_SUCCESS`:
            return _.assign({}, state, {
                isLoading: false,
                posts: action.payload.data.data
            });

        default:
            return state;
    }
};

export const actions = {
    loadPosts() {
        return {
            type: `${actionPrefix}load`,
            payload: {
                request:{
                    url:'posts'
                }
            }
        }
    }
};
