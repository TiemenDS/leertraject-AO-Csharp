// Module 0 - Voorkennis: Methoden & Arrays
window.MODULE_0 = {
  id: "m0",
  title: "Voorkennis: Methoden & Arrays",
  desc: "Opfrissing van gestructureerd programmeren — de basis waarop OOP voortbouwt.",
  icon: "📦",
  lessons: [
    {
      id: "m0l1",
      title: "Methoden",
      sub: "Code groeperen en hergebruiken",
      theory: `
        <p>Een <b>methode</b> is een blok code met een naam dat je kunt aanroepen wanneer je het nodig hebt. Methoden voorkomen dat je dezelfde code telkens opnieuw moet schrijven en maken je programma overzichtelijker.</p>
        <h3>Anatomie van een methode</h3>
        <p>Een methode bestaat uit een <b>access modifier</b> (bv. <code>public</code>), een eventueel <code>static</code> keyword, een <b>returntype</b> (of <code>void</code> als er niets terugkomt), een <b>naam</b>, en tussen haakjes de <b>parameters</b>.</p>
        <h3>Returntype</h3>
        <p>Een methode kan een waarde teruggeven met <code>return</code>. Het type van wat je teruggeeft moet overeenkomen met het returntype in de signatuur. Een <code>void</code>-methode geeft niets terug.</p>
        <h3>Parameters</h3>
        <p>Parameters laten je toe data aan een methode mee te geven. Bij value types (zoals <code>int</code>) wordt een <i>kopie</i> doorgegeven — wijzigingen binnen de methode hebben geen effect op het origineel.</p>
        <h3>Method overloading</h3>
        <p>Je mag meerdere methoden met dezelfde naam hebben zolang hun parameterlijst verschilt. De compiler kiest de juiste op basis van de meegegeven argumenten.</p>
      `,
      examples: [
        { title: "Een methode met returntype", code:
`public static int Som(int a, int b)
{
    return a + b;
}

// Aanroep
int resultaat = Som(3, 4); // 7` },
        { title: "Een void-methode", code:
`public static void Begroet(string naam)
{
    Console.WriteLine($"Hallo {naam}!");
}

Begroet("Tiemen");` },
        { title: "Overloading", code:
`int Verdubbel(int x) => x * 2;
double Verdubbel(double x) => x * 2;` }
      ],
      summary: [
        "Een methode groepeert herbruikbare code onder een naam.",
        "Het returntype geeft aan wat terugkomt; void betekent niets.",
        "Parameters geven data door — value types als kopie.",
        "Overloading laat dezelfde naam toe met verschillende parameterlijsten."
      ],
      quiz: [
        { q: "Wat betekent het returntype <code>void</code>?", opts: ["De methode geeft niets terug", "De methode is leeg", "De methode is static", "De methode geeft 0 terug"], correct: 0, exp: "void betekent dat de methode geen waarde teruggeeft." },
        { q: "Wat maakt overloading mogelijk?", opts: ["Dezelfde naam maar verschillende parameterlijst", "Dezelfde naam en hetzelfde returntype", "Een ander access modifier", "Het static keyword"], correct: 0, exp: "Overloading onderscheidt methoden op basis van hun parameterlijst." },
        { q: "Hoe geef je een waarde terug uit een methode?", opts: ["met return", "met out", "met void", "met yield"], correct: 0, exp: "Het return keyword stuurt een waarde terug naar de aanroeper." }
      ],
      exercises: [
        { type: "fill", prompt: "Vul de signatuur aan van een methode die twee getallen vermenigvuldigt en een <code>int</code> teruggeeft.", template: "public ___ Product(int a, int b) { return a * b; }", answers: ["int"], hint: "Het returntype van een vermenigvuldiging van twee ints." },
        { type: "code", prompt: "Schrijf een methode <code>Grootste</code> die twee ints aanvaardt en de grootste teruggeeft.", starter: "public int Grootste(int a, int b)\n{\n    // jouw code\n}", check: ["return", "a", "b"], sample: "public int Grootste(int a, int b)\n{\n    if (a > b) return a;\n    return b;\n}" }
      ]
    },
    {
      id: "m0l2",
      title: "Arrays",
      sub: "Meerdere waarden in één variabele",
      theory: `
        <p>Een <b>array</b> bewaart meerdere waarden van hetzelfde datatype onder één naam. Elk element heeft een <b>index</b> die begint bij 0.</p>
        <h3>Declareren en initialiseren</h3>
        <p>Je geeft het datatype op gevolgd door <code>[]</code>. Je kan een array maken met een vaste lengte via <code>new</code>, of meteen met waarden via accolades.</p>
        <h3>Lengte en doorlopen</h3>
        <p>De <code>.Length</code> property geeft het aantal elementen. Met een <code>for</code>-lus loop je over alle indexen.</p>
        <h3>Arrays zijn reference types</h3>
        <p>Een array-variabele bevat een <i>verwijzing</i> naar de data, niet de data zelf. Twee variabelen kunnen naar dezelfde array verwijzen — dit komt later bij stack & heap uitgebreid terug.</p>
      `,
      examples: [
        { title: "Array maken en vullen", code:
`int[] getallen = new int[3];
getallen[0] = 10;
getallen[1] = 20;
getallen[2] = 30;

// Of meteen:
int[] scores = { 12, 34, 56 };` },
        { title: "Doorlopen met for", code:
`for (int i = 0; i < scores.Length; i++)
{
    Console.WriteLine(scores[i]);
}` },
        { title: "Array van objecten (vooruitblik)", code:
`Balletje[] veel = new Balletje[100];
for (int i = 0; i < veel.Length; i++)
{
    veel[i] = new Balletje();
}` }
      ],
      summary: [
        "Een array bewaart meerdere waarden van hetzelfde type.",
        "Indexen starten bij 0; .Length geeft het aantal elementen.",
        "Met een for-lus loop je over alle elementen.",
        "Arrays zijn reference types: de variabele verwijst naar de data."
      ],
      quiz: [
        { q: "Bij welke index start een array?", opts: ["0", "1", "-1", "Bij de lengte"], correct: 0, exp: "Arrays in C# zijn 0-geïndexeerd." },
        { q: "Hoe krijg je het aantal elementen van array <code>a</code>?", opts: ["a.Length", "a.Count", "a.Size()", "len(a)"], correct: 0, exp: ".Length geeft het aantal elementen van een array." },
        { q: "Een array is een ...", opts: ["reference type", "value type", "enum", "struct"], correct: 0, exp: "Arrays worden by reference doorgegeven en in de heap bewaard." }
      ],
      exercises: [
        { type: "fill", prompt: "Maak een array van 5 ints.", template: "int[] cijfers = new int[___];", answers: ["5"], hint: "Vijf elementen." },
        { type: "code", prompt: "Schrijf een lus die alle elementen van <code>int[] data</code> optelt in <code>som</code>.", starter: "int som = 0;\nfor (int i = 0; i < data.Length; i++)\n{\n    // jouw code\n}", check: ["som", "data[i]", "+"], sample: "int som = 0;\nfor (int i = 0; i < data.Length; i++)\n{\n    som += data[i];\n}" }
      ]
    }
  ]
};