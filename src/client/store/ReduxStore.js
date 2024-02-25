import { configureStore } from '@reduxjs/toolkit';
import AppReducer from '../modules/app/reducers/AppReducer';

export default configureStore({
    reducer: {
        app: AppReducer,
    }
});