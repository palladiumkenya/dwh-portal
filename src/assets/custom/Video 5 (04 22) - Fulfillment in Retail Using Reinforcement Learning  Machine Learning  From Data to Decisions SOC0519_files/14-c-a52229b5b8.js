(window["canvasWebpackJsonp"]=window["canvasWebpackJsonp"]||[]).push([[14],{"8Umg":function(e,t,r){var n=r("q1tI")
function o(){var e=""
try{e=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getStackAddendum()}catch(e){}return e}function a(e,t,r){if(!t&&false){var n=o()
if("function"!==typeof console[e])throw new Error("'".concat(e,"' is not a valid console method!"))
var a
for(var i=arguments.length,u=new Array(i>3?i-3:0),l=3;l<i;l++)u[l-3]=arguments[l];(a=console)[e].apply(a,["Warning: ".concat(r)].concat(u,[n]))}}t.error=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return a.apply(void 0,["error"].concat(t))}
t.warn=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return a.apply(void 0,["warn"].concat(t))}
t.info=function(){var e
return(e=console).info.apply(e,arguments)}
t.assert=function(){var e
return(e=console).assert.apply(e,arguments)}
t.debug=function(){var e
return(e=console).debug.apply(e,arguments)}
t.log=function(){var e
return(e=console).log.apply(e,arguments)}},"8gEM":function(e,t,r){"use strict"
var n=r("TqRt")
Object.defineProperty(t,"__esModule",{value:true})
Object.defineProperty(t,"FocusableView",{enumerable:true,get:function(){return h.default}})
t.default=void 0
var o=n(r("lwsE"))
var a=n(r("W8MJ"))
var i=n(r("a1gu"))
var u=n(r("Nsbk"))
var l=n(r("7W2i"))
r("8Umg")
var d=r("q1tI")
var s=n(r("17x9"))
var c=n(r("Maij"))
var f=n(r("CI6L"))
var v=n(r("GAgy"))
var p=n(r("3XUm"))
var h=n(r("XtFW"))
var b=function(e){(0,l.default)(t,e)
function t(){var e
var r;(0,o.default)(this,t)
for(var n=arguments.length,a=new Array(n),l=0;l<n;l++)a[l]=arguments[l]
r=(0,i.default)(this,(e=(0,u.default)(t)).call.apply(e,[this].concat(a)))
r._listeners=[]
r._inputModeListener=null
r.state={focused:false,focusable:false}
r.handleFocus=function(e){r.setState({focused:true})}
r.handleBlur=function(e){r.setState({focused:false})}
return r}(0,a.default)(t,[{key:"componentDidMount",value:function(){var e=this.focusable,t=this.focused
this.addEventListeners(e)
this.setState({focusable:e,focused:t})}},{key:"componentDidUpdate",value:function(e,t){var r=this.props,n=r.render,o=r.children
if(t.focusable!==this.focusable)if(this.state.focused){this.focusable.focus()
this.updateFocusable(true)}else this.updateFocusable()
e.children===o&&e.render===n||this.updateFocusable()}},{key:"componentWillUnmount",value:function(){this.removeEventListeners()}},{key:"updateFocusable",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.focused
var t=this.focusable
if(t!==this.state.focusable){this.removeEventListeners()
this.setState({focusable:t,focused:e})
this.addEventListeners(t)}else this.setState({focused:e})}},{key:"addEventListeners",value:function(e){if(e){this._listeners.push((0,c.default)(e,"focus",this.handleFocus,true))
this._listeners.push((0,c.default)(e,"blur",this.handleBlur,true))}}},{key:"removeEventListeners",value:function(){this._listeners.forEach(function(e){return e.remove()})
this._listeners=[]}},{key:"focus",value:function(){var e=this.focusable
e&&e.focus()}},{key:"render",value:function(){var e=this.props,t=e.children,r=e.render,n=void 0===r?t:r
var o=this.state,a=o.focusable,i=o.focused
var u=this.focusVisible
return"function"===typeof n?n({focused:i,focusable:a,focusVisible:u}):null}},{key:"focused",get:function(){return(0,f.default)(this)}},{key:"focusable",get:function(){var e=(0,p.default)(this,true)||[]
var t=e&&e.length||0
"[Focusable] Exactly one tabbable child is required (".concat(t," found).")
var r=!!e&&e[0]
return!(!r||"function"!==typeof r.focus)&&r}},{key:"focusVisible",get:function(){var e=this.state,r=e.focusable,n=e.focused
if(n&&v.default.isKeyboardMode())return true
if(!r||!n)return false
var o=r.tagName,a=r.type,i=r.readOnly,u=r.isContentEditable
if("INPUT"==o&&t.inputTypes[a]&&!i)return true
if("TEXTAREA"==o&&!i)return true
if(u)return true
return false}}])
t.displayName="Focusable"
return t}(d.Component)
b.propTypes={children:s.default.func,render:s.default.func}
b.defaultProps={children:null,render:void 0}
b.inputTypes={text:true,search:true,url:true,tel:true,email:true,password:true,number:true,date:true,month:true,week:true,time:true,datetime:true,"datetime-local":true}
var m=b
t.default=m},AYmh:function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:true})
t.default=n
function n(e){var t=e.typography,r=e.spacing
return{fontFamily:t.fontFamily,fontWeight:t.fontWeightNormal,smallFontSize:t.fontSizeXSmall,smallPadding:r.xxSmall,mediumFontSize:t.fontSizeSmall,mediumPadding:r.xSmall,largeFontSize:t.fontSizeMedium,largePadding:r.small}}},GAgy:function(e,t,r){"use strict"
var n=r("TqRt")
Object.defineProperty(t,"__esModule",{value:true})
t.default=t.MODES=void 0
var o=n(r("lwsE"))
var a=n(r("W8MJ"))
var i=n(r("Maij"))
var u=n(r("8HMx"))
var l={keyboard:"keyboard",pointer:"pointer"}
t.MODES=l
var d=function(){function e(){var t=this;(0,o.default)(this,e)
this._listeners=[]
this._initialized=false
this._mode=l.keyboard
this.onInitialPointerMove=function(e){if("html"===e.target.nodeName.toLowerCase())return
t._mode=l.pointer
t._listeners.forEach(function(e){return e.remove()})}
this.onKeyDown=function(){t._mode=l.keyboard}
this.onPointerDown=function(){t._mode=l.pointer}
this.init=function(){if(!u.default||t._initialized)return;(0,i.default)(document,"keydown",t.onKeyDown,true);(0,i.default)(document,"mousedown",t.onPointerDown,true);(0,i.default)(document,"pointerdown",t.onPointerDown,true);(0,i.default)(document,"touchstart",t.onPointerDown,true)
t.addInitialPointerMoveListeners()
t._initialized=true}
this.init()}(0,a.default)(e,[{key:"addInitialPointerMoveListeners",value:function(){this._listeners.push((0,i.default)(document,"mousemove",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"mousedown",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"mouseup",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"pointermove",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"pointerdown",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"pointerup",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"touchmove",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"touchstart",this.onInitialPointerMove,true))
this._listeners.push((0,i.default)(document,"touchend",this.onInitialPointerMove,true))}},{key:"isKeyboardMode",value:function(){this.init()
return this._mode===l.keyboard}},{key:"mode",get:function(){this.init()
return this._mode}}])
return e}()
var s=new d
t.default=s},X9ng:function(e,t,r){"use strict"
var n=r("TqRt")
var o=r("284h")
Object.defineProperty(t,"__esModule",{value:true})
t.default=void 0
var a=n(r("lSNA"))
var i=n(r("MVZn"))
var u=n(r("lwsE"))
var l=n(r("W8MJ"))
var d=n(r("a1gu"))
var s=n(r("Nsbk"))
var c=n(r("7W2i"))
var f=o(r("q1tI"))
var v=n(r("17x9"))
var p=n(r("TSYQ"))
var h=n(r("8gEM"))
var b=n(r("kibL"))
var m=n(r("8dII"))
var y=r("2lwo")
var g=n(r("lGJA"))
var _=n(r("ZJ40"))
var E=n(r("oxAU"))
var k=n(r("J2CL"))
var w=n(r("Zuoh"))
var G=o(r("Ui1M"))
var A=n(r("AYmh"))
var M,P,x,C,I,T
var O={componentId:"cxCug",template:function(e){return"\n\n.cxCug_bGBk{box-sizing:border-box;display:block;font-family:".concat(e.fontFamily||"inherit",";font-weight:").concat(e.fontWeight||"inherit","}\n\n.cxCug_doqw{font-size:").concat(e.smallFontSize||"inherit",";padding:").concat(e.smallPadding||"inherit","}\n\n.cxCug_ycrn{font-size:").concat(e.mediumFontSize||"inherit",";padding:").concat(e.mediumPadding||"inherit","}\n\n.cxCug_cMDj{font-size:").concat(e.largeFontSize||"inherit",";padding:").concat(e.largePadding||"inherit","}")},root:"cxCug_bGBk",small:"cxCug_doqw",medium:"cxCug_ycrn",large:"cxCug_cMDj"}
var S=(M=(0,w.default)(),P=(0,_.default)("5.42",{size:true}),x=(0,k.default)(A.default,O),M(C=P(C=x(C=(T=I=function(e){(0,c.default)(t,e)
function t(e){var r;(0,u.default)(this,t)
r=(0,d.default)(this,(0,s.default)(t).call(this))
r._id=(0,E.default)("Tooltip")
return r}(0,l.default)(t,[{key:"renderTrigger",value:function(e){var r=this.props,n=r.children,o=r.as
var a={"aria-describedby":this._id}
if(o){var u=(0,b.default)(t,this.props)
var l=(0,y.omitProps)(this.props,t.propTypes)
return f.default.createElement(u,Object.assign({},l,a),n)}return"function"===typeof n?n({focused:e,getTriggerProps:function(e){return(0,i.default)({},a,e)}}):(0,g.default)(this.props.children,a)}},{key:"render",value:function(){var e=this
var t=this.props.size||"small"
return f.default.createElement(h.default,{render:function(r){var n
var o=r.focused
return f.default.createElement(G.default,{on:e.props.on,shouldRenderOffscreen:true,shouldReturnFocus:false,placement:e.props.placement,variant:e.props.variant,mountNode:e.props.mountNode,constrain:e.props.constrain,shadow:"none"},f.default.createElement(G.PopoverTrigger,null,e.renderTrigger(o)),f.default.createElement(G.PopoverContent,null,f.default.createElement("span",{id:e._id,className:(0,p.default)((n={},(0,a.default)(n,O.root,true),(0,a.default)(n,O[t],t),n)),role:"tooltip"},e.props.tip)))}})}}])
t.displayName="Tooltip"
return t}(f.Component),I.propTypes={children:v.default.oneOfType([v.default.node,v.default.func]).isRequired,tip:v.default.node.isRequired,as:v.default.elementType,on:v.default.oneOfType([v.default.oneOf(["click","hover","focus"]),v.default.arrayOf(v.default.oneOf(["click","hover","focus"]))]),variant:v.default.oneOf(["default","inverse"]),placement:m.default.placement,size:v.default.oneOf(["small","medium","large"]),mountNode:m.default.mountNode,constrain:m.default.constrain},I.defaultProps={on:void 0,variant:"default",placement:"top",mountNode:null,constrain:"window"},T))||C)||C)||C)
t.default=S},XtFW:function(e,t,r){"use strict"
var n=r("TqRt")
var o=r("284h")
Object.defineProperty(t,"__esModule",{value:true})
t.default=void 0
var a=n(r("lSNA"))
var i=n(r("QILm"))
var u=n(r("lwsE"))
var l=n(r("W8MJ"))
var d=n(r("a1gu"))
var s=n(r("Nsbk"))
var c=n(r("7W2i"))
var f=o(r("q1tI"))
var v=n(r("17x9"))
var p=n(r("TSYQ"))
var h=n(r("XbQQ"))
var b=n(r("J2CL"))
var m=n(r("5WdN"))
var y=r("2lwo")
var g=n(r("oyAC"))
var _,E,k,w
var G={componentId:"bAGdE",template:function(e){return"\n\n.bAGdE_bGBk,.bAGdE_bGBk[type=button],.bAGdE_bGBk[type=reset],.bAGdE_bGBk[type=submit]{-moz-appearance:none;-webkit-appearance:none;appearance:none}\n\n.bAGdE_bGBk{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;background:transparent;border:none;box-sizing:border-box;direction:inherit;font-family:".concat(e.fontFamily||"inherit",";margin:0;max-width:100%;outline:none;overflow:visible;position:relative;text-align:inherit;text-decoration:none;touch-action:manipulation;user-select:none}\n\n[dir=ltr] .bAGdE_bGBk,[dir=rtl] .bAGdE_bGBk{text-align:inherit}\n\n.bAGdE_bGBk.bAGdE_cKJj:before,.bAGdE_bGBk.bAGdE_cMUw:before{border-style:solid;border-width:").concat(e.borderWidth||"inherit",';bottom:-0.25rem;content:"";left:-0.25rem;opacity:0;pointer-events:none;position:absolute;right:-0.25rem;top:-0.25rem;transform:scale(0.01);transition:all 0.2s}\n\n.bAGdE_bGBk.bAGdE_bXiG:before{border-color:').concat(e.borderColorPrimary||"inherit","}\n\n.bAGdE_bGBk.bAGdE_ddvR:before{border-color:").concat(e.borderColorError||"inherit","}\n\n.bAGdE_bGBk.bAGdE_enfx:before{border-color:").concat(e.borderColorInverse||"inherit","}\n\n.bAGdE_bGBk.bAGdE_cMUw:before{border-radius:calc(").concat(e.borderRadiusRectangular||"inherit"," + 0.125rem)}\n\n.bAGdE_bGBk.bAGdE_cKJj:before{border-radius:").concat(e.borderRadiusCircular||"inherit","}\n\n.bAGdE_bGBk.bAGdE_cVYB:before,.bAGdE_bGBk:focus:before{opacity:1;transform:scale(1)}")},root:"bAGdE_bGBk",circular:"bAGdE_cKJj",rectangular:"bAGdE_cMUw",primary:"bAGdE_bXiG",error:"bAGdE_ddvR",inverse:"bAGdE_enfx",focused:"bAGdE_cVYB"}
var A=(_=(0,b.default)(g.default,G),_(E=(w=k=function(e){(0,c.default)(t,e)
function t(){(0,u.default)(this,t)
return(0,d.default)(this,(0,s.default)(t).apply(this,arguments))}(0,l.default)(t,[{key:"render",value:function(){var e
var r=this.props,n=r.as,o=r.children,u=r.color,l=r.cursor,d=r.display,s=r.elementRef,c=r.focused,v=r.href,b=r.margin,m=r.onClick,g=r.role,_=r.shape,E=r.className,k=r.to,w=r.width,A=r.tabIndex,M=(0,i.default)(r,["as","children","color","cursor","display","elementRef","focused","href","margin","onClick","role","shape","className","to","width","tabIndex"])
var P=h.default.omitViewProps((0,y.omitProps)(M,t.propTypes),t)
return f.default.createElement(h.default,Object.assign({},P,{display:d,as:n,cursor:l,href:v,to:k,margin:b,width:w,elementRef:s,className:(0,p.default)((e={},(0,a.default)(e,E,E),(0,a.default)(e,G.root,true),(0,a.default)(e,G[u],true),(0,a.default)(e,G[_],true),(0,a.default)(e,G.focused,c),e)),role:g||m?g:null,tabIndex:m&&!g?A||"0":A,onClick:m}),o)}}])
t.displayName="FocusableView"
return t}(f.Component),k.propTypes={children:v.default.node,focused:v.default.bool,shape:v.default.oneOf(["circular","rectangular"]),color:v.default.oneOf(["primary","error","inverse"]),elementRef:v.default.func,as:v.default.elementType,href:v.default.string,display:v.default.oneOf(["auto","block","inline-block","flex","inline-flex"]),margin:m.default.spacing,cursor:v.default.string,width:v.default.oneOfType([v.default.string,v.default.number]),role:v.default.string,onClick:v.default.func,tabIndex:v.default.oneOfType([v.default.string,v.default.number])},k.defaultProps={children:null,href:void 0,width:void 0,margin:void 0,onClick:void 0,focused:false,shape:"rectangular",color:"primary",display:"inline-block",as:"button",elementRef:function(e){},cursor:"auto",role:null,tabIndex:null},w))||E)
t.default=A},oyAC:function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:true})
t.default=n
function n(e){var t=e.borders,r=e.colors,n=e.typography
return{fontFamily:n.fontFamily,borderWidth:t.widthMedium,borderRadiusRectangular:t.radiusMedium,borderRadiusCircular:"999rem",borderColorPrimary:r.borderBrand,borderColorError:r.borderDanger,borderColorInverse:r.borderLightest}}}}])

//# sourceMappingURL=14-c-a52229b5b8.js.map