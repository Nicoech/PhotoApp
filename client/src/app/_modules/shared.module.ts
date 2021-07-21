import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxImageDisplayModule } from '@creativeacer/ngx-image-display';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ], 
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    
  ]
})
export class SharedModule { }
