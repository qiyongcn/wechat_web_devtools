'use strict';!function(require,directRequire){async function a(a,b,d){return new Promise((f)=>{a({type:h.SIMULATOR_SET_AUTHORIZE_CONFIRM,data:{show:!0,scopeList:d.scopeList,imageUrl:d.imageUrl,appName:d.appName,callback:async(a,d)=>{a=a&&d[0].checked;const{body:g}=await c({url:`${e.jsOperateWXDATAURL}`,method:'post',body:JSON.stringify({data:JSON.stringify(b.args.data||{}),grant_scope:d[0].scope,opt:a?1:2}),needToken:1,needAppID:1});return a?f({errMsg:`${b.api}:ok`,data:JSON.parse(g.data)}):f({errMsg:`${b.api}:fail auth deny`})}}})})}async function b(a){return new Promise((b)=>{a({type:h.SIMULATOR_SET_CONFIRM,data:{show:!0,content:i.config.GETUSERINFO_NOT_SUPPORTED,showCancel:!0,cancelText:i.config.CONTINUE_USE,confirmText:i.config.VIEW_DETAILS,callback:async(a)=>{a&&!global.autoTest&&nw.Shell.openExternal('https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1650183953&docid=0000a26e1aca6012e896a517556c01'),b()}}})})}const c=require('./15ba1827c7f6564a45df6bd44da3a977.js'),d=require('./3bfffbe88b3d923921f851c0697974fe.js'),e=require('./f171257bbcaef547a3cf27266ccb0db2.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./df6d0ff021a69fb541c733de4dbba0fe.js'),h=require('./0634ee2ebd3e560d9d4804ecc960160f.js'),i=require('./common/locales/index.js');module.exports={operateWXData:async function(i,j,k,l){const m=d.getCurrent(),n=l(),{args:o,api:p}=j;if('webapi_getuserinfo'==o.data.api_name&&(1003000>d.getLibVersionNumber()&&(delete o.data.lang,delete o.data.with_credentials),o.data.from_component||global.online||(await b(i)),m.isTourist)){const a=n.user||{};return{errMsg:'operateWXData:ok',data:{data:JSON.stringify({nickName:a.nickName,avatarUrl:a.headUrl,gender:'male'===a.sex?1:2,province:a.province,city:a.city,country:a.country})}}}const{body:q}=await c({url:`${e.jsOperateWXDATAURL}`,method:'post',body:JSON.stringify({data:JSON.stringify(o.data||{})}),needToken:1,needAppID:1,needCheckErrCode:-1}),r=q.baseresponse;if(r){const b=q.baseresponse.errcode;if(0==b){const a=JSON.parse(q.data);try{const b=o.data&&o.data.api_name&&o.data.api_name.replace('webapi_','')||b;i({type:h.SIMULATOR_UPDATE_DECRYPTED_INFO,api:b,data:{encryptedData:a.encryptedData,iv:a.iv,sessionKey:q.debug_info.session_key,decryptedData:q.debug_info.data}})}catch(a){}return{errMsg:`${j.api}:ok`,data:a}}if(b==g.NEED_CONFORM)return await a(i,j,{imageUrl:q.appicon_url,appName:q.appname,scopeList:[q.scope]});const c=f.parseCgiErrorCode(b,r.errmsg);return{errMsg:`${j.api}:fail ${c}`}}}}}(require('lazyload'),require);