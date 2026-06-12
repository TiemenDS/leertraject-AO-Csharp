// Module 1 - H11: OOP, Klassen, Objecten, Methoden, Properties
window.MODULE_1 = {
  id: "m1",
  title: "H11 — OOP: Klassen, Objecten & Properties",
  desc: "Van gestructureerd programmeren naar object-georiënteerd: de kern van OOP.",
  icon: "🧱",
  lessons: [
    {
      id: "m1l1",
      title: "Wat is OOP?",
      sub: "Van gestructureerd naar object-georiënteerd",
      theory: `
        <p>Tot nu toe leerde je <b>gestructureerd programmeren</b> — een paradigma uit de jaren zestig met methoden, loops en beslissingsstructuren. Bij complexere applicaties wordt deze aanpak echter snel onoverzichtelijk en nodeloos complex.</p>
        <p><b>Object-georiënteerd programmeren (OOP)</b> bouwt voort op gestructureerd programmeren maar laat krachtigere applicaties toe. Bij OOP draait alles rond <b>klassen en objecten</b> die intern nog steeds gestructureerde code bevatten, maar je code wordt modulairder, leesbaarder en onderhoudsvriendelijker.</p>
        <div class="callout tip"><b>C# en OOP:</b> C# werd in 2001 ontwikkeld met als hoofddoel "een eenvoudige, moderne, objectgeoriënteerde programmeertaal voor algemene doeleinden". Daarom moet álle C#-code in klassen staan — denk aan de <code>class Program</code> bovenaan elk project.</div>
        <h3>Het probleem zonder OOP: Pong</h3>
        <p>Stel je maakt het spel Pong met een balletje dat over het scherm botst. Met losse variabelen (<code>balX</code>, <code>balY</code>, <code>VectorX</code>, <code>VectorY</code>) lukt dat voor één balletje. Maar voor een tweede balletje moet je bijna élke regel dupliceren — de code wordt onhoudbaar rommelig.</p>
        <h3>De oplossing: logica in objecten</h3>
        <p>De kracht van OOP zit hem in het feit dat we de logica <b>in de objecten zelf</b> plaatsen. Objecten zijn verantwoordelijk voor hun eigen gedrag, gebaseerd op externe impulsen en hun eigen interne toestand.</p>
      `,
      examples: [
        { title: "Pong zonder OOP (rommelig bij 2 balletjes)", code:
`int balX = 20, balY = 20, vectorX = 2, vectorY = 1;
int bal2X = 10, bal2Y = 8, vector2X = 2, vector2Y = -1;

while (true)
{
    // ALLES dubbel...
    balX = balX + vectorX;
    bal2X = bal2X + vector2X;
    // enzovoort
}` },
        { title: "Pong mét OOP (eenvoudig)", code:
`Balletje bal1 = new Balletje();
Balletje bal2 = new Balletje();

while (true)
{
    bal1.Update();
    bal2.Update();   // zo simpel!
    bal1.TekenOpScherm();
    bal2.TekenOpScherm();
}` }
      ],
      summary: [
        "OOP bouwt voort op gestructureerd programmeren maar is krachtiger.",
        "Alles draait rond klassen en objecten.",
        "C# is van de grond af opgebouwd rond OOP — alle code staat in klassen.",
        "De logica zit IN de objecten zelf; objecten beheren hun eigen gedrag en toestand."
      ],
      quiz: [
        { q: "Waar draait OOP voornamelijk om?", opts: ["Klassen en objecten", "Loops en arrays", "Methoden en variabelen", "Bestanden en mappen"], correct: 0, exp: "Klassen en objecten vormen de kern van OOP." },
        { q: "Waarom is gestructureerd programmeren problematisch bij complexe apps?", opts: ["De code wordt rommelig en je moet veel dupliceren", "Het is te traag", "Het werkt niet in C#", "Het gebruikt te veel geheugen"], correct: 0, exp: "Zonder objecten moet je veel code dupliceren, wat onoverzichtelijk wordt." },
        { q: "Waar zit de kracht van OOP volgens de cursus?", opts: ["De logica zit in de objecten zelf", "Er zijn minder regels code", "Het gebruikt geen loops", "Variabelen zijn altijd public"], correct: 0, exp: "Objecten zijn verantwoordelijk voor hun eigen gedrag en toestand." }
      ],
      exercises: [
        { type: "fill", prompt: "Hoe verklein je de Pong-loop tot twee aanroepen per balletje?", template: "bal1.___(); bal1.TekenOpScherm();", answers: ["Update"], hint: "De methode die positie en richting bijwerkt." }
      ]
    },
    {
      id: "m1l2",
      title: "Klassen en objecten",
      sub: "Blauwdruk versus instantie",
      theory: `
        <p>Het verschil tussen een <b>klasse</b> en een <b>object</b> is fundamenteel binnen OOP. OOP probeert de echte wereld in code te modelleren: alles om ons heen behoort tot een bepaalde klasse die alle objecten van dat type beschrijft.</p>
        <div class="callout"><b>Klasse:</b> een blauwdruk (of prototype) die het gedrag en de toestand beschrijft van alle objecten van die klasse.<br><b>Object:</b> een individuele instantie van een klasse met een eigen toestand, gedrag en identiteit.</div>
        <h3>De huis-analogie</h3>
        <p>Vergelijk het met een grondplan voor een huis dat tien keer in een straat wordt gebouwd. Het <b>plan</b> is de klasse. De effectieve <b>huizen</b> zijn de instanties (objecten), elk met een eigen toestand (ander baksteentype, wel/geen zonnepanelen) en gedrag (rolluiken openen bij zonsopgang).</p>
        <h3>De drie kenmerken van een object</h3>
        <ul>
          <li><b>Gedrag:</b> beschreven door de methoden in de klasse.</li>
          <li><b>Toestand:</b> bepaald door datavelden (properties en instantievariabelen); kan wijzigen door eigen gedrag of externe impulsen.</li>
          <li><b>Identiteit:</b> een unieke naam zodat andere objecten ermee kunnen interageren.</li>
        </ul>
        <div class="callout tip"><b>Tip — klassen vinden:</b> zoek in de opdrachtspecificatie naar zelfstandige naamwoorden (substantieven). Dit zijn meestal de objecten en/of klassen die je applicatie nodig heeft.</div>
        <h3>Singleton-valkuil</h3>
        <p>Maak geen klassen zoals <code>level1</code>, <code>level2</code> — die hebben 90% gelijke code. Maak één klasse <code>Level</code> en daar objecten van. Objecten <i>mogen</i> wel <code>level1</code> en <code>level2</code> heten. Genummerde variabelen (<code>bal1, bal2</code>) wijzen vaak op de nood aan een array.</p>
      `,
      examples: [
        { title: "De Balletje-klasse", code:
`class Balletje
{
    // Eigenschappen (properties)
    public int X { get; set; }
    public int Y { get; set; }
    public int VectorX { get; set; }
    public int VectorY { get; set; }

    // Methoden (gedrag)
    public void Update() { /* ... */ }
    public void TekenOpScherm() { /* ... */ }
}` },
        { title: "Een object instantiëren", code:
`Balletje bal1 = new Balletje();
bal1.X = 20;
bal1.Y = 20;
bal1.VectorX = 2;
bal1.VectorY = 1;` }
      ],
      summary: [
        "Een klasse is een blauwdruk; een object is een concrete instantie.",
        "Een object heeft gedrag (methoden), toestand (data) en identiteit (naam).",
        "Zoek substantieven in een opdracht om klassen te vinden.",
        "Maak nooit level1/level2-klassen; gebruik één klasse Level met objecten."
      ],
      quiz: [
        { q: "Wat is een klasse?", opts: ["Een blauwdruk voor objecten", "Een concreet object", "Een variabele", "Een methode"], correct: 0, exp: "De klasse beschrijft hoe objecten eruitzien en zich gedragen." },
        { q: "Welke drie kenmerken heeft een object?", opts: ["Gedrag, toestand, identiteit", "Naam, type, waarde", "Public, private, static", "Klasse, methode, property"], correct: 0, exp: "Een object heeft gedrag, toestand en identiteit." },
        { q: "Welke klassennaam is FOUT?", opts: ["level1, level2", "Level", "Student", "Auto"], correct: 0, exp: "level1/level2 als klassen wijzen op verwarring tussen klasse en object." },
        { q: "Hoe vind je potentiële klassen in een opdracht?", opts: ["Zoek zelfstandige naamwoorden", "Zoek werkwoorden", "Zoek getallen", "Zoek hoofdletters"], correct: 0, exp: "Substantieven zijn meestal je objecten/klassen." }
      ],
      exercises: [
        { type: "code", prompt: "Schrijf een lege klasse <code>Auto</code> volgens de C#-conventies.", starter: "// jouw klasse", check: ["class", "Auto"], sample: "class Auto\n{\n\n}" },
        { type: "fill", prompt: "Maak twee objecten van type Auto aan.", template: "Auto a = ___ Auto(); Auto b = new Auto();", answers: ["new"], hint: "Het keyword om een object te instantiëren." }
      ]
    },
    {
      id: "m1l3",
      title: "Abstractie & het black-box principe",
      sub: "Complexiteit verbergen",
      theory: `
        <p><b>Abstractie</b> is een belangrijk OOP-concept gebaseerd op het <b>black-box principe</b>: we beschouwen objecten als zwarte dozen. Je hoeft de interne werking niet te kennen om ze te gebruiken.</p>
        <h3>De auto-analogie</h3>
        <p>Een auto biedt een <b>interface</b> aan de buitenwereld (stuur, pedalen, dashboard). Je hoeft niet te weten hoe de motor werkt om te kunnen rijden. Stel je voor dat je de volledige werking moest kennen voor je de baan op kon...</p>
        <p>Het doel van OOP is andere programmeurs zoveel mogelijk af te schermen van de interne werking van je klasse: <i>"if it works, it works"</i>. Hoe minder de buitenwereld moet weten om met een object te werken, hoe beter.</p>
        <h3>Voorbeeld: de Random-klasse</h3>
        <p>Dankzij abstractie hoef je maar twee dingen te kunnen: een <code>Random</code>-object aanmaken en de <code>Next()</code>-methode aanroepen. Wat er intern gebeurt, boeit je niet. <i>It just works!</i></p>
        <div class="callout tip"><b>Steve Jobs (1994):</b> "Objects are like people. They're living, breathing things that have knowledge inside them about how to do things and have memory inside them so they can remember things. (...) They encapsulate complexity, and the interfaces to that complexity are high level."</div>
      `,
      examples: [
        { title: "Abstractie in actie: Random", code:
`Random ranGen = new Random();
int getal = ranGen.Next();
// Hoe Next() intern werkt? Boeit ons niet!` }
      ],
      summary: [
        "Abstractie = het black-box principe: interne werking verbergen.",
        "Een object biedt een interface aan de buitenwereld.",
        "Hoe minder de buitenwereld moet weten, hoe beter.",
        "Random is een perfect voorbeeld: new + Next() volstaat."
      ],
      quiz: [
        { q: "Wat is het black-box principe?", opts: ["Interne werking verbergen achter een interface", "Alles public maken", "Code in één bestand zetten", "Geen methoden gebruiken"], correct: 0, exp: "Je verbergt complexiteit en biedt enkel een interface aan." },
        { q: "Wat noemt de cursus de 'interface' van een auto?", opts: ["Stuur, pedalen, dashboard", "De motor", "De banden", "Het chassis"], correct: 0, exp: "Dat zijn de bedieningselementen die je gebruikt zonder de interne werking te kennen." },
        { q: "Hoeveel moet je kennen om Random te gebruiken?", opts: ["Object aanmaken + Next() aanroepen", "De volledige interne code", "Niets", "Het hele .NET framework"], correct: 0, exp: "Dankzij abstractie volstaan new Random() en .Next()." }
      ],
      exercises: [
        { type: "code", prompt: "Maak een Random-object en haal er één getal uit.", starter: "// jouw code", check: ["new Random", "Next"], sample: "Random r = new Random();\nint getal = r.Next();" }
      ]
    },
    {
      id: "m1l4",
      title: "Methoden & access modifiers",
      sub: "public, private en het verbergen van code",
      theory: `
        <p>Een <b>object-methode</b> beschrijft gedrag. Je plaatst géén <code>static</code> voor object-methoden (dat komt later). Wél plaats je een <b>access modifier</b> die aangeeft hoe zichtbaar de methode is.</p>
        <h3>public vs private</h3>
        <p><code>public</code> betekent dat de buitenwereld de methode kan aanroepen op het object. <code>private</code> betekent dat enkel de klasse zelf de methode kan gebruiken.</p>
        <div class="callout warn"><b>Standaard = private:</b> als je géén access modifier schrijft, is iets automatisch <code>private</code>. Het is een héél slechte gewoonte om access modifiers weg te laten — schrijf ze altijd expliciet.</div>
        <h3>Volgorde van bescherming</h3>
        <ul>
          <li><b>private:</b> meest beschermend — enkel zichtbaar in de klasse zelf (standaard).</li>
          <li><b>protected:</b> zichtbaar voor overgeërfde klassen.</li>
          <li><b>public:</b> meest open — overal zichtbaar.</li>
        </ul>
        <p>Klassen zelf zijn <code>public</code> of <code>internal</code> (standaard). Een <code>internal</code> klasse is enkel bruikbaar binnen het huidige project (de assembly).</p>
        <h3>Waarom private?</h3>
        <p>Heb je een complexe publieke methode die je opsplitst? Maak de hulpdelen <code>private</code>. Zo voorkom je dat anderen code aanroepen die niet bedoeld is om rechtstreeks gebruikt te worden. Binnen de klasse kan je private methoden wél aanroepen.</p>
        <div class="callout"><b>Naamgevingsconventies:</b> klassen en methoden starten met een hoofdletter. Alles dat public is start met een hoofdletter. Private zaken starten met een kleine letter (behalve methoden).</div>
      `,
      examples: [
        { title: "Public methode", code:
`class Mens
{
    public void Praat()
    {
        Console.WriteLine("Ik ben een mens!");
    }
}

Mens joske = new Mens();
joske.Praat(); // werkt` },
        { title: "Private methode binnen de klasse aanroepen", code:
`class Mens
{
    public void Praat()
    {
        Console.WriteLine("Ik ben een mens!");
        VertelGeheim();   // mag: zelfde klasse
    }
    private void VertelGeheim()
    {
        Console.WriteLine("Ik ben verliefd op Anneke");
    }
}` }
      ],
      summary: [
        "Access modifiers bepalen de zichtbaarheid van klasse-onderdelen.",
        "Standaard (zonder modifier) is alles private.",
        "private = enkel in de klasse, protected = + overerving, public = overal.",
        "Schrijf access modifiers altijd expliciet; gebruik private voor hulpcode."
      ],
      quiz: [
        { q: "Wat is een onderdeel zonder access modifier in C#?", opts: ["private", "public", "protected", "internal"], correct: 0, exp: "Zonder modifier is een lid automatisch private." },
        { q: "Welke modifier is het meest open?", opts: ["public", "private", "protected", "internal"], correct: 0, exp: "public is overal zichtbaar." },
        { q: "Wat is de standaard zichtbaarheid van een klasse?", opts: ["internal", "public", "private", "protected"], correct: 0, exp: "Klassen zijn standaard internal (enkel binnen de assembly)." },
        { q: "Waarom maak je hulpmethoden private?", opts: ["Zodat anderen ze niet rechtstreeks aanroepen", "Zodat ze sneller zijn", "Zodat ze static worden", "Zodat ze public worden"], correct: 0, exp: "Private voorkomt verkeerd gebruik van interne hulpcode." }
      ],
      exercises: [
        { type: "fill", prompt: "Maak de methode Praat aanroepbaar van buitenaf.", template: "___ void Praat() { Console.WriteLine(\"Hoi\"); }", answers: ["public"], hint: "De buitenwereld moet erbij kunnen." },
        { type: "code", prompt: "Maak een klasse Mens met een private methode VertelGeheim en een public methode Praat die VertelGeheim aanroept.", starter: "class Mens\n{\n    // jouw code\n}", check: ["public void Praat", "private void VertelGeheim", "VertelGeheim()"], sample: "class Mens\n{\n    public void Praat()\n    {\n        Console.WriteLine(\"Ik ben een mens!\");\n        VertelGeheim();\n    }\n    private void VertelGeheim()\n    {\n        Console.WriteLine(\"Geheim!\");\n    }\n}" }
      ]
    },
    {
      id: "m1l5",
      title: "Instantievariabelen",
      sub: "Interne staat per object",
      theory: `
        <p><b>Instantievariabelen</b> (ook wel <b>datavelden</b> of <b>datafields</b>) bewaren waarden die per object verschillen. Elk object heeft zijn eigen interne staat.</p>
        <div class="callout danger"><b>Gouden regel:</b> instantievariabelen mogen NOOIT public gezet worden! De C#-standaard staat het toe, maar het is één van de slechtste programmeerbeslissingen. Je wil niet dat de buitenwereld zomaar <code>adil.geboortejaar = -12000;</code> kan doen.</div>
        <h3>Waarom private?</h3>
        <p>Door instantievariabelen private te maken voorkom je dat de buitenwereld ongeldige waarden toekent die de werking van de klasse stuk kunnen maken. We controleren de toegang via <b>properties en methoden</b>.</p>
        <h3>Beginwaarden</h3>
        <p>Je kan een instantievariabele een beginwaarde geven (bv. <code>= 1970</code>). Alle objecten krijgen die waarde bij creatie met <code>new</code>.</p>
        <h3>Elk object zijn eigen staat</h3>
        <p>Een kernconcept van OOP: ieder object heeft zijn eigen interne staat, individueel aanpasbaar van de andere objecten. Als je het geboortejaar van Elvis verhoogt, verandert dat van Bono niet.</p>
      `,
      examples: [
        { title: "Private instantievariabele met beginwaarde", code:
`class Mens
{
    private int geboorteJaar = 1970; // instantievariabele

    public void Praat()
    {
        Console.WriteLine("Ik ben een mens!");
        Console.WriteLine($"Ik ben geboren in {geboorteJaar}.");
    }
}` },
        { title: "Gecontroleerde toegang via methode", code:
`public void VeranderGeboortejaar(int geboorteJaarIn)
{
    if (geboorteJaarIn >= 1900)
        geboorteJaar = geboorteJaarIn;
}` }
      ],
      summary: [
        "Instantievariabelen bewaren de toestand per object.",
        "Ze mogen NOOIT public zijn — gebruik private.",
        "Beginwaarden gelden voor alle objecten bij new.",
        "Elk object beheert zijn eigen interne staat onafhankelijk."
      ],
      quiz: [
        { q: "Welke zichtbaarheid horen instantievariabelen te hebben?", opts: ["private", "public", "protected", "static"], correct: 0, exp: "Instantievariabelen moeten private zijn om de staat te beschermen." },
        { q: "Hoe geef je gecontroleerd toegang tot een private variabele?", opts: ["Via properties en methoden", "Door ze public te maken", "Door ze static te maken", "Het kan niet"], correct: 0, exp: "Properties en methoden bewaken de toegang tot interne staat." },
        { q: "Wat gebeurt er met andere objecten als je de staat van één object wijzigt?", opts: ["Niets — elk object heeft eigen staat", "Ze veranderen mee", "Ze crashen", "Ze worden gereset"], correct: 0, exp: "Elk object beheert zijn eigen interne staat onafhankelijk." }
      ],
      exercises: [
        { type: "fill", prompt: "Geef de instantievariabele de juiste zichtbaarheid en beginwaarde 1970.", template: "___ int geboorteJaar = 1970;", answers: ["private"], hint: "Bescherm de interne staat." },
        { type: "code", prompt: "Schrijf een methode VeranderGeboortejaar die enkel jaren ≥ 1900 toelaat.", starter: "private int geboorteJaar = 1970;\npublic void VeranderGeboortejaar(int jaarIn)\n{\n    // jouw code\n}", check: ["if", ">=", "1900", "geboorteJaar ="], sample: "private int geboorteJaar = 1970;\npublic void VeranderGeboortejaar(int jaarIn)\n{\n    if (jaarIn >= 1900)\n        geboorteJaar = jaarIn;\n}" }
      ]
    },
    {
      id: "m1l6",
      title: "Full properties",
      sub: "Gecontroleerde toegang met get en set",
      theory: `
        <p><b>Properties</b> (eigenschappen) zijn de C#-manier om objecten hun interne staat in en uit te lezen. Ze zorgen voor <b>gecontroleerde toegang</b> tot de interne structuur en treden op als wachters.</p>
        <p>Het oude alternatief (methoden zoals <code>StartVerjongingskuur</code>) werkt, maar is voorbijgestreefd. Properties herken je aan de <code>get</code> en <code>set</code> keywords.</p>
        <h3>Opbouw van een full property</h3>
        <ul>
          <li><b>Identifier & datatype:</b> een property is altijd <code>public</code> en gedraagt zich naar buiten als een gewone variabele. Conventie: zelfde naam als het veld maar met hoofdletter (<code>Energie</code> i.p.v. <code>energie</code>).</li>
          <li><b>get:</b> bevat de code die naar buiten gestuurd wordt — werkt als een methode met <code>return</code>.</li>
          <li><b>set:</b> bevat de code die uitgevoerd wordt als men van buiten een waarde toekent. De ingekomen waarde zit altijd in de speciale variabele <code>value</code> (deze naam kan je niet veranderen).</li>
        </ul>
        <h3>Toegangscontrole in de set</h3>
        <p>In de set kan je controles inbouwen. Zo kan je bijvoorbeeld enkel waarden ≥ 0 toelaten, en ongeldige waarden negeren.</p>
        <div class="callout tip"><b>Visual Studio snippet:</b> typ <code>propfull</code> + twee keer Tab voor een full property met bijhorende private variabele.</div>
      `,
      examples: [
        { title: "Volledige full property", code:
`class SithLord
{
    private int energie;

    public int Energie
    {
        get { return energie; }
        set { energie = value; }
    }
}

SithLord vader = new SithLord();
vader.Energie = 20;        // set
Console.WriteLine(vader.Energie); // get` },
        { title: "Met toegangscontrole", code:
`public int Energie
{
    get { return energie; }
    set
    {
        if (value >= 0)
            energie = value;   // negatief wordt genegeerd
    }
}` }
      ],
      summary: [
        "Properties geven gecontroleerde toegang tot interne staat.",
        "get bevat return-logica; set gebruikt de speciale variabele value.",
        "Een property is altijd public en start met een hoofdletter.",
        "In de set kan je waarden valideren en ongeldige negeren."
      ],
      quiz: [
        { q: "Hoe heet de ingekomen waarde in een set?", opts: ["value", "input", "set", "data"], correct: 0, exp: "De speciale variabele heet altijd value." },
        { q: "Een property is altijd ...", opts: ["public", "private", "static", "protected"], correct: 0, exp: "De essentie van een property is gecontroleerde publieke toegang." },
        { q: "Wat doet de get?", opts: ["Geeft data naar buiten via return", "Zet een waarde", "Verwijdert data", "Maakt een object"], correct: 0, exp: "get werkt als een methode met returntype." },
        { q: "Welke conventie geldt voor property-namen?", opts: ["Hoofdletter (Energie)", "Kleine letter (energie)", "Underscore (_energie)", "Met get_ ervoor"], correct: 0, exp: "Publieke properties starten met een hoofdletter." }
      ],
      exercises: [
        { type: "fill", prompt: "Vul de set aan zodat alleen waarden ≥ 0 toegekend worden.", template: "set { if (___ >= 0) energie = value; }", answers: ["value"], hint: "De ingekomen waarde." },
        { type: "code", prompt: "Schrijf een full property <code>Energie</code> (int) met validatie ≥ 0 voor het veld <code>energie</code>.", starter: "private int energie;\n// jouw property", check: ["public int Energie", "get", "set", "value", "energie"], sample: "private int energie;\npublic int Energie\n{\n    get { return energie; }\n    set { if (value >= 0) energie = value; }\n}" }
      ]
    },
    {
      id: "m1l7",
      title: "Property-variaties",
      sub: "Read-only, write-only, private set & transformatie",
      theory: `
        <p>Je bent niet verplicht zowel <code>get</code> als <code>set</code> te schrijven. Dat geeft een aantal variaties:</p>
        <h3>Write-only property</h3>
        <p>Heeft geen <code>get</code>. Handig voor informatie die je naar een object stuurt maar niet mag uitlezen — denk aan een <code>Pincode</code> van een <code>BankRekening</code>.</p>
        <h3>Read-only property</h3>
        <p>Heeft geen <code>set</code>. Gebruik je als de buitenwereld iets mag uitlezen maar niet aanpassen.</p>
        <div class="callout warn">Het <code>readonly</code> keyword heeft andere doelen en wordt NIET gebruikt om een read-only property te maken.</div>
        <h3>Read-only met private set</h3>
        <p>Voor de buitenwereld read-only, maar intern kan je nog controleren en wijzigen via een <code>private set</code>.</p>
        <div class="callout tip"><b>Goede gewoonte:</b> pas interne variabelen altijd aan via de property, niet rechtstreeks via de instantievariabele. Zo omzeil je de ingebouwde controle niet (bv. een ResetLord-methode die rechtstreeks schrijft, omzeilt de validatie).</div>
        <h3>Read-only die transformeert</h3>
        <p>Een property hoeft niet uit een instantievariabele te komen. Je kan data 'on-the-fly' genereren, bv. een <code>VolledigeNaam</code> samengesteld uit <code>Voornaam</code> en <code>Achternaam</code>.</p>
      `,
      examples: [
        { title: "Read-only met private set", code:
`public int Energie
{
    get { return energie; }
    private set
    {
        if (value >= 0)
            energie = value;
    }
}
// Van buiten: lezen werkt, schrijven geeft fout` },
        { title: "Read-only die transformeert", code:
`class Persoon
{
    public string Voornaam { get; set; }
    public string Achternaam { get; set; }

    public string VolledigeNaam
    {
        get { return $"{Voornaam} {Achternaam}"; }
    }
    public string Email
    {
        get { return $"{Voornaam}@ziescherp.be"; }
    }
}` }
      ],
      summary: [
        "Write-only = geen get; read-only = geen set.",
        "readonly keyword maak je GEEN read-only property mee.",
        "private set = read-only naar buiten, schrijfbaar intern.",
        "Transformerende properties genereren data on-the-fly."
      ],
      quiz: [
        { q: "Wat mist een read-only property?", opts: ["set", "get", "value", "public"], correct: 0, exp: "Read-only heeft enkel een get, geen set." },
        { q: "Wat mist een write-only property?", opts: ["get", "set", "return", "value"], correct: 0, exp: "Write-only heeft enkel een set." },
        { q: "Hoe maak je een property read-only naar buiten maar schrijfbaar intern?", opts: ["private set", "readonly", "protected get", "static set"], correct: 0, exp: "Met een private set kan enkel de klasse zelf schrijven." },
        { q: "Een transformerende property...", opts: ["genereert data on-the-fly", "heeft altijd een set", "is altijd static", "gebruikt readonly"], correct: 0, exp: "Ze berekent een waarde i.p.v. uit een veld te lezen." }
      ],
      exercises: [
        { type: "code", prompt: "Schrijf een read-only property <code>VolledigeNaam</code> die Voornaam en Achternaam samenvoegt.", starter: "public string Voornaam { get; set; }\npublic string Achternaam { get; set; }\n// jouw property", check: ["VolledigeNaam", "get", "Voornaam", "Achternaam"], sample: "public string Voornaam { get; set; }\npublic string Achternaam { get; set; }\npublic string VolledigeNaam\n{\n    get { return $\"{Voornaam} {Achternaam}\"; }\n}" }
      ]
    },
    {
      id: "m1l8",
      title: "Autoproperties",
      sub: "Properties zonder boilerplate",
      theory: `
        <p><b>Autoproperties</b> (autoprops) laten je snel properties schrijven zonder de achterliggende instantievariabele te beschrijven. C# beheert die variabele zelf, onzichtbaar voor jou.</p>
        <p>Heel vaak wil je gewoon eenvoudige data beschikbaar stellen. Omdat instantievariabelen niet public mogen zijn, gebruik je een property die als doorgeefluik fungeert. Autoproperties doen precies dit.</p>
        <div class="callout warn">De achterliggende variabele is volledig onzichtbaar en kan NIET rechtstreeks gebruikt worden. Alles gaat via de autoproperty, altijd.</div>
        <h3>Beginwaarden</h3>
        <p>Je kan een beginwaarde geven achter de property: <code>public int Geboortejaar { get; set; } = 2002;</code></p>
        <h3>Read-only autoproperties</h3>
        <ul>
          <li>Met private setter: <code>{ get; private set; }</code></li>
          <li>Enkel get met verplichte beginwaarde: <code>{ get; } = "Tim";</code></li>
        </ul>
        <h3>Wanneer GEEN autoproperty?</h3>
        <p>Autoproperties werken enkel als er <b>geen extra logica</b> (validatie/transformatie) in get of set hoeft. Wil je bv. controleren op negatieve waarden, dan moet je een full property schrijven.</p>
        <div class="callout tip"><b>Werkwijze:</b> begin klassen vaak met autoproperties. Naarmate je project vordert en controles vereist, zet je ze om naar full properties. In VS: typ <code>prop</code>+Tab+Tab (autoprop) of <code>propg</code>+Tab+Tab (met private setter).</div>
        <h3>Methode of property?</h3>
        <p>Gaat het om een <b>actie/gedrag</b> → methode. Gaat het om een <b>eigenschap</b> die snel berekend kan worden → property. Zware/lange berekeningen → toch een methode.</p>
      `,
      examples: [
        { title: "Autoproperty versus full property", code:
`// Full property (lang)
public string Voornaam
{
    get { return voornaam; }
    set { voornaam = value; }
}

// Autoproperty (kort, zelfde functionaliteit)
public string Voornaam { get; set; }` },
        { title: "Beginwaarde & read-only varianten", code:
`public int Geboortejaar { get; set; } = 2002;
public string Voornaam { get; private set; }
public string Code { get; } = "Tim";` }
      ],
      summary: [
        "Autoproperties verbergen de instantievariabele volledig.",
        "Je kan beginwaarden geven achter de property.",
        "Read-only via private set of get-only met verplichte beginwaarde.",
        "Gebruik full properties zodra je validatie/transformatie nodig hebt."
      ],
      quiz: [
        { q: "Wat doet C# met de variabele achter een autoproperty?", opts: ["Beheert ze onzichtbaar zelf", "Maakt ze public", "Negeert ze", "Maakt ze static"], correct: 0, exp: "De backing field is onzichtbaar en wordt door C# beheerd." },
        { q: "Wanneer kan je GEEN autoproperty gebruiken?", opts: ["Als er logica/validatie in get of set moet", "Bij strings", "Bij ints", "Nooit"], correct: 0, exp: "Logica vereist een full property." },
        { q: "Hoe maak je een autoproperty read-only naar buiten?", opts: ["{ get; private set; }", "{ get; public set; }", "readonly get", "{ set; }"], correct: 0, exp: "Een private setter maakt ze enkel intern schrijfbaar." },
        { q: "Iets dat het object DOET, plaats je in een...", opts: ["methode", "property", "veld", "constructor"], correct: 0, exp: "Acties/gedrag horen in methoden." }
      ],
      exercises: [
        { type: "fill", prompt: "Geef de autoproperty een beginwaarde van 2002.", template: "public int Geboortejaar { get; set; } = ___;", answers: ["2002"], hint: "Het jaartal." },
        { type: "code", prompt: "Herschrijf een klasse Persoon met autoproperties Voornaam (string) en Geboortejaar (int).", starter: "public class Persoon\n{\n    // jouw autoproperties\n}", check: ["public string Voornaam { get; set; }", "public int Geboortejaar { get; set; }"], sample: "public class Persoon\n{\n    public string Voornaam { get; set; }\n    public int Geboortejaar { get; set; }\n}" }
      ]
    },
    {
      id: "m1l9",
      title: "DateTime: werken met objecten",
      sub: "Een krachtige ingebouwde klasse",
      theory: `
        <p>De <code>DateTime</code>-klasse stelt tijd en/of datum voor in een object. Het is een ideale klasse om met objecten te leren werken.</p>
        <h3>DateTime-objecten aanmaken</h3>
        <ol>
          <li>De huidige datum/tijd vragen via <code>DateTime.Now</code> (een static property).</li>
          <li>Manueel instellen met <code>new</code> en de constructor: <code>new DateTime(jaar, maand, dag)</code> of met uur/minuten/seconden erbij.</li>
        </ol>
        <h3>Add-methoden</h3>
        <p>Methoden als <code>AddDays</code>, <code>AddHours</code>, <code>AddMonths</code>, <code>AddYears</code> geven een <b>nieuw</b> DateTime-object terug dat je moet bewaren. Een <i>tick</i> is 100 nanoseconden.</p>
        <h3>Properties</h3>
        <p>Nuttige read-only properties: <code>Day</code>, <code>Month</code>, <code>Year</code>, <code>DayOfWeek</code>, <code>Hour</code>, ... Alle properties van DateTime zijn read-only (private setter).</p>
        <h3>Static methoden & parsen</h3>
        <p><code>DateTime.Parse(string)</code> zet een string om naar een DateTime. <code>DateTime.IsLeapYear(int)</code> geeft terug of een jaar een schrikkeljaar is — beide roep je op de klasse aan, niet op een object.</p>
        <h3>TimeSpan</h3>
        <p>Je kan DateTime-objecten van elkaar aftrekken (optellen kan niet!). Het resultaat is een <code>TimeSpan</code>-object dat het verschil voorstelt, bv. <code>.TotalDays</code>.</p>
      `,
      examples: [
        { title: "Aanmaken & Add", code:
`DateTime nu = DateTime.Now;
DateTime trouw = new DateTime(2017, 4, 21, 10, 0, 34);
DateTime einde = trouw.AddDays(35); // nieuw object
Console.WriteLine(einde.Month);     // 5
Console.WriteLine(einde.DayOfWeek); // Friday` },
        { title: "Parse, IsLeapYear & TimeSpan", code:
`DateTime d = DateTime.Parse("8/11/2016");
if (DateTime.IsLeapYear(2048))
    Console.WriteLine("Schrikkeljaar!");

DateTime vandaag = DateTime.Today;
DateTime geboorte = new DateTime(2009, 6, 17);
TimeSpan verschil = vandaag - geboorte;
Console.WriteLine($"{verschil.TotalDays} dagen");` }
      ],
      summary: [
        "DateTime.Now (static property) geeft de huidige tijd.",
        "Met new + constructor stel je datum/tijd manueel in.",
        "Add-methoden geven een NIEUW DateTime-object terug.",
        "DateTime aftrekken geeft een TimeSpan; alle properties zijn read-only."
      ],
      quiz: [
        { q: "Wat is DateTime.Now?", opts: ["Een static property met huidige tijd", "Een methode", "Een constructor", "Een TimeSpan"], correct: 0, exp: "DateTime.Now is een static property." },
        { q: "Wat geeft trouw.AddDays(35) terug?", opts: ["Een nieuw DateTime-object", "Een int", "Een TimeSpan", "Niets"], correct: 0, exp: "Add-methoden geven een nieuw DateTime terug." },
        { q: "Wat krijg je als je twee DateTime-objecten aftrekt?", opts: ["Een TimeSpan", "Een DateTime", "Een int", "Een fout"], correct: 0, exp: "Het verschil is een TimeSpan." },
        { q: "Roep je IsLeapYear aan op de klasse of een object?", opts: ["Op de klasse (static)", "Op een object", "Beide", "Geen van beide"], correct: 0, exp: "IsLeapYear is een static methode op DateTime." }
      ],
      exercises: [
        { type: "fill", prompt: "Maak een DateTime voor 18 maart 1981.", template: "DateTime verjaardag = new DateTime(1981, 3, ___);", answers: ["18"], hint: "De dag." },
        { type: "code", prompt: "Bereken het aantal dagen tussen vandaag en 17/6/2009 als TimeSpan.", starter: "DateTime vandaag = DateTime.Today;\n// jouw code", check: ["new DateTime(2009", "TimeSpan", "-", "TotalDays"], sample: "DateTime vandaag = DateTime.Today;\nDateTime geboorte = new DateTime(2009, 6, 17);\nTimeSpan verschil = vandaag - geboorte;\nConsole.WriteLine(verschil.TotalDays);" }
      ]
    },
    {
      id: "m1l10",
      title: "Programmeeropdrachten H11",
      sub: "Oefeningen uit de cursus",
      theory: `
        <p>Pas alles uit H11 toe in deze cursusopdrachten. Werk ze uit in Visual Studio en gebruik waar mogelijk de unit tests (Test → Run All Tests) voor geautomatiseerde feedback.</p>
        <div class="callout tip"><b>Unit testing:</b> bij de geleide oefening (Rapportmodule) zit een Test-project waar je AF blijft. De Test Explorer toont of je opdracht correct is.</div>
      `,
      examples: [
        { title: "Voorbeeld-output Rapport", code:
`Rapport mijnpunten = new Rapport();
mijnpunten.Percentage = 65;
mijnpunten.PrintGraad();   // "Voldoende"` }
      ],
      summary: [
        "NummerBerekenaar: Som/Verschil/Product/Quotient met deling-door-nul-controle.",
        "Student: autoproperties + BerekenGemiddelde + GeefOverzicht.",
        "Pizza, Figuren, Bibliotheek, BankManager, Persoon: properties & validatie.",
        "Gebruik unit tests voor automatische feedback."
      ],
      quiz: [
        { q: "Welk returntype heeft Quotient in NummerBerekenaar?", opts: ["double", "int", "void", "string"], correct: 0, exp: "Quotient geeft een double terug (deling)." },
        { q: "In de Rapport-opdracht: 70% geeft welke graad?", opts: ["Onderscheiding", "Voldoende", "Grote onderscheiding", "Niet geslaagd"], correct: 0, exp: "68-75% (incl.) = Onderscheiding." },
        { q: "Hoe lang mag een BibBoek maximaal uitgeleend worden?", opts: ["14 dagen", "7 dagen", "30 dagen", "21 dagen"], correct: 0, exp: "InleverDatum is 14 dagen na Uitgeleend." }
      ],
      exercises: [
        { type: "code", prompt: "Oefening 1 — NummerBerekenaar: schrijf de methode <code>Som</code> die Getal1 + Getal2 teruggeeft.", starter: "public int Getal1 { get; set; }\npublic int Getal2 { get; set; }\n// jouw methode Som", check: ["public int Som", "return", "Getal1", "Getal2", "+"], sample: "public int Getal1 { get; set; }\npublic int Getal2 { get; set; }\npublic int Som()\n{\n    return Getal1 + Getal2;\n}" },
        { type: "code", prompt: "Oefening 1 — schrijf <code>Quotient</code> (double) met controle op deling door 0 (toon foutboodschap en geef 0.0).", starter: "public double Quotient()\n{\n    // jouw code\n}", check: ["if", "Getal2", "0", "return"], sample: "public double Quotient()\n{\n    if (Getal2 == 0)\n    {\n        Console.WriteLine(\"Kan niet delen door 0\");\n        return 0.0;\n    }\n    return (double)Getal1 / Getal2;\n}" },
        { type: "code", prompt: "Oefening 2 — Student: schrijf <code>BerekenGemiddelde</code> (double) van 3 vakken.", starter: "public int PuntenCommunicatie { get; set; }\npublic int PuntenProgrammingPrinciples { get; set; }\npublic int PuntenWebTech { get; set; }\n// jouw methode", check: ["public double BerekenGemiddelde", "return", "/", "3"], sample: "public int PuntenCommunicatie { get; set; }\npublic int PuntenProgrammingPrinciples { get; set; }\npublic int PuntenWebTech { get; set; }\npublic double BerekenGemiddelde()\n{\n    return (PuntenCommunicatie + PuntenProgrammingPrinciples + PuntenWebTech) / 3.0;\n}" }
      ]
    }
  ]
};