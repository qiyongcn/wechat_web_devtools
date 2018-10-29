'use strict';!function(require,directRequire){function a(a){return a.replace(H,'').replace(I,'').replace(J,'')}function b(a=12){const b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';let c='';for(let d=0;d<a;d++){const a=Math.floor(Math.random()*b.length);c+=b.substring(a,a+1)}return c}function c(){const a=w.getUserInfo(),b=a?a.openid:'unknow';return b||''}function d(a,b){const d=a.appid,e=c();if(b||!K[`${d}_${e}`]){const a=q.join(G,e,d);(b||!p.existsSync(a))&&(s.sync(q.join(a,C)),s.sync(q.join(a,D)),s.sync(q.join(a,E))),K[`${d}_${e}`]=!0}}function e(a){return H.test(a)?C:I.test(a)?D:J.test(a)?E:F}function f(a,d,e){const f=a.appid,g=c(),h=r.createHash('md5');return d=d||`${Date.now()}`,h.update(d),`${f}.${g}.${b()}${h.digest('hex')}${e}`}function g(a){const b=a.appid,d=c();return q.join(G,d,b)}function h(b,d){/^\/usr\/?$/i.test(b)||/^http:\/\/usr\/?$/i.test(b)?b='/usr/./':/^\/tmp\/?$/i.test(b)||/^http:\/\/tmp\/?$/i.test(b)?b='/tmp/./':(/^\/store\/?$/i.test(b)||/^http:\/\/store\/?$/i.test(b))&&(b='/store/./');const f=e(b);d=d||x.getCurrent();let g;if(f!==F){b=a(b);let e,h;e=d.appid||'',h=c();let i=q.join(G,h,e,f);if(i=/(\/|\\)$/.test(i)?i:i+'/',i=q.normalize(i),g=q.join(G,h,e,f,b),!g.startsWith(i))return{error:!0}}else{const a=d.miniprogramRoot,c=q.extname(b),e={".wxml":!0,".js":!0,".wxss":!0};if('mingganci'!==x.getCurrent().compileType&&'game'!==x.getCurrent().compileType&&(e['.json']=!0),!e[c]){let c;if(a?(c=q.join(d.projectpath,a),c=/(\/|\\)$/.test(c)?c:c+'/',c=q.normalize(c),g=q.join(d.projectpath,a,b)):(c=q.join(d.projectpath),c=/(\/|\\)$/.test(c)?c:c+'/',c=q.normalize(c),g=q.join(d.projectpath,b)),!g.startsWith(c))return{error:!0}}}return{error:!1,fileRealPath:g,type:f}}function i(a,b,d){const e=f(a,b,d),g=c(),h=q.join(G,g,a.appid,D,e);return p.writeFileSync(h,b),`${A}${e}`}function j(){const a=x.getCurrentRuntimeConfig(),b=a.setting.MaxFileStorageSize;return 1024*(1024*(b||10))}function k(a,b){const d=c(),e=a.appid,g=q.join(G,d,e,b);let h=0;const i={},f=t.sync('**/**',{statCache:i,nodir:!0,stat:!0,cwd:g})||[];return f.forEach((a)=>{const b=i[q.join(g,a).replace(/\\/g,'/')];b&&(h+=b.size||0)}),h}function l(a,b,c){const d=1,e=65536;(function(a,b,c){if('string'!=typeof b)throw new Error('_dest must be a string');if('string'!=typeof a)throw new Error('_src must be a string');if('number'==typeof c&&c&&c!==d)throw Error(`EINVAL: invalid argument, copyfile -> '${b}'`)})(a,b,c);const f=c===d?'wx':'w',{size:g,mode:h}=p.statSync(a),j=p.openSync(a,'r'),k=p.openSync(b,f,h),l=g<e?g:e;let m=0;const n=g<e?0:g%e,o=0;let q=Buffer.allocUnsafe(l);for(let d=0;l+m+n<=g;d++,m=l*d)p.readSync(j,q,o,l,m),p.writeSync(k,q,o,l,m);if(n){const a=n;q=Buffer.allocUnsafe(a),p.readSync(j,q,o,a,m),p.writeSync(k,q,o,a,m)}p.closeSync(j),p.closeSync(k)}function m(a,b){return o(a,b,C)}function n(a,b){return o(a,b,F)}function o(a,b,c){const d=h(b);if(d.type!==c)return{error:!0,reason:`permission denied, open ${b}`};const e=d.fileRealPath,f=q.dirname(e);let g=!1;try{const a=p.lstatSync(f);g=a.isDirectory()}catch(a){}return g?{error:!1,realDirPath:f,fileRealPath:e}:{error:!0,reason:`no such file or directory ${b}`}}const q=require('path'),p=require('fs'),r=require('crypto'),s=require('mkdir-p'),t=require('glob'),u=require('rmdir'),v=require('adm-zip'),w=require('./89ba85d67a88f7636d657c22b5d3e038.js'),x=require('./3bfffbe88b3d923921f851c0697974fe.js'),{DATA_PATH:y,USER_DATA_PATH:z,TMP_DATA_PATH:A,STORE_DATA_PATH:B}=require('./37be435102276ea9cf47609ff6535cd4.js'),C='usr',D='tmp',E='store',F='package',{WeappFileSystem:G}=require('./92320c1386e6db6a6f2556736a9bc280.js'),H=/^(http:\/)?\/usr\//,I=/^(http:\/)?\/tmp\//,J=/^(http:\/)?\/store\//,K={},L=(a,b=!1)=>{let c;switch(a){case C:{c=h('http://usr/./').fileRealPath;break}case D:{c=h('http://tmp/./').fileRealPath;break}case E:{c=h('http://store/./').fileRealPath;break}case F:{c=h('./').fileRealPath;break}default:return null;}return c=b&&c?/(\/|\\)$/.test(c)?c:c+'/':/(\/|\\)$/.test(c)?c.slice(0,-1):c,q.normalize(c)},M={saveStoreFile:function(a,b){const c=a.appid,d=h(b);if(d.type===D){const a=d.fileRealPath;if(p.existsSync(a)){const b=p.lstatSync(a);if(b.isSymbolicLink())return{error:!0,reason:'tempFilePath is not a regular file'};const c=q.basename(a),d=p.readFileSync(a),e=q.join(a,'..','..',E,c);p.writeFileSync(e,d);try{p.unlinkSync(a)}catch(b){console.error('unlink file',a,'failed')}return{error:!1,savedFilePath:`${B}${c}`}}}return{error:!0,reason:'tempFilePath file not exist'}},saveUsrFile:function(a,b,d){const e=a.appid,f=c(),g=h(d,a);if(g.type!==C)return{error:!0,reason:`permission denied, open "${d}"`};const i=g.fileRealPath,j=q.dirname(i);let k=!1;try{const a=p.lstatSync(j);k=a.isDirectory()}catch(a){}if(!k)return{error:!0,reason:`no such file or directory "${q.dirname(d)}"`};const l=h(b);if(!p.existsSync(l.fileRealPath))return{error:!0,reason:`no such file or directory "${b}"`};const m=p.lstatSync(l.fileRealPath);if(m.isSymbolicLink())return{error:!0,reason:'tempFilePath is not a regular file'};const n=p.readFileSync(l.fileRealPath);return p.writeFileSync(i,n),{error:!1,savedFilePath:d}},copyFileToTemp:function(a,b,c){const d=p.readFileSync(b);return i(a,d,c)},copyFileDataToTemp:i,getUsrFileList:function(a){const b=c(),d=a.appid,e=q.join(G,b,d,E),f={},g=t.sync('**/**',{statCache:f,nodir:!0,stat:!0,cwd:e});let h=0;for(const b in f)h+=f[b].size||0;return{error:!1,fileList:g,totalSize:h}},getSavedFileList:function(a){const b=c(),d=a.appid,e=q.join(G,b,d,E);let f=0;const g={},h=t.sync('**/**',{statCache:g,nodir:!0,stat:!0,cwd:e}),i=h.map((a)=>{const b=g[q.join(e,a).replace(/\\/g,'/')];return f+=b.size,{filePath:`${B}${a}`,size:b.size,createTime:parseInt(b.ctime.getTime()/1e3)}});return{error:!1,fileList:i,totalSize:f}},readFile:function(a,b,c){const d=h(b),e=d.fileRealPath;if(!p.existsSync(e))return{error:!0,reason:`${b} not found`};const f=p.lstatSync(e);if(f.isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};const g=p.readFileSync(e,c);return{error:!1,fileData:g}},writeFile:function(a,b,c,d='utf8'){const e=m(a,b);if(e.error)return e;const f=e.fileRealPath;if(p.existsSync(f)){const a=p.lstatSync(f);if(a.isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};if(a.isDirectory())return{error:!0,reason:`illegal operation on a directory, open ${b}`}}try{const b=Buffer.from(c,d),e=b.byteLength||0;if(k(a,C)+k(a,E)+e>j(a))return{error:!0,reason:'the maximum size of the file storage limit is exceeded'}}catch(a){}return p.writeFileSync(f,c,d),{error:!1}},mkdir:function(a,b){const c=m(a,b);if(c.error)return c;const d=c.fileRealPath;return p.existsSync(d)?{error:!0,reason:`file already exists ${b}`}:(s.sync(d),{error:!1})},rmdir:function(a,b){const d=m(a,b);if(d.error)return d;const e=d.fileRealPath,f=d.realDirPath,g=c();if(f===q.join(G,g,a.appid))return{error:!0,reason:`permission denied, open ${b}`};if(!p.existsSync(e)||!p.lstatSync(e).isDirectory())return{error:!0,reason:`no such file or directory  ${b}`};const h=p.readdirSync(e).filter(()=>!0);return 0===h.length?(p.rmdirSync(e),{error:!1}):{error:!0,reason:'directory not empty'}},readdir:function(a,b){const c=h(b+'/');let d;if(d=c.type===F?n(a,b+'/'):m(a,b+'/'),d.error)return d;const e=d.fileRealPath;if(!p.existsSync(e))return{error:!0,reason:`no such file or directory  ${b}`};if(!p.lstatSync(e).isDirectory())return{error:!0,reason:`not a directory  ${b}`};const f=p.readdirSync(e).filter(()=>!0);return{error:!1,files:f}},createTmpfileName:function(a,b){return`${A}${f(a,'',b)}`},initTmpfileName:function(a,b,c){return`${A}${f(a,b,c)}`},getFileSystemDir:g,unlink:function(a,b){const c=h(b,a);if(c.type===F)return{error:!0,reason:`fail permission denied, open "${b}"`};const d=c.fileRealPath;if(!p.existsSync(d))return{error:!0,reason:`fail no such file or directory "${b}"`};const e=p.lstatSync(d);if(e.isDirectory())return{error:!0,reason:`fail operation not permitted, unlink "${b}"`};try{p.unlinkSync(d)}catch(a){return{error:!0,reason:a.toString()}}return{error:!1}},stat:function(a,b){const c=h(b,a);if(c.type===F&&0===b.indexOf(y))return{error:!0,reason:`fail permission denied, open "${b}"`};const d=c.fileRealPath;if(!p.existsSync(d))return{error:!0,reason:`fail no such file or directory "${b}"`};const e=p.lstatSync(d);return{error:!1,mode:e.mode,size:e.size,lastAccessedTime:parseInt(e.atimeMs/1e3),lastModifiedTime:parseInt(e.mtimeMs/1e3)}},saveBase64DataToFile:function(a,b,d){const e=a.appid,g=c(),h=f(a,b,d);return p.writeFileSync(q.join(G,g,e,D,h),b,{encoding:'base64'}),{error:!1,tempFilePath:`${A}${h}`}},clearFileSystem:function(a){const b=g(a);u(b,()=>{d(a,!0)})},unzip:function(a,b,c){const d=h(b),e=d.fileRealPath;if(!e||!p.existsSync(e))return{error:!0,reason:`no such file or directory, unzip "${b}"`};const f=c,g=h(c),i=g.fileRealPath;if(!i||g.type!==C)return{error:!0,reason:`permission denied, unzip "${f}"`};const l=q.dirname(i);if(!p.existsSync(l)||p.lstatSync(l).isSymbolicLink())return{error:!0,reason:`no such file or directory, unzip "${f}"`};const m=p.lstatSync(e);if(m.isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};try{const b=new v(e),c=b.getEntries();let d=0;for(const a of c){const c=a.entryName;if(/^\.\.(\\|\/)+/.test(c))throw new Error('illegal access');if(/(\\|\/)+\.\.(\\|\/)+/.test(c))throw new Error('illegal access');if(/(\\|\/)+\.\.$/.test(c))throw new Error('illegal access');const e=b.readFile(a);d+=e.byteLength}if(k(a,C)+k(a,E)+d>j(a))return{error:!0,reason:'the maximum size of the file storage limit is exceeded'};b.extractAllTo(i,!0)}catch(a){return{error:!0,reason:'unzip failed'}}return{error:!1}},rename:function(a,b,c){const d=h(b),e=d.fileRealPath;if(!e||!p.existsSync(e))return{error:!0,reason:`no such file or directory, rename "${b}"`};if(d.type===F)return{error:!0,reason:`permission denied, rename "${b}" -> "${c}"`};const f=h(c),g=f.fileRealPath;if(!g||f.type!==C)return{error:!0,reason:`permission denied, rename "${b}" -> "${c}"`};const i=L(C,!0),j=L(D,!0),k=L(E,!0),l=L(F,!0);if(!e.startsWith(i)&&!e.startsWith(j)&&!e.startsWith(k)&&!e.startsWith(l))return{error:!0,reason:`permission denied, rename "${b}" -> "${c}"`};if(e===i||e===j||e===k||e===l)return{error:!0,reason:`permission denied, rename "${b}" -> "${c}"`};if(!g.startsWith(i)||i===g)return{error:!0,reason:`permission denied, rename "${b}" -> "${c}"`};if(p.lstatSync(e).isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};if(p.existsSync(g)&&p.lstatSync(g).isSymbolicLink())return{error:!0,reason:`${c} is not a regular file`};const m=q.dirname(g);if(!p.existsSync(m)||p.lstatSync(m).isSymbolicLink())return{error:!0,reason:`no such file or directory, rename "${c}"`};try{p.renameSync(e,g)}catch(a){return{error:!0,reason:'rename failed'}}return{error:!1}},copyFile:function(a,b,c){const d=h(b),e=d.fileRealPath;if(!e||!p.existsSync(e))return{error:!0,reason:`no such file or directory, copyFile "${b}"`};const f=h(c),g=f.fileRealPath;if(!g||f.type!==C)return{error:!0,reason:`permission denied, copyFile "${b}" -> "${c}"`};const i=p.lstatSync(e);if(!i.isFile())return{error:!0,reason:`permission denied, copyFile "${b}" -> "${c}"`};if(i.isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};const m=k(a,C)+k(a,E);if(m+(i.size||0)>j(a))return{error:!0,reason:'the maximum size of the file storage limit is exceeded'};const n=L(C,!0);if(!g.startsWith(n)||n===g)return{error:!0,reason:`permission denied, copyFile "${b}" -> "${c}"`};if(p.existsSync(g)&&p.lstatSync(g).isSymbolicLink())return{error:!0,reason:`${c} is not a regular file`};if(g===e)return{error:!1};if(p.existsSync(g)){try{p.unlinkSync(g)}catch(a){}try{p.rmdirSync(g)}catch(a){}}const o=q.dirname(g);if(!p.existsSync(o)||p.lstatSync(o).isSymbolicLink())return{error:!0,reason:`no such file or directory, copyFile "${c}"`};try{l(e,g)}catch(a){return{error:!0,reason:'copyFile failed'}}return{error:!1}},appendFile:function(a,b,c,d){const e=h(b);if(!e||e.type!==C)return{error:!0,reason:`permission denied, open "${b}"`};const f=e.fileRealPath;if(!f||!p.existsSync(f))return{error:!0,reason:`no such file or directory, open "${b}"`};const g=p.lstatSync(f);if(!g.isFile())return{error:!0,reason:`illegal operation on a directory, open "${b}"`};if(g.isSymbolicLink())return{error:!0,reason:`${b} is not a regular file`};const i=Buffer.from(c,d||'utf-8'),l=k(a,C)+k(a,E);if(l+(i.byteLength||0)>j(a))return{error:!0,reason:'the maximum size of the file storage limit is exceeded'};try{p.appendFileSync(f,c,d||'utf-8')}catch(a){return{error:!0,reason:a.toString&&a.toString()||a}}return{error:!1}}};Object.getOwnPropertyNames(M).forEach(function(a){const b=M[a];M[a]=function(){return d(arguments[0]),b.apply(M,arguments)}}),M.getFileRealPath=h,M.removeSavedFile=function(a){const b=h(a),c=b.fileRealPath;if(b.type===E&&p.existsSync(c)){try{p.unlinkSync(c)}catch(a){}return{error:!1}}return{error:!0,reason:'file not exist'}},M.getFileStat=function(a){const b=h(a),c=b.fileRealPath;try{const a=p.statSync(c);return{error:!1,size:a.size,createTime:parseInt(a.ctime.getTime()/1e3)}}catch(a){return{error:!0,reason:'file not found'}}},M.getFileInfo=function(a,b,c){const d=h(a);if(c&&d.type!==c)return{error:!0,reason:'file not find'};const e=d.fileRealPath;if(p.existsSync(e)){const c=p.lstatSync(e);if(c.isDirectory())return{error:!0,reason:`${a} is directory`};if(c.isSymbolicLink())return{error:!0,reason:`${a} is not a regular file`};const d=p.readFileSync(e);let f='';if('md5'===b){const a=r.createHash('md5');a.update(d),f=a.digest('hex')}else if('sha1'===b){const a=r.createHash('sha1');a.update(d),f=a.digest('hex')}return{error:!1,size:c.size,createTime:parseInt(c.ctime.getTime()/1e3),digest:f}}return{error:!0,reason:'file not exist'}},M.isLocalId=function(a){return 0===a.indexOf(z+'/')||0===a.indexOf(A)||0===a.indexOf(B)},M.USR='usr',M.TMP='tmp',M.STORE='store',M.PACKAGE='package',M.STORE_DATA_PATH=B,M.DATA_PATH=y,M.USER_DATA_PATH=z,M.TMP_DATA_PATH=A,module.exports=M}(require('lazyload'),require);