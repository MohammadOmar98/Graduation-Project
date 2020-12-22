import { __decorate, __read, __spread } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxGalleryPreviewComponent } from './ngx-gallery-preview/ngx-gallery-preview.component';
import { NgxGalleryImageComponent } from './ngx-gallery-image/ngx-gallery-image.component';
import { NgxGalleryThumbnailsComponent } from './ngx-gallery-thumbnails/ngx-gallery-thumbnails.component';
import { NgxGalleryService } from './ngx-gallery.service';
import { NgxGalleryOptions } from './ngx-gallery-options';
import { NgxGalleryOrderedImage } from './ngx-gallery-ordered-image';
import { NgxGalleryLayout } from './ngx-gallery-layout';
var NgxGalleryComponent = /** @class */ (function () {
    function NgxGalleryComponent(myElement, helperService) {
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
    NgxGalleryComponent.prototype.ngOnInit = function () {
        this.options = this.options.map(function (opt) { return new NgxGalleryOptions(opt); });
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = this.currentOptions.startIndex;
        }
    };
    NgxGalleryComponent.prototype.ngDoCheck = function () {
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
    };
    NgxGalleryComponent.prototype.ngAfterViewInit = function () {
        this.checkFullWidth();
    };
    NgxGalleryComponent.prototype.onResize = function () {
        var _this = this;
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(function () {
                _this.checkFullWidth();
            }, 200);
        }
    };
    NgxGalleryComponent.prototype.getImageHeight = function () {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.imagePercent + '%' : '100%';
    };
    NgxGalleryComponent.prototype.getThumbnailsHeight = function () {
        if (this.currentOptions && this.currentOptions.image) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    };
    NgxGalleryComponent.prototype.getThumbnailsMarginTop = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    NgxGalleryComponent.prototype.getThumbnailsMarginBottom = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    NgxGalleryComponent.prototype.openPreview = function (index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
    };
    NgxGalleryComponent.prototype.onPreviewOpen = function () {
        this.previewOpen.emit();
        if (this.image && this.image.autoPlay) {
            this.image.stopAutoPlay();
        }
    };
    NgxGalleryComponent.prototype.onPreviewClose = function () {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.image && this.image.autoPlay) {
            this.image.startAutoPlay();
        }
    };
    NgxGalleryComponent.prototype.selectFromImage = function (index) {
        this.select(index);
    };
    NgxGalleryComponent.prototype.selectFromThumbnails = function (index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.image || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    };
    NgxGalleryComponent.prototype.show = function (index) {
        this.select(index);
    };
    NgxGalleryComponent.prototype.showNext = function () {
        this.image.showNext();
    };
    NgxGalleryComponent.prototype.showPrev = function () {
        this.image.showPrev();
    };
    NgxGalleryComponent.prototype.canShowNext = function () {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex < this.images.length - 1);
        }
        else {
            return false;
        }
    };
    NgxGalleryComponent.prototype.canShowPrev = function () {
        if (this.images && this.currentOptions) {
            return !!(this.currentOptions.imageInfinityMove || this.selectedIndex > 0);
        }
        else {
            return false;
        }
    };
    NgxGalleryComponent.prototype.previewSelect = function (index) {
        this.previewChange.emit({ index: index, image: this.images[index] });
    };
    NgxGalleryComponent.prototype.moveThumbnailsRight = function () {
        this.thumbnails.moveRight();
    };
    NgxGalleryComponent.prototype.moveThumbnailsLeft = function () {
        this.thumbnails.moveLeft();
    };
    NgxGalleryComponent.prototype.canMoveThumbnailsRight = function () {
        return this.thumbnails.canMoveRight();
    };
    NgxGalleryComponent.prototype.canMoveThumbnailsLeft = function () {
        return this.thumbnails.canMoveLeft();
    };
    NgxGalleryComponent.prototype.resetThumbnails = function () {
        if (this.thumbnails) {
            this.thumbnails.reset(this.currentOptions.startIndex);
        }
    };
    NgxGalleryComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        this.change.emit({
            index: index,
            image: this.images[index]
        });
    };
    NgxGalleryComponent.prototype.checkFullWidth = function () {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = 'translateX(' + (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px)';
        }
    };
    NgxGalleryComponent.prototype.setImages = function () {
        var _this = this;
        this.images.forEach(function (img) {
            return img.type = _this.helperService.getFileType(img.url || img.big || img.medium || img.small || '');
        });
        this.smallImages = this.images.map(function (img) { return img.small; });
        this.mediumImages = this.images.map(function (img, i) { return new NgxGalleryOrderedImage({
            src: img.medium,
            type: img.type,
            index: i
        }); });
        this.bigImages = this.images.map(function (img) { return img.big; });
        this.descriptions = this.images.map(function (img) { return img.description; });
        this.links = this.images.map(function (img) { return img.url; });
        this.labels = this.images.map(function (img) { return img.label; });
    };
    NgxGalleryComponent.prototype.setBreakpoint = function () {
        this.prevBreakpoint = this.breakpoint;
        var breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter(function (opt) { return opt.breakpoint >= window.innerWidth; })
                .map(function (opt) { return opt.breakpoint; });
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    };
    NgxGalleryComponent.prototype.sortOptions = function () {
        this.options = __spread(this.options.filter(function (a) { return a.breakpoint === undefined; }), this.options
            .filter(function (a) { return a.breakpoint !== undefined; })
            .sort(function (a, b) { return b.breakpoint - a.breakpoint; }));
    };
    NgxGalleryComponent.prototype.setOptions = function () {
        var _this = this;
        this.currentOptions = new NgxGalleryOptions({});
        this.options
            .filter(function (opt) { return opt.breakpoint === undefined || opt.breakpoint >= _this.breakpoint; })
            .map(function (opt) { return _this.combineOptions(_this.currentOptions, opt); });
        this.width = this.currentOptions.width;
        this.height = this.currentOptions.height;
    };
    NgxGalleryComponent.prototype.combineOptions = function (first, second) {
        Object.keys(second).map(function (val) { return first[val] = second[val] !== undefined ? second[val] : first[val]; });
    };
    NgxGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
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
    NgxGalleryComponent = __decorate([
        Component({
            selector: 'ngx-gallery',
            template: "<div class=\"ngx-gallery-layout {{currentOptions?.layout}}\">\n  <ngx-gallery-image *ngIf=\"currentOptions?.image\" [style.height]=\"getImageHeight()\" [images]=\"mediumImages\"\n                     [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\"\n                     [arrows]=\"currentOptions?.imageArrows\" [arrowsAutoHide]=\"currentOptions?.imageArrowsAutoHide\"\n                     [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                     [swipe]=\"currentOptions?.imageSwipe\" [animation]=\"currentOptions?.imageAnimation\"\n                     [size]=\"currentOptions?.imageSize\" [autoPlay]=\"currentOptions?.imageAutoPlay\"\n                     [autoPlayInterval]=\"currentOptions?.imageAutoPlayInterval\"\n                     [autoPlayPauseOnHover]=\"currentOptions?.imageAutoPlayPauseOnHover\"\n                     [infinityMove]=\"currentOptions?.imageInfinityMove\" [lazyLoading]=\"currentOptions?.lazyLoading\"\n                     [actions]=\"currentOptions?.imageActions\" [descriptions]=\"descriptions\"\n                     [showDescription]=\"currentOptions?.imageDescription\" [bullets]=\"currentOptions?.imageBullets\"\n                     (imageClick)=\"openPreview($event)\" (activeChange)=\"selectFromImage($event)\"></ngx-gallery-image>\n\n  <ngx-gallery-thumbnails *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\"\n                          [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\"\n                          [images]=\"smallImages\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\"\n                          [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\"\n                          [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\"\n                          [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\"\n                          [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\"\n                          [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\"\n                          [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                          [clickable]=\"currentOptions?.image || currentOptions?.preview\"\n                          [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\"\n                          [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\"\n                          [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\"\n                          [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"\n                          (activeChange)=\"selectFromThumbnails($event)\" [ngClass]=\"currentOptions?.thumbnailClasses\"></ngx-gallery-thumbnails>\n\n  <ngx-gallery-preview [images]=\"bigImages\" [descriptions]=\"descriptions\"\n                       [showDescription]=\"currentOptions?.previewDescription\"\n                       [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\"\n                       [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\"\n                       [spinnerIcon]=\"currentOptions?.spinnerIcon\" [arrows]=\"currentOptions?.previewArrows\"\n                       [arrowsAutoHide]=\"currentOptions?.previewArrowsAutoHide\" [swipe]=\"currentOptions?.previewSwipe\"\n                       [fullscreen]=\"currentOptions?.previewFullscreen\"\n                       [forceFullscreen]=\"currentOptions?.previewForceFullscreen\"\n                       [closeOnClick]=\"currentOptions?.previewCloseOnClick\"\n                       [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\"\n                       [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\"\n                       [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\"\n                       [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\"\n                       [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\"\n                       [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\"\n                       [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\"\n                       [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\"\n                       [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\"\n                       [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\"\n                       [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\"\n                       [downloadIcon]=\"currentOptions?.downloadIcon\" [bullets]=\"currentOptions?.previewBullets\"\n                       (previewClose)=\"onPreviewClose()\" (previewOpen)=\"onPreviewOpen()\"\n                       (activeChange)=\"previewSelect($event)\"\n                       [class.ngx-gallery-active]=\"previewEnabled\"></ngx-gallery-preview>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            providers: [NgxGalleryService],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:inline-block}:host>*{float:left}.ngx-gallery-layout{width:100%;height:100%;display:flex;flex-direction:column}.ngx-gallery-layout.thumbnails-top ngx-gallery-image{order:2}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-image,.ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails{order:1}.ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails{order:2}*{box-sizing:border-box}.ngx-gallery-icon{color:#fff;position:absolute;display:inline-block}.ngx-gallery-icon .ngx-gallery-icon-content{display:block}ngx-gallery-preview{font-size:25px}ngx-gallery-preview .ngx-gallery-icon{z-index:2000}.ngx-gallery-clickable{cursor:pointer}.ngx-gallery-icons-wrapper .ngx-gallery-icon{position:relative;margin-right:5px;margin-top:5px;font-size:20px;cursor:pointer}.ngx-gallery-icons-wrapper{float:right}"]
        })
    ], NgxGalleryComponent);
    return NgxGalleryComponent;
}());
export { NgxGalleryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sMkRBQTJELENBQUM7QUFFeEcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFVdEQ7SUFzQ0UsNkJBQW9CLFNBQXFCLEVBQVUsYUFBZ0M7UUFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQXJDMUUsWUFBTyxHQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR25DLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyw0Q0FBNEM7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUE4QyxDQUFDO1FBQ3hFLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxpQkFBWSxH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RTtJQUN4RTtRQUFULE1BQU0sRUFBRTs0REFBa0M7SUFDakM7UUFBVCxNQUFNLEVBQUU7NkRBQW1DO0lBQ2xDO1FBQVQsTUFBTSxFQUFFOzhEQUFnRjtJQXFCbEQ7UUFBdEMsU0FBUyxDQUFDLDBCQUEwQixDQUFDO3dEQUFxQztJQUN0QztRQUFwQyxTQUFTLENBQUMsd0JBQXdCLENBQUM7c0RBQWlDO0lBQzNCO1FBQXpDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQzsyREFBMkM7SUFFeEQ7UUFBM0IsV0FBVyxDQUFDLGFBQWEsQ0FBQztzREFBZTtJQUNiO1FBQTVCLFdBQVcsQ0FBQyxjQUFjLENBQUM7dURBQWdCO0lBQ1o7UUFBL0IsV0FBVyxDQUFDLGlCQUFpQixDQUFDO3FEQUFjO0lBOENkO1FBQTlCLFlBQVksQ0FBQyxlQUFlLENBQUM7dURBa0I3QjtJQXBHVSxtQkFBbUI7UUFSL0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsc3pLQUEyQztZQUUzQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztZQUM5QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztPQUNXLG1CQUFtQixDQTBTL0I7SUFBRCwwQkFBQztDQUFBLEFBMVNELElBMFNDO1NBMVNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5UHJldmlld0NvbXBvbmVudH0gZnJvbSAnLi9uZ3gtZ2FsbGVyeS1wcmV2aWV3L25neC1nYWxsZXJ5LXByZXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4R2FsbGVyeUltYWdlQ29tcG9uZW50fSBmcm9tICcuL25neC1nYWxsZXJ5LWltYWdlL25neC1nYWxsZXJ5LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge05neEdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50fSBmcm9tICcuL25neC1nYWxsZXJ5LXRodW1ibmFpbHMvbmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHtTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5U2VydmljZX0gZnJvbSAnLi9uZ3gtZ2FsbGVyeS5zZXJ2aWNlJztcbmltcG9ydCB7Tmd4R2FsbGVyeU9wdGlvbnN9IGZyb20gJy4vbmd4LWdhbGxlcnktb3B0aW9ucyc7XG5pbXBvcnQge05neEdhbGxlcnlJbWFnZX0gZnJvbSAnLi9uZ3gtZ2FsbGVyeS1pbWFnZSc7XG5pbXBvcnQge05neEdhbGxlcnlPcmRlcmVkSW1hZ2V9IGZyb20gJy4vbmd4LWdhbGxlcnktb3JkZXJlZC1pbWFnZSc7XG5pbXBvcnQge05neEdhbGxlcnlMYXlvdXR9IGZyb20gJy4vbmd4LWdhbGxlcnktbGF5b3V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWdhbGxlcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtOZ3hHYWxsZXJ5U2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBvcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9uc1tdID0gW3t9XTtcbiAgQElucHV0KCkgaW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcblxuICBAT3V0cHV0KCkgaW1hZ2VzUmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1vdXRwdXQtbmF0aXZlXG4gIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaW5kZXg6IG51bWJlcjsgaW1hZ2U6IE5neEdhbGxlcnlJbWFnZTsgfT4oKTtcbiAgQE91dHB1dCgpIHByZXZpZXdPcGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHJldmlld0Nsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHJldmlld0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8eyBpbmRleDogbnVtYmVyOyBpbWFnZTogTmd4R2FsbGVyeUltYWdlOyB9PigpO1xuXG4gIHNtYWxsSW1hZ2VzOiBzdHJpbmdbXSB8IFNhZmVSZXNvdXJjZVVybFtdO1xuICBtZWRpdW1JbWFnZXM6IE5neEdhbGxlcnlPcmRlcmVkSW1hZ2VbXTtcbiAgYmlnSW1hZ2VzOiBzdHJpbmdbXSB8IFNhZmVSZXNvdXJjZVVybFtdO1xuICBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBsaW5rczogc3RyaW5nW107XG4gIGxhYmVsczogc3RyaW5nW107XG5cbiAgb2xkSW1hZ2VzOiBOZ3hHYWxsZXJ5SW1hZ2VbXTtcbiAgb2xkSW1hZ2VzTGVuZ3RoID0gMDtcblxuICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgcHJldmlld0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgY3VycmVudE9wdGlvbnM6IE5neEdhbGxlcnlPcHRpb25zO1xuXG4gIHByaXZhdGUgYnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIHByZXZCcmVha3BvaW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZnVsbFdpZHRoVGltZW91dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoTmd4R2FsbGVyeVByZXZpZXdDb21wb25lbnQpIHByZXZpZXc6IE5neEdhbGxlcnlQcmV2aWV3Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKE5neEdhbGxlcnlJbWFnZUNvbXBvbmVudCkgaW1hZ2U6IE5neEdhbGxlcnlJbWFnZUNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOZ3hHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCkgdGh1bWJuYWlsczogTmd4R2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoOiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0OiBzdHJpbmc7XG4gIEBIb3N0QmluZGluZygnc3R5bGUudHJhbnNmb3JtJykgbGVmdDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlFbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5neEdhbGxlcnlTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMubWFwKChvcHQpID0+IG5ldyBOZ3hHYWxsZXJ5T3B0aW9ucyhvcHQpKTtcbiAgICB0aGlzLnNvcnRPcHRpb25zKCk7XG4gICAgdGhpcy5zZXRCcmVha3BvaW50KCk7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgdGhpcy5jaGVja0Z1bGxXaWR0aCgpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmN1cnJlbnRPcHRpb25zLnN0YXJ0SW5kZXggYXMgbnVtYmVyO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbWFnZXMgIT09IHVuZGVmaW5lZCAmJiAodGhpcy5pbWFnZXMubGVuZ3RoICE9PSB0aGlzLm9sZEltYWdlc0xlbmd0aClcbiAgICAgIHx8ICh0aGlzLmltYWdlcyAhPT0gdGhpcy5vbGRJbWFnZXMpKSB7XG4gICAgICB0aGlzLm9sZEltYWdlc0xlbmd0aCA9IHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgICAgIHRoaXMub2xkSW1hZ2VzID0gdGhpcy5pbWFnZXM7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuc2V0SW1hZ2VzKCk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5pbWFnZXNSZWFkeS5lbWl0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICAgIHRoaXMuaW1hZ2UucmVzZXQodGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4IGFzIG51bWJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNBdXRvSGlkZSAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNcbiAgICAgICAgJiYgdGhpcy5pbWFnZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaW1hZ2VBcnJvd3MgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja0Z1bGxXaWR0aCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpIG9uUmVzaXplKCkge1xuICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKHRoaXMucHJldkJyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCkge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLnJlc2V0VGh1bWJuYWlscygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMuZnVsbFdpZHRoKSB7XG5cbiAgICAgIGlmICh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZnVsbFdpZHRoVGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZnVsbFdpZHRoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNoZWNrRnVsbFdpZHRoKCk7XG4gICAgICB9LCAyMDApO1xuICAgIH1cbiAgfVxuXG4gIGdldEltYWdlSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscykgP1xuICAgICAgdGhpcy5jdXJyZW50T3B0aW9ucy5pbWFnZVBlcmNlbnQgKyAnJScgOiAnMTAwJSc7XG4gIH1cblxuICBnZXRUaHVtYm5haWxzSGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5pbWFnZSkge1xuICAgICAgcmV0dXJuICdjYWxjKCcgKyB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNQZXJjZW50ICsgJyUgLSAnXG4gICAgICAgICsgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzTWFyZ2luICsgJ3B4KSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnMTAwJSc7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc01hcmdpblRvcCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOZ3hHYWxsZXJ5TGF5b3V0LlRodW1ibmFpbHNCb3R0b20pIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJzBweCc7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc01hcmdpbkJvdHRvbSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMubGF5b3V0ID09PSBOZ3hHYWxsZXJ5TGF5b3V0LlRodW1ibmFpbHNUb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHNNYXJnaW4gKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJzBweCc7XG4gICAgfVxuICB9XG5cbiAgb3BlblByZXZpZXcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zLnByZXZpZXdDdXN0b20pIHtcbiAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld0N1c3RvbShpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wcmV2aWV3Lm9wZW4oaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld09wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5wcmV2aWV3T3Blbi5lbWl0KCk7XG5cbiAgICBpZiAodGhpcy5pbWFnZSAmJiB0aGlzLmltYWdlLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLmltYWdlLnN0b3BBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld0Nsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnByZXZpZXdDbG9zZS5lbWl0KCk7XG5cbiAgICBpZiAodGhpcy5pbWFnZSAmJiB0aGlzLmltYWdlLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLmltYWdlLnN0YXJ0QXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RGcm9tSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgfVxuXG4gIHNlbGVjdEZyb21UaHVtYm5haWxzKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNlbGVjdChpbmRleCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3XG4gICAgICAmJiAoIXRoaXMuY3VycmVudE9wdGlvbnMuaW1hZ2UgfHwgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzUmVtYWluaW5nQ291bnQpKSB7XG4gICAgICB0aGlzLm9wZW5QcmV2aWV3KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuICB9XG5cbiAgc2hvd05leHQoKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZS5zaG93TmV4dCgpO1xuICB9XG5cbiAgc2hvd1ByZXYoKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZS5zaG93UHJldigpO1xuICB9XG5cbiAgY2FuU2hvd05leHQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaW1hZ2VzICYmIHRoaXMuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnRPcHRpb25zLmltYWdlSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2FuU2hvd1ByZXYoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaW1hZ2VzICYmIHRoaXMuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnRPcHRpb25zLmltYWdlSW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA+IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJldmlld1NlbGVjdChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5wcmV2aWV3Q2hhbmdlLmVtaXQoe2luZGV4LCBpbWFnZTogdGhpcy5pbWFnZXNbaW5kZXhdfSk7XG4gIH1cblxuICBtb3ZlVGh1bWJuYWlsc1JpZ2h0KCkge1xuICAgIHRoaXMudGh1bWJuYWlscy5tb3ZlUmlnaHQoKTtcbiAgfVxuXG4gIG1vdmVUaHVtYm5haWxzTGVmdCgpIHtcbiAgICB0aGlzLnRodW1ibmFpbHMubW92ZUxlZnQoKTtcbiAgfVxuXG4gIGNhbk1vdmVUaHVtYm5haWxzUmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJuYWlscy5jYW5Nb3ZlUmlnaHQoKTtcbiAgfVxuXG4gIGNhbk1vdmVUaHVtYm5haWxzTGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy50aHVtYm5haWxzLmNhbk1vdmVMZWZ0KCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0VGh1bWJuYWlscygpIHtcbiAgICBpZiAodGhpcy50aHVtYm5haWxzKSB7XG4gICAgICB0aGlzLnRodW1ibmFpbHMucmVzZXQodGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4IGFzIG51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICBpbmRleCxcbiAgICAgIGltYWdlOiB0aGlzLmltYWdlc1tpbmRleF1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGdWxsV2lkdGgoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy5mdWxsV2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICsgJ3B4JztcbiAgICAgIHRoaXMubGVmdCA9ICd0cmFuc2xhdGVYKCcgKyAoLShkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC1cbiAgICAgICAgdGhpcy5teUVsZW1lbnQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLmlubmVyV2lkdGgpIC8gMikgKyAncHgpJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEltYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmltYWdlcy5mb3JFYWNoKChpbWcpID0+XG4gICAgICAgIGltZy50eXBlID0gdGhpcy5oZWxwZXJTZXJ2aWNlLmdldEZpbGVUeXBlKGltZy51cmwgYXMgc3RyaW5nIHx8IGltZy5iaWcgYXMgc3RyaW5nIHx8IGltZy5tZWRpdW0gYXMgc3RyaW5nIHx8IGltZy5zbWFsbCBhcyBzdHJpbmcgfHwgJycpXG4gICAgKTtcbiAgICB0aGlzLnNtYWxsSW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWcpID0+IGltZy5zbWFsbCBhcyBzdHJpbmcpO1xuICAgIHRoaXMubWVkaXVtSW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWcsIGkpID0+IG5ldyBOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlKHtcbiAgICAgIHNyYzogaW1nLm1lZGl1bSxcbiAgICAgIHR5cGU6IGltZy50eXBlLFxuICAgICAgaW5kZXg6IGlcbiAgICB9KSk7XG4gICAgdGhpcy5iaWdJbWFnZXMgPSB0aGlzLmltYWdlcy5tYXAoKGltZykgPT4gaW1nLmJpZyBhcyBzdHJpbmcpO1xuICAgIHRoaXMuZGVzY3JpcHRpb25zID0gdGhpcy5pbWFnZXMubWFwKChpbWcpID0+IGltZy5kZXNjcmlwdGlvbiBhcyBzdHJpbmcpO1xuICAgIHRoaXMubGlua3MgPSB0aGlzLmltYWdlcy5tYXAoKGltZykgPT4gaW1nLnVybCBhcyBzdHJpbmcpO1xuICAgIHRoaXMubGFiZWxzID0gdGhpcy5pbWFnZXMubWFwKChpbWcpID0+IGltZy5sYWJlbCBhcyBzdHJpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcmVha3BvaW50KCk6IHZvaWQge1xuICAgIHRoaXMucHJldkJyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG4gICAgbGV0IGJyZWFrcG9pbnRzO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBicmVha3BvaW50cyA9IHRoaXMub3B0aW9ucy5maWx0ZXIoKG9wdCkgPT4gb3B0LmJyZWFrcG9pbnQgPj0gd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgIC5tYXAoKG9wdCkgPT4gb3B0LmJyZWFrcG9pbnQpO1xuICAgIH1cblxuICAgIGlmIChicmVha3BvaW50cyAmJiBicmVha3BvaW50cy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYnJlYWtwb2ludCA9IGJyZWFrcG9pbnRzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJyZWFrcG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzb3J0T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBbXG4gICAgICAuLi50aGlzLm9wdGlvbnMuZmlsdGVyKChhKSA9PiBhLmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCksXG4gICAgICAuLi50aGlzLm9wdGlvbnNcbiAgICAgICAgLmZpbHRlcigoYSkgPT4gYS5icmVha3BvaW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBiLmJyZWFrcG9pbnQgLSBhLmJyZWFrcG9pbnQpXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRPcHRpb25zID0gbmV3IE5neEdhbGxlcnlPcHRpb25zKHt9KTtcblxuICAgIHRoaXMub3B0aW9uc1xuICAgICAgLmZpbHRlcigob3B0KSA9PiBvcHQuYnJlYWtwb2ludCA9PT0gdW5kZWZpbmVkIHx8IG9wdC5icmVha3BvaW50ID49IHRoaXMuYnJlYWtwb2ludClcbiAgICAgIC5tYXAoKG9wdCkgPT4gdGhpcy5jb21iaW5lT3B0aW9ucyh0aGlzLmN1cnJlbnRPcHRpb25zLCBvcHQpKTtcblxuICAgIHRoaXMud2lkdGggPSB0aGlzLmN1cnJlbnRPcHRpb25zLndpZHRoIGFzIHN0cmluZztcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuY3VycmVudE9wdGlvbnMuaGVpZ2h0IGFzIHN0cmluZztcbiAgfVxuXG4gIHByaXZhdGUgY29tYmluZU9wdGlvbnMoZmlyc3Q6IE5neEdhbGxlcnlPcHRpb25zLCBzZWNvbmQ6IE5neEdhbGxlcnlPcHRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoc2Vjb25kKS5tYXAoKHZhbCkgPT4gZmlyc3RbdmFsXSA9IHNlY29uZFt2YWxdICE9PSB1bmRlZmluZWQgPyBzZWNvbmRbdmFsXSA6IGZpcnN0W3ZhbF0pO1xuICB9XG5cbn1cbiJdfQ==