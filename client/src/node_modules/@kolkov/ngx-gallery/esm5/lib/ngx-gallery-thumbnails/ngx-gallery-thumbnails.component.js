import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
import { NgxGalleryOrder } from '../ngx-gallery-order';
var NgxGalleryThumbnailsComponent = /** @class */ (function () {
    function NgxGalleryThumbnailsComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.activeChange = new EventEmitter();
        this.index = 0;
    }
    NgxGalleryThumbnailsComponent.prototype.ngOnInit = function () {
    };
    NgxGalleryThumbnailsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.selectedIndex) {
            this.validateIndex();
        }
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', function () { return _this.moveRight(); }, function () { return _this.moveLeft(); });
        }
        if (this.images) {
            this.remainingCountValue = this.images.length - (this.rows * this.columns);
        }
    };
    NgxGalleryThumbnailsComponent.prototype.onMouseEnter = function () {
        this.mouseenter = true;
    };
    NgxGalleryThumbnailsComponent.prototype.onMouseLeave = function () {
        this.mouseenter = false;
    };
    NgxGalleryThumbnailsComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    };
    NgxGalleryThumbnailsComponent.prototype.getImages = function () {
        if (!this.images) {
            return [];
        }
        if (this.remainingCount) {
            return this.images.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order !== NgxGalleryOrder.Row) {
            var stopIndex = 0;
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
    };
    NgxGalleryThumbnailsComponent.prototype.handleClick = function (event, index) {
        if (!this.hasLink(index)) {
            this.selectedIndex = index;
            this.activeChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.hasLink = function (index) {
        if (this.links && this.links.length && this.links[index]) {
            return true;
        }
    };
    NgxGalleryThumbnailsComponent.prototype.moveRight = function () {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            var maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.moveLeft = function () {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    };
    NgxGalleryThumbnailsComponent.prototype.canMoveRight = function () {
        return this.index + this.columns < this.getMaxIndex();
    };
    NgxGalleryThumbnailsComponent.prototype.canMoveLeft = function () {
        return this.index !== 0;
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailLeft = function (index) {
        var calculatedIndex;
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
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailTop = function (index) {
        var calculatedIndex;
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
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailWidth = function () {
        return this.getThumbnailDimension(this.columns);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailHeight = function () {
        return this.getThumbnailDimension(this.rows);
    };
    NgxGalleryThumbnailsComponent.prototype.setThumbnailsPosition = function () {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    };
    NgxGalleryThumbnailsComponent.prototype.setDefaultPosition = function () {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    };
    NgxGalleryThumbnailsComponent.prototype.canShowArrows = function () {
        if (this.remainingCount) {
            return false;
        }
        else {
            return this.arrows && this.images && this.images.length > this.getVisibleCount()
                && (!this.arrowsAutoHide || this.mouseenter);
        }
    };
    NgxGalleryThumbnailsComponent.prototype.validateIndex = function () {
        if (this.images) {
            var newIndex = void 0;
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
                var maxIndex = this.getMaxIndex() - this.columns;
                this.index = newIndex > maxIndex ? maxIndex : newIndex;
                this.setThumbnailsPosition();
            }
        }
    };
    NgxGalleryThumbnailsComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NgxGalleryThumbnailsComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailPosition = function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    };
    NgxGalleryThumbnailsComponent.prototype.getThumbnailDimension = function (count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    };
    NgxGalleryThumbnailsComponent.prototype.getMaxIndex = function () {
        if (this.order === NgxGalleryOrder.Page) {
            var maxIndex = (Math.floor(this.images.length / this.getVisibleCount()) * this.columns);
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
    };
    NgxGalleryThumbnailsComponent.prototype.getVisibleCount = function () {
        return this.columns * this.rows;
    };
    NgxGalleryThumbnailsComponent.prototype.getSafeStyle = function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NgxGalleryThumbnailsComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
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
    return NgxGalleryThumbnailsComponent;
}());
export { NgxGalleryThumbnailsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa29sa292L25neC1nYWxsZXJ5LyIsInNvdXJjZXMiOlsibGliL25neC1nYWxsZXJ5LXRodW1ibmFpbHMvbmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBUXJEO0lBaUNFLHVDQUFvQixZQUEwQixFQUFVLFVBQXNCLEVBQzFELGFBQWdDO1FBRGhDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUMxRCxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUE1QnBELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBdUJQLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBSWxCLENBQUM7SUFFRCxnREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELG1EQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFhQztRQVpDLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUN4RCxZQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBaEIsQ0FBZ0IsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUU7SUFDSCxDQUFDO0lBRTJCLG9EQUFZLEdBQVo7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUUyQixvREFBWSxHQUFaO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2Q0FBSyxHQUFMLFVBQU0sS0FBYTtRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsaURBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ2pFLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztZQUVsQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3JFO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsSUFBSSxFQUFFO2dCQUM5QyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7WUFFRCxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNsQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQzthQUMvQjtZQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsbURBQVcsR0FBWCxVQUFZLEtBQVksRUFBRSxLQUFhO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTlCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsK0NBQU8sR0FBUCxVQUFRLEtBQWE7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxpREFBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzVCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBRW5ELElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsZ0RBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUU1QixJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNoQjtZQUVELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELG9EQUFZLEdBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELG1EQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCx3REFBZ0IsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixJQUFJLGVBQWUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxJQUFJLEVBQUU7WUFDOUMsZUFBZSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDNUc7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3BFLGVBQWUsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN4QzthQUFNO1lBQ0wsZUFBZSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyRTtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHVEQUFlLEdBQWYsVUFBZ0IsS0FBYTtRQUMzQixJQUFJLGVBQWUsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUN6QyxlQUFlLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDckM7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZUFBZSxDQUFDLElBQUksRUFBRTtZQUM5QyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuSDthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDcEUsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakY7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCx5REFBaUIsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDBEQUFrQixHQUFsQjtRQUNFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsNkRBQXFCLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFakUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Y0FDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekQsQ0FBQztJQUVELDBEQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVELHFEQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTttQkFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELHFEQUFhLEdBQWI7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLFFBQVEsU0FBQSxDQUFDO1lBRWIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNFO1lBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixRQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7WUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUV2RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUM5QjtTQUNGO0lBQ0gsQ0FBQztJQUVELGtEQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELG1EQUFXLEdBQVgsVUFBYSxVQUFrQjtRQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTyw0REFBb0IsR0FBNUIsVUFBNkIsS0FBYSxFQUFFLEtBQWE7UUFDdkQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLE1BQU07Y0FDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTyw2REFBcUIsR0FBN0IsVUFBOEIsS0FBYTtRQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsTUFBTTtrQkFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFTyxtREFBVyxHQUFuQjtRQUNFLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLElBQUksUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEYsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDOUQsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0wsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN6RDtZQUVELE9BQU8sUUFBUSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVPLHVEQUFlLEdBQXZCO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVPLG9EQUFZLEdBQXBCLFVBQXFCLEtBQWE7UUFDaEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7O2dCQW5QaUMsWUFBWTtnQkFBc0IsVUFBVTtnQkFDM0MsaUJBQWlCOztJQTFCM0M7UUFBUixLQUFLLEVBQUU7aUVBQXNDO0lBQ3JDO1FBQVIsS0FBSyxFQUFFO2dFQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTtpRUFBa0I7SUFDakI7UUFBUixLQUFLLEVBQUU7cUVBQW9CO0lBQ25CO1FBQVIsS0FBSyxFQUFFO2tFQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTsrREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO2lFQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTt5RUFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7aUVBQWdCO0lBQ2Y7UUFBUixLQUFLLEVBQUU7d0VBQXVCO0lBQ3RCO1FBQVIsS0FBSyxFQUFFO29FQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTtnRUFBZ0I7SUFDZjtRQUFSLEtBQUssRUFBRTsrREFBYztJQUNiO1FBQVIsS0FBSyxFQUFFO3dFQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTt3RUFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7bUVBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFO2dFQUFlO0lBQ2Q7UUFBUixLQUFLLEVBQUU7eUVBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFO3NFQUFzQjtJQUNyQjtRQUFSLEtBQUssRUFBRTtrRUFBNkI7SUFFM0I7UUFBVCxNQUFNLEVBQUU7dUVBQW1DO0lBMEJoQjtRQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDO3FFQUUxQjtJQUUyQjtRQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDO3FFQUUxQjtJQTdEVSw2QkFBNkI7UUFOekMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQywrMUVBQXNEO1lBRXRELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO09BQ1csNkJBQTZCLENBcVJ6QztJQUFELG9DQUFDO0NBQUEsQUFyUkQsSUFxUkM7U0FyUlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVN0eWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tmd4R2FsbGVyeVNlcnZpY2V9IGZyb20gJy4uL25neC1nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5QWN0aW9ufSBmcm9tICcuLi9uZ3gtZ2FsbGVyeS1hY3Rpb24nO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5T3JkZXJ9IGZyb20gJy4uL25neC1nYWxsZXJ5LW9yZGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWdhbGxlcnktdGh1bWJuYWlscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZ2FsbGVyeS10aHVtYm5haWxzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWdhbGxlcnktdGh1bWJuYWlscy5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYWxsZXJ5VGh1bWJuYWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgdGh1bWJuYWlsc0xlZnQ6IHN0cmluZztcbiAgdGh1bWJuYWlsc01hcmdpbkxlZnQ6IHN0cmluZztcbiAgbW91c2VlbnRlcjogYm9vbGVhbjtcbiAgcmVtYWluaW5nQ291bnRWYWx1ZTogbnVtYmVyO1xuXG4gIG1pblN0b3BJbmRleCA9IDA7XG5cbiAgQElucHV0KCkgaW1hZ2VzOiBzdHJpbmdbXSB8IFNhZmVSZXNvdXJjZVVybFtdO1xuICBASW5wdXQoKSBsaW5rczogc3RyaW5nW107XG4gIEBJbnB1dCgpIGxhYmVsczogc3RyaW5nW107XG4gIEBJbnB1dCgpIGxpbmtUYXJnZXQ6IHN0cmluZztcbiAgQElucHV0KCkgY29sdW1uczogbnVtYmVyO1xuICBASW5wdXQoKSByb3dzOiBudW1iZXI7XG4gIEBJbnB1dCgpIGFycm93czogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJyb3dzQXV0b0hpZGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1hcmdpbjogbnVtYmVyO1xuICBASW5wdXQoKSBzZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNsaWNrYWJsZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc3dpcGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgQElucHV0KCkgYXJyb3dQcmV2SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhcnJvd05leHRJY29uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vdmVTaXplOiBudW1iZXI7XG4gIEBJbnB1dCgpIG9yZGVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIHJlbWFpbmluZ0NvdW50OiBib29sZWFuO1xuICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aW9uczogTmd4R2FsbGVyeUFjdGlvbltdO1xuXG4gIEBPdXRwdXQoKSBhY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBpbmRleCA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplciwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5neEdhbGxlcnlTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICB0aGlzLnZhbGlkYXRlSW5kZXgoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5zd2lwZSkge1xuICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZixcbiAgICAgICAgJ3RodW1ibmFpbHMnLCAoKSA9PiB0aGlzLm1vdmVSaWdodCgpLCAoKSA9PiB0aGlzLm1vdmVMZWZ0KCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgdGhpcy5yZW1haW5pbmdDb3VudFZhbHVlID0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gKHRoaXMucm93cyAqIHRoaXMuY29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpIG9uTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLm1vdXNlZW50ZXIgPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLm1vdXNlZW50ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIHJlc2V0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnNldERlZmF1bHRQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy52YWxpZGF0ZUluZGV4KCk7XG4gIH1cblxuICBnZXRJbWFnZXMoKTogc3RyaW5nW10gfCBTYWZlUmVzb3VyY2VVcmxbXSB7XG4gICAgaWYgKCF0aGlzLmltYWdlcykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXMuc2xpY2UoMCwgdGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubGF6eUxvYWRpbmcgJiYgdGhpcy5vcmRlciAhPT0gTmd4R2FsbGVyeU9yZGVyLlJvdykge1xuICAgICAgbGV0IHN0b3BJbmRleCA9IDA7XG5cbiAgICAgIGlmICh0aGlzLm9yZGVyID09PSBOZ3hHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICAgIHN0b3BJbmRleCA9ICh0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zICsgdGhpcy5tb3ZlU2l6ZSkgKiB0aGlzLnJvd3M7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICAgIHN0b3BJbmRleCA9IHRoaXMuaW5kZXggKyAoKHRoaXMuY29sdW1ucyAqIHRoaXMucm93cykgKiAyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0b3BJbmRleCA8PSB0aGlzLm1pblN0b3BJbmRleCkge1xuICAgICAgICBzdG9wSW5kZXggPSB0aGlzLm1pblN0b3BJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWluU3RvcEluZGV4ID0gc3RvcEluZGV4O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXMuc2xpY2UoMCwgc3RvcEluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNMaW5rKGluZGV4KSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KGluZGV4KTtcblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhc0xpbmsoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxpbmtzICYmIHRoaXMubGlua3MubGVuZ3RoICYmIHRoaXMubGlua3NbaW5kZXhdKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBtb3ZlUmlnaHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuTW92ZVJpZ2h0KCkpIHtcbiAgICAgIHRoaXMuaW5kZXggKz0gdGhpcy5tb3ZlU2l6ZTtcbiAgICAgIGNvbnN0IG1heEluZGV4ID0gdGhpcy5nZXRNYXhJbmRleCgpIC0gdGhpcy5jb2x1bW5zO1xuXG4gICAgICBpZiAodGhpcy5pbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBtYXhJbmRleDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRUaHVtYm5haWxzUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlTGVmdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5Nb3ZlTGVmdCgpKSB7XG4gICAgICB0aGlzLmluZGV4IC09IHRoaXMubW92ZVNpemU7XG5cbiAgICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRUaHVtYm5haWxzUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBjYW5Nb3ZlUmlnaHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXggKyB0aGlzLmNvbHVtbnMgPCB0aGlzLmdldE1heEluZGV4KCk7XG4gIH1cblxuICBjYW5Nb3ZlTGVmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleCAhPT0gMDtcbiAgfVxuXG4gIGdldFRodW1ibmFpbExlZnQoaW5kZXg6IG51bWJlcik6IFNhZmVTdHlsZSB7XG4gICAgbGV0IGNhbGN1bGF0ZWRJbmRleDtcblxuICAgIGlmICh0aGlzLm9yZGVyID09PSBOZ3hHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5yb3dzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSAoaW5kZXggJSB0aGlzLmNvbHVtbnMpICsgKE1hdGguZmxvb3IoaW5kZXggLyAodGhpcy5yb3dzICogdGhpcy5jb2x1bW5zKSkgKiB0aGlzLmNvbHVtbnMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLlJvdyAmJiB0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBpbmRleCAlIHRoaXMuY29sdW1ucztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsY3VsYXRlZEluZGV4ID0gaW5kZXggJSBNYXRoLmNlaWwodGhpcy5pbWFnZXMubGVuZ3RoIC8gdGhpcy5yb3dzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm5haWxQb3NpdGlvbihjYWxjdWxhdGVkSW5kZXgsIHRoaXMuY29sdW1ucyk7XG4gIH1cblxuICBnZXRUaHVtYm5haWxUb3AoaW5kZXg6IG51bWJlcik6IFNhZmVTdHlsZSB7XG4gICAgbGV0IGNhbGN1bGF0ZWRJbmRleDtcblxuICAgIGlmICh0aGlzLm9yZGVyID09PSBOZ3hHYWxsZXJ5T3JkZXIuQ29sdW1uKSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBpbmRleCAlIHRoaXMucm93cztcbiAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICBjYWxjdWxhdGVkSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5jb2x1bW5zKSAtIChNYXRoLmZsb29yKGluZGV4IC8gKHRoaXMucm93cyAqIHRoaXMuY29sdW1ucykpICogdGhpcy5yb3dzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5Sb3cgJiYgdGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgY2FsY3VsYXRlZEluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuY29sdW1ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGN1bGF0ZWRJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyBNYXRoLmNlaWwodGhpcy5pbWFnZXMubGVuZ3RoIC8gdGhpcy5yb3dzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0VGh1bWJuYWlsUG9zaXRpb24oY2FsY3VsYXRlZEluZGV4LCB0aGlzLnJvd3MpO1xuICB9XG5cbiAgZ2V0VGh1bWJuYWlsV2lkdGgoKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaHVtYm5haWxEaW1lbnNpb24odGhpcy5jb2x1bW5zKTtcbiAgfVxuXG4gIGdldFRodW1ibmFpbEhlaWdodCgpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLmdldFRodW1ibmFpbERpbWVuc2lvbih0aGlzLnJvd3MpO1xuICB9XG5cbiAgc2V0VGh1bWJuYWlsc1Bvc2l0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudGh1bWJuYWlsc0xlZnQgPSAtKCgxMDAgLyB0aGlzLmNvbHVtbnMpICogdGhpcy5pbmRleCkgKyAnJSc7XG5cbiAgICB0aGlzLnRodW1ibmFpbHNNYXJnaW5MZWZ0ID0gLSgodGhpcy5tYXJnaW4gLSAoKCh0aGlzLmNvbHVtbnMgLSAxKVxuICAgICAgKiB0aGlzLm1hcmdpbikgLyB0aGlzLmNvbHVtbnMpKSAqIHRoaXMuaW5kZXgpICsgJ3B4JztcbiAgfVxuXG4gIHNldERlZmF1bHRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnRodW1ibmFpbHNMZWZ0ID0gJzBweCc7XG4gICAgdGhpcy50aHVtYm5haWxzTWFyZ2luTGVmdCA9ICcwcHgnO1xuICB9XG5cbiAgY2FuU2hvd0Fycm93cygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5yZW1haW5pbmdDb3VudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hcnJvd3MgJiYgdGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoID4gdGhpcy5nZXRWaXNpYmxlQ291bnQoKVxuICAgICAgICAmJiAoIXRoaXMuYXJyb3dzQXV0b0hpZGUgfHwgdGhpcy5tb3VzZWVudGVyKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUluZGV4KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgbGV0IG5ld0luZGV4O1xuXG4gICAgICBpZiAodGhpcy5vcmRlciA9PT0gTmd4R2FsbGVyeU9yZGVyLkNvbHVtbikge1xuICAgICAgICBuZXdJbmRleCA9IE1hdGguZmxvb3IodGhpcy5zZWxlY3RlZEluZGV4IC8gdGhpcy5yb3dzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0luZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ICUgTWF0aC5jZWlsKHRoaXMuaW1hZ2VzLmxlbmd0aCAvIHRoaXMucm93cyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0NvdW50KSB7XG4gICAgICAgIG5ld0luZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld0luZGV4IDwgdGhpcy5pbmRleCB8fCBuZXdJbmRleCA+PSB0aGlzLmluZGV4ICsgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgIGNvbnN0IG1heEluZGV4ID0gdGhpcy5nZXRNYXhJbmRleCgpIC0gdGhpcy5jb2x1bW5zO1xuICAgICAgICB0aGlzLmluZGV4ID0gbmV3SW5kZXggPiBtYXhJbmRleCA/IG1heEluZGV4IDogbmV3SW5kZXg7XG5cbiAgICAgICAgdGhpcy5zZXRUaHVtYm5haWxzUG9zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTYWZlVXJsKGltYWdlOiBzdHJpbmcpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodGhpcy5oZWxwZXJTZXJ2aWNlLmdldEJhY2tncm91bmRVcmwoaW1hZ2UpKTtcbiAgfVxuXG4gIGdldEZpbGVUeXBlIChmaWxlU291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmhlbHBlclNlcnZpY2UuZ2V0RmlsZVR5cGUoZmlsZVNvdXJjZSk7XG4gIH1cblxuICBwcml2YXRlIGdldFRodW1ibmFpbFBvc2l0aW9uKGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLmdldFNhZmVTdHlsZSgnY2FsYygnICsgKCgxMDAgLyBjb3VudCkgKiBpbmRleCkgKyAnJSArICdcbiAgICAgICsgKCh0aGlzLm1hcmdpbiAtICgoKGNvdW50IC0gMSkgKiB0aGlzLm1hcmdpbikgLyBjb3VudCkpICogaW5kZXgpICsgJ3B4KScpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaHVtYm5haWxEaW1lbnNpb24oY291bnQ6IG51bWJlcik6IFNhZmVTdHlsZSB7XG4gICAgaWYgKHRoaXMubWFyZ2luICE9PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSAtICdcbiAgICAgICAgKyAoKChjb3VudCAtIDEpICogdGhpcy5tYXJnaW4pIC8gY291bnQpICsgJ3B4KScpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRTYWZlU3R5bGUoJ2NhbGMoJyArICgxMDAgLyBjb3VudCkgKyAnJSArIDFweCknKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldE1heEluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3JkZXIgPT09IE5neEdhbGxlcnlPcmRlci5QYWdlKSB7XG4gICAgICBsZXQgbWF4SW5kZXggPSAoTWF0aC5mbG9vcih0aGlzLmltYWdlcy5sZW5ndGggLyB0aGlzLmdldFZpc2libGVDb3VudCgpKSAqIHRoaXMuY29sdW1ucyk7XG5cbiAgICAgIGlmICh0aGlzLmltYWdlcy5sZW5ndGggJSB0aGlzLmdldFZpc2libGVDb3VudCgpID4gdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgIG1heEluZGV4ICs9IHRoaXMuY29sdW1ucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1heEluZGV4ICs9IHRoaXMuaW1hZ2VzLmxlbmd0aCAlIHRoaXMuZ2V0VmlzaWJsZUNvdW50KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmltYWdlcy5sZW5ndGggLyB0aGlzLnJvd3MpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmlzaWJsZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucyAqIHRoaXMucm93cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2FmZVN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXphdGlvbi5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWUpO1xuICB9XG59XG4iXX0=