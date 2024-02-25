import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appData: {
    showLoader: false,
    urlHashData: ''
  }
}

export const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    showLoader: state => {
      state.appData.showLoader = true;
    },
    hideLoader: state => {
        state.appData.showLoader = false;
    },
    initApp: state => {
        state.appData.loaded = true;
    },
    setUrlHash: (state, data) => {
      state.appData.urlHashData = data.payload;
    }
  }
})

export const { showLoader, hideLoader, initApp, setUrlHash } = appSlice.actions

export default appSlice.reducer
