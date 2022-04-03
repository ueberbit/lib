import{s as M,R as s,r as h,am as Re,an as ae,ao as He,ap as me,aq as Me,ar as Te,as as Pe,at as N}from"./iframe.0fa32b8d.js";function je(e,t){if(e==null)return{};var r=Le(e,t),n,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],!(t.indexOf(n)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,n)||(r[n]=e[n]))}return r}function Le(e,t){if(e==null)return{};var r={},n=Object.keys(e),a,o;for(o=0;o<n.length;o++)a=n[o],!(t.indexOf(a)>=0)&&(r[a]=e[a]);return r}var $e=M.div(function(e){var t=e.theme;return{padding:"2px 6px",lineHeight:"16px",fontSize:10,fontWeight:t.typography.weight.bold,color:t.color.lightest,boxShadow:"0 0 5px 0 rgba(0, 0, 0, 0.3)",borderRadius:4,whiteSpace:"nowrap",pointerEvents:"none",zIndex:-1,background:t.base==="light"?"rgba(60, 60, 60, 0.9)":"rgba(20, 20, 20, 0.85)",margin:6}}),ge=function(t){var r=t.note,n=je(t,["note"]);return s.createElement($e,n,r)};ge.displayName="TooltipNote";function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function oe(e,t){if(e==null)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t.indexOf(r=o[n])>=0||(a[r]=e[r]);return a}function Q(e){var t=h.exports.useRef(e),r=h.exports.useRef(function(n){t.current&&t.current(n)});return t.current=e,r.current}var j=function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=1),e>r?r:e<t?t:e},X=function(e){return"touches"in e},Z=function(e){return e&&e.ownerDocument.defaultView||self},ce=function(e,t,r){var n=e.getBoundingClientRect(),a=X(t)?function(o,u){for(var i=0;i<o.length;i++)if(o[i].identifier===u)return o[i];return o[0]}(t.touches,r):t;return{left:j((a.pageX-(n.left+Z(e).pageXOffset))/n.width),top:j((a.pageY-(n.top+Z(e).pageYOffset))/n.height)}},le=function(e){!X(e)&&e.preventDefault()},ie=s.memo(function(e){var t=e.onMove,r=e.onKey,n=oe(e,["onMove","onKey"]),a=h.exports.useRef(null),o=Q(t),u=Q(r),i=h.exports.useRef(null),l=h.exports.useRef(!1),c=h.exports.useMemo(function(){var y=function(v){le(v),(X(v)?v.touches.length>0:v.buttons>0)&&a.current?o(ce(a.current,v,i.current)):O(!1)},C=function(){return O(!1)};function O(v){var p=l.current,m=Z(a.current),g=v?m.addEventListener:m.removeEventListener;g(p?"touchmove":"mousemove",y),g(p?"touchend":"mouseup",C)}return[function(v){var p=v.nativeEvent,m=a.current;if(m&&(le(p),!function(_,w){return w&&!X(_)}(p,l.current)&&m)){if(X(p)){l.current=!0;var g=p.changedTouches||[];g.length&&(i.current=g[0].identifier)}m.focus(),o(ce(m,p,i.current)),O(!0)}},function(v){var p=v.which||v.keyCode;p<37||p>40||(v.preventDefault(),u({left:p===39?.05:p===37?-.05:0,top:p===40?.05:p===38?-.05:0}))},O]},[u,o]),f=c[0],d=c[1],E=c[2];return h.exports.useEffect(function(){return E},[E]),s.createElement("div",P({},n,{onTouchStart:f,onMouseDown:f,className:"react-colorful__interactive",ref:a,onKeyDown:d,tabIndex:0,role:"slider"}))}),z=function(e){return e.filter(Boolean).join(" ")},ue=function(e){var t=e.color,r=e.left,n=e.top,a=n===void 0?.5:n,o=z(["react-colorful__pointer",e.className]);return s.createElement("div",{className:o,style:{top:100*a+"%",left:100*r+"%"}},s.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:t}}))},k=function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=Math.pow(10,t)),Math.round(r*e)/r},Be={grad:.9,turn:360,rad:360/(2*Math.PI)},U=function(e){return e[0]==="#"&&(e=e.substr(1)),e.length<6?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:1}:{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:1}},Xe=function(e,t){return t===void 0&&(t="deg"),Number(e)*(Be[t]||1)},We=function(e){var t=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return t?ze({h:Xe(t[1],t[2]),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)}):{h:0,s:0,v:0,a:1}},ze=function(e){var t=e.s,r=e.l;return{h:e.h,s:(t*=(r<50?r:100-r)/100)>0?2*t/(r+t)*100:0,v:r+t,a:e.a}},be=function(e){var t=e.s,r=e.v,n=e.a,a=(200-t)*r/100;return{h:k(e.h),s:k(a>0&&a<200?t*r/100/(a<=100?a:200-a)*100:0),l:k(a/2),a:k(n,2)}},ee=function(e){var t=be(e);return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},q=function(e){var t=be(e);return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},xe=function(e){var t=e.h,r=e.s,n=e.v,a=e.a;t=t/360*6,r/=100,n/=100;var o=Math.floor(t),u=n*(1-r),i=n*(1-(t-o)*r),l=n*(1-(1-t+o)*r),c=o%6;return{r:k(255*[n,i,u,u,l,n][c]),g:k(255*[l,n,n,i,u,u][c]),b:k(255*[u,u,l,n,n,i][c]),a:k(a,2)}},Ve=function(e){var t=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);return t?ye({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):{h:0,s:0,v:0,a:1}},Y=function(e){var t=e.toString(16);return t.length<2?"0"+t:t},ye=function(e){var t=e.r,r=e.g,n=e.b,a=e.a,o=Math.max(t,r,n),u=o-Math.min(t,r,n),i=u?o===t?(r-n)/u:o===r?2+(n-t)/u:4+(t-r)/u:0;return{h:k(60*(i<0?i+6:i)),s:k(o?u/o*100:0),v:k(o/255*100),a}},Ee=s.memo(function(e){var t=e.hue,r=e.onChange,n=z(["react-colorful__hue",e.className]);return s.createElement("div",{className:n},s.createElement(ie,{onMove:function(a){r({h:360*a.left})},onKey:function(a){r({h:j(t+360*a.left,0,360)})},"aria-label":"Hue","aria-valuetext":k(t)},s.createElement(ue,{className:"react-colorful__hue-pointer",left:t/360,color:ee({h:t,s:100,v:100,a:1})})))}),_e=s.memo(function(e){var t=e.hsva,r=e.onChange,n={backgroundColor:ee({h:t.h,s:100,v:100,a:1})};return s.createElement("div",{className:"react-colorful__saturation",style:n},s.createElement(ie,{onMove:function(a){r({s:100*a.left,v:100-100*a.top})},onKey:function(a){r({s:j(t.s+100*a.left,0,100),v:j(t.v-100*a.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+k(t.s)+"%, Brightness "+k(t.v)+"%"},s.createElement(ue,{className:"react-colorful__saturation-pointer",top:1-t.v/100,left:t.s/100,color:ee(t)})))}),Ce=function(e,t){if(e===t)return!0;for(var r in e)if(e[r]!==t[r])return!1;return!0},we=function(e,t){return e.replace(/\s/g,"")===t.replace(/\s/g,"")};function Se(e,t,r){var n=Q(r),a=h.exports.useState(function(){return e.toHsva(t)}),o=a[0],u=a[1],i=h.exports.useRef({color:t,hsva:o});h.exports.useEffect(function(){if(!e.equal(t,i.current.color)){var c=e.toHsva(t);i.current={hsva:c,color:t},u(c)}},[t,e]),h.exports.useEffect(function(){var c;Ce(o,i.current.hsva)||e.equal(c=e.fromHsva(o),i.current.color)||(i.current={hsva:o,color:c},n(c))},[o,e,n]);var l=h.exports.useCallback(function(c){u(function(f){return Object.assign({},f,c)})},[]);return[o,l]}var Ae=typeof window!="undefined"?h.exports.useLayoutEffect:h.exports.useEffect,Ge=function(){return typeof __webpack_nonce__!="undefined"?__webpack_nonce__:void 0},se=new Map,ke=function(e){Ae(function(){var t=e.current?e.current.ownerDocument:document;if(t!==void 0&&!se.has(t)){var r=t.createElement("style");r.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,se.set(t,r);var n=Ge();n&&r.setAttribute("nonce",n),t.head.appendChild(r)}},[])},Fe=function(e){var t=e.className,r=e.colorModel,n=e.color,a=n===void 0?r.defaultColor:n,o=e.onChange,u=oe(e,["className","colorModel","color","onChange"]),i=h.exports.useRef(null);ke(i);var l=Se(r,a,o),c=l[0],f=l[1],d=z(["react-colorful",t]);return s.createElement("div",P({},u,{ref:i,className:d}),s.createElement(_e,{hsva:c,onChange:f}),s.createElement(Ee,{hue:c.h,onChange:f,className:"react-colorful__last-control"}))},qe={defaultColor:"000",toHsva:function(e){return ye(U(e))},fromHsva:function(e){return r=(t=xe(e)).g,n=t.b,"#"+Y(t.r)+Y(r)+Y(n);var t,r,n},equal:function(e,t){return e.toLowerCase()===t.toLowerCase()||Ce(U(e),U(t))}},De=function(e){return s.createElement(Fe,P({},e,{colorModel:qe}))},Ke=function(e){var t=e.className,r=e.hsva,n=e.onChange,a={backgroundImage:"linear-gradient(90deg, "+q(Object.assign({},r,{a:0}))+", "+q(Object.assign({},r,{a:1}))+")"},o=z(["react-colorful__alpha",t]);return s.createElement("div",{className:o},s.createElement("div",{className:"react-colorful__alpha-gradient",style:a}),s.createElement(ie,{onMove:function(u){n({a:u.left})},onKey:function(u){n({a:j(r.a+u.left)})},"aria-label":"Alpha","aria-valuetext":k(100*r.a)+"%"},s.createElement(ue,{className:"react-colorful__alpha-pointer",left:r.a,color:q(r)})))},Oe=function(e){var t=e.className,r=e.colorModel,n=e.color,a=n===void 0?r.defaultColor:n,o=e.onChange,u=oe(e,["className","colorModel","color","onChange"]),i=h.exports.useRef(null);ke(i);var l=Se(r,a,o),c=l[0],f=l[1],d=z(["react-colorful",t]);return s.createElement("div",P({},u,{ref:i,className:d}),s.createElement(_e,{hsva:c,onChange:f}),s.createElement(Ee,{hue:c.h,onChange:f}),s.createElement(Ke,{hsva:c,onChange:f,className:"react-colorful__last-control"}))},Ue={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:We,fromHsva:q,equal:we},Ye=function(e){return s.createElement(Oe,P({},e,{colorModel:Ue}))},Je={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Ve,fromHsva:function(e){var t=xe(e);return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},equal:we},Qe=function(e){return s.createElement(Oe,P({},e,{colorModel:Je}))},Ze=Re,et=function(){return Ze.Date.now()},tt=et,rt=/\s/;function nt(e){for(var t=e.length;t--&&rt.test(e.charAt(t)););return t}var at=nt,ot=at,it=/^\s+/;function ut(e){return e&&e.slice(0,ot(e)+1).replace(it,"")}var ct=ut,lt=ct,fe=ae,st=He,de=0/0,ft=/^[-+]0x[0-9a-f]+$/i,dt=/^0b[01]+$/i,vt=/^0o[0-7]+$/i,pt=parseInt;function ht(e){if(typeof e=="number")return e;if(st(e))return de;if(fe(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=fe(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=lt(e);var r=dt.test(e);return r||vt.test(e)?pt(e.slice(2),r?2:8):ft.test(e)?de:+e}var mt=ht,gt=ae,J=tt,ve=mt,bt="Expected a function",xt=Math.max,yt=Math.min;function Et(e,t,r){var n,a,o,u,i,l,c=0,f=!1,d=!1,E=!0;if(typeof e!="function")throw new TypeError(bt);t=ve(t)||0,gt(r)&&(f=!!r.leading,d="maxWait"in r,o=d?xt(ve(r.maxWait)||0,t):o,E="trailing"in r?!!r.trailing:E);function y(x){var I=n,H=a;return n=a=void 0,c=x,u=e.apply(H,I),u}function C(x){return c=x,i=setTimeout(p,t),f?y(x):u}function O(x){var I=x-l,H=x-c,V=t-I;return d?yt(V,o-H):V}function v(x){var I=x-l,H=x-c;return l===void 0||I>=t||I<0||d&&H>=o}function p(){var x=J();if(v(x))return m(x);i=setTimeout(p,O(x))}function m(x){return i=void 0,E&&n?y(x):(n=a=void 0,u)}function g(){i!==void 0&&clearTimeout(i),c=0,n=l=a=i=void 0}function _(){return i===void 0?u:m(J())}function w(){var x=J(),I=v(x);if(n=arguments,a=this,l=x,I){if(i===void 0)return C(l);if(d)return clearTimeout(i),i=setTimeout(p,t),y(l)}return i===void 0&&(i=setTimeout(p,t)),u}return w.cancel=g,w.flush=_,w}var _t=Et,Ct=_t,wt=ae,St="Expected a function";function kt(e,t,r){var n=!0,a=!0;if(typeof e!="function")throw new TypeError(St);return wt(r)&&(n="leading"in r?!!r.leading:n,a="trailing"in r?!!r.trailing:a),Ct(e,t,{leading:n,maxWait:t,trailing:a})}var Ot=kt,$,B;function R(e,t){return Ht(e)||Rt(e,t)||It(e,t)||Nt()}function Nt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function It(e,t){if(!!e){if(typeof e=="string")return pe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return pe(e,t)}}function pe(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Rt(e,t){if(!(typeof Symbol=="undefined"||!(Symbol.iterator in Object(e)))){var r=[],n=!0,a=!1,o=void 0;try{for(var u=e[Symbol.iterator](),i;!(n=(i=u.next()).done)&&(r.push(i.value),!(t&&r.length===t));n=!0);}catch(l){a=!0,o=l}finally{try{!n&&u.return!=null&&u.return()}finally{if(a)throw o}}return r}}function Ht(e){if(Array.isArray(e))return e}function S(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function te(){return te=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},te.apply(this,arguments)}function Mt(e,t){if(e==null)return{};var r=Tt(e,t),n,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],!(t.indexOf(n)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,n)||(r[n]=e[n]))}return r}function Tt(e,t){if(e==null)return{};var r={},n=Object.keys(e),a,o;for(o=0;o<n.length;o++)a=n[o],!(t.indexOf(a)>=0)&&(r[a]=e[a]);return r}var Pt=M.div({position:"relative",maxWidth:250}),jt=M(me)({position:"absolute",zIndex:1,top:4,left:4}),Lt=M.div({width:200,margin:5,".react-colorful__saturation":{borderRadius:"4px 4px 0 0"},".react-colorful__hue":{boxShadow:"inset 0 0 0 1px rgb(0 0 0 / 5%)"},".react-colorful__last-control":{borderRadius:"0 0 4px 4px"}}),$t=M(ge)(function(e){var t=e.theme;return{fontFamily:t.typography.fonts.base}}),Bt=M.div({display:"grid",gridTemplateColumns:"repeat(9, 16px)",gap:6,padding:3,marginTop:5,width:200}),Xt=M.div(function(e){var t=e.theme,r=e.active;return{width:16,height:16,boxShadow:r?"".concat(t.appBorderColor," 0 0 0 1px inset, ").concat(t.color.mediumdark,"50 0 0 0 4px"):"".concat(t.appBorderColor," 0 0 0 1px inset"),borderRadius:t.appBorderRadius}}),Wt=`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,re=function(t){var r=t.value,n=t.active,a=t.onClick,o=t.style,u=Mt(t,["value","active","onClick","style"]),i="linear-gradient(".concat(r,", ").concat(r,"), ").concat(Wt,", linear-gradient(#fff, #fff)");return s.createElement(Xt,te({},u,{active:n,onClick:a,style:Object.assign({},o,{backgroundImage:i})}))};re.displayName="Swatch";var zt=M(Me.Input)(function(e){var t=e.theme;return{width:"100%",paddingLeft:30,paddingRight:30,boxSizing:"border-box",fontFamily:t.typography.fonts.base}}),Vt=M(Te)(function(e){var t=e.theme;return{position:"absolute",zIndex:1,top:6,right:7,width:20,height:20,padding:4,boxSizing:"border-box",cursor:"pointer",color:t.input.color}}),b;(function(e){e.RGB="rgb",e.HSL="hsl",e.HEX="hex"})(b||(b={}));var G=Object.values(b),At=/\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,Gt=/^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i,Ft=/^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,ne=/^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i,qt=/^\s*#?([0-9a-f]{3})\s*$/i,Dt=($={},S($,b.HEX,De),S($,b.RGB,Qe),S($,b.HSL,Ye),$),F=(B={},S(B,b.HEX,"transparent"),S(B,b.RGB,"rgba(0, 0, 0, 0)"),S(B,b.HSL,"hsla(0, 0%, 0%, 0)"),B),he=function(t){var r=t==null?void 0:t.match(At);if(!r)return[0,0,0,1];var n=R(r,5),a=n[1],o=n[2],u=n[3],i=n[4],l=i===void 0?1:i;return[a,o,u,l].map(Number)},W=function(t){var r;if(!!t){var n=!0;if(Gt.test(t)){var a,o=he(t),u=R(o,4),i=u[0],l=u[1],c=u[2],f=u[3],d=N.rgb.hsl([i,l,c])||[0,0,0],E=R(d,3),y=E[0],C=E[1],O=E[2];return a={valid:n,value:t,keyword:N.rgb.keyword([i,l,c]),colorSpace:b.RGB},S(a,b.RGB,t),S(a,b.HSL,"hsla(".concat(y,", ").concat(C,"%, ").concat(O,"%, ").concat(f,")")),S(a,b.HEX,"#".concat(N.rgb.hex([i,l,c]).toLowerCase())),a}if(Ft.test(t)){var v,p=he(t),m=R(p,4),g=m[0],_=m[1],w=m[2],x=m[3],I=N.hsl.rgb([g,_,w])||[0,0,0],H=R(I,3),V=H[0],Ne=H[1],Ie=H[2];return v={valid:n,value:t,keyword:N.hsl.keyword([g,_,w]),colorSpace:b.HSL},S(v,b.RGB,"rgba(".concat(V,", ").concat(Ne,", ").concat(Ie,", ").concat(x,")")),S(v,b.HSL,t),S(v,b.HEX,"#".concat(N.hsl.hex([g,_,w]).toLowerCase())),v}var A=t.replace("#",""),L=N.keyword.rgb(A)||N.hex.rgb(A),K=N.rgb.hsl(L),T=t;if(/[^#a-f0-9]/i.test(t)?T=A:ne.test(t)&&(T="#".concat(A)),T.startsWith("#"))n=ne.test(T);else try{N.keyword.hex(T)}catch{n=!1}return r={valid:n,value:T,keyword:N.rgb.keyword(L),colorSpace:b.HEX},S(r,b.RGB,"rgba(".concat(L[0],", ").concat(L[1],", ").concat(L[2],", 1)")),S(r,b.HSL,"hsla(".concat(K[0],", ").concat(K[1],"%, ").concat(K[2],"%, 1)")),S(r,b.HEX,T),r}},Kt=function(t,r,n){if(!t||!(r!=null&&r.valid))return F[n];if(n!==b.HEX)return(r==null?void 0:r[n])||F[n];if(!r.hex.startsWith("#"))try{return"#".concat(N.keyword.hex(r.hex))}catch{return F.hex}var a=r.hex.match(qt);if(!a)return ne.test(r.hex)?r.hex:F.hex;var o=a[1].split(""),u=R(o,3),i=u[0],l=u[1],c=u[2];return"#".concat(i).concat(i).concat(l).concat(l).concat(c).concat(c)},Ut=function(t,r){var n=h.exports.useState(t||""),a=R(n,2),o=a[0],u=a[1],i=h.exports.useState(function(){return W(o)}),l=R(i,2),c=l[0],f=l[1],d=h.exports.useState((c==null?void 0:c.colorSpace)||b.HEX),E=R(d,2),y=E[0],C=E[1];h.exports.useEffect(function(){t===void 0&&(u(""),f(void 0),C(b.HEX))},[t]);var O=h.exports.useMemo(function(){return Kt(o,c,y).toLowerCase()},[o,c,y]),v=h.exports.useCallback(function(m){var g=W(m);u((g==null?void 0:g.value)||m||""),g&&(f(g),C(g.colorSpace),r(g.value))},[r]),p=h.exports.useCallback(function(){var m=G.indexOf(y)+1;m>=G.length&&(m=0),C(G[m]);var g=(c==null?void 0:c[G[m]])||"";u(g),r(g)},[c,y,r]);return{value:o,realValue:O,updateValue:v,color:c,colorSpace:y,cycleColorSpace:p}},D=function(t){return t.replace(/\s*/,"").toLowerCase()},Yt=function(t,r,n){var a=h.exports.useState(r!=null&&r.valid?[r]:[]),o=R(a,2),u=o[0],i=o[1];h.exports.useEffect(function(){r===void 0&&i([])},[r]);var l=h.exports.useMemo(function(){var f=(t||[]).map(function(d){return typeof d=="string"?W(d):d.title?Object.assign({},W(d.color),{keyword:d.title}):W(d.color)});return f.concat(u).filter(Boolean).slice(-27)},[t,u]),c=h.exports.useCallback(function(f){!(f!=null&&f.valid)||l.some(function(d){return D(d[n])===D(f[n])})||i(function(d){return d.concat(f)})},[n,l]);return{presets:l,addPreset:c}},Jt=function(t){var r=t.name,n=t.value,a=t.onChange,o=t.onFocus,u=t.onBlur,i=t.presetColors,l=t.startOpen,c=Ut(n,Ot(a,200)),f=c.value,d=c.realValue,E=c.updateValue,y=c.color,C=c.colorSpace,O=c.cycleColorSpace,v=Yt(i,y,C),p=v.presets,m=v.addPreset,g=Dt[C];return s.createElement(Pt,null,s.createElement(jt,{trigger:"click",startOpen:l,closeOnClick:!0,onVisibilityChange:function(){return m(y)},tooltip:s.createElement(Lt,null,s.createElement(g,{color:d==="transparent"?"#000000":d,onChange:E,onFocus:o,onBlur:u}),p.length>0&&s.createElement(Bt,null,p.map(function(_,w){return s.createElement(me,{key:"".concat(_.value,"-").concat(w),hasChrome:!1,tooltip:s.createElement($t,{note:_.keyword||_.value})},s.createElement(re,{value:_[C],active:y&&D(_[C])===D(y[C]),onClick:function(){return E(_.value)}}))})))},s.createElement(re,{value:d,style:{margin:4}})),s.createElement(zt,{id:Pe(r),value:f,onChange:function(w){return E(w.target.value)},onFocus:function(w){return w.target.select()},placeholder:"Choose color..."}),f?s.createElement(Vt,{icon:"markup",onClick:O}):null)};Jt.displayName="ColorControl";export{Jt as ColorControl,Jt as default};
//# sourceMappingURL=Color.160cb9b1.js.map
