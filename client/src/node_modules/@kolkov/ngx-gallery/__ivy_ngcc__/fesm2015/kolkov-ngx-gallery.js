import { __decorate } from 'tslib';
import { Renderer2, ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, HostListener, Component, ChangeDetectionStrategy, HostBinding, ViewEncapsulation, NgModule } from '@angular/core';
import { DomSanitizer, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
import * as ɵngcc2 from '@angular/common';

const _c0 = ["previewImage"];
function NgxGalleryPreviewComponent_ngx_gallery_arrows_0_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-arrows", 16);
    ɵngcc0.ɵɵlistener("prevClick", function NgxGalleryPreviewComponent_ngx_gallery_arrows_0_Template_ngx_gallery_arrows_prevClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r12 = ɵngcc0.ɵɵnextContext(); return ctx_r12.showPrev(); })("nextClick", function NgxGalleryPreviewComponent_ngx_gallery_arrows_0_Template_ngx_gallery_arrows_nextClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r13); const ctx_r14 = ɵngcc0.ɵɵnextContext(); return ctx_r14.showNext(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("prevDisabled", !ctx_r0.canShowPrev())("nextDisabled", !ctx_r0.canShowNext())("arrowPrevIcon", ctx_r0.arrowPrevIcon)("arrowNextIcon", ctx_r0.arrowNextIcon);
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 17);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_3_Template_ngx_gallery_action_closeClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const action_r15 = ctx.$implicit; const ctx_r16 = ɵngcc0.ɵɵnextContext(); return action_r15.onClick($event, ctx_r16.index); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r15 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("icon", action_r15.icon)("disabled", action_r15.disabled)("titleText", action_r15.titleText);
} }
function NgxGalleryPreviewComponent_a_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 18);
    ɵngcc0.ɵɵelement(1, "i");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("href", ctx_r2.src, ɵngcc0.ɵɵsanitizeUrl);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-icon-content ", ctx_r2.downloadIcon, "");
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_5_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 19);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_5_Template_ngx_gallery_action_closeClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r19); const ctx_r18 = ɵngcc0.ɵɵnextContext(); return ctx_r18.zoomOut(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("icon", ctx_r3.zoomOutIcon)("disabled", !ctx_r3.canZoomOut());
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_6_Template(rf, ctx) { if (rf & 1) {
    const _r21 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 19);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_6_Template_ngx_gallery_action_closeClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r21); const ctx_r20 = ɵngcc0.ɵɵnextContext(); return ctx_r20.zoomIn(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("icon", ctx_r4.zoomInIcon)("disabled", !ctx_r4.canZoomIn());
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_7_Template(rf, ctx) { if (rf & 1) {
    const _r23 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 7);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_7_Template_ngx_gallery_action_closeClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r23); const ctx_r22 = ɵngcc0.ɵɵnextContext(); return ctx_r22.rotateLeft(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("icon", ctx_r5.rotateLeftIcon);
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_8_Template(rf, ctx) { if (rf & 1) {
    const _r25 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 7);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_8_Template_ngx_gallery_action_closeClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r25); const ctx_r24 = ɵngcc0.ɵɵnextContext(); return ctx_r24.rotateRight(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("icon", ctx_r6.rotateRightIcon);
} }
function NgxGalleryPreviewComponent_ngx_gallery_action_9_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 7);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_ngx_gallery_action_9_Template_ngx_gallery_action_closeClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r27); const ctx_r26 = ɵngcc0.ɵɵnextContext(); return ctx_r26.manageFullscreen(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("icon", "ngx-gallery-fullscreen " + ctx_r7.fullscreenIcon);
} }
function NgxGalleryPreviewComponent_img_15_Template(rf, ctx) { if (rf & 1) {
    const _r31 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "img", 20, 21);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryPreviewComponent_img_15_Template_img_click_0_listener($event) { return $event.stopPropagation(); })("mouseenter", function NgxGalleryPreviewComponent_img_15_Template_img_mouseenter_0_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.imageMouseEnter(); })("mouseleave", function NgxGalleryPreviewComponent_img_15_Template_img_mouseleave_0_listener() { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r32 = ɵngcc0.ɵɵnextContext(); return ctx_r32.imageMouseLeave(); })("mousedown", function NgxGalleryPreviewComponent_img_15_Template_img_mousedown_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r33 = ɵngcc0.ɵɵnextContext(); return ctx_r33.mouseDownHandler($event); })("touchstart", function NgxGalleryPreviewComponent_img_15_Template_img_touchstart_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r31); const ctx_r34 = ɵngcc0.ɵɵnextContext(); return ctx_r34.mouseDownHandler($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("transform", ctx_r8.getTransform())("left", ctx_r8.positionLeft + "px")("top", ctx_r8.positionTop + "px");
    ɵngcc0.ɵɵclassProp("ngx-gallery-active", !ctx_r8.loading)("animation", ctx_r8.animation)("ngx-gallery-grab", ctx_r8.canDragOnZoom());
    ɵngcc0.ɵɵproperty("src", ctx_r8.src, ɵngcc0.ɵɵsanitizeUrl);
} }
function NgxGalleryPreviewComponent_video_16_Template(rf, ctx) { if (rf & 1) {
    const _r38 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "video", 22, 21);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryPreviewComponent_video_16_Template_video_click_0_listener($event) { return $event.stopPropagation(); })("mouseenter", function NgxGalleryPreviewComponent_video_16_Template_video_mouseenter_0_listener() { ɵngcc0.ɵɵrestoreView(_r38); const ctx_r37 = ɵngcc0.ɵɵnextContext(); return ctx_r37.imageMouseEnter(); })("mouseleave", function NgxGalleryPreviewComponent_video_16_Template_video_mouseleave_0_listener() { ɵngcc0.ɵɵrestoreView(_r38); const ctx_r39 = ɵngcc0.ɵɵnextContext(); return ctx_r39.imageMouseLeave(); })("mousedown", function NgxGalleryPreviewComponent_video_16_Template_video_mousedown_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r38); const ctx_r40 = ɵngcc0.ɵɵnextContext(); return ctx_r40.mouseDownHandler($event); })("touchstart", function NgxGalleryPreviewComponent_video_16_Template_video_touchstart_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r38); const ctx_r41 = ɵngcc0.ɵɵnextContext(); return ctx_r41.mouseDownHandler($event); });
    ɵngcc0.ɵɵelement(2, "source", 23);
    ɵngcc0.ɵɵtext(3, " Your browser does not support the video tag. ");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("transform", ctx_r9.getTransform())("left", ctx_r9.positionLeft + "px")("top", ctx_r9.positionTop + "px");
    ɵngcc0.ɵɵclassProp("ngx-gallery-active", !ctx_r9.loading)("animation", ctx_r9.animation)("ngx-gallery-grab", ctx_r9.canDragOnZoom());
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("src", ctx_r9.src, ɵngcc0.ɵɵsanitizeUrl);
} }
function NgxGalleryPreviewComponent_ngx_gallery_bullets_17_Template(rf, ctx) { if (rf & 1) {
    const _r43 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-bullets", 24);
    ɵngcc0.ɵɵlistener("bulletChange", function NgxGalleryPreviewComponent_ngx_gallery_bullets_17_Template_ngx_gallery_bullets_bulletChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r43); const ctx_r42 = ɵngcc0.ɵɵnextContext(); return ctx_r42.showAtIndex($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("count", ctx_r10.images.length)("active", ctx_r10.index);
} }
function NgxGalleryPreviewComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 25);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryPreviewComponent_div_18_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r11 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r11.description, ɵngcc0.ɵɵsanitizeHtml);
} }
function NgxGalleryImageComponent_div_1_div_1_ngx_gallery_action_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 8);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryImageComponent_div_1_div_1_ngx_gallery_action_2_Template_ngx_gallery_action_closeClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r12); const action_r9 = ctx.$implicit; const image_r4 = ɵngcc0.ɵɵnextContext(2).$implicit; return action_r9.onClick($event, image_r4.index); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r9 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("icon", action_r9.icon)("disabled", action_r9.disabled)("titleText", action_r9.titleText);
} }
function NgxGalleryImageComponent_div_1_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 9);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryImageComponent_div_1_div_1_div_3_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r4 = ɵngcc0.ɵɵnextContext(2).$implicit;
    const ctx_r8 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r8.descriptions[image_r4.index], ɵngcc0.ɵɵsanitizeHtml);
} }
const _c1 = function (a0, a1, a2, a3) { return { "ngx-gallery-active": a0, "ngx-gallery-inactive-left": a1, "ngx-gallery-inactive-right": a2, "ngx-gallery-clickable": a3 }; };
function NgxGalleryImageComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryImageComponent_div_1_div_1_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r17); const image_r4 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r15 = ɵngcc0.ɵɵnextContext(); return ctx_r15.handleClick($event, image_r4.index); });
    ɵngcc0.ɵɵelementStart(1, "div", 5);
    ɵngcc0.ɵɵtemplate(2, NgxGalleryImageComponent_div_1_div_1_ngx_gallery_action_2_Template, 1, 3, "ngx-gallery-action", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(3, NgxGalleryImageComponent_div_1_div_1_div_3_Template, 1, 1, "div", 7);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r4 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r6 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("background-image", ctx_r6.getSafeUrl(image_r4.src));
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction4(5, _c1, ctx_r6.selectedIndex == image_r4.index, ctx_r6.selectedIndex > image_r4.index, ctx_r6.selectedIndex < image_r4.index, ctx_r6.clickable));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r6.actions);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r6.showDescription && ctx_r6.descriptions[image_r4.index]);
} }
function NgxGalleryImageComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtemplate(1, NgxGalleryImageComponent_div_1_div_1_Template, 4, 10, "div", 3);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r4 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", image_r4.type === "image");
} }
function NgxGalleryImageComponent_div_2_div_1_ngx_gallery_action_5_Template(rf, ctx) { if (rf & 1) {
    const _r27 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 8);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryImageComponent_div_2_div_1_ngx_gallery_action_5_Template_ngx_gallery_action_closeClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r27); const action_r24 = ctx.$implicit; const image_r19 = ɵngcc0.ɵɵnextContext(2).$implicit; return action_r24.onClick($event, image_r19.index); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r24 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("icon", action_r24.icon)("disabled", action_r24.disabled)("titleText", action_r24.titleText);
} }
function NgxGalleryImageComponent_div_2_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 9);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryImageComponent_div_2_div_1_div_6_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r19 = ɵngcc0.ɵɵnextContext(2).$implicit;
    const ctx_r23 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("innerHTML", ctx_r23.descriptions[image_r19.index], ɵngcc0.ɵɵsanitizeHtml);
} }
function NgxGalleryImageComponent_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r32 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryImageComponent_div_2_div_1_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r32); const image_r19 = ɵngcc0.ɵɵnextContext().$implicit; const ctx_r30 = ɵngcc0.ɵɵnextContext(); return ctx_r30.handleClick($event, image_r19.index); });
    ɵngcc0.ɵɵelementStart(1, "video", 11);
    ɵngcc0.ɵɵelement(2, "source", 12);
    ɵngcc0.ɵɵtext(3, " Your browser does not support the video tag. ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(4, "div", 5);
    ɵngcc0.ɵɵtemplate(5, NgxGalleryImageComponent_div_2_div_1_ngx_gallery_action_5_Template, 1, 3, "ngx-gallery-action", 6);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(6, NgxGalleryImageComponent_div_2_div_1_div_6_Template, 1, 1, "div", 7);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r19 = ɵngcc0.ɵɵnextContext().$implicit;
    const ctx_r21 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction4(4, _c1, ctx_r21.selectedIndex == image_r19.index, ctx_r21.selectedIndex > image_r19.index, ctx_r21.selectedIndex < image_r19.index, ctx_r21.clickable));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("src", image_r19.src, ɵngcc0.ɵɵsanitizeUrl);
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r21.actions);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r21.showDescription && ctx_r21.descriptions[image_r19.index]);
} }
function NgxGalleryImageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div");
    ɵngcc0.ɵɵtemplate(1, NgxGalleryImageComponent_div_2_div_1_Template, 7, 9, "div", 10);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r19 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", image_r19.type === "video");
} }
function NgxGalleryImageComponent_ngx_gallery_bullets_3_Template(rf, ctx) { if (rf & 1) {
    const _r35 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-bullets", 13);
    ɵngcc0.ɵɵlistener("bulletChange", function NgxGalleryImageComponent_ngx_gallery_bullets_3_Template_ngx_gallery_bullets_bulletChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r35); const ctx_r34 = ɵngcc0.ɵɵnextContext(); return ctx_r34.show($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("count", ctx_r2.images.length)("active", ctx_r2.selectedIndex);
} }
function NgxGalleryImageComponent_ngx_gallery_arrows_4_Template(rf, ctx) { if (rf & 1) {
    const _r37 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-arrows", 14);
    ɵngcc0.ɵɵlistener("prevClick", function NgxGalleryImageComponent_ngx_gallery_arrows_4_Template_ngx_gallery_arrows_prevClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r37); const ctx_r36 = ɵngcc0.ɵɵnextContext(); return ctx_r36.showPrev(); })("nextClick", function NgxGalleryImageComponent_ngx_gallery_arrows_4_Template_ngx_gallery_arrows_nextClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r37); const ctx_r38 = ɵngcc0.ɵɵnextContext(); return ctx_r38.showNext(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-image-size-", ctx_r3.size, "");
    ɵngcc0.ɵɵproperty("prevDisabled", !ctx_r3.canShowPrev())("nextDisabled", !ctx_r3.canShowNext())("arrowPrevIcon", ctx_r3.arrowPrevIcon)("arrowNextIcon", ctx_r3.arrowNextIcon);
} }
const _c2 = function (a0, a1) { return { "ngx-gallery-active": a0, "ngx-gallery-clickable": a1 }; };
function NgxGalleryThumbnailsComponent_a_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 9);
} if (rf & 2) {
    const ctx_r8 = ɵngcc0.ɵɵnextContext();
    const image_r2 = ctx_r8.$implicit;
    const i_r3 = ctx_r8.index;
    const ctx_r4 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("background-image", ctx_r4.getSafeUrl(image_r2));
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(3, _c2, i_r3 == ctx_r4.selectedIndex, ctx_r4.clickable));
} }
function NgxGalleryThumbnailsComponent_a_2_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 10);
    ɵngcc0.ɵɵelementStart(1, "video", 11);
    ɵngcc0.ɵɵelement(2, "source", 12);
    ɵngcc0.ɵɵtext(3, " Your browser does not support the video tag. ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = ɵngcc0.ɵɵnextContext();
    const i_r3 = ctx_r9.index;
    const image_r2 = ctx_r9.$implicit;
    const ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(2, _c2, i_r3 == ctx_r5.selectedIndex, ctx_r5.clickable));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("src", image_r2, ɵngcc0.ɵɵsanitizeUrl);
} }
function NgxGalleryThumbnailsComponent_a_2_ngx_gallery_action_4_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-action", 13);
    ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryThumbnailsComponent_a_2_ngx_gallery_action_4_Template_ngx_gallery_action_closeClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r13); const action_r10 = ctx.$implicit; const i_r3 = ɵngcc0.ɵɵnextContext().index; return action_r10.onClick($event, i_r3); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r10 = ctx.$implicit;
    ɵngcc0.ɵɵproperty("icon", action_r10.icon)("disabled", action_r10.disabled)("titleText", action_r10.titleText);
} }
function NgxGalleryThumbnailsComponent_a_2_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 14);
    ɵngcc0.ɵɵelementStart(1, "span", 15);
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1("+", ctx_r7.remainingCountValue, "");
} }
function NgxGalleryThumbnailsComponent_a_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "a", 3);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryThumbnailsComponent_a_2_Template_a_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r15); const i_r3 = ctx.index; const ctx_r14 = ɵngcc0.ɵɵnextContext(); return ctx_r14.handleClick($event, i_r3); });
    ɵngcc0.ɵɵtemplate(1, NgxGalleryThumbnailsComponent_a_2_div_1_Template, 1, 6, "div", 4);
    ɵngcc0.ɵɵtemplate(2, NgxGalleryThumbnailsComponent_a_2_div_2_Template, 4, 5, "div", 5);
    ɵngcc0.ɵɵelementStart(3, "div", 6);
    ɵngcc0.ɵɵtemplate(4, NgxGalleryThumbnailsComponent_a_2_ngx_gallery_action_4_Template, 1, 3, "ngx-gallery-action", 7);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(5, NgxGalleryThumbnailsComponent_a_2_div_5_Template, 3, 1, "div", 8);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("width", ctx_r0.getThumbnailWidth())("height", ctx_r0.getThumbnailHeight())("left", ctx_r0.getThumbnailLeft(i_r3))("top", ctx_r0.getThumbnailTop(i_r3));
    ɵngcc0.ɵɵproperty("href", ctx_r0.hasLink(i_r3) ? ctx_r0.links[i_r3] : "#", ɵngcc0.ɵɵsanitizeUrl)("target", ctx_r0.linkTarget)("ngClass", ɵngcc0.ɵɵpureFunction2(16, _c2, i_r3 == ctx_r0.selectedIndex, ctx_r0.clickable));
    ɵngcc0.ɵɵattribute("aria-label", ctx_r0.labels[i_r3]);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.getFileType(image_r2) == "image");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.getFileType(image_r2) == "video");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngForOf", ctx_r0.actions);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r0.remainingCount && ctx_r0.remainingCountValue && i_r3 == ctx_r0.rows * ctx_r0.columns - 1);
} }
function NgxGalleryThumbnailsComponent_ngx_gallery_arrows_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-arrows", 16);
    ɵngcc0.ɵɵlistener("prevClick", function NgxGalleryThumbnailsComponent_ngx_gallery_arrows_3_Template_ngx_gallery_arrows_prevClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r16 = ɵngcc0.ɵɵnextContext(); return ctx_r16.moveLeft(); })("nextClick", function NgxGalleryThumbnailsComponent_ngx_gallery_arrows_3_Template_ngx_gallery_arrows_nextClick_0_listener() { ɵngcc0.ɵɵrestoreView(_r17); const ctx_r18 = ɵngcc0.ɵɵnextContext(); return ctx_r18.moveRight(); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("prevDisabled", !ctx_r1.canMoveLeft())("nextDisabled", !ctx_r1.canMoveRight())("arrowPrevIcon", ctx_r1.arrowPrevIcon)("arrowNextIcon", ctx_r1.arrowNextIcon);
} }
function NgxGalleryComponent_ngx_gallery_image_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-image", 3);
    ɵngcc0.ɵɵlistener("imageClick", function NgxGalleryComponent_ngx_gallery_image_1_Template_ngx_gallery_image_imageClick_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r2 = ɵngcc0.ɵɵnextContext(); return ctx_r2.openPreview($event); })("activeChange", function NgxGalleryComponent_ngx_gallery_image_1_Template_ngx_gallery_image_activeChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r3); const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.selectFromImage($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("height", ctx_r0.getImageHeight());
    ɵngcc0.ɵɵproperty("images", ctx_r0.mediumImages)("clickable", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.preview)("selectedIndex", ctx_r0.selectedIndex)("arrows", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageArrows)("arrowsAutoHide", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageArrowsAutoHide)("arrowPrevIcon", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.arrowPrevIcon)("arrowNextIcon", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.arrowNextIcon)("swipe", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageSwipe)("animation", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageAnimation)("size", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageSize)("autoPlay", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageAutoPlay)("autoPlayInterval", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageAutoPlayInterval)("autoPlayPauseOnHover", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageAutoPlayPauseOnHover)("infinityMove", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageInfinityMove)("lazyLoading", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.lazyLoading)("actions", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageActions)("descriptions", ctx_r0.descriptions)("showDescription", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageDescription)("bullets", ctx_r0.currentOptions == null ? null : ctx_r0.currentOptions.imageBullets);
} }
const _c3 = function () { return []; };
function NgxGalleryComponent_ngx_gallery_thumbnails_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ngx-gallery-thumbnails", 4);
    ɵngcc0.ɵɵlistener("activeChange", function NgxGalleryComponent_ngx_gallery_thumbnails_2_Template_ngx_gallery_thumbnails_activeChange_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r6); const ctx_r5 = ɵngcc0.ɵɵnextContext(); return ctx_r5.selectFromThumbnails($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵstyleProp("margin-top", ctx_r1.getThumbnailsMarginTop())("margin-bottom", ctx_r1.getThumbnailsMarginBottom())("height", ctx_r1.getThumbnailsHeight());
    ɵngcc0.ɵɵproperty("images", ctx_r1.smallImages)("links", (ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsAsLinks) ? ctx_r1.links : ɵngcc0.ɵɵpureFunction0(27, _c3))("labels", ctx_r1.labels)("linkTarget", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.linkTarget)("selectedIndex", ctx_r1.selectedIndex)("columns", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsColumns)("rows", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsRows)("margin", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailMargin)("arrows", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsArrows)("arrowsAutoHide", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsArrowsAutoHide)("arrowPrevIcon", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.arrowPrevIcon)("arrowNextIcon", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.arrowNextIcon)("clickable", (ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.image) || (ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.preview))("swipe", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsSwipe)("size", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailSize)("moveSize", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsMoveSize)("order", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsOrder)("remainingCount", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailsRemainingCount)("lazyLoading", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.lazyLoading)("actions", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailActions)("ngClass", ctx_r1.currentOptions == null ? null : ctx_r1.currentOptions.thumbnailClasses);
} }
const _c4 = function (a0) { return { "ngx-gallery-active": a0 }; };
function NgxGalleryBulletsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵlistener("click", function NgxGalleryBulletsComponent_div_0_Template_div_click_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); const i_r2 = ctx.index; const ctx_r3 = ɵngcc0.ɵɵnextContext(); return ctx_r3.handleChange($event, i_r2); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r2 = ctx.index;
    const ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction1(1, _c4, i_r2 == ctx_r0.active));
} }
let NgxGalleryService = class NgxGalleryService {
    constructor(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    manageSwipe(status, element, id, nextHandler, prevHandler) {
        const handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', () => nextHandler()),
                    this.renderer.listen(element.nativeElement, 'swiperight', () => prevHandler())
                ]);
            }
            else if (!status && handlers) {
                handlers.map((handler) => handler());
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) {
        }
    }
    validateUrl(url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    }
    getBackgroundUrl(image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    }
    getFileType(fileSource) {
        const fileExtension = fileSource.split('.').pop().toLowerCase();
        if (fileExtension === 'avi' || fileExtension === 'flv'
            || fileExtension === 'wmv' || fileExtension === 'mov'
            || fileExtension === 'mp4') {
            return 'video';
        }
        return 'image';
    }
    getSwipeHandlers(id) {
        return this.swipeHandlers.get(id);
    }
    removeSwipeHandlers(id) {
        this.swipeHandlers.delete(id);
    }
};
NgxGalleryService.ɵfac = function NgxGalleryService_Factory(t) { return new (t || NgxGalleryService)(ɵngcc0.ɵɵinject(ɵngcc0.Renderer2)); };
NgxGalleryService.ctorParameters = () => [
    { type: Renderer2 }
];
NgxGalleryService.ɵprov = ɵɵdefineInjectable({ factory: function NgxGalleryService_Factory() { return new NgxGalleryService(ɵɵinject(Renderer2)); }, token: NgxGalleryService, providedIn: "root" });

