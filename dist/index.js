'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var NAVER_ID_SDK_URL = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
/**
 * 이 함수는 브라우저 환경에서만 호출이 되야 한다. window 객체에 직접 접근한다.
 * @param props
 */
var initLoginButton = function (props) {
    if (!('browser' in process)) {
        return;
    }
    var clientId = props.clientId, callbackUrl = props.callbackUrl;
    var location = __assign({}, window).location;
    var naver = window['naver'];
    var naverLogin = new naver.LoginWithNaverId({
        callbackUrl: callbackUrl,
        clientId: clientId,
        isPopup: true,
        loginButton: { color: "green", type: 3, height: 60 },
    });
    naverLogin.init();
    var tryCount = 0;
    var initLoop = setInterval(function () {
        if (tryCount > 30) {
            clearInterval(initLoop);
        }
        naverLogin.getLoginStatus(function (status) {
            if (!status || location.hash.indexOf('#access_token') === -1) {
                return;
            }
            window.opener.naver.successCallback(naverLogin.user);
            window.close();
        });
        tryCount++;
    }, 100);
};
var loadScript = function () {
    if (document.querySelectorAll('#naver-login-sdk').length === 0) {
        var script = document.createElement('script');
        script.id = 'naver-login-sdk';
        script.src = NAVER_ID_SDK_URL;
        document.head.appendChild(script);
    }
};
var appendNaverButton = function () {
    if (document.querySelectorAll('#naverIdLogin').length === 0) {
        var naverId = document.createElement('div');
        naverId.id = 'naverIdLogin';
        naverId.style.position = 'absolute';
        naverId.style.top = '-10000px';
        document.body.appendChild(naverId);
    }
};
var LoginNaver = /** @class */ (function (_super) {
    __extends(LoginNaver, _super);
    function LoginNaver(props) {
        var _this = _super.call(this, props) || this;
        loadScript();
        appendNaverButton();
        return _this;
    }
    LoginNaver.prototype.componentDidMount = function () {
        var _this = this;
        if (!('browser' in process)) {
            return;
        }
        var tryCount = 0;
        var initLoop = setInterval(function () {
            if (tryCount > 30) {
                clearInterval(initLoop);
                return;
            }
            if ('naver' in window) {
                var naver = window['naver'];
                naver.successCallback = function (data) { return _this.props.onSuccess(data); };
                initLoginButton(_this.props);
                // 구글 로그인이랑 같이 사용하면 한 번에 초기화 안되는 버그가 있다.
                setTimeout(function () { return initLoginButton(_this.props); }, 1000);
                clearInterval(initLoop);
            }
            tryCount++;
        }, 100);
    };
    LoginNaver.prototype.render = function () {
        var render = this.props.render;
        return (render && render({
            onClick: function () {
                if (!document || !document.querySelector('#naverIdLogin').firstChild)
                    return;
                var naverLoginButton = document.querySelector('#naverIdLogin').firstChild;
                naverLoginButton.click();
            }
        }));
    };
    return LoginNaver;
}(React.Component));

exports.default = LoginNaver;
//# sourceMappingURL=index.js.map