﻿/*!
    *
    * Wijmo Library 5.20211.794
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

import{_getModule,isNumber,isArray,asNumber,asFunction,Point,Rect,hasClass,isDate,asBoolean,Size,asEnum,Event,EventArgs,_registerModule}from"wijmo/wijmo";import{ChartType,FlexChart,TickMark,AxisType,FlexPie}from"wijmo/wijmo.chart";import*as selfModule from"wijmo/wijmo.chart.animation";export function softFinancial(){return _getModule("wijmo.chart.finance")}export function softRadar(){return _getModule("wijmo.chart.radar")}export var Easing;!function(t){t[t.Linear=0]="Linear";t[t.Swing=1]="Swing";t[t.EaseInQuad=2]="EaseInQuad";t[t.EaseOutQuad=3]="EaseOutQuad";t[t.EaseInOutQuad=4]="EaseInOutQuad";t[t.EaseInCubic=5]="EaseInCubic";t[t.EaseOutCubic=6]="EaseOutCubic";t[t.EaseInOutCubic=7]="EaseInOutCubic";t[t.EaseInQuart=8]="EaseInQuart";t[t.EaseOutQuart=9]="EaseOutQuart";t[t.EaseInOutQuart=10]="EaseInOutQuart";t[t.EaseInQuint=11]="EaseInQuint";t[t.EaseOutQuint=12]="EaseOutQuint";t[t.EaseInOutQuint=13]="EaseInOutQuint";t[t.EaseInSine=14]="EaseInSine";t[t.EaseOutSine=15]="EaseOutSine";t[t.EaseInOutSine=16]="EaseInOutSine";t[t.EaseInExpo=17]="EaseInExpo";t[t.EaseOutExpo=18]="EaseOutExpo";t[t.EaseInOutExpo=19]="EaseInOutExpo";t[t.EaseInCirc=20]="EaseInCirc";t[t.EaseOutCirc=21]="EaseOutCirc";t[t.EaseInOutCirc=22]="EaseInOutCirc";t[t.EaseInBack=23]="EaseInBack";t[t.EaseOutBack=24]="EaseOutBack";t[t.EaseInOutBack=25]="EaseInOutBack";t[t.EaseInBounce=26]="EaseInBounce";t[t.EaseOutBounce=27]="EaseOutBounce";t[t.EaseInOutBounce=28]="EaseInOutBounce";t[t.EaseInElastic=29]="EaseInElastic";t[t.EaseOutElastic=30]="EaseOutElastic";t[t.EaseInOutElastic=31]="EaseInOutElastic"}(Easing||(Easing={}));export var AnimationMode;!function(t){t[t.All=0]="All";t[t.Point=1]="Point";t[t.Series=2]="Series"}(AnimationMode||(AnimationMode={}));export class ChartAnimation{constructor(t,e){this._play=!0;this.ended=new Event;var i=this,a=t.hostElement,n=new Size(a.offsetWidth,a.offsetHeight);i._chart=t;i._updateEventArgs=[];if(t instanceof FlexPie)i._animation=new FlexPieAnimation(t,i._updateEventArgs);else{softRadar()&&t instanceof softRadar().FlexRadar?i._animation=new FlexRadarAnimation(t,i._updateEventArgs):i._animation=new FlexChartAnimation(t,i._updateEventArgs);i._chartType=t.chartType}i._initOptions(e);t.beginUpdate();window.setTimeout(()=>{t.rendered.addHandler(i._playAnimation,i);t.endUpdate()},0);i._setCV(t.collectionView);window.addEventListener("resize",(function(t){var e=new Size(a.offsetWidth,a.offsetHeight);if(!n.equals(e)){i._play=!1;n=e}}))}_initOptions(t){if(t){t.duration&&(this.duration=t.duration);t.easing&&(this.easing=t.easing);t.animationMode&&(this.animationMode=t.animationMode)}}_setCV(t){this._cv=t;this._animation._clearState()}get animationMode(){return this._animation.animationMode}set animationMode(t){(t=asEnum(t,AnimationMode))!=this.animationMode&&(this._animation.animationMode=t)}get easing(){return this._animation.easing}set easing(t){(t=asEnum(t,Easing))!=this.easing&&(this._animation.easing=t)}get duration(){return this._animation.duration}set duration(t){(t=asNumber(t))!=this.duration&&(this._animation.duration=t)}get axisAnimation(){return this._animation.axisAnimation}set axisAnimation(t){(t=asBoolean(t))!=this.axisAnimation&&(this._animation.axisAnimation=t)}get chart(){return this._chart}_playAnimation(){var t=this,e=t._chart,i=e.chartType;t._cv!==e.collectionView&&t._setCV(e.collectionView);if(null!=t._chartType&&t._chartType!==i){t._chartType=i;t._animation._clearState()}t._play?t._animation.playAnimation(()=>t.ended.raise(t,EventArgs.empty)):t._play=!0}animate(){var t=this._chart;if(t){var e=t.itemsSource;t.beginUpdate();t.itemsSource=null;t.itemsSource=e;t.endUpdate()}}}class FlexAnimation{constructor(t,e){this._axisAnimation=!0;this._chart=t;this._timers=[]}get animationMode(){return this._animationMode||AnimationMode.All}set animationMode(t){if((t=asEnum(t,AnimationMode,!1))!==this._animationMode){this._clearState();this._animationMode=t}}get easing(){return null==this._easing?Easing.Swing:this._easing}set easing(t){t!==this._easing&&(this._easing=asEnum(t,Easing,!1))}get duration(){return this._duration||400}set duration(t){t!==this._duration&&(this._duration=asNumber(t,!1,!0))}get axisAnimation(){return!!this._axisAnimation}set axisAnimation(t){t!==this._axisAnimation&&(this._axisAnimation=asBoolean(t,!1))}playAnimation(t){}_clearState(){this._previousState&&(this._previousState=null);this._currentState&&(this._currentState=null)}_setInitState(t,e,i){var a=AnimationHelper.parseAttrs(e,i);AnimationHelper.setElementAttr(t,a,0)}_getAnimation(t,e){t[e]||(t[e]=[]);return t[e]}_toggleVisibility(t,e){e?AnimationHelper.playAnimation(t,{opacity:0},{opacity:1},null,Easing.Swing,100):t.setAttribute("opacity","0")}_toggleDataLabelVisibility(t){var e=this._chart.hostElement,i=e&&e.querySelector(".wj-data-labels");i&&this._toggleVisibility(i,t)}_playAnimation(t,e){var i,a=this,n=a.duration,s=a.easing,r=t.length;a._toggleDataLabelVisibility(!1);i=a._getDurationAndDelay(t.length,n);if(this._timers&&this._timers.length){this._timers.forEach(t=>window.clearInterval(t));this._timers.length=0}t.forEach((t,n)=>{var o;if(t){o=window.setTimeout(()=>{var o;t.forEach((t,l)=>{if(t&&t.ele){if(n===r-1&&0===l){var h=t.done;t.done=function(){a._toggleDataLabelVisibility(!0);h&&h();e&&e()}}if(isArray(t.ele)){o=AnimationHelper.playAnimations(t.ele,t.from,t.to,t.done,s,i.duration);this._timers=this._timers.concat.apply(o)}else{o=AnimationHelper.playAnimation(t.ele,t.from,t.to,t.done,s,i.duration);this._timers.push(o)}}})},i.delay*n);this._timers.push(o)}})}_getDurationAndDelay(t,e){var i={duration:e,delay:0};if(t>1)if(this._previousState){i.duration=e/t;i.delay=e/t}else{i.duration=.5*e;i.delay=.5*e/(t-1)}return i}}class FlexPieAnimation extends FlexAnimation{constructor(t,e){super(t,e);t.selectionChanged.addHandler(this._selectionChanged,this)}_selectionChanged(){this._isSelectionChanged=!0}_clearState(){super._clearState();this._isSelectionChanged=!1}_getElementRotate(t){var e,i=t.getAttribute("transform");if(i&&i.indexOf("rotate")>-1){if(1==(i=(i=i.replace("rotate(","").replace(")","")).indexOf(",")>-1?i.split(",").map(t=>+t):i.split(" ").map(t=>+t)).length){e=this._chart._areas[0].center;i.push(e.x,e.y)}}else i=[0,(e=this._chart._areas[0].center).x,e.y];return i}_getDurationAndDelay(t,e){var i={duration:e,delay:0};if(this.animationMode===AnimationMode.Point&&t>1){i.duration=e/t;i.delay=e/t}return i}playAnimation(t){super.playAnimation(t);var e=[];this._playPieAnimation(e);e.length&&this._playAnimation(e,t)}_playPieAnimation(t){var e=this._chart,i=!0;this._previousState=this._currentState;this._currentState={areas:e._areas,pels:e._pels,rotate:e._pels.length&&this._getElementRotate(e._pels[0].parentNode)};this._previousState&&(i=!1);if(this._isSelectionChanged){e.isAnimated||this._playSelectPieAnimation(t);this._isSelectionChanged=!1}else i?this._playLoadPieAnimation(t):this._playUpdatePieAnimation(t)}_playSelectPieAnimation(t){if(null!=this._previousState){var e,i,a,n=this._chart._pels[0].parentNode,s=this._previousState.rotate,r=this._getElementRotate(n),o=s[0],l=r[0];if(o!==l){o-l>180?r[0]+=360:l-o>180&&(s[0]+=360);e=this._getAnimation(t,0);i={rotate:s};a={rotate:r};this._setInitState(n,i,a);e.push({ele:n,from:i,to:a})}}}_playUpdatePieAnimation(t){var e,i,a,n,s=this._chart,r=this._previousState,o=s._areas,l=s._pels,h=r.areas.length,c=o.length,u=Math.max(c,h),m=this._getAnimation(t,0),d=0;if(0!==c&&0!==h){this._playSelectPieAnimation(t);for(e=0;e<u;e++){i={};if(l[e]&&l[e].childNodes&&l[e].childNodes.length>0){if(e<c&&e<h){a=o[0];0===e&&(d=a.angle);1===h?l[e].childNodes[0].setAttribute("d",AnimationHelper.getPathDescOfPie(a.center.x,a.center.y,a.radius,d,2*Math.PI,a.innerRadius||0)):l[e].childNodes[0].setAttribute("d",r.pels[e].childNodes[0].getAttribute("d"))}if(e<c){a=o[e];i.to={pie:[a.center.x,a.center.y,a.radius,a.angle,a.sweep,a.innerRadius||0]};i.ele=l[e].childNodes[0]}else{a=o[0];n=r.pels[e];i.to={pie:[a.center.x,a.center.y,a.radius,d+2*Math.PI,0,a.innerRadius||0]};l[0].parentNode.appendChild(n);i.done=function(t){return function(){t.parentNode.removeChild(t)}}(n);i.ele=n.childNodes[0]}if(e<h){a=r.areas[e];i.from={pie:[a.center.x,a.center.y,a.radius,a.angle,a.sweep,a.innerRadius||0]}}else{l[e].childNodes[0].setAttribute("d",AnimationHelper.getPathDescOfPie(a.center.x,a.center.y,a.radius,2*Math.PI+d,0,a.innerRadius||0));a=r.areas[0];i.from={pie:[a.center.x,a.center.y,a.radius,2*Math.PI+d,0,a.innerRadius||0]}}m.push(i)}}}}_playLoadPieAnimation(t){var e=this,i=e._chart,a=e.animationMode,n=i._areas;i._pels.forEach((i,s)=>{var r,o=i.childNodes[0],l={},h={};if(o){if(a===AnimationMode.Point){e._parsePathByAngle(n[s],l,h);r=e._getAnimation(t,s)}else{e._parsePathByRadius(n[s],l,h);r=e._getAnimation(t,0)}e._setInitState(o,l,h);r.push({ele:o,from:l,to:h})}})}_parsePathByRadius(t,e,i){var a,n,s=t.center.x,r=t.center.y,o=t.radius,l=t.angle,h=t.sweep;a=[s,r,0,l,h,0];n=[s,r,o,l,h,t.innerRadius||0];e.pie=a;i.pie=n}_parsePathByAngle(t,e,i){var a,n,s=t.center.x,r=t.center.y,o=t.radius,l=t.angle,h=t.sweep,c=t.innerRadius;a=[s,r,o,l,0,c||0];n=[s,r,o,l,h,c||0];e.pie=a;e["stroke-width"]=0;i.pie=n;i["stroke-width"]=1}}class FlexChartAnimation extends FlexAnimation{constructor(t,e){super(t,e)}_clearState(){super._clearState();this._prevAxesStates&&(this._prevAxesStates=null);this._currAxesStates&&(this._currAxesStates=null)}playAnimation(t){super.playAnimation(t);var e,i,a,n,s,r,o,l,h,c=!0,u=this._chart,m=softFinancial()&&u instanceof softFinancial().FinancialChart,d=u.series,_=d.length,p=[];this._previousState=this._currentState;this._previousXVal=this._currentXVal;this._currentState=[];this._addStart=0;this._removeStart=0;this._currentXVal=u._xlabels.slice();if(this._previousState&&this._previousState.length){c=!1;s=(r=this._previousState).length;o=this._previousXVal;l=this._currentXVal;o.length>2&&l.length>2&&((e=l.indexOf(o[0]))>0&&e<l.length-2?l[e+1]===o[1]&&l[e+2]===o[2]&&(this._addStart=e):(e=o.indexOf(l[0]))>0&&e<o.length-2&&o[e+1]===l[1]&&o[e+2]===l[2]&&(this._removeStart=e))}for(e=0;e<_;e++){n=null!=(i=d[e])._getChartType()?i._getChartType():u._getChartType();a=this._getChartType(n);this._currentState.push({seriesType:n,ele:i.hostElement});if(m)this._playDefaultAnimation(p,e);else{h=r&&r[e];if("Default"===a){this._playDefaultAnimation(p,e);continue}if(c||h&&h.seriesType!==n||h&&h.ele&&(""==h.ele.innerHTML||0===h.ele.childNodes.length))this._playLoadAnimation(p,e,a);else{this._playUpdateAnimation(p,e,a,i,h&&h.ele||null);if(e===_-1&&e<s-1)for(e++;e<=s-1;e++)this._playUpdateAnimation(p,e,a,null,h.ele)}}}this._adjustAnimations(a,p);p.length&&this._playAnimation(p,t);this.axisAnimation&&!m&&this._playAxesAnimation()}_playAxesAnimation(){var t,e,i,a=this._chart.axes,n=a.length;this._prevAxesStates=this._currAxesStates;this._currAxesStates=[];for(e=0;e<n;e++)(t=a[e]).hostElement&&this._currAxesStates.push({ele:t.hostElement,vals:t._vals,axis:t,maxValue:isDate(t.actualMax)?t.actualMax.getTime():t.actualMax,minValue:isDate(t.actualMin)?t.actualMin.getTime():t.actualMin});if(this._prevAxesStates){i=Math.max(this._prevAxesStates.length,this._currAxesStates.length);for(e=0;e<i;e++)this._playAxisAnimation(this._prevAxesStates[e],this._currAxesStates[e])}}_playAxisAnimation(t,e){var i,a=[],n=[];if(e&&e.maxValue-e.minValue){i=this._parseAxisState(e);this._convertAxisAnimation(a,i.major,e.axis,t.maxValue,t.minValue);this._convertAxisAnimation(a,i.minor,e.axis,t.maxValue,t.minValue)}if(t&&t.maxValue-t.minValue){i=this._parseAxisState(t);this._convertAxisAnimation(n,i.major,t.axis);this._convertAxisAnimation(n,i.minor,t.axis)}a&&n&&this._combineAxisAnimations(a,n);this._playCurrAxisAnimation(a);this._playPrevAxisAnimation(n)}_combineAxisAnimations(t,e){var i,a,n=e.length;for(i=n-1;i>=0;i--)(a=e[i]).text&&t.some(t=>{if(t.text&&t.text===a.text){this._combineAxisAnimation(t,a);e.splice(i,1);return!0}})}_combineAxisAnimation(t,e){["label","majorGrid","tick"].forEach(i=>{t[i]&&e[i]&&this._resetExistAxisAttrs(t[i],e[i])})}_resetExistAxisAttrs(t,e){var i=t.ele,a=e.ele,n={},s={};["x","y","x1","x2","y1","y2"].forEach(t=>{var e=i.getAttribute(t),r=a.getAttribute(t);if(e!==r){n[t]=r;s[t]=e}});t.calcPos=n;t.elePos=s}_convertAxisAnimation(t,e,i,a,n){var s,r=i.hostElement,o=i.axisType==AxisType.Y;e.forEach((e,l)=>{var h=i.convert(e.val,a,n);if(!isNaN(h)){s={};e.majorGrid&&(s.majorGrid=this._getAxisAnimationAttrs(e.majorGrid,r,h,o));if(e.label){s.label=this._getAxisAnimationAttrs(e.label,r,h,o);s.text=e.label.innerHTML||e.label.textContent}e.tick&&(s.tick=this._getAxisAnimationAttrs(e.tick,r,h,o));t.push(s)}})}_getAxisAnimationAttrs(t,e,i,a){var n,s,r;n={ele:t,parent:e,elePos:{},calcPos:{}};if("text"===t.nodeName){s=a?"y":"x";r=Number(t.getAttribute(s));n.elePos[s]=r;n.calcPos[s]=i}else{s=a?"y1":"x1";r=Number(t.getAttribute(s));if(a){n.elePos={y1:r,y2:r};n.calcPos={y1:i,y2:i}}else{n.elePos={x1:r,x2:r};n.calcPos={x1:i,x2:i}}}n.elePos.opacity=1;n.calcPos.opacity=0;return n}_playCurrAxisAnimation(t){var e=this.duration;t&&0!==t.length&&t.forEach(t=>{["majorGrid","label","tick"].forEach(i=>{var a=t[i];if(a){a.parent;var n=a.ele,s=a.elePos,r=a.calcPos;AnimationHelper.playAnimation(n,r,s,null,Easing.Swing,e)}})})}_playPrevAxisAnimation(t){var e=this.duration;t&&0!==t.length&&t.forEach(t=>{["majorGrid","label","tick"].forEach(i=>{var a=t[i];if(a){var n=a.parent,s=a.ele,r=a.elePos,o=a.calcPos;n.appendChild(s);AnimationHelper.playAnimation(s,r,o,(function(){s.parentNode===n&&n.removeChild(s)}),Easing.Swing,e)}})})}_parseAxisState(t){if(null==t)return null;var e=t.vals,i=t.axis,a=i.axisType==AxisType.Y,n=t.ele.childNodes,s=0,r=e.major,o=e.minor,l=e.hasLbls,h=[],c=[];r&&r.forEach((t,e)=>{var r,o={},c=!!l[e];h.push(o);o.val=t;r=n[s];if(i.majorGrid&&hasClass(r,FlexChart._CSS_GRIDLINE)){o.majorGrid=r;r=n[++s]}if(a){if(c&&r&&i.majorTickMarks!==TickMark.None&&hasClass(r,FlexChart._CSS_TICK)){o.tick=r;r=n[++s]}if(c&&r&&(hasClass(r,FlexChart._CSS_LABEL)||r.querySelector("."+FlexChart._CSS_LABEL))){o.label=r;s++}}else{if(c&&r&&(hasClass(r,FlexChart._CSS_LABEL)||r.querySelector("."+FlexChart._CSS_LABEL))){o.label=r;r=n[++s]}if(c&&r&&i.majorTickMarks!==TickMark.None&&hasClass(r,FlexChart._CSS_TICK)){o.tick=r;s++}}});o&&o.forEach((t,e)=>{var a,r={};c.push(r);r.val=t;a=n[s];if(i.minorTickMarks!==TickMark.None&&hasClass(a,FlexChart._CSS_TICK_MINOR)){r.tick=a;a=n[++s]}if(i.minorGrid&&hasClass(a,FlexChart._CSS_GRIDLINE_MINOR)){r.majorGrid=a;s++}});return{major:h,minor:c}}_playLoadAnimation(t,e,i){this["_playLoad"+i+"Animation"](t,e)}_playUpdateAnimation(t,e,i,a,n){null==a||null==n?null==a?this["_play"+i+"RemoveAnimation"](t,n):this["_play"+i+"AddAnimation"](t,a):this["_play"+i+"MoveAnimation"](t,a,n)}_adjustAnimations(t,e){var i,a=e.length;if("Column"===t||"Bar"===t)for(i=a-1;i>=0;i--)null==e[i]&&e.splice(i,1)}_getChartType(t){var e="Default",i=this._chart._isRotated();switch(t){case ChartType.Scatter:case ChartType.Bubble:case ChartType.Candlestick:case ChartType.HighLowOpenClose:e="Scatter";break;case ChartType.Column:case ChartType.Bar:e=i?"Bar":"Column";break;case ChartType.Line:case ChartType.LineSymbols:case ChartType.Area:case ChartType.Spline:case ChartType.SplineSymbols:case ChartType.SplineArea:e="Line";break;default:e="Default"}return e}_playLoadLineAnimation(t,e){var i,a=this,n=a._chart.series[e],s=a.animationMode,r=n.hostElement;if(s===AnimationMode.Point)a._playDefaultAnimation(t,e);else{i=s===AnimationMode.All?a._getAnimation(t,0):a._getAnimation(t,e);[].slice.call(r.childNodes).forEach(t=>{a._setLineRiseDiveAnimation(i,t,!0)})}}_setLineRiseDiveAnimation(t,e,i){var a,n,s,r,o,l,h,c=this,u=c._chart,m=e.nodeName,d=[],_=[],p=c._chart._plotRect,A=p.top+p.height,f=p.left,g={},y={};if("g"===m&&e.childNodes)[].slice.call(e.childNodes).forEach(e=>{this._setLineRiseDiveAnimation(t,e,i)});else{if("polyline"===m||"polygon"===m){s=(l=e.points).length||l.numberOfItems;for(r=0;r<s;r++){o=l[r]||l.getItem(r);u.rotated?d.push({x:f,y:o.y}):d.push({x:o.x,y:A});_.push({x:o.x,y:o.y})}g[m]=d;y[m]=_}else if("ellipse"===m){c._toggleVisibility(e,!1);i&&(h=function(){c._toggleVisibility(e,!0)})}a=i?g:y;n=i?y:g;c._setInitState(e,a,n);t.push({ele:e,from:a,to:n,done:h})}}_setLineMoveAnimation(t,e,i,a,n){if(null!=e&&null!=i){var s,r,o,l,h,c,u,m,d,_=e.nodeName,p=[],A=[],f={},g={};d="polygon"===_;o=e.points;c=i.points;s=o.length||o.numberOfItems;l=c.length||c.numberOfItems;m=Math.max(s,l);for(u=0;u<m;u++){if(u<s){r=o[u]||o.getItem(u);p.push({x:r.x,y:r.y})}if(u<l){h=c[u]||c.getItem(u);A.push({x:h.x,y:h.y})}}if(this._addStart){this._adjustStartLinePoints(this._addStart,p,o);s+=this._addStart}else if(this._removeStart){this._adjustStartLinePoints(this._removeStart,A,c);l+=this._removeStart}l>s?this._adjustEndLinePoints(l,s,p,o,d):l<s&&this._adjustEndLinePoints(s,l,A,c,d);f[_]=p;g[_]=A;this._setInitState(a,f,g);t.push({ele:a,from:f,to:g,done:n})}}_adjustStartLinePoints(t,e,i){for(var a=i[0]||i.getItem(0);t;){e.splice(0,0,{x:a.x,y:a.y});t--}}_adjustEndLinePoints(t,e,i,a,n){var s,r,o;if(n&&(a.length>=3||a.numberOfItems>=3)){r=i.pop();s=i.pop();o=a[a.length-3]||a.getItem(a.numberOfItems-3)}else(a.length>0||a.numberOfItems>0)&&(o=a[a.length-1]||a.getItem(a.numberOfItems-1));for(;t>e&&o;){i.push({x:o.x,y:o.y});e++}if(n&&r&&s){i.push(s);i.push(r)}}_playLineRemoveAnimation(t,e){var i,a=this,n=a._chart.series[0].hostElement.parentNode,s=a._getAnimation(t,0);n.appendChild(e);[].slice.call(e.childNodes).forEach(t=>{a._setLineRiseDiveAnimation(s,t,!1)});if(s.length){i=s[0].done;s[0].done=function(){e&&e.parentNode===n&&n.removeChild(e);i&&i()}}}_playLineAddAnimation(t,e){var i=e.hostElement,a=this._getAnimation(t,0);[].slice.call(i.childNodes).forEach(t=>{this._setLineRiseDiveAnimation(a,t,!0)})}_playLineMoveAnimation(t,e,i){var a,n,s,r,o=this,l=(o._chart,o._getAnimation(t,0)),h=[];a=e.hostElement;n=[].slice.call(i.childNodes);[].slice.call(a.childNodes).forEach((t,e)=>{r=t.nodeName;s=n[e];if("g"===r&&t.nodeChilds)[].slice.call(t.nodeChilds).forEach((t,e)=>{if(s){h.push(t);o._toggleVisibility(t,!1)}});else if("polygon"===r||"polyline"===r)o._setLineMoveAnimation(l,s,t,t,0===e?function(){h.forEach(t=>{o._toggleVisibility(t,!0)});h=null}:null);else if(s){h.push(t);o._toggleVisibility(t,!1)}})}_playLoadColumnAnimation(t,e){this._playLoadBarAnimation(t,e,!0)}_playLoadBarAnimation(t,e,i=!1){var a=this,n=a._chart.series[e],s=a.animationMode,r=n.hostElement;[].slice.call(r.childNodes).forEach((n,r)=>{var o,l=n.nodeName;o=s===AnimationMode.Point?a._getAnimation(t,r):s===AnimationMode.Series?a._getAnimation(t,e):a._getAnimation(t,0);"g"===l?n.childNodes&&[].slice.call(n.childNodes).forEach((t,e)=>{a._setLoadBarAnimation(o,t,i)}):a._setLoadBarAnimation(o,n,i)})}_setBarAnimation(t,e,i,a,n){this._setInitState(e,i,a);t.push({ele:e,from:i,to:a,done:n})}_setLoadBarAnimation(t,e,i,a=!1,n){var s,r,o=this,l=i?"height":"width",h=i?"y":"x",c=e.getAttribute(l),u=e.getAttribute(h),m=i?"top":"left",d=o._chart._plotRect,_={},p={};_[l]=0;p[l]=Number(c);if(i){_[h]=d[l]+d[m];p[h]=Number(u)}s=a?p:_;r=a?_:p;"g"===e.nodeName?e.childNodes&&[].slice.call(e.childNodes).forEach(e=>{o._setBarAnimation(t,e,s,r,n)}):o._setBarAnimation(t,e,s,r,n)}_setMoveBarAnimation(t,e,i){var a={},n={};if(null!=e&&null!=i){["width","height","x","y","top","left"].forEach(t=>{var s=e.getAttribute(t),r=i.getAttribute(t);if(s!==r){a[t]=Number(s);n[t]=Number(r)}});this._setInitState(i,a,n);t.push({ele:i,from:a,to:n})}}_playColumnRemoveAnimation(t,e){this._playBarRemoveAnimation(t,e,!0)}_playColumnAddAnimation(t,e){this._playBarAddAnimation(t,e,!0)}_playColumnMoveAnimation(t,e,i){this._playBarMoveAnimation(t,e,i,!0)}_playBarRemoveAnimation(t,e,i=!1){var a=this,n=a._chart.series[0].hostElement.parentNode,s=a._getAnimation(t,0);n.appendChild(e);[].slice.call(e.childNodes).forEach(t=>{a._setLoadBarAnimation(s,t,i,!0)});s.length&&(s[0].done=function(){e&&e.parentNode===n&&n.removeChild(e)})}_playBarAddAnimation(t,e,i=!1){var a=e.hostElement,n=this._getAnimation(t,2);[].slice.call(a.childNodes).forEach(t=>{this._setLoadBarAnimation(n,t,i,!1)})}_playBarMoveAnimation(t,e,i,a=!1){var n,s,r,o,l,h,c,u=this;u._chart;n=e.hostElement;r=[].slice.call(i.childNodes);if(u._addStart){c=0;o=r[0];for(;c<u._addStart;){r.splice(0,0,o);c++}}if(u._removeStart){c=0;o=r[r.length-1];for(;c<u._removeStart;){var m=r.shift();r.push(m);c++}}l=r.length;s=[].slice.call(n.childNodes);h=s.length;s.forEach((e,i)=>{var n;if(i<l){o=r[i];if(i<u._addStart){n=u._getAnimation(t,2);u._setLoadBarAnimation(n,e,a,!1)}else if(i>=l-u._removeStart){n=u._getAnimation(t,2);u._setLoadBarAnimation(n,e,a,!1);n=u._getAnimation(t,0);u._removeBarAnimation(n,e,o,a)}else{n=u._getAnimation(t,1);u._setMoveBarAnimation(n,o,e)}if(i===h-1&&i<l-1){n=u._getAnimation(t,0);for(i++;i<l;i++){o=r[i];u._removeBarAnimation(n,e,o,a)}}}else{n=u._getAnimation(t,2);u._setLoadBarAnimation(n,e,a,!1)}})}_removeBarAnimation(t,e,i,a){var n=e.parentNode;n.appendChild(i);this._setLoadBarAnimation(t,i,a,!0,function(t){return function(){t.parentNode&&t.parentNode===n&&n.removeChild(t)}}(i))}_playLoadScatterAnimation(t,e){var i=this,a=i._chart,n=a.series[e],s=i.animationMode,r=n.hostElement,o=n._xValues||a._xvals;0===o.length&&(o=n._pointIndexes);[].slice.call(r.childNodes).forEach((a,n)=>{var r;r=s===AnimationMode.Point?i._getScatterAnimation(t,o[n]):s===AnimationMode.Series?i._getAnimation(t,e):i._getAnimation(t,0);i._setLoadScatterAnimation(r,a,!1)})}_setLoadScatterAnimation(t,e,i=!1,a){var n,s,r={},o={};if("g"===e.nodeName&&e.childNodes)[].slice.call(e.childNodes).forEach(e=>{this._setLoadScatterAnimation(t,e,i,a)});else{["rx","ry","stroke-width"].forEach(t=>{var i=e.getAttribute(t);r[t]=0;o[t]=Number(i)});n=i?o:r;s=i?r:o;this._setInitState(e,n,s);t.push({ele:e,from:n,to:s,done:a})}}_setUpdateScatterAnimation(t,e,i,a){var n={},s={};["cx","cy"].forEach(t=>{var a=e.getAttribute(t),r=i.getAttribute(t);if(a!==r){n[t]=Number(a);s[t]=Number(r)}});this._setInitState(i,n,s);t.push({ele:i,from:n,to:s,done:a})}_getScatterAnimation(t,e){var i=this._getScatterAnimationIndex(t,e);t[i]||(t[i]=[]);return t[i]}_getScatterAnimationIndex(t,e){var i=this._chart.axisX,a=null==i.min?i.actualMin:i.min,n=null==i.max?i.actualMax:i.max;return Math.ceil((e-a)/((n-a)/20))}_playScatterRemoveAnimation(t,e){var i=this,a=i._chart.series[0].hostElement.parentNode,n=i._getAnimation(t,0);a.appendChild(e);[].slice.call(e.childNodes).forEach(t=>{i._setLoadScatterAnimation(n,t,!0)});n.length&&(n[0].done=function(){e&&e.parentNode===a&&a.removeChild(e)})}_playScatterAddAnimation(t,e){var i=e.hostElement,a=this._getAnimation(t,0);[].slice.call(i.childNodes).forEach(t=>{this._setLoadScatterAnimation(a,t,!1)})}_playScatterMoveAnimation(t,e,i){var a,n,s,r,o,l,h,c=this,u=(c._chart,c._getAnimation(t,0));a=e.hostElement;s=[].slice.call(i.childNodes);if(c._addStart){h=0;r=s[0];for(;h<c._addStart;){s.splice(0,0,r);h++}}if(c._removeStart){h=0;r=s[s.length-1];for(;h<c._removeStart;){var m=s.shift();s.push(m);h++}}o=s.length;n=[].slice.call(a.childNodes);l=n.length;n.forEach((t,e)=>{if(e<o){if(e<c._addStart)c._setLoadScatterAnimation(u,t,!1);else if(e>=o-c._removeStart){c._setLoadScatterAnimation(u,t,!1);r=s[e];c._removeScatterAnimation(u,t,r)}else{r=s[e];c._setUpdateScatterAnimation(u,r,t)}if(e===l-1&&e<o-1)for(e++;e<o;e++){r=s[e];c._removeScatterAnimation(u,t,r)}}else c._setLoadScatterAnimation(u,t,!1)})}_removeScatterAnimation(t,e,i){var a=e.parentNode;a.appendChild(i);this._setLoadScatterAnimation(t,i,!0,function(t){return function(){t.parentNode&&t.parentNode===a&&a.removeChild(t)}}(i))}_playDefaultAnimation(t,e){var i,a,n=this._chart,s=n.series[e].hostElement,r=n._plotRect,o=n._currentRenderEngine,l=s.getAttribute("clip-path"),h="clipPath"+(1e6*Math.random()).toFixed();let c=n.axisX.reversed;o.addClipRect(new Rect(c?r.right:r.left,r.top,0,r.height),h);s.setAttribute("clip-path","url(#"+h+")");i=n.hostElement.querySelector("#"+h);a=this._getAnimation(t,0);let u={width:0},m={width:r.width};if(c){u.x=r.right;m.x=r.left}a.push({ele:i.querySelector("rect"),from:u,to:m,done:function(){if(s){l?s.setAttribute("clip-path",l):s.removeAttribute("clip-path");i&&i.parentNode&&i.parentNode.removeChild(i)}}})}}class FlexRadarAnimation extends FlexChartAnimation{constructor(t,e){super(t,e)}_getDurationAndDelay(t,e){var i=super._getDurationAndDelay(t,e);if(this.animationMode===AnimationMode.Point){i.duration=e/t;i.delay=e/t}return i}_playAxesAnimation(){}_getChartType(t){var e=super._getChartType(t);"Bar"===e&&(e="Column");return e}_playLoadLineAnimation(t,e){var i,a,n,s=this,r=s._chart,o=s._chart.series[e],l=o._xValues||r._xvals,h=s.animationMode,c=o.hostElement;if(h===AnimationMode.Point){0===l.length&&(l=o._pointIndexes);n=[].slice.call(c.childNodes);a=n.length-c.querySelectorAll("ellipse").length;n.forEach((e,i)=>{s._setRadarLinePointAnimation(t,e,i,l,a)})}else{i=h===AnimationMode.All?s._getAnimation(t,0):s._getAnimation(t,e);[].slice.call(c.childNodes).forEach(t=>{s._setLineRiseDiveAnimation(i,t,!0)})}}_setRadarLinePointAnimation(t,e,i,a,n){var s,r,o,l,h,c,u,m=this,d=m._chart,_=e.nodeName,p=[],A=[],f=[],g=[],y=d._center,x=[],E=!1,v={},S={},M=0;if("polyline"===_||"polygon"===_){s=(l=e.points).length||l.numberOfItems;for(r=0;r<s;r++){x[u=m._getScatterAnimationIndex(t,a[r])]||(x[u]=[]);x[u].push(r);o=l[r]||l.getItem(r);p.push({x:y.x,y:y.y});A.push({x:o.x,y:o.y})}for(r=0,s=x.length;r<s;r++)if(x[r]){c=m._getAnimation(t,M);f=g.length?g.slice():p.slice();g=f.slice();x[r].forEach(t=>{var e=A[t];g[t]={x:e.x,y:e.y}});S={};(v={})[_]=f;S[_]=g;if(!E){m._setInitState(e,v,S);E=!0}c.push({ele:e,from:v,to:S,done:h});M++}}else if("ellipse"===_){if((r=i-(n||0))<0)return;c=d._isPolar?m._getScatterAnimation(t,a[r]):m._getScatterAnimation(t,r);m._toggleVisibility(e,!1);h=function(){m._toggleVisibility(e,!0)};c.push({ele:e,from:v,to:S,done:h})}}_setLineRiseDiveAnimation(t,e,i){var a,n,s,r,o,l,h,c=this,u=c._chart,m=e.nodeName,d=[],_=[],p=u._center,A={},f={};if("polyline"===m||"polygon"===m){s=(l=e.points).length||l.numberOfItems;for(r=0;r<s;r++){o=l[r]||l.getItem(r);d.push({x:p.x,y:p.y});_.push({x:o.x,y:o.y})}A[m]=d;f[m]=_}else if("ellipse"===m){c._toggleVisibility(e,!1);i&&(h=function(){c._toggleVisibility(e,!0)})}a=i?A:f;n=i?f:A;c._setInitState(e,a,n);t.push({ele:e,from:a,to:n,done:h})}_parsePathByRadius(t,e,i){var a,n,s=t.center.x,r=t.center.y,o=t.radius,l=t.angle,h=t.sweep;a=[s,r,0,l,h,0];n=[s,r,o,l,h,t.innerRadius||0];e.pie=a;i.pie=n}_playUpdateAnimation(t,e,i,a,n){if("Bar"===i||"Column"===i){if(null==a)return;this._playLoadBarAnimation(t,e,!1)}else super._playUpdateAnimation(t,e,i,a,n)}_playLoadBarAnimation(t,e,i=!1){var a=this,n=a._chart,s=n.series[e],r=n._areas[e],o=a.animationMode,l=s.hostElement;[].slice.call(l.childNodes).forEach((i,n)=>{var s,l,h={},c={};s=o===AnimationMode.Point?a._getAnimation(t,n):o===AnimationMode.Series?a._getAnimation(t,e):a._getAnimation(t,0);l=r[n];a._parsePathByRadius(l,h,c);a._setInitState(i,h,c);s.push({ele:i,from:h,to:c})})}}class AnimationHelper{static playAnimations(t,e,i,a,n=Easing.Swing,s,r){var o=t.length,l=0,h=[];t.forEach((t,c)=>{var u=AnimationHelper.playAnimation(t,e[c],i[c],(function(){l===o-1&&a&&a();l++}),n,s,r);h.push(u)});return h}static playAnimation(t,e,i,a,n=Easing.Swing,s,r){var o=AnimationHelper.parseAttrs(e,i);return AnimationHelper.animate((function(e){AnimationHelper.setElementAttr(t,o,e)}),a,n,s,r)}static setElementAttr(t,e,i){var a,n;for(n in e){a=e[n];AnimationHelper.calcValue(a,i);t.setAttribute(n,a.getValue(a.value,i))}}static getPathDescOfPie(t,e,i,a,n,s=0){var r=!1;if(n>=2*Math.PI){r=!0;n=2*Math.PI-.001}var o=new Point(t,e);o.x+=i*Math.cos(a);o.y+=i*Math.sin(a);var l=a+n,h=new Point(t,e);h.x+=i*Math.cos(l);h.y+=i*Math.sin(l);if(s){var c=new Point(t,e);c.x+=s*Math.cos(l);c.y+=s*Math.sin(l);var u=new Point(t,e);u.x+=s*Math.cos(a);u.y+=s*Math.sin(a)}var m=" 0 0,1 ",d=" 0 0,0 ";if(Math.abs(n)>Math.PI){m=" 0 1,1 ";d=" 0 1,0 "}var _="M "+o.x.toFixed(3)+","+o.y.toFixed(3);_+=" A "+i.toFixed(3)+","+i.toFixed(3)+m;_+=h.x.toFixed(3)+","+h.y.toFixed(3);if(s){_+=r?" M "+c.x.toFixed(3)+","+c.y.toFixed(3):" L "+c.x.toFixed(3)+","+c.y.toFixed(3);_+=" A "+s.toFixed(3)+","+s.toFixed(3)+d;_+=u.x.toFixed(3)+","+u.y.toFixed(3)}else _+=" L "+t.toFixed(3)+","+e.toFixed(3);r||(_+=" z");return _}static parseAttrs(t,e){var i={};for(var a in t)if(null!=e[a])switch(a){case"polyline":i.points=AnimationHelper.parseAttr(t[a],e[a],(function(t,e){if(1===e){for(var i,a,n;t.length>1;){a=t[0];n=t[1];if(a.x!==n.x||a.y!==n.y){a=null;n=null;break}t.splice(1,1)}for(i=t.length-1;i>0;i--){a=n;n=t[i];if(a){if(a.x!==n.x||a.y!==n.y)break;t.pop()}}}return t.map(t=>t.x+","+t.y).join(" ")}));break;case"polygon":i.points=AnimationHelper.parseAttr(t[a],e[a],(function(t,e){if(1===e){var i,a,n,s,r;s=t.pop();r=t.pop();for(;t.length>1;){a=t[0];n=t[1];if(a.x!==n.x||a.y!==n.y){a=null;n=null;break}t.splice(1,1)}for(i=t.length-1;i>=0;i--){a=n;n=t[i];if(a){if(a.x!==n.x||a.y!==n.y)break;t.splice(i,1)}}t.push(r);t.push(s)}return t.map(t=>t.x+","+t.y).join(" ")}));break;case"d":i[a]=AnimationHelper.parseAttr(t[a],e[a],(function(t){return t.map(t=>"string"==typeof t?t:t[0]+","+t[1]).join(" ")}));break;case"pie":i.d=AnimationHelper.parseAttr(t[a],e[a],(function(t){return AnimationHelper.getPathDescOfPie.apply(AnimationHelper,t)}));break;case"rotate":i.transform=AnimationHelper.parseAttr(t[a],e[a],(function(t){return"rotate("+t.join(" ")+")"}));break;case"x":case"width":case"height":case"rx":case"ry":case"stroke-width":i[a]=AnimationHelper.parseAttr(t[a],e[a],(function(t){return Math.abs(t)}));break;default:i[a]=AnimationHelper.parseAttr(t[a],e[a])}return i}static animate(t,e,i=Easing.Swing,a=400,n=16){asFunction(t);asNumber(a,!1,!0);asNumber(n,!1,!0);var s=0,r=setInterval((function(){Date.now();var o=s/a;o=EasingHelper[Easing[i]](o);t(o);if((s+=n)>=a){clearInterval(r);(o<1||o>1)&&t(1);e&&e()}}),n);return r}static calcValue(t,e){var i=t.from,a=t.diff,n=t.value;isNumber(i)?t.value=0===a?i:i+a*e:isArray(i)&&AnimationHelper.parseArrayAttr(n,i,a,(function(t,i){return"number"==typeof t?t+i*e:t}))}static parseAttr(t,e,i){var a,n,s,r;if(isArray(t)&&isArray(e)){n=e;s=[];r=(a=t).slice();AnimationHelper.parseArrayAttr(s,a,n,(function(t,e){return t===e?0:e-t}))}else{r=a=Number(t);s=(n=Number(e))-a}return{from:a,to:n,value:r,diff:s,getValue:i||function(t,e){return t}}}static parseArrayAttr(t,e,i,a){e.forEach((e,n)=>{var s={},r=[],o=i[n];if(isNumber(e)||"string"==typeof e)t[n]=a(e,o);else if(isArray(e)){e.forEach((t,i)=>{r[i]=a(e[i],o[i])});t[n]=r}else{Object.getOwnPropertyNames(e).forEach(t=>{s[t]=a(e[t],o[t])});t[n]=s}})}}class EasingHelper{static Linear(t){return t}static Swing(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)}static EaseInQuad(t){return t*t}static EaseOutQuad(t){return t*(2-t)}static EaseInOutQuad(t){return t<.5?2*t*t:(4-2*t)*t-1}static EaseInCubic(t){return t*t*t}static EaseOutCubic(t){return--t*t*t+1}static EaseInOutCubic(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1}static EaseInQuart(t){return t*t*t*t}static EaseOutQuart(t){return 1- --t*t*t*t}static EaseInOutQuart(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t}static EaseInQuint(t){return t*t*t*t*t}static EaseOutQuint(t){return 1+--t*t*t*t*t}static EaseInOutQuint(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t}static EaseInSine(t){return 1-Math.cos(t*(Math.PI/2))}static EaseOutSine(t){return Math.sin(t*(Math.PI/2))}static EaseInOutSine(t){return-.5*(Math.cos(Math.PI*t)-1)}static EaseInExpo(t){return 0==t?0:Math.pow(2,10*(t-1))}static EaseOutExpo(t){return 1==t?1:1-Math.pow(2,-10*t)}static EaseInOutExpo(t){return t==!!t?t:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))}static EaseInCirc(t){return-(Math.sqrt(1-t*t)-1)}static EaseOutCirc(t){return Math.sqrt(1-Math.pow(t-1,2))}static EaseInOutCirc(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}static EaseInBack(t){var e=1.70158;return t*t*((e+1)*t-e)}static EaseOutBack(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1}static EaseInOutBack(t){var e=1.70158;return(t/=.5)<1?t*t*((1+(e*=1.525))*t-e)*.5:.5*((t-=2)*t*((1+(e*=1.525))*t+e)+2)}static EaseInBounce(t){return 1-EasingHelper.EaseOutBounce(1-t)}static EaseOutBounce(t){var e=7.5625;return t<1/2.75?e*t*t:t<2/2.75?e*(t-=1.5/2.75)*t+.75:t<2.5/2.75?e*(t-=2.25/2.75)*t+.9375:e*(t-=2.625/2.75)*t+.984375}static EaseInOutBounce(t){return t<.5?.5*EasingHelper.EaseInBounce(2*t):.5*EasingHelper.EaseOutBounce(2*t-1)+.5}static EaseInElastic(t){return t==!!t?t:-Math.pow(2,10*(t-=1))*Math.sin((t-.075)*(2*Math.PI)/.3)}static EaseOutElastic(t){return t==!!t?t:Math.pow(2,-10*t)*Math.sin((t-.075)*(2*Math.PI)/.3)+1}static EaseInOutElastic(t){return t==!!t?t:(t*=2)<1?Math.pow(2,10*(t-=1))*Math.sin((t-.1125)*(2*Math.PI)/.45)*-.5:Math.pow(2,-10*(t-=1))*Math.sin((t-.1125)*(2*Math.PI)/.45)*.5+1}}_registerModule("wijmo.chart.animation",selfModule);