let NgxGalleryPreviewComponent = class NgxGalleryPreviewComponent {
    constructor(sanitization, elementRef, helperService, renderer, changeDetectorRef) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.showSpinner = false;
        this.positionLeft = 0;
        this.positionTop = 0;
        this.zoomValue = 1;
        this.loading = false;
        this.rotateValue = 0;
        this.index = 0;
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.activeChange = new EventEmitter();
        this.isOpen = false;
        this.initialX = 0;
        this.initialY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.isMove = false;
    }
    ngOnInit() {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
    }
    ngOnChanges(changes) {
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', () => this.showNext(), () => this.showPrev());
        }
    }
    ngOnDestroy() {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }
    onMouseEnter() {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
    }
    onMouseLeave() {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
    }
    onKeyDown(e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                }
                else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    }
    open(index) {
        this.previewOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listen('window', 'keydown', (e) => this.onKeyDown(e));
    }
    close() {
        this.isOpen = false;
        this.closeFullscreen();
        this.previewClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    }
    imageMouseEnter() {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }
    imageMouseLeave() {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }
    startAutoPlay() {
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(() => {
                if (!this.showNext()) {
                    this.index = -1;
                    this.showNext();
                }
            }, this.autoPlayInterval);
        }
    }
    stopAutoPlay() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    showAtIndex(index) {
        this.index = index;
        this.show();
    }
    showNext() {
        if (this.canShowNext()) {
            this.index++;
            if (this.index === this.images.length) {
                this.index = 0;
            }
            this.show();
            return true;
        }
        else {
            return false;
        }
    }
    showPrev() {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.images.length - 1;
            }
            this.show();
        }
    }
    canShowNext() {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index < this.images.length - 1;
        }
        else {
            return false;
        }
    }
    canShowPrev() {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index > 0;
        }
        else {
            return false;
        }
    }
    manageFullscreen() {
        if (this.fullscreen || this.forceFullscreen) {
            const doc = document;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    }
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustUrl(image);
    }
    getFileType(fileSource) {
        return this.helperService.getFileType(fileSource);
    }
    zoomIn() {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    }
    zoomOut() {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    }
    rotateLeft() {
        this.rotateValue -= 90;
    }
    rotateRight() {
        this.rotateValue += 90;
    }
    getTransform() {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    }
    canZoomIn() {
        return this.zoomValue < this.zoomMax;
    }
    canZoomOut() {
        return this.zoomValue > this.zoomMin;
    }
    canDragOnZoom() {
        return this.zoom && this.zoomValue > 1;
    }
    mouseDownHandler(e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    }
    mouseUpHandler(e) {
        this.isMove = false;
    }
    mouseMoveHandler(e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    }
    getClientX(e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    }
    getClientY(e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    }
    resetPosition() {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    }
    isKeyboardNext(e) {
        return e.keyCode === 39;
    }
    isKeyboardPrev(e) {
        return e.keyCode === 37;
    }
    isKeyboardEsc(e) {
        return e.keyCode === 27;
    }
    openFullscreen() {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    closeFullscreen() {
        if (this.isFullscreen()) {
            const doc = document;
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
    }
    isFullscreen() {
        const doc = document;
        return doc.fullscreenElement || doc.webkitFullscreenElement
            || doc.mozFullScreenElement || doc.msFullscreenElement;
    }
    show(first = false) {
        this.loading = true;
        this.stopAutoPlay();
        this.activeChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(() => this._show(), 600);
        }
    }
    _show() {
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.getSafeUrl(this.images[this.index]);
        this.type = this.getFileType(this.images[this.index]);
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        this.changeDetectorRef.markForCheck();
        setTimeout(() => {
            if (this.isLoaded(this.previewImage.nativeElement) || this.type === 'video') {
                this.loading = false;
                this.startAutoPlay();
                this.changeDetectorRef.markForCheck();
            }
            else if (this.type === 'video') {
            }
            else {
                setTimeout(() => {
                    if (this.loading) {
                        this.showSpinner = true;
                        this.changeDetectorRef.markForCheck();
                    }
                });
                this.previewImage.nativeElement.onload = () => {
                    this.loading = false;
                    this.showSpinner = false;
                    this.previewImage.nativeElement.onload = null;
                    this.startAutoPlay();
                    this.changeDetectorRef.markForCheck();
                };
            }
        });
    }
    isLoaded(img) {
        if (!img.complete) {
            return false;
        }
        return !(typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0);
    }
};
NgxGalleryPreviewComponent.ɵfac = function NgxGalleryPreviewComponent_Factory(t) { return new (t || NgxGalleryPreviewComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(NgxGalleryService), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef)); };
NgxGalleryPreviewComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryPreviewComponent, selectors: [["ngx-gallery-preview"]], viewQuery: function NgxGalleryPreviewComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.previewImage = _t.first);
    } }, hostBindings: function NgxGalleryPreviewComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mouseenter", function NgxGalleryPreviewComponent_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function NgxGalleryPreviewComponent_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } }, inputs: { arrows: "arrows", images: "images", descriptions: "descriptions", showDescription: "showDescription", arrowsAutoHide: "arrowsAutoHide", swipe: "swipe", fullscreen: "fullscreen", forceFullscreen: "forceFullscreen", closeOnClick: "closeOnClick", closeOnEsc: "closeOnEsc", keyboardNavigation: "keyboardNavigation", arrowPrevIcon: "arrowPrevIcon", arrowNextIcon: "arrowNextIcon", closeIcon: "closeIcon", fullscreenIcon: "fullscreenIcon", spinnerIcon: "spinnerIcon", autoPlay: "autoPlay", autoPlayInterval: "autoPlayInterval", autoPlayPauseOnHover: "autoPlayPauseOnHover", infinityMove: "infinityMove", zoom: "zoom", zoomStep: "zoomStep", zoomMax: "zoomMax", zoomMin: "zoomMin", zoomInIcon: "zoomInIcon", zoomOutIcon: "zoomOutIcon", animation: "animation", actions: "actions", rotate: "rotate", rotateLeftIcon: "rotateLeftIcon", rotateRightIcon: "rotateRightIcon", download: "download", downloadIcon: "downloadIcon", bullets: "bullets" }, outputs: { previewOpen: "previewOpen", previewClose: "previewClose", activeChange: "activeChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 19, vars: 18, consts: [[3, "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick", 4, "ngIf"], [1, "ngx-gallery-preview-top"], [1, "ngx-gallery-preview-icons"], [3, "icon", "disabled", "titleText", "closeClick", 4, "ngFor", "ngForOf"], ["class", "ngx-gallery-icon", "aria-hidden", "true", "download", "", 3, "href", 4, "ngIf"], [3, "icon", "disabled", "closeClick", 4, "ngIf"], [3, "icon", "closeClick", 4, "ngIf"], [3, "icon", "closeClick"], [1, "ngx-spinner-wrapper", "ngx-gallery-center"], ["aria-hidden", "true"], [1, "ngx-gallery-preview-wrapper", 3, "click", "mouseup", "mousemove", "touchend", "touchmove"], [1, "ngx-gallery-preview-img-wrapper"], ["class", "ngx-gallery-preview-img ngx-gallery-center", 3, "src", "ngx-gallery-active", "animation", "ngx-gallery-grab", "transform", "left", "top", "click", "mouseenter", "mouseleave", "mousedown", "touchstart", 4, "ngIf"], ["controls", "", "style", "width: 100%; height: 100%;", "class", "ngx-gallery-preview-img ngx-gallery-center", 3, "ngx-gallery-active", "animation", "ngx-gallery-grab", "transform", "left", "top", "click", "mouseenter", "mouseleave", "mousedown", "touchstart", 4, "ngIf"], [3, "count", "active", "bulletChange", 4, "ngIf"], ["class", "ngx-gallery-preview-text", 3, "innerHTML", "click", 4, "ngIf"], [3, "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick"], [3, "icon", "disabled", "titleText", "closeClick"], ["aria-hidden", "true", "download", "", 1, "ngx-gallery-icon", 3, "href"], [3, "icon", "disabled", "closeClick"], [1, "ngx-gallery-preview-img", "ngx-gallery-center", 3, "src", "click", "mouseenter", "mouseleave", "mousedown", "touchstart"], ["previewImage", ""], ["controls", "", 1, "ngx-gallery-preview-img", "ngx-gallery-center", 2, "width", "100%", "height", "100%", 3, "click", "mouseenter", "mouseleave", "mousedown", "touchstart"], [3, "src"], [3, "count", "active", "bulletChange"], [1, "ngx-gallery-preview-text", 3, "innerHTML", "click"]], template: function NgxGalleryPreviewComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NgxGalleryPreviewComponent_ngx_gallery_arrows_0_Template, 1, 4, "ngx-gallery-arrows", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, NgxGalleryPreviewComponent_ngx_gallery_action_3_Template, 1, 3, "ngx-gallery-action", 3);
        ɵngcc0.ɵɵtemplate(4, NgxGalleryPreviewComponent_a_4_Template, 2, 4, "a", 4);
        ɵngcc0.ɵɵtemplate(5, NgxGalleryPreviewComponent_ngx_gallery_action_5_Template, 1, 2, "ngx-gallery-action", 5);
        ɵngcc0.ɵɵtemplate(6, NgxGalleryPreviewComponent_ngx_gallery_action_6_Template, 1, 2, "ngx-gallery-action", 5);
        ɵngcc0.ɵɵtemplate(7, NgxGalleryPreviewComponent_ngx_gallery_action_7_Template, 1, 1, "ngx-gallery-action", 6);
        ɵngcc0.ɵɵtemplate(8, NgxGalleryPreviewComponent_ngx_gallery_action_8_Template, 1, 1, "ngx-gallery-action", 6);
        ɵngcc0.ɵɵtemplate(9, NgxGalleryPreviewComponent_ngx_gallery_action_9_Template, 1, 1, "ngx-gallery-action", 6);
        ɵngcc0.ɵɵelementStart(10, "ngx-gallery-action", 7);
        ɵngcc0.ɵɵlistener("closeClick", function NgxGalleryPreviewComponent_Template_ngx_gallery_action_closeClick_10_listener() { return ctx.close(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(11, "div", 8);
        ɵngcc0.ɵɵelement(12, "i", 9);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(13, "div", 10);
        ɵngcc0.ɵɵlistener("click", function NgxGalleryPreviewComponent_Template_div_click_13_listener() { return ctx.closeOnClick && ctx.close(); })("mouseup", function NgxGalleryPreviewComponent_Template_div_mouseup_13_listener($event) { return ctx.mouseUpHandler($event); })("mousemove", function NgxGalleryPreviewComponent_Template_div_mousemove_13_listener($event) { return ctx.mouseMoveHandler($event); })("touchend", function NgxGalleryPreviewComponent_Template_div_touchend_13_listener($event) { return ctx.mouseUpHandler($event); })("touchmove", function NgxGalleryPreviewComponent_Template_div_touchmove_13_listener($event) { return ctx.mouseMoveHandler($event); });
        ɵngcc0.ɵɵelementStart(14, "div", 11);
        ɵngcc0.ɵɵtemplate(15, NgxGalleryPreviewComponent_img_15_Template, 2, 13, "img", 12);
        ɵngcc0.ɵɵtemplate(16, NgxGalleryPreviewComponent_video_16_Template, 4, 13, "video", 13);
        ɵngcc0.ɵɵtemplate(17, NgxGalleryPreviewComponent_ngx_gallery_bullets_17_Template, 1, 2, "ngx-gallery-bullets", 14);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(18, NgxGalleryPreviewComponent_div_18_Template, 1, 1, "div", 15);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.arrows);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.actions);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.download && ctx.src);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.zoom);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.zoom);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.rotate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.rotate);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.fullscreen);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("icon", "ngx-gallery-close " + ctx.closeIcon);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("ngx-gallery-active", ctx.showSpinner);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-icon ngx-gallery-spinner ", ctx.spinnerIcon, "");
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngIf", ctx.src && ctx.type == "image");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.src && ctx.type == "video");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.bullets);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.showDescription && ctx.description);
    } }, directives: function () { return [ɵngcc2.NgIf, ɵngcc2.NgForOf, NgxGalleryActionComponent, NgxGalleryArrowsComponent, NgxGalleryBulletsComponent]; }, styles: [".ngx-gallery-active[_nghost-%COMP%]{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block;font-size:50px!important}[_nghost-%COMP%]{display:none;font-size:50px!important}[_nghost-%COMP%]   .ngx-gallery-arrow[_ngcontent-%COMP%]{font-size:50px!important}ngx-gallery-bullets[_ngcontent-%COMP%]{height:5%;align-items:center;padding:0}.ngx-gallery-preview-img[_ngcontent-%COMP%]{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s}.ngx-gallery-preview-img.animation[_ngcontent-%COMP%]{transition:opacity .5s linear,transform .5s}.ngx-gallery-preview-img.ngx-gallery-active[_ngcontent-%COMP%]{opacity:1}.ngx-gallery-preview-img.ngx-gallery-grab[_ngcontent-%COMP%]{cursor:-webkit-grab;cursor:grab}.ngx-gallery-icon.ngx-gallery-spinner[_ngcontent-%COMP%]{font-size:50px;left:0;display:inline-block}[_nghost-%COMP%]   .ngx-gallery-preview-top[_ngcontent-%COMP%]{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:25px}.ngx-gallery-preview-icons[_ngcontent-%COMP%]{float:right}.ngx-gallery-preview-icons[_ngcontent-%COMP%]   .ngx-gallery-icon[_ngcontent-%COMP%]{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-preview-icons[_ngcontent-%COMP%]   .ngx-gallery-icon.ngx-gallery-icon-disabled[_ngcontent-%COMP%]{cursor:default;opacity:.4}.ngx-spinner-wrapper[_ngcontent-%COMP%]{width:50px;height:50px;display:none}.ngx-spinner-wrapper.ngx-gallery-active[_ngcontent-%COMP%]{display:inline-block}.ngx-gallery-center[_ngcontent-%COMP%]{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.ngx-gallery-preview-text[_ngcontent-%COMP%]{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.ngx-gallery-preview-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;flex-flow:column}.ngx-gallery-preview-img-wrapper[_ngcontent-%COMP%]{flex:1 1 auto;position:relative}"], changeDetection: 0 });
NgxGalleryPreviewComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NgxGalleryService },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "images", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "descriptions", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "showDescription", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "arrows", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "arrowsAutoHide", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "swipe", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "fullscreen", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "forceFullscreen", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "closeOnClick", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "closeOnEsc", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "keyboardNavigation", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "arrowPrevIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "arrowNextIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "closeIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "fullscreenIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "spinnerIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "autoPlay", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "autoPlayInterval", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "autoPlayPauseOnHover", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "infinityMove", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoom", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoomStep", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoomMax", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoomMin", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoomInIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "zoomOutIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "animation", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "actions", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "rotate", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "rotateLeftIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "rotateRightIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "download", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "downloadIcon", void 0);
__decorate([
    Input()
], NgxGalleryPreviewComponent.prototype, "bullets", void 0);
__decorate([
    Output()
], NgxGalleryPreviewComponent.prototype, "previewOpen", void 0);
__decorate([
    Output()
], NgxGalleryPreviewComponent.prototype, "previewClose", void 0);
__decorate([
    Output()
], NgxGalleryPreviewComponent.prototype, "activeChange", void 0);
__decorate([
    ViewChild('previewImage')
], NgxGalleryPreviewComponent.prototype, "previewImage", void 0);
__decorate([
    HostListener('mouseenter')
], NgxGalleryPreviewComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], NgxGalleryPreviewComponent.prototype, "onMouseLeave", null);

class NgxGalleryAnimation {
}
NgxGalleryAnimation.Fade = 'fade';
NgxGalleryAnimation.Slide = 'slide';
NgxGalleryAnimation.Rotate = 'rotate';
NgxGalleryAnimation.Zoom = 'zoom';

