'use strict';!function(require,directRequire){const a=require('react'),b=require('redux'),c=require('moment'),d=require('./a8c87029da0fa06e986298d447ab0fe2.js'),e=require('./cc2c2970ff81ae4a83123e81ee123da2.js'),f=require('./25d0beb4120ce2acafb4e03b95444fda.js'),g=require('./1fcc6bd55b687d154a4247e57fe3011d.js'),h=require('./0794878a22a26634e42df858bbaca543.js'),i=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),j=require('./72410b6d4968336cd8b2fc1d41f52cdf.js'),k=require('./3b5f8e2469c474c8d433c1c6926d8999.js'),l=require('./common/locales/index.js'),m=require('./875171e7b864aa58d026d4fa0999fbd1.js'),{connect:n}=require('react-redux');class o extends a.Component{constructor(a){super(a),this.state={cleverUpload:!0,moduleUpload:!1,tickSrc:!1,tickNodeModules:!1,tickPackageJSON:!1,autoInstallDependence:!1,show:a.show}}componentDidMount(){this._cancalLocaleListener=l.onChangeLocale(()=>this.forceUpdate())}componentWillUnmount(){this._cancalLocaleListener()}componentWillReceiveProps(a){a.show!=this.props.show&&this.setState({show:a.show})}onClose(){this.setState({show:!1})}async onConfirm(){try{this.setState({show:!1}),this.props.setProjectQCloud({uploadStatus:i.STATUS.LOADING,currentOperation:j.CLOUD_ACTION_UPLOAD});const a='PROXY dev-proxy.oa.com:8080'===nw.App.getProxyForURL('https://gz.file.myqcloud.com');this.props.setQCloudWnd({show:!0,status:i.QCLOUD_STATUS.UPLOADING,text:l.config.QCLOUD_WATING_TIP_UPLOADING});const b=await h.uploadSvrCode(this.props.project,{devEnv:this.props.env,cleverPack:this.state.cleverUpload,src:this.state.tickSrc,node_modules:this.state.tickNodeModules,packagejson:!0,onBeforeUpload:(b)=>{if(a){const a=b.pDataLength/1024,c=(a/40).toFixed(0);this.props.setQCloudWnd({show:!0,status:i.QCLOUD_STATUS.UPLOADING,text:l.config.QCLOUD_WATING_TIP_UPLOADING,descList:[l.config.QCLOUD_UPLOAD_WAITING.format(c)],estimateTime:c})}}});this.props.setProjectQCloud({data:b,uploadStatus:i.STATUS.SUCCESS,currentOperation:''}),this.props.setQCloudWnd({show:!0,status:i.QCLOUD_STATUS.UPLOAD_SUCCESS,text:l.config.QCLOUD_UPLOAD_SUCCESS_TITLE,descList:[l.config.QCLOUD_SUCCESS_TIP_UPLOAD.format(c(new Date).calendar())],estimateTime:void 0}),this.props.setQCloudActionType(i.QCLOUD_ACTION_TYPE.DEPLOY_DEV,{installDependence:this.state.autoInstallDependence})}catch(a){this.props.showUploading(i.QCLOUD_STATUS.UPLOAD_FAIL,a.toString()),this.props.setProjectQCloud({uploadStatus:i.STATUS.FAIL,currentOperation:''})}}onQuestionMarkClick(){nw.Shell.openExternal('https://github.com/tencentyun/wafer2-startup')}toggleCleverUpload(a){a.stopPropagation(),this.setState({cleverUpload:!0,moduleUpload:!1})}toggleModuleUpload(a){a.stopPropagation(),this.setState({cleverUpload:!1,moduleUpload:!0})}toggleSrcCheckbox(a){a.stopPropagation(),this.setState({tickSrc:!this.state.tickSrc})}toggleNodeModulesCheckbox(a){a.stopPropagation(),this.setState({tickNodeModules:!this.state.tickNodeModules})}togglePackageJSONCheckbox(a){a.stopPropagation(),this.setState({tickPackageJSON:!this.state.tickPackageJSON})}toggleAutoInstall(a){a.stopPropagation(),this.setState({autoInstallDependence:!this.state.autoInstallDependence})}onAnimationOut(){this.props.close()}render(){const b=this.props,c='zh'===l.getLocale()?{width:420,marginLeft:-210}:{width:700,marginLeft:-350};return a.createElement(m,{show:this.state.show,style:c,inClassName:'ui-animate-pull-down ui-dialog',outClassName:'ui-animate-pull-up ui-dialog',onAnimationOut:this.onAnimationOut.bind(this)},a.createElement('div',{className:'ui-dialog-hd'},a.createElement('h3',{className:'ui-dialog-title'},l.config.QCLOUD_UPLOAD)),a.createElement('div',{className:'ui-dialog-bd'},a.createElement('p',{className:'ui-desc'},l.config.QCLOUD_CHOOSE_UPLOAD),a.createElement('br',null),a.createElement('div',{className:'ui-form'},a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('div',{className:'ui-form-controls'},a.createElement('label',{className:'ui-radio ui-radio-vt',onClick:this.toggleCleverUpload.bind(this)},a.createElement('i',{className:this.state.cleverUpload?'ui-icon-radio-o':'ui-icon-radio'}),a.createElement('div',{className:'ui-radio-text'},a.createElement('p',null,l.config.INTELLIGENT_UPLOAD),a.createElement('p',{className:'ui-desc'},l.config.QCLOUD_UPLOAD_CHANGED_CODE))))),a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('div',{className:'ui-form-controls'},a.createElement('label',{className:'ui-radio ui-radio-vt',onClick:this.toggleModuleUpload.bind(this)},a.createElement('i',{className:this.state.moduleUpload?'ui-icon-radio-o':'ui-icon-radio'}),a.createElement('div',{className:'ui-radio-text'},'nodejs'===b.env?a.createElement('p',null,l.config.MODULE_UPLOAD):a.createElement('p',null,l.config.NORMAL_UPLOAD),'php'===b.env?null:a.createElement('div',null,a.createElement('p',{className:'ui-desc'},l.config.QCLOUD_SEPARATELY_UPLOAD),a.createElement('div',{style:this.state.moduleUpload?{}:k.displayNone},a.createElement('p',null,a.createElement('label',{className:'ui-checkbox',onClick:this.toggleSrcCheckbox.bind(this)},a.createElement('i',{className:this.state.tickSrc?'ui-icon-checkbox-o':'ui-icon-checkbox'}),a.createElement('span',{className:'ui-checkbox-text'},l.config.QCLOUD_UPLOAD_EXCEPT_NODE_MODULES))),a.createElement('p',null,a.createElement('label',{className:'ui-checkbox',onClick:this.toggleNodeModulesCheckbox.bind(this)},a.createElement('i',{className:this.state.tickNodeModules?'ui-icon-checkbox-o':'ui-icon-checkbox'}),a.createElement('span',{className:'ui-checkbox-text'},l.config.QCLOUD_UPLOAD_NODE_MODULES))))))))))),a.createElement('div',{className:'ui-dialog-ft'},a.createElement('div',{className:'ui-dialog-action'},'nodejs'===b.env?a.createElement('label',{className:'ui-checkbox',onClick:this.toggleAutoInstall.bind(this)},a.createElement('i',{className:this.state.autoInstallDependence?'ui-icon-checkbox-o':'ui-icon-checkbox'}),a.createElement('span',{className:'ui-checkbox-text'},l.config.AUTO_INSTALL_DEPENDENCIES_DEPLOY)):null),a.createElement('div',{className:'ui-dialog-action'},a.createElement('button',{className:'ui-button ui-button-default',onClick:this.onClose.bind(this)},l.config.CANCEL),a.createElement('button',{className:'ui-button ui-button-primary',onClick:this.onConfirm.bind(this)},l.config.CONFIRM))))}}module.exports=n((a)=>{const b=a.window.qcloud.uploading&&a.window.qcloud.uploading.descList||[],c=a.project.current;let d='nodejs';try{d=2===parseInt(c.runtimeAttr.qcloud.qcloud_dev_info.current_language,10)?'php':'nodejs'}catch(a){}return{qcloud:c&&c.qcloud,show:a.window.qcloud.uploadShow,project:c,descList:b,env:d}},(a)=>({setAutoInstallDependence:(b)=>{a(d.setQCloud({autoInstallDependence:b}))},setQCloudWnd:(b)=>{a(d.setQCloud({uploading:b}))},showUploading:(b=i.QCLOUD_UPLOADING_STATUS.UPLOADING,c='',e='')=>{a(d.setQCloud({uploading:{show:!0,status:b,text:c,estimateTime:e}}))},closeUploading:()=>{a(d.setQCloud({uploading:{show:!1,status:i.QCLOUD_UPLOADING_STATUS.UPLOADING,text:''}}))},close:()=>{a(d.setQCloud({uploadShow:!1}))},setProjectQCloud:(b)=>{a(e.setProjectQCloud(b))},setQCloudActionType:(b,c)=>{a(d.setQCloudActionType({actionType:b,options:c}))},notifyFail:(b)=>a(g.setConfirmInfo({show:!0,showCancel:!1,title:l.config.QCLOUD_UPLOAD_FAIL_TITLE,content:b,callback:async()=>{a(g.setConfirmInfo({show:!1}))}}))}))(o)}(require('lazyload'),require);