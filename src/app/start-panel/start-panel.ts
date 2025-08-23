import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-panel',
  imports: [FormsModule],
  templateUrl: './start-panel.html',
  styleUrl: './start-panel.css'
})
export class StartPanel {
  on_start_game = output<Game>();

  anzahl_wiederholungen: number = 3;

  onFileSelected(event: any) {
    console.log("File selected", event);
    const file: File = event.target.files[0];
    if (file) {
      const file = event.target.files[0]; // Die hochgeladene Datei
      if (file) {
        console.log("file exists:", file.name);
        const reader = new FileReader();
        let self = this;
        reader.onloadend = function(x) {
          console.log("File read:", reader.result);
          const csvContent = reader.result; 
          if (csvContent != null) {
            let csvString = typeof csvContent === 'string' ? csvContent : new TextDecoder().decode(csvContent as ArrayBuffer);
            self.on_start_game.emit(Game.fromGameStartInput({cvsContent: csvString, anzahlWiederholungen: self.anzahl_wiederholungen}));
          }
        }
        reader.readAsText(file); // Datei als Text lesen‚
      }
    }
  }
                  /*
                  vokabeln = [];
                  einzelne_vokabeln = [];
                  const rows = csvContent.split('\n');
                  rows.forEach(row => {
                      const [word, translation] = row.split(';'); // Spalten aufteilen
                      if (word && translation && word != "" && translation != "") { // Nur gültige Zeilen verarbeiten
                          einzelne_vokabeln.push({ word: word.trim(), translation: translation.trim() });
                      }
                  });
              
                  anzahl_wiederholungen = $('#anzahl_wiederholungen').val();
                  console.log("Anzahl Wiederholungen:", anzahl_wiederholungen);
                  einzelne_vokabeln.forEach(element => {
                      for (let i = 0; i < anzahl_wiederholungen; i++) {
                          vokabeln.push(element);
                          vokabeln.push({word: element.translation, translation: element.word});
                      }
                  })

                  console.log("Vokabeln geladen:", vokabeln);
                  i = Math.floor(Math.random() * vokabeln.length);
                  jQuery('#translation_input').val("");
                  jQuery('#word_output').val(vokabeln[i].word);
                  $('#vokabeln_form').show();
                  $('#learn_button').show();
                  $('#continue').hide();
                  $('#start_panel').hide();
                  $('#learn_value').hide();
                  $('#progress_bar').attr('max', vokabeln.length);
                  anzahl_alle_vokabeln = vokabeln.length;
                  $('#total_value').text(anzahl_alle_vokabeln);
                
              } catch (error) {
                  alert("Fehler beim Laden der Datei: " + error);
              }
          };
          reader.readAsText(file); // Datei als Text lesen‚
      }
    }
        */
}
