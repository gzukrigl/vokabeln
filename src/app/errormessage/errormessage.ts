import { Component, input, output } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-errormessage',
  imports: [A11yModule],
  templateUrl: './errormessage.html',
  styleUrl: './errormessage.css'
})
export class Errormessage{
  text = input<string>();
  
  on_continue = output<void>();
  on_override_to_correct = output<void>();
 
  on_continue_click() {
    console.log("Continue clicked");
    this.on_continue.emit();
  }

  on_override_to_correct_click() {
    this.on_override_to_correct.emit();
  }
}
