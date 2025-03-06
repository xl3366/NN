// ==UserScript==
// @name         京东车
// @version      2025-03-07
// @description  解除限制
// @author       法国总统马克龙
// @match        http://isv.isvjcloud.cn/index1
// @icon         https://www.jd.com/favicon.ico
// @grant        none
// @run-at document-start
// @downloadURL  https://ghproxy.net/https://raw.githubusercontent.com/xl3366/NN/refs/heads/main/jd.js
// @updateURL https://ghproxy.net/https://raw.githubusercontent.com/xl3366/NN/refs/heads/main/jd.js
// ==/UserScript==

(function() {
    'use strict';

const originOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url) {
    const xhr = this;
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function () {
        if (this.readyState === 4 && url === "/get_container_status") {
            try {
                let result = this.response;
                const res = {"jd":{"status":true,"count":999,"app":"x东"},"sfsd":{"status":true,"count":999,"app":"顺x速递"},"t3":{"status":true,"count":999,"app":"x3出行"},"pupu":{"status":true,"count":999,"app":"朴X超市"}};
                console.log(result);
                const modifiedResult = JSON.stringify(res);
                Object.defineProperty(xhr, 'response', {
                    value: modifiedResult,
                    writable: false
                });
                Object.defineProperty(xhr, 'responseText', {
                    value: modifiedResult,
                    writable: false
                });
            } catch (e) {
                console.error('解析响应数据时出错:', e);
            }
        }else if(this.readyState === 4 && url === "/get_base_cfg"){
            try {
                let result = this.response;
                const res = {"banner":"优先登录顺序 短信 -> App扫码 -> 微信扫码 -> 手动提交","alert":[{"title":"面板声明","text":"本网站不收取任何费用，如果你是通过收费的方式进入本网站，说明您被骗了","icon":"warning","confirmButtonText":"我已了解"},{"title":"免责声明","text":" 1、阁下了解并同意，参与账户托管服务出于自愿，且已充分了解并接受相关风险\n 2、托管服务仅限于自动化执行x豆任务，不会以任何方式获取您的账户控制权\n 3、阁下需对使用本服务产生的所有收益和损失承担全部责任\n 登录后即表示阁下同意遵守所有条款和条件，否则请关闭该网页","icon":"warning","confirmButtonText":"我已了解"},{"title":"登录须知","text":"新账户第一次登录请扫描wxpusher二维码绑定，后续无需再扫\n因网络卡顿原因，夜间0点-1点，尽量不登录\n登录账户必须为【实名】用户且不能是近期新注册用户，否则变黑号","icon":"error","confirmButtonText":"我已了解"}],"login":[{"value":"0","text":"APP扫码/唤醒","status":0,"type":"jd"},{"value":"-1","text":"账密登录(可自动续登)","status":0,"type":"jd"},{"value":"1","text":"微信扫码","status":0,"type":"jd"},{"value":"3","text":"短信登录","status":0,"type":"jd"},{"value":"2","text":"x东扫码2","status":-1,"type":"jd"},{"value":"5","text":"顺X速运扫码","status":0,"type":"sfsd"},{"value":"6","text":"x3出行扫码","status":0,"type":"t3"},{"value":"7","text":"朴X超市","status":0,"type":"pupu"}],"up_key":{"JD_COOKIE":"open/M 有效期均3-30天","JD_WSCK":"wskey 有效期均3-30天"}};
                console.log(result);
                const modifiedResult = JSON.stringify(res);
                Object.defineProperty(xhr, 'response', {
                    value: modifiedResult,
                    writable: false
                });
                Object.defineProperty(xhr, 'responseText', {
                    value: modifiedResult,
                    writable: false
                });
            } catch (e) {
                console.error('解析响应数据时出错:', e);
            }
        }
        if (typeof originalOnReadyStateChange === 'function') {
            originalOnReadyStateChange.call(this);
        }
    };

    originOpen.apply(this, arguments);
};


})();
