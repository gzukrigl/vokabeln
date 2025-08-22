export class GameStartInput {
    cvsContent: string;
    anzahlWiederholungen: number;

    constructor(cvsContent: string, anzahlWiederholungen: number) {
        this.cvsContent = cvsContent;
        this.anzahlWiederholungen = anzahlWiederholungen;        
    }
}