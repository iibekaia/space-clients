import{J as N,T as O,U as B,V as z,W as J,Y as P,_ as A}from"./chunk-66N5ZWW3.js";import{Ab as D,Ba as Q,Gb as m,Hb as u,Hc as $,Jb as T,Jc as j,Kb as v,Kc as q,Lb as y,Lc as R,Mc as w,Pb as _,Qb as E,Rb as g,Ub as c,Wb as p,Xa as i,Xb as d,Y as M,Zb as b,_b as C,ca as S,ec as k,gb as F,jb as x,lb as l,pa as h,vb as I,wb as r}from"./chunk-4YCFH6U6.js";var V=({dt:e})=>`
.p-card {
    background: ${e("card.background")};
    color: ${e("card.color")};
    box-shadow: ${e("card.shadow")};
    border-radius: ${e("card.border.radius")};
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: ${e("card.caption.gap")};
}

.p-card-body {
    padding: ${e("card.body.padding")};
    display: flex;
    flex-direction: column;
    gap: ${e("card.body.gap")};
}

.p-card-title {
    font-size: ${e("card.title.font.size")};
    font-weight: ${e("card.title.font.weight")};
}

.p-card-subtitle {
    color: ${e("card.subtitle.color")};
}
`,G={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},H=(()=>{class e extends P{name="card";theme=V;classes=G;static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275prov=M({token:e,factory:e.\u0275fac})}return e})();var K=["header"],L=["title"],U=["subtitle"],W=["content"],X=["footer"],Y=["*",[["p-header"]],[["p-footer"]]],Z=["*","p-header","p-footer"];function ee(e,o){e&1&&y(0)}function te(e,o){if(e&1&&(m(0,"div",8),g(1,1),l(2,ee,1,0,"ng-container",6),u()),e&2){let t=_();i(2),r("ngTemplateOutlet",t.headerTemplate||t._headerTemplate)}}function ne(e,o){if(e&1&&(T(0),b(1),v()),e&2){let t=_(2);i(),C(t.header)}}function ae(e,o){e&1&&y(0)}function ie(e,o){if(e&1&&(m(0,"div",9),l(1,ne,2,1,"ng-container",10)(2,ae,1,0,"ng-container",6),u()),e&2){let t=_();i(),r("ngIf",t.header&&!t._titleTemplate&&!t.titleTemplate),i(),r("ngTemplateOutlet",t.titleTemplate||t._titleTemplate)}}function re(e,o){if(e&1&&(T(0),b(1),v()),e&2){let t=_(2);i(),C(t.subheader)}}function oe(e,o){e&1&&y(0)}function le(e,o){if(e&1&&(m(0,"div",11),l(1,re,2,1,"ng-container",10)(2,oe,1,0,"ng-container",6),u()),e&2){let t=_();i(),r("ngIf",t.subheader&&!t._subtitleTemplate&&!t.subtitleTemplate),i(),r("ngTemplateOutlet",t.subtitleTemplate||t._subtitleTemplate)}}function ce(e,o){e&1&&y(0)}function pe(e,o){e&1&&y(0)}function de(e,o){if(e&1&&(m(0,"div",12),g(1,2),l(2,pe,1,0,"ng-container",6),u()),e&2){let t=_();i(2),r("ngTemplateOutlet",t.footerTemplate||t._footerTemplate)}}var Ee=(()=>{class e extends A{header;subheader;set style(t){N(this._style(),t)||this._style.set(t)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=Q(null);_componentStyle=S(H);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"header":this._headerTemplate=t.template;break;case"title":this._titleTemplate=t.template;break;case"subtitle":this._subtitleTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;case"footer":this._footerTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=h(e)))(n||e)}})();static \u0275cmp=F({type:e,selectors:[["p-card"]],contentQueries:function(f,n,s){if(f&1&&(c(s,O,5),c(s,B,5),c(s,K,4),c(s,L,4),c(s,U,4),c(s,W,4),c(s,X,4),c(s,z,4)),f&2){let a;p(a=d())&&(n.headerFacet=a.first),p(a=d())&&(n.footerFacet=a.first),p(a=d())&&(n.headerTemplate=a.first),p(a=d())&&(n.titleTemplate=a.first),p(a=d())&&(n.subtitleTemplate=a.first),p(a=d())&&(n.contentTemplate=a.first),p(a=d())&&(n.footerTemplate=a.first),p(a=d())&&(n.templates=a)}},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[k([H]),x],ngContentSelectors:Z,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[4,"ngIf"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(f,n){f&1&&(E(Y),m(0,"div",0),l(1,te,3,1,"div",1),m(2,"div",2),l(3,ie,3,2,"div",3)(4,le,3,2,"div",4),m(5,"div",5),g(6),l(7,ce,1,0,"ng-container",6),u(),l(8,de,3,1,"div",7),u()()),f&2&&(D(n.styleClass),r("ngClass","p-card p-component")("ngStyle",n._style()),I("data-pc-name","card"),i(),r("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),i(2),r("ngIf",n.header||n.titleTemplate||n._titleTemplate),i(),r("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),i(3),r("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),i(),r("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[w,$,j,R,q,J],encapsulation:2,changeDetection:0})}return e})();export{Ee as a};
