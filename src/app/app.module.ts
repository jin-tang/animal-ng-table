import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgAlertModule } from '@theo4u/ng-alert';

import { AppComponent } from './app.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';
import { ListAnimalComponent } from './list-animal/list-animal.component';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { AnimalService } from './services/animal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PusherService } from './services/pusher.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateAnimalComponent,
    ListAnimalComponent,
    EditAnimalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgAlertModule,
    HttpClientModule
  ],
  providers: [AnimalService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
