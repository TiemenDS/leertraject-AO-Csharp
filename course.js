/* ============================================================
   COURSE.JS — centrale registry
   Verbindt modules, badges en examens.
   Vereist: module0.js, module1.js, module2.js, module3.js
   ============================================================ */

/* ---------- Course (volgorde bepaalt navigatie) ---------- */
const COURSE = [MODULE_0, MODULE_1, MODULE_2, MODULE_3];

/* ---------- Badges ---------- */
const BADGES = [
  { id: "first_lesson", icon: "🎓", name: "Eerste stap",   desc: "Eerste les voltooid" },
  { id: "m1_done",      icon: "🧱", name: "OOP Basis",     desc: "Module H11 volledig" },
  { id: "m2_done",      icon: "🧠", name: "Geheugenmeester", desc: "Module H12 volledig" },
  { id: "m3_done",      icon: "⚙️",  name: "Constructor Pro", desc: "Module H13 volledig" },
  { id: "quiz_ace",     icon: "💯", name: "Perfect Score",  desc: "100% op een quiz" },
  { id: "streak3",      icon: "🔥", name: "Op stoom",       desc: "3 dagen op rij actief" },
  { id: "streak7",      icon: "🏆", name: "Weekkampioen",  desc: "7 dagen op rij actief" },
  { id: "exam_pass",    icon: "📋", name: "Geslaagd",       desc: "Examen gehaald (≥ 60%)" },
  { id: "level5",       icon: "⭐", name: "Level 5",        desc: "Level 5 bereikt" },
  { id: "final_done",   icon: "🎉", name: "Afgestudeerd",  desc: "Eindproject voltooid" },
];

