import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPanel } from './start-panel/start-panel';
import { VokabelForm } from './vokabel-form/vokabel-form';
import { CommonModule } from '@angular/common';
import { Errormessage } from './errormessage/errormessage';

import { GameStartInput } from './models/game_start_input';
import { Game } from './models/game';

export class Vokabel
{
  word: string;
  translation: string;

  public constructor(word: string, translation: string)
  {
    this.word = word;
    this.translation = translation;
  }
}

@Component({
  selector: 'app-root',
  imports: [StartPanel, VokabelForm, Errormessage /*, RouterOutlet*/, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
    game: Game | null = null;

    aktive_maske: string = "start_panel";
    show_firework: boolean = false;
    error_message_text: string = "Blödmann";

    protected readonly title = signal('second_ng_project');

    change_mask_to(maske: "start_panel" | "vokabeln_form" | "error_message") {
        this.aktive_maske = maske;
        if (maske == "vokabeln_form") {
          this.focus_input('translation_input');
        }
        if (maske == "error_message") {
          this.focus_input('error_message_ok');
        }
    } 
    focus_input(id: string) {
        const input = document.getElementById(id) as HTMLInputElement | null;
        console.log("Focusing input " + id, input);
        setTimeout (() => {
            if (input != null) {
                console.log("Focusing input " + id);
                input.focus();
            }
        }, 1000);
    }

    on_start_game(game: Game) {
        console.log("Game started with", game);
        this.game = game;
        this.change_mask_to("vokabeln_form");
    }

    on_show_error_message(text: string) {
        console.log("Error message to show:", text);
        this.error_message_text = text;
        this.change_mask_to("error_message");
    }

    on_finish_game() {
        this.change_mask_to("start_panel");
        this.show_firework = true;
        let self = this;
        setTimeout(function() { self.show_firework = false; }, 5000);
    }

    on_override_error_message_to_correct() {
        console.log("Override to correct clicked");
        if (this.game == null) return;  
        this.game.nextWord(true);
        this.change_mask_to("vokabeln_form");
    }

    on_continue_from_error_message() {
      console.log("Continue from error message");
      if (this.game == null) return;
      this.game.addWrongAnswer();
      this.game.nextWord(false)
      this.change_mask_to("vokabeln_form");
    }
}