let NgxGalleryImageComponent = class NgxGalleryImageComponent {
    constructor(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.imageClick = new EventEmitter();
        this.activeChange = new EventEmitter();
        this.canChangeImage = true;
    }
    // @HostBinding('style.display') public display = 'inline-block';
    // @HostBinding('style.background-color') public color = 'lime';
    ngOnInit() {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    }
    ngOnChanges(changes) {
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', () => this.showNext(), () => this.showPrev());
        }
    }
    onMouseEnter() {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    }
    onMouseLeave() {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    }
    reset(index) {
        this.selectedIndex = index;
    }
    getImages() {
        if (!this.images) {
            return [];
        }
        if (this.lazyLoading) {
            const indexes = [this.selectedIndex];
            const prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes.push(this.images.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes.push(prevIndex);
            }
            const nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.images.length && this.infinityMove) {
                indexes.push(0);
            }
            else if (nextIndex < this.images.length) {
                indexes.push(nextIndex);
            }
            return this.images.filter((img, i) => indexes.indexOf(i) !== -1);
        }
        else {
            return this.images;
        }
    }
    startAutoPlay() {
        this.stopAutoPlay();
        this.timer = setInterval(() => {
            if (!this.showNext()) {
                this.selectedIndex = -1;
                this.showNext();
            }
        }, this.autoPlayInterval);
    }
    stopAutoPlay() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    handleClick(event, index) {
        if (this.clickable) {
            this.imageClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    show(index) {
        this.selectedIndex = index;
        this.activeChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    }
    showNext() {
        if (this.canShowNext() && this.canChangeImage) {
            this.selectedIndex++;
            if (this.selectedIndex === this.images.length) {
                this.selectedIndex = 0;
            }
            this.activeChange.emit(this.selectedIndex);
            this.setChangeTimeout();
            return true;
        }
        else {
            return false;
        }
    }
    showPrev() {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.images.length - 1;
            }
            this.activeChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    }
    setChangeTimeout() {
        this.canChangeImage = false;
        let timeout = 1000;
        if (this.animation === NgxGalleryAnimation.Slide
            || this.animation === NgxGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(() => {
            this.canChangeImage = true;
        }, timeout);
    }
    canShowNext() {
        if (this.images) {
            return this.infinityMove || this.selectedIndex < this.images.length - 1;
        }
        else {
            return false;
        }
    }
    canShowPrev() {
        if (this.images) {
            return this.infinityMove || this.selectedIndex > 0;
        }
        else {
            return false;
        }
    }
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
    getFileType(fileSource) {
        return this.helperService.getFileType(fileSource);
    }
};
NgxGalleryImageComponent.ɵfac = function NgxGalleryImageComponent_Factory(t) { return new (t || NgxGalleryImageComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(NgxGalleryService)); };
NgxGalleryImageComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryImageComponent, selectors: [["ngx-gallery-image"]], hostBindings: function NgxGalleryImageComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mouseenter", function NgxGalleryImageComponent_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function NgxGalleryImageComponent_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } }, inputs: { arrows: "arrows", selectedIndex: "selectedIndex", images: "images", clickable: "clickable", arrowsAutoHide: "arrowsAutoHide", swipe: "swipe", animation: "animation", size: "size", arrowPrevIcon: "arrowPrevIcon", arrowNextIcon: "arrowNextIcon", autoPlay: "autoPlay", autoPlayInterval: "autoPlayInterval", autoPlayPauseOnHover: "autoPlayPauseOnHover", infinityMove: "infinityMove", lazyLoading: "lazyLoading", actions: "actions", descriptions: "descriptions", showDescription: "showDescription", bullets: "bullets" }, outputs: { imageClick: "imageClick", activeChange: "activeChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 5, vars: 8, consts: [[4, "ngFor", "ngForOf"], [3, "count", "active", "bulletChange", 4, "ngIf"], [3, "class", "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick", 4, "ngIf"], ["class", "ngx-gallery-image", 3, "ngClass", "background-image", "click", 4, "ngIf"], [1, "ngx-gallery-image", 3, "ngClass", "click"], [1, "ngx-gallery-icons-wrapper"], [3, "icon", "disabled", "titleText", "closeClick", 4, "ngFor", "ngForOf"], ["class", "ngx-gallery-image-text", 3, "innerHTML", "click", 4, "ngIf"], [3, "icon", "disabled", "titleText", "closeClick"], [1, "ngx-gallery-image-text", 3, "innerHTML", "click"], ["class", "ngx-gallery-image", 3, "ngClass", "click", 4, "ngIf"], ["controls", "", 2, "width", "100%", "height", "100%", "background", "#000"], [3, "src"], [3, "count", "active", "bulletChange"], [3, "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick"]], template: function NgxGalleryImageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div");
        ɵngcc0.ɵɵtemplate(1, NgxGalleryImageComponent_div_1_Template, 2, 1, "div", 0);
        ɵngcc0.ɵɵtemplate(2, NgxGalleryImageComponent_div_2_Template, 2, 1, "div", 0);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(3, NgxGalleryImageComponent_ngx_gallery_bullets_3_Template, 1, 2, "ngx-gallery-bullets", 1);
        ɵngcc0.ɵɵtemplate(4, NgxGalleryImageComponent_ngx_gallery_arrows_4_Template, 1, 7, "ngx-gallery-arrows", 2);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMapInterpolate2("ngx-gallery-image-wrapper ngx-gallery-animation-", ctx.animation, " ngx-gallery-image-size-", ctx.size, "");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.getImages());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.getImages());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.bullets);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.arrows);
    } }, directives: function () { return [ɵngcc2.NgForOf, ɵngcc2.NgIf, ɵngcc2.NgClass, NgxGalleryActionComponent, NgxGalleryBulletsComponent, NgxGalleryArrowsComponent]; }, styles: ["[_nghost-%COMP%]{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-image-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.ngx-gallery-image[_ngcontent-%COMP%]{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.ngx-gallery-image-size-cover[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{background-size:cover}.ngx-gallery-image-size-contain[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{background-size:contain}.ngx-gallery-animation-fade[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{left:0;opacity:0;transition:.5s ease-in-out}.ngx-gallery-animation-fade[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-active[_ngcontent-%COMP%]{opacity:1}.ngx-gallery-animation-slide[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{transition:.5s ease-in-out}.ngx-gallery-animation-slide[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-active[_ngcontent-%COMP%]{transform:translateX(0)}.ngx-gallery-animation-slide[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-inactive-left[_ngcontent-%COMP%]{transform:translateX(-100%)}.ngx-gallery-animation-slide[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-inactive-right[_ngcontent-%COMP%]{transform:translateX(100%)}.ngx-gallery-animation-rotate[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{transition:1s;transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.ngx-gallery-animation-rotate[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-active[_ngcontent-%COMP%]{transform:scale(1,1) rotate(0);opacity:1}.ngx-gallery-animation-zoom[_ngcontent-%COMP%]   .ngx-gallery-image[_ngcontent-%COMP%]{transition:1s;transform:scale(2.5,2.5);left:0;opacity:0}.ngx-gallery-animation-zoom[_ngcontent-%COMP%]   .ngx-gallery-image.ngx-gallery-active[_ngcontent-%COMP%]{transform:scale(1,1);opacity:1}.ngx-gallery-image-text[_ngcontent-%COMP%]{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"], changeDetection: 0 });
NgxGalleryImageComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NgxGalleryService }
];
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "images", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "clickable", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "selectedIndex", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "arrows", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "arrowsAutoHide", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "swipe", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "animation", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "size", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "arrowPrevIcon", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "arrowNextIcon", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "autoPlay", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "autoPlayInterval", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "autoPlayPauseOnHover", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "infinityMove", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "lazyLoading", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "actions", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "descriptions", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "showDescription", void 0);
__decorate([
    Input()
], NgxGalleryImageComponent.prototype, "bullets", void 0);
__decorate([
    Output()
], NgxGalleryImageComponent.prototype, "imageClick", void 0);
__decorate([
    Output()
], NgxGalleryImageComponent.prototype, "activeChange", void 0);
__decorate([
    HostListener('mouseenter')
], NgxGalleryImageComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], NgxGalleryImageComponent.prototype, "onMouseLeave", null);

class NgxGalleryOrder {
}
NgxGalleryOrder.Column = 1;
NgxGalleryOrder.Row = 2;
NgxGalleryOrder.Page = 3;

let NgxGalleryThumbnailsComponent = class NgxGalleryThumbnailsComponent {
    constructor(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.activeChange = new EventEmitter();
        this.index = 0;
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.selectedIndex) {
            this.validateIndex();
        }
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', () => this.moveRight(), () => this.moveLeft());
        }
        if (this.images) {
            this.remainingCountValue = this.images.length - (this.rows * this.columns);
        }
    }
    onMouseEnter() {
        this.mouseenter = true;
    }
    onMouseLeave() {
        this.mouseenter = false;
    }
    reset(index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    }
    getImages() {
        if (!this.images) {
            return [];
        }
        if (this.remainingCount) {
            return this.images.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NgxGalleryOrder.Row) {
            let stopIndex = 0;
            if (this.order === NgxGalleryOrder.Column) {
                stopIndex = (this.index + this.columns + this.moveSize) * this.rows;
            }
            else if (this.order === NgxGalleryOrder.Page) {
                stopIndex = this.index + ((this.columns * this.rows) * 2);
            }
            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            }
            else {
                this.minStopIndex = stopIndex;
            }
            return this.images.slice(0, stopIndex);
        }
        else {
            return this.images;
        }
    }
    handleClick(event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.activeChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    hasLink(index) {
        if (this.links && this.links.length && this.links[index]) {
            return true;
        }
    }
    moveRight() {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            const maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    }
    moveLeft() {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    }
    canMoveRight() {
        return this.index + this.columns < this.getMaxIndex();
    }
    canMoveLeft() {
        return this.index !== 0;
    }
    getThumbnailLeft(index) {
        let calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        }
        else if (this.order === NgxGalleryOrder.Page) {
            calculatedIndex = (index % this.columns) + (Math.floor(index / (this.rows * this.columns)) * this.columns);
        }
        else if (this.order === NgxGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = index % this.columns;
        }
        else {
            calculatedIndex = index % Math.ceil(this.images.length / this.rows);
        }
        return this.getThumbnailPosition(calculatedIndex, this.columns);
    }
    getThumbnailTop(index) {
        let calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        }
        else if (this.order === NgxGalleryOrder.Page) {
            calculatedIndex = Math.floor(index / this.columns) - (Math.floor(index / (this.rows * this.columns)) * this.rows);
        }
        else if (this.order === NgxGalleryOrder.Row && this.remainingCount) {
            calculatedIndex = Math.floor(index / this.columns);
        }
        else {
            calculatedIndex = Math.floor(index / Math.ceil(this.images.length / this.rows));
        }
        return this.getThumbnailPosition(calculatedIndex, this.rows);
    }
    getThumbnailWidth() {
        return this.getThumbnailDimension(this.columns);
    }
    getThumbnailHeight() {
        return this.getThumbnailDimension(this.rows);
    }
    setThumbnailsPosition() {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    }
    setDefaultPosition() {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    }
    canShowArrows() {
        if (this.remainingCount) {
            return false;
        }
        else {
            return this.arrows && this.images && this.images.length > this.getVisibleCount()
                && (!this.arrowsAutoHide || this.mouseenter);
        }
    }
    validateIndex() {
        if (this.images) {
            let newIndex;
            if (this.order === NgxGalleryOrder.Column) {
                newIndex = Math.floor(this.selectedIndex / this.rows);
            }
            else {
                newIndex = this.selectedIndex % Math.ceil(this.images.length / this.rows);
            }
            if (this.remainingCount) {
                newIndex = 0;
            }
            if (newIndex < this.index || newIndex >= this.index + this.columns) {
                const maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    }
    getSafeUrl(image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    }
    getFileType(fileSource) {
        return this.helperService.getFileType(fileSource);
    }
    getThumbnailPosition(index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    }
    getThumbnailDimension(count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    }
    getMaxIndex() {
        if (this.order === NgxGalleryOrder.Page) {
            let maxIndex = (Math.floor(this.images.length / this.getVisibleCount()) * this.columns);
            if (this.images.length % this.getVisibleCount() > this.columns) {
                maxIndex += this.columns;
            }
            else {
                maxIndex += this.images.length % this.getVisibleCount();
            }
            return maxIndex;
        }
        else {
            return Math.ceil(this.images.length / this.rows);
        }
    }
    getVisibleCount() {
        return this.columns * this.rows;
    }
    getSafeStyle(value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    }
};
NgxGalleryThumbnailsComponent.ɵfac = function NgxGalleryThumbnailsComponent_Factory(t) { return new (t || NgxGalleryThumbnailsComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.DomSanitizer), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(NgxGalleryService)); };
NgxGalleryThumbnailsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryThumbnailsComponent, selectors: [["ngx-gallery-thumbnails"]], hostBindings: function NgxGalleryThumbnailsComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mouseenter", function NgxGalleryThumbnailsComponent_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function NgxGalleryThumbnailsComponent_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } }, inputs: { selectedIndex: "selectedIndex", images: "images", links: "links", labels: "labels", linkTarget: "linkTarget", columns: "columns", rows: "rows", arrows: "arrows", arrowsAutoHide: "arrowsAutoHide", margin: "margin", clickable: "clickable", swipe: "swipe", size: "size", arrowPrevIcon: "arrowPrevIcon", arrowNextIcon: "arrowNextIcon", moveSize: "moveSize", order: "order", remainingCount: "remainingCount", lazyLoading: "lazyLoading", actions: "actions" }, outputs: { activeChange: "activeChange" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 4, vars: 9, consts: [[1, "ngx-gallery-thumbnails"], ["class", "ngx-gallery-thumbnail", 3, "href", "target", "width", "height", "left", "top", "ngClass", "click", 4, "ngFor", "ngForOf"], [3, "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick", 4, "ngIf"], [1, "ngx-gallery-thumbnail", 3, "href", "target", "ngClass", "click"], ["class", "ngx-gallery-thumbnail", "style", "width: 100%; height: 100%; position:absolute;", 3, "background-image", "ngClass", 4, "ngIf"], ["class", "ngx-gallery-thumbnail-video", 4, "ngIf"], [1, "ngx-gallery-icons-wrapper"], [3, "icon", "disabled", "titleText", "closeClick", 4, "ngFor", "ngForOf"], ["class", "ngx-gallery-remaining-count-overlay", 4, "ngIf"], [1, "ngx-gallery-thumbnail", 2, "width", "100%", "height", "100%", "position", "absolute", 3, "ngClass"], [1, "ngx-gallery-thumbnail-video"], [1, "ngx-gallery-thumbnail", 2, "width", "100%", "height", "100%", "position", "absolute", "left", "0", "background", "#000", 3, "ngClass"], [3, "src"], [3, "icon", "disabled", "titleText", "closeClick"], [1, "ngx-gallery-remaining-count-overlay"], [1, "ngx-gallery-remaining-count"], [3, "prevDisabled", "nextDisabled", "arrowPrevIcon", "arrowNextIcon", "prevClick", "nextClick"]], template: function NgxGalleryThumbnailsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div");
        ɵngcc0.ɵɵelementStart(1, "div", 0);
        ɵngcc0.ɵɵtemplate(2, NgxGalleryThumbnailsComponent_a_2_Template, 6, 19, "a", 1);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵtemplate(3, NgxGalleryThumbnailsComponent_ngx_gallery_arrows_3_Template, 1, 4, "ngx-gallery-arrows", 2);
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-", ctx.size, "");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("transform", "translateX(" + ctx.thumbnailsLeft + ")")("margin-left", ctx.thumbnailsMarginLeft);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.getImages());
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.canShowArrows());
    } }, directives: function () { return [ɵngcc2.NgForOf, ɵngcc2.NgIf, ɵngcc2.NgClass, NgxGalleryActionComponent, NgxGalleryArrowsComponent]; }, styles: ["@charset \"UTF-8\";[_nghost-%COMP%]{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-thumbnails-wrapper[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;overflow:hidden}.ngx-gallery-thumbnails[_ngcontent-%COMP%]{height:100%;width:100%;position:absolute;left:0;transform:translateX(0);transition:transform .5s ease-in-out;will-change:transform}.ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail[_ngcontent-%COMP%]{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none;border:1px double #000}.ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail[_ngcontent-%COMP%]   .ngx-gallery-thumbnail-video[_ngcontent-%COMP%]::after{content:\"\uF144\";display:block;position:absolute;background:#0000;height:100%;width:100%;left:0;top:calc(50% - 20px);font-size:40px;color:#fff;margin:0;padding:0;font-family:fontawesome;text-shadow:0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)}.ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail[_ngcontent-%COMP%]   .img[_ngcontent-%COMP%]{background-size:cover;height:100%}.ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail.ngx-gallery-active[_ngcontent-%COMP%]{border:1px double #cc4548}.ngx-gallery-thumbnail-size-cover[_ngcontent-%COMP%]   .ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail[_ngcontent-%COMP%]{background-size:cover}.ngx-gallery-thumbnail-size-contain[_ngcontent-%COMP%]   .ngx-gallery-thumbnails[_ngcontent-%COMP%]   .ngx-gallery-thumbnail[_ngcontent-%COMP%]{background-size:contain}.ngx-gallery-remaining-count-overlay[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.ngx-gallery-remaining-count[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:30px}"], changeDetection: 0 });
