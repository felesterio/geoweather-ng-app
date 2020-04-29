import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {ProfileComponent} from './profile/profile.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {MapComponent} from './map/map.component';
import {FormsModule} from "@angular/forms";
import {CreateReportComponent} from './create-report/create-report.component';

const appRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '',
    component: MapComponent,
  },
  {
    path: 'create-report',
    component: CreateReportComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProfileComponent,
    NotFoundComponent,
    MapComponent,
    CreateReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