/* ---------- Examens ---------- */
const EXAMS = {

  /* ---- Hoofdstuktesten ---- */
  chapterTests: {
    m0: {
      title: "Hoofdstuktest — Methoden & Arrays",
      xp: 75,
      questions: [
        { q: "Wat doet een methode met returntype <code>void</code>?", opts: ["Geeft niets terug", "Gooit een exception", "Retourneert 0", "Stopt het programma"], correct: 0, exp: "void = geen terugkeerwaarde." },
        { q: "Hoe start de index van een array in C#?", opts: ["Bij 0", "Bij 1", "Bij -1", "Willekeurig"], correct: 0, exp: "Arrays zijn 0-geïndexeerd." },
        { q: "Welk keyword geeft een waarde terug vanuit een methode?", opts: ["return", "yield", "out", "throw"], correct: 0, exp: "return stuurt de waarde terug." },
        { q: "Een array is een ...", opts: ["reference type", "value type", "struct", "enum"], correct: 0, exp: "Arrays worden op de heap bewaard." },
        { q: "Hoe weet je het aantal elementen van array <code>a</code>?", opts: ["a.Length", "a.Size()", "a.Count", "len(a)"], correct: 0, exp: ".Length geeft het aantal elementen." },
        { q: "Overloading onderscheidt methoden op basis van hun ...", opts: ["Parameterlijst", "Returntype", "Naam", "Access modifier"], correct: 0, exp: "De parameterlijst is de discriminator bij overloading." },
        { q: "Wat gebeurt er met een int-parameter die binnen een methode wordt gewijzigd?", opts: ["Het origineel verandert NIET (kopie)", "Het origineel verandert wel", "Er treedt een fout op", "De methode stopt"], correct: 0, exp: "Value types worden als kopie doorgegeven." },
        { q: "Welk type geeft <code>int[] cijfers = {1,2,3};</code> terug via .Length?", opts: ["3", "2", "4", "0"], correct: 0, exp: "Er zijn 3 elementen." },
        { q: "Hoe declareer je een lege array van 5 ints?", opts: ["int[] a = new int[5];", "int a[5];", "array int a = 5;", "new int a[5];"], correct: 0, exp: "C# syntax: type[] naam = new type[lengte]." },
        { q: "Welke lus gebruik je het vaakst om over een array te lopen?", opts: ["for met index", "while", "do-while", "foreach alleen"], correct: 0, exp: "for (int i=0; i<a.Length; i++) is de standaard." }
      ]
    },
    m1: {
      title: "Hoofdstuktest — H11 OOP",
      xp: 100,
      questions: [
        { q: "Wat is het verschil tussen een klasse en een object?", opts: ["Klasse is blauwdruk, object is instantie", "Klasse is instantie, object is blauwdruk", "Ze zijn hetzelfde", "Klasse is een methode"], correct: 0, exp: "Een klasse beschrijft; een object is de concrete realisatie." },
        { q: "Welk keyword maakt een nieuw object aan?", opts: ["new", "create", "init", "make"], correct: 0, exp: "new alloceert heap-geheugen en roept de constructor aan." },
        { q: "Wat is het verschil tussen een full property en een autoproperty?", opts: ["Full heeft logica in get/set, auto niet", "Auto heeft logica, full niet", "Ze zijn identiek", "Full is altijd static"], correct: 0, exp: "Autoproperties hebben geen achterliggende code; full properties wel." },
        { q: "Wat doet <code>private set</code> op een autoproperty?", opts: ["Alleen intern schrijfbaar", "Nooit schrijfbaar", "Altijd schrijfbaar", "static schrijfbaar"], correct: 0, exp: "private set = enkel de klasse zelf mag schrijven." },
        { q: "Hoe geef je een autoproperty een beginwaarde?", opts: ["public int X { get; set; } = 5;", "int X = 5;", "public X = 5 { get; set; }", "default X = 5;"], correct: 0, exp: "= waarde achter de autoproperty werkt." },
        { q: "Wanneer gebruik je een methode i.p.v. een property?", opts: ["Als het object iets doet", "Als het een attribuut is", "Altijd", "Nooit"], correct: 0, exp: "Gedrag zit in methoden; toestand in properties." },
        { q: "Wat is de access modifier voor leden die enkel intern beschikbaar zijn?", opts: ["private", "public", "protected", "internal"], correct: 0, exp: "private = enkel binnen de klasse." },
        { q: "Wat geeft DateTime.Now terug?", opts: ["Huidige datum en tijd", "Een int", "Een string", "Null"], correct: 0, exp: "DateTime.Now is een static property met de huidige tijd." },
        { q: "Wat is het resultaat van twee DateTime-objecten aftrekken?", opts: ["TimeSpan", "DateTime", "int", "double"], correct: 0, exp: "Het verschil tussen twee DateTime-objecten is een TimeSpan." },
        { q: "Zoek klassen door te zoeken naar ... in de opdrachtomschrijving.", opts: ["Zelfstandige naamwoorden", "Werkwoorden", "Bijvoeglijke naamwoorden", "Getallen"], correct: 0, exp: "Substantieven wijzen op klassen en objecten." }
      ]
    },
    m2: {
      title: "Hoofdstuktest — H12 Geheugen & Exceptions",
      xp: 100,
      questions: [
        { q: "Waar worden value types bewaard?", opts: ["Stack", "Heap", "Beide", "Geen"], correct: 0, exp: "Value types staan op de snelle stack." },
        { q: "Wat kopieert = bij reference types?", opts: ["Het adres", "De data", "Niets", "De klasse"], correct: 0, exp: "Bij reference types kopieer je de referentie." },
        { q: "Wanneer ruimt de Garbage Collector een object op?", opts: ["Als er geen referenties meer naar wijzen", "Elke seconde", "Bij sluiten", "Nooit"], correct: 0, exp: "GC verwijdert objecten zonder referenties." },
        { q: "Wat doet een using-directive?", opts: ["Bibliotheken beschikbaar maken", "Geheugen vrijgeven", "Een object maken", "Een methode aanroepen"], correct: 0, exp: "using namespace; maakt typen beschikbaar." },
        { q: "Wat staat in een try-blok?", opts: ["Risicovolle code", "Foutafhandeling", "Code die altijd draait", "Imports"], correct: 0, exp: "try bevat de code die een exception kan gooien." },
        { q: "Hoe werp je zelf een exception op?", opts: ["throw new Exception(...)", "raise Exception()", "catch throw", "error new"], correct: 0, exp: "throw new ExceptionType(\"bericht\");" },
        { q: "Wat doet finally?", opts: ["Voert altijd uit", "Enkel bij fout", "Enkel zonder fout", "Gooit exception"], correct: 0, exp: "finally loopt ongeacht of er een fout was." },
        { q: "In welke volgorde zet je catch-blokken?", opts: ["Specifiek boven, algemeen onder", "Algemeen boven, specifiek onder", "Alfabetisch", "Volgorde maakt niet uit"], correct: 0, exp: "Specifieke exceptions bovenaan, Exception onderaan." },
        { q: "Welke Exception-property geeft de leesbare foutmelding?", opts: ["Message", "StackTrace", "TargetSite", "Data"], correct: 0, exp: "Message geeft de beschrijvende tekst." },
        { q: "Wat is een namespace?", opts: ["Een groepering van gerelateerde klassen", "Een methode", "Een variabele", "Een loop"], correct: 0, exp: "Namespaces voorkomen naamsconflicten en organiseren code." }
      ]
    },
    m3: {
      title: "Hoofdstuktest — H13 Constructors & Static",
      xp: 100,
      questions: [
        { q: "Wat heeft een constructor NIET?", opts: ["Een returntype", "Een naam", "Haakjes", "Toegangsmodifier"], correct: 0, exp: "Constructors hebben geen returntype (ook geen void)." },
        { q: "Wanneer wordt een constructor aangeroepen?", opts: ["Enkel bij new", "Bij elke methode-aanroep", "Bij sluiten", "Periodiek"], correct: 0, exp: "Constructors lopen één keer: bij new." },
        { q: "Wat doet this() in een constructor?", opts: ["Roept een andere constructor aan", "Verwijdert het object", "Roept een methode aan", "Geeft this terug"], correct: 0, exp: "this(...) hergebruikt een overloaded constructor." },
        { q: "Wat gebeurt met de default constructor als je een overloaded schrijft?", opts: ["Hij verdwijnt — je moet hem expliciet toevoegen", "Hij blijft", "Hij wordt private", "Hij wordt static"], correct: 0, exp: "Zodra je een eigen constructor schrijft, verdwijnt de gratis default." },
        { q: "Wat doet een object initializer?", opts: ["Properties instellen na constructie", "Maakt een constructor", "Verwijdert het object", "Kopieert het object"], correct: 0, exp: "Object initializer stelt properties in na de constructor." },
        { q: "Waar hoort een static element bij?", opts: ["De klasse", "Elke instantie apart", "De stack", "De heap"], correct: 0, exp: "static = van de klasse, niet van objecten." },
        { q: "Wat kan een static methode aanspreken?", opts: ["Enkel static leden", "Alle instantievariabelen", "Alles", "Niets"], correct: 0, exp: "Static methoden kennen geen this, dus enkel static leden." },
        { q: "Waarom maak je Random static?", opts: ["Om identieke reeksen door dezelfde seed te vermijden", "Voor snelheid", "Verplicht", "Om geheugen te besparen"], correct: 0, exp: "Eén generator = goede spreiding; meerdere = zelfde seed = zelfde reeks." },
        { q: "required keyword: wat doet het?", opts: ["Verplicht het instellen van een property bij creatie", "Maakt een property read-only", "Maakt een property static", "Verwijdert een property"], correct: 0, exp: "required dwingt object-initializer of constructor-toewijzing af." },
        { q: "Wat loopt eerst: object initializer of constructor?", opts: ["Constructor, dan object initializer", "Object initializer, dan constructor", "Tegelijk", "Geen van beide"], correct: 0, exp: "De constructor draait eerst; daarna worden de properties ingesteld." }
      ]
    }
  },

  /* ---- Tussentijds examen ---- */
  midterms: {
    mid1: {
      title: "Tussentijds Examen — H11 + H12",
      xp: 200,
      questions: [
        { q: "Een object is een ... van een klasse.", opts: ["Instantie", "Kopie", "Blauwdruk", "Methode"], correct: 0, exp: "Een object is een concrete instantie van een klasse." },
        { q: "De <b>toestand</b> van een object wordt bijgehouden via ...", opts: ["Properties en velden", "Methoden", "Namespaces", "Constructors"], correct: 0, exp: "Toestand = de datavelden/properties van het object." },
        { q: "Welk type opslaan op de heap?", opts: ["Reference types (objecten, arrays)", "Value types (int, bool)", "Enums", "Structs"], correct: 0, exp: "Reference types leven op de heap; value types op de stack." },
        { q: "Wat doet de Garbage Collector?", opts: ["Verwijdert objecten zonder referentie van de heap", "Maakt nieuwe objecten", "Beheert de stack", "Optimaliseert loops"], correct: 0, exp: "GC = automatisch geheugenbeheer op de heap." },
        { q: "Welke modifier maakt een property extern alleen-lezen maar intern schrijfbaar?", opts: ["private set", "readonly", "const", "sealed"], correct: 0, exp: "private set laat enkel de klasse zelf schrijven." },
        { q: "Wat is het resultaat van <code>DateTime.Today - new DateTime(2000,1,1)</code>?", opts: ["Een TimeSpan", "Een DateTime", "Een int", "Een double"], correct: 0, exp: "Twee DateTimes aftrekken geeft een TimeSpan." },
        { q: "Wanneer gebruik je een full property i.p.v. een autoproperty?", opts: ["Als er logica/validatie nodig is in get of set", "Nooit", "Altijd", "Enkel bij static leden"], correct: 0, exp: "Validatie of transformatie vereist een full property." },
        { q: "Een static property van DateTime die de huidige tijd geeft ...", opts: ["DateTime.Now", "DateTime.Today.Now", "new DateTime()", "DateTime.Parse()"], correct: 0, exp: "DateTime.Now is een static property." },
        { q: "Wat is een namespace?", opts: ["Groepering van gerelateerde klassen en types", "Een methode", "Een object", "Een loop"], correct: 0, exp: "Namespaces organiseren code en vermijden naamsconflicten." },
        { q: "Catch-blokken worden afgehandeld in ...", opts: ["Volgorde van specifiek naar algemeen", "Willekeurige volgorde", "Omgekeerde alfabetische volgorde", "Altijd slechts één"], correct: 0, exp: "Specifieke exceptions komen bovenaan; Exception als fallback onderaan." },
        { q: "Wat doet <code>finally</code>?", opts: ["Voert altijd uit, ook na een exception", "Enkel bij succesvol try", "Enkel bij exception", "Stopt het programma"], correct: 0, exp: "finally garandeert uitvoering (bv. bestand sluiten)." },
        { q: "Hoe verwijst een reference-type variabele naar haar data?", opts: ["Via een adres (referentie) op de heap", "Via een directe waarde op de stack", "Via een namespace", "Via een null-pointer"], correct: 0, exp: "Reference types slaan een adres op, niet de data zelf." },
        { q: "Welke drie kenmerken heeft een object?", opts: ["Gedrag, toestand, identiteit", "Naam, type, waarde", "Stack, heap, GC", "Properties, methoden, constructors"], correct: 0, exp: "Gedrag (methoden), toestand (data) en identiteit (naam)." },
        { q: "Wat is de beginwaarde van een reference-type variabele?", opts: ["null", "0", "\"\"", "false"], correct: 0, exp: "Reference types initialiseren op null." },
        { q: "Waarom is <code>GC.Collect()</code> af te raden?", opts: ["De GC weet zelf beter wanneer op te ruimen", "Het werkt niet", "Het geeft fouten", "Het is te langzaam"], correct: 0, exp: "Handmatig opruimen verstoort de optimizer van de GC." }
      ]
    }
  }
};