NgxGalleryThumbnailsComponent.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ElementRef },
    { type: NgxGalleryService }
];
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "images", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "links", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "labels", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "linkTarget", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "columns", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "rows", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "arrows", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "arrowsAutoHide", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "margin", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "selectedIndex", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "clickable", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "swipe", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "size", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "arrowPrevIcon", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "arrowNextIcon", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "moveSize", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "order", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "remainingCount", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "lazyLoading", void 0);
__decorate([
    Input()
], NgxGalleryThumbnailsComponent.prototype, "actions", void 0);
__decorate([
    Output()
], NgxGalleryThumbnailsComponent.prototype, "activeChange", void 0);
__decorate([
    HostListener('mouseenter')
], NgxGalleryThumbnailsComponent.prototype, "onMouseEnter", null);
__decorate([
    HostListener('mouseleave')
], NgxGalleryThumbnailsComponent.prototype, "onMouseLeave", null);

class NgxGalleryAction {
    constructor(action) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';
        this.onClick = action.onClick;
    }
}

class NgxGalleryLayout {
}
NgxGalleryLayout.ThumbnailsTop = 'thumbnails-top';
NgxGalleryLayout.ThumbnailsBottom = 'thumbnails-bottom';

class NgxGalleryImageSize {
}
NgxGalleryImageSize.Cover = 'cover';
NgxGalleryImageSize.Contain = 'contain';

class NgxGalleryOptions {
    constructor(obj) {
        const preventDefaults = obj.breakpoint === undefined ? false : true;
        function use(source, defaultValue) {
            return obj && (source !== undefined || preventDefaults) ? source : defaultValue;
        }
        this.breakpoint = use(obj.breakpoint, undefined);
        this.width = use(obj.width, '500px');
        this.height = use(obj.height, '400px');
        this.fullWidth = use(obj.fullWidth, false);
        this.layout = use(obj.layout, NgxGalleryLayout.ThumbnailsBottom);
        this.startIndex = use(obj.startIndex, 0);
        this.linkTarget = use(obj.linkTarget, '_blank');
        this.lazyLoading = use(obj.lazyLoading, true);
        this.image = use(obj.image, true);
        this.imagePercent = use(obj.imagePercent, 75);
        this.imageArrows = use(obj.imageArrows, true);
        this.imageArrowsAutoHide = use(obj.imageArrowsAutoHide, false);
        this.imageSwipe = use(obj.imageSwipe, false);
        this.imageAnimation = use(obj.imageAnimation, NgxGalleryAnimation.Fade);
        this.imageSize = use(obj.imageSize, NgxGalleryImageSize.Cover);
        this.imageAutoPlay = use(obj.imageAutoPlay, false);
        this.imageAutoPlayInterval = use(obj.imageAutoPlayInterval, 2000);
        this.imageAutoPlayPauseOnHover = use(obj.imageAutoPlayPauseOnHover, false);
        this.imageInfinityMove = use(obj.imageInfinityMove, false);
        if (obj && obj.imageActions && obj.imageActions.length) {
            obj.imageActions = obj.imageActions.map(action => new NgxGalleryAction(action));
        }
        this.imageActions = use(obj.imageActions, []);
        this.imageDescription = use(obj.imageDescription, false);
        this.imageBullets = use(obj.imageBullets, false);
        this.thumbnails = use(obj.thumbnails, true);
        this.thumbnailsColumns = use(obj.thumbnailsColumns, 4);
        this.thumbnailsRows = use(obj.thumbnailsRows, 1);
        this.thumbnailsPercent = use(obj.thumbnailsPercent, 25);
        this.thumbnailsMargin = use(obj.thumbnailsMargin, 10);
        this.thumbnailsArrows = use(obj.thumbnailsArrows, true);
        this.thumbnailsArrowsAutoHide = use(obj.thumbnailsArrowsAutoHide, false);
        this.thumbnailsSwipe = use(obj.thumbnailsSwipe, false);
        this.thumbnailsMoveSize = use(obj.thumbnailsMoveSize, 1);
        this.thumbnailsOrder = use(obj.thumbnailsOrder, NgxGalleryOrder.Column);
        this.thumbnailsRemainingCount = use(obj.thumbnailsRemainingCount, false);
        this.thumbnailsAsLinks = use(obj.thumbnailsAsLinks, false);
        this.thumbnailsAutoHide = use(obj.thumbnailsAutoHide, false);
        this.thumbnailMargin = use(obj.thumbnailMargin, 10);
        this.thumbnailSize = use(obj.thumbnailSize, NgxGalleryImageSize.Cover);
        if (obj && obj.thumbnailActions && obj.thumbnailActions.length) {
            obj.thumbnailActions = obj.thumbnailActions.map(action => new NgxGalleryAction(action));
        }
        this.thumbnailActions = use(obj.thumbnailActions, []);
        this.thumbnailClasses = use(obj.thumbnailClasses, []);
        this.preview = use(obj.preview, true);
        this.previewDescription = use(obj.previewDescription, true);
        this.previewArrows = use(obj.previewArrows, true);
        this.previewArrowsAutoHide = use(obj.previewArrowsAutoHide, false);
        this.previewSwipe = use(obj.previewSwipe, false);
        this.previewFullscreen = use(obj.previewFullscreen, false);
        this.previewForceFullscreen = use(obj.previewForceFullscreen, false);
        this.previewCloseOnClick = use(obj.previewCloseOnClick, false);
        this.previewCloseOnEsc = use(obj.previewCloseOnEsc, false);
        this.previewKeyboardNavigation = use(obj.previewKeyboardNavigation, false);
        this.previewAnimation = use(obj.previewAnimation, true);
        this.previewAutoPlay = use(obj.previewAutoPlay, false);
        this.previewAutoPlayInterval = use(obj.previewAutoPlayInterval, 2000);
        this.previewAutoPlayPauseOnHover = use(obj.previewAutoPlayPauseOnHover, false);
        this.previewInfinityMove = use(obj.previewInfinityMove, false);
        this.previewZoom = use(obj.previewZoom, false);
        this.previewZoomStep = use(obj.previewZoomStep, 0.1);
        this.previewZoomMax = use(obj.previewZoomMax, 2);
        this.previewZoomMin = use(obj.previewZoomMin, 0.5);
        this.previewRotate = use(obj.previewRotate, false);
        this.previewDownload = use(obj.previewDownload, false);
        this.previewCustom = use(obj.previewCustom, undefined);
        this.previewBullets = use(obj.previewBullets, false);
        this.arrowPrevIcon = use(obj.arrowPrevIcon, 'fa fa-arrow-circle-left');
        this.arrowNextIcon = use(obj.arrowNextIcon, 'fa fa-arrow-circle-right');
        this.closeIcon = use(obj.closeIcon, 'fa fa-times-circle');
        this.fullscreenIcon = use(obj.fullscreenIcon, 'fa fa-arrows-alt');
        this.spinnerIcon = use(obj.spinnerIcon, 'fa fa-spinner fa-pulse fa-3x fa-fw');
        this.zoomInIcon = use(obj.zoomInIcon, 'fa fa-search-plus');
        this.zoomOutIcon = use(obj.zoomOutIcon, 'fa fa-search-minus');
        this.rotateLeftIcon = use(obj.rotateLeftIcon, 'fa fa-undo');
        this.rotateRightIcon = use(obj.rotateRightIcon, 'fa fa-repeat');
        this.downloadIcon = use(obj.downloadIcon, 'fa fa-arrow-circle-down');
        if (obj && obj.actions && obj.actions.length) {
            obj.actions = obj.actions.map(action => new NgxGalleryAction(action));
        }
        this.actions = use(obj.actions, []);
    }
}

class NgxGalleryOrderedImage {
    constructor(obj) {
        this.src = obj.src;
        this.type = obj.type;
        this.index = obj.index;
    }
}

