import { __decorate } from "tslib";
import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
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
NgxGalleryService.ctorParameters = () => [
    { type: Renderer2 }
];
NgxGalleryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxGalleryService_Factory() { return new NgxGalleryService(i0.ɵɵinject(i0.Renderer2)); }, token: NgxGalleryService, providedIn: "root" });
NgxGalleryService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NgxGalleryService);
export { NgxGalleryService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3Yvbmd4LWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmd4LWdhbGxlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUtoRSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUc1QixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBRi9CLGtCQUFhLEdBQWdDLElBQUksR0FBRyxFQUEwQixDQUFDO0lBR3ZGLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBZSxFQUFFLE9BQW1CLEVBQUUsRUFBVSxFQUFFLFdBQXVCLEVBQUUsV0FBdUI7UUFFNUcsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNFQUFzRTtRQUN0RSxJQUFJO1lBQ0YsSUFBSSxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzdFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMvRSxDQUFDLENBQUM7YUFDSjtpQkFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFBRTtnQkFDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXO1FBQ3JCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDO2lCQUM1QyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQWE7UUFDNUIsT0FBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDcEQsQ0FBQztJQUVELFdBQVcsQ0FBRSxVQUFrQjtRQUM3QixNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hFLElBQUksYUFBYSxLQUFLLEtBQUssSUFBSSxhQUFhLEtBQUssS0FBSztlQUNqRCxhQUFhLEtBQUssS0FBSyxJQUFJLGFBQWEsS0FBSyxLQUFLO2VBQ2xELGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRVMsZ0JBQWdCLENBQUMsRUFBVTtRQUNqQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxFQUFVO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRixDQUFBOztZQXBEK0IsU0FBUzs7O0FBSDVCLGlCQUFpQjtJQUg3QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csaUJBQWlCLENBdUQ3QjtTQXZEWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0VsZW1lbnRSZWYsIEluamVjdGFibGUsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neEdhbGxlcnlTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBzd2lwZUhhbmRsZXJzOiBNYXA8c3RyaW5nLCAoKCkgPT4gdm9pZClbXT4gPSBuZXcgTWFwPHN0cmluZywgKCgpID0+IHZvaWQpW10+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBtYW5hZ2VTd2lwZShzdGF0dXM6IGJvb2xlYW4sIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIGlkOiBzdHJpbmcsIG5leHRIYW5kbGVyOiAoKSA9PiB2b2lkLCBwcmV2SGFuZGxlcjogKCkgPT4gdm9pZCk6IHZvaWQge1xuXG4gICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLmdldFN3aXBlSGFuZGxlcnMoaWQpO1xuXG4gICAgLy8gc3dpcGVsZWZ0IGFuZCBzd2lwZXJpZ2h0IGFyZSBhdmFpbGFibGUgb25seSBpZiBoYW1tZXJqcyBpcyBpbmNsdWRlZFxuICAgIHRyeSB7XG4gICAgICBpZiAoc3RhdHVzICYmICFoYW5kbGVycykge1xuICAgICAgICB0aGlzLnN3aXBlSGFuZGxlcnMuc2V0KGlkLCBbXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc3dpcGVsZWZ0JywgKCkgPT4gbmV4dEhhbmRsZXIoKSksXG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc3dpcGVyaWdodCcsICgpID0+IHByZXZIYW5kbGVyKCkpXG4gICAgICAgIF0pO1xuICAgICAgfSBlbHNlIGlmICghc3RhdHVzICYmIGhhbmRsZXJzKSB7XG4gICAgICAgIGhhbmRsZXJzLm1hcCgoaGFuZGxlcikgPT4gaGFuZGxlcigpKTtcbiAgICAgICAgdGhpcy5yZW1vdmVTd2lwZUhhbmRsZXJzKGlkKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh1cmwucmVwbGFjZSkge1xuICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJyAnLCAnZycpLCAnJTIwJylcbiAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFwnJywgJ2cnKSwgJyUyNycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgfVxuXG4gIGdldEJhY2tncm91bmRVcmwoaW1hZ2U6IHN0cmluZykge1xuICAgIHJldHVybiAndXJsKFxcJycgKyB0aGlzLnZhbGlkYXRlVXJsKGltYWdlKSArICdcXCcpJztcbiAgfVxuXG4gIGdldEZpbGVUeXBlIChmaWxlU291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZpbGVFeHRlbnNpb24gPSBmaWxlU291cmNlLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoZmlsZUV4dGVuc2lvbiA9PT0gJ2F2aScgfHwgZmlsZUV4dGVuc2lvbiA9PT0gJ2ZsdidcbiAgICAgIHx8IGZpbGVFeHRlbnNpb24gPT09ICd3bXYnIHx8IGZpbGVFeHRlbnNpb24gPT09ICdtb3YnXG4gICAgICB8fCBmaWxlRXh0ZW5zaW9uID09PSAnbXA0Jykge1xuICAgICAgcmV0dXJuICd2aWRlbyc7XG4gICAgfVxuICAgIHJldHVybiAnaW1hZ2UnO1xufVxuXG4gIHByaXZhdGUgZ2V0U3dpcGVIYW5kbGVycyhpZDogc3RyaW5nKTogKCgpID0+IHZvaWQpW10gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN3aXBlSGFuZGxlcnMuZ2V0KGlkKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlU3dpcGVIYW5kbGVycyhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zd2lwZUhhbmRsZXJzLmRlbGV0ZShpZCk7XG4gIH1cbn1cbiJdfQ==