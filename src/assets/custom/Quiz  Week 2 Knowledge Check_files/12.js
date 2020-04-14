canvasWebpackJsonp([12],{"+JpRIS14Qm":function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("BkaAgcBhey"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("subnav_menu_toggle")},"/W/ggH9WyQ":function(e,t,i){"use strict"
var n,a=i("mOY9BNujNR"),o=i.n(a),r=i("iBw8ZGM6v8"),s=i.n(r),d=i("Fbgaaelsi7"),c=i("qagVT2atnL"),l=i("IIpzxDTdC3"),u=i("evahSH1MgD"),m=i("ir8pL/Ro1S")
function _(){if(!ENV.context_asset_string)return null
var e=Object(m.a)(ENV.context_asset_string)
return{canUploadFiles:ENV.RICH_CONTENT_CAN_UPLOAD_FILES,contextId:e[1],contextType:e[0],filesTabDisabled:ENV.RICH_CONTENT_FILES_TAB_DISABLED,host:ENV.RICH_CONTENT_APP_HOST,jwt:ENV.JWT,refreshToken:Object(d.a)(ENV.JWT),themeUrl:ENV.active_brand_config_json_url}}var h={preload:function(e){this.loadRCE(e)},loadOnTarget:function(e,t,i){var n=this.getTargetTextarea(e),a=this.getRenderingTarget(n,t.getRenderingTarget),o=this.createRCEProps(n,t)
this.loadRCE(function(e){e.renderIntoDiv(a,o,function(e){e.mceInstance().on("init",function(){return i(n,u.a.wrapEditor(e))})})})},loadSidebarOnTarget:function(e,t){if(!ENV.RICH_CONTENT_SKIP_SIDEBAR){var i=_()
this.loadRCE(function(n){n.renderSidebarIntoDiv(e,i,function(e){t(u.a.wrapSidebar(e))})})}},loadingCallbacks:[],RCE:null,loadRCE:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){}
n||(n=(window.ENV.use_rce_enhancements?i.e(0).then(i.bind(null,"6KfoB+dtLz")):i.e(1).then(i.bind(null,"vaZ5sMtsdY"))).then(function(t){e.RCE=t
Object(l.a)()
return t}))
return n.then(function(){e.loadingCallbacks.forEach(function(t){return t(e.RCE)})
e.loadingCallbacks=[]
t(e.RCE)})},getTargetTextarea:function(e){return"textarea"==o()(e).get(0).type?o()(e).get(0):o()(e).find("textarea").get(0)},getRenderingTarget:function(e){var t,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0
t=void 0===i?o()(e).parent().get(0):i(e)
o()(t).addClass("ic-RichContentEditor")
return t},_attrsToMirror:function(e){var t=s.a.reduce(e.attributes,function(e,t){e[t.name]=t.value
return e},{})
return s.a.pick(t,["name"])},createRCEProps:function(e,t){var i=e.offsetWidth,n=e.offsetHeight
n&&(t.tinyOptions=s.a.extend({},{height:n},t.tinyOptions||{}))
return{defaultContent:e.value||t.defaultContent,editorOptions:c.a.bind(null,i,e.id,t,null),language:ENV.LOCALE,mirroredAttrs:this._attrsToMirror(e),onFocus:t.onFocus,textareaClassName:e.className,textareaId:e.id,trayProps:_()}}}
t.a=h},"2aUY+gHXYk":function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
a()(document).on("keydown",".ic-Super-toggle__input",function(e){13===e.which&&a()(e.target).click()})},"3HTgpJ/Ga1":function(e,t,i){"use strict"
t.a=function(){return(ENV.LTI_LAUNCH_FRAME_ALLOWANCES||[]).join("; ")}},"4JOyD1bKYU":function(e,t,i){"use strict"
var n=i("/W/ggH9WyQ"),a=i("TVAqaFMvRJ"),o=i("fMZxOSn6U9"),r=i("mOY9BNujNR"),s=i.n(r)
function d(e,t,i){e.css("display","none")
var o=t.onFocus
t.onFocus=function(){_.showSidebar()
o instanceof Function&&o.apply(void 0,arguments)}
n.a.loadOnTarget(e,t,function(t,n){var o=h(e)
m(s()(t)).data("remoteEditor",n)
o.trigger(a.a,n)
i&&i()})}function c(e){var t=h(e),i=t.attr("id"),n="tinymce-parent-of-".concat(i)
if(t.parent().attr("id")!==n)return t.wrap("<div id='".concat(n,"' style='visibility: hidden'></div>"))}var l=0
function u(e){var t=s()(e),i="attr"in t?t.attr("id"):t.id
i&&""!=i||t.attr("id","random_editor_id_".concat(l++))}function m(e){var t=h(e),i=t.attr("id")
if(!i||""==i)return t
var n=s()("#".concat(i))
return n.length<=0?t:n}var _={preloadRemoteModule:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){}
return n.a.preload(e)},initSidebar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
o.a.init(e)},showSidebar:function(){o.a.show()},hideSidebar:function(){o.a.hide()},loadNewEditor:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,a=h(e)
if(!(a.length<=0)){u(a)
i=s.a.extend({},i)
a=this.freshNode(a)
if(i.manageParent){delete i.manageParent
c(a)}d(a,i,function(){i.focus&&t.activateRCE(a)
n&&n()})
s()(".mce-resizehandle").attr("aria-hidden",!0)}},callOnRCE:function(e,t){var i=h(e)
i=this.freshNode(i)
for(var n=arguments.length,o=new Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r]
return a.d.apply(void 0,[i,t].concat(o))},destroyRCE:function(e){var t=h(e)
t=this.freshNode(t)
Object(a.b)(t)
o.a.hide()},activateRCE:function(e){var t=h(e)
t=this.freshNode(t)
Object(a.c)(t)
o.a.show()},freshNode:m,ensureID:u}
function h(e){return e.length?e:s()(e)}t.a=_},"53cLBmp0Qb":function(e,t,i){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
i.d(t,"default",function(){return d})
var n=i("l2OaefyPCY"),a=i("pI4K9aISfJ"),o=i("Ii09r7XDvi"),r=i("mOY9BNujNR"),s=i.n(r),d=function(){function e(t){Object(n.a)(this,e)
this.editor=t
this.id_prepend=t.id
this.$el=s()("#".concat(t.editorContainer.id))}Object(a.a)(e,[{key:"accessiblize",value:function(){this._cacheElements()
this._addTitles()
this._addLabels()
this._accessiblizeMenubar()
this._removeStatusbarFromTabindex()}},{key:"_cacheElements",value:function(){this.$iframe=this.$el.find(".mce-edit-area iframe")}},{key:"_addLabels",value:function(){this.$el.attr("aria-label",o.a.t("Rich Content Editor"))
s()(this.editor.getBody()).attr("aria-label",s()('label[for="'.concat(this.id_prepend,'"]')).text())
this.$el.find("div[aria-label='Font Sizes']").attr("aria-label",o.a.t("titles.font_size","Font Size, press down to select"))
this.$el.find("div.mce-listbox.mce-last:not([aria-label])").attr("aria-label",o.a.t("titles.formatting","Formatting, press down to select"))
this.$el.find("div[aria-label='Text color']").attr("aria-label",o.a.t("accessibles.forecolor","Text Color, press down to select"))
this.$el.find("div[aria-label='Background color'").attr("aria-label",o.a.t("accessibles.background_color","Background Color, press down to select"))}},{key:"_addTitles",value:function(){this.$iframe.attr("title",o.a.t("titles.rte_help","Rich Text Area. Press ALT+F8 for help"))}},{key:"_accessiblizeMenubar",value:function(){var e=this,t=this.$el.find(".mce-menubar"),i=t.find(".mce-menubtn").first()
t.hide()
this.editor.addShortcut("Alt+F9","",function(){t.show()
i.focus()
e.editor.addShortcut("Alt+F9","",function(){return i.focus()})})}},{key:"_removeStatusbarFromTabindex",value:function(){this.$el.find(".mce-statusbar > .mce-container-body").attr("tabindex",-1)}}])
return e}()},"7kvb1n675f":function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{"en-AU":{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"This document cannot be displayed within Canvas.",document_preview_processing:"The document preview is currently being processed. Please try again later."}}},"en-CA":{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"This document cannot be displayed within Canvas.",document_preview_processing:"The document preview is currently being processed. Please try again later."}}},"en-GB":{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"This document cannot be displayed within Canvas.",document_preview_processing:"The document preview is currently being processed. Please try again later."}}},"en-GB-x-ukhe":{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"This document cannot be displayed within Canvas.",document_preview_processing:"The document preview is currently being processed. Please try again later."}}},is:{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"Ekki h\xe6gt a\xf0 s\xfdna \xfeetta skjal \xed Canvas.",document_preview_processing:"Forsko\xf0un skjala er \xed vinnslu. Vinsamlegast reyndu aftur seinna."}}},mi:{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"E kore e taea te whakaatu i t\u0113nei tuhinga i roto i Canvas.",document_preview_processing:"Kei te tukatuka i t\u0113nei w\u0101 te arokite tuhinga. T\u0113n\u0101 koa ngana an\u014d i muri mai."}}},ru:{jquery_doc_previews:{errors:{cannot_view_document_in_canvas:"\u042d\u0442\u043e\u0442 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442 \u043d\u0435\u043b\u044c\u0437\u044f \u043e\u0442\u043e\u0431\u0440\u0430\u0437\u0438\u0442\u044c \u0432\u043d\u0443\u0442\u0440\u0438 Canvas.",document_preview_processing:"\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430 \u0432 \u0434\u0430\u043d\u043d\u044b\u0439 \u043c\u043e\u043c\u0435\u043d\u0442 \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u043f\u043e\u0437\u0436\u0435."}}}}})},"9+ND/lQLGk":function(e,t,i){"use strict"
var n=i("sqpSUkotFw"),a=i("klGFYzYm7x"),o=(i.n(a),i("mOY9BNujNR")),r=i.n(o),s=(i("pmU8As9kkw"),function(e,t){for(var i in t)d.call(t,i)&&(e[i]=t[i])
function n(){this.constructor=e}n.prototype=t.prototype
e.prototype=new n
e.__super__=t.prototype
return e}),d={}.hasOwnProperty
t.a=function(e){s(t,e)
function t(){return t.__super__.constructor.apply(this,arguments)}t.prototype.el="#keyboard_navigation"
t.prototype.initialize=function(){t.__super__.initialize.apply(this,arguments)
this.bindOpenKeys
return this}
t.prototype.render=function(e){this.$el.html(e)
return this}
t.prototype.bindOpenKeys=function(){var e,t
e=null
return r()(document).keydown((t=this,function(i){if((188===i.keyCode||191===i.keyCode)&&!r()(i.target).is(":input")){i.preventDefault()
if(!t.$el.is(":visible")){e=document.activeElement
return t.$el.dialog({title:n.a.t("titles.keyboard_shortcuts","Keyboard Shortcuts"),width:400,height:"auto",close:function(){r()("li",this).attr("tabindex","")
if(e)return r()(e).focus()}})}t.$el.dialog("close")
if(e)return r()(e).focus()}}))}
return t}(a.View)},"9vdLYFzxED":function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("f+YlSntt6E"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("broken_images")},ATXgBniL6v:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{"en-AU":{media_comments_publicjs:{buttons:{submit:"Submit Media File"},errors:{file_too_large:"*The file is too large.* The maximum size is %{size}MB",load_failed:"Media Comment Application failed to load.  Please try again.",media_comment_installation_broken:"Media comment uploading has not been set up properly. Please contact your administrator.",must_be_logged_in:"You must be logged in to record media.",persistent_problem:"If this problem keeps happening, you may want to try recording your media locally and then uploading the saved file instead.",save_failed:"Saving appears to have failed.  Please close this popup to try again.",save_failed_try_again:"Entry failed to save.  Please try again.",upload_failed:"Upload failed with error:"},messages:{flash_required_record_audio:"Flash required for recording audio.",flash_required_upload_audio:"Flash required for uploading audio.",flash_required_upload_video:"Flash required for uploading video.",loading:"Loading...",submitted:"Submitted Media File!",submitting:"Submitting Media File..."},titles:{media_contribution:"Media Contribution",record_upload_media_comment:"Record/Upload Media Comment"}}},"en-CA":{media_comments_publicjs:{buttons:{submit:"Submit Media File"},errors:{file_too_large:"*This file is too large.* The maximum size is %{size}MB.",load_failed:"Media Comment Application failed to load.  Please try again.",media_comment_installation_broken:"Media comment uploading has not been set up properly. Please contact your administrator.",must_be_logged_in:"You must be logged in to record media.",persistent_problem:"If this problem keeps happening, you may want to try recording your media locally and then uploading the saved file instead.",save_failed:"Saving appears to have failed.  Please close this popup to try again.",save_failed_try_again:"Entry failed to save.  Please try again.",upload_failed:"Upload failed with error:"},messages:{flash_required_record_audio:"Flash required for recording audio.",flash_required_upload_audio:"Flash required for uploading audio.",flash_required_upload_video:"Flash required for uploading video.",loading:"Loading...",submitted:"Submitted Media File!",submitting:"Submitting Media File..."},titles:{media_contribution:"Media Contribution",record_upload_media_comment:"Record/Upload Media Comment"}}},"en-GB":{media_comments_publicjs:{buttons:{submit:"Submit Media File"},errors:{file_too_large:"*This file is too large.* The maximum size is %{size}MB.",load_failed:"Media comment application failed to load.  Please try again.",media_comment_installation_broken:"Media comment uploading has not been set up properly. Please contact your administrator.",must_be_logged_in:"You must be logged in to record media.",persistent_problem:"If this problem keeps happening, you may want to try recording your media locally and then uploading the saved file instead.",save_failed:"Saving appears to have failed.  Please close this popup to try again.",save_failed_try_again:"Entry failed to save.  Please try again.",upload_failed:"Upload failed with error:"},messages:{flash_required_record_audio:"Flash required for recording audio.",flash_required_upload_audio:"Flash required for uploading audio.",flash_required_upload_video:"Flash required for uploading video.",loading:"Loading...",submitted:"Submitted media file!",submitting:"Submitting media file..."},titles:{media_contribution:"Media contribution",record_upload_media_comment:"Record/upload media comment"}}},"en-GB-x-ukhe":{media_comments_publicjs:{buttons:{submit:"Submit Media File"},errors:{file_too_large:"*This file is too large.* The maximum size is %{size}MB.",load_failed:"Media comment application failed to load.  Please try again.",media_comment_installation_broken:"Media comment uploading has not been set up properly. Please contact your administrator.",must_be_logged_in:"You must be logged in to record media.",persistent_problem:"If this problem keeps happening, you may want to try recording your media locally and then uploading the saved file instead.",save_failed:"Saving appears to have failed.  Please close this popup to try again.",save_failed_try_again:"Entry failed to save.  Please try again.",upload_failed:"Upload failed with error:"},messages:{flash_required_record_audio:"Flash required for recording audio.",flash_required_upload_audio:"Flash required for uploading audio.",flash_required_upload_video:"Flash required for uploading video.",loading:"Loading...",submitted:"Submitted media file!",submitting:"Submitting media file..."},titles:{media_contribution:"Media contribution",record_upload_media_comment:"Record/upload media comment"}}},is:{media_comments_publicjs:{buttons:{submit:"Leggja fram mi\xf0ilsskr\xe1"},errors:{file_too_large:"*Skr\xe1in er of st\xf3r.* H\xe1marki\xf0 er %{size}MB.",load_failed:"Mi\xf0ilsathugasemdat\xf3l hl\xf3\xf0st ekki inn.  Vinsamlegast reyni\xf0 aftur.",media_comment_installation_broken:"Upphle\xf0sla margmi\xf0lunarathugasemdar var ekki sett r\xe9tt upp. Haf\xf0u samband vi\xf0 kerfisstj\xf3ra.",must_be_logged_in:"Innskr\xe1ningu \xfearf til a\xf0 taka upp mi\xf0il.",persistent_problem:"Ef \xfeetta vandam\xe1l kemur aftur fyrir, g\xe6tir\xf0u pr\xf3fa\xf0 a\xf0 taka upp efni\xf0 \xe1 sta\xf0num og hla\xf0a s\xed\xf0an upp vista\xf0ri skr\xe1.",save_failed:"Vistun t\xf3kst ekki.  Loka\xf0u sprettiglugganum og reyndu aftur.",save_failed_try_again:"Ekki t\xf3kst a\xf0 vista f\xe6rslu.  Vinsamlegast reyni\xf0 aftur.",upload_failed:"Upphle\xf0sla t\xf3kst ekki me\xf0 villu:"},messages:{flash_required_record_audio:"Flash \xfearf til a\xf0 taka upp hlj\xf3\xf0skr\xe1.",flash_required_upload_audio:"Flash \xfearf fyrir upphle\xf0slu \xe1 hlj\xf3\xf0skr\xe1.",flash_required_upload_video:"Flash \xfearf fyrir upphle\xf0slu \xe1 myndskr\xe1.",loading:"Hle\xf0 inn...",submitted:"Uppt\xf6ku skila\xf0!",submitting:"Hle\xf0 upp uppt\xf6ku..."},titles:{media_contribution:"Mi\xf0ilsframlag",record_upload_media_comment:"Taka upp/Hla\xf0a upp mi\xf0ilsathugasemd"}}},mi:{media_comments_publicjs:{buttons:{submit:"Tuku K\u014dnae P\u0101p\u0101ho"},errors:{file_too_large:"*Ko te nui rawa t\u0113nei k\u014dnae.* Te rahi m\u014drahi he %{size}MB.",load_failed:"Rahua te uta Taup\u0101nga T\u0101kupu p\u0101p\u0101ho.  T\u0113n\u0101 koa ngana an\u014d.",media_comment_installation_broken:"Te tikiake a te k\u014drero p\u0101p\u0101ho kaore an\u014d i whakatautia tika. T\u0113n\u0101 koa whakap\u0101 ki t\u014d kaiwhakahaere.",must_be_logged_in:"Me takiuru koe i roto i ki te tahopu p\u0101p\u0101ho.",persistent_problem:"Ki te pupuri i t\u0113nei raruraru e puta ana, e hiahia ana kia koe ki te ngana te tuhi rohe koutou p\u0101p\u0101ho, me te ka te tuku k\u0113 te k\u014dnae ora.",save_failed:"Puta Tiaki rahua ki te kua.  Katia koa t\u0113nei pak\u016bake ki ngana an\u014d.",save_failed_try_again:"I rahua te T\u0101urunga ki te whakaora.  T\u0113n\u0101 koa ngana an\u014d.",upload_failed:"I rahua te tukuake ki hapa:"},messages:{flash_required_record_audio:"Flash e hiahiatia ana mo tuhi ororongo.",flash_required_upload_audio:"Flash e hiahiatia ana mo te tuku ororongo.",flash_required_upload_video:"Flash e hiahiatia ana mo te tuku ataata.",loading:"E Uta ana ....",submitted:"K\u014dnae P\u0101p\u0101ho T\u0101paehia!",submitting:"Te tuku K\u014dnae P\u0101p\u0101ho ..."},titles:{media_contribution:"Koha p\u0101p\u0101ho",record_upload_media_comment:"Tuhia / T\u0101kupu Tukuake p\u0101p\u0101ho"}}},ru:{media_comments_publicjs:{buttons:{submit:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0444\u0430\u0439\u043b \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430"},errors:{file_too_large:"*\u042d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439.* \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u2014 %{size} \u041c\u0431\u0430\u0439\u0442.",load_failed:"\u041e\u0448\u0438\u0431\u043a\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u044b\u0445 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432.  \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",media_comment_installation_broken:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u044b\u0445 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432 \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u043d\u0430\u0434\u043b\u0435\u0436\u0430\u0449\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c. \u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0441\u0432\u043e\u0435\u043c\u0443 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0443.",must_be_logged_in:"\u0414\u043b\u044f \u0437\u0430\u043f\u0438\u0441\u0438 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u043e\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443.",persistent_problem:"\u0415\u0441\u043b\u0438 \u044d\u0442\u0443 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0443 \u043d\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044f \u0443\u0441\u0442\u0440\u0430\u043d\u0438\u0442\u044c, \u043c\u043e\u0436\u043d\u043e \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0437\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e, \u0437\u0430\u0442\u0435\u043c \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0439 \u0444\u0430\u0439\u043b.",save_failed:"\u041f\u043e-\u0432\u0438\u0434\u0438\u043c\u043e\u043c\u0443, \u043f\u0440\u043e\u0438\u0437\u043e\u0448\u0435\u043b \u0441\u0431\u043e\u0439 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f.  \u0417\u0430\u043a\u0440\u043e\u0439\u0442\u0435 \u044d\u0442\u043e \u0432\u0441\u043f\u043b\u044b\u0432\u0430\u044e\u0449\u0435\u0435 \u043e\u043a\u043d\u043e \u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.",save_failed_try_again:"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f \u0437\u0430\u043f\u0438\u0441\u0438.  \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437.",upload_failed:"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f:"},messages:{flash_required_record_audio:"\u0414\u043b\u044f \u0437\u0430\u043f\u0438\u0441\u0438 \u0437\u0432\u0443\u043a\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f Flash.",flash_required_upload_audio:"\u0414\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0437\u0432\u0443\u043a\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f Flash.",flash_required_upload_video:"\u0414\u043b\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0432\u0438\u0434\u0435\u043e \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f Flash.",loading:"\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",submitted:"\u0424\u0430\u0439\u043b \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d!",submitting:"\u041e\u0442\u043f\u0440\u0430\u0432\u043a\u0430 \u0444\u0430\u0439\u043b\u0430 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430..."},titles:{media_contribution:"\u0412\u043a\u043b\u0430\u0434 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0430",record_upload_media_comment:"\u0417\u0430\u043f\u0438\u0441\u044c/\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u043e\u0433\u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f"}}}}})},BIYSGtzGjH:function(e,t,i){"use strict"
var n=i("9+ND/lQLGk"),a=(i("whMk0QU2To"),i("UAuFKQZf3D")),o=i("mOY9BNujNR"),r=i.n(o),s=i("iBw8ZGM6v8"),d=i.n(s),c=i("1IKDY5pCFs"),l=i("eJBzaBDd6c"),u=i("ArN3I+GqU9"),m=i("4JOyD1bKYU"),_=(i("zYWt9o0wMR"),i("r81G667jwg"),i("Q4xR9Iqymk"),i("KVDLV1bDgD"),i("Q/pI8WL7wG"),i("Bvm3aweHSm"),i("pwv1UBr9wT"),i("pmU8As9kkw"),i("kzdUuF07HD"),i("3pTo86YxQs"),i("A6xh958p9n"),i("+d6o9BzfWM"),i("yR513+6+ip"),i("nXH6nMYdz2"),i("t0oyyDFjk2"),i("l1QdNhNedg"),i("OKSaC6qKke"),i("yvh8ynczHv"))
i.n(_),i("rM/Waq56bL"),i("ZwdgLllWpW"),i("oxTDiksfqi"),i("V9Ry3Xcwt0")
function h(){var e=r()(this),t=e.attr("href"),i=r.a.youTubeID(t||"")
if(i&&!e.hasClass("inline_disabled")){var n=r()('\n      <a\n        href="'.concat(Object(l.a)(t),'"\n        class="youtubed"\n      >\n        <img src="/images/play_overlay.png"\n          class="media_comment_thumbnail"\n          style="background-image: url(//img.youtube.com/vi/').concat(Object(l.a)(i),'/2.jpg)"\n          alt="').concat(Object(l.a)(e.data("preview-alt")||""),'"\n        />\n      </a>\n    '))
n.click(Object(u.a)(function(){var e=r()("\n        <span class='youtube_holder' style='display: block;'>\n          <iframe\n            src='//www.youtube.com/embed/".concat(Object(l.a)(i),"?autoplay=1&rel=0&hl=en_US&fs=1'\n            frameborder='0'\n            width='425'\n            height='344'\n            allowfullscreen\n          ></iframe>\n          <br/>\n          <a\n            href='#'\n            style='font-size: 0.8em;'\n            class='hide_youtube_embed_link'\n          >\n            ").concat(Object(l.a)(a.a.t("links.minimize_youtube_video","Minimize Video")),"\n          </a>\n        </span>\n      "))
e.find(".hide_youtube_embed_link").click(Object(u.a)(function(){e.remove()
n.show()
r.a.trackEvent("hide_embedded_content","hide_you_tube")}))
r()(this).after(e).hide()}))
r.a.trackEvent("show_embedded_content","show_you_tube")
e.addClass("youtubed").after(n)}}r.a.trackEvent("Route",location.pathname.replace(/\/$/,"").replace(/\d+/g,"--")||"/")
var f=".dialog, .draggable, .resizable, .sortable, .tabs"
function p(){var e=r()("#content")
r()(".user_content:not(.enhanced):visible").addClass("unenhanced")
r()(".user_content.unenhanced:visible").each(function(){var t=r()(this)
t.find("img").css("maxWidth",Math.min(e.width(),t.width()))
t.data("unenhanced_content_html",t.html())}).find(".enhanceable_content").show().filter(f).ifExists(function(e){var t="Deprecated use of magic jQueryUI widget markup detected:\n\nYou're relying on undocumented functionality where Canvas makes jQueryUI widgets out of rich content that has the following class names: "+f+".\n\nCanvas is moving away from jQueryUI for our own widgets and this behavior will go away. Rather than relying on the internals of Canvas's JavaScript, you should use your own custom JS file to do any such customizations."
console.error(t,e)}).end().filter(".dialog").each(function(){var e=r()(this)
e.hide()
e.closest(".user_content").find("a[href='#"+e.attr("id")+"']").click(function(t){t.preventDefault()
e.dialog()})}).end().filter(".draggable").draggable().end().filter(".resizable").resizable().end().filter(".sortable").sortable().end().filter(".tabs").each(function(){r()(this).tabs()}).end().end().find("a:not(.not_external, .external):external").each(function(){var e=Object(l.a)(a.a.t("titles.external_link","Links to an external site."))
r()(this).not(":has(img)").addClass("external").html("<span>"+r()(this).html()+"</span>").attr("target","_blank").attr("rel","noreferrer noopener").append('<span aria-hidden="true" class="ui-icon ui-icon-extlink ui-icon-inline" title="'+r.a.raw(e)+'"/>').append('<span class="screenreader-only">&nbsp;('+r.a.raw(e)+")</span>")}).end()
r.a.filePreviewsEnabled()&&r()("a.instructure_scribd_file").not(".inline_disabled").each(function(){var e=r()(this)
if(r.a.trim(e.text())){var t=r()("<span class='instructure_file_holder link_holder'/>"),i=r()("<a class='file_preview_link' aria-hidden='true' href='"+Object(l.a)(e.attr("href"))+"' title='"+Object(l.a)(a.a.t("titles.preview_document","Preview the document"))+"' style='padding-left: 5px;'><img src='/images/preview.png' alt='"+Object(l.a)(a.a.t("titles.preview_document","Preview the document"))+"'/></a>")
e.removeClass("instructure_scribd_file").before(t).appendTo(t)
t.append(i)
e.hasClass("auto_open")&&i.click()}})
r()(".user_content.unenhanced a,.user_content.unenhanced+div.answers a").find("img.media_comment_thumbnail").each(function(){r()(this).closest("a").addClass("instructure_inline_media_comment")}).end().filter(".instructure_inline_media_comment").removeClass("no-underline").mediaCommentThumbnail("normal").end().filter(".instructure_video_link, .instructure_audio_link").mediaCommentThumbnail("normal",!0).end().not(".youtubed").each(h)
r()(".user_content.unenhanced").removeClass("unenhanced").addClass("enhanced")
setTimeout(function(){r()(".user_content form.user_content_post_form:not(.submitted)").submit().addClass("submitted")},10)}r()(function(){if(window._earlyClick){document.removeEventListener("click",window._earlyClick)
window._earlyClick.clicks&&setTimeout(function(){r.a.each(d.a.uniq(window._earlyClick.clicks),function(){var e=r.a.Event("click")
e.preventDefault()
r()(this).trigger(e)})},1)}var e,t,o=r()("#breadcrumbs"),s=!1
function u(){var t=500,i=1.5*o.find("li:visible:first").height();(e=e||o.find(".ellipsible")).css("maxWidth","")
e.ifExists(function(){for(var n=0;o.height()>i&&n<20;n++){if(!s){s=!0
e.addClass("ellipsis")}e.css("maxWidth",t-=20)}})}u()
r()(window).resize(u)
n.a.prototype.bindOpenKeys.call({$el:r()("#keyboard_navigation")})
r()("#switched_role_type").ifExists(function(){var e=r()(this).attr("class"),t=r()("<img/>"),i=null
switch(r()(this).data("role")){case"TeacherEnrollment":i=a.a.t("switched_roles_message.teacher","You have switched roles temporarily for this course, and are now viewing the course as a teacher.  You can restore your role and permissions from the course home page.")
break
case"StudentEnrollment":i=a.a.t("switched_roles_message.student","You have switched roles temporarily for this course, and are now viewing the course as a student.  You can restore your role and permissions from the course home page.")
break
case"TaEnrollment":i=a.a.t("switched_roles_message.ta","You have switched roles temporarily for this course, and are now viewing the course as a TA.  You can restore your role and permissions from the course home page.")
break
case"ObserverEnrollment":i=a.a.t("switched_roles_message.observer","You have switched roles temporarily for this course, and are now viewing the course as an observer.  You can restore your role and permissions from the course home page.")
break
case"DesignerEnrollment":i=a.a.t("switched_roles_message.designer","You have switched roles temporarily for this course, and are now viewing the course as a designer.  You can restore your role and permissions from the course home page.")
break
default:i=a.a.t("switched_roles_message.student","You have switched roles temporarily for this course, and are now viewing the course as a student.  You can restore your role and permissions from the course home page.")}t.attr("src","/images/warning.png").attr("title",i).css({paddingRight:2,width:12,height:12})
r()("#crumb_"+e).find("a").prepend(t)})
r()("a.show_quoted_text_link").live("click",function(e){var t=r()(this).parents(".quoted_text_holder").children(".quoted_text")
if(t.length>0){e.preventDefault()
t.show()
r()(this).hide()}})
r()("a.equella_content_link").live("click",function(e){e.preventDefault()
var t=r()("#equella_preview_dialog")
if(!t.length){(t=r()("<div/>")).attr("id","equella_preview_dialog").hide()
t.html("<h2/><iframe style='background: url(/images/ajax-loader-medium-444.gif) no-repeat left top; width: 800px; height: 350px; border: 0;' src='about:blank' borderstyle='0'/><div style='text-align: right;'><a href='#' class='original_link external external_link' target='_blank'>"+Object(l.a)(a.a.t("links.view_equella_content_in_new_window","view the content in a new window"))+"</a>")
t.find("h2").text(r()(this).attr("title")||r()(this).text()||a.a.t("titles.equella_content_preview","Equella Content Preview"))
var i=t.find("iframe")
setTimeout(function(){i.css("background","#fff")},2500)
r()("body").append(t)
t.dialog({autoOpen:!1,width:"auto",resizable:!1,title:a.a.t("titles.equella_content_preview","Equella Content Preview"),close:function(){t.find("iframe").attr("src","about:blank")}})}t.find(".original_link").attr("href",r()(this).attr("href"))
t.dialog("close").dialog("open")
t.find("iframe").attr("src",r()(this).attr("href"))})
r()(".dialog_opener[aria-controls]:not(.user_content *)").live("click",function(e){var t=this
r()("#"+r()(this).attr("aria-controls")).ifExists(function(i){e.preventDefault()
if(!i.data("dialog")){i.dialog(r.a.extend({autoOpen:!1,modal:!0},r()(t).data("dialogOpts")))
i.fixDialogButtons()}i.dialog("open")})})
r.a.filePreviewsEnabled()?r()("a.file_preview_link").live("click",function(e){e.preventDefault()
var t=r()(this).loadingImage({image_size:"small"}).hide()
r.a.ajaxJSON(t.attr("href").replace(/\/download/,""),"GET",{},function(i){var n=i&&i.attachment
t.loadingImage("remove")
if(n&&(r.a.isPreviewable(n.content_type,"google")||n.canvadoc_session_url)){var o=r()("<div>").insertAfter(t.parents(".link_holder:last")).loadDocPreview({canvadoc_session_url:n.canvadoc_session_url,mimeType:n.content_type,public_url:n.public_url,attachment_preview_processing:"pending_upload"==n.workflow_state||"processing"==n.workflow_state}),s=r()('<a href="#" style="font-size: 0.8em;" class="hide_file_preview_link">'+Object(l.a)(a.a.t("links.minimize_file_preview","Minimize File Preview"))+"</a>").click(function(e){e.preventDefault()
t.show()
t.focus()
o.remove()
r.a.trackEvent("hide_embedded_content","hide_file_preview")})
o.prepend(s)
Object.prototype.hasOwnProperty.call(e,"originalEvent")&&s.focus()
r.a.trackEvent("show_embedded_content","show_file_preview")}},function(){t.loadingImage("remove").hide()})}):r()("a.file_preview_link").live("click",function(e){e.preventDefault()
alert(a.a.t("alerts.file_previews_disabled","File previews have been disabled for this Canvas site"))})
r.a.subscribe("userContent/change",function(){clearTimeout(t)
t=setTimeout(p,50)})
r()(document).bind("user_content_change",p)
r()(function(){setInterval(p,15e3)
setTimeout(p,15)})
r()(".zone_cached_datetime").each(function(){if(r()(this).attr("title")){var e=c.a.parse(r()(this).attr("title"))
e&&r()(this).text(r.a.datetimeString(e))}})
r()(".show_sub_messages_link").click(function(e){e.preventDefault()
r()(this).parents(".subcontent").find(".communication_sub_message.toggled_communication_sub_message").removeClass("toggled_communication_sub_message")
r()(this).parents(".communication_sub_message").remove()})
r()(".show_comments_link").click(function(e){e.preventDefault()
r()(this).closest("ul").find("li").show()
r()(this).closest("li").remove()})
r()(".communication_message .message_short .read_more_link").click(function(e){e.preventDefault()
r()(this).parents(".communication_message").find(".message_short").hide().end().find(".message").show()})
r()(".communication_message .close_notification_link").live("click",function(e){e.preventDefault()
r()(this).parents(".communication_message").confirmDelete({url:r()(this).attr("rel"),noMessage:!0,success:function(){r()(this).slideUp(function(){r()(this).remove()})}})})
r()(".communication_message .add_entry_link").click(function(e){e.preventDefault()
var t=r()(this).parents(".communication_message"),i=t.find(".reply_message").hide(),n=t.find(".communication_sub_message.blank").clone(!0).removeClass("blank")
i.before(n.show())
var a=d.a.uniqueId("textarea_")
n.find("textarea.rich_text").attr("id",a)
r()(document).triggerHandler("richTextStart",r()("#"+a))
n.find("textarea:first").focus().select()})
r()(document).bind("richTextStart",function(e,t){if(t&&0!==t.length&&(t=r()(t))&&0!==t.length){m.a.initSidebar({show:function(){r()("#sidebar_content").hide()},hide:function(){r()("#sidebar_content").show()}})
m.a.loadNewEditor(t,{focus:!0})}}).bind("richTextEnd",function(e,t){t&&0!==t.length&&(t=r()(t))&&0!==t.length&&m.a.destroyRCE(t)})
r()(".communication_message .content .links .show_users_link,.communication_message .header .show_users_link").click(function(e){e.preventDefault()
r()(this).parents(".communication_message").find(".content .users_list").slideToggle()})
r()(".communication_message .delete_message_link").click(function(e){e.preventDefault()
r()(this).parents(".communication_message").confirmDelete({noMessage:!0,url:r()(this).attr("href"),success:function(){r()(this).slideUp()}})})
r()(".communication_sub_message .add_conversation_message_form").formSubmit({beforeSubmit:function(e){r()(this).find("button").attr("disabled",!0)
r()(this).find(".submit_button").text(a.a.t("status.posting_message","Posting Message..."))
r()(this).loadingImage()},success:function(e){r()(this).loadingImage("remove")
var t=r()(this).parents(".communication_sub_message"),i=t.parents(".communication_message"),n=e.messages[0]
t.fillTemplateData({data:{post_date:r.a.datetimeString(n.created_at),message:n.body},htmlValues:["message"]})
t.find(".message").show()
r()(this).remove()
i.find(".reply_message").show()
r.a.flashMessage("Message Sent!")
r()(document).triggerHandler("user_content_change")
"/"===location.pathname&&r.a.trackEvent("dashboard_comment","create")},error:function(e){r()(this).loadingImage("remove")
r()(this).find("button").attr("disabled",!1)
r()(this).find(".submit_button").text("Post Failed, Try Again")
r()(this).formErrors(e)}})
r()(".communication_sub_message .add_sub_message_form").formSubmit({beforeSubmit:function(e){r()(this).find("button").attr("disabled",!0)
r()(this).find(".submit_button").text(a.a.t("status.posting_message","Posting Message..."))
r()(this).loadingImage()},success:function(e){r()(this).loadingImage("remove")
var t=r()(this).parents(".communication_sub_message")
if(r()(this).hasClass("submission_comment_form")){var i=r()(this).getTemplateData({textValues:["submission_user_id"]}).submission_user_id,n=null
for(var a in e){var o=e[a].submission
o.user_id==i&&(n=o)}if(n){var s=n.submission_comments[n.submission_comments.length-1].submission_comment
s.post_date=r.a.datetimeString(s.created_at)
s.message=s.formatted_body||s.comment
t.fillTemplateData({data:s,htmlValues:["message"]})}}else{var d=e.discussion_entry
d.post_date=r.a.datetimeString(d.created_at)
t.find(".content > .message_html").val(d.message)
t.fillTemplateData({data:d,htmlValues:["message"]})}t.find(".message").show()
t.find(".user_content").removeClass("enhanced")
t.parents(".communication_message").find(".reply_message").removeClass("lonely_behavior_message").show()
r()(document).triggerHandler("richTextEnd",r()(this).find("textarea.rich_text"))
r()(document).triggerHandler("user_content_change")
r()(this).remove()
location.href.match(/dashboard/)&&r.a.trackEvent("dashboard_comment","create")},error:function(e){r()(this).loadingImage("remove")
r()(this).find("button").attr("disabled",!1)
r()(this).find(".submit_button").text(a.a.t("errors.posting_message_failed","Post Failed, Try Again"))
r()(this).formErrors(e)}})
r()(".communication_sub_message form .cancel_button").click(function(){var e=r()(this).parents(".communication_sub_message"),t=r()(this).parents(".communication_message")
r()(document).triggerHandler("richTextEnd",e.find("textarea.rich_text"))
e.remove()
t.find(".reply_message").show()})
r()(".communication_message,.communication_sub_message").bind("focusin mouseenter",function(){r()(this).addClass("communication_message_hover")}).bind("focusout mouseleave",function(){r()(this).removeClass("communication_message_hover")})
r()(".communication_sub_message .more_options_reply_link").click(function(e){e.preventDefault()
var t=r()(this).parents("form"),i=null
i=t.hasClass("submission_comment_form")?{comment:t.find("textarea:visible:first").val()||""}:{message:t.find("textarea:visible:first").val()||""}
location.href=r()(this).attr("href")+"?message="+encodeURIComponent(i.message)})
r()(".communication_message.new_activity_message").ifExists(function(){this.find(".message_type img").click(function(){var e=r()(this),t=r.a.trim(e.attr("class"))
e.parents(".message_type").find("img").removeClass("selected")
e.addClass("selected").parents(".new_activity_message").find(".message_type_text").text(e.attr("title")).end().find(".activity_form").hide().end().find("textarea, :text").val("").end().find("."+t+"_form").show().find(".context_select").change()})
this.find(".context_select").change(function(){var e=r()(this),t=e.val(),i=e.parents(".communication_message"),n=i.find("form")
n.attr("action",i.find("."+t+"_form_url").attr("href"))
n.data("context_name",this.options[this.selectedIndex].text)
n.data("context_code",t)
i.find(".roster_list").hide().find(":checkbox").each(function(){r()(this).attr("checked",!1)})
i.find("."+t+"_roster_list").show()}).triggerHandler("change")
this.find(".cancel_button").click(function(e){r()(this).parents(".communication_message").hide().prev(".new_activity_message").show()})
this.find(".new_activity_message_link").click(function(e){e.preventDefault()
r()(this).parents(".communication_message").hide().next(".new_activity_message").find(".message_type img.selected").click().end().show().find(":text:visible:first").focus().select()})
this.find("form.message_form").formSubmit({beforeSubmit:function(e){r()("button").attr("disabled",!0)
r()("button.submit_button").text(a.a.t("status.posting_message","Posting Message..."))},success:function(e){r()("button").attr("disabled",!1)
r()("button.submit_button").text("Post Message")
var t=r()(this).data("context_code")||"",i=r()(this).data("context_name")||""
if(r()(this).hasClass("discussion_topic_form")){var n=e.discussion_topic
n.context_code=i
n.user_name=r()("#identity .user_name").text()
n.post_date=r.a.datetimeString(n.created_at)
n.topic_id=n.id
var a=r()(this).parents(".communication_message").find(".template"),o=a.find(".communication_message").clone(!0)
o.find(".header .title,.behavior_content .less_important a").attr("href",a.find("."+t+"_topic_url").attr("href"))
o.find(".add_entry_link").attr("href",a.find("."+t+"_topics_url").attr("href"))
o.find(".user_name").attr("href",a.find("."+t+"_user_url").attr("href"))
o.find(".topic_assignment_link,.topic_assignment_url").attr("href",a.find("."+t+"_assignment_url").attr("href"))
o.find(".attachment_name,.topic_attachment_url").attr("href",a.find("."+t+"_attachment_url").attr("href"))
var s={discussion_topic_id:n.id}
o.fillTemplateData({data:n,hrefValues:["topic_id","user_id","assignment_id","attachment_id"],avoid:".subcontent"})
o.find(".subcontent").fillTemplateData({data:s,hrefValues:["topic_id","user_id"]})
o.find(".subcontent form").attr("action",a.find("."+t+"_entries_url").attr("href"))
o.fillFormData(s,{object_name:"discussion_entry"})
r()(this).parents(".communication_message").after(o.hide())
o.slideDown()
r()(this).parents(".communication_message").slideUp()
r()(this).parents(".communication_message").prev(".new_activity_message").slideDown()}else r()(this).hasClass("announcement_form")||location.reload()},error:function(e){r()("button").attr("disabled",!1)
r()("button.submit_button").text(a.a.t("errors.posting_message_failed","Post Failed, Try Again"))
r()(this).formErrors(e)}})})
r()("#topic_list .show_all_messages_link").show().click(function(e){e.preventDefault()
r()("#topic_list .topic_message").show()
r()(this).hide()})
var _=[]
function h(){_=r()(".time_ago_date:visible").toArray()
f()}function f(){var e=_.shift()
if(e){var t=r()(e),i=t.data("parsed_date")||Date.parse(t.data("timestamp")||"")
if(i){var n=new Date-i
t.data("timestamp",i.toISOString())
t.data("parsed_date",i)
var o=r.a.fudgeDateForProfileTimezone(i),s=o.toString("MMM d, yyyy")+o.toString(" h:mmtt").toLowerCase(),d=s
if(n<864e5)if(n<36e5)if(n<6e4)d=a.a.t("#time.less_than_a_minute_ago","less than a minute ago")
else{var c=parseInt(n/6e4,10)
d=a.a.t("#time.count_minutes_ago",{one:"1 minute ago",other:"%{count} minutes ago"},{count:c})}else{var l=parseInt(n/36e5,10)
d=a.a.t("#time.count_hours_ago",{one:"1 hour ago",other:"%{count} hours ago"},{count:l})}t.text(d)
t.attr("title",s)}setTimeout(f,1)}else setTimeout(h,6e4)}setTimeout(h,100)
var g=r()("#sequence_footer .sequence_details_url").filter(":last").attr("href")
if(g)r.a.ajaxJSON(g,"GET",{},function(e){var t=r()("#sequence_footer")
if(e.current_item){r()("#sequence_details .current").fillTemplateData({data:e.current_item.content_tag})
r.a.each({previous:".prev",next:".next"},function(i,n){var o=t.find(n)
if(e[i+"_item"]||e[i+"_module"]){var s=e[i+"_item"]&&e[i+"_item"].content_tag||e[i+"_module"]&&e[i+"_module"].context_module
if(!e[i+"_item"]){s.title=s.title||s.name
"unpublished"===s.workflow_state&&(s.title+=" ("+a.a.t("draft","Draft")+")")
s.text="previous"==i?a.a.t("buttons.previous_module","Previous Module"):a.a.t("buttons.next_module","Next Module")
o.addClass("module_button")}o.fillTemplateData({data:s})
e[i+"_item"]?o.attr("href",r.a.replaceTags(t.find(".module_item_url").attr("href"),"id",s.id)):o.attr("href",r.a.replaceTags(t.find(".module_url").attr("href"),"id",s.id)+"/items/"+("previous"===i?"last":"first"))}else o.hide()})
t.show()
r()(window).resize()}})
else{var v=r()("#sequence_footer")
if(v.length){var b=r()(v[0])
i.e(18).then(i.bind(null,"nhLj47xLj6")).then(function(){b.moduleSequenceFooter({courseID:b.attr("data-course-id"),assetType:b.attr("data-asset-type"),assetID:b.attr("data-asset-id")})})}}r()("#right-side").delegate(".more_link","click",function(e){var t=r()(this),i=t.parents("ul").children(":hidden").show()
t.closest("li").remove()
0===e.screenX&&i.first().find(":tabbable:first").focus()
return!1})
r()("#right-side").on("click",".disable-todo-item-link",function(e){e.preventDefault()
var t,i=r()(this).parents("li, div.topic_message").last(),n=r()(this).closest(".to-do-list > li").prev(),a=n.find(".disable-todo-item-link").length&&n.find(".disable-todo-item-link")||r()(".todo-list-header"),o=r()(this).data("api-href"),s=r()(this).data("flash-message")
t=o,i.confirmDelete({url:t,noMessage:!0,success:function(){s&&r.a.flashMessage(s)
r()(this).slideUp(function(){r()(this).remove()
a.focus()})}})})
setTimeout(function(){r()("#content a:external,#content a.explicit_external_link").each(function(){var e=a.a.t("titles.external_link","Links to an external site."),t=r()('<span class="ui-icon ui-icon-extlink ui-icon-inline"/>').attr("title",e)
t.append(r()('<span class="screenreader-only"/>').text(e))
r()(this).not(".open_in_a_new_tab").not(":has(img)").not(".not_external").not(".exclude_external_icon").addClass("external").children("span.ui-icon-extlink").remove().end().html("<span>"+r()(this).html()+"</span>").attr("target","_blank").attr("rel","noreferrer noopener").append(t)})},2e3)})},BkaAgcBhey:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{hide_account_navigation_menu_ccdf9480:"\u0625\u062e\u0641\u0627\u0621 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a",hide_admin_navigation_menu_5cab9c9e:"\u0625\u062e\u0641\u0627\u0621 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0646",hide_courses_navigation_menu_6f7c4cfd:"\u0625\u062e\u0641\u0627\u0621 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u0633\u0627\u0642\u0627\u062a",hide_groups_navigation_menu_62e8b3d0:"\u0625\u062e\u0641\u0627\u0621 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a",hide_navigation_menu_f0b3e90:"\u0625\u062e\u0641\u0627\u0621 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644",show_account_navigation_menu_d97270a9:"\u0625\u0638\u0647\u0627\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a",show_admin_navigation_menu_92fb579f:"\u0625\u0638\u0647\u0627\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0646",show_courses_navigation_menu_7ad1a8d4:"\u0625\u0638\u0647\u0627\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u0633\u0627\u0642\u0627\u062a",show_groups_navigation_menu_1521d38d:"\u0625\u0638\u0647\u0627\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644 \u0628\u064a\u0646 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a",show_navigation_menu_34e7f441:"\u0625\u0638\u0647\u0627\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062a\u0646\u0642\u0644"},cy:{hide_account_navigation_menu_ccdf9480:"Cuddio Dewislen Crwydro\u2019r Cyfrif",hide_admin_navigation_menu_5cab9c9e:"Cuddio Dewislen Crwydro - Gweinyddwr",hide_courses_navigation_menu_6f7c4cfd:"Cuddio Dewislen Crwydro Cwrs",hide_groups_navigation_menu_62e8b3d0:"Cuddio Dewislen Crwydro - Grwpiau",hide_navigation_menu_f0b3e90:"Cuddio Dewislen Crwydro",show_account_navigation_menu_d97270a9:"Dangos Dewislen Crwydro\u2019r Cyfrif",show_admin_navigation_menu_92fb579f:"Dangos Dewislen Crwydro Gweinyddwr",show_courses_navigation_menu_7ad1a8d4:"Dangos Dewislen Crwydro Cyrsiau",show_groups_navigation_menu_1521d38d:"Dangos Dewislen Crwydro Grwpiau",show_navigation_menu_34e7f441:"Dangos Dewislen Crwydro"},da:{hide_account_navigation_menu_ccdf9480:"Skjul kontonavigationsmenu",hide_admin_navigation_menu_5cab9c9e:"Skjul admin-navigationsmenu",hide_courses_navigation_menu_6f7c4cfd:"Skjul fag-navigationsmenu",hide_groups_navigation_menu_62e8b3d0:"Skjul gruppe-navigationsmenu",hide_navigation_menu_f0b3e90:"Skjul navigationsmenu",show_account_navigation_menu_d97270a9:"Vis kontonavigationsmenu",show_admin_navigation_menu_92fb579f:"Vis admin-navigationsmenu",show_courses_navigation_menu_7ad1a8d4:"Vis fag-navigationsmenu",show_groups_navigation_menu_1521d38d:"Vis gruppe-navigationsmenu",show_navigation_menu_34e7f441:"Vis navigationsmenu"},"da-x-k12":{hide_account_navigation_menu_ccdf9480:"Skjul kontonavigationsmenu",hide_admin_navigation_menu_5cab9c9e:"Skjul admin-navigationsmenu",hide_courses_navigation_menu_6f7c4cfd:"Skjul fag-navigationsmenu",hide_groups_navigation_menu_62e8b3d0:"Skjul gruppe-navigationsmenu",hide_navigation_menu_f0b3e90:"Skjul navigationsmenu",show_account_navigation_menu_d97270a9:"Vis kontonavigationsmenu",show_admin_navigation_menu_92fb579f:"Vis admin-navigationsmenu",show_courses_navigation_menu_7ad1a8d4:"Vis fag-navigationsmenu",show_groups_navigation_menu_1521d38d:"Vis gruppe-navigationsmenu",show_navigation_menu_34e7f441:"Vis navigationsmenu"},de:{hide_account_navigation_menu_ccdf9480:"Konto-Navigationsmen\xfc ausblenden",hide_admin_navigation_menu_5cab9c9e:"Admin-Navigationsmen\xfc ausblenden",hide_courses_navigation_menu_6f7c4cfd:"Kurs-Navigationsmen\xfc ausblenden",hide_groups_navigation_menu_62e8b3d0:"Gruppen-Navigationsmen\xfc ausblenden",hide_navigation_menu_f0b3e90:"Navigationsmen\xfc ausblenden",show_account_navigation_menu_d97270a9:"Konto-Navigationsmen\xfc einblenden",show_admin_navigation_menu_92fb579f:"Admin-Navigationsmen\xfc einblenden",show_courses_navigation_menu_7ad1a8d4:"Kursnavigationsmen\xfc einblenden",show_groups_navigation_menu_1521d38d:"Gruppen-Navigationsmen\xfc einblenden",show_navigation_menu_34e7f441:"Navigationsmen\xfc einblenden"},"en-AU":{hide_account_navigation_menu_ccdf9480:"Hide Account Navigation Menu",hide_admin_navigation_menu_5cab9c9e:"Hide Admin Navigation Menu",hide_courses_navigation_menu_6f7c4cfd:"Hide Courses Navigation Menu",hide_groups_navigation_menu_62e8b3d0:"Hide Groups Navigation Menu",hide_navigation_menu_f0b3e90:"Hide Navigation Menu",show_account_navigation_menu_d97270a9:"Show Account Navigation Menu",show_admin_navigation_menu_92fb579f:"Show Admin Navigation Menu",show_courses_navigation_menu_7ad1a8d4:"Show Courses Navigation Menu",show_groups_navigation_menu_1521d38d:"Show Groups Navigation Menu",show_navigation_menu_34e7f441:"Show Navigation Menu"},"en-CA":{hide_account_navigation_menu_ccdf9480:"Hide Account Navigation Menu",hide_admin_navigation_menu_5cab9c9e:"Hide Admin Navigation Menu",hide_courses_navigation_menu_6f7c4cfd:"Hide Courses Navigation Menu",hide_groups_navigation_menu_62e8b3d0:"Hide Groups Navigation Menu",hide_navigation_menu_f0b3e90:"Hide Navigation Menu",show_account_navigation_menu_d97270a9:"Show Account Navigation Menu",show_admin_navigation_menu_92fb579f:"Show Admin Navigation Menu",show_courses_navigation_menu_7ad1a8d4:"Show Courses Navigation Menu",show_groups_navigation_menu_1521d38d:"Show Groups Navigation Menu",show_navigation_menu_34e7f441:"Show Navigation Menu"},"en-GB":{hide_account_navigation_menu_ccdf9480:"Hide account navigation menu",hide_admin_navigation_menu_5cab9c9e:"Hide admin navigation menu",hide_courses_navigation_menu_6f7c4cfd:"Hide courses navigation menu",hide_groups_navigation_menu_62e8b3d0:"Hide groups navigation menu",hide_navigation_menu_f0b3e90:"Hide navigation menu",show_account_navigation_menu_d97270a9:"Show account navigation menu",show_admin_navigation_menu_92fb579f:"Show admin navigation menu",show_courses_navigation_menu_7ad1a8d4:"Show courses navigation menu",show_groups_navigation_menu_1521d38d:"Show groups navigation menu",show_navigation_menu_34e7f441:"Show navigation menu"},"en-GB-x-lbs":{hide_account_navigation_menu_ccdf9480:"Hide account navigation menu",hide_admin_navigation_menu_5cab9c9e:"Hide admin navigation menu",hide_courses_navigation_menu_6f7c4cfd:"Hide programmes navigation menu",hide_groups_navigation_menu_62e8b3d0:"Hide groups navigation menu",hide_navigation_menu_f0b3e90:"Hide navigation menu",show_account_navigation_menu_d97270a9:"Show account navigation menu",show_admin_navigation_menu_92fb579f:"Show admin navigation menu",show_courses_navigation_menu_7ad1a8d4:"Show programmes navigation menu",show_groups_navigation_menu_1521d38d:"Show groups navigation menu",show_navigation_menu_34e7f441:"Show navigation menu"},"en-GB-x-ukhe":{hide_account_navigation_menu_ccdf9480:"Hide account navigation menu",hide_admin_navigation_menu_5cab9c9e:"Hide admin navigation menu",hide_courses_navigation_menu_6f7c4cfd:"Hide modules navigation menu",hide_groups_navigation_menu_62e8b3d0:"Hide groups navigation menu",hide_navigation_menu_f0b3e90:"Hide navigation menu",show_account_navigation_menu_d97270a9:"Show account navigation menu",show_admin_navigation_menu_92fb579f:"Show admin navigation menu",show_courses_navigation_menu_7ad1a8d4:"Show modules navigation menu",show_groups_navigation_menu_1521d38d:"Show groups navigation menu",show_navigation_menu_34e7f441:"Show navigation menu"},es:{hide_account_navigation_menu_ccdf9480:"Ocultar men\xfa de navegaci\xf3n de cuenta",hide_admin_navigation_menu_5cab9c9e:"Ocultar men\xfa de navegaci\xf3n de administrador",hide_courses_navigation_menu_6f7c4cfd:"Ocultar men\xfa de navegaci\xf3n de cursos",hide_groups_navigation_menu_62e8b3d0:"Ocultar men\xfa de navegaci\xf3n de grupos",hide_navigation_menu_f0b3e90:"Ocultar men\xfa de navegaci\xf3n",show_account_navigation_menu_d97270a9:"Mostrar men\xfa de navegaci\xf3n de cuenta",show_admin_navigation_menu_92fb579f:"Mostrar men\xfa de navegaci\xf3n de administrador",show_courses_navigation_menu_7ad1a8d4:"Mostrar men\xfa de navegaci\xf3n de cursos",show_groups_navigation_menu_1521d38d:"Mostrar men\xfa de navegaci\xf3n de grupos",show_navigation_menu_34e7f441:"Mostrar men\xfa de navegaci\xf3n"},fa:{hide_account_navigation_menu_ccdf9480:"\u0645\u062e\u0641\u06cc \u06a9\u0631\u062f\u0646 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u06a9\u0627\u0631\u0628\u0631",hide_admin_navigation_menu_5cab9c9e:"\u0645\u062e\u0641\u06cc \u06a9\u0631\u062f\u0646 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u0645\u062f\u06cc\u0631",hide_courses_navigation_menu_6f7c4cfd:"\u0645\u062e\u0641\u06cc \u06a9\u0631\u062f\u0646 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u062f\u0631\u0633\u200c\u0647\u0627",hide_groups_navigation_menu_62e8b3d0:"\u0645\u062e\u0641\u06cc \u06a9\u0631\u062f\u0646 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u06af\u0631\u0648\u0647\u200c\u0647\u0627",hide_navigation_menu_f0b3e90:"\u0645\u062e\u0641\u06cc \u06a9\u0631\u062f\u0646 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 ",show_account_navigation_menu_d97270a9:"\u0646\u0645\u0627\u06cc\u0634 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u062d\u0633\u0627\u0628",show_admin_navigation_menu_92fb579f:"\u0646\u0645\u0627\u06cc\u0634 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u0645\u062f\u06cc\u0631",show_courses_navigation_menu_7ad1a8d4:"\u0646\u0645\u0627\u06cc\u0634 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u062f\u0631\u0633 \u0647\u0627",show_groups_navigation_menu_1521d38d:"\u0646\u0645\u0627\u06cc\u0634 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634 \u06af\u0631\u0648\u0647 \u0647\u0627",show_navigation_menu_34e7f441:"\u0646\u0645\u0627\u06cc\u0634 \u0645\u0646\u0648\u06cc \u067e\u06cc\u0645\u0627\u06cc\u0634"},fr:{hide_account_navigation_menu_ccdf9480:"Masquer le menu de navigation de comptes",hide_admin_navigation_menu_5cab9c9e:"Masquer le menu de navigation de l\u2019administrateur",hide_courses_navigation_menu_6f7c4cfd:"Masquer le menu de navigation de cours",hide_groups_navigation_menu_62e8b3d0:"Masquer le menu de navigation de groupes",hide_navigation_menu_f0b3e90:"Masquer le menu de navigation",show_account_navigation_menu_d97270a9:"Afficher le menu de navigation de comptes",show_admin_navigation_menu_92fb579f:"Afficher le menu de navigation de l\u2019administrateur",show_courses_navigation_menu_7ad1a8d4:"Afficher le menu de navigation de cours",show_groups_navigation_menu_1521d38d:"Afficher le menu de navigation de groupes",show_navigation_menu_34e7f441:"Afficher le menu de navigation"},"fr-CA":{hide_account_navigation_menu_ccdf9480:"Masquer le menu de navigation du compte",hide_admin_navigation_menu_5cab9c9e:"Masquer le menu de navigation de l\u2019administrateur",hide_courses_navigation_menu_6f7c4cfd:"Masquer le menu de navigation des cours",hide_groups_navigation_menu_62e8b3d0:"Masquer le menu de navigation des groupes",hide_navigation_menu_f0b3e90:"Masquer le menu de navigation",show_account_navigation_menu_d97270a9:"Afficher le menu de navigation du compte",show_admin_navigation_menu_92fb579f:"Afficher le menu de navigation de l\u2019administrateur",show_courses_navigation_menu_7ad1a8d4:"Afficher le menu de navigation des cours",show_groups_navigation_menu_1521d38d:"Afficher le menu de navigation des groupes",show_navigation_menu_34e7f441:"Afficher le menu de navigation"},he:{hide_account_navigation_menu_ccdf9480:"\u05d4\u05e1\u05ea\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05d7\u05e9\u05d1\u05d5\u05e0\u05d5\u05ea",hide_admin_navigation_menu_5cab9c9e:"\u05d4\u05e1\u05ea\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05de\u05e0\u05d4\u05dc\u05d9 \u05de\u05e2\u05e8\u05db\u05ea",hide_courses_navigation_menu_6f7c4cfd:"\u05d4\u05e1\u05ea\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05e7\u05d5\u05e8\u05e1\u05d9\u05dd",hide_groups_navigation_menu_62e8b3d0:"\u05d4\u05e1\u05ea\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05e7\u05d1\u05d5\u05e6\u05d5\u05ea",hide_navigation_menu_f0b3e90:"\u05d4\u05e1\u05ea\u05e8\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8",show_account_navigation_menu_d97270a9:"\u05d4\u05e6\u05d2\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05d7\u05e9\u05d1\u05d5\u05e0\u05d5\u05ea",show_admin_navigation_menu_92fb579f:"\u05d4\u05e6\u05d2\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05e9\u05dc \u05de\u05e0\u05d4\u05dc\u05d9 \u05de\u05e2\u05e8\u05db\u05ea",show_courses_navigation_menu_7ad1a8d4:"\u05d4\u05e6\u05d2\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05e7\u05d5\u05e8\u05e1\u05d9\u05dd",show_groups_navigation_menu_1521d38d:"\u05d4\u05e6\u05d2\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8 \u05e7\u05d1\u05d5\u05e6\u05d5\u05ea",show_navigation_menu_34e7f441:"\u05d4\u05e6\u05d2\u05ea \u05ea\u05e4\u05e8\u05d9\u05d8 \u05e0\u05d9\u05d5\u05d5\u05d8"},ht:{hide_account_navigation_menu_ccdf9480:"Kache Meni Navigasyon Kont",hide_admin_navigation_menu_5cab9c9e:"Kache Meni Navigasyon Admin",hide_courses_navigation_menu_6f7c4cfd:"Kache Meni Navigasyon Kou",hide_groups_navigation_menu_62e8b3d0:"Kache Meni Navigasyon Gwoup",hide_navigation_menu_f0b3e90:"Kache Meni Navigasyon",show_account_navigation_menu_d97270a9:"Afiche Meni Navigasyon Kont",show_admin_navigation_menu_92fb579f:"Afiche Meni Navigasyon Admin",show_courses_navigation_menu_7ad1a8d4:"Afiche Meni Navigasyon Kou",show_groups_navigation_menu_1521d38d:"Afiche Meni Navigasyon Gwoup",show_navigation_menu_34e7f441:"Afiche Meni Navigasyon"},hu:{hide_courses_navigation_menu_6f7c4cfd:"Kurzusnavig\xe1ci\xf3s men\xfc elrejt\xe9se",hide_navigation_menu_f0b3e90:"Navig\xe1ci\xf3s men\xfc elrejt\xe9se"},is:{hide_account_navigation_menu_ccdf9480:"Fela lei\xf0arst\xfdringu valmyndar reiknings",hide_admin_navigation_menu_5cab9c9e:"Fela lei\xf0arst\xfdringarvalmynd kerfisstj\xf3rnanda",hide_courses_navigation_menu_6f7c4cfd:"Fela lei\xf0arst\xfdringarvalmynd n\xe1mskei\xf0a",hide_groups_navigation_menu_62e8b3d0:"Fela lei\xf0arst\xfdringarvalmynd h\xf3pa",hide_navigation_menu_f0b3e90:"Fela lei\xf0arst\xfdringarvalmynd",show_account_navigation_menu_d97270a9:"S\xfdna lei\xf0arst\xfdringarvalmynd reiknings",show_admin_navigation_menu_92fb579f:"S\xfdna lei\xf0arst\xfdringarvalmynd kerfisstj\xf3rnanda",show_courses_navigation_menu_7ad1a8d4:"S\xfdna lei\xf0arst\xfdringarvalmynd n\xe1mskei\xf0a",show_groups_navigation_menu_1521d38d:"S\xfdna lei\xf0arst\xfdringarvalmynd h\xf3pa",show_navigation_menu_34e7f441:"S\xfdna lei\xf0arst\xfdringarvalmynd"},it:{hide_account_navigation_menu_ccdf9480:"Nascondi menu di navigazione account",hide_admin_navigation_menu_5cab9c9e:"Nascondi menu di navigazione amministratore",hide_courses_navigation_menu_6f7c4cfd:"Nascondi menu di navigazione corsi",hide_groups_navigation_menu_62e8b3d0:"Nascondi meni di navigazione gruppi",hide_navigation_menu_f0b3e90:"Nascondi menu di navigazione",show_account_navigation_menu_d97270a9:"Mostra menu di navigazione account",show_admin_navigation_menu_92fb579f:"Mostra menu di navigazione amministratore",show_courses_navigation_menu_7ad1a8d4:"Mostra menu di esplorazione corsi",show_groups_navigation_menu_1521d38d:"Mostra menu di esplorazione gruppi",show_navigation_menu_34e7f441:"Mostra menu di navigazione"},ja:{hide_account_navigation_menu_ccdf9480:"\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u975e\u8868\u793a\u306b\u3059\u308b",hide_admin_navigation_menu_5cab9c9e:"\u7ba1\u7406\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u975e\u8868\u793a\u306b\u3059\u308b",hide_courses_navigation_menu_6f7c4cfd:"\u30b3\u30fc\u30b9\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u975e\u8868\u793a\u306b\u3059\u308b",hide_groups_navigation_menu_62e8b3d0:"\u30b0\u30eb\u30fc\u30d7\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u975e\u8868\u793a\u306b\u3059\u308b",hide_navigation_menu_f0b3e90:"\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u975e\u8868\u793a\u306b\u3059\u308b",show_account_navigation_menu_d97270a9:"\u30a2\u30ab\u30a6\u30f3\u30c8\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3059\u308b",show_admin_navigation_menu_92fb579f:"\u30a2\u30c9\u30df\u30cb\u30b9\u30c8\u30ec\u30fc\u30b7\u30e7\u30f3\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3059\u308b",show_courses_navigation_menu_7ad1a8d4:"\u30b3\u30fc\u30b9\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3059\u308b",show_groups_navigation_menu_1521d38d:"\u30b0\u30eb\u30fc\u30d7\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3059\u308b",show_navigation_menu_34e7f441:"\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3\u30e1\u30cb\u30e5\u30fc\u3092\u8868\u793a\u3059\u308b"},mi:{hide_account_navigation_menu_ccdf9480:"Huna T\u0101hua Whakatere P\u016bkete",hide_admin_navigation_menu_5cab9c9e:"Huna Whakahaere Whakatere T\u0101hua",hide_courses_navigation_menu_6f7c4cfd:"Huna Ng\u0101 Akoranga Whakatere T\u0101hua",hide_groups_navigation_menu_62e8b3d0:"Huna Ng\u0101 R\u014dp\u016b Whakatere T\u0101hua",hide_navigation_menu_f0b3e90:"Huna Whakatere T\u0101hua",show_account_navigation_menu_d97270a9:"Whak\u0101tu P\u016bkete Whakatere T\u0101hua",show_admin_navigation_menu_92fb579f:"Whak\u0101tu Whakahaere Whakatere T\u0101hua",show_courses_navigation_menu_7ad1a8d4:"Whak\u0101tu Ng\u0101 Akoranga Whakatere T\u0101hua",show_groups_navigation_menu_1521d38d:"Whak\u0101tu Ng\u0101 R\u014dp\u016b Whakatere T\u0101hua",show_navigation_menu_34e7f441:"Whak\u0101tu Whakatere T\u0101hua"},nb:{hide_account_navigation_menu_ccdf9480:"Skjul menyen for kontonavigering",hide_admin_navigation_menu_5cab9c9e:"Skjul menyen for administratornavigering",hide_courses_navigation_menu_6f7c4cfd:"Skjul menyen for emnernavigering",hide_groups_navigation_menu_62e8b3d0:"Skjul menyen for gruppenavigering",hide_navigation_menu_f0b3e90:"Skjul navigeringsmenyen",show_account_navigation_menu_d97270a9:"Vis menyen for kontonavigering",show_admin_navigation_menu_92fb579f:"Vis menyen for administratornavigering",show_courses_navigation_menu_7ad1a8d4:"Vis menyen for emnernavigering",show_groups_navigation_menu_1521d38d:"Vis menyen for gruppenavigering",show_navigation_menu_34e7f441:"Vis navigeringsmenyen"},"nb-x-k12":{hide_account_navigation_menu_ccdf9480:"Skjul menyen for kontonavigering",hide_admin_navigation_menu_5cab9c9e:"Skjul menyen for administratornavigering",hide_courses_navigation_menu_6f7c4cfd:"Skjul menyen for fagnavigering",hide_groups_navigation_menu_62e8b3d0:"Skjul menyen for gruppenavigering",hide_navigation_menu_f0b3e90:"Skjul navigeringsmenyen",show_account_navigation_menu_d97270a9:"Vis menyen for kontonavigering",show_admin_navigation_menu_92fb579f:"Vis menyen for administratornavigering",show_courses_navigation_menu_7ad1a8d4:"Vis menyen for fagnavigering",show_groups_navigation_menu_1521d38d:"Vis menyen for gruppenavigering",show_navigation_menu_34e7f441:"Vis navigeringsmenyen"},nl:{hide_account_navigation_menu_ccdf9480:"Menu Accountnavigatie verbergen",hide_admin_navigation_menu_5cab9c9e:"Menu Beheernavigatie verbergen",hide_courses_navigation_menu_6f7c4cfd:"Menu Cursusnavigatie verbergen",hide_groups_navigation_menu_62e8b3d0:"Menu Groepsnavigatie verbergen",hide_navigation_menu_f0b3e90:"Navigatiemenu verbergen",show_account_navigation_menu_d97270a9:"Menu Accountnavigatie weergeven",show_admin_navigation_menu_92fb579f:"Menu Beheernavigatie weergeven",show_courses_navigation_menu_7ad1a8d4:"Menu Cursusnavigatie weergeven",show_groups_navigation_menu_1521d38d:"Menu Groepsnavigatie weergeven",show_navigation_menu_34e7f441:"Navigatiemenu weergeven"},nn:{hide_account_navigation_menu_ccdf9480:"Skjul meny for kontonavigasjon",hide_admin_navigation_menu_5cab9c9e:"Skjul meny for kontonavigasjon",hide_courses_navigation_menu_6f7c4cfd:"Skjul meny for emnenavigasjon",hide_groups_navigation_menu_62e8b3d0:"Skjul meny for gruppenavigasjon",hide_navigation_menu_f0b3e90:"Skjul navigeringsmeny",show_account_navigation_menu_d97270a9:"Vis meny for kontonavigasjon",show_admin_navigation_menu_92fb579f:"Vis admin-navigeringsmeny ",show_courses_navigation_menu_7ad1a8d4:"Vis meny for emnenavigasjon",show_groups_navigation_menu_1521d38d:"Vis meny for gruppenavigasjon",show_navigation_menu_34e7f441:"Vis navigeringsmeny"},pl:{hide_account_navigation_menu_ccdf9480:"Ukryj menu nawigacji na koncie",hide_admin_navigation_menu_5cab9c9e:"Ukryj menu nawigacji administratora",hide_courses_navigation_menu_6f7c4cfd:"Ukryj menu nawigacji w kursie",hide_groups_navigation_menu_62e8b3d0:"Ukryj menu nawigacji w grupach",hide_navigation_menu_f0b3e90:"Ukryj menu nawigacji",show_account_navigation_menu_d97270a9:"Poka\u017c menu nawigacji na koncie",show_admin_navigation_menu_92fb579f:"Poka\u017c menu nawigacji administratora",show_courses_navigation_menu_7ad1a8d4:"Poka\u017c menu nawigacji w kursie",show_groups_navigation_menu_1521d38d:"Poka\u017c menu nawigacji w grupach",show_navigation_menu_34e7f441:"Poka\u017c menu nawigacji"},pt:{hide_account_navigation_menu_ccdf9480:"Ocultar menu de navega\xe7\xe3o da conta",hide_admin_navigation_menu_5cab9c9e:"Ocultar menu de navega\xe7\xe3o do administrador",hide_courses_navigation_menu_6f7c4cfd:"Ocultar Menu de navega\xe7\xe3o das disciplinas",hide_groups_navigation_menu_62e8b3d0:"Ocultar Menu de navega\xe7\xe3o de grupos",hide_navigation_menu_f0b3e90:"Ocultar Menu de navega\xe7\xe3o",show_account_navigation_menu_d97270a9:"Mostrar o Menu de Navega\xe7\xe3o da Conta",show_admin_navigation_menu_92fb579f:"Mostrar o Menu de navega\xe7\xe3o do administrador",show_courses_navigation_menu_7ad1a8d4:"Mostrar Menu de navega\xe7\xe3o de disciplinas",show_groups_navigation_menu_1521d38d:"Mostrar o Menu de navega\xe7\xe3o dos grupos",show_navigation_menu_34e7f441:"Mostrar o Menu de Navega\xe7\xe3o"},"pt-BR":{hide_account_navigation_menu_ccdf9480:"Ocultar Menu de Navega\xe7\xe3o da conta",hide_admin_navigation_menu_5cab9c9e:"Ocultar Menu de Navega\xe7\xe3o do Admin",hide_courses_navigation_menu_6f7c4cfd:"Ocultar Menu de Navega\xe7\xe3o dos cursos",hide_groups_navigation_menu_62e8b3d0:"Ocultar Menu de Navega\xe7\xe3o dos grupos",hide_navigation_menu_f0b3e90:"Ocultar Menu de Navega\xe7\xe3o",show_account_navigation_menu_d97270a9:"Mostrar Menu de Navega\xe7\xe3o da conta",show_admin_navigation_menu_92fb579f:"Mostrar Menu de Navega\xe7\xe3o do Admin",show_courses_navigation_menu_7ad1a8d4:"Mostrar Menu de Navega\xe7\xe3o dos cursos",show_groups_navigation_menu_1521d38d:"Mostrar Menu de Navega\xe7\xe3o dos grupos",show_navigation_menu_34e7f441:"Mostrar Menu de Navega\xe7\xe3o"},ru:{hide_account_navigation_menu_ccdf9480:"\u0421\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0443\u0447\u0435\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438",hide_admin_navigation_menu_5cab9c9e:"\u0421\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",hide_courses_navigation_menu_6f7c4cfd:"\u0421\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u043a\u0443\u0440\u0441\u043e\u0432",hide_groups_navigation_menu_62e8b3d0:"\u0421\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0433\u0440\u0443\u043f\u043f",hide_navigation_menu_f0b3e90:"\u0421\u043a\u0440\u044b\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438",show_account_navigation_menu_d97270a9:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0443\u0447\u0435\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438",show_admin_navigation_menu_92fb579f:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",show_courses_navigation_menu_7ad1a8d4:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u043a\u0443\u0440\u0441\u043e\u0432",show_groups_navigation_menu_1521d38d:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438 \u0433\u0440\u0443\u043f\u043f",show_navigation_menu_34e7f441:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438"},sl:{hide_account_navigation_menu_ccdf9480:"Skrij meni navigacije po ra\u010dunu",hide_admin_navigation_menu_5cab9c9e:"Skrij skrbni\u0161ki meni navigacije",hide_courses_navigation_menu_6f7c4cfd:"Skrij meni navigacije po predmetih",hide_groups_navigation_menu_62e8b3d0:"Skrij meni navigacije po skupinah",hide_navigation_menu_f0b3e90:"Skrij meni navigacije",show_account_navigation_menu_d97270a9:"Prika\u017ei meni navigacije po ra\u010dunu",show_admin_navigation_menu_92fb579f:"Prika\u017ei skrbni\u0161ki meni navigacije",show_courses_navigation_menu_7ad1a8d4:"Prika\u017ei meni navigacije po predmetih",show_groups_navigation_menu_1521d38d:"Prika\u017ei meni navigacije po skupinah",show_navigation_menu_34e7f441:"Prika\u017ei meni navigacije"},sv:{hide_account_navigation_menu_ccdf9480:"D\xf6lj konto-navigeringsmeny",hide_admin_navigation_menu_5cab9c9e:"D\xf6lj administrations-navigeringsmeny",hide_courses_navigation_menu_6f7c4cfd:"D\xf6lj kurs-navigeringsmeny",hide_groups_navigation_menu_62e8b3d0:"D\xf6lj grupp-navigeringsmeny",hide_navigation_menu_f0b3e90:"D\xf6lj navigeringsmeny",show_account_navigation_menu_d97270a9:"Visa konto-navigeringsmeny",show_admin_navigation_menu_92fb579f:"Visa administrat\xf6rs-navigeringsmeny",show_courses_navigation_menu_7ad1a8d4:"Visa kurs-navigeringsmeny",show_groups_navigation_menu_1521d38d:"Visa grupp-navigeringsmeny",show_navigation_menu_34e7f441:"Visa navigeringsmeny"},"sv-x-k12":{hide_account_navigation_menu_ccdf9480:"D\xf6lj konto-navigeringsmeny",hide_admin_navigation_menu_5cab9c9e:"D\xf6lj administrations-navigeringsmeny",hide_courses_navigation_menu_6f7c4cfd:"D\xf6lj kurs-navigeringsmeny",hide_groups_navigation_menu_62e8b3d0:"D\xf6lj grupp-navigeringsmeny",hide_navigation_menu_f0b3e90:"D\xf6lj navigeringsmeny",show_account_navigation_menu_d97270a9:"Visa konto-navigeringsmeny",show_admin_navigation_menu_92fb579f:"Visa administrat\xf6rs-navigeringsmeny",show_courses_navigation_menu_7ad1a8d4:"Visa kurs-navigeringsmeny",show_groups_navigation_menu_1521d38d:"Visa grupp-navigeringsmeny",show_navigation_menu_34e7f441:"Visa navigeringsmeny"},uk:{hide_account_navigation_menu_ccdf9480:"\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u043e\u0431\u043b\u0456\u043a\u043e\u0432\u043e\u0433\u043e \u0437\u0430\u043f\u0438\u0441\u0443",hide_admin_navigation_menu_5cab9c9e:"\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",hide_courses_navigation_menu_6f7c4cfd:"\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u043a\u0443\u0440\u0441\u0456\u0432",hide_groups_navigation_menu_62e8b3d0:"\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u0433\u0440\u0443\u043f",hide_navigation_menu_f0b3e90:"\u0421\u0445\u043e\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 ",show_account_navigation_menu_d97270a9:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0438 \u041c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u043e\u0431\u043b\u0456\u043a\u043e\u0432\u043e\u0433\u043e \u0437\u0430\u043f\u0438\u0441\u0443",show_admin_navigation_menu_92fb579f:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0438 \u041c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430",show_courses_navigation_menu_7ad1a8d4:"\u041f\u043e\u043a\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u043a\u0443\u0440\u0441\u0456\u0432",show_groups_navigation_menu_1521d38d:"\u041f\u043e\u043a\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457 \u0433\u0440\u0443\u043f",show_navigation_menu_34e7f441:"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0438 \u043c\u0435\u043d\u044e \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u0457"},"zh-Hans":{hide_account_navigation_menu_ccdf9480:"\u9690\u85cf\u5e10\u6237\u5bfc\u822a\u83dc\u5355",hide_admin_navigation_menu_5cab9c9e:"\u9690\u85cf\u7ba1\u7406\u5458\u5bfc\u822a\u83dc\u5355",hide_courses_navigation_menu_6f7c4cfd:"\u9690\u85cf\u8bfe\u7a0b\u5bfc\u822a\u83dc\u5355",hide_groups_navigation_menu_62e8b3d0:"\u9690\u85cf\u5c0f\u7ec4\u5bfc\u822a\u83dc\u5355",hide_navigation_menu_f0b3e90:"\u9690\u85cf\u5bfc\u822a\u83dc\u5355",show_account_navigation_menu_d97270a9:"\u663e\u793a\u5e10\u6237\u5bfc\u822a\u83dc\u5355",show_admin_navigation_menu_92fb579f:"\u663e\u793a\u7ba1\u7406\u5458\u5bfc\u822a\u83dc\u5355",show_courses_navigation_menu_7ad1a8d4:"\u663e\u793a\u8bfe\u7a0b\u5bfc\u822a\u83dc\u5355",show_groups_navigation_menu_1521d38d:"\u663e\u793a\u5c0f\u7ec4\u5bfc\u822a\u83dc\u5355",show_navigation_menu_34e7f441:"\u663e\u793a\u5bfc\u822a\u83dc\u5355"},"zh-Hant":{hide_account_navigation_menu_ccdf9480:"\u96b1\u85cf\u5e33\u6236\u5c0e\u822a\u5de5\u5177\u9078\u55ae",hide_admin_navigation_menu_5cab9c9e:"\u96b1\u85cf\u7ba1\u7406\u54e1\u5c0e\u822a\u5de5\u5177\u9078\u55ae",hide_courses_navigation_menu_6f7c4cfd:"\u96b1\u85cf\u8ab2\u7a0b\u5c0e\u822a\u5de5\u5177\u9078\u55ae",hide_groups_navigation_menu_62e8b3d0:"\u96b1\u85cf\u5c0f\u7d44\u5c0e\u822a\u5de5\u5177\u9078\u55ae",hide_navigation_menu_f0b3e90:"\u96b1\u85cf\u5c0e\u822a\u5de5\u5177\u9078\u55ae",show_account_navigation_menu_d97270a9:"\u986f\u793a\u5e33\u6236\u5c0e\u822a\u5de5\u5177\u9078\u55ae",show_admin_navigation_menu_92fb579f:"\u986f\u793a\u7ba1\u7406\u54e1\u5c0e\u822a\u5de5\u5177\u9078\u55ae",show_courses_navigation_menu_7ad1a8d4:"\u986f\u793a\u8ab2\u7a0b\u5c0e\u822a\u5de5\u5177\u9078\u55ae",show_groups_navigation_menu_1521d38d:"\u986f\u793a\u5c0f\u7d44\u5c0e\u822a\u5de5\u5177\u9078\u55ae",show_navigation_menu_34e7f441:"\u986f\u793a\u5c0e\u822a\u5de5\u5177\u9078\u55ae"}}})},BuCMrQMyFY:function(e,t,i){"use strict"
var n=i("eJBzaBDd6c")
i("xolCioscxi"),i("kzdUuF07HD")
t.a={buttonConfig:function(e,t){var i={title:e.name,classes:"widget btn instructure_external_tool_button"}
if(ENV.use_rce_enhancements){i.onAction=function(){return t.execCommand("instructureExternalButton".concat(e.id))}
i.type="menuitem"}else i.cmd="instructureExternalButton".concat(e.id)
e.canvas_icon_class?i.icon="hack-to-avoid-mce-prefix ".concat(e.canvas_icon_class):i.image=e.icon_url
return i},clumpedButtonMapping:function(e,t,i){return e.reduce(function(e,a){var o
o=a.canvas_icon_class?"<i class='".concat(Object(n.a)(a.canvas_icon_class),"' data-tool-id='").concat(a.id,"'></i>"):"<img src='".concat(Object(n.a)(a.icon_url),"' data-tool-id='").concat(a.id,"'/>")
e[o+="&nbsp;".concat(Object(n.a)(a.name))]=function(){i(a,t)}
return e},{})},attachClumpedDropdown:function(e,t,i){e.dropdownList({options:t})
i.on("click",function(){e.dropdownList("hide")})}}},"CU+gNa7iD4":function(e,t,i){"use strict"
var n=i("Ll3RqVTR9W"),a=i("mOY9BNujNR"),o=i.n(a),r=i("ArN3I+GqU9"),s=i("eJBzaBDd6c"),d=(i("D2yEjZ1CP5"),{buildMinimizerLink:function(){return o()('<a href="#" style="font-size: 0.8em;">\n      '.concat(Object(s.a)(n.a.t("links.minimize_embedded_kaltura_content","Minimize embedded content")),"\n    </a>"))},buildCommentHolder:function(e){return o()('<div><div class="innerholder" tabindex="-1" style="margin-bottom: 15px;"></div></div>')},getMediaCommentId:function(e){var t,i=e.data("media_comment_id")||e.find(".media_comment_id:first").text()
i||(t=e.attr("id"))
t&&t.match(/^media_comment_/)&&(i=t.substring(14))
return i},collapseComment:function(e){void 0!==(t=e.find("video,audio").data("mediaelementplayer"))&&null!==t&&function(e){return e.pause()}(t)
var t
e.remove()
o.a.trackEvent("hide_embedded_content","hide_media")}}),c=function(e){o()(e.target).find("div.mejs-audio").focus()},l=function(e){return e.closest("td").length>0},u=function(e){return e.closest("td").css("width").replace("px","")<300},m=function(e){return l(e)&&u(e)},_=function(e){var t=e.closest("td"),i=t.css("width")
t.data("orig-width",i)
t.css("width","".concat(300,"px"))}
o()(document).on("click","a.instructure_inline_media_comment",Object(r.a)(function(){if(INST.kalturaSettings){var e=o()(this),t="video",i=d.getMediaCommentId(e),a=d.buildCommentHolder(e)
m(e)&&_(e)
e.after(a)
e.hide();("audio"===e.data("media_comment_type")||e.is(".audio_playback, .audio_comment, .instructure_audio_link"))&&(t="audio")
a.children("div").mediaComment("show_inline",i,t,e.data("download")||e.attr("href"))
d.buildMinimizerLink().appendTo(a).click(Object(r.a)(function(){var t=e.closest("td")
e.show().focus()
t.css("width",t.data("orig-width"))
d.collapseComment(a)}))
o.a.trackEvent("show_embedded_content","show_media")
a.find(".innerholder").css("outline","none")
a.find(".innerholder").on("focus",c)}else alert(n.a.t("alerts.kaltura_disabled","Kaltura has been disabled for this Canvas site"))}))},D2yEjZ1CP5:function(e,t,i){"use strict"
var n=i("zJMn3FxdoK"),a=i("iBw8ZGM6v8"),o=i.n(a),r=i("yvh8ynczHv"),s=i.n(r),d=i("tnyJgcGuAs"),c=i("NDO/g0y6Bx"),l=i("mOY9BNujNR"),u=i.n(l),m=i("eJBzaBDd6c"),_=i("dNJxE1iMRL"),h={getElement:function(e,t,i,n){var a="video"===e?' width="'.concat(i,'" height="').concat(n,'"'):"",o="<".concat(e," ").concat(a,' preload="metadata" controls>').concat(t,"</").concat(e,">")
return u()(o)}}
u.a.extend(d.default.MediaElementDefaults,{pluginPath:"/images/mediaelement/",defaultVideoWidth:550,defaultVideoHeight:448})
d.default.MepDefaults.success=function(e,t){var n=this
i.e(9).then(i.bind(null,"GWHvo/bcLv")).then(function(t){(0,t.default)(n.mediaCommentId,e,INST.kalturaSettings)})
return e.play()}
d.default.MepDefaults.features.push("googleanalytics")
var f=d.default.MepDefaults.features.indexOf("tracks")+1
d.default.MepDefaults.features.splice(f,0,"sourcechooser")
d.default.MepDefaults.features.splice(f,0,"speed")
function p(e){var t=new u.a.Deferred
u.a.getJSON("/media_objects/".concat(e,"/info"),function(e){var i=e.media_sources.filter(function(e){return"audio/mp3"!==e.content_type}).map(function(e){return"<source\n        type='".concat(Object(m.a)(e.content_type),"'\n        src='").concat(Object(_.a)(Object(m.a)(e.url)),"'\n        title='").concat(Object(m.a)(e.width),"x").concat(Object(m.a)(e.height)," ").concat(Object(m.a)(Math.floor(e.bitrate/1024))," kbps'\n      />")}),n=o.a.map(e.media_tracks,function(e){var t=d.default.language.codes[e.locale]||e.locale
return"<track kind='".concat(Object(m.a)(e.kind),"' label='").concat(Object(m.a)(t),"' src='").concat(Object(m.a)(e.url),"' srclang='").concat(Object(m.a)(e.locale),"' />")}),a=o.a.map(e.media_sources,function(e){return e.content_type})
return t.resolve({sources:i,tracks:n,types:a,can_add_captions:e.can_add_captions})})
return t}function g(e){var t,i,n=e.sourcesAndTracks,a=e.mediaType,o=e.height,r=e.width,s=e.mediaPlayerOptions,c="video"===a?"video":"audio",l=n.sources.concat(n.tracks).join("")
if("audio"===a&&n.types[0].match(/^video\//)&&(t=u.a.extend({mode:"auto"},d.default.MediaElementDefaults,d.default.MepDefaults,s),i=h.getElement("audio",l),"native"!==d.default.HtmlMediaElementShim.determinePlayback(i[0],t,d.default.MediaFeatures.supportsMediaTag,!0,null).method)){c="video"
s.mode="auto_plugin"
s.isVideo=!1
s.videoHeight=o=30}return h.getElement(c,l,r,o)}var v={create:function(e,t,i,n){u()("#media_recorder_container").removeAttr("id")
this.attr("id","media_recorder_container")
s.a.unsubscribe("media_comment_created")
s.a.subscribe("media_comment_created",function(e){return t(e.id,e.mediaType,e.title)})
var a={modal:!1,defaultTitle:n}
u.a.isFunction(i)&&(a.close=i.bind(this))
return u.a.mediaComment.init(e,a)},show_inline:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"video",i=arguments.length>2?arguments[2]:void 0,a=u()(this).closest(".instructure_file_link_holder").andSelf().first()
a.text(n.a.t("loading","Loading media..."))
var r=function(e,i){var a=Math.min(i.closest("div,p,table").width()||550,550),r=Math.round(a/336*240)
return p(e).done(function(s){if(s.sources.length){var l={can_add_captions:s.can_add_captions,mediaCommentId:e,googleAnalyticsTitle:e,menuTimeoutMouseLeave:50,success:function(e){i.focus()
e.play()},keyActions:[{keys:o.a.values(c.a.keyCodes),action:function(e,t,i,n){if(e.isVideo){e.showControls()
e.startControlsTimer()}new c.a(d.default,e,t,n).dispatch()}}]},u=g({sourcesAndTracks:s,mediaPlayerOptions:l,mediaType:t,height:r,width:a})
u.appendTo(i.html(""))
var m=new MediaElementPlayer(u,l)
u.data("mediaelementplayer",m)}else i.text(n.a.t("media_still_converting","Media is currently being converted, please try again in a little bit."))})}
if("maybe"===e){var s=i.replace(/\/download.*/,""),l=function(){return a.text(n.a.t("Media has been queued for conversion, please try again in a little bit."))}
return u.a.ajaxJSON(s,"GET",{},function(e){if(e.attachment&&"maybe"!==e.attachment.media_entry_id){a.text("")
return r(e.attachment.media_entry_id,a)}return l()},l)}return r(e,a)},show:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"video",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null
u()(".play_media_comment").find(".ui-dialog-titlebar-close").click()
var a=u()(this),o=a.data("media_comment_dialog")
if(!o){var r,s
if("video"===t){r=426
s=550}else{r=180
s=400}var d=u()('<div style="overflow: hidden; padding: 0;" />')
"audio"===t&&d.css("padding-top","120px")
d.dialog({dialogClass:"play_media_comment",title:n.a.t("titles.play_comment","Play Media Comment"),width:s,height:r+60,modal:!1,resizable:!1,close:function(){var e=a.data("mediaelementplayer")
e&&e.pause()
i&&i.focus()},open:function(e){u()(e.currentTarget).closest(".ui-dialog").attr("role","dialog").attr("aria-label",n.a.t("Play Media Comment"))
u()(e.currentTarget).parent().find(".ui-dialog-titlebar-close").focus()}})
return d.disableWhileLoading(p(e).done(function(i){if(i.sources.length){var o={can_add_captions:i.can_add_captions,mediaCommentId:e,googleAnalyticsTitle:e},c=g({sourcesAndTracks:i,mediaPlayerOptions:o,mediaType:t,height:r,width:s})
c.appendTo(d.html(""))
a.data({mediaelementplayer:new MediaElementPlayer(c,o),media_comment_dialog:d})}else d.text(n.a.t("media_still_converting","Media is currently being converted, please try again in a little bit."))}))}o.dialog("open")}}
u.a.fn.mediaComment=function(e){if(!INST.kalturaSettings)return console.log("Kaltura has not been enabled for this account")
for(var t=arguments.length,i=new Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n]
v[e].apply(this,i)
return this}},"EHPQ5oFRp/":function(e,t,i){"use strict"
i.d(t,"a",function(){return s})
var n=i("R8Ol696glm"),a=i("l2OaefyPCY"),o=i("pI4K9aISfJ"),r=i("i8I74pbaWm"),s=function(){function e(t,i,n,o){Object(a.a)(this,e)
this.formatBtnGroup="bold italic underline forecolor backcolor removeformat alignleft aligncenter alignright"
this.positionBtnGroup="outdent indent superscript subscript bullist numlist"
this.fontBtnGroup="ltr rtl fontsizeselect formatselect check_a11y"
this.baseURL=t.baseURL
this.maxButtons=i.maxVisibleEditorButtons
this.extraButtons=i.editorButtons
this.instConfig=i
this.viewportWidth=n
this.idAttribute=o}Object(o.a)(e,[{key:"defaultConfig",value:function(){var e
return e={selector:"#".concat(this.idAttribute),toolbar:this.toolbar()},Object(n.a)(e,!window.ENV.use_rce_enhancements&&"theme","modern"),Object(n.a)(e,!window.ENV.use_rce_enhancements&&"skin",!1),Object(n.a)(e,"directionality",Object(r.b)()),Object(n.a)(e,"plugins","autolink,media,paste,table,lists,".concat(window.ENV.use_rce_enhancements?",instructure-ui-icons,instructure_condensed_buttons":"textcolor",",link,directionality,a11y_checker,wordcount")),Object(n.a)(e,"external_plugins",{instructure_image:"/javascripts/tinymce_plugins/instructure_image/plugin.js",instructure_links:"/javascripts/tinymce_plugins/instructure_links/plugin.js",instructure_embed:"/javascripts/tinymce_plugins/instructure_embed/plugin.js",instructure_equation:"/javascripts/tinymce_plugins/instructure_equation/plugin.js",instructure_equella:"/javascripts/tinymce_plugins/instructure_equella/plugin.js",instructure_external_tools:"/javascripts/tinymce_plugins/instructure_external_tools/plugin.js",instructure_record:"/javascripts/tinymce_plugins/instructure_record/plugin.js"}),Object(n.a)(e,"language_load",!1),Object(n.a)(e,"convert_urls",!1),Object(n.a)(e,"menubar",!0),Object(n.a)(e,"branding",!1),Object(n.a)(e,"remove_script_host",!0),Object(n.a)(e,"resize",!0),Object(n.a)(e,"block_formats","Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4;Preformatted=pre"),Object(n.a)(e,"extended_valid_elements","@[id|accesskey|class|dir|lang|style|tabindex|title|contenteditable|contextmenu|draggable|dropzone|hidden|longdesc|spellcheck|translate|align|role|aria-labelledby|aria-atomic|aria-busy|aria-controls|aria-describedby|aria-disabled|aria-dropeffect|aria-flowto|aria-grabbed|aria-haspopup|aria-hidden|aria-invalid|aria-label|aria-labelledby|aria-live|aria-owns|aria-relevant|aria-autocomplete|aria-checked|aria-disabled|aria-expanded|aria-haspopup|aria-hidden|aria-invalid|aria-label|aria-level|aria-multiline|aria-multiselectable|aria-orientation|aria-pressed|aria-readonly|aria-required|aria-selected|aria-sort|aria-valuemax|aria-valuemin|aria-valuenow|aria-valuetext],iframe[src|width|height|name|align|style|class|sandbox|allowfullscreen|webkitallowfullscreen|mozallowfullscreen|allow],i[iclass],a[hidden|href|target|rel|media|hreflang|type|charset|name|rev|shape|coords|download|alt],div,span,#p,h2,h3,h4,h5,h6,header,ul,ol,li[value],ol[reversed|start|type|compact],pre[width],abbr,table[border|summary|width|frame|rules|cellspacing|cellpadding|bgcolor],tbody[char|charoff|valign],td[colspan|rowspan|headers|abbr|axis|scope|align|char|charoff|valign|nowrap|bgcolor|width|height],tfoot[char|charoff|valign],th[colspan|rowspan|headers|scope|abbr|axis|align|char|charoff|valign|nowrap|bgcolor|width|height],thead[char|charoff|valign],title,tr[char|charoff|valign|bgcolor],ul[compact],video[name|src|allowfullscreen|muted|poster|width|height|controls|playsinline],audio[name|src|muted|controls],annotation[href|xref|definitionURL|encoding|cd|name|src],annotation-xml[href|xref|definitionURL|encoding|cd|name|src],maction[href|xref|mathcolor|mathbackground|actiontype|selection],maligngroup[href|xref|mathcolor|mathbackground|groupalign],malignmark[href|xref|mathcolor|mathbackground|edge],math[xmlns|href|xref|display|maxwidth|overflow|altimg|altimg-width|altimg-height|altimg-valign|alttext|cdgroup|mathcolor|mathbackground|scriptlevel|displaystyle|scriptsizemultiplier|scriptminsize|infixlinebreakstyle|decimalpoint|mathvariant|mathsize|width|height|valign|form|fence|separator|lspace|rspace|stretchy|symmetric|maxsize|minsize|largeop|movablelimits|accent|linebreak|lineleading|linebreakstyle|linebreakmultchar|indentalign|indentshift|indenttarget|indentalignfirst|indentshiftfirst|indentalignlast|indentshiftlast|depth|lquote|rquote|linethickness|munalign|denomalign|bevelled|voffset|open|close|separators|notation|subscriptshift|superscriptshift|accentunder|align|rowalign|columnalign|groupalign|alignmentscope|columnwidth|rowspacing|columnspacing|rowlines|columnlines|frame|framespacing|equalrows|equalcolumns|side|minlabelspacing|rowspan|columnspan|edge|stackalign|charalign|charspacing|longdivstyle|position|shift|location|crossout|length|leftoverhang|rightoverhang|mslinethickness|selection],menclose[href|xref|mathcolor|mathbackground|notation],merror[href|xref|mathcolor|mathbackground],mfenced[href|xref|mathcolor|mathbackground|open|close|separators],mfrac[href|xref|mathcolor|mathbackground|linethickness|munalign|denomalign|bevelled],mglyph[href|xref|mathcolor|mathbackground|src|alt|width|height|valign],mi[href|xref|mathcolor|mathbackground|mathvariant|mathsize],mlabeledtr[href|xref|mathcolor|mathbackground],mlongdiv[href|xref|mathcolor|mathbackground|longdivstyle|align|stackalign|charalign|charspacing],mmultiscripts[href|xref|mathcolor|mathbackground|subscriptshift|superscriptshift],mn[href|xref|mathcolor|mathbackground|mathvariant|mathsize],mo[href|xref|mathcolor|mathbackground|mathvariant|mathsize|form|fence|separator|lspace|rspace|stretchy|symmetric|maxsize|minsize|largeop|movablelimits|accent|linebreak|lineleading|linebreakstyle|linebreakmultchar|indentalign|indentshift|indenttarget|indentalignfirst|indentshiftfirst|indentalignlast|indentshiftlast],mover[href|xref|mathcolor|mathbackground|accent|align],mpadded[href|xref|mathcolor|mathbackground|height|depth|width|lspace|voffset],mphantom[href|xref|mathcolor|mathbackground],mprescripts[href|xref|mathcolor|mathbackground],mroot[href|xref|mathcolor|mathbackground],mrow[href|xref|mathcolor|mathbackground],ms[href|xref|mathcolor|mathbackground|mathvariant|mathsize|lquote|rquote],mscarries[href|xref|mathcolor|mathbackground|position|location|crossout|scriptsizemultiplier],mscarry[href|xref|mathcolor|mathbackground|location|crossout],msgroup[href|xref|mathcolor|mathbackground|position|shift],msline[href|xref|mathcolor|mathbackground|position|length|leftoverhang|rightoverhang|mslinethickness],mspace[href|xref|mathcolor|mathbackground|mathvariant|mathsize],msqrt[href|xref|mathcolor|mathbackground],msrow[href|xref|mathcolor|mathbackground|position],mstack[href|xref|mathcolor|mathbackground|align|stackalign|charalign|charspacing],mstyle[href|xref|mathcolor|mathbackground|scriptlevel|displaystyle|scriptsizemultiplier|scriptminsize|infixlinebreakstyle|decimalpoint|mathvariant|mathsize|width|height|valign|form|fence|separator|lspace|rspace|stretchy|symmetric|maxsize|minsize|largeop|movablelimits|accent|linebreak|lineleading|linebreakstyle|linebreakmultchar|indentalign|indentshift|indenttarget|indentalignfirst|indentshiftfirst|indentalignlast|indentshiftlast|depth|lquote|rquote|linethickness|munalign|denomalign|bevelled|voffset|open|close|separators|notation|subscriptshift|superscriptshift|accentunder|align|rowalign|columnalign|groupalign|alignmentscope|columnwidth|rowspacing|columnspacing|rowlines|columnlines|frame|framespacing|equalrows|equalcolumns|side|minlabelspacing|rowspan|columnspan|edge|stackalign|charalign|charspacing|longdivstyle|position|shift|location|crossout|length|leftoverhang|rightoverhang|mslinethickness|selection],msub[href|xref|mathcolor|mathbackground|subscriptshift],msubsup[href|xref|mathcolor|mathbackground|subscriptshift|superscriptshift],msup[href|xref|mathcolor|mathbackground|superscriptshift],mtable[href|xref|mathcolor|mathbackground|align|rowalign|columnalign|groupalign|alignmentscope|columnwidth|width|rowspacing|columnspacing|rowlines|columnlines|frame|framespacing|equalrows|equalcolumns|displaystyle|side|minlabelspacing],mtd[href|xref|mathcolor|mathbackground|rowspan|columnspan|rowalign|columnalign|groupalign],mtext[href|xref|mathcolor|mathbackground|mathvariant|mathsize|width|height|depth|linebreak],mtr[href|xref|mathcolor|mathbackground|rowalign|columnalign|groupalign],munder[href|xref|mathcolor|mathbackground|accentunder|align],munderover[href|xref|mathcolor|mathbackground|accent|accentunder|align],none[href|xref|mathcolor|mathbackground],semantics[href|xref|definitionURL|encoding],mark"),Object(n.a)(e,"non_empty_elements","td th iframe video audio object script a i area base basefont br col frame hr img input isindex link meta param embed source wbr track"),Object(n.a)(e,"content_css",window.ENV.url_to_what_gets_loaded_inside_the_tinymce_editor_css),Object(n.a)(e,"browser_spellcheck",!0),Object(n.a)(e,"init_instance_callback",function(e){$("#".concat(e.id)).parent().css("visibility","visible")}),e}},{key:"external_buttons",value:function(){for(var e="",t=0;this.extraButtons&&t<this.extraButtons.length;t++)this.extraButtons.length<=this.maxButtons||t<this.maxButtons-1?e="".concat(e," instructure_external_button_").concat(this.extraButtons[t].id):e.match(/instructure_external_button_clump/)||(e+=" instructure_external_button_clump")
return e}},{key:"buildInstructureButtons",value:function(){var e=" instructure_image instructure_equation".concat(window.ENV.use_rce_enhancements?" lti_tool_dropdown":"")
e+=this.external_buttons()
this.instConfig&&this.instConfig.allowMediaComments&&this.instConfig.kalturaSettings&&!this.instConfig.kalturaSettings.hide_rte_button&&(e+=" instructure_record")
return e+=this.instConfig&&this.instConfig.equellaEnabled?" instructure_equella":""}},{key:"balanceButtons",value:function(e){var t="table media instructure_links unlink".concat(e),i="",n="",a=""
if(this.viewportWidth<359&&this.viewportWidth>0){i=this.formatBtnGroup
n="".concat(this.positionBtnGroup," ").concat(t)
a=this.fontBtnGroup}else if(this.viewportWidth<1200){i="".concat(this.formatBtnGroup," ").concat(this.positionBtnGroup)
n="".concat(t," ").concat(this.fontBtnGroup)}else i="".concat(this.formatBtnGroup," ").concat(this.positionBtnGroup," ").concat(t," ").concat(this.fontBtnGroup)
return window.ENV.use_rce_enhancements?[i,n,a]:[i,n,a].map(function(e){return e.split(" ").join(",")})}},{key:"toolbar",value:function(){var e=this.buildInstructureButtons()
return this.balanceButtons(e)}}])
return e}()},EJaXNmAx3B:function(e,t,i){"use strict"
var n=i("yMdFkcm7vJ"),a=i("rjooEDBazu"),o=i("mOY9BNujNR"),r=i.n(o),s=i("eJBzaBDd6c"),d=i("BuCMrQMyFY"),c=i("3HTgpJ/Ga1"),l=i("hpV4JWU0K6"),u=i("GiK3r5kD1Y"),m=(i.n(u),i("O27J2VCga9")),_=i.n(m),h={more_external_tools:Object(s.a)(a.a.t("more_external_tools","More External Tools"))},f={init:function(e,t,a){l.a.initEditor(e)
if(a&&a.editorButtons&&a.editorButtons.length){var o={open:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i]
return setTimeout(function(){var e
return(e=o).open.apply(e,t)},50)}}
i.e(3).then(i.bind(null,"Wr2aXyPyiY")).then(function(t){var i=t.default,a=document.createElement("div")
document.body.appendChild(a)
_.a.render(Object(n.a)(i,{win:window,editor:e,contextAssetString:ENV.context_asset_string,iframeAllowances:Object(c.a)(),resourceSelectionUrl:r()("#context_external_tool_resource_selection_url").attr("href"),deepLinkingOrigin:ENV.DEEP_LINKING_POST_MESSAGE_ORIGIN}),a,function(){o=this})})
for(var s=[],u=[],m=function(t){var i=a.editorButtons[t]
if(ENV.use_rce_enhancements)u.push(d.a.buttonConfig(i,e))
else if(a.editorButtons.length>a.maxVisibleEditorButtons&&t>=a.maxVisibleEditorButtons-1)s.push(i)
else{e.addCommand("instructureExternalButton".concat(i.id),function(){o.open(i)})
e.addButton("instructure_external_button_".concat(i.id),d.a.buttonConfig(i,e))}},f=0;a.editorButtons&&f<a.editorButtons.length;f++)m(f)
u.length&&ENV.use_rce_enhancements&&e.ui.registry.addMenuButton("lti_tool_dropdown",{fetch:function(e){e(u)},icon:"lti",tooltip:"LTI Tools"})
if(s.length){var p=function(){var t=d.a.clumpedButtonMapping(s,e,function(e){return o.open(e)})
d.a.attachClumpedDropdown(r()("#".concat(this._id)),t,e)}
ENV.use_rce_enhancements?e.ui.registry.addButton("instructure_external_button_clump",{title:h.more_external_tools,image:"/images/downtick.png",onAction:p}):e.addButton("instructure_external_button_clump",{title:h.more_external_tools,image:"/images/downtick.png",onkeyup:function(e){if(32===e.keyCode||13===e.keyCode){e.stopPropagation()
p.call(this)}},onclick:p})}}}}
t.a=f},EKuPgEpL6b:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("zNOhtK+31x")
a()(document).on("mousedown click keydown",".al-trigger",function(e){var t=a()(this)
if(!t.data("kyleMenu")){var i=a.a.extend({noButton:!0},t.data("kyleMenuOptions"))
t.data("append-to-body")&&(i.appendMenuTo="body")
i=a.a.extend(i,{popupOpts:{position:{my:t.data("popup-my"),at:t.data("popup-at"),within:t.data("popup-within")}}})
new o.a(t,i)
t.trigger(e)}})},Eq7qibUFi3:function(e,t,i){"use strict"
var n=i("l2OaefyPCY"),a=i("pI4K9aISfJ"),o=i("mOY9BNujNR"),r=i.n(o),s=".lti-thumbnail-launch"
function d(e){e.preventDefault()
c.launch(r()(e.target).closest(s))}var c=new(function(){function e(){Object(n.a)(this,e)
r()(document.body).delegate(s,"click",d)}Object(a.a)(e,[{key:"launch",value:function(e){var t=JSON.parse(e.attr("target")),i=r()("<iframe/>",{src:e.attr("href"),allowfullscreen:"",width:t.displayWidth||500,height:t.displayHeight||500})
e.replaceWith(i)}}])
return e}())(s)},FMOK6cJcp3:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
i("t0oyyDFjk2")
function o(e,t,i){var n
null==t&&(t=e.is(":ui-dialog:hidden")||"true"!==e.attr("aria-expanded"))
var r,s=a()("[aria-controls*=".concat(e.attr("id"),"]"))
s.filter(function(){return a()(this).data("hideWhileTargetShown")}).toggle(!t)
if(i&&void 0!==i.attr("aria-expanded")){i.attr("aria-expanded",!("true"===i.attr("aria-expanded")))
e.toggle("true"===i.attr("aria-expanded"))}else e.attr("aria-expanded","".concat(t)).toggle(t)
if(e.is(":ui-dialog")||(n=e.data("turnIntoDialog"))){if(n&&t){n=a.a.extend({autoOpen:!1,close:function(){o(e,!1)}},n)
e.dialog(n).fixDialogButtons()}if(t){e.dialog("open")
e.data("read-on-open")&&e.dialog("widget").attr("aria-live","assertive").attr("aria-atomic","true")}else e.dialog("isOpen")&&e.dialog("close")}s.each((r=t?"Shown":"Hidden",function(){var e,t=a()(this)
if(e=t.data("textWhileTarget".concat(r))){var i="textWhileTarget".concat("Hidden"===r?"Shown":"Hidden")
t.data(i)||t.data(i,t.text())
t.text(e)}}))}var r={bind:function(){a()(document).on("click change keyclick",".element_toggler[aria-controls]",function(e){var t,i=a()(this)
if(i.is('input[type="checkbox"]')){if("click"===e.type)return
t=i.prop("checked")}"click"===e.type&&e.preventDefault()
var n=i.closest(".user_content")
n.length||(n=a()(document.body))
var r=n.find("#".concat(i.attr("aria-controls").replace(/\s/g,", #")))
r.length&&o(r,t,i)
var s=i.find('i[class*="icon-mini-arrow"].auto_rotate')
if(s.length){s.toggleClass("icon-mini-arrow-down")
s.toggleClass("icon-mini-arrow-right")}})}}
r.bind()},Fbgaaelsi7:function(e,t,i){"use strict"
t.a=function(e){var t=e,i=null
return function(e){null===i&&(i=n.default.post("/api/v1/jwts/refresh",{jwt:t}).then(function(e){i=null
return t=e.data.token}))
"function"==typeof e&&i.then(e)
return i}}
var n=i("Wx/Z6H26TR")},FjPpBpSp8P:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
i("r81G667jwg"),i("3pTo86YxQs")
a()(document).ready(function(){a()("#floating_reminders").draggable()
a()(".show_reminders_link").click(function(e){e.preventDefault()
a()(this).blur()
var t=a()("#floating_reminders"),i=t.clone()
i.children().css("visibility","hidden")
var n=a()("#reminders_icon").offset(),o=a()("#floating_reminders").offset().top
t.after(i)
i.css({width:20,height:20,left:n.left,top:n.top-o,opacity:0})
t.css("visibility","hidden").css("left","")
i.animate({top:t.css("top"),left:t.css("left"),width:t.width(),height:t.height(),opacity:1},"slow",function(){a()(this).remove()
t.css("visibility","visible")
t.find("a:not(.hide_reminders_link):visible:first").focus()
a()("#reminders_icon").hide()})
t.find(".update_session_url").attr("href")})
a()(".hide_reminders_link").click(function(e){e.preventDefault()
var t=a()(this).parents("#floating_reminders"),i=t.clone()
t.after(i).css("left",-2e3)
i.children().css("visibility","hidden")
var n=a()("#reminders_icon").show().offset(),o=i.offset().top
i.animate({width:20,height:20,left:n.left,top:n.top-o,opacity:0},"slow",function(){a()(this).remove()})
t.find(".update_session_url").attr("href")})
a()(".drop_held_context_link").click(function(e){e.preventDefault()
var t=a()(this).parents(".reminder")
t.confirmDelete({url:a()(this).attr("href"),message:"Are you sure you want to drop this "+t.find(".item_type").text()+"?",success:function(e){a()(this).fadeOut("fast",function(){a()(this).remove()
0===a()("#floating_reminders .reminder").length&&a()("#floating_reminders").fadeOut("fast",function(){a()(this).remove()
a()("#reminders_icon").remove()})})}})})})},Fv8sWPqkb4:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{play_media_comment_35257210:"\u062a\u0634\u063a\u064a\u0644 \u062a\u0639\u0644\u064a\u0642 \u0627\u0644\u0648\u0633\u0627\u0626\u0637.",play_media_comment_by_name_from_createdat_515b3b:"\u062a\u0634\u063a\u064a\u0644 \u062a\u0639\u0644\u064a\u0642 \u0627\u0644\u0648\u0633\u0627\u0626\u0637 \u0628\u0648\u0627\u0633\u0637\u0629 %{name} \u0645\u0646 %{createdAt}."},cy:{play_media_comment_35257210:"Chwarae sylw ar gyfryngau.",play_media_comment_by_name_from_createdat_515b3b:"Chwarae sylw ar gyfryngau gan %{name} o %{createdAt}."},da:{play_media_comment_35257210:"Afspil medie kommentar.",play_media_comment_by_name_from_createdat_515b3b:"Afspil mediekommentar af %{name} fra %{createdAt}."},de:{play_media_comment_35257210:"Medienkommentar wiedergeben",play_media_comment_by_name_from_createdat_515b3b:"Medienkommentar durch %{name} von %{createdAt} wiedergeben."},"en-AU":{play_media_comment_35257210:"Play media comment.",play_media_comment_by_name_from_createdat_515b3b:"Play media comment by %{name} from %{createdAt}."},"en-CA":{play_media_comment_35257210:"Play media comment.",play_media_comment_by_name_from_createdat_515b3b:"Play media comment by %{name} from %{createdAt}."},"en-GB":{play_media_comment_35257210:"Play media comment.",play_media_comment_by_name_from_createdat_515b3b:"Play media comment by %{name} from %{createdAt}."},"en-GB-x-lbs":{play_media_comment_35257210:"Play media comment.",play_media_comment_by_name_from_createdat_515b3b:"Play media comment by %{name} from %{createdAt}."},"en-GB-x-ukhe":{play_media_comment_35257210:"Play media comment.",play_media_comment_by_name_from_createdat_515b3b:"Play media comment by %{name} from %{createdAt}."},es:{play_media_comment_35257210:"Reproducir comentario multimedia.",play_media_comment_by_name_from_createdat_515b3b:"Reproducir comentario multimedia de %{name} desde %{createdAt}."},fr:{play_media_comment_35257210:"Lancer le commentaire sur m\xe9dia.",play_media_comment_by_name_from_createdat_515b3b:"Lancer le commentaire sur m\xe9dia par %{name} \xe0 partir de %{createdAt}."},"fr-CA":{play_media_comment_35257210:"Lire le commentaire du support",play_media_comment_by_name_from_createdat_515b3b:"Lire le commentaire du support par %{name} du %{createdAt}."},ht:{play_media_comment_35257210:"Jwe k\xf2mant\xe8 medya.",play_media_comment_by_name_from_createdat_515b3b:"Jwe k\xf2mant\xe8 medya pa %{name} de %{createdAt}."},is:{play_media_comment_35257210:"Spila mi\xf0ilsathugasemd.",play_media_comment_by_name_from_createdat_515b3b:"Spila mi\xf0ilsathugasemd eftir %{name} fr\xe1 %{createdAt}."},it:{play_media_comment_35257210:"Commento sulla riproduzione del contenuto multimediale.",play_media_comment_by_name_from_createdat_515b3b:"Commento sulla riproduzione del contenuto multimediale da parte di %{name} da %{createdAt}."},ja:{play_media_comment_35257210:"\u30e1\u30c7\u30a3\u30a2 \u30b3\u30e1\u30f3\u30c8\u306e\u518d\u751f\u3002",play_media_comment_by_name_from_createdat_515b3b:"%{name}\u307e\u3067%{createdAt}\u304b\u3089\u306e\u30e1\u30c7\u30a3\u30a2\u306e\u30b3\u30e1\u30f3\u30c8\u3092\u518d\u751f\u3057\u307e\u3059\u3002"},mi:{play_media_comment_35257210:"Mahia ng\u0101 korero p\u0101p\u0101ho",play_media_comment_by_name_from_createdat_515b3b:"Mahia ng\u0101 korero p\u0101p\u0101ho ma %{name} mai te %{createdAt}."},nb:{play_media_comment_35257210:"Spill mediainnhold",play_media_comment_by_name_from_createdat_515b3b:"Spill mediainnhold av %{name} fra %{createdAt}."},"nb-x-k12":{play_media_comment_35257210:"Spill mediainnhold",play_media_comment_by_name_from_createdat_515b3b:"Spill mediainnhold av %{name} fra %{createdAt}."},nl:{play_media_comment_35257210:"Media-opmerking afspelen",play_media_comment_by_name_from_createdat_515b3b:"Speel media-opmerking door %{name} van %{createdAt} af."},pl:{play_media_comment_35257210:"Odtw\xf3rz komentarz multimedialny.",play_media_comment_by_name_from_createdat_515b3b:"Odtw\xf3rz komentarz multimedialny %{name} z %{createdAt}."},pt:{play_media_comment_35257210:"Reproduzir coment\xe1rio de m\xeddia.",play_media_comment_by_name_from_createdat_515b3b:"Reproduzir coment\xe1rios de m\xeddia %{name} de %{createdAt}."},"pt-BR":{play_media_comment_35257210:"Reproduzir coment\xe1rio em m\xeddia.",play_media_comment_by_name_from_createdat_515b3b:"Reproduzir coment\xe1rio em m\xeddia por %{name} de %{createdAt}."},ru:{play_media_comment_35257210:"\u0412\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u043e\u0433\u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f.",play_media_comment_by_name_from_createdat_515b3b:"\u0412\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u044b\u0439 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438 %{name} \u0438\u0437 %{createdAt}."},sl:{play_media_comment_35257210:"Predvajaj komentar v obliki medija.",play_media_comment_by_name_from_createdat_515b3b:"Predvajaj komentar v obliki medija %{name}, ki je bil ustvarjen ob/dne %{createdAt}."},sv:{play_media_comment_35257210:"Spela upp medieinneh\xe5ll.",play_media_comment_by_name_from_createdat_515b3b:"Spela upp mediekommentar av %{name} fr\xe5n %{createdAt}."},"zh-Hans":{play_media_comment_35257210:"\u64ad\u653e\u5a92\u4f53\u8bc4\u8bba\u3002",play_media_comment_by_name_from_createdat_515b3b:"\u64ad\u653e%{name}\u7684\u6765\u81ea%{createdAt}\u7684\u5a92\u4f53\u8bc4\u8bba\u3002"},"zh-Hant":{play_media_comment_35257210:"\u64ad\u653e\u5a92\u9ad4\u8a55\u8ad6\u3002",play_media_comment_by_name_from_createdat_515b3b:"\u64ad\u653e%{name}\u65bc%{createdAt}\u5275\u5efa\u7684\u5a92\u9ad4\u8a55\u8ad6\u3002"}}})},Gi7cFyVsdV:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u0648\u064f\u0636\u0639\u062a \u0627\u0644\u0648\u0633\u0627\u0626\u0637 \u0641\u064a \u062d\u0627\u0644\u0629 \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631 \u0644\u062a\u062d\u0648\u064a\u0644\u0647\u0627\u060c \u064a\u0631\u062c\u0649 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0628\u0639\u062f \u0642\u0644\u064a\u0644.",play_media_comment_8614d30f:"\u062a\u0639\u0644\u064a\u0642 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0648\u0633\u0627\u0626\u0637"},cy:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Mae\u2019r cyfryngau mewn ciw ar gyfer cael ei drosi, rhowch gynnig arall arni wedyn.",play_media_comment_8614d30f:"Chwarae Sylw ar Gyfryngau"},da:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medierne er blevet sat i k\xf8 til konvertering, pr\xf8v igen lidt senere.",play_media_comment_8614d30f:"Afspil mediekommentar"},"da-x-k12":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medierne er blevet sat i k\xf8 til konvertering, pr\xf8v igen lidt senere."},de:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Das Medium befindet sich zur Umwandlung in der Warteschlange. Bitte sp\xe4ter noch einmal versuchen.",play_media_comment_8614d30f:"Medienkommentar wiedergeben"},el:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u03a4\u03bf \u03b1\u03c1\u03c7\u03b5\u03af\u03bf \u03c0\u03bf\u03bb\u03c5\u03bc\u03ad\u03c3\u03c9\u03bd \u03ad\u03c7\u03b5\u03b9 \u03c0\u03c1\u03bf\u03c3\u03c4\u03b5\u03b8\u03b5\u03af \u03c3\u03c4\u03b7\u03bd \u03bf\u03c5\u03c1\u03ac \u03b3\u03b9\u03b1 \u03bc\u03b5\u03c4\u03b1\u03c4\u03c1\u03bf\u03c0\u03ae, \u03c0\u03b1\u03c1\u03b1\u03ba\u03b1\u03bb\u03ce \u03b4\u03bf\u03ba\u03b9\u03bc\u03ac\u03c3\u03c4\u03b5 \u03be\u03b1\u03bd\u03ac \u03c3\u03b5 \u03c0\u03bf\u03bb\u03cd \u03bb\u03af\u03b3\u03bf.",play_media_comment_8614d30f:"\u0391\u03bd\u03b1\u03c0\u03b1\u03c1\u03b1\u03b3\u03c9\u03b3\u03ae \u03a0\u03bf\u03bb\u03c5\u03bc\u03b5\u03c3\u03b9\u03ba\u03bf\u03cd \u03a3\u03c7\u03bf\u03bb\u03af\u03bf\u03c5"},"en-AU":{jquery_media_comments:{loading:"Loading media...",media_still_converting:"Media is currently being converted, please try again in a little bit.",titles:{play_comment:"Play Media Comment"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media has been queued for conversion; please try again in a short time.",play_media_comment_8614d30f:"Play Media Comment"},"en-CA":{jquery_media_comments:{loading:"Loading media...",media_still_converting:"Media is currently being converted, please try again in a little bit.",titles:{play_comment:"Play Media Comment"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media has been queued for conversion, please try again in a little bit.",play_media_comment_8614d30f:"Play Media Comment"},"en-GB":{jquery_media_comments:{loading:"Loading media...",media_still_converting:"Media is currently being converted. Please try again in a little bit.",titles:{play_comment:"Play media comment"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media has been queued for conversion; Please try again in a little while.",play_media_comment_8614d30f:"Play media comment"},"en-GB-x-lbs":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media has been queued for conversion; Please try again in a little while.",play_media_comment_8614d30f:"Play media comment"},"en-GB-x-ukhe":{jquery_media_comments:{loading:"Loading media...",media_still_converting:"Media is currently being converted. Please try again in a little bit.",titles:{play_comment:"Play media comment"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media has been queued for conversion; Please try again in a little while.",play_media_comment_8614d30f:"Play media comment"},es:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medios ha sido puesto en la fila para la conversi\xf3n, por favor trate en un rato m\xe1s.",play_media_comment_8614d30f:"Reproduzca comentarios de medios"},fa:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u0631\u0633\u0627\u0646\u0647 \u0628\u0631\u0627\u06cc \u062a\u0628\u062f\u06cc\u0644 \u062f\u0631 \u0635\u0641 \u0627\u0646\u062a\u0638\u0627\u0631 \u0645\u0627\u0646\u062f\u0647 \u0627\u0633\u062a\u060c \u0644\u0637\u0641\u0627 \u06a9\u0645\u06cc \u0628\u0639\u062f \u062f\u0648\u0628\u0627\u0631\u0647 \u062a\u0644\u0627\u0634 \u06a9\u0646\u06cc\u062f.",play_media_comment_8614d30f:"\u067e\u062e\u0634 \u0646\u0638\u0631 \u0631\u0633\u0627\u0646\u0647 \u0627\u06cc"},fr:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Le m\xe9dia est en attente de conversion, veuillez essayer \xe0 nouveau dans un court instant.",play_media_comment_8614d30f:"Lire le commentaire multim\xe9dia"},"fr-CA":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Le m\xe9dia est en attente de conversion, veuillez essayer \xe0 nouveau dans un court instant.",play_media_comment_8614d30f:"Lire le commentaire multim\xe9dia"},he:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u05d4\u05de\u05d3\u05d9\u05d4 \u05e0\u05db\u05e0\u05e1\u05d4 \u05dc\u05ea\u05d5\u05e8 \u05dc\u05d4\u05de\u05e8\u05d4, \u05d9\u05e9 \u05dc\u05e0\u05e1\u05d5\u05ea \u05e9\u05d5\u05d1 \u05e2\u05d5\u05d3 \u05de\u05e2\u05d8",play_media_comment_8614d30f:"\u05e0\u05d9\u05d2\u05d5\u05df \u05d4\u05e2\u05e8\u05ea \u05de\u05d3\u05d9\u05d4"},ht:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medya nan fil datant pou konv\xe8syon, tanpri eseye ank\xf2 apr\xe8 yon ti tan.",play_media_comment_8614d30f:"Jwe K\xf2mant\xe8 Medya"},hu:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"A m\xe9dia a konverzi\xf3s sorba ker\xfclt, k\xe9rj\xfck v\xe1rjon a feldolgoz\xe1s v\xe9g\xe9ig",play_media_comment_8614d30f:"M\xe9diatartalom lej\xe1tsz\xe1sa"},hy:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u0544\u0578\u0582\u056c\u057f\u056b\u0574\u0565\u0564\u056b\u0561\u0576 \u0570\u0565\u0580\u0569\u0561\u0563\u0580\u057e\u0561\u056e \u0567 \u0583\u0578\u056d\u0561\u056f\u0565\u0580\u057a\u0574\u0561\u0576 \u0570\u0561\u0574\u0561\u0580, \u056d\u0576\u0564\u0580\u0578\u0582\u0574 \u0565\u0576\u0584 \u0583\u0578\u0580\u0571\u0565\u056c \u0576\u0578\u0580\u056b\u0581 \u0574\u056b \u0583\u0578\u0584\u0580 \u0561\u057e\u0565\u056c\u056b \u0578\u0582\u0577:",play_media_comment_8614d30f:"\u0544\u0578\u0582\u056c\u057f\u056b\u0574\u0565\u0564\u056b\u0561 \u0574\u0565\u056f\u0576\u0561\u0562\u0561\u0576\u0578\u0582\u0569\u0575\u0561\u0576 \u057e\u0565\u0580\u0561\u0580\u057f\u0561\u0564\u0580\u0578\u0582\u0574"},is:{jquery_media_comments:{loading:"S\xe6ki mi\xf0il...",media_still_converting:"Veri\xf0 er a\xf0 breyta mi\xf0li, reyndu aftur eftir sm\xe1stund.",titles:{play_comment:"Spila mi\xf0ilsathugasemd"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Mi\xf0ill er \xed bi\xf0r\xf6\xf0 fyrir breytingu, reyndu aftur s\xed\xf0ar.",play_media_comment_8614d30f:"Spila mi\xf0ilsathugasemd"},it:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"I contenuti multimediali sono stati inseriti in coda per la conversione. Riprova tra breve.",play_media_comment_8614d30f:"Riproduci commento multimediale"},ja:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u30e1\u30c7\u30a3\u30a2\u306f\u5909\u63db\u306e\u305f\u3081\u3001\u5f85\u3061\u5217\u306b\u5165\u308c\u3089\u308c\u3066\u3044\u307e\u3059\u3002\u3057\u3070\u3089\u304f\u3057\u3066\u304b\u3089\u3084\u308a\u76f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002",play_media_comment_8614d30f:"\u30e1\u30c7\u30a3\u30a2 \u30b3\u30e1\u30f3\u30c8\u306e\u518d\u751f"},ko:{play_media_comment_8614d30f:"\ubbf8\ub514\uc5b4 \uc124\uba85 \uc7ac\uc0dd"},mi:{jquery_media_comments:{loading:"Uta p\u0101p\u0101hotanga ana ...",media_still_converting:"Kei te tahuri p\u0101p\u0101ho t\u0113nei w\u0101, t\u0113n\u0101 koa ngana an\u014d i roto i te iti moka.",titles:{play_comment:"T\u0101karo P\u0101p\u0101ho K\u014drero"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Kua p\u0101p\u0101ho kua wh\u0101rangitia mo te huringa, t\u0113n\u0101 koa ngana an\u014d i roto i te iti moka.",play_media_comment_8614d30f:"T\u0101karo P\u0101p\u0101ho K\u014drero"},nb:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medier venter p\xe5 konvertering, pr\xf8v igjen litt senere.",play_media_comment_8614d30f:"Spill av mediekommentar"},"nb-x-k12":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medier venter p\xe5 konvertering, pr\xf8v igjen litt senere.",play_media_comment_8614d30f:"Spill av mediekommentar"},nl:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media staat in de wachtrij voor gesprek, probeer het straks nogmaals.",play_media_comment_8614d30f:"Media-opmerking afspelen"},nn:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media st\xe5r i k\xf8 for konvertering, pr\xf8v p\xe5 nytt seinare.",play_media_comment_8614d30f:"Spel mediekommentar"},pl:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Multimedia stoj\u0105 w kolejce do konwersji, spr\xf3buj ponownie p\xf3\u017aniej.",play_media_comment_8614d30f:"Odtw\xf3rz komentarz multimedialny"},pt:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"A liga\xe7\xe3o foi ligada para conversa\xe7\xe3o, por favor tente novamente mais tarde.",play_media_comment_8614d30f:"Reproduzir coment\xe1rio em m\xeddia"},"pt-BR":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"M\xeddia foi colocado na fila para convers\xe3o, por favor, tente novamente daqui a pouco.",play_media_comment_8614d30f:"Reproduzir coment\xe1rio em m\xeddia"},ru:{jquery_media_comments:{loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445...",media_still_converting:"\u0414\u0430\u043d\u043d\u044b\u0435 \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u0439 \u043c\u043e\u043c\u0435\u043d\u0442 \u043a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u0443\u044e\u0442\u0441\u044f, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435.",titles:{play_comment:"\u0412\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u043e\u0433\u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f"}},media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u041c\u0435\u0434\u0438\u0430 \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0441\u044f \u0432 \u043e\u0447\u0435\u0440\u0435\u0434\u0438 \u0434\u043b\u044f \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u043d\u0435\u043c\u043d\u043e\u0433\u043e \u043f\u043e\u043f\u043e\u0437\u0436\u0435.",play_media_comment_8614d30f:"\u0412\u043e\u0441\u043f\u0440\u043e\u0438\u0437\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u043c\u0443\u043b\u044c\u0442\u0438\u043c\u0435\u0434\u0438\u0439\u043d\u043e\u0433\u043e \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u044f"},sl:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Medij je trenutno v \u010dakalni vrsti za pretvorbo, poskusite znova malo pozneje.",play_media_comment_8614d30f:"Predvajaj komentar v obliki medija"},sv:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media st\xe5r i k\xf6 f\xf6r konvertering, v\xe4nligen f\xf6rs\xf6k igen om en liten stund.",play_media_comment_8614d30f:"Spela mediekommentar"},"sv-x-k12":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"Media st\xe5r i k\xf6 f\xf6r konvertering, v\xe4nligen f\xf6rs\xf6k igen om en liten stund."},tr:{play_media_comment_8614d30f:"Medya Yorumunu Oynat"},uk:{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u041c\u0435\u0434\u0456\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d\u0438\u0439 \u0432 \u0447\u0435\u0440\u0433\u0443 \u0434\u043b\u044f \u043f\u0435\u0440\u0435\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f, \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."},"zh-Hans":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u5a92\u4f53\u4e00\u76f4\u5728\u6392\u961f\u7b49\u5f85\u8f6c\u6362\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002",play_media_comment_8614d30f:"\u64ad\u653e\u5a92\u4f53\u8bc4\u8bba"},"zh-Hant":{media_has_been_queued_for_conversion_please_try_ag_74343bbd:"\u5a92\u9ad4\u5df2\u9032\u5165\u968a\u5217\u7b49\u5019\u8f49\u63db\uff0c\u8acb\u7a0d\u5f8c\u91cd\u8a66\u3002",play_media_comment_8614d30f:"\u64ad\u653e\u5a92\u9ad4\u8a55\u8ad6"}}})},Hr9DhKvWcz:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("Fv8sWPqkb4"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("mediaCommentThumbnail")},IIpzxDTdC3:function(e,t,i){"use strict"
t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};["equationCB","linksCB","imagePickerCB","equellaCB","externalToolCB","recordCB"].forEach(function(t){void 0===e[t]&&(e[t]=function(){})})
document.addEventListener("tinyRCE/initEquation",function(t){var n=t.detail
i.e(4).then(i.bind(null,"+Be0f/404x")).then(function(t){var i=t.default,a=new i(n.ed)
e.equationCB(a)})})
document.addEventListener("tinyRCE/initLinks",function(t){var i=t.detail
o.a.renderDialog(i.ed)
e.linksCB()})
document.addEventListener("tinyRCE/initImagePicker",function(t){i.e(2).then(i.bind(null,"6XJQ/KUWZy")).then(function(i){var n=i.default,a=new n(t.detail.ed,t.detail.selectedNode)
e.imagePickerCB(a)})})
document.addEventListener("tinyRCE/initEquella",function(t){i.e(6).then(i.bind(null,"AOUdSAjyQx")).then(function(i){var n=i.default
n(t.detail.ed)
e.equellaCB()})})
document.addEventListener("tinyRCE/initExternalTools",function(t){n.a.init(t.detail.ed,t.detail.url,a.a)
e.externalToolCB()})
document.addEventListener("tinyRCE/initRecord",function(t){i.e(5).then(i.bind(null,"R7Y87JWcvG")).then(function(i){var n=i.default
n.insertEditor(t.detail.ed)
e.recordCB()})})}
var n=i("EJaXNmAx3B"),a=i("whMk0QU2To"),o=i("hpV4JWU0K6")},Ii09r7XDvi:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("Lv2o/qLTOe"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("editor_accessibility")},JYcub8KqMf:function(e,t,i){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=i("iBw8ZGM6v8"),a=i.n(n),o=i("mOY9BNujNR"),r=i.n(o),s=i("cyMNwMhBvy"),d=i("ArN3I+GqU9")
i("OGUJHwbmJb"),i("FjPpBpSp8P"),i("BIYSGtzGjH"),i("PYCyImFiAC"),i("OHJtctF3NN"),i("zr2HOwddfD"),i("EKuPgEpL6b"),i("FMOK6cJcp3"),i("2aUY+gHXYk"),i("CU+gNa7iD4"),i("QE/xL6drvs"),i("LShObMQJhT"),i("Eq7qibUFi3")
r()("#skip_navigation_link").on("click",Object(d.a)(function(){r()(r()(this).attr("href")).attr("tabindex",-1).focus()}))
var c=1200
function l(){var e=r()("body").hasClass("course-menu-expanded")||r()(document).width()>=c-15?0:-1
r()("#section-tabs li a").attr("tabIndex",e)}r()(l)
r()(window).on("resize",a.a.debounce(l,50))
r()("body").on("click","#courseMenuToggle",function(){r()("body").toggleClass("course-menu-expanded")
Object(s.a)()
r()("#left-side").css({display:r()("body").hasClass("course-menu-expanded")?"block":"none"})
l()})},KVDLV1bDgD:function(e,t,i){"use strict"
var n=i("whMk0QU2To"),a=i("i7SnyCtYw6"),o=i("mOY9BNujNR"),r=i.n(o),s=i("iBw8ZGM6v8"),d=(i.n(s),i("eJBzaBDd6c")),c=(i("Q4xR9Iqymk"),i("Q/pI8WL7wG"),i("kzdUuF07HD"),i("+d6o9BzfWM"),i("dNJxE1iMRL")),l={"application/vnd.openxmlformats-officedocument.wordprocessingml.template":[1,1],"application/vnd.oasis.opendocument.spreadsheet":[1,1],"application/vnd.sun.xml.writer":[1,1],"application/excel":[1,1],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":[1,1],"text/rtf":[1,1],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":[1,1],"application/vnd.sun.xml.impress":[1,1],"application/vnd.sun.xml.calc":[1,1],"application/vnd.ms-excel":[1,1],"application/msword":[1,1],"application/mspowerpoint":[1,1],"application/rtf":[1,1],"application/vnd.oasis.opendocument.presentation":[1,1],"application/vnd.oasis.opendocument.text":[1,1],"application/vnd.openxmlformats-officedocument.presentationml.template":[1,1],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":[1,1],"text/plain":[1,1],"application/vnd.openxmlformats-officedocument.presentationml.presentation":[1,1],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":[1,1],"application/postscript":[1,1],"application/pdf":[1,1],"application/vnd.ms-powerpoint":[1,1]}
r.a.filePreviewsEnabled=function(){return!(n.a.disableCrocodocPreviews&&n.a.disableGooglePreviews)}
r.a.isPreviewable=function(e,t){return r.a.filePreviewsEnabled()&&l[e]&&(!t||!n.a["disable"+r.a.capitalize(t)+"Previews"]&&l[e][{scribd:0,google:1}[t]])}
r.a.fn.loadDocPreview=function(e){return this.each(function(){var t=r()(this),i=r.a.extend({width:"100%",height:"400px"},t.data(),e)
function o(e){if(i.attachment_view_inline_ping_url){r.a.ajaxJSON(i.attachment_view_inline_ping_url,"POST",{},function(){},function(){})
r.a.trackEvent("Doc Previews",e,JSON.stringify(i,["attachment_id","submission_id","mimetype","crocodoc_session_url","canvadoc_session_url"]))}}if(!n.a.disableCrocodocPreviews&&i.crocodoc_session_url){var s=Object(c.a)(i.crocodoc_session_url);(u=r()("<iframe/>",{src:s,width:i.width,height:i.height,allowfullscreen:"1",id:i.id})).appendTo(t)
u.load(function(){o("crocodoc")
r.a.isFunction(i.ready)&&i.ready()})}else if(i.canvadoc_session_url){var l=r()('<div style="overflow: auto; resize: vertical;        border: 1px solid transparent; height: 100%;"/>')
l.appendTo(t)
var u,m=void 0!==i.iframe_min_height?i.iframe_min_height:"800px",_=Object(c.a)(i.canvadoc_session_url);(u=r()("<iframe/>",{src:_,width:i.width,allowfullscreen:"1",css:{border:0,overflow:"auto",height:"99%","min-height":m},id:i.id})).appendTo(l)
u.load(function(){o("canvadocs")
r.a.isFunction(i.ready)&&i.ready()})}else if(!n.a.disableGooglePreviews&&(!i.mimetype||r.a.isPreviewable(i.mimetype,"google"))&&i.attachment_id||i.public_url){var h=function(){var e="//docs.google.com/viewer?"+r.a.param({embedded:!0,url:i.public_url})
i.ajax_valid&&!i.ajax_valid()||r()('<iframe src="'+Object(d.a)(e)+'" height="'+i.height+'" width="100%" />').appendTo(t).load(function(){o("google")
r.a.isFunction(i.ready)&&i.ready()})}
if(i.public_url)h()
else if(i.attachment_id){var f="/api/v1/files/"+i.attachment_id+"/public_url.json"
i.submission_id&&(f+="?"+r.a.param({submission_id:i.submission_id}))
t.loadingImage()
r.a.ajaxJSON(f,"GET",{},function(e){t.loadingImage("remove")
if(e&&e.public_url){r.a.extend(i,e)
h()}})}}else r.a.filePreviewsEnabled()&&(i.attachment_preview_processing?t.html("<p>"+Object(d.a)(a.a.t("errors.document_preview_processing","The document preview is currently being processed. Please try again later."))+"</p>"):t.html("<p>"+Object(d.a)(a.a.t("errors.cannot_view_document_in_canvas","This document cannot be displayed within Canvas."))+"</p>"))})}},LShObMQJhT:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("9vdLYFzxED")
function r(e){a()(e).on("error",function(e){e.currentTarget.src?a.a.get(e.currentTarget.src).fail(function(t){403===t.status?a()(e.currentTarget).attr({src:"/images/svg-icons/icon_lock.svg",alt:o.a.t("Locked image"),width:100,height:100}):a()(e.currentTarget).addClass("broken-image")}):a()(e.currentTarget).addClass("broken-image")})}a()(document).ready(function(){a()('img[src!=""]').toArray().forEach(r)})},Ll3RqVTR9W:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("V0w+T+7agK"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("instructure_inline_media_comment")},"Lv2o/qLTOe":function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{editor_accessibility:{accessibles:{background_color:"\u0644\u0648\u0646 \u0627\u0644\u062e\u0644\u0641\u064a\u0629\u060c \u0627\u0636\u063a\u0637 \u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u062a\u062d\u062f\u064a\u062f",forecolor:"\u0644\u0648\u0646 \u0627\u0644\u0646\u0635\u060c \u0627\u0636\u063a\u0637 \u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u062a\u062d\u062f\u064a\u062f"},titles:{font_size:"\u062d\u062c\u0645 \u0627\u0644\u062e\u0637\u060c \u0627\u0636\u063a\u0637 \u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u062a\u062d\u062f\u064a\u062f",formatting:"\u0627\u0644\u062a\u0646\u0633\u064a\u0642\u060c \u0627\u0636\u063a\u0637 \u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u062a\u062d\u062f\u064a\u062f",rte_help:"\u0645\u0646\u0637\u0642\u0629 \u0646\u0635 \u0645\u0646\u0633\u0642. \u0627\u0636\u063a\u0637 \u0639\u0644\u0649 ALT+F8 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629"}},rich_content_editor_2708ef21:"Rich Content Editor"},cy:{editor_accessibility:{accessibles:{background_color:"Lliw'r Cefndir, pwyswch i lawr i ddewis",forecolor:"Lliw'r Testun, pwyswch i lawr i ddewis"},titles:{font_size:"Maint y Ffont, pwyswch i lawr i ddewis",formatting:"Fformat, pwyswch i lawr i ddewis",rte_help:"Ardal Testun Cyfoethog. Pwyswch ALT+F8 i gael help"}},rich_content_editor_2708ef21:"Golygydd Cynnwys Cyfoethog"},da:{editor_accessibility:{accessibles:{background_color:"Baggrundsfarve, tryk ned for at v\xe6lge",forecolor:"Tekstfarve, tryk ned for at v\xe6lge"},titles:{font_size:"Skriftst\xf8rrelse, tryk ned for at v\xe6lge",formatting:"Formatering, tryk ned for at v\xe6lge",rte_help:"Omr\xe5de med RTF. Tryk p\xe5 ALT+F8 for hj\xe6lp"}},rich_content_editor_2708ef21:"Rich Content Editor"},"da-x-k12":{editor_accessibility:{accessibles:{background_color:"Baggrundsfarve, tryk ned for at v\xe6lge",forecolor:"Tekstfarve, tryk ned for at v\xe6lge"},titles:{font_size:"Skriftst\xf8rrelse, tryk ned for at v\xe6lge",formatting:"Formatering, tryk ned for at v\xe6lge",rte_help:"Omr\xe5de med RTF. Tryk p\xe5 ALT+F8 for hj\xe6lp"}},rich_content_editor_2708ef21:"Rich Content Editor"},de:{editor_accessibility:{accessibles:{background_color:"Hintergrundfarbe, zum Ausw\xe4hlen Pfeil-nach-unten dr\xfccken",forecolor:"Textfarbe, zum Auswahlen Pfeil-nach-unten dr\xfccken"},titles:{font_size:"Schriftgr\xf6\xdfe, zum Ausw\xe4hlen Pfeil-nach-unten dr\xfccken",formatting:"Formatierung, zum Ausw\xe4hlen Pfeil-nach-unten dr\xfccken",rte_help:"Rich Text-Bereich. F\xfcr Hilfe <Alt>+F8 dr\xfccken"}},rich_content_editor_2708ef21:"Rich-Content-Editor"},el:{editor_accessibility:{accessibles:{background_color:"\u03a7\u03c1\u03ce\u03bc\u03b1 \u03a6\u03cc\u03bd\u03c4\u03bf\u03c5, \u03c0\u03b9\u03ad\u03c3\u03c4\u03b5 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae",forecolor:"\u03a7\u03c1\u03ce\u03bc\u03b1 \u039a\u03b5\u03b9\u03bc\u03ad\u03bd\u03bf\u03c5, \u03c0\u03b9\u03ad\u03c3\u03c4\u03b5 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae"},titles:{font_size:"\u039c\u03ad\u03b3\u03b5\u03b8\u03bf\u03c2 \u0393\u03c1\u03b1\u03bc\u03bc\u03b1\u03c4\u03bf\u03c3\u03b5\u03b9\u03c1\u03ac\u03c2, \u03c0\u03b9\u03ad\u03c3\u03c4\u03b5 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae",formatting:"\u039c\u03bf\u03c1\u03c6\u03bf\u03c0\u03bf\u03af\u03b7\u03c3\u03b7, \u03c0\u03b1\u03c4\u03ae\u03c3\u03c4\u03b5 \u03ba\u03ac\u03c4\u03c9 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae",rte_help:'<mrk mid="6144" mtype="seg">\u03a0\u03b5\u03c1\u03b9\u03bf\u03c7\u03ae Rich Text.</mrk> <mrk mid="6145" mtype="seg">\u03a0\u03b1\u03c4\u03ae\u03c3\u03c4\u03b5 ALT+F8 \u03b3\u03b9\u03b1 \u03b2\u03bf\u03ae\u03b8\u03b5\u03b9\u03b1</mrk>'}},rich_content_editor_2708ef21:"\u0395\u03c0\u03b5\u03be\u03b5\u03c1\u03b3\u03b1\u03c3\u03c4\u03ae\u03c2 \u03a0\u03bb\u03bf\u03cd\u03c3\u03b9\u03bf\u03c5 \u03a0\u03b5\u03c1\u03b9\u03b5\u03c7\u03bf\u03bc\u03ad\u03bd\u03bf\u03c5-rich content"},"en-AU":{editor_accessibility:{accessibles:{background_color:"Background Colour, press down to select",forecolor:"Text Colour, press down to select"},titles:{font_size:"Font Size, press down to select",formatting:"Formatting, press down to select",rte_help:"Rich Text Area. Press ALT+F8 for help."}},rich_content_editor_2708ef21:"Rich Content Editor"},"en-CA":{editor_accessibility:{accessibles:{background_color:"Background Color, press down to select",forecolor:"Text Color, press down to select"},titles:{font_size:"Font Size, press down to select",formatting:"Formatting, press down to select",rte_help:"Rich Text Area. Press ALT+F8 for help"}},rich_content_editor_2708ef21:"Rich Content Editor"},"en-GB":{editor_accessibility:{accessibles:{background_color:"Background colour. Press down to select",forecolor:"Text colour. Press down to select"},titles:{font_size:"Font size. Press down to select",formatting:"Formatting. Press down to select",rte_help:"Rich Text Area. Press ALT+F8 for help"}},rich_content_editor_2708ef21:"Rich Content Editor"},"en-GB-x-lbs":{editor_accessibility:{accessibles:{background_color:"Background colour. Press down to select",forecolor:"Text colour. Press down to select"},titles:{font_size:"Font size. Press down to select",formatting:"Formatting. Press down to select",rte_help:"Rich Text Area. Press ALT+F8 for help"}},rich_content_editor_2708ef21:"Rich Content Editor"},"en-GB-x-ukhe":{editor_accessibility:{accessibles:{background_color:"Background colour. Press down to select",forecolor:"Text colour. Press down to select"},titles:{font_size:"Font size. Press down to select",formatting:"Formatting. Press down to select",rte_help:"Rich Text Area. Press ALT+F8 for help"}},rich_content_editor_2708ef21:"Rich Content Editor"},es:{editor_accessibility:{accessibles:{background_color:"Color de fondo, pulse abajo para seleccionar",forecolor:"Color de texto, pulse abajo para seleccionar"},titles:{font_size:"Tama\xf1o del texto, pulse abajo para seleccionar",formatting:"Formato, pulse abajo para seleccionar",rte_help:"\xc1rea del texto enriquecido. Presione ALT+F8 para ayuda"}},rich_content_editor_2708ef21:"Editor de contenido enriquecido"},fa:{editor_accessibility:{accessibles:{background_color:"\u0631\u0646\u06af \u067e\u0633 \u0632\u0645\u06cc\u0646\u0647\u060c \u06a9\u0644\u06cc\u062f down \u0631\u0627 \u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u0641\u0634\u0627\u0631 \u062f\u0647\u06cc\u062f",forecolor:"\u0631\u0646\u06af \u0645\u062a\u0646\u060c \u06a9\u0644\u06cc\u062f down \u0631\u0627 \u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u0641\u0634\u0627\u0631 \u062f\u0647\u06cc\u062f"},titles:{font_size:"\u0627\u0646\u062f\u0627\u0632\u0647 \u0642\u0644\u0645\u060c \u06a9\u0644\u06cc\u062f down \u0631\u0627 \u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u0641\u0634\u0627\u0631 \u062f\u0647\u06cc\u062f",formatting:"\u062f\u0631 \u062d\u0627\u0644 \u0642\u0627\u0644\u0628 \u0628\u0646\u062f\u06cc\u060c \u06a9\u0644\u06cc\u062f down \u0631\u0627 \u0628\u0631\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628 \u0641\u0634\u0627\u0631 \u062f\u0647\u06cc\u062f",rte_help:"\u0642\u0633\u0645\u062a \u062f\u0627\u0631\u0627\u06cc \u0645\u062a\u0646 \u063a\u0646\u06cc. ALT+F8 \u0631\u0627 \u0628\u0631\u0627\u06cc \u0631\u0627\u0647\u0646\u0645\u0627\u06cc\u06cc \u0641\u0634\u0627\u0631 \u062f\u0647\u06cc\u062f."}},rich_content_editor_2708ef21:"\u0648\u06cc\u0631\u0627\u06cc\u0634\u06af\u0631 \u0645\u062d\u062a\u0648\u0627\u06cc \u063a\u0646\u06cc"},fr:{editor_accessibility:{accessibles:{background_color:"Couleur de fond. Appuyez pour s\xe9lectionner.",forecolor:"Couleur du texte. Appuyez pour s\xe9lectionner."},titles:{font_size:"Taille du texte. Appuyez pour s\xe9lectionner.",formatting:"Mise en forme. Appuyez pour s\xe9lectionner.",rte_help:"Zone de texte enrichi. Presser ALT+F8 pour obtenir de l'aide"}},rich_content_editor_2708ef21:"\xc9diteur de texte enrichi"},"fr-CA":{editor_accessibility:{accessibles:{background_color:"Couleur de fond. Appuyez pour s\xe9lectionner.",forecolor:"Couleur du texte. Appuyez pour s\xe9lectionner."},titles:{font_size:"Taille du texte. Appuyez pour s\xe9lectionner.",formatting:"Mise en forme. Appuyez pour s\xe9lectionner.",rte_help:"Zone de texte enrichi. Presser ALT+F8 pour obtenir de l'aide"}},rich_content_editor_2708ef21:"\xc9diteur de texte enrichi"},he:{editor_accessibility:{accessibles:{background_color:"\u05e6\u05d1\u05e2 \u05e8\u05e7\u05e2, \u05d9\u05e9 \u05dc\u05d4\u05e7\u05d9\u05e9 \u05db\u05d3\u05d9 \u05dc\u05d1\u05d7\u05d5\u05e8",forecolor:"\u05e6\u05d1\u05e2 \u05d8\u05e7\u05e1\u05d8, \u05d9\u05e9 \u05dc\u05d4\u05e7\u05d9\u05e9 \u05db\u05d3\u05d9 \u05dc\u05d1\u05d7\u05d5\u05e8"},titles:{font_size:"\u05d2\u05d5\u05d3\u05dc \u05d0\u05d5\u05ea, \u05d9\u05e9 \u05dc\u05d4\u05e7\u05d9\u05e9 \u05db\u05d3\u05d9 \u05dc\u05d1\u05d7\u05d5\u05e8",formatting:"\u05e2\u05d9\u05e6\u05d5\u05d1, \u05d9\u05e9 \u05dc\u05d4\u05e7\u05d9\u05e9 \u05db\u05d3\u05d9 \u05dc\u05d1\u05d7\u05d5\u05e8",rte_help:"\u05d0\u05d9\u05d6\u05d5\u05e8 \u05ea\u05d5\u05db\u05df \u05e2\u05e9\u05d9\u05e8. \u05d9\u05e9 \u05dc\u05d4\u05e7\u05d9\u05e9 ALT+F8 \u05dc\u05e2\u05d6\u05e8\u05d4"}},rich_content_editor_2708ef21:"\u05e2\u05d5\u05e8\u05da \u05ea\u05d5\u05db\u05df \u05e2\u05e9\u05d9\u05e8"},ht:{editor_accessibility:{accessibles:{background_color:"Koul\xe8 Fon, peze anba pou ka seleksyone",forecolor:"Koul\xe8 T\xe8ks, peze anba pou ka seleksyone"},titles:{font_size:"Gwos\xe8 T\xe8ks, peze anba pou ka seleksyone",formatting:"F\xf2mataj, peze anba pou ka seleksyone",rte_help:"Z\xf2n T\xe8ks Rich. Peze ALT+F8 pou \xe8d"}},rich_content_editor_2708ef21:"Edit\xe8 Kontni Rich"},hu:{editor_accessibility:{accessibles:{background_color:"H\xe1tt\xe9rsz\xedn, nyomja le a kiv\xe1laszt\xe1shoz",forecolor:"Sz\xf6vegsz\xedn, nyomja le a kiv\xe1laszt\xe1shoz"},titles:{font_size:"Bet\u0171m\xe9ret, nyomja le a kiv\xe1laszt\xe1shoz",formatting:"Form\xe1z\xe1s, nyomja le a kiv\xe1laszt\xe1shoz",rte_help:"Vizu\xe1lis sz\xf6vegter\xfclet, nyomja le az ALT+F8-at a seg\xedts\xe9ghez"}},rich_content_editor_2708ef21:"Vizu\xe1lis sz\xf6vegszerkeszt\u0151"},hy:{editor_accessibility:{accessibles:{background_color:"\u0556\u0578\u0576\u056b \u0563\u0578\u0582\u0575\u0576, \u0568\u0576\u057f\u0580\u0565\u056c\u0578\u0582 \u0570\u0561\u0574\u0561\u0580 \u057d\u0565\u0572\u0574\u0565\u0584 \u0576\u0565\u0580\u0584\u0587",forecolor:"\u054f\u0565\u0584\u057d\u057f\u056b \u0563\u0578\u0582\u0575\u0576, \u0568\u0576\u057f\u0580\u0565\u056c\u0578\u0582 \u0570\u0561\u0574\u0561\u0580 \u057d\u0565\u0572\u0574\u0565\u0584 \u0576\u0565\u0580\u0584\u0587"},titles:{font_size:"\u054f\u0561\u057c\u0565\u0580\u056b \u0579\u0561\u0583, \u0568\u0576\u057f\u0580\u0565\u056c\u0578\u0582 \u0570\u0561\u0574\u0561\u0580 \u057d\u0565\u0572\u0574\u0565\u0584 \u0576\u0565\u0580\u0584\u0587",formatting:"\u0556\u0578\u0580\u0574\u0561\u057f\u0561\u057e\u0578\u0580\u0578\u0582\u0574, \u0568\u0576\u057f\u0580\u0565\u056c\u0578\u0582 \u0570\u0561\u0574\u0561\u0580 \u057d\u0565\u0572\u0574\u0565\u0584 \u0576\u0565\u0580\u0584\u0587",rte_help:"\u0556\u0578\u0580\u0574\u0561\u057f\u0561\u057e\u0578\u0580\u057e\u0561\u056e \u057f\u0565\u0584\u057d\u057f\u056b \u0564\u0561\u0577\u057f, \u057f\u0565\u0572\u0565\u056f\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u056b \u0570\u0561\u0574\u0561\u0580 \u057d\u0565\u0572\u0574\u0565\u056c ALT+F8 "}},rich_content_editor_2708ef21:"\u0556\u0578\u0580\u0574\u0561\u057f\u0561\u057e\u0578\u0580\u057e\u0561\u056e \u057f\u0565\u0584\u057d\u057f\u056b \u056d\u0574\u0562\u0561\u0563\u056b\u0580"},is:{editor_accessibility:{accessibles:{background_color:"Bakgrunnslitur, \xfdttu \xe1 ni\xf0ur\xf6r til a\xf0 velja",forecolor:"Textalitur, \xfdttu \xe1 ni\xf0ur\xf6r til a\xf0 velja"},titles:{font_size:"Stafast\xe6r\xf0, \xfdttu \xe1 ni\xf0ur\xf6r til a\xf0 velja",formatting:"Forsn\xed\xf0, \xfdttu \xe1 ni\xf0ur\xf6r til a\xf0 velja",rte_help:"M\xf3ta\xf0 textasv\xe6\xf0i. \xddttu \xe1 ALT+F8 til a\xf0 f\xe1 hj\xe1lp"}},rich_content_editor_2708ef21:"Rich Content ritill"},it:{editor_accessibility:{accessibles:{background_color:"Colore sfondo, premi per selezionare",forecolor:"Colore testo, premi per selezionare"},titles:{font_size:"Dimensioni carattere, premi per selezionare",formatting:"Formattazione, premi per selezionare",rte_help:"Area di testo RTF. Premi ALT+F8 per la Guida"}},rich_content_editor_2708ef21:"Editor di contenuti avanzati"},ja:{editor_accessibility:{accessibles:{background_color:"\u80cc\u666f\u8272\u3001\u62bc\u3057\u3066\u9078\u629e",forecolor:"\u30c6\u30ad\u30b9\u30c8\u8272\u3001\u62bc\u3057\u3066\u9078\u629e"},titles:{font_size:"\u30d5\u30a9\u30f3\u30c8 \u30b5\u30a4\u30ba\u3001\u62bc\u3057\u3066\u9078\u629e",formatting:"\u66f8\u5f0f\u8a2d\u5b9a\u3001\u62bc\u3057\u3066\u9078\u629e",rte_help:"\u30ea\u30c3\u30c1\u30c6\u30ad\u30b9\u30c8\u30a8\u30ea\u30a2\u3002\u30d8\u30eb\u30d7\u3078\u306f\u3001ALT+F8\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044"}},rich_content_editor_2708ef21:"\u30ea\u30c3\u30c1 \u30b3\u30f3\u30c6\u30f3\u30c4 \u30a8\u30c7\u30a3\u30bf"},ko:{editor_accessibility:{accessibles:{background_color:"\ubc30\uacbd\uc0c9, \uc120\ud0dd\ud558\ub824\uba74 \ub204\ub984",forecolor:"\ud14d\uc2a4\ud2b8 \uc0c9, \uc120\ud0dd\ud558\ub824\uba74 \ub204\ub984"},titles:{font_size:"\uae00\uc790 \ud06c\uae30, \uc120\ud0dd\ud558\ub824\uba74 \ub204\ub984",formatting:"\uc11c\uc2dd, \uc120\ud0dd\ud558\ub824\uba74 \ub204\ub984",rte_help:"Rich Text Area. Press ALT+F8 for help"}}},mi:{editor_accessibility:{accessibles:{background_color:"Tae Papamuri, ki te p\u0113hi ki raro t\u012bpako",forecolor:"Tae Kuputuhi, ki te p\u0113hi ki raro t\u012bpako"},titles:{font_size:"Rahi Momotuhi, ki te p\u0113hi ki raro t\u012bpako",formatting:"Whakah\u014dputu, ki te p\u0113hi ki raro t\u012bpako",rte_help:"Horahanga Kupu Taunaki. P\u0113hi ALT + K8 no te tauturu"}},rich_content_editor_2708ef21:"\u0112tita Ihirangi Whai Rawa"},nb:{editor_accessibility:{accessibles:{background_color:"Bakgrunnsfarge, trykk nedover for \xe5 velge",forecolor:"Tekstfarge, trykk nedover for \xe5 velge"},titles:{font_size:"Skriftst\xf8rrelse, trykk nedover for \xe5 velge",formatting:"Formatering, trykk nedover for \xe5 velge",rte_help:"Riktekstomr\xe5de. Trykk ALT+F8 for hjelp"}},rich_content_editor_2708ef21:"Rich innholdsredigering"},"nb-x-k12":{editor_accessibility:{accessibles:{background_color:"Bakgrunnsfarge, trykk nedover for \xe5 velge",forecolor:"Tekstfarge, trykk nedover for \xe5 velge"},titles:{font_size:"Skriftst\xf8rrelse, trykk nedover for \xe5 velge",formatting:"Formatering, trykk nedover for \xe5 velge",rte_help:"Riktekstomr\xe5de. Trykk ALT+F8 for hjelp"}},rich_content_editor_2708ef21:"Rich innholdsredigering"},nl:{editor_accessibility:{accessibles:{background_color:"Achtergrondkleur, er op drukken om een optie te selecteren",forecolor:"Tekstkleur, er op drukken om een optie te selecteren"},titles:{font_size:"Tekstkleur, er op drukken om een optie te selecteren",formatting:"Opmaak, er op drukken om een optie te selecteren",rte_help:"Rich Text Area. Druk ALT+F8 voor hulp"}},rich_content_editor_2708ef21:"Rich Content Editor"},nn:{editor_accessibility:{accessibles:{background_color:"Bakgrunnsfarge, trykk ned for \xe5 velje",forecolor:"Tekstfarge, trykk ned for \xe5 velje"},titles:{font_size:"Skriftstorleik, trykk ned for \xe5 velje",formatting:"Formatering, trykk ned for \xe5 velje",rte_help:"Omr\xe5de for rikt tekstformat. Trykk ALT+F8 for hjelp"}},rich_content_editor_2708ef21:"Redigeringsprogram for rikt innhald"},pl:{editor_accessibility:{accessibles:{background_color:"Kolor t\u0142a; naciskaj do do\u0142u, aby wybra\u0107",forecolor:"Kolor tekstu; naciskaj do do\u0142u, aby wybra\u0107"},titles:{font_size:"Rozmiar czcionki; naciskaj do do\u0142u, aby wybra\u0107",formatting:"Formatowanie; naciskaj do do\u0142u, aby wybra\u0107",rte_help:"Obszar Rich Text. Wci\u015bnij ALT+F8 po pomoc"}},rich_content_editor_2708ef21:"Edytor wzbogaconej zawarto\u015bci"},pt:{editor_accessibility:{accessibles:{background_color:"Cor de fundo, premir para baixo para selecionar",forecolor:"Cor do texto, premir para baixo para selecionar"},titles:{font_size:"Tamanho da letra, premir para baixo para selecionar",formatting:"Formata\xe7\xe3o, premir para baixo para selecionar",rte_help:"\xc1rea Rich Text. Pressione ALT+F8 para ajuda"}},rich_content_editor_2708ef21:"Editor de conte\xfado avan\xe7ado"},"pt-BR":{editor_accessibility:{accessibles:{background_color:"Cor de fundo, pressione para selecionar",forecolor:"Cor do texto, pressione para selecionar"},titles:{font_size:"Tamanho da fonte, pressione para selecionar",formatting:"Formata\xe7\xe3o, pressione para selecionar",rte_help:"\xc1rea de Texto Rico. Pressione ALT + F8 para obter ajuda"}},rich_content_editor_2708ef21:"Editor de conte\xfado de rich text"},ru:{editor_accessibility:{accessibles:{background_color:"\u0426\u0432\u0435\u0442 \u0444\u043e\u043d\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0441\u0442\u0440\u0435\u043b\u043a\u0443 \u0432\u043d\u0438\u0437, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c",forecolor:"\u0426\u0432\u0435\u0442 \u0442\u0435\u043a\u0441\u0442\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0441\u0442\u0440\u0435\u043b\u043a\u0443 \u0432\u043d\u0438\u0437, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c"},titles:{font_size:"\u0420\u0430\u0437\u043c\u0435\u0440 \u0448\u0440\u0438\u0444\u0442\u0430, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0441\u0442\u0440\u0435\u043b\u043a\u0443 \u0432\u043d\u0438\u0437, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c",formatting:"\u0424\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0441\u0442\u0440\u0435\u043b\u043a\u0443 \u0432\u043d\u0438\u0437, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c",rte_help:"\u041e\u0431\u043b\u0430\u0441\u0442\u044c \u0444\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0433\u043e \u0442\u0435\u043a\u0441\u0442\u0430. \u041d\u0430\u0436\u043c\u0438\u0442\u0435 ALT + F8 \u0434\u043b\u044f \u0441\u043f\u0440\u0430\u0432\u043a\u0438"}},rich_content_editor_2708ef21:"\u0420\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u0444\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0433\u043e \u0442\u0435\u043a\u0441\u0442\u0430"},sl:{editor_accessibility:{accessibles:{background_color:"Barva ozadja; za izbiro pritisnite navzdol.",forecolor:"Barva besedila; za izbiro pritisnite navzdol."},titles:{font_size:"Velikost pisave; za izbiro pritisnite navzdol.",formatting:"Oblikovanje; za izbiro pritisnite navzdol.",rte_help:"Obmo\u010dje besedila Za pomo\u010d pritisnite ALT+F8."}},rich_content_editor_2708ef21:"Urejevalnik"},sv:{editor_accessibility:{accessibles:{background_color:"Bakgrundsf\xe4rg, tryck ner f\xf6r att v\xe4lja",forecolor:"Textf\xe4rg, tryck ner f\xf6r att v\xe4lja"},titles:{font_size:"Typsnittsstorlek, trycker ner f\xf6r att v\xe4lja",formatting:"Formatering, tryck ner f\xf6r att v\xe4lja",rte_help:"Rik text-omr\xe5de. Tryck ALT+F8 f\xf6r hj\xe4lp"}},rich_content_editor_2708ef21:"Inneh\xe5llsredigerare"},"sv-x-k12":{editor_accessibility:{accessibles:{background_color:"Bakgrundsf\xe4rg, tryck ner f\xf6r att v\xe4lja",forecolor:"Textf\xe4rg, tryck ner f\xf6r att v\xe4lja"},titles:{font_size:"Typsnittsstorlek, trycker ner f\xf6r att v\xe4lja",formatting:"Formatering, tryck ner f\xf6r att v\xe4lja",rte_help:"Rik text-omr\xe5de. Tryck ALT+F8 f\xf6r hj\xe4lp"}},rich_content_editor_2708ef21:"Inneh\xe5llsredigerare"},tr:{editor_accessibility:{accessibles:{background_color:"Arkaplan rengi, a\u015fa\u011f\u0131 tu\u015fa bas\u0131n ve se\xe7in",forecolor:"Yaz\u0131 rengi, a\u015fa\u011f\u0131 tu\u015fa bas\u0131n ve se\xe7in"},titles:{font_size:"Yaz\u0131 b\xfcy\xfckl\xfc\u011f\xfc, a\u015fa\u011f\u0131 tu\u015fa bas\u0131n ve se\xe7in",formatting:"Format, a\u015fa\u011f\u0131 tu\u015fa bas\u0131n ve se\xe7in",rte_help:"Zengin Metin Alan\u0131. Yard\u0131m i\xe7in ALT+F8 e bas\u0131n"}},rich_content_editor_2708ef21:"Zengin \u0130\xe7erik Edit\xf6r\xfc"},uk:{editor_accessibility:{accessibles:{background_color:"\u041a\u043e\u043b\u0456\u0440 \u0444\u043e\u043d\u0443, \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0432\u043d\u0438\u0437\u0443, \u0449\u043e\u0431 \u043e\u0431\u0440\u0430\u0442\u0438",forecolor:"\u041a\u043e\u043b\u0456\u0440 \u0442\u0435\u043a\u0441\u0442\u0443, \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0432\u043d\u0438\u0437\u0443, \u0449\u043e\u0431 \u043e\u0431\u0440\u0430\u0442\u0438"},titles:{font_size:"\u0420\u043e\u0437\u043c\u0456\u0440 \u0448\u0440\u0438\u0444\u0442\u0443, \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0432\u043d\u0438\u0437\u0443, \u0449\u043e\u0431 \u043e\u0431\u0440\u0430\u0442\u0438",formatting:"\u0424\u043e\u0440\u043c\u0430\u0442\u0443\u0432\u0430\u043d\u043d\u044f, \u043d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0432\u043d\u0438\u0437\u0443, \u0449\u043e\u0431 \u0432\u0438\u0431\u0440\u0430\u0442\u0438",rte_help:"\u0411\u0430\u0433\u0430\u0442\u043e\u0444\u0443\u043d\u043a\u0446\u0456\u043e\u043d\u0430\u043b\u044c\u043d\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u0442\u0435\u043a\u0441\u0442\u0443. \u041d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c ALT+F8 \u0434\u043b\u044f \u0434\u043e\u0432\u0456\u0434\u043a\u0438"}},rich_content_editor_2708ef21:"\u041f\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0439 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0443"},"zh-Hans":{editor_accessibility:{accessibles:{background_color:"\u80cc\u666f\u989c\u8272\uff0c\u6309\u4e0b\u5373\u53ef\u9009\u62e9",forecolor:"\u6587\u672c\u989c\u8272\uff0c\u6309\u4e0b\u5373\u53ef\u9009\u62e9"},titles:{font_size:"\u5b57\u4f53\u5927\u5c0f\uff0c\u6309\u4e0b\u5373\u53ef\u9009\u62e9",formatting:"\u683c\u5f0f\uff0c\u6309\u4e0b\u5373\u53ef\u9009\u62e9",rte_help:"\u5bcc\u6587\u672c\u533a\u57df\uff0c\u6309 Alt+ F8 \u5bfb\u6c42\u5e2e\u52a9"}},rich_content_editor_2708ef21:"\u5bcc\u5185\u5bb9\u7f16\u8f91\u5668"},"zh-Hant":{editor_accessibility:{accessibles:{background_color:"\u80cc\u666f\u984f\u8272\uff0c\u6309\u4e0b\u4ee5\u9078\u64c7",forecolor:"\u6587\u5b57\u984f\u8272\uff0c\u6309\u4e0b\u4ee5\u9078\u64c7"},titles:{font_size:"\u5b57\u9ad4\u5927\u5c0f\uff0c\u6309\u4e0b\u4ee5\u9078\u64c7",formatting:"\u683c\u5f0f\u5316\uff0c\u6309\u4e0b\u4ee5\u9078\u64c7",rte_help:"\u5bcc\u6587\u672c\u5340\u57df\u3002\u6309 ALT+F8 \u6c42\u52a9"}},rich_content_editor_2708ef21:"\u5bcc\u5167\u5bb9\u7de8\u8f2f\u5668"}}})},"NDO/g0y6Bx":function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("M4fFHvVeAA"),r=(i.n(o),{ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,PAGE_UP:33,PAGE_DOWN:34,M:77,F:70,G_REWIND:227,G_FORWARD:228}),s={captions:".mejs-captions-button",fullscreen:".mejs-fullscreen-button",playpause:".mejs-playpause-button",progress:".mejs-time-rail",source:".mejs-sourcechooser-button",speed:".mejs-speed-button",volume:".mejs-volume-button"}
function d(e,t){var i=e.filter(t).first(),n=e.index(i)
return n<0?0:n}function c(e,t,i,n){this.player=t
this.media=i
this.event=n
this.keyCode=n.keyCode
this.isFullScreen=e.MediaFeatures.hasTrueNativeFullScreen&&e.MediaFeatures.isFullScreen()||t.isFullScreen
this.isFirefox=e.MediaFeatures.isFirefox}c.keyCodes=r
c.prototype._targetControl=function(e){return a()(this.event.target).closest(e)}
c.prototype.handlerKey=function(){var e=this
return Object(o.findKey)(s,function(t){return e._targetControl(t).length})||"player"}
c.prototype.dispatch=function(){this.event.preventDefault()
this["".concat(this.handlerKey(),"Handler")]()}
c.prototype.captionsHandler=function(){var e,t=this.player,i=this.event,n=a()(t.captionsButton).find(".mejs-captions-selector input[type=radio]"),o=d(n,function(e,i){return"none"===i.value&&null==t.selectedTrack||t.selectedTrack&&i.value===t.selectedTrack.srclang})
switch(this.keyCode){case r.DOWN:e=Math.min(o+1,n.length-1)
n.slice(e).first().focus().click()
break
case r.UP:e=Math.max(o-1,0)
n.slice(e).first().focus().click()
break
case r.ENTER:"a"===i.target.tagName.toLowerCase()&&a()(i.target)[0].click()}}
c.prototype.fullscreenHandler=function(){var e=this.player,t=this.event
switch(this.keyCode){case r.SPACE:if(this.isFirefox)break
case r.ENTER:a()(t.target)[0].click()
break
case r.ESC:this.isFullScreen&&e.exitFullScreen()}}
c.prototype.playpauseHandler=function(){var e,t=this.player,i=this.media
switch(this.keyCode){case r.LEFT:case r.DOWN:case r.G_REWIND:e=Math.max(i.currentTime-t.options.defaultSeekBackwardInterval(i),0)
i.setCurrentTime(e)
break
case r.RIGHT:case r.UP:case r.G_FORWARD:e=Math.min(i.currentTime+t.options.defaultSeekForwardInterval(i),i.duration)
i.setCurrentTime(e)
break
case r.PAGE_DOWN:e=Math.max(i.currentTime-t.options.defaultJumpBackwardInterval(i),0)
i.setCurrentTime(e)
break
case r.PAGE_UP:e=Math.min(i.currentTime+t.options.defaultJumpForwardInterval(i),i.duration)
i.setCurrentTime(e)
break
case r.SPACE:if(this.isFirefox)break
case r.ENTER:i.paused?i.play():i.pause()}}
c.prototype.progressHandler=function(){}
c.prototype.sourceHandler=function(){var e,t=this.player,i=a()(t.sourcechooserButton).find(".mejs-sourcechooser-selector input[type=radio]"),n=d(i,function(e,i){return i.value===t.media.src})
switch(this.keyCode){case r.DOWN:e=Math.min(n+1,i.length-1)
i.slice(e).first().focus().click()
break
case r.UP:e=Math.max(n-1,0)
i.slice(e).first().focus().click()}}
c.prototype.speedHandler=function(){var e,t=this.player,i=a()(t.speedButton).find(".mejs-speed-selector input[type=radio]"),n=d(i,function(e,i){return parseFloat(i.value)===t.media.playbackRate})
switch(this.keyCode){case r.DOWN:e=Math.min(n+1,i.length-1)
i.slice(e).first().focus().click()
break
case r.UP:e=Math.max(n-1,0)
i.slice(e).first().focus().click()}}
c.prototype.volumeHandler=function(){var e,t=this.player,i=this.media
switch(this.keyCode){case r.SPACE:if(this.isFirefox)break
case r.ENTER:t.setMuted(!t.media.muted)
break
case r.LEFT:e=Math.max(0,i.volume-.1)
i.setVolume(e)
break
case r.RIGHT:e=Math.min(i.volume+.1,1)
i.setVolume(e)
break
case r.PAGE_DOWN:e=Math.max(0,i.volume-.5)
i.setVolume(e)
break
case r.PAGE_UP:e=Math.min(i.volume+.5,1)
i.setVolume(e)}}
c.prototype.playerHandler=function(){var e,t,i=this.player,n=this.media,o=this.event
switch(this.keyCode){case r.LEFT:case r.G_REWIND:e=Math.max(n.currentTime-i.options.defaultSeekBackwardInterval(n),0)
n.setCurrentTime(e)
break
case r.RIGHT:case r.G_FORWARD:e=Math.min(n.currentTime+i.options.defaultSeekForwardInterval(n),n.duration)
n.setCurrentTime(e)
break
case r.PAGE_DOWN:e=Math.max(n.currentTime-i.options.defaultJumpBackwardInterval(n),0)
n.setCurrentTime(e)
break
case r.PAGE_UP:e=Math.min(n.currentTime+i.options.defaultJumpForwardInterval(n),n.duration)
n.setCurrentTime(e)
break
case r.F:a()(o.target).find(".mejs-fullscreen-button > button")[0].click()
break
case r.UP:t=n.volume
n.setVolume(Math.min(t+.1,1))
break
case r.DOWN:t=n.volume
n.setVolume(Math.max(0,t-.1))
break
case r.M:i.setMuted(!i.media.muted)
break
case r.SPACE:if(this.isFirefox)break
case r.ENTER:n.paused?n.play():n.pause()}}
t.a=c},OGUJHwbmJb:function(e,t,i){"use strict"
var n,a=i("TCzg8/TAum"),o=i("iBw8ZGM6v8"),r=i.n(o),s=i("yvh8ynczHv"),d=i.n(s),c=i("mOY9BNujNR"),l=i.n(c),u=i("eJBzaBDd6c"),m=(i("D2yEjZ1CP5"),i("Q4xR9Iqymk"),i("pmU8As9kkw"),i("kzdUuF07HD"),i("3pTo86YxQs"),i("11DZr9oB9c"),function(e){return e.default?e.default:e})
l.a.mediaComment=function(e,t,i){var n=l()("<div/>")
l()("body").append(n.hide())
l.a.fn.mediaComment.apply(n,arguments)}
l.a.mediaComment.partnerData=function(e){var t={context_code:l.a.mediaComment.contextCode(),root_account_id:ENV.DOMAIN_ROOT_ACCOUNT_ID,context_source:ENV.CONTEXT_ACTION_SOURCE}
ENV.SIS_SOURCE_ID&&(t.sis_source_id=ENV.SIS_SOURCE_ID)
ENV.SIS_USER_ID&&(t.sis_user_id=ENV.SIS_USER_ID)
return JSON.stringify(t)}
l.a.mediaComment.contextCode=function(){return ENV.context_asset_string||"user_"+ENV.current_user_id}
function _(e,t){var i=l.a.mediaComment.contextCode(),n={2:"image",5:"audio"}[e.mediaType]||t?"audio":"video"
i&&l.a.ajaxJSON("/media_objects","POST",{id:e.entryId,type:n,context_code:i,title:e.title,user_entered_title:e.userTitle},function(e){d.a.publish("media_object_created",e)},l.a.noop)
d.a.publish("media_comment_created",{id:e.entryId,mediaType:n,title:e.userTitle})}var h={}
l.a.mediaComment.entryAdded=function(e,t,i,n){if(e&&!h[e]){h[e]=!0
_({mediaType:t,entryId:e,title:i,userTitle:n})}}
l.a.mediaComment.audio_delegate={readyHandler:function(){try{l()("#audio_upload")[0].setMediaType("audio")}catch(e){l.a.mediaComment.upload_delegate.setupErrorHandler()}},selectHandler:function(){l.a.mediaComment.upload_delegate.selectHandler("audio")},singleUploadCompleteHandler:function(e){l.a.mediaComment.upload_delegate.singleUploadCompleteHandler("audio",e)},allUploadsCompleteHandler:function(){l.a.mediaComment.upload_delegate.allUploadsCompleteHandler("audio")},entriesAddedHandler:function(e){l.a.mediaComment.upload_delegate.entriesAddedHandler("audio",e)},progressHandler:function(e){l.a.mediaComment.upload_delegate.progressHandler("audio",e[0],e[1],e[2])},uploadErrorHandler:function(){l.a.mediaComment.upload_delegate.uploadErrorHandler("audio")}}
l.a.mediaComment.video_delegate={readyWatcher:null,expectReady:function(){l.a.mediaComment.video_delegate.readyWatcher||(l.a.mediaComment.video_delegate.readyWatcher=setTimeout(l.a.mediaComment.upload_delegate.setupErrorHandler,2e3))},readyHandler:function(){try{l()("#video_upload")[0].setMediaType("video")}catch(e){l.a.mediaComment.upload_delegate.setupErrorHandler()}clearTimeout(l.a.mediaComment.video_delegate.readyWatcher)
l.a.mediaComment.video_delegate.readyWatcher=!0},selectHandler:function(){l.a.mediaComment.upload_delegate.selectHandler("video")},singleUploadCompleteHandler:function(e){l.a.mediaComment.upload_delegate.singleUploadCompleteHandler("video",e)},allUploadsCompleteHandler:function(){l.a.mediaComment.upload_delegate.allUploadsCompleteHandler("video")},entriesAddedHandler:function(e){l.a.mediaComment.upload_delegate.entriesAddedHandler("video",e)},progressHandler:function(e){l.a.mediaComment.upload_delegate.progressHandler("video",e[0],e[1],e[2])},uploadErrorHandler:function(){l.a.mediaComment.upload_delegate.uploadErrorHandler("video")}}
l.a.mediaComment.upload_delegate={currentType:"audio",submit:function(){var e=l.a.mediaComment.upload_delegate.currentType,t=l()("#"+e+"_upload")[0].getFiles()
t.length>1&&l()("#"+e+"_upload")[0].removeFiles(0,t.length-2)
if(0!=(t=l()("#"+e+"_upload")[0].getFiles()).length){l()("#media_upload_progress").css("visibility","visible").progressbar({value:1})
l()("#media_upload_submit").attr("disabled",!0).text(a.a.t("messages.submitting","Submitting Media File..."))
l()("#"+e+"_upload")[0].upload()}},selectHandler:function(e){l.a.mediaComment.upload_delegate.currentType=e
try{var t=l()("#"+e+"_upload")[0].getFiles()}catch(e){l.a.mediaComment.upload_delegate.setupErrorHandler()
return}t.length>1&&l()("#"+e+"_upload")[0].removeFiles(0,t.length-2)
var i=l()("#"+e+"_upload")[0].getFiles()[0]
l()("#media_upload_settings .icon").attr("src","/images/file-"+e+".png")
l()("#media_upload_submit").show()
l()("#media_upload_submit").attr("disabled",!i)
l()("#media_upload_settings").css("visibility",i?"visible":"hidden")
l()("#media_upload_title").val(i.title)
l()("#media_upload_display_title").text(i.title)
l()("#media_upload_file_size").text(l.a.fileSize(i.bytesTotal))
l()("#media_upload_feedback_text").html("")
l()("#media_upload_feedback").css("visibility","hidden")
if(i.bytesTotal>INST.kalturaSettings.max_file_size_bytes){l()("#media_upload_feedback_text").html(a.a.t("errors.file_too_large","*This file is too large.* The maximum size is %{size}MB.",{size:INST.kalturaSettings.max_file_size_bytes/1048576,wrapper:"<b>$1</b>"}))
l()("#media_upload_feedback").css("visibility","visible")
l()("#media_upload_submit").hide()}else l()("#media_upload_submit").click()},singleUploadCompleteHandler:function(e,t){l()("#media_upload_progress").progressbar("option","value",100)},allUploadsCompleteHandler:function(e){l()("#media_upload_progress").progressbar("option","value",100)
l()("#"+e+"_upload")[0].addEntries()},entriesAddedHandler:function(e,t){l()("#media_upload_progress").progressbar("option","value",100)
var i=t[0]
l()("#media_upload_submit").text(a.a.t("messages.submitted","Submitted Media File!"))
setTimeout(function(){l()("#media_comment_dialog").dialog("close")},1500)
"audio"==e?i.entryType=5:"video"==e&&(i.entryType=1)
l.a.mediaComment.entryAdded(i.entryId,i.entryType,i.title)},progressHandler:function(e,t,i,n){var a=100*t/i
l()("#media_upload_progress").progressbar("option","value",a)},uploadErrorHandler:function(e){var t=l()("#"+e+"_upload")[0].getError()
l()("#media_upload_errors").text(a.a.t("errors.upload_failed","Upload failed with error:")+" "+t)
l()("#media_upload_progress").hide()},setupErrorHandler:function(){l()("#media_upload_feedback_text").text(a.a.t("errors.media_comment_installation_broken","Media comment uploading has not been set up properly. Please contact your administrator."))
l()("#media_upload_feedback").css("visibility","visible")
l()("#audio_upload_holder").css("visibility","hidden")
l()("#video_upload_holder").css("visibility","hidden")}}
var f=!1,p=null
l.a.mediaComment.init=function(e,t){i.e(8).then(function(){var o=i("LeFjTU1mPL")
p=p||new Date
e=e||"any"
t=t||{}
var r=l.a.trim(l()("#identity .user_name").text()||"")
r&&(r=r+": "+(new Date).toString("ddd MMM d, yyyy"))
var s=t.defaultTitle||r||a.a.t("titles.media_contribution","Media Contribution"),d=function(){var i,r
if(INST.kalturaSettings.js_uploader){i=n.getKs()
r=n.getUid()}else{i=g.data("ks")
r=g.data("uid")||"ANONYMOUS"}l()("#video_record_title,#audio_record_title").val(s)
g.dialog({title:a.a.t("titles.record_upload_media_comment","Record/Upload Media Comment"),width:560,height:475,modal:!0})
g.dialog("option","close",function(){l()("#audio_record").before("<div id='audio_record'/>").remove()
l()("#video_record").before("<div id='video_record'/>").remove()
t&&t.close&&l.a.isFunction(t.close)&&t.close.call(g)})
l()("#audio_record").before("<div id='audio_record'/>").remove()
l()("#video_record").before("<div id='video_record'/>").remove()
if("video"==e){l()("#video_record_option").click()
l()("#media_record_option_holder").hide()
l()("#audio_upload_holder").hide()
l()("#video_upload_holder").show()}else if("audio"==e){l()("#audio_record_option").click()
l()("#media_record_option_holder").hide()
l()("#audio_upload_holder").show()
l()("#video_upload_holder").hide()}else{l()("#video_record_option").click()
l()("#audio_upload_holder").show()
l()("#video_upload_holder").show()}l()(document).triggerHandler("reset_media_comment_forms")
var d=l.a.trim(l()("#identity .user_name").text())+" "+(new Date).toISOString()
setTimeout(function(){var e={host:location.protocol+"//"+INST.kalturaSettings.domain,rtmpHost:"rtmp://"+(INST.kalturaSettings.rtmp_domain||INST.kalturaSettings.domain),kshowId:"-1",pid:INST.kalturaSettings.partner_id,subpid:INST.kalturaSettings.subpartner_id,uid:r,ks:i,themeUrl:"/media_record/skin.swf",localeUrl:"/media_record/locale.xml",thumbOffset:"1",licenseType:"CC-0.1",showUi:"true",useCamera:"0",maxFileSize:INST.kalturaSettings.max_file_size_bytes/1048576,maxUploads:1,partnerData:l.a.mediaComment.partnerData(),partner_data:l.a.mediaComment.partnerData(),entryName:d,soundcodec:"Speex",autoPreview:"0"},t={align:"middle",quality:"high",bgcolor:"#ffffff",name:"KRecordAudio",allowScriptAccess:"sameDomain",type:"application/x-shockwave-flash",pluginspage:"http://www.adobe.com/go/getflashplayer",wmode:"opaque"}
l()("#audio_record").text(a.a.t("messages.flash_required_record_audio","Flash required for recording audio."))
o.embedSWF("/media_record/KRecord.swf","audio_record","400","300","9.0.0",!1,e,t)
t=l.a.extend({},t,{name:"KRecordVideo"}),e=l.a.extend({},e,{useCamera:"1"})
l()("#video_record").html("Flash required for recording video.")
o.embedSWF("/media_record/KRecord.swf","video_record","400","300","9.0.0",!1,e,t)},INST.browser.ie?500:10)
var c={host:location.protocol+"//"+INST.kalturaSettings.domain,partnerId:INST.kalturaSettings.partner_id,subPId:INST.kalturaSettings.subpartner_id,uid:r,entryId:"-1",ks:i,thumbOffset:"1",licenseType:"CC-0.1",maxFileSize:INST.kalturaSettings.max_file_size_bytes/1048576,maxUploads:1,partnerData:l.a.mediaComment.partnerData(),partner_data:l.a.mediaComment.partnerData(),uiConfId:INST.kalturaSettings.upload_ui_conf,jsDelegate:"$.mediaComment.audio_delegate"},u={align:"middle",quality:"high",bgcolor:"#ffffff",name:"KUpload",allowScriptAccess:"always",type:"application/x-shockwave-flash",pluginspage:"http://www.adobe.com/go/getflashplayer",wmode:"transparent"}
l()("#audio_upload").text(a.a.t("messages.flash_required_upload_audio","Flash required for uploading audio."))
var m="180",_="50"
o.embedSWF("//"+INST.kalturaSettings.domain+"/kupload/ui_conf_id/"+INST.kalturaSettings.upload_ui_conf,"audio_upload",m,_,"9.0.0",!1,c,u)
c=l.a.extend({},c,{jsDelegate:"$.mediaComment.video_delegate"})
l()("#video_upload").text(a.a.t("messages.flash_required_upload_video","Flash required for uploading video."))
var h,p,v,b,y,k,w,x
m="180",_="50"
o.embedSWF("//"+INST.kalturaSettings.domain+"/kupload/ui_conf_id/"+INST.kalturaSettings.upload_ui_conf,"video_upload",m,_,"9.0.0",!1,c,u)
var C,T
f=!0
setInterval(function(){if(f){h=l()("#audio_record_holder")
p=l()("#audio_record")
v=l()("#audio_record_meter")
b=0
y=0
k=l()("#video_record_holder")
w=l()("#video_record")
x=l()("#video_record_meter")
C=0
T=0
f=!1}b++
C++
var e=null,t=null
p&&p[0]&&p[0].getMicophoneActivityLevel&&p.parent().length?e=p[0].getMicophoneActivityLevel():p=l()("#audio_record")
w&&w[0]&&w[0].getMicophoneActivityLevel&&w.parent().length?t=w[0].getMicophoneActivityLevel():w=l()("#video_record")
if(null!=e){if((e=Math.max(e,y))>-1&&!h.hasClass("with_volume")){v.css("display","none")
l()("#audio_record_holder").addClass("with_volume").animate({width:420},function(){v.css("display","")})}if(b>4){y=0
b=0
var i=(e-e%10)/10
v.attr("class","volume_meter band_"+i)}else y=e}if(null!=t){if((t=Math.max(t,T))>-1&&!k.hasClass("with_volume")){x.css("display","none")
l()("#video_record_holder").addClass("with_volume").animate({width:420},function(){x.css("display","")})}if(C>4){T=0
C=0
i=(t-t%10)/10
x.attr("class","volume_meter band_"+i)}else T=t}},20)}
if(INST.kalturaSettings.js_uploader){var c=m(i("Ft12a0AvJb"));(n=new c(e,t)).onReady=d
n.addEntry=_
if(ENV.ARC_RECORDING_FEATURE_ENABLED){var u=(0,i("muCowrVCN3").getBrowser)();("Chrome"===u.name&&Number(u.version)>=68||"Firefox"===u.name&&Number(u.version)>=61)&&i.e(439).then(i.bind(null,"qFOglK6xBc")).then(function(e){var t,i=e.default
t=setInterval(function(){var e=document.getElementById("record_media_tab")
if(e){i(e,n.doUploadByFile)
clearInterval(t)}},10)})}}var h=new Date
h-p>3e5&&l()("#media_comment_dialog").dialog("close").remove()
p=h
var g=l()("#media_comment_dialog")
if(0!=g.length||INST.kalturaSettings.js_uploader)INST.kalturaSettings.js_uploader||d()
else{var v=l()("<div/>").attr("id","media_comment_dialog")
v.text(a.a.t("messages.loading","Loading..."))
v.dialog({title:a.a.t("titles.record_upload_media_comment","Record/Upload Media Comment"),resizable:!1,width:470,height:300,modal:!0})
l.a.ajaxJSON("/api/v1/services/kaltura_session","POST",{},function(e){v.data("ks",e.ks)
v.data("uid",e.uid)},function(e){0==e.logged_in?v.data("ks-error",a.a.t("errors.must_be_logged_in","You must be logged in to record media.")):v.data("ks-error",a.a.t("errors.load_failed","Media Comment Application failed to load.  Please try again."))})
!function e(){if(v.data("ks")){var t=m(i("2JPOf+YwLj"))
v.html(t())
i("oxTDiksfqi")
v.find("#media_record_tabs").tabs({activate:l.a.mediaComment.video_delegate.expectReady})
d()}else v.data("ks-error")?v.html(v.data("ks-error")):setTimeout(e,500)}()
g=l()("#media_comment_dialog")
g=v}}.bind(null,i)).catch(i.oe)}
l()(document).ready(function(){l()(document).bind("reset_media_comment_forms",function(){l()("#audio_record_holder_message,#video_record_holder_message").removeClass("saving").find(".recorder_message").html("Saving Recording...<img src='/images/media-saving.gif'/>")
l()("#audio_record_holder").stop(!0,!0).clearQueue().css("width","").removeClass("with_volume")
l()("#video_record_holder").stop(!0,!0).clearQueue().css("width","").removeClass("with_volume")
l()("#media_upload_submit").text(a.a.t("buttons.submit","Submit Media File")).attr("disabled",!0)
l()("#media_upload_settings").css("visibility","hidden")
l()("#media_upload_progress").css("visibility","hidden").progressbar().progressbar("option","value",1)
l()("#media_upload_title").val("")
var e=l()("#audio_upload")[0]&&l()("#audio_upload")[0].getFiles&&l()("#audio_upload")[0].getFiles()
e&&l()("#audio_upload")[0].removeFiles&&e.length>0&&l()("#audio_upload")[0].removeFiles(0,e.length-1);(e=l()("#video_upload")[0]&&l()("#video_upload")[0].getFiles&&l()("#video_upload")[0].getFiles())&&l()("#video_upload")[0].removeFiles&&e.length>0&&l()("#video_upload")[0].removeFiles(0,e.length-1)})
l()("#media_upload_submit").live("click",function(e){l.a.mediaComment.upload_delegate.submit()})
l()("#video_record_option,#audio_record_option").live("click",function(e){e.preventDefault()
l()("#video_record_option,#audio_record_option").removeClass("selected_option")
l()(this).addClass("selected_option")
l()("#audio_record_holder").stop(!0,!0).clearQueue().css("width","").removeClass("with_volume")
l()("#video_record_holder").stop(!0,!0).clearQueue().css("width","").removeClass("with_volume")
if("audio_record_option"==l()(this).attr("id")){l()("#video_record_holder_holder").hide()
l()("#audio_record_holder_holder").show()}else{l()("#video_record_holder_holder").show()
l()("#audio_record_holder_holder").hide()}})})
l()(document).bind("media_recording_error",function(){l()("#audio_record_holder_message,#video_record_holder_message").find(".recorder_message").html(Object(u.a)(a.a.t("errors.save_failed","Saving appears to have failed.  Please close this popup to try again."))+"<div style='font-size: 0.8em; margin-top: 20px;'>"+Object(u.a)(a.a.t("errors.persistent_problem","If this problem keeps happening, you may want to try recording your media locally and then uploading the saved file instead."))+"</div>")})
window.mediaCommentCallback=function(e){r.a.each(e,_)
l()("#media_comment_create_dialog").empty().dialog("close")}
window.beforeAddEntry=function(){var e=Math.random()
l.a.mediaComment.lastAddAttemptId=e
setTimeout(function(){l.a.mediaComment.lastAddAttemptId==e&&l()(document).triggerHandler("media_recording_error")},3e4)
l()("#audio_record_holder_message,#video_record_holder_message").addClass("saving")}
window.addEntryFail=function(){l()(document).triggerHandler("media_recording_error")}
window.addEntryFailed=function(){l()(document).triggerHandler("media_recording_error")}
window.addEntryComplete=function(e){l.a.mediaComment.lastAddAttemptId=null
l()("#audio_record_holder_message,#video_record_holder_message").removeClass("saving")
try{var t=null
l.a.isArray(e)||(e=[e])
for(var i=0;i<e.length;i++){var n=e[i]
0==l()("#media_record_tabs").tabs("option","selected")?t=l()("#video_record_title,#audio_record_title").filter(":visible:first").val():l()("#media_record_tabs").tabs("option","selected")
1==n.entryType&&l()("#audio_record_option").hasClass("selected_option")&&(n.entryType=5)
l.a.mediaComment.entryAdded(n.entryId,n.entryType,n.entryName,t)
l()("#media_comment_dialog").dialog("close")}}catch(e){console.log(e)
alert(a.a.t("errors.save_failed_try_again","Entry failed to save.  Please try again."))}}},PYCyImFiAC:function(e,t,i){"use strict"
var n=i("whMk0QU2To"),a=i("mOY9BNujNR"),o=i.n(a)
i("Q4xR9Iqymk")
o()(document).ready(function(){var e=0,t=window.ENV.page_view_update_url
d=!1
n.a.interaction_contexts={}
if(document.cookie&&document.cookie.match(/last_page_view/)){var i=document.cookie.match(/last_page_view=([^;]+)/)
if(i&&i[1])try{var a=o.a.parseJSON(unescape(i[1]))
a&&a.url&&a.seconds&&setTimeout(function(){o.a.ajaxJSON(a.url,"PUT",{interaction_seconds:a.seconds},function(){},function(){},3e3)})}catch(e){}document.cookie="last_page_view=; Path=/; expires=Thu, 01-Jan-1970 00:00:01 GMT"}if(t){var r,s=0
o()(document).bind("page_view_update_url_received",function(e,i){t=i})
o()(document).bind("page_view_update",function(i,n){var a={}
if(n||e>10&&s<300){a.interaction_seconds=e
o.a.ajaxJSON(t,"PUT",a,null,function(e,t){422===t.status&&clearInterval(r)})
e=0}})
r=setInterval(function(){o()(document).triggerHandler("page_view_update")},3e5)
window.addEventListener("beforeunload",function(i){if(e>30){var n=JSON.stringify({url:t,seconds:e})
document.cookie="last_page_view="+escape(n)+"; Path=/;"}})
var d=!1
o()(document).bind("mousemove keypress mousedown focus",function(){d=!0})
setInterval(function(){if(d){e++
n.a&&n.a.interaction_context&&n.a.interaction_contexts&&(n.a.interaction_contexts[n.a.interaction_context]=(n.a.interaction_contexts[n.a.interaction_context]||0)+1)
d=!1
if(s>=300){s=0
o()(document).triggerHandler("page_view_update")}s=0}else s++},1e3)}})},"QE/xL6drvs":function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
if(ENV.ping_url)var o=setInterval(function(){document.hidden||a.a.post(ENV.ping_url).fail(function(e){401===e.status&&clearInterval(o)})},18e4)},QNUVZwyfqV:function(e,t,i){"use strict"
t.a=function(e,t,n){if(void 0==n)var r=!!o.a.browser.ie
else var r=n
return{auto_focus:t,setup:function(t){var n=a()("#"+t.id)
t.on("keyup",function(e){a()(document).trigger("editorKeyUp",[e])})
t.on("change",function(){n.trigger("change")})
t.on("keyup keydown click mousedown",function(){r&&t.selection&&n.data("last_bookmark",t.selection.getBookmark(1))})
ENV.use_rce_enhancements||t.on("init",function(){var e,n=(e=i("53cLBmp0Qb")).default?e.default:e
new n(t).accessiblize()})
t.on("init",function(){a()(window).triggerHandler("resize")
a()(t.contentDocument).bind("DOMNodeInserted",function(t){var i,n=t.target
1===n.nodeType&&"IMG"===n.nodeName&&(i=a()(n).data("url"))&&a()(n).attr("src",e.activeEditor.documentBaseURI.toAbsolute(i))})
"onfocusout"in t.contentWindow||a()(t.contentWindow).blur(function(e){if(!t.removed&&t.undoManager.typing){t.undoManager.typing=!1
t.undoManager.add()}})})}}}
var n=i("mOY9BNujNR"),a=i.n(n),o=i("whMk0QU2To")},"TCzg8/TAum":function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("ATXgBniL6v"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("media_comments_publicjs")},UAuFKQZf3D:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("c9GWGY9DTP"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("instructure_js")},V0DFOiAOkw:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=(i("VHZX6oywWS"),a.a.ui.menu.prototype),r=o.refresh
a.a.extend(o,{refresh:function(){r.call(this)
var e=this,t=this.element.find("li.ui-menu-item"),i=!1
this.element.bind("click.menu",function(e){new RegExp(/^a$/i).test(e.target.tagName)||e.preventDefault()})
var n=0
this.element.find("input[type='checkbox'], input[type='radio']").each(function(){var e=a()(this).closest("label")
if(e.length){a()(this).insertBefore(e)
a()(this).attr("id")||a()(this).attr("id","ui-input-"+n++)
e.attr("for",a()(this).attr("id"))}})
this.element.bind("menufocus",function(e){var t=a()(e.target).find("a.ui-state-focus").children("input[type='text']")
t.length&&t[0].focus()})
this.element.bind("popupopen",function(t){var i=a()(t.target).find("input[type=radio][checked]").closest(".ui-menu-item")
i.length&&setTimeout(function(){e.focus(t,i)},0)}).bind("menublur",function(e){var t=a()(e.target).find("input[type='text']:focus")
t.length&&t[0].blur()})
t.children("a").each(function(e,t){var n=a()(t),o=n.parent()
if(n.children().is("input[type='checkbox'], input[type='radio']")){n.closest("ul").addClass("ui-menu-icons")
if(n.children("input[type='checkbox']").is(":checked")){n.prepend('<span class="ui-icon ui-icon-check"></span>')
o.attr({role:"menuitemcheckbox","aria-checked":"true"})}else if(n.children("input[type='radio']").is(":checked")){n.prepend('<span class="ui-icon ui-icon-radio-on"></span>')
o.attr({role:"menuitemradio","aria-checked":"true"})}else if(n.children("input[type='radio']").length){n.prepend('<span class="ui-icon ui-icon-radio-off"></span>')
o.attr({role:"menuitemradio","aria-checked":"false"})}else o.attr({role:"menuitemcheckbox","aria-checked":"false"})
n.children().is("input[type='radio']")&&o.attr("radio-group",n.children("input[type='radio']").attr("name"))
if(o.prev().length&&!o.prev().children("a").length){o.prev().addClass("ui-state-disabled").html("<span class='ui-menu-input-group'>"+o.prev().html()+"</span>").bind("click.menu",function(e){return!1}).after("<li><hr /></li>")
i=!0}else o.prev().length&&!o.prev().children("a").children().is("input[type='checkbox'], input[type='radio']")&&o.before("<li><hr /></li>")
if(i&&o.next().length&&!o.next().children("a").children().is("input[type='checkbox'], input[type='radio']")){o.after("<li><hr /></li>")
i=!1}else o.next().length&&!o.next().children("a").children().is("input[type='checkbox'], input[type='radio']")&&o.after("<li><hr /></li>")
n.children("input[type='checkbox'], input[type='radio']").hide()}})
t.bind("keydown.menu",function(t){if(t.keyCode===a.a.ui.keyCode.SPACE){if(e.active.children("a").children().is("input[type='checkbox'], input[type='radio']")){e.select(t)
t.stopImmediatePropagation()}t.preventDefault()}})
t.find("input[type='text']").bind("keydown",function(t){t.stopPropagation()
if(t.keyCode===a.a.ui.keyCode.UP){e.element.trigger("focus")
this.blur()
e.focus(t,a()(this).closest(".ui-menu-item").prev())}if(t.keyCode===a.a.ui.keyCode.DOWN){e.element.trigger("focus")
this.blur()
e.focus(t,a()(this).closest(".ui-menu-item").next())}}).bind("click",function(e){e.stopPropagation()})},select:function(e){var t={item:this.active||a()(e.target).closest(".ui-menu-item")}
if(t.item.children("a").children().is("input[type='checkbox']"))if("false"===t.item.attr("aria-checked")){t.item.children("a").prepend('<span class="ui-icon ui-icon-check"></span>')
t.item.attr("aria-checked","true")
t.item.children("a").children("input[type='checkbox']").prop("checked","checked").trigger("change")}else if("true"===t.item.attr("aria-checked")){t.item.children("a").children("span.ui-icon-check").remove()
t.item.attr("aria-checked","false")
t.item.children("a").children("input[type='checkbox']").removeAttr("checked").trigger("change")}if(t.item.children("a").children().is("input[type='radio']")&&"false"===t.item.attr("aria-checked")){t.item.children("a").children("span.ui-icon-radio-off").toggleClass("ui-icon-radio-on ui-icon-radio-off")
t.item.attr("aria-checked","true")
t.item.children("a").children("input[type='radio']").prop("checked","checked").trigger("change")
t.item.siblings("[radio-group="+a()(t.item).attr("radio-group")+"]").each(function(){a()(this).attr("aria-checked","false")
a()(this).children("a").children("span.ui-icon-radio-on").toggleClass("ui-icon-radio-on ui-icon-radio-off")
a()(this).children("a").children("input[type='radio']").removeAttr("checked")})}t.item.children("a").children().is("input[type='checkbox'], input[type='radio']")||this.collapseAll()
this._trigger("select",e,t)}})},"V0w+T+7agK":function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{"en-AU":{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura has been disabled for this Canvas site"},links:{minimize_embedded_kaltura_content:"Minimise embedded content"}}},"en-CA":{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura has been disabled for this Canvas site"},links:{minimize_embedded_kaltura_content:"Minimize embedded content"}}},"en-GB":{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura has been disabled for this Canvas site"},links:{minimize_embedded_kaltura_content:"Minimise embedded content"}}},"en-GB-x-ukhe":{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura has been disabled for this Canvas site"},links:{minimize_embedded_kaltura_content:"Minimise embedded content"}}},is:{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura er \xf3virk \xe1 \xfeessari Canvas-s\xed\xf0u"},links:{minimize_embedded_kaltura_content:"L\xe1gmarka innfellt efni"}}},mi:{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kua monokia Kaltura m\u014d t\u0113nei pae Canvas"},links:{minimize_embedded_kaltura_content:"Whakam\u014dkito ihirangi t\u0101mau"}}},ru:{instructure_inline_media_comment:{alerts:{kaltura_disabled:"Kaltura \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u0441\u0430\u0439\u0442\u0430 Canvas"},links:{minimize_embedded_kaltura_content:"\u0421\u0432\u0435\u0440\u043d\u0443\u0442\u044c \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u0435 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435"}}}}})},V9Ry3Xcwt0:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
i("Q/pI8WL7wG")
a()("body").on("click","[data-track-category]",function(){var e=a()(this).data(),t=e.trackCategory,i=e.trackLabel,n=e.trackAction,o=e.trackValue
a.a.trackEvent(t,n,i,o)})},VHZX6oywWS:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
i("O9QjtziI9Q"),i("1YHB9uvbU1")
function o(){return[].some.call(a()(this).parents().andSelf(),function(e){return"none"==a.a.css(e,"display")})}var r=!1
a.a.widget("ui.menu",{version:"@VERSION",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element
this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,a.a.proxy(function(e){this.options.disabled&&e.preventDefault()},this))
this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true")
this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(e){var t=a()(e.target)
if(!r&&t.closest(".ui-menu-item").not(".ui-state-disabled").length){r=!0
this.select(e)
this.element.has(".ui-menu").length?this.expand(e):this.element.is(":focus")||this.element.focus()}},"mouseenter .ui-menu-item":function(e){var t=a()(e.currentTarget)
t.siblings().children(".ui-state-active").removeClass("ui-state-active")
this.focus(e,t)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e){var t=this.active||this.element.children(".ui-menu-item").not(o).eq(0)
t.length&&this.focus(e,t)},blur:function(e){this._delay(function(){a.a.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"})
this.refresh()
this._on(this.document,{click:function(e){a()(e.target).closest(".ui-menu").length||this.collapseAll(e)
r=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show()
this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=a()(this)
e.data("ui-menu-submenu-carat")&&e.remove()})
this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){var t,i,n,r,s,d=!0
function c(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}switch(e.keyCode){case a.a.ui.keyCode.PAGE_UP:this.previousPage(e)
break
case a.a.ui.keyCode.PAGE_DOWN:this.nextPage(e)
break
case a.a.ui.keyCode.HOME:this._move("first","first",e)
break
case a.a.ui.keyCode.END:this._move("last","last",e)
break
case a.a.ui.keyCode.UP:this.previous(e)
break
case a.a.ui.keyCode.DOWN:this.next(e)
break
case a.a.ui.keyCode.LEFT:this.collapse(e)
break
case a.a.ui.keyCode.RIGHT:this.active.is(".ui-state-disabled")||this.expand(e)
break
case a.a.ui.keyCode.ENTER:case a.a.ui.keyCode.SPACE:this._activate(e)
break
case a.a.ui.keyCode.ESCAPE:this.collapse(e)
break
default:d=!1
i=this.previousFilter||""
n=String.fromCharCode(e.keyCode)
r=!1
clearTimeout(this.filterTimer)
n===i?r=!0:n=i+n
s=new RegExp("^"+c(n),"i")
t=this.activeMenu.children(".ui-menu-item").filter(function(){return s.test(a()(this).children("a").not(o).text())})
if(!(t=r&&-1!==t.index(this.active.next())?this.active.nextAll(".ui-menu-item"):t).length){n=String.fromCharCode(e.keyCode)
s=new RegExp("^"+c(n),"i")
t=this.activeMenu.children(".ui-menu-item").filter(function(){return s.test(a()(this).children("a").not(o).text())})}if(t.length){this.focus(e,t)
if(t.length>1){this.previousFilter=n
this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)}else delete this.previousFilter}else delete this.previousFilter}if(d){e.stopPropagation()
e.preventDefault()}},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var e,t=this.options.icons.submenu,i=this.element.find(this.options.menus+":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"});(e=i.add(this.element)).children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()})
e.children(":not(.ui-menu-item)").each(function(){var e=a()(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")})
e.children(".ui-state-disabled").attr("aria-disabled","true")
i.each(function(){var e=a()(this),i=e.prev("a"),n=a()("<span>").addClass("ui-menu-icon ui-icon "+t).data("ui-menu-submenu-carat",!0)
i.attr("aria-haspopup","true").prepend(n)
e.attr("aria-labelledby",i.attr("id"))})},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var i,n
this.blur(e,e&&"focus"===e.type)
this._scrollIntoView(t)
this.active=t.first()
n=this.active.children("a:visible").addClass("ui-state-focus")
this.options.role&&this.element.attr("aria-activedescendant",n.attr("id"))
this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active")
e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay);(i=t.children(".ui-menu")).length&&/^mouse/.test(e.type)&&this._startOpening(i)
this.activeMenu=t.parent()
this._trigger("focus",e,{item:t})},_scrollIntoView:function(e){var t,i,n,o,r,s
if(this._hasScroll()){t=parseFloat(a.a.css(this.activeMenu[0],"borderTopWidth"))||0
i=parseFloat(a.a.css(this.activeMenu[0],"paddingTop"))||0
n=e.offset().top-this.activeMenu.offset().top-t-i
o=this.activeMenu.scrollTop()
r=this.activeMenu.height()
s=e.height()
n<0?this.activeMenu.scrollTop(o+n):n+s>r&&this.activeMenu.scrollTop(o+n-r+s)}},blur:function(e,t){t||clearTimeout(this.timer)
if(this.active){this.active.children("a").removeClass("ui-state-focus")
this.active=null
this._trigger("blur",e,{item:this.active})}},_startOpening:function(e){clearTimeout(this.timer)
"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close()
this._open(e)},this.delay))},_open:function(e){var t=a.a.extend({of:this.active},this.options.position)
clearTimeout(this.timer)
this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true")
e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(t)},collapseAll:function(e,t){clearTimeout(this.timer)
this.timer=this._delay(function(){var i=t?this.element:a()(e&&e.target).closest(this.element.find(".ui-menu"))
i.length||(i=this.element)
this._close(i)
this.blur(e)
this.activeMenu=i},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element)
e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element)
if(t&&t.length){this._close()
this.focus(e,t)}},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").not(o).first()
if(t&&t.length){this._open(t.parent())
this._delay(function(){this.focus(e,t)})}},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").not(o).length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").not(o).length},_move:function(e,t,i){var n
this.active&&(n="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").not(o).eq(-1):this.active[e+"All"](".ui-menu-item").not(o).eq(0))
n&&n.length&&this.active||(n=this.activeMenu.children(".ui-menu-item").not(o)[t]())
this.focus(i,n)},nextPage:function(e){var t,i,n
if(this.active){if(!this.isLastItem())if(this._hasScroll()){i=this.active.offset().top
n=this.element.height()
this.active.nextAll(".ui-menu-item").not(o).each(function(){return(t=a()(this)).offset().top-i-n<0})
this.focus(e,t)}else this.focus(e,this.activeMenu.children(".ui-menu-item").not(o)[this.active?"last":"first"]())}else this.next(e)},previousPage:function(e){var t,i,n
if(this.active){if(!this.isFirstItem())if(this._hasScroll()){i=this.active.offset().top
n=this.element.height()
this.active.prevAll(".ui-menu-item").not(o).each(function(){return(t=a()(this)).offset().top-i+n>0})
this.focus(e,t)}else this.focus(e,this.activeMenu.children(".ui-menu-item").not(o).first())}else this.next(e)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){var t={item:this.active||a()(e.target).closest(".ui-menu-item")}
t.item.has(".ui-menu").length||this.collapseAll(e,!0)
this._trigger("select",e,t)}})},VUXUHQpzb6:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{"en-AU":{ExternalToolsPlugin:{more_external_tools:"More External Tools"}},"en-CA":{ExternalToolsPlugin:{more_external_tools:"More External Tools"}},"en-GB":{ExternalToolsPlugin:{more_external_tools:"More external tools"}},"en-GB-x-ukhe":{ExternalToolsPlugin:{more_external_tools:"More external tools"}},is:{ExternalToolsPlugin:{more_external_tools:"Fleiri ytri t\xe6ki"}},mi:{ExternalToolsPlugin:{more_external_tools:"\u0112tahi atu Utauta waho"}},ru:{ExternalToolsPlugin:{more_external_tools:"\u0411\u043e\u043b\u044c\u0448\u0435 \u0432\u043d\u0435\u0448\u043d\u0438\u0445 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u043e\u0432"}}}})},Z6MXnY8QXm:function(e,t,i){"use strict"
i.d(t,"a",function(){return s})
var n=i("l2OaefyPCY"),a=i("pI4K9aISfJ"),o=i("mOY9BNujNR"),r=i.n(o),s=function(){function e(){Object(n.a)(this,e)}Object(a.a)(e,[{key:"fetchYouTubeTitle",value:function(e,t){var i=ENV.JWT,n=ENV.RICH_CONTENT_APP_HOST,a="//".concat(n,"/api/youtube_title?vid_id=").concat(e)
r.a.ajax({headers:{Authorization:"Bearer ".concat(i)},url:a}).success(function(i){i.id===e&&t(i.title)}).error(function(e){t(null,e)})}},{key:"titleYouTubeText",value:function(e){var t=r.a.youTubeID(e.attr("href"))
this.fetchYouTubeTitle(t,function(i,n){if(n){console.error('failed to get video title from youtube for "'.concat(t,'":'),n.responseText)
var a=(+e.attr("data-ytt-failcnt")||0)+1
e.attr("data-ytt-failcnt",a)}else{e.text(i)
e.attr("data-preview-alt",i)}})}}])
return e}()},ZwdgLllWpW:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
i("O9QjtziI9Q"),i("QvLm/Z7v1R"),i("1YHB9uvbU1")
a.a.widget("ui.sortable",a.a.ui.mouse,{version:"@VERSION",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var e=this.options
this.containerCache={}
this.element.addClass("ui-sortable")
this.refresh()
this.floating=!!this.items.length&&("x"===e.axis||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")))
this.offset=this.element.offset()
this._mouseInit()
this.ready=!0},_destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled")
this._mouseDestroy()
for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item")
return this},_setOption:function(e,t){if("disabled"===e){this.options[e]=t
this.widget().toggleClass("ui-sortable-disabled",!!t)}else a.a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(e,t){var i=this
if(this.reverting)return!1
if(this.options.disabled||"static"==this.options.type)return!1
this._refreshItems(e)
var n=null
a()(e.target).parents().each(function(){if(a.a.data(this,i.widgetName+"-item")==i){n=a()(this)
return!1}})
a.a.data(e.target,i.widgetName+"-item")==i&&(n=a()(e.target))
if(!n)return!1
if(this.options.handle&&!t){var o=!1
a()(this.options.handle,n).find("*").andSelf().each(function(){this==e.target&&(o=!0)})
if(!o)return!1}this.currentItem=n
this._removeCurrentsFromItems()
return!0},_mouseStart:function(e,t,i){var n=this.options
this.currentContainer=this
this.refreshPositions()
this.helper=this._createHelper(e)
this._cacheHelperProportions()
this._cacheMargins()
this.scrollParent=this.helper.scrollParent()
this.offset=this.currentItem.offset()
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left}
a.a.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()})
this.helper.css("position","absolute")
this.cssPosition=this.helper.css("position")
this.originalPosition=this._generatePosition(e)
this.originalPageX=e.pageX
this.originalPageY=e.pageY
n.cursorAt&&this._adjustOffsetFromHelper(n.cursorAt)
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]}
this.helper[0]!=this.currentItem[0]&&this.currentItem.hide()
this._createPlaceholder()
n.containment&&this._setContainment()
if(n.cursor){a()("body").css("cursor")&&(this._storedCursor=a()("body").css("cursor"))
a()("body").css("cursor",n.cursor)}if(n.opacity){this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity"))
this.helper.css("opacity",n.opacity)}if(n.zIndex){this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex"))
this.helper.css("zIndex",n.zIndex)}this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset())
this._trigger("start",e,this._uiHash())
this._preserveHelperProportions||this._cacheHelperProportions()
if(!i)for(var o=this.containers.length-1;o>=0;o--)this.containers[o]._trigger("activate",e,this._uiHash(this))
a.a.ui.ddmanager&&(a.a.ui.ddmanager.current=this)
a.a.ui.ddmanager&&!n.dropBehaviour&&a.a.ui.ddmanager.prepareOffsets(this,e)
this.dragging=!0
this.helper.addClass("ui-sortable-helper")
this._mouseDrag(e)
return!0},_mouseDrag:function(e){this.position=this._generatePosition(e)
this.positionAbs=this._convertPositionTo("absolute")
this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs)
if(this.options.scroll){var t=this.options,i=!1
if(this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName){this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<t.scrollSensitivity?this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop+t.scrollSpeed:e.pageY-this.overflowOffset.top<t.scrollSensitivity&&(this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop-t.scrollSpeed)
this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<t.scrollSensitivity?this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft+t.scrollSpeed:e.pageX-this.overflowOffset.left<t.scrollSensitivity&&(this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft-t.scrollSpeed)}else{e.pageY-a()(document).scrollTop()<t.scrollSensitivity?i=a()(document).scrollTop(a()(document).scrollTop()-t.scrollSpeed):a()(window).height()-(e.pageY-a()(document).scrollTop())<t.scrollSensitivity&&(i=a()(document).scrollTop(a()(document).scrollTop()+t.scrollSpeed))
e.pageX-a()(document).scrollLeft()<t.scrollSensitivity?i=a()(document).scrollLeft(a()(document).scrollLeft()-t.scrollSpeed):a()(window).width()-(e.pageX-a()(document).scrollLeft())<t.scrollSensitivity&&(i=a()(document).scrollLeft(a()(document).scrollLeft()+t.scrollSpeed))}!1!==i&&a.a.ui.ddmanager&&!t.dropBehaviour&&a.a.ui.ddmanager.prepareOffsets(this,e)}this.positionAbs=this._convertPositionTo("absolute")
this.options.axis&&"y"==this.options.axis||(this.helper[0].style.left=this.position.left+"px")
this.options.axis&&"x"==this.options.axis||(this.helper[0].style.top=this.position.top+"px")
for(var n=this.items.length-1;n>=0;n--){var o=this.items[n],r=o.item[0],s=this._intersectsWithPointer(o)
if(s&&!(r==this.currentItem[0]||this.placeholder[1==s?"next":"prev"]()[0]==r||a.a.contains(this.placeholder[0],r)||"semi-dynamic"==this.options.type&&a.a.contains(this.element[0],r))){this.direction=1==s?"down":"up"
if("pointer"!=this.options.tolerance&&!this._intersectsWithSides(o))break
this._rearrange(e,o)
this._trigger("change",e,this._uiHash())
break}}this._contactContainers(e)
a.a.ui.ddmanager&&a.a.ui.ddmanager.drag(this,e)
this._trigger("sort",e,this._uiHash())
this.lastPositionAbs=this.positionAbs
return!1},_mouseStop:function(e,t){if(e){a.a.ui.ddmanager&&!this.options.dropBehaviour&&a.a.ui.ddmanager.drop(this,e)
if(this.options.revert){var i=this,n=this.placeholder.offset()
this.reverting=!0
a()(this.helper).animate({left:n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){i._clear(e)})}else this._clear(e,t)
return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null})
"original"==this.options.helper?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show()
for(var e=this.containers.length-1;e>=0;e--){this.containers[e]._trigger("deactivate",null,this._uiHash(this))
if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",null,this._uiHash(this))
this.containers[e].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0])
"original"!=this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove()
a.a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null})
this.domPosition.prev?a()(this.domPosition.prev).after(this.currentItem):a()(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(e){var t=this._getItemsAsjQuery(e&&e.connected),i=[]
e=e||{}
a()(t).each(function(){var t=(a()(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[-=_](.+)/)
t&&i.push((e.key||t[1]+"[]")+"="+(e.key&&e.expression?t[1]:t[2]))})
!i.length&&e.key&&i.push(e.key+"=")
return i.join("&")},toArray:function(e){var t=this._getItemsAsjQuery(e&&e.connected),i=[]
e=e||{}
t.each(function(){i.push(a()(e.item||this).attr(e.attribute||"id")||"")})
return i},_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,n=this.positionAbs.top,a=n+this.helperProportions.height,o=e.left,r=o+e.width,s=e.top,d=s+e.height,c=this.offset.click.top,l=this.offset.click.left,u=n+c>s&&n+c<d&&t+l>o&&t+l<r
return"pointer"==this.options.tolerance||this.options.forcePointerForContainers||"pointer"!=this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?u:o<t+this.helperProportions.width/2&&i-this.helperProportions.width/2<r&&s<n+this.helperProportions.height/2&&a-this.helperProportions.height/2<d},_intersectsWithPointer:function(e){var t="x"===this.options.axis||a.a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),i="y"===this.options.axis||a.a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width),n=t&&i,o=this._getDragVerticalDirection(),r=this._getDragHorizontalDirection()
return!!n&&(this.floating?r&&"right"==r||"down"==o?2:1:o&&("down"==o?2:1))},_intersectsWithSides:function(e){var t=a.a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=a.a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),n=this._getDragVerticalDirection(),o=this._getDragHorizontalDirection()
return this.floating&&o?"right"==o&&i||"left"==o&&!i:n&&("down"==n&&t||"up"==n&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top
return 0!=e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left
return 0!=e&&(e>0?"right":"left")},refresh:function(e){this._refreshItems(e)
this.refreshPositions()
return this},_connectWith:function(){var e=this.options
return e.connectWith.constructor==String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(e){var t=[],i=[],n=this._connectWith()
if(n&&e)for(var o=n.length-1;o>=0;o--)for(var r=a()(n[o]),s=r.length-1;s>=0;s--){var d=a.a.data(r[s],this.widgetName)
d&&d!=this&&!d.options.disabled&&i.push([a.a.isFunction(d.options.items)?d.options.items.call(d.element):a()(d.options.items,d.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),d])}i.push([a.a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a()(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this])
for(o=i.length-1;o>=0;o--)i[o][0].each(function(){t.push(this)})
return a()(t)},_removeCurrentsFromItems:function(){for(var e=this.currentItem.find(":data("+this.widgetName+"-item)"),t=0;t<this.items.length;t++)for(var i=0;i<e.length;i++)e[i]==this.items[t].item[0]&&this.items.splice(t,1)},_refreshItems:function(e){this.items=[]
this.containers=[this]
var t=this.items,i=[[a.a.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):a()(this.options.items,this.element),this]],n=this._connectWith()
if(n&&this.ready)for(var o=n.length-1;o>=0;o--)for(var r=a()(n[o]),s=r.length-1;s>=0;s--){var d=a.a.data(r[s],this.widgetName)
if(d&&d!=this&&!d.options.disabled){i.push([a.a.isFunction(d.options.items)?d.options.items.call(d.element[0],e,{item:this.currentItem}):a()(d.options.items,d.element),d])
this.containers.push(d)}}for(o=i.length-1;o>=0;o--)for(var c=i[o][1],l=i[o][0],u=(s=0,l.length);s<u;s++){var m=a()(l[s])
m.data(this.widgetName+"-item",c)
t.push({item:m,instance:c,width:0,height:0,left:0,top:0})}},refreshPositions:function(e){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset())
for(var t=this.items.length-1;t>=0;t--){var i=this.items[t]
if(i.instance==this.currentContainer||!this.currentContainer||i.item[0]==this.currentItem[0]){var n=this.options.toleranceElement?a()(this.options.toleranceElement,i.item):i.item
if(!e){i.width=n.outerWidth()
i.height=n.outerHeight()}var o=n.offset()
i.left=o.left
i.top=o.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this)
else for(t=this.containers.length-1;t>=0;t--){o=this.containers[t].element.offset()
this.containers[t].containerCache.left=o.left
this.containers[t].containerCache.top=o.top
this.containers[t].containerCache.width=this.containers[t].element.outerWidth()
this.containers[t].containerCache.height=this.containers[t].element.outerHeight()}return this},_createPlaceholder:function(e){var t=(e=e||this).options
if(!t.placeholder||t.placeholder.constructor==String){var i=t.placeholder
t.placeholder={element:function(){var t=a()(document.createElement(e.currentItem[0].nodeName)).addClass(i||e.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0]
i||(t.style.visibility="hidden")
return t},update:function(n,a){if(!i||t.forcePlaceholderSize){a.height()||a.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10))
a.width()||a.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10))}}}}e.placeholder=a()(t.placeholder.element.call(e.element,e.currentItem))
e.currentItem.after(e.placeholder)
t.placeholder.update(e,e.placeholder)},_contactContainers:function(e){for(var t=null,i=null,n=this.containers.length-1;n>=0;n--)if(!a.a.contains(this.currentItem[0],this.containers[n].element[0]))if(this._intersectsWith(this.containers[n].containerCache)){if(t&&a.a.contains(this.containers[n].element[0],t.element[0]))continue
t=this.containers[n]
i=n}else if(this.containers[n].containerCache.over){this.containers[n]._trigger("out",e,this._uiHash(this))
this.containers[n].containerCache.over=0}if(t)if(1===this.containers.length){this.containers[i]._trigger("over",e,this._uiHash(this))
this.containers[i].containerCache.over=1}else if(this.currentContainer!=this.containers[i]){for(var o=1e4,r=null,s=this.positionAbs[this.containers[i].floating?"left":"top"],d=this.items.length-1;d>=0;d--)if(a.a.contains(this.containers[i].element[0],this.items[d].item[0])){var c=this.containers[i].floating?this.items[d].item.offset().left:this.items[d].item.offset().top
if(Math.abs(c-s)<o){o=Math.abs(c-s)
r=this.items[d]
this.direction=c-s>0?"down":"up"}}if(!r&&!this.options.dropOnEmpty)return
this.currentContainer=this.containers[i]
r?this._rearrange(e,r,null,!0):this._rearrange(e,null,this.containers[i].element,!0)
this._trigger("change",e,this._uiHash())
this.containers[i]._trigger("change",e,this._uiHash(this))
this.options.placeholder.update(this.currentContainer,this.placeholder)
this.containers[i]._trigger("over",e,this._uiHash(this))
this.containers[i].containerCache.over=1}},_createHelper:function(e){var t=this.options,i=a.a.isFunction(t.helper)?a()(t.helper.apply(this.element[0],[e,this.currentItem])):"clone"==t.helper?this.currentItem.clone():this.currentItem
i.parents("body").length||a()("parent"!=t.appendTo?t.appendTo:this.currentItem[0].parentNode)[0].appendChild(i[0])
i[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")});(""==i[0].style.width||t.forceHelperSize)&&i.width(this.currentItem.width());(""==i[0].style.height||t.forceHelperSize)&&i.height(this.currentItem.height())
return i},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" "))
a.a.isArray(e)&&(e={left:+e[0],top:+e[1]||0})
"left"in e&&(this.offset.click.left=e.left+this.margins.left)
"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left)
"top"in e&&(this.offset.click.top=e.top+this.margins.top)
"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent()
var e=this.offsetParent.offset()
if("absolute"==this.cssPosition&&this.scrollParent[0]!=document&&a.a.contains(this.scrollParent[0],this.offsetParent[0])){e.left+=this.scrollParent.scrollLeft()
e.top+=this.scrollParent.scrollTop()}(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&"html"==this.offsetParent[0].tagName.toLowerCase()&&a.a.browser.msie)&&(e={top:0,left:0})
return{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"==this.cssPosition){var e=this.currentItem.position()
return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options
"parent"==e.containment&&(e.containment=this.helper[0].parentNode)
"document"!=e.containment&&"window"!=e.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a()("document"==e.containment?document:window).width()-this.helperProportions.width-this.margins.left,(a()("document"==e.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top])
if(!/^(document|window|parent)$/.test(e.containment)){var t=a()(e.containment)[0],i=a()(e.containment).offset(),n="hidden"!=a()(t).css("overflow")
this.containment=[i.left+(parseInt(a()(t).css("borderLeftWidth"),10)||0)+(parseInt(a()(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(a()(t).css("borderTopWidth"),10)||0)+(parseInt(a()(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(n?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(a()(t).css("borderLeftWidth"),10)||0)-(parseInt(a()(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(n?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(a()(t).css("borderTopWidth"),10)||0)-(parseInt(a()(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(e,t){t||(t=this.position)
var i="absolute"==e?1:-1,n=(this.options,"absolute"!=this.cssPosition||this.scrollParent[0]!=document&&a.a.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent),o=/(html|body)/i.test(n[0].tagName)
return{top:t.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"==this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*i,left:t.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*i}},_generatePosition:function(e){var t=this.options,i="absolute"!=this.cssPosition||this.scrollParent[0]!=document&&a.a.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,n=/(html|body)/i.test(i[0].tagName)
"relative"!=this.cssPosition||this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset())
var o=e.pageX,r=e.pageY
if(this.originalPosition){if(this.containment){e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left)
e.pageY-this.offset.click.top<this.containment[1]&&(r=this.containment[1]+this.offset.click.top)
e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left)
e.pageY-this.offset.click.top>this.containment[3]&&(r=this.containment[3]+this.offset.click.top)}if(t.grid){var s=this.originalPageY+Math.round((r-this.originalPageY)/t.grid[1])*t.grid[1]
r=this.containment&&(s-this.offset.click.top<this.containment[1]||s-this.offset.click.top>this.containment[3])?s-this.offset.click.top<this.containment[1]?s+t.grid[1]:s-t.grid[1]:s
var d=this.originalPageX+Math.round((o-this.originalPageX)/t.grid[0])*t.grid[0]
o=this.containment&&(d-this.offset.click.left<this.containment[0]||d-this.offset.click.left>this.containment[2])?d-this.offset.click.left<this.containment[0]?d+t.grid[0]:d-t.grid[0]:d}}return{top:r-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"==this.cssPosition?-this.scrollParent.scrollTop():n?0:i.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"==this.cssPosition?-this.scrollParent.scrollLeft():n?0:i.scrollLeft())}},_rearrange:function(e,t,i,n){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"==this.direction?t.item[0]:t.item[0].nextSibling)
this.counter=this.counter?++this.counter:1
var a=this.counter
this._delay(function(){a==this.counter&&this.refreshPositions(!n)})},_clear:function(e,t){this.reverting=!1
var i=[]
!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem)
this._noFinalSort=null
if(this.helper[0]==this.currentItem[0]){for(var n in this._storedCSS)"auto"!=this._storedCSS[n]&&"static"!=this._storedCSS[n]||(this._storedCSS[n]="")
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show()
this.fromOutside&&!t&&i.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))})
!this.fromOutside&&this.domPosition.prev==this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent==this.currentItem.parent()[0]||t||i.push(function(e){this._trigger("update",e,this._uiHash())})
if(!a.a.contains(this.element[0],this.currentItem[0])){t||i.push(function(e){this._trigger("remove",e,this._uiHash())})
for(n=this.containers.length-1;n>=0;n--)if(a.a.contains(this.containers[n].element[0],this.currentItem[0])&&!t){i.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.containers[n]))
i.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.containers[n]))}}for(n=this.containers.length-1;n>=0;n--){t||i.push(function(e){return function(t){e._trigger("deactivate",t,this._uiHash(this))}}.call(this,this.containers[n]))
if(this.containers[n].containerCache.over){i.push(function(e){return function(t){e._trigger("out",t,this._uiHash(this))}}.call(this,this.containers[n]))
this.containers[n].containerCache.over=0}}this._storedCursor&&a()("body").css("cursor",this._storedCursor)
this._storedOpacity&&this.helper.css("opacity",this._storedOpacity)
this._storedZIndex&&this.helper.css("zIndex","auto"==this._storedZIndex?"":this._storedZIndex)
this.dragging=!1
if(this.cancelHelperRemoval){if(!t){this._trigger("beforeStop",e,this._uiHash())
for(n=0;n<i.length;n++)i[n].call(this,e)
this._trigger("stop",e,this._uiHash())}return!1}t||this._trigger("beforeStop",e,this._uiHash())
this.placeholder[0].parentNode.removeChild(this.placeholder[0])
this.helper[0]!=this.currentItem[0]&&this.helper.remove()
this.helper=null
if(!t){for(n=0;n<i.length;n++)i[n].call(this,e)
this._trigger("stop",e,this._uiHash())}this.fromOutside=!1
return!0},_trigger:function(){!1===a.a.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(e){var t=e||this
return{helper:t.helper,placeholder:t.placeholder||a()([]),position:t.position,originalPosition:t.originalPosition,offset:t.positionAbs,item:t.currentItem,sender:e?e.element:null}}})},c9GWGY9DTP:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{time:{count_hours_ago:{one:"\u0645\u0646\u0630 \u0633\u0627\u0639\u0629 \u0645\u0636\u062a",other:"\u0645\u0646\u0630 %{count} \u0633\u0627\u0639\u0629 \u0645\u0636\u062a"},count_minutes_ago:{one:"\u0645\u0646\u0630 \u062f\u0642\u064a\u0642\u0629 \u0645\u0636\u062a",other:"\u0645\u0646\u0630 %{count} \u062f\u0642\u064a\u0642\u0629 \u0645\u0636\u062a"},less_than_a_minute_ago:"\u0645\u0646\u0630 \u0623\u0642\u0644 \u0645\u0646 \u062f\u0642\u064a\u0642\u0629"}},cy:{time:{count_hours_ago:{one:"1 awr yn \xf4l",other:"%{count} awr yn \xf4l"},count_minutes_ago:{one:"1 munud yn \xf4l",other:"%{count} munud yn \xf4l"},less_than_a_minute_ago:"llai na munud yn \xf4l"}},da:{time:{count_hours_ago:{one:"For 1 time siden",other:"%{count} timer siden"},count_minutes_ago:{one:"For 1 minut siden",other:"For %{count} minutter siden"},less_than_a_minute_ago:"for mindre en et minut siden"}},"da-x-k12":{time:{count_hours_ago:{one:"For 1 time siden",other:"%{count} timer siden"},count_minutes_ago:{one:"For 1 minut siden",other:"For %{count} minutter siden"},less_than_a_minute_ago:"for mindre en et minut siden"}},de:{time:{count_hours_ago:{one:"vor 1 Stunde",other:"vor %{count} Stunden"},count_minutes_ago:{one:"vor 1 Minute",other:"vor %{count} Minuten"},less_than_a_minute_ago:"vor weniger als einer Minute"}},el:{time:{count_hours_ago:{one:"1 \u03ce\u03c1\u03b1 \u03c0\u03c1\u03b9\u03bd",other:"%{count} \u03ce\u03c1\u03b5\u03c2 \u03c0\u03c1\u03b9\u03bd"},count_minutes_ago:{one:"1 \u03bb\u03b5\u03c0\u03c4\u03cc \u03c0\u03c1\u03b9\u03bd",other:"%{count} \u03bb\u03b5\u03c0\u03c4\u03ac \u03c0\u03c1\u03b9\u03bd"},less_than_a_minute_ago:"\u03bb\u03b9\u03b3\u03cc\u03c4\u03b5\u03c1\u03bf \u03b1\u03c0\u03cc \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc \u03c0\u03c1\u03b9\u03bd"}},"en-AU":{instructure_js:{alerts:{file_previews_disabled:"File previews have been disabled for this Canvas site"},buttons:{next_module:"Next Module",previous_module:"Previous Module"},draft:"Draft",errors:{posting_message_failed:"Post Failed, Try Again"},links:{minimize_file_preview:"Minimize File Preview",minimize_youtube_video:"Minimize Video",view_equella_content_in_new_window:"view the content in a new window"},status:{posting_message:"Posting Message..."},switched_roles_message:{designer:"You have switched roles temporarily for this course, and are now viewing the course as a designer.  You can restore your role and permissions from the course home page.",observer:"You have switched roles temporarily for this course, and are now viewing the course as an observer.  You can restore your role and permissions from the course home page.",student:"You have switched roles temporarily for this course, and are now viewing the course as a student.  You can restore your role and permissions from the course home page.",ta:"You have switched roles temporarily for this course, and are now viewing the course as a TA.  You can restore your role and permissions from the course home page.",teacher:"You have switched roles temporarily for this course, and are now viewing the course as a teacher.  You can restore your role and permissions from the course home page."},titles:{equella_content_preview:"Equella Content Preview",external_link:"Links to an external site.",preview_document:"Preview the document"}},time:{count_hours_ago:{one:"1 hour ago",other:"%{count} hours ago"},count_minutes_ago:{one:"1 minute ago",other:"%{count} minutes ago"},less_than_a_minute_ago:"less than a minute ago"}},"en-CA":{instructure_js:{alerts:{file_previews_disabled:"File previews have been disabled for this Canvas site"},buttons:{next_module:"Next Module",previous_module:"Previous Module"},draft:"Draft",errors:{posting_message_failed:"Post Failed, Try Again"},links:{minimize_file_preview:"Minimize File Preview",minimize_youtube_video:"Minimize Video",view_equella_content_in_new_window:"view the content in a new window"},status:{posting_message:"Posting Message..."},switched_roles_message:{designer:"You have switched roles temporarily for this course, and are now viewing the course as a designer.  You can restore your role and permissions from the course home page.",observer:"You have switched roles temporarily for this course, and are now viewing the course as an observer.  You can restore your role and permissions from the course home page.",student:"You have switched roles temporarily for this course, and are now viewing the course as a student.  You can restore your role and permissions from the course home page.",ta:"You have switched roles temporarily for this course, and are now viewing the course as a TA.  You can restore your role and permissions from the course home page.",teacher:"You have switched roles temporarily for this course, and are now viewing the course as a teacher.  You can restore your role and permissions from the course home page."},titles:{equella_content_preview:"Equella Content Preview",external_link:"Links to an external site.",preview_document:"Preview the document"}},time:{count_hours_ago:{one:"1 hour ago",other:"%{count} hours ago"},count_minutes_ago:{one:"1 minute ago",other:"%{count} minutes ago"},less_than_a_minute_ago:"less than a minute ago"}},"en-GB":{instructure_js:{alerts:{file_previews_disabled:"File previews have been disabled for this Canvas site"},buttons:{next_module:"Next module",previous_module:"Previous module"},draft:"Draft",errors:{posting_message_failed:"Post failed. Try again"},links:{minimize_file_preview:"Minimise file preview",minimize_youtube_video:"Minimise video",view_equella_content_in_new_window:"view the content in a new window"},status:{posting_message:"Posting message..."},switched_roles_message:{designer:"You have switched roles temporarily for this course, and are now viewing the course as a designer.  You can restore your role and permissions from the course home page.",observer:"You have switched roles temporarily for this course, and are now viewing the course as a observer.  You can restore your role and permissions from the course home page.",student:"You have switched roles temporarily for this course, and are now viewing the course as a student.  You can restore your role and permissions from the course home page.",ta:"You have switched roles temporarily for this course, and are now viewing the course as a TA.  You can restore your role and permissions from the course home page.",teacher:"You have switched roles temporarily for this course, and are now viewing the course as a teacher.  You can restore your role and permissions from the course home page."},titles:{equella_content_preview:"Equella content preview",external_link:"Links to an external site.",preview_document:"Preview the document"}},time:{count_hours_ago:{one:"1 hour ago",other:"%{count} hours ago"},count_minutes_ago:{one:"1 minute ago",other:"%{count} minutes ago"},less_than_a_minute_ago:"less than a minute ago"}},"en-GB-x-lbs":{time:{count_hours_ago:{one:"1 hour ago",other:"%{count} hours ago"},count_minutes_ago:{one:"1 minute ago",other:"%{count} minutes ago"},less_than_a_minute_ago:"less than a minute ago"}},"en-GB-x-ukhe":{instructure_js:{alerts:{file_previews_disabled:"File previews have been disabled for this Canvas site"},buttons:{next_module:"Next unit",previous_module:"Previous unit"},draft:"Draft",errors:{posting_message_failed:"Post failed. Try again"},links:{minimize_file_preview:"Minimise file preview",minimize_youtube_video:"Minimise video",view_equella_content_in_new_window:"view the content in a new window"},status:{posting_message:"Posting message..."},switched_roles_message:{designer:"You have switched roles temporarily for this module, and are now viewing the module as a designer.  You can restore your role and permissions from the module home page.",observer:"You have switched roles temporarily for this module, and are now viewing the module as a observer.  You can restore your role and permissions from the module home page.",student:"You have switched roles temporarily for this module, and are now viewing the module as a student.  You can restore your role and permissions from the module home page.",ta:"You have switched roles temporarily for this module, and are now viewing the module as a TA.  You can restore your role and permissions from the module home page.",teacher:"You have switched roles temporarily for this module, and are now viewing the module as a teacher.  You can restore your role and permissions from the module home page."},titles:{equella_content_preview:"Equella content preview",external_link:"Links to an external site.",preview_document:"Preview the document"}},time:{count_hours_ago:{one:"1 hour ago",other:"%{count} hours ago"},count_minutes_ago:{one:"1 minute ago",other:"%{count} minutes ago"},less_than_a_minute_ago:"less than a minute ago"}},es:{time:{count_hours_ago:{one:"hace 1 hora",other:"hace %{count} horas"},count_minutes_ago:{one:"hace 1 minuto",other:"hace %{count} minutos"},less_than_a_minute_ago:"hace menos de un minuto"}},fa:{time:{count_hours_ago:{one:"%{count} \u0633\u0627\u0639\u062a \u0642\u0628\u0644",other:"%{count} \u0633\u0627\u0639\u062a \u0642\u0628\u0644"},count_minutes_ago:{one:"%{count} \u062f\u0642\u06cc\u0642\u0647 \u0642\u0628\u0644",other:"%{count} \u062f\u0642\u06cc\u0642\u0647 \u0642\u0628\u0644"},less_than_a_minute_ago:"\u06a9\u0645\u062a\u0631 \u0627\u0632 \u06cc\u06a9 \u062f\u0642\u06cc\u0642\u0647 \u067e\u06cc\u0634"}},fr:{time:{count_hours_ago:{one:"il y a 1 heure",other:"il y a %{count} heures"},count_minutes_ago:{one:"il y a 1 minute",other:"il y a %{count} minutes"},less_than_a_minute_ago:"il y a moins d\u20191 minute"}},"fr-CA":{time:{count_hours_ago:{one:"il y a 1 heure",other:"il y a %{count} heures"},count_minutes_ago:{one:"il y a 1 minute",other:"il y a %{count} minutes"},less_than_a_minute_ago:"il y a moins d\u2019une minute"}},he:{time:{count_hours_ago:{one:"\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e2\u05d4",other:"\u05dc\u05e4\u05e0\u05d9 %{count} \u05e9\u05e2\u05d5\u05ea"},count_minutes_ago:{one:"\u05dc\u05e4\u05e0\u05d9 \u05d3\u05e7\u05d4",other:"\u05dc\u05e4\u05e0\u05d9 %{count} \u05d3\u05e7\u05d5\u05ea"},less_than_a_minute_ago:"\u05dc\u05e4\u05e0\u05d9 \u05e4\u05d7\u05d5\u05ea \u05de\u05d3\u05e7\u05d4"}},ht:{time:{count_hours_ago:{one:"1 \xe8dtan de sa",other:"%{count} \xe8dtan de sa"},count_minutes_ago:{one:"1 minit de sa",other:"%{count} minit de sa"},less_than_a_minute_ago:"mwens ke yon minit de sa"}},hu:{time:{count_hours_ago:{one:"1 \xf3r\xe1val ezel\u0151tt",other:"%{count} \xf3r\xe1val ezel\u0151tt"},count_minutes_ago:{one:"1 perccel ezel\u0151tt",other:"%{count} perccel ezel\u0151tt"},less_than_a_minute_ago:"kevesebb mint egy perce"}},hy:{time:{count_hours_ago:{one:"1 \u056a\u0561\u0574 \u0561\u057c\u0561\u057b",other:"%{count} \u056a\u0561\u0574 \u0561\u057c\u0561\u057b"},count_minutes_ago:{one:"1 \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b",other:"%{count} \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b"},less_than_a_minute_ago:"\u0561\u057e\u0565\u056c\u056b \u0584\u056b\u0579, \u0584\u0561\u0576 \u0574\u0565\u056f \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b"}},is:{instructure_js:{alerts:{file_previews_disabled:"Forsko\xf0un skr\xe1a er ekki virk fyrir \xfeessa Canvas-s\xed\xf0u"},buttons:{next_module:"N\xe6sta eining",previous_module:"Fyrri eining"},draft:"Dr\xf6g",errors:{posting_message_failed:"Birting t\xf3kst ekki, reyndu aftur"},links:{minimize_file_preview:"L\xe1gmarka forsko\xf0un skr\xe1r",minimize_youtube_video:"Minnka myndband",view_equella_content_in_new_window:"sko\xf0a efni\xf0 \xed n\xfdjum glugga"},status:{posting_message:"Birti skilabo\xf0..."},switched_roles_message:{designer:"\xde\xfa hefur skipt t\xedmabundi\xf0 um hlutverk \xe1 \xfeessu n\xe1mskei\xf0i og s\xe9r\xf0 n\xfa n\xe1mskei\xf0i\xf0 sem h\xf6nnu\xf0ur.  \xde\xfa getur endurheimt hlutverk \xfeitt og heimildir \xe1 heimas\xed\xf0u n\xe1mskei\xf0sins.",observer:"\xde\xfa hefur skipt t\xedmabundi\xf0 um hlutverk \xe1 \xfeessu n\xe1mskei\xf0i og s\xe9r\xf0 n\xfa n\xe1mskei\xf0i\xf0 sem sko\xf0andi.  \xde\xfa getur endurheimt hlutverk \xfeitt og heimildir \xe1 heimas\xed\xf0u n\xe1mskei\xf0sins.",student:"\xde\xfa hefur skipt t\xedmabundi\xf0 um hlutverk \xe1 \xfeessu n\xe1mskei\xf0i og s\xe9r\xf0 n\xfa n\xe1mskei\xf0i\xf0 sem nemandi.  \xde\xfa getur endurheimt hlutverk \xfeitt og heimildir \xe1 heimas\xed\xf0u n\xe1mskei\xf0sins.",ta:"\xde\xfa hefur skipt t\xedmabundi\xf0 um hlutverk \xe1 \xfeessu n\xe1mskei\xf0i og s\xe9r\xf0 n\xfa n\xe1mskei\xf0i\xf0 sem a\xf0stp\xf0arkennari.  \xde\xfa getur endurheimt hlutverk \xfeitt og heimildir \xe1 heimas\xed\xf0u n\xe1mskei\xf0sins.",teacher:"\xde\xfa hefur skipt t\xedmabundi\xf0 um hlutverk \xe1 \xfeessu n\xe1mskei\xf0i og s\xe9r\xf0 n\xfa n\xe1mskei\xf0i\xf0 sem kennari.  \xde\xfa getur endurheimt hlutverk \xfeitt og heimildir \xe1 heimas\xed\xf0u n\xe1mskei\xf0sins."},titles:{equella_content_preview:"Equella forsko\xf0un efnis",external_link:"Tenglar \xe1 ytra sv\xe6\xf0i.",preview_document:"Forsko\xf0a skjal"}},time:{count_hours_ago:{one:"Fyrir 1 klukkustund",other:"Fyrir %{count} klukkustundum"},count_minutes_ago:{one:"Fyrir 1 m\xedn\xfatu",other:"Fyrir %{count} m\xedn\xfatum"},less_than_a_minute_ago:"fyrir t\xe6pri m\xedn\xfatu"}},it:{time:{count_hours_ago:{one:"1 ora fa",other:"%{count} ore fa"},count_minutes_ago:{one:"1 minuto fa",other:"%{count} minuti fa"},less_than_a_minute_ago:"meno di un minuto fa"}},ja:{time:{count_hours_ago:{one:"%{count} \u6642\u9593\u524d",other:"%{count} \u6642\u9593\u524d"},count_minutes_ago:{one:"%{count} \u5206\u524d",other:"%{count} \u5206\u524d"},less_than_a_minute_ago:"1 \u5206\u524d\u672a\u6e80"}},ko:{time:{count_hours_ago:{one:"%{count}\uc2dc\uac04 \uc804",other:"%{count}\uc2dc\uac04 \uc804"},count_minutes_ago:{one:"%{count}\ubd84 \uc804",other:"%{count}\ubd84 \uc804"},less_than_a_minute_ago:"1\ubd84 \uc804 \uc774\ub0b4"}},mi:{instructure_js:{alerts:{file_previews_disabled:"Kua monokia arokite K\u014dnae m\u014d t\u0113nei pae Canvas"},buttons:{next_module:"K\u014dwae Panuku",previous_module:"K\u014dwae mua"},draft:"tauira",errors:{posting_message_failed:"Whakairi rahua, Whakam\u0101tauria ano"},links:{minimize_file_preview:"Whakam\u014dkito Arokitenga K\u014dnae",minimize_youtube_video:"Whakam\u014dkito Ataata",view_equella_content_in_new_window:"tiro te ihirangi i roto i te matapihi hou"},status:{posting_message:"Te tuku Karere ..."},switched_roles_message:{designer:"Kua whakawhiti e koe t\u016branga poto mo t\u0113nei akoranga, a kei te m\u0101takitaki i t\u0113nei i te akoranga me te he kait\u0101tai.  Ka taea e koe te whakahoki t\u014d t\u016branga me whak\u0101etanga i te whare wh\u0101rangi akoranga.",observer:"Kua whakawhiti e koe t\u016branga poto mo t\u0113nei akoranga, a kei te m\u0101takitaki i t\u0113nei i te akoranga hei kaim\u0101takitaki.  Ka taea e koe te whakahoki t\u014d t\u016branga me whak\u0101etanga i te whare wh\u0101rangi akoranga.",student:"Kua whakawhiti e koe t\u016branga poto mo t\u0113nei akoranga, a kei te m\u0101takitaki i t\u0113nei i te akoranga me te he \u0101konga.  Ka taea e koe te whakahoki t\u014d t\u016branga me whak\u0101etanga i te whare wh\u0101rangi akoranga.",ta:"Kua whakawhiti e koe t\u016branga poto mo t\u0113nei akoranga, a kei te m\u0101takitaki i t\u0113nei i te akoranga me te he TA.  Ka taea e koe te whakahoki t\u014d t\u016branga me whak\u0101etanga i te whare wh\u0101rangi akoranga.",teacher:"Kua whakawhiti e koe t\u016branga poto mo t\u0113nei akoranga, a kei te m\u0101takitaki i t\u0113nei i te akoranga ano he kaiako.  Ka taea e koe te whakahoki t\u014d t\u016branga me whak\u0101etanga i te whare wh\u0101rangi akoranga."},titles:{equella_content_preview:"Arokite Ihirangi Equella",external_link:"Hononga ki te pae o waho.",preview_document:"Arokite i te tuhinga"}},time:{count_hours_ago:{one:"1 haora i mua",other:"%{count} haora i mua"},count_minutes_ago:{one:"1 meneti i mua",other:"%{count} meneti i mua"},less_than_a_minute_ago:"iti iho i te i te meneti i mua"}},nb:{time:{count_hours_ago:{one:"1 time siden",other:"%{count} timer siden"},count_minutes_ago:{one:"1 minutt siden",other:"%{count} minutter siden"},less_than_a_minute_ago:"under et minutt siden"}},"nb-x-k12":{time:{count_hours_ago:{one:"1 time siden",other:"%{count} timer siden"},count_minutes_ago:{one:"1 minutt siden",other:"%{count} minutter siden"},less_than_a_minute_ago:"under et minutt siden"}},nl:{time:{count_hours_ago:{one:"1 uur geleden",other:"%{count} uur geleden"},count_minutes_ago:{one:"1 minuut geleden",other:"%{count} minuten geleden"},less_than_a_minute_ago:"minder dan 1 minuut geleden"}},nn:{time:{count_hours_ago:{one:"1 time sidan",other:"%{count} timar sidan"},count_minutes_ago:{one:"1 minutt sidan",other:"%{count} minutt sidan"},less_than_a_minute_ago:"mindre enn eit minutt sidan"}},pl:{time:{count_hours_ago:{one:"1 godzina temu",other:"%{count} godzin temu"},count_minutes_ago:{one:"1 minuta temu",other:"%{count} minut temu"},less_than_a_minute_ago:"mniej ni\u017c minut\u0119 temu"}},pt:{time:{count_hours_ago:{one:"1 hora atr\xe1s",other:"%{count} horas atr\xe1s"},count_minutes_ago:{one:"1 minuto atr\xe1s",other:"%{count} minutos atr\xe1s"},less_than_a_minute_ago:"h\xe1 menos de um minuto"}},"pt-BR":{time:{count_hours_ago:{one:"1 hora atr\xe1s",other:"%{count} horas atr\xe1s"},count_minutes_ago:{one:"1 minuto atr\xe1s",other:"%{count} minutos atr\xe1s"},less_than_a_minute_ago:"h\xe1 menos de um minuto"}},ru:{instructure_js:{alerts:{file_previews_disabled:"\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0444\u0430\u0439\u043b\u0430 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u0441\u0430\u0439\u0442\u0430 Canvas"},buttons:{next_module:"\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u043c\u043e\u0434\u0443\u043b\u044c",previous_module:"\u043f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0438\u0439 \u043c\u043e\u0434\u0443\u043b\u044c"},draft:"\u0427\u0435\u0440\u043d\u043e\u0432\u0438\u043a",errors:{posting_message_failed:"\u0421\u0431\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438, \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443"},links:{minimize_file_preview:"\u0423\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0444\u0430\u0439\u043b\u0430",minimize_youtube_video:"\u0423\u043c\u0435\u043d\u044c\u0448\u0438\u0442\u044c \u0432\u0438\u0434\u0435\u043e",view_equella_content_in_new_window:"\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u044f \u0432 \u043d\u043e\u0432\u043e\u043c \u043e\u043a\u043d\u0435"},status:{posting_message:"\u041f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u044f \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f..."},switched_roles_message:{designer:"\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0440\u043e\u043b\u0438 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043a\u0443\u0440\u0441 \u043a\u0430\u043a \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440.  \u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u043e\u043b\u044c \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u0430.",observer:"\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0440\u043e\u043b\u0438 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043a\u0443\u0440\u0441 \u043a\u0430\u043a \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0442\u0435\u043b\u044c.  \u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u043e\u043b\u044c \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u0430.",student:"\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0440\u043e\u043b\u0438 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043a\u0443\u0440\u0441 \u043a\u0430\u043a \u0441\u0442\u0443\u0434\u0435\u043d\u0442.  \u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u043e\u043b\u044c \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u0430.",ta:"\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0440\u043e\u043b\u0438 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043a\u0443\u0440\u0441 \u043a\u0430\u043a \u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043d\u0442.  \u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u043e\u043b\u044c \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u0430.",teacher:"\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u043b\u0438 \u0440\u043e\u043b\u0438 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043a\u0443\u0440\u0441\u0430 \u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043a\u0443\u0440\u0441 \u043a\u0430\u043a \u0443\u0447\u0438\u0442\u0435\u043b\u044c.  \u041c\u043e\u0436\u043d\u043e \u0432\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0440\u043e\u043b\u044c \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u0438\u044f \u043d\u0430 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043a\u0443\u0440\u0441\u0430."},titles:{equella_content_preview:"\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0441\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u044f Equella",external_link:"\u0421\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u0432\u043d\u0435\u0448\u043d\u0438\u0439 \u0441\u0430\u0439\u0442.",preview_document:"\u041f\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430"}},time:{count_hours_ago:{one:"1 \u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434",other:"%{count} \u0447\u0430\u0441\u0430(\u043e\u0432) \u043d\u0430\u0437\u0430\u0434"},count_minutes_ago:{one:"1 \u043c\u0438\u043d\u0443\u0442\u0430 \u043d\u0430\u0437\u0430\u0434",other:"%{count} \u043c\u0438\u043d\u0443\u0442(\u044b) \u043d\u0430\u0437\u0430\u0434"},less_than_a_minute_ago:"\u043c\u0435\u043d\u044c\u0448\u0435 \u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434"}},sl:{time:{count_hours_ago:{one:"1 uro prej",other:"%{count} ur prej"},count_minutes_ago:{one:"1 minuto prej",other:"%{count} minut prej"},less_than_a_minute_ago:"manj kot minuto prej"}},sv:{time:{count_hours_ago:{one:"1 timme sedan",other:"%{count} timmar sen"},count_minutes_ago:{one:"1 minut sedan",other:"%{count} minuter sedan"},less_than_a_minute_ago:"mindre \xe4n en minut sen"}},"sv-x-k12":{time:{count_hours_ago:{one:"1 timme sedan",other:"%{count} timmar sen"},count_minutes_ago:{one:"1 minut sedan",other:"%{count} minuter sedan"},less_than_a_minute_ago:"mindre \xe4n en minut sen"}},tr:{time:{count_hours_ago:{one:"1 saat \xf6nce",other:"%{count} saat \xf6nce"},count_minutes_ago:{one:"1 dakika \xf6nce",other:"%{count} dakika \xf6nce"},less_than_a_minute_ago:"bir dakikadan daha az"}},uk:{time:{count_hours_ago:{one:"1 \u0433\u043e\u0434\u0438\u043d\u0430 \u0442\u043e\u043c\u0443",other:"%{count} \u0433\u043e\u0434\u0438\u043d \u0442\u043e\u043c\u0443"},count_minutes_ago:{one:"1 \u0445\u0432\u0438\u043b\u0438\u043d\u0430 \u0442\u043e\u043c\u0443",other:"%{count} \u0445\u0432\u0438\u043b\u0438\u043d \u0442\u043e\u043c\u0443"},less_than_a_minute_ago:"\u041c\u0435\u043d\u0448\u0435, \u043d\u0456\u0436 \u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443"}},"zh-Hans":{time:{count_hours_ago:{one:"%{count} \u5c0f\u65f6\u524d",other:"%{count} \u5c0f\u65f6\u524d"},count_minutes_ago:{one:"%{count} \u5206\u949f\u524d",other:"%{count} \u5206\u949f\u524d"},less_than_a_minute_ago:"\u4e0d\u5230\u4e00\u5206\u949f\u524d"}},"zh-Hant":{time:{count_hours_ago:{one:"%{count}\u5c0f\u6642\u4ee5\u524d",other:"%{count} \u5c0f\u6642\u4ee5\u524d"},count_minutes_ago:{one:"%{count}\u5206\u9418\u4ee5\u524d",other:"%{count} \u5206\u9418\u4ee5\u524d"},less_than_a_minute_ago:"\u4e0d\u5230\u4e00\u5206\u9418\u4ee5\u524d"}}}})},cyMNwMhBvy:function(e,t,i){"use strict"
var n=i("+JpRIS14Qm")
t.a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.pathname,t={hide:{default:n.a.t("Hide Navigation Menu"),account:n.a.t("Hide Account Navigation Menu"),admin:n.a.t("Hide Admin Navigation Menu"),courses:n.a.t("Hide Courses Navigation Menu"),groups:n.a.t("Hide Groups Navigation Menu")},show:{default:n.a.t("Show Navigation Menu"),account:n.a.t("Show Account Navigation Menu"),admin:n.a.t("Show Admin Navigation Menu"),courses:n.a.t("Show Courses Navigation Menu"),groups:n.a.t("Show Groups Navigation Menu")}},i=document.body.classList.contains("course-menu-expanded")?"hide":"show",a=t[i].default
e.match(/^\/profile/)?a=t[i].account:e.match(/^\/accounts/)?a=t[i].admin:e.match(/^\/courses/)?a=t[i].courses:e.match(/^\/groups/)&&(a=t[i].groups)
var o=document.getElementById("courseMenuToggle")
o.setAttribute("aria-label",a)
o.setAttribute("title",a)}},dNJxE1iMRL:function(e,t,i){"use strict"
t.a=function(e){if(e.match(/javascript:/))return"about:blank"
return e}},evahSH1MgD:function(e,t,i){"use strict"
var n=i("iBw8ZGM6v8"),a=i.n(n),o={call:function(e){if("exists?"===e)return!0
for(var t=arguments.length,i=new Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n]
return this[e].apply(this,i)},focus:function(){if(void 0!==tinymce){var e=tinymce.get(this._textareaEl.id)
e&&e.focus(!0)}}},r={show:function(){$("#editor_tabs").show()},hide:function(){$("#editor_tabs").hide()}},s={wrapEditor:function(e){var t=a.a.extend({},o,e)
return a.a.extend(e,t)},wrapSidebar:function(e){var t=a.a.extend({},r,e)
return a.a.extend(e,t)}}
t.a=s},"f+YlSntt6E":function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{ar:{locked_image_24f37a16:"\u0635\u0648\u0631\u0629 \u0645\u0624\u0645\u0651\u0646\u0629"},cy:{locked_image_24f37a16:"Delwedd wedi\u2019i chloi"},da:{locked_image_24f37a16:"L\xe5st billede"},"da-x-k12":{locked_image_24f37a16:"L\xe5st billede"},de:{locked_image_24f37a16:"Gesperrtes Bild"},"en-AU":{locked_image_24f37a16:"Locked image"},"en-CA":{locked_image_24f37a16:"Locked image"},"en-GB":{locked_image_24f37a16:"Locked image"},"en-GB-x-lbs":{locked_image_24f37a16:"Locked image"},"en-GB-x-ukhe":{locked_image_24f37a16:"Locked image"},es:{locked_image_24f37a16:"Imagen bloqueada"},fr:{locked_image_24f37a16:"Image verrouill\xe9e"},"fr-CA":{locked_image_24f37a16:"Image verrouill\xe9e"},ht:{locked_image_24f37a16:"Imaj Bloke"},is:{locked_image_24f37a16:"L\xe6st mynd"},it:{locked_image_24f37a16:"Immagine bloccata"},ja:{locked_image_24f37a16:"\u30ed\u30c3\u30af\u3055\u308c\u305f\u753b\u50cf"},mi:{locked_image_24f37a16:"\u0100hua kua rakaina"},nb:{locked_image_24f37a16:"L\xe5st bilde"},"nb-x-k12":{locked_image_24f37a16:"L\xe5st bilde"},nl:{locked_image_24f37a16:"Vergrendelde afbeelding"},pl:{locked_image_24f37a16:"Zablokowany obraz"},pt:{locked_image_24f37a16:"Imagem bloqueada"},"pt-BR":{locked_image_24f37a16:"Imagem bloqueada"},ru:{locked_image_24f37a16:"\u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u043e\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"},sl:{locked_image_24f37a16:"Zaklenjena slika"},sv:{locked_image_24f37a16:"L\xe5st bild"},"sv-x-k12":{locked_image_24f37a16:"L\xe5st bild"},"zh-Hans":{locked_image_24f37a16:"\u9501\u5b9a\u56fe\u7247"},"zh-Hant":{locked_image_24f37a16:"\u9396\u5b9a\u5716\u50cf"}}})},fMZxOSn6U9:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("/W/ggH9WyQ")
function r(e){o.a.loadSidebarOnTarget(a()("#editor_tabs").get(0),e)}var s={instance:void 0,pendingShow:!1,initializing:!1,subscriptions:{},init:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
if(!this.instance&&!this.initializing){this.initializing=!0
r(function(t){e.initializing=!1
e.instance=t
e.pendingShow&&e.show()})}this.subscriptions=t},show:function(){if(this.instance){this.instance.show()
this.subscriptions.show&&this.subscriptions.show()}else this.pendingShow=!0},hide:function(){if(this.instance){this.instance.hide()
this.subscriptions.hide&&this.subscriptions.hide()}else this.pendingShow=!1},reset:function(){this.instance=void 0
this.initializing=!1
this.subscriptions={}}}
t.a=s},hpV4JWU0K6:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("eJBzaBDd6c"),r=i("mBXxSvYXqz"),s=i("TVAqaFMvRJ"),d=(i("kzdUuF07HD"),i("pmU8As9kkw"),i("3pTo86YxQs"),i("Z6MXnY8QXm")),c=["instructure_scribd_file"],l=["instructure_scribd_file"],u=new WeakMap
function m(e){var t=e.closest("img").attr("src")
return"<img src='"+Object(o.a)(t)+"'/>"}function _(e){e.nodeChanged()
return new r.a(e)}function h(e,t){var i=e.replace(/(auto_open|inline_disabled)/g,"")
t.find(".auto_show_inline_content").attr("checked")&&(i+=" auto_open")
t.find(".disable_inline_content").attr("checked")&&(i+=" inline_disabled")
return i}function f(e,t,i,n){var o=e.find("#instructure_link_prompt_form")
o.off("submit")
o.on("submit",function(o){o.preventDefault()
o.stopPropagation()
e.data("editor")
var r=a()(this).find(".prompt").val(),s=e.find(".inst-link-preview-alt input").val(),d=h(i.call(),e),c={"preview-alt":s}
e.dialog("close")
t.createLink(r,d,c)
n.call()})}function p(e,t){p.counter=p.counter||0
1==t&&0!=p.counter?p.counter=(p.counter+1)%5:a()(e.getBody()).find("a").each(function(){var e=new d.a,t=a()(this)
if(t.attr("href")&&!t.hasClass("inline_disabled")&&t.attr("href").match(INST.youTubeRegEx)){var i=+t.attr("data-ytt-failcnt")||0
t.addClass("youtube_link_to_box")
t.text()===t.attr("href")&&i<1&&e.titleYouTubeText(t)}})}t.a={buttonToImg:m,prepEditorForDialog:_,buildLinkClasses:h,bindLinkSubmit:f,renderDialog:function(e){var t=_(e),i=t.getEditor(),n="";(o=a()("#instructure_link_prompt")).removeClass("for_inline_content").find(".disable_enhancement").hide().end().find(".auto_show").hide().end().find(".insert_button").text("Insert Link").end().find(".disable_inline_content").attr("checked",!1).end().find(".auto_show_inline_content").attr("checked",!1)
if(0==o.length){var o=a()(document.createElement("div"))
a.a.getUserServices("BookmarkService",function(e){var t,i,r=o.data("editor"),d=a()("<div style='text-align: left; margin-left: 20px;'/>")
for(var c in e)if(t=e[c].user_service){(i=a()("<a href='#' class='bookmark_service no-hover'/>")).addClass(t.service)
i.data("service",t)
i.attr("title","Find links using "+t.service)
var l=a()("<img/>")
l.attr("src","/images/"+t.service+"_small_icon.png")
i.append(l)
i.click(function(e){e.preventDefault()
a()("#instructure_link_prompt").dialog("close")
a.a.findLinkForService(a()(this).data("service").service,function(e){a()("#instructure_link_prompt").dialog("close")
Object(s.d)(r,"create_link",{title:e.title,url:e.url,classes:n})})})
d.append(i)
d.append("&nbsp;&nbsp;")}o.find("#instructure_link_prompt_form").after(d)})
o.append("<p><em>This will make the selected text a link, or insert a new link if nothing is selected.</em></p> <label for='instructure_link_prompt_form_input'>Paste or type a url or wiki page in the box below:</label><form id='instructure_link_prompt_form' class='form-inline'><input type='text' id='instructure_link_prompt_form_input' class='prompt' class='btn' value='http://'/> <button type='submit' class='insert_button btn'>Insert Link</button></form>").append("<div class='actions'></div><div class='clear'></div>").append('<div class="inst-link-preview-alt" style="display: none;"><label>Alt text for inline preview: <input type="text" style="display: block;" /></label></div>').append("<div class='disable_enhancement' style='display: none;'><input type='checkbox' class='disable_inline_content' id='disable_inline_content'/><label for='disable_inline_content'> Disable inline previews for this link</label></div>").append("<div class='auto_show' style='display: none;'><input type='checkbox' class='auto_show_inline_content' id='auto_show_inline_content'/><label for='auto_show_inline_content'> Auto-open the inline preview for this link</label></div>")
o.find(".disable_inline_content").change(function(){a()(this).attr("checked")&&o.find(".auto_show_inline_content").attr("checked",!1)
o.find(".auto_show").showIf(!a()(this).attr("checked")&&o.hasClass("for_inline_content_can_auto_show"))})
o.find(".actions").delegate(".embed_image_link","click",function(e){var t=o.data("editor"),i=a()(e.target)
e.preventDefault()
Object(s.d)(t,"insert_code",m(i))
o.dialog("close")})
o.find(".actions").delegate(".embed_youtube_link","click",function(e){e.preventDefault()
o.find("#instructure_link_prompt_form").triggerHandler("submit")})
o.find("#instructure_link_prompt_form .prompt").bind("change keyup",function(){var e=o.find(".inst-link-preview-alt")
e.hide()
a()("#instructure_link_prompt .actions").empty()
var t=a()(this).val(),i=o.data("original_data")
if(i&&t==i.url){o.toggleClass("for_inline_content",i.for_inline_content).toggleClass("for_inline_content_can_auto_show",i.for_inline_content_can_auto_show).find(".disable_enhancement").showIf(i.for_inline_content).end().find(".auto_show").showIf(i.for_inline_content_can_auto_show)
n=i.prior_classes}else{o.removeClass("for_inline_content").removeClass("for_inline_content_can_auto_show")
var r=new RegExp("("+c.join("|")+")","g")
n=n.replace(r,"")}var s=!o.hasClass("for_inline_content"),d=!o.hasClass("for_inline_content_can_auto_show")
if(t.match(/\.(gif|png|jpg|jpeg)$/)){(u=a()(document.createElement("div"))).css("textAlign","center");(m=a()(document.createElement("img"))).attr("src",t)
m.addClass("embed_image_link")
m.css("cursor","pointer")
var l=new Image
l.src=t
setTimeout(function e(){l.complete?(l.height<100||l.height>100&&l.height<200)&&m.height(l.height):setTimeout(e,500)},500)
m.height(100)
m.attr("title","Click to Embed the Image")
u.append(m)
a()("#instructure_link_prompt .actions").append(u)}else if(t.match(INST.youTubeRegEx)){e.show()
var u,m,_=a.a.youTubeID(t);(u=a()(document.createElement("div"))).css("textAlign","center")
!o.find(".disable_inline_content").attr("checked")&&o.hasClass("for_inline_content_can_auto_show")&&o.find(".auto_show").show()
s=!1
o.find(".disable_enhancement").show();(m=a()(document.createElement("img"))).attr("src","http://img.youtube.com/vi/"+_+"/2.jpg")
m.css({paddingLeft:100,background:"url(/images/youtube_logo.png) no-repeat left center",height:90,display:"inline-block"})
m.attr("alt",t)
m.addClass("embed_youtube_link")
m.css("cursor","pointer")
m.attr("title","Click to Embed YouTube Video")
u.append(m)
a()("#instructure_link_prompt .actions").append(u)}if(s){o.find(".disable_enhancement").hide()
o.find(".disable_inline_content").attr("checked",!1)}if(d){o.find(".auto_show").hide()
o.find(".auto_show_inline_content").attr("checked",!1)}})
o.attr("id","instructure_link_prompt")
a()("body").append(o)}f(o,t,function(){return n},function(){p(e,!0)})
o.data("editor",i)
o.data("original_data",null)
for(var r=e.selection.getNode();"A"!=r.nodeName&&"BODY"!=r.nodeName&&r.parentNode;)r=r.parentNode
var d="A"==r.nodeName?a()(r):null
if(d){o.find(".prompt").val(d.attr("href")).change()
o.find(".inst-link-preview-alt input").val(d.data("preview-alt"))
n=(d.attr("class")||"").replace(/youtube_link_to_box/,"")
var u=new RegExp("("+c.join("|")+")");(d.attr("class")||"").match(u)&&o.addClass("for_inline_content").find(".disable_enhancement").show()
u=new RegExp("("+l.join("|")+")");(d.attr("class")||"").match(u)&&o.addClass("for_inline_content_can_auto_show").find(".auto_show").show()
o.data("original_data",{url:d.attr("href"),for_inline_content:o.hasClass("for_inline_content"),for_inline_content_can_auto_show:o.hasClass("for_inline_content_can_auto_show"),prior_classes:n,preview_alt:d.data("preview-alt")})
o.find(".disable_inline_content").attr("checked",d.hasClass("inline_disabled")).triggerHandler("change")
o.find(".auto_show_inline_content").attr("checked",d.hasClass("auto_open")).triggerHandler("change")
o.find(".insert_button").text("Update Link")}else o.find(".prompt").val("").change()
o.dialog({width:425,height:"auto",title:"Link to Website URL",open:function(){a()(this).find(".prompt").focus().select()}})},updateLinks:p,initEditor:function(e){if(!u.get(e)&&void 0!==e.on){e.on("PreProcess",function(e){a()(e.node).find("a.youtube_link_to_box").removeClass("youtube_link_to_box")
a()(e.node).find("img.iframe_placeholder").each(function(){var e=a()(this),t=a()("<iframe/>"),i=e.attr("height")||e.css("height"),n=e.hasClass("fullWidth")?"100%":e.attr("width")||e.css("width")
e.attr("width",n)
e.css("width",n)
t.attr("src",e.attr("rel"))
t.attr("style",e.attr("_iframe_style"))
if(!t[0].style.height.length){t.attr("height",i)
t.css("height",i)}if(!t[0].style.width.length){t.attr("width",n)
t.css("width",n)}a()(this).after(t)
a()(this).remove()})})
e.on("change",function(){p(e)})
e.on("SetContent",function(){p(e,"contentJustSet")})
u.set(e,!0)}}}},i7SnyCtYw6:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("7kvb1n675f"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("jquery_doc_previews")},k3GUwmDQvP:function(e,t,i){"use strict"
var n=i("36QOWIB4+W"),a=i("mOY9BNujNR")
i.n(a).a.extend(!0,n.default,{translations:{"en-AU":{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Keyboard Shortcuts"}}},"en-CA":{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Keyboard Shortcuts"}}},"en-GB":{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Keyboard shortcuts"}}},"en-GB-x-ukhe":{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Keyboard shortcuts"}}},is:{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Fl\xfdtilyklar"}}},mi:{KeyboardNavDialog:{titles:{keyboard_shortcuts:"Pokatata papap\u0101tuhi"}}},ru:{KeyboardNavDialog:{titles:{keyboard_shortcuts:"\u041a\u043b\u0430\u0432\u0438\u0448\u0438 \u0431\u044b\u0441\u0442\u0440\u043e\u0433\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u0430"}}}}})},l1QdNhNedg:function(e,t,i){"use strict"
var n=i("Hr9DhKvWcz"),a=i("iBw8ZGM6v8"),o=i.n(a),r=i("eJBzaBDd6c"),s=i("mOY9BNujNR"),d=i.n(s),c=i("rtbs8pMf93"),l={normal:{width:140,height:100},small:{width:70,height:50}}
function u(e,t,i){if(!INST.kalturaSettings)return console.log("Kaltura has not been enabled for this account")
var a,o,s=d()(e)
try{var u=document.createElement("a")
u.href=s.attr("href")
o=u}catch(e){}if(!o||!Object(c.a)(o.search).no_preview){var m,_=l[t]||l.normal,h=s.data("media_comment_id")||d.a.trim(s.find(".media_comment_id:first").text())||(a=s.attr("id"))&&a.match(/^media_comment_/)&&a.substring(14)||d.a.trim(s.parent().find(".media_comment_id:first").text()),f=s.data("author"),p=s.data("created_at")
m=f&&p?n.a.t("Play media comment by %{name} from %{createdAt}.",{name:f,createdAt:p}):n.a.t("Play media comment.")
if(h){var g="https://".concat(INST.kalturaSettings.resource_domain),v="".concat(g,"/p/").concat(INST.kalturaSettings.partner_id,"/thumbnail/entry_id/").concat(h,"/width/")+"".concat(_.width,"/height/").concat(_.height,"/bgcolor/000000/type/2/vid_sec/5"),b=d()("<span\n        style='background-image: url(".concat(Object(r.a)(v),");'\n        class='media_comment_thumbnail media_comment_thumbnail-").concat(Object(r.a)(t),"'\n      >\n        <span class='media_comment_thumbnail_play_button'>\n          <span class='screenreader-only'>\n            ").concat(Object(r.a)(m),"\n          </span>\n        </span>\n      </span>")),y=s.closest("p")
y.attr("title")||y.attr("title",Object(r.a)(m))
var k=s
if(i){k=s.clone().empty().removeClass("instructure_file_link")
var w=s.parent(".instructure_file_link_holder")
w.length?k.appendTo(w):s.after(k)}else s.empty()
k.data("download",k.attr("href")).prop("href","#").addClass("instructure_inline_media_comment").append(b).css({backgroundImage:"",padding:0})}}}d.a.fn.mediaCommentThumbnail=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"normal",t=arguments.length>1?arguments[1]:void 0
return this.each(function(){o.a.defer(u,this,e,t)})}},mBXxSvYXqz:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("TVAqaFMvRJ")
t.a=function(e,t){this.id=e.id
this.selectedContent=e.selection.getContent()
this.selectionDetails={node:e.selection.getNode(),range:e.selection.getRng()}
this.$editorEl=t
this.getEditor=function(){return void 0!==this.$editorEl?this.$editorEl:a()("#"+this.id)}
this.createLink=function(e,t,i){Object(o.d)(this.getEditor(),"create_link",{url:e,classes:t,selectedContent:this.selectedContent,dataAttributes:i,selectionDetails:this.selectionDetails})}}},nXH6nMYdz2:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("eJBzaBDd6c")
i("kzdUuF07HD")
a.a.fn.fillTemplateData=function(e){if(this.length&&e){e.iterator&&this.find("*").andSelf().each(function(){var t=a()(this)
a.a.each(["name","id","class"],function(i,n){t.attr(n)&&t.attr(n,t.attr(n).replace(/-iterator-/,e.iterator))})})
e.id&&this.attr("id",e.id)
var t=!1
if(e.data)for(var i in e.data)if(!e.except||-1==a.a.inArray(i,e.except)){e.data[i]&&e.dataValues&&-1!=a.a.inArray(i,e.dataValues)&&this.data(i,e.data[i].toString())
var n=this.find("."+i),r=e.avoid||""
n.each(function(){var n=a()(this)
if(n.length>0&&0===n.closest(r).length){void 0!==e.data[i]&&null!==e.data[i]||(e.data[i]="")
if(e.htmlValues&&-1!=a.a.inArray(i,e.htmlValues)){n.html(a.a.raw(e.data[i].toString()))
if(n.hasClass("user_content")){t=!0
n.removeClass("enhanced")
n.data("unenhanced_content_html",e.data[i].toString())}}else if("INPUT"==n[0].tagName.toUpperCase())n.val(e.data[i])
else try{var s=e.data[i].toString()
n.html(Object(o.a)(s))}catch(e){}}})}e.hrefValues&&e.data&&this.find("a,span[rel]").each(function(){var t,i,n,o=a()(this)
for(var r in e.hrefValues)if(e.hrefValues.hasOwnProperty(r)){var s=e.hrefValues[r]
if(t=o.attr("href")){var d=a.a.replaceTags(t,s,encodeURIComponent(e.data[s])),c=o.text()===o.html()?o.text():null
if(t!==d){o.attr("href",d)
c&&o.text(c)}}(i=o.attr("rel"))&&o.attr("rel",a.a.replaceTags(i,s,e.data[s]));(n=o.attr("name"))&&o.attr("name",a.a.replaceTags(n,s,e.data[s]))}})
t&&a()(document).triggerHandler("user_content_change")}return this}
a.a.fn.fillTemplateData.defaults={htmlValues:null,hrefValues:null}
a.a.fn.getTemplateData=function(e){if(!this.length||!e)return{}
var t,i={}
if(e.textValues){var n=this
e.textValues.forEach(function(e){var t=n.find("."+e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")+":first")
o=a.a.trim(t.text())
"&nbsp;"===t.html()&&(o="")
1===o.length&&160===o.charCodeAt(0)&&(o="")
i[e]=o})}if(e.dataValues)for(t in e.dataValues){var o;(o=this.data(e.dataValues[t]))&&(i[e.dataValues[t]]=o)}if(e.htmlValues)for(t in e.htmlValues){var r=this.find("."+e.htmlValues[t].replace(/\[/g,"\\[").replace(/\]/g,"\\]")+":first")
o=null
o=r.hasClass("user_content")&&r.data("unenhanced_content_html")?r.data("unenhanced_content_html"):a.a.trim(r.html())
i[e.htmlValues[t]]=o}return i}
a.a.fn.getTemplateValue=function(e,t){var i=a.a.extend({},t,{textValues:[e]})
return this.getTemplateData(i)[e]}},"nwUwKBv/gu":function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=(i("O9QjtziI9Q"),i("1YHB9uvbU1"),i("Nf4R7G01V5"),0),r=!1
a.a.widget("ui.popup",{version:"@VERSION",options:{position:{my:"left top",at:"left bottom"},managed:!1,expandOnFocus:!1,show:{effect:"slideDown",duration:0},hide:{effect:"fadeOut",duration:0}},_create:function(){this.options.trigger||(this.options.trigger=this.element.prev())
if(!this.element.attr("id")){this.element.attr("id","ui-popup-"+o++)
this.generatedId=!0}if(!this.element.attr("role")&&!this.options.managed){this.element.attr("role","dialog")
this.generatedRole=!0}this.options.trigger.attr("aria-haspopup","true").attr("aria-owns",this.element.attr("id"))
this.element.addClass("ui-popup")
this._beforeClose()
this.element.hide()
var e=function(e){var t=!1
a()(e.target).is("input")&&(t=!0)
if(this.isOpen){r=!0
this.close()}else{this.open(e)
clearTimeout(this.closeTimer)
this._delay(function(){t||this.focusPopup()},1)}}
this._on(this.options.trigger,{keydown:function(e){switch(e.keyCode){case a.a.ui.keyCode.TAB:this.element.hide()
this.close(e)
break
case a.a.ui.keyCode.ESCAPE:this.isOpen&&this.close(e)
break
case a.a.ui.keyCode.SPACE:case a.a.ui.keyCode.DOWN:case a.a.ui.keyCode.UP:e.preventDefault()
clearTimeout(this.closeTimer)
this._delay(function(){this.open(e)
this.focusPopup(e)},1)}},mouseup:function(e){this.mouseClickTimer=window.setTimeout(function(){delete this.mouseClickTimer}.bind(this),0)},click:function(t){t.stopPropagation()
t.preventDefault()
this.mouseClickTimer||e.call(this,t)},mousedown:e})
this.options.expandOnFocus&&this._on(this.options.trigger,{focus:function(e){r||this._delay(function(){this.isOpen||this.open(e)},1)
this._delay(function(){r=!1},100)},blur:function(e){r=!1}})
this.options.managed||this._on({keydown:function(e){if(e.keyCode===a.a.ui.keyCode.TAB){var t=a()(":tabbable",this.element),i=t.first(),n=t.last()
if(e.target!==n[0]||e.shiftKey){if(e.target===i[0]&&e.shiftKey){n.focus(1)
e.preventDefault()}}else{i.focus(1)
e.preventDefault()}}}})
this._on({focusout:function(e){this.closeTimer=this._delay(function(){this.close(e)},150)},focusin:function(e){clearTimeout(this.closeTimer)},mouseup:function(e){clearTimeout(this.closeTimer)}})
this._on({keyup:function(e){if(e.keyCode===a.a.ui.keyCode.ESCAPE&&this.element.is(":visible")){this.close(e)
this.focusTrigger()}}})
this._on(this.document,{click:function(e){this.isOpen&&!a()(e.target).closest(this.element.add(this.options.trigger)).length&&this.close(e)}})},_destroy:function(){this.element.show().removeClass("ui-popup").removeAttr("aria-hidden").removeAttr("aria-expanded").unbind("keypress.ui-popup")
this.options.trigger.removeAttr("aria-haspopup").removeAttr("aria-owns")
this.generatedId&&this.element.removeAttr("id")
this.generatedRole&&this.element.removeAttr("role")},open:function(e){var t=a.a.extend({},{of:this.options.trigger},this.options.position)
this._show(this.element,this.options.show)
this.element.attr("aria-hidden","false").attr("aria-expanded","true").position(t)
this.options.trigger.attr("tabindex",-1)
this.isOpen=!0
this._trigger("open",e)},focusPopup:function(e){if(!this.options.managed){var t=this.element.find(":tabbable")
this.removeTabIndex=!1
if(!t.length){if(!this.element.is(":tabbable")){this.element.attr("tabindex","0")
this.removeTabIndex=!0}t=t.add(this.element[0])}t.first().focus(1)}this._trigger("focusPopup",e)},focusTrigger:function(e){r=!0
this.options.trigger.focus()
this._trigger("focusTrigger",e)},close:function(e){this._beforeClose()
this._hide(this.element,this.options.hide)
this.options.trigger.attr("tabindex",0)
this.removeTabIndex&&this.element.removeAttr("tabindex")
this.isOpen=!1
this._trigger("close",e)},_beforeClose:function(){this.element.attr("aria-hidden","true").attr("aria-expanded","false")}})},qagVT2atnL:function(e,t,i){"use strict"
var n=i("iBw8ZGM6v8"),a=i.n(n),o=i("EHPQ5oFRp/"),r=i("QNUVZwyfqV"),s=i("whMk0QU2To")
t.a=function(e,t,i,n,d){var c=new o.a(d,s.a,e,t)
return a.a.extend({},c.defaultConfig(),Object(r.a)(d,void 0,n),i.tinyOptions||{})}},rjooEDBazu:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("VUXUHQpzb6"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("ExternalToolsPlugin")},rtbs8pMf93:function(e,t,i){"use strict"
t.a=function e(t,i){if(!t||"boolean"==typeof t){var r=window.location.search
return r?e.apply(void 0,[r].concat(Array.prototype.slice.call(arguments))):{}}var s={}
t.replace(/\+/g," ").split("&").forEach(function(e){var t=e.split("="),a=Object(n.a)(t,2),r=a[0],d=a[1]
r=decodeURIComponent(r)
d=decodeURIComponent(d)
i&&(d=d&&!isNaN(d)?+d:"undefined"===d?void 0:void 0!==o[d]?o[d]:d)
s[r]=d})
return Object(a.a)(s)}
var n=i("WR00QyMOD2"),a=i("sRkgs379hW"),o={true:!0,false:!1,null:null}},sRkgs379hW:function(e,t,i){"use strict"
t.a=function(e){return a()(e).reduce(function(e,t,i){var n=i.split("]["),o=n.length-1
if(/\[/.test(n[0])&&/\]$/.test(n[o])){n[o]=n[o].replace(/\]$/,"")
n=n.shift().split("[").concat(n)
o=n.length-1}else o=0
if(o)for(var r=0,s=e;r<=o;){i=""===n[r]?s.length:n[r]
s=s[i]=r<o?s[i]||(n[r+1]&&isNaN(n[r+1])?{}:[]):t
r++}else a.a.isArray(e[i])?e[i].push(t):null!=e[i]?e[i]=[e[i],t]:e[i]=t
return e},{})}
var n=i("iBw8ZGM6v8"),a=i.n(n)},sqpSUkotFw:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("k3GUwmDQvP"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("KeyboardNavDialog")},xolCioscxi:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n)
a.a.fn.dropdownList=function(e){if(this.length){var t=a()("#instructure_dropdown_list")
if("hide"==e||"remove"==e||t.data("current_dropdown_initiator")==this[0]){t.remove().data("current_dropdown_initiator",null)
return}e=a.a.extend({},a.a.fn.dropdownList.defaults,e)
var i=t.children("div.list")
if(!i.length){t=a()("<div id='instructure_dropdown_list'><div class='list ui-widget-content'></div></div>").appendTo("body")
a()(document).mousedown(function(e){t.data("current_dropdown_initiator")&&!a()(e.target).closest("#instructure_dropdown_list").length&&t.hide().data("current_dropdown_initiator",null)}).mouseup(function(e){if(t.data("current_dropdown_initiator")&&!a()(e.target).closest("#instructure_dropdown_list").length){t.hide()
setTimeout(function(){t.data("current_dropdown_initiator",null)},100)}}).add(this).add(t).keydown(function(e){if(t.data("current_dropdown_initiator")){var i=t.find(".ui-state-hover,.ui-state-active")
if(38==e.keyCode){i.length&&i.prev().length?i.removeClass("ui-state-hover ui-state-active").addClass("minimal").prev().addClass("ui-state-hover").removeClass("minimal").find("span").focus():$item.focus()
return!1}if(40==e.keyCode){i.length?i.next().length&&i.removeClass("ui-state-hover ui-state-active").addClass("minimal").next().addClass("ui-state-hover").removeClass("minimal").find("span").focus():t.find(".option:first").addClass("ui-state-hover").removeClass("minimal").find("span").focus()
return!1}if(13==e.keyCode&&i.length){i.click()
return!1}t.hide().data("current_dropdown_initiator",null)}})
t.find(".option").removeClass("ui-state-hover ui-state-active").addClass("minimal")
t.click(function(e){t.hide().data("current_dropdown_initiator",null)})
i=t.children("div.list")}t.data("current_dropdown_initiator",this[0])
e.width&&t.width(e.width)
e.height&&t.find(".list").css("maxHeight",e.height)
i.empty()
a.a.each(e.options,function(e,t){var n=a()("<div class='option minimal' style='cursor: pointer; padding: 2px 5px; overflow: hidden; white-space: nowrap;'>  <span tabindex='-1'>"+e+"</span></div>").appendTo(i)
function o(){n.parent().find("div.option").removeClass("ui-state-hover ui-state-active").addClass("minimal")}a.a.isFunction(t)?n.addClass("ui-state-default").bind({mouseenter:function(){o()
n.addClass("ui-state-hover").removeClass("minimal")},mouseleave:o,mousedown:function(e){e.preventDefault()
o()
n.addClass("ui-state-active").removeClass("minimal")},mouseup:o,click:t}):n.addClass("ui-state-disabled").bind({mousedown:function(e){e.preventDefault()}})})
var n=this.offset(),o=this.outerHeight()
this.outerWidth()
t.css({whiteSpace:"nowrap",position:"absolute",top:n.top+o,left:n.left+5,right:""}).hide().show()
t.offset().left+t.width()>a()(window).width()&&t.css({left:"",right:0})}return this}
a.a.fn.dropdownList.defaults={height:250,width:"auto"}},zJMn3FxdoK:function(e,t,i){"use strict"
var n=i("36QOWIB4+W")
i("Gi7cFyVsdV"),i("PyJFCi/UoU"),i("XDPawBHrta")
t.a=n.default.scoped("jquery_media_comments")},"zNOhtK+31x":function(e,t,i){"use strict"
i.d(t,"a",function(){return s})
var n=i("l2OaefyPCY"),a=i("pI4K9aISfJ"),o=i("mOY9BNujNR"),r=i.n(o),s=(i("V0DFOiAOkw"),i("kWQsjZQaF4"),i("nwUwKBv/gu"),function(){function e(t,i){var a=this
Object(n.a)(this,e);["onOpen","select","onClose","close","keepButtonActive"].forEach(function(e){return a[e]=a[e].bind(a)})
this.$trigger=r()(t).data("kyleMenu",this)
this.$ariaMenuWrapper=this.$trigger.parent()
this.opts=r.a.extend(!0,{},e.defaults,i)
if(!this.opts.noButton){this.opts.buttonOpts.addDropArrow&&this.$trigger.append('<i class="icon-mini-arrow-down"></i>')
this.$trigger.button(this.opts.buttonOpts)
this.$trigger.bind("mouseleave.button",this.keepButtonActive)}this.$menu=this.$trigger.next().menu(this.opts.menuOpts).popup(this.opts.popupOpts).addClass("ui-kyle-menu use-css-transitions-for-show-hide")
if(this.opts.appendMenuTo){this.$menu.on({keydown:function(e){if(e.keyCode===r.a.ui.keyCode.TAB){var t
t=e.shiftKey?{which:r.a.ui.keyCode.TAB,shiftKey:!0}:{which:r.a.ui.keyCode.TAB}
var i=r.a.Event("keydown",t)
a.$trigger.focus().trigger(i)}}})
var o=this.$menu.data("popup"),s=o.open,d=this
o.open=function(){d.$menu.appendTo(d.opts.appendMenuTo)
return s.apply(this,arguments)}
this.$placeholder=r()('<span style="display:none;">').insertAfter(this.$menu)
this.$menu.bind("click",function(){var e
return(e=a.$placeholder).trigger.apply(e,arguments)})}this.opts.notifyMenuActiveOnParent&&(this.$notifyParent=this.$trigger.closest(this.opts.notifyMenuActiveOnParent))
this.$menu.on({menuselect:this.select,popupopen:this.onOpen,popupclose:this.onClose})}Object(a.a)(e,[{key:"onOpen",value:function(e){this.$ariaMenuWrapper.attr("role","application")
this.adjustCarat(e)
this.$menu.addClass("ui-state-open")
this.opts.notifyMenuActiveOnParent&&this.$notifyParent.addClass("menu_active")}},{key:"open",value:function(){this.$menu.popup("open")}},{key:"select",value:function(e,t){var i
if("click"!==(e.originalEvent&&e.originalEvent.type)&&(i=r()(t.item).find("a"))){e.preventDefault()
var n=i[0],a=document.createEvent("MouseEvent")
a.initEvent("click",!0,!0)
n.dispatchEvent(a)}this.close()}},{key:"onClose",value:function(){this.opts.appendMenuTo&&this.$menu.insertBefore(this.$placeholder)
this.$trigger.removeClass("ui-state-active")
this.$ariaMenuWrapper.removeAttr("role")
this.$menu.removeClass("ui-state-open")
this.opts.notifyMenuActiveOnParent&&this.$notifyParent.removeClass("menu_active")
this.opts.returnFocusTo&&!this.opts.returnFocusTo.prop("disabled")&&this.opts.returnFocusTo.focus()}},{key:"close",value:function(){this.$menu.hasClass("ui-state-open")&&this.$menu.popup("close").removeClass("ui-state-open")}},{key:"keepButtonActive",value:function(){this.$menu.is(".ui-state-open")&&this.$trigger.is(".btn, .ui-button")&&this.$trigger.addClass("ui-state-active")}},{key:"adjustCarat",value:function(e){this.$carat&&this.$carat.remove()
this.$trigger.is(".btn, .ui-button")&&this.$trigger.addClass("ui-state-active")
var t=this.$trigger.outerWidth(),i=this.$trigger.offset().left,n=this.$menu[0].getBoundingClientRect(),a=this.$trigger[0].getBoundingClientRect(),o=n.top+n.height<a.top,s=n.height-2,d=e.pageX||i+t/2,c=i-this.$menu.offset().left,l=d-this.$trigger.offset().left,u=Math.min(Math.max(6,l),t-6)+c
this.$carat=r()('<span class="ui-menu-carat"><span /></span>').css("left",u)
o&&this.$carat.css("top",s).css("transform","rotateX(180deg)")
this.$carat.prependTo(this.$menu)}}])
return e}())
s.defaults={popupOpts:{position:{my:"center top",at:"center bottom",offset:"0 10px",within:"#main",collision:"flipfit"}},buttonOpts:{addDropArrow:!0}}
r.a.fn.kyleMenu=function(e){return this.each(function(){r()(this).data().kyleMenu||new s(this,e)})}},zYWt9o0wMR:function(e,t,i){"use strict"
i("whMk0QU2To")
var n=i("mOY9BNujNR"),a=i.n(n)
i("pmU8As9kkw")
function o(e){var t=(e=(e||"").split(":")[0]).split("."),i=t.length
return(i>1?[t[i-2],t[i-1]]:t).join("")}var r=o(window.location.hostname)
a.a.expr[":"].external=function(e){var t=a()(e).attr("href")
return!(!t||!t.length||t.match(/^(mailto\:|javascript\:)/)||!e.hostname||o(e.hostname)==r)}
window.equella={ready:function(e){a()(document).triggerHandler("equella_ready",e)},cancel:function(){a()(document).triggerHandler("equella_cancel")}}
a()(document).bind("equella_ready",function(e,t){a()("#equella_dialog").triggerHandler("equella_ready",t)}).bind("equella_cancel",function(){a()("#equella_dialog").dialog("close")})
window.external_tool_dialog={ready:function(e){var t=jQuery.Event("selection")
t.contentItems=e
a()("#resource_selection_dialog:visible").triggerHandler(t)
a()("#homework_selection_dialog:visible").triggerHandler(t)},cancel:function(){a()("#external_tool_button_dialog").dialog("close")
a()("#resource_selection_dialog").dialog("close")
a()("#homework_selection_dialog:visible").dialog("close")}}
window.jsonFlickrApi=function(e){a()("#instructure_image_search").triggerHandler("search_results",e)}},zr2HOwddfD:function(e,t,i){"use strict"
var n=i("mOY9BNujNR"),a=i.n(n),o=i("eJBzaBDd6c")
function r(e){e.data("handled",!0)
var t=e.data("url")||e.attr("href"),i=e.data("method"),n=e.attr("target"),r=a()('<form method="post" action="'.concat(Object(o.a)(t),'"></form>')),s='\n    <input name="_method" value="'.concat(Object(o.a)(i),'" type="hidden" />\n    <input name="authenticity_token" type="hidden" />\n  ')
n&&r.attr("target",n)
r.hide().append(s).appendTo("body").submit()}a()(document).delegate("a[data-confirm], a[data-method], a[data-remove]","click",function(e){var t,i,n=a()(this)
if(n.data("handled")||!(t=n,i=t.data("confirm"),!i||confirm(i)))return!1
if(n.data("remove")){s(n)
return!1}if(n.data("method")){r(n)
return!1}})
function s(e){var t=e.data("remove"),i=e,n=e.data("url"),o=e.closest(":ui-popup").popup("option","trigger").data("KyleMenu")
o&&o.opts.appendMenuTo&&(i=o.$placeholder)
var r=i.closest(t)
r.bind({beforeremove:function(){r.hide()},remove:function(){r.remove()}})
r.trigger("beforeremove")
var s=function(){return r.trigger("remove")}
n?a.a.ajaxJSON(n,"DELETE",{},s,function(){return r.show()}):s()}}})

//# sourceMappingURL=12.chunk-11fc2837ed.js.12-11fc2837ed.sourcemap