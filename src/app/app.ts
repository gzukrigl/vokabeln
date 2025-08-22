import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  vokabeln: Vokabel[] = [];
  latest_word: string = "";
  anzahl_alle_vokabeln: number = 0;
  index_aktives_vokabel: number = 0;
  error_message_text: string = "Blödmann";
  error_message_is_visible : boolean = false;

  protected readonly title = signal('second_ng_project');
  input_is_ok(input_text: string, correct_answer: string) {
            let correct_answers = correct_answer.split(",");
            for(let i = 0; i < correct_answers.length; i++) {            
                var single_correct_answer= correct_answers[i].trim();  
                if (single_correct_answer.startsWith('to ')) {
                    single_correct_answer = single_correct_answer.substring(3).trim();
                }
                if (input_text.startsWith('to ')) {
                    input_text = input_text.substring(3).trim();
                }
                if (input_text.toLowerCase() == single_correct_answer.toLowerCase()) {
                    if(input_text == single_correct_answer) {
                        return "correct";
                    } else {
                        return "warning";
                    }
                }
            }
            return "wrong";
        }

        test_input_is_ok() {
            console.log(this.input_is_ok("Katze", "Katze")=="correct");
            console.log(this.input_is_ok("cat", "Katze, cat, Katze")=="correct");
            console.log(this.input_is_ok("Katze", "Katze, cat, Katze")=="correct");
            console.log(this.input_is_ok("Katze", "Katze, Hund, Katze")=="correct");
            console.log(this.input_is_ok("Hund", "Katze, Hund, Katze")=="correct");
            console.log(this.input_is_ok("to speak", "to talk, to speak")=="correct");
            console.log(this.input_is_ok("laufen", "laufen, to run")=="correct");
            console.log(this.input_is_ok("Clemens", "Gerald")=="wrong");
            console.log(this.input_is_ok("kaTze", "Katze")=="warning");
            console.log(this.input_is_ok("kaTze", "Hund, Katze")=="warning");

        }   

        are_all_words_identical(vokabeln: Vokabel[]) {
            if (vokabeln.length == 0) {
                return false;
            }
            const first_word = vokabeln[0].word;
            for (let i = 1; i < vokabeln.length; i++) {
                if (vokabeln[i].word !== first_word) {
                    return false;
                }
            }
            return true;
        }
        
        test_are_all_words_identical() {
            console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}])); // true
            console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}, {word: "Katze", translation: "cat"}])); // true
            console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}, {word: "Hund", translation: "dog"}])); // false
            console.log(this.are_all_words_identical([])); // false
        }

        proceed_to_next_word(latest_word: string, vokabeln: Vokabel[]) {
          let i;  
          if (vokabeln.length == 0) {
                $('#firework').show();
                this.anzahl_alle_vokabeln = 0;
                i = 0;
                this.adjust_progress_bar();
                $('#vokabeln_form').hide();
                setTimeout(function() {
                    $('#firework').hide();
                }, 5000);
                $('#file_input').val('')
                $('#start_panel').show();
            } else {
                do {
                    i = Math.floor(Math.random() * vokabeln.length);
                } while (vokabeln[i].word == latest_word && !this.are_all_words_identical(vokabeln));
                $('#translation_input').val("");
                $('#word_output').val(vokabeln[i].word);
                $('#vokabeln_form').show();
            } 
            this.error_message_is_visible = false;       

            $('#translation_input').focus();
            this.adjust_progress_bar();
            return i;
        }

        adjust_progress_bar() {
            $('#progress_bar').attr('value', this.anzahl_alle_vokabeln - this.vokabeln.length);
            $('#progress_value').text(this.anzahl_alle_vokabeln - this.vokabeln.length);
            $('#progress_bar').attr('max', this.anzahl_alle_vokabeln);
            $('#total_value').text(this.anzahl_alle_vokabeln);
        }


        on_check_click(){
          //event.preventDefault();
          $('#warning_row').hide();
          var input = jQuery('#translation_input').val();
          this.latest_word = this.vokabeln[this.index_aktives_vokabel].word;
          switch(this.input_is_ok(input.trim(), this.vokabeln[this.index_aktives_vokabel].translation)) {
            case "correct":
              this.vokabeln.splice(this.index_aktives_vokabel,1);
              console.log(this.vokabeln);
              this.index_aktives_vokabel = this.proceed_to_next_word(this.latest_word, this.vokabeln);
              break;
            case "warning":
              this.vokabeln.splice(this.index_aktives_vokabel,1);
              console.log(this.vokabeln);
              this.index_aktives_vokabel = this.proceed_to_next_word(this.latest_word, this.vokabeln);
              $('#warning_row').show();
              break;
            case "wrong":
              this.vokabeln.push(this.vokabeln[this.index_aktives_vokabel]);
              $('#vokabeln_form').hide();
              this.error_message_text = "Falsch! Die richtige Antwort ist: " + this.vokabeln[this.index_aktives_vokabel].translation
              this.error_message_is_visible = true;
              $('#error_message_ok').focus();
              this.anzahl_alle_vokabeln++;
              this.adjust_progress_bar();
              break;
          }
        } 

        on_teach_button_click() {
          $('#translation_input').hide();
          $('#learn_value').show();
          $('#learn_value').text(this.vokabeln[i].translation);
          $('#teach_button').hide();
          $('#check').hide();
          $('#continue').show().focus();
        }

        on_continue_click() {
          $('#translation_input').show();
          $('#learn_value').hide();
          $('#teach_button').show();
          $('#check').show();
          $('#continue').hide();
          $('#learn_value').hide();
          this.index_aktives_vokabel = this.proceed_to_next_word(this.latest_word, this.vokabeln);
        }

        on_false_error_message_click() {
          this.vokabeln.splice(i,1);
          this.index_aktives_vokabel = this.proceed_to_next_word(this.latest_word, this.vokabeln);
        }

        on_error_message_ok_click()
        {
          this.index_aktives_vokabel = this.proceed_to_next_word(this.latest_word, this.vokabeln));
        }

        on_file_input_change(event: any)
        {
          const file = event.target.files[0]; // Die hochgeladene Datei
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const csvContent = e.target.result;
                    
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
                            alert("Fehler beim Laden der Datei: " + error.message);
                        }
                    };
                    reader.readAsText(file); // Datei als Text lesen‚
                }
        }

        setup(){
            this.test_input_is_ok();
            let i = 0;
            $('#vokabeln_form').hide();
            $('#firework').hide();
            this.error_message_is_visible = false;
            $('#warning_row').hide();
        
          
           
            $('#file_input').on('change', function(event) {
                
            });

            $(document).ready(function() {
                $('#anzahl_wiederholungen').on('input', function() {
                    $('#slider_value').text($(this).val()); // Aktualisiert den Wert in Echtzeit
                });
            });
        });
}
