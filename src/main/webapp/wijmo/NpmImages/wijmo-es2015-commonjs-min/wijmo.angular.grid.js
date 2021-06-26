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

"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var l in e)Object.hasOwnProperty.call(e,l)&&(t[l]=e[l]);t.default=e;return t};Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_1=require("wijmo/wijmo"),mNg=__importStar(require("angular")),wjcGrid=__importStar(require("wijmo/wijmo.grid"));var wjNg=mNg;const wijmoGridName="wj.grid";exports.ngModuleName="wj.grid";var wijmoGrid=wijmo_angular_base_1._registerNgModule("wj.grid");if(wijmo_angular_base_1.softRefGrid()&&wijmo_angular_base_1.softRefGrid().FlexGrid){wijmoGrid.directive("wjFlexGrid",["$compile","$interpolate",function(e,t){return new WjFlexGrid(e,t)}]);wijmoGrid.directive("wjFlexGridColumn",["$compile",function(e){return new WjFlexGridColumn(e)}]);wijmoGrid.directive("wjFlexGridCellTemplate",[function(){return new WjFlexGridCellTemplate}])}class WjFlexGrid extends wijmo_angular_base_1.WjDirective{constructor(e,t){super();this._$compile=e;this._$interpolate=t;this.transclude=!0;this.template="<div ng-transclude />"}get _controlConstructor(){return wjcGrid.FlexGrid}_createLink(){return new WjFlexGridLink}_initProps(){var e=wijmo_angular_base_1.MetaFactory.findProp("childItemsPath",this._props);e.scopeBindingMode="@";e.customHandler=function(e,t,l,i,r){if(l&&(l=l.trim())&&"["===l[0]){var o=e.$parent.$eval(l);t.childItemsPath=o;return!0}return!1}}}exports.WjFlexGrid=WjFlexGrid;class WjFlexGridLink extends wijmo_angular_base_1.WjLink{_initControl(){var e=super._initControl();new DirectiveCellFactory(e,this);return e}}var CellTemplateType,gridModule=wjcGrid&&wjcGrid.CellFactory;if(!gridModule){window.wijmo.grid={};window.wijmo.grid.CellFactory=function(){}}class DirectiveCellFactory extends wjcGrid.CellFactory{constructor(e,t){super();this._lastApplyTimeStamp=0;this._noApplyLag=!1;this._startingEditing=!1;this._cellStampCounter=0;this._composing=!1;this._grid=e;this._gridLink=t;this._rowHeightUpdates=new _RowHeightUpdateQueue(this);if(!DirectiveCellFactory._templateTypes){DirectiveCellFactory._templateTypes=[];for(var l in CellTemplateType)isNaN(l)&&DirectiveCellFactory._templateTypes.push(l)}var i=this;this._baseCf=e.cellFactory;e.cellFactory=this;this._evtInput=document.createEvent("HTMLEvents");this._evtInput.initEvent("input",!0,!1);this._evtChange=document.createEvent("HTMLEvents");this._evtChange.initEvent("change",!0,!1);this._evtBlur=document.createEvent("HTMLEvents");this._evtBlur.initEvent("blur",!1,!1);e.prepareCellForEdit.addHandler((function(e,t){i._noApplyLag=!0}));e.cellEditEnded.addHandler((function(t,l){(l.range.col<0||!e.columns[l.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)])&&(i._editChar=null);setTimeout((function(){i._noApplyLag=!1}),300)}));e.beginningEdit.addHandler((function(e,t){!t.data||t.data instanceof KeyboardEvent&&!(t.data.charCode<=32)||(i._editChar=null);i._startingEditing=!0}));e.hostElement.addEventListener("keydown",(function(e){i._startingEditing=!1}),!0);e.hostElement.addEventListener("keypress",(function(t){var l=t.charCode>32?String.fromCharCode(t.charCode):null;l&&wijmo_1.closest(t.target,".wj-flexgrid")===e.hostElement&&(!e.activeEditor||i._startingEditing?i._editChar=l:i._editChar&&(i._editChar+=l))}),!0);e.hostElement.addEventListener("compositionstart",(function(e){i._composing=!0}),!0);e.hostElement.addEventListener("compositionend",(function(e){i._composing=!1}),!0)}updateCell(e,t,l,i,r){this._cellStampCounter=(this._cellStampCounter+1)%1e7;let o=i[DirectiveCellFactory._cellStampProp]=this._cellStampCounter;i.style.overflow&&(i.style.overflow="");let n=t,a=l;if(r&&!r.isSingleCell){t=r.row;l=r.col}let s,p=this,c=e.grid,d=c.editRange,u=e.rows[t],m=u.dataItem,_=!1,C=!1,h=!1,w=!1;switch(e.cellType){case wjcGrid.CellType.Cell:if(d&&d.row===t&&d.col===l){s=CellTemplateType.CellEdit;C=h=!0}else if(u instanceof wjcGrid.GroupRow){var f=!((w=m instanceof wijmo_1.CollectionViewGroup)||u.hasChildren);if(l==e.columns.firstVisibleIndex)s=f?CellTemplateType.Cell:CellTemplateType.GroupHeader;else{s=f?CellTemplateType.Cell:CellTemplateType.Group;C=!0}}else wijmo_angular_base_1.softRefGridDetail()&&wijmo_angular_base_1.softRefGridDetail().DetailRow&&u instanceof wijmo_angular_base_1.softRefGridDetail().DetailRow||(s=CellTemplateType.Cell);break;case wjcGrid.CellType.ColumnHeader:s=CellTemplateType.ColumnHeader;break;case wjcGrid.CellType.RowHeader:s=c.collectionView&&c.collectionView.currentEditItem===m?CellTemplateType.RowHeaderEdit:CellTemplateType.RowHeader;_=!0;break;case wjcGrid.CellType.TopLeft:s=CellTemplateType.TopLeft;_=!0;break;case wjcGrid.CellType.ColumnFooter:s=CellTemplateType.ColumnFooter;C=!0;break;case wjcGrid.CellType.BottomLeft:s=CellTemplateType.BottomLeft;_=!0}var g=!1;if(null!=s){var T=w&&s==CellTemplateType.GroupHeader?c.getColumn(m.groupDescription.propertyName):l>=0&&l<e.columns.length?e.columns[l]:null;if(T){var v=WjFlexGridCellTemplate._getTemplContextProp(s),j=(_?c:T)[v];if(!j)if(s===CellTemplateType.RowHeaderEdit){s=CellTemplateType.RowHeader;v=WjFlexGridCellTemplate._getTemplContextProp(s);j=c[v]}else if((s===CellTemplateType.Group||s===CellTemplateType.GroupHeader)&&!w){s=CellTemplateType.Cell;v=WjFlexGridCellTemplate._getTemplContextProp(s);j=T[v]}if(j){var y,E=p._getCellTemplate(j.cellTemplate),G=j.cellStyle,x=j.cellClass,F=!wijmo_1.isNullOrWhiteSpace(E),S=!wijmo_1.isNullOrWhiteSpace(G),L=!wijmo_1.isNullOrWhiteSpace(x);C&&(y=e.getCellData(t,l,!1));if(F){var W=i.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE),H=W&&"true"===W.toLowerCase();g=!0;h&&this._baseCf.updateCell(e,n,a,i,r,!0);var b=i[v]||{},$=b.column!==T||!b.cellScope||!b.cellScope.$root,D=h&&this._composing&&c.imeEnabled,R=b.cellScope;if($){this._doDisposeCell(i);b.cellScope=R=j.templLink.scope.$parent.$new();b.column=T;i[v]=b}var k=R.$row!==u||R.$col!==T||R.$item!==m||R.$value!==y;k&&p._initCellScope(R,u,T,m,y);var I=j.cellLink;I||(I=j.cellLink=this._gridLink.directive._$compile('<div style="display:none"'+(S?' ng-style="'+G+'"':"")+(L?' ng-class="'+x+'"':"")+">"+E+"</div>"));var A=b.clonedElement;if($){var P=R.$watch((function(t){if(A){P();A[0].style.display="";if(e.cellType===wjcGrid.CellType.ColumnHeader||e.cellType===wjcGrid.CellType.TopLeft){var l=A[0].style,i=l.outlineColor,r=l.outlineWidth;l.outlineColor="white";l.outlineWidth="0px";setTimeout((function(){l.outlineColor=i;l.outlineWidth=r}),0)}}}));b.clonedElement=A=I(R,(function(e,t){}))}H&&(A[0].style.display="");var N=!1;if(h){var O=i.firstElementChild;if(O){D||i.focus();O.style.display="none"}}else(N=1==i.childNodes.length)||(i.textContent="");N?A[0]!==i.firstChild&&i.replaceChild(A[0],i.firstChild):i.appendChild(A[0]);j.cellOverflow&&(i.style.overflow=j.cellOverflow);this._closingApplyTimeOut&&clearTimeout(this._closingApplyTimeOut);p._rowHeightUpdates.add({panel:e,cell:i,rng:r,cellStamp:o,templateContext:j});if(H||d||this._noApplyLag||k&&Date.now()-this._lastApplyTimeStamp>40){clearTimeout(this._closingApplyTimeOut);R.$root&&!R.$root.$$phase&&R.$apply();d||H||p._rowHeightUpdates.execute();this._lastApplyTimeStamp=Date.now()}else{clearTimeout(this._closingApplyTimeOut);this._closingApplyTimeOut=setTimeout((function(){clearTimeout(this._closingApplyTimeOut);R.$root&&!R.$root.$$phase&&R.$apply();p._rowHeightUpdates.execute()}),10)}D?h&&setTimeout(()=>{D?this._initImeEditInput(b,j):this._initEditInput(b,j,null)},0):setTimeout((function(){if(p._updateRowHeight(e,i,r,o,j)){if(h){p._rowHeightUpdates.clear();let e=p._isFullEdit();c.refresh();c.startEditing(e);return}}else h&&p._initEditInput(b,j,null)}),0);if(h){p._cellEditorScope=R;var editEndingEH=function(r,o){c.cellEditEnding.removeHandler(editEndingEH);if(!o.stayInEditMode){var n=wijmo_1.getActiveElement();n&&n.dispatchEvent(p._evtBlur);wijmo_1.contains(i,wijmo_1.getActiveElement())&&i.focus()}if(!o.cancel&&!o.stayInEditMode){o.cancel=!0;e.grid.setCellData(t,l,R.$value)}var a=i.querySelectorAll(".wj-dropdown");[].forEach.call(a,(function(e){var t=wijmo_1.Control.getControl(e);t&&wijmo_angular_base_1.softRefInput()&&t instanceof wijmo_angular_base_1.softRefInput().DropDown&&(t.isDroppedDown=!1)}))};c.cellEditEnding.addHandler(editEndingEH);c.cellEditEnded.addHandler(()=>{p._cellEditorScope=null})}else this._baseCf.updateCell(e,n,a,i,r,!1)}}}}if(!g){this._doDisposeCell(i);this._baseCf.updateCell(e,n,a,i,r)}if(!F&&(S||L)){var M=p._initCellScope({},u,T,m,y),q=S?this._gridLink.scope.$parent.$eval(G,M):null,U=L?this._gridLink.scope.$parent.$eval(x,M):null;if(q||U){for(var B=document.createElement("div");i.firstChild;)B.appendChild(i.firstChild);i.appendChild(B);if(q)for(var V in q)B.style[V]=q[V];if(U){for(var z=wijmo_1.isArray(U)?U:[U],Q="",J=0;J<z.length;J++){var K=z[J];if(K)if(wijmo_1.isString(K))Q+=" "+K;else for(var X in K)K[X]&&(Q+=" "+X)}B.className=Q}}}}getEditorValue(e){return this._cellEditorScope?this._cellEditorScope.$value:super.getEditorValue(e)}disposeCell(e){this._doDisposeCell(e)}_doDisposeCell(e){for(var t=DirectiveCellFactory._templateTypes,l=0;l<t.length;l++){var i=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[t[l]]),r=e[i];if(r&&r.cellScope&&r.cellScope.$root){r.cellScope.$destroy();if(r.clonedElement){r.clonedElement.remove();r.clonedElement=null}e[i]=null}}}_updateRowHeight(e,t,l,i,r){if(r.autoSizeRows){var o=t.scrollHeight,n=e.rows,a=l&&l.rowSpan||1;if(i===t[DirectiveCellFactory._cellStampProp]&&n.defaultSize*a<o){n.defaultSize=o/a;return!0}}return!1}_initCellScope(e,t,l,i,r){e.$row=t;e.$col=l;e.$item=i;e.$value=r;return e}_getCellTemplate(e){e&&(e=(e=(e=e.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g,"")).replace(/<span>\s*<\/span>/g,"")).trim());return e}_isFullEdit(){let e=this._grid;return!e.activeEditor||e._edtHdl._fullEdit}_setFullEdit(e){let t=this._grid;e.forceFullEdit&&t.activeEditor&&(t._edtHdl._fullEdit=!0)}_initEditInput(e,t,l){this._setFullEdit(t);var i=this._findInitialInput(e);if(i){let inpFocusEh=()=>{i.removeEventListener("focus",inpFocusEh);setTimeout(()=>{let e=null!=l?l:this._editChar;if(e){i.value=e;this._editChar=null;DirectiveCellFactory._setSelectionRange(i,e.length,e.length);!DirectiveCellFactory.isNgIE||wijmo_1.hasClass(i,"wj-form-control")||i.getAttribute("wj-part")?i.dispatchEvent(this._evtInput):i.dispatchEvent(this._evtChange)}},DirectiveCellFactory._FOCUS_INTERVAL)};i.addEventListener("focus",inpFocusEh);i.focus()}}_initImeEditInput(e,t){let l=wijmo_1.getActiveElement();if(l&&l instanceof HTMLInputElement&&wijmo_1.hasClass(l,"wj-grid-ime")){let compEndEh=i=>{l.removeEventListener("compositionend",compEndEh);wijmo_1.setCss(l,wjcGrid._ImeHandler._cssHidden);this._initEditInput(e,t,l.value)};l.addEventListener("compositionend",compEndEh);let i=this._findInitialInput(e);if(i){let e=i.getBoundingClientRect(),t=l.getBoundingClientRect(),r=window.getComputedStyle(l),o=parseFloat(r.left),n=parseFloat(r.top);wijmo_1.setCss(l,{left:o+e.left-t.left+"px",top:n+e.top-t.top+"px",width:e.width+"px",height:e.height+"px"})}}}_findInitialInput(e){let t=e.clonedElement[0].querySelectorAll("input,textarea");if(t)for(var l=0;l<t.length;l++){var i=t[l],r=window.getComputedStyle(i);if("none"!==r.display&&"visible"===r.visibility)return i}return null}static _setSelectionRange(e,t,l=t){if(wijmo_1.contains(document.body,e)&&!e.disabled&&"none"!=e.style.display)try{e.setSelectionRange(wijmo_1.asNumber(t),wijmo_1.asNumber(l),wijmo_1.isIE()?null:"backward");e.focus()}catch(e){}}}DirectiveCellFactory._cellStampProp="__wjCellStamp";DirectiveCellFactory._FOCUS_INTERVAL=wijmo_1.Control._FOCUS_INTERVAL+20;DirectiveCellFactory.isNgIE=!!document.documentMode;class _RowHeightUpdateQueue{constructor(e){this._requests=[];this._timeOuts=[];this._cellFactory=e}add(e){this._requests.push(e)}execute(){for(var e=this._requests;e.length>0;){var t=this._requests.shift(),l=this,i=function(e){return setTimeout((function(){if(l._cellFactory._updateRowHeight(e.panel,e.cell,e.rng,e.cellStamp,e.templateContext))l.clear();else{var t=l._timeOuts.indexOf(i);t>-1&&l._timeOuts.splice(t,1)}}),0)}(t);this._timeOuts.push(i)}}clear(){this._requests.splice(0,this._requests.length);this._clearTimeouts()}_clearTimeouts(){for(var e=this._timeOuts,t=0;t<e.length;t++)clearTimeout(e[t]);e.splice(0,e.length)}}gridModule||(window.wijmo.grid=null);class WjFlexGridColumn extends wijmo_angular_base_1.WjDirective{constructor(e){super();this._$compile=e;this.scope.dataMap+="map";this.scope.dataType+="type";this.require="^wjFlexGrid";this.terminal=!0;if(wijmo_angular_base_1.WjDirective._dynaTemplates){this.transclude=!1;this.priority=100;this.template=function(e,t){t[WjFlexGridColumn._colTemplateProp]=e[0].innerHTML;return'<div class="wjGridColumn"/>'}}else{this.transclude=!0;this.template='<div class="wjGridColumn" ng-transclude/>'}}get _controlConstructor(){return wjcGrid.Column}_initControl(e){return new wjcGrid.Column}_createLink(){return new WjFlexGridColumnLink}}WjFlexGridColumn._colTemplateProp="$__wjColTemplate";WjFlexGridColumn._colWjLinkProp="$__wjLink";WjFlexGridColumn._cellCtxProp="$_cellCtxProp";exports.WjFlexGridColumn=WjFlexGridColumn;class WjFlexGridColumnLink extends wijmo_angular_base_1.WjLink{_initParent(){var e=this.parent.control;if(e.autoGenerateColumns){e.autoGenerateColumns=!1;this._safeApply(this.scope,"autoGenerateColumns",!1);e.columns.clear()}super._initParent();var t=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.Cell),l=this.control[t],i=this[WjFlexGridColumn._cellCtxProp];!l&&i&&(this.control[t]=i);this.control[WjFlexGridColumn._colWjLinkProp]=this}_link(){var e=this.tElement[0],t=this.tAttrs[WjFlexGridColumn._colTemplateProp],l=null!=t?t:wijmo_angular_base_1.WjDirective._removeTransclude(e.innerHTML),i={};if(!wijmo_1.isNullOrWhiteSpace(l)){var r=document.createElement("div");r.innerHTML=l;var o,n=[];[].forEach.call(r.children,(function(e){n.push(e)}));for(var a=0;a<n.length;a++){var s=n[a];if(s.tagName.toLocaleLowerCase()===WjFlexGridCellTemplate._tagName){o||(o=this.scope.$parent.$new());r.removeChild(s);e.appendChild(s);this.directive._$compile(s)(o)}}var p=r.innerHTML;wijmo_1.isNullOrWhiteSpace(p)||(i.cellTemplate=p)}var c=this.tAttrs.ngStyle,d=this.tAttrs.ngClass;c&&(i.cellStyle=c);d&&(i.cellClass=d);if(i.cellTemplate||i.cellStyle||i.cellClass){i.templLink=this;this[WjFlexGridColumn._cellCtxProp]=i}super._link()}}!function(e){e[e.Cell=0]="Cell";e[e.CellEdit=1]="CellEdit";e[e.ColumnHeader=2]="ColumnHeader";e[e.RowHeader=3]="RowHeader";e[e.RowHeaderEdit=4]="RowHeaderEdit";e[e.TopLeft=5]="TopLeft";e[e.GroupHeader=6]="GroupHeader";e[e.Group=7]="Group";e[e.ColumnFooter=8]="ColumnFooter";e[e.BottomLeft=9]="BottomLeft"}(CellTemplateType=exports.CellTemplateType||(exports.CellTemplateType={}));class WjFlexGridCellTemplate extends wijmo_angular_base_1.WjDirective{constructor(){super();this.require=["?^wjFlexGridColumn","?^wjFlexGrid"];this.terminal=!0;if(wijmo_angular_base_1.WjDirective._dynaTemplates){this.transclude=!1;this.priority=100;this.template=function(e,t){t[WjFlexGridColumn._colTemplateProp]=e[0].innerHTML;return"<div />"}}else{this.transclude=!0;this.template="<div ng-transclude/>"}}static _getTemplContextProp(e){return"$__cellTempl"+CellTemplateType[e]}_initControl(e){return{}}_createLink(){return new WjFlexGridCellTemplateLink}_getMetaDataId(){return"FlexGridCellTemplate"}}WjFlexGridCellTemplate._tagName="wj-flex-grid-cell-template";exports.WjFlexGridCellTemplate=WjFlexGridCellTemplate;class WjFlexGridCellTemplateLink extends wijmo_angular_base_1.WjLink{_initParent(){super._initParent();var e,t=this.scope.cellType;if(!t)return;e=CellTemplateType[t];var l=this.tAttrs[WjFlexGridColumn._colTemplateProp],i=null!=l?l:wijmo_angular_base_1.WjDirective._removeTransclude(this.tElement[0].innerHTML),r=this.control;wijmo_1.isNullOrWhiteSpace(i)||(r.cellTemplate=i);var o=this.tAttrs.ngStyle,n=this.tAttrs.ngClass;o&&(r.cellStyle=o);n&&(r.cellClass=n);this.tAttrs.forceFullEdit||(r.forceFullEdit=!0);let a=this.tAttrs.autoSizeRows;r.autoSizeRows=null==a||"true"===a;if(r.cellTemplate||r.cellStyle||r.cellClass){r.templLink=this;let t=this.parent.control;t[WjFlexGridCellTemplate._getTemplContextProp(e)]=r;t instanceof wjcGrid.Column&&t._setFlag(wjcGrid.RowColFlags.HasTemplate,!0)}WjFlexGridCellTemplateLink._invalidateGrid(this.parent.control)}_destroy(){var e=this.parent&&this.parent.control,t=this.scope.cellType;super._destroy();if(t){e[WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[t])]=void 0;WjFlexGridCellTemplateLink._invalidateGrid(e)}}static _invalidateGrid(e){var t=e;if(t){t instanceof wjcGrid.Column&&(t=t.grid);t&&t.invalidate()}}}