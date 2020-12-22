import { SafeResourceUrl } from '@angular/platform-browser';
export interface INgxGalleryImage {
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    type?: string;
    label?: string;
}
export declare class NgxGalleryImage implements INgxGalleryImage {
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    type?: string;
    label?: string;
    constructor(obj: INgxGalleryImage);
}
