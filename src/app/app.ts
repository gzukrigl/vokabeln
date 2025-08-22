import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartPanel } from './start-panel/start-panel';
import { VokabelForm } from './vokabel-form/vokabel-form';
import { CommonModule } from '@angular/common';

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
  imports: [StartPanel, VokabelForm /*, RouterOutlet*/, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class App {
    game: Game | null = null;
    vokabeln: Vokabel[] = [];
    latest_word: string = "";
    anzahl_alle_vokabeln: number = 0;
    index_aktives_vokabel: number = 0;
    error_message_text: string = "Blödmann";

    aktive_maske: string = "start_panel";
    show_start_panel: boolean = true;
    show_vokabeln_form: boolean = false;
    error_message_is_visible : boolean = false;
    show_firework: boolean = false;

    progress_bar_value: number = 1;
    progress_bar_max: number = 25;

    protected readonly title = signal('second_ng_project');

    on_start_game(game: Game) {
        console.log("Game started with", game);
        this.game = game;
        this.aktive_maske = "vokabeln_form";
    }

    on_show_error_message(text: string) {
        this.error_message_text = text;
        this.aktive_maske = "error_message";
    }

    on_finish_game() {
        this.aktive_maske = "start_panel";
        this.show_firework = true;
        // TODO: Firework für 5 Sekunden anzeigen
    }

    on_override_error_message_to_correct() {
        if (this.game == null) return;  
        this.game.nextWord(true);
    }

    on_continue_from_error_message() {
        if (this.game == null) return;
        this.game.nextWord(false)
    }
}
