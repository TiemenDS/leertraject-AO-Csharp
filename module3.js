// Module 3 - H13: Constructors, Object Initializers, Static
window.MODULE_3 = {
  id: "m3",
  title: "H13 — Constructors, Initializers & Static",
  desc: "Objecten correct opbouwen en gedeelde klasse-elementen met static.",
  icon: "⚙️",
  lessons: [
    {
      id: "m3l1",
      title: "Constructors & default constructors",
      sub: "De beginstaat van een object instellen",
      theory: `
        <p>De <code>new</code>-operator doet drie dingen: een object aanmaken in de heap, de <b>constructor</b> aanroepen voor extra initialisatie, en een referentie teruggeven.</p>
        <p>Een constructor is een speciale methode die bij het aanmaken van een object wordt uitgevoerd — daarom de ronde haakjes bij <code>new Student()</code>. Als je er geen schrijft, bestaat er een onzichtbare default constructor die niets extra doet.</p>
        <div class="callout warn">Een constructor mag enkel op één moment aangeroepen worden: bij de geboorte van het object via <code>new</code>. Nergens anders.</div>
        <h3>Vorm van een default constructor</h3>
        <ul>
          <li>Altijd <code>public</code>.</li>
          <li>Géén returntype (ook geen void).</li>
          <li>Heeft de naam van de klasse zelf.</li>
          <li>Géén parameters.</li>
        </ul>
        <h3>Drie opties</h3>
        <ol>
          <li>Geen eigen constructor → onzichtbare default constructor.</li>
          <li>Enkel een default constructor → je beschrijft zelf wat er bij creatie gebeurt.</li>
          <li>Overloaded constructors → parameters meegeven bij creatie.</li>
        </ol>
        <div class="callout tip">Voor het simpelweg instellen van een auto-property volstaat vaak een beginwaarde: <code>public int Uur { get; set; } = 2;</code> — geen constructor nodig.</div>
      `,
      examples: [
        { title: "Default constructor", code:
`class Student
{
    public Student()
    {
        UurVanInschrijven = DateTime.Now.Hour;
    }
    public int UurVanInschrijven { get; private set; }
}` }
      ],
      summary: [
        "new doet 3 dingen: heap-object, constructor, referentie.",
        "Een constructor: public, geen returntype, naam van de klasse.",
        "Default constructor heeft geen parameters.",
        "Voor enkel een beginwaarde volstaat vaak = waarde."
      ],
      quiz: [
        { q: "Welke drie dingen doet new?", opts: ["Heap-object maken, constructor aanroepen, referentie teruggeven", "Compileren, runnen, sluiten", "Lezen, schrijven, sluiten", "Alloceren, kopiëren, verwijderen"], correct: 0, exp: "Dat zijn precies de drie taken van new." },
        { q: "Wat heeft een constructor NIET?", opts: ["Een returntype", "Een naam", "Haakjes", "public"], correct: 0, exp: "Een constructor heeft geen returntype, ook geen void." },
        { q: "Wanneer wordt een constructor aangeroepen?", opts: ["Bij new, één keer", "Bij elke methode-aanroep", "Bij het sluiten", "Nooit"], correct: 0, exp: "Enkel bij de creatie via new." },
        { q: "Welke naam heeft de constructor?", opts: ["De naam van de klasse", "Constructor", "Init", "New"], correct: 0, exp: "De constructor heeft exact de klassennaam." }
      ],
      exercises: [
        { type: "code", prompt: "Schrijf een default constructor voor Student die UurVanInschrijven op DateTime.Now.Hour zet.", starter: "class Student\n{\n    public int UurVanInschrijven { get; private set; }\n    // jouw constructor\n}", check: ["public Student()", "UurVanInschrijven", "DateTime.Now.Hour"], sample: "class Student\n{\n    public int UurVanInschrijven { get; private set; }\n    public Student()\n    {\n        UurVanInschrijven = DateTime.Now.Hour;\n    }\n}" }
      ]
    },
    {
      id: "m3l2",
      title: "Overloaded constructors & this()",
      sub: "Parameters bij creatie meegeven",
      theory: `
        <p>Net als methoden kan je constructors <b>overloaden</b>. Zo kan je parameters meegeven bij creatie: <code>new Student("Lord Oakenwood")</code>.</p>
        <div class="callout warn">Zodra je een overloaded constructor schrijft, verdwijnt de gratis default constructor. Wil je <code>new Student()</code> nog kunnen, schrijf de default dan expliciet.</div>
        <h3>full properties in de constructor</h3>
        <p>Roep in je constructor de <b>property</b> aan (niet de achterliggende variabele) zodat de set-controle meteen werkt. Leg de verantwoordelijkheid bij het element zelf.</p>
        <h3>Constructors hergebruiken met this()</h3>
        <p>Om dubbele code te vermijden kan een constructor een andere constructor aanroepen met <code>this(...)</code>. De compiler kiest via method overload resolution de juiste.</p>
        <h3>Welke constructors voorzien?</h3>
        <p>Minimaal genoeg om essentiële variabelen een geldige beginwaarde te geven. Bij een <code>Breuk</code> met een Noemer voorkom je via een verplichte overloaded constructor een deling door nul.</p>
      `,
      examples: [
        { title: "Overloaded + default", code:
`class Student
{
    private const string DEFBIJNAAM = "Geen";
    public Student() { BijNaam = DEFBIJNAAM; }
    public Student(string bijnaamIn) { BijNaam = bijnaamIn; }
    public string BijNaam { get; private set; }
}` },
        { title: "this() hergebruik", code:
`class Microfoon
{
    public Microfoon(string merkIn, bool isUitverkochtIn)
    {
        Merk = merkIn;
        IsUitverkocht = isUitverkochtIn;
    }
    public Microfoon(string merkIn) : this(merkIn, false) { }
    public Microfoon() : this("Onbekend", true) { }

    public string Merk { get; set; }
    public bool IsUitverkocht { get; set; }
}` }
      ],
      summary: [
        "Overloaded constructors aanvaarden parameters bij creatie.",
        "Een eigen constructor verwijdert de gratis default — schrijf hem expliciet.",
        "Roep properties (niet velden) aan in constructors voor validatie.",
        "this(...) hergebruikt een andere constructor en vermijdt dubbele code."
      ],
      quiz: [
        { q: "Wat gebeurt er met de default constructor als je een overloaded schrijft?", opts: ["Hij verdwijnt", "Hij blijft", "Hij wordt static", "Hij wordt private"], correct: 0, exp: "Je moet de default dan expliciet toevoegen." },
        { q: "Waarvoor dient this() in een constructor?", opts: ["Een andere constructor aanroepen", "Het object verwijderen", "Een methode aanroepen", "Een property maken"], correct: 0, exp: "this() hergebruikt een andere constructor." },
        { q: "Wat roep je best aan in een constructor?", opts: ["De property (set-controle)", "De private variabele rechtstreeks", "Een static methode", "Niets"], correct: 0, exp: "Via de property loopt de validatie mee." }
      ],
      exercises: [
        { type: "fill", prompt: "Laat deze constructor de tweeparameter-constructor hergebruiken met false.", template: "public Microfoon(string merkIn) : ___(merkIn, false) { }", answers: ["this"], hint: "Het keyword om een andere constructor te roepen." },
        { type: "code", prompt: "Schrijf twee constructors voor Breuk: één met (teller, noemer) en een default die naar new Breuk niet toelaat is niet nodig — geef enkel de overloaded.", starter: "class Breuk\n{\n    public int Teller { get; private set; }\n    public int Noemer { get; private set; }\n    // jouw constructor\n}", check: ["public Breuk(int", "Teller =", "Noemer ="], sample: "class Breuk\n{\n    public int Teller { get; private set; }\n    public int Noemer { get; private set; }\n    public Breuk(int tellerIn, int noemerIn)\n    {\n        Teller = tellerIn;\n        Noemer = noemerIn;\n    }\n}" }
      ]
    },
    {
      id: "m3l3",
      title: "Object Initializer Syntax",
      sub: "Properties instellen zonder constructor",
      theory: `
        <p><b>Object initializer syntax</b> laat je toe om bij (eigenlijk direct na) de creatie properties beginwaarden te geven zonder een specifieke constructor te schrijven.</p>
        <div class="callout tip">Object initializer syntax is een eerste glimp waarom properties zo belangrijk zijn in C#: je kan ze enkel gebruiken om via <b>properties</b> beginwaarden te geven.</div>
        <h3>Werking</h3>
        <p>Je maakt een object met de default constructor en geeft tussen accolades een lijst properties + waarden mee. Het werkt enkel met een default constructor.</p>
        <p>De volgorde: eerst loopt de default constructor, daarna krijgen de properties hun waarden. Je hoeft niet alle properties in te stellen.</p>
        <h3>Required properties</h3>
        <p>Object initializer werkt enkel met een default constructor, dus kan je gebruikers niet verplichten waarden mee te geven. Daarvoor bestaat <code>required</code>: een property met <code>required</code> moet ingesteld worden bij creatie via object initializer.</p>
        <div class="callout warn"><code>required</code> bestaat pas vanaf C# 11.0 / .NET 7.</div>
      `,
      examples: [
        { title: "Object initializer", code:
`class Meting
{
    public double Temperatuur { get; set; }
    public bool IsGeconfirmeerd { get; set; }
}

Meting m = new Meting { Temperatuur = 3.4, IsGeconfirmeerd = true };
// Intern: new Meting(); m.Temperatuur = 3.4; m.IsGeconfirmeerd = true;` },
        { title: "required property", code:
`class Meting
{
    public double Temperatuur { get; set; }
    public required bool IsGeconfirmeerd { get; set; }
}

// Fout: IsGeconfirmeerd ontbreekt
// Meting m = new Meting { Temperatuur = 0.7 };
Meting ok = new Meting { IsGeconfirmeerd = true };` }
      ],
      summary: [
        "Object initializer stelt properties in direct na creatie.",
        "Werkt enkel via properties en met een default constructor.",
        "Eerst loopt de constructor, daarna de property-toewijzingen.",
        "required (C# 11+) verplicht het instellen van een property."
      ],
      quiz: [
        { q: "Object initializer werkt enkel via...", opts: ["properties", "velden", "methoden", "constructors"], correct: 0, exp: "Je stelt enkel properties in." },
        { q: "Wat loopt eerst bij object initializer?", opts: ["De default constructor", "De property-toewijzingen", "De finalizer", "Niets"], correct: 0, exp: "Eerst de constructor, dan de properties." },
        { q: "Wat doet het keyword required?", opts: ["Verplicht een property bij creatie", "Maakt een property read-only", "Maakt een property static", "Verwijdert een property"], correct: 0, exp: "required dwingt het instellen af." },
        { q: "Vanaf welke versie bestaat required?", opts: ["C# 11 / .NET 7", "C# 8", "C# 5", "C# 10"], correct: 0, exp: "required is geïntroduceerd in C# 11.0." }
      ],
      exercises: [
        { type: "fill", prompt: "Stel met object initializer Temperatuur op 3.4 en IsGeconfirmeerd op true.", template: "Meting m = new Meting { Temperatuur = 3.4, IsGeconfirmeerd = ___ };", answers: ["true"], hint: "De boolean-waarde." },
        { type: "code", prompt: "Maak een Persoon-object met object initializer (Voornaam='Tim', Geboortejaar=2002).", starter: "// Persoon heeft autoproperties Voornaam en Geboortejaar\n// jouw code", check: ["new Persoon", "{", "Voornaam", "Geboortejaar"], sample: "Persoon p = new Persoon { Voornaam = \"Tim\", Geboortejaar = 2002 };" }
      ]
    },
    {
      id: "m3l4",
      title: "Static",
      sub: "Gedeelde fields, methoden, properties & klassen",
      theory: `
        <p><code>static</code> geeft aan dat een element bij de <b>klasse</b> hoort, niet bij individuele instanties. Je kan het aanroepen zonder een object aan te maken. Het "delen van informatie" is een gevolg, niet de reden.</p>
        <h3>Static fields</h3>
        <p>Zonder static heeft elk object zijn eigen variabelen. Maak je een variabele static, dan delen ALLE objecten één gemeenschappelijke variabele — er bestaat maar één "instantie" in het geheugen.</p>
        <div class="callout warn">Gebruik static niet te pas en te onpas — vaak druist het in tegen OOP-principes en wordt het misbruikt.</div>
        <h3>Static methoden</h3>
        <p>Methoden die je rechtstreeks op de klasse aanroept, zoals <code>Math.Pow()</code> of <code>DateTime.IsLeapYear()</code>. De Math-klasse is zelf óók static, zodat je er geen object van kan maken.</p>
        <h3>Static vs non-static</h3>
        <p>Een static methode kan enkel andere static leden aanspreken — ze heeft geen object om de instantievariabelen van te benaderen. Daarom moet in <code>Program.cs</code> alles static zijn: <code>Main</code> is static.</p>
        <h3>Static properties</h3>
        <p>Handig om gedeelde info bij te houden, bv. de <code>Breedte</code>/<code>Hoogte</code> van het speelveld die alle balletjes delen. Of <code>DateTime.Now</code>.</p>
        <div class="callout tip"><b>Random static maken:</b> maak je Random-generator static, anders genereren objecten die snel na elkaar worden aangemaakt dezelfde getallen (zelfde seed = zelfde reeks).</div>
      `,
      examples: [
        { title: "Static field (gedeeld)", code:
`class Fiets
{
    private static int aantalFietsen = 0;
    public Fiets()
    {
        aantalFietsen++;  // gedeeld over alle objecten
    }
    public static void VerminderFiets() { aantalFietsen--; }
}` },
        { title: "Static Random (goede gewoonte)", code:
`class Dobbelsteen
{
    static Random gen = new Random(); // één generator
    public int Werp()
    {
        return gen.Next(1, 7);
    }
}` }
      ],
      summary: [
        "static = hoort bij de klasse, niet bij instanties.",
        "Static fields worden gedeeld door alle objecten.",
        "Static methoden roep je op de klasse aan en zien enkel static leden.",
        "Maak Random static om identieke reeksen te vermijden."
      ],
      quiz: [
        { q: "Waar hoort een static element bij?", opts: ["De klasse", "Elk object apart", "De stack", "De namespace"], correct: 0, exp: "static hoort bij de klasse, niet bij instanties." },
        { q: "Wat kan een static methode aanspreken?", opts: ["Enkel andere static leden", "Alle instantievariabelen", "Niets", "Enkel private leden"], correct: 0, exp: "Een static methode heeft geen object, dus enkel static leden." },
        { q: "Waarom is Main static?", opts: ["Zodat ze zonder object kan draaien", "Voor snelheid", "Om geheugen te besparen", "Toeval"], correct: 0, exp: "Main start zonder dat er een object bestaat." },
        { q: "Waarom maak je een Random-generator static?", opts: ["Om identieke reeksen door zelfde seed te vermijden", "Voor snelheid", "Om geheugen te besparen", "Het moet niet"], correct: 0, exp: "Eén gedeelde generator voorkomt dezelfde seeds." },
        { q: "Wat is een static field?", opts: ["Een variabele gedeeld over alle objecten", "Een private variabele", "Een property", "Een methode"], correct: 0, exp: "Static fields zijn gedeeld over de hele klasse." }
      ],
      exercises: [
        { type: "fill", prompt: "Maak de Random-generator gedeeld over alle dobbelstenen.", template: "___ Random gen = new Random();", answers: ["static"], hint: "Eén gedeelde generator." },
        { type: "code", prompt: "Schrijf een klasse Fiets met een static teller die in de constructor verhoogt.", starter: "class Fiets\n{\n    // jouw code\n}", check: ["static int", "public Fiets()", "++"], sample: "class Fiets\n{\n    private static int aantalFietsen = 0;\n    public Fiets()\n    {\n        aantalFietsen++;\n    }\n}" }
      ]
    },
    {
      id: "m3l5",
      title: "Programmeeropdrachten H13",
      sub: "Constructors, static & Containerterminal",
      theory: `
        <p>Combineer alles: constructors, object initializers, required en static.</p>
        <ul>
          <li><b>Meetlat constructor:</b> lengte in meter via constructor i.p.v. write-only property.</li>
          <li><b>Persoonsregistratie:</b> overloaded constructor (Voornaam/Achternaam) + object initializer voor de rest + ToonInformatie().</li>
          <li><b>Bibliotheek:</b> default + overloaded (DateTime) constructor + static VeranderAlgemeneUitleenTermijn.</li>
          <li><b>Containerterminal:</b> grote oefening die alle concepten samenbrengt.</li>
        </ul>
      `,
      examples: [
        { title: "Persoon ToonInformatie", code:
`public void ToonInformatie()
{
    Console.WriteLine(
      $"{Voornaam} {Achternaam} geboren in {Geboortejaar} " +
      $"heeft emailadres: {Email}");
}` }
      ],
      summary: [
        "Meetlat: lengte via constructor instellen.",
        "Persoon: overloaded constructor + object initializer + ToonInformatie.",
        "Bibliotheek: static uitleentermijn + Exception bij datum in de toekomst.",
        "Containerterminal: integratie van alle H13-concepten."
      ],
      quiz: [
        { q: "Wat geeft de Persoon-constructor mee?", opts: ["Voornaam en Achternaam", "Email", "Geboortejaar", "Niets"], correct: 0, exp: "De overloaded constructor stelt Voornaam en Achternaam in." },
        { q: "Wat moet de Bibliotheek-constructor doen bij een datum in de toekomst?", opts: ["Een Exception werpen", "0 teruggeven", "De datum op vandaag zetten", "Niets"], correct: 0, exp: "Werp een Exception op bij een toekomstige datum." },
        { q: "Hoe verander je de algemene uitleentermijn voor alle boeken?", opts: ["Via een static methode + static field", "Via de constructor", "Via een gewone property", "Het kan niet"], correct: 0, exp: "Een static field gedeeld over alle boeken, aangepast via een static methode." }
      ],
      exercises: [
        { type: "code", prompt: "Schrijf <code>ToonInformatie()</code> voor Persoon volgens het gevraagde formaat.", starter: "public string Voornaam { get; set; }\npublic string Achternaam { get; set; }\npublic int Geboortejaar { get; set; }\npublic string Email { get; set; }\n// jouw methode", check: ["public void ToonInformatie", "Voornaam", "Achternaam", "Geboortejaar", "Email"], sample: "public string Voornaam { get; set; }\npublic string Achternaam { get; set; }\npublic int Geboortejaar { get; set; }\npublic string Email { get; set; }\npublic void ToonInformatie()\n{\n    Console.WriteLine($\"{Voornaam} {Achternaam} geboren in {Geboortejaar} heeft emailadres: {Email}\");\n}" },
        { type: "code", prompt: "Schrijf een static methode <code>VeranderAlgemeneUitleenTermijn(int dagen)</code> met een static field.", starter: "// jouw code", check: ["static", "VeranderAlgemeneUitleenTermijn", "int"], sample: "private static int uitleenTermijn = 14;\npublic static void VeranderAlgemeneUitleenTermijn(int dagen)\n{\n    uitleenTermijn = dagen;\n}" }
      ]
    }
  ]
};