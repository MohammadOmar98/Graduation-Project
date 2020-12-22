import { __decorate } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
var NgxGalleryPreviewComponent = /** @class */ (function () {
    function NgxGalleryPreviewComponent(sanitization, elementRef, helperService, renderer, changeDetectorRef) {
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
    NgxGalleryPreviewComponent.prototype.ngOnInit = function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
    };
    NgxGalleryPreviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    NgxGalleryPreviewComponent.prototype.ngOnDestroy = function () {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    NgxGalleryPreviewComponent.prototype.onMouseEnter = function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
    };
    NgxGalleryPreviewComponent.prototype.onMouseLeave = function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
    };
    NgxGalleryPreviewComponent.prototype.onKeyDown = function (e) {
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
    };
    NgxGalleryPreviewComponent.prototype.open = function (index) {
        var _this = this;
        this.previewOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listen('window', 'keydown', function (e) { return _this.onKeyDown(e); });
    };
    NgxGalleryPreviewComponent.prototype.close = function () {
        this.isOpen = false;
        this.closeFullscreen();
        this.previewClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    NgxGalleryPreviewComponent.prototype.imageMouseEnter = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    NgxGalleryPreviewComponent.prototype.imageMouseLeave = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    NgxGalleryPreviewComponent.prototype.startAutoPlay = function () {
        var _this = this;
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(function () {
                if (!_this.showNext()) {
                    _this.index = -1;
                    _this.showNext();
                }
            }, this.autoPlayInterval);
        }
    };
    NgxGalleryPreviewComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    NgxGalleryPreviewComponent.prototype.showAtIndex = function (index) {
        this.index = index;
        this.show();
    };
    NgxGalleryPreviewComponent.prototype.showNext = function () {
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
    };
    NgxGalleryPreviewComponent.prototype.showPrev = function () {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.images.length - 1;
            }
            this.show();
        }
    };
    NgxGalleryPreviewComponent.prototype.canShowNext = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index < this.images.length - 1;
        }
        else {
            return false;
        }
    };
    NgxGalleryPreviewComponent.prototype.canShowPrev = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index > 0;
        }
        else {
            return false;
        }
    };
    NgxGalleryPreviewComponent.prototype.manageFullscreen = function () {
        if (this.fullscreen || this.forceFullscreen) {
            var doc = document;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustUrl(image);
    };
    NgxGalleryPreviewComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryPreviewComponent.prototype.zoomIn = function () {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.zoomOut = function () {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    };
    NgxGalleryPreviewComponent.prototype.rotateLeft = function () {
        this.rotateValue -= 90;
    };
    NgxGalleryPreviewComponent.prototype.rotateRight = function () {
        this.rotateValue += 90;
    };
    NgxGalleryPreviewComponent.prototype.getTransform = function () {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    };
    NgxGalleryPreviewComponent.prototype.canZoomIn = function () {
        return this.zoomValue < this.zoomMax;
    };
    NgxGalleryPreviewComponent.prototype.canZoomOut = function () {
        return this.zoomValue > this.zoomMin;
    };
    NgxGalleryPreviewComponent.prototype.canDragOnZoom = function () {
        return this.zoom && this.zoomValue > 1;
    };
    NgxGalleryPreviewComponent.prototype.mouseDownHandler = function (e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    };
    NgxGalleryPreviewComponent.prototype.mouseUpHandler = function (e) {
        this.isMove = false;
    };
    NgxGalleryPreviewComponent.prototype.mouseMoveHandler = function (e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    };
    NgxGalleryPreviewComponent.prototype.getClientX = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    };
    NgxGalleryPreviewComponent.prototype.getClientY = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    };
    NgxGalleryPreviewComponent.prototype.resetPosition = function () {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardNext = function (e) {
        return e.keyCode === 39;
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardPrev = function (e) {
        return e.keyCode === 37;
    };
    NgxGalleryPreviewComponent.prototype.isKeyboardEsc = function (e) {
        return e.keyCode === 27;
    };
    NgxGalleryPreviewComponent.prototype.openFullscreen = function () {
        var element = document.documentElement;
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
    };
    NgxGalleryPreviewComponent.prototype.closeFullscreen = function () {
        if (this.isFullscreen()) {
            var doc = document;
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
    };
    NgxGalleryPreviewComponent.prototype.isFullscreen = function () {
        var doc = document;
        return doc.fullscreenElement || doc.webkitFullscreenElement
            || doc.mozFullScreenElement || doc.msFullscreenElement;
    };
    NgxGalleryPreviewComponent.prototype.show = function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        this.loading = true;
        this.stopAutoPlay();
        this.activeChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(function () { return _this._show(); }, 600);
        }
    };
    NgxGalleryPreviewComponent.prototype._show = function () {
        var _this = this;
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.getSafeUrl(this.images[this.index]);
        this.type = this.getFileType(this.images[this.index]);
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        this.changeDetectorRef.markForCheck();
        setTimeout(function () {
            if (_this.isLoaded(_this.previewImage.nativeElement) || _this.type === 'video') {
                _this.loading = false;
                _this.startAutoPlay();
                _this.changeDetectorRef.markForCheck();
            }
            else if (_this.type === 'video') {
            }
            else {
                setTimeout(function () {
                    if (_this.loading) {
                        _this.showSpinner = true;
                        _this.changeDetectorRef.markForCheck();
                    }
                });
                _this.previewImage.nativeElement.onload = function () {
                    _this.loading = false;
                    _this.showSpinner = false;
                    _this.previewImage.nativeElement.onload = null;
                    _this.startAutoPlay();
                    _this.changeDetectorRef.markForCheck();
                };
            }
        });
    };
    NgxGalleryPreviewComponent.prototype.isLoaded = function (img) {
        if (!img.complete) {
            return false;
        }
        return !(typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0);
    };
    NgxGalleryPreviewComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return NgxGalleryPreviewComponent;
}());
export { NgxGalleryPreviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LXByZXZpZXcvbmd4LWdhbGxlcnktcHJldmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxhQUFhLEVBQ2IsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQVd6RDtJQWdFRSxvQ0FBb0IsWUFBMEIsRUFBVSxVQUFzQixFQUMxRCxhQUFnQyxFQUFVLFFBQW1CLEVBQzdELGlCQUFvQztRQUZwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDMUQsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUM3RCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBN0R4RCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBcUNBLGdCQUFXLEdBQUcsSUFB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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVTdHlsZSwgU2FmZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge05neEdhbGxlcnlTZXJ2aWNlfSBmcm9tICcuLi9uZ3gtZ2FsbGVyeS5zZXJ2aWNlJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFjdGlvbn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktYWN0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZ2FsbGVyeS1wcmV2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIC8vIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlQcmV2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHNyYzogU2FmZVVybDtcbiAgc3JjSW5kZXg6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBzaG93U3Bpbm5lciA9IGZhbHNlO1xuICBwb3NpdGlvbkxlZnQgPSAwO1xuICBwb3NpdGlvblRvcCA9IDA7XG4gIHpvb21WYWx1ZSA9IDE7XG4gIGxvYWRpbmcgPSBmYWxzZTtcbiAgcm90YXRlVmFsdWUgPSAwO1xuICBpbmRleCA9IDA7XG5cbiAgQElucHV0KCkgaW1hZ2VzOiBzdHJpbmdbXSB8IFNhZmVSZXNvdXJjZVVybFtdO1xuICBASW5wdXQoKSBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBzaG93RGVzY3JpcHRpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFycm93czogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJyb3dzQXV0b0hpZGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN3aXBlOiBib29sZWFuO1xuICBASW5wdXQoKSBmdWxsc2NyZWVuOiBib29sZWFuO1xuICBASW5wdXQoKSBmb3JjZUZ1bGxzY3JlZW46IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsb3NlT25DbGljazogYm9vbGVhbjtcbiAgQElucHV0KCkgY2xvc2VPbkVzYzogYm9vbGVhbjtcbiAgQElucHV0KCkga2V5Ym9hcmROYXZpZ2F0aW9uOiBib29sZWFuO1xuICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFycm93TmV4dEljb246IHN0cmluZztcbiAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZ1bGxzY3JlZW5JY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNwaW5uZXJJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvUGxheUludGVydmFsOiBudW1iZXI7XG4gIEBJbnB1dCgpIGF1dG9QbGF5UGF1c2VPbkhvdmVyOiBib29sZWFuO1xuICBASW5wdXQoKSBpbmZpbml0eU1vdmU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHpvb206IGJvb2xlYW47XG4gIEBJbnB1dCgpIHpvb21TdGVwOiBudW1iZXI7XG4gIEBJbnB1dCgpIHpvb21NYXg6IG51bWJlcjtcbiAgQElucHV0KCkgem9vbU1pbjogbnVtYmVyO1xuICBASW5wdXQoKSB6b29tSW5JY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHpvb21PdXRJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aW9uczogTmd4R2FsbGVyeUFjdGlvbltdO1xuICBASW5wdXQoKSByb3RhdGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvdGF0ZUxlZnRJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJvdGF0ZVJpZ2h0SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBkb3dubG9hZDogYm9vbGVhbjtcbiAgQElucHV0KCkgZG93bmxvYWRJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJ1bGxldHM6IHN0cmluZztcblxuICBAT3V0cHV0KCkgcHJldmlld09wZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3Q2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAVmlld0NoaWxkKCdwcmV2aWV3SW1hZ2UnKSBwcmV2aWV3SW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBpc09wZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB0aW1lcjtcbiAgcHJpdmF0ZSBpbml0aWFsWCA9IDA7XG4gIHByaXZhdGUgaW5pdGlhbFkgPSAwO1xuICBwcml2YXRlIGluaXRpYWxMZWZ0ID0gMDtcbiAgcHJpdmF0ZSBpbml0aWFsVG9wID0gMDtcbiAgcHJpdmF0ZSBpc01vdmUgPSBmYWxzZTtcblxuICBwcml2YXRlIGtleURvd25MaXN0ZW5lcjogKCkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogTmd4R2FsbGVyeVNlcnZpY2UsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmFycm93cyAmJiB0aGlzLmFycm93c0F1dG9IaWRlKSB7XG4gICAgICB0aGlzLmFycm93cyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5zd2lwZSkge1xuICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZixcbiAgICAgICAgJ3ByZXZpZXcnLCAoKSA9PiB0aGlzLnNob3dOZXh0KCksICgpID0+IHRoaXMuc2hvd1ByZXYoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMua2V5RG93bkxpc3RlbmVyKSB7XG4gICAgICB0aGlzLmtleURvd25MaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzQXV0b0hpZGUgJiYgIXRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAodGhpcy5hcnJvd3NBdXRvSGlkZSAmJiB0aGlzLmFycm93cykge1xuICAgICAgdGhpcy5hcnJvd3MgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvbktleURvd24oZSkge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgaWYgKHRoaXMua2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmlzS2V5Ym9hcmRQcmV2KGUpKSB7XG4gICAgICAgICAgdGhpcy5zaG93UHJldigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNLZXlib2FyZE5leHQoZSkpIHtcbiAgICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2MgJiYgdGhpcy5pc0tleWJvYXJkRXNjKGUpKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvcGVuKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpZXdPcGVuLmVtaXQoKTtcblxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5zaG93KHRydWUpO1xuXG4gICAgaWYgKHRoaXMuZm9yY2VGdWxsc2NyZWVuKSB7XG4gICAgICB0aGlzLm1hbmFnZUZ1bGxzY3JlZW4oKTtcbiAgICB9XG5cbiAgICB0aGlzLmtleURvd25MaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAna2V5ZG93bicsIChlKSA9PiB0aGlzLm9uS2V5RG93bihlKSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgdGhpcy5wcmV2aWV3Q2xvc2UuZW1pdCgpO1xuXG4gICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgIGlmICh0aGlzLmtleURvd25MaXN0ZW5lcikge1xuICAgICAgdGhpcy5rZXlEb3duTGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBpbWFnZU1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBpbWFnZU1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRBdXRvUGxheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvUGxheSkge1xuICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc2hvd05leHQoKSkge1xuICAgICAgICAgIHRoaXMuaW5kZXggPSAtMTtcbiAgICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMuYXV0b1BsYXlJbnRlcnZhbCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcEF1dG9QbGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuICB9XG5cbiAgc2hvd0F0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnNob3coKTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhblNob3dOZXh0KCkpIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcblxuICAgICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zaG93KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHNob3dQcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhblNob3dQcmV2KCkpIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcblxuICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBjYW5TaG93TmV4dCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuaW5kZXggPCB0aGlzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLmluZGV4ID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hbmFnZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZnVsbHNjcmVlbiB8fCB0aGlzLmZvcmNlRnVsbHNjcmVlbikge1xuICAgICAgY29uc3QgZG9jID0gZG9jdW1lbnQgYXMgYW55O1xuXG4gICAgICBpZiAoIWRvYy5mdWxsc2NyZWVuRWxlbWVudCAmJiAhZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50XG4gICAgICAgICYmICFkb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgIWRvYy5tc0Z1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgIHRoaXMub3BlbkZ1bGxzY3JlZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2VGdWxsc2NyZWVuKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U2FmZVVybChpbWFnZTogc3RyaW5nKTogU2FmZVVybCB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoaW1hZ2UpO1xuICB9XG5cbiAgZ2V0RmlsZVR5cGUgKGZpbGVTb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVyU2VydmljZS5nZXRGaWxlVHlwZShmaWxlU291cmNlKTtcbiAgfVxuXG4gIHpvb21JbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5ab29tSW4oKSkge1xuICAgICAgdGhpcy56b29tVmFsdWUgKz0gdGhpcy56b29tU3RlcDtcblxuICAgICAgaWYgKHRoaXMuem9vbVZhbHVlID4gdGhpcy56b29tTWF4KSB7XG4gICAgICAgIHRoaXMuem9vbVZhbHVlID0gdGhpcy56b29tTWF4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHpvb21PdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuWm9vbU91dCgpKSB7XG4gICAgICB0aGlzLnpvb21WYWx1ZSAtPSB0aGlzLnpvb21TdGVwO1xuXG4gICAgICBpZiAodGhpcy56b29tVmFsdWUgPCB0aGlzLnpvb21NaW4pIHtcbiAgICAgICAgdGhpcy56b29tVmFsdWUgPSB0aGlzLnpvb21NaW47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnpvb21WYWx1ZSA8PSAxKSB7XG4gICAgICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJvdGF0ZUxlZnQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3RhdGVWYWx1ZSAtPSA5MDtcbiAgfVxuXG4gIHJvdGF0ZVJpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMucm90YXRlVmFsdWUgKz0gOTA7XG4gIH1cblxuICBnZXRUcmFuc2Zvcm0oKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKCdzY2FsZSgnICsgdGhpcy56b29tVmFsdWUgKyAnKSByb3RhdGUoJyArIHRoaXMucm90YXRlVmFsdWUgKyAnZGVnKScpO1xuICB9XG5cbiAgY2FuWm9vbUluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnpvb21WYWx1ZSA8IHRoaXMuem9vbU1heDtcbiAgfVxuXG4gIGNhblpvb21PdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuem9vbVZhbHVlID4gdGhpcy56b29tTWluO1xuICB9XG5cbiAgY2FuRHJhZ09uWm9vbSgpIHtcbiAgICByZXR1cm4gdGhpcy56b29tICYmIHRoaXMuem9vbVZhbHVlID4gMTtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIoZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbkRyYWdPblpvb20oKSkge1xuICAgICAgdGhpcy5pbml0aWFsWCA9IHRoaXMuZ2V0Q2xpZW50WChlKTtcbiAgICAgIHRoaXMuaW5pdGlhbFkgPSB0aGlzLmdldENsaWVudFkoZSk7XG4gICAgICB0aGlzLmluaXRpYWxMZWZ0ID0gdGhpcy5wb3NpdGlvbkxlZnQ7XG4gICAgICB0aGlzLmluaXRpYWxUb3AgPSB0aGlzLnBvc2l0aW9uVG9wO1xuICAgICAgdGhpcy5pc01vdmUgPSB0cnVlO1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIoZSk6IHZvaWQge1xuICAgIHRoaXMuaXNNb3ZlID0gZmFsc2U7XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKGUpIHtcbiAgICBpZiAodGhpcy5pc01vdmUpIHtcbiAgICAgIHRoaXMucG9zaXRpb25MZWZ0ID0gdGhpcy5pbml0aWFsTGVmdCArICh0aGlzLmdldENsaWVudFgoZSkgLSB0aGlzLmluaXRpYWxYKTtcbiAgICAgIHRoaXMucG9zaXRpb25Ub3AgPSB0aGlzLmluaXRpYWxUb3AgKyAodGhpcy5nZXRDbGllbnRZKGUpIC0gdGhpcy5pbml0aWFsWSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbGllbnRYKGUpOiBudW1iZXIge1xuICAgIHJldHVybiBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbGllbnRZKGUpOiBudW1iZXIge1xuICAgIHJldHVybiBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA/IGUudG91Y2hlc1swXS5jbGllbnRZIDogZS5jbGllbnRZO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLnpvb20pIHtcbiAgICAgIHRoaXMucG9zaXRpb25MZWZ0ID0gMDtcbiAgICAgIHRoaXMucG9zaXRpb25Ub3AgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNLZXlib2FyZE5leHQoZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlLmtleUNvZGUgPT09IDM5O1xuICB9XG5cbiAgcHJpdmF0ZSBpc0tleWJvYXJkUHJldihlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGUua2V5Q29kZSA9PT0gMzc7XG4gIH1cblxuICBwcml2YXRlIGlzS2V5Ym9hcmRFc2MoZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBlLmtleUNvZGUgPT09IDI3O1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IGFzIGFueTtcblxuICAgIGlmIChlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICBlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgIGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbigpKSB7XG4gICAgICBjb25zdCBkb2MgPSBkb2N1bWVudCBhcyBhbnk7XG5cbiAgICAgIGlmIChkb2MuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgZG9jLmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgIGRvYy5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgIGRvYy5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICB9IGVsc2UgaWYgKGRvYy53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICBkb2Mud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzRnVsbHNjcmVlbigpIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudCBhcyBhbnk7XG5cbiAgICByZXR1cm4gZG9jLmZ1bGxzY3JlZW5FbGVtZW50IHx8IGRvYy53ZWJraXRGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgfHwgZG9jLm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8IGRvYy5tc0Z1bGxzY3JlZW5FbGVtZW50O1xuICB9XG5cblxuICBwcml2YXRlIHNob3coZmlyc3QgPSBmYWxzZSkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcblxuICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5pbmRleCk7XG5cbiAgICBpZiAoZmlyc3QgfHwgIXRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fc2hvdygpLCA2MDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Nob3coKSB7XG4gICAgdGhpcy56b29tVmFsdWUgPSAxO1xuICAgIHRoaXMucm90YXRlVmFsdWUgPSAwO1xuICAgIHRoaXMucmVzZXRQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5zcmMgPSB0aGlzLmdldFNhZmVVcmwodGhpcy5pbWFnZXNbdGhpcy5pbmRleF0gYXMgc3RyaW5nKTtcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmdldEZpbGVUeXBlKHRoaXMuaW1hZ2VzW3RoaXMuaW5kZXhdIGFzIHN0cmluZyk7XG4gICAgdGhpcy5zcmNJbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRoaXMuZGVzY3JpcHRpb25zW3RoaXMuaW5kZXhdO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzTG9hZGVkKHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQpIHx8IHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydEF1dG9QbGF5KCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcmV2aWV3SW1hZ2UubmF0aXZlRWxlbWVudC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zaG93U3Bpbm5lciA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucHJldmlld0ltYWdlLm5hdGl2ZUVsZW1lbnQub25sb2FkID0gbnVsbDtcbiAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xvYWRlZChpbWcpOiBib29sZWFuIHtcbiAgICBpZiAoIWltZy5jb21wbGV0ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhKHR5cGVvZiBpbWcubmF0dXJhbFdpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBpbWcubmF0dXJhbFdpZHRoID09PSAwKTtcbiAgfVxuXG59XG4iXX0=