import { GameStartInput } from "./game_start_input";

export class Game {
    public vokabeln: { word: string, translation: string }[] = [];
    total_words: number = 0;
    i: number = 0;

    constructor(vokabeln: { word: string, translation: string }[]) {
        this.vokabeln = vokabeln;
        this.total_words = vokabeln.length;
        this.i = Math.floor(Math.random() * this.vokabeln.length);
        console.log(this);
    }

    static fromGameStartInput(gsi: GameStartInput): Game {
        let vokabeln = [];
        let einzelne_vokabeln = [];
        const rows = gsi.cvsContent.split('\n');
        for (let row of rows) {
            const [word, translation] = row.split(';'); // Spalten aufteilen
            if (word && translation && word != "" && translation != "") { // Nur gültige Zeilen verarbeiten
                einzelne_vokabeln.push({ word: word.trim(), translation: translation.trim() });
            }
        }
        for (let i = 0; i < gsi.anzahlWiederholungen; i++) {
            for (let element of einzelne_vokabeln) {
                vokabeln.push(element);
                vokabeln.push({word: element.translation, translation: element.word}); // Umkehrung der Vokabel
            }
        }
        let result = new Game(vokabeln);
        console.log(result);
        return result;
    }

    getCurrentWord(): string {
        return this.vokabeln[this.i].word;
    }

    getCurrentTranslation(): string {
        return this.vokabeln[this.i].translation;
    }

    addWrongAnswer(): void {
        // Füge die aktuelle Vokabel am Ende der Liste hinzu, soll den Lerneffekt erhöhen
        let current = this.vokabeln[this.i];
        this.vokabeln.push(current);
        this.total_words += 1;
    }

    input_is_ok(entered_translation: string): "correct" | "warning" | "wrong" {
        let correct_answer = this.vokabeln[this.i].translation;
        let correct_answers = correct_answer.split(",");
        for(let i = 0; i < correct_answers.length; i++) {            
            let single_correct_answer = correct_answers[i].trim();  
            if (single_correct_answer.startsWith('to ')) {
                single_correct_answer = single_correct_answer.substring(3).trim();
            }
            if (entered_translation.startsWith('to ')) {
                entered_translation = entered_translation.substring(3).trim();
            }
            if (entered_translation.toLowerCase() == single_correct_answer.toLowerCase()) {
                if(entered_translation == single_correct_answer) {
                    return "correct";
                } else {
                    return "warning";
                }
            }
        }
        return "wrong";
    }
       
    test_input_is_ok() {
        // TODO: Unit Tests auslagern
        
        /*
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
        */
    }   

    checkTranslation(translation: string): "correct" | "warning" | "wrong" | "finished" {
        let result: "correct" | "warning" | "wrong" = this.input_is_ok(translation);
        if (result == "correct" || result == "warning") {
            this.nextWord(true); // Neue zufällige Vokabel
            if (this.vokabeln.length == 0) {
                return "finished";
            }
        }
        return result;
    }

    are_all_words_identical(): boolean {
        if (this.vokabeln.length == 0) 
            return false;
        let first_word = this.vokabeln[0].word;
        for (let v of this.vokabeln) {
            if (v.word != first_word) 
                return false;
        }
        return true;
    }

    test_are_all_words_identical() {
        // TODO: Unit Tests auslagern
        /*
        console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}])); // true
        console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}, {word: "Katze", translation: "cat"}])); // true
        console.log(this.are_all_words_identical([{word: "Katze", translation: "cat"}, {word: "Hund", translation: "dog"}])); // false
        console.log(this.are_all_words_identical([])); // false
        */
    }


    nextWord(remove_current: boolean = false): void {
        
        let latest_word = this.vokabeln[this.i];
        if (remove_current) {
            this.vokabeln.splice(this.i, 1); // Vokabel entfernen
        }
        if (this.vokabeln.length > 0) {
            // Keine Wiederholung der gleichen Vokabel
            let i = 0
            do {
                i = Math.floor(Math.random() * this.vokabeln.length); 
            } while (this.vokabeln[i].word == latest_word.word && !this.are_all_words_identical());
            this.i = i;
        }
    }
}