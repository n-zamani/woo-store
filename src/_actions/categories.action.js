import { categoriesConstants } from '../_constants';
import { categoriesService } from '../_service';

export const categoriesAction = {
    getCategories
}

function getCategories() {
    return dispatch => {
        dispatch(requestCategories());

        categoriesService.fetchCategories().then(
            response => {
                dispatch(receiveCategories(response));
            }
        )
    };

    function requestCategories() { return { type: categoriesConstants.REQUEST_CATEGORIES } }
    function receiveCategories(categories) { return { type: categoriesConstants.RECEIVE_CATEGORIES, categories } }
}