import { Component, input } from '@angular/core';

@Component({
  selector: 'app-errormessage',
  imports: [],
  templateUrl: './errormessage.html',
  styleUrl: './errormessage.css'
})
export class Errormessage {
  text = input<string>();
  visible = input<boolean>();
}