let NgxGalleryComponent = class NgxGalleryComponent {
    constructor(myElement, helperService) {
        this.myElement = myElement;
        this.helperService = helperService;
        this.options = [{}];
        this.imagesReady = new EventEmitter();
        // tslint:disable-next-line:no-output-native
        this.change = new EventEmitter();
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.previewChange = new EventEmitter();
        this.oldImagesLength = 0;
        this.selectedIndex = 0;
        this.breakpoint = undefined;
        this.prevBreakpoint = undefined;
    }
    ngOnInit() {
        this.options = this.options.map((opt) => new NgxGalleryOptions(opt));
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = this.currentOptions.startIndex;
        }
    }
    ngDoCheck() {
        if (this.images !== undefined && (this.images.length !== this.oldImagesLength)
            || (this.images !== this.oldImages)) {
            this.oldImagesLength = this.images.length;
            this.oldImages = this.images;
            this.setOptions();
            this.setImages();
            if (this.images && this.images.length) {
                this.imagesReady.emit();
            }
            if (this.image) {
                this.image.reset(this.currentOptions.startIndex);
            }
            if (this.currentOptions.thumbnailsAutoHide && this.currentOptions.thumbnails
                && this.images.length <= 1) {
                this.currentOptions.thumbnails = false;
                this.currentOptions.imageArrows = false;
            }
            this.resetThumbnails();
        }
    }
    ngAfterViewInit() {
        this.checkFullWidth();
    }
    onResize() {
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(() => {
                this.checkFullWidth();
            }, 200);
        }
    }
    getImageHeight() {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.imagePercent + '%' : '100%';
    }
    getThumbnailsHeight() {
        if (this.currentOptions && this.currentOptions.image) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    }
    getThumbnailsMarginTop() {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    }
    getThumbnailsMarginBottom() {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    }
    openPreview(index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
    }
    onPreviewOpen() {
        this.previewOpen.emit();
        if (this.image && this.image.autoPlay) {
            this.image.stopAutoPlay();
        }
    }
    onPreviewClose() {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.image && this.image.autoPlay) {
            this.image.startAutoPlay();
        }
    }
    selectFromImage(index) {
        this.select(index);
    }
    selectFromThumbnails(index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.image || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    }
    show(index) {
        this.select(index);
    }
    showNext() {
        this.image.showNext();
    }
    showPrev() {
        this.image.showPrev();
    }
    canShowNext() {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex < this.images.length - 1);
        }
        else {
            return false;
        }
    }
    canShowPrev() {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex > 0);
        }
        else {
            return false;
        }
    }
    previewSelect(index) {
        this.previewChange.emit({ index, image: this.images[index] });
    }
    moveThumbnailsRight() {
        this.thumbnails.moveRight();
    }
    moveThumbnailsLeft() {
        this.thumbnails.moveLeft();
    }
    canMoveThumbnailsRight() {
        return this.thumbnails.canMoveRight();
    }
    canMoveThumbnailsLeft() {
        return this.thumbnails.canMoveLeft();
    }
    resetThumbnails() {
        if (this.thumbnails) {
            this.thumbnails.reset(this.currentOptions.startIndex);
        }
    }
    select(index) {
        this.selectedIndex = index;
        this.change.emit({
            index,
            image: this.images[index]
        });
    }
    checkFullWidth() {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = 'translateX(' + (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px)';
        }
    }
    setImages() {
        this.images.forEach((img) => img.type = this.helperService.getFileType(img.url || img.big || img.medium || img.small || ''));
        this.smallImages = this.images.map((img) => img.small);
        this.mediumImages = this.images.map((img, i) => new NgxGalleryOrderedImage({
            src: img.medium,
            type: img.type,
            index: i
        }));
        this.bigImages = this.images.map((img) => img.big);
        this.descriptions = this.images.map((img) => img.description);
        this.links = this.images.map((img) => img.url);
        this.labels = this.images.map((img) => img.label);
    }
    setBreakpoint() {
        this.prevBreakpoint = this.breakpoint;
        let breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter((opt) => opt.breakpoint >= window.innerWidth)
                .map((opt) => opt.breakpoint);
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    }
    sortOptions() {
        this.options = [
            ...this.options.filter((a) => a.breakpoint === undefined),
            ...this.options
                .filter((a) => a.breakpoint !== undefined)
                .sort((a, b) => b.breakpoint - a.breakpoint)
        ];
    }
    setOptions() {
        this.currentOptions = new NgxGalleryOptions({});
        this.options
            .filter((opt) => opt.breakpoint === undefined || opt.breakpoint >= this.breakpoint)
            .map((opt) => this.combineOptions(this.currentOptions, opt));
        this.width = this.currentOptions.width;
        this.height = this.currentOptions.height;
    }
    combineOptions(first, second) {
        Object.keys(second).map((val) => first[val] = second[val] !== undefined ? second[val] : first[val]);
    }
};
NgxGalleryComponent.ɵfac = function NgxGalleryComponent_Factory(t) { return new (t || NgxGalleryComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(NgxGalleryService)); };
NgxGalleryComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryComponent, selectors: [["ngx-gallery"]], viewQuery: function NgxGalleryComponent_Query(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵviewQuery(NgxGalleryPreviewComponent, true);
        ɵngcc0.ɵɵviewQuery(NgxGalleryImageComponent, true);
        ɵngcc0.ɵɵviewQuery(NgxGalleryThumbnailsComponent, true);
    } if (rf & 2) {
        let _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.preview = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.image = _t.first);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.thumbnails = _t.first);
    } }, hostVars: 6, hostBindings: function NgxGalleryComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("resize", function NgxGalleryComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, ɵngcc0.ɵɵresolveWindow);
    } if (rf & 2) {
        ɵngcc0.ɵɵstyleProp("width", ctx.width)("transform", ctx.left)("height", ctx.height);
    } }, inputs: { options: "options", images: "images" }, outputs: { imagesReady: "imagesReady", change: "change", previewOpen: "previewOpen", previewClose: "previewClose", previewChange: "previewChange" }, features: [ɵngcc0.ɵɵProvidersFeature([NgxGalleryService])], decls: 4, vars: 41, consts: [[3, "height", "images", "clickable", "selectedIndex", "arrows", "arrowsAutoHide", "arrowPrevIcon", "arrowNextIcon", "swipe", "animation", "size", "autoPlay", "autoPlayInterval", "autoPlayPauseOnHover", "infinityMove", "lazyLoading", "actions", "descriptions", "showDescription", "bullets", "imageClick", "activeChange", 4, "ngIf"], [3, "marginTop", "marginBottom", "height", "images", "links", "labels", "linkTarget", "selectedIndex", "columns", "rows", "margin", "arrows", "arrowsAutoHide", "arrowPrevIcon", "arrowNextIcon", "clickable", "swipe", "size", "moveSize", "order", "remainingCount", "lazyLoading", "actions", "ngClass", "activeChange", 4, "ngIf"], [3, "images", "descriptions", "showDescription", "arrowPrevIcon", "arrowNextIcon", "closeIcon", "fullscreenIcon", "spinnerIcon", "arrows", "arrowsAutoHide", "swipe", "fullscreen", "forceFullscreen", "closeOnClick", "closeOnEsc", "keyboardNavigation", "animation", "autoPlay", "autoPlayInterval", "autoPlayPauseOnHover", "infinityMove", "zoom", "zoomStep", "zoomMax", "zoomMin", "zoomInIcon", "zoomOutIcon", "actions", "rotate", "rotateLeftIcon", "rotateRightIcon", "download", "downloadIcon", "bullets", "previewClose", "previewOpen", "activeChange"], [3, "images", "clickable", "selectedIndex", "arrows", "arrowsAutoHide", "arrowPrevIcon", "arrowNextIcon", "swipe", "animation", "size", "autoPlay", "autoPlayInterval", "autoPlayPauseOnHover", "infinityMove", "lazyLoading", "actions", "descriptions", "showDescription", "bullets", "imageClick", "activeChange"], [3, "images", "links", "labels", "linkTarget", "selectedIndex", "columns", "rows", "margin", "arrows", "arrowsAutoHide", "arrowPrevIcon", "arrowNextIcon", "clickable", "swipe", "size", "moveSize", "order", "remainingCount", "lazyLoading", "actions", "ngClass", "activeChange"]], template: function NgxGalleryComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div");
        ɵngcc0.ɵɵtemplate(1, NgxGalleryComponent_ngx_gallery_image_1_Template, 1, 21, "ngx-gallery-image", 0);
        ɵngcc0.ɵɵtemplate(2, NgxGalleryComponent_ngx_gallery_thumbnails_2_Template, 1, 28, "ngx-gallery-thumbnails", 1);
        ɵngcc0.ɵɵelementStart(3, "ngx-gallery-preview", 2);
        ɵngcc0.ɵɵlistener("previewClose", function NgxGalleryComponent_Template_ngx_gallery_preview_previewClose_3_listener() { return ctx.onPreviewClose(); })("previewOpen", function NgxGalleryComponent_Template_ngx_gallery_preview_previewOpen_3_listener() { return ctx.onPreviewOpen(); })("activeChange", function NgxGalleryComponent_Template_ngx_gallery_preview_activeChange_3_listener($event) { return ctx.previewSelect($event); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-layout ", ctx.currentOptions == null ? null : ctx.currentOptions.layout, "");
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.currentOptions == null ? null : ctx.currentOptions.image);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.currentOptions == null ? null : ctx.currentOptions.thumbnails);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("ngx-gallery-active", ctx.previewEnabled);
        ɵngcc0.ɵɵproperty("images", ctx.bigImages)("descriptions", ctx.descriptions)("showDescription", ctx.currentOptions == null ? null : ctx.currentOptions.previewDescription)("arrowPrevIcon", ctx.currentOptions == null ? null : ctx.currentOptions.arrowPrevIcon)("arrowNextIcon", ctx.currentOptions == null ? null : ctx.currentOptions.arrowNextIcon)("closeIcon", ctx.currentOptions == null ? null : ctx.currentOptions.closeIcon)("fullscreenIcon", ctx.currentOptions == null ? null : ctx.currentOptions.fullscreenIcon)("spinnerIcon", ctx.currentOptions == null ? null : ctx.currentOptions.spinnerIcon)("arrows", ctx.currentOptions == null ? null : ctx.currentOptions.previewArrows)("arrowsAutoHide", ctx.currentOptions == null ? null : ctx.currentOptions.previewArrowsAutoHide)("swipe", ctx.currentOptions == null ? null : ctx.currentOptions.previewSwipe)("fullscreen", ctx.currentOptions == null ? null : ctx.currentOptions.previewFullscreen)("forceFullscreen", ctx.currentOptions == null ? null : ctx.currentOptions.previewForceFullscreen)("closeOnClick", ctx.currentOptions == null ? null : ctx.currentOptions.previewCloseOnClick)("closeOnEsc", ctx.currentOptions == null ? null : ctx.currentOptions.previewCloseOnEsc)("keyboardNavigation", ctx.currentOptions == null ? null : ctx.currentOptions.previewKeyboardNavigation)("animation", ctx.currentOptions == null ? null : ctx.currentOptions.previewAnimation)("autoPlay", ctx.currentOptions == null ? null : ctx.currentOptions.previewAutoPlay)("autoPlayInterval", ctx.currentOptions == null ? null : ctx.currentOptions.previewAutoPlayInterval)("autoPlayPauseOnHover", ctx.currentOptions == null ? null : ctx.currentOptions.previewAutoPlayPauseOnHover)("infinityMove", ctx.currentOptions == null ? null : ctx.currentOptions.previewInfinityMove)("zoom", ctx.currentOptions == null ? null : ctx.currentOptions.previewZoom)("zoomStep", ctx.currentOptions == null ? null : ctx.currentOptions.previewZoomStep)("zoomMax", ctx.currentOptions == null ? null : ctx.currentOptions.previewZoomMax)("zoomMin", ctx.currentOptions == null ? null : ctx.currentOptions.previewZoomMin)("zoomInIcon", ctx.currentOptions == null ? null : ctx.currentOptions.zoomInIcon)("zoomOutIcon", ctx.currentOptions == null ? null : ctx.currentOptions.zoomOutIcon)("actions", ctx.currentOptions == null ? null : ctx.currentOptions.actions)("rotate", ctx.currentOptions == null ? null : ctx.currentOptions.previewRotate)("rotateLeftIcon", ctx.currentOptions == null ? null : ctx.currentOptions.rotateLeftIcon)("rotateRightIcon", ctx.currentOptions == null ? null : ctx.currentOptions.rotateRightIcon)("download", ctx.currentOptions == null ? null : ctx.currentOptions.previewDownload)("downloadIcon", ctx.currentOptions == null ? null : ctx.currentOptions.downloadIcon)("bullets", ctx.currentOptions == null ? null : ctx.currentOptions.previewBullets);
    } }, directives: [ɵngcc2.NgIf, NgxGalleryPreviewComponent, NgxGalleryImageComponent, NgxGalleryThumbnailsComponent, ɵngcc2.NgClass], styles: [":host{display:inline-block}:host>*{float:left}.ngx-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}.ngx-gallery-layout.thumbnails-top ngx-gallery-image{order:2}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-image,.ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails{order:1}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails{order:2}*{box-sizing:border-box}.ngx-gallery-icon{color:#fff;position:absolute;display:inline-block}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}ngx-gallery-preview{font-size:25px}ngx-gallery-preview .ngx-gallery-icon{z-index:2000}.ngx-gallery-clickable{cursor:pointer}.ngx-gallery-icons-wrapper .ngx-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}.ngx-gallery-icons-wrapper{float:right}"], encapsulation: 2, changeDetection: 0 });
NgxGalleryComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgxGalleryService }
];
__decorate([
    Input()
], NgxGalleryComponent.prototype, "options", void 0);
__decorate([
    Input()
], NgxGalleryComponent.prototype, "images", void 0);
__decorate([
    Output()
], NgxGalleryComponent.prototype, "imagesReady", void 0);
__decorate([
    Output()
], NgxGalleryComponent.prototype, "change", void 0);
__decorate([
    Output()
], NgxGalleryComponent.prototype, "previewOpen", void 0);
__decorate([
    Output()
], NgxGalleryComponent.prototype, "previewClose", void 0);
__decorate([
    Output()
], NgxGalleryComponent.prototype, "previewChange", void 0);
__decorate([
    ViewChild(NgxGalleryPreviewComponent)
], NgxGalleryComponent.prototype, "preview", void 0);
__decorate([
    ViewChild(NgxGalleryImageComponent)
], NgxGalleryComponent.prototype, "image", void 0);
__decorate([
    ViewChild(NgxGalleryThumbnailsComponent)
], NgxGalleryComponent.prototype, "thumbnails", void 0);
__decorate([
    HostBinding('style.width')
], NgxGalleryComponent.prototype, "width", void 0);
__decorate([
    HostBinding('style.height')
], NgxGalleryComponent.prototype, "height", void 0);
__decorate([
    HostBinding('style.transform')
], NgxGalleryComponent.prototype, "left", void 0);
__decorate([
    HostListener('window:resize')
], NgxGalleryComponent.prototype, "onResize", null);

let NgxGalleryArrowsComponent = class NgxGalleryArrowsComponent {
    constructor() {
        this.prevClick = new EventEmitter();
        this.nextClick = new EventEmitter();
    }
    ngOnInit() {
    }
    handlePrevClick() {
        this.prevClick.emit();
    }
    handleNextClick() {
        this.nextClick.emit();
    }
};
NgxGalleryArrowsComponent.ɵfac = function NgxGalleryArrowsComponent_Factory(t) { return new (t || NgxGalleryArrowsComponent)(); };
NgxGalleryArrowsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryArrowsComponent, selectors: [["ngx-gallery-arrows"]], inputs: { prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", arrowPrevIcon: "arrowPrevIcon", arrowNextIcon: "arrowNextIcon" }, outputs: { prevClick: "prevClick", nextClick: "nextClick" }, decls: 6, vars: 10, consts: [[1, "ngx-gallery-arrows-wrapper", "ngx-gallery-arrow-left"], ["aria-hidden", "true", 1, "ngx-gallery-icon", "ngx-gallery-arrow", 3, "click"], [1, "ngx-gallery-arrows-wrapper", "ngx-gallery-arrow-right"]], template: function NgxGalleryArrowsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵlistener("click", function NgxGalleryArrowsComponent_Template_div_click_1_listener() { return ctx.handlePrevClick(); });
        ɵngcc0.ɵɵelement(2, "i");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "div", 2);
        ɵngcc0.ɵɵelementStart(4, "div", 1);
        ɵngcc0.ɵɵlistener("click", function NgxGalleryArrowsComponent_Template_div_click_4_listener() { return ctx.handleNextClick(); });
        ɵngcc0.ɵɵelement(5, "i");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassProp("ngx-gallery-disabled", ctx.prevDisabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-icon-content ", ctx.arrowPrevIcon, "");
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵclassProp("ngx-gallery-disabled", ctx.nextDisabled);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-icon-content ", ctx.arrowNextIcon, "");
    } }, styles: [".ngx-gallery-arrow-wrapper[_ngcontent-%COMP%]{position:absolute;height:100%;width:1px;display:table;table-layout:fixed}.ngx-gallery-preview-img-wrapper[_ngcontent-%COMP%]   .ngx-gallery-arrow-wrapper[_ngcontent-%COMP%]{z-index:10001}.ngx-gallery-arrow-left[_ngcontent-%COMP%]{left:0}.ngx-gallery-arrow-right[_ngcontent-%COMP%]{right:0}.ngx-gallery-arrow[_ngcontent-%COMP%]{top:50%;transform:translateY(-50%);cursor:pointer}.ngx-gallery-arrow.ngx-gallery-disabled[_ngcontent-%COMP%]{opacity:.6;cursor:default}.ngx-gallery-arrow-left[_ngcontent-%COMP%]   .ngx-gallery-arrow[_ngcontent-%COMP%]{left:10px}.ngx-gallery-arrow-right[_ngcontent-%COMP%]   .ngx-gallery-arrow[_ngcontent-%COMP%]{right:10px}"], changeDetection: 0 });
