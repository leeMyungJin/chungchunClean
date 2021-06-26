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

var __extends=this&&this.__extends||function(){var extendStatics=function(t,e){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)};return function(t,e){extendStatics(t,e);function __(){this.constructor=t}t.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}}();import{asEnum,Control,Size,Event,toggleClass,asNumber,assert,isIE,_registerModule}from"wijmo/wijmo";import*as selfModule from"wijmo/wijmo.barcode";var alignmentMap={center:"middle",left:"start",right:"end"},SVGRenderContext=function(){function SVGRenderContext(t,e,o){this.dom=t;this.style=e;this.scale=o;this.color="rgb(0,0,0)";this.addGroup()}SVGRenderContext.prototype.setColor=function(t){this.color=t};SVGRenderContext.prototype.setBackgroundColor=function(t){this.dom.style.backgroundColor=t};SVGRenderContext.prototype.addGroup=function(){var t=this.dom;this.g=document.createElementNS("http://www.w3.org/2000/svg","g");this.g.setAttribute("shape-rendering","crispEdges");t.appendChild(this.g)};SVGRenderContext.prototype.drawRect=function(t){var e=this.g,o=this.scale,i=this.color,r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("x",(t.x*o).toString());r.setAttribute("y",(t.y*o).toString());r.setAttribute("width",(t.width*o).toString());r.setAttribute("height",(t.height*o).toString());r.style.fill=i;e.appendChild(r)};SVGRenderContext.prototype.drawText=function(t){var e=this.g,o=this.scale,i=this.color,r=this.style,n=document.createElementNS("http://www.w3.org/2000/svg","text");n.style.fill=i;n.style.fontSize=r.fontSize;n.style.fontFamily=r.fontFamily;n.style.fontStyle=t.fontStyle||r.fontStyle;n.style.fontWeight=t.fontWeight||r.fontWeight;n.style.textDecoration=t.textDecoration||r.textDecoration;n.style.textAnchor=alignmentMap[t.textAlign||r.textAlign];n.textContent=t.text;n.textContent=this.clipString(t,n);var a=this._measureText(n);n.setAttribute("y",(t.y*o+Math.abs(a.y)).toString());n.setAttribute("x",(t.x*o).toString());e.appendChild(n)};SVGRenderContext.prototype.clipString=function(t,e){var o=this.scale,i=t.text,r=t.maxWidth,n=this._measureText(e);r*=o;if(n.width>r){var a=Math.floor(r/n.width*i.length);return t.text.substr(0,a)}return i};SVGRenderContext.prototype.clear=function(){this.dom.removeChild(this.g);this.addGroup()};SVGRenderContext.prototype._measureText=function(t){var e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("xmlns","http://www.w3.org/2000/svg");e.style.visibility="hidden";e.style.position="absolute";t.setAttribute("x",0);t.setAttribute("y",0);e.appendChild(t);document.body.appendChild(e);var o=t.getBBox();document.body.removeChild(e);return o};SVGRenderContext.prototype.getDataUrl=function(){return"data:image/svg+xml;base64,"+btoa(this.dom.outerHTML)};return SVGRenderContext}();export{SVGRenderContext};var CanvasRenderContext=function(){function CanvasRenderContext(t,e,o){this.dom=t;this.style=e;this.ctx=this.dom.getContext("2d");this.scale=o}CanvasRenderContext.prototype.setColor=function(t){this.ctx.fillStyle=t};CanvasRenderContext.prototype.setBackgroundColor=function(t){var e=this.ctx,o=this.dom;e.save();e.fillStyle=t;e.fillRect(0,0,o.width,o.height);e.restore()};CanvasRenderContext.prototype.drawRect=function(t){var e=this.ctx,o=this.scale;e.fillRect(t.x*o,t.y*o,t.width*o,t.height*o)};CanvasRenderContext.prototype.drawText=function(t){var e=this.ctx,o=this.style,i=this.scale;e.save();e.font=(t.fontStyle||o.fontStyle)+" "+(t.fontWeight||o.fontWeight)+" "+o.fontSize+" "+o.fontFamily;e.textAlign=t.textAlign||o.textAlign;e.textBaseline="bottom";var r=t.x*i,n=t.y*i,a=this.clipString(t);e.fillText(a,r,n+o.fontHeight);this.drawTextDecorationLine(a,r,n,t.textDecoration||o.textDecoration);e.restore()};CanvasRenderContext.prototype.clipString=function(t){var e=this.ctx,o=this.scale,i=t.text,r=t.maxWidth,n=e.measureText(i);r*=o;if(n.width>r){var a=Math.floor(r/n.width*i.length);return t.text.substr(0,a)}return i};CanvasRenderContext.prototype.drawTextDecorationLine=function(t,e,o,i){var r;switch(i){case"underline":r=.9;break;case"overline":r=.1;break;case"line-through":r=.5;break;default:return}var n=this.ctx,a=this.style.fontHeight,s=n.measureText(t).width;switch(n.textAlign){case"center":e-=s/2;break;case"right":e-=s}n.lineWidth=1;n.beginPath();var c=a*r+o;n.moveTo(e,c);n.lineTo(e+s,c);n.stroke()};CanvasRenderContext.prototype.clear=function(){var t=this.ctx,e=this.dom;t.clearRect(0,0,e.width,e.height)};CanvasRenderContext.prototype.getImageData=function(){var t=this.ctx,e=this.dom;return t.getImageData(0,0,e.width,e.height)};CanvasRenderContext.prototype.getDataUrl=function(){return this.dom.toDataURL()};return CanvasRenderContext}();export{CanvasRenderContext};export var _errorCode;!function(t){t[t.Unknown=0]="Unknown";t[t.InvalidOptions=1]="InvalidOptions";t[t.InvalidBarcodeType=2]="InvalidBarcodeType";t[t.InvalidRenderType=3]="InvalidRenderType";t[t.MethodNotImplement=4]="MethodNotImplement";t[t.InvalidText=5]="InvalidText";t[t.InvalidCharacter=6]="InvalidCharacter";t[t.TextTooLong=7]="TextTooLong";t[t.GroupSizeOverflow=8]="GroupSizeOverflow"}(_errorCode||(_errorCode={}));var BaseException=function(t){__extends(BaseException,t);function BaseException(e){var o=t.call(this)||this;o.code=e||_errorCode.Unknown;return o}return BaseException}(Error);export{BaseException};export var ErrorCode=_errorCode;var InvalidOptionsException=function(t){__extends(InvalidOptionsException,t);function InvalidOptionsException(e,o){void 0===o&&(o="");var i=t.call(this,_errorCode.InvalidOptions)||this;i.name="InvalidOptionsException";i.message=JSON.stringify(e)+" is not valid options. "+o;i.descriptor={source:e,message:i.message};return i}return InvalidOptionsException}(BaseException);export{InvalidOptionsException};var InvalidBarcodeTypeException=function(t){__extends(InvalidBarcodeTypeException,t);function InvalidBarcodeTypeException(e){var o=t.call(this,_errorCode.InvalidBarcodeType)||this;o.name="InvalidBarcodeTypeException";o.message=e+" is not support!";o.descriptor={source:e,message:o.message};return o}return InvalidBarcodeTypeException}(BaseException);export{InvalidBarcodeTypeException};var InvalidRenderException=function(t){__extends(InvalidRenderException,t);function InvalidRenderException(e){var o=t.call(this,_errorCode.InvalidRenderType)||this;o.name="InvalidRenderException";o.message=e+" is not support!";o.descriptor={source:e,message:o.message};return o}return InvalidRenderException}(BaseException);export{InvalidRenderException};var MethodNotImplementException=function(t){__extends(MethodNotImplementException,t);function MethodNotImplementException(e,o){var i=t.call(this,_errorCode.MethodNotImplement)||this;i.name="MethodNotImplementException";i.message=e+" is not a method! "+o;i.descriptor={source:e,message:i.message};return i}return MethodNotImplementException}(BaseException);export{MethodNotImplementException};var InvalidTextException=function(t){__extends(InvalidTextException,t);function InvalidTextException(e,o){void 0===o&&(o="");var i=t.call(this,_errorCode.InvalidText)||this;i.name="InvalidTextException";i.message=e?e+" is invalid. "+o:"Text is required.";i.descriptor={source:e,message:i.message};return i}return InvalidTextException}(BaseException);export{InvalidTextException};var InvalidCharacterException=function(t){__extends(InvalidCharacterException,t);function InvalidCharacterException(e){var o=t.call(this,_errorCode.InvalidCharacter)||this;o.name="InvalidCharacterException";o.message=e+" is invalid.";o.descriptor={source:e,message:o.message};return o}return InvalidCharacterException}(BaseException);export{InvalidCharacterException};var TextTooLongException=function(t){__extends(TextTooLongException,t);function TextTooLongException(){var e=t.call(this,_errorCode.TextTooLong)||this;e.name="TextTooLongException";e.message="Text is too long to encode";e.descriptor={source:null,message:e.message};return e}return TextTooLongException}(BaseException);export{TextTooLongException};var GroupSizeOverflowException=function(t){__extends(GroupSizeOverflowException,t);function GroupSizeOverflowException(e){var o=t.call(this,_errorCode.GroupSizeOverflow)||this;o.name="GroupSizeOverflowException";o.message="Group size is "+e+". The max group size is 9.";o.descriptor={source:e,message:o.message};return o}return GroupSizeOverflowException}(BaseException);export{GroupSizeOverflowException};function createRenderDom(t,e){var o;"svg"===t?(o=document.createElementNS("http://www.w3.org/2000/svg","svg")).setAttribute("xmlns","http://www.w3.org/2000/svg"):o=document.createElement("canvas");o.setAttribute("width",e.width);o.setAttribute("height",e.height);return o}var BarcodeRender=function(){function BarcodeRender(t,e){this.container=t;e.toSymbol();this.barcode=e;this.style=e.style;var o=this.style.unitValue;this.size={width:e.size.width*o,height:e.size.height*o};var i=createRenderDom(this.style.renderType,this.size);switch(this.style.renderType){case"svg":this.context=new SVGRenderContext(i,this.style,o);break;case"canvas":this.context=new CanvasRenderContext(i,this.style,o);break;default:throw new InvalidRenderException(this.style.renderType)}t&&t.appendChild(i);this.renderDom=i}BarcodeRender.prototype.render=function(){var t=this.style,e=this.barcode.shapes,o=this.context;o.clear();o.setColor(t.color);o.setBackgroundColor(t.backgroundColor);e.forEach((function(t){"rect"===t.type&&o.drawRect(t);"text"===t.type&&o.drawText(t)}));return this};BarcodeRender.prototype.getImageData=function(){if(!this.context.getImageData)throw new MethodNotImplementException("getImageData","You are working with svg render.");return this.context.getImageData()};BarcodeRender.prototype.getDataUrl=function(){return this.context.getDataUrl()};BarcodeRender.prototype.destroy=function(){this.container&&this.container.removeChild(this.renderDom)};BarcodeRender.prototype.getSize=function(){return this.size};return BarcodeRender}();export{BarcodeRender};function isFunction(t){return"function"==typeof t}function isWindow(t){return!!t&&t===t.window}function isDefined(t){return void 0!==t}function isNaN(t){return isFunction(Number.isNaN)?Number.isNaN(t):t!=t}function isNumberLike(t){return!isNaN(+t)}function sliceString(t,e,o){void 0===t&&(t="");void 0===e&&(e=1);for(var i=0,r=t.length,n=0;i<r;){o(t.substring(i,i+e),n);i+=e;n++}}function sliceArray(t,e,o){void 0===t&&(t=[]);void 0===e&&(e=1);for(var i=0,r=t.length,n=0;i<r;){o(t.slice(i,i+e),n);i+=e;n++}}function str2Array(t){void 0===t&&(t="");return isFunction(Array.from)?Array.from(t):Array.prototype.slice.call(t)}function combineTruthy(t){void 0===t&&(t="");var e=str2Array(t),o=[];e.forEach((function(t){if("0"===t)o.push(0);else if(o[o.length-1]&&0!==o[o.length]){var e=o.pop();o.push(++e)}else o.push(1)}));return o}function convertRadix(t,e){void 0===e&&(e=2);return(t=+t).toString(e)}function isEven(t){return t%2==0}function isOdd(t){return t%2==1}function toNumber(t,e){void 0===t&&(t="");void 0===e&&(e=0);if("number"==typeof t)return t;var o=parseFloat(t);return isNaN(o)?e:o}function getUnit(t){void 0===t&&(t="");var e=/[a-zA-Z]+/.exec(t);return e?e[0]:"px"}function getMaxValue(t,e){void 0===e&&(e="length");var o=0;t.forEach((function(t){t[e]>o&&(o=t[e])}));return o}function assign(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];if(isFunction(Object.assign))return Object.assign.apply(Object,[t].concat(e));if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),r=0;r<e.length;r++){var n=e[r];if(null!=n)for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(i[a]=n[a])}return i}function deepMerge(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];if(null==t)throw new TypeError("Cannot convert undefined or null to object");e.forEach((function(e){if(e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(null!=e[o]&&"object"==typeof e[o]&&"object"==typeof t[o]?t[o]=deepMerge({},t[o]||{},e[o]):t[o]=e[o])}));return t}function deepMergeAll(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return deepMerge.apply(void 0,[{}].concat(t))}function strRepeat(t,e){if(isFunction(t.repeat))return t.repeat(e);var o=""+t;(e=+e)!=e&&(e=0);if(e<0)throw new RangeError("repeat count must be non-negative");if(e==1/0)throw new RangeError("repeat count must be less than infinity");e=Math.floor(e);if(0==o.length||0==e)return"";if(o.length*e>=1<<28)throw new RangeError("repeat count must not overflow maximum string size");for(var i="",r=0;r<e;r++)i+=o;return i}function isInteger(t){return isFunction(Number.isInteger)?Number.isInteger(t):"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}function fillArray(t,e){if(isFunction(t.fill))return t.fill(e);for(var o=0;o<t.length;o++)t[o]=e;return t}function strPadStart(t,e,o){if(isFunction(t.padStart))return t.padStart(e,o);e>>=0;o=String(void 0!==o?o:" ");if(t.length>e)return t;(e-=t.length)>o.length&&(o+=strRepeat(o,e/o.length));return o.slice(0,e)+String(t)}var plugins={};function registerPlugin(t,e){plugins[t]=e}function _defaultMeasureText(t,e){return 1.4*toNumber(e.fontSize,12)}function measureText(t,e){return isFunction(plugins.measureText)?plugins.measureText(t,e):_defaultMeasureText(t,e)}function _defaultConvertUnit(t){return toNumber(t,12)}function convertUnit(t){return isFunction(plugins.convertUnit)?isNumberLike(t)?toNumber(t,12):plugins.convertUnit(t):_defaultConvertUnit(t)}function fixSize2PixelDefault(t){return isNumberLike(t)?t+"px":t}function loop(t,e){var o,i;if(isFinite(e)){o=0;i=e}else{o=e.from;i=e.to+1}for(;o<i;o++)t(o)}function toZeroOnePattern(t,e){var o=e?isEven:isOdd;return t.reduce((function(t,e,i){o(i)?t+=strRepeat("1",e):t+=strRepeat("0",e);return t}),"")}function range(t,e){for(var o=[];t<e;){o.push(t);t++}o.push(e);return o}function makeEnums(t){Object.defineProperty(t,"has",{configurable:!1,enumerable:!1,writable:!1,value:function(t){return this.$br[t]}});var e=Object.keys(t).reduce((function(e,o){e[t[o]]=o;return e}),{});Object.defineProperty(t,"$br",{configurable:!1,enumerable:!1,writable:!1,value:e})}export var Utils={isFunction:isFunction,isWindow:isWindow,isDefined:isDefined,isNaN:isNaN,isNumberLike:isNumberLike,sliceString:sliceString,sliceArray:sliceArray,str2Array:str2Array,combineTruthy:combineTruthy,convertRadix:convertRadix,isEven:isEven,isOdd:isOdd,toNumber:toNumber,getUnit:getUnit,getMaxValue:getMaxValue,assign:assign,deepMerge:deepMerge,deepMergeAll:deepMergeAll,strRepeat:strRepeat,isInteger:isInteger,fillArray:fillArray,strPadStart:strPadStart,registerPlugin:registerPlugin,measureText:measureText,convertUnit:convertUnit,fixSize2PixelDefault:fixSize2PixelDefault,loop:loop,toZeroOnePattern:toZeroOnePattern,range:range,makeEnums:makeEnums};var Option=function(){function Option(t){void 0===t&&(t={});this.originConfig=t;this.type=t.type;this.penddingMerge=[]}Option.setCustomDefaultOptions=function(t){Option.CustomDefaultOptions=t};Option.prototype.spawn=function(t){return new Option(Utils.deepMergeAll(this.originConfig,t))};Option.prototype.merge=function(t){this.penddingMerge.unshift(t)};Option.prototype._getUnitValue=function(t){t=Utils.fixSize2PixelDefault(t);return Utils.convertUnit(t)};Option.prototype.getMergedOption=function(){return Utils.deepMergeAll.apply(Utils,[Option.DefaultOptions].concat(this.penddingMerge,[Option.CustomDefaultOptions,this.originConfig]))};Option.prototype.getConfig=function(t){var e=this.getMergedOption(),o=e.text,i=e.quietZone,r=e.height,n=e.labelPosition,a=e.desiredSize,s=e.showLabel,c=e.font,p=e.backgroundColor,u=e.color,h=e.renderType,l=e.unitSize,d={text:o,isLabelBottom:!1,hideExtraChecksum:e.hideExtraChecksum};if(!Utils.isDefined(o))throw new InvalidTextException;d.text+="";Utils.isDefined(n)&&(d.isLabelBottom="top"!==n);(c=Utils.deepMergeAll(c)).fontSize=Utils.fixSize2PixelDefault(c.fontSize);var f=Utils.measureText(o,c);d.showLabel=s;t=t||this._getUnitValue(l);var g=s?f/t:0;d.fontSizeInUnit=g;var y={};for(var v in i)if(i.hasOwnProperty(v)){var x=i[v];if(Utils.isNumberLike(x)){var m=+x;y[v]=m}else{var b=Utils.convertUnit(x);y[v]=b/t}}d.quietZone=y;if(a){d.containerWidth=Utils.convertUnit(Utils.fixSize2PixelDefault(a.width));d.containerHeight=Utils.convertUnit(Utils.fixSize2PixelDefault(a.height));d.desiredSize=a}if(Utils.isDefined(r))if(a){var _=s?d.containerHeight-f:d.containerHeight;d.height=_/t-y.top-y.bottom}else Utils.isNumberLike(r)?d.height=+r-g-y.top-y.bottom:d.height=Utils.convertUnit(r)/t-g-y.top-y.bottom;return{config:e,encodeConfig:d,style:Utils.deepMergeAll({backgroundColor:p,color:u,renderType:h,unitValue:t,fontSize:c.fontSize,fontHeight:f},c)}};Option.prototype.getOriginConfig=function(){return this.originConfig};Option.prototype.getType=function(){return this.type};Option.DefaultOptions={renderType:"canvas",unitSize:"1px",color:"rgb(0,0,0)",backgroundColor:"rgb(255,255,255)",font:{fontFamily:"sans-serif",fontStyle:"normal",fontWeight:"normal",textDecoration:"none",textAlign:"center",fontSize:"12px"},hideExtraChecksum:!1,quietZone:{top:0,right:0,bottom:0,left:0}};Option.CustomDefaultOptions={};return Option}();export{Option};function _getProtos(t){var e=[];if(t&&t instanceof Function){var o=t;e.push(o);for(;o;){var i=Object.getPrototypeOf(o);if(!i||i===Object||i===Function.prototype)break;o=i;e.push(o)}}return e}export function _getDefaultConfig(t,e){var o=[{type:e}];_getProtos(t).forEach((function(t){t.DefaultConfig&&o.unshift(t.DefaultConfig)}));return Utils.deepMergeAll.apply(Utils,[Option.DefaultOptions].concat(o,[Option.CustomDefaultOptions]))}var _EnumDictionary=function(){function _EnumDictionary(t,e){this._keys={};this._values={};for(var o in t)if("string"==typeof t[o]){var i=parseInt(o),r=e(t[i]);this._keys[i]=r;this._values[r]=i}}_EnumDictionary.prototype.getEnumByString=function(t){var e=this._values[t];if(void 0===e)throw"Unknown Barcode internal value '"+t+"'";return e};_EnumDictionary.prototype.getStringByEnum=function(t){return this._keys[t]};return _EnumDictionary}();export{_EnumDictionary};var Area=function(){function Area(t,e){void 0===t&&(t=0);void 0===e&&(e=0);this.x=0;this.y=0;this.style={padding:{top:0,right:0,bottom:0,left:0},border:{top:0,right:0,bottom:0,left:0},margin:{top:0,right:0,bottom:0,left:0}};this.width=t;this.height=e;this.children=[];this._updateBox()}Area.prototype.append=function(t){this.children.push(t)};Area.prototype._makeRect=function(t,e,o,i){return{x:t,y:e,height:i,width:o,type:"rect"}};Area.prototype.toShapes=function(){var t=this,e=t.x,o=t.y,i=t.width,r=t.height,n=t.style,a=n.border,s=n.margin,c=[],p=a.left+a.right+i,u=a.top+a.bottom+r,h=e+s.left,l=o+s.top;a.top&&c.push(this._makeRect(h,l,p,a.top));a.right&&c.push(this._makeRect(h+p-a.right,l,a.right,u));a.bottom&&c.push(this._makeRect(h,l+u-a.bottom,p,a.bottom));a.left&&c.push(this._makeRect(h,l,a.left,u));return c};Area.prototype.getSize=function(){var t=this.width,e=this.height,o=this.offsetBox;return{width:t+o.width,height:e+o.height}};Area.prototype.visiable=function(){return this.width>0&&this.height>0};Area.prototype.setX=function(t){this.x=t;this._updateBox()};Area.prototype.setY=function(t){this.y=t;this._updateBox()};Area.prototype.updateContentSize=function(t,e){this.width=t;this.height=e;this._updateBox()};Area.prototype._fixOpt=function(t,e){if(Utils.isNumberLike(t[e])){var o=t[e];t[e]={top:o,right:o,bottom:o,left:o}}};Area.prototype.setStyle=function(t){this._fixOpt(t,"padding");this._fixOpt(t,"border");this._fixOpt(t,"margin");this.style=Utils.deepMergeAll(this.style,t);this._updateBox()};Area.prototype._updateBox=function(){var t=this,e=t.x,o=t.y,i=t.width,r=t.height,n=t.style,a=n.padding,s=n.border,c=n.margin;this.offsetBox={x:e+a.left+s.left+c.left,y:o+a.top+s.top+c.top,width:c.left+s.left+s.right+c.right,height:c.top+s.top+s.bottom+c.bottom};var p=i-a.left-a.right,u=r-a.top-a.bottom;this.contentBox={width:p>=0?p:0,height:u>=0?u:0}};return Area}();export{Area};var HorizontalLayoutArea=function(t){__extends(HorizontalLayoutArea,t);function HorizontalLayoutArea(){return null!==t&&t.apply(this,arguments)||this}HorizontalLayoutArea.prototype.toShapes=function(){this._updateContentSize();var e=this.children,o=this.offsetBox,i=t.prototype.toShapes.call(this),r=o.y,n=0;e.forEach((function(t){var e=o.x+n;t.toShapes().forEach((function(t){t.x+=e;t.y+=r;i.push(t)}));var a=t.getSize();n+=a.width}));return i};HorizontalLayoutArea.prototype.getSize=function(){this._updateContentSize();return t.prototype.getSize.call(this)};HorizontalLayoutArea.prototype._updateContentSize=function(){var t=this.children,e=this.style.padding,o=t.reduce((function(t,e){var o=e.getSize();t.height=Math.max(o.height,t.height);t.width+=o.width;return t}),{width:0,height:0});this.updateContentSize(o.width+e.left+e.right,o.height+e.top+e.bottom)};return HorizontalLayoutArea}(Area);export{HorizontalLayoutArea};var VerticalLayoutArea=function(t){__extends(VerticalLayoutArea,t);function VerticalLayoutArea(){return null!==t&&t.apply(this,arguments)||this}VerticalLayoutArea.prototype.toShapes=function(){this._updateContentSize();var e=this.children,o=this.offsetBox,i=t.prototype.toShapes.call(this),r=o.x,n=0;e.forEach((function(t){var e=o.y+n;t.toShapes().forEach((function(t){t.x+=r;t.y+=e;i.push(t)}));var a=t.getSize();n+=a.height}));return i};VerticalLayoutArea.prototype.getSize=function(){this._updateContentSize();return t.prototype.getSize.call(this)};VerticalLayoutArea.prototype._updateContentSize=function(){var t=this.children,e=this.style.padding,o=t.reduce((function(t,e){var o=e.getSize();t.width=Math.max(o.width,t.width);t.height+=o.height;return t}),{width:0,height:0});this.updateContentSize(o.width+e.left+e.right,o.height+e.top+e.bottom)};return VerticalLayoutArea}(Area);export{VerticalLayoutArea};var MatrixSymbolArea=function(t){__extends(MatrixSymbolArea,t);function MatrixSymbolArea(e,o,i){var r=t.call(this,e,o)||this;r._xPosition=0;r._yPosition=0;r._lastMaxHeight=0;r._rowHeight=0;r._rowHeight=i;return r}MatrixSymbolArea.prototype.append=function(t,e){if(t&&e){this._autoWrap(t);var o=this.children,i={width:t,height:e,x:this._xPosition,y:this._yPosition};o.push(i);this._xPosition+=t;this._rowHeight||(this._lastMaxHeight=Math.max(this._lastMaxHeight,e))}};MatrixSymbolArea.prototype._autoWrap=function(t){if(this._checkNeedWrap(t)){this._yPosition+=this._rowHeight||this._lastMaxHeight;this._xPosition=0;this._lastMaxHeight=0}};MatrixSymbolArea.prototype._checkNeedWrap=function(t){var e=this._xPosition;return this.contentBox.width-e-t<0};MatrixSymbolArea.prototype.space=function(t){void 0===t&&(t=1);this._autoWrap(t);this._xPosition+=t};MatrixSymbolArea.prototype.toShapes=function(){if(!this.visiable())return[];var e=this.offsetBox,o=this.children,i=t.prototype.toShapes.call(this);o.forEach((function(t){t.x+=e.x;t.y+=e.y;t.type="rect";i.push(t)}));return i};return MatrixSymbolArea}(Area);export{MatrixSymbolArea};var SymbolArea=function(t){__extends(SymbolArea,t);function SymbolArea(e,o){var i=t.call(this,e,o)||this;i._lastIsBar=!1;i._cacheNumber=0;i._position=0;return i}SymbolArea.prototype.append=function(t,e,o){if(t){var i=this.children,r={width:t,x:this._position,barHeight:e,offsetY:o};i.push(r);this._position+=t}};SymbolArea.prototype.space=function(t){void 0===t&&(t=1);this._position+=t};SymbolArea.prototype._appendModule=function(t){var e="1"===t;if(e!==this._lastIsBar){this._flash();this._lastIsBar=e}this._cacheNumber++};SymbolArea.prototype._flash=function(){if(this._cacheNumber>0){this._lastIsBar?this.append(this._cacheNumber):this.space(this._cacheNumber);this._cacheNumber=0}};SymbolArea.prototype.fromPattern=function(t){var e=this;Utils.str2Array(t).forEach((function(t){return e._appendModule(t)}));this._flash()};SymbolArea.prototype.getContentBox=function(){return this.contentBox};SymbolArea.prototype.toShapes=function(){if(!this.visiable())return[];var e=this.offsetBox,o=this.children,i=this.contentBox.height,r=t.prototype.toShapes.call(this);o.forEach((function(t){r.push({type:"rect",x:t.x+e.x,y:e.y+(t.offsetY||0),width:t.width,height:t.barHeight||i})}));return r};return SymbolArea}(Area);export{SymbolArea};var LabelArea=function(t){__extends(LabelArea,t);function LabelArea(e,o,i){var r=t.call(this,e,o)||this;r._textAlign=i;return r}LabelArea.prototype.toShapes=function(){if(!this.visiable())return[];var e=this.offsetBox,o=this.children,i=this._textAlign,r=this.contentBox.width,n=t.prototype.toShapes.call(this);o.forEach((function(t){var o=e.x;switch(i){case"center":o+=r/2;break;case"right":o+=r}n.push({x:o+(t.x||0),y:e.y+(t.y||0),textAlign:i,maxWidth:r,type:"text",text:t.text})}));return n};return LabelArea}(Area);export{LabelArea};var MatrixBuilder=function(){function MatrixBuilder(t,e){this.data=[];this.data=[];this.row=t;this.col=e}MatrixBuilder.prototype.add=function(t,e,o){(this.data[t]||Utils.fillArray(new Array(this.col),null))[e]=o;this.data[t]=[]};MatrixBuilder.prototype.toMatrix=function(){var t=this,e=[];Utils.loop((function(o){e.push(t.data[o]||Utils.fillArray(new Array(t.col),null))}),this.row);return e};return MatrixBuilder}();export{MatrixBuilder};var BitBuffer=function(){function BitBuffer(t){void 0===t&&(t=[]);this.buffer=t;this.length=8*t.length;this.index=0}BitBuffer.prototype.putBit=function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0);t&&(this.buffer[e]|=128>>>this.length%8);this.length+=1};BitBuffer.prototype.putBitAt=function(t,e){for(var o=this.length,i=new BitBuffer,r=0;r<o;r++)r===e?i.putBit(t):i.putBit(this.getAt(r));this.buffer=i.buffer;this.length=i.length};BitBuffer.prototype.put=function(t,e){for(var o=0;o<e;o+=1)this.putBit(1==(t>>>e-o-1&1))};BitBuffer.prototype.putBits=function(t){this.put(parseInt(t,2),t.length)};BitBuffer.prototype.getAt=function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)};BitBuffer.prototype.getBuffer=function(){return this.buffer};BitBuffer.prototype.getGroupedBits=function(t){for(var e=0,o=[];e<this.length;){for(var i="",r=e,n=e+t;r<n;r++)i+=this.getAt(r)?1:0;e=n;o.push(parseInt(i,2))}return o};BitBuffer.prototype.next=function(){this.index++;return this.getAt(this.index-1)};return BitBuffer}();export{BitBuffer};var BarcodeEncoder=function(){function BarcodeEncoder(t){this._option=t;this.shapes=[];this.size={width:0,height:0};this.applyDesiredSize()}BarcodeEncoder.prototype.validate=function(){};BarcodeEncoder.prototype.applyDesiredSize=function(t){var e=this._option.getConfig(t),o=e.config,i=e.encodeConfig,r=e.style;this.config=o;this.encodeConfig=i;this.style=r;this.useDesiredSize=!!i.desiredSize};BarcodeEncoder.prototype.afterApplyDesiredSize=function(){};BarcodeEncoder.prototype.toSymbol=function(){this.validate();var t=this.calculateData();if(this.useDesiredSize){this.convertToShape(t,!0);this.adjustDesiredSize();this.afterApplyDesiredSize()}this.convertToShape(t)};return BarcodeEncoder}();export{BarcodeEncoder};var TwoDimensionalBarcode=function(t){__extends(TwoDimensionalBarcode,t);function TwoDimensionalBarcode(){return null!==t&&t.apply(this,arguments)||this}TwoDimensionalBarcode.prototype.adjustDesiredSize=function(){var t=this.size,e=t.width,o=t.height,i=this.encodeConfig,r=i.desiredSize,n=i.containerWidth,a=i.containerHeight,s=Math.min(n/e,a/o);r.forceRounding&&(s=(s=~~s)<1?1:s);this.applyDesiredSize(s)};TwoDimensionalBarcode.prototype.convertToShape=function(t,e){var o=this.encodeConfig.quietZone,i=t[0].length+o.right+o.left,r=t.length+o.top+o.bottom,n=new VerticalLayoutArea,a=new MatrixSymbolArea(i,r,1);a.setStyle({padding:{top:o.top,right:o.right,bottom:o.bottom,left:o.left}});n.append(a);if(!e){t.forEach((function(t){t.forEach((function(t){t?a.append(1,1):a.space()}))}));this.shapes=n.toShapes()}this.size=n.getSize()};return TwoDimensionalBarcode}(BarcodeEncoder);export{TwoDimensionalBarcode};var OneDimensionalBarcode=function(t){__extends(OneDimensionalBarcode,t);function OneDimensionalBarcode(e){var o=this;e.merge(OneDimensionalBarcode.DefaultConfig);(o=t.call(this,e)||this).label="";return o}OneDimensionalBarcode.prototype.adjustDesiredSize=function(){var t=this.size.width,e=this.encodeConfig,o=e.desiredSize,i=e.containerWidth/t;o.forceRounding&&(i=(i=~~i)<1?1:i);this.applyDesiredSize(i)};OneDimensionalBarcode.prototype.convertToShape=function(t,e){var o=this.label,i=this.encodeConfig,r=i.quietZone,n=i.isLabelBottom,a=i.height,s=i.showLabel,c=i.fontSizeInUnit,p=this.style.textAlign,u=0;o&&s&&(u=c);var h=t.length+r.right+r.left,l=a+r.top+r.bottom,d=new VerticalLayoutArea,f=new SymbolArea(h,l);f.setStyle({padding:{top:r.top,right:r.right,bottom:r.bottom,left:r.left}});var g=f.getSize(),y=new LabelArea(g.width,u,p);if(n){d.append(f);d.append(y)}else{d.append(y);d.append(f)}if(!e){f.fromPattern(t);y.append({text:o});this.shapes=d.toShapes()}this.size=d.getSize()};OneDimensionalBarcode.DefaultConfig={height:60,showLabel:!0,labelPosition:"bottom"};return OneDimensionalBarcode}(BarcodeEncoder);export{OneDimensionalBarcode};var FNC1="Ï",FNC2="Ê",FNC3="É",DataMatrixFNC1=" ",DataMatrixMacro05=" ",DataMatrixMacro06=" ";export var Constants={FNC1:FNC1,FNC2:FNC2,FNC3:FNC3,DataMatrixFNC1:DataMatrixFNC1,DataMatrixMacro05:DataMatrixMacro05,DataMatrixMacro06:DataMatrixMacro06};export var encoders={};var Barcode=function(){function Barcode(){for(var t,e,o,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];if(i.length>=3)t=i[0],e=i[1],o=i[2];else if(2===i.length)Utils.isFunction(i[1])?(e=i[0],o=i[1]):(t=i[0],e=i[1]);else{if(1!==i.length)throw new MethodNotImplementException("constructor","The arguments is invalid.");e=i[0]}this.dom="string"==typeof t?document.querySelector(t):t;this.callback=o&&o.bind(this);this.setOption(e)}Barcode.getImageData=function(t){void 0===t&&(t={});return new Barcode(t).getImageData()};Barcode.getDataUrl=function(t){void 0===t&&(t={});return new Barcode(t).getDataUrl()};Barcode.setDefaultOptions=function(t){void 0===t&&(t={});Option.setCustomDefaultOptions(t)};Barcode.registerEncoder=function(t,e){encoders[t]=e;Barcode.supportType.push(t)};Barcode.registerPlugin=function(t,e){Utils.registerPlugin(t,e)};Barcode.prototype.mergeOption=function(t){var e=this.option.spawn(t);this.update(e);return this};Barcode.prototype.setOption=function(t){this.update(new Option(t));return this};Barcode.prototype.getOption=function(){return this.option.getMergedOption()};Barcode.prototype.update=function(t){var e=t.getType(),o=encoders[e];if(!o)throw new InvalidBarcodeTypeException(e);var i=new o(t);this.destroy();var r=new BarcodeRender(this.dom,i);r.render();this.render=r;this.option=t;Utils.isFunction(this.callback)&&this.callback()};Barcode.prototype.refresh=function(){this.render.render();Utils.isFunction(this.callback)&&this.callback()};Barcode.prototype.getImageData=function(){return this.render.getImageData()};Barcode.prototype.getDataUrl=function(){return this.render.getDataUrl()};Barcode.prototype.getSize=function(){return this.render.getSize()};Barcode.prototype.destroy=function(){if(this.render){this.render.destroy();this.render=null}};Barcode.supportType=[];Barcode.constants=Constants;Barcode.ErrorCode=ErrorCode;return Barcode}();export{Barcode};Barcode.registerPlugin("measureText",(function(t,e){var o=document.createElement("span");o.style.visibility="hidden";o.style.position="absolute";o.style.lineHeight="normal";o.textContent=t;Object.keys(e).forEach((function(t){o.style[t]=e[t]}));document.body.appendChild(o);var i=o.getBoundingClientRect();document.body.removeChild(o);return i.height}));Barcode.registerPlugin("convertUnit",(function(t){var e=document.createElement("div");e.style.visibility="hidden";e.style.position="fixed";e.style.padding="0";e.style.border="0";e.style.width=t;document.body.appendChild(e);var o=e.getBoundingClientRect();document.body.removeChild(e);return o.width}));export var RenderType;!function(t){t[t.Canvas=0]="Canvas";t[t.Svg=1]="Svg"}(RenderType||(RenderType={}));export var LabelPosition;!function(t){t[t.Top=0]="Top";t[t.Bottom=1]="Bottom"}(LabelPosition||(LabelPosition={}));export var NarrowToWideRatio;!function(t){t[t.OneToTwo=0]="OneToTwo";t[t.OneToThree=1]="OneToThree"}(NarrowToWideRatio||(NarrowToWideRatio={}));var _RenderTypeConvertor=function(){function _RenderTypeConvertor(){}_RenderTypeConvertor.stringToEnum=function(t){switch(t){case"canvas":return RenderType.Canvas;case"svg":return RenderType.Svg}throw"Unknown Barcode internal renderType '"+t+"'"};_RenderTypeConvertor.enumToString=function(t){return RenderType[asEnum(t,RenderType)].toLowerCase()};return _RenderTypeConvertor}();export{_RenderTypeConvertor};var _LabelPositionConvertor=function(){function _LabelPositionConvertor(){}_LabelPositionConvertor.stringToEnum=function(t){switch(t){case"top":return LabelPosition.Top;case"bottom":return LabelPosition.Bottom}throw"Unknown Barcode internal labelPosition '"+t+"'"};_LabelPositionConvertor.enumToString=function(t){return LabelPosition[asEnum(t,LabelPosition)].toLowerCase()};return _LabelPositionConvertor}();export{_LabelPositionConvertor};var _NarrowWideRatioConvertor=function(){function _NarrowWideRatioConvertor(){}_NarrowWideRatioConvertor.stringToEnum=function(t){switch(t.toString()){case"2":return NarrowToWideRatio.OneToTwo;case"3":return NarrowToWideRatio.OneToThree}throw"Unknown nwRatio internal value '"+t+"'"};_NarrowWideRatioConvertor.enumToString=function(t){var e;switch(asEnum(t,NarrowToWideRatio)){case NarrowToWideRatio.OneToTwo:e="2";break;case NarrowToWideRatio.OneToThree:e="3"}return e};return _NarrowWideRatioConvertor}();export{_NarrowWideRatioConvertor};var BarcodeBase=function(t){__extends(BarcodeBase,t);function BarcodeBase(e,o){var i=t.call(this,e,null,!0)||this;i._state={};i._isUpd=0;i._isValid=!0;i._aw=!1;i._wZoom=1;i.isValidChanged=new Event;var r=i.getTemplate();i.applyTemplate("wj-barcode wj-control",r,{});isIE()||(i.hostElement.style.lineHeight="0px");i._state=i._getDefaults();i._isUpd++;i.initialize(o);i._updateSize();i._isUpd--;i._mergeOptions({});i.invalidate();return i}BarcodeBase.prototype.initialize=function(e){this._isUpd++;try{t.prototype.initialize.call(this,e)}finally{this._isUpd--}!this._isUpd&&e&&Object.keys(e).length&&this._mergeOptions({})};BarcodeBase._getClassDefaults=function(){var t=this.type;return _getDefaultConfig(encoders[t],t)};BarcodeBase.prototype._getDefaults=function(){var t=this.constructor;t._defaults||(t._defaults=t._getClassDefaults());return Utils.deepMergeAll(t._defaults)};Object.defineProperty(BarcodeBase.prototype,"value",{get:function(){return this._getProp("text")},set:function(t){this._setProp("text",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"quietZone",{get:function(){return this._getProp("quietZone")},set:function(t){this._setProp("quietZone",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"renderType",{get:function(){return _RenderTypeConvertor.stringToEnum(this._getProp("renderType"))},set:function(t){this._setProp("renderType",_RenderTypeConvertor.enumToString(t))},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"color",{get:function(){return this._getProp("color")},set:function(t){this._setProp("color",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"backgroundColor",{get:function(){return this._getProp("backgroundColor")},set:function(t){this._setProp("backgroundColor",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"hideExtraChecksum",{get:function(){return this._getProp("hideExtraChecksum")},set:function(t){this._setProp("hideExtraChecksum",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"font",{get:function(){return this._getProp("font")},set:function(t){this._setProp("font",t)},enumerable:!0,configurable:!0});Object.defineProperty(BarcodeBase.prototype,"isValid",{get:function(){return this._isValid},enumerable:!0,configurable:!0});BarcodeBase.prototype.onIsValidChanged=function(t){this.isValidChanged.raise(this,t)};BarcodeBase.prototype.refresh=function(e){void 0===e&&(e=!0);t.prototype.refresh.call(this,e);e?this._updateSize():this._bc.refresh()};BarcodeBase.prototype.getImageData=function(){return this._bc.getImageData()};BarcodeBase.prototype.getDataUrl=function(){return this._bc.getDataUrl()};BarcodeBase.prototype.getSize=function(){var t=new Size,e=this._bc.getSize();if(e){t.width=e.width;t.height=e.height}return t};BarcodeBase.prototype._mergeOptions=function(t){var e,o=this._bc,i=_copyObj(this._state,t);if(!this._isUpd){var r=i.text;if(null==r||""===r){if(o){o.destroy();this._bc=o=null}}else try{o?o.setOption(i):this._bc=o=new Barcode(this.hostElement,i)}catch(t){e=t}}var n=!0;if(e){if(o){o.destroy();this._bc=o=null}if(e.code!==_errorCode.InvalidText)throw e;n=!1}this._state=i;this._setValid(n)};BarcodeBase.prototype._setValid=function(t){if(this._isValid!==t){this._isValid=t;toggleClass(this.hostElement,"wj-state-invalid",!t);this.onIsValidChanged()}};BarcodeBase.prototype._setProp=function(t,e){var o;this._mergeOptions(((o={})[t]=e,o))};BarcodeBase.prototype._getProp=function(t){var e=this._bc;return this._state[t]||e&&e.getOption()[t]};BarcodeBase.prototype._updateSize=function(){if(this.hostElement){var t=BarcodeBase._getContentSize(this.hostElement),e=this._prevSz,o=null,i=null,r=1,n=!0;if(this._getAw()){r=this._getWzoom();n=(i=t.height/r)===this._prevH;this._prevH=i;e=this._prevSz=null}else if(!e||!t.equals(e)){o={width:t.width+"px",height:t.height+"px",forceRounding:!1};n=!1;this._prevSz=t;this._prevH=null}n||this._mergeOptions({desiredSize:o,height:i,unitSize:r})}};BarcodeBase._getContentSize=function(t){var e=getComputedStyle(t);return new Size(t.offsetWidth-parseFloat(e.paddingLeft)-parseFloat(e.paddingRight)-parseFloat(e.borderLeftWidth)-parseFloat(e.borderRightWidth),t.offsetHeight-parseFloat(e.paddingTop)-parseFloat(e.paddingBottom)-parseFloat(e.borderTopWidth)-parseFloat(e.borderBottomWidth))};BarcodeBase.prototype._getAw=function(){return this._aw};BarcodeBase.prototype._setAw=function(t){if(this._aw!==t){this._aw=t;this._updateSize()}};BarcodeBase.prototype._getWzoom=function(){return this._wZoom};BarcodeBase.prototype._setWzoom=function(t){asNumber(t);assert(t>=1,"autoWidthZoom value should be equal or greater than 1");if(this._wZoom!==t){this._wZoom=t;this._getAw()&&this._updateSize()}};BarcodeBase.controlTemplate="";return BarcodeBase}(Control);export{BarcodeBase};var _copyObj="function"==typeof Object.assign?Object.assign:function(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];for(var i=0,r=e;i<r.length;i++){var n=r[i];if(null!=n)for(var a in n)t[a]=n[a]}return t};_registerModule("wijmo.barcode",selfModule);