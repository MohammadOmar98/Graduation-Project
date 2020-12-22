import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
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
NgxGalleryPreviewComponent = __decorate([
    Component({
        selector: 'ngx-gallery-preview',
        template: "<ngx-gallery-arrows *ngIf=\"arrows\" (prevClick)=\"showPrev()\" (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\"\n                    [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n<div class=\"ngx-gallery-preview-top\">\n  <div class=\"ngx-gallery-preview-icons\">\n    <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                        [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, index)\"></ngx-gallery-action>\n    <a *ngIf=\"download && src\" [href]=\"src\" class=\"ngx-gallery-icon\" aria-hidden=\"true\" download>\n      <i class=\"ngx-gallery-icon-content {{ downloadIcon }}\"></i>\n    </a>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\"\n                        (closeClick)=\"zoomOut()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\"\n                        (closeClick)=\"zoomIn()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (closeClick)=\"rotateLeft()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (closeClick)=\"rotateRight()\"></ngx-gallery-action>\n    <ngx-gallery-action *ngIf=\"fullscreen\" [icon]=\"'ngx-gallery-fullscreen ' + fullscreenIcon\"\n                        (closeClick)=\"manageFullscreen()\"></ngx-gallery-action>\n    <ngx-gallery-action [icon]=\"'ngx-gallery-close ' + closeIcon\" (closeClick)=\"close()\"></ngx-gallery-action>\n  </div>\n</div>\n<div class=\"ngx-spinner-wrapper ngx-gallery-center\" [class.ngx-gallery-active]=\"showSpinner\">\n  <i class=\"ngx-gallery-icon ngx-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i>\n</div>\n<div class=\"ngx-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\"\n     (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n  <div class=\"ngx-gallery-preview-img-wrapper\">\n    <img *ngIf=\"src && type == 'image'\" #previewImage class=\"ngx-gallery-preview-img ngx-gallery-center\" [src]=\"src\"\n         (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\"\n         (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n         [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\"\n         [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n    <video *ngIf=\"src && type == 'video'\"  #previewImage controls style=\"width: 100%; height: 100%;\"\n    class=\"ngx-gallery-preview-img ngx-gallery-center\"\n    (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\"\n    [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\">\n      <source [src]=\"src\">\n      Your browser does not support the video tag.\n    </video>\n    <ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"index\"\n                         (bulletChange)=\"showAtIndex($event)\"></ngx-gallery-bullets>\n  </div>\n  <div class=\"ngx-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\"\n       (click)=\"$event.stopPropagation()\"></div>\n</div>\n",
        // encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host.ngx-gallery-active{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.7);z-index:10000;display:inline-block;font-size:50px!important}:host{display:none;font-size:50px!important}:host .ngx-gallery-arrow{font-size:50px!important}ngx-gallery-bullets{height:5%;align-items:center;padding:0}.ngx-gallery-preview-img{opacity:0;max-width:90%;max-height:90%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:transform .5s}.ngx-gallery-preview-img.animation{transition:opacity .5s linear,transform .5s}.ngx-gallery-preview-img.ngx-gallery-active{opacity:1}.ngx-gallery-preview-img.ngx-gallery-grab{cursor:-webkit-grab;cursor:grab}.ngx-gallery-icon.ngx-gallery-spinner{font-size:50px;left:0;display:inline-block}:host .ngx-gallery-preview-top{position:absolute;width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:25px}.ngx-gallery-preview-icons{float:right}.ngx-gallery-preview-icons .ngx-gallery-icon{position:relative;margin-right:10px;margin-top:10px;font-size:25px;cursor:pointer;text-decoration:none}.ngx-gallery-preview-icons .ngx-gallery-icon.ngx-gallery-icon-disabled{cursor:default;opacity:.4}.ngx-spinner-wrapper{width:50px;height:50px;display:none}.ngx-spinner-wrapper.ngx-gallery-active{display:inline-block}.ngx-gallery-center{position:absolute;left:0;right:0;bottom:0;margin:auto;top:0}.ngx-gallery-preview-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;flex:0 1 auto;z-index:10}.ngx-gallery-preview-wrapper{width:100%;height:100%;display:flex;flex-flow:column}.ngx-gallery-preview-img-wrapper{flex:1 1 auto;position:relative}"]
    })
], NgxGalleryPreviewComponent);
export { NgxGalleryPreviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LXByZXZpZXcvbmd4LWdhbGxlcnktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQVd6RCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQWdFckMsWUFBb0IsWUFBMEIsRUFBVSxVQUFzQixFQUMxRCxhQUFnQyxFQUFVLFFBQW1CLEVBQzdELGlCQUFvQztRQUZwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDMUQsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUM3RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBN0R4RCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixVQUFLLEdBQUcs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QjtBQUNwQjtJQUFSLEtBQUssRUFBRTs2REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7MkRBQTZCO0FBQzVCO0lBQVIsS0FBSyxFQUFFOzBEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTtrRUFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7bUVBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOzREQUFtQjtBQUNsQjtJQUFSLEtBQUssRUFBRTtnRUFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7MkRBQWlCO0FBRWY7SUFBVCxNQUFNLEVBQUU7K0RBQWtDO0FBQ2pDO0lBQVQsTUFBTSxFQUFFO2dFQUFtQztBQUNsQztJQUFULE1BQU0sRUFBRTtnRUFBMkM7QUFFekI7SUFBMUIsU0FBUyxDQUFDLGNBQWMsQ0FBQztnRUFBMEI7QUFvQ3hCO0lBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7OERBSTFCO0FBRTJCO0lBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7OERBSTFCO0FBbEdVLDBCQUEwQjtJQVB0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUscUJBQXFCO1FBQy9CLG92SEFBbUQ7UUFFbkQseUNBQXlDO1FBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csMEJBQTBCLENBd2J0QztTQXhiWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVN0eWxlLCBTYWZlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tmd4R2FsbGVyeVNlcnZpY2V9IGZyb20gJy4uL25neC1nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5QWN0aW9ufSBmcm9tICcuLi9uZ3gtZ2FsbGVyeS1hY3Rpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1nYWxsZXJ5LXByZXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnktcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50LnNjc3MnXSxcbiAgLy8gZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4R2FsbGVyeVByZXZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgc3JjOiBTYWZlVXJsO1xuICBzcmNJbmRleDogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHNob3dTcGlubmVyID0gZmFsc2U7XG4gIHBvc2l0aW9uTGVmdCA9IDA7XG4gIHBvc2l0aW9uVG9wID0gMDtcbiAgem9vbVZhbHVlID0gMTtcbiAgbG9hZGluZyA9IGZhbHNlO1xuICByb3RhdGVWYWx1ZSA9IDA7XG4gIGluZGV4ID0gMDtcblxuICBASW5wdXQoKSBpbWFnZXM6IHN0cmluZ1tdIHwgU2FmZVJlc291cmNlVXJsW107XG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uczogc3RyaW5nW107XG4gIEBJbnB1dCgpIHNob3dEZXNjcmlwdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJyb3dzOiBib29sZWFuO1xuICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc3dpcGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZ1bGxzY3JlZW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcmNlRnVsbHNjcmVlbjogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xvc2VPbkNsaWNrOiBib29sZWFuO1xuICBASW5wdXQoKSBjbG9zZU9uRXNjOiBib29sZWFuO1xuICBASW5wdXQoKSBrZXlib2FyZE5hdmlnYXRpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFycm93UHJldkljb246IHN0cmluZztcbiAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBjbG9zZUljb246IHN0cmluZztcbiAgQElucHV0KCkgZnVsbHNjcmVlbkljb246IHN0cmluZztcbiAgQElucHV0KCkgc3Bpbm5lckljb246IHN0cmluZztcbiAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9QbGF5SW50ZXJ2YWw6IG51bWJlcjtcbiAgQElucHV0KCkgYXV0b1BsYXlQYXVzZU9uSG92ZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGluZmluaXR5TW92ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgem9vbTogYm9vbGVhbjtcbiAgQElucHV0KCkgem9vbVN0ZXA6IG51bWJlcjtcbiAgQElucHV0KCkgem9vbU1heDogbnVtYmVyO1xuICBASW5wdXQoKSB6b29tTWluOiBudW1iZXI7XG4gIEBJbnB1dCgpIHpvb21Jbkljb246IHN0cmluZztcbiAgQElucHV0KCkgem9vbU91dEljb246IHN0cmluZztcbiAgQElucHV0KCkgYW5pbWF0aW9uOiBib29sZWFuO1xuICBASW5wdXQoKSBhY3Rpb25zOiBOZ3hHYWxsZXJ5QWN0aW9uW107XG4gIEBJbnB1dCgpIHJvdGF0ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgcm90YXRlTGVmdEljb246IHN0cmluZztcbiAgQElucHV0KCkgcm90YXRlUmlnaHRJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvd25sb2FkOiBib29sZWFuO1xuICBASW5wdXQoKSBkb3dubG9hZEljb246IHN0cmluZztcbiAgQElucHV0KCkgYnVsbGV0czogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBwcmV2aWV3T3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3ByZXZpZXdJbWFnZScpIHByZXZpZXdJbWFnZTogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIGlzT3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIHRpbWVyO1xuICBwcml2YXRlIGluaXRpYWxYID0gMDtcbiAgcHJpdmF0ZSBpbml0aWFsWSA9IDA7XG4gIHByaXZhdGUgaW5pdGlhbExlZnQgPSAwO1xuICBwcml2YXRlIGluaXRpYWxUb3AgPSAwO1xuICBwcml2YXRlIGlzTW92ZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUga2V5RG93bkxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemF0aW9uOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBoZWxwZXJTZXJ2aWNlOiBOZ3hHYWxsZXJ5U2VydmljZSwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzICYmIHRoaXMuYXJyb3dzQXV0b0hpZGUpIHtcbiAgICAgIHRoaXMuYXJyb3dzID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnN3aXBlKSB7XG4gICAgICB0aGlzLmhlbHBlclNlcnZpY2UubWFuYWdlU3dpcGUodGhpcy5zd2lwZSwgdGhpcy5lbGVtZW50UmVmLFxuICAgICAgICAncHJldmlldycsICgpID0+IHRoaXMuc2hvd05leHQoKSwgKCkgPT4gdGhpcy5zaG93UHJldigpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5rZXlEb3duTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMua2V5RG93bkxpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcbiAgICBpZiAodGhpcy5hcnJvd3NBdXRvSGlkZSAmJiAhdGhpcy5hcnJvd3MpIHtcbiAgICAgIHRoaXMuYXJyb3dzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLmFycm93c0F1dG9IaWRlICYmIHRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uS2V5RG93bihlKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICBpZiAodGhpcy5rZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNLZXlib2FyZFByZXYoZSkpIHtcbiAgICAgICAgICB0aGlzLnNob3dQcmV2KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0tleWJvYXJkTmV4dChlKSkge1xuICAgICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzYyAmJiB0aGlzLmlzS2V5Ym9hcmRFc2MoZSkpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9wZW4oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucHJldmlld09wZW4uZW1pdCgpO1xuXG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLnNob3codHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5mb3JjZUZ1bGxzY3JlZW4pIHtcbiAgICAgIHRoaXMubWFuYWdlRnVsbHNjcmVlbigpO1xuICAgIH1cblxuICAgIHRoaXMua2V5RG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdrZXlkb3duJywgKGUpID0+IHRoaXMub25LZXlEb3duKGUpKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jbG9zZUZ1bGxzY3JlZW4oKTtcbiAgICB0aGlzLnByZXZpZXdDbG9zZS5lbWl0KCk7XG5cbiAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgaWYgKHRoaXMua2V5RG93bkxpc3RlbmVyKSB7XG4gICAgICB0aGlzLmtleURvd25MaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIGltYWdlTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvUGxheSAmJiB0aGlzLmF1dG9QbGF5UGF1c2VPbkhvdmVyKSB7XG4gICAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIGltYWdlTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvUGxheSAmJiB0aGlzLmF1dG9QbGF5UGF1c2VPbkhvdmVyKSB7XG4gICAgICB0aGlzLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydEF1dG9QbGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5zaG93TmV4dCgpKSB7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xuICAgICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5hdXRvUGxheUludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBzdG9wQXV0b1BsYXkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICB9XG4gIH1cblxuICBzaG93QXRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgc2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuY2FuU2hvd05leHQoKSkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuXG4gICAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNob3coKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuU2hvd1ByZXYoKSkge1xuICAgICAgdGhpcy5pbmRleC0tO1xuXG4gICAgICBpZiAodGhpcy5pbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaW1hZ2VzKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbmZpbml0eU1vdmUgfHwgdGhpcy5pbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYW5TaG93UHJldigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuaW5kZXggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbWFuYWdlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mdWxsc2NyZWVuIHx8IHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICBjb25zdCBkb2MgPSBkb2N1bWVudCBhcyBhbnk7XG5cbiAgICAgIGlmICghZG9jLmZ1bGxzY3JlZW5FbGVtZW50ICYmICFkb2MubW96RnVsbFNjcmVlbkVsZW1lbnRcbiAgICAgICAgJiYgIWRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5vcGVuRnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbG9zZUZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTYWZlVXJsKGltYWdlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFVybChpbWFnZSk7XG4gIH1cblxuICBnZXRGaWxlVHlwZSAoZmlsZVNvdXJjZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5oZWxwZXJTZXJ2aWNlLmdldEZpbGVUeXBlKGZpbGVTb3VyY2UpO1xuICB9XG5cbiAgem9vbUluKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhblpvb21JbigpKSB7XG4gICAgICB0aGlzLnpvb21WYWx1ZSArPSB0aGlzLnpvb21TdGVwO1xuXG4gICAgICBpZiAodGhpcy56b29tVmFsdWUgPiB0aGlzLnpvb21NYXgpIHtcbiAgICAgICAgdGhpcy56b29tVmFsdWUgPSB0aGlzLnpvb21NYXg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgem9vbU91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5ab29tT3V0KCkpIHtcbiAgICAgIHRoaXMuem9vbVZhbHVlIC09IHRoaXMuem9vbVN0ZXA7XG5cbiAgICAgIGlmICh0aGlzLnpvb21WYWx1ZSA8IHRoaXMuem9vbU1pbikge1xuICAgICAgICB0aGlzLnpvb21WYWx1ZSA9IHRoaXMuem9vbU1pbjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuem9vbVZhbHVlIDw9IDEpIHtcbiAgICAgICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcm90YXRlTGVmdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdGF0ZVZhbHVlIC09IDkwO1xuICB9XG5cbiAgcm90YXRlUmlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3RhdGVWYWx1ZSArPSA5MDtcbiAgfVxuXG4gIGdldFRyYW5zZm9ybSgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoJ3NjYWxlKCcgKyB0aGlzLnpvb21WYWx1ZSArICcpIHJvdGF0ZSgnICsgdGhpcy5yb3RhdGVWYWx1ZSArICdkZWcpJyk7XG4gIH1cblxuICBjYW5ab29tSW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVZhbHVlIDwgdGhpcy56b29tTWF4O1xuICB9XG5cbiAgY2FuWm9vbU91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy56b29tVmFsdWUgPiB0aGlzLnpvb21NaW47XG4gIH1cblxuICBjYW5EcmFnT25ab29tKCkge1xuICAgIHJldHVybiB0aGlzLnpvb20gJiYgdGhpcy56b29tVmFsdWUgPiAxO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuRHJhZ09uWm9vbSgpKSB7XG4gICAgICB0aGlzLmluaXRpYWxYID0gdGhpcy5nZXRDbGllbnRYKGUpO1xuICAgICAgdGhpcy5pbml0aWFsWSA9IHRoaXMuZ2V0Q2xpZW50WShlKTtcbiAgICAgIHRoaXMuaW5pdGlhbExlZnQgPSB0aGlzLnBvc2l0aW9uTGVmdDtcbiAgICAgIHRoaXMuaW5pdGlhbFRvcCA9IHRoaXMucG9zaXRpb25Ub3A7XG4gICAgICB0aGlzLmlzTW92ZSA9IHRydWU7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihlKTogdm9pZCB7XG4gICAgdGhpcy5pc01vdmUgPSBmYWxzZTtcbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuICAgIGlmICh0aGlzLmlzTW92ZSkge1xuICAgICAgdGhpcy5wb3NpdGlvbkxlZnQgPSB0aGlzLmluaXRpYWxMZWZ0ICsgKHRoaXMuZ2V0Q2xpZW50WChlKSAtIHRoaXMuaW5pdGlhbFgpO1xuICAgICAgdGhpcy5wb3NpdGlvblRvcCA9IHRoaXMuaW5pdGlhbFRvcCArICh0aGlzLmdldENsaWVudFkoZSkgLSB0aGlzLmluaXRpYWxZKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldENsaWVudFgoZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gIH1cblxuICBwcml2YXRlIGdldENsaWVudFkoZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID8gZS50b3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMuem9vbSkge1xuICAgICAgdGhpcy5wb3NpdGlvbkxlZnQgPSAwO1xuICAgICAgdGhpcy5wb3NpdGlvblRvcCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0tleWJvYXJkTmV4dChlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGUua2V5Q29kZSA9PT0gMzk7XG4gIH1cblxuICBwcml2YXRlIGlzS2V5Ym9hcmRQcmV2KGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZS5rZXlDb2RlID09PSAzNztcbiAgfVxuXG4gIHByaXZhdGUgaXNLZXlib2FyZEVzYyhlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGUua2V5Q29kZSA9PT0gMjc7XG4gIH1cblxuICBwcml2YXRlIG9wZW5GdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgYXMgYW55O1xuXG4gICAgaWYgKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICBlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50IGFzIGFueTtcblxuICAgICAgaWYgKGRvYy5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2MuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1zRXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgZG9jLm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNGdWxsc2NyZWVuKCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50IGFzIGFueTtcblxuICAgIHJldHVybiBkb2MuZnVsbHNjcmVlbkVsZW1lbnQgfHwgZG9jLndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50XG4gICAgICB8fCBkb2MubW96RnVsbFNjcmVlbkVsZW1lbnQgfHwgZG9jLm1zRnVsbHNjcmVlbkVsZW1lbnQ7XG4gIH1cblxuXG4gIHByaXZhdGUgc2hvdyhmaXJzdCA9IGZhbHNlKSB7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgdGhpcy5hY3RpdmVDaGFuZ2UuZW1pdCh0aGlzLmluZGV4KTtcblxuICAgIGlmIChmaXJzdCB8fCAhdGhpcy5hbmltYXRpb24pIHtcbiAgICAgIHRoaXMuX3Nob3coKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zaG93KCksIDYwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2hvdygpIHtcbiAgICB0aGlzLnpvb21WYWx1ZSA9IDE7XG4gICAgdGhpcy5yb3RhdGVWYWx1ZSA9IDA7XG4gICAgdGhpcy5yZXNldFBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLnNyYyA9IHRoaXMuZ2V0U2FmZVVybCh0aGlzLmltYWdlc1t0aGlzLmluZGV4XSBhcyBzdHJpbmcpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuZ2V0RmlsZVR5cGUodGhpcy5pbWFnZXNbdGhpcy5pbmRleF0gYXMgc3RyaW5nKTtcbiAgICB0aGlzLnNyY0luZGV4ID0gdGhpcy5pbmRleDtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbnNbdGhpcy5pbmRleF07XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNMb2FkZWQodGhpcy5wcmV2aWV3SW1hZ2UubmF0aXZlRWxlbWVudCkgfHwgdGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByZXZpZXdJbWFnZS5uYXRpdmVFbGVtZW50Lm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNob3dTcGlubmVyID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2UubmF0aXZlRWxlbWVudC5vbmxvYWQgPSBudWxsO1xuICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzTG9hZGVkKGltZyk6IGJvb2xlYW4ge1xuICAgIGlmICghaW1nLmNvbXBsZXRlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEodHlwZW9mIGltZy5uYXR1cmFsV2lkdGggIT09ICd1bmRlZmluZWQnICYmIGltZy5uYXR1cmFsV2lkdGggPT09IDApO1xuICB9XG5cbn1cbiJdfQ==