__decorate([
    Input()
], NgxGalleryArrowsComponent.prototype, "prevDisabled", void 0);
__decorate([
    Input()
], NgxGalleryArrowsComponent.prototype, "nextDisabled", void 0);
__decorate([
    Input()
], NgxGalleryArrowsComponent.prototype, "arrowPrevIcon", void 0);
__decorate([
    Input()
], NgxGalleryArrowsComponent.prototype, "arrowNextIcon", void 0);
__decorate([
    Output()
], NgxGalleryArrowsComponent.prototype, "prevClick", void 0);
__decorate([
    Output()
], NgxGalleryArrowsComponent.prototype, "nextClick", void 0);

let NgxGalleryActionComponent = class NgxGalleryActionComponent {
    constructor() {
        this.disabled = false;
        this.titleText = '';
        this.closeClick = new EventEmitter();
    }
    ngOnInit() {
    }
    handleClick(event) {
        if (!this.disabled) {
            this.closeClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    }
};
NgxGalleryActionComponent.ɵfac = function NgxGalleryActionComponent_Factory(t) { return new (t || NgxGalleryActionComponent)(); };
NgxGalleryActionComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryActionComponent, selectors: [["ngx-gallery-action"]], inputs: { disabled: "disabled", titleText: "titleText", icon: "icon" }, outputs: { closeClick: "closeClick" }, decls: 2, vars: 6, consts: [["aria-hidden", "true", 1, "ngx-gallery-icon", 3, "title", "click"]], template: function NgxGalleryActionComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵlistener("click", function NgxGalleryActionComponent_Template_div_click_0_listener($event) { return ctx.handleClick($event); });
        ɵngcc0.ɵɵelement(1, "i");
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵclassProp("ngx-gallery-icon-disabled", ctx.disabled);
        ɵngcc0.ɵɵpropertyInterpolate("title", ctx.titleText);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵclassMapInterpolate1("ngx-gallery-icon-content ", ctx.icon, "");
    } }, styles: [".ngx-gallery-icon[_ngcontent-%COMP%]{color:#fff;z-index:2000;display:inline-block;position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-icon[_ngcontent-%COMP%]   .ngx-gallery-icon-content[_ngcontent-%COMP%]{display:block}"], changeDetection: 0 });
__decorate([
    Input()
], NgxGalleryActionComponent.prototype, "icon", void 0);
__decorate([
    Input()
], NgxGalleryActionComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], NgxGalleryActionComponent.prototype, "titleText", void 0);
__decorate([
    Output()
], NgxGalleryActionComponent.prototype, "closeClick", void 0);

let NgxGalleryBulletsComponent = class NgxGalleryBulletsComponent {
    constructor() {
        this.active = 0;
        this.bulletChange = new EventEmitter();
    }
    ngOnInit() {
    }
    getBullets() {
        return Array(this.count);
    }
    handleChange(event, index) {
        this.bulletChange.emit(index);
    }
};
NgxGalleryBulletsComponent.ɵfac = function NgxGalleryBulletsComponent_Factory(t) { return new (t || NgxGalleryBulletsComponent)(); };
NgxGalleryBulletsComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgxGalleryBulletsComponent, selectors: [["ngx-gallery-bullets"]], inputs: { active: "active", count: "count" }, outputs: { bulletChange: "bulletChange" }, decls: 1, vars: 1, consts: [["class", "ngx-gallery-bullet", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "ngx-gallery-bullet", 3, "ngClass", "click"]], template: function NgxGalleryBulletsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NgxGalleryBulletsComponent_div_0_Template, 1, 3, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngForOf", ctx.getBullets());
    } }, directives: [ɵngcc2.NgForOf, ɵngcc2.NgClass], styles: ["[_nghost-%COMP%]{position:absolute;z-index:2000;display:inline-flex;left:50%;transform:translateX(-50%);bottom:0;padding:10px}.ngx-gallery-bullet[_ngcontent-%COMP%]{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.ngx-gallery-bullet[_ngcontent-%COMP%]:not(:first-child){margin-left:5px}.ngx-gallery-bullet.ngx-gallery-active[_ngcontent-%COMP%], .ngx-gallery-bullet[_ngcontent-%COMP%]:hover{background:#000}"], changeDetection: 0 });
__decorate([
    Input()
], NgxGalleryBulletsComponent.prototype, "count", void 0);
__decorate([
    Input()
], NgxGalleryBulletsComponent.prototype, "active", void 0);
__decorate([
    Output()
], NgxGalleryBulletsComponent.prototype, "bulletChange", void 0);

