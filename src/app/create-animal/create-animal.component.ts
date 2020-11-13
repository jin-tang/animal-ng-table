import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnimalService } from '../services/animal.service';
import { IAnimal } from '../interfaces/ianimal';

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styles: []
})
export class CreateAnimalComponent implements OnInit {
   animalForm: FormGroup;
   loader: boolean;

  constructor(private _fb: FormBuilder, private _animalService: AnimalService) { }

  ngOnInit() {
    this._createForm();
  }

  /**
   * create our reactive form here
   */
  private _createForm() {
    this.animalForm = this._fb.group({
      name: ['', Validators.required],
      animalType: ['MAMMAL', Validators.required],
      breed: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  /**
   * submit new animal to server
   */
  onSubmit() {
    const param = this.animalForm.value;
    this._animalService.create(param)
      .subscribe((animal: IAnimal) => {
         this.loader = false;
         this.animalForm.reset({animalType: 'MAMMAL'});
      },
        (error) => {
          console.error(error);
          this.loader = false;
        });
  }


}
