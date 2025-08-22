import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-errormessage',
  imports: [],
  templateUrl: './errormessage.html',
  styleUrl: './errormessage.css'
})
export class Errormessage {
  text = input<string>();

  on_continue = output<void>();
  on_override_to_correct = output<void>();
  
  on_continue_click() {
    this.on_continue.emit();
  }

  on_override_to_correct_click() {
    this.on_override_to_correct.emit();
  }
}
