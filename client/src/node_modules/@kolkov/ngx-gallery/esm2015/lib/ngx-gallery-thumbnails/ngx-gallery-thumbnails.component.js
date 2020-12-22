import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
import { NgxGalleryOrder } from '../ngx-gallery-order';
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
NgxGalleryThumbnailsComponent = __decorate([
    Component({
        selector: 'ngx-gallery-thumbnails',
        template: "<div class=\"ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-{{size}}\">\n  <div class=\"ngx-gallery-thumbnails\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\"\n       [style.marginLeft]=\"thumbnailsMarginLeft\">\n    <a [href]=\"hasLink(i) ? links[i] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\"\n       *ngFor=\"let image of getImages(); let i = index;\"\n       (click)=\"handleClick($event, i)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\"\n       [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       [attr.aria-label]=\"labels[i]\">\n       <div *ngIf=\"getFileType(image) == 'image'\" [style.background-image]=\"getSafeUrl(image)\" class=\"ngx-gallery-thumbnail\"\n       [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\"\n       style=\"width: 100%; height: 100%; position:absolute;\"></div>\n       <div *ngIf=\"getFileType(image) == 'video'\" class=\"ngx-gallery-thumbnail-video\">\n        <video  class=\"ngx-gallery-thumbnail\" [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\" \n        style=\"width: 100%; height: 100%; position:absolute; left:0; background:#000;\">\n        <source [src]=\"image\">\n          Your browser does not support the video tag.\n       </video>\n      </div>\n       <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\" (closeClick)=\"action.onClick($event, i)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-remaining-count-overlay\"\n           *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\">\n        <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span>\n      </div>\n    </a>\n  </div>\n</div>\n<ngx-gallery-arrows *ngIf=\"canShowArrows()\" (prevClick)=\"moveLeft()\" (nextClick)=\"moveRight()\"\n                    [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\"\n                    [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: ["@charset \"UTF-8\";:host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-thumbnails-wrapper{width:100%;height:100%;position:absolute;overflow:hidden}.ngx-gallery-thumbnails{height:100%;width:100%;position:absolute;left:0;transform:translateX(0);transition:transform .5s ease-in-out;will-change:transform}.ngx-gallery-thumbnails .ngx-gallery-thumbnail{position:absolute;height:100%;background-position:center;background-repeat:no-repeat;text-decoration:none;border:1px double #000}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .ngx-gallery-thumbnail-video::after{content:\"\uF144\";display:block;position:absolute;background:#0000;height:100%;width:100%;left:0;top:calc(50% - 20px);font-size:40px;color:#fff;margin:0;padding:0;font-family:fontawesome;text-shadow:0 4px 3px rgba(0,0,0,.4),0 8px 13px rgba(0,0,0,.1),0 18px 23px rgba(0,0,0,.1)}.ngx-gallery-thumbnails .ngx-gallery-thumbnail .img{background-size:cover;height:100%}.ngx-gallery-thumbnails .ngx-gallery-thumbnail.ngx-gallery-active{border:1px double #cc4548}.ngx-gallery-thumbnail-size-cover .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:cover}.ngx-gallery-thumbnail-size-contain .ngx-gallery-thumbnails .ngx-gallery-thumbnail{background-size:contain}.ngx-gallery-remaining-count-overlay{width:100%;height:100%;position:absolute;left:0;top:0;background-color:rgba(0,0,0,.4)}.ngx-gallery-remaining-count{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-size:30px}"]
    })
], NgxGalleryThumbnailsComponent);
export { NgxGalleryThumbnailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LXRodW1ibmFpbHMvbmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBUXJELElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBaUN4QyxZQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQzFELGFBQWdDO1FBRGhDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUMxRCxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUE1QnBELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBdUJQLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBSWxCLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxh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LEtBQUssRUFBRTs2REFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7aUVBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzhEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTsyREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFOzZEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTtxRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7NkRBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7b0VBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFO2dFQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTs0REFBZ0I7QUFDZjtJQUFSLEtBQUssRUFBRTsyREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFO29FQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTtvRUFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7K0RBQWtCO0FBQ2pCO0lBQVIsS0FBSyxFQUFFOzREQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7cUVBQXlCO0FBQ3hCO0lBQVIsS0FBSyxFQUFFO2tFQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs4REFBNkI7QUFFM0I7SUFBVCxNQUFNLEVBQUU7bUVBQW1DO0FBMEJoQjtJQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDO2lFQUUxQjtBQUUyQjtJQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDO2lFQUUxQjtBQTdEVSw2QkFBNkI7SUFOekMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQywrMUVBQXNEO1FBRXRELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csNkJBQTZCLENBcVJ6QztTQXJSWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsLCBTYWZlU3R5bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5U2VydmljZX0gZnJvbSAnLi4vbmd4LWdhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQge05neEdhbGxlcnlBY3Rpb259IGZyb20gJy4uL25neC1nYWxsZXJ5LWFjdGlvbic7XG5pbXBvcnQge05neEdhbGxlcnlPcmRlcn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktb3JkZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZ2FsbGVyeS10aHVtYm5haWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1nYWxsZXJ5LXRodW1ibmFpbHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlUaHVtYm5haWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICB0aHVtYm5haWxzTGVmdDogc3RyaW5nO1xuICB0aHVtYm5haWxzTWFyZ2luTGVmdDogc3RyaW5nO1xuICBtb3VzZWVudGVyOiBib29sZWFuO1xuICByZW1haW5pbmdDb3VudFZhbHVlOiBudW1iZXI7XG5cbiAgbWluU3RvcEluZGV4ID0gMDtcblxuICBASW5wdXQoKSBpbWFnZXM6IHN0cmluZ1tdIHwgU2FmZVJlc291cmNlVXJsW107XG4gIEBJbnB1dCgpIGxpbmtzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgbGFiZWxzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgbGlua1RhcmdldDogc3RyaW5nO1xuICBASW5wdXQoKSBjb2x1bW5zOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcbiAgQElucHV0KCkgYXJyb3dzOiBib29sZWFuO1xuICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgbWFyZ2luOiBudW1iZXI7XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuO1xuICBASW5wdXQoKSBzd2lwZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuICBASW5wdXQoKSBhcnJvd1ByZXZJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFycm93TmV4dEljb246IHN0cmluZztcbiAgQElucHV0KCkgbW92ZVNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgb3JkZXI6IG51bWJlcjtcbiAgQElucHV0KCkgcmVtYWluaW5nQ291bnQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxhenlMb2FkaW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBhY3Rpb25zOiBOZ3hHYWxsZXJ5QWN0aW9uW107XG5cbiAgQE91dHB1dCgpIGFjdGl2ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGluZGV4ID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXphdGlvbjogRG9tU2FuaXRpemVyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogTmd4R2FsbGVyeVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVJbmRleCgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnN3aXBlKSB7XG4gICAgICB0aGlzLmhlbHBlclNlcnZpY2UubWFuYWdlU3dpcGUodGhpcy5zd2lwZSwgdGhpcy5lbGVtZW50UmVmLFxuICAgICAgICAndGh1bWJuYWlscycsICgpID0+IHRoaXMubW92ZVJpZ2h0KCksICgpID0+IHRoaXMubW92ZUxlZnQoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW1hZ2VzKSB7XG4gICAgICB0aGlzLnJlbWFpbmluZ0NvdW50VmFsdWUgPSB0aGlzLmltYWdlcy5sZW5ndGggLSAodGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xuICAgIHRoaXMubW91c2VlbnRlciA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIHRoaXMubW91c2VlbnRlciA9IGZhbHNlO1xuICB9XG5cbiAgcmVzZXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuc2V0RGVmYXVsdFBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLnZhbGlkYXRlSW5kZXgoKTtcbiAgfVxuXG4gIGdldEltYWdlcygpOiBzdHJpbmdbXSB8IFNhZmVSZXNvdXJjZVVybFtdIHtcbiAgICBpZiAoIXRoaXMuaW1hZ2VzKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmltYWdlcy5zbGljZSgwLCB0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sYXp5TG9hZGluZyAmJiB0aGlzLm9yZGVyICE9PSBOZ3hHYWxsZXJ5T3JkZXIuUm93KSB7XG4gICAgICBsZXQgc3RvcEluZGV4ID0gMDtcblxuICAgICAgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgICAgc3RvcEluZGV4ID0gKHRoaXMuaW5kZXggKyB0aGlzLmNvbHVtbnMgKyB0aGlzLm1vdmVTaXplKSAqIHRoaXMucm93cztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgICAgc3RvcEluZGV4ID0gdGhpcy5pbmRleCArICgodGhpcy5jb2x1bW5zICogdGhpcy5yb3dzKSAqIDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RvcEluZGV4IDw9IHRoaXMubWluU3RvcEluZGV4KSB7XG4gICAgICAgIHN0b3BJbmRleCA9IHRoaXMubWluU3RvcEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5taW5TdG9wSW5kZXggPSBzdG9wSW5kZXg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmltYWdlcy5zbGljZSgwLCBzdG9wSW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXM7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc0xpbmsoaW5kZXgpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFzTGluayhpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubGlua3MgJiYgdGhpcy5saW5rcy5sZW5ndGggJiYgdGhpcy5saW5rc1tpbmRleF0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5Nb3ZlUmlnaHQoKSkge1xuICAgICAgdGhpcy5pbmRleCArPSB0aGlzLm1vdmVTaXplO1xuICAgICAgY29uc3QgbWF4SW5kZXggPSB0aGlzLmdldE1heEluZGV4KCkgLSB0aGlzLmNvbHVtbnM7XG5cbiAgICAgIGlmICh0aGlzLmluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IG1heEluZGV4O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRodW1ibmFpbHNQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVMZWZ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhbk1vdmVMZWZ0KCkpIHtcbiAgICAgIHRoaXMuaW5kZXggLT0gdGhpcy5tb3ZlU2l6ZTtcblxuICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFRodW1ibmFpbHNQb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGNhbk1vdmVSaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleCArIHRoaXMuY29sdW1ucyA8IHRoaXMuZ2V0TWF4SW5kZXgoKTtcbiAgfVxuXG4gIGNhbk1vdmVMZWZ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmluZGV4ICE9PSAwO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsTGVmdChpbmRleDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICBsZXQgY2FsY3VsYXRlZEluZGV4O1xuXG4gICAgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnJvd3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IChpbmRleCAlIHRoaXMuY29sdW1ucykgKyAoTWF0aC5mbG9vcihpbmRleCAvICh0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuY29sdW1ucyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9yZGVyID09PSBOZ3hHYWxsZXJ5T3JkZXIuUm93ICYmIHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IGluZGV4ICUgdGhpcy5jb2x1bW5zO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBpbmRleCAlIE1hdGguY2VpbCh0aGlzLmltYWdlcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbFBvc2l0aW9uKGNhbGN1bGF0ZWRJbmRleCwgdGhpcy5jb2x1bW5zKTtcbiAgfVxuXG4gIGdldFRodW1ibmFpbFRvcChpbmRleDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICBsZXQgY2FsY3VsYXRlZEluZGV4O1xuXG4gICAgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5Db2x1bW4pIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IGluZGV4ICUgdGhpcy5yb3dzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLmNvbHVtbnMpIC0gKE1hdGguZmxvb3IoaW5kZXggLyAodGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKSkgKiB0aGlzLnJvd3MpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlJvdyAmJiB0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5jb2x1bW5zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsY3VsYXRlZEluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIE1hdGguY2VpbCh0aGlzLmltYWdlcy5sZW5ndGggLyB0aGlzLnJvd3MpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm5haWxQb3NpdGlvbihjYWxjdWxhdGVkSW5kZXgsIHRoaXMucm93cyk7XG4gIH1cblxuICBnZXRUaHVtYm5haWxXaWR0aCgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbERpbWVuc2lvbih0aGlzLmNvbHVtbnMpO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsSGVpZ2h0KCk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsRGltZW5zaW9uKHRoaXMucm93cyk7XG4gIH1cblxuICBzZXRUaHVtYm5haWxzUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy50aHVtYm5haWxzTGVmdCA9IC0oKDEwMCAvIHRoaXMuY29sdW1ucykgKiB0aGlzLmluZGV4KSArICclJztcblxuICAgIHRoaXMudGh1bWJuYWlsc01hcmdpbkxlZnQgPSAtKCh0aGlzLm1hcmdpbiAtICgoKHRoaXMuY29sdW1ucyAtIDEpXG4gICAgICAqIHRoaXMubWFyZ2luKSAvIHRoaXMuY29sdW1ucykpICogdGhpcy5pbmRleCkgKyAncHgnO1xuICB9XG5cbiAgc2V0RGVmYXVsdFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudGh1bWJuYWlsc0xlZnQgPSAnMHB4JztcbiAgICB0aGlzLnRodW1ibmFpbHNNYXJnaW5MZWZ0ID0gJzBweCc7XG4gIH1cblxuICBjYW5TaG93QXJyb3dzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFycm93cyAmJiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggPiB0aGlzLmdldFZpc2libGVDb3VudCgpXG4gICAgICAgICYmICghdGhpcy5hcnJvd3NBdXRvSGlkZSB8fCB0aGlzLm1vdXNlZW50ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlSW5kZXgoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW1hZ2VzKSB7XG4gICAgICBsZXQgbmV3SW5kZXg7XG5cbiAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOZ3hHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgIG5ld0luZGV4ID0gTWF0aC5mbG9vcih0aGlzLnNlbGVjdGVkSW5kZXggLyB0aGlzLnJvd3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXggJSBNYXRoLmNlaWwodGhpcy5pbWFnZXMubGVuZ3RoIC8gdGhpcy5yb3dzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgbmV3SW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV3SW5kZXggPCB0aGlzLmluZGV4IHx8IG5ld0luZGV4ID49IHRoaXMuaW5kZXggKyB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgY29uc3QgbWF4SW5kZXggPSB0aGlzLmdldE1heEluZGV4KCkgLSB0aGlzLmNvbHVtbnM7XG4gICAgICAgIHRoaXMuaW5kZXggPSBuZXdJbmRleCA+IG1heEluZGV4ID8gbWF4SW5kZXggOiBuZXdJbmRleDtcblxuICAgICAgICB0aGlzLnNldFRodW1ibmFpbHNQb3NpdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFNhZmVVcmwoaW1hZ2U6IHN0cmluZyk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh0aGlzLmhlbHBlclNlcnZpY2UuZ2V0QmFja2dyb3VuZFVybChpbWFnZSkpO1xuICB9XG5cbiAgZ2V0RmlsZVR5cGUgKGZpbGVTb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVyU2VydmljZS5nZXRGaWxlVHlwZShmaWxlU291cmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VGh1bWJuYWlsUG9zaXRpb24oaW5kZXg6IG51bWJlciwgY291bnQ6IG51bWJlcik6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2FmZVN0eWxlKCdjYWxjKCcgKyAoKDEwMCAvIGNvdW50KSAqIGluZGV4KSArICclICsgJ1xuICAgICAgKyAoKHRoaXMubWFyZ2luIC0gKCgoY291bnQgLSAxKSAqIHRoaXMubWFyZ2luKSAvIGNvdW50KSkgKiBpbmRleCkgKyAncHgpJyk7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ibmFpbERpbWVuc2lvbihjb3VudDogbnVtYmVyKTogU2FmZVN0eWxlIHtcbiAgICBpZiAodGhpcy5tYXJnaW4gIT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNhZmVTdHlsZSgnY2FsYygnICsgKDEwMCAvIGNvdW50KSArICclIC0gJ1xuICAgICAgICArICgoKGNvdW50IC0gMSkgKiB0aGlzLm1hcmdpbikgLyBjb3VudCkgKyAncHgpJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFNhZmVTdHlsZSgnY2FsYygnICsgKDEwMCAvIGNvdW50KSArICclICsgMXB4KScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWF4SW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlBhZ2UpIHtcbiAgICAgIGxldCBtYXhJbmRleCA9IChNYXRoLmZsb29yKHRoaXMuaW1hZ2VzLmxlbmd0aCAvIHRoaXMuZ2V0VmlzaWJsZUNvdW50KCkpICogdGhpcy5jb2x1bW5zKTtcblxuICAgICAgaWYgKHRoaXMuaW1hZ2VzLmxlbmd0aCAlIHRoaXMuZ2V0VmlzaWJsZUNvdW50KCkgPiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgbWF4SW5kZXggKz0gdGhpcy5jb2x1bW5zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4SW5kZXggKz0gdGhpcy5pbWFnZXMubGVuZ3RoICUgdGhpcy5nZXRWaXNpYmxlQ291bnQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1heEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuaW1hZ2VzLmxlbmd0aCAvIHRoaXMucm93cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaXNpYmxlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zICogdGhpcy5yb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTYWZlU3R5bGUodmFsdWU6IHN0cmluZyk6IFNhZmVTdHlsZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemF0aW9uLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZSh2YWx1ZSk7XG4gIH1cbn1cbiJdfQ==