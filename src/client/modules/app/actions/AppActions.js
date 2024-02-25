import { initApp, setUrlHash } from '../reducers/AppReducer';

export const initAppComp = () => {
    return dispatch => {
        dispatch( initApp() );
    }
}

export const setURLHashData = urlHash => {
    return dispatch => {
        dispatch( setUrlHash(urlHash) );
    }
}