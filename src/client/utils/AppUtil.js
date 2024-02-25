import { hideLoader, showLoader } from './../modules/app/reducers/AppReducer';
import properties from './../properties';

let appStore;
const origin = window.location.origin;
const validLinkJSONPath = 'src/assets/data/ValidResetLink.json';
const getOAuthClientDataPath = 'src/assets/data/OAuthClientData.json';


const liveURL = {
    LOGIN_LAYOUT: '/rest/v1/auth/layout',
    VALID_RESET_PWD_LINK: '/rest/v1/auth/users/validlink',
    AUTHENTICATE_USER: '/rest/v1/auth/login/authenticate',
    CAPTCHA_VALIDATION: '/rest/v1/auth/login/recaptcha',
    FORGOT_PASSWORD: '/rest/v1/auth/users/forgotpassword',
    GET_OAUTH_CLIENT: '/rest/v1/oauth/clients',
    GET_OAUTH_CODE: "/rest/v1/oauth/code"
}

const dummyURL = {
    LOGIN_LAYOUT: 'src/assets/data/LoginLayout.json',
    VALID_RESET_PWD_LINK: validLinkJSONPath,
    AUTHENTICATE_USER: validLinkJSONPath,
    CAPTCHA_VALIDATION: validLinkJSONPath,
    FORGOT_PASSWORD: validLinkJSONPath,
    GET_OAUTH_CLIENT: getOAuthClientDataPath,
    GET_OAUTH_CODE: "/rest/v1/oauth/code"
}

export const getAppURL = urlKey => {
    if ( properties.isIntegrated ) {
        return `${origin}${liveURL[urlKey]}`;
    } else {
        return `${location.protocol}//${location.host}/${dummyURL[urlKey]}`;
    }
}

export const setAppStore = store => {
    appStore = store;
}

export const getAppStore = () => appStore;

const AppUtil = {
    ajaxCounter: 0,

    ajax(url, data, successFn, failureFn, isResponseRequired, options, showMask = false) {
        const that = this;

        if (showMask) {
            this.ajaxCounter++;
            that.showHideAppMask();
        }

        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if ( data && properties.isIntegrated ) {
            option.body = JSON.stringify(data);
            option.method = 'POST';
        }

        if (options) {
            for (const key in options) {
                if (key === "headers") {
                    for(const key1 in options.headers) {
                        option.headers[key1] = options.headers[key1];
                    }
                } else {
                    option[key] = options[key];
                }
            }
        }

        fetch(url, option)
            .then( response => response && !isResponseRequired ? response.status === 204 ? {} : response.json() : response )
            .then( result => {
                    if ( showMask ) {
                        that.ajaxCounter--;
                        that.showHideAppMask();
                    }

                    if ( successFn ) {
                        successFn(result);
                    }

                }
            )
            .catch(function (err) {
                if (showMask) {
                    that.ajaxCounter--;
                    that.showHideAppMask();
                }

                if (failureFn) {
                    failureFn(err);
                }
            });
    },

    showHideAppMask() {
        if ( appStore ) {
            if (this.ajaxCounter === 0) {
                appStore.dispatch( hideLoader() );
            } else {
                appStore.dispatch( showLoader() );
            }
        }
    }
}

export default AppUtil;