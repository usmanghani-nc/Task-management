import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ListComponent } from './components/list/list.component';
import { ListWrapperComponent } from './components/list-wrapper/list-wrapper.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ButtonComponent, InputComponent, ListComponent, ListWrapperComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
