function input_is_ok(input_text, correct_answer) {
    if (input_text == correct_answer) {
        return true;
    }
    if (correct_answer.startsWith('to ')) {
        correct_answer = correct_answer.substring(3);
        if (input_text == correct_answer) {
            return true;
        }
    }
    return false;
}

function are_all_words_identical(vokabeln) {
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

function show_finished_sequence() {
    $('#firework').show();
    $('#vokabeln_form').hide();
    setTimeout(function() {
        $('#firework').hide();
    }, 5000);
    $('#file_input').val('')
    $('#start_panel').show();
}

function show_wrong_answer_sequence() {
    $('#vokabeln_form').hide();
    $('#error_message_text').text("Falsch! Die richtige Antwort ist: " + vokabeln[i].translation);
    $('#error_message').show();
}

function show_next_word(latest_word) {
    do {
        i = Math.floor(Math.random() * vokabeln.length);
    } while (vokabeln[i].word == latest_word && !are_all_words_identical(vokabeln));
    jQuery('#translation_input').val("");
    jQuery('#word_output').val(vokabeln[i].word);
}

function load_data() {
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
        console.log(vokabeln[0].word)
        i = Math.floor(Math.random() * vokabeln.length);
        jQuery('#translation_input').val("");
        jQuery('#word_output').val(vokabeln[i].word);
        $('#vokabeln_form').show();
        $('#start_panel').hide();
    } catch (error) {
        alert("Fehler beim Laden der Datei: " + error.message);
    }
}

$(document).ready(function(){
    vokabeln = [];
    $('#vokabeln_form').hide();
    $('#firework').hide();
    $('#error_message').hide();

    $('#check').click(function(event){
        event.preventDefault();
        var input = jQuery('#translation_input').val();
        var latest_word = vokabeln[i].word;

        if (input_is_ok(input.trim(), vokabeln[i].translation)) {
            vokabeln.splice(i,1);
        } else {
            show_wrong_answer_sequence();
        }

        if(vokabeln.length == 0){
            show_finished_sequence();
        } else {
            show_next_word(latest_word);
        }
    }); 

    $('#error_message_ok').click(function(event){
        event.preventDefault();
        $('#error_message').hide();
        $('#vokabeln_form').show();
        $('#translation_input').focus();
    });

    // Enter-Taste für den "Weiter"-Button abfangen
    $(document).on('keydown', function(event) {
        if (event.key === "Enter" && $('#error_message').is(':visible')) {
            event.preventDefault(); // Verhindert das Standardverhalten
            $('#error_message_ok').click(); // Klick-Event des Buttons auslösen
        }
    });

    $('#file_input').on('change', function(event) {
        const file = event.target.files[0]; // Die hochgeladene Datei
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                load_data();

            };
            reader.readAsText(file); // Datei als Text lesen‚
        }
    });

    $(document).ready(function() {
        $('#anzahl_wiederholungen').on('input', function() {
            $('#slider_value').text($(this).val()); // Aktualisiert den Wert in Echtzeit
        });
    });

});