let CustomHammerConfig = class CustomHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
    }
};
CustomHammerConfig.ɵfac = function CustomHammerConfig_Factory(t) { return ɵCustomHammerConfig_BaseFactory(t || CustomHammerConfig); };
CustomHammerConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: CustomHammerConfig, factory: function (t) { return CustomHammerConfig.ɵfac(t); } });
let NgxGalleryModule = class NgxGalleryModule {
};
NgxGalleryModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgxGalleryModule });
NgxGalleryModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgxGalleryModule_Factory(t) { return new (t || NgxGalleryModule)(); }, providers: [
        { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
    ], imports: [[CommonModule]] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryPreviewComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-preview',
                template: "<ngx-gallery-arrows *ngIf=\"arrows\" (prevClick)=\"showPrev()\" (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\"\n                    [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n<div class=\"ngx-gallery-preview-top\">\n  <div class=\"ngx-gallery-preview-icons\">\n    <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                        [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, index)\"></ngx-gallery-action>\n    <a *ngIf=\"download && src\" [href]=\"src\" class=\"ngx-gallery-icon\" aria-hidden=\"true\" download>\n      <i class=\"ngx-gallery-icon-content {{ downloadIcon }}\"></i>\n    </a>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\"\n                        (closeClick)=\"zoomOut()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\"\n                        (closeClick)=\"zoomIn()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (closeClick)=\"rotateLeft()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (closeClick)=\"rotateRight()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"fullscreen\" [icon]=\"'ngx-gallery-fullscreen ' + fullscreenIcon\"\n                        (closeClick)=\"manageFullscreen()\"></ngx-gallery-action>\n    <ngx-gallery-action [icon]=\"'ngx-gallery-close ' + closeIcon\" (closeClick)=\"close()\"></ngx-gallery-action>\n  </div>\n</div>\n<div class=\"ngx-spinner-wrapper ngx-gallery-center\" [class.ngx-gallery-active]=\"showSpinner\">\n  <i class=\"ngx-gallery-icon ngx-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i>\n</div>\n<div class=\"ngx-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\"\n     (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n  <div class=\"ngx-gallery-preview-img-wrapper\">\n    <img *ngIf=\"src && type == 'image'\" #previewImage class=\"ngx-gallery-preview-img ngx-gallery-center\" [src]=\"src\"\n         (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\"\n         (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n         [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\"\n         [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n    <video *ngIf=\"src && type == 'video'\"  #previewImage controls style=\"width: 100%; height: 100%;\"\n    class=\"ngx-gallery-preview-img ngx-gallery-center\"\n    (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n    [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\">\n      <source [src]=\"src\">\n      Your browser does not support the video tag.\n    </video>\n    <ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"index\"\n                         (bulletChange)=\"showAtIndex($event)\"></ngx-gallery-bullets>\n  </div>\n  <div class=\"ngx-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\"\n       (click)=\"$event.stopPropagation()\"></div>\n</div>\n",
                // encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host.ngx-gallery-active{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block;font-size:50px!important}:host{display:none;font-size:50px!important}:host .ngx-gallery-arrow{font-size:50px!important}ngx-gallery-bullets{height:5%;align-items:center;padding:0}.ngx-gallery-preview-img{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s}.ngx-gallery-preview-img.animation{transition:opacity .5s linear,transform .5s}.ngx-gallery-preview-img.ngx-gallery-active{opacity:1}.ngx-gallery-preview-img.ngx-gallery-grab{cursor:-webkit-grab;cursor:grab}.ngx-gallery-icon.ngx-gallery-spinner{font-size:50px;left:0;display:inline-block}:host .ngx-gallery-preview-top{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:25px}.ngx-gallery-preview-icons{float:right}.ngx-gallery-preview-icons .ngx-gallery-icon{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-preview-icons .ngx-gallery-icon.ngx-gallery-icon-disabled{cursor:default;opacity:.4}.ngx-spinner-wrapper{width:50px;height:50px;display:none}.ngx-spinner-wrapper.ngx-gallery-active{display:inline-block}.ngx-gallery-center{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.ngx-gallery-preview-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.ngx-gallery-preview-wrapper{width:100%;height:100%;display:flex;flex-flow:column}.ngx-gallery-preview-img-wrapper{flex:1 1 auto;position:relative}"]
            }]
    }], function () { return [{ type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.ElementRef }, { type: NgxGalleryService }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }]; }, { previewOpen: [{
            type: Output
        }], previewClose: [{
            type: Output
        }], activeChange: [{
            type: Output
        }], arrows: [{
            type: Input
        }], onMouseEnter: [{
            type: HostListener,
            args: ['mouseenter']
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
        }], images: [{
            type: Input
        }], descriptions: [{
            type: Input
        }], showDescription: [{
            type: Input
        }], arrowsAutoHide: [{
            type: Input
        }], swipe: [{
            type: Input
        }], fullscreen: [{
            type: Input
        }], forceFullscreen: [{
            type: Input
        }], closeOnClick: [{
            type: Input
        }], closeOnEsc: [{
            type: Input
        }], keyboardNavigation: [{
            type: Input
        }], arrowPrevIcon: [{
            type: Input
        }], arrowNextIcon: [{
            type: Input
        }], closeIcon: [{
            type: Input
        }], fullscreenIcon: [{
            type: Input
        }], spinnerIcon: [{
            type: Input
        }], autoPlay: [{
            type: Input
        }], autoPlayInterval: [{
            type: Input
        }], autoPlayPauseOnHover: [{
            type: Input
        }], infinityMove: [{
            type: Input
        }], zoom: [{
            type: Input
        }], zoomStep: [{
            type: Input
        }], zoomMax: [{
            type: Input
        }], zoomMin: [{
            type: Input
        }], zoomInIcon: [{
            type: Input
        }], zoomOutIcon: [{
            type: Input
        }], animation: [{
            type: Input
        }], actions: [{
            type: Input
        }], rotate: [{
            type: Input
        }], rotateLeftIcon: [{
            type: Input
        }], rotateRightIcon: [{
            type: Input
        }], download: [{
            type: Input
        }], downloadIcon: [{
            type: Input
        }], bullets: [{
            type: Input
        }], previewImage: [{
            type: ViewChild,
            args: ['previewImage']
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryImageComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-image',
                template: "<div class=\"ngx-gallery-image-wrapper ngx-gallery-animation-{{animation}} ngx-gallery-image-size-{{size}}\">\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n\n    \n    <div *ngIf=\"image.type === 'image'\" class=\"ngx-gallery-image\"\n        [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n          'ngx-gallery-inactive-left': selectedIndex > image.index,\n          'ngx-gallery-inactive-right': selectedIndex < image.index,\n            'ngx-gallery-clickable': clickable }\"\n        [style.background-image]=\"getSafeUrl(image.src)\" (click)=\"handleClick($event, image.index)\">\n      <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\"\n                            (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n    </div>\n  </div>\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n    <div *ngIf=\"image.type === 'video'\" class=\"ngx-gallery-image\" \n    [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n    'ngx-gallery-inactive-left': selectedIndex > image.index,\n      'ngx-gallery-inactive-right': selectedIndex < image.index,\n      'ngx-gallery-clickable': clickable }\"\n    (click)=\"handleClick($event, image.index)\">\n      <video controls style=\"width:100%; height:100%; background: #000;\">\n        <source [src]=\"image.src\">\n          Your browser does not support the video tag.\n      </video>\n      <div class=\"ngx-gallery-icons-wrapper\">\n      <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                          [titleText]=\"action.titleText\"\n                          (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n      </div>\n    </div>\n  </div>\n<ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"selectedIndex\"\n                     (bulletChange)=\"show($event)\"></ngx-gallery-bullets>\n<ngx-gallery-arrows class=\"ngx-gallery-image-size-{{size}}\" *ngIf=\"arrows\" (prevClick)=\"showPrev()\"\n                    (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\"\n                    [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-image-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.ngx-gallery-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.ngx-gallery-image-size-cover .ngx-gallery-image{background-size:cover}.ngx-gallery-image-size-contain .ngx-gallery-image{background-size:contain}.ngx-gallery-animation-fade .ngx-gallery-image{left:0;opacity:0;transition:.5s ease-in-out}.ngx-gallery-animation-fade .ngx-gallery-image.ngx-gallery-active{opacity:1}.ngx-gallery-animation-slide .ngx-gallery-image{transition:.5s ease-in-out}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-active{transform:translateX(0)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-left{transform:translateX(-100%)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-right{transform:translateX(100%)}.ngx-gallery-animation-rotate .ngx-gallery-image{transition:1s;transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.ngx-gallery-animation-rotate .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1) rotate(0);opacity:1}.ngx-gallery-animation-zoom .ngx-gallery-image{transition:1s;transform:scale(2.5,2.5);left:0;opacity:0}.ngx-gallery-animation-zoom .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1);opacity:1}.ngx-gallery-image-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
            }]
    }], function () { return [{ type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.ElementRef }, { type: NgxGalleryService }]; }, { imageClick: [{
            type: Output
        }], activeChange: [{
            type: Output
        }], arrows: [{
            type: Input
        }], onMouseEnter: [{
            type: HostListener,
            args: ['mouseenter']
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
        }], selectedIndex: [{
            type: Input
        }], images: [{
            type: Input
        }], clickable: [{
            type: Input
        }], arrowsAutoHide: [{
            type: Input
        }], swipe: [{
            type: Input
        }], animation: [{
            type: Input
        }], size: [{
            type: Input
        }], arrowPrevIcon: [{
            type: Input
        }], arrowNextIcon: [{
            type: Input
        }], autoPlay: [{
            type: Input
        }], autoPlayInterval: [{
            type: Input
        }], autoPlayPauseOnHover: [{
            type: Input
        }], infinityMove: [{
            type: Input
        }], lazyLoading: [{
            type: Input
        }], actions: [{
            type: Input
        }], descriptions: [{
            type: Input
        }], showDescription: [{
            type: Input
        }], bullets: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryThumbnailsComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-thumbnails',
                template: "<div class=\"ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-{{size}}\">\n  <div class=\"ngx-gallery-thumbnails\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\"\n       [style.marginLeft]=\"thumbnailsMarginLeft\">\n    <a [href]=\"hasLink(i) ? links[i] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\"\n       *ngFor=\"let image of getImages(); let i = index;\"\n       (click)=\"handleClick($event, i)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\"\n       [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       [attr.aria-label]=\"labels[i]\">\n       <div *ngIf=\"getFileType(image) == 'image'\" [style.background-image]=\"getSafeUrl(image)\" class=\"ngx-gallery-thumbnail\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       style=\"width: 100%; height: 100%; position:absolute;\"></div>\n       <div *ngIf=\"getFileType(image) == 'video'\" class=\"ngx-gallery-thumbnail-video\">\n        <video  class=\"ngx-gallery-thumbnail\" [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\" \n        style=\"width: 100%; height: 100%; position:absolute; left:0; background:#000;\">\n        <source [src]=\"image\">\n          Your browser does not support the video tag.\n       </video>\n      </div>\n       <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, i)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-remaining-count-overlay\"\n           *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\">\n        <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span>\n      </div>\n    </a>\n  </div>\n</div>\n<ngx-gallery-arrows *ngIf=\"canShowArrows()\" (prevClick)=\"moveLeft()\" (nextClick)=\"moveRight()\"\n                    [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@charset \"UTF-8\";:host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.ngx-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;transform:translateX(0);transition:transform .5s ease-in-out;will-change:transform}.ngx-gallery-thumbnails .ngx-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none;border:1px double #000}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .ngx-gallery-thumbnail-video::after{content:\"\uF144\";display:block;position:absolute;background:#0000;height:100%;width:100%;left:0;top:calc(50% - 20px);font-size:40px;color:#fff;margin:0;padding:0;font-family:fontawesome;text-shadow:0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .img{background-size:cover;height:100%}.ngx-gallery-thumbnails .ngx-gallery-thumbnail.ngx-gallery-active{border:1px double #cc4548}.ngx-gallery-thumbnail-size-cover .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:cover}.ngx-gallery-thumbnail-size-contain .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:contain}.ngx-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.ngx-gallery-remaining-count{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
            }]
    }], function () { return [{ type: ɵngcc1.DomSanitizer }, { type: ɵngcc0.ElementRef }, { type: NgxGalleryService }]; }, { activeChange: [{
            type: Output
        }], onMouseEnter: [{
            type: HostListener,
            args: ['mouseenter']
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
        }], selectedIndex: [{
            type: Input
        }], images: [{
            type: Input
        }], links: [{
            type: Input
        }], labels: [{
            type: Input
        }], linkTarget: [{
            type: Input
        }], columns: [{
            type: Input
        }], rows: [{
            type: Input
        }], arrows: [{
            type: Input
        }], arrowsAutoHide: [{
            type: Input
        }], margin: [{
            type: Input
        }], clickable: [{
            type: Input
        }], swipe: [{
            type: Input
        }], size: [{
            type: Input
        }], arrowPrevIcon: [{
            type: Input
        }], arrowNextIcon: [{
            type: Input
        }], moveSize: [{
            type: Input
        }], order: [{
            type: Input
        }], remainingCount: [{
            type: Input
        }], lazyLoading: [{
            type: Input
        }], actions: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery',
                template: "<div class=\"ngx-gallery-layout {{currentOptions?.layout}}\">\n  <ngx-gallery-image *ngIf=\"currentOptions?.image\" [style.height]=\"getImageHeight()\" [images]=\"mediumImages\"\n                     [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\"\n                     [arrows]=\"currentOptions?.imageArrows\" [arrowsAutoHide]=\"currentOptions?.imageArrowsAutoHide\"\n                     [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                     [swipe]=\"currentOptions?.imageSwipe\" [animation]=\"currentOptions?.imageAnimation\"\n                     [size]=\"currentOptions?.imageSize\" [autoPlay]=\"currentOptions?.imageAutoPlay\"\n                     [autoPlayInterval]=\"currentOptions?.imageAutoPlayInterval\"\n                     [autoPlayPauseOnHover]=\"currentOptions?.imageAutoPlayPauseOnHover\"\n                     [infinityMove]=\"currentOptions?.imageInfinityMove\" [lazyLoading]=\"currentOptions?.lazyLoading\"\n                     [actions]=\"currentOptions?.imageActions\" [descriptions]=\"descriptions\"\n                     [showDescription]=\"currentOptions?.imageDescription\" [bullets]=\"currentOptions?.imageBullets\"\n                     (imageClick)=\"openPreview($event)\" (activeChange)=\"selectFromImage($event)\"></ngx-gallery-image>\n\n  <ngx-gallery-thumbnails *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\"\n                          [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\"\n                          [images]=\"smallImages\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\"\n                          [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\"\n                          [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\"\n                          [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\"\n                          [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\"\n                          [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\"\n                          [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                          [clickable]=\"currentOptions?.image || currentOptions?.preview\"\n                          [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\"\n                          [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\"\n                          [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\"\n                          [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"\n                          (activeChange)=\"selectFromThumbnails($event)\" [ngClass]=\"currentOptions?.thumbnailClasses\"></ngx-gallery-thumbnails>\n\n  <ngx-gallery-preview [images]=\"bigImages\" [descriptions]=\"descriptions\"\n                       [showDescription]=\"currentOptions?.previewDescription\"\n                       [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                       [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\"\n                       [spinnerIcon]=\"currentOptions?.spinnerIcon\" [arrows]=\"currentOptions?.previewArrows\"\n                       [arrowsAutoHide]=\"currentOptions?.previewArrowsAutoHide\" [swipe]=\"currentOptions?.previewSwipe\"\n                       [fullscreen]=\"currentOptions?.previewFullscreen\"\n                       [forceFullscreen]=\"currentOptions?.previewForceFullscreen\"\n                       [closeOnClick]=\"currentOptions?.previewCloseOnClick\"\n                       [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\"\n                       [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\"\n                       [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\"\n                       [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\"\n                       [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\"\n                       [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\"\n                       [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\"\n                       [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\"\n                       [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\"\n                       [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\"\n                       [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\"\n                       [downloadIcon]=\"currentOptions?.downloadIcon\" [bullets]=\"currentOptions?.previewBullets\"\n                       (previewClose)=\"onPreviewClose()\" (previewOpen)=\"onPreviewOpen()\"\n                       (activeChange)=\"previewSelect($event)\"\n                       [class.ngx-gallery-active]=\"previewEnabled\"></ngx-gallery-preview>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                providers: [NgxGalleryService],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}:host>*{float:left}.ngx-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}.ngx-gallery-layout.thumbnails-top ngx-gallery-image{order:2}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-image,.ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails{order:1}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails{order:2}*{box-sizing:border-box}.ngx-gallery-icon{color:#fff;position:absolute;display:inline-block}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}ngx-gallery-preview{font-size:25px}ngx-gallery-preview .ngx-gallery-icon{z-index:2000}.ngx-gallery-clickable{cursor:pointer}.ngx-gallery-icons-wrapper .ngx-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}.ngx-gallery-icons-wrapper{float:right}"]
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: NgxGalleryService }]; }, { options: [{
            type: Input
        }], imagesReady: [{
            type: Output
        }], change: [{
            type: Output
        }], previewOpen: [{
            type: Output
        }], previewClose: [{
            type: Output
        }], previewChange: [{
            type: Output
        }], onResize: [{
            type: HostListener,
            args: ['window:resize']
        }], width: [{
            type: HostBinding,
            args: ['style.width']
        }], left: [{
            type: HostBinding,
            args: ['style.transform']
        }], height: [{
            type: HostBinding,
            args: ['style.height']
        }], images: [{
            type: Input
        }], preview: [{
            type: ViewChild,
            args: [NgxGalleryPreviewComponent]
        }], image: [{
            type: ViewChild,
            args: [NgxGalleryImageComponent]
        }], thumbnails: [{
            type: ViewChild,
            args: [NgxGalleryThumbnailsComponent]
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryArrowsComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-arrows',
                template: "<div class=\"ngx-gallery-arrows-wrapper ngx-gallery-arrow-left\">\n  <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handlePrevClick()\" [class.ngx-gallery-disabled]=\"prevDisabled\">\n    <i class=\"ngx-gallery-icon-content {{arrowPrevIcon}}\"></i>\n  </div>\n</div>\n<div class=\"ngx-gallery-arrows-wrapper ngx-gallery-arrow-right\">\n  <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handleNextClick()\" [class.ngx-gallery-disabled]=\"nextDisabled\">\n    <i class=\"ngx-gallery-icon-content {{arrowNextIcon}}\"></i>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ngx-gallery-arrow-wrapper{position:absolute;height:100%;width:1px;display:table;table-layout:fixed}.ngx-gallery-preview-img-wrapper .ngx-gallery-arrow-wrapper{z-index:10001}.ngx-gallery-arrow-left{left:0}.ngx-gallery-arrow-right{right:0}.ngx-gallery-arrow{top:50%;transform:translateY(-50%);cursor:pointer}.ngx-gallery-arrow.ngx-gallery-disabled{opacity:.6;cursor:default}.ngx-gallery-arrow-left .ngx-gallery-arrow{left:10px}.ngx-gallery-arrow-right .ngx-gallery-arrow{right:10px}"]
            }]
    }], function () { return []; }, { prevClick: [{
            type: Output
        }], nextClick: [{
            type: Output
        }], prevDisabled: [{
            type: Input
        }], nextDisabled: [{
            type: Input
        }], arrowPrevIcon: [{
            type: Input
        }], arrowNextIcon: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryActionComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-action',
                template: "<div class=\"ngx-gallery-icon\" [class.ngx-gallery-icon-disabled]=\"disabled\"\n     aria-hidden=\"true\"\n     title=\"{{ titleText }}\"\n     (click)=\"handleClick($event)\">\n  <i class=\"ngx-gallery-icon-content {{ icon }}\"></i>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ngx-gallery-icon{color:#fff;z-index:2000;display:inline-block;position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}"]
            }]
    }], function () { return []; }, { disabled: [{
            type: Input
        }], titleText: [{
            type: Input
        }], closeClick: [{
            type: Output
        }], icon: [{
            type: Input
        }] }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryBulletsComponent, [{
        type: Component,
        args: [{
                selector: 'ngx-gallery-bullets',
                template: "<div class=\"ngx-gallery-bullet\" *ngFor=\"let bullet of getBullets(); let i = index;\" (click)=\"handleChange($event, i)\"\n     [ngClass]=\"{ 'ngx-gallery-active': i == active }\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:absolute;z-index:2000;display:inline-flex;left:50%;transform:translateX(-50%);bottom:0;padding:10px}.ngx-gallery-bullet{width:10px;height:10px;border-radius:50%;cursor:pointer;background:#fff}.ngx-gallery-bullet:not(:first-child){margin-left:5px}.ngx-gallery-bullet.ngx-gallery-active,.ngx-gallery-bullet:hover{background:#000}"]
            }]
    }], function () { return []; }, { active: [{
            type: Input
        }], bulletChange: [{
            type: Output
        }], count: [{
            type: Input
        }] }); })();
const ɵCustomHammerConfig_BaseFactory = /*@__PURE__*/ ɵngcc0.ɵɵgetInheritedFactory(CustomHammerConfig);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(CustomHammerConfig, [{
        type: Injectable
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgxGalleryModule, { declarations: function () { return [NgxGalleryComponent, NgxGalleryImageComponent, NgxGalleryArrowsComponent, NgxGalleryThumbnailsComponent, NgxGalleryPreviewComponent, NgxGalleryActionComponent, NgxGalleryBulletsComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [NgxGalleryComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgxGalleryModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    NgxGalleryComponent,
                    NgxGalleryImageComponent,
                    NgxGalleryArrowsComponent,
                    NgxGalleryThumbnailsComponent,
                    NgxGalleryPreviewComponent,
                    NgxGalleryActionComponent,
                    NgxGalleryBulletsComponent
                ],
                imports: [CommonModule],
                exports: [NgxGalleryComponent],
                providers: [
                    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
                ]
            }]
    }], null, null); })();

class NgxGalleryImage {
    constructor(obj) {
        this.small = obj.small;
        this.medium = obj.medium;
        this.big = obj.big;
        this.description = obj.description;
        this.url = obj.url;
        this.type = obj.type;
        this.label = obj.label;
    }
}

/*
 * Public API Surface of ngx-gallery
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CustomHammerConfig, NgxGalleryAction, NgxGalleryAnimation, NgxGalleryArrowsComponent, NgxGalleryBulletsComponent, NgxGalleryComponent, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryLayout, NgxGalleryModule, NgxGalleryOptions, NgxGalleryOrder, NgxGalleryOrderedImage, NgxGalleryPreviewComponent, NgxGalleryService, NgxGalleryThumbnailsComponent, NgxGalleryImageComponent as ɵa, NgxGalleryActionComponent as ɵb };

//# sourceMappingURL=kolkov-ngx-gallery.js.map