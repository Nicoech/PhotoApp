import { Byte } from "@angular/compiler/src/util";

  export interface Photo {
    id: number;
    imageData: Byte;
    imageString: string;
    imageType: string;
    url: string;
    isMain: boolean;
  }