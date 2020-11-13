import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { IAnimal } from '../interfaces/ianimal';
import { NgAlertService, MessageType } from '@theo4u/ng-alert';

@Component({
  selector: 'app-list-animal',
  templateUrl: './list-animal.component.html',
  styles: []
})
export class ListAnimalComponent implements OnInit {
  animals: IAnimal[] = [];
  loading = true;

  constructor(private _animalService: AnimalService, private _ngAlert: NgAlertService) { }

  ngOnInit() {
    this.loading = true;
    this._animalService.list()
      .subscribe(animals => {
        this.loading = false;
        this.animals = animals;
      });

    // subscribe to pusher's event
    this._animalService.getChannel().bind('new', data => {
      data.new = true;
      this.animals.push(data);
    });

    this._animalService.getChannel().bind('deleted', data => {
      this.animals = this.animals.filter(animal => animal.key !== data.key);
    });
  }

  delete(animal: IAnimal) {
   // show delete confirmation with ngAlert
    this._ngAlert.push({
      message: `<strong>Are you sure!</strong> you want to delele this animal with name <strong>${animal.name}</strong>`,
      type: MessageType.warning,
      buttons: [
        {
          label: 'Continue',
          action: () => {
            this._actualDelete(animal);
          },
          css: 'btn btn-danger'
        }
      ]
    });
  }

  private _actualDelete (animal: IAnimal) {
    this._animalService.delete(animal)
      .subscribe(() => {
        // remove the animal if removed successfully
        this.animals = this.animals.filter(item => item !== animal);
        this._ngAlert.push({
          message: `${animal.name} removed`,
          type: MessageType.success
        });
      });
  }

}
