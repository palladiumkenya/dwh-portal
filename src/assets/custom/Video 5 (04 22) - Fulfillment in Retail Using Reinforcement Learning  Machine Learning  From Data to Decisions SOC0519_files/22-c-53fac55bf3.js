(window["canvasWebpackJsonp"]=window["canvasWebpackJsonp"]||[]).push([[22],{"0crz":function(e,t,i){"use strict"
var r=i("ouhR")
var a=i.n(r)
var s=i("pQTu")
var n=i("m0r6")
Object(n["a"])({ar:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"إظهار النص المقتبس",word_separator:" "}}},cy:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"dangos testun wedi’i ddyfynnu",word_separator:" "}}},da:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis tekst i gåseøjne",word_separator:" "}}},"da-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis tekst i gåseøjne",word_separator:" "}}},de:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"zitierten Text zeigen",word_separator:" "}}},el:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"προβολή κειμένου που παρατίθεται"}}},"en-AU":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-AU-x-unimelb":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-CA":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB-x-lbs":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},"en-GB-x-ukhe":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"show quoted text",word_separator:" "}}},es:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"mostrar texto citado",word_separator:" "}}},fa:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"نمایش متن نقل شده",word_separator:" "}}},fi:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"näytä lainattu teksti",word_separator:" "}}},fr:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afficher le texte entre guillemets",word_separator:" "}}},"fr-CA":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afficher le texte entre guillemets",word_separator:" "}}},he:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"מציג ציטוט",word_separator:" "}}},ht:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"afiche tèks site",word_separator:" "}}},hu:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"idézett szöveg megjelenítése",word_separator:" "}}},hy:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"ցույց տալ մեջբերվող տեքստը",word_separator:"-"}}},is:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"Sýna ívitnaðan texta",word_separator:" "}}},it:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"mostra testo citato",word_separator:" "}}},ja:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"引用したテキストを表示",word_separator:" "}}},ko:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"인용된 텍스트 표시",word_separator:" "}}},mi:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"whakaatu kuputuhi faahiti",word_separator:"-"}}},nb:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis den merkede teksten",word_separator:" "}}},"nb-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis den merkede teksten",word_separator:" "}}},nl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"geciteerde tekst tonen",word_separator:" "}}},nn:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"vis sitert tekst",word_separator:" "}}},pl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"pokaż cytowany fragment tekstu",word_separator:" "}}},pt:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"exibir texto citado",word_separator:" "}}},"pt-BR":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"exibir texto citado",word_separator:" "}}},ru:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"показать цитированный текст",word_separator:" "}}},sl:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"prikaži citirano besedilo",word_separator:" "}}},sv:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"visa citerad text",word_separator:" "}}},"sv-x-k12":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"visa citerad text",word_separator:" "}}},tr:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"alıntılanan metni göster",word_separator:" "}}},uk:{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"Показати цитований текст",word_separator:" "}}},"zh-Hans":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"显示引用的文本",word_separator:" "}}},"zh-Hant":{lib:{text_helper:{ellipsis:"...",quoted_text_toggle:"顯示引用的文字",word_separator:" "}}}})
i("jQeR")
i("0sPK")
var o=s["default"].scoped("lib.text_helper")
var l=i("5Ky4")
var c,u,d
c="LINK-PLACEHOLDER"
u=/\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))|(LINK-PLACEHOLDER)/gi
t["a"]=d={quoteClump:function(e){return"<div class='quoted_text_holder'> <a href='#' class='show_quoted_text_link'>"+Object(l["a"])(o.t("quoted_text_toggle","show quoted text"))+"</a> <div class='quoted_text' style='display: none;'> "+a.a.raw(e.join("\n"))+" </div> </div>"},formatMessage:function(e){var t,i,r,a,s,n,o,h
a=[]
s=[]
e=e.replace(u,function(e,t){var i
s.push(e===c?c:(i=e,"http://"===i.slice(0,7)||"https://"===i.slice(0,8)||(i="http://"+i),a.push(i),"<a href='"+Object(l["a"])(i)+"'>"+Object(l["a"])(e)+"</a>"))
return c})
e=Object(l["a"])(e)
e=e.replace(new RegExp(c,"g"),function(e,t){return s.shift()})
e=e.replace(/\n/g,"<br />\n")
n=[]
o=[]
h=e.split("\n")
for(t=0,i=h.length;t<i;t++){r=h[t]
if(r.match(/^(&gt;|>)/))o.push(r)
else{o.length&&n.push(d.quoteClump(o))
o=[]
n.push(r)}}o.length&&n.push(d.quoteClump(o))
return n.join("\n")},delimit:function(e){var t,i,r,a,s
if(isNaN(e))return String(e)
s=e<0?"-":""
t=Math.abs(e)
if(Infinity===t)return String(e)
i=Math.floor(t)
a=t===i?"":String(t).replace(/^\d+\./,".")
while(i>=1e3){r=String(i).replace(/\d+(\d\d\d)$/,",$1")
i=Math.floor(i/1e3)
a=r+a}return s+String(i)+a},truncateText:function(e,t){var i,r,a,s,n,l
null==t&&(t={})
r=null!=(s=t.max)?s:30
i=o.t("ellipsis","...")
l=o.t("word_separator"," ")
e=(null!=e?e:"").replace(/\s+/g,l).trim()
if(!e||e.length<=r)return e
n=0
while(true){a=e.indexOf(l,n+1)
if(a<0||a>r-i.length)break
n=a}n||(n=r-i.length)
return e.substring(0,n)+i}}},B1vq:function(e,t,i){"use strict"
var r=i("ouhR")
var a=i.n(r)
i("s/PJ")
i("c6Pp")
a.a.fn.scrollToVisible=function(e){var t={}
var i=a()(e)
if(0===i.length)return
var r=i.offset(),s=i.outerWidth(),n=i.outerHeight(),o=r.top,l=o+n,c=r.left,u=c+s,d="html,body"==this.selector?a.a.windowScrollTop():this.scrollTop(),h=this.scrollLeft(),_=this.outerHeight(),p=this.outerWidth()
if("html,body"!=this.selector){var g=a()("body").offset()
this.each(function(){try{g=a()(this).offset()
return false}catch(e){}})
o-=g.top
l-=g.top
c-=g.left
u-=g.left}if("HTML"==this[0].tagName||"BODY"==this[0].tagName){_=a()(window).height()
a()("#wizard_box:visible").length>0&&(_-=a()("#wizard_box:visible").height())
p=a()(window).width()
o-=d
c-=h
l-=d
u-=h}o<0||_<n&&l>_?t.scrollTop=o+d:l>_&&(t.scrollTop=l+d-_+20)
c<0?t.scrollLeft=c+h:u>p&&(t.scrollLeft=u+h-p+20)
1==t.scrollTop&&(t.scrollTop=0)
1==t.scrollLeft&&(t.scrollLeft=0)
this.scrollTop(t.scrollTop)
this.scrollLeft(t.scrollLeft)
return this}},iklP:function(e,t,i){"use strict"
var r=i("pQTu")
var a=i("m0r6")
Object(a["a"])({"en-AU":{findLinkForService:{buttons:{search:"Search",search_by_tag:"Search by Tag"},errors:{search_failed:"Search failed, please try again."},no_description:"No description",no_results_found:"No Results Found",status:{diigo_search_throttling:"Diigo limits users to one search every ten seconds.  Please wait...",searching:"Searching..."},titles:{bookmark_search:"Bookmark Search: %{service_name}"}}},"en-CA":{findLinkForService:{buttons:{search:"Search",search_by_tag:"Search by Tag"},errors:{search_failed:"Search failed, please try again."},no_description:"No description",no_results_found:"No Results Found",status:{diigo_search_throttling:"Diigo limits users to one search every ten seconds.  Please wait...",searching:"Searching..."},titles:{bookmark_search:"Bookmark Search: %{service_name}"}}},"en-GB":{findLinkForService:{buttons:{search:"Search",search_by_tag:"Search by tag"},errors:{search_failed:"Search failed, please try again."},no_description:"No description",no_results_found:"No results found",status:{diigo_search_throttling:"Diigo limits users to one search every ten seconds.  Please wait...",searching:"Searching..."},titles:{bookmark_search:"Bookmark Search: %{service_name}"}}},"en-GB-x-ukhe":{findLinkForService:{buttons:{search:"Search",search_by_tag:"Search by tag"},errors:{search_failed:"Search failed, please try again."},no_description:"No description",no_results_found:"No results found",status:{diigo_search_throttling:"Diigo limits users to one search every ten seconds.  Please wait...",searching:"Searching..."},titles:{bookmark_search:"Bookmark Search: %{service_name}"}}},is:{findLinkForService:{buttons:{search:"Leita",search_by_tag:"Leita eftir merki"},errors:{search_failed:"Leit tókst ekki, reyndu aftur."},no_description:"Engin lýsing",no_results_found:"Engar niðurstöður fundust",status:{diigo_search_throttling:"Diigo takmarkar notendur við eina leit á hverjum tíu sekúndum.  Augnablik...",searching:"Leita..."},titles:{bookmark_search:"Bókamerkjaleit: %{service_name}"}}},mi:{findLinkForService:{buttons:{search:"Rapu",search_by_tag:"Rapu i te Tūtohu"},errors:{search_failed:"I rahua te rapunga, tēnā koa ngana anō koa."},no_description:"Kāore he whakaahuatanga",no_results_found:"Kaore he hua",status:{diigo_search_throttling:"Diigo aukati ai i ngā kaiwhakamahi ki te rapu ia tekau hēkona i te wā  Tēnā koa tatari ....",searching:"Rapu ana ..."},titles:{bookmark_search:"Pukatohu Rapu %{service_name}"}}},ru:{findLinkForService:{buttons:{search:"Поиск",search_by_tag:"Поиск по тегу"},errors:{search_failed:"Сбой поиска, повторите попытку"},no_description:"Описание отсутствует",no_results_found:"Результаты не найдены",status:{diigo_search_throttling:"Diigo позволяет пользователям выполнять один поиск раз в десять секунд.  Подождите...",searching:"Идет поиск..."},titles:{bookmark_search:"Сделать закладку для поиска: %{service_name}"}}}})
i("jQeR")
i("0sPK")
var s=r["default"].scoped("findLinkForService")
var n=i("ouhR")
var o=i.n(n)
var l=i("5Ky4")
var c=i("0crz")
i("jYyc")
i("Z+Ib")
i("YGE8")
i.d(t,"b",function(){return u})
i.d(t,"a",function(){return h})
function u(e,t,i){o.a.isArray(e)||(e=[e])
var r="/services?service_types=".concat(e.join(","))
o.a.ajaxJSON(r,"GET",{},function(e){t&&t(e)},function(e){i&&i(e)})}var d
function h(e,t){var i=o()("#instructure_bookmark_search")
if(!i.length){i=o()("<div id='instructure_bookmark_search'/>")
i.append("".concat("<form id='bookmark_search_form' style='margin-bottom: 5px;'><img src='/images/blank.png'/>&nbsp;&nbsp;<input type='text' class='query' style='width: 230px;'/><button class='btn search_button' type='submit'>").concat(Object(l["a"])(s.t("buttons.search","Search")),"</button></form>"))
i.append("<div class='results' style='max-height: 200px; overflow: auto;'/>")
i.find("form").submit(function(t){t.preventDefault()
t.stopPropagation()
var r=new Date
if("diigo"==e&&d&&r-d<15e3){setTimeout(function(){i.find("form").submit()},15e3-(r-d))
i.find(".results").empty().append(Object(l["a"])(s.t("status.diigo_search_throttling","Diigo limits users to one search every ten seconds.  Please wait...")))
return}i.find(".results").empty().append(Object(l["a"])(s.t("status.searching","Searching...")))
d=new Date
var a=i.find(".query").val()
var n=o.a.replaceTags(i.data("reference_url"),"query",a)
o.a.ajaxJSON(n,"GET",{},function(e){i.find(".results").empty()
e.length||i.find(".results").append(Object(l["a"])(s.t("no_results_found","No Results Found")))
for(var t in e){e[t].short_title=e[t].title
e[t].title==e[t].description&&(e[t].short_title=c["a"].truncateText(e[t].description,{max:30}))
o()("<div class='bookmark'/>").appendTo(i.find(".results")).append(o()('<a class="bookmark_link" style="font-weight: bold;"/>').attr({href:e[t].url,title:e[t].title}).text(e[t].short_title)).append(o()("<div style='margin: 5px 10px; font-size: 0.8em;'/>").text(e[t].description||s.t("no_description","No description")))}},function(){i.find(".results").empty().append(Object(l["a"])(s.t("errors.search_failed","Search failed, please try again.")))})})
i.delegate(".bookmark_link","click",function(e){e.preventDefault()
var r=o()(this).attr("href")
var a=o()(this).attr("title")||o()(this).text()
i.dialog("close")
t({url:r,title:a})})}i.find(".search_button").text("delicious"==e?s.t("buttons.search_by_tag","Search by Tag"):s.t("buttons.search","Search"))
i.find("form img").attr("src","/images/".concat(e,"_small_icon.png"))
var r="/search/bookmarks?q=%7B%7B+query+%7D%7D&service_type=%7B%7B+service_type+%7D%7D"
r=o.a.replaceTags(r,"service_type",e)
i.data("reference_url",r)
i.find(".results").empty().end().find(".query").val("")
i.dialog({title:s.t("titles.bookmark_search","Bookmark Search: %{service_name}",{service_name:o.a.titleize(e)}),open:function(){i.find("input:visible:first").focus().select()},width:400})}},mykf:function(e,t,i){"use strict"
var r=function(){var e=ENV.LTI_LAUNCH_FRAME_ALLOWANCES||[]
return e.join("; ")}
t["a"]=r},p6Wi:function(e,t,i){"use strict"
var r=i("pQTu")
var a=i("m0r6")
Object(a["a"])({ar:{buttons:{cancel:"إلغاء",delete:"حذف"}},cy:{buttons:{cancel:"Canslo",delete:"Dileu"}},da:{buttons:{cancel:"Annuller",delete:"Slet"}},"da-x-k12":{buttons:{cancel:"Annuller",delete:"Slet"}},de:{buttons:{cancel:"Abbrechen",delete:"Löschen"}},el:{buttons:{cancel:"Ακύρωση",delete:"Διαγραφή"}},"en-AU":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-AU-x-unimelb":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-CA":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-GB":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},"en-GB-x-lbs":{buttons:{cancel:"Cancel",delete:"Delete"}},"en-GB-x-ukhe":{buttons:{cancel:"Cancel",delete:"Delete"},instructure_misc_plugins:{confirms:{default_delete_thing:"Are you sure you want to delete this?"}}},es:{buttons:{cancel:"Cancelar",delete:"Eliminar"}},fa:{buttons:{cancel:"لغو",delete:"حذف"}},fi:{buttons:{cancel:"Peruuta",delete:"Poista"}},fr:{buttons:{cancel:"Annuler",delete:"Supprimer"}},"fr-CA":{buttons:{cancel:"Annuler",delete:"Supprimer"}},he:{buttons:{cancel:"ביטול",delete:"ביטול"}},ht:{buttons:{cancel:"Anile",delete:"Efase"}},hu:{buttons:{cancel:"Mégse",delete:"Törlés"}},hy:{buttons:{cancel:"Չեղյալ համարել",delete:"Ջնջել"}},is:{buttons:{cancel:"Hætta við",delete:"Eyða"},instructure_misc_plugins:{confirms:{default_delete_thing:"Viltu örugglega eyða þessu?"}}},it:{buttons:{cancel:"Annulla",delete:"Elimina"}},ja:{buttons:{cancel:"キャンセル",delete:"削除"}},ko:{buttons:{cancel:"취소",delete:"삭제"}},mi:{buttons:{cancel:"Whakakore",delete:"Muku"},instructure_misc_plugins:{confirms:{default_delete_thing:"E tino hiahia ana koe ki te muku i tēnei?"}}},nb:{buttons:{cancel:"Avbryt",delete:"Slett"}},"nb-x-k12":{buttons:{cancel:"Avbryt",delete:"Slett"}},nl:{buttons:{cancel:"Annuleren",delete:"Verwijderen"}},nn:{buttons:{cancel:"Avbryt",delete:"Slett"}},pl:{buttons:{cancel:"Anuluj",delete:"Usuń"}},pt:{buttons:{cancel:"Cancelar",delete:"Excluir"}},"pt-BR":{buttons:{cancel:"Cancelar",delete:"Excluir"}},ru:{buttons:{cancel:"Отменить",delete:"Удалить"},instructure_misc_plugins:{confirms:{default_delete_thing:"Действительно хотите удалить?"}}},sl:{buttons:{cancel:"Prekliči",delete:"Odstrani"}},sv:{buttons:{cancel:"Avbryt",delete:"Radera"}},"sv-x-k12":{buttons:{cancel:"Avbryt",delete:"Radera"}},tr:{buttons:{cancel:"İptal",delete:"Sil"}},uk:{buttons:{cancel:"Скасувати",delete:"Видалити"}},"zh-Hans":{buttons:{cancel:"取消",delete:"删除"}},"zh-Hant":{buttons:{cancel:"取消",delete:"刪除"}}})
i("jQeR")
i("0sPK")
var s=r["default"].scoped("instructure_misc_plugins")
var n=i("ouhR")
var o=i.n(n)
var l=i("5Ky4")
var c=i("JD5e")
i("jYyc")
i("YGE8")
i("B1vq")
i("s/PJ")
o.a.fn.setOptions=function(e,t){var i=e?"<option value=''>"+Object(l["a"])(e)+"</option>":""
null==t&&(t=[])
t.forEach(function(e){var t=Object(l["a"])(e)
i+='<option value="'+t+'">'+t+"</option>"})
return this.html(o.a.raw(i))}
o.a.fn.ifExists=function(e){this.length&&e.call(this,this)
return this}
o.a.fn.scrollbarWidth=function(){var e=o()('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>').appendTo(this),t=e.find("div")
var i=t.innerWidth()
e.css("overflow-y","scroll")
var r=t.innerWidth()
e.remove()
return i-r}
o.a.fn.dim=function(e){return this.animate({opacity:.4},e)}
o.a.fn.undim=function(e){return this.animate({opacity:1},e)}
o.a.fn.confirmDelete=function(e){e=o.a.extend({},o.a.fn.confirmDelete.defaults,e)
var t=this
var i=null
var r=true
e.noMessage=e.noMessage||e.no_message
var a=function(){if(!r){e.cancelled&&o.a.isFunction(e.cancelled)&&e.cancelled.call(t)
return}e.confirmed||(e.confirmed=function(){t.dim()})
e.confirmed.call(t)
if(e.url){e.success||(e.success=function(e){t.fadeOut("slow",function(){t.remove()})})
var a=e.prepareData?e.prepareData.call(t,i):{}
a.authenticity_token=Object(c["a"])()
o.a.ajaxJSON(e.url,"DELETE",a,function(i){e.success.call(t,i)},function(i,r,a,s){e.error&&o.a.isFunction(e.error)?e.error.call(t,i,r,a,s):o.a.ajaxJSON.unhandledXHRs.push(r)})}else{e.success||(e.success=function(){t.fadeOut("slow",function(){t.remove()})})
e.success.call(t)}}
if(e.message&&!e.noMessage&&!o.a.skipConfirmations){if(e.dialog){r=false
var n="object"==typeof e.dialog?e.dialog:{}
i=o()(e.message).dialog(o.a.extend({},{modal:true,close:a,buttons:[{text:s.t("#buttons.cancel","Cancel"),click:function(){o()(this).dialog("close")}},{text:s.t("#buttons.delete","Delete"),class:"btn-primary",click:function(){r=true
o()(this).dialog("close")}}]},n))
return}r=confirm(e.message)}a()}
o.a.fn.confirmDelete.defaults={message:s.t("confirms.default_delete_thing","Are you sure you want to delete this?")}
o.a.fn.fragmentChange=function(e){if(e&&true!==e){var t=(window.location.search||"").replace(/^\?/,"").split("&")
var i=null
for(var r=0;r<t.length;r++){var a=t[r]
a&&0===a.indexOf("hash=")&&(i="#"+a.substring(5))}this.bind("document_fragment_change",e)
var s=this
var n=false
for(r=0;r<o.a._checkFragments.fragmentList.length;r++){var l=o.a._checkFragments.fragmentList[r]
l.doc[0]==s[0]&&(n=true)}n||o.a._checkFragments.fragmentList.push({doc:s,fragment:""})
o()(window).bind("hashchange",o.a._checkFragments)
setTimeout(function(){i&&i.length>0?s.triggerHandler("document_fragment_change",i):s&&s[0]&&s[0].location&&s[0].location.hash.length>0&&s.triggerHandler("document_fragment_change",s[0].location.hash)},500)}else this.triggerHandler("document_fragment_change",this[0].location.hash)
return this}
o.a._checkFragments=function(){var e=o.a._checkFragments.fragmentList
for(var t=0;t<e.length;t++){var i=e[t]
var r=i.doc
if(r[0].location.hash!=i.fragment){r.triggerHandler("document_fragment_change",r[0].location.hash)
i.fragment=r[0].location.hash
o.a._checkFragments.fragmentList[t]=i}}}
o.a._checkFragments.fragmentList=[]
o.a.fn.clickLink=function(){var e=this.eq(0)
e.hasClass("disabled_link")||e.click()}
o.a.fn.showIf=function(e){if(o.a.isFunction(e))return this.each(function(t){o()(this).showIf(e.call(this))})
e?this.show():this.hide()
return this}
o.a.fn.disableIf=function(e){o.a.isFunction(e)&&(e=e.call(this))
this.prop("disabled",!!e)
return this}
o.a.fn.indicate=function(e){e=e||{}
var t
if("remove"==e){t=this.data("indicator")
t&&t.remove()
return}o()(".indicator_box").remove()
var i=this.offset()
e&&e.offset&&(i=e.offset)
var r=this.width()
var a=this.height()
var s=(e.container||this).zIndex()
t=o()(document.createElement("div"))
t.css({width:r+6,height:a+6,top:i.top-3,left:i.left-3,zIndex:s+1,position:"absolute",display:"block","-moz-border-radius":5,opacity:.8,border:"2px solid #870",backgroundColor:"#fd0"})
t.addClass("indicator_box")
t.mouseover(function(){o()(this).stop().fadeOut("fast",function(){o()(this).remove()})})
this.data("indicator")&&this.indicate("remove")
this.data("indicator",t)
o()("body").append(t)
e&&e.singleFlash?t.hide().fadeIn().animate({opacity:.8},500).fadeOut("slow",function(){o()(this).remove()}):t.hide().fadeIn().animate({opacity:.8},500).fadeOut("slow").fadeIn("slow").animate({opacity:.8},2500).fadeOut("slow",function(){o()(this).remove()})
e&&e.scroll&&o()("html,body").scrollToVisible(t)}
o.a.fn.hasScrollbar=function(){return this.length&&this[0].clientHeight<this[0].scrollHeight}
o.a.fn.log=function(e){console.log("%s: %o",e,this)
return this}
o.a.fn.fillWindowWithMe=function(e){var t=o.a.extend({minHeight:400},e),i=o()(this),r=o()("#wrapper"),a=o()("#main"),s=o()("#not_right_side"),n=o()(window),l=o()(this).add(t.alsoResize)
function c(){l.height(0)
var e=n.height()-(r.offset().top+r.outerHeight())+(a.height()-s.height()),c=Math.max(400,e)
l.height(c)
o.a.isFunction(t.onResize)&&t.onResize.call(i,c)}c()
n.unbind("resize.fillWindowWithMe").bind("resize.fillWindowWithMe",c)
return this}
o.a.fn.autoGrowInput=function(e){e=o.a.extend({maxWidth:1e3,minWidth:0,comfortZone:70},e)
this.filter("input:text").each(function(){var t=e.minWidth||o()(this).width(),i="",r=o()(this),a=o()("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:r.css("fontSize"),fontFamily:r.css("fontFamily"),fontWeight:r.css("fontWeight"),letterSpacing:r.css("letterSpacing"),whiteSpace:"nowrap"}),s=function(){setTimeout(function(){if(i===(i=r.val()))return
a.text(i)
var s=a.width(),n=s+e.comfortZone>=t?s+e.comfortZone:t,o=r.width(),l=n<o&&n>=t||n>t&&n<e.maxWidth
l&&r.width(n)})}
a.insertAfter(r)
o()(this).bind("keyup keydown blur update change",s)})
return this}
o.a}}])

//# sourceMappingURL=22-c-53fac55bf3.js.map