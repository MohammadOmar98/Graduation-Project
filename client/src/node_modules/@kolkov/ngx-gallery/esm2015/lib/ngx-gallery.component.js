import { __decorate } from "tslib";
import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxGalleryPreviewComponent } from './ngx-gallery-preview/ngx-gallery-preview.component';
import { NgxGalleryImageComponent } from './ngx-gallery-image/ngx-gallery-image.component';
import { NgxGalleryThumbnailsComponent } from './ngx-gallery-thumbnails/ngx-gallery-thumbnails.component';
import { NgxGalleryService } from './ngx-gallery.service';
import { NgxGalleryOptions } from './ngx-gallery-options';
import { NgxGalleryOrderedImage } from './ngx-gallery-ordered-image';
import { NgxGalleryLayout } from './ngx-gallery-layout';
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
export { NgxGalleryComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZ2FsbGVyeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDL0YsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sMkRBQTJELENBQUM7QUFFeEcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFVdEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFzQzlCLFlBQW9CLFNBQXFCLEVBQVUsYUFBZ0M7UUFBL0QsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQXJDMUUsWUFBTyxHQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR25DLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQyw0Q0FBNEM7UUFDbEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUE4QyxDQUFDO1FBQ3hFLGdCQUFXLEdBQUcsSUFB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Q0FBQzttREFBZ0I7QUFDWjtJQUEvQixXQUFXLENBQUMsaUJBQWlCLENBQUM7aURBQWM7QUE4Q2Q7SUFBOUIsWUFBWSxDQUFDLGVBQWUsQ0FBQzttREFrQjdCO0FBcEdVLG1CQUFtQjtJQVIvQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixzektBQTJDO1FBRTNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csbUJBQW1CLENBMFMvQjtTQTFTWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4R2FsbGVyeVByZXZpZXdDb21wb25lbnR9IGZyb20gJy4vbmd4LWdhbGxlcnktcHJldmlldy9uZ3gtZ2FsbGVyeS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQge05neEdhbGxlcnlJbWFnZUNvbXBvbmVudH0gZnJvbSAnLi9uZ3gtZ2FsbGVyeS1pbWFnZS9uZ3gtZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudH0gZnJvbSAnLi9uZ3gtZ2FsbGVyeS10aHVtYm5haWxzL25neC1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7U2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tmd4R2FsbGVyeVNlcnZpY2V9IGZyb20gJy4vbmd4LWdhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQge05neEdhbGxlcnlPcHRpb25zfSBmcm9tICcuL25neC1nYWxsZXJ5LW9wdGlvbnMnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5SW1hZ2V9IGZyb20gJy4vbmd4LWdhbGxlcnktaW1hZ2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlfSBmcm9tICcuL25neC1nYWxsZXJ5LW9yZGVyZWQtaW1hZ2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5TGF5b3V0fSBmcm9tICcuL25neC1nYWxsZXJ5LWxheW91dCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1nYWxsZXJ5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1nYWxsZXJ5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWdhbGxlcnkuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbTmd4R2FsbGVyeVNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYWxsZXJ5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgb3B0aW9uczogTmd4R2FsbGVyeU9wdGlvbnNbXSA9IFt7fV07XG4gIEBJbnB1dCgpIGltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG5cbiAgQE91dHB1dCgpIGltYWdlc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7IGluZGV4OiBudW1iZXI7IGltYWdlOiBOZ3hHYWxsZXJ5SW1hZ2U7IH0+KCk7XG4gIEBPdXRwdXQoKSBwcmV2aWV3T3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHByZXZpZXdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHsgaW5kZXg6IG51bWJlcjsgaW1hZ2U6IE5neEdhbGxlcnlJbWFnZTsgfT4oKTtcblxuICBzbWFsbEltYWdlczogc3RyaW5nW10gfCBTYWZlUmVzb3VyY2VVcmxbXTtcbiAgbWVkaXVtSW1hZ2VzOiBOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlW107XG4gIGJpZ0ltYWdlczogc3RyaW5nW10gfCBTYWZlUmVzb3VyY2VVcmxbXTtcbiAgZGVzY3JpcHRpb25zOiBzdHJpbmdbXTtcbiAgbGlua3M6IHN0cmluZ1tdO1xuICBsYWJlbHM6IHN0cmluZ1tdO1xuXG4gIG9sZEltYWdlczogTmd4R2FsbGVyeUltYWdlW107XG4gIG9sZEltYWdlc0xlbmd0aCA9IDA7XG5cbiAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gIHByZXZpZXdFbmFibGVkOiBib29sZWFuO1xuXG4gIGN1cnJlbnRPcHRpb25zOiBOZ3hHYWxsZXJ5T3B0aW9ucztcblxuICBwcml2YXRlIGJyZWFrcG9pbnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBwcmV2QnJlYWtwb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIGZ1bGxXaWR0aFRpbWVvdXQ6IGFueTtcblxuICBAVmlld0NoaWxkKE5neEdhbGxlcnlQcmV2aWV3Q29tcG9uZW50KSBwcmV2aWV3OiBOZ3hHYWxsZXJ5UHJldmlld0NvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOZ3hHYWxsZXJ5SW1hZ2VDb21wb25lbnQpIGltYWdlOiBOZ3hHYWxsZXJ5SW1hZ2VDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoTmd4R2FsbGVyeVRodW1ibmFpbHNDb21wb25lbnQpIHRodW1ibmFpbHM6IE5neEdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50O1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSB3aWR0aDogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGhlaWdodDogc3RyaW5nO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLnRyYW5zZm9ybScpIGxlZnQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG15RWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBoZWxwZXJTZXJ2aWNlOiBOZ3hHYWxsZXJ5U2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zLm1hcCgob3B0KSA9PiBuZXcgTmd4R2FsbGVyeU9wdGlvbnMob3B0KSk7XG4gICAgdGhpcy5zb3J0T3B0aW9ucygpO1xuICAgIHRoaXMuc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucykge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5jdXJyZW50T3B0aW9ucy5zdGFydEluZGV4IGFzIG51bWJlcjtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW1hZ2VzICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuaW1hZ2VzLmxlbmd0aCAhPT0gdGhpcy5vbGRJbWFnZXNMZW5ndGgpXG4gICAgICB8fCAodGhpcy5pbWFnZXMgIT09IHRoaXMub2xkSW1hZ2VzKSkge1xuICAgICAgdGhpcy5vbGRJbWFnZXNMZW5ndGggPSB0aGlzLmltYWdlcy5sZW5ndGg7XG4gICAgICB0aGlzLm9sZEltYWdlcyA9IHRoaXMuaW1hZ2VzO1xuICAgICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gICAgICB0aGlzLnNldEltYWdlcygpO1xuXG4gICAgICBpZiAodGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VzUmVhZHkuZW1pdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgICB0aGlzLmltYWdlLnJlc2V0KHRoaXMuY3VycmVudE9wdGlvbnMuc3RhcnRJbmRleCBhcyBudW1iZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzQXV0b0hpZGUgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzXG4gICAgICAgICYmIHRoaXMuaW1hZ2VzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlscyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLmltYWdlQXJyb3dzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVzZXRUaHVtYm5haWxzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tGdWxsV2lkdGgoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKSBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLnNldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICh0aGlzLnByZXZCcmVha3BvaW50ICE9PSB0aGlzLmJyZWFrcG9pbnQpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICAgICAgdGhpcy5yZXNldFRodW1ibmFpbHMoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmZ1bGxXaWR0aCkge1xuXG4gICAgICBpZiAodGhpcy5mdWxsV2lkdGhUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZ1bGxXaWR0aFRpbWVvdXQpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmZ1bGxXaWR0aFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja0Z1bGxXaWR0aCgpO1xuICAgICAgfSwgMjAwKTtcbiAgICB9XG4gIH1cblxuICBnZXRJbWFnZUhlaWdodCgpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLnRodW1ibmFpbHMpID9cbiAgICAgIHRoaXMuY3VycmVudE9wdGlvbnMuaW1hZ2VQZXJjZW50ICsgJyUnIDogJzEwMCUnO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsc0hlaWdodCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMuaW1hZ2UpIHtcbiAgICAgIHJldHVybiAnY2FsYygnICsgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzUGVyY2VudCArICclIC0gJ1xuICAgICAgICArIHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc01hcmdpbiArICdweCknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJzEwMCUnO1xuICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Ub3AoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmxheW91dCA9PT0gTmd4R2FsbGVyeUxheW91dC5UaHVtYm5haWxzQm90dG9tKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzTWFyZ2luICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcwcHgnO1xuICAgIH1cbiAgfVxuXG4gIGdldFRodW1ibmFpbHNNYXJnaW5Cb3R0b20oKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zLmxheW91dCA9PT0gTmd4R2FsbGVyeUxheW91dC5UaHVtYm5haWxzVG9wKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzTWFyZ2luICsgJ3B4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcwcHgnO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5QcmV2aWV3KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jdXJyZW50T3B0aW9ucy5wcmV2aWV3Q3VzdG9tKSB7XG4gICAgICB0aGlzLmN1cnJlbnRPcHRpb25zLnByZXZpZXdDdXN0b20oaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByZXZpZXdFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJldmlldy5vcGVuKGluZGV4KTtcbiAgICB9XG4gIH1cblxuICBvblByZXZpZXdPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucHJldmlld09wZW4uZW1pdCgpO1xuXG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5hdXRvUGxheSkge1xuICAgICAgdGhpcy5pbWFnZS5zdG9wQXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBvblByZXZpZXdDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZpZXdFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5wcmV2aWV3Q2xvc2UuZW1pdCgpO1xuXG4gICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5pbWFnZS5hdXRvUGxheSkge1xuICAgICAgdGhpcy5pbWFnZS5zdGFydEF1dG9QbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0RnJvbUltYWdlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNlbGVjdChpbmRleCk7XG4gIH1cblxuICBzZWxlY3RGcm9tVGh1bWJuYWlscyhpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5zZWxlY3QoaW5kZXgpO1xuXG4gICAgaWYgKHRoaXMuY3VycmVudE9wdGlvbnMgJiYgdGhpcy5jdXJyZW50T3B0aW9ucy50aHVtYm5haWxzICYmIHRoaXMuY3VycmVudE9wdGlvbnMucHJldmlld1xuICAgICAgJiYgKCF0aGlzLmN1cnJlbnRPcHRpb25zLmltYWdlIHx8IHRoaXMuY3VycmVudE9wdGlvbnMudGh1bWJuYWlsc1JlbWFpbmluZ0NvdW50KSkge1xuICAgICAgdGhpcy5vcGVuUHJldmlldyh0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0KGluZGV4KTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuaW1hZ2Uuc2hvd05leHQoKTtcbiAgfVxuXG4gIHNob3dQcmV2KCk6IHZvaWQge1xuICAgIHRoaXMuaW1hZ2Uuc2hvd1ByZXYoKTtcbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jdXJyZW50T3B0aW9ucy5pbWFnZUluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPCB0aGlzLmltYWdlcy5sZW5ndGggLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNhblNob3dQcmV2KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICByZXR1cm4gISEodGhpcy5jdXJyZW50T3B0aW9ucy5pbWFnZUluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPiAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByZXZpZXdTZWxlY3QoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucHJldmlld0NoYW5nZS5lbWl0KHtpbmRleCwgaW1hZ2U6IHRoaXMuaW1hZ2VzW2luZGV4XX0pO1xuICB9XG5cbiAgbW92ZVRodW1ibmFpbHNSaWdodCgpIHtcbiAgICB0aGlzLnRodW1ibmFpbHMubW92ZVJpZ2h0KCk7XG4gIH1cblxuICBtb3ZlVGh1bWJuYWlsc0xlZnQoKSB7XG4gICAgdGhpcy50aHVtYm5haWxzLm1vdmVMZWZ0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc1JpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnRodW1ibmFpbHMuY2FuTW92ZVJpZ2h0KCk7XG4gIH1cblxuICBjYW5Nb3ZlVGh1bWJuYWlsc0xlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJuYWlscy5jYW5Nb3ZlTGVmdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFRodW1ibmFpbHMoKSB7XG4gICAgaWYgKHRoaXMudGh1bWJuYWlscykge1xuICAgICAgdGhpcy50aHVtYm5haWxzLnJlc2V0KHRoaXMuY3VycmVudE9wdGlvbnMuc3RhcnRJbmRleCBhcyBudW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcblxuICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xuICAgICAgaW5kZXgsXG4gICAgICBpbWFnZTogdGhpcy5pbWFnZXNbaW5kZXhdXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRnVsbFdpZHRoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRPcHRpb25zICYmIHRoaXMuY3VycmVudE9wdGlvbnMuZnVsbFdpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCArICdweCc7XG4gICAgICB0aGlzLmxlZnQgPSAndHJhbnNsYXRlWCgnICsgKC0oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtXG4gICAgICAgIHRoaXMubXlFbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5pbm5lcldpZHRoKSAvIDIpICsgJ3B4KSc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbWFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZXMuZm9yRWFjaCgoaW1nKSA9PlxuICAgICAgICBpbWcudHlwZSA9IHRoaXMuaGVscGVyU2VydmljZS5nZXRGaWxlVHlwZShpbWcudXJsIGFzIHN0cmluZyB8fCBpbWcuYmlnIGFzIHN0cmluZyB8fCBpbWcubWVkaXVtIGFzIHN0cmluZyB8fCBpbWcuc21hbGwgYXMgc3RyaW5nIHx8ICcnKVxuICAgICk7XG4gICAgdGhpcy5zbWFsbEltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nKSA9PiBpbWcuc21hbGwgYXMgc3RyaW5nKTtcbiAgICB0aGlzLm1lZGl1bUltYWdlcyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nLCBpKSA9PiBuZXcgTmd4R2FsbGVyeU9yZGVyZWRJbWFnZSh7XG4gICAgICBzcmM6IGltZy5tZWRpdW0sXG4gICAgICB0eXBlOiBpbWcudHlwZSxcbiAgICAgIGluZGV4OiBpXG4gICAgfSkpO1xuICAgIHRoaXMuYmlnSW1hZ2VzID0gdGhpcy5pbWFnZXMubWFwKChpbWcpID0+IGltZy5iaWcgYXMgc3RyaW5nKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9ucyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nKSA9PiBpbWcuZGVzY3JpcHRpb24gYXMgc3RyaW5nKTtcbiAgICB0aGlzLmxpbmtzID0gdGhpcy5pbWFnZXMubWFwKChpbWcpID0+IGltZy51cmwgYXMgc3RyaW5nKTtcbiAgICB0aGlzLmxhYmVscyA9IHRoaXMuaW1hZ2VzLm1hcCgoaW1nKSA9PiBpbWcubGFiZWwgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QnJlYWtwb2ludCgpOiB2b2lkIHtcbiAgICB0aGlzLnByZXZCcmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuICAgIGxldCBicmVha3BvaW50cztcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgYnJlYWtwb2ludHMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKChvcHQpID0+IG9wdC5icmVha3BvaW50ID49IHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAubWFwKChvcHQpID0+IG9wdC5icmVha3BvaW50KTtcbiAgICB9XG5cbiAgICBpZiAoYnJlYWtwb2ludHMgJiYgYnJlYWtwb2ludHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmJyZWFrcG9pbnQgPSBicmVha3BvaW50cy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5icmVha3BvaW50ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc29ydE9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0gW1xuICAgICAgLi4udGhpcy5vcHRpb25zLmZpbHRlcigoYSkgPT4gYS5icmVha3BvaW50ID09PSB1bmRlZmluZWQpLFxuICAgICAgLi4udGhpcy5vcHRpb25zXG4gICAgICAgIC5maWx0ZXIoKGEpID0+IGEuYnJlYWtwb2ludCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5icmVha3BvaW50IC0gYS5icmVha3BvaW50KVxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50T3B0aW9ucyA9IG5ldyBOZ3hHYWxsZXJ5T3B0aW9ucyh7fSk7XG5cbiAgICB0aGlzLm9wdGlvbnNcbiAgICAgIC5maWx0ZXIoKG9wdCkgPT4gb3B0LmJyZWFrcG9pbnQgPT09IHVuZGVmaW5lZCB8fCBvcHQuYnJlYWtwb2ludCA+PSB0aGlzLmJyZWFrcG9pbnQpXG4gICAgICAubWFwKChvcHQpID0+IHRoaXMuY29tYmluZU9wdGlvbnModGhpcy5jdXJyZW50T3B0aW9ucywgb3B0KSk7XG5cbiAgICB0aGlzLndpZHRoID0gdGhpcy5jdXJyZW50T3B0aW9ucy53aWR0aCBhcyBzdHJpbmc7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmN1cnJlbnRPcHRpb25zLmhlaWdodCBhcyBzdHJpbmc7XG4gIH1cblxuICBwcml2YXRlIGNvbWJpbmVPcHRpb25zKGZpcnN0OiBOZ3hHYWxsZXJ5T3B0aW9ucywgc2Vjb25kOiBOZ3hHYWxsZXJ5T3B0aW9ucykge1xuICAgIE9iamVjdC5rZXlzKHNlY29uZCkubWFwKCh2YWwpID0+IGZpcnN0W3ZhbF0gPSBzZWNvbmRbdmFsXSAhPT0gdW5kZWZpbmVkID8gc2Vjb25kW3ZhbF0gOiBmaXJzdFt2YWxdKTtcbiAgfVxuXG59XG4iXX0=