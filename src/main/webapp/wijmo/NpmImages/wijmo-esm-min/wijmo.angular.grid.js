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

var __extends=this&&this.__extends||function(){var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var l in t)t.hasOwnProperty(l)&&(e[l]=t[l])})(e,t)};return function(e,t){extendStatics(e,t);function __(){this.constructor=e}e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}}();import{WjDirective,WjLink,MetaFactory,_registerNgModule,softRefGrid,softRefGridDetail,softRefInput}from"wijmo/wijmo.angular.base";import{Control,closest,CollectionViewGroup,isNullOrWhiteSpace,contains,getActiveElement,isArray,isString,hasClass,setCss,asNumber,isIE}from"wijmo/wijmo";import*as mNg from"angular";import*as wjcGrid from"wijmo/wijmo.grid";var wjNg=mNg,wijmoGridName="wj.grid";export var ngModuleName=wijmoGridName;var wijmoGrid=_registerNgModule(wijmoGridName);if(softRefGrid()&&softRefGrid().FlexGrid){wijmoGrid.directive("wjFlexGrid",["$compile","$interpolate",function(e,t){return new WjFlexGrid(e,t)}]);wijmoGrid.directive("wjFlexGridColumn",["$compile",function(e){return new WjFlexGridColumn(e)}]);wijmoGrid.directive("wjFlexGridCellTemplate",[function(){return new WjFlexGridCellTemplate}])}var WjFlexGrid=function(e){__extends(WjFlexGrid,e);function WjFlexGrid(t,l){var i=e.call(this)||this;i._$compile=t;i._$interpolate=l;i.transclude=!0;i.template="<div ng-transclude />";return i}Object.defineProperty(WjFlexGrid.prototype,"_controlConstructor",{get:function(){return wjcGrid.FlexGrid},enumerable:!0,configurable:!0});WjFlexGrid.prototype._createLink=function(){return new WjFlexGridLink};WjFlexGrid.prototype._initProps=function(){var e=MetaFactory.findProp("childItemsPath",this._props);e.scopeBindingMode="@";e.customHandler=function(e,t,l,i,r){if(l&&(l=l.trim())&&"["===l[0]){var o=e.$parent.$eval(l);t.childItemsPath=o;return!0}return!1}};return WjFlexGrid}(WjDirective);export{WjFlexGrid};var WjFlexGridLink=function(e){__extends(WjFlexGridLink,e);function WjFlexGridLink(){return null!==e&&e.apply(this,arguments)||this}WjFlexGridLink.prototype._initControl=function(){var t=e.prototype._initControl.call(this);new DirectiveCellFactory(t,this);return t};return WjFlexGridLink}(WjLink),gridModule=wjcGrid&&wjcGrid.CellFactory;if(!gridModule){window.wijmo.grid={};window.wijmo.grid.CellFactory=function(){}}var DirectiveCellFactory=function(e){__extends(DirectiveCellFactory,e);function DirectiveCellFactory(t,l){var i=e.call(this)||this;i._lastApplyTimeStamp=0;i._noApplyLag=!1;i._startingEditing=!1;i._cellStampCounter=0;i._composing=!1;i._grid=t;i._gridLink=l;i._rowHeightUpdates=new _RowHeightUpdateQueue(i);if(!DirectiveCellFactory._templateTypes){DirectiveCellFactory._templateTypes=[];for(var r in CellTemplateType)isNaN(r)&&DirectiveCellFactory._templateTypes.push(r)}var o=i;i._baseCf=t.cellFactory;t.cellFactory=i;i._evtInput=document.createEvent("HTMLEvents");i._evtInput.initEvent("input",!0,!1);i._evtChange=document.createEvent("HTMLEvents");i._evtChange.initEvent("change",!0,!1);i._evtBlur=document.createEvent("HTMLEvents");i._evtBlur.initEvent("blur",!1,!1);t.prepareCellForEdit.addHandler((function(e,t){o._noApplyLag=!0}));t.cellEditEnded.addHandler((function(e,l){(l.range.col<0||!t.columns[l.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)])&&(o._editChar=null);setTimeout((function(){o._noApplyLag=!1}),300)}));t.beginningEdit.addHandler((function(e,t){!t.data||t.data instanceof KeyboardEvent&&!(t.data.charCode<=32)||(o._editChar=null);o._startingEditing=!0}));t.hostElement.addEventListener("keydown",(function(e){o._startingEditing=!1}),!0);t.hostElement.addEventListener("keypress",(function(e){var l=e.charCode>32?String.fromCharCode(e.charCode):null;l&&closest(e.target,".wj-flexgrid")===t.hostElement&&(!t.activeEditor||o._startingEditing?o._editChar=l:o._editChar&&(o._editChar+=l))}),!0);t.hostElement.addEventListener("compositionstart",(function(e){o._composing=!0}),!0);t.hostElement.addEventListener("compositionend",(function(e){o._composing=!1}),!0);return i}DirectiveCellFactory.prototype.updateCell=function(e,t,l,i,r){var o=this;this._cellStampCounter=(this._cellStampCounter+1)%1e7;var n=i[DirectiveCellFactory._cellStampProp]=this._cellStampCounter;i.style.overflow&&(i.style.overflow="");var a=t,p=l;if(r&&!r.isSingleCell){t=r.row;l=r.col}var c,s=this,d=e.grid,u=d.editRange,m=e.rows[t],C=m.dataItem,f=!1,_=!1,v=!1,h=!1;switch(e.cellType){case wjcGrid.CellType.Cell:if(u&&u.row===t&&u.col===l){c=CellTemplateType.CellEdit;_=v=!0}else if(m instanceof wjcGrid.GroupRow){var y=!((h=C instanceof CollectionViewGroup)||m.hasChildren);if(l==e.columns.firstVisibleIndex)c=y?CellTemplateType.Cell:CellTemplateType.GroupHeader;else{c=y?CellTemplateType.Cell:CellTemplateType.Group;_=!0}}else softRefGridDetail()&&softRefGridDetail().DetailRow&&m instanceof softRefGridDetail().DetailRow||(c=CellTemplateType.Cell);break;case wjcGrid.CellType.ColumnHeader:c=CellTemplateType.ColumnHeader;break;case wjcGrid.CellType.RowHeader:c=d.collectionView&&d.collectionView.currentEditItem===C?CellTemplateType.RowHeaderEdit:CellTemplateType.RowHeader;f=!0;break;case wjcGrid.CellType.TopLeft:c=CellTemplateType.TopLeft;f=!0;break;case wjcGrid.CellType.ColumnFooter:c=CellTemplateType.ColumnFooter;_=!0;break;case wjcGrid.CellType.BottomLeft:c=CellTemplateType.BottomLeft;f=!0}var T=!1;if(null!=c){var g=h&&c==CellTemplateType.GroupHeader?d.getColumn(C.groupDescription.propertyName):l>=0&&l<e.columns.length?e.columns[l]:null;if(g){var j=WjFlexGridCellTemplate._getTemplContextProp(c),w=(f?d:g)[j];if(!w)if(c===CellTemplateType.RowHeaderEdit){c=CellTemplateType.RowHeader;j=WjFlexGridCellTemplate._getTemplContextProp(c);w=d[j]}else if((c===CellTemplateType.Group||c===CellTemplateType.GroupHeader)&&!h){c=CellTemplateType.Cell;j=WjFlexGridCellTemplate._getTemplContextProp(c);w=g[j]}if(w){var F,G=s._getCellTemplate(w.cellTemplate),x=w.cellStyle,E=w.cellClass,W=!isNullOrWhiteSpace(G),L=!isNullOrWhiteSpace(x),S=!isNullOrWhiteSpace(E);_&&(F=e.getCellData(t,l,!1));if(W){var D=i.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE),H=D&&"true"===D.toLowerCase();T=!0;v&&this._baseCf.updateCell(e,a,p,i,r,!0);var k=i[j]||{},R=k.column!==g||!k.cellScope||!k.cellScope.$root,$=v&&this._composing&&d.imeEnabled,A=k.cellScope;if(R){this._doDisposeCell(i);k.cellScope=A=w.templLink.scope.$parent.$new();k.column=g;i[j]=k}var I=A.$row!==m||A.$col!==g||A.$item!==C||A.$value!==F;I&&s._initCellScope(A,m,g,C,F);var P=w.cellLink;P||(P=w.cellLink=this._gridLink.directive._$compile('<div style="display:none"'+(L?' ng-style="'+x+'"':"")+(S?' ng-class="'+E+'"':"")+">"+G+"</div>"));var b=k.clonedElement;if(R){var N=A.$watch((function(t){if(b){N();b[0].style.display="";if(e.cellType===wjcGrid.CellType.ColumnHeader||e.cellType===wjcGrid.CellType.TopLeft){var l=b[0].style,i=l.outlineColor,r=l.outlineWidth;l.outlineColor="white";l.outlineWidth="0px";setTimeout((function(){l.outlineColor=i;l.outlineWidth=r}),0)}}}));k.clonedElement=b=P(A,(function(e,t){}))}H&&(b[0].style.display="");var O=!1;if(v){var M=i.firstElementChild;if(M){$||i.focus();M.style.display="none"}}else(O=1==i.childNodes.length)||(i.textContent="");O?b[0]!==i.firstChild&&i.replaceChild(b[0],i.firstChild):i.appendChild(b[0]);w.cellOverflow&&(i.style.overflow=w.cellOverflow);this._closingApplyTimeOut&&clearTimeout(this._closingApplyTimeOut);s._rowHeightUpdates.add({panel:e,cell:i,rng:r,cellStamp:n,templateContext:w});if(H||u||this._noApplyLag||I&&Date.now()-this._lastApplyTimeStamp>40){clearTimeout(this._closingApplyTimeOut);A.$root&&!A.$root.$$phase&&A.$apply();u||H||s._rowHeightUpdates.execute();this._lastApplyTimeStamp=Date.now()}else{clearTimeout(this._closingApplyTimeOut);this._closingApplyTimeOut=setTimeout((function(){clearTimeout(this._closingApplyTimeOut);A.$root&&!A.$root.$$phase&&A.$apply();s._rowHeightUpdates.execute()}),10)}$?v&&setTimeout((function(){$?o._initImeEditInput(k,w):o._initEditInput(k,w,null)}),0):setTimeout((function(){if(s._updateRowHeight(e,i,r,n,w)){if(v){s._rowHeightUpdates.clear();var t=s._isFullEdit();d.refresh();d.startEditing(t);return}}else v&&s._initEditInput(k,w,null)}),0);if(v){s._cellEditorScope=A;var editEndingEH=function(r,o){d.cellEditEnding.removeHandler(editEndingEH);if(!o.stayInEditMode){var n=getActiveElement();n&&n.dispatchEvent(s._evtBlur);contains(i,getActiveElement())&&i.focus()}if(!o.cancel&&!o.stayInEditMode){o.cancel=!0;e.grid.setCellData(t,l,A.$value)}var a=i.querySelectorAll(".wj-dropdown");[].forEach.call(a,(function(e){var t=Control.getControl(e);t&&softRefInput()&&t instanceof softRefInput().DropDown&&(t.isDroppedDown=!1)}))};d.cellEditEnding.addHandler(editEndingEH);d.cellEditEnded.addHandler((function(){s._cellEditorScope=null}))}else this._baseCf.updateCell(e,a,p,i,r,!1)}}}}if(!T){this._doDisposeCell(i);this._baseCf.updateCell(e,a,p,i,r)}if(!W&&(L||S)){var U=s._initCellScope({},m,g,C,F),q=L?this._gridLink.scope.$parent.$eval(x,U):null,B=S?this._gridLink.scope.$parent.$eval(E,U):null;if(q||B){for(var V=document.createElement("div");i.firstChild;)V.appendChild(i.firstChild);i.appendChild(V);if(q)for(var Q in q)V.style[Q]=q[Q];if(B){for(var z=isArray(B)?B:[B],J="",K=0;K<z.length;K++){var X=z[K];if(X)if(isString(X))J+=" "+X;else for(var Y in X)X[Y]&&(J+=" "+Y)}V.className=J}}}};DirectiveCellFactory.prototype.getEditorValue=function(t){return this._cellEditorScope?this._cellEditorScope.$value:e.prototype.getEditorValue.call(this,t)};DirectiveCellFactory.prototype.disposeCell=function(e){this._doDisposeCell(e)};DirectiveCellFactory.prototype._doDisposeCell=function(e){for(var t=DirectiveCellFactory._templateTypes,l=0;l<t.length;l++){var i=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[t[l]]),r=e[i];if(r&&r.cellScope&&r.cellScope.$root){r.cellScope.$destroy();if(r.clonedElement){r.clonedElement.remove();r.clonedElement=null}e[i]=null}}};DirectiveCellFactory.prototype._updateRowHeight=function(e,t,l,i,r){if(r.autoSizeRows){var o=t.scrollHeight,n=e.rows,a=l&&l.rowSpan||1;if(i===t[DirectiveCellFactory._cellStampProp]&&n.defaultSize*a<o){n.defaultSize=o/a;return!0}}return!1};DirectiveCellFactory.prototype._initCellScope=function(e,t,l,i,r){e.$row=t;e.$col=l;e.$item=i;e.$value=r;return e};DirectiveCellFactory.prototype._getCellTemplate=function(e){e&&(e=(e=(e=e.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g,"")).replace(/<span>\s*<\/span>/g,"")).trim());return e};DirectiveCellFactory.prototype._isFullEdit=function(){var e=this._grid;return!e.activeEditor||e._edtHdl._fullEdit};DirectiveCellFactory.prototype._setFullEdit=function(e){var t=this._grid;e.forceFullEdit&&t.activeEditor&&(t._edtHdl._fullEdit=!0)};DirectiveCellFactory.prototype._initEditInput=function(e,t,l){var i=this;this._setFullEdit(t);var r=this._findInitialInput(e);if(r){var inpFocusEh_1=function(){r.removeEventListener("focus",inpFocusEh_1);setTimeout((function(){var e=null!=l?l:i._editChar;if(e){r.value=e;i._editChar=null;DirectiveCellFactory._setSelectionRange(r,e.length,e.length);!DirectiveCellFactory.isNgIE||hasClass(r,"wj-form-control")||r.getAttribute("wj-part")?r.dispatchEvent(i._evtInput):r.dispatchEvent(i._evtChange)}}),DirectiveCellFactory._FOCUS_INTERVAL)};r.addEventListener("focus",inpFocusEh_1);r.focus()}};DirectiveCellFactory.prototype._initImeEditInput=function(e,t){var l=this,i=getActiveElement();if(i&&i instanceof HTMLInputElement&&hasClass(i,"wj-grid-ime")){var compEndEh_1=function(r){i.removeEventListener("compositionend",compEndEh_1);setCss(i,wjcGrid._ImeHandler._cssHidden);l._initEditInput(e,t,i.value)};i.addEventListener("compositionend",compEndEh_1);var r=this._findInitialInput(e);if(r){var o=r.getBoundingClientRect(),n=i.getBoundingClientRect(),a=window.getComputedStyle(i),p=parseFloat(a.left),c=parseFloat(a.top);setCss(i,{left:p+o.left-n.left+"px",top:c+o.top-n.top+"px",width:o.width+"px",height:o.height+"px"})}}};DirectiveCellFactory.prototype._findInitialInput=function(e){var t=e.clonedElement[0].querySelectorAll("input,textarea");if(t)for(var l=0;l<t.length;l++){var i=t[l],r=window.getComputedStyle(i);if("none"!==r.display&&"visible"===r.visibility)return i}return null};DirectiveCellFactory._setSelectionRange=function(e,t,l){void 0===l&&(l=t);if(contains(document.body,e)&&!e.disabled&&"none"!=e.style.display)try{e.setSelectionRange(asNumber(t),asNumber(l),isIE()?null:"backward");e.focus()}catch(e){}};DirectiveCellFactory._cellStampProp="__wjCellStamp";DirectiveCellFactory._FOCUS_INTERVAL=Control._FOCUS_INTERVAL+20;DirectiveCellFactory.isNgIE=!!document.documentMode;return DirectiveCellFactory}(wjcGrid.CellFactory),_RowHeightUpdateQueue=function(){function _RowHeightUpdateQueue(e){this._requests=[];this._timeOuts=[];this._cellFactory=e}_RowHeightUpdateQueue.prototype.add=function(e){this._requests.push(e)};_RowHeightUpdateQueue.prototype.execute=function(){for(var e=this._requests;e.length>0;){var t=this._requests.shift(),l=this,i=function(e){return setTimeout((function(){if(l._cellFactory._updateRowHeight(e.panel,e.cell,e.rng,e.cellStamp,e.templateContext))l.clear();else{var t=l._timeOuts.indexOf(i);t>-1&&l._timeOuts.splice(t,1)}}),0)}(t);this._timeOuts.push(i)}};_RowHeightUpdateQueue.prototype.clear=function(){this._requests.splice(0,this._requests.length);this._clearTimeouts()};_RowHeightUpdateQueue.prototype._clearTimeouts=function(){for(var e=this._timeOuts,t=0;t<e.length;t++)clearTimeout(e[t]);e.splice(0,e.length)};return _RowHeightUpdateQueue}();gridModule||(window.wijmo.grid=null);var WjFlexGridColumn=function(e){__extends(WjFlexGridColumn,e);function WjFlexGridColumn(t){var l=e.call(this)||this;l._$compile=t;l.scope.dataMap+="map";l.scope.dataType+="type";l.require="^wjFlexGrid";l.terminal=!0;if(WjDirective._dynaTemplates){l.transclude=!1;l.priority=100;l.template=function(e,t){t[WjFlexGridColumn._colTemplateProp]=e[0].innerHTML;return'<div class="wjGridColumn"/>'}}else{l.transclude=!0;l.template='<div class="wjGridColumn" ng-transclude/>'}return l}Object.defineProperty(WjFlexGridColumn.prototype,"_controlConstructor",{get:function(){return wjcGrid.Column},enumerable:!0,configurable:!0});WjFlexGridColumn.prototype._initControl=function(e){return new wjcGrid.Column};WjFlexGridColumn.prototype._createLink=function(){return new WjFlexGridColumnLink};WjFlexGridColumn._colTemplateProp="$__wjColTemplate";WjFlexGridColumn._colWjLinkProp="$__wjLink";WjFlexGridColumn._cellCtxProp="$_cellCtxProp";return WjFlexGridColumn}(WjDirective);export{WjFlexGridColumn};var WjFlexGridColumnLink=function(e){__extends(WjFlexGridColumnLink,e);function WjFlexGridColumnLink(){return null!==e&&e.apply(this,arguments)||this}WjFlexGridColumnLink.prototype._initParent=function(){var t=this.parent.control;if(t.autoGenerateColumns){t.autoGenerateColumns=!1;this._safeApply(this.scope,"autoGenerateColumns",!1);t.columns.clear()}e.prototype._initParent.call(this);var l=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.Cell),i=this.control[l],r=this[WjFlexGridColumn._cellCtxProp];!i&&r&&(this.control[l]=r);this.control[WjFlexGridColumn._colWjLinkProp]=this};WjFlexGridColumnLink.prototype._link=function(){var t=this.tElement[0],l=this.tAttrs[WjFlexGridColumn._colTemplateProp],i=null!=l?l:WjDirective._removeTransclude(t.innerHTML),r={};if(!isNullOrWhiteSpace(i)){var o=document.createElement("div");o.innerHTML=i;var n,a=[];[].forEach.call(o.children,(function(e){a.push(e)}));for(var p=0;p<a.length;p++){var c=a[p];if(c.tagName.toLocaleLowerCase()===WjFlexGridCellTemplate._tagName){n||(n=this.scope.$parent.$new());o.removeChild(c);t.appendChild(c);this.directive._$compile(c)(n)}}var s=o.innerHTML;isNullOrWhiteSpace(s)||(r.cellTemplate=s)}var d=this.tAttrs.ngStyle,u=this.tAttrs.ngClass;d&&(r.cellStyle=d);u&&(r.cellClass=u);if(r.cellTemplate||r.cellStyle||r.cellClass){r.templLink=this;this[WjFlexGridColumn._cellCtxProp]=r}e.prototype._link.call(this)};return WjFlexGridColumnLink}(WjLink);export var CellTemplateType;!function(e){e[e.Cell=0]="Cell";e[e.CellEdit=1]="CellEdit";e[e.ColumnHeader=2]="ColumnHeader";e[e.RowHeader=3]="RowHeader";e[e.RowHeaderEdit=4]="RowHeaderEdit";e[e.TopLeft=5]="TopLeft";e[e.GroupHeader=6]="GroupHeader";e[e.Group=7]="Group";e[e.ColumnFooter=8]="ColumnFooter";e[e.BottomLeft=9]="BottomLeft"}(CellTemplateType||(CellTemplateType={}));var WjFlexGridCellTemplate=function(e){__extends(WjFlexGridCellTemplate,e);function WjFlexGridCellTemplate(){var t=e.call(this)||this;t.require=["?^wjFlexGridColumn","?^wjFlexGrid"];t.terminal=!0;if(WjDirective._dynaTemplates){t.transclude=!1;t.priority=100;t.template=function(e,t){t[WjFlexGridColumn._colTemplateProp]=e[0].innerHTML;return"<div />"}}else{t.transclude=!0;t.template="<div ng-transclude/>"}return t}WjFlexGridCellTemplate._getTemplContextProp=function(e){return"$__cellTempl"+CellTemplateType[e]};WjFlexGridCellTemplate.prototype._initControl=function(e){return{}};WjFlexGridCellTemplate.prototype._createLink=function(){return new WjFlexGridCellTemplateLink};WjFlexGridCellTemplate.prototype._getMetaDataId=function(){return"FlexGridCellTemplate"};WjFlexGridCellTemplate._tagName="wj-flex-grid-cell-template";return WjFlexGridCellTemplate}(WjDirective);export{WjFlexGridCellTemplate};var WjFlexGridCellTemplateLink=function(e){__extends(WjFlexGridCellTemplateLink,e);function WjFlexGridCellTemplateLink(){return null!==e&&e.apply(this,arguments)||this}WjFlexGridCellTemplateLink.prototype._initParent=function(){e.prototype._initParent.call(this);var t,l=this.scope.cellType;if(l){t=CellTemplateType[l];var i=this.tAttrs[WjFlexGridColumn._colTemplateProp],r=null!=i?i:WjDirective._removeTransclude(this.tElement[0].innerHTML),o=this.control;isNullOrWhiteSpace(r)||(o.cellTemplate=r);var n=this.tAttrs.ngStyle,a=this.tAttrs.ngClass;n&&(o.cellStyle=n);a&&(o.cellClass=a);this.tAttrs.forceFullEdit||(o.forceFullEdit=!0);var p=this.tAttrs.autoSizeRows;o.autoSizeRows=null==p||"true"===p;if(o.cellTemplate||o.cellStyle||o.cellClass){o.templLink=this;var c=this.parent.control;c[WjFlexGridCellTemplate._getTemplContextProp(t)]=o;c instanceof wjcGrid.Column&&c._setFlag(wjcGrid.RowColFlags.HasTemplate,!0)}WjFlexGridCellTemplateLink._invalidateGrid(this.parent.control)}};WjFlexGridCellTemplateLink.prototype._destroy=function(){var t=this.parent&&this.parent.control,l=this.scope.cellType;e.prototype._destroy.call(this);if(l){t[WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[l])]=void 0;WjFlexGridCellTemplateLink._invalidateGrid(t)}};WjFlexGridCellTemplateLink._invalidateGrid=function(e){var t=e;if(t){t instanceof wjcGrid.Column&&(t=t.grid);t&&t.invalidate()}};return WjFlexGridCellTemplateLink}(WjLink);