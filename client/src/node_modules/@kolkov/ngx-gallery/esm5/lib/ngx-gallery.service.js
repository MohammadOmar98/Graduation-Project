import { __decorate } from "tslib";
import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
var NgxGalleryService = /** @class */ (function () {
    function NgxGalleryService(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    NgxGalleryService.prototype.manageSwipe = function (status, element, id, nextHandler, prevHandler) {
        var handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', function () { return nextHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swiperight', function () { return prevHandler(); })
                ]);
            }
            else if (!status && handlers) {
                handlers.map(function (handler) { return handler(); });
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) {
        }
    };
    NgxGalleryService.prototype.validateUrl = function (url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20')
                .replace(new RegExp('\'', 'g'), '%27');
        }
        else {
            return url;
        }
    };
    NgxGalleryService.prototype.getBackgroundUrl = function (image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    };
    NgxGalleryService.prototype.getFileType = function (fileSource) {
        var fileExtension = fileSource.split('.').pop().toLowerCase();
        if (fileExtension === 'avi' || fileExtension === 'flv'
            || fileExtension === 'wmv' || fileExtension === 'mov'
            || fileExtension === 'mp4') {
            return 'video';
        }
        return 'image';
    };
    NgxGalleryService.prototype.getSwipeHandlers = function (id) {
        return this.swipeHandlers.get(id);
    };
    NgxGalleryService.prototype.removeSwipeHandlers = function (id) {
        this.swipeHandlers.delete(id);
    };
    NgxGalleryService.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    NgxGalleryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxGalleryService_Factory() { return new NgxGalleryService(i0.ɵɵinject(i0.Renderer2)); }, token: NgxGalleryService, providedIn: "root" });
    NgxGalleryService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], NgxGalleryService);
    return NgxGalleryService;
}());
export { NgxGalleryService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdhbGxlcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3Yvbmd4LWdhbGxlcnkvIiwic291cmNlcyI6WyJsaWIvbmd4LWdhbGxlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUtoRTtJQUdFLDJCQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBRi9CLGtCQUFhLEdBQWdDLElBQUksR0FBRyxFQUEwQixDQUFDO0lBR3ZGLENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQVksTUFBZSxFQUFFLE9BQW1CLEVBQUUsRUFBVSxFQUFFLFdBQXVCLEVBQUUsV0FBdUI7UUFFNUcsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNFQUFzRTtRQUN0RSxJQUFJO1lBQ0YsSUFBSSxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsY0FBTSxPQUFBLFdBQVcsRUFBRSxFQUFiLENBQWEsQ0FBQztvQkFDN0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBTSxPQUFBLFdBQVcsRUFBRSxFQUFiLENBQWEsQ0FBQztpQkFDL0UsQ0FBQyxDQUFDO2FBQ0o7aUJBQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYO0lBQ0gsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxHQUFXO1FBQ3JCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDO2lCQUM1QyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQUVELDRDQUFnQixHQUFoQixVQUFpQixLQUFhO1FBQzVCLE9BQU8sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3BELENBQUM7SUFFRCx1Q0FBVyxHQUFYLFVBQWEsVUFBa0I7UUFDN0IsSUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRSxJQUFJLGFBQWEsS0FBSyxLQUFLLElBQUksYUFBYSxLQUFLLEtBQUs7ZUFDakQsYUFBYSxLQUFLLEtBQUssSUFBSSxhQUFhLEtBQUssS0FBSztlQUNsRCxhQUFhLEtBQUssS0FBSyxFQUFFO1lBQzVCLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVTLDRDQUFnQixHQUF4QixVQUF5QixFQUFVO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVPLCtDQUFtQixHQUEzQixVQUE0QixFQUFVO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQW5ENkIsU0FBUzs7O0lBSDVCLGlCQUFpQjtRQUg3QixVQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BQ1csaUJBQWlCLENBdUQ3Qjs0QkE1REQ7Q0E0REMsQUF2REQsSUF1REM7U0F2RFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hHYWxsZXJ5U2VydmljZSB7XG4gIHByaXZhdGUgc3dpcGVIYW5kbGVyczogTWFwPHN0cmluZywgKCgpID0+IHZvaWQpW10+ID0gbmV3IE1hcDxzdHJpbmcsICgoKSA9PiB2b2lkKVtdPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbWFuYWdlU3dpcGUoc3RhdHVzOiBib29sZWFuLCBlbGVtZW50OiBFbGVtZW50UmVmLCBpZDogc3RyaW5nLCBuZXh0SGFuZGxlcjogKCkgPT4gdm9pZCwgcHJldkhhbmRsZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcblxuICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5nZXRTd2lwZUhhbmRsZXJzKGlkKTtcblxuICAgIC8vIHN3aXBlbGVmdCBhbmQgc3dpcGVyaWdodCBhcmUgYXZhaWxhYmxlIG9ubHkgaWYgaGFtbWVyanMgaXMgaW5jbHVkZWRcbiAgICB0cnkge1xuICAgICAgaWYgKHN0YXR1cyAmJiAhaGFuZGxlcnMpIHtcbiAgICAgICAgdGhpcy5zd2lwZUhhbmRsZXJzLnNldChpZCwgW1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBlbGVmdCcsICgpID0+IG5leHRIYW5kbGVyKCkpLFxuICAgICAgICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBlcmlnaHQnLCAoKSA9PiBwcmV2SGFuZGxlcigpKVxuICAgICAgICBdKTtcbiAgICAgIH0gZWxzZSBpZiAoIXN0YXR1cyAmJiBoYW5kbGVycykge1xuICAgICAgICBoYW5kbGVycy5tYXAoKGhhbmRsZXIpID0+IGhhbmRsZXIoKSk7XG4gICAgICAgIHRoaXMucmVtb3ZlU3dpcGVIYW5kbGVycyhpZCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodXJsLnJlcGxhY2UpIHtcbiAgICAgIHJldHVybiB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCcgJywgJ2cnKSwgJyUyMCcpXG4gICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoJ1xcJycsICdnJyksICclMjcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gIH1cblxuICBnZXRCYWNrZ3JvdW5kVXJsKGltYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gJ3VybChcXCcnICsgdGhpcy52YWxpZGF0ZVVybChpbWFnZSkgKyAnXFwnKSc7XG4gIH1cblxuICBnZXRGaWxlVHlwZSAoZmlsZVNvdXJjZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBmaWxlRXh0ZW5zaW9uID0gZmlsZVNvdXJjZS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGZpbGVFeHRlbnNpb24gPT09ICdhdmknIHx8IGZpbGVFeHRlbnNpb24gPT09ICdmbHYnXG4gICAgICB8fCBmaWxlRXh0ZW5zaW9uID09PSAnd212JyB8fCBmaWxlRXh0ZW5zaW9uID09PSAnbW92J1xuICAgICAgfHwgZmlsZUV4dGVuc2lvbiA9PT0gJ21wNCcpIHtcbiAgICAgIHJldHVybiAndmlkZW8nO1xuICAgIH1cbiAgICByZXR1cm4gJ2ltYWdlJztcbn1cblxuICBwcml2YXRlIGdldFN3aXBlSGFuZGxlcnMoaWQ6IHN0cmluZyk6ICgoKSA9PiB2b2lkKVtdIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zd2lwZUhhbmRsZXJzLmdldChpZCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVN3aXBlSGFuZGxlcnMoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3dpcGVIYW5kbGVycy5kZWxldGUoaWQpO1xuICB9XG59XG4iXX0=