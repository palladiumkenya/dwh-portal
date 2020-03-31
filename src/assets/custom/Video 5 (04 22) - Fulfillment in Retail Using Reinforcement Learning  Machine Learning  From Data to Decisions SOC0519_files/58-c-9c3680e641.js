(window["canvasWebpackJsonp"]=window["canvasWebpackJsonp"]||[]).push([[58,569],{"0crz":function(e,t,n){"use strict"
var a=n("ouhR")
var i=n.n(a)
var o=n("pQTu")
var r=n("m0r6")
Object(r["a"])({ar:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"إظهار النص المقتبس",word_separator:" "}}},cy:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"dangos testun wedi’i ddyfynnu",word_separator:" "}}},da:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis tekst i gåseøjne",word_separator:" "}}},"da-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis tekst i gåseøjne",word_separator:" "}}},de:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"zitierten Text zeigen",word_separator:" "}}},el:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"προβολή κειμένου που παρατίθεται"}}},"en-AU":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-AU-x-unimelb":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-CA":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB-x-lbs":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB-x-ukhe":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},es:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"mostrar texto citado",word_separator:" "}}},fa:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"نمایش متن نقل شده",word_separator:" "}}},fi:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"näytä lainattu teksti",word_separator:" "}}},fr:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afficher le texte entre guillemets",word_separator:" "}}},"fr-CA":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afficher le texte entre guillemets",word_separator:" "}}},he:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"מציג ציטוט",word_separator:" "}}},ht:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afiche tèks site",word_separator:" "}}},hu:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"idézett szöveg megjelenítése",word_separator:" "}}},hy:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"ցույց տալ մեջբերվող տեքստը",word_separator:"-"}}},is:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"Sýna ívitnaðan texta",word_separator:" "}}},it:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"mostra testo citato",word_separator:" "}}},ja:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"引用したテキストを表示",word_separator:" "}}},ko:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"인용된 텍스트 표시",word_separator:" "}}},mi:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"whakaatu kuputuhi faahiti",word_separator:"-"}}},nb:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis den merkede teksten",word_separator:" "}}},"nb-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis den merkede teksten",word_separator:" "}}},nl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"geciteerde tekst tonen",word_separator:" "}}},nn:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis sitert tekst",word_separator:" "}}},pl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"pokaż cytowany fragment tekstu",word_separator:" "}}},pt:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"exibir texto citado",word_separator:" "}}},"pt-BR":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"exibir texto citado",word_separator:" "}}},ru:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"показать цитированный текст",word_separator:" "}}},sl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"prikaži citirano besedilo",word_separator:" "}}},sv:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"visa citerad text",word_separator:" "}}},"sv-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"visa citerad text",word_separator:" "}}},tr:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"alıntılanan metni göster",word_separator:" "}}},uk:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"Показати цитований текст",word_separator:" "}}},"zh-Hans":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"显示引用的文本",word_separator:" "}}},"zh-Hant":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"顯示引用的文字",word_separator:" "}}}})
n("jQeR")
n("0sPK")
var l=o["default"].scoped("lib.text_helper")
var s=n("5Ky4")
var c,u,d
c="LINK-PLACEHOLDER"
u=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))|(LINK-PLACEHOLDER)/gi
t["a"]=d={quoteClump:function(e){return"<div class='quoted_text_holder'> <a href='#' class='show_quoted_text_link'>"+Object(s["a"])(l.t("quoted_text_toggle","show quoted text"))+"</a> <div class='quoted_text' style='display: none;'> "+i.a.raw(e.join("\n"))+" </div> </div>"},formatMessage:function(e){var t,n,a,i,o,r,l,_
i=[]
o=[]
e=e.replace(u,function(e,t){var n
o.push(e===c?c:(n=e,"http://"===n.slice(0,7)||"https://"===n.slice(0,8)||(n="http://"+n),i.push(n),"<a href='"+Object(s["a"])(n)+"'>"+Object(s["a"])(e)+"</a>"))
return c})
e=Object(s["a"])(e)
e=e.replace(new RegExp(c,"g"),function(e,t){return o.shift()})
e=e.replace(/\n/g,"<br />\n")
r=[]
l=[]
_=e.split("\n")
for(t=0,n=_.length;t<n;t++){a=_[t]
if(a.match(/^(&gt;|>)/))l.push(a)
else{l.length&&r.push(d.quoteClump(l))
l=[]
r.push(a)}}l.length&&r.push(d.quoteClump(l))
return r.join("\n")},delimit:function(e){var t,n,a,i,o
if(isNaN(e))return String(e)
o=e<0?"-":""
t=Math.abs(e)
if(Infinity===t)return String(e)
n=Math.floor(t)
i=t===n?"":String(t).replace(/^\d+\./,".")
while(n>=1e3){a=String(n).replace(/\d+(\d\d\d)$/,",$1")
n=Math.floor(n/1e3)
i=a+i}return o+String(n)+i},truncateText:function(e,t){var n,a,i,o,r,s
null==t&&(t={})
a=null!=(o=t.max)?o:30
n=l.t("ellipsis","...")
s=l.t("word_separator"," ")
e=(null!=e?e:"").replace(/\s+/g,s).trim()
if(!e||e.length<=a)return e
r=0
while(true){i=e.indexOf(s,r+1)
if(i<0||i>a-n.length)break
r=i}r||(r=a-n.length)
return e.substring(0,r)+n}}},B1vq:function(e,t,n){"use strict"
var a=n("ouhR")
var i=n.n(a)
n("s/PJ")
n("c6Pp")
i.a.fn.scrollToVisible=function(e){var t={}
var n=i()(e)
if(0===n.length)return
var a=n.offset(),o=n.outerWidth(),r=n.outerHeight(),l=a.top,s=l+r,c=a.left,u=c+o,d="html,body"==this.selector?i.a.windowScrollTop():this.scrollTop(),_=this.scrollLeft(),h=this.outerHeight(),f=this.outerWidth()
if("html,body"!=this.selector){var p=i()("body").offset()
this.each(function(){try{p=i()(this).offset()
return false}catch(e){}})
l-=p.top
s-=p.top
c-=p.left
u-=p.left}if("HTML"==this[0].tagName||"BODY"==this[0].tagName){h=i()(window).height()
i()("#wizard_box:visible").length>0&&(h-=i()("#wizard_box:visible").height())
f=i()(window).width()
l-=d
c-=_
s-=d
u-=_}l<0||h<r&&s>h?t.scrollTop=l+d:s>h&&(t.scrollTop=s+d-h+20)
c<0?t.scrollLeft=c+_:u>f&&(t.scrollLeft=u+_-f+20)
1==t.scrollTop&&(t.scrollTop=0)
1==t.scrollLeft&&(t.scrollLeft=0)
this.scrollTop(t.scrollTop)
this.scrollLeft(t.scrollLeft)
return this}},goGJ:function(e,t,n){"use strict"
n.d(t,"a",function(){return o})
var a=n("ouhR")
var i=n.n(a)
n("rEd+")
function o(){return i()(".vdd_tooltip_link").tooltip({position:{my:"center bottom",at:"center top-10",collision:"fit fit"},tooltipClass:"center bottom vertical",content:function(){var e=i()(this).data("tooltipSelector")
try{var t=document.querySelector(e)
return i()(t).html()}catch(e){}}})}},p6Wi:function(e,t,n){"use strict"
var a=n("pQTu")
var i=n("m0r6")
Object(i["a"])({ar:{buttons:{cancel:"إلغاء",delete:"حذف"}},cy:{buttons:{cancel:"Canslo",delete:"Dileu"}},da:{buttons:{cancel:"Annuller",delete:"Slet"}},"da-x-k12":{buttons:{cancel:"Annuller",delete:"Slet"}},de:{buttons:{cancel:"Abbrechen",delete:"Löschen"}},el:{buttons:{cancel:"Ακύρωση",delete:"Διαγραφή"}},"en-AU":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-AU-x-unimelb":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-CA":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-GB":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-GB-x-lbs":{buttons:{cancel:"Cancel",delete:"Delete"}},"en-GB-x-ukhe":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},es:{buttons:{cancel:"Cancelar",delete:"Eliminar"}},fa:{buttons:{cancel:"لغو",delete:"حذف"}},fi:{buttons:{cancel:"Peruuta",delete:"Poista"}},fr:{buttons:{cancel:"Annuler",delete:"Supprimer"}},"fr-CA":{buttons:{cancel:"Annuler",delete:"Supprimer"}},he:{buttons:{cancel:"ביטול",delete:"ביטול"}},ht:{buttons:{cancel:"Anile",delete:"Efase"}},hu:{buttons:{cancel:"Mégse",delete:"Törlés"}},hy:{buttons:{cancel:"Չեղյալ համարել",delete:"Ջնջել"}},is:{buttons:{cancel:"Hætta við",delete:"Eyða"},instructure_misc_plugins:{confirms:{default_delete_thing:"Viltu örugglega eyða þessu?"}}},it:{buttons:{cancel:"Annulla",delete:"Elimina"}},ja:{buttons:{cancel:"キャンセル",delete:"削除"}},ko:{buttons:{cancel:"취소",delete:"삭제"}},mi:{buttons:{cancel:"Whakakore",delete:"Muku"},instructure_misc_plugins:{confirms:{default_delete_thing:"E tino hiahia ana koe ki te muku i tēnei?"}}},nb:{buttons:{cancel:"Avbryt",delete:"Slett"}},"nb-x-k12":{buttons:{cancel:"Avbryt",delete:"Slett"}},nl:{buttons:{cancel:"Annuleren",delete:"Verwijderen"}},nn:{buttons:{cancel:"Avbryt",delete:"Slett"}},pl:{buttons:{cancel:"Anuluj",delete:"Usuń"}},pt:{buttons:{cancel:"Cancelar",delete:"Excluir"}},"pt-BR":{buttons:{cancel:"Cancelar",delete:"Excluir"}},ru:{buttons:{cancel:"Отменить",delete:"Удалить"},instructure_misc_plugins:{confirms:{default_delete_thing:"Действительно хотите удалить?"}}},sl:{buttons:{cancel:"Prekliči",delete:"Odstrani"}},sv:{buttons:{cancel:"Avbryt",delete:"Radera"}},"sv-x-k12":{buttons:{cancel:"Avbryt",delete:"Radera"}},tr:{buttons:{cancel:"İptal",delete:"Sil"}},uk:{buttons:{cancel:"Скасувати",delete:"Видалити"}},"zh-Hans":{buttons:{cancel:"取消",delete:"删除"}},"zh-Hant":{buttons:{cancel:"取消",delete:"刪除"}}})
n("jQeR")
n("0sPK")
var o=a["default"].scoped("instructure_misc_plugins")
var r=n("ouhR")
var l=n.n(r)
var s=n("5Ky4")
var c=n("JD5e")
n("jYyc")
n("YGE8")
n("B1vq")
n("s/PJ")
l.a.fn.setOptions=function(e,t){var n=e?"<option value=''>"+Object(s["a"])(e)+"</option>":""
null==t&&(t=[])
t.forEach(function(e){var t=Object(s["a"])(e)
n+='<option value="'+t+'">'+t+"</option>"})
return this.html(l.a.raw(n))}
l.a.fn.ifExists=function(e){this.length&&e.call(this,this)
return this}
l.a.fn.scrollbarWidth=function(){var e=l()('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>').appendTo(this),t=e.find("div")
var n=t.innerWidth()
e.css("overflow-y","scroll")
var a=t.innerWidth()
e.remove()
return n-a}
l.a.fn.dim=function(e){return this.animate({opacity:.4},e)}
l.a.fn.undim=function(e){return this.animate({opacity:1},e)}
l.a.fn.confirmDelete=function(e){e=l.a.extend({},l.a.fn.confirmDelete.defaults,e)
var t=this
var n=null
var a=true
e.noMessage=e.noMessage||e.no_message
var i=function(){if(!a){e.cancelled&&l.a.isFunction(e.cancelled)&&e.cancelled.call(t)
return}e.confirmed||(e.confirmed=function(){t.dim()})
e.confirmed.call(t)
if(e.url){e.success||(e.success=function(e){t.fadeOut("slow",function(){t.remove()})})
var i=e.prepareData?e.prepareData.call(t,n):{}
i.authenticity_token=Object(c["a"])()
l.a.ajaxJSON(e.url,"DELETE",i,function(n){e.success.call(t,n)},function(n,a,i,o){e.error&&l.a.isFunction(e.error)?e.error.call(t,n,a,i,o):l.a.ajaxJSON.unhandledXHRs.push(a)})}else{e.success||(e.success=function(){t.fadeOut("slow",function(){t.remove()})})
e.success.call(t)}}
if(e.message&&!e.noMessage&&!l.a.skipConfirmations){if(e.dialog){a=false
var r="object"==typeof e.dialog?e.dialog:{}
n=l()(e.message).dialog(l.a.extend({},{modal:true,close:i,buttons:[{text:o.t("#buttons.cancel","Cancel"),click:function(){l()(this).dialog("close")}},{text:o.t("#buttons.delete","Delete"),class:"btn-primary",click:function(){a=true
l()(this).dialog("close")}}]},r))
return}a=confirm(e.message)}i()}
l.a.fn.confirmDelete.defaults={message:o.t("confirms.default_delete_thing","Are you sure you want to delete this?")}
l.a.fn.fragmentChange=function(e){if(e&&true!==e){var t=(window.location.search||"").replace(/^\?/,"").split("&")
var n=null
for(var a=0;a<t.length;a++){var i=t[a]
i&&0===i.indexOf("hash=")&&(n="#"+i.substring(5))}this.bind("document_fragment_change",e)
var o=this
var r=false
for(a=0;a<l.a._checkFragments.fragmentList.length;a++){var s=l.a._checkFragments.fragmentList[a]
s.doc[0]==o[0]&&(r=true)}r||l.a._checkFragments.fragmentList.push({doc:o,fragment:""})
l()(window).bind("hashchange",l.a._checkFragments)
setTimeout(function(){n&&n.length>0?o.triggerHandler("document_fragment_change",n):o&&o[0]&&o[0].location&&o[0].location.hash.length>0&&o.triggerHandler("document_fragment_change",o[0].location.hash)},500)}else this.triggerHandler("document_fragment_change",this[0].location.hash)
return this}
l.a._checkFragments=function(){var e=l.a._checkFragments.fragmentList
for(var t=0;t<e.length;t++){var n=e[t]
var a=n.doc
if(a[0].location.hash!=n.fragment){a.triggerHandler("document_fragment_change",a[0].location.hash)
n.fragment=a[0].location.hash
l.a._checkFragments.fragmentList[t]=n}}}
l.a._checkFragments.fragmentList=[]
l.a.fn.clickLink=function(){var e=this.eq(0)
e.hasClass("disabled_link")||e.click()}
l.a.fn.showIf=function(e){if(l.a.isFunction(e))return this.each(function(t){l()(this).showIf(e.call(this))})
e?this.show():this.hide()
return this}
l.a.fn.disableIf=function(e){l.a.isFunction(e)&&(e=e.call(this))
this.prop("disabled",!!e)
return this}
l.a.fn.indicate=function(e){e=e||{}
var t
if("remove"==e){t=this.data("indicator")
t&&t.remove()
return}l()(".indicator_box").remove()
var n=this.offset()
e&&e.offset&&(n=e.offset)
var a=this.width()
var i=this.height()
var o=(e.container||this).zIndex()
t=l()(document.createElement("div"))
t.css({width:a+6,height:i+6,top:n.top-3,left:n.left-3,zIndex:o+1,position:"absolute",display:"block","-moz-border-radius":5,opacity:.8,border:"2px solid #870",backgroundColor:"#fd0"})
t.addClass("indicator_box")
t.mouseover(function(){l()(this).stop().fadeOut("fast",function(){l()(this).remove()})})
this.data("indicator")&&this.indicate("remove")
this.data("indicator",t)
l()("body").append(t)
e&&e.singleFlash?t.hide().fadeIn().animate({opacity:.8},500).fadeOut("slow",function(){l()(this).remove()}):t.hide().fadeIn().animate({opacity:.8},500).fadeOut("slow").fadeIn("slow").animate({opacity:.8},2500).fadeOut("slow",function(){l()(this).remove()})
e&&e.scroll&&l()("html,body").scrollToVisible(t)}
l.a.fn.hasScrollbar=function(){return this.length&&this[0].clientHeight<this[0].scrollHeight}
l.a.fn.log=function(e){console.log("%s: %o",e,this)
return this}
l.a.fn.fillWindowWithMe=function(e){var t=l.a.extend({minHeight:400},e),n=l()(this),a=l()("#wrapper"),i=l()("#main"),o=l()("#not_right_side"),r=l()(window),s=l()(this).add(t.alsoResize)
function c(){s.height(0)
var e=r.height()-(a.offset().top+a.outerHeight())+(i.height()-o.height()),c=Math.max(400,e)
s.height(c)
l.a.isFunction(t.onResize)&&t.onResize.call(n,c)}c()
r.unbind("resize.fillWindowWithMe").bind("resize.fillWindowWithMe",c)
return this}
l.a.fn.autoGrowInput=function(e){e=l.a.extend({maxWidth:1e3,minWidth:0,comfortZone:70},e)
this.filter("input:text").each(function(){var t=e.minWidth||l()(this).width(),n="",a=l()(this),i=l()("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:a.css("fontSize"),fontFamily:a.css("fontFamily"),fontWeight:a.css("fontWeight"),letterSpacing:a.css("letterSpacing"),whiteSpace:"nowrap"}),o=function(){setTimeout(function(){if(n===(n=a.val()))return
i.text(n)
var o=i.width(),r=o+e.comfortZone>=t?o+e.comfortZone:t,l=a.width(),s=r<l&&r>=t||r>t&&r<e.maxWidth
s&&a.width(r)})}
i.insertAfter(a)
l()(this).bind("keyup keydown blur update change",o)})
return this}
l.a},ppAs:function(e,t,n){"use strict"
var a=n("ouhR")
var i=n.n(a)
var o=n("GLiE")
var r=n.n(o)
var l=n("5Ky4")
var s=n("pQTu")
var c=n("m0r6")
Object(c["a"])({ar:{user_content_aaf0fb5a:"محتوى المستخدم"},cy:{user_content_aaf0fb5a:"Cynnwys Defnyddiwr"},da:{user_content_aaf0fb5a:"Brugerindhold"},"da-x-k12":{user_content_aaf0fb5a:"Brugerindhold"},de:{user_content_aaf0fb5a:"Benutzer-Content"},el:{user_content_aaf0fb5a:"Περιεχόμενο Χρήστη"},"en-AU":{user_content_aaf0fb5a:"User Content"},"en-AU-x-unimelb":{user_content_aaf0fb5a:"User Content"},"en-CA":{user_content_aaf0fb5a:"User Content"},"en-GB":{user_content_aaf0fb5a:"User content"},"en-GB-x-lbs":{user_content_aaf0fb5a:"User content"},"en-GB-x-ukhe":{user_content_aaf0fb5a:"User content"},es:{user_content_aaf0fb5a:"Contenido del usuario"},fa:{user_content_aaf0fb5a:"محتوای کاربر"},fi:{user_content_aaf0fb5a:"Käyttäjän sisältö"},fr:{user_content_aaf0fb5a:"Contenu de l'utilisateur"},"fr-CA":{user_content_aaf0fb5a:"Contenu de l'utilisateur"},he:{user_content_aaf0fb5a:"תוכן משתמש"},ht:{user_content_aaf0fb5a:"Kontni Itilizatè"},hu:{user_content_aaf0fb5a:"Felhasználói tartalom"},is:{user_content_aaf0fb5a:"Notandaefni"},it:{user_content_aaf0fb5a:"Contenuto utente"},ja:{user_content_aaf0fb5a:"ユーザーコンテンツ"},mi:{user_content_aaf0fb5a:"Ihirangi kaiwhakamahi"},nb:{user_content_aaf0fb5a:"Brukerinnhold"},"nb-x-k12":{user_content_aaf0fb5a:"Brukerinnhold"},nl:{user_content_aaf0fb5a:"Gebruikersinhoud"},nn:{user_content_aaf0fb5a:"Brukarinnhald"},pl:{user_content_aaf0fb5a:"Zawartość użytkownika"},pt:{user_content_aaf0fb5a:"Conteúdo do Utilizador"},"pt-BR":{user_content_aaf0fb5a:"Conteúdo do Usuário"},ru:{user_content_aaf0fb5a:"Контент пользователя"},sl:{user_content_aaf0fb5a:"Vsebina uporabnika"},sv:{user_content_aaf0fb5a:"Användarinnehåll"},"sv-x-k12":{user_content_aaf0fb5a:"Användarinnehåll"},tr:{user_content_aaf0fb5a:"Kullanıcı İçeriği"},uk:{user_content_aaf0fb5a:"Контент користувача"},"zh-Hans":{user_content_aaf0fb5a:"用户内容"},"zh-Hant":{user_content_aaf0fb5a:"使用者內容"}})
n("jQeR")
n("0sPK")
var u=s["default"].scoped("user_content")
var d={translateMathmlForScreenreaders:function(e){var t=i()("<div/>").html(e.attr("x-canvaslms-safe-mathml")).html()
var n=i()('<span class="hidden-readable"></span>')
n.html(t)
return n},toMediaCommentLink:function(e){var t=i()("<a\n        id='media_comment_".concat(Object(l["a"])(i()(e).data("media_comment_id")),"'\n        data-media_comment_type='").concat(Object(l["a"])(i()(e).data("media_comment_type")),"'\n        class='instructure_inline_media_comment ").concat(Object(l["a"])(e.nodeName.toLowerCase()),"_comment'\n        data-alt='").concat(Object(l["a"])(i()(e).attr("data-alt")),"'\n      />"))
t.html(i()(e).html())
return t},convert:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
var n=i()("<div />").html(e)
n.find("video.instructure_inline_media_comment,audio.instructure_inline_media_comment").replaceWith(function(){return d.toMediaCommentLink(this)})
n.find("object.instructure_user_content:not(#kaltura_player) embed").remove()
if(!t.forEditing){n.find("object.instructure_user_content,embed.instructure_user_content").replaceWith(function(){var e=i()(this)
if(!e.data("uc_snippet")||!e.data("uc_sig"))return this
var t=r.a.uniqueId("uc_")
var n="/object_snippet"
ENV.files_domain&&(n="//".concat(ENV.files_domain).concat(n))
var a=i()("<form\n            action='".concat(Object(l["a"])(n),"'\n            method='post'\n            class='user_content_post_form'\n            target='").concat(Object(l["a"])(t),"'\n            id='form-").concat(Object(l["a"])(t),"'\n          />"))
a.append(i()("<input type='hidden'/>").attr({name:"object_data",value:e.data("uc_snippet")}))
a.append(i()("<input type='hidden'/>").attr({name:"s",value:e.data("uc_sig")}))
i()("body").append(a)
setTimeout(function(){return a.submit()},0)
return i()("<iframe\n            class='user_content_iframe'\n            name='".concat(Object(l["a"])(t),"'\n            style='width: ").concat(Object(l["a"])(e.data("uc_width")),"; height: ").concat(Object(l["a"])(e.data("uc_height")),";'\n            frameborder='0'\n            title='").concat(Object(l["a"])(u.t("User Content")),"'\n          />"))})
n.find("img.equation_image").each(function(e,t){var n=i()(t)
var a=d.translateMathmlForScreenreaders(n)
n.removeAttr("x-canvaslms-safe-mathml")
n.after(a)})}return n.html()}}
t["a"]=d}}])

//# sourceMappingURL=58-c-9c3680e641.js.map