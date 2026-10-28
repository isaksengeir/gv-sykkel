// Språkbytte NO/EN for Sykkelstyler.
// Appen tegner all tekst på norsk. Dette laget oversetter teksten i DOM-en etter hvert som den tegnes,
// og husker originalen så den kan settes tilbake. Interne nøkler i app.js røres ikke.
// Ny tekst i appen? Legg den i EN (eksakt tekst) eller RULES (tekst med tall/navn i).
(function () {
  const KEY = 'gv-lang';

  // ── Eksakt tekst ──
  const EN = {
    // fargegrupper og farger
    'Klassisk': 'Classic', 'Sort': 'Black', 'Hvit': 'White', 'Elfenben': 'Ivory', 'Krem': 'Cream', 'Kongeblå': 'Royal blue',
    'Midnatt': 'Midnight', 'Racinggrønn': 'Racing green', 'Oliven': 'Olive', 'Bilrød': 'Car red', 'Kirsebær': 'Cherry',
    'Oksblod': 'Oxblood', 'Brun': 'Brown', 'Honning': 'Honey', 'Antikkbrun': 'Antique brown', 'Grafitt': 'Graphite',
    'Sølvgrå': 'Silver grey', 'Populært nå': 'Popular now', 'GV-lilla': 'GV purple', 'Salviegrønn': 'Sage green',
    'Babyblå': 'Baby blue', 'Sjøgrønn': 'Sea green', 'Skifer': 'Slate', 'Sennep': 'Mustard', 'Terrakotta': 'Terracotta',
    'Kobberrød': 'Copper red', 'Støvete rosa': 'Dusty pink', 'Pastellrosa': 'Pastel pink', 'Koboltblå': 'Cobalt blue',
    'Neon og retro': 'Neon and retro', 'Neonrosa': 'Neon pink', 'Neongul': 'Neon yellow', 'Neonoransje': 'Neon orange',
    'Oransje': 'Orange', 'Kanarigul': 'Canary yellow', 'Elektrisk blå': 'Electric blue', 'Turkis': 'Turquoise',
    'Lilla': 'Purple', 'Plomme': 'Plum', 'Anodisert og bling': 'Anodised and bling', '3D-lilla': '3D purple',
    'Fiolett': 'Violet', 'Rosa anod.': 'Pink anod.', 'Turkis anod.': 'Turquoise anod.', 'Blå anod.': 'Blue anod.',
    'Rød anod.': 'Red anod.', 'Oransje anod.': 'Orange anod.', 'Gull anod.': 'Gold anod.', 'Bronse': 'Bronze',
    'Kobber': 'Copper', 'Tinn': 'Pewter', 'Svart': 'Black',
    // overflater
    'Blank lakk': 'Gloss', 'Perlemor': 'Pearl', 'Metallflak': 'Metal flake', 'Matt': 'Matte', 'Krom': 'Chrome',
    'Polert alu': 'Polished alu', 'Børstet alu': 'Brushed alu', 'Gull': 'Gold', 'Anodisert': 'Anodised',
    'Regnbue': 'Rainbow', 'Gummi': 'Rubber', 'Skinn': 'Leather', 'Flettet stål': 'Braided steel',
    // deler
    'Ramme': 'Frame', 'Dekor og hodestamme': 'Decals and head tube', 'Styrelager og spacere': 'Headset and spacers',
    'Gaffel': 'Fork', 'Standrør på dempegaffel': 'Suspension fork stanchions', 'Styre': 'Handlebar',
    'Håndtak og styrebånd': 'Grips and bar tape', 'Hoods (gummi på STI)': 'Hoods (rubber on STI)',
    'Bremsehendler': 'Brake levers', 'Girhendler': 'Shifters', 'Kalipere og bremsearmer': 'Calipers and brake arms',
    'Bremseskiver': 'Brake rotors', 'Wirestrømper': 'Cable housing', 'Bremseslanger': 'Brake hoses',
    'Krankarmer': 'Crank arms', 'Drev (klinge)': 'Chainring', 'Kassett og tannhjul': 'Cassette and cogs',
    'Kjede': 'Chain', 'Girfører': 'Derailleur', 'Pedaler': 'Pedals', 'Felger': 'Rims', 'Eiker': 'Spokes',
    'Nipler': 'Nipples', 'Nav': 'Hubs', 'Setetrekk': 'Saddle cover', 'Setepinne': 'Seatpost',
    'Setepinneklemme': 'Seatpost clamp', 'Dekor 2': 'Decal 2', 'Skjermer': 'Mudguards', 'Kjedebeskytter': 'Chain guard',
    'Støtte': 'Kickstand', 'Flaskeholder': 'Bottle cage', 'Flaske': 'Bottle', 'Ringeklokke': 'Bell',
    'Skruer og muttere': 'Bolts and nuts',
    // rørsett
    'Alu, formet (hydroformet)': 'Alu, shaped (hydroformed)', 'Stål, klassisk': 'Steel, classic',
    'Stål, oversize': 'Steel, oversize', 'Cruiser, kraftige rør': 'Cruiser, heavy tubes',
    'Alu, landevei (formet)': 'Alu, road (shaped)', 'Karbon': 'Carbon',
    // sykkeltyper og stiler
    'Moderne hardtail': 'Modern hardtail', 'Cruiser og klunker': 'Cruiser and klunker', 'Landevei': 'Road',
    'Klassisk racer': 'Classic racer', 'Klassisk stålracer': 'Classic steel racer', 'Strandcruiser': 'Beach cruiser',
    'Klassisk clunker': 'Classic clunker', '90-talls stål-MTB': '90s steel MTB', 'DBS, Diamant o.l.': 'DBS, Diamant etc.',
    'Anslått, typiske mål': 'Estimated, typical measurements', 'Anslått fra bilder': 'Estimated from photos',
    '70- og 80-tallet': '1970s and 80s', 'GT-katalog via BikeInsights': 'GT catalogue via BikeInsights',
    'Electra via forhandler; kjedestag, BB-drop og offset er utledet': 'Electra via dealer; chainstay, BB drop and offset are derived',
    'Merida via BikeInsights (bare S funnet)': 'Merida via BikeInsights (only S found)',
    'Surly via BikeInsights (målt for 29" og 140 mm gaffel; selges med 27,5×2,8)': 'Surly via BikeInsights (measured for 29" and 140 mm fork; sold with 27.5×2.8)',
    // fabrikkfarger
    'Blå med lyseblå og oransje dekor': 'Blue with light blue and orange decals',
    'Bildet ditt av GT Aggressor': 'Your photo of the GT Aggressor',
    'mtbiker.shop (ramme GT Avalanche 1.0)': 'mtbiker.shop (frame GT Avalanche 1.0)',
    'Trek (fargekode i lenken fra BikeInsights)': 'Trek (colour code in the BikeInsights link)',
    'Rabe Bike (Gen 3, 2027-modell)': 'Rabe Bike (Gen 3, 2027 model)',
    'Merida-lenke fra BikeInsights (fargenavn i adressen)': 'Merida link from BikeInsights (colour name in the URL)',
    'Surly-lenke fra BikeInsights (fargenavn i adressen)': 'Surly link from BikeInsights (colour name in the URL)',
    'Sort med oransje': 'Black with orange', 'Rød med kremhvit': 'Red with cream white',
    'Turkis med lilla': 'Turquoise with purple', 'Racinggrønn med kremhvit': 'Racing green with cream white',
    'Typisk klunkerfarge, ikke en bestemt modell': 'Typical klunker colour, not a specific model',
    'Typisk cruiserfarge, ikke en bestemt modell': 'Typical cruiser colour, not a specific model',
    'Typisk 90-tallsfarge, ikke en bestemt modell': 'Typical 90s colour, not a specific model',
    'Typisk farge for klassiske racere, ikke en bestemt modell': 'Typical colour for classic racers, not a specific model',
    // drivverk
    'Trippel krank, klassisk MTB': 'Triple crank, classic MTB', 'Fotbremsnav 1-gir': 'Coaster brake hub, 1-speed',
    'F.eks. Shimano CB-E110': 'E.g. Shimano CB-E110', 'Shimano Nexus 3 med fotbrems': 'Shimano Nexus 3 with coaster brake',
    '2×8 landevei (generisk)': '2×8 road (generic)', 'Trippel krank, 11-34': 'Triple crank, 11-34',
    'Dobbel krank, 11-34': 'Double crank, 11-34', '34T, 10-52, trådløs': '34T, 10-52, wireless',
    'Elektronisk, 2 klinger': 'Electronic, 2 chainrings',
    // styrer
    'Flatt riserstyre': 'Flat riser bar', 'Moto / klunker-styre': 'Moto / klunker bar', 'Generisk': 'Generic',
    'høy og bred': 'tall and wide', 'Cruiserstyre': 'Cruiser bar', 'stor backsweep': 'big backsweep',
    'BMX-styre 9"': 'BMX bar 9"', 'med tverrstag': 'with crossbar', 'Landevei kompakt': 'Road compact',
    'Klassisk rundbøyd': 'Classic round bend',
    // seter
    'MTB-sete': 'MTB saddle', 'B17 med fjærer': 'B17 with springs', 'doble fjærer': 'double springs',
    'Gummi og bomull, ufjæret': 'Rubber and cotton, unsprung', 'Cruisersete': 'Cruiser saddle',
    'bredt med fjærer': 'wide with springs', 'BMX pivotal-sete': 'BMX pivotal saddle', 'slankt': 'slim',
    'Solo / bobber-sete': 'Solo / bobber saddle', 'store fjærer': 'big springs', 'kort nese': 'short nose',
    'utsparing': 'cutout', '3D-printet gitter': '3D-printed lattice', 'karbonskinner': 'carbon rails',
    'kanal i hele lengden': 'full-length channel', 'Kium-skinner': 'Kium rails', 'Landeveissete': 'Road saddle',
    'S-Works Power med Mirror': 'S-Works Power with Mirror', 'Bananasete med sissybar': 'Banana seat with sissy bar', '70-talls stil': '70s style',
    // sidevegger og dekk
    'Mørk tan (tanwall)': 'Dark tan (tanwall)', 'Skinwall / lys tan': 'Skinwall / light tan', 'Creme': 'Cream',
    'Brun med hvit stripe': 'Brown with white stripe', 'Kaffe': 'Coffee', 'Cruiserdekk (generisk)': 'Cruiser tyre (generic)',
    // gafler
    'Karbongaffel': 'Carbon fork', 'Landevei og gravel, konisk': 'Road and gravel, tapered', 'Dempegaffel': 'Suspension fork',
    'Moderne, 32 mm standrør': 'Modern, 32 mm stanchions', '90-talls dempegaffel': '90s suspension fork',
    'Tynne standrør, bøyle og belg': 'Thin stanchions, brace and boots', 'Stiv gaffel': 'Rigid fork',
    'Velg bladform og krone': 'Choose blade shape and crown', 'Truss-gaffel': 'Truss fork',
    'Stiv, med avstivere foran': 'Rigid, with front struts', 'Dobbeltkrone': 'Dual crown',
    'Moto-stil, rette bein': 'Moto style, straight legs', 'Cruiser med fjærer': 'Cruiser with springs',
    'Rette blad': 'Straight blades', 'Buede blad': 'Curved blades', 'Kraftig buet (klunker)': 'Heavily curved (klunker)',
    'Flat krone': 'Flat crown', 'Segmentert': 'Segmented', 'Kraftig klassisk krone': 'Heavy classic crown',
    'Tynne': 'Thin', 'Normale': 'Normal', 'Kraftige': 'Heavy',
    // bremser
    'Hydraulisk skivebrems': 'Hydraulic disc brake', 'Slange, 2 stempler': 'Hose, 2 pistons',
    'Mekanisk skivebrems': 'Mechanical disc brake', 'Wire og arm': 'Cable and arm', 'V-brems': 'V-brake',
    'Felgbrems på sokler': 'Rim brake on bosses', 'Felgbrems med tverrwire': 'Rim brake with straddle cable',
    'Kaliperbrems': 'Caliper brake', 'Felgbrems, sentermontert': 'Rim brake, centre-mounted', 'Trommelbrems': 'Drum brake',
    'I navet': 'In the hub', 'Ingen': 'None', 'F.eks. med fotbremsnav': 'E.g. with a coaster hub',
    'skivebrems': 'disc brake', 'felgbrems': 'rim brake',
    // hendler, stem, krank, pedaler
    'Landevei (STI, brems og gir)': 'Road (STI, brake and shift)', 'Hydraulisk med reservoar': 'Hydraulic with reservoir',
    'MTB wirehendel': 'MTB cable lever', 'Lang klassisk': 'Long classic', 'Krom cruiserhendel': 'Chrome cruiser lever',
    'BMX med kuleende': 'BMX with ball end', 'Integrert styre og stem': 'Integrated bar and stem',
    'Moderne 2-delt': 'Modern 2-piece', 'Firkantaksling, klassisk': 'Square taper, classic',
    'Ett-delt (cruiser)': 'One-piece (cruiser)', 'BMX 3-delt': 'BMX 3-piece', 'Alu flat med pinner': 'Alu flat with pins',
    'Plast plattform': 'Plastic platform', 'Gummiblokk, klassisk': 'Rubber block, classic',
    'Klikk MTB (SPD)': 'Clipless MTB (SPD)', 'Klikk landevei (SPD-SL)': 'Clipless road (SPD-SL)',
    // felger
    'Generisk dobbeltvegg': 'Generic double-wall', 'Generisk dyp V-profil': 'Generic deep V profile',
    'Generisk karbon aero 45 mm': 'Generic carbon aero 45 mm', 'Generisk lav boksfelg': 'Generic low box rim',
    'Landevei og gravel': 'Road and gravel', 'Klassisk og retro': 'Classic and retro', 'forhandler (bikes.com.au)': 'dealer (bikes.com.au)',
    // geometri
    'Styrevinkel': 'Head angle', 'Setevinkel': 'Seat angle', 'Hodestamme': 'Head tube', 'Setestamme': 'Seat tube',
    'Kjedestag': 'Chainstay', 'BB-drop': 'BB drop', 'Gaffeloffset': 'Fork offset',
    'Overrør under setestammetopp': 'Top tube below seat tube top', 'Juster geometri og rammeform': 'Adjust geometry and frame shape',
    'Lag en hvilken som helst sykkel': 'Make any bike you like', 'Hjulstørrelse': 'Wheel size', 'Rørsett': 'Tube set',
    'Setestag': 'Seatstays', 'Vanlig': 'Standard', 'Senket': 'Dropped', 'Overrør': 'Top tube', 'Rett': 'Straight',
    'Buet': 'Curved', 'Skrårør': 'Down tube', 'Forsterkning ved hodestammen': 'Head tube gussets', 'Nei': 'No', 'Ja': 'Yes',
    'Vertikale': 'Vertical', 'Horisontale': 'Horizontal', 'Bremsefester': 'Brake mounts', 'Skive': 'Disc', 'Felg': 'Rim',
    'Begge': 'Both', 'Ingen (fotbrems)': 'None (coaster brake)', 'Skivebremsfeste': 'Disc brake mount',
    'Kabelføring': 'Cable routing', 'Utvendig': 'External', 'Delvis intern': 'Partly internal', 'Intern': 'Internal',
    'Gjennom styrelageret': 'Through the headset', 'Aksel': 'Axle', 'Hurtigkobling': 'Quick release',
    'Gjennomgående': 'Thru-axle', 'Mutter': 'Nut', 'Rund': 'Round', 'Aero (D-formet)': 'Aero (D-shaped)',
    'Delt bladfjær (VCLS)': 'Split leaf spring (VCLS)', 'Seteklemme': 'Seat clamp', 'Skjult': 'Hidden',
    'Flatt overrør': 'Flat top tube', 'Bolter for overrørsveske': 'Top tube bag bolts',
    // faner og kontroller
    'Sykkel': 'Bike', 'Bremser': 'Brakes', 'Drivverk': 'Drivetrain', 'Hjul og dekk': 'Wheels and tyres', 'Sete': 'Saddle',
    'Tilbehør': 'Accessories', 'Dekorstriper': 'Decal stripes', 'Striper ved hodet': 'Stripes at the head tube',
    'Panel på skrårøret': 'Down tube panel', 'Tekst på skrårøret': 'Down tube text',
    'Egen tekst i dekorfargen. Produsentlogoer tegnes ikke.': 'Your own text in the decal colour. Brand logos are not drawn.',
    'Gaffeltype': 'Fork type', 'Bladform': 'Blade shape', 'Krone': 'Crown', 'Tykkelse på beina': 'Leg thickness',
    'Akse til krone, endring': 'Axle to crown, change',
    'Kortere gaffel gir brattere styrevinkel og lavere front.': 'A shorter fork gives a steeper head angle and a lower front.',
    'Flate og høye styrer': 'Flat and tall bars', 'Dropstyrer (landevei og gravel)': 'Drop bars (road and gravel)',
    'Stemlengde': 'Stem length', 'Stemvinkel': 'Stem angle', 'Spacere': 'Spacers', 'Hendler': 'Levers',
    'Dropstyre bruker landeveishendler (STI) med brems og gir i samme hendel.': 'Drop bars use road levers (STI) with brake and shifting in one lever.',
    'Bare forbrems': 'Front brake only', 'Bare bakbrems': 'Rear brake only', 'Skivestørrelse': 'Rotor size',
    'Krank': 'Crank', 'Kranklengde': 'Crank length', 'Antall eiker': 'Spoke count',
    'Setepinne over rammen': 'Seatpost above frame',
    'Tilbehør er av som standard. Legg til det du vil ha med.': 'Accessories are off by default. Add what you want.',
    'Clip-on bak': 'Clip-on rear', 'Fulle skjermer': 'Full mudguards', 'Fulle': 'Full', 'Sidestøtte': 'Side kickstand',
    'Med flaske': 'With bottle', 'Egen farge': 'Custom colour', 'Fabrikkfarger': 'Factory colours',
    'Egen ramme': 'Custom frame', 'Typisk farge for denne typen.': 'Typical colour for this type.',
    'Fargekoden er tilnærmet.': 'The colour code is approximate.',
    'Ingen fabrikkfarge registrert for denne rammen.': 'No factory colour registered for this frame.',
    'Farger og striper, uten produsentlogoer.': 'Colours and stripes, without brand logos.',
    'Bare dekk med farget sidevegg': 'Only tyres with coloured sidewalls', 'Bredde': 'Width', 'Sidevegg': 'Sidewall',
    'Generisk cruiserdekk: finnes fra flere produsenter i disse fargene.': 'Generic cruiser tyre: available from several makers in these colours.',
    'Denne bredden selges bare med sort sidevegg.': 'This width is only sold with a black sidewall.',
    'Prøv en annen bredde eller et annet dekk for tanwall.': 'Try another width or another tyre for tanwall.',
    'Størrelser og sidevegger slik de selges.': 'Sizes and sidewalls as sold.',
    'Schwalbe-dekkene har refleksstripe.': 'The Schwalbe tyres have a reflective stripe.',
    'Velg sykkel': 'Choose bike', 'Formen er anslått.': 'The shape is estimated.', 'Fabrikkfarge:': 'Factory colour:',
    'Standarddelene er typiske for denne typen sykkel.': 'The stock parts are typical for this type of bike.',
    'Bremser foran og bak': 'Front and rear brakes', 'Ulik foran og bak': 'Different front and rear',
    'Setter samme bremsetype foran og bak. Skivene fjernes ved felgbrems, og felgen får bremsebane.': 'Sets the same brake type front and rear. Rotors are removed with rim brakes, and the rim gets a braking surface.',
    'Generisk felgform.': 'Generic rim shape.', 'Merkelogoer tegnes ikke.': 'Brand logos are not drawn.',
    'Denne felgen har ingen bremsebane og passer ikke til felgbrems.': 'This rim has no braking surface and does not work with rim brakes.',
    'Sykler': 'Bikes', 'Søk: merke, modell, gravel, 29 …': 'Search: brand, model, gravel, 29 …',
    'Ingen treff. Prøv merke, modell eller type.': 'No matches. Try brand, model or type.',
    'Søk: Zipp, DT Swiss, ENVE, karbon, 40 mm …': 'Search: Zipp, DT Swiss, ENVE, carbon, 40 mm …',
    'Ingen felger passer søket i denne hjulstørrelsen.': 'No rims match your search in this wheel size.',
    'Tøm søket': 'Clear search', 'Valgt': 'Selected', 'anslått form': 'estimated shape',
    'Egen geometri': 'Custom geometry', 'egen': 'custom', 'justert': 'adjusted', 'standardfarge': 'stock colour',
    // verkstednotater og byggeliste
    'Verkstednotater': 'Workshop notes', 'Ingen ombyggingspunkter.': 'No conversion issues.',
    'Mindre hjul senker krankboksen og gir mer pedalslag mot bakken.': 'Smaller wheels lower the bottom bracket and give more pedal strikes.',
    'Større hjul krever klaring i ramme og gaffel og hever krankboksen.': 'Bigger wheels need clearance in the frame and fork, and raise the bottom bracket.',
    'Felgbremser treffer ikke felgen ved annen hjulstørrelse.': 'Rim brakes won\'t meet the rim with a different wheel size.',
    'Mål klaringen før montering.': 'Measure the clearance before fitting.',
    'Dobbeltkrone: krever lang nok styrerørlengde og stopper for styreutslag, ellers slår beina i overrøret.': 'Dual crown: needs a long enough steerer and steering stops, or the legs will hit the top tube.',
    '90-talls dempegafler har ofte 1 1/8" eller 1" gjenget styrerør og elastomerfjæring; sjekk mål og at elastomerne ikke er stive eller smuldret.': '90s suspension forks often have a 1 1/8" or 1" threaded steerer and elastomer springs; check the sizes and that the elastomers aren\'t stiff or crumbling.',
    'Klassiske buede stålgafler har sjelden skivebremsfeste; se etter en med post mount eller IS-feste.': 'Classic curved steel forks rarely have disc mounts; look for one with post mount or IS mount.',
    'Felgbrems foran krever sokler på gaffelen.': 'A front rim brake needs bosses on the fork.',
    'Springer: de fleste er laget for cruiserrammer og 26". Sjekk hjulstørrelse, styrerørslengde og bremsefeste.': 'Springer: most are made for cruiser frames and 26". Check wheel size, steerer length and brake mount.',
    'Quill-look: et threadless styrerør tar ikke ekte quill-stem. Bruk en ahead-stem med høy rise, eller en quill-adapter.': 'Quill look: a threadless steerer won\'t take a real quill stem. Use a high-rise ahead stem, or a quill adapter.',
    'Skivebrems: rammen eller gaffelen i dette oppsettet har ikke skivebremsfeste.': 'Disc brakes: the frame or fork in this setup has no disc mount.',
    'Felgbrems bak: rammen har ikke sokler for V-brems eller cantilever. Det trengs en adapter eller annen ramme.': 'Rear rim brake: the frame has no bosses for V-brakes or cantilevers. You need an adapter or another frame.',
    'V-brems eller cantilever foran krever en dempegaffel med sokler; de fleste moderne har bare skivefeste.': 'A front V-brake or cantilever needs a suspension fork with bosses; most modern ones only have disc mounts.',
    'Hydrauliske hendler passer bare med hydrauliske bremser.': 'Hydraulic levers only work with hydraulic brakes.',
    'Hydrauliske bremser krever hydrauliske hendler.': 'Hydraulic brakes need hydraulic levers.',
    'Felgbrems krever felg med bremsebane.': 'Rim brakes need a rim with a braking surface.',
    'Ingen bakbrems og ingen fotbrems: sykkelen må ha to uavhengige bremser for å være lovlig på vei.': 'No rear brake and no coaster brake: the bike needs two independent brakes to be road legal.',
    'Vertikale dropouts: singlespeed og girnav krever kjedestrammer, halvlenke eller eksentrisk løsning.': 'Vertical dropouts: singlespeed and hub gears need a chain tensioner, half link or eccentric solution.',
    'Fotbremsnav trenger klemme for bremsearmen på kjedestaget.': 'A coaster hub needs a clamp for the brake arm on the chainstay.',
    'Girnav: sjekk navbredde mot rammens bakre avstand.': 'Hub gears: check the hub width against the frame\'s rear spacing.',
    'Ett-delt krank krever stort krankboks-skall (amerikansk standard); de fleste MTB-rammer har BSA og trenger annen løsning.': 'A one-piece crank needs a large bottom bracket shell (American standard); most MTB frames are BSA and need another solution.',
    'Dropstyre med dempegaffel er uvanlig; vanligvis brukes stiv karbon- eller stålgaffel.': 'Drop bars with a suspension fork are unusual; a rigid carbon or steel fork is the norm.',
    'Landeveis-gir trenger landeveishendler (STI) på dropstyre, eller egne girhendler for flatt styre.': 'Road gearing needs road levers (STI) on drop bars, or separate shifters for a flat bar.',
    'MTB-gir med landeveishendler: trekkforholdet passer ofte ikke. Velg et landeveis- eller gravel-drivverk, eller en adapter.': 'MTB gears with road levers: the cable pull often doesn\'t match. Choose a road or gravel drivetrain, or an adapter.',
    'Nitto Albatross har 25,4 mm klemme; stemmen må passe den.': 'The Nitto Albatross has a 25.4 mm clamp; the stem must match it.',
    'Høyt styre: gir- og bremsekabler må som regel byttes til lengre.': 'High bars: shift and brake cables usually need replacing with longer ones.',
    'Oil slick og regnbue er PVD- eller anodiseringsfinish; på hele rammer er det spesialbestilling.': 'Oil slick and rainbow are PVD or anodised finishes; on whole frames they are a special order.',
    'Sykkelbygg': 'Bike build', 'RAMME': 'FRAME', 'GAFFEL': 'FORK', 'BREMSER': 'BRAKES', 'DRIVVERK': 'DRIVETRAIN',
    'HJUL': 'WHEELS', 'SETE': 'SADDLE', 'SKRUER': 'BOLTS', 'TILBEHØR': 'ACCESSORIES', 'NOTATER': 'NOTES',
    'Geometri': 'Geometry', 'Farge': 'Colour', 'Dekor': 'Decals', 'Styrelager': 'Headset', 'Aksler': 'Axles',
    'Standrør': 'Stanchions', 'Håndtak': 'Grips', 'Foran': 'Front', 'Bak': 'Rear', 'Skiver': 'Rotors',
    'Kalipere/armer': 'Calipers/arms', 'Slanger': 'Hoses', 'Drev': 'Chainring', 'Kassett/tannhjul': 'Cassette/cogs',
    'Dekk': 'Tyres', 'Klemme': 'Clamp', 'Skruer': 'Bolts', 'Kilde': 'Source', 'pinstriping': 'pinstriping',
    // skall: verktøylinje, visninger, foto, byggeliste
    'Behold farge og dekor': 'Keep colour and decals', 'Stiler': 'Styles',
    'Når dette er på, endrer stilene bare deler og delefarger. Rammefarge og dekor blir som før.': 'When this is on, styles only change parts and part colours. Frame colour and decals stay the same.',
    '3D-modell av sykkelen. Dra for å rotere, høyreklikk eller to fingre for å flytte, dobbeltklikk for å zoome inn på en del.': '3D model of the bike. Drag to rotate, right-click or two fingers to pan, double-click to zoom in on a part.',
    'Laster 3D…': 'Loading 3D…',
    'Dra: roter · høyreklikk eller shift: flytt · scroll: zoom · dobbeltklikk: zoom inn på delen': 'Drag: rotate · right-click or shift: pan · scroll: zoom · double-click: zoom in on the part',
    '1 finger: roter · 2 fingre: flytt og zoom': '1 finger: rotate · 2 fingers: pan and zoom',
    'Rendre et fotorealistisk bilde': 'Render a photorealistic image', 'Rendre bilde': 'Render image',
    'Bakgrunn i showroomet': 'Showroom background', 'Rom': 'Room', 'Lilla (GV Sykkel)': 'Purple (GV Sykkel)',
    'Lilla bakgrunn (GV Sykkel)': 'Purple background (GV Sykkel)', 'Svart bakgrunn': 'Black background',
    'Hvit bakgrunn': 'White background',
    'Lyset regnes ut fysisk riktig, og bildet blir skarpere for hver runde. Flytter du kameraet, starter det på nytt.': 'The light is computed physically correctly, and the image gets sharper with each pass. Move the camera and it starts over.',
    'Rendrer': 'Rendering', 'Lagre bilde': 'Save image', 'Avslutt rendring': 'Stop rendering', 'Lukk': 'Close',
    'Kvalitet': 'Quality', 'Rundt 40 sekunder i skjermoppløsning': 'About 40 seconds at screen resolution', 'Rask': 'Fast',
    'Rundt 2 minutter, dobbel oppløsning og dybdeskarphet': 'About 2 minutes, double resolution and depth of field',
    'Beste': 'Best', 'Rundt 5 minutter, høyest oppløsning og flest runder': 'About 5 minutes, highest resolution and most passes',
    'Drivside': 'Drive side', 'Venstre': 'Left', 'Forfra': 'Front', 'Ovenfra': 'Top', 'Snurr': 'Spin',
    'Høy kvalitet': 'High quality', 'Høy kvalitet …': 'High quality …', 'Rask visning': 'Fast view',
    'Forbrems': 'Front brake', 'Bakbrems': 'Rear brake', 'Kassett': 'Cassette', 'Fornav': 'Front hub',
    'Byggeliste': 'Build list', 'Kopier byggeliste': 'Copy build list', 'Navn på bygget': 'Build name',
    'Lagre bygg': 'Save build', 'Last inn': 'Load', 'Slett': 'Delete', 'Angre': 'Undo', 'Fortsett forrige': 'Continue previous',
    'Gjør klar scenen …': 'Preparing the scene …', 'Regner ut lyset …': 'Computing the light …',
    'Rendring feilet': 'Rendering failed',
    'Rendring fungerer ikke i denne nettleseren. Prøv Chrome, Edge eller Safari på en nyere maskin.': 'Rendering doesn\'t work in this browser. Try Chrome, Edge or Safari on a newer computer.',
    'Bildet er ferdig rendret. Trykk «Lagre bilde» for å laste det ned.': 'The image is rendered. Tap “Save image” to download it.',
    'Vent litt, kornet fjernes': 'One moment, removing grain', 'Klarte ikke å lage bildet': 'Couldn\'t create the image',
    'Bildet er lagret': 'Image saved', 'Bildet kunne ikke lagres her': 'The image couldn\'t be saved here',
    'Teksten er markert, kopier manuelt': 'The text is selected, copy it manually',
    'Byggelisten er kopiert': 'Build list copied',
    // GV-rammen rundt appen
    'Til GV Sykkel': 'Back to GV Sykkel', 'Design drømmesykkelen din i 3D.': 'Design your dream bike in 3D.',
    'Design drømmesykkelen din': 'Design your dream bike',
    'Vet du ikke helt hva du vil ha, eller hvordan delene passer sammen? I Sykkelstyler kan du prøve deg fram. De vanligste syklene ligger inne, og du kan justere rammegeometrien så den passer en hvilken som helst sykkel. Bytt deler, farger og dekor, og se resultatet med en gang.': 'Not quite sure what you want, or how the parts fit together? Sykkelstyler lets you try things out. The most common bikes are built in, and you can adjust the frame geometry to match any bike. Swap parts, colours and decals, and see the result straight away.',
    'Vil du ha den bygget?': 'Want it built?',
    'Jeg bygger og bygger om sykler etter ønske. Kopier byggelisten og send den til meg, så ser vi på hva som er mulig.': 'I build and rebuild bikes to order. Copy the build list and send it to me, and we\'ll look at what\'s possible.',
    'Ta kontakt': 'Get in touch', 'Del bygget ditt': 'Share your build',
    'Rendre et bilde av sykkelen og del det med oss på Facebook. Vi vil gjerne se hva du har laget!': 'Render an image of your bike and share it with us on Facebook. We\'d love to see what you\'ve made!',
    'GV Sykkel på Facebook': 'GV Sykkel on Facebook', 'Ser du noe som mangler?': 'Something missing?',
    'Savner du en sykkel, en del eller en farge? Ta gjerne kontakt, så ser jeg på det.': 'Missing a bike, a part or a colour? Get in touch and I\'ll take a look.',
    'Gi beskjed': 'Let me know', 'Språk': 'Language',
  };

  // ── Tekst med tall eller navn i. Rekkefølgen betyr noe. ──
  // f(...grupper) returnerer engelsk; bruk T() på deler som også skal oversettes.
  const RULES = [
    [/^(.+) \(justert\)$/, a => `${T(a)} (adjusted)`],
    [/^(.+)-stil$/, a => `${a} style`],
    [/^str\. (.+)$/, a => `size ${a}`],
    [/^(\d+)-gir nav$/, a => `${a}-speed hub`],
    [/^(\d×\d+) kjedegir$/, a => `${a} derailleur gears`],
    [/^(.+) klemme$/, a => `${a} clamp`],
    [/^Butikkannonser \((.+)\)$/, a => `Shop listings (${a})`],
    [/^(.+) \(ytre bredde ikke oppgitt\)$/, a => `${a} (outer width not given)`],
    [/^(.+) mm dyp$/, a => `${a} mm deep`],
    [/^(.+) mm indre$/, a => `${a} mm inner`],
    [/^(.+) mm ytre$/, a => `${a} mm outer`],
    [/^(.+) mot dekorfargen$/, a => `${T(a)} fading to the decal colour`],
    [/^(.+) sidevegg$/, a => `${T(a)} sidewall`],
    [/^(.+) bein$/, a => `${T(a)} legs`],
    [/^Ikke i (.+)$/, a => `Not in ${a}`],
    [/^(\d+) modeller og typer$/, a => `${a} models and types`],
    [/^(\d+) felger i (.+)$/, (a, b) => `${a} rims in ${b}`],
    [/^Rammen er laget for (.+)$/, a => `Frame is made for ${a}`],
    [/^Dekk for (.+) hjul$/, a => `Tyres for ${a} wheels`],
    [/^Produsentens farger: (.+)\.$/, a => `Manufacturer colours: ${T(a)}.`],
    [/^(.+) har egen farge\. Trykk en fargeprøve for å gå over til lakk\.$/, a => `${T(a)} has its own colour. Tap a swatch to switch to paint.`],
    [/^Bruk (.+)$/, a => `Use ${T(a)}`],
    [/^Egen geometri, justert fra (.+)$/, a => `Custom geometry, adjusted from ${a === 'ukjent' ? 'unknown' : T(a)}`],
    [/^Geometri: (.+)$/, a => `Geometry: ${T(a)}`],
    [/^Standarddeler: (.+)\. Dekk og deler vises med nærmeste modell i appen\.$/, a => `Stock parts: ${parts(a)}. Tyres and parts are shown using the closest model in the app.`],
    [/^Mål fra (.+)\.$/, a => `Measurements from ${T(a)}.`],
    [/^Listen viser felger som finnes i (.+)\.$/, a => `The list shows rims available in ${a}.`],
    [/^(\(typisk farge\))?\. Kilde: (.+)\. Fargekoden er tilnærmet\.$/, (a, b) => `${a ? '(typical colour)' : ''}. Source: ${T(b)}. The colour code is approximate.`],
    [/^(Typisk farge for denne typen\. )?Kilde: (.+)\. Fargekoden er tilnærmet\.$/, (a, b) => `${a ? 'Typical colour for this type. ' : ''}Source: ${T(b)}. The colour code is approximate.`],
    [/^Felgen er byttet til (.+) med bremsebane\.$/, a => `The rim was changed to ${T(a)} with a braking surface.`],
    // verkstednotater
    [/^(.+) er laget for skivebrems og har ingen bremsebane\. Velg en felg med bremsebane eller bytt til skivebrems\.$/, a => `${a} is made for disc brakes and has no braking surface. Choose a rim with a braking surface or switch to disc brakes.`],
    [/^Hjulstørrelsen er endret fra (.+) til (.+)\.$/, (a, b) => `Wheel size changed from ${a} to ${b}.`],
    [/^(.+): geometrien er anslått, ikke hentet fra produsent\.$/, a => `${T(a)}: the geometry is estimated, not taken from the manufacturer.`],
    [/^(.+) er bredere enn (.+) er laget for\.$/, (a, b) => `${a} is wider than the ${T(b)} is made for.`],
    [/^Maks er (.+) \((.+)\)\.$/, (a, b) => `Max is ${a} (${T(b)}).`],
    [/^(.+) er trolig bredere enn rammen er laget for \(anslått maks (.+)\)\.$/, (a, b) => `${a} is probably wider than the frame is made for (estimated max ${b}).`],
    [/^Gaffelen er (\d+) mm (kortere|lengre) enn originalen\.$/, (a, b) => `The fork is ${a} mm ${b === 'kortere' ? 'shorter' : 'longer'} than the original.`],
    [/^Effektiv styrevinkel blir (.+) \(fra (.+)\)\.$/, (a, b) => `Effective head angle becomes ${a} (from ${b}).`],
    [/^(.+) med (.+) dekk trenger lengre akse-til-krone enn rammen er tegnet for\.$/, (a, b) => `${T(a)} with ${b} tyres needs a longer axle-to-crown than the frame is designed for.`],
    [/^Fronten er hevet (\d+) mm, og styrevinkelen blir (.+)\.$/, (a, b) => `The front is raised ${a} mm, and the head angle becomes ${b}.`],
    [/^1×-drivverk: krever krank med smal-bred klinge og nav med riktig frihjulskropp for (\d+)-gir \(HG, Micro Spline eller XD\)\.$/, a => `1× drivetrain: needs a crank with a narrow-wide chainring and a hub with the right freehub body for ${a}-speed (HG, Micro Spline or XD).`],
    [/^Kassett opp til (\d+)T krever girfører laget for det spennet\.$/, a => `A cassette up to ${a}T needs a derailleur made for that range.`],
    [/^(.+) dekk: sjekk klaring mot stag og gaffelbue\.$/, a => `${a} tyres: check clearance at the stays and fork crown.`],
    // byggeliste
    [/^- (.+)$/, a => `- ${T(a)}`],
    [/^dekor 2 (.+)$/, a => `decal 2 ${T(a)}`],
    [/^tekst (.+)$/, a => `text ${a}`],
    [/^(post|flat) mount bremsefeste$/, a => `${a} mount brakes`],
    [/^([+-]?\d+) mm akse-krone$/, a => `${a} mm axle-to-crown`],
    [/^(\d+) mm spacere$/, a => `${a} mm spacers`],
    [/^girhendler (.+)$/, a => `shifters ${T(a)}`],
    [/^styrebånd (.+)$/, a => `bar tape ${T(a)}`],
    [/^flaske (.+)$/, a => `bottle ${T(a)}`],
    [/^(\d+) stk$/, a => `${a} pcs`],
    // foto
    [/^Fjerner korn · (.+)$/, a => `Removing grain · ${a}`],
    [/^✓ Ferdig · (.+)$/, a => `✓ Done · ${a}`],
    [/^Regner ut lyset · (.+)$/, a => `Computing the light · ${a}`],
    [/^(.+) · ca\. (.+) igjen$/, (a, b) => `${a} · approx. ${b} left`],
    [/^3D kunne ikke startes: (.+)$/, a => `3D could not start: ${a}`],
    // lagring
    [/^Bygg (\d+)$/, a => `Build ${a}`],
    [/^(.+) er lagret til siden lukkes\. Nettleseren tillater ikke varig lagring her$/, a => `${T(a)} is saved until the page is closed. The browser doesn't allow permanent storage here`],
    [/^(.+) er lagret$/, a => `${T(a)} saved`],
    [/^(.+) lastet$/, a => `${T(a)} loaded`],
    [/^Startet med (.+)$/, a => `Started with ${T(a)}`],
  ];
  // Regler som bare gjelder meldingene nederst (snackbar): for generelle til å brukes overalt
  const SNACK = [
    [/^(.+) lagt på (.+)\. Farge og dekor er beholdt$/, (a, b) => `${T(a)} applied to ${T(b)}. Colour and decals kept`],
    [/^(.+) lagt på (.+) med stilens farger og dekor$/, (a, b) => `${T(a)} applied to ${T(b)} with the style's colours and decals`],
    [/^(.+) lagt på$/, a => `${T(a)} applied`],
    [/^(.+) foran og bak\.(.*)$/, (a, b) => `${T(a)} front and rear.${b ? ' ' + T(b.trim()) : ''}`],
    [/^(.+) i (.+)$/, (a, b) => `${T(a)} in ${T(b)}`],
  ];
  const PARTS_W = [[/hydraulisk skive/g, 'hydraulic disc'], [/mekanisk skive/g, 'mechanical disc'], [/hydraulisk/g, 'hydraulic'],
    [/karbonfelger/g, 'carbon rims'], [/svart styrebånd/g, 'black bar tape']];
  const parts = s => PARTS_W.reduce((t, [re, r]) => t.replace(re, r), s);

  const LC = {};
  for (const k in EN) { const l = k.toLowerCase(); if (!(l in LC)) LC[l] = EN[k]; }

  // Ett nivå med oppdeling om gangen: linjer, setninger, «Etikett: verdi», · , / og parenteser
  const SPLITS = [/(\n)/, /(?<=\.)( )(?=[A-ZÆØÅ"«(])/, /^([^:]{1,40}): (.+)$/, /( · )/, /(, )/, /( \/ )/];

  function exact(s) {
    if (Object.prototype.hasOwnProperty.call(EN, s)) return EN[s];
    const l = s.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(LC, l)) {
      const e = LC[l];
      return s[0] !== s[0].toUpperCase() ? e[0].toLowerCase() + e.slice(1) : e;
    }
    return null;
  }
  function rules(s, list) {
    for (const [re, f] of list) { const m = s.match(re); if (m) return f(...m.slice(1)); }
    return null;
  }
  // T: oversett én tekst. Ukjent tekst returneres uendret.
  function T(s, ctx) {
    if (!s || !/[A-Za-zÆØÅæøå]/.test(s)) return s;
    const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
    const core = s.slice(lead.length, s.length - trail.length);
    let r = exact(core);
    if (r === null && ctx === 'snack') r = rules(core, SNACK);
    if (r === null) r = rules(core, RULES);
    if (r === null) r = split(core);
    if (r === null) {
      const m = core.match(/^(.*?) \(([^()]+)\)$/);   // «Navn (detalj)»
      if (m) { const a = T(m[1]), b = T(m[2]); if (a !== m[1] || b !== m[2]) r = `${a} (${b})`; }
    }
    if (r === null) r = core;
    return lead + r + trail;
  }
  function split(s) {
    for (const re of SPLITS) {
      if (re.source.startsWith('^')) {
        const m = s.match(re); if (!m) continue;
        const a = T(m[1]), b = T(m[2]);
        if (a !== m[1] || b !== m[2]) return `${a}: ${b}`;
        continue;
      }
      if (!re.test(s)) continue;
      const parts = splitTop(s, re);
      if (parts.length < 2) continue;
      let changed = false;
      const out = parts.map(p => { if (re.test(p) && p.trim().length <= 3) return p; const t = T(p); if (t !== p) changed = true; return t; });
      if (changed) return out.join('');
    }
    return null;
  }
  // del bare utenfor parenteser, så «Landevei (STI, brems og gir)» holdes samlet
  function splitTop(s, re) {
    const raw = s.split(re), out = [];
    let depth = 0;
    for (const p of raw) {
      if (depth > 0 && out.length) out[out.length - 1] += p; else out.push(p);
      for (const ch of p) { if (ch === '(') depth++; else if (ch === ')') depth = Math.max(0, depth - 1); }
    }
    return out;
  }
  // desimalkomma blir punktum på engelsk: 27,5 → 27.5
  const fix = s => s.replace(/(\d),(\d)/g, '$1.$2').replace(/\bca\. /g, 'approx. ');

  // ── DOM ──
  const ATTRS = ['title', 'aria-label', 'placeholder', 'data-label'];
  const textMem = new WeakMap(), attrMem = new WeakMap();
  let lang = 'no';
  try { const v = localStorage.getItem(KEY); if (v === 'en' || v === 'no') lang = v; } catch (e) {}

  const skip = n => { const p = n.parentElement; return !p || /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.tagName) || p.closest('[data-noi18n]'); };
  const ctxOf = n => (n.parentElement && n.parentElement.closest('#snack') ? 'snack' : '');

  function doText(n) {
    if (skip(n)) return;
    let m = textMem.get(n);
    if (lang === 'en') {
      if (m && n.data === m.en) return;
      const en = fix(T(n.data, ctxOf(n)));
      m = { no: n.data, en }; textMem.set(n, m);
      if (en !== n.data) n.data = en;
    } else if (m && n.data === m.en) n.data = m.no;
  }
  function doAttr(el, a) {
    if (!el.hasAttribute(a) || el.closest('[data-noi18n]')) return;
    let mem = attrMem.get(el); if (!mem) attrMem.set(el, mem = {});
    const v = el.getAttribute(a), m = mem[a];
    if (lang === 'en') {
      if (m && v === m.en) return;
      const en = fix(T(v)); mem[a] = { no: v, en };
      if (en !== v) el.setAttribute(a, en);
    } else if (m && v === m.en) el.setAttribute(a, m.no);
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    for (const a of ATTRS) doAttr(root, a);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = tw.nextNode())) { if (n.nodeType === 3) doText(n); else for (const a of ATTRS) doAttr(n, a); }
  }

  const obs = new MutationObserver(list => {
    obs.disconnect();
    for (const mu of list) {
      if (mu.type === 'characterData') doText(mu.target);
      else if (mu.type === 'attributes') doAttr(mu.target, mu.attributeName);
      else mu.addedNodes.forEach(walk);
    }
    start();
  });
  const start = () => obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });

  const TITLE = { no: 'Sykkelstyler – design drømmesykkelen din | GV Sykkel', en: 'Sykkelstyler – design your dream bike | GV Sykkel' };
  function setLang(l) {
    lang = l === 'en' ? 'en' : 'no';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    document.title = TITLE[lang];
    obs.disconnect(); walk(document.body); start();
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }
  window.gvI18n = { T: s => fix(T(s)), setLang, get lang() { return lang; } };

  function init() {
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
    setLang(lang);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
