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

import{Color,isString,Size,Point,_registerModule}from"wijmo/wijmo";import{_SvgRenderEngine,_Spline,FlexChartBase}from"wijmo/wijmo.chart";import*as selfModule from"wijmo/wijmo.chart.render";export class _CanvasRenderEngine{constructor(t,e=!1){this._strokeWidth=1;this._fontSize=null;this._fontFamily=null;this._cssPriority=!0;this._readOnly=!1;this._applyCanvasClip=function(t,e){var i=this._canvasRect[e];if(i){t.beginPath();t.rect(i.left,i.top,i.width,i.height);t.clip();t.closePath()}};this._applyCanvasStyles=function(t,e,i,s,n){var l,a,r,o=this._canvas.getContext("2d"),h=this.stroke,g=this.fill,p=this.strokeWidth;e&&void 0!==e.stroke&&(h=e.stroke);e&&void 0!==e.fill&&(g=this._getOpacityColor(e.fill,e["fill-opacity"]));if(t){a=window.getComputedStyle(t);r=t.getBBox()}if(n){if(a){o.fillStyle=a.fill;l=a.fontStyle+" "+a.fontWeight+" "+a.fontSize+" "+a.fontFamily;o.font=l}else if(this.fontSize){o.fillStyle=this.textFill;o.font=this.fontSize+" "+(this.fontFamily||"sans-serif")}else if(this._canvasDefaultFont){o.fillStyle=this._canvasDefaultFont.textFill;l=this._canvasDefaultFont.fontSize+" "+this._canvasDefaultFont.fontFamily;o.font=l;if(o.font.replace(/\"/g,"'")!==l.replace(/\"/g,"'")){l=this._canvasDefaultFont.fontSize+" "+(o.font.split(" ")[1]||"sans-serif");o.font=l}}}else{if(a){h=a.stroke&&"none"!==a.stroke?a.stroke:h;g=a.fill&&"none"!==a.fill?this._getOpacityColor(a.fill,a["fill-opacity"]):g;p=a.strokeWidth?a.strokeWidth:p}if("none"!==h&&null!=h){this._applyColor("strokeStyle",h,r);o.lineWidth=+p.replace(/px/g,"");o.stroke()}if(s&&null!=g&&"transparent"!==g&&"none"!==g){this._applyColor("fillStyle",g,r);o.fill()}}};this._element=t;this._canvas=document.createElement("canvas");this._svgEngine=new _SvgRenderEngine(t);this._element.appendChild(this._canvas);this._applyCSSStyles=e}beginRender(){var t,e=this._svgEngine.element,i=this._element;if(this._applyCSSStyles){this._svgEngine.beginRender();i=e}this._element.appendChild(e);this._canvasRect={};t=window.getComputedStyle(i);this._canvasDefaultFont={fontSize:t.fontSize,fontFamily:t.fontFamily,textFill:t.color}}endRender(){this._applyCSSStyles&&this._svgEngine.endRender();this._svgEngine.element.parentNode.removeChild(this._svgEngine.element)}setViewportSize(t,e){var i=this._canvas;i.getContext("2d"),this.fill;this._applyCSSStyles&&this._svgEngine.setViewportSize(t,e);i.width=t;i.height=e}get element(){return this._canvas}get fill(){return this._fill}set fill(t){this._svgEngine.fill=t;this._fill=t}get fontSize(){return this._fontSize}set fontSize(t){this._svgEngine.fontSize=t;var e=null==t||isNaN(t)?t:t+"px";this._fontSize=e}get fontFamily(){return this._fontFamily}set fontFamily(t){this._svgEngine.fontFamily=t;this._fontFamily=t}get stroke(){return this._stroke}set stroke(t){this._svgEngine.stroke=t;this._stroke=t}get strokeWidth(){return this._strokeWidth}set strokeWidth(t){this._svgEngine.strokeWidth=t;this._strokeWidth=t}get textFill(){return this._textFill}set textFill(t){this._svgEngine.textFill=t;this._textFill=t}get cssPriority(){return this._cssPriority}set cssPriority(t){this._svgEngine.cssPriority=t;this._cssPriority=t}get readOnly(){return this._readOnly}set readOnly(t){this._readOnly=t}addClipRect(t,e){if(t&&e){this._applyCSSStyles&&this._svgEngine.addClipRect(t,e);this._canvasRect[e]=t.clone()}}drawEllipse(t,e,i,s,n,l){if(!this.readOnly){var a,r=this._canvas.getContext("2d");this._applyCSSStyles&&(a=this._svgEngine.drawEllipse(t,e,i,s,n,l));r.save();r.beginPath();if(r.ellipse)r.ellipse(t,e,i,s,0,0,2*Math.PI);else{r.translate(t,e);r.scale(1,s/i);r.translate(-t,-e);r.arc(t,e,i,0,2*Math.PI);r.scale(1,1)}this._applyCanvasStyles(a,l,n,!0);r.restore();return a}}drawRect(t,e,i,s,n,l,a){if(!this.readOnly){var r,o=this._canvas.getContext("2d");this._applyCSSStyles&&(r=this._svgEngine.drawRect(t,e,i,s,n,l,a));o.save();this._applyCanvasClip(o,a);o.beginPath();o.rect(t,e,i,s);this._applyCanvasStyles(r,l,n,!0);o.restore();return r}}drawLine(t,e,i,s,n,l){if(!this.readOnly){var a,r=this._canvas.getContext("2d");this._applyCSSStyles&&(a=this._svgEngine.drawLine(t,e,i,s,n,l));r.save();r.beginPath();r.moveTo(t,e);r.lineTo(i,s);this._applyCanvasStyles(a,l,n);r.restore();return a}}drawLines(t,e,i,s,n,l){if(t&&e&&0!==t.length&&0!==e.length&&!this.readOnly){var a,r,o=this._canvas.getContext("2d"),h=l||Math.min(t.length,e.length);this._applyCSSStyles&&(a=this._svgEngine.drawLines([0,1],[1,0],i,s,n));o.save();this._applyCanvasClip(o,n);o.beginPath();o.moveTo(t[0],e[0]);for(r=1;r<h;r++)o.lineTo(t[r],e[r]);this._applyCanvasStyles(a,s,i);o.restore();return a}}drawSplines(t,e,i,s,n,l){if(t&&e&&0!==t.length&&0!==e.length&&!this.readOnly){var a,r,o=this._canvas.getContext("2d"),h=new _Spline(t,e,l).calculate(),g=h.xs,p=h.ys,y=Math.min(g.length,p.length);this._applyCSSStyles&&(a=this._svgEngine.drawSplines([0,1],[1,0],i,s,n));o.save();this._applyCanvasClip(o,n);o.beginPath();o.moveTo(g[0],p[0]);for(r=1;r<y;r++)o.lineTo(g[r],p[r]);this._applyCanvasStyles(a,s,i);o.restore();return a}}drawPolygon(t,e,i,s,n){if(t&&e&&0!==t.length&&0!==e.length&&!this.readOnly){var l,a,r=this._canvas.getContext("2d"),o=Math.min(t.length,e.length);this._applyCSSStyles&&(l=this._svgEngine.drawPolygon(t,e,i,s,n));r.save();this._applyCanvasClip(r,n);r.beginPath();r.moveTo(t[0],e[0]);for(a=1;a<o;a++)r.lineTo(t[a],e[a]);r.closePath();this._applyCanvasStyles(l,s,i,!0);r.restore();return l}}drawPieSegment(t,e,i,s,n,l,a,r){if(!this.readOnly){var o,h=this._canvas.getContext("2d"),g=s,p=s+n;this._applyCSSStyles&&(o=this._svgEngine.drawPieSegment(t,e,i,s,n,l,a,r));h.save();this._applyCanvasClip(h,r);h.beginPath();h.moveTo(t,e);h.arc(t,e,i,g,p,!1);h.lineTo(t,e);this._applyCanvasStyles(o,a,l,!0);h.restore();return o}}drawDonutSegment(t,e,i,s,n,l,a,r,o){if(!this.readOnly){var h,g,p,y=this._canvas.getContext("2d"),f=n,_=n+l;this._applyCSSStyles&&(h=this._svgEngine.drawDonutSegment(t,e,i,s,n,l,a,r,o));(g=new Point(t,e)).x+=s*Math.cos(f);g.y+=s*Math.sin(f);(p=new Point(t,e)).x+=s*Math.cos(_);p.y+=s*Math.sin(_);y.save();this._applyCanvasClip(y,o);y.beginPath();y.moveTo(g.x,g.y);y.arc(t,e,i,f,_,!1);y.lineTo(p.x,p.y);y.arc(t,e,s,_,f,!0);this._applyCanvasStyles(h,r,a,!0);y.restore();return h}}drawString(t,e,i,s){if(!this.readOnly){var n,l=this._canvas.getContext("2d");this._applyCSSStyles&&(n=this._svgEngine.drawString(t,e,i,s));l.save();l.textBaseline="bottom";this._applyCanvasStyles(n,s,i,!0,!0);l.fillText(t,e.x,e.y);l.restore();return n}}drawStringRotated(t,e,i,s,n,l){if(!this.readOnly){var a,r=this._canvas.getContext("2d");r.measureText(t);this._applyCSSStyles&&(a=this._svgEngine.drawStringRotated(t,e,i,s,n,l));r.save();r.textBaseline="bottom";r.translate(i.x,i.y);r.rotate(Math.PI/180*s);r.translate(-i.x,-i.y);this._applyCanvasStyles(a,l,n,!0,!0);r.fillText(t,e.x,e.y);r.restore();return a}}measureString(t,e,i,s){var n,l=l=this._canvas.getContext("2d");if(this._applyCSSStyles)return this._svgEngine.measureString(t,e,i,s);this._applyCanvasStyles(null,null,e,!0,!0);n=l.measureText(t).width;return new Size(n,1.5*parseInt(l.font))}startGroup(t,e,i=!1){var s,n=this._canvas.getContext("2d");this._applyCSSStyles&&(s=this._svgEngine.startGroup(t,e,i));n.save();this._applyCanvasClip(n,e);return s}endGroup(){this._applyCSSStyles&&this._svgEngine.endGroup();this._canvas.getContext("2d").restore()}drawImage(t,e,i,s,n){if(!this.readOnly){var l,a=this._canvas.getContext("2d"),r=new Image;this._applyCSSStyles&&(l=this._svgEngine.drawImage(t,e,i,s,n));r.onload=function(){a.drawImage(r,e,i,s,n)};r.src=t;return l}}_getOpacityColor(t,e){var i=new Color(t);if(t.indexOf("url")>-1)return this.fill;if(t.indexOf("-")>-1){this.fill=t;return t}null!=e&&1===i.a&&(i.a=isNaN(e)?1:Number(e));return i.toString()}_applyColor(t,e,i){let s=_GradientColorUtil.tryParse(e),n=this._canvas.getContext("2d");if(null!=s)if(isString(s)||null==i)n[t]=s;else{let e;if(null!=s.x1)e=s.relative?n.createLinearGradient(i.x+s.x1*i.width,i.y+s.y1*i.height,i.x+s.x2*i.width,i.y+s.y2*i.height):n.createLinearGradient(s.x1,s.y1,s.x2,s.y2);else if(null!=s.r)if(s.relative){let t=i.x+s.cx*i.width,l=i.y+s.cy*i.height,a=s.r*i.width,r=s.r*i.height/a,o=i.x+(null==s.fx?s.cx:s.fx)*i.width,h=i.y+(null==s.fy?s.cy:s.fy)*i.height,g=(null==s.fr?0:s.fr)*i.width,p=(null==s.fr?0:s.fr)*i.height,y=Math.min(g,p);e=n.createRadialGradient(o,h/r,y,t,l/r,a);n.setTransform(1,0,0,r,0,0)}else e=n.createRadialGradient(null==s.fx?s.cx:s.fx,null==s.fy?s.cy:s.fy,s.fr||0,s.cx,s.cy,s.r);s.colors&&s.colors.length>0&&null!=e&&s.colors.forEach(t=>{let i=new Color("#000000");null!=t.color&&(i=t.color);null!=t.opacity&&(i.a=t.opacity);e.addColorStop(t.offset,i.toString())});n[t]=e}}}class _GradientColorUtil{static tryParse(t){if(_GradientColorUtil.parsedColor[t])return _GradientColorUtil.parsedColor[t];if(null==t||-1===t.indexOf("-"))return t;var e,i=t.replace(/\s+/g,"").split(/\-/g),s=i[0][0],n=!1,l=i[0].match(/\(\S+\)/)[0].replace(/[\(\\)]/g,"").split(/\,/g);if("l"===s||"L"===s){e={x1:"0",y1:"0",x2:"0",y2:"0",colors:[]};"l"===s&&(n=!0);["x1","y1","x2","y2"].forEach((t,i)=>{null!=l[i]&&(e[t]=+l[i])})}else if("r"===s||"R"===s){e={cx:"0",cy:"0",r:"0",colors:[]};"r"===s&&(n=!0);["cx","cy","r","fx","fy","fr"].forEach((t,i)=>{null!=l[i]&&""!==l[i]&&(e[t]=+l[i])})}e.relative=n;_GradientColorUtil.parsedColor[t]=e;var a=i.length-1;i.forEach((t,i)=>{t.indexOf(")")>-1&&(t=t.match(/\)\S+/)[0].replace(")",""));var s=t.split(":"),n={color:new Color("#000000")};null!=s[0]&&(n.color=Color.fromString(s[0]));null!=s[1]?n.offset=+s[1]:n.offset=i/a;null!=s[2]&&(n.opacity=+s[2]);e.colors.push(n)});return e}}_GradientColorUtil.parsedColor={};if(FlexChartBase&&FlexChartBase.prototype&&FlexChartBase.prototype._exportToImage){var _exportFn=FlexChartBase.prototype._exportToImage;FlexChartBase.prototype._exportToImage=function(t,e){if("svg"===t){_exportFn.call(this,t,e);return}let i=this._bgColor(this.hostElement);this._isTransparent(i)&&(i="#ffffff");var s,n,l=new _CanvasRenderEngine(this.hostElement,!0);this._render(l,!1,i);s=(n=l.element).toDataURL("image/"+t);n.parentNode.removeChild(n);e.call(null,s);n=null;l=null}}_registerModule("wijmo.chart.render",selfModule);