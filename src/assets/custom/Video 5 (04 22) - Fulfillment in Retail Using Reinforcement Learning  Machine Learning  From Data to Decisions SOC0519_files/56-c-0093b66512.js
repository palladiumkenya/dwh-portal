(window["canvasWebpackJsonp"]=window["canvasWebpackJsonp"]||[]).push([[56,554],{"13m+":function(e,t,o){"use strict"
var c=o("17x9")
var a=o.n(c)
var l=o("v0Tn")
var i=a.a.shape,n=a.a.string,r=a.a.arrayOf,_=a.a.oneOf,s=a.a.bool,u=a.a.instanceOf
var k={}
k.migrationState=_(l["a"].statesList)
k.term=i({id:n.isRequired,name:n.isRequired})
k.termList=r(k.term)
k.account=i({id:n.isRequired,name:n.isRequired})
k.accountList=r(k.account)
k.course=i({id:n.isRequired,name:n.isRequired,course_code:n.isRequired,term:k.term.isRequired,teachers:r(i({display_name:n.isRequired})).isRequired,sis_course_id:n})
k.courseList=r(k.course)
k.courseInfo=i({id:n.isRequired,name:n.isRequired,enrollment_term_id:n.isRequired,sis_course_id:n})
k.lockableAttribute=_(["points","content","due_dates","availability_dates","settings","deleted"])
k.lockableAttributeList=r(k.lockableAttribute)
k.migrationException=i({course_id:n.isRequired,conflicting_changes:k.lockableAttributeList})
k.migrationExceptionList=r(k.migrationException)
k.migrationChange=i({asset_id:n.isRequired,asset_type:_(["assignment","quiz","discussion_topic","wiki_page","attachment","context_module","learning_outcome","learning_outcome_group","announcement","rubric","syllabus"]).isRequired,asset_name:n.isRequired,change_type:_(["created","updated","deleted"]).isRequired,htnl_url:n,exceptions:k.migrationExceptionList})
k.migrationChangeList=r(k.migrationChange)
k.migration=i({id:n.isRequired,workflow_state:k.migrationState.isRequired,comment:n,created_at:n.isRequired,exports_started_at:n,imports_queued_at:n,imports_completed_at:n,changes:k.migrationChangeList})
k.migrationList=r(k.migration)
k.unsyncedChange=i({asset_id:n.isRequired,asset_type:n.isRequired,asset_name:n.isRequired,change_type:n.isRequired,html_url:n.isRequired,locked:s.isRequired})
k.unsyncedChanges=r(k.unsyncedChange)
k.notification=i({id:n.isRequired,message:n.isRequired,err:u(Error)})
k.notificationList=r(k.notification)
k.itemLocks=i({content:s,points:s,due_dates:s,availability_dates:s})
k.itemLocksByObject=i({assignment:k.itemLocks,discussion_topic:k.itemLocks,wiki_page:k.itemLocks,quiz:k.itemLocks,attachment:k.itemLocks})},OAMf:function(e,t,o){"use strict"
var c=o("pQTu")
var a=o("m0r6")
Object(a["a"])({ar:{no_attributes_locked_611c5cc:"لم يتم تأمين أي سمات"},cy:{no_attributes_locked_611c5cc:"dim priodoleddau wedi’u cloi"},da:{no_attributes_locked_611c5cc:"ingen attributter låst"},"da-x-k12":{no_attributes_locked_611c5cc:"ingen attributter låst"},de:{no_attributes_locked_611c5cc:"Keine Attribute gesperrt"},"en-AU":{no_attributes_locked_611c5cc:"no attributes locked"},"en-AU-x-unimelb":{no_attributes_locked_611c5cc:"no attributes locked"},"en-CA":{no_attributes_locked_611c5cc:"no attributes locked"},"en-GB":{no_attributes_locked_611c5cc:"no attributes locked"},"en-GB-x-lbs":{no_attributes_locked_611c5cc:"no attributes locked"},"en-GB-x-ukhe":{no_attributes_locked_611c5cc:"no attributes locked"},es:{no_attributes_locked_611c5cc:"no se han bloqueado atributos"},fa:{no_attributes_locked_611c5cc:"هیچ ویژگی قفل نشده"},fi:{no_attributes_locked_611c5cc:"ei lukittuja määriteitä"},fr:{no_attributes_locked_611c5cc:"aucun attribut verrouillé"},"fr-CA":{no_attributes_locked_611c5cc:"aucun attribut verrouillé"},ht:{no_attributes_locked_611c5cc:"Pa gen okenn atribi ki bloke"},is:{no_attributes_locked_611c5cc:"engir læstir eiginleikar"},it:{no_attributes_locked_611c5cc:"nessun attributo bloccato"},ja:{no_attributes_locked_611c5cc:"属性がロックされていません"},mi:{no_attributes_locked_611c5cc:"Kāore ngā huanga i te raka"},nb:{no_attributes_locked_611c5cc:"ingen låste attributter"},"nb-x-k12":{no_attributes_locked_611c5cc:"ingen låste attributter"},nl:{no_attributes_locked_611c5cc:"geen vergrendelde eigenschappen"},nn:{no_attributes_locked_611c5cc:"ingen attributt er låste"},pl:{no_attributes_locked_611c5cc:"brak zablokowanych atrybutów"},pt:{no_attributes_locked_611c5cc:"Sem atributos bloqueados"},"pt-BR":{no_attributes_locked_611c5cc:"nenhum atributo bloqueado"},ru:{no_attributes_locked_611c5cc:"нет заблокированных атрибутов"},sl:{no_attributes_locked_611c5cc:"ni zaklenjenih atributov"},sv:{no_attributes_locked_611c5cc:"Inga attribut låsta"},"sv-x-k12":{no_attributes_locked_611c5cc:"Inga attribut låsta"},uk:{no_attributes_locked_611c5cc:"немає заблокованих атрибутів"},"zh-Hans":{no_attributes_locked_611c5cc:"未锁定任何属性"},"zh-Hant":{no_attributes_locked_611c5cc:"沒有鎖定屬性"}})
o("jQeR")
o("0sPK")
var l=c["default"].scoped("blueprint_LockItemFormat")
var i=o("3sT6")
o.d(t,"a",function(){return r})
function n(e){var t=e.map(function(e){return i["e"][e]})
switch(t.length){case 0:return l.t("no attributes locked")
case 1:return t[0]
default:return"".concat(t.slice(0,-1).join(", ")," & ").concat(t.slice(-1)[0])}}function r(e){var t=Object.keys(e).filter(function(t){return e[t]})
return n(t)}},lubD:function(e,t,o){"use strict"
var c=o("x1Tw")
var a=o("pREb")
var l=o("v0Tn")
var i={_depaginate:function(e){var t=this
var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Infinity
var l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[]
return c["default"].get(e).then(function(e){var c=l.concat(e.data)
var i=o-1
if(e.headers.link&&i>0){var n=Object(a["a"])(e)
if(n.next)return t._depaginate(n.next,i,c)}e.data=c
return e})},_queryString:function(e){return e.map(function(e){var t=Object.keys(e)[0]
var o=e[t]
return o?"".concat(t,"=").concat(o):null}).filter(function(e){return!!e}).join("&")},getCourses:function(e){var t=e.accountId
var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=o.search,a=void 0===c?"":c,l=o.term,i=void 0===l?"":l,n=o.subAccount,r=void 0===n?"":n
var _=this._queryString([{per_page:"100"},{blueprint:"false"},{blueprint_associated:"false"},{"include[]":"term"},{"include[]":"teachers"},{search_term:a},{enrollment_term_id:i}])
return this._depaginate("/api/v1/accounts/".concat(r||t,"/courses?").concat(_),1)},getAssociations:function(e){var t=e.masterCourse
var o=this._queryString([{per_page:"100"}])
return this._depaginate("/api/v1/courses/".concat(t.id,"/blueprint_templates/default/associated_courses?").concat(o))},saveAssociations:function(e){var t=e.masterCourse,o=e.addedAssociations,a=e.removedAssociations
return c["default"].put("/api/v1/courses/".concat(t.id,"/blueprint_templates/default/update_associations"),{course_ids_to_add:o.map(function(e){return e.id}),course_ids_to_remove:a.map(function(e){return e.id})})},getMigrations:function(e){var t=e.masterCourse
return c["default"].get("/api/v1/courses/".concat(t.id,"/blueprint_templates/default/migrations"))},beginMigration:function(e){var t=e.masterCourse,o=e.willSendNotification,a=e.willIncludeCustomNotificationMessage,l=e.notificationMessage,i=e.willIncludeCourseSettings
var n={send_notification:o}
i&&(n.copy_settings=true)
a&&l&&(n.comment=l)
return c["default"].post("/api/v1/courses/".concat(t.id,"/blueprint_templates/default/migrations"),n)},checkMigration:function(e){return this.getMigrations(e).then(function(e){var t=l["a"].void
e.data[0]&&(t=e.data[0].workflow_state)
e.data=t
return e})},getMigration:function(e,t){var o=e.course
var a=t.blueprintType,l=void 0===a?"blueprint_templates":a,i=t.templateId,n=void 0===i?"default":i,r=t.changeId
return c["default"].get("/api/v1/courses/".concat(o.id,"/").concat(l,"/").concat(n,"/migrations/").concat(r))},getMigrationDetails:function(e,t){var o=e.course
var a=t.blueprintType,l=void 0===a?"blueprint_templates":a,i=t.templateId,n=void 0===i?"default":i,r=t.changeId
return c["default"].get("/api/v1/courses/".concat(o.id,"/").concat(l,"/").concat(n,"/migrations/").concat(r,"/details"))},getFullMigration:function(e,t){var o=this
var c=e.course
return this.getMigration({course:c},t).then(function(e){var a=e.data
return o.getMigrationDetails({course:c},t).then(function(e){return Object.assign(a,{changeId:t.changeId,changes:e.data})})})},getSyncHistory:function(e){var t=this
var o=e.masterCourse
return this.getMigrations({masterCourse:o}).then(function(e){var c=e.data
return Promise.all(c.slice(0,5).map(function(e){return t.getMigrationDetails({course:o},{changeId:e.id}).then(function(t){return Object.assign(e,{changes:t.data})})}))})},toggleLocked:function(e){var t=e.courseId,o=e.itemType,a=e.itemId,l=e.isLocked
return c["default"].put("/api/v1/courses/".concat(t,"/blueprint_templates/default/restrict_item"),{content_type:o,content_id:a,restricted:l})},loadUnsyncedChanges:function(e){var t=e.masterCourse
return c["default"].get("/api/v1/courses/".concat(t.id,"/blueprint_templates/default/unsynced_changes"))}}
t["a"]=i},pREb:function(e,t,o){"use strict"
var c=/<(http.*?)>; rel="([a-z]*)"/g
var a=function(e){var t={}
var o=e.headers?e.headers.link:null
if(!o)return t
var a=c.exec(o)
while(a){t[a[2]]=a[1]
a=c.exec(o)}return t}
t["a"]=a},v0Tn:function(e,t,o){"use strict"
var c=o("rePB")
var a=["queued","exporting","imports_queued"]
var l=["completed","exports_failed","imports_failed"]
var i=["void","unknown"].concat(a,l)
var n={statesList:i,states:i.reduce(function(e,t){return Object.assign(e,Object(c["a"])({},t,t))},{})}
n.isEndState=function(e){return l.includes(e)}
n.isLoadingState=function(e){return a.includes(e)}
n.getLoadingValue=function(e){return a.indexOf(e)+1}
n.isSuccessful=function(e){return"completed"===e}
n.maxLoadingValue=a.length+1
t["a"]=n},y8OA:function(e,t,o){"use strict"
o.r(t)
var c=o("An8g")
var a=o("vpQ4")
var l=o("1OyB")
var i=o("vuIU")
var n=o("pQTu")
var r=o("m0r6")
Object(r["a"])({ar:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"حدثت مشكلة أثناء تبديل قفل المحتوى."},cy:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Problem wrth doglo’r clo cynnwys."},da:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Der opstod et problem, da indholdslåsen blev slået til eller fra."},"da-x-k12":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Der opstod et problem, da indholdslåsen blev slået til eller fra."},de:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Es gab ein Problem beim Umschalten der Content-Sperre."},"en-AU":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},"en-AU-x-unimelb":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},"en-CA":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},"en-GB":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},"en-GB-x-lbs":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},"en-GB-x-ukhe":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"There was a problem toggling the content lock."},es:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Hubo un problema al cambiar el bloqueo de contenido."},fa:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"در هنگام تغییر وضعیت قفل محتوا، مشکلی رخ داد."},fi:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Sisällön lukon kanssa ilmeni ongelma."},fr:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"L'activation/désactivation du verrou sur le contenu a rencontré un problème."},"fr-CA":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Un problème est survenu lors du basculement du verrouillage de contenu."},ht:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Te gen yon pwoblèm pou regle blokaj kontni an."},is:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Vandamál kom upp við að víxla efnislás."},it:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Si è verificato un problema durante l'abilitazione/disabilitazione del blocco dei contenuti."},ja:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"コンテンツロックをスイッチする際に問題が発生しました。"},mi:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"He raruraru i te wā e takahuri ana i te raka ihirangi"},nb:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Det oppstod et problem med veksling av innholdslåsen."},"nb-x-k12":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Det oppstod et problem med veksling av innholdslåsen."},nl:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Er is een probleem met het in- en uitschakelen van de inhoudsvergrendeling."},nn:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Kunne ikkje slå av/på innhaldslås"},pl:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Wystąpił problem podczas przełączania blokowania treści."},pt:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Houve um problema ao alternar o bloqueio de conteúdo."},"pt-BR":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Houve um problema ao alternar o bloqueio de conteúdo."},ru:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"При блокировке/разблокировке содержимого возникла проблема."},sl:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Prišlo je do težave pri preklopu zaklepanja vsebine."},sv:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Det uppstod ett problem med att ändra innehållslåset."},"sv-x-k12":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Det uppstod ett problem med att ändra innehållslåset."},uk:{there_was_a_problem_toggling_the_content_lock_2a5d678b:"Виникла проблема з перемиканням блокування зміни контенту"},"zh-Hans":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"切换课程锁定时出现问题。"},"zh-Hant":{there_was_a_problem_toggling_the_content_lock_2a5d678b:"切換內容鎖定時出現問題。"}})
o("jQeR")
o("0sPK")
var _=n["default"].scoped("blueprint_coursesLockManageer")
var s=o("ouhR")
var u=o.n(s)
var k=o("q1tI")
var d=o("i8i4")
var b=o.n(d)
o("p6Wi")
var p=o("mwIZ")
var f=o.n(p)
var g=function(e){return Object.assign({assignment:{toggleWrapperSelector:{show:".assignment-buttons",edit:".header-bar .header-bar-right .header-group-left"}[e.page],itemIdPath:{show:"ASSIGNMENT_ID",edit:"ASSIGNMENT.id"}[e.page]},quiz:{toggleWrapperSelector:{show:".header-group-left",edit:".header-bar .header-bar-right .header-group-left"}[e.page],toggleWrapperChildIndex:{edit:2}[e.page],itemIdPath:"QUIZ.id"},discussion_topic:{toggleWrapperSelector:{show:".form-inline .pull-right",edit:".discussion-edit-header .text-right"}[e.page],itemIdPath:{show:"DISCUSSION.TOPIC.ID",edit:"DISCUSSION_TOPIC.ATTRIBUTES.id"}[e.page]},wiki_page:{toggleWrapperSelector:{show:".header-bar .header-bar-right"}[e.page],itemIdPath:"WIKI_PAGE.page_id"}}[e.itemType],e)}
var h=g
var v=o("lubD")
var m=o("md7G")
var L=o("foSv")
var C=o("Ji7U")
Object(r["a"])({ar:{attributes_locked_1a1a0f46:"%{attributes} مؤمّن",locked_796957c7:"مؤمّن:"},cy:{attributes_locked_1a1a0f46:"%{attributes} wedi'u cloi",locked_796957c7:"Wedi Cloi:"},da:{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},"da-x-k12":{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},de:{attributes_locked_1a1a0f46:"%{attributes} gesperrt",locked_796957c7:"Gesperrt:"},"en-AU":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},"en-AU-x-unimelb":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},"en-CA":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},"en-GB":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},"en-GB-x-lbs":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},"en-GB-x-ukhe":{attributes_locked_1a1a0f46:"%{attributes} locked",locked_796957c7:"Locked:"},es:{attributes_locked_1a1a0f46:"%{attributes} bloqueado",locked_796957c7:"Bloqueado:"},fa:{attributes_locked_1a1a0f46:"%{attributes} قفل شده",locked_796957c7:"قفل شده:"},fi:{attributes_locked_1a1a0f46:"%{attributes} lukittu",locked_796957c7:"Lukittu:"},fr:{attributes_locked_1a1a0f46:"%{attributes} verrouillé",locked_796957c7:"Verrouillé :"},"fr-CA":{attributes_locked_1a1a0f46:"%{attributes} verrouillé",locked_796957c7:"Verrouillé :"},he:{attributes_locked_1a1a0f46:"%{attributes} נעול",locked_796957c7:"נעול:"},ht:{attributes_locked_1a1a0f46:"%{attributes} bloke",locked_796957c7:"Bbloke:"},hu:{attributes_locked_1a1a0f46:"%{attributes}zárolva"},is:{attributes_locked_1a1a0f46:"%{attributes} læst",locked_796957c7:"Læst:"},it:{attributes_locked_1a1a0f46:"%{attributes} bloccato",locked_796957c7:"Bloccato:"},ja:{attributes_locked_1a1a0f46:"%{attributes} ロックされています",locked_796957c7:"ロックされています"},mi:{attributes_locked_1a1a0f46:"%{attributes} Kua rakaina",locked_796957c7:"Kua rakaina:"},nb:{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},"nb-x-k12":{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},nl:{attributes_locked_1a1a0f46:"%{attributes} vergrendeld",locked_796957c7:"Vergrendeld:"},nn:{attributes_locked_1a1a0f46:"%{attributes} låste",locked_796957c7:"Låst:"},pl:{attributes_locked_1a1a0f46:"%{attributes} zblokowane",locked_796957c7:"Zblokowane:"},pt:{attributes_locked_1a1a0f46:"%{attributes} Bloqueado",locked_796957c7:"Bloqueado:"},"pt-BR":{attributes_locked_1a1a0f46:"%{attributes} bloqueado(a)",locked_796957c7:"Bloqueado(a):"},ru:{attributes_locked_1a1a0f46:"%{attributes} заблокировано",locked_796957c7:"Заблокировано:"},sl:{attributes_locked_1a1a0f46:"%{attributes} zaklenjeno",locked_796957c7:"Zaklenjeno:"},sv:{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},"sv-x-k12":{attributes_locked_1a1a0f46:"%{attributes} låst",locked_796957c7:"Låst:"},tr:{attributes_locked_1a1a0f46:"%{attributes} kilitli"},uk:{attributes_locked_1a1a0f46:"%{attributes} заблоковано",locked_796957c7:"Заблоковано:"},"zh-Hans":{attributes_locked_1a1a0f46:"%{attributes} 已锁定",locked_796957c7:"已锁定："},"zh-Hant":{attributes_locked_1a1a0f46:"%{attributes} 已鎖定",locked_796957c7:"已鎖定："}})
var w=n["default"].scoped("blueprint_coursesLockBanner")
o("17x9")
var O=o("h8gV")
var q=o.n(O)
var y=o("YTJb")
var A=o.n(y)
o("MWZS")
var E=o("OAMf")
o("13m+")
var I=function(e){Object(C["a"])(t,e)
function t(){Object(l["a"])(this,t)
return Object(m["a"])(this,Object(L["a"])(t).apply(this,arguments))}Object(i["a"])(t,[{key:"componentDidUpdate",value:function(e){this.props.isLocked&&!e.isLocked&&u.a.screenReaderFlashMessage(w.t("%{attributes} locked",{attributes:Object(E["a"])(this.props.itemLocks)}))}},{key:"render",value:function(){if(this.props.isLocked)return Object(c["a"])(q.a,{},void 0,Object(c["a"])(A.a,{weight:"bold",size:"small"},void 0,w.t("Locked:")," "),Object(c["a"])(A.a,{size:"small"},void 0,Object(E["a"])(this.props.itemLocks)))
return null}}],[{key:"setupRootNode",value:function(){var e=document.createElement("div")
e.id="blueprint-lock-banner"
e.setAttribute("style","margin-bottom: 2em")
var t=document.querySelector("#content")
return t.insertBefore(e,t.firstChild)}}])
t.displayName="LockBanner"
return t}(k["Component"])
I.defaultProps={itemLocks:{content:false,points:false,settings:false,due_dates:false,availability_dates:false}}
Object(r["a"])({ar:{blueprint_5cca2ef:"المخطط",lock_c341af13:"تأمين",locked_762f138b:"تم التأمين",locked_click_to_unlock_50747e11:"مؤمّن. انقر لإلغاء التأمين.",unlock_f6196bf5:"إلغاء التأمين",unlocked_click_to_lock_53262ce7:"غير مؤمّن. انقر للتأمين."},cy:{blueprint_5cca2ef:"Glasbrint",lock_c341af13:"Cloi",locked_762f138b:"Wedi Cloi",locked_click_to_unlock_50747e11:"Wedi Cloi. Cliciwch i ddatgloi.",unlock_f6196bf5:"Datgloi",unlocked_click_to_lock_53262ce7:"Wedi Datgloi. Cliciwch i’w gloi."},da:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst. Klik for at låse op.",unlock_f6196bf5:"Lås op",unlocked_click_to_lock_53262ce7:"Låst op. Klik for at låse."},"da-x-k12":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst. Klik for at låse op.",unlock_f6196bf5:"Lås op",unlocked_click_to_lock_53262ce7:"Låst op. Klik for at låse."},de:{blueprint_5cca2ef:"Muster",lock_c341af13:"Sperre",locked_762f138b:"Gesperrt",locked_click_to_unlock_50747e11:"Gesperrt. Zum Entsperren klicken",unlock_f6196bf5:"Entsperren",unlocked_click_to_lock_53262ce7:"Entsperrt Zum Sperren klicken"},el:{locked_762f138b:"Κλειδωμένο"},"en-AU":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},"en-AU-x-unimelb":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},"en-CA":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},"en-GB":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},"en-GB-x-lbs":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},"en-GB-x-ukhe":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lock",locked_762f138b:"Locked",locked_click_to_unlock_50747e11:"Locked. Click to unlock.",unlock_f6196bf5:"Unlock",unlocked_click_to_lock_53262ce7:"Unlocked. Click to lock."},es:{blueprint_5cca2ef:"Proyecto",lock_c341af13:"Bloquear",locked_762f138b:"Bloqueado",locked_click_to_unlock_50747e11:"Bloqueado. Hacer clic para desbloquear.",unlock_f6196bf5:"Desbloquear",unlocked_click_to_lock_53262ce7:"Desbloqueado. Hacer clic para bloquear."},fa:{blueprint_5cca2ef:"طرح",lock_c341af13:"قفل کردن",locked_762f138b:"قفل شده",locked_click_to_unlock_50747e11:"قفل شده. برای قفل گشایی کلیک کنید.",unlock_f6196bf5:"قفل گشایی",unlocked_click_to_lock_53262ce7:"قفل گشایی شده. برای قفل کردن کلیک کنید."},fi:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lukitse",locked_762f138b:"Lukittu",locked_click_to_unlock_50747e11:"Lukittu. Poista lukitus napsauttamalla.",unlock_f6196bf5:"Poista lukitus.",unlocked_click_to_lock_53262ce7:"Lukitus poistettu. Lukitse napsauttamalla."},fr:{blueprint_5cca2ef:"Projet",lock_c341af13:"Verrouiller",locked_762f138b:"Verrouillé(e)",locked_click_to_unlock_50747e11:"Verrouillé. Cliquez pour déverrouiller.",unlock_f6196bf5:"Déverrouiller",unlocked_click_to_lock_53262ce7:"Déverrouillé. Cliquez pour verrouiller."},"fr-CA":{blueprint_5cca2ef:"Modèle",lock_c341af13:"Verrouiller",locked_762f138b:"Verrouillé",locked_click_to_unlock_50747e11:"Verrouillé. Cliquez pour déverrouiller.",unlock_f6196bf5:"Déverrouiller",unlocked_click_to_lock_53262ce7:"Déverrouillé. Cliquez pour verrouiller."},he:{blueprint_5cca2ef:"תבנית דוגמה",lock_c341af13:"נעילה",locked_762f138b:"נעול",locked_click_to_unlock_50747e11:"נעול: הקש/י להסרת נעילה"},ht:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Bloke",locked_762f138b:"Bloke",locked_click_to_unlock_50747e11:"Bloke. Klike pou debloke.",unlock_f6196bf5:"Debloke",unlocked_click_to_lock_53262ce7:"Debloke. Klike pou bloke."},hu:{blueprint_5cca2ef:"Blueprint",locked_762f138b:"Zárolt",unlock_f6196bf5:"Zárolás feloldása"},hy:{locked_762f138b:"Արգելափակված է"},is:{blueprint_5cca2ef:"Grunnsnið",lock_c341af13:"Læsa",locked_762f138b:"Læst ",locked_click_to_unlock_50747e11:"Læst. Smellið til að opna.",unlock_f6196bf5:"Aflæsa",unlocked_click_to_lock_53262ce7:"Aflæst. Smelltu til að læsa."},it:{blueprint_5cca2ef:"Modello di base",lock_c341af13:"Blocca",locked_762f138b:"Bloccato",locked_click_to_unlock_50747e11:"Bloccato. Fai clic per sbloccare.",unlock_f6196bf5:"Sblocca",unlocked_click_to_lock_53262ce7:"Sbloccato. Fai clic per bloccare."},ja:{blueprint_5cca2ef:"青写真",lock_c341af13:"ロック",locked_762f138b:"ロックされています",locked_click_to_unlock_50747e11:"ロックされています。クリックしてロック解除する。",unlock_f6196bf5:"ロック解除する",unlocked_click_to_lock_53262ce7:"ロック解除。クリックしてロックする。"},mi:{blueprint_5cca2ef:"Tātauira",lock_c341af13:"raka",locked_762f138b:"Kua rakaina",locked_click_to_unlock_50747e11:"Kua rakaina: Pāwhiri ki te huaki",unlock_f6196bf5:"Huaki",unlocked_click_to_lock_53262ce7:"Kua Huakina Pāwhiri ki te huaki"},nb:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst. Klikk for å låse opp.",unlock_f6196bf5:"Lås opp",unlocked_click_to_lock_53262ce7:"Låst opp. Klikk for å låse."},"nb-x-k12":{blueprint_5cca2ef:"Fagmal",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst. Klikk for å låse opp.",unlock_f6196bf5:"Lås opp",unlocked_click_to_lock_53262ce7:"Låst opp. Klikk for å låse."},nl:{blueprint_5cca2ef:"Blauwdruk",lock_c341af13:"Vergrendelen",locked_762f138b:"Vergrendeld",locked_click_to_unlock_50747e11:"Vergrendeld. Klik om te ontgrendelen.",unlock_f6196bf5:"Ontgrendelen",unlocked_click_to_lock_53262ce7:"Ontgrendeld. Klik om te vergrendelen."},nn:{blueprint_5cca2ef:"Blåkopi",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst. Klikk for å opne.",unlock_f6196bf5:"Lås opp",unlocked_click_to_lock_53262ce7:"Ulåst. Klikk for å opne. "},pl:{blueprint_5cca2ef:"Wzorzec",lock_c341af13:"Zablokuj",locked_762f138b:"Zablokowany",locked_click_to_unlock_50747e11:"Zblokowane. Kliknij, aby odblokować.",unlock_f6196bf5:"Odblokuj",unlocked_click_to_lock_53262ce7:"Odblokowane. Kliknij, aby zablokować."},pt:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Bloquear",locked_762f138b:"Travada",locked_click_to_unlock_50747e11:"Bloqueado, Clique para desbloquear.",unlock_f6196bf5:"Desbloquear",unlocked_click_to_lock_53262ce7:"Desbloqueado. Clique para bloquear."},"pt-BR":{blueprint_5cca2ef:"Modelo",lock_c341af13:"Bloquear",locked_762f138b:"Bloqueado(a)",locked_click_to_unlock_50747e11:"Bloqueado. Clique para desbloquear.",unlock_f6196bf5:"Desbloquear",unlocked_click_to_lock_53262ce7:"Desbloqueado. Clique para bloquear."},ru:{blueprint_5cca2ef:"Шаблон",lock_c341af13:"Заблокировать",locked_762f138b:"Заблокировано",locked_click_to_unlock_50747e11:"Заблокировано. Нажмите, чтобы разблокировать.",unlock_f6196bf5:"Разблокировать",unlocked_click_to_lock_53262ce7:"Разблокировано. Нажмите, чтобы заблокировать."},sl:{blueprint_5cca2ef:"Šablona",lock_c341af13:"Zakleni",locked_762f138b:"Zaklenjeno",locked_click_to_unlock_50747e11:"Zaklenjeno. Kliknite, da odklenete.",unlock_f6196bf5:"Odkleni",unlocked_click_to_lock_53262ce7:"Odklenjeno. Kliknite, da zaklenete."},sv:{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst: Klicka för att låsa upp.",unlock_f6196bf5:"Lås upp",unlocked_click_to_lock_53262ce7:"Upplåst Klicka för att låsa."},"sv-x-k12":{blueprint_5cca2ef:"Blueprint",lock_c341af13:"Lås",locked_762f138b:"Låst",locked_click_to_unlock_50747e11:"Låst: Klicka för att låsa upp.",unlock_f6196bf5:"Lås upp",unlocked_click_to_lock_53262ce7:"Upplåst Klicka för att låsa."},tr:{blueprint_5cca2ef:"Şablon",locked_762f138b:"Kilitli"},uk:{blueprint_5cca2ef:"Проект",lock_c341af13:"Заблокувати",locked_762f138b:"Заблоковано",locked_click_to_unlock_50747e11:"Заблоковано. Клацніть, щоб розблокувати.",unlock_f6196bf5:"Розблокувати",unlocked_click_to_lock_53262ce7:"Розблоковано. Натисніть, щоб заблокувати."},"zh-Hans":{blueprint_5cca2ef:"模板",lock_c341af13:"锁定",locked_762f138b:"已锁定",locked_click_to_unlock_50747e11:"已锁定。单击以解锁。",unlock_f6196bf5:"解锁",unlocked_click_to_lock_53262ce7:"已解锁。单击以锁定。"},"zh-Hant":{blueprint_5cca2ef:"計劃",lock_c341af13:"鎖定",locked_762f138b:"已鎖定",locked_click_to_unlock_50747e11:"已鎖定。點擊解鎖。",unlock_f6196bf5:"解除鎖定",unlocked_click_to_lock_53262ce7:"已解除鎖定。點擊鎖定。"}})
var j=n["default"].scoped("blueprint_coursesLockToggle")
var B=o("VMdx")
var S=o.n(B)
var T=o("X9ng")
var R=o.n(T)
var D=o("qnOc")
var M=o.n(D)
var N=o("YSFS")
var U=o.n(N)
var x=o("Xnu5")
var z=o.n(x)
var K=o("zkte")
var V=o.n(K)
var H={ADMIN_LOCKED:{label:j.t("Locked"),icon:z.a,tooltip:j.t("Unlock"),variant:"primary"},ADMIN_UNLOCKED:{label:j.t("Blueprint"),icon:V.a,tooltip:j.t("Lock"),variant:"default"},ADMIN_WILLUNLOCK:{label:j.t("Blueprint"),icon:V.a,tooltip:j.t("Unlock"),variant:"default"},ADMIN_WILLLOCK:{label:j.t("Locked"),icon:z.a,tooltip:j.t("Lock"),variant:"primary"},TEACH_LOCKED:{label:j.t("Locked"),icon:z.a},TEACH_UNLOCKED:{label:j.t("Blueprint"),icon:V.a}}
var W=function(e){Object(C["a"])(t,e)
Object(i["a"])(t,null,[{key:"setupRootNode",value:function(e,t,o){var c=document.createElement("span")
var a=setInterval(function(){var l=document.querySelector(e)
if(l){clearInterval(a)
l.insertBefore(c,l.childNodes[t])
o(c)}},200)}}])
function t(e){var o
Object(l["a"])(this,t)
o=Object(m["a"])(this,Object(L["a"])(t).call(this,e))
o.onEnter=function(){o.props.isToggleable&&o.setState({mode:o.props.isLocked?H.ADMIN_WILLUNLOCK:H.ADMIN_WILLLOCK})}
o.onExit=function(){o.props.isToggleable&&o.setState({mode:o.props.isLocked?H.ADMIN_LOCKED:H.ADMIN_UNLOCKED})}
o.state={}
e.isToggleable?o.state.mode=e.isLocked?H.ADMIN_LOCKED:H.ADMIN_UNLOCKED:o.state.mode=e.isLocked?H.TEACH_LOCKED:H.TEACH_UNLOCKED
return o}Object(i["a"])(t,[{key:"render",value:function(){var e=this.state.mode.icon
var t=Object(c["a"])("span",{className:"bpc-lock-toggle__label"},void 0,this.state.mode.label||"-")
var o=null
if(this.props.isToggleable){var a=this.state.mode.variant
var l=this.state.mode.tooltip
var i=this.props.isLocked?j.t("Locked. Click to unlock."):j.t("Unlocked. Click to lock.")
o=Object(c["a"])(R.a,{tip:l,placement:"top",variant:"inverse",on:["hover","focus"]},void 0,Object(c["a"])(S.a,{variant:a,onClick:this.props.onClick,onFocus:this.onEnter,onBlur:this.onExit,onMouseEnter:this.onEnter,onMouseLeave:this.onExit,"aria-pressed":this.props.isLocked},void 0,Object(c["a"])(e,{}),Object(c["a"])(U.a,{},void 0,t),Object(c["a"])(M.a,{},void 0,i)))}else o=Object(c["a"])("span",{className:"bpc__lock-no__toggle"},void 0,Object(c["a"])("span",{className:"bpc__lock-no__toggle-icon"},void 0,Object(c["a"])(e,{})),Object(c["a"])(A.a,{size:"small"},void 0,t))
return Object(c["a"])("span",{className:"bpc-lock-toggle"},void 0,o)}}])
t.displayName="LockToggle"
return t}(k["Component"])
W.defaultProps={isToggleable:false,onClick:function(){}}
o.d(t,"default",function(){return P})
var P=function(){function e(){var t=this
Object(l["a"])(this,e)
this.toggleLocked=function(){var e=t.props.itemType
var o=t.state,c=o.courseId,a=o.isLocked,l=o.itemId
v["a"].toggleLocked({courseId:c,itemType:e,itemId:l,isLocked:!a}).then(function(e){e.data.success?t.setState({isLocked:!a}):t.showToggleError()}).catch(function(){t.showToggleError()})}
this.state={isLocked:false,itemLocks:[],isMasterContent:false,isChildContent:false,itemId:""}}Object(i["a"])(e,[{key:"init",value:function(e){if(!this.shouldInit())return
this.props=h(e)
this.setupState()
void 0!==this.state.itemId&&this.render()}},{key:"shouldInit",value:function(){return ENV.MASTER_COURSE_DATA&&(ENV.MASTER_COURSE_DATA.is_master_course_master_content||ENV.MASTER_COURSE_DATA.is_master_course_child_content)}},{key:"setupState",value:function(){this.state={isLocked:ENV.MASTER_COURSE_DATA.restricted_by_master_course,itemLocks:ENV.MASTER_COURSE_DATA.master_course_restrictions||ENV.MASTER_COURSE_DATA.default_restrictions,isMasterContent:ENV.MASTER_COURSE_DATA.is_master_course_master_content,isChildContent:ENV.MASTER_COURSE_DATA.is_master_course_child_content,courseId:ENV.COURSE_ID,itemId:f()(ENV,this.props.itemIdPath)}}},{key:"setState",value:function(e){this.state=Object.assign(this.state,e)
this.render()}},{key:"getItemLocks",value:function(){return Object(a["a"])({},this.state.itemLocks)}},{key:"isMasterContent",value:function(){return this.state.isMasterContent}},{key:"isChildContent",value:function(){return this.state.isChildContent}},{key:"showToggleError",value:function(){u.a.flashError(_.t("There was a problem toggling the content lock."))}},{key:"setupToggle",value:function(e){var t=this
if(!this.props.toggleWrapperSelector)return
this.toggleNode?e():W.setupRootNode(this.props.toggleWrapperSelector,this.props.toggleWrapperChildIndex||0,function(o){t.toggleNode=o
e()})}},{key:"renderLockToggle",value:function(){var e=this
if(!this.props.toggleWrapperSelector)return
this.setupToggle(function(){b.a.render(Object(c["a"])(W,{isLocked:e.state.isLocked,isToggleable:"show"===e.props.page&&e.state.isMasterContent,onClick:e.toggleLocked}),e.toggleNode)})}},{key:"renderBanner",value:function(){this.bannerNode||(this.bannerNode=I.setupRootNode())
b.a.render(Object(c["a"])(I,{isLocked:this.state.isLocked,itemLocks:this.state.itemLocks}),this.bannerNode)}},{key:"render",value:function(){this.renderBanner()
this.renderLockToggle()}}])
e.displayName="LockManager"
return e}()},zkte:function(e,t,o){"use strict"
var c=o("284h")
var a=o("TqRt")
Object.defineProperty(t,"__esModule",{value:true})
t.default=void 0
var l=a(o("MVZn"))
var i=a(o("lwsE"))
var n=a(o("W8MJ"))
var r=a(o("a1gu"))
var _=a(o("Nsbk"))
var s=a(o("7W2i"))
var u=c(o("q1tI"))
var k=a(o("q3EI"))
var d=u.default.createElement("path",{d:"M564.706 1581.177H338.824V338.824h1242.353v225.882h-112.942V451.765H451.765v1016.47h112.941v112.942zM0 0h1242.353v225.882h-112.941v-112.94H112.941v1016.47h112.941v112.94H0V0zm847.059 1920H677.647v-169.412h112.942v56.471h56.47V1920zm180.662 0v-112.941h180.662V1920h-180.662zm361.433 0v-112.941h180.662V1920h-180.662zm530.846 0h-169.412v-112.941h56.471v-56.471H1920V1920zm-112.941-711.508v-180.661H1920v180.661h-112.941zm0 361.435v-180.662H1920v180.662h-112.941zM1920 847.059h-112.941v-56.47h-56.471V677.647H1920v169.412zm-892.169-56.471V677.647h180.661v112.941h-180.661zm361.434 0V677.647h180.662v112.941h-180.662zm-598.677 56.47h-112.94V677.648h169.41v112.942h-56.47v56.47zm-112.941 361.325v-180.662h112.941v180.662H677.647zm0 361.433v-180.662h112.941v180.662H677.647z",fillRule:"evenodd",stroke:"none",strokeWidth:"1"})
var b=function(e){(0,s.default)(t,e)
function t(){(0,i.default)(this,t)
return(0,r.default)(this,(0,_.default)(t).apply(this,arguments))}(0,n.default)(t,[{key:"render",value:function(){return u.default.createElement(k.default,Object.assign({},this.props,{name:"IconBlueprint",viewBox:"0 0 1920 1920"}),d)}}])
t.displayName="IconBlueprint"
return t}(u.Component)
t.default=b
b.glyphName="blueprint"
b.variant="Solid"
b.propTypes=(0,l.default)({},k.default.propTypes)}}])

//# sourceMappingURL=56-c-0093b66512.js.map