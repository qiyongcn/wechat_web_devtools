'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){async function a(a,b,c){return new Promise((d)=>{a({type:j.SIMULATOR_SET_AUTHORIZE_CONFIRM,data:{show:!0,scopeList:c.scopeList,imageUrl:c.imageUrl,appName:c.appName,callback:async(a,c)=>{a=a&&c[0].checked;const{body:f}=await e({url:`${g.jsOperateWXDATAURL}`,method:'post',body:JSON.stringify({data:JSON.stringify(b.args.data||{}),grant_scope:c[0].scope,opt:a?1:2}),needToken:1,needAppID:1});return a?d({errMsg:`${b.api}:ok`,data:JSON.parse(f.data)}):d({errMsg:`${b.api}:fail auth deny`})}}})})}async function b(a){if(!(Date.now()-o<n))return o=Date.now(),new Promise((b)=>{a({type:j.SIMULATOR_SET_CONFIRM,data:{show:!0,content:k.config.GETUSERINFO_NOT_AUTHORIZED_WINDOW,showCancel:!0,cancelText:k.config.CONTINUE_USE,confirmText:k.config.VIEW_DETAILS,callback:async(a)=>{a&&!global.autoTest&&nw.Shell.openExternal('https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1650183953&docid=0000a26e1aca6012e896a517556c01'),b()}}})})}async function c(a,b,c){return new Promise((d)=>{a({type:j.SIMULATOR_SET_AUTHORIZE_CONFIRM,data:_extends({},c,{show:!0,callback:async(a,c)=>{const f=[];c.forEach((a)=>{a.checked&&f.push(a.scope)});const{body:h}=await e({url:`${g.jsAuthorizeConfirmURL}`,method:'post',body:JSON.stringify({scope:f,opt:a?1:2}),needToken:1,needAppID:1});return h.baseresponse&&0===h.baseresponse.errcode?void(a?d({errMsg:`${b.api}:ok`}):d({errMsg:`${b.api}:fail auth deny`})):void d({errMsg:`${b.api}:fail`})}})})})}async function d(){for(;0<p.length;){const a=p[0];if(!a)break;try{const b=await a.fn();a.resolve(b)}catch(b){a.reject(b)}p.shift()}}const e=require('./15ba1827c7f6564a45df6bd44da3a977.js'),f=require('./3bfffbe88b3d923921f851c0697974fe.js'),g=require('./f171257bbcaef547a3cf27266ccb0db2.js'),h=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),i=require('./df6d0ff021a69fb541c733de4dbba0fe.js'),j=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),k=require('./common/locales/index.js'),{enterBackground:l,enterForeground:m}=require('./a3959bb900db9f65ed2e9c5dfa6977b7.js'),n=1800000;let o=0,p=[];module.exports={login:async function(a,b){const{body:c}=await e({url:`${g.jsLoginURL}`,method:'post',body:JSON.stringify({scope:['snsapi_base']}),needToken:1,needAppID:1});return{errMsg:`${b.api}:ok`,code:c.code}},refreshSession:async function(a,b){const{body:c}=await e({url:`${g.jsRefreshSessionURL}`,method:'post',needToken:1,needAppID:1});return{errMsg:`${b.api}:ok`,expireIn:c.session_expire_in,err_code:c.baseresponse.errcode}},operateWXData:async function(c,d,k){const l=f.getCurrent(),m=k(),{args:n,api:o}=d;if('webapi_getuserinfo'==n.data.api_name&&(1003000>f.getLibVersionNumber()&&(delete n.data.lang,delete n.data.with_credentials),l.isTourist)){const a=m.user||{};return{errMsg:'operateWXData:ok',data:{data:JSON.stringify({nickName:a.nickName,avatarUrl:a.headUrl,gender:'male'===a.sex?1:2,province:a.province,city:a.city,country:a.country})}}}const{body:p}=await e({url:`${g.jsOperateWXDATAURL}`,method:'post',body:JSON.stringify({data:JSON.stringify(n.data||{})}),needToken:1,needAppID:1,needCheckErrCode:-1}),q=p.baseresponse;if(q){const e=p.baseresponse.errcode;if(0==e){const a=JSON.parse(p.data);try{const b=n.data&&n.data.api_name&&n.data.api_name.replace('webapi_','')||b;c({type:j.SIMULATOR_UPDATE_DECRYPTED_INFO,api:b,data:{encryptedData:a.encryptedData,iv:a.iv,sessionKey:p.debug_info.session_key,decryptedData:p.debug_info.data}})}catch(a){}return{errMsg:`${d.api}:ok`,data:a}}if(e==i.NEED_CONFORM||global.online)return await a(c,d,{imageUrl:p.appicon_url,appName:p.appname,scopeList:[p.scope]});const f=h.parseCgiErrorCode(e,q.errmsg);return'scope unauthorized'!=f||'webapi_getuserinfo'!=n.data.api_name||n.data.from_component||(await b(c)),{errMsg:`${d.api}:fail ${f}`}}},authorize:async function(a,b){const{body:f}=await e({url:`${g.jsAuthorizeURL}`,method:'post',body:JSON.stringify({scope:b.args.scope||[]}),needCheckErrCode:-1,needToken:1,needAppID:1}),j=f.baseresponse;if(j){const e=j.errcode;if(0==e)return{errMsg:`${b.api}:ok`,body:f};if(e==i.NEED_CONFORM)return await(async()=>new Promise((e,g)=>{p.push({fn:async()=>await c(a,b,{imageUrl:f.appicon_url,appName:f.appname,scopeList:f.scope_list}),resolve:e,reject:g}),2>p.length&&d()}))();const g=h.parseCgiErrorCode(e,j.errmsg);return{errMsg:`${b.api}:fail ${g}`}}return{errMsg:`${b.api}:fail system error`}},openWeRunSetting:async function(a,b){const{body:c}=await e({url:`${g.checkWeRunState}`,method:'post',body:JSON.stringify({appid:f.getProjectAppID()}),needToken:1,needAppID:1}),d=c.state;if(1==d)return{errMsg:`${b.api}:ok`};const h=c.wording||k.config.USER_NOT_OPEN_WECHAT_MOVEMENT;return a({type:j.SIMULATOR_SET_CONFIRM,data:{show:!0,content:h,showCancel:!1,confirmText:k.config.CLOSE}}),{errMsg:`${b.api}:fail ${h}`}},chooseInvoiceTitle:async function(a,b){a({type:j.SIMULATOR_SET_CHOOSEINVOICETITLE,data:{show:!0,callbackID:b.callbackID,api:b.api}})},addPhoneContact:async function(a,b){a({type:j.SIMULATOR_SET_ADDPHONECONTACT,data:{show:!0,callbackID:b.callbackID,api:b.api,contactData:_extends({},b.args)}})},openAddress:async function(a,b){a({type:j.SIMULATOR_SET_CHOOSEADDRESS,data:{show:!0,callbackID:b.callbackID,api:b.api}})},clearAuthorizeQueue(){p=[]}}}(require('lazyload'),require);