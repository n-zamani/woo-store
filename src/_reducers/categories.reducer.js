import {categoriesConstants} from '../_constants';

const initialState = {categoriesRequest: false, receivedCategories: []}

export function categories(state=initialState, action) {
    switch (action.type) {
        case categoriesConstants.REQUEST_CATEGORIES:
          return {categoriesRequest: true, receivedCategories: []};
        case categoriesConstants.RECEIVE_CATEGORIES:
            return {categoriesRequest: false, receivedCategories: action.categories};
        default:
          return state;
      }
}