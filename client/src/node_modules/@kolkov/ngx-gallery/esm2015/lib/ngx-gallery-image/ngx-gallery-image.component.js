import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { NgxGalleryService } from '../ngx-gallery.service';
import { NgxGalleryAnimation } from '../ngx-gallery-animation';
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
NgxGalleryImageComponent = __decorate([
    Component({
        selector: 'ngx-gallery-image',
        template: "<div class=\"ngx-gallery-image-wrapper ngx-gallery-animation-{{animation}} ngx-gallery-image-size-{{size}}\">\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n\n    \n    <div *ngIf=\"image.type === 'image'\" class=\"ngx-gallery-image\"\n        [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n          'ngx-gallery-inactive-left': selectedIndex > image.index,\n          'ngx-gallery-inactive-right': selectedIndex < image.index,\n            'ngx-gallery-clickable': clickable }\"\n        [style.background-image]=\"getSafeUrl(image.src)\" (click)=\"handleClick($event, image.index)\">\n      <div class=\"ngx-gallery-icons-wrapper\">\n        <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                            [titleText]=\"action.titleText\"\n                            (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n    </div>\n  </div>\n  <div *ngFor=\"let image of getImages(); let i = index;\">\n    <div *ngIf=\"image.type === 'video'\" class=\"ngx-gallery-image\" \n    [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index,\n    'ngx-gallery-inactive-left': selectedIndex > image.index,\n      'ngx-gallery-inactive-right': selectedIndex < image.index,\n      'ngx-gallery-clickable': clickable }\"\n    (click)=\"handleClick($event, image.index)\">\n      <video controls style=\"width:100%; height:100%; background: #000;\">\n        <source [src]=\"image.src\">\n          Your browser does not support the video tag.\n      </video>\n      <div class=\"ngx-gallery-icons-wrapper\">\n      <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\"\n                          [titleText]=\"action.titleText\"\n                          (closeClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n      </div>\n      <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\"\n          [innerHTML]=\"descriptions[image.index]\" (click)=\"$event.stopPropagation()\"></div>\n      </div>\n    </div>\n  </div>\n<ngx-gallery-bullets *ngIf=\"bullets\" [count]=\"images.length\" [active]=\"selectedIndex\"\n                     (bulletChange)=\"show($event)\"></ngx-gallery-bullets>\n<ngx-gallery-arrows class=\"ngx-gallery-image-size-{{size}}\" *ngIf=\"arrows\" (prevClick)=\"showPrev()\"\n                    (nextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\"\n                    [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n",
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host{width:100%;display:inline-block;position:relative;font-size:25px}.ngx-gallery-image-wrapper{width:100%;height:100%;position:absolute;left:0;top:0;overflow:hidden}.ngx-gallery-image{background-position:center;background-repeat:no-repeat;height:100%;width:100%;position:absolute;top:0}.ngx-gallery-image-size-cover .ngx-gallery-image{background-size:cover}.ngx-gallery-image-size-contain .ngx-gallery-image{background-size:contain}.ngx-gallery-animation-fade .ngx-gallery-image{left:0;opacity:0;transition:.5s ease-in-out}.ngx-gallery-animation-fade .ngx-gallery-image.ngx-gallery-active{opacity:1}.ngx-gallery-animation-slide .ngx-gallery-image{transition:.5s ease-in-out}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-active{transform:translateX(0)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-left{transform:translateX(-100%)}.ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-right{transform:translateX(100%)}.ngx-gallery-animation-rotate .ngx-gallery-image{transition:1s;transform:scale(3.5,3.5) rotate(90deg);left:0;opacity:0}.ngx-gallery-animation-rotate .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1) rotate(0);opacity:1}.ngx-gallery-animation-zoom .ngx-gallery-image{transition:1s;transform:scale(2.5,2.5);left:0;opacity:0}.ngx-gallery-animation-zoom .ngx-gallery-image.ngx-gallery-active{transform:scale(1,1);opacity:1}.ngx-gallery-image-text{width:100%;background:rgba(0,0,0,.7);padding:10px;text-align:center;color:#fff;font-size:16px;position:absolute;bottom:0;z-index:10}"]
    })
], NgxGalleryImageComponent);
export { NgxGalleryImageComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnktaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtvbGtvdi9uZ3gtZ2FsbGVyeS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtZ2FsbGVyeS1pbWFnZS9uZ3gtZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFDTCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUd6RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVE3RCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQTRCbkMsWUFBb0IsWUFBMEIsRUFDMUIsVUFBc0IsRUFBVSxhQUFnQztRQURoRSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQW1CO1FBUjFFLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QyxtQkFBYyxHQUFHLElBQUksQ0FBQztJQU10QixDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLGdFQUFnRTtJQUVoRSxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDcEg7SUFDSCxDQUFDO0lBRTJCLFlBQVk7UUFDdEMsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUUyQixZQUFZO1FBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQWE7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBRXpDLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU0sSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3pCO1lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFFekMsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6QjtZQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEU7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFNUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRXhCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssbUJBQW1CLENBQUMsS0FBSztlQUMzQyxJQUFJLENBQUMsU0FBUyxLQUFLLG1CQUFtQixDQUFDLElBQUksRUFBRTtZQUNoRCxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ2Y7UUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDekU7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRCxVQUFVLENBQUMsS0FBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBa0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQTs7WUEvS21DLFlBQVk7WUFDZCxVQUFVO1lBQXlCLGlCQUFpQjs7QUE1QjNFO0lBQVIsS0FBSyxFQUFFO3dEQUFrQztBQUNqQztJQUFSLEtBQUssRUFBRTsyREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7K0RBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFO3dEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTtnRUFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7dURBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7MkRBQW1CO0FBQ2xCO0lBQVIsS0FBSyxFQUFFO3NEQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7K0RBQXVCO0FBQ3RCO0lBQVIsS0FBSyxFQUFFOytEQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTswREFBbUI7QUFDbEI7SUFBUixLQUFLLEVBQUU7a0VBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3NFQUErQjtBQUM5QjtJQUFSLEtBQUssRUFBRTs4REFBdUI7QUFDdEI7SUFBUixLQUFLLEVBQUU7NkRBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFO3lEQUE2QjtBQUM1QjtJQUFSLEtBQUssRUFBRTs4REFBd0I7QUFDdkI7SUFBUixLQUFLLEVBQUU7aUVBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFO3lEQUFrQjtBQUVoQjtJQUFULE1BQU0sRUFBRTs0REFBaUM7QUFDaEM7SUFBVCxNQUFNLEVBQUU7OERBQW1DO0FBNkJoQjtJQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDOzREQVExQjtBQUUyQjtJQUEzQixZQUFZLENBQUMsWUFBWSxDQUFDOzREQVExQjtBQXJFVSx3QkFBd0I7SUFOcEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3Qiw0MEZBQWlEO1FBRWpELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztLQUNoRCxDQUFDO0dBQ1csd0JBQXdCLENBMk1wQztTQTNNWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVN0eWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7Tmd4R2FsbGVyeVNlcnZpY2V9IGZyb20gJy4uL25neC1nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHtOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlfSBmcm9tICcuLi9uZ3gtZ2FsbGVyeS1vcmRlcmVkLWltYWdlJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFjdGlvbn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktYWN0aW9uJztcbmltcG9ydCB7Tmd4R2FsbGVyeUFuaW1hdGlvbn0gZnJvbSAnLi4vbmd4LWdhbGxlcnktYW5pbWF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWdhbGxlcnktaW1hZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWdhbGxlcnktaW1hZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYWxsZXJ5SW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGltYWdlczogTmd4R2FsbGVyeU9yZGVyZWRJbWFnZVtdO1xuICBASW5wdXQoKSBjbGlja2FibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgYXJyb3dzOiBib29sZWFuO1xuICBASW5wdXQoKSBhcnJvd3NBdXRvSGlkZTogYm9vbGVhbjtcbiAgQElucHV0KCkgc3dpcGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFycm93UHJldkljb246IHN0cmluZztcbiAgQElucHV0KCkgYXJyb3dOZXh0SWNvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b1BsYXlJbnRlcnZhbDogbnVtYmVyO1xuICBASW5wdXQoKSBhdXRvUGxheVBhdXNlT25Ib3ZlcjogYm9vbGVhbjtcbiAgQElucHV0KCkgaW5maW5pdHlNb3ZlOiBib29sZWFuO1xuICBASW5wdXQoKSBsYXp5TG9hZGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWN0aW9uczogTmd4R2FsbGVyeUFjdGlvbltdO1xuICBASW5wdXQoKSBkZXNjcmlwdGlvbnM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBzaG93RGVzY3JpcHRpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGJ1bGxldHM6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGltYWdlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY2FuQ2hhbmdlSW1hZ2UgPSB0cnVlO1xuXG4gIHByaXZhdGUgdGltZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6YXRpb246IERvbVNhbml0aXplcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGhlbHBlclNlcnZpY2U6IE5neEdhbGxlcnlTZXJ2aWNlKSB7XG4gIH1cblxuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmRpc3BsYXknKSBwdWJsaWMgZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAvLyBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQtY29sb3InKSBwdWJsaWMgY29sb3IgPSAnbGltZSc7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzICYmIHRoaXMuYXJyb3dzQXV0b0hpZGUpIHtcbiAgICAgIHRoaXMuYXJyb3dzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5zd2lwZSkge1xuICAgICAgdGhpcy5oZWxwZXJTZXJ2aWNlLm1hbmFnZVN3aXBlKHRoaXMuc3dpcGUsIHRoaXMuZWxlbWVudFJlZiwgJ2ltYWdlJywgKCkgPT4gdGhpcy5zaG93TmV4dCgpLCAoKSA9PiB0aGlzLnNob3dQcmV2KCkpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKSBvbk1vdXNlRW50ZXIoKSB7XG4gICAgaWYgKHRoaXMuYXJyb3dzQXV0b0hpZGUgJiYgIXRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXV0b1BsYXkgJiYgdGhpcy5hdXRvUGxheVBhdXNlT25Ib3Zlcikge1xuICAgICAgdGhpcy5zdG9wQXV0b1BsYXkoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJykgb25Nb3VzZUxlYXZlKCkge1xuICAgIGlmICh0aGlzLmFycm93c0F1dG9IaWRlICYmIHRoaXMuYXJyb3dzKSB7XG4gICAgICB0aGlzLmFycm93cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmF1dG9QbGF5ICYmIHRoaXMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpIHtcbiAgICAgIHRoaXMuc3RhcnRBdXRvUGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIGdldEltYWdlcygpOiBOZ3hHYWxsZXJ5T3JkZXJlZEltYWdlW10ge1xuICAgIGlmICghdGhpcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXp5TG9hZGluZykge1xuICAgICAgY29uc3QgaW5kZXhlcyA9IFt0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgY29uc3QgcHJldkluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4IC0gMTtcblxuICAgICAgaWYgKHByZXZJbmRleCA9PT0gLTEgJiYgdGhpcy5pbmZpbml0eU1vdmUpIHtcbiAgICAgICAgaW5kZXhlcy5wdXNoKHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZXggPj0gMCkge1xuICAgICAgICBpbmRleGVzLnB1c2gocHJldkluZGV4KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4ICsgMTtcblxuICAgICAgaWYgKG5leHRJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoICYmIHRoaXMuaW5maW5pdHlNb3ZlKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaCgwKTtcbiAgICAgIH0gZWxzZSBpZiAobmV4dEluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChuZXh0SW5kZXgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXMuZmlsdGVyKChpbWcsIGkpID0+IGluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZXM7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRBdXRvUGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BBdXRvUGxheSgpO1xuXG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zaG93TmV4dCgpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLnNob3dOZXh0KCk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5hdXRvUGxheUludGVydmFsKTtcbiAgfVxuXG4gIHN0b3BBdXRvUGxheSgpIHtcbiAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDbGljayhldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbGlja2FibGUpIHtcbiAgICAgIHRoaXMuaW1hZ2VDbGljay5lbWl0KGluZGV4KTtcblxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuYWN0aXZlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgfVxuXG4gIHNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmNhblNob3dOZXh0KCkgJiYgdGhpcy5jYW5DaGFuZ2VJbWFnZSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEluZGV4Kys7XG5cbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPT09IHRoaXMuaW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzaG93UHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5TaG93UHJldigpICYmIHRoaXMuY2FuQ2hhbmdlSW1hZ2UpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleC0tO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFjdGl2ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XG4gICAgICB0aGlzLnNldENoYW5nZVRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBzZXRDaGFuZ2VUaW1lb3V0KCkge1xuICAgIHRoaXMuY2FuQ2hhbmdlSW1hZ2UgPSBmYWxzZTtcbiAgICBsZXQgdGltZW91dCA9IDEwMDA7XG5cbiAgICBpZiAodGhpcy5hbmltYXRpb24gPT09IE5neEdhbGxlcnlBbmltYXRpb24uU2xpZGVcbiAgICAgIHx8IHRoaXMuYW5pbWF0aW9uID09PSBOZ3hHYWxsZXJ5QW5pbWF0aW9uLkZhZGUpIHtcbiAgICAgIHRpbWVvdXQgPSA1MDA7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNhbkNoYW5nZUltYWdlID0gdHJ1ZTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIGNhblNob3dOZXh0KCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmltYWdlcykge1xuICAgICAgcmV0dXJuIHRoaXMuaW5maW5pdHlNb3ZlIHx8IHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjYW5TaG93UHJldigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pbWFnZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmluZmluaXR5TW92ZSB8fCB0aGlzLnNlbGVjdGVkSW5kZXggPiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2FmZVVybChpbWFnZTogc3RyaW5nKTogU2FmZVN0eWxlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6YXRpb24uYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHRoaXMuaGVscGVyU2VydmljZS5nZXRCYWNrZ3JvdW5kVXJsKGltYWdlKSk7XG4gIH1cblxuICBnZXRGaWxlVHlwZShmaWxlU291cmNlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5oZWxwZXJTZXJ2aWNlLmdldEZpbGVUeXBlKGZpbGVTb3VyY2UpO1xuICB9XG59XG4iXX0=