/* ---- Final project descriptor (renderFinal leest dit) ---- */
EXAMS.finalProject = {
  title: "Eindproject — C# OOP Integratie",
  xp: 300,
  intro: "Pas alle concepten uit de volledige cursus toe in één samenhangend C#-programma. Kies een domein en implementeer het volledig. Vink alle checklistitems af om het project in te dienen.",
  parts: [
    {
      title: "Deel 1 — Klassen & objecten",
      desc: "Definieer minstens 3 klassen met elk properties (autoproperties en/of full properties met validatie), methoden en constructor(s). Kies één van de domeinen: Parkeergarage (Voertuig, ParkeerPlaats, Garage), Schoolsysteem (Student, Vak, Rapport) of Bankrekening (Rekening, Klant, Bank)."
    },
    {
      title: "Deel 2 — Geheugen & exceptions",
      desc: "Verwerk een array van objecten met een lus. Gebruik try/catch rond gebruikersinvoer en werp zelf een exception op bij een ongeldige toestand (bv. garage vol, punt buiten bereik, negatief saldo). Gebruik finally voor opruimtaken."
    },
    {
      title: "Deel 3 — Constructors, static & DateTime",
      desc: "Gebruik overloaded constructors en object initializers. Voeg een static field toe voor gedeelde info (bv. rentepercentage, max-capaciteit, schooljaar). Verwerk DateTime of TimeSpan op een zinvolle manier (bv. inschrijfdatum, uitleentermijn, rekeningduur)."
    }
  ],
  checklist: [
    "Minstens 3 klassen gedefinieerd",
    "Elke klasse heeft een constructor",
    "Minstens 1 overloaded constructor",
    "Static field/property gebruikt",
    "Full property met validatie",
    "Try/catch rond invoer",
    "DateTime of TimeSpan gebruikt",
    "Array van objecten met lus",
    "Methode geeft een object terug",
    "Code is overzichtelijk en gedocumenteerd"
  ]
};