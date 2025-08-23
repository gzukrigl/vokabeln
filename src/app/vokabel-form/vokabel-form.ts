import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProgressBar } from '../progress-bar/progress-bar';

import { Game } from '../models/game';

@Component({
  selector: 'app-vokabel-form',
  imports: [ProgressBar, CommonModule, FormsModule],
  templateUrl: './vokabel-form.html',
  styleUrl: './vokabel-form.css',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class VokabelForm {
  game = input<Game | null>();

  on_show_error_message = output<string>();
  on_finish_game = output<void>();

  show_warning_row: boolean = false;
  in_teaching_mode: boolean = false

  translation_input: string = "";

  remaining_words(): number { 
    let game = this.game();
    if (game == null) return 0;
    return game.vokabeln.length;
  }

  total_words(): number {
    let game = this.game();
    if (game == null) return 0;
    return game.total_words;
  }

  solved_words_count(): number {
    let game = this.game();
    if (game == null) return 0;
    return game.total_words - game.vokabeln.length;
  }

  current_word(): string {
    let game = this.game();
    if (game == null) return "";
    return game.getCurrentWord();
  }

  current_translation(): string {
    let game = this.game();
    if (game == null) return "";
    return game.getCurrentTranslation();
  }

  on_change_translation_input(event: any) {
    this.translation_input = event.target.value;
  }

  on_check_translation() {
    let game = this.game();
    if (game == null) return;
    console.log(
      "Checking translation", this.translation_input, "for word", game.getCurrentWord()
    );
    let input_is_ok: "correct" | "warning" | "wrong" | "finished" = game.checkTranslation(this.translation_input);
    console.log("Input is", input_is_ok);
    switch(input_is_ok) {
      case "correct":
        this.translation_input = "";
        break;
      case "warning":
        this.show_warning_row = true;
        break;
      case "wrong":
        this.on_show_error_message.emit("Falsch! Die richtige Antwort ist: " + game.getCurrentTranslation())
        break;
      case "finished":
        this.on_finish_game.emit();
        break;
    }
  }
  
  on_teach() {
    this.in_teaching_mode = true;
    this.show_warning_row = false;
  }

  on_continue() {
    this.in_teaching_mode = false;
    this.show_warning_row = false;
    let game = this.game();
    if (game == null) return;
    game.nextWord();
  }

  on_quit() {
    this.on_finish_game.emit();
  }
}
