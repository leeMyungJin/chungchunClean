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

"use strict";var __importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);e.default=t;return e};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_1=require("wijmo/wijmo"),selfModule=__importStar(require("wijmo/wijmo.touch"));class DataTransfer{constructor(){this._dropEffect="move";this._effectAllowed="all";this._data={}}get dropEffect(){return this._dropEffect}set dropEffect(t){this._dropEffect=wijmo_1.asString(t)}get effectAllowed(){return this._effectAllowed}set effectAllowed(t){this._effectAllowed=wijmo_1.asString(t)}get types(){return Object.keys(this._data)}clearData(t){null!=t?delete this._data[t]:this._data=null}getData(t){return this._data[t]||""}setData(t,e){this._data[t]=e}setDragImage(t,e,i){let s=DragDropTouch._instance;s._imgCustom=t;s._imgOffset=new wijmo_1.Point(e,i)}}exports.DataTransfer=DataTransfer;class DragDropTouch{constructor(){this._lastClick=0;wijmo_1.assert(!DragDropTouch._instance,"DragDropTouch instance already created.");let t=!1;document.addEventListener("test",()=>{},{get passive(){t=!0;return!0}});let e=document,i=this._touchstart.bind(this),s=this._touchmove.bind(this),r=this._touchend.bind(this),a=!!t&&{passive:!1,capture:!1};e.addEventListener("touchstart",i,a);e.addEventListener("touchmove",s,a);e.addEventListener("touchend",r);e.addEventListener("touchcancel",r)}static getInstance(){return DragDropTouch._instance}_touchstart(t){if(this._shouldHandle(t)){let e=t.target;if(Date.now()-this._lastClick<DragDropTouch._DBLCLICK&&this._dispatchEvent(t,"dblclick",e)){t.preventDefault();this._reset();return}this._reset();this._lastTouch=t;if(!this._dispatchEvent(t,"mousemove",e)&&!this._dispatchEvent(t,"mousedown",e)){let e=wijmo_1.closest(t.target,"[draggable]");if(e&&e.draggable){this._dragSource=e;this._ptDown=this._getPoint(t)}}}}_touchmove(t){if(this._shouldHandle(t)){this._lastTouch=t;let e=this._getTarget(t);if(this._dispatchEvent(t,"mousemove",e)){t.preventDefault();return}if(this._dragSource&&!this._img){if(this._getDelta(t)>DragDropTouch._THRESHOLD){this._dispatchEvent(t,"dragstart",this._dragSource);this._createImage(t);this._dispatchEvent(t,"dragenter",e)}}if(this._img){t.preventDefault();if(e!=this._lastTarget){this._dispatchEvent(t,"dragleave",this._lastTarget);this._dispatchEvent(t,"dragenter",e);this._lastTarget=e}this._moveImage(t);this._dispatchEvent(t,"dragover",e)}}}_touchend(t){if(this._shouldHandle(t)){let e=t.target,i=this._lastTouch;if(this._dispatchEvent(i,"mouseup",e)){t.preventDefault();return}this._destroyImage();if(this._dragSource){t.type.indexOf("cancel")<0&&this._dispatchEvent(i,"drop",this._lastTarget);this._dispatchEvent(i,"dragend",this._dragSource);this._reset()}}}_shouldHandle(t){return t&&!t.defaultPrevented&&t.touches&&t.touches.length<2}_reset(){this._destroyImage();this._dragSource=null;this._lastTouch=null;this._lastTarget=null;this._ptDown=null;this._dataTransfer=new DataTransfer}_getPoint(t,e){t&&t.touches&&(t=t.touches[0]);wijmo_1.assert(t&&"clientX"in t,"invalid event?");return 1==e?new wijmo_1.Point(t.pageX,t.pageY):new wijmo_1.Point(t.clientX,t.clientY)}_getDelta(t){let e=this._getPoint(t);return Math.abs(e.x-this._ptDown.x)+Math.abs(e.y-this._ptDown.y)}_getTarget(t){let e=this._getPoint(t),i=document.elementFromPoint(e.x,e.y);for(;i&&"none"==getComputedStyle(i).pointerEvents;)i=i.parentElement;return i}_createImage(t){this._img&&this._destroyImage();let e=this._imgCustom||this._dragSource;this._img=e.cloneNode(!0);this._copyStyle(e,this._img);this._img.style.top=this._img.style.left="-9999px";if(!this._imgCustom){let i=e.getBoundingClientRect(),s=this._getPoint(t);this._imgOffset=new wijmo_1.Point(s.x-i.left,s.y-i.top);this._img.style.opacity=DragDropTouch._OPACITY.toString()}this._moveImage(t);document.body.appendChild(this._img)}_destroyImage(){this._img&&this._img.parentElement&&this._img.parentElement.removeChild(this._img);this._img=null;this._imgCustom=null}_moveImage(t){requestAnimationFrame(()=>{if(this._img){let e=this._getPoint(t,!0);wijmo_1.setCss(this._img,{position:"absolute",pointerEvents:"none",zIndex:999999,left:Math.round(e.x-this._imgOffset.x),top:Math.round(e.y-this._imgOffset.y)})}})}_copyProps(t,e,i){for(let s in e)i.test(s)&&(t[s]=e[s])}_copyStyle(t,e){["id","class","style","draggable"].forEach(t=>{e.removeAttribute(t)});if(t instanceof HTMLCanvasElement){let i=t,s=e;s.width=i.width;s.height=i.height;s.getContext("2d").drawImage(i,0,0)}let i=getComputedStyle(t);for(let t=0;t<i.length;t++){let s=i[t];s.indexOf("transition")<0&&s.indexOf("transform")<0&&(e.style[s]=i[s])}e.style.pointerEvents="none";for(let i=0;i<t.children.length;i++)this._copyStyle(t.children[i],e.children[i])}_dispatchEvent(t,e,i){if(t&&i){let s=document.createEvent("Event"),r=t.touches?t.touches[0]:t;s.initEvent(e,!0,!0);s.button=0;s.which=s.buttons=1;this._copyProps(s,t,/Key$/);this._copyProps(s,r,/(X|Y)$/);s.dataTransfer=this._dataTransfer;i.dispatchEvent(s);return s.defaultPrevented}return!1}}DragDropTouch._instance=new DragDropTouch;DragDropTouch._THRESHOLD=5;DragDropTouch._OPACITY=.5;DragDropTouch._DBLCLICK=500;DragDropTouch._CTXMENU=900;exports.DragDropTouch=DragDropTouch;wijmo_1._registerModule("wijmo.touch",selfModule);