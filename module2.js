// Module 2 - H12: Geheugen, Null, Namespaces, Exceptions
window.MODULE_2 = {
  id: "m2",
  title: "H12 — Geheugen, Null & Exception Handling",
  desc: "Stack & heap, reference vs value types, null-veiligheid, namespaces en robuuste code.",
  icon: "🧠",
  lessons: [
    {
      id: "m2l1",
      title: "Stack & Heap",
      sub: "Twee soorten geheugen",
      theory: `
        <p>Een C#-applicatie krijgt twee soorten geheugen toegewezen:</p>
        <ul>
          <li><b>Stack:</b> klein maar snel. De compiler weet precies hoeveel hij nodig heeft.</li>
          <li><b>Heap:</b> groot maar trager. Een soort "zandbak" waar tijdens uitvoer plek wordt ingepalmd.</li>
        </ul>
        <h3>Value types vs reference types</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13.5px">
          <tr style="border-bottom:1px solid var(--border)"><th style="text-align:left;padding:8px">&nbsp;</th><th style="text-align:left;padding:8px">Value types</th><th style="text-align:left;padding:8px">Reference types</th></tr>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:8px">Inhoud variabele</td><td style="padding:8px">Eigenlijke data</td><td style="padding:8px">Referentie naar data</td></tr>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:8px">Locatie</td><td style="padding:8px"><b>Stack</b></td><td style="padding:8px"><b>Heap</b></td></tr>
          <tr style="border-bottom:1px solid var(--border)"><td style="padding:8px">Beginwaarde</td><td style="padding:8px">0, 0.0, "", false</td><td style="padding:8px">null</td></tr>
          <tr><td style="padding:8px">= operator</td><td style="padding:8px">Kopieert waarde</td><td style="padding:8px">Kopieert adres</td></tr>
        </table>
        <p style="margin-top:12px"><b>Value types</b> zijn int, double, bool, char, structs en enums. <b>Reference types</b> zijn arrays, objecten en alles wat groot of onvoorspelbaar van grootte is. In C# is eigenlijk álles een object.</p>
        <h3>Waarom twee geheugens?</h3>
        <p>Bij het compileren wordt al berekend hoeveel stackgeheugen nodig is — maar de compiler kan niet alles voorspellen (bv. de lengte van een door de gebruiker ingevoerde string of een runtime-bepaalde array). De heap vangt dat onvoorspelbare op.</p>
      `,
      examples: [
        { title: "Value type: = kopieert de waarde", code:
`int getal = 3;
int anderGetal = getal;  // kopie van waarde
anderGetal = 99;
// getal is nog steeds 3` },
        { title: "Reference type: = kopieert het adres", code:
`int[] nummers = { 4, 5, 10 };
int[] andere = nummers;   // zelfde array!
andere[0] = 999;
Console.WriteLine(nummers[0]); // 999
Console.WriteLine(andere[0]);  // 999` }
      ],
      summary: [
        "Stack = klein/snel (value types); Heap = groot/traag (reference types).",
        "Value types bevatten de data zelf; reference types een adres.",
        "= kopieert bij value types de waarde, bij reference types het adres.",
        "De heap vangt onvoorspelbare groottes op die de compiler niet kent."
      ],
      quiz: [
        { q: "Waar worden value types bewaard?", opts: ["Stack", "Heap", "Beide", "Geen van beide"], correct: 0, exp: "Value types staan in de snelle stack." },
        { q: "Wat kopieert de = operator bij reference types?", opts: ["Het adres", "De waarde", "Niets", "De klasse"], correct: 0, exp: "Bij reference types kopieer je de referentie (het adres)." },
        { q: "Welke is een value type?", opts: ["int", "array", "string-object", "klasse-instantie"], correct: 0, exp: "int is een value type; arrays en objecten zijn reference types." },
        { q: "Wat is de beginwaarde van een reference type?", opts: ["null", "0", "\"\"", "false"], correct: 0, exp: "Reference types beginnen als null." }
      ],
      exercises: [
        { type: "fill", prompt: "Twee array-variabelen die naar dezelfde data verwijzen — vul aan.", template: "int[] a = {1,2}; int[] b = ___;", answers: ["a"], hint: "Wijs de bestaande array toe." },
        { type: "code", prompt: "Toon aan dat twee int-variabelen onafhankelijk zijn (value type-gedrag).", starter: "// jouw code", check: ["int", "=", "WriteLine"], sample: "int x = 3;\nint y = x;\ny = 99;\nConsole.WriteLine(x); // 3\nConsole.WriteLine(y); // 99" }
      ]
    },
    {
      id: "m2l2",
      title: "Garbage Collector",
      sub: "Automatisch geheugen opruimen",
      theory: `
        <p>De <b>Garbage Collector (GC)</b> is de stille held van .NET. Hij doorloopt geregeld het heap-geheugen en verwijdert objecten waar geen enkele referentie meer naar verwijst.</p>
        <p>Als je een referentie overschrijft en er geen andere variabele meer naar het oude object verwijst, wordt dat object door de GC opgeruimd. Wil je dat voorkomen, dan heb je minstens één variabele nodig die ernaar blijft verwijzen.</p>
        <div class="callout warn">Je kan de GC handmatig starten met <code>GC.Collect()</code>, maar dat is ten stelligste af te raden — de GC weet meestal beter wanneer er opgeruimd moet worden.</div>
        <div class="callout"><b>Belangrijk:</b> de GC werkt enkel op de heap. Een variabele in de stack met waarde null wordt nooit door de GC verwijderd.</div>
      `,
      examples: [
        { title: "Object dat verdwijnt", code:
`Held supermand = new Held();
Held batmand = new Held();
batmand = supermand;
// Het tweede Held-object heeft geen referentie meer
// → GC ruimt het op` },
        { title: "Referentie bewaren", code:
`Held supermand = new Held();
Held batmand = new Held();
Held bewaarEerste = batmand;  // houdt referentie
batmand = supermand;
// Tweede object blijft bereikbaar via bewaarEerste` }
      ],
      summary: [
        "De GC verwijdert heap-objecten zonder referenties.",
        "Bewaar een referentie als je een object wil behouden.",
        "GC.Collect() bestaat maar gebruik je beter niet.",
        "De GC werkt enkel op de heap, niet op de stack."
      ],
      quiz: [
        { q: "Wanneer ruimt de GC een object op?", opts: ["Als er geen referenties meer naar wijzen", "Direct na aanmaak", "Nooit", "Bij elke regel code"], correct: 0, exp: "Objecten zonder referenties worden opgeruimd." },
        { q: "Waar werkt de GC?", opts: ["Enkel op de heap", "Enkel op de stack", "Op beide", "Op geen van beide"], correct: 0, exp: "De GC werkt uitsluitend op de heap." },
        { q: "Wat is het advies over GC.Collect()?", opts: ["Niet gebruiken", "Altijd gebruiken", "Eén keer per methode", "Verplicht"], correct: 0, exp: "Handmatig opruimen wordt afgeraden." }
      ],
      exercises: [
        { type: "fill", prompt: "Bewaar het object van batmand zodat de GC het niet opruimt.", template: "Held bewaar = ___;", answers: ["batmand"], hint: "Verwijs naar het bestaande object." }
      ]
    },
    {
      id: "m2l3",
      title: "Objecten & methoden",
      sub: "By reference doorgeven",
      theory: `
        <p>Klassen zijn "gewoon" nieuwe datatypes, dus alle regels rond parameters blijven gelden. Het grote verschil: objecten worden <b>by reference</b> doorgegeven.</p>
        <div class="callout warn">Aanpassingen aan een object binnen een methode wijzigen het <b>originele</b> object dat werd meegegeven — net zoals bij arrays!</div>
        <h3>Objecten als resultaat</h3>
        <p>Een methode mag ook een object teruggeven. Een methode op een object kan zelfs een nieuw object van hetzelfde type teruggeven.</p>
        <h3>Voortplanting in C#</h3>
        <p>De cursus illustreert dit met een <code>Mens</code>-klasse met een <code>PlantVoort()</code>-methode die <code>return new Mens()</code> doet — objecten kunnen objecten van hun eigen type creëren.</p>
      `,
      examples: [
        { title: "Object aanpassen in methode (by reference)", code:
`public void VoegMetingToeEnVerwijder(Meting inMeting)
{
    Temperatuur += inMeting.Temperatuur;
    inMeting.Temperatuur = 0;     // wijzigt origineel!
    inMeting.OpgemetenDoor = "";
}` },
        { title: "Object als resultaat", code:
`public Meting GenereerRandomMeting()
{
    Meting result = new Meting();
    result.Temperatuur = Temperatuur * 2;
    result.OpgemetenDoor = OpgemetenDoor + "Junior";
    return result;
}` }
      ],
      summary: [
        "Objecten worden by reference aan methoden doorgegeven.",
        "Wijzigingen in de methode raken het originele object.",
        "Methoden mogen objecten teruggeven (zelfs van hun eigen type).",
        "Een klasse kan objecten van zichzelf produceren (PlantVoort)."
      ],
      quiz: [
        { q: "Hoe worden objecten aan methoden doorgegeven?", opts: ["By reference", "By value", "Als kopie", "Helemaal niet"], correct: 0, exp: "Objecten gaan by reference; wijzigingen raken het origineel." },
        { q: "Wat gebeurt er als je een meegegeven object wijzigt in een methode?", opts: ["Het origineel verandert mee", "Niets", "Er ontstaat een kopie", "Crash"], correct: 0, exp: "By reference betekent dat het origineel wijzigt." },
        { q: "Mag een methode een object teruggeven?", opts: ["Ja, ook van het eigen type", "Nee", "Enkel value types", "Enkel arrays"], correct: 0, exp: "Objecten mogen het resultaat van een methode zijn." }
      ],
      exercises: [
        { type: "code", prompt: "Schrijf een methode <code>PlantVoort</code> in klasse Mens die een nieuw Mens-object teruggeeft.", starter: "class Mens\n{\n    // jouw methode\n}", check: ["public Mens PlantVoort", "return new Mens"], sample: "class Mens\n{\n    public Mens PlantVoort()\n    {\n        return new Mens();\n    }\n}" }
      ]
    },
    {
      id: "m2l4",
      title: "Null & NullReferenceException",
      sub: "Veilig omgaan met onbestaande objecten",
      theory: `
        <p>Een reference type bevat standaard de waarde <code>null</code> — dat betekent "nog geen referentie naar een effectief object". Net zoals een int standaard 0 heeft.</p>
        <p>Zodra je met <code>=</code> een referentie toewijst, wordt null overschreven. Je kan ook expliciet op null testen.</p>
        <h3>NullReferenceException</h3>
        <p>Een veelvoorkomende runtime-fout. Treedt op wanneer je een object benadert dat null is (een onbestaand object). De boodschap luidt: <i>"Object reference not set to an instance of an object."</i></p>
        <h3>Voorkomen</h3>
        <p>Test op null met <code>if (obj == null)</code>, of gebruik de <b>verkorte notatie</b> met het vraagteken: <code>obj?.Naam</code> voert de code na het vraagteken enkel uit als het object niet null is.</p>
        <h3>Return null</h3>
        <p>Een methode mag expliciet null teruggeven, bv. wanneer een zoekmethode geen match vindt in een array.</p>
      `,
      examples: [
        { title: "NullReferenceException uitlokken", code:
`Student stud1 = null;
Console.WriteLine(stud1.Name);
// → System.NullReferenceException` },
        { title: "Voorkomen: null-check & verkorte notatie", code:
`if (stud1 == null)
    Console.WriteLine("Object bestaat niet.");

// Of verkort met ?.
Console.WriteLine(stud1?.Name);
// lege lijn als stud1 null is, anders de naam` },
        { title: "Return null bij geen match", code:
`static Student ZoekStudent(Student[] array, string naam)
{
    Student gevonden = null;
    for (int i = 0; i < array.Length; i++)
        if (array[i].Name == naam)
            gevonden = array[i];
    return gevonden;
}` }
      ],
      summary: [
        "Reference types zijn standaard null tot je een referentie toewijst.",
        "Een NullReferenceException treedt op bij benadering van een null-object.",
        "Voorkom met if (obj == null) of de verkorte ?. notatie.",
        "Een methode mag expliciet null teruggeven."
      ],
      quiz: [
        { q: "Wat is de standaardwaarde van een reference type?", opts: ["null", "0", "\"\"", "false"], correct: 0, exp: "Reference types beginnen als null." },
        { q: "Wanneer krijg je een NullReferenceException?", opts: ["Bij benadering van een null-object", "Bij deling door 0", "Bij verkeerde input", "Bij een grote array"], correct: 0, exp: "Je benadert iets dat geen object bevat." },
        { q: "Wat doet <code>obj?.Naam</code>?", opts: ["Voert .Naam enkel uit als obj niet null is", "Gooit altijd een fout", "Maakt obj null", "Maakt een nieuw object"], correct: 0, exp: "De ?. operator beschermt tegen null." },
        { q: "Mag een methode null teruggeven?", opts: ["Ja", "Nee", "Enkel bij value types", "Enkel in Main"], correct: 0, exp: "Bv. een zoekmethode zonder match geeft null terug." }
      ],
      exercises: [
        { type: "fill", prompt: "Gebruik de verkorte null-notatie om de naam veilig te tonen.", template: "Console.WriteLine(stud1___.Name);", answers: ["?"], hint: "Het vraagteken-symbool." },
        { type: "code", prompt: "Schrijf een null-check die 'Bestaat niet' toont als stud1 null is.", starter: "// jouw code", check: ["if", "stud1", "null"], sample: "if (stud1 == null)\n    Console.WriteLine(\"Bestaat niet\");" }
      ]
    },
    {
      id: "m2l5",
      title: "Namespaces & using",
      sub: "Naamconflicten vermijden",
      theory: `
        <p>Een <b>namespace</b> voorkomt dat twee projecten met toevallig dezelfde klassennamen in conflict komen. De namespace is een extra stukje naamgeving rond een klasse.</p>
        <p>De <b>Fully Qualified Type Name</b> van een klasse <code>Monster</code> in namespace <code>MyEpicGame</code> is <code>MyEpicGame.Monster</code>. Een andere <code>Monster</code> in <code>NietZoEpicGame</code> heet <code>NietZoEpicGame.Monster</code> — geen verwarring mogelijk.</p>
        <h3>using</h3>
        <p>Met <code>using</code> bovenaan je bestand zeg je: "Beste C#, als je een klasse niet vindt in dit project, kijk dan in deze bibliotheek." Bijvoorbeeld <code>using System.Diagnostics;</code></p>
        <h3>Ontbrekende namespaces vinden</h3>
        <p>Visual Studio helpt: typ de klassennaam, klik op het lampje, en kies om automatisch een <code>using</code> toe te voegen of de volledige naam uit te schrijven. De optie "Generate type" maakt een nog niet bestaande klasse aan.</p>
        <div class="callout tip">Beschikbare bibliotheken zie je onder <b>Dependencies</b> in de Solution Explorer. Via NuGet packages voeg je extra bibliotheken toe (bv. de grappige Colorful.Console).</div>
      `,
      examples: [
        { title: "Namespace & FQN", code:
`namespace MyEpicGame
{
    internal class Monster { }
}
// Volledige naam: MyEpicGame.Monster` },
        { title: "using directive", code:
`using System.Diagnostics;
// Nu kan je Debug.WriteLine(...) gebruiken
// zonder System.Diagnostics.Debug uit te schrijven` }
      ],
      summary: [
        "Een namespace voorkomt naamconflicten tussen klassen.",
        "De Fully Qualified Type Name is namespace.Klasse.",
        "using bovenaan laat je klassen uit een bibliotheek kort gebruiken.",
        "Dependencies/NuGet beheren beschikbare bibliotheken."
      ],
      quiz: [
        { q: "Waarvoor dient een namespace?", opts: ["Naamconflicten vermijden", "Geheugen besparen", "Code sneller maken", "Objecten aanmaken"], correct: 0, exp: "Namespaces voorkomen botsende klassennamen." },
        { q: "Wat is de Fully Qualified Type Name van Monster in MyEpicGame?", opts: ["MyEpicGame.Monster", "Monster.MyEpicGame", "Monster", "MyEpicGame"], correct: 0, exp: "Het is namespace.Klasse." },
        { q: "Wat doet een using-directive?", opts: ["Laat klassen uit een bibliotheek kort gebruiken", "Maakt een object", "Verwijdert geheugen", "Stelt een variabele in"], correct: 0, exp: "using verwijst naar bibliotheken." }
      ],
      exercises: [
        { type: "fill", prompt: "Importeer de System.Diagnostics-bibliotheek.", template: "___ System.Diagnostics;", answers: ["using"], hint: "Het keyword bovenaan je bestand." }
      ]
    },
    {
      id: "m2l6",
      title: "Exception handling",
      sub: "try, catch, finally & throw",
      theory: `
        <p><b>Exception handling</b> zorgt dat je programma minder snel crasht bij uitzonderingen (foute invoer, ontbrekende bestanden, deling door nul...).</p>
        <div class="callout warn">Exception handling is de <b>finale fase van goedgeschreven code</b>, niet een excuus om slechte code te verbergen. Slechte code achtervolgt je altijd.</div>
        <h3>try & catch</h3>
        <ul>
          <li><b>try:</b> bevat code die mogelijk een exception werpt.</li>
          <li><b>catch:</b> vangt de exception op en handelt ze af (graceful shutdown of doorgaan).</li>
        </ul>
        <h3>throw</h3>
        <p>Met <code>throw</code> werp je zelf een exception op. Het werkt als <code>return</code>, maar springt naar de eerste <code>catch</code> die klaarstaat: <code>throw new Exception("...")</code>.</p>
        <h3>Meerdere catch-blokken</h3>
        <p>Exception-klassen zijn afgeleid van de basisklasse <code>Exception</code>. Plaats de meest specifieke exception bovenaan en de algemene <code>Exception</code> onderaan (fallthrough-mechanisme).</p>
        <h3>De exception-parameter</h3>
        <p>Elk Exception-object bevat <code>Message</code>, <code>StackTrace</code>, <code>TargetSite</code> en <code>ToString()</code>.</p>
        <div class="callout danger"><b>Security:</b> stuur exception-informatie zelden rechtstreeks naar de gebruiker — het kan gevoelige info bevatten die misbruikt wordt.</div>
        <h3>finally</h3>
        <p>Een <code>finally</code>-blok voert code uit die ALTIJD moet gebeuren, of er nu een exception optrad of niet (bv. een bestand sluiten).</p>
        <h3>Waar plaatsen?</h3>
        <p>De plaats van je try/catch bepaalt het gedrag: rond een hele methode-aanroep stopt alles bij de eerste fout; binnen een lus rond één element kan je doorgaan met de rest.</p>
      `,
      examples: [
        { title: "try / catch", code:
`try
{
    string input = Console.ReadLine();
    int converted = Convert.ToInt32(input);
}
catch (FormatException e)
{
    Console.WriteLine("Verkeerd invoerformaat");
}
catch (Exception e)
{
    Console.WriteLine("Exception opgetreden: " + e.Message);
}` },
        { title: "throw & finally", code:
`throw new Exception("Wow, dit loopt fout");

try { /* ... */ }
catch (Exception ex) { Console.WriteLine(ex.Message); }
finally
{
    // gebeurt ALTIJD
}` }
      ],
      summary: [
        "try bevat risicovolle code, catch vangt exceptions op.",
        "throw werpt zelf een exception; specifiek boven algemeen.",
        "Exception-objecten hebben Message, StackTrace, TargetSite.",
        "finally voert altijd uit; plaats van try/catch bepaalt het gedrag."
      ],
      quiz: [
        { q: "Wat bevat het try-blok?", opts: ["Code die mogelijk een fout werpt", "De foutafhandeling", "Code die altijd loopt", "Niets"], correct: 0, exp: "Risicovolle code staat in try." },
        { q: "In welke volgorde plaats je catch-blokken?", opts: ["Specifiek boven, algemeen onder", "Algemeen boven, specifiek onder", "Volgorde maakt niet uit", "Alfabetisch"], correct: 0, exp: "De algemene Exception staat onderaan (fallthrough)." },
        { q: "Wat doet finally?", opts: ["Voert altijd uit", "Voert enkel bij fout uit", "Voert enkel zonder fout uit", "Werpt een fout"], correct: 0, exp: "finally loopt ongeacht of er een exception was." },
        { q: "Welke property geeft de foutmelding in eenvoudige taal?", opts: ["Message", "StackTrace", "TargetSite", "ToString"], correct: 0, exp: "Message bevat de leesbare foutmelding." },
        { q: "Hoe werp je zelf een exception op?", opts: ["throw new Exception(...)", "return Exception()", "catch Exception", "raise Exception"], correct: 0, exp: "Met throw new Exception(...)." }
      ],
      exercises: [
        { type: "fill", prompt: "Werp zelf een algemene exception op.", template: "___ new Exception(\"Fout\");", answers: ["throw"], hint: "Het keyword om een exception op te werpen." },
        { type: "code", prompt: "Schrijf een try/catch rond <code>Convert.ToInt32(input)</code> die 'Verkeerde invoer' toont.", starter: "string input = Console.ReadLine();\n// jouw try/catch", check: ["try", "Convert.ToInt32", "catch", "WriteLine"], sample: "string input = Console.ReadLine();\ntry\n{\n    int x = Convert.ToInt32(input);\n}\ncatch (Exception e)\n{\n    Console.WriteLine(\"Verkeerde invoer\");\n}" }
      ]
    },
    {
      id: "m2l7",
      title: "Programmeeropdrachten H12",
      sub: "Meetlat, Kleur mixer & Pokémon",
      theory: `
        <p>Pas geheugen, properties en exceptions toe in deze opdrachten.</p>
        <ul>
          <li><b>Meetlat:</b> write-only property BeginLengte + transformerende read-only properties (LengteInM, LengteInCm, LengteInKm, LengteInVoet).</li>
          <li><b>Kleur mixer:</b> klasse Kleur (Rood/Groen/Blauw autoprops) + MengKleur die het gemiddelde per kanaal neemt zonder de parameter te wijzigen.</li>
          <li><b>Pokémon:</b> base-stats (full props), auto props (Naam/Type/Nummer), Level (private set) + VerhoogLevel, read-only Average/Total en level-gebaseerde Full-stats.</li>
        </ul>
      `,
      examples: [
        { title: "Kleur mixer-voorbeeld", code:
`Kleur k1 = new Kleur { Rood = 10, Groen = 0, Blauw = 20 };
Kleur k2 = new Kleur { Rood = 10, Groen = 10, Blauw = 50 };
k1.MengKleur(k2);
// k1 wordt 10,5,35 ; k2 blijft ongewijzigd` }
      ],
      summary: [
        "Meetlat: 1 write-only veld → meerdere transformerende read-only properties.",
        "Kleur mixer: gemiddelde per kanaal, parameter blijft onveranderd.",
        "Pokémon: combinatie van full props, autoprops, private set en read-only.",
        "Battle-methode werpt Exception bij een null-Pokémon."
      ],
      quiz: [
        { q: "Wat is de omrekening van meter naar voet?", opts: ["× 3.2808", "÷ 100", "× 1000", "÷ 3.2808"], correct: 0, exp: "1m = 3.2808 voet." },
        { q: "Wat doet MengKleur met de meegegeven kleur?", opts: ["Laat ze ongewijzigd", "Maakt ze zwart", "Verwijdert ze", "Verdubbelt ze"], correct: 0, exp: "Enkel het object zelf verandert; de parameter blijft." },
        { q: "Welke zichtbaarheid heeft de setter van Pokémon Level?", opts: ["private", "public", "protected", "geen"], correct: 0, exp: "Level heeft public get maar private set." }
      ],
      exercises: [
        { type: "code", prompt: "Meetlat — schrijf de read-only property <code>LengteInCm</code> (lengte in m → cm).", starter: "private double lengte; // in meter\n// jouw property", check: ["public double LengteInCm", "get", "lengte", "100"], sample: "private double lengte;\npublic double LengteInCm\n{\n    get { return lengte * 100; }\n}" },
        { type: "code", prompt: "Kleur mixer — schrijf <code>MengKleur(Kleur k)</code> die per kanaal het gemiddelde neemt.", starter: "public int Rood { get; set; }\npublic int Groen { get; set; }\npublic int Blauw { get; set; }\n// jouw methode", check: ["public void MengKleur", "Rood", "Groen", "Blauw", "2"], sample: "public int Rood { get; set; }\npublic int Groen { get; set; }\npublic int Blauw { get; set; }\npublic void MengKleur(Kleur k)\n{\n    Rood = (Rood + k.Rood) / 2;\n    Groen = (Groen + k.Groen) / 2;\n    Blauw = (Blauw + k.Blauw) / 2;\n}" }
      ]
    }
  ]
};