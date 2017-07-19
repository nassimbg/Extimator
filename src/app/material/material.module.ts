import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';
import {
  MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdSidenavModule,
  MdButtonToggleModule
} from '@angular/material';


@NgModule({
  imports: [BrowserAnimationsModule, MdButtonModule, MdMenuModule, MdToolbarModule, 
  MdIconModule, MdCardModule, MdSidenavModule, MdButtonToggleModule],
  exports: [BrowserAnimationsModule, MdButtonModule, MdMenuModule, MdToolbarModule, 
  MdIconModule, MdCardModule, MdSidenavModule, MdButtonToggleModule]
})
export class MaterialModule {}
