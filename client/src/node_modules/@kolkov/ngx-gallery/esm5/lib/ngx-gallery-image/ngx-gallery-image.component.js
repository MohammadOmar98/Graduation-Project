import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
import { NgxGalleryAnimation } from '../ngx-gallery-animation';
var NgxGalleryImageComponent = /** @class */ (function () {
    function NgxGalleryImageComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.imageClick = new EventEmitter();
        this.activeChange = new EventEmitter();
        this.canChangeImage = true;
    }
    // @HostBinding('style.display') public display = 'inline-block';
    // @HostBinding('style.background-color') public color = 'lime';
    NgxGalleryImageComponent.prototype.ngOnInit = function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.swipe) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    NgxGalleryImageComponent.prototype.onMouseEnter = function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.onMouseLeave = function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    NgxGalleryImageComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
    };
    NgxGalleryImageComponent.prototype.getImages = function () {
        if (!this.images) {
            return [];
        }
        if (this.lazyLoading) {
            var indexes_1 = [this.selectedIndex];
            var prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes_1.push(this.images.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes_1.push(prevIndex);
            }
            var nextIndex = this.selectedIndex + 1;
            if (nextIndex === this.images.length && this.infinityMove) {
                indexes_1.push(0);
            }
            else if (nextIndex < this.images.length) {
                indexes_1.push(nextIndex);
            }
            return this.images.filter(function (img, i) { return indexes_1.indexOf(i) !== -1; });
        }
        else {
            return this.images;
        }
    };
    NgxGalleryImageComponent.prototype.startAutoPlay = function () {
        var _this = this;
        this.stopAutoPlay();
        this.timer = setInterval(function () {
            if (!_this.showNext()) {
                _this.selectedIndex = -1;
                _this.showNext();
            }
        }, this.autoPlayInterval);
    };
    NgxGalleryImageComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    NgxGalleryImageComponent.prototype.handleClick = function (event, index) {
        if (this.clickable) {
            this.imageClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    NgxGalleryImageComponent.prototype.show = function (index) {
        this.selectedIndex = index;
        this.activeChange.emit(this.selectedIndex);
        this.setChangeTimeout();
    };
    NgxGalleryImageComponent.prototype.showNext = function () {
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
    };
    NgxGalleryImageComponent.prototype.showPrev = function () {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.images.length - 1;
            }
            this.activeChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    };
    NgxGalleryImageComponent.prototype.setChangeTimeout = function () {
        var _this = this;
        this.canChangeImage = false;
        var timeout = 1000;
        if (this.animation === NgxGalleryAnimation.Slide
            || this.animation === NgxGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(function () {
            _this.canChangeImage = true;
        }, timeout);
    };
    NgxGalleryImageComponent.prototype.canShowNext = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex < this.images.length - 1;
        }
        else {
            return false;
        }
    };
    NgxGalleryImageComponent.prototype.canShowPrev = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex > 0;
        }
        else {
            return false;
        }
    };
    NgxGalleryImageComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NgxGalleryImageComponent.prototype.getFileType = function (fileSource) {
        return this.helperService.getFileType(fileSource);
    };
    NgxGalleryImageComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ElementRef },
        { type: NgxGalleryService }
    ]; };
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
    NgxGalleryImageComponent = __decorate([
        Component({
            selector: 'ngx-gallery-image',
            template: "<div class=\"ngx-gallery-image-wrapper ngx-gallery-animation-{{animation}} ngx-gallery-image-size-{{size}}\">\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n\n    \n    <div *ngIf=\"image.type === 'image'\" class=\"ngx-gallery-image\"\n        [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n          'ngx-gallery-inactive-left': selectedIndex > image.index,\n          'ngx-gallery-inactive-right': selectedIndex < image.index,\n            'ngx-gallery-clickable': clickable }\"\n        [style.background-image]=\"getSafeUrl(image.src)\" (click)=\"handleClick($event, image.index)\">\n      <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\"\n                            (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n    </div>\n  </div>\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n    <div *ngIf=\"image.type === 'video'\" class=\"ngx-gallery-image\" \n    [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n    'ngx-gallery-inactive-left': selectedIndex > image.index,\n      'ngx-gallery-inactive-right': selectedIndex < image.index,\n      'ngx-gallery-clickable': clickable }\"\n    (click)=\"handleClick($event, image.index)\">\n      <video controls style=\"width:100%; height:100%; background: #000;\">\n        <source [src]=\"image.src\">\n          Your browser does not support the video tag.\n      </video>\n      <div class=\"ngx-gallery-icons-wrapper\">\n      <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                          [titleText]=\"action.titleText\"\n                          (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n      </div>\n    </div>\n  </div>\n<ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"selectedIndex\"\n                     (bulletChange)=\"show($event)\"></ngx-gallery-bullets>\n<ngx-gallery-arrows class=\"ngx-gallery-image-size-{{size}}\" *ngIf=\"arrows\" (prevClick)=\"showPrev()\"\n                    (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\"\n                    [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-image-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.ngx-gallery-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.ngx-gallery-image-size-cover .ngx-gallery-image{background-size:cover}.ngx-gallery-image-size-contain .ngx-gallery-image{background-size:contain}.ngx-gallery-animation-fade .ngx-gallery-image{left:0;opacity:0;transition:.5s ease-in-out}.ngx-gallery-animation-fade .ngx-gallery-image.ngx-gallery-active{opacity:1}.ngx-gallery-animation-slide .ngx-gallery-image{transition:.5s ease-in-out}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-active{transform:translateX(0)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-left{transform:translateX(-100%)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-right{transform:translateX(100%)}.ngx-gallery-animation-rotate .ngx-gallery-image{transition:1s;transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.ngx-gallery-animation-rotate .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1) rotate(0);opacity:1}.ngx-gallery-animation-zoom .ngx-gallery-image{transition:1s;transform:scale(2.5,2.5);left:0;opacity:0}.ngx-gallery-animation-zoom .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1);opacity:1}.ngx-gallery-image-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
        })
    ], NgxGalleryImageComponent);
    return NgxGalleryImageComponent;
}());
export { NgxGalleryImageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZ2FsbGVyeS1pbWFnZS9uZ3gtZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUd6RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVE3RDtJQTRCRSxrQ0FBb0IsWUFBMEIsRUFDMUIsVUFBc0IsRUFBVSxhQUFnQztRQURoRSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBUjFFLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QyxtQkFBYyxHQUFHLElBQUksQ0FBQztJQU10QixDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLGdFQUFnRTtJQUVoRSwyQ0FBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RC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UUFBUixLQUFLLEVBQUU7NkRBQWtCO0lBRWhCO1FBQVQsTUFBTSxFQUFFO2dFQUFpQztJQUNoQztRQUFULE1BQU0sRUFBRTtrRUFBbUM7SUE2QmhCO1FBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0VBUTFCO0lBRTJCO1FBQTNCLFlBQVksQ0FBQyxZQUFZLENBQUM7Z0VBUTFCO0lBckVVLHdCQUF3QjtRQU5wQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLDQwRkFBaUQ7WUFFakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7T0FDVyx3QkFBd0IsQ0EyTXBDO0lBQUQsK0JBQUM7Q0FBQSxBQTNNRCxJQTJNQztTQTNNWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVN0eWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tmd4R2FsbGVyeVNlcnZpY2V9IGZyb20gJy4uL25neC1nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlfSBmcm9tICcuLi9uZ3gtZ2FsbGVyeS1vcmRlcmVkLWltYWdlJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFjdGlvbn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktYWN0aW9uJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFuaW1hdGlvbn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktYW5pbWF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWdhbGxlcnktaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnktaW1hZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYWxsZXJ5SW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGltYWdlczogTmd4R2FsbGVyeU9yZGVyZWRJbWFnZVtdO1xuICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgYXJyb3dzOiBib29sZWFuO1xuICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc3dpcGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFycm93UHJldkljb246IHN0cmluZztcbiAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b1BsYXlJbnRlcnZhbDogbnVtYmVyO1xuICBASW5wdXQoKSBhdXRvUGxheVBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcbiAgQElucHV0KCkgaW5maW5pdHlNb3ZlOiBib29sZWFuO1xuICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aW9uczogTmd4R2FsbGVyeUFjdGlvbltdO1xuICBASW5wdXQoKSBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBzaG93RGVzY3JpcHRpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJ1bGxldHM6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGltYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2FuQ2hhbmdlSW1hZ2UgPSB0cnVlO1xuXG4gIHByaXZhdGUgdGltZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5neEdhbGxlcnlTZXJ2aWNlKSB7XG4gIH1cblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBwdWJsaWMgZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQtY29sb3InKSBwdWJsaWMgY29sb3IgPSAnbGltZSc7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzICYmIHRoaXMuYXJyb3dzQXV0b0hpZGUpIHtcbiAgICAgIHRoaXMuYXJyb3dzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5zd2lwZSkge1xuICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZiwgJ2ltYWdlJywgKCkgPT4gdGhpcy5zaG93TmV4dCgpLCAoKSA9PiB0aGlzLnNob3dQcmV2KCkpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzQXV0b0hpZGUgJiYgIXRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLmFycm93c0F1dG9IaWRlICYmIHRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIGdldEltYWdlcygpOiBOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlW10ge1xuICAgIGlmICghdGhpcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXp5TG9hZGluZykge1xuICAgICAgY29uc3QgaW5kZXhlcyA9IFt0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4IC0gMTtcblxuICAgICAgaWYgKHByZXZJbmRleCA9PT0gLTEgJiYgdGhpcy5pbmZpbml0eU1vdmUpIHtcbiAgICAgICAgaW5kZXhlcy5wdXNoKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZXggPj0gMCkge1xuICAgICAgICBpbmRleGVzLnB1c2gocHJldkluZGV4KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ICsgMTtcblxuICAgICAgaWYgKG5leHRJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoICYmIHRoaXMuaW5maW5pdHlNb3ZlKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaCgwKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChuZXh0SW5kZXgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWcsIGkpID0+IGluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXM7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRBdXRvUGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zaG93TmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5hdXRvUGxheUludGVydmFsKTtcbiAgfVxuXG4gIHN0b3BBdXRvUGxheSgpIHtcbiAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGljayhldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbGlja2FibGUpIHtcbiAgICAgIHRoaXMuaW1hZ2VDbGljay5lbWl0KGluZGV4KTtcblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhblNob3dOZXh0KCkgJiYgdGhpcy5jYW5DaGFuZ2VJbWFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Kys7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5TaG93UHJldigpICYmIHRoaXMuY2FuQ2hhbmdlSW1hZ2UpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleC0tO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBzZXRDaGFuZ2VUaW1lb3V0KCkge1xuICAgIHRoaXMuY2FuQ2hhbmdlSW1hZ2UgPSBmYWxzZTtcbiAgICBsZXQgdGltZW91dCA9IDEwMDA7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb24gPT09IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIHx8IHRoaXMuYW5pbWF0aW9uID09PSBOZ3hHYWxsZXJ5QW5pbWF0aW9uLkZhZGUpIHtcbiAgICAgIHRpbWVvdXQgPSA1MDA7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNhbkNoYW5nZUltYWdlID0gdHJ1ZTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYW5TaG93UHJldigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2FmZVVybChpbWFnZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMuaGVscGVyU2VydmljZS5nZXRCYWNrZ3JvdW5kVXJsKGltYWdlKSk7XG4gIH1cblxuICBnZXRGaWxlVHlwZShmaWxlU291cmNlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5oZWxwZXJTZXJ2aWNlLmdldEZpbGVUeXBlKGZpbGVTb3VyY2UpO1xuICB9XG59XG4iXX0=