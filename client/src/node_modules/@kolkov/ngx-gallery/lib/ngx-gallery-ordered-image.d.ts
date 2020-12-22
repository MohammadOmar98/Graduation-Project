import { SafeResourceUrl } from '@angular/platform-browser';
export interface INgxGalleryOrderedImage {
    src: string | SafeResourceUrl;
    type: string;
    index: number;
}
export declare class NgxGalleryOrderedImage implements INgxGalleryOrderedImage {
    src: string | SafeResourceUrl;
    type: string;
    index: number;
    constructor(obj: INgxGalleryOrderedImage);
}
