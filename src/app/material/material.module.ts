import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatButtonToggleModule
} from '@angular/material';


@NgModule({
  imports: [BrowserAnimationsModule, MatButtonModule, MatMenuModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatSidenavModule, MatButtonToggleModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatMenuModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatSidenavModule, MatButtonToggleModule]
})
export class MaterialModule {}
