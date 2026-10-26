import * as THREE from 'three';
const V3=THREE.Vector3, D2R=Math.PI/180;
const P_=(m,c='#141516')=>({m,c});

/* ===================== DATA ===================== */
const PALETTE=[
 {g:'Klassisk',c:[['#141516','Sort'],['#f2efe6','Hvit'],['#ece4cf','Elfenben'],['#e3d3a8','Krem'],['#1f3a6b','Kongeblå'],['#2a2d4a','Midnatt'],['#0f4d3a','Racinggrønn'],['#5b6338','Oliven'],
   ['#c2302a','Bilrød'],['#8c1f24','Kirsebær'],['#5e1d1f','Oksblod'],['#6b4325','Brun'],['#9a5a24','Honning'],['#4e2e1c','Antikkbrun'],['#3a3d3a','Grafitt'],['#6f767c','Gunmetal'],['#a9adb0','Sølvgrå']]},
 {g:'Populært nå',c:[['#7B2FBE','GV-lilla'],['#9caf88','Salviegrønn'],['#88d1c4','Celeste'],['#8cb8d8','Babyblå'],['#9fd3bf','Mint'],['#5f9e8a','Sjøgrønn'],['#4c5a66','Skifer'],['#b8a77c','Khaki'],
   ['#c9b48a','Sand'],['#d9b23a','Sennep'],['#c2643f','Terrakotta'],['#b5452c','Kobberrød'],['#c98b8b','Støvete rosa'],['#e8a3a8','Pastellrosa'],['#2d55a0','Koboltblå']]},
 {g:'Neon og retro',c:[['#ff1f8e','Hot pink'],['#ff5fb0','Neonrosa'],['#e8ff2a','Neongul'],['#8be02a','Lime'],['#ff6a13','Neonoransje'],['#e0782f','Oransje'],['#efc840','Kanarigul'],
   ['#1f6bff','Elektrisk blå'],['#1aa39a','Teal'],['#5fb3b8','Turkis'],['#6a2d91','Lilla'],['#6b3f7a','Plomme']]},
 {g:'Anodisert og bling',c:[['#6b2fd6','3D-lilla'],['#8e44d8','Fiolett'],['#e0408a','Rosa anod.'],['#1f9fb0','Turkis anod.'],['#2f5fd0','Blå anod.'],['#d02a2a','Rød anod.'],
   ['#e07020','Oransje anod.'],['#c9a24a','Gull anod.'],['#8c6a3a','Bronse'],['#a8632e','Kobber'],['#4a4d52','Gunsmoke'],['#7d8288','Tinn']]}];
const CLASSIC=PALETTE.flatMap(g=>g.c);
const FINL={gloss:'Blank lakk',metallic:'Metallic',pearl:'Perlemor',flake:'Metallflak',candy:'Candy',satin:'Satin',matt:'Matt',fade:'Fade',
 chrome:'Krom',alu:'Polert alu',brushed:'Børstet alu',gold:'Gull',anod:'Anodisert',oil:'Oil slick',rainbow:'Regnbue',
 rubber:'Gummi',leather:'Skinn',vinyl:'Vinyl',braided:'Flettet stål'};
const NOCOLOR=['chrome','alu','brushed','gold','oil','rainbow','braided'];
const F_PAINT=['gloss','metallic','pearl','flake','candy','satin','matt','fade','chrome','alu','brushed','oil','rainbow'];
const F_METAL=['chrome','alu','brushed','gold','anod','gloss','satin','matt','oil','rainbow'];
const F_CABLE=['gloss','matt','braided','chrome','gold','anod','oil','rainbow'];
const PARTS={
 frame:{n:'Ramme',f:F_PAINT},accent:{n:'Dekor og hodestamme',f:['gloss','metallic','candy','matt','chrome','gold','oil','rainbow']},
 headset:{n:'Styrelager og spacere',f:F_METAL},fork:{n:'Gaffel',f:F_PAINT.concat(['gold','anod'])},stanch:{n:'Standrør på dempegaffel',f:['chrome','gold','anod','matt','gloss']},
 stem:{n:'Stem',f:F_METAL},bar:{n:'Styre',f:F_METAL},grips:{n:'Håndtak og styrebånd',f:['rubber','leather','vinyl']},hoods:{n:'Hoods (gummi på STI)',f:['rubber']},blevers:{n:'Bremsehendler',f:F_METAL},levers:{n:'Girhendler',f:F_METAL},
 calipers:{n:'Kalipere og bremsearmer',f:F_METAL},rotors:{n:'Bremseskiver',f:['alu','brushed','chrome','gold','anod','matt','oil','rainbow']},
 housing:{n:'Wirestrømper',f:F_CABLE},hose:{n:'Bremseslanger',f:F_CABLE},
 crank:{n:'Krankarmer',f:F_METAL},ring:{n:'Drev (klinge)',f:F_METAL},cassette:{n:'Kassett og tannhjul',f:F_METAL},chain:{n:'Kjede',f:['alu','chrome','gold','anod','matt','oil','rainbow']},
 der:{n:'Girfører',f:F_METAL},pedals:{n:'Pedaler',f:F_METAL},
 rims:{n:'Felger',f:F_METAL},spokes:{n:'Eiker',f:['alu','chrome','matt','gold','anod','oil','rainbow']},nipples:{n:'Nipler',f:['alu','chrome','gold','anod','matt','oil','rainbow']},hubs:{n:'Nav',f:F_METAL},
 saddle:{n:'Setetrekk',f:['leather','vinyl','matt','gloss','chrome','oil','rainbow']},post:{n:'Setepinne',f:F_METAL},clamp:{n:'Setepinneklemme',f:F_METAL},
 decal2:{n:'Dekor 2',f:['gloss','metallic','candy','matt','chrome','gold','oil','rainbow']},
 fender:{n:'Skjermer',f:F_PAINT},guard:{n:'Kjedebeskytter',f:F_PAINT},kick:{n:'Støtte',f:F_METAL},cage:{n:'Flaskeholder',f:F_METAL},bottle:{n:'Flaske',f:['gloss','matt','alu','chrome','anod']},bell:{n:'Ringeklokke',f:F_METAL},bolts:{n:'Skruer og muttere',f:['chrome','alu','gold','anod','matt','oil','rainbow']}};

const TUBESETS={
 alu:{n:'Alu, oversize',ht:.044,htB:.044,tt:.036,dt:.046,oval:1.25,st:.0349,cs:.021,ss:.017},
 aluT:{prof:'hydro',k:1,n:'Alu, formet (hydroformet)',ht:.046,htB:.056,tt:.038,dt:.05,oval:1.2,st:.0349,cs:.022,ss:.017},
 steel:{n:'Stål, klassisk',ht:.034,htB:.034,tt:.0254,dt:.0286,oval:1,st:.0286,cs:.019,ss:.016},
 steelOS:{n:'Stål, oversize',ht:.044,htB:.044,tt:.0318,dt:.0349,oval:1,st:.0318,cs:.02,ss:.016},
 cruiser:{n:'Cruiser, kraftige rør',ht:.042,htB:.042,tt:.034,dt:.042,oval:1,st:.0318,cs:.02,ss:.018},
 aluRoad:{prof:'hydro',k:.86,n:'Alu, landevei (formet)',ht:.042,htB:.05,tt:.034,dt:.042,oval:1.15,st:.031,cs:.02,ss:.015},
 carbon:{prof:'carbon',k:1,n:'Karbon',ht:.046,htB:.058,tt:.04,dt:.052,oval:1.3,st:.034,cs:.022,ss:.016}};
const BIKES={
 aggressor:{tw:2.25,g:'Moderne hardtail',n:'GT Aggressor 27,5',y:'2021, str. M',src:'GT via BikeInsights',wheel:'27.5',stack:.584,reach:.42,ha:68,sa:73.5,ht:.13,st:.46,cs:.44,drop:.04,offset:.042,ttJoin:.07,tubes:'alu',stays:'triple',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 gt26:{tw:2.1,g:'Retro MTB',n:'GT Avalanche 1.0 26',y:'2010, str. M',src:'GT-katalog via BikeInsights',wheel:'26',stack:.605,reach:.398,ha:71,sa:73.5,ht:.13,st:.466,cs:.42,drop:.035,offset:.041,ttJoin:.08,tubes:'alu',stays:'triple',tt:'straight',dt:'straight',gussets:false,mounts:'both',dropouts:'vert'},
 xcal:{tw:2.2,g:'Moderne hardtail',n:'Trek X-Caliber 7 29',y:'2016, str. M',src:'Trek via BikeInsights',wheel:'29',stack:.6,reach:.413,ha:69.3,sa:72.5,ht:.1,st:.419,cs:.445,drop:.053,offset:.051,ttJoin:.08,tubes:'aluT',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 rockhopper:{tw:2.35,g:'Moderne hardtail',n:'Specialized Rockhopper 27,5',y:'2023, str. M',src:'Specialized via BikeInsights',wheel:'27.5',stack:.589,reach:.415,ha:68,sa:73.5,ht:.105,st:.4,cs:.44,drop:.043,offset:.042,ttJoin:.06,tubes:'aluT',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 blast:{tw:2.1,g:'Retro MTB',n:'Kona Blast 26',y:'2011, 19"',src:'Kona via BikeInsights',wheel:'26',stack:.6194,reach:.4151,ha:68.5,sa:71.5,ht:.155,st:.4826,cs:.42,drop:.0323,offset:.039,ttJoin:.08,tubes:'alu',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'both',dropouts:'vert'},
 electra:{tw:2.15,g:'Cruiser og klunker',n:'Electra Cruiser 1',y:'26", step-over',src:'Electra via forhandler; kjedestag, BB-drop og offset er utledet',wheel:'26',stack:.558,reach:.392,ha:67,sa:67,ht:.17,st:.479,cs:.551,drop:.07,offset:.045,ttJoin:.06,tubes:'cruiser',stays:'std',tt:'bow',dt:'bow',gussets:false,mounts:'coaster',dropouts:'horiz'},
 retro90:{g:'Retro MTB',n:'90-talls stål-MTB',y:'DBS, Diamant o.l.',src:'Anslått, typiske mål',est:true,wheel:'26',stack:.56,reach:.4,ha:71,sa:73,ht:.11,st:.47,cs:.43,drop:.055,offset:.04,ttJoin:.03,tubes:'steel',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'rim',dropouts:'vert'},
 klunker:{g:'Cruiser og klunker',n:'Klunker, twin laterals',y:'Breezer-stil',src:'Anslått fra bilder',est:true,wheel:'26',stack:.58,reach:.41,ha:68,sa:70,ht:.14,st:.5,cs:.46,drop:.065,offset:.045,ttJoin:.03,tubes:'steel',stays:'twinlat',tt:'straight',dt:'straight',gussets:false,mounts:'rim',dropouts:'horiz'},
 cantilever:{g:'Cruiser og klunker',n:'Cantilever cruiser',y:'Schwinn-stil',src:'Anslått fra bilder',est:true,wheel:'26',stack:.55,reach:.39,ha:68,sa:68,ht:.16,st:.46,cs:.48,drop:.07,offset:.045,ttJoin:.05,tubes:'cruiser',stays:'cantilever',tt:'straight',dt:'bow',gussets:false,mounts:'coaster',dropouts:'horiz'},
 bmx29:{g:'Cruiser og klunker',n:'BMX-cruiser 29',y:'SE Big Ripper-stil',src:'Anslått fra bilder',est:true,wheel:'29',stack:.6,reach:.43,ha:72,sa:71,ht:.15,st:.42,cs:.43,drop:.035,offset:.045,ttJoin:.03,tubes:'steelOS',stays:'std',tt:'straight',dt:'straight',gussets:true,mounts:'rim',dropouts:'horiz'}};
Object.assign(BIKES,{
 kaius:{tw:40,g:'Gravel',kit:'Gravel',n:'BMC Kaius 01',y:'2026, str. 56',src:'BMC via BikeInsights',wheel:'29',stack:.581,reach:.4,ha:71.6,sa:73.8,ht:.147,st:.485,cs:.425,drop:.079,offset:.045,ttJoin:.06,tubes:'carbon',stays:'dropped',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 checkpoint:{tw:40,g:'Gravel',kit:'Gravel',n:'Trek Checkpoint ALR 5',y:'2025, str. 56',src:'Trek via BikeInsights',wheel:'29',stack:.592,reach:.407,ha:72.2,sa:72.8,ht:.145,st:.56,cs:.435,drop:.076,offset:.0448,ttJoin:.07,tubes:'aluRoad',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 allez:{tw:30,g:'Landevei',kit:'Landevei',n:'Specialized Allez Sport',y:'2023, str. 56',src:'Specialized via BikeInsights',wheel:'29',stack:.59,reach:.378,ha:72.5,sa:73.25,ht:.175,st:.53,cs:.425,drop:.076,offset:.047,ttJoin:.04,tubes:'aluRoad',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 steelroad:{tw:25,g:'Landevei',kit:'Klassisk racer',n:'Klassisk stålracer',y:'70- og 80-tallet',src:'Anslått, typiske mål',est:true,wheel:'29',stack:.55,reach:.385,ha:73,sa:73,ht:.135,st:.56,cs:.42,drop:.07,offset:.045,ttJoin:.02,tubes:'steel',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'rim',dropouts:'horiz'}});
Object.assign(BIKES,{
 marlin7:{tw:2.4,g:'Moderne hardtail',n:'Trek Marlin 7 Gen 3',y:'Gen 3, str. M',src:'BikeInsights (Trek Gen 3, 2023)',wheel:'29',stack:.609,reach:.44,ha:66.5,sa:73.4,ht:.105,st:.42,cs:.438,drop:.06,offset:.046,ttJoin:.07,tubes:'aluT',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 talon29:{tw:2.4,g:'Moderne hardtail',n:'Giant Talon 29',y:'2022, str. M',src:'Giant via BikeInsights',wheel:'29',stack:.611,reach:.424,ha:68.5,sa:74,ht:.105,st:.44,cs:.455,drop:.055,offset:.051,ttJoin:.07,tubes:'aluT',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 grandcanyon:{tw:2.4,g:'Moderne hardtail',n:'Canyon Grand Canyon',y:'2024, str. M',src:'Canyon via BikeInsights',wheel:'29',stack:.626,reach:.435,ha:67.5,sa:74,ht:.1,st:.44,cs:.428,drop:.065,offset:.0551,ttJoin:.08,tubes:'aluT',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 bignine:{tw:2.4,g:'Moderne hardtail',n:'Merida Big.Nine 10K',y:'2024, str. S',src:'Merida via BikeInsights (bare S funnet)',wheel:'29',stack:.606,reach:.432,ha:68,sa:75.3,ht:.095,st:.38,cs:.43,drop:.065,offset:.0439,ttJoin:.06,tubes:'carbon',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 karate:{tw:2.8,g:'Moderne hardtail',n:'Surly Karate Monkey',y:'2024, 27,5+, str. MD',src:'Surly via BikeInsights (målt for 29" og 140 mm gaffel; selges med 27,5×2,8)',wheel:'27.5',stack:.602,reach:.421,ha:68,sa:72,ht:.1,st:.419,cs:.423,drop:.051,offset:.044,ttJoin:.05,tubes:'steelOS',stays:'std',tt:'straight',dt:'straight',gussets:true,mounts:'disc',dropouts:'horiz'},
 diverge:{tw:38,g:'Gravel',kit:'Gravel',n:'Specialized Diverge E5 Elite',y:'2024, str. 56',src:'Specialized via BikeInsights',wheel:'29',stack:.599,reach:.392,ha:71.75,sa:73.5,ht:.175,st:.5,cs:.432,drop:.08,offset:.0554,ttJoin:.07,tubes:'aluRoad',stays:'dropped',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 grizl:{tw:45,g:'Gravel',kit:'Gravel',n:'Canyon Grizl 6',y:'2024, str. M',src:'Canyon via BikeInsights',wheel:'29',stack:.579,reach:.402,ha:71.5,sa:73.5,ht:.141,st:.522,cs:.435,drop:.075,offset:.045,ttJoin:.07,tubes:'aluRoad',stays:'dropped',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 topstone:{tw:37,g:'Gravel',kit:'Gravel',n:'Cannondale Topstone Alloy 2',y:'2022, str. M',src:'Cannondale via BikeInsights',wheel:'29',stack:.579,reach:.385,ha:71,sa:73.1,ht:.147,st:.505,cs:.435,drop:.075,offset:.055,ttJoin:.07,tubes:'aluRoad',stays:'dropped',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'},
 domane:{tw:32,g:'Landevei',kit:'Landevei',n:'Trek Domane AL 2 Gen 3',y:'2023, str. 56',src:'Trek via BikeInsights',wheel:'29',stack:.591,reach:.377,ha:71.9,sa:73.3,ht:.175,st:.525,cs:.42,drop:.078,offset:.048,ttJoin:.04,tubes:'aluRoad',stays:'std',tt:'straight',dt:'straight',gussets:false,mounts:'disc',dropouts:'vert'}});
// fabrikkfarger: fargenavn fra kilde, fargekoden er min tilnærming. typical:true = typisk farge for typen, ikke en bestemt modell
const FAC=(frame,accent,decal2,o={})=>({p:{frame,accent,decal2:decal2||accent,...(o.fork?{fork:o.fork}:{})},decalStyle:o.ds||'none',name:o.name,src:o.src,typical:!!o.typical});
const G_=c=>P_('gloss',c),Mt=c=>P_('matt',c),St=c=>P_('satin',c),Me=c=>P_('metallic',c),Pe=c=>P_('pearl',c);
const FACTORY={
 aggressor:FAC(G_('#1f3a6b'),G_('#8cb8d8'),G_('#e0782f'),{ds:'stripes',name:'Blå med lyseblå og oransje dekor',src:'Bildet ditt av GT Aggressor'}),
 gt26:FAC(St('#1c1d1f'),G_('#f2efe6'),G_('#f2efe6'),{name:'Satin Black',src:'mtbiker.shop (ramme GT Avalanche 1.0)'}),
 xcal:FAC(Mt('#141516'),G_('#1aa39a'),G_('#1aa39a'),{ds:'stripes',name:'Black / Teal',src:'Trek (fargekode i lenken fra BikeInsights)'}),
 rockhopper:FAC(G_('#e7e1d4'),G_('#8b7d6b'),G_('#8b7d6b'),{name:'Gloss Birch / Taupe',src:'Butikkannonser (Goodwynns, Velonova)'}),
 marlin7:FAC(Mt('#22262e'),G_('#3a3f48'),G_('#3a3f48'),{name:'Matte Dark Web / Clear Gloss',src:'Rabe Bike (Gen 3, 2027-modell)'}),
 talon29:FAC(G_('#c8102e'),G_('#141516'),G_('#141516'),{name:'Pure Red',src:'Butikkannonser (Bums on the Saddle, Edinburgh Bicycle)'}),
 grandcanyon:FAC(G_('#c8202b'),G_('#141516'),G_('#141516'),{name:'Radiant Red',src:'99spokes (Grand Canyon 7, 2024)'}),
 bignine:FAC(St('#8f979c'),G_('#141516'),G_('#141516'),{name:'Cool Grey',src:'Merida-lenke fra BikeInsights (fargenavn i adressen)'}),
 karate:FAC(G_('#f2a48a'),G_('#f2efe6'),G_('#f2efe6'),{name:'Peach Salmon Sundae',src:'Surly-lenke fra BikeInsights (fargenavn i adressen)'}),
 blast:FAC(G_('#141516'),G_('#c2302a'),G_('#f2efe6'),{ds:'stripes',name:'Black / Red / White',src:'BikeRoar (2011)'}),
 electra:FAC(Mt('#1a1a1a'),G_('#ece4cf'),G_('#ece4cf'),{name:'Matte Black',src:'Butikkannonser (Incycle, Virgin Megastore)'}),
 kaius:FAC(Mt('#a39e95'),G_('#141516'),G_('#141516'),{fork:Mt('#a39e95'),name:'Stone Grey',src:'Revolution Bike Shop (Kaius 01 Three, 2026)'}),
 checkpoint:FAC(Pe('#8e9399'),G_('#141516'),G_('#141516'),{fork:Pe('#8e9399'),name:'Plasma Grey Pearl',src:'Rêve de Vélo (2025)'}),
 allez:FAC(G_('#b9bcbf'),Pe('#2d55a0'),G_('#6f767c'),{ds:'stripes',fork:G_('#b9bcbf'),name:'Gloss Dove Grey / Cool Grey / Chameleon Lapis',src:'bikes.de (2023)'}),
 diverge:FAC(Me('#1e3a6e'),Me('#2d55a0'),Me('#2d55a0'),{fork:Me('#1e3a6e'),name:'Gloss Mystic Blue / Blue Metallic',src:'Butikkannonser (Northwest Bicycle, Pro Bike Supply)'}),
 grizl:FAC(G_('#ece8df'),G_('#141516'),G_('#141516'),{fork:G_('#ece8df'),name:'Milk',src:'canyon.com (Grizl 6)'}),
 topstone:FAC(G_('#1d2a44'),G_('#f2efe6'),G_('#f2efe6'),{fork:G_('#1d2a44'),name:'Midnight Blue',src:'nanobike.de (2022)'}),
 domane:FAC(G_('#1f3f7a'),Mt('#141516'),Mt('#141516'),{ds:'panel',fork:G_('#1f3f7a'),name:'Gloss Mulsanne Blue / Matte Trek Black',src:'99spokes (2024)'}),
 bmx29:FAC(G_('#1f4fa8'),G_('#f2efe6'),G_('#f2efe6'),{fork:G_('#1f4fa8'),name:'Sapphire Blue',src:'Cambria Bike (SE Big Ripper 29, 2025)'}),
 klunker:FAC(G_('#141516'),G_('#e0782f'),G_('#e0782f'),{ds:'stripes',typical:true,name:'Sort med oransje',src:'Typisk klunkerfarge, ikke en bestemt modell'}),
 cantilever:FAC(G_('#b8322a'),G_('#ece4cf'),G_('#ece4cf'),{ds:'pin',typical:true,name:'Rød med kremhvit',src:'Typisk cruiserfarge, ikke en bestemt modell'}),
 retro90:FAC(G_('#1aa39a'),G_('#6a2d91'),G_('#efc840'),{ds:'stripes',typical:true,name:'Turkis med lilla',src:'Typisk 90-tallsfarge, ikke en bestemt modell'}),
 steelroad:FAC(G_('#0f4d3a'),G_('#ece4cf'),G_('#ece4cf'),{ds:'pin',fork:P_('chrome'),typical:true,name:'Racinggrønn med kremhvit',src:'Typisk farge for klassiske racere, ikke en bestemt modell'})};
// standarddeler per sykkel: stil som grunnlag + det som skiller modellen (bremsefester, gaffel)
// P_S: svart styrebånd og sete slik gravel- og landeveissykler leveres
const P_S={grips:P_('rubber','#141516'),saddle:P_('vinyl')};
const KIT={electra:{look:'Strandcruiser',over:{forkType:'rigid',forkBlade:'curve',forkCrown:'uni',forkLeg:'std',drive:'coaster',brakeF:'none',brakeR:'none',guard:'no'}},
 cantilever:{look:'Strandcruiser'},klunker:{look:'Klassisk clunker'},retro90:{look:'Retro MTB'},
 bmx29:{look:'Rat rod',over:{forkType:'rigid',forkBlade:'straight',forkCrown:'uni'},
  p:{headset:P_('matt'),grips:P_('rubber'),calipers:P_('matt'),housing:P_('gloss','#141516'),ring:P_('matt'),pedals:P_('matt'),nipples:P_('alu'),hubs:P_('matt'),clamp:P_('matt'),bolts:P_('alu')}},
 steelroad:{look:'Klassisk racer',tires:[['gp5000','skin']]},
 // modeller: deler etter produsentens spesifikasjon (src). Dekk vises med nærmeste dekk i appen.
 aggressor:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'3x8'},tires:[['ranger','black']],src:'bikewise.io, Aggressor Expert 2021: SR Suntour XCM, 3×8, Tektro hydraulisk, WTB Ranger 2,25'},
 gt26:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'3x9',stemLen:90},tires:[['ardent','black']],src:'bicyclebluebook.com, Avalanche 1.0 Disc 2010: RockShox Tora, 3×9, Tektro Auriga hydraulisk, Kenda Nevegal 2,1'},
 blast:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'3x9',stemLen:90},tires:[['ardent','black']],src:'99spokes, Blast 2011: RockShox Tora, 3×9, Shimano M445 hydraulisk, Maxxis Aspen 2,1'},
 xcal:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'3x9',crank:'modern'},tires:[['rekonrace','black']],src:'bicyclebluebook.com, X-Caliber 7 2016: RockShox 30, 3×9 Acera, Shimano M355 hydraulisk, Bontrager XR2 2,2'},
 rockhopper:{look:'Standard MTB',over:{forkType:'susp',brakeF:'mech',brakeR:'mech',drive:'2x8'},tires:[['rekonrace','black']],src:'comorsports.com, Rockhopper 27,5 2023: SR Suntour XCE, 2×8 microSHIFT, Radius mekanisk skive, Fast Trak 2,35'},
 marlin7:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'m4100',crank:'modern'},tires:[['rekon','black']],src:'99spokes, Marlin 7 Gen 3: RockShox Judy, Deore 1×10, Shimano MT200 hydraulisk, Bontrager XT3 2,4'},
 talon29:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'m4100',crank:'modern'},tires:[['rekonrace','black']],src:'bikewise.io, Talon 1 2022: Giant SXC32, Deore 1×10, Tektro hydraulisk, Kenda Booster 2,4'},
 grandcanyon:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'sx',crank:'modern'},tires:[['rekon','black']],src:'99spokes, Grand Canyon 7 2024: RockShox Judy, SRAM SX Eagle 1×12, Shimano MT400 hydraulisk, Schwalbe Wicked Will 2,4'},
 bignine:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'xxsl',crank:'modern',pedals:'spd'},tires:[['rekonrace','black']],src:'bikes.fan, Big.Nine 10K 2024: RockShox SID SL, SRAM XX SL Transmission 1×12, SRAM Level hydraulisk, Maxxis Rekon Race 2,4'},
 karate:{look:'Standard MTB',over:{forkType:'susp',brakeF:'hyd',brakeR:'hyd',drive:'xt12',crank:'modern',barType:'riser'},tires:[['dhf','black']],src:'Vital MTB, Karate Monkey 2024: RockShox 35 140 mm, Deore XT 1×12, Tektro hydraulisk, Surly Dirt Wizard 27,5×2,8'},
 kaius:{look:'Gravel',over:{drive:'grxdi2',rim:'aero',stemType:'integrated',stemLen:90,stemAng:-8,spacers:10,forkLeg:'fat'},tires:[['gravelking','black']],p:P_S,src:'99spokes, Kaius 01 Three 2026: Shimano GRX Di2 2×12, GRX hydraulisk, Pirelli Cinturato Gravel H 40, 40 mm karbonfelger'},
 checkpoint:{look:'Gravel',over:{drive:'apex'},tires:[['gravelking','black']],p:P_S,src:'rabe-bike.de, Checkpoint ALR 5 2025: SRAM Apex XPLR 1×12, Apex hydraulisk, Bontrager GR1 40'},
 diverge:{look:'Gravel',over:{drive:'grx2x10'},tires:[['gravelking','black']],p:P_S,src:'comorsports.com, Diverge Elite E5 2024: Shimano GRX 2×10, hydraulisk skive, Specialized Pathfinder 38'},
 grizl:{look:'Gravel',over:{drive:'grx2x10'},tires:[['gravelking','black']],p:P_S,src:'canyon.com, Grizl 6: Shimano GRX 2×10, GRX hydraulisk, Schwalbe G-One 45, svart styrebånd'},
 topstone:{look:'Gravel',over:{drive:'grx2x10'},tires:[['gravelking','black']],p:P_S,src:'nanobike.de, Topstone 2 2022: Shimano GRX 400 2×10, GRX hydraulisk, WTB Riddler 37'},
 allez:{look:'Landevei',over:{drive:'tiagra',brakeF:'hyd',brakeR:'hyd',rim:'mtb'},tires:[['gp5000','black']],src:'bikes.de, Allez Sport 2023: Shimano Tiagra 2×10, Tiagra hydraulisk skive, Specialized RoadSport 30'},
 domane:{look:'Landevei',over:{drive:'claris',brakeF:'mech',brakeR:'mech',rim:'mtb'},tires:[['gp5000','black']],src:'bike-magazin.de, Domane AL 2 Gen 3: Shimano Claris 2×8, Tektro mekanisk skive, Bontrager R1 32'}};
// Finn.no-annonser er fjernet fra appen

const DRIVES={
 '3x8':{n:'3×8 kjedegir',s:'Trippel krank, klassisk MTB',t:'der',ring:[42,34,24],cs:[11,32,8]},
 advent:{n:'microSHIFT Advent 1×9',s:'11-46',t:'der',ring:[32],cs:[11,46,9]},
 m4100:{n:'Shimano Deore M4100 1×10',s:'11-46',t:'der',ring:[32],cs:[11,46,10]},
 m5100:{n:'Shimano Deore M5100 1×11',s:'11-51',t:'der',ring:[32],cs:[11,51,11]},
 m6100:{n:'Shimano Deore M6100 1×12',s:'10-51',t:'der',ring:[32],cs:[10,51,12]},
 sx:{n:'SRAM SX Eagle 1×12',s:'11-50',t:'der',ring:[32],cs:[11,50,12]},
 gx:{n:'SRAM GX Eagle 1×12',s:'10-52',t:'der',ring:[32],cs:[10,52,12]},
 ss:{n:'Singlespeed',s:'32/16',t:'ss',ring:[32],cog:16},
 nexus3:{n:'Shimano Nexus 3',s:'3-gir nav',t:'hub',ring:[33],cog:19,hub:0.032},
 alfine8:{n:'Shimano Alfine 8',s:'8-gir nav',t:'hub',ring:[39],cog:20,hub:0.038},
 alfine11:{n:'Shimano Alfine 11',s:'11-gir nav',t:'hub',ring:[39],cog:20,hub:0.042},
 rohloff:{n:'Rohloff Speedhub 500/14',s:'14-gir nav',t:'hub',ring:[38],cog:16,hub:0.056},
 coaster:{n:'Fotbremsnav 1-gir',s:'F.eks. Shimano CB-E110',t:'coaster',ring:[36],cog:18,hub:0.03},
 nexus3c:{n:'Shimano Nexus 3 med fotbrems',s:'3-gir nav',t:'coaster',shift:true,ring:[33],cog:19,hub:0.034},
 r7100:{n:'Shimano 105 R7100 2×12',s:'50/34, 11-34',t:'der',ring:[50,34],cs:[11,34,12],road:true},
 grx820:{n:'Shimano GRX RX820 1×12',s:'40T, 10-45',t:'der',ring:[40],cs:[10,45,12],road:true},
 road2x8:{n:'2×8 landevei (generisk)',s:'50/34, 11-32',t:'der',ring:[50,34],cs:[11,32,8],road:true},
 '3x9':{n:'3×9 kjedegir',s:'Trippel krank, 11-34',t:'der',ring:[40,30,22],cs:[11,34,9]},
 '2x8':{n:'2×8 kjedegir',s:'Dobbel krank, 11-34',t:'der',ring:[36,22],cs:[11,34,8]},
 xt12:{n:'Shimano Deore XT M8100 1×12',s:'30T, 11-51',t:'der',ring:[30],cs:[11,51,12]},
 xxsl:{n:'SRAM XX SL Eagle Transmission 1×12',s:'34T, 10-52, trådløs',t:'der',ring:[34],cs:[10,52,12],e:'axs',udh:true},
 claris:{n:'Shimano Claris 2×8',s:'50/34, 11-32',t:'der',ring:[50,34],cs:[11,32,8],road:true},
 tiagra:{n:'Shimano Tiagra 2×10',s:'50/34, 11-32',t:'der',ring:[50,34],cs:[11,32,10],road:true},
 grx2x10:{n:'Shimano GRX RX400 2×10',s:'46/30, 11-34',t:'der',ring:[46,30],cs:[11,34,10],road:true},
 grxdi2:{n:'Shimano GRX Di2 2×12',s:'Elektronisk, 2 klinger',t:'der',ring:[48,31],cs:[11,34,12],road:true,e:'di2'},
 apex:{n:'SRAM Apex XPLR 1×12',s:'40T, 11-44',t:'der',ring:[40],cs:[11,44,12],road:true}};
const BARS={
 riser:{n:'Riser',s:'Flatt riserstyre',p:[[0,0,.07],[-.004,.018,.14],[-.016,.03,.2],[-.034,.034,.34]]},
 fatbar:{n:'Renthal Fatbar 35',s:'800 mm, 30 mm rise',p:[[0,0,.07],[0,.015,.13],[-.008,.03,.19],[-.026,.032,.40]],clamp:.035},
 moloko:{n:'Surly Moloko',s:'735 mm, 0 rise, 34°',p:[[0,0,.05],[-.002,0,.1],[-.004,0,.15],[0,0,.205],[-.02,0,.245],[-.055,0,.295],[-.08,0,.33],[-.1,0,.3675]],
   sideLoop:[[0,0,.06],[.035,0,.075],[.085,0,.1],[.125,0,.135],[.135,0,.17],[.115,0,.2],[.07,0,.212],[.02,0,.212],[0,0,.205]]},
 jones:{n:'Jones H-Bar SG Loop 2.5',s:'710 mm, 63,5 mm rise, 45°',p:[[0,0,.05],[.002,.012,.07],[.002,.042,.09],[-.002,.06,.108],[-.008,.0635,.125],[-.03,.0635,.16],[-.07,.0635,.21],[-.115,.0635,.26],[-.16,.0635,.31],[-.2,.0635,.355]],
   loop:[[.135,.0635,0],[.133,.0635,.045],[.12,.0635,.09],[.09,.0635,.122],[.05,.0635,.135],[.015,.0635,.132],[-.006,.0635,.124]]},
 crazy:{n:'Velo Orange Crazy Bar',s:'780 mm, 40 mm rise, 35°, horn 420 × 110 mm',p:[[0,0,.05],[.003,.008,.08],[.004,.03,.12],[.002,.04,.16],[0,.04,.21],[-.03,.04,.255],[-.07,.04,.31],[-.105,.04,.36],[-.12,.04,.39]],
   horn:[[-.006,.04,.205],[.03,.041,.208],[.07,.044,.211],[.1,.048,.211],[.112,.05,.21]]},
 albatross:{n:'Nitto Albatross',s:'550 mm, 50 mm rise, 25,4 klemme',p:[[0,0,.05],[.04,.01,.13],[.03,.04,.22],[-.05,.05,.27],[-.173,.05,.275]],clamp:.0254},
 moto:{n:'Moto / klunker-styre',s:'Generisk, høy og bred',p:[[0,0,.06],[.008,.05,.15],[-.05,.1,.25],[-.1,.105,.35]]},
 cruiser:{n:'Cruiserstyre',s:'Generisk, stor backsweep',p:[[0,0,.05],[.025,.1,.13],[-.08,.17,.25],[-.2,.165,.31],[-.29,.155,.3]]},
 bmx:{n:'BMX-styre 9"',s:'Generisk, med tverrstag',p:[[0,0,.04],[0,0,.08],[-.035,.2,.15],[-.05,.225,.22],[-.058,.229,.36]],cross:true},
 roadcompact:{n:'Landevei kompakt',s:'Generisk, 420 mm, reach 75, drop 125',drop:{w:.42,r:.075,d:.125,fl:0}},
 classicdrop:{n:'Klassisk rundbøyd',s:'Generisk, 400 mm, reach 85, drop 140',drop:{w:.40,r:.085,d:.14,fl:0,round:true}},
 gravel12:{n:'Gravel, 12° flare',s:'Generisk, 440 mm, reach 70, drop 120',drop:{w:.44,r:.07,d:.12,fl:12}},
 cowchipper:{n:'Salsa Cowchipper',s:'440 mm, reach 68, drop 116, 24° flare',drop:{w:.44,r:.068,d:.116,fl:24}}};
// seter: hw = halv bredde langs lengden (u=0 nese, u=1 bak), c = høydeprofil, t = tykkelse (polstret), skirt = skjørt (skinn)
const SADDLES={
 // polstrede seter: L = lengde, hw = halv bredde langs setet (nese 0 til hale 1), c = topplinje sett fra siden, t = tykkelse midt på,
 // wing = hvor mye sidene faller ned mot kanten, cut = utsparing [fra, til, halv bredde], chan = kanal [fra, til, halv bredde, dybde]
 volt:{n:'WTB Volt',s:'142 × 265 mm, MTB',type:'pad',L:.265,hw:[[.03,.011],[.1,.016],[.25,.019],[.42,.025],[.58,.042],[.74,.062],[.87,.07],[.95,.071]],
   c:[[0,-.006],[.07,.002],[.3,0],[.65,.0005],[.88,.006],[1,.012]],t:[[0,.012],[.3,.022],[.8,.03],[1,.026]],wing:[[0,.002],[.4,.004],[.8,.011],[1,.013]],under:'rails',src:'wtb.com'},
 mtb:{n:'MTB-sete',s:'Generisk, ca. 155 mm',type:'pad',L:.27,hw:[[.03,.012],[.1,.017],[.25,.021],[.42,.027],[.6,.048],[.78,.07],[.89,.0765],[.95,.0775]],
   c:[[0,-.006],[.07,.002],[.3,0],[.65,.001],[.88,.006],[1,.011]],t:[[0,.013],[.3,.024],[.8,.032],[1,.028]],wing:[[0,.002],[.4,.005],[.8,.012],[1,.014]],under:'rails'},
 b17:{n:'Brooks B17 Standard',s:'175 × 275 mm, skinn',type:'leather',L:.275,hw:[[.03,.013],[.12,.026],[.4,.033],[.62,.057],[.82,.081],[.97,.0875]],skirt:[[0,.012],[.45,.016],[.8,.032],[1,.04]],c:[[0,.012],[.35,.003],[.75,0],[1,.006]],under:'leatherframe'},
 flyer:{n:'Brooks B17 Flyer',s:'B17 med fjærer',type:'leather',L:.275,hw:[[.03,.013],[.12,.026],[.4,.033],[.62,.057],[.82,.081],[.97,.0875]],skirt:[[0,.012],[.45,.016],[.8,.032],[1,.04]],c:[[0,.012],[.35,.003],[.75,0],[1,.006]],under:'springs'},
 b66:{n:'Brooks B66',s:'205 × 260 mm, doble fjærer',type:'leather',L:.26,hw:[[.03,.016],[.12,.032],[.4,.042],[.62,.07],[.82,.096],[.97,.1025]],skirt:[[0,.014],[.45,.02],[.8,.036],[1,.044]],c:[[0,.012],[.35,.003],[.75,0],[1,.006]],under:'springs2'},
 c17:{n:'Brooks Cambium C17',s:'Gummi og bomull, ufjæret',type:'leather',L:.283,thin:true,hw:[[.03,.013],[.12,.025],[.4,.031],[.62,.055],[.82,.078],[.97,.083]],skirt:[[0,.01],[.45,.012],[.8,.02],[1,.024]],c:[[0,.01],[.35,.002],[.75,0],[1,.004]],under:'leatherframe'},
 cruiser:{n:'Cruisersete',s:'Generisk, bredt med fjærer',type:'pad',L:.255,hw:[[.04,.03],[.15,.04],[.4,.058],[.62,.098],[.82,.12],[.94,.125]],
   c:[[0,.006],[.35,0],[.75,.002],[1,.008]],t:[[0,.03],[.4,.048],[1,.054]],wing:[[0,.008],[.5,.014],[1,.022]],soft:1,under:'cruiser'},
 bmx:{n:'BMX pivotal-sete',s:'Generisk, slankt',type:'pad',L:.245,hw:[[.04,.014],[.25,.03],[.6,.052],[.86,.062],[.95,.064]],c:[[0,.008],[.5,0],[1,.006]],
   t:[[0,.02],[.4,.028],[1,.03]],wing:[[0,.003],[1,.008]],under:'pivotal'},
 solo:{n:'Solo / bobber-sete',s:'Generisk, store fjærer',type:'pad',L:.27,hw:[[.04,.03],[.3,.052],[.65,.09],[.88,.122],[.95,.126]],c:[[0,.006],[.5,0],[1,.012]],
   t:[[0,.018],[1,.03]],wing:[[0,.004],[1,.012]],soft:1,under:'solo'},
 power:{n:'Specialized Power',s:'143 × 240 mm, kort nese, utsparing',type:'pad',L:.24,hw:[[.035,.019],[.12,.022],[.3,.026],[.48,.04],[.66,.062],[.82,.0705],[.94,.0715]],
   c:[[0,-.003],[.12,.002],[.45,0],[.85,.002],[1,.005]],t:[[0,.011],[.4,.017],[1,.019]],wing:[[0,.002],[.5,.004],[.85,.008],[1,.009]],cut:[.13,.6,.0085],under:'rails',src:'specialized.com'},
 sworks:{n:'S-Works Power med Mirror',s:'143 × 240 mm, 3D-printet gitter, karbonskinner',type:'pad',L:.24,hw:[[.035,.019],[.12,.022],[.3,.026],[.48,.04],[.66,.062],[.82,.0705],[.94,.0715]],
   c:[[0,-.003],[.12,.002],[.45,0],[.85,.002],[1,.005]],t:[[0,.013],[.4,.02],[1,.022]],wing:[[0,.002],[.5,.004],[.85,.008],[1,.009]],cut:[.13,.6,.0085],mirror:true,rail:'carbon',under:'rails',src:'specialized.com, Steed Cycles'},
 antares:{n:'Fizik Antares Versus Evo R3',s:'274 × 139 mm, kanal i hele lengden, Kium-skinner',type:'pad',L:.274,hw:[[.03,.009],[.08,.0125],[.22,.0155],[.4,.02],[.58,.04],[.74,.062],[.87,.069],[.95,.0695]],
   c:[[0,-.004],[.07,.0015],[.35,0],[.75,.001],[.92,.006],[1,.011]],t:[[0,.009],[.4,.013],[1,.016]],wing:[[0,.002],[.5,.005],[.82,.011],[1,.013]],chan:[.06,.72,.007,.0035],under:'rails',src:'Pro Bike Supply'},
 argo:{n:'Fizik Vento Argo R3',s:'265 × 140 mm, kort nese, utsparing',type:'pad',L:.265,hw:[[.035,.017],[.12,.0205],[.3,.023],[.48,.035],[.64,.058],[.8,.069],[.93,.07]],
   c:[[0,-.004],[.12,.0015],[.45,0],[.85,.0015],[1,.004]],t:[[0,.01],[.4,.015],[1,.017]],wing:[[0,.002],[.5,.004],[.85,.008],[1,.009]],cut:[.11,.62,.0095],under:'rails',src:'bike-components.de'},
 road:{n:'Landeveissete',s:'Generisk, ca. 140 × 275 mm',type:'pad',L:.275,hw:[[.03,.009],[.1,.013],[.28,.017],[.46,.024],[.64,.05],[.8,.066],[.9,.069],[.96,.07]],
   c:[[0,-.004],[.08,.0015],[.4,0],[.8,.0005],[1,.006]],t:[[0,.009],[.4,.013],[1,.016]],wing:[[0,.002],[.5,.004],[.85,.009],[1,.011]],under:'rails'},
 banana:{n:'Bananasete med sissybar',s:'Generisk, 70-talls stil',type:'pad',L:.42,hw:[[.04,.045],[.3,.05],[.7,.066],[.95,.07]],t:[[0,.045],[.5,.05],[1,.055]],c:[[0,.03],[.3,0],[.75,.01],[1,.04]],under:'banana'}};
// sidevegger slik produsentene selger dem
const SIDEWALLS={black:{n:'Sort',c:'#141516'},darktan:{n:'Mørk tan (tanwall)',c:'#7a4d2b'},tan:{n:'Tan',c:'#a06a3a'},skin:{n:'Skinwall / lys tan',c:'#c09062'},
 creme:{n:'Creme',c:'#e6d9bb'},white:{n:'Hvit',c:'#efede6'},brownwhite:{n:'Brun med hvit stripe',c:'#5a3a24',stripe:'#efe9dc'},coffee:{n:'Kaffe',c:'#4a3326'}};
// v: hjulstørrelse → bredde → sidevegger. m: merking når 622-felgen selges som 28".
const TIRES={
 dhf:{n:'Maxxis Minion DHF',tr:'knobby',v:{'26':{2.5:['black','skin']},'27.5':{2.3:['black','darktan'],2.5:['black','darktan','skin'],2.8:['black']},'29':{2.5:['black','darktan'],2.6:['black','darktan']}}},
 rekon:{n:'Maxxis Rekon',tr:'knobby2',v:{'27.5':{2.4:['darktan'],2.6:['black'],2.8:['black','skin']},'29':{2.4:['black','darktan']}}},
 ardent:{n:'Maxxis Ardent',tr:'knobby2',v:{'26':{2.25:['black'],2.4:['black']},'27.5':{2.25:['black'],2.4:['black']},'29':{2.25:['black'],2.4:['black']}}},
 rekonrace:{n:'Maxxis Rekon Race',tr:'xc',v:{'27.5':{2.0:['black','darktan'],2.25:['black','darktan']},'29':{2.25:['black','darktan'],2.4:['black','darktan']}}},
 dth:{n:'Maxxis DTH',tr:'street',v:{'26':{2.15:['darktan'],2.3:['darktan']}}},
 hookworm:{n:'Maxxis Hookworm',tr:'street',v:{'26':{2.5:['black']},'27.5':{2.5:['black']},'29':{2.5:['black']}}},
 ranger:{n:'WTB Ranger',tr:'knobby2',v:{'26':{2.8:['black'],3.0:['black']},'27.5':{2.0:['black','tan'],2.25:['black','tan'],2.8:['black']},'29':{2.25:['black','tan'],2.4:['black','tan'],3.0:['black']}}},
 fatfrank:{n:'Schwalbe Fat Frank',tr:'balloon',reflex:true,m:{'29':'28'},v:{'26':{2.35:['black','creme','brownwhite']},'27.5':{2.35:['black']},'29':{2.0:['black','creme','brownwhite','coffee']}}},
 bigapple:{n:'Schwalbe Big Apple',tr:'slick',reflex:true,m:{'29':'28'},v:{'26':{2.0:['black'],2.15:['black'],2.35:['black']},'29':{2.15:['black'],2.35:['black']}}},
 smx:{n:'Schwalbe Super Moto-X',tr:'moto',reflex:true,m:{'29':'28'},v:{'26':{2.15:['black'],2.4:['black']},'27.5':{2.15:['black'],2.4:['black'],2.8:['black']},'29':{2.0:['black']}}},
 bigbenplus:{n:'Schwalbe Big Ben Plus',tr:'street',reflex:true,v:{'27.5':{2.15:['black']}}},
 johnnywatts:{n:'Schwalbe Johnny Watts',tr:'knobby2',reflex:true,v:{'27.5':{2.6:['black']}}},
 iceSpiker:{n:'Schwalbe Ice Spiker Pro',tr:'spike',v:{'27.5':{2.25:['black']},'29':{2.25:['black'],2.6:['black']}}},
 gp5000:{n:'Continental GP5000 S TR',tr:'road',mm:true,v:{'29':{25:['black','skin'],28:['black'],30:['black'],32:['black']}}},
 gravelking:{n:'Panaracer GravelKing SK',tr:'gravel',mm:true,v:{'29':{35:['black'],38:['black'],40:['black','darktan'],43:['black','darktan'],45:['black','darktan']}}},
 riddler:{n:'WTB Riddler',tr:'gravel',mm:true,v:{'29':{37:['tan'],45:['tan']}}},
 cruiser:{n:'Cruiserdekk (generisk)',tr:'balloon',gen:true,v:{'26':{2.125:['black','white','creme','darktan','brownwhite'],2.35:['black','white','creme','darktan'],3.0:['black','white','creme','darktan']}}}};
const BEAD={'26':0.2795,'27.5':0.292,'29':0.311};
const FORKS={carbon:{n:'Karbongaffel',s:'Landevei og gravel, konisk'},susp:{n:'Dempegaffel',s:'Moderne, 32 mm standrør'},susp90:{n:'90-talls dempegaffel',s:'Tynne standrør, bøyle og belg'},
 rigid:{n:'Stiv gaffel',s:'Velg bladform og krone'},truss:{n:'Truss-gaffel',s:'Stiv, med avstivere foran'},dual:{n:'Dobbeltkrone',s:'Moto-stil, rette bein'},springer:{n:'Springer',s:'Cruiser med fjærer'}};
const BLADES={straight:'Rette blad',curve:'Buede blad',swoop:'Kraftig buet (klunker)'};
const CROWNS={uni:'Unicrown',flat:'Flat krone',seg:'Segmentert',fat:'Kraftig klassisk krone'};
const LEGS={thin:'Tynne',std:'Normale',fat:'Kraftige'};
const BRAKES={hyd:{n:'Hydraulisk skivebrems',s:'Slange, 2 stempler'},mech:{n:'Mekanisk skivebrems',s:'Wire og arm'},vbrake:{n:'V-brems',s:'Felgbrems på sokler'},
 canti:{n:'Cantilever',s:'Felgbrems med tverrwire'},caliper:{n:'Kaliperbrems',s:'Felgbrems, sentermontert'},drum:{n:'Trommelbrems',s:'I navet'},none:{n:'Ingen',s:'F.eks. med fotbremsnav'}};
const LEVERS={road:'Landevei (STI, brems og gir)',hyd:'Hydraulisk med reservoar',mtb:'MTB wirehendel',long:'Lang klassisk',vintage:'Krom cruiserhendel',bmx:'BMX med kuleende'};
const STEMS={ahead:'Ahead',quill:'Quill-look',bmx:'BMX toploader',integrated:'Integrert styre og stem'};
const CRANKS={modern:'Moderne 2-delt',square:'Firkantaksling, klassisk',onepiece:'Ett-delt (cruiser)',bmx:'BMX 3-delt'};
const PEDALS={flat:'Alu flat med pinner',plastic:'Plast plattform',rat:'Rat-trap',block:'Gummiblokk, klassisk',spd:'Klikk MTB (SPD)',road:'Klikk landevei (SPD-SL)'};
// felger: d = dybde (mm, dr = bak hvis ulik), iw/ew = indre/ytre bredde (mm), prof = form i 3D, s = hjulstørrelser, b = bremsetype (disc/rim/both), src = kilde for målene
const RIMDB={
 mtb:{n:'Generisk dobbeltvegg',g:'Generisk',d:22,prof:'mtb',mat:'alu',s:['26','27.5','29'],b:'both',gen:true},
 deepv:{n:'Generisk dyp V-profil',g:'Generisk',d:32,prof:'v',mat:'alu',s:['26','27.5','29'],b:'both',gen:true},
 aero:{n:'Generisk karbon aero 45 mm',g:'Generisk',d:45,prof:'aero',mat:'carbon',s:['27.5','29'],b:'both',gen:true},
 box:{n:'Generisk lav boksfelg',g:'Generisk',d:16,prof:'box',mat:'alu',s:['26','27.5','29'],b:'rim',gen:true},
 zipp303:{n:'Zipp 303 Firecrest',g:'Landevei og gravel',d:40,iw:25,ew:30,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Bikerumor'},
 zipp404s:{n:'Zipp 404 S',g:'Landevei og gravel',d:50,iw:23,ew:29,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'sram.com'},
 zipp404:{n:'Zipp 404 Firecrest',g:'Landevei og gravel',d:58,iw:23,ew:27.5,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Cycling Weekly'},
 enve34:{n:'ENVE SES 3.4',g:'Landevei og gravel',d:39,dr:43,iw:25,ew:32,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Fairwheel Bikes'},
 enve45:{n:'ENVE SES 4.5',g:'Landevei og gravel',d:49,dr:55,iw:25,ew:32,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Fairwheel Bikes'},
 dterc45:{n:'DT Swiss ERC 1400 Dicut 45',g:'Landevei og gravel',d:45,iw:22,ew:28.5,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Sigma Sports'},
 rovalrap:{n:'Roval Rapide CLX II',g:'Landevei og gravel',d:51,dr:60,iw:21,ew:35,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Steed Cycles'},
 enveg23:{n:'ENVE G23',g:'Gravel',d:25,iw:23,ew:31.5,prof:'mtb',mat:'carbon',s:['29'],b:'disc',src:'Saddleback'},
 dtgrc50:{n:'DT Swiss GRC 1400 Dicut 50',g:'Gravel',d:50,iw:24,ew:31,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Performance Bike'},
 rovalterra:{n:'Roval Terra CLX II',g:'Gravel',d:32,iw:25,ew:30,prof:'aero',mat:'carbon',s:['29'],b:'disc',src:'Steed Cycles'},
 dtxrc30:{n:'DT Swiss XRC 1200 Spline 30',g:'MTB',d:25,iw:30,ew:36,prof:'mtb',mat:'carbon',s:['29'],b:'disc',src:'bike-components.de'},
 enveam30:{n:'ENVE AM30',g:'MTB',d:20,iw:30,ew:39,prof:'mtb',mat:'carbon',s:['27.5','29'],b:'disc',src:'enve.com'},
 zipp1zero:{n:'Zipp 1ZERO HiTop SW',g:'MTB',d:21.2,iw:30,prof:'mtb',mat:'carbon',s:['29'],b:'disc',src:'bike-components.de (ytre bredde ikke oppgitt)'},
 stansflow:{n:"Stan's NoTubes Flow MK4",g:'MTB',d:18.9,iw:30,ew:33.6,prof:'mtb',mat:'alu',s:['26','27.5','29'],b:'disc',src:'Cycleways'},
 wtbst30:{n:'WTB ST i30',g:'MTB',d:19,iw:30,ew:34,prof:'mtb',mat:'alu',s:['27.5','29'],b:'disc',src:'Modern Bike'},
 openpro:{n:'Mavic Open Pro C',g:'Klassisk og retro',d:18,iw:15,prof:'box',mat:'alu',s:['29'],b:'rim',src:'mavic.com (ytre bredde ikke oppgitt)'},
 velodeepv:{n:'Velocity Deep V',g:'Klassisk og retro',d:30,iw:14,ew:19,prof:'v',mat:'alu',s:['29'],b:'rim',src:'velocityusa.com'},
 archetype:{n:'H Plus Son Archetype',g:'Klassisk og retro',d:25,ew:23,prof:'v',mat:'alu',s:['29'],b:'rim',src:'Wrench Science'},
 rhynolite:{n:'Sun Ringlé Rhyno Lite',g:'Klassisk og retro',d:16,iw:22,ew:27,prof:'box',mat:'alu',s:['26'],b:'rim',src:'Modern Bike'}};
const RIMS=Object.fromEntries(Object.entries(RIMDB).map(([k,r])=>[k,r.n]));
const RIM_ORDER=['Landevei og gravel','Gravel','MTB','Klassisk og retro','Generisk'];
const rimFits=(r,w)=>r.s.includes(w);
const rimTxt=r=>`${String(r.d).replace('.',',')}${r.dr?'/'+r.dr:''} mm dyp${r.iw?` · ${r.iw} mm indre`:''}${r.ew?` · ${String(r.ew).replace('.',',')} mm ytre`:''} · ${r.mat==='carbon'?'karbon':'alu'}${r.b==='disc'?' · skivebrems':r.b==='rim'?' · felgbrems':''}`;


/* ===================== STATE ===================== */
const clone=o=>JSON.parse(JSON.stringify(o));
// rammedetaljer per modell: kabelføring, aksel, bremsefeste, setepinne og klemme. Se notatene i FRAMEX_SRC.
const FRAME0={route:'ext',axle:'qr',bmount:'post',post:'round',clamp:'collar',ttBoss:false,ttFlat:false,csBridge:false};
// maks dekkbredde fra produsent eller test (mm). Rammer uten oppføring får et anslag ut fra standarddekket
const MAXTIRE={kaius:[52,'Cycling Weekly'],grizl:[54,'canyon.com (Grizl AL)'],diverge:[47,'specialized.com'],topstone:[45,'bike24 (Topstone 2025)'],checkpoint:[45,'forhandler (bikes.com.au)'],
 allez:[35,'BikeRadar'],domane:[35,'Cycloscope (Domane AL Disc)']};
function maxTire(bike){const m=MAXTIRE[bike];if(m)return{in:m[0]/25.4,mm:m[0],src:m[1]};const b=BIKES[bike];if(!b)return null;const tw=b.tw||2.2;
  return tw>10?{in:tw*1.15/25.4,mm:Math.round(tw*1.15),src:null}:{in:tw+0.5,mm:null,src:null}}
const FRAMEX={
 aggressor:{route:'ext',axle:'qr'},gt26:{route:'ext',axle:'qr'},blast:{route:'ext',axle:'qr'},retro90:{axle:'qr'},steelroad:{axle:'qr'},
 electra:{axle:'nut'},klunker:{axle:'nut'},cantilever:{axle:'nut'},bmx29:{axle:'nut'},
 xcal:{route:'semi',axle:'qr'},rockhopper:{route:'int',axle:'qr'},talon29:{route:'int',axle:'qr'},marlin7:{route:'semi',axle:'qr',ttFlat:true},
 grandcanyon:{route:'semi',axle:'ta'},bignine:{route:'hidden',axle:'ta',bmount:'flat'},karate:{route:'ext',axle:'ta'},
 kaius:{route:'hidden',axle:'ta',bmount:'flat',post:'aero',clamp:'hidden',ttBoss:true,forkHalo:true},
 checkpoint:{route:'int',axle:'ta',bmount:'flat',ttBoss:true},diverge:{route:'int',axle:'ta',bmount:'flat'},
 grizl:{route:'int',axle:'ta',bmount:'flat',post:'vcls',ttBoss:true},topstone:{route:'int',axle:'ta',bmount:'flat',stays:'dropped',ttBoss:true},
 allez:{route:'int',axle:'ta',bmount:'flat',stays:'dropped',csBridge:true},domane:{route:'int',axle:'ta',bmount:'flat'}};
const geoOf=k=>{const b=clone(BIKES[k]);for(const x of ['n','y','src','est','g','factory','kit','kitBrakes','tw'])delete b[x];return{...FRAME0,...b,...(FRAMEX[k]||{})}};
const PAINT0={frame:P_('gloss','#1f3a6b'),accent:P_('gloss','#8cb8d8'),headset:P_('matt'),fork:P_('matt'),stanch:P_('chrome'),stem:P_('matt'),bar:P_('matt'),grips:P_('rubber'),
 levers:P_('alu'),blevers:P_('alu'),hoods:P_('rubber'),calipers:P_('matt'),rotors:P_('alu'),housing:P_('gloss','#f2efe6'),hose:P_('matt'),crank:P_('matt'),ring:P_('matt'),cassette:P_('alu'),chain:P_('alu'),der:P_('matt'),pedals:P_('matt'),
 rims:P_('matt'),spokes:P_('alu'),nipples:P_('alu'),hubs:P_('matt'),saddle:P_('vinyl'),post:P_('matt'),clamp:P_('matt'),decal2:P_('gloss','#e0782f'),fender:P_('matt'),guard:P_('chrome'),kick:P_('alu'),cage:P_('matt'),bottle:P_('gloss','#f2efe6'),bell:P_('chrome'),bolts:P_('alu')};
const DEFAULT_BIKE='talon29';
const BASE={bike:DEFAULT_BIKE,finn:null,geo:geoOf(DEFAULT_BIKE),geoEdited:false,forkType:'susp',forkBlade:'curve',forkCrown:'uni',forkLeg:'std',forkDelta:0,barType:'riser',stemType:'ahead',stemLen:60,stemAng:6,spacers:15,lever:'mtb',
 brakeF:'mech',brakeR:'mech',rotor:160,drive:'3x8',crank:'square',crankLen:170,pedals:'plastic',guard:'no',tire:'hookworm',tireW:2.5,wall:'black',rim:'mtb',spokesN:32,
 saddle:'mtb',saddleH:.15,fender:'none',kick:'none',bottle:'none',bell:'no',decal:'',decalStyle:'none',p:PAINT0};
// stiler endrer deler og farger, ikke ramme, geometri eller tilbehør
const PARTKEYS=['forkType','forkBlade','forkCrown','forkLeg','forkDelta','barType','stemType','stemLen','stemAng','spacers','lever','brakeF','brakeR','rotor','drive','crank','crankLen','pedals','rim','spokesN','saddle','saddleH','decal','decalStyle'];
const GROUP_KIT={'Moderne hardtail':'Standard MTB','Retro MTB':'Retro MTB','Cruiser og klunker':'Klassisk clunker','Gravel':'Gravel','Landevei':'Landevei'};
const isRoad=k=>!!(BIKES[k]&&['Gravel','Landevei'].includes(BIKES[k].g));
// bytt deler (ikke farger) når man går mellom landevei/gravel og andre sykler
function applyStock(k){const b=BIKES[k];if(!b)return null;const kit=KIT[k]||{},name=kit.look||b.kit||GROUP_KIT[b.g];const L=clone(LOOKS[name]);const tires=(kit.tires||[]).concat(L.tires||[]);
  for(const key of PARTKEYS)if(key!=='decal')st[key]=L[key];Object.assign(st,clone(kit.over||{}));
  st.p={...clone(PAINT0),...clone(L.p),...clone(kit.p||{})};st.decal='';
  // bremser som passer rammens fester
  const road=isRoad(k),disc=t=>t==='hyd'||t==='mech',rim=t=>['vbrake','canti','caliper'].includes(t);
  ['brakeF','brakeR'].forEach(x=>{if(b.mounts==='rim'&&disc(st[x]))st[x]=road?'caliper':'vbrake';if(b.mounts==='disc'&&rim(st[x]))st[x]='hyd'});
  if(b.mounts==='disc'&&st.forkType==='rigid'&&rim(st.brakeF))st.brakeF='hyd';
  const w=b.wheel,pick=tires.find(([t,wl])=>tireSizes(t,w).some(x=>tireWalls(t,w,x).includes(wl)))||tires.find(([t])=>tireSizes(t,w).length);
  if(pick){st.tire=pick[0];const xs=tireSizes(pick[0],w),want=b.tw?inchesOf(b.tw):null;
    st.tireW=want?xs.reduce((p,c)=>Math.abs(inchesOf(c)-want)<Math.abs(inchesOf(p)-want)?c:p,xs[0]):xs.slice(-1)[0];st.wall=pick[1]}
  fixTire(st,pick&&pick[1]);applyFactory(k);syncLever();return name}
function applyFactory(k){const f=FACTORY[k];if(!f)return false;const p=clone(f.p);Object.assign(st.p,p);
  if(!p.fork&&['rigid','carbon','truss','springer','dual'].includes(st.forkType)&&!['chrome','alu'].includes(st.p.fork.m)&&isRoad(k))st.p.fork=clone(p.frame);
  st.decalStyle=f.decalStyle;return true}
const look=(o,p)=>({...Object.fromEntries(PARTKEYS.map(k=>[k,BASE[k]])),tires:[['hookworm','black']],...o,p:{...PAINT0,...p,...(p&&p.levers&&!p.blevers?{blevers:p.levers}:{})}});
const LOOKS={
 'Standard MTB':look({tires:[['dhf','black'],['hookworm','black']]},{levers:P_('matt'),housing:P_('gloss','#141516'),hose:P_('matt')}),
 'Klassisk clunker':look({forkType:'rigid',forkBlade:'swoop',forkCrown:'fat',forkLeg:'std',forkDelta:0,barType:'moto',stemType:'quill',stemLen:50,stemAng:20,spacers:10,lever:'vintage',brakeF:'drum',brakeR:'none',drive:'coaster',crank:'square',pedals:'rat',
   tires:[['fatfrank','brownwhite'],['cruiser','darktan'],['dth','darktan'],['dhf','darktan'],['smx','black'],['hookworm','black']],rim:'box',spokesN:36,saddle:'b66',saddleH:.12,decal:'KLUNKER',decalStyle:'pin'},
  {frame:P_('gloss','#141516'),accent:P_('gloss','#e0782f'),headset:P_('chrome'),fork:P_('chrome'),stem:P_('chrome'),bar:P_('chrome'),grips:P_('leather','#6b4325'),levers:P_('chrome'),calipers:P_('chrome'),
   housing:P_('gloss','#141516'),crank:P_('chrome'),ring:P_('chrome'),cassette:P_('chrome'),chain:P_('chrome'),pedals:P_('chrome'),rims:P_('chrome'),spokes:P_('chrome'),nipples:P_('chrome'),hubs:P_('chrome'),
   saddle:P_('leather','#6b4325'),post:P_('chrome'),clamp:P_('chrome'),bolts:P_('chrome')}),
 'Strandcruiser':look({forkType:'springer',forkLeg:'std',forkDelta:0,barType:'cruiser',stemType:'quill',stemLen:40,stemAng:15,spacers:10,lever:'vintage',brakeF:'caliper',brakeR:'none',drive:'nexus3c',crank:'onepiece',pedals:'block',
   tires:[['cruiser','white'],['fatfrank','creme'],['bigapple','black'],['smx','black'],['hookworm','black']],rim:'box',spokesN:36,saddle:'cruiser',saddleH:.1,decal:'',decalStyle:'pin'},
  {frame:P_('gloss','#9fd3bf'),accent:P_('gloss','#ece4cf'),headset:P_('chrome'),fork:P_('chrome'),stem:P_('chrome'),bar:P_('chrome'),grips:P_('leather','#e3d3a8'),levers:P_('chrome'),calipers:P_('chrome'),
   housing:P_('gloss','#ece4cf'),crank:P_('chrome'),ring:P_('chrome'),chain:P_('chrome'),pedals:P_('chrome'),rims:P_('chrome'),spokes:P_('chrome'),nipples:P_('chrome'),hubs:P_('chrome'),
   saddle:P_('leather','#6b4325'),post:P_('chrome'),clamp:P_('chrome'),fender:P_('gloss','#ece4cf'),guard:P_('gloss','#ece4cf'),kick:P_('chrome'),bolts:P_('chrome')}),
 'Rat rod':look({forkType:'dual',forkLeg:'std',forkDelta:0,barType:'bmx',stemType:'bmx',stemLen:50,stemAng:0,spacers:10,lever:'bmx',brakeF:'vbrake',brakeR:'vbrake',drive:'ss',crank:'bmx',pedals:'flat',
   tires:[['hookworm','black']],rim:'deepv',spokesN:36,saddle:'solo',saddleH:.1,decal:'RAT',decalStyle:'stripes'},
  {frame:P_('matt','#3a3d3a'),accent:P_('matt','#c2302a'),headset:P_('anod','#c2302a'),fork:P_('matt'),stem:P_('matt'),bar:P_('matt'),grips:P_('rubber','#c2302a'),levers:P_('matt'),calipers:P_('anod','#c2302a'),
   housing:P_('gloss','#c2302a'),crank:P_('matt'),ring:P_('anod','#c2302a'),chain:P_('matt'),pedals:P_('anod','#c2302a'),rims:P_('matt'),spokes:P_('matt'),nipples:P_('anod','#c2302a'),hubs:P_('anod','#c2302a'),
   saddle:P_('vinyl'),post:P_('matt'),clamp:P_('anod','#c2302a'),bolts:P_('oil')}),
 'Retro MTB':look({forkType:'rigid',forkBlade:'curve',forkCrown:'seg',forkLeg:'thin',forkDelta:0,barType:'riser',stemType:'quill',stemLen:110,stemAng:10,spacers:10,lever:'long',brakeF:'canti',brakeR:'canti',drive:'3x8',crank:'square',crankLen:170,pedals:'plastic',
   tires:[['smx','black'],['bigapple','black'],['fatfrank','black']],rim:'box',spokesN:32,saddle:'mtb',saddleH:.16,decal:'',decalStyle:'stripes'},
  {fork:P_('gloss','#141516'),stem:P_('alu'),bar:P_('alu'),grips:P_('rubber'),levers:P_('alu'),calipers:P_('alu'),crank:P_('alu'),ring:P_('alu'),cassette:P_('chrome'),chain:P_('chrome'),der:P_('alu'),pedals:P_('matt'),rims:P_('alu'),spokes:P_('chrome'),hubs:P_('alu'),saddle:P_('vinyl'),post:P_('alu'),clamp:P_('alu')}),
 'Landevei':look({forkType:'carbon',forkDelta:0,barType:'roadcompact',stemType:'ahead',stemLen:100,stemAng:-6,spacers:20,lever:'road',brakeF:'hyd',brakeR:'hyd',rotor:160,drive:'r7100',crank:'modern',crankLen:172.5,pedals:'road',
   tires:[['gp5000','black']],rim:'aero',spokesN:24,saddle:'power',saddleH:.2,decal:'',decalStyle:'none'},
  {fork:P_('gloss','#141516'),stem:P_('matt'),bar:P_('matt'),grips:P_('rubber','#141516'),levers:P_('matt'),housing:P_('gloss','#141516'),hoods:P_('rubber'),calipers:P_('matt'),crank:P_('matt'),ring:P_('matt'),cassette:P_('alu'),chain:P_('alu'),der:P_('matt'),pedals:P_('matt'),rims:P_('matt'),spokes:P_('matt'),hubs:P_('matt'),saddle:P_('vinyl'),post:P_('matt'),clamp:P_('matt')}),
 'Gravel':look({forkType:'carbon',forkDelta:0,barType:'gravel12',stemType:'ahead',stemLen:90,stemAng:-6,spacers:20,lever:'road',brakeF:'hyd',brakeR:'hyd',rotor:160,drive:'grx820',crank:'modern',crankLen:172.5,pedals:'spd',
   tires:[['gravelking','darktan'],['riddler','tan']],rim:'mtb',spokesN:28,saddle:'power',saddleH:.18,decal:'',decalStyle:'none'},
  {fork:P_('matt','#141516'),stem:P_('matt'),bar:P_('matt'),grips:P_('leather','#9a5a24'),levers:P_('matt'),housing:P_('gloss','#141516'),hoods:P_('rubber'),calipers:P_('matt'),crank:P_('matt'),ring:P_('matt'),cassette:P_('alu'),chain:P_('alu'),der:P_('matt'),pedals:P_('matt'),rims:P_('matt'),spokes:P_('matt'),hubs:P_('matt'),saddle:P_('leather','#9a5a24'),post:P_('matt'),clamp:P_('matt')}),
 'Klassisk racer':look({forkType:'rigid',forkBlade:'curve',forkCrown:'fat',forkLeg:'thin',forkDelta:0,barType:'classicdrop',stemType:'quill',stemLen:90,stemAng:-10,spacers:5,lever:'road',brakeF:'caliper',brakeR:'caliper',drive:'road2x8',crank:'square',crankLen:170,pedals:'rat',
   tires:[['gravelking','darktan'],['gp5000','skin']],rim:'box',spokesN:32,saddle:'b17',saddleH:.16,decal:'',decalStyle:'pin'},
  {headset:P_('chrome'),fork:P_('chrome'),stem:P_('alu'),bar:P_('alu'),grips:P_('leather','#9a5a24'),levers:P_('alu'),hoods:P_('rubber','#e3d3a8'),calipers:P_('alu'),housing:P_('gloss','#ece4cf'),crank:P_('alu'),ring:P_('alu'),cassette:P_('chrome'),chain:P_('chrome'),der:P_('alu'),pedals:P_('alu'),rims:P_('alu'),spokes:P_('chrome'),nipples:P_('chrome'),hubs:P_('alu'),saddle:P_('leather','#9a5a24'),post:P_('alu'),clamp:P_('alu'),bolts:P_('chrome')}),
 'Oil slick trail':look({forkType:'rigid',forkBlade:'straight',forkCrown:'seg',forkLeg:'std',forkDelta:0,barType:'jones',stemType:'ahead',stemLen:50,stemAng:0,spacers:15,lever:'hyd',brakeF:'hyd',brakeR:'hyd',rotor:180,drive:'gx',crank:'modern',pedals:'flat',
   tires:[['dhf','darktan'],['rekon','darktan'],['ranger','tan'],['dth','darktan'],['hookworm','black']],rim:'mtb',spokesN:32,saddle:'volt',saddleH:.16,decal:'',decalStyle:'none'},
  {frame:P_('oil'),accent:P_('gloss','#141516'),headset:P_('oil'),fork:P_('matt'),stem:P_('oil'),bar:P_('matt'),grips:P_('leather','#6b4325'),levers:P_('matt'),calipers:P_('oil'),rotors:P_('oil'),
   hose:P_('braided'),crank:P_('oil'),ring:P_('oil'),cassette:P_('rainbow'),chain:P_('oil'),der:P_('matt'),pedals:P_('oil'),rims:P_('matt'),spokes:P_('oil'),nipples:P_('rainbow'),hubs:P_('oil'),
   saddle:P_('vinyl'),post:P_('matt'),clamp:P_('oil'),bolts:P_('rainbow')})};

// dekkbredde: tall over 10 er millimeter (landevei og gravel), ellers tommer
const inchesOf=w=>w>10?w/25.4:w;
const tireSizes=(t,w)=>TIRES[t]&&TIRES[t].v[w]?Object.keys(TIRES[t].v[w]).map(Number).sort((a,b)=>a-b):[];
const tireWalls=(t,w,x)=>(TIRES[t]&&TIRES[t].v[w]&&TIRES[t].v[w][x])||[];
function fixTire(s,prefWall){const w=s.geo.wheel;
  if(RIMDB[s.rim]&&!rimFits(RIMDB[s.rim],w))s.rim=RIMDB[s.rim].prof==='aero'&&w!=='26'?'aero':RIMDB[s.rim].prof==='v'?'deepv':'mtb';
  if(!tireSizes(s.tire,w).length)s.tire=Object.keys(TIRES).find(k=>tireSizes(k,w).length);
  const ws=tireSizes(s.tire,w),cur=inchesOf(+s.tireW);if(!ws.includes(+s.tireW))s.tireW=ws.reduce((a,b)=>Math.abs(inchesOf(b)-cur)<Math.abs(inchesOf(a)-cur)?b:a,ws[ws.length-1]);
  const walls=tireWalls(s.tire,w,s.tireW);
  if(prefWall&&walls.includes(prefWall))s.wall=prefWall;
  if(!walls.includes(s.wall)){const want=s.wall&&s.wall!=='black'?walls.find(x=>x!=='black'):null;s.wall=want||walls[0]}}
function migrate(o){const s={...clone(BASE),...clone(o)};s.p={...clone(PAINT0),...(o.p||{})};if(o.p&&o.p.levers&&!o.p.blevers)s.p.blevers=clone(o.p.levers);   // eldre bygg: bremsehendlene fikk samme farge som girhendlene
  if(!s.geo||!s.geo.stack)s.geo=geoOf(BIKES[s.bike]?s.bike:DEFAULT_BIKE);
  s.geo={...FRAME0,...(BIKES[s.bike]?FRAMEX[s.bike]||{}:{}),...s.geo};   // nye rammeegenskaper (f.eks. Halo-gaffel) kommer også inn i lagrede bygg
  if(+s.tireW>10&&!TIRES[s.tire]?.mm)s.tireW=2.25;
  const CAT={drive:DRIVES,barType:BARS,saddle:SADDLES,forkType:FORKS,forkBlade:BLADES,forkCrown:CROWNS,forkLeg:LEGS,brakeF:BRAKES,brakeR:BRAKES,lever:LEVERS,stemType:STEMS,crank:CRANKS,pedals:PEDALS,rim:RIMS};
  for(const k in CAT)if(!CAT[k][s[k]])s[k]=BASE[k];
  if(!BIKES[s.bike])s.bike=null;s.finn=null;
  if(!SIDEWALLS[s.wall])s.wall=(s.wall&&String(s.wall).toLowerCase()!=='#141516')?'darktan':'black';
  if(!['none','stripes','panel','pin','factory'].includes(s.decalStyle))s.decalStyle='none';
  fixTire(s);return s}
// en stil endrer bare deler og farger, aldri rammen eller geometrien
// stil og drivverk: girsystemet holdes innenfor rimelighetens grenser.
// Kjedegir blir kjedegir med omtrent samme antall gir (3×7 kan bli 1×9), navgir og fotbrems beholdes, og landeveisgir krever dropstyre.
function styleDrive(curK,wantK,drop){const C=DRIVES[curK],W=DRIVES[wantK];if(!C||C.t!=='der')return curK;
  if(W&&W.t==='der'&&!!W.road===drop&&W.cs[2]-C.cs[2]>=-1&&W.cs[2]-C.cs[2]<=2)return wantK;
  const oneX=!W||W.t!=='der'||W.ring.length===1,T=C.cs[2]+(C.ring.length>1&&oneX?1:0);
  let best=curK,bc=1e9;
  for(const [k,D] of Object.entries(DRIVES)){if(D.t!=='der'||!!D.road!==drop)continue;
    const c=Math.abs(D.cs[2]-T)+(oneX?(D.ring.length>1?2:0):(W&&D.ring.length!==W.ring.length?0.5:0))-D.cs[2]*0.001;
    if(c<bc){bc=c;best=k}}
  return best}
// «Behold farge og dekor» (standard på): stilen bytter bare deler og delefarger. Rammefarge, dekorfarger, dekortekst og striper beholdes.
let keepLook=(()=>{try{return localStorage.getItem('styler-keeplook')!=='0'}catch(e){return true}})();
function applyLook(name){const L=clone(LOOKS[name]);const tires=L.tires||[];delete L.tires;
  // Bremsene beholdes slik rammen er bygget (skive forblir skive, V-brems forblir V-brems).
  const s={...clone(st),...L};
  if(keepLook){s.p={...clone(PAINT0),...L.p,frame:clone(st.p.frame),accent:clone(st.p.accent),decal2:clone(st.p.decal2)};s.decal=st.decal;s.decalStyle=st.decalStyle}
  else s.p={...clone(PAINT0),...L.p,frame:clone(L.p.frame&&LOOKS[name].p.frame!==PAINT0.frame?L.p.frame:st.p.frame)};
  s.brakeF=st.brakeF;s.brakeR=st.brakeR;s.rotor=st.rotor;s.drive=styleDrive(st.drive,L.drive,!!BARS[s.barType].drop);
  // dekkene holdes innenfor det rammen er laget for (gravelramme får ikke 2,4" MTB-dekk). Passer ingen av stilens dekk, beholdes dekket som er på
  const w=s.geo.wheel,mx=!st.geoEdited&&maxTire(st.bike),fit=t=>tireSizes(t,w).filter(x=>!mx||inchesOf(x)<=mx.in+0.01);
  const pick=tires.find(([t,wl])=>fit(t).some(x=>tireWalls(t,w,x).includes(wl)))||tires.find(([t])=>fit(t).length);
  if(pick){s.tire=pick[0];const xs=fit(pick[0]).filter(x=>tireWalls(pick[0],w,x).includes(pick[1]));s.tireW=(xs.length?xs:fit(pick[0])).slice(-1)[0];s.wall=tireWalls(pick[0],w,s.tireW).includes(pick[1])?pick[1]:st.wall}
  else{s.tire=st.tire;s.tireW=st.tireW;s.wall=st.wall}
  st=migrate(s);fixTire(st,pick&&pick[1]);syncLever()}
// appen starter alltid med standardsykkelen; forrige økt kan hentes fra snackbaren
let prevSession=null;try{const c=JSON.parse(localStorage.getItem('styler-current')||'null');prevSession=c?migrate(c):null}catch(e){prevSession=null}
let st=migrate(BASE);

/* ===================== RENDERER ===================== */
const canvas=document.getElementById('view');
let renderer,scene,camera,ROOT,noiseTex,swirlTex,rainbowTex,oilTex,tapeTex,needBuild=true,GM,M,ANCH,FOCUS={},pickables=[];
function initThree(){
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(2,window.devicePixelRatio||1));
  renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1.0;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(30,1,0.01,60);
  // fotostudio: mørkt rom med skarpe softbokser og stripelys, så krom og polert metall får tydelige refleksjoner og kontrast
  const pm=new THREE.PMREMGenerator(renderer);const env=new THREE.Scene();
  const bg=new THREE.Mesh(new THREE.SphereGeometry(20,48,24),new THREE.ShaderMaterial({side:THREE.BackSide,vertexShader:'varying vec3 p;void main(){p=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'varying vec3 p;void main(){float y=p.y;vec3 top=vec3(.035,.035,.04);vec3 hor=vec3(.2,.195,.19);vec3 gnd=vec3(.05,.048,.046);vec3 c=y>0.?mix(hor,top,pow(clamp(y*2.4,0.,1.),.7)):mix(hor*.6,gnd,clamp(-y*5.,0.,1.));gl_FragColor=vec4(c,1.);}'}));
  env.add(bg);
  const box=(w,h,x,y,z,ry,rx,k,col=[1,1,1])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(col[0]*k,col[1]*k,col[2]*k),side:THREE.DoubleSide}));m.position.set(x,y,z);m.rotation.set(rx,ry,0,'YXZ');env.add(m)};
  box(10,3.5,0,9,0,0,Math.PI/2,13);                   // stor taklampe
  box(1.4,8,9,2.6,4,-Math.PI/2,0,18,[1,.96,.9]);      // varm stripe høyre foran
  box(1.4,8,-9,2.6,-4,Math.PI/2,0,13,[.9,.95,1]);     // kald stripe venstre bak
  box(1.2,7,-6,2.4,8,Math.PI*0.8,0,9);                // kantlys bak
  box(6,2.6,0,2.4,-11,0,0,6);box(6,2.6,0,2.4,11,Math.PI,0,4);
  box(30,.18,0,.45,-12,0,0,12);box(30,.18,0,.45,12,Math.PI,0,12);  // skarp horisontlinje i krom
  box(14,14,0,-0.4,0,0,-Math.PI/2,0.35,[.9,.9,.92]);  // gulv som kaster litt lys tilbake
  envPM=pm.fromScene(env,0.006).texture;scene.environment=envPM;scene.environmentIntensity=0.9;   // reserve til HDRI-en er lest inn
  scene.environmentRotation.y=ENV_ROT;
  const hemi=new THREE.HemisphereLight(0xffffff,0x2a2a2e,0.1);scene.add(hemi);
  // hovedlyset står der softboksen i HDRI-en står, så skygge og refleks stemmer overens
  // hovedlyset står rundt 45° til siden for 3/4-kameraet og 45° over gulvet, så skyggen faller synlig bak og til siden for sykkelen
  const key=new THREE.DirectionalLight(0xfff8f0,1.25);key.position.set(Math.cos(KEY_EL)*Math.cos(KEY_AZ)*4,Math.sin(KEY_EL)*4,Math.cos(KEY_EL)*Math.sin(KEY_AZ)*4);key.castShadow=true;
  key.shadow.mapSize.set(2048,2048);const sc=key.shadow.camera;sc.left=-1.4;sc.right=1.4;sc.top=1.4;sc.bottom=-1.4;sc.near=1;sc.far=10;key.shadow.radius=4;key.shadow.bias=-0.0003;key.shadow.normalBias=0.01;
  scene.add(key);
  const rim=new THREE.DirectionalLight(0xe8eeff,0.45);rim.position.set(-1.2,3,-3.4);scene.add(rim);   // svakt kantlys bakfra
  LIGHTS=[hemi,key,rim];loadHDR(pm);
  ground=new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.ShadowMaterial({opacity:0.35}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  noiseTex=canvasTex(256,256,()=>{const v=110+Math.random()*110;return[v,v,v]});noiseTex.repeat.set(8,8);
  swirlTex=canvasTex(512,256,(x,y)=>{const t=Math.sin(x*.021+2.4*Math.sin(y*.026+x*.006))+.7*Math.sin(y*.041-x*.013)+.4*Math.sin((x+y)*.009);const v=128+t*60;return[v,v,v]});
  rainbowTex=canvasTex(512,256,(x,y)=>hsl((x/512*360+y/256*90)%360,.85,.55));rainbowTex.colorSpace=THREE.SRGBColorSpace;
  tapeTex=canvasTex(256,64,(x,y)=>{const t=((x*0.9+y*2.2)%32)/32;const v=t<0.12?60:t<0.2?150:205+Math.random()*30;return[v,v,v]});tapeTex.repeat.set(26,1);
  oilTex=canvasTex(512,256,(x,y)=>{const t=Math.sin(x*.021+2.4*Math.sin(y*.026+x*.006))+.7*Math.sin(y*.041-x*.013)+.4*Math.sin((x+y)*.009);return hsl(((t*.28+.5)*330+190)%360,.8,.5+.08*Math.sin(t*3))});oilTex.colorSpace=THREE.SRGBColorSpace;
  makeBg();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>setTimeout(makeBg,30));
  new MutationObserver(()=>setTimeout(makeBg,30)).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  resize();new ResizeObserver(resize).observe(canvas);
  document.getElementById('loading').hidden=true;
  setQuality(quality);setCam();loop();
}
let _latTex=null;
function latticeTex(){if(_latTex)return _latTex;const W=512,H=Math.round(512*0.0208/0.024),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  // sømløs bikakeflis: 2 × 3 sekskanter (side 4 mm), stagene tegnes som linjer med knutepunkter
  x.fillStyle='#0b0b0c';x.fillRect(0,0,W,H);const s=W/6,h=s*Math.sqrt(3)/2;x.strokeStyle='#d8d8d8';x.lineWidth=W*0.03;x.lineJoin='round';x.fillStyle='#e8e8e8';
  for(let ci=-1;ci<=3;ci++)for(let ri=-1;ri<=7;ri++){const cx=ci*3*s+(Math.abs(ri)%2?1.5*s:0),cy=ri*h;x.beginPath();
      for(let k=0;k<=6;k++){const a=Math.PI/3*k,px=cx+s*Math.cos(a),py=cy+s*Math.sin(a);k?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();
      for(let k=0;k<6;k++){const a=Math.PI/3*k;x.beginPath();x.arc(cx+s*Math.cos(a),cy+s*Math.sin(a),W*0.022,0,Math.PI*2);x.fill()}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;t.userData={shared:true};_latTex=t;return t}
function hsl(h,s,l){const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return 255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)))};return[f(0),f(8),f(4)]}
function canvasTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');const id=x.createImageData(w,h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){const p=fn(i,j),o=(j*w+i)*4;id.data[o]=p[0];id.data[o+1]=p[1];id.data[o+2]=p[2];id.data[o+3]=255}
  x.putImageData(id,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.userData={shared:true};return t}
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<1.2?40:30;camera.updateProjectionMatrix();
  if(composer){composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(w,h)}dirty=true}
/* ---------- bakgrunn, kvalitet og skygger i kroker (GTAO) ---------- */
let composer=null,gtao=null,bgTex=null,dirty=true,composerLoading=false,ground=null;
/* ---------- HDRI: «Studio Small 03» fra Poly Haven (CC0), 1k. Ligger innebygd som base64 så appen er én fil ---------- */
const HDR_B64='__HDR_B64__',ENV_ROT=0.1,ENV_I=0.62,KEY_AZ=1.45,KEY_EL=0.8;
let hdrTex=null,hdrPT=null,envPM=null,LIGHTS=[],hdrReady=Promise.resolve(null);
// Studioet i HDRI-en har svarte gardiner, så krom speiler nesten bare svart. Som i et ekte produktstudio legges det inn hvite lysflater:
// en stor flate over sykkelen og tre høye striper rundt. Den svært sterke taklampen dempes litt, så fotomodus får mindre støy.
function addCards(d){const W=d.width,H=d.height,D=d.data,f=THREE.DataUtils.fromHalfFloat,h2=THREE.DataUtils.toHalfFloat;
  const S=[[-0.35,0.12,-0.06,0.8,5],[2.7,0.1,-0.06,0.75,4],[-2.05,0.07,0.0,0.6,2.5]];   // azimut i verden, halv bredde, høyde fra og til (rad), styrke
  const sm=(e0,e1,x)=>{const k=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return k*k*(3-2*k)};
  for(let j=0;j<H;j++){const el=(0.5-(j+0.5)/H)*Math.PI,ce=Math.cos(el),se=Math.sin(el);
    for(let i=0;i<W;i++){const ph=((i+0.5)/W-0.5)*2*Math.PI-ENV_ROT,o=(j*W+i)*4;let add=0.03;
      for(const [a,hw,e0,e1,k] of S){const da=Math.abs(Math.atan2(Math.sin(ph-a),Math.cos(ph-a)));if(da>hw+0.05)continue;add+=k*(1-sm(hw,hw+0.04,da))*sm(e0-0.04,e0,el)*(1-sm(e1,e1+0.04,el))}
      if(se>0.25){const t=1.5/se,x=t*ce*Math.cos(ph),z=t*ce*Math.sin(ph);add+=0.9*(1-sm(1.2,1.45,Math.abs(x)))*(1-sm(0.22,0.34,Math.abs(z)))}
      for(let c=0;c<3;c++)D[o+c]=h2(Math.min(600,f(D[o+c]))+add)}}}
// Lysmiljø for rendringen. I visningen kommer skyggen fra hovedlyset (foran til høyre), mens taklampen i HDRI-en bak til venstre bare gir mykt fyll.
// I rendringen kaster alt lys skygge, og taklampen var sju ganger sterkere enn hovedlyset, så skyggen falt feil vei. Her dempes taklampen til
// samme styrke som kantlyset, og hovedlyset legges inn som en softboks i samme retning og styrke som i visningen.
function ptEnv(d){const W=d.width,H=d.height,S=d.data,f=THREE.DataUtils.fromHalfFloat,h2=THREE.DataUtils.toHalfFloat,O=new Float32Array(W*H*4);
  const kAz=KEY_AZ+ENV_ROT,kEl=KEY_EL,hw=0.11,hh=0.1;   // samme retning som DirectionalLight «key»
  const sm=(e0,e1,x)=>{const k=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return k*k*(3-2*k)};
  let lampI=0,cardW=0;const card=new Float32Array(W*H),lamp=new Uint8Array(W*H);
  for(let j=0;j<H;j++){const el=(0.5-(j+0.5)/H)*Math.PI,dO=(2*Math.PI/W)*(Math.PI/H)*Math.cos(el);
    for(let i=0;i<W;i++){const az=((i+0.5)/W-0.5)*2*Math.PI,q=j*W+i,o=q*4;for(let c=0;c<3;c++)O[o+c]=f(S[o+c]);O[o+3]=1;
      const L=(O[o]+O[o+1]+O[o+2])/3;if(L>40&&el>0.3){lamp[q]=1;lampI+=L*dO}
      const da=Math.abs(Math.atan2(Math.sin(az-kAz),Math.cos(az-kAz)))*Math.cos(el),de=Math.abs(el-kEl);
      const w=(1-sm(hw,hw+0.05,da))*(1-sm(hh,hh+0.05,de));if(w>0){card[q]=w;cardW+=w*dO}}}
  // fyllyset dempes og hovedlyset gjøres sterkere enn i visningen, slik en produktfotograf gjør, så skyggene blir tydelige
  const FILL=0.35,KEY=3.2,kL=lampI>0?(0.45/ENV_I)/lampI:1,kC=(KEY/ENV_I)/Math.max(1e-6,cardW);
  const D=new Uint16Array(W*H*4);
  for(let q=0;q<W*H;q++){const o=q*4;for(let c=0;c<3;c++)D[o+c]=h2(ENV_I*(O[o+c]*(lamp[q]?kL:FILL)+card[q]*kC*(c===2?0.94:c===1?0.97:1)));D[o+3]=h2(1)}
  const t=new THREE.DataTexture(D,W,H,THREE.RGBAFormat,THREE.HalfFloatType);t.colorSpace=THREE.LinearSRGBColorSpace;t.minFilter=t.magFilter=THREE.LinearFilter;
  t.generateMipmaps=false;t.flipY=true;t.mapping=THREE.EquirectangularReflectionMapping;t.needsUpdate=true;return t}
// Lysmiljø for visningen: studioet har nesten svarte gardiner, så blank krom speilet enten svart eller en hvit lysflate.
// Her løftes de mørke flatene til et nøytralt grått rom (lysere over horisonten, litt varmere gulv), mens lysflatene beholder styrken sin.
// Det gir krom og alu jevnere refleksjoner med gråtoner imellom, slik de ser ut i en butikk.
function liveEnv(d){const W=d.width,H=d.height,S=d.data,f=THREE.DataUtils.fromHalfFloat,h2=THREE.DataUtils.toHalfFloat,D=new Uint16Array(W*H*4);
  for(let j=0;j<H;j++){const el=(0.5-(j+0.5)/H)*Math.PI,se=Math.sin(el);
    const lift=se>0?0.3+0.1*(1-se):0.26-0.08*Math.min(1,-se*3),warm=se<0?[1.03,1.0,0.95]:[0.98,0.99,1.02];
    for(let i=0;i<W;i++){const o=(j*W+i)*4;for(let c=0;c<3;c++){const x=f(S[o+c]);D[o+c]=h2(x+lift*warm[c])}D[o+3]=h2(1)}}
  const t=new THREE.DataTexture(D,W,H,THREE.RGBAFormat,THREE.HalfFloatType);t.colorSpace=THREE.LinearSRGBColorSpace;t.minFilter=t.magFilter=THREE.LinearFilter;
  t.generateMipmaps=false;t.flipY=true;t.mapping=THREE.EquirectangularReflectionMapping;t.needsUpdate=true;return t}
function loadHDR(pm){hdrReady=(async()=>{try{
    if(HDR_B64.length<100)return null;
    const {RGBELoader}=await import('three/addons/loaders/RGBELoader.js');
    const bin=atob(HDR_B64),u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
    const d=new RGBELoader().setDataType(THREE.HalfFloatType).parse(u8.buffer);addCards(d);
    const t=new THREE.DataTexture(d.data,d.width,d.height,THREE.RGBAFormat,d.type);
    t.colorSpace=THREE.LinearSRGBColorSpace;t.minFilter=t.magFilter=THREE.LinearFilter;t.generateMipmaps=false;t.flipY=true;t.mapping=THREE.EquirectangularReflectionMapping;t.needsUpdate=true;
    hdrTex=t;try{hdrPT=ptEnv(d)}catch(e){hdrPT=null}const old=envPM;envPM=pm.fromEquirectangular(liveEnv(d)).texture;if(old)old.dispose();
    if(!PH.on)scene.environment=envPM;scene.environmentIntensity=ENV_I;dirty=true;return t}
  catch(e){console.warn('HDRI kunne ikke lastes, bruker reservelys',e);return null}})()}
let quality=(()=>{try{return localStorage.getItem('styler-quality')||null}catch(e){return null}})()||(matchMedia('(pointer:coarse)').matches?'fast':'high');
// showroom-bakgrunn: lilla (GV Sykkel), svart eller hvit
const BGS={lilla:{hi:'#9d74d6',mid:'#5c2f94',lo:'#1d0c33',sh:0.42,fl:'#3e1f6e'},svart:{hi:'#45454c',mid:'#1c1c20',lo:'#050506',sh:0.6,fl:'#38383f'},hvit:{hi:'#ffffff',mid:'#f1f0f4',lo:'#cfced6',sh:0.26,fl:'#a6a5ae'}};
let bgStyle=(()=>{try{return localStorage.getItem('styler-bg')}catch(e){return null}})();if(!BGS[bgStyle])bgStyle='lilla';
function setBg(k){if(!BGS[k])return;bgStyle=k;try{localStorage.setItem('styler-bg',k)}catch(e){}document.querySelectorAll('.bgsel [data-bg]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.bg===k));const sg=document.getElementById('stage');if(sg)sg.dataset.bg=k;if(scene)makeBg()}
function makeBg(){const B0=BGS[bgStyle],hi=B0.hi,lo=B0.lo;if(ground)ground.material.opacity=B0.sh;
  const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');const g=x.createRadialGradient(256,200,8,256,200,400);g.addColorStop(0,hi);g.addColorStop(0.55,B0.mid);g.addColorStop(1,lo);x.fillStyle=g;x.fillRect(0,0,512,512);
  if(bgTex)bgTex.dispose();bgTex=new THREE.CanvasTexture(c);bgTex.colorSpace=THREE.SRGBColorSpace;
  if(PH.on){phFloorColor();if(PH.pt)PH.pt.updateMaterials()}else scene.background=bgTex;dirty=true}
async function setupComposer(){if(composer||composerLoading)return;composerLoading=true;
  try{const [{EffectComposer},{RenderPass},{GTAOPass},{OutputPass}]=await Promise.all([import('three/addons/postprocessing/EffectComposer.js'),import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/GTAOPass.js'),import('three/addons/postprocessing/OutputPass.js')]);
    const sz=renderer.getDrawingBufferSize(new THREE.Vector2());
    const rt=new THREE.WebGLRenderTarget(sz.x,sz.y,{type:THREE.HalfFloatType,samples:4});
    const c=new EffectComposer(renderer,rt);c.addPass(new RenderPass(scene,camera));
    gtao=new GTAOPass(scene,camera,sz.x,sz.y);
    gtao.updateGtaoMaterial({radius:0.07,distanceExponent:1.6,thickness:0.6,scale:1.0,samples:16,distanceFallOff:1});
    gtao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16});gtao.blendIntensity=0.85;
    // GTAO tegner scenen på nytt med normal-materiale; uten dette blir bakgrunnsplanet en vegg i dybdebildet
    const gtaoRender=gtao.render.bind(gtao);gtao.render=(...args)=>{const bg=scene.background;scene.background=null;try{gtaoRender(...args)}finally{scene.background=bg}};
    c.addPass(gtao);c.addPass(new OutputPass());composer=c;resize()}
  catch(e){composer=null;console.warn('Skygger i kroker er slått av:',e&&e.message)}
  composerLoading=false;dirty=true;updQualityBtn()}
function setQuality(q){quality=q;try{localStorage.setItem('styler-quality',q)}catch(e){}
  if(q==='high')setupComposer();updQualityBtn();dirty=true}
function updQualityBtn(){const b=document.querySelector('[data-quality]');if(b){b.setAttribute('aria-pressed',quality==='high');b.textContent=quality==='high'?(composer?'Høy kvalitet':'Høy kvalitet …'):'Rask visning'}}
function render(){if(quality==='high'&&composer)composer.render();else renderer.render(scene,camera)}

/* ===================== RENDRE BILDE: path tracing ===================== */
// three-gpu-pathtracer regner lyset fysisk: myke skygger fra softboksen, ekte refleksjoner i krom og lakk, lys som spretter mellom delene.
// Bildet blir renere for hver runde.
const PH_MOB=matchMedia('(pointer:coarse)').matches;
// To kvaliteter. Antall runder tilpasses maskinen: etter noen sekunder måles farten, og målet settes så bildet blir ferdig innen tidsbudsjettet.
// «Beste» rendrer i dobbel oppløsning (supersampling), med flere runder og dybdeskarphet, og lagrer bildet i full oppløsning.
const RQ={rask:{n:'Rask',budget:40,cap:PH_MOB?200:400,floor:PH_MOB?40:64,ss:0},beste:{n:'Beste',budget:PH_MOB?110:120,cap:PH_MOB?1200:3000,floor:PH_MOB?96:160,ss:1},
  ultra:{n:'Ultra',budget:PH_MOB?240:300,cap:PH_MOB?3000:8000,floor:PH_MOB?200:400,ss:2}};
let rq=(()=>{try{return localStorage.getItem('styler-rq')}catch(e){return null}})();if(!RQ[rq])rq='beste';
const PH={on:false,busy:false,pt:null,merge:null,max:400,group:null,floor:null,t0:0,ts:0,tuned:false,done:false,camKey:'',mats:[],dq:null,cam:null,xq:null,FSQ:null};
const PT_GAIN=2.2;   // lysstyrke i rendringen i forhold til visningen
const phEl=id=>document.getElementById(id);
function phScale(){const pr=renderer.getPixelRatio(),bw=renderer.getDrawingBufferSize(new THREE.Vector2()).x||1000;
  const ss=RQ[rq].ss;if(ss===2)return PH_MOB?Math.min(2,2600/bw):Math.max(1,Math.min(2.5/pr,3400/bw,2.5));
  if(ss===1)return PH_MOB?Math.min(1.5,2400/bw):Math.max(1,Math.min(2/pr,2600/bw,2));
  return PH_MOB?0.85:pr>1.5?0.8:1}
function phUI(){const box=phEl('photo');if(!box)return;box.hidden=!PH.on&&!PH.busy;document.body.classList.toggle('photo-on',PH.on||PH.busy);
  const b=document.querySelector('[data-photo]');if(b)b.setAttribute('aria-pressed',PH.on||PH.busy);box.classList.toggle('done',PH.on&&PH.done&&!PH.fin);
  box.querySelectorAll('[data-rq]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.rq===rq));
  if(PH.busy&&!PH.on){phEl('ph-n').textContent='Gjør klar scenen …';phEl('ph-bar').style.width='0%';phEl('ph-save').disabled=true;return}
  if(!PH.on||!PH.pt)return;const n=Math.min(PH.max,Math.floor(PH.pt.samples)),now=performance.now(),sec=Math.round((now-PH.t0)/1000);
  const tm=t=>t<90?t+' s':Math.round(t/60)+' min';let txt;
  if(PH.done&&PH.fin)txt=`Fjerner korn · ${Math.round(PH.finP*100)} %`;
  else if(PH.done){const t=PH.pt.target;txt=`✓ Ferdig · ${t.width}×${t.height} px`}
  else if(n<1)txt='Regner ut lyset …';
  else if(!PH.tuned)txt=`Regner ut lyset · ${sec} s`;
  else{const pct=Math.round(100*n/PH.max),left=Math.max(1,Math.round((PH.max-n)/PH.rate));txt=`${pct} % · ca. ${tm(left)} igjen`}
  const el=phEl('ph-n');if(el.textContent!==txt)el.textContent=txt;phEl('ph-bar').style.width=(PH.done?100:100*n/PH.max).toFixed(1)+'%';phEl('ph-save').disabled=n<4}
// bytte kvalitet underveis: ny oppløsning starter på nytt, samme oppløsning fortsetter med nytt mål
function setRQ(k){if(!RQ[k]||k===rq&&PH.on)return;rq=k;try{localStorage.setItem('styler-rq',k)}catch(e){}
  if(PH.on&&PH.pt){const s0=PH.pt.renderScale,s1=phScale();PH.pt.renderScale=s1;
    if(Math.abs(s0-s1)>1e-3)phRestart();
    else{const n=PH.pt.samples;PH.done=false;PH.gen=(PH.gen||0)+1;phFinalClear();if(PH.rate)PH.max=Math.max(RQ[rq].floor,Math.floor(n)+4,Math.min(RQ[rq].cap,Math.round(PH.n0+PH.rate*RQ[rq].budget)));else PH.max=RQ[rq].floor;if(n>=PH.max)PH.max=Math.floor(n)+1}}
  phUI()}
function phFloorColor(){if(PH.floor)PH.floor.material.color.set(BGS[bgStyle].fl)}
function phFloor(){if(PH.floor)return PH.floor;
  const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d'),g=x.createRadialGradient(128,128,0,128,128,128);
  g.addColorStop(0,'#fff');g.addColorStop(0.24,'#fff');g.addColorStop(0.5,'#707070');g.addColorStop(0.8,'#000');g.addColorStop(1,'#000');x.fillStyle=g;x.fillRect(0,0,256,256);
  const t=new THREE.CanvasTexture(c);
  const m=new THREE.MeshPhysicalMaterial({color:BGS[bgStyle].fl,roughness:0.6,metalness:0,specularIntensity:0.18,alphaMap:t,transparent:true});   // halvmatt showroomgulv: svak speiling, lite blending fra lysene
  const f=new THREE.Mesh(new THREE.CircleGeometry(2.4,96),m);f.rotation.x=-Math.PI/2;f.position.y=-0.0004;PH.floor=f;return f}
// Path traceren holder ett materialnummer per mesh og får feil farger når det blir over 255 mesher. Sykkelen bakes derfor om til én mesh per materiale,
// med verdenskoordinatene lagt inn og instanser (eiker, kjede, knotter) pakket ut. Speilingen (scale.z = -1) snur trekantene, så de snus tilbake.
function photoBake(){const by=new Map(),m=new THREE.Matrix4(),mw=new THREE.Matrix4();ROOT.updateMatrixWorld(true);
  // klarlakk og sheen gir svarte flater på noen skjermkort (sett på iPhone). I rendringen gjøres lakken om til ett blankt lag med tilsvarende glans
  const conv=new Map(),ptMat=m=>{if(conv.has(m))return conv.get(m);let c=m;
    // gummi: path traceren bruker ikke bump-kart, så dekkene får litt lysere farge og svak glans i stedet, ellers blir de flate svarte flater
    if(m.userData.iri){c=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:0.55,roughness:0.16,specularIntensity:1,vertexColors:true,side:m.side});   /* i studiolyset blir helt metallisk film for mørk, så litt av fargen spres som maling */c.userData.iri=m.userData.iri;PH.mats.push(c)}
    else if(m.userData.rubber){c=m.clone();c.color.multiplyScalar(1.8);c.roughness=0.62;c.bumpMap=null;PH.mats.push(c)}
    else if(m.isMeshPhysicalMaterial&&(m.clearcoat>0||m.sheen>0)){c=m.clone();
      if(m.clearcoat>0){const cr=Math.max(0.05,m.clearcoatRoughness+0.03);c.roughness=Math.min(m.roughness,m.roughness+(cr-m.roughness)*Math.min(1,m.clearcoat*1.2));c.clearcoat=0;c.clearcoatRoughness=0}
      c.sheen=0;PH.mats.push(c)}
    conv.set(m,c);return c};
  const push=(m0,g)=>{const mat=ptMat(m0);
    if(m0.userData&&m0.userData.iri){const pa=g.attributes.position,n=pa.count,col=new Float32Array(n*4),mode=m0.userData.iri==='oil'?1:2;   // samme mønster som i visningen, sett litt på skrå
      for(let i=0;i<n;i++){const c=IRI.color(pa.getX(i),pa.getY(i),pa.getZ(i),0.85,mode).map(x=>Math.min(1,Math.pow(x,0.78)*1.12));col[i*4]=c[0];col[i*4+1]=c[1];col[i*4+2]=c[2];col[i*4+3]=1}g.setAttribute('color',new THREE.BufferAttribute(col,4))}
    if(!by.has(mat))by.set(mat,[]);by.get(mat).push(g)};
  const prep=(geo,mtx)=>{const g=geo.index?geo.toNonIndexed():geo.clone();for(const k of Object.keys(g.attributes))if(!['position','normal','uv'].includes(k))g.deleteAttribute(k);
    g.morphAttributes={};g.clearGroups();if(!g.attributes.normal)g.computeVertexNormals();
    if(!g.attributes.uv)g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array(g.attributes.position.count*2),2));
    g.applyMatrix4(mtx);
    if(mtx.determinant()<0)for(const k of ['position','normal','uv']){const at=g.attributes[k],n=at.itemSize,arr=at.array;
      for(let i=0;i+2<at.count;i+=3)for(let c=0;c<n;c++){const x=arr[(i+1)*n+c];arr[(i+1)*n+c]=arr[(i+2)*n+c];arr[(i+2)*n+c]=x}}
    return g};
  // mesh med flere materialer (f.eks. setetrekk og underside): del opp etter gruppene
  const split=(o)=>{const src=o.geometry.index?o.geometry.toNonIndexed():o.geometry;const grs=src.groups.length?src.groups:[{start:0,count:src.attributes.position.count,materialIndex:0}];
    grs.forEach(gr=>{const mat=o.material[gr.materialIndex];if(!mat)return;const sub=new THREE.BufferGeometry();
      for(const k of ['position','normal','uv']){const at=src.attributes[k];if(at)sub.setAttribute(k,new THREE.BufferAttribute(at.array.slice(gr.start*at.itemSize,(gr.start+Math.min(gr.count,at.count-gr.start))*at.itemSize),at.itemSize))}
      push(mat,prep(sub,o.matrixWorld));sub.dispose()});if(src!==o.geometry)src.dispose()};
  ROOT.traverseVisible(o=>{if(!o.isMesh||o.userData.fx)return;if(Array.isArray(o.material)){split(o);return}
    if(o.isInstancedMesh){for(let i=0;i<o.count;i++){o.getMatrixAt(i,m);mw.multiplyMatrices(o.matrixWorld,m);push(o.material,prep(o.geometry,mw))}}
    else push(o.material,prep(o.geometry,o.matrixWorld))});
  const G=new THREE.Group();by.forEach((gs,mat)=>{let g=null;try{g=PH.merge(gs,false)}catch(e){}gs.forEach(x=>x.dispose());if(g)G.add(new THREE.Mesh(g,mat))});return G}
function photoClear(){if(PH.group){scene.remove(PH.group);PH.group.traverse(o=>{if(o.geometry)o.geometry.dispose()});PH.group=null}PH.mats.forEach(m=>m.dispose());PH.mats=[]}
function photoScene(){photoClear();PH.group=photoBake();scene.add(PH.group);ROOT.visible=false;
  ground.visible=false;LIGHTS.forEach(l=>l.visible=false);const f=phFloor();phFloorColor();if(!f.parent)scene.add(f);
  scene.background=null;scene.environment=hdrPT||hdrTex;scene.environmentIntensity=hdrPT?PT_GAIN:ENV_I*PT_GAIN;
  setCam();camera.updateMatrixWorld();PH.camKey=camKey();phSyncCam();PH.pt.setScene(scene,PH.cam||camera);phRestart()}
// dybdeskarphet: fokus på punktet kameraet ser på, blenderen tilpasses avstanden så uskarpheten blir lik i oversikt og nærbilder
function phSyncCam(){const c=PH.cam;if(!c)return;c.copy(camera);c.focusDistance=camera.position.distanceTo(cam.target);c.apertureBlades=0;c.apertureRotation=0;c.anamorphicRatio=1;
  c.bokehSize=RQ[rq].ss?5*c.focusDistance:0.001;c.updateMatrixWorld()}
function camKey(){const p=camera.position,q=cam.target;return [p.x,p.y,p.z,q.x,q.y,q.z,camera.aspect,camera.fov].map(x=>x.toFixed(4)).join(',')}
function phRestart(){PH.t0=performance.now();PH.ts=0;PH.n0=0;PH.rate=0;PH.tuned=false;PH.done=false;PH.gen=(PH.gen||0)+1;phFinalClear();PH.max=RQ[rq].ss?(PH_MOB?400:1000):(PH_MOB?120:300)}
async function photoStart(){if(PH.on||PH.busy)return;PH.busy=true;setSpin(false);phUI();
  try{const env=await hdrReady;if(!env)throw new Error('HDRI mangler');
    const [{WebGLPathTracer,DenoiseMaterial,PhysicalCamera},{mergeGeometries},{FullScreenQuad}]=await Promise.all([import('three-gpu-pathtracer'),import('three/addons/utils/BufferGeometryUtils.js'),import('three/addons/postprocessing/Pass.js')]);
    PH.merge=mergeGeometries;PH.FSQ=FullScreenQuad;if(!PH.cam)PH.cam=new PhysicalCamera();
    if(!PH.pt){const pt=new WebGLPathTracer(renderer);pt.tiles.set(2,2);pt.minSamples=2;pt.renderDelay=40;pt.fadeDuration=300;pt.bounces=PH_MOB?6:8;pt.filteredGlossyFactor=1.0;
      pt.dynamicLowRes=true;pt.lowResScale=0.15;PH.pt=pt;
      // støyfjerning når bildet tegnes: sterk i starten, svakere etter hvert som bildet blir rent, så eiker og kanter holder seg skarpe
      const dm=new DenoiseMaterial({transparent:true,premultipliedAlpha:false});PH.dq=new FullScreenQuad(dm);
      pt.renderToCanvasCallback=(target,r,quad)=>{const m=PH.dq.material,f=Math.min(1,pt.samples/400);
        m.map=quad.material.map;m.opacity=quad.material.opacity;m.blending=quad.material.blending;
        m.uniforms.sigma.value=3.4-2.2*f;m.uniforms.kSigma.value=1.6;m.uniforms.threshold.value=0.12-0.07*f;
        const ac=r.autoClear;r.autoClear=false;PH.dq.render(r);r.autoClear=ac}}
    PH.pt.renderScale=phScale();await new Promise(r=>requestAnimationFrame(r));
    PH.on=true;photoScene()}
  catch(e){console.warn('Rendring feilet',e);PH.on=false;PH.busy=false;photoRestore();toast('Rendring fungerer ikke i denne nettleseren. Prøv Chrome, Edge eller Safari på en nyere maskin.');return}
  PH.busy=false;phUI()}
function photoRestore(){photoClear();if(ROOT)ROOT.visible=true;
  if(PH.floor&&PH.floor.parent)scene.remove(PH.floor);if(ground)ground.visible=true;LIGHTS.forEach(l=>l.visible=true);
  scene.environment=envPM;scene.environmentIntensity=ENV_I;scene.background=bgTex;dirty=true}
function photoStop(){if(!PH.on&&!PH.busy)return;PH.on=false;PH.busy=false;PH.gen=(PH.gen||0)+1;phFinalClear();photoRestore();phUI()}
function photoTick(){const pt=PH.pt;
  if(dirty){dirty=false;setCam();const k=camKey();if(k!==PH.camKey){PH.camKey=k;camera.updateMatrixWorld();phSyncCam();pt.updateCamera();phRestart()}}
  if(PH.done)return;
  pt.renderSample();const n=pt.samples,now=performance.now();
  // farten måles fra runde 2, så kompilering av skyggeleggere i starten ikke gir feil anslag. Målet justeres til 30 % er nådd
  if(n>=2&&!PH.ts){PH.ts=now;PH.n0=n;PH.lt=now}
  if(PH.ts&&n-PH.n0>=3&&now-PH.ts>2500){PH.rate=(n-PH.n0)/((now-PH.ts)/1000);
    const Q=RQ[rq];if(n<0.3*PH.max&&now-PH.lt>2000){PH.lt=now;PH.max=Math.max(Q.floor,n+4,Math.min(Q.cap,Math.round(PH.n0+PH.rate*Q.budget)));PH.tuned=true}}
  if(n>=PH.max){PH.done=true;phUI();phFinalize().then(ok=>{if(ok)toast('Bildet er ferdig rendret. Trykk «Lagre bilde» for å laste det ned.')});return}
  phUI()}
// eksport i full oppløsning: path tracer-bildet (flyttall) støyfjernes, tonemappes og gjøres om til sRGB i en egen skyggelegger, og leses ut piksel for piksel
const XFRAG=`uniform sampler2D map;uniform float sigma;uniform float kSigma;uniform float threshold;uniform float exposure;varying vec2 vUv;
vec4 dn(sampler2D tex,vec2 uv){float radius=floor(kSigma*sigma+0.5);float radQ=radius*radius;float iS=0.5/(sigma*sigma);float iSP=0.3183098862*iS;float iT=0.5/(threshold*threshold);float iTP=0.3989422804/threshold;
  vec4 c0=texture2D(tex,uv);c0.rgb*=c0.a;float z=0.0;vec4 acc=vec4(0.0);vec2 size=vec2(textureSize(tex,0));vec2 d;
  for(d.x=-radius;d.x<=radius;d.x++){float pt=sqrt(radQ-d.x*d.x);for(d.y=-pt;d.y<=pt;d.y++){float bf=exp(-dot(d,d)*iS)*iSP;vec4 w=texture2D(tex,uv+d/size);w.rgb*=w.a;vec4 dc=w-c0;float df=exp(-dot(dc,dc)*iT)*iTP*bf;z+=df;acc+=df*w;}}
  return acc/z;}
vec3 neutral(vec3 color){const float S=0.76;const float De=0.15;float x=min(color.r,min(color.g,color.b));float off=x<0.08?x-6.25*x*x:0.04;color-=off;float peak=max(color.r,max(color.g,color.b));
  if(peak<S)return color;float d=1.0-S;float np=1.0-d*d/(peak+d-S);color*=np/peak;float g=1.0-1.0/(De*(peak-np)+1.0);return mix(color,vec3(np),g);}
vec3 srgb(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1.0/2.4))-0.055,step(vec3(0.0031308),c));}
void main(){vec4 c=dn(map,vUv);float a=clamp(c.a,0.0,1.0);vec3 rgb=a>0.0001?c.rgb/c.a:vec3(0.0);rgb=neutral(rgb*exposure);gl_FragColor=vec4(srgb(clamp(rgb,0.0,1.0)),a);}`;
function phExport(){const pt=PH.pt,src=pt.target,w=src.width,h=src.height;
  if(!PH.xq)PH.xq=new PH.FSQ(new THREE.ShaderMaterial({uniforms:{map:{value:null},sigma:{value:1.5},kSigma:{value:1.6},threshold:{value:0.06},exposure:{value:1}},
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:XFRAG,depthTest:false,depthWrite:false,blending:THREE.NoBlending}));
  const u=PH.xq.material.uniforms,f=Math.min(1,pt.samples/400);u.map.value=src.texture;u.exposure.value=renderer.toneMappingExposure;
  u.sigma.value=(3.4-2.2*f)*Math.max(1,pt.renderScale*0.75);u.threshold.value=0.12-0.07*f;
  const rt=new THREE.WebGLRenderTarget(w,h,{type:THREE.UnsignedByteType,depthBuffer:false});const prev=renderer.getRenderTarget();
  renderer.setRenderTarget(rt);PH.xq.render(renderer);const px=new Uint8Array(w*h*4);renderer.readRenderTargetPixels(rt,0,0,w,h,px);renderer.setRenderTarget(prev);rt.dispose();
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),id=x.createImageData(w,h);
  for(let y=0;y<h;y++)id.data.set(px.subarray((h-1-y)*w*4,(h-y)*w*4),y*w*4);x.putImageData(id,0,0);return c}
/* ---------- AI-støyfjerning (Intel Open Image Denoise, kjørt i nettleseren med TensorFlow.js) ----------
   Når rendringen er ferdig lages to rene hjelpebilder av samme utsnitt: farge uten lys (albedo) og flateretning (normaler).
   Støyfjerneren bruker dem til å skille støy fra ekte detaljer, så eiker, kanter og tekstur holdes skarpe mens kornet forsvinner.
   Biblioteket bruker ikke OIDNs HDR-overføringsfunksjon, så bildet tonemappes og legges på bakgrunnen først, og LDR-modellen (rt_ldr_calb_cnrm, Apache 2.0) brukes.
   Vektene ligger innebygd, selve biblioteket hentes fra jsDelivr. Feiler noe, brukes den enkle støyfjerneren. */
const TZA_B64='__TZA_B64__';let DN=null,dnLoad=null;
function dnGet(){if(dnLoad)return dnLoad;dnLoad=(async()=>{
    if(TZA_B64.length<100)throw new Error('mangler vekter');
    const bin=atob(TZA_B64),tza=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)tza[i]=bin.charCodeAt(i);
    const of=window.fetch;window.fetch=function(u,o){const url=typeof u==='string'?u:u&&u.url||'';if(/\.tza(\?|$)/.test(url))return Promise.resolve(new Response(o&&o.method==='HEAD'?null:tza.slice().buffer,{status:200,headers:{'Content-Type':'application/octet-stream'}}));return of.apply(this,arguments)};
    const {Denoiser}=await import('denoiser');const d=new Denoiser('webgl');d.hdr=false;d.srgb=false;d.quality='balanced';d.outputMode='float32';d.debugging=false;
    d.onProgress(p=>{PH.finP=Math.max(PH.finP,Math.min(0.99,p));phUI()});DN=d;return d})();
  dnLoad.catch(()=>{dnLoad=null});return dnLoad}
function phAux(w,h){const cam=PH.cam||camera,objs=[...(PH.group?PH.group.children:[]),...(PH.floor&&PH.floor.parent?[PH.floor]:[])],saved=objs.map(o=>o.material);
  const rt=new THREE.WebGLRenderTarget(w,h,{type:THREE.FloatType,depthBuffer:true,samples:4});const bg=scene.background,ac=renderer.getClearColor(new THREE.Color()),aa=renderer.getClearAlpha();
  const vis=[];scene.traverse(o=>{if(o.isMesh&&!objs.includes(o)&&o.visible&&!ROOT.getObjectById(o.id)){vis.push(o);o.visible=false}});
  const pass=(mk)=>{objs.forEach((o,i)=>{o.material=mk(saved[i])});renderer.setRenderTarget(rt);renderer.setClearColor(0x000000,0);renderer.clear();renderer.render(scene,cam);
    const px=new Float32Array(w*h*4);renderer.readRenderTargetPixels(rt,0,0,w,h,px);return px};
  const mats=[];const keep=m=>{mats.push(m);return m};let alb,nrm;
  try{scene.background=null;
    alb=pass(m=>keep(new THREE.MeshBasicMaterial({color:m.color?m.color.clone():0xffffff,map:m.map||null,alphaMap:m.alphaMap||null,transparent:!!m.transparent,side:m.side,toneMapped:false})));
    nrm=pass(m=>keep(m.alphaMap?new THREE.MeshNormalMaterial({side:m.side,transparent:true,opacity:1,alphaTest:0.02}):new THREE.MeshNormalMaterial({side:m.side})))}
  finally{objs.forEach((o,i)=>o.material=saved[i]);mats.forEach(m=>m.dispose());vis.forEach(o=>o.visible=true);renderer.setRenderTarget(null);renderer.setClearColor(ac,aa);scene.background=bg;rt.dispose()}
  return {alb,nrm}}
// tonemapping (Neutral, som i visningen) og sRGB for én piksel, returnerer verdier 0..1
function phTone(r,g,b,ex){r*=ex;g*=ex;b*=ex;const mn=Math.min(r,g,b),off=mn<0.08?mn-6.25*mn*mn:0.04;r-=off;g-=off;b-=off;const pk=Math.max(r,g,b);
  if(pk>=0.76){const d=0.24,np=1-d*d/(pk+d-0.76),k=np/pk;r*=k;g*=k;b*=k;const gg=1-1/(0.15*(pk-np)+1);r+=(np-r)*gg;g+=(np-g)*gg;b+=(np-b)*gg}
  const e=v=>{v=Math.min(1,Math.max(0,v));return v<=0.0031308?v*12.92:1.055*Math.pow(v,1/2.4)-0.055};return [e(r),e(g),e(b)]}
function phBg(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),B0=BGS[bgStyle];
  x.save();x.translate(w/2,h*0.38);x.scale(w*0.85,h*0.75);const g=x.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,B0.hi);g.addColorStop(0.55,B0.mid);g.addColorStop(1,B0.lo);x.fillStyle=g;x.fillRect(-3,-3,6,6);x.restore();
  return x.getImageData(0,0,w,h).data}
function phComposite(img){const w=img.width,h=img.height,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),B0=BGS[bgStyle];
  x.save();x.translate(w/2,h*0.38);x.scale(w*0.85,h*0.75);const g=x.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,B0.hi);g.addColorStop(0.55,B0.mid);g.addColorStop(1,B0.lo);x.fillStyle=g;x.fillRect(-3,-3,6,6);x.restore();
  x.drawImage(img,0,0);return c}
function phFinalClear(){PH.final=null;PH.finalBg=false;PH.fin=false;const o=phEl('ph-final');if(o)o.remove()}
function phShowFinal(img){const old=phEl('ph-final');if(old)old.remove();const v=PH.finalBg?img:phComposite(img);v.id='ph-final';v.setAttribute('aria-hidden','true');
  v.style.cssText='position:absolute;left:0;top:0;width:'+canvas.clientWidth+'px;height:'+canvas.clientHeight+'px;pointer-events:none';canvas.parentNode.insertBefore(v,canvas.nextSibling)}
// AI-støyfjerningen bruker mye minne. Den kjøres bare på PC og for bilder opp til ca. 2,4 megapiksler, med en tidsgrense.
// Krasjer siden mens den kjører (merket ligger igjen i nettleseren), slås den av på denne maskinen, og den raske støyfjerneren brukes i stedet.
const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}};
if(ls('styler-ai-run')){ls('styler-ai-off','1');ls('styler-ai-run',null)}
const aiAllowed=(w,h)=>!PH_MOB&&w*h<=2.4e6&&ls('styler-ai-off')!=='1'&&!(navigator.deviceMemory&&navigator.deviceMemory<8);
function phQuick(gen){if(gen!==PH.gen)return false;try{PH.final=phExport();PH.finalBg=false;phShowFinal(PH.final)}catch(e){PH.final=null}PH.fin=false;phUI();return true}
async function phFinalize(){if(!PH.on||!PH.pt||PH.fin)return false;const gen=PH.gen,pt=PH.pt;
  {const t=pt.target;if(!aiAllowed(t.width,t.height)){PH.fin=false;return phQuick(gen)}}
  PH.fin=true;PH.finP=0;phUI();ls('styler-ai-run',String(Date.now()));
  try{await new Promise(r=>setTimeout(r,30));
    const tgt=pt.target,w=tgt.width,h=tgt.height,n=w*h,col=new Float32Array(n*4);renderer.readRenderTargetPixels(tgt,0,0,w,h,col);
    const {alb,nrm}=phAux(w,h),bg=phBg(w,h),ex=renderer.toneMappingExposure,lin=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
    // ferdig bilde med bakgrunn (sRGB 0..1) som inngang, albedo og normaler som hjelpebilder. WebGL leser nedenfra, canvas ovenfra
    const C=new Float32Array(n*3),Al=new Float32Array(n*3),N=new Float32Array(n*3);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,q=((h-1-y)*w+x)*4,a=Math.min(1,Math.max(0,col[i*4+3]));
      const t=a>0.002?phTone(Math.max(0,col[i*4]),Math.max(0,col[i*4+1]),Math.max(0,col[i*4+2]),ex):[0,0,0],aa=Math.min(1,Math.max(0,alb[i*4+3]));
      for(let k=0;k<3;k++){const bk=bg[q+k]/255;C[i*3+k]=t[k]*a+bk*(1-a);Al[i*3+k]=Math.min(1,Math.max(0,alb[i*4+k]+lin(bg[q+k])*(1-aa)));N[i*3+k]=nrm[i*4+3]>0?((nrm[i*4+k]*2-1)*aa)*0.5+0.5:0.5}}   // gulvet tones ut i normalbildet i samme takt som i fargebildet, ellers tegnes kanten av gulvskiven
    const d=await Promise.race([dnGet(),new Promise((_,rej)=>setTimeout(()=>rej(new Error('lasting tok for lang tid')),20000))]);if(gen!==PH.gen){ls('styler-ai-run',null);return false}
    d.width=w;d.height=h;d.setInputData('color',C,{channels:3});d.setInputData('albedo',Al,{channels:3});d.setInputData('normal',N,{channels:3});
    let tm;const out=await Promise.race([d.execute(),new Promise((_,rej)=>{tm=setTimeout(()=>{try{d.abort()}catch(e){}rej(new Error('tidsgrense'))},60000)})]);clearTimeout(tm);
    try{d.resetInputs()}catch(e){}ls('styler-ai-run',null);if(gen!==PH.gen||!out)return false;
    const c=document.createElement('canvas');c.width=w;c.height=h;const cx=c.getContext('2d'),id=cx.createImageData(w,h),D=id.data;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,o=((h-1-y)*w+x)*4;for(let k=0;k<3;k++)D[o+k]=Math.round(255*Math.min(1,Math.max(0,out[i*3+k])));D[o+3]=255}
    cx.putImageData(id,0,0);PH.final=c;PH.finalBg=true;PH.fin=false;phShowFinal(c);phUI();return true}
  catch(e){console.warn('AI-støyfjerning feilet, bruker rask støyfjerning',e);ls('styler-ai-run',null);if(gen!==PH.gen)return false;return phQuick(gen)}}
async function photoSave(){if(!PH.on||!PH.pt)return;
  if(PH.fin){toast('Vent litt, kornet fjernes');return}
  if(!PH.final){PH.done=true;await phFinalize()}
  let img=PH.final,hasBg=!!(img&&PH.finalBg);if(!img){try{img=phExport()}catch(e){PH.pt.renderSample();img=renderer.domElement}}
  const c=hasBg?img:phComposite(img);
  const blob=await new Promise(r=>c.toBlob(r,'image/png'));if(!blob){toast('Klarte ikke å lage bildet');return}
  const nm=(document.getElementById('bname').value.trim()||bikeName()).replace(/[^\wæøåÆØÅ .,()-]+/g,'').trim().slice(0,60)||'sykkel';
  const filename=`${nm} - GV Sykkel.png`;
  let dl=null;try{dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null}catch(e){dl=null}
  if(dl){try{await dl.save({filename,data:blob});toast('Bildet er lagret')}catch(e){if(e&&e.code!=='declined')toast('Bildet kunne ikke lagres her')}return}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000)}

/* ===================== MATERIALER ===================== */
// Oil slick og regnbue: PVD-/anodiseringsfinish er et tynt, gjennomsiktig oksidlag på blankt metall. Fargen kommer av lysinterferens i laget
// og bestemmes av lagtykkelsen og vinkelen du ser på. Fargene følger rekkefølgen i ekte PVD (lilla, blå, turkis, grønn, gull, rosa) og forskyves med
// synsvinkelen. Oil slick får virvler (som marmorering), regnbue får jevne bånd. Mønsteret ligger i rommet, så det virker på alle deler uten UV-kart,
// og fargene glir over i hverandre når du roterer sykkelen.
const OILP=[[0.30,0.16,0.62],[0.16,0.30,0.86],[0.10,0.60,0.68],[0.22,0.64,0.42],[0.86,0.66,0.22],[0.80,0.32,0.38],[0.66,0.20,0.66],[0.42,0.22,0.82]];
const RAINP=[[0.88,0.68,0.26],[0.76,0.38,0.30],[0.54,0.22,0.72],[0.20,0.34,0.88],[0.16,0.66,0.86],[0.40,0.74,0.34],[0.86,0.80,0.28],[0.92,0.54,0.22]];
const glslPal=(nm,P)=>`const vec3 ${nm}[8]=vec3[8](${P.map(c=>`vec3(${c.map(x=>x.toFixed(3)).join(',')})`).join(',')});`;
const IRI_GLSL=`
${glslPal('OILP',OILP)}
${glslPal('RAINP',RAINP)}
float iriField(vec3 p){p*=13.0;vec3 q=p+0.9*vec3(sin(p.y*1.7+1.3),sin(p.z*1.9+2.1),sin(p.x*1.5+0.7));
  vec3 r=q+0.6*vec3(sin(q.z*2.3+0.4),sin(q.x*2.1+3.1),sin(q.y*2.7+1.9));return 0.5+0.5*sin(r.x*1.1+r.y*1.3+r.z*0.9+0.8*sin(r.y*2.0));}
vec3 iriPal(float t,int mode){float x=fract(t)*8.0;int i=int(floor(x));int j=(i+1)%8;float f=smoothstep(0.0,1.0,fract(x));
  vec3 a=mode==1?OILP[i]:RAINP[i];vec3 b=mode==1?OILP[j]:RAINP[j];return pow(mix(a,b,f),vec3(2.2));}
vec3 iriColor(vec3 p,float ct,int mode){float t;
  if(mode==1){t=iriField(p)*1.4+(1.0-ct)*0.45;}
  else{float f=iriField(p*0.55);float x=dot(p,vec3(0.55,0.75,0.37))*8.0+0.45*f;t=abs(fract(x)-0.5)*2.0*0.9+(1.0-ct)*0.35;}
  return iriPal(t,mode);}`;
const IRI={field(x,y,z){x*=13;y*=13;z*=13;const qx=x+0.9*Math.sin(y*1.7+1.3),qy=y+0.9*Math.sin(z*1.9+2.1),qz=z+0.9*Math.sin(x*1.5+0.7);
    const rx=qx+0.6*Math.sin(qz*2.3+0.4),ry=qy+0.6*Math.sin(qx*2.1+3.1),rz=qz+0.6*Math.sin(qy*2.7+1.9);return 0.5+0.5*Math.sin(rx*1.1+ry*1.3+rz*0.9+0.8*Math.sin(ry*2))},
  pal(t,mode){const P=mode===1?OILP:RAINP,x=(t-Math.floor(t))*8,i=Math.floor(x)%8,j=(i+1)%8,u=x-Math.floor(x),f=u*u*(3-2*u);return [0,1,2].map(k=>Math.pow(P[i][k]+(P[j][k]-P[i][k])*f,2.2))},
  color(x,y,z,ct,mode){let t;if(mode===1)t=this.field(x,y,z)*1.4+(1-ct)*0.45;else{const f=this.field(x*0.55,y*0.55,z*0.55),q=(x*0.55+y*0.75+z*0.37)*8+0.45*f;t=Math.abs(q-Math.floor(q)-0.5)*2*0.9+(1-ct)*0.35}
    return this.pal(t,mode)}};
function iriMat(kind){const m=new THREE.MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:kind==='oil'?0.13:0.08,clearcoat:1,clearcoatRoughness:0.03,envMapIntensity:1.3});
  m.userData.iri=kind;const mode=kind==='oil'?1:2;
  m.onBeforeCompile=sh=>{
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vIriP;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\n{vec4 ip=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nip=instanceMatrix*ip;\n#endif\nvIriP=(modelMatrix*ip).xyz;}');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vIriP;\n'+IRI_GLSL)
      .replace('#include <lights_physical_fragment>',`{float ct=clamp(abs(dot(normal,normalize(vViewPosition))),0.0,1.0);diffuseColor.rgb=iriColor(vIriP,ct,${mode});}\n#include <lights_physical_fragment>`)};
  m.customProgramCacheKey=()=>'iri-'+kind;return m}
function fadeTex(c1,c2){const c=document.createElement('canvas');c.width=4;c.height=256;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,c1);g.addColorStop(.25,c1);g.addColorStop(.85,c2);g.addColorStop(1,c2);x.fillStyle=g;x.fillRect(0,0,4,256);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
function mat(f,extra={}){
  const c=new THREE.Color(f.c||'#141516');let m;
  switch(f.m){
    case 'chrome':m=new THREE.MeshPhysicalMaterial({color:0xd4d6d8,metalness:1,roughness:0.035});break;
    case 'alu':m=new THREE.MeshStandardMaterial({color:0xe6e9ec,metalness:1,roughness:0.2});break;
    case 'brushed':m=new THREE.MeshPhysicalMaterial({color:0xdadde1,metalness:1,roughness:0.32,anisotropy:0.85});break;
    case 'gold':m=new THREE.MeshStandardMaterial({color:0xf0c46c,metalness:1,roughness:0.12});break;
    case 'anod':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.9,roughness:0.26,clearcoat:0.3,clearcoatRoughness:0.2});break;
    case 'oil':m=iriMat('oil');break;
    case 'oilOld':m=new THREE.MeshPhysicalMaterial({map:oilTex,metalness:1,roughness:0.1,iridescence:0.8,iridescenceIOR:1.8,iridescenceThicknessRange:[250,1100],iridescenceThicknessMap:swirlTex,clearcoat:1,clearcoatRoughness:0.03});break;
    case 'rainbow':m=iriMat('rainbow');break;
    case 'braided':m=new THREE.MeshPhysicalMaterial({color:0xc9ccd0,metalness:1,roughness:0.38,anisotropy:0.6,bumpMap:noiseTex,bumpScale:2});break;
    case 'metallic':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.6,roughness:0.32,clearcoat:1,clearcoatRoughness:0.04});break;
    case 'pearl':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.1,roughness:0.25,clearcoat:1,clearcoatRoughness:0.03,iridescence:0.7,iridescenceIOR:1.4,iridescenceThicknessRange:[250,450]});break;
    case 'flake':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.7,roughness:0.45,roughnessMap:noiseTex,bumpMap:noiseTex,bumpScale:0.4,clearcoat:1,clearcoatRoughness:0.02});break;
    case 'candy':m=new THREE.MeshPhysicalMaterial({color:c,metalness:1,roughness:0.08,clearcoat:1,clearcoatRoughness:0.02});break;
    case 'fade':m=new THREE.MeshPhysicalMaterial({map:fadeTex(f.c,st.p.accent.c||'#f2efe6'),metalness:0.05,roughness:0.28,clearcoat:1,clearcoatRoughness:0.03});break;
    case 'satin':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.1,roughness:0.5,clearcoat:0.3,clearcoatRoughness:0.5});break;
    case 'matt':m=new THREE.MeshStandardMaterial({color:c,metalness:0.05,roughness:0.8});break;
    case 'rubber':m=new THREE.MeshStandardMaterial({color:c,metalness:0,roughness:0.9,bumpMap:noiseTex,bumpScale:1});break;
    case 'leather':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0,roughness:0.5,bumpMap:noiseTex,bumpScale:1.2,clearcoat:0.25,clearcoatRoughness:0.45,sheen:0.15,sheenRoughness:0.7,sheenColor:new THREE.Color(0xffffff)});break;
    case 'vinyl':m=new THREE.MeshPhysicalMaterial({color:c,metalness:0,roughness:0.36,clearcoat:0.5,clearcoatRoughness:0.25});break;
    default:m=new THREE.MeshPhysicalMaterial({color:c,metalness:0.05,roughness:0.24,clearcoat:1,clearcoatRoughness:0.03});
  }
  if(f.m==='rubber')m.userData.rubber=true;
  Object.assign(m,extra);return m;
}

/* ===================== GEOMETRIHJELPERE ===================== */
const p2=(x,y)=>({x,y});
const A=(a,b)=>p2(a.x+b.x,a.y+b.y),Sb=(a,b)=>p2(a.x-b.x,a.y-b.y),K=(a,k)=>p2(a.x*k,a.y*k),L2=a=>Math.hypot(a.x,a.y),U2=a=>K(a,1/L2(a)),M2=(a,b,t)=>p2(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t);
const Rot=(a,r)=>p2(a.x*Math.cos(r)-a.y*Math.sin(r),a.x*Math.sin(r)+a.y*Math.cos(r));
const v=(p,z=0)=>new V3(p.x,p.y,z);
let B; // rammegruppen
function put(m,p){m.castShadow=true;m.receiveShadow=true;(p||B).add(m);return m}
function cyl(a,b,r,m,seg=24,rTop,p){const d=new V3().subVectors(b,a),L=d.length();const g=new THREE.CylinderGeometry(rTop??r,r,L,seg,1);
  const me=new THREE.Mesh(g,m);me.position.copy(a).addScaledVector(d,.5);me.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());return put(me,p)}
function sph(c,r,m,p){const me=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),m);me.position.copy(c);return put(me,p)}
function box(a,b,w,t,m,p){const d=new V3().subVectors(b,a),L=d.length();const me=new THREE.Mesh(new THREE.BoxGeometry(L,w,t),m);
  me.position.copy(a).addScaledVector(d,.5);me.quaternion.setFromUnitVectors(new V3(1,0,0),d.normalize());return put(me,p)}
function tube(pts,r,m,seg=64,closed=false,p,rs=14){const cv=new THREE.CatmullRomCurve3(pts,closed,'centripetal');const me=new THREE.Mesh(new THREE.TubeGeometry(cv,seg,r,rs,closed),m);put(me,p);return cv}
function rrect(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;r=Math.min(r,w/2,h/2);s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
function rbox(w,h,d,r,m,p){const bev=Math.min(r,d/2.2,w/3,h/3);const g=new THREE.ExtrudeGeometry(rrect(w-bev*2,h-bev*2,Math.max(0.0004,r-bev)),{depth:Math.max(0.0002,d-bev*2),bevelEnabled:true,bevelThickness:bev,bevelSize:bev,bevelSegments:3,curveSegments:5});
  g.translate(0,0,-Math.max(0.0002,d-bev*2)/2);return put(new THREE.Mesh(g,m),p)}
function orient(me,pos,rz){me.position.copy(pos);me.rotation.z=rz||0;return me}
function hexnut(c,dir,r,len,m,p){return cyl(c.clone().addScaledVector(dir,-len/2),c.clone().addScaledVector(dir,len/2),r,m,6,r,p)}
function bolt(c,dir,r,m,p){dir=dir.clone().normalize();const h=r*0.95;cyl(c,c.clone().addScaledVector(dir,h),r,m,24,r*0.9,p);
  cyl(c.clone().addScaledVector(dir,h*0.45),c.clone().addScaledVector(dir,h+0.0003),r*0.48,M.socket,6,r*0.48,p)}
function helix(a,b,rr,turns,r,m,p){const d=new V3().subVectors(b,a),L=d.length();d.normalize();
  let p1=new V3().crossVectors(d,new V3(0,0,1));if(p1.length()<.1)p1=new V3().crossVectors(d,new V3(1,0,0));p1.normalize();const p2_=new V3().crossVectors(d,p1);
  const pts=[];const n=turns*16;for(let i=0;i<=n;i++){const t=i/n,ang=t*turns*Math.PI*2;pts.push(a.clone().addScaledVector(d,t*L).addScaledVector(p1,Math.cos(ang)*rr).addScaledVector(p2_,Math.sin(ang)*rr))}
  tube(pts,r,m,n*2,false,p,8)}
const pitchR=n=>0.0127/(2*Math.sin(Math.PI/n));
function gear(n,hole,th,m,p,spokes=0){const r=pitchR(n)+0.003;const s=new THREE.Shape();const k4=n*4;
  for(let i=0;i<=k4;i++){const a=i/k4*Math.PI*2,k=i%4,rr=(k===1||k===2)?r:r-0.0045;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;i?s.lineTo(x,y):s.moveTo(x,y)}
  if(hole){if(spokes){const inner=hole;for(let i=0;i<spokes;i++){const a0=i/spokes*Math.PI*2+0.18,a1=(i+1)/spokes*Math.PI*2-0.18;const h=new THREE.Path();
        h.absarc(0,0,inner,a1,a0,true);h.absarc(0,0,0.012+inner*0.18,a0+0.1,a1-0.1,false);h.closePath();s.holes.push(h)}}
    else{const h=new THREE.Path();h.absarc(0,0,hole,0,Math.PI*2,true);s.holes.push(h)}}
  const g=new THREE.ExtrudeGeometry(s,{depth:th,bevelEnabled:true,bevelThickness:0.0004,bevelSize:0.0004,bevelSegments:1,curveSegments:10});g.translate(0,0,-th/2);return put(new THREE.Mesh(g,m),p)}
function smooth(g){const pa=g.attributes.position,map=new Map(),pos=[],idx=[];
  for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i),key=`${Math.round(x*1e4)},${Math.round(y*1e4)},${Math.round(z*1e4)}`;let j=map.get(key);if(j===undefined){j=pos.length/3;map.set(key,j);pos.push(x,y,z)}idx.push(j)}
  const n=new THREE.BufferGeometry();n.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));n.setIndex(idx);n.computeVertexNormals();g.dispose();return n}
function lathe(prof,m,seg,p){const g=new THREE.LatheGeometry(prof.map(q=>new THREE.Vector2(q[0],q[1])),seg);g.rotateX(Math.PI/2);return put(new THREE.Mesh(g,m),p)}
function inst(geo,m,mats,p){const im=new THREE.InstancedMesh(geo,m,mats.length);mats.forEach((x,i)=>im.setMatrixAt(i,x));return put(im,p)}
const mtx=(pos,q,s)=>new THREE.Matrix4().compose(pos,q,s||new V3(1,1,1));
const qFrom=(a,b)=>new THREE.Quaternion().setFromUnitVectors(a,b.clone().normalize());

/* ===================== GEOMETRI ===================== */
function wheelDims(){const bead=BEAD[st.geo.wheel],wi=inchesOf(st.tireW),h=wi*0.0254*(wi<1.6?0.9:0.94);return{bead,h,out:bead+h,w:wi*0.0254}}
function computeGeo(){
  const g=st.geo,ha=g.ha*D2R,sa=g.sa*D2R;
  const d=p2(Math.cos(ha),-Math.sin(ha)),up=K(d,-1),n=p2(Math.sin(ha),Math.cos(ha));
  const HTT=p2(g.reach,g.stack),HTB=A(HTT,K(d,g.ht));
  const t=(g.stack-g.drop+g.offset*Math.cos(ha))/Math.sin(ha);
  const a2c0=t-g.ht-0.012,wdg=wheelDims(),minA={susp:0.12,susp90:0.1,dual:0.085,springer:0.05}[st.forkType]||0.03;
  let a2c=a2c0+(st.forkDelta||0)/1000,a2cRaise=0;if(a2c<wdg.out+minA){a2cRaise=wdg.out+minA-a2c;a2c=wdg.out+minA}
  const CR=A(HTB,K(d,0.012)),FA=A(A(CR,K(d,a2c)),K(n,g.offset));
  const RA=p2(-Math.sqrt(Math.max(0.01,g.cs*g.cs-g.drop*g.drop)),g.drop);
  const s=p2(-Math.cos(sa),Math.sin(sa)),STT=K(s,g.st),SC=K(s,Math.max(0.2,g.st-g.ttJoin));
  const TTF=A(HTT,K(d,0.022)),DTF=A(HTB,K(d,-0.032));
  const ttDir=U2(Sb(TTF,SC));
  let SST=A(K(s,Math.max(0.2,g.st-g.ttJoin-0.012)),p2(0,0));
  if(g.stays==='triple')SST=A(SC,K(ttDir,0.08));
  if(g.stays==='dropped')SST=K(s,g.st*0.62);
  const phi=-Math.atan2(FA.y-RA.y,FA.x-RA.x);
  return{ha,sa,d,up,n,HTT,HTB,CR,FA,RA,s,STT,SC,SST,TTF,DTF,ttDir,a2c,a2c0,a2cRaise,phi,wb:L2(Sb(FA,RA)),BB:p2(0,0),haEff:g.ha-phi/D2R,T:TUBESETS[g.tubes]||TUBESETS.alu};
}

/* ===================== BYGG ===================== */
function disposeGroup(g){g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>{for(const k of ['map','bumpMap','roughnessMap'])if(m[k]&&!(m[k].userData&&m[k].userData.shared))m[k].dispose();m.dispose()})}})}
function build(){
  if(ROOT){scene.remove(ROOT);disposeGroup(ROOT)}
  GM=computeGeo();ANCH={};FOCUS={};
  M={};for(const k in st.p)M[k]=mat(st.p[k],{side:['fender','guard','rims'].includes(k)?THREE.DoubleSide:THREE.FrontSide});
  Object.assign(M,{tire:mat({m:'rubber',c:'#111213'},{side:THREE.DoubleSide}),wall:mat({m:'rubber',c:SIDEWALLS[st.wall].c},{side:THREE.DoubleSide}),stripe:mat({m:'rubber',c:SIDEWALLS[st.wall].stripe||'#efe9dc'},{side:THREE.DoubleSide}),reflex:new THREE.MeshStandardMaterial({color:0xb8bcc0,metalness:0.6,roughness:0.35,side:THREE.DoubleSide}),
    steel:new THREE.MeshStandardMaterial({color:0xc8ccd0,metalness:1,roughness:0.22}),dark:new THREE.MeshStandardMaterial({color:0x26292b,metalness:0.7,roughness:0.42}),
    black:new THREE.MeshStandardMaterial({color:0x161718,metalness:0.2,roughness:0.55}),socket:new THREE.MeshStandardMaterial({color:0x0b0b0c,metalness:0.5,roughness:0.6}),
    pad:new THREE.MeshStandardMaterial({color:0x3a3029,metalness:0.1,roughness:0.9}),track:new THREE.MeshPhysicalMaterial({color:0xd8dbdf,metalness:1,roughness:0.3,anisotropy:0.9}),
    copper:new THREE.MeshStandardMaterial({color:0xc98552,metalness:1,roughness:0.25}),boot:mat({m:'rubber',c:'#151515'}),inner:new THREE.MeshStandardMaterial({color:0xcfd3d6,metalness:1,roughness:0.3}),chrome:mat({m:'chrome'})});
  ROOT=new THREE.Group();ROOT.scale.z=-1;scene.add(ROOT);   // speilet: drivsiden blir høyre side
  const wd=wheelDims(),piv=new THREE.Group();piv.position.set(-GM.wb/2,wd.out,0);piv.rotation.z=GM.phi;ROOT.add(piv);
  B=new THREE.Group();B.position.set(-GM.RA.x,-GM.RA.y,0);piv.add(B);
  wheel(GM.RA,false);wheel(GM.FA,true);
  frame();fork();cockpit();brakes();drivetrain();seat();fenders();kickstand();accessories();cables();contactShadows(wd);
  pickables=[];ROOT.traverse(o=>{if(o.isMesh){if(o.userData.fx){o.castShadow=false;o.receiveShadow=false;return}o.castShadow=true;o.receiveShadow=true;pickables.push(o)}});
  ROOT.updateMatrixWorld(true);
  if(ANCH.brakeF)FOCUS.cabF=ANCH.brakeF.clone();if(ANCH.brakeR)FOCUS.cabR=ANCH.brakeR.clone();   // brukes bare til kontroll av wireendene
  for(const k in FOCUS)FOCUS[k]=B.localToWorld(FOCUS[k].clone());
}
function contactShadows(wd){
  const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
  const t=new THREE.CanvasTexture(c);const m=new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false});
  [-GM.wb/2,GM.wb/2].forEach(xx=>{const me=new THREE.Mesh(new THREE.PlaneGeometry(0.26,0.09),m);me.rotation.x=-Math.PI/2;me.position.set(xx,0.001,0);me.userData.fx=true;ROOT.add(me)});
}

/* ---------- aksler ---------- */
// akselende utenfor dropouten: qr = hurtigkobling, ta = gjennomgående aksel, nut = mutter. s>0 er venstre side (hendelsiden)
function axleEnd(c,zo,s,type,dir,mtb,p){
  if(type==='nut'){hexnut(c.clone().setZ(s*(zo+0.0035)),new V3(0,0,1),0.0085,0.007,M.bolts,p);cyl(c.clone().setZ(s*zo),c.clone().setZ(s*(zo+0.012)),0.0045,M.steel,12,0.0045,p);return}
  if(type==='qr'){if(s>0){cyl(c.clone().setZ(zo),c.clone().setZ(zo+0.007),0.0095,M.steel,24,0.0085,p);
      const P0=c.clone().setZ(zo+0.009),P1=c.clone().addScaledVector(dir,0.03).setZ(zo+0.0115),P2=c.clone().addScaledVector(dir,0.058).setZ(zo+0.0095);
      sweep([P0,P1,P2],u=>({w:(0.0062-u*0.0012)*endR(u,0,0.08),h:0.0024,n:2.6}),M.steel,p,{up:new V3(0,0,1),n:20,r:14})}
    else cyl(c.clone().setZ(-zo),c.clone().setZ(-zo-0.008),0.0085,M.steel,14,0.0085,p);return}
  if(s>0){cyl(c.clone().setZ(zo),c.clone().setZ(zo+0.003),0.0118,M.dark,32,0.0112,p);
    if(mtb){const P0=c.clone().setZ(zo+0.004),P1=c.clone().addScaledVector(dir,0.026).setZ(zo+0.007),P2=c.clone().addScaledVector(dir,0.05).setZ(zo+0.0055);
      sweep([P0,P1,P2],u=>({w:(0.0065-u*0.0015)*endR(u,0,0.08),h:0.0026,n:2.6}),M.dark,p,{up:new V3(0,0,1),n:20,r:14})}
    else cyl(c.clone().setZ(zo+0.0026),c.clone().setZ(zo+0.0034),0.004,M.socket,6,0.004,p)}
  else cyl(c.clone().setZ(-zo),c.clone().setZ(-zo-0.0035),0.0076,M.dark,24,0.007,p)}
const mtbAxle=()=>!BARS[st.barType].drop;
// halv ytre felgbredde (samme som i hjulet) og setestagets sideavstand et stykke opp fra bakakselen
function rimHW(){const RD=RIMDB[st.rim]||RIMDB.mtb,wd=wheelDims();return RD.ew?RD.ew/2000:RD.iw?(RD.iw+6)/2000:Math.min(0.017,0.01+wd.w*0.08)}
function ssZ(dist){if(GM.ssProf){const P=GM.ssProf;if(dist<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(dist<=P[i][0]){const a=P[i-1],b=P[i],t=(dist-a[0])/(b[0]-a[0]||1);return a[1]+(b[1]-a[1])*t}return P[P.length-1][1]}
  const Lss=L2(Sb(GM.SST,GM.RA)),t=Math.max(0,Math.min(1,dist/Lss)),T=GM.T,top=(st.geo.stays==='triple'?T.tt/2:T.st/2)+0.004;
  return t<0.55?TZ+(0.042-TZ)*(t/0.55):0.042+(top-0.042)*((t-0.55)/0.45)}
/* ---------- hjul ---------- */
const TREADS={road:{rows:[],n:0,b:[.001,.001,.001]},gravel:{rows:[-44,-30,-16,0,16,30,44],n:70,b:[.0018,.004,.0035]},knobby2:{rows:[-40,-14,14,40],n:44,b:[.0045,.009,.008]},xc:{rows:[-36,-12,12,36],n:60,b:[.0025,.006,.006]},spike:{rows:[-38,-12,12,38],n:46,b:[.006,.011,.01],spikes:true},knobby:{rows:[-46,-24,0,24,46],n:32,b:[.007,.014,.012]},moto:{rows:[-40,-14,14,40],n:40,b:[.005,.016,.012]},
 street:{rows:[-28,0,28],n:30,b:[.0025,.03,.02]},slick:{rows:[-22,22],n:90,b:[.0012,.004,.008]},balloon:{rows:[-34,-12,12,34],n:56,b:[.003,.009,.011]}};
function rimBrake(front){const t=front?st.brakeF:st.brakeR;return['vbrake','canti','caliper'].includes(t)}
function wheel(c2,front){
  const g=new THREE.Group();g.position.copy(v(c2));B.add(g);
  const wd=wheelDims(),rim=wd.bead,minor=wd.h/2+0.001,major=rim+wd.h/2-0.002,lat=(wd.w/2)/minor;
  const prof=(a0,a1,n=18)=>{const r=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*D2R;r.push([major+minor*Math.cos(a),minor*Math.sin(a)*lat])}return r};
  const SW=SIDEWALLS[st.wall];
  lathe(prof(-58,58,24),M.tire,160,g);lathe(prof(58,150),M.wall,160,g);lathe(prof(-150,-58),M.wall,160,g);lathe(prof(150,210,8),M.tire,160,g);
  [-1,1].forEach(k=>{
    if(SW.stripe)lathe(prof(k>0?96:-110,k>0?110:-96,6).map(([r,z])=>[r+0.0004,z*1.003]),M.stripe,160,g);
    if(TIRES[st.tire].reflex)lathe(prof(k>0?122:-127,k>0?127:-122,4).map(([r,z])=>[r+0.0004,z*1.003]),M.reflex,160,g)});
  if(st.wall!=='black'&&st.wall!=='white'&&st.wall!=='creme')lathe(prof(64,72,4).map(([r,z])=>[r+0.0003,z*1.002]),M.tire,160,g),lathe(prof(-72,-64,4).map(([r,z])=>[r+0.0003,z*1.002]),M.tire,160,g);
  const T=TREADS[TIRES[st.tire].tr],mats=[],sp=[];
  for(let i=0;i<T.n;i++)T.rows.forEach((ph,j)=>{const th=(i+(j%2)*0.5)/T.n*Math.PI*2,phi=ph*D2R,rr=major+minor*Math.cos(phi)+T.b[0]*0.25;
    let q=new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),th).multiply(new THREE.Quaternion().setFromAxisAngle(new V3(0,1,0),-phi));
    if(TIRES[st.tire].tr==='balloon')q.multiply(new THREE.Quaternion().setFromAxisAngle(new V3(1,0,0),ph>0?0.5:-0.5));
    mats.push(mtx(new V3(Math.cos(th)*rr,Math.sin(th)*rr,minor*Math.sin(phi)*lat),q));
    if(T.spikes&&(j===0||j===3)&&i%2===0)sp.push(mtx(new V3(Math.cos(th)*(rr+0.004),Math.sin(th)*(rr+0.004),minor*Math.sin(phi)*lat*1.02),q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),-Math.PI/2))))});
  if(T.rows.length&&T.n){if(TIRES[st.tire].tr==='road'){}inst(new THREE.BoxGeometry(...T.b),M.tire,mats,g)}
  if(TIRES[st.tire].tr==='road'){[-1,1].forEach(k=>lathe(prof(k>0?28:-34,k>0?34:-28,4).map(([r,z])=>[r+0.0002,z]),M.reflex,160,g))}
  if(sp.length)inst(new THREE.CylinderGeometry(0.0022,0.0028,0.006,8),M.steel,sp,g);
  // felg
  const RD=RIMDB[st.rim]||RIMDB.mtb,rw=rimHW(),dep=(front?RD.d:(RD.dr||RD.d))/1000,pf=RD.prof;
  const rp=pf==='aero'?[[rim-dep,-0.0025],[rim-dep*0.85,-rw*.55],[rim-dep*0.45,-rw*.92],[rim+0.001,-rw],[rim+0.005,-rw*.9],[rim+0.005,rw*.9],[rim+0.001,rw],[rim-dep*0.45,rw*.92],[rim-dep*0.85,rw*.55],[rim-dep,0.0025],[rim-dep,-0.0025]]
     :pf==='v'?[[rim-dep,-0.003],[rim-dep*0.5,-rw*.8],[rim+0.001,-rw],[rim+0.005,-rw*.9],[rim+0.005,rw*.9],[rim+0.001,rw],[rim-dep*0.5,rw*.8],[rim-dep,0.003],[rim-dep,-0.003]]
     :[[rim-dep,-rw*.66],[rim-dep*0.7,-rw*.95],[rim+0.001,-rw],[rim+0.005,-rw*.9],[rim+0.005,rw*.9],[rim+0.001,rw],[rim-dep*0.7,rw*.95],[rim-dep,rw*.66],[rim-dep,-rw*.66]];
  lathe(rp,M.rims,128,g);
  if(rimBrake(front)&&RD.b!=='disc'){[-1,1].forEach(s=>lathe([[rim-0.011,s*(rw+0.0004)],[rim-0.001,s*(rw+0.0004)]],M.track,128,g))}
  // nav
  const D=DRIVES[st.drive],isHub=!front&&(D.t==='hub'||D.t==='coaster');
  const hl=front?0.1:0.135,fl=front?0.029:(isHub?0.04:0.033);
  const hm=M.hubs;
  if(((front&&st.brakeF==='drum')||(!front&&st.brakeR==='drum'))&&!isHub){lathe([[0.016,-0.035],[0.05,-0.03],[0.052,0.035],[0.045,0.045],[0.016,0.045]],hm,48,g);cyl(new V3(0,0,0.035),new V3(0,0,0.047),0.046,M.dark,40,0.046,g)}
  else if(isHub){const hr=D.hub;lathe([[0.016,-0.05],[hr*1.08,-0.05],[hr*1.08,-0.044],[hr,-0.04],[hr,0.04],[hr*1.08,0.044],[hr*1.08,0.05],[0.016,0.05]],hm,48,g)}
  else lathe([[0.012,-hl/2+0.008],[0.017,-hl/2+0.01],[0.017,-fl],[0.014,-fl*0.5],[0.0135,0],[0.014,fl*0.5],[0.017,fl],[0.017,hl/2-0.01],[0.012,hl/2-0.008]],hm,40,g);
  const fr=isHub?D.hub+0.01:0.029;
  [-1,1].forEach(s=>cyl(new V3(0,0,s*fl-0.0018),new V3(0,0,s*fl+0.0018),fr,hm,40,fr,g));
  cyl(new V3(0,0,-hl/2-0.012),new V3(0,0,hl/2+0.012),0.0048,M.steel,16,0.0048,g);
  if(!front){const dr=new V3().copy(v(U2(Sb(GM.SST,GM.RA))));[-1,1].forEach(s=>axleEnd(new V3(0,0,0),Math.max(TZ+0.003,hl/2+0.002),s,st.geo.axle||'qr',dr,mtbAxle(),g))}
  // eiker og nipler (instansiert)
  const N=st.spokesN,hr0=fr-0.004,cross=(front&&st.spokesN<=28)?0:(isHub?0.45:(N>=36?0.52:0.62)),rimIn=rim-dep+0.002,sm=[],nm=[];
  for(let i=0;i<N;i++){const a=i/N*Math.PI*2,side=i%2?1:-1,cr=(Math.floor(i/2)%2?1:-1)*cross;
    const h=new V3(Math.cos(a+cr)*hr0,Math.sin(a+cr)*hr0,side*fl),r=new V3(Math.cos(a)*rimIn,Math.sin(a)*rimIn,side*0.002),dir=new V3().subVectors(r,h);
    sm.push(mtx(h.clone().addScaledVector(dir,.5),qFrom(new V3(0,1,0),dir),new V3(1,dir.length(),1)));
    nm.push(mtx(new V3(Math.cos(a)*(rimIn+0.004),Math.sin(a)*(rimIn+0.004),side*0.002),qFrom(new V3(0,1,0),new V3(Math.cos(a),Math.sin(a),0))))}
  inst(new THREE.CylinderGeometry(0.001,0.001,1,6),M.spokes,sm,g);inst(new THREE.CylinderGeometry(0.0022,0.0022,0.012,8),M.nipples,nm,g);
  FOCUS[front?'hubF':'hubR']=v(c2);
}

/* ---------- ramme ---------- */
const TZ=0.066;
// formede rør: [u, halv høyde i rammeplanet, halv bredde sideveis]. u går fra krankboks/seteklynge mot hodestamme, og fra krankboks/topp mot dropout på stagene
const PROF={
 hydro:{dt:[[0,.021,.027],[.5,.0225,.0222],[.86,.0245,.021],[1,.031,.0225]],tt:[[0,.0135,.0185],[.5,.0155,.0178],[.85,.0168,.018],[1,.0225,.019]],st:[[0,.0185,.021],[.14,.0168,.0172],[1,.0168,.0172]],
   cs:[[0,.0125,.0095],[.6,.009,.0075],[1,.0075,.0068]],ss:[[0,.0072,.0056],[1,.0062,.0052]],n:2.6,bb:.0235},
 carbon:{dt:[[0,.026,.033],[.5,.0255,.0275],[.85,.028,.026],[1,.036,.027]],tt:[[0,.0155,.019],[.5,.0172,.0188],[.85,.019,.0195],[1,.026,.021]],st:[[0,.024,.025],[.2,.0185,.018],[1,.0185,.018]],
   cs:[[0,.016,.0115],[.6,.0105,.0085],[1,.0085,.0075]],ss:[[0,.0078,.0054],[1,.0066,.005]],n:3,bb:.025}};
function frame(){
  const g=st.geo,T=GM.T,fm=M.frame,BB=GM.BB,bb=v(BB),PR=T.prof?PROF[T.prof]:null,kk=T.k||1;
  const hu=v(GM.up).normalize(),h1=v(A(GM.HTT,K(GM.up,0.004))),h2=v(GM.HTB),ra=v(GM.RA);FOCUS.htb=h2.clone();
  GM.tubes={};
  // formet rør langs a-b med profil; lagres slik at dekor og tilbehør kan følge formen
  const ftube=(key,a,b,pr,e0,e1,sx=1,sy=1)=>{const d=U2(Sb(b,a)),a2=A(a,K(d,-e0)),b2=A(b,K(d,e1)),L=L2(Sb(b2,a2)),f0=e0/L,f1=1-e1/L;
    let W=pr.map(x=>[f0+x[0]*(f1-f0),x[1]*kk*sx]);const H=pr.map(x=>[f0+x[0]*(f1-f0),x[2]*kk*sy]);
    // setestammen gjøres smalere der bakhjulet er nærmest, så dekket ikke går inn i røret (minst 6 mm luft)
    if(key==='st'){const out=wheelDims().out,W0=W;W=[];for(let i=0;i<=20;i++){const u=i/20,P=M2(a2,b2,u),dd=L2(Sb(P,GM.RA));W.push([u,Math.max(0.008,Math.min(ip(W0,u),dd-out-0.006))])}}
    GM.tubes[key]={a:a2,b:b2,W,H,n:PR.n,u:t=>f0+t*(f1-f0)};
    return sweep([v(a2),v(M2(a2,b2,.5)),v(b2)],u=>({w:ip(W,u),h:ip(H,u),n:PR.n}),fm,null,{up:new V3(0,0,1),n:32,r:28})};
  if(PR){
    // hodestamme: konisk, litt utvidet nederst der skrårøret møter den
    const r0=T.htB/2,r1=T.ht/2,a0=h2.clone().addScaledVector(hu,-0.003);
    sweep([a0,a0.clone().lerp(h1,0.5),h1],u=>{const r=r0+(r1-r0)*Math.min(1,u*1.25)+(u<0.15?0.0018*(1-u/0.15):0);return{w:r,h:r,n:2}},fm,null,{up:new V3(0,0,1),n:20,r:40});
    // setestamme, aero når setepinnen er aero
    const stPr=g.post==='aero'?[[0,.024,.025],[.2,.022,.0135],[1,.021,.0128]]:PR.st;
    ftube('st',p2(0,0),GM.STT,stPr,0.01,0);
    ftube('tt',GM.SC,GM.TTF,PR.tt,0.006,0.012,g.ttFlat?0.8:1,g.ttFlat?1.12:1);
    if(g.dt==='bow'){const dd=U2(Sb(GM.DTF,BB)),nn=Rot(dd,Math.PI/2),dw=ip(PR.dt.map(x=>[x[0],x[1]]),.5)*kk;
      tube([bb,v(A(M2(BB,GM.DTF,.35),K(nn,-0.045))),v(A(M2(BB,GM.DTF,.7),K(nn,-0.035))),v(GM.DTF)],dw,fm,60,false,null,24)}
    else ftube('dt',BB,GM.DTF,PR.dt,0,0.014);
    cyl(bb.clone().setZ(-0.0365),bb.clone().setZ(0.0365),PR.bb,fm,40);
  }else{
    cyl(h2,h1,T.htB/2,fm,40,T.ht/2);
    cyl(v(K(GM.s,-0.012)),v(GM.STT),T.st/2,fm,32);
    if(g.tt==='bow'){const m=M2(GM.SC,GM.TTF,.5),dn=Rot(GM.ttDir,-Math.PI/2);tube([v(GM.SC),v(A(M2(GM.SC,GM.TTF,.25),K(dn,0.03))),v(A(m,K(dn,0.055))),v(A(M2(GM.SC,GM.TTF,.78),K(dn,0.035))),v(GM.TTF)],T.tt/2,fm,60,false,null,24)}
    else cyl(v(GM.SC),v(GM.TTF),T.tt/2,fm,32);
    if(g.dt==='bow'){const dd=U2(Sb(GM.DTF,BB)),nn=Rot(dd,Math.PI/2);tube([bb,v(A(M2(BB,GM.DTF,.35),K(nn,-0.045))),v(A(M2(BB,GM.DTF,.7),K(nn,-0.035))),v(GM.DTF)],T.dt/2,fm,60,false,null,24)}
    else{const me=cyl(bb,v(GM.DTF),T.dt/2,fm,40);me.scale.x=T.oval}
    sph(v(GM.SC),T.tt/2*1.02,fm);sph(v(GM.TTF),T.tt/2,fm);
    cyl(bb.clone().setZ(-0.0365),bb.clone().setZ(0.0365),0.0215,fm,36);
  }
  FOCUS.seat=v(GM.STT);
  // halv høyde på skrårøret i planet (for flaskeholder, porter og dekor)
  GM.dtH=u=>{const t=GM.tubes.dt;return t?ip(t.W,t.u(u)):T.dt/2*T.oval};
  GM.dtW=u=>{const t=GM.tubes.dt;return t?ip(t.H,t.u(u)):T.dt/2};
  // stag
  const csW=PR?PR.cs.map(x=>[x[0],x[1]*kk]):null,csH=PR?PR.cs.map(x=>[x[0],x[2]*kk]):null,ssW=PR?PR.ss.map(x=>[x[0],x[1]*kk]):null,ssH=PR?PR.ss.map(x=>[x[0],x[2]*kk]):null;
  const stSide=PR?(GM.tubes.st?ip(GM.tubes.st.H,0.9):T.st/2):T.st/2;
  // dekkklaring bak: stagene bøyes ut der dekket er bredest, med minst 5 mm luft (dekkets tverrsnitt som ellipse rundt akselen)
  const wdR=wheelDims(),RcR=wdR.bead+wdR.h/2,rhR=rimHW();
  const tireHalf=d=>{let hw=0;const u=(d-RcR)/(wdR.h/2+0.004);if(Math.abs(u)<1)hw=(wdR.w/2+0.002)*Math.sqrt(1-u*u);if(d<wdR.bead+0.004&&d>wdR.bead-0.05)hw=Math.max(hw,rhR);return hw};
  const clearPath=(pts,sideR,s,N=28)=>{const cv=new THREE.CatmullRomCurve3(pts,false,'centripetal'),P=cv.getPoints(N);
    const z0=P.map((p,i)=>Math.max(Math.abs(p.z),tireHalf(Math.hypot(p.x-GM.RA.x,p.y-GM.RA.y))+sideR(i/N)+0.005));
    const zs=z0.map((z,i)=>{let m=z;for(let k=-4;k<=4;k++){const j=i+k;if(j<0||j>N)continue;m=Math.max(m,z0[j]-Math.abs(k)*0.0012)}return m});
    zs[0]=Math.abs(P[0].z);zs[N]=Math.max(Math.abs(P[N].z),z0[N]);return P.map((p,i)=>new V3(p.x,p.y,s*zs[i]))};
  [-1,1].forEach(s=>{
    const drop=ra.clone().setZ(s*TZ),csPath=clearPath([bb.clone().setZ(s*0.03),v(M2(BB,GM.RA,.25),s*0.045),v(M2(BB,GM.RA,.7),s*0.062),drop],u=>PR?ip(csH,u):T.cs/2,s);
    if(PR)sweep(csPath,u=>({w:ip(csW,u),h:ip(csH,u),n:2.4}),fm,null,{up:new V3(0,0,1),n:36,r:20});
    else tube(csPath,T.cs/2,fm,40,false,null,16);
    if(g.stays==='cantilever'){
      const h3=v(A(GM.HTB,K(GM.up,0.03)));const stx=yy=>GM.s.x/GM.s.y*yy;
      tube(clearPath([h3,v(A(M2(GM.HTB,BB,.15),p2(-0.08,0.02)),s*0.006),v(p2(stx(0.13)+0.012,0.13),s*0.022),v(M2(BB,GM.RA,.55),s*0.05).add(new V3(0,0.06,0)),drop],()=>T.tt/2*0.9,s,48),T.tt/2*0.9,fm,80,false,null,18);
      tube(clearPath([v(GM.SC,s*0.016),v(M2(GM.SC,GM.RA,.5),s*0.045),drop],()=>T.ss/2,s),T.ss/2,fm,30,false,null,14);
    }else{
      const top=v(GM.SST,s*((g.stays==='triple'?T.tt/2:stSide)+(PR?ip(ssH,0):T.ss/2)*0.6));
      const ssP=clearPath(PR?[top.clone().add(v(K(U2(Sb(GM.SST,GM.RA)),0.006))),v(M2(GM.SST,GM.RA,.45),s*0.042),drop]:[top,v(M2(GM.SST,GM.RA,.45),s*0.04),drop],u=>PR?ip(ssH,u):T.ss/2,s);
      if(s>0)GM.ssProf=ssP.map(p=>[Math.hypot(p.x-GM.RA.x,p.y-GM.RA.y),Math.abs(p.z)]).reverse();
      if(PR){sweep(ssP,u=>({w:ip(ssW,u),h:ip(ssH,u),n:2.3}),fm,null,{up:new V3(0,0,1),n:30,r:18})}
      else{tube(ssP,T.ss/2,fm,40,false,null,14);sph(top,T.ss/2,fm)}
    }
    if(g.stays==='twinlat'){tube([v(A(GM.HTT,K(GM.d,0.035)),s*0.012),v(M2(GM.HTT,GM.RA,.25),s*0.025),v(M2(GM.HTT,GM.RA,.65),s*0.05),drop.clone().add(new V3(0.01,0.006,0))],0.0075,fm,60,false,null,14)}
    // dropouts: gjennomgående aksel får en kraftigere, avrundet dropout
    const ta=g.axle==='ta',dpl=rbox(g.dropouts==='horiz'?0.06:ta?0.05:0.045,ta?0.042:0.038,ta?0.008:0.006,ta?0.012:0.008,fm);dpl.position.copy(drop).add(new V3(g.dropouts==='horiz'?0.012:0.004,0.004,0));dpl.rotation.z=g.dropouts==='horiz'?0:0.45;
  });
  if(g.gussets){[[GM.TTF,K(GM.ttDir,-1),GM.d],[GM.DTF,U2(Sb(BB,GM.DTF)),GM.up]].forEach(([p,dir,hd])=>{const sh=new THREE.Shape();const a=A(p,K(dir,-0.004)),b=A(p,K(dir,0.1)),c=A(p,K(hd,0.085));
    [a,b,c].forEach((q,i)=>i?sh.lineTo(q.x,q.y):sh.moveTo(q.x,q.y));const gg=new THREE.ExtrudeGeometry(sh,{depth:0.004,bevelEnabled:true,bevelThickness:.0015,bevelSize:.0015});gg.translate(0,0,-0.002);put(new THREE.Mesh(gg,fm))})}
  // broer: moderne skiverammer har som regel ingen bro mellom setestagene
  const Lss=L2(Sb(GM.SST,GM.RA)),sb=A(GM.RA,K(U2(Sb(GM.SST,GM.RA)),Math.min(Lss-0.03,wheelDims().out+0.016))),zb=ssZ(L2(Sb(sb,GM.RA)));if(rimBrake(false)||st.fender==='full'||(!PR&&g.stays!=='triple'))cyl(v(sb,-zb),v(sb,zb),0.006,fm,16);
  if(!PR||g.csBridge){const cb=M2(BB,GM.RA,.2);cyl(v(cb,-0.042),v(cb,0.042),0.007,fm,16)}
  // girhenger
  if(DRIVES[st.drive].t==='der'&&!DRIVES[st.drive].udh){const hg=rbox(0.024,0.042,0.005,0.007,M.dark);hg.position.copy(ra).add(new V3(-0.0015,-0.017,-TZ-0.0045));hg.rotation.z=-0.12}
  // hodestamme-dekor og styrelager (integrert lager på karbon og formet alu)
  const hm=v(M2(GM.HTB,GM.HTT,.5));if(!PR)cyl(hm.clone().addScaledVector(hu,-0.022),hm.clone().addScaledVector(hu,0.022),T.ht/2+0.0007,M.accent,40,T.ht/2+0.0007);
  if(PR){cyl(h2.clone().addScaledVector(hu,-0.0125),h2.clone().addScaledVector(hu,0.0015),T.htB/2-0.0012,M.headset,40,T.htB/2-0.0035);   // nedre lagerskål: tetter mellomrommet ned til gaffelkronen
    cyl(h1.clone().addScaledVector(hu,-0.001),h1.clone().addScaledVector(hu,0.006),T.ht/2-0.0006,M.headset,40,T.ht/2-0.003)}
  else{cyl(h1.clone().addScaledVector(hu,-0.002),h1.clone().addScaledVector(hu,0.01),T.ht/2+0.002,M.headset,40);
    cyl(h2.clone().addScaledVector(hu,-0.012),h2.clone().addScaledVector(hu,0.002),T.htB/2+0.002,M.headset,40)}
  // flaskeholderbolter og bolter for overrørsveske
  const dd=v(GM.DTF).sub(bb).normalize(),nrm=new V3(-dd.y,dd.x,0),Lg=bb.distanceTo(v(GM.DTF));
  if(g.dt!=='bow')[0.36,0.5].forEach(t=>bolt(bb.clone().addScaledVector(dd,t*Lg).addScaledVector(nrm,GM.dtH(t)-0.0005),nrm,0.0042,M.bolts));
  if(g.ttBoss){const tt=GM.tubes.tt,td=v(GM.TTF).sub(v(GM.SC)).normalize(),tn=new V3(-td.y,td.x,0);if(tn.y<0)tn.negate();const Lt=v(GM.SC).distanceTo(v(GM.TTF));
    [0.78,0.9].forEach(t=>bolt(v(GM.SC).addScaledVector(td,t*Lt).addScaledVector(tn,(tt?ip(tt.W,tt.u(t)):T.tt/2)-0.0005),tn,0.0036,M.bolts))}
  // porter for intern kabelføring (brukes av cables)
  const htR=fr=>T.htB/2+(T.ht/2-T.htB/2)*fr,hp=fr=>A(GM.HTB,K(GM.up,g.ht*fr));
  ANCH.portHT=s=>({p:v(hp(0.58),s*(htR(0.58)+0.0004)),nrm:new V3(0,0,s)});
  ANCH.portBB=s=>{const t=0.09;return{p:bb.clone().addScaledVector(dd,t*Lg).addScaledVector(nrm,-GM.dtH(t)+0.0006).setZ(s*0.008),nrm:nrm.clone().negate()}};
  const cd=U2(Sb(GM.BB,GM.RA)),cn=Rot(cd,Math.PI/2);
  ANCH.portCS=(s,dist)=>{const P=A(GM.RA,K(cd,dist));return{p:v(A(P,K(cn,(csW?ip(csW,0.82):T.cs/2)-0.0004)),s*0.063),nrm:v(cn)}};
  decalStyle(T);
  if(st.decal.trim())decal(g.dt==='bow'?A(BB,K(U2(Sb(GM.DTF,BB)),0.02)):BB,GM.DTF,GM.dtW(0.5)+0.0014);
}
// liten mørk port der kabelen går inn i eller ut av rammen
function port(P){const e=sph(P.p,0.0042,M.socket);e.scale.set(1.5,0.8,0.32);e.quaternion.copy(qFrom(new V3(0,0,1),P.nrm));return P.p.clone().addScaledVector(P.nrm,0.002)}

// generiske dekorstriper (ingen merkelogoer)
function sleeve(a,b,t0,t1,r,m,ox){const A3=v(a),B3=v(b),d=B3.clone().sub(A3);const me=cyl(A3.clone().addScaledVector(d,t0),A3.clone().addScaledVector(d,t1),r,m,40);if(ox)me.scale.x=ox;
  me.material=me.material.clone();me.material.polygonOffset=true;me.material.polygonOffsetFactor=-1;return me}
function decalStyle(T){const ds=st.decalStyle,g=st.geo;if(ds==='none')return;
  const dtOk=g.dt!=='bow',ttOk=g.tt!=='bow'&&g.tt!=='step',a1=M.accent,a2=M.decal2,rD=T.dt/2+0.0005,rT=T.tt/2+0.0005,rS=T.st/2+0.0005;
  const base=k=>k==='dt'?rD:k==='tt'?rT:rS;
  const sleeveK=(k,a,b,t0,t1,r,m,ox)=>{const tb=GM.tubes&&GM.tubes[k];if(!tb)return sleeve(a,b,t0,t1,r,m,ox);const ex=0.0006+(r-base(k)),P=t=>v(M2(a,b,t));
    const mm2=m.clone();mm2.polygonOffset=true;mm2.polygonOffsetFactor=-1;
    return sweep([P(t0),P((t0+t1)/2),P(t1)],u=>{const uu=tb.u(t0+(t1-t0)*u);return{w:ip(tb.W,uu)+ex,h:ip(tb.H,uu)+ex,n:tb.n}},mm2,null,{up:new V3(0,0,1),n:3,r:28,caps:false})};
  const DTa=GM.BB,DTb=GM.DTF,TTa=GM.SC,TTb=GM.TTF,Ld=L2(Sb(DTb,DTa)),Lt=L2(Sb(TTb,TTa)),mm=(x,L)=>x/L;
  if(ds==='stripes'){
    if(dtOk){[[0.72,0.018,a1],[0.76,0.008,a2],[0.785,0.018,a1]].forEach(([t,w,m])=>sleeveK('dt',DTa,DTb,t,t+mm(w,Ld),rD,m,T.oval))}
    if(ttOk){[[0.8,0.014,a2],[0.84,0.022,a1]].forEach(([t,w,m])=>sleeveK('tt',TTa,TTb,t,t+mm(w,Lt),rT,m))}
    sleeveK('st',p2(0,0),GM.STT,0.78,0.78+mm(0.012,g.st),rS,a2);
  }else if(ds==='panel'){
    if(dtOk){sleeveK('dt',DTa,DTb,0.28,0.74,rD,a1,T.oval);sleeveK('dt',DTa,DTb,0.268,0.276,rD+0.0003,a2,T.oval);sleeveK('dt',DTa,DTb,0.744,0.752,rD+0.0003,a2,T.oval)}
    if(ttOk)sleeveK('tt',TTa,TTb,0.3,0.7,rT,a1);
  }else if(ds==='pin'){
    const pin=(k,a,b,L,r,ox)=>[[0.06,0.003],[0.075,0.0018],[0.91,0.0018],[0.925,0.003]].forEach(([t,w])=>sleeveK(k,a,b,t,t+mm(w,L),r,a1,ox));
    if(dtOk)pin('dt',DTa,DTb,Ld,rD,T.oval);if(ttOk)pin('tt',TTa,TTb,Lt,rT);
    [[0.86,0.003],[0.875,0.0018]].forEach(([t,w])=>sleeveK('st',p2(0,0),GM.STT,t,t+mm(w,g.st),rS,a1));
  }
}
function decal(a,b,off){
  const txt=st.decal.trim().toUpperCase().slice(0,14);
  const c=document.createElement('canvas');c.width=1024;c.height=128;const x=c.getContext('2d');
  const f=st.p.accent;const col=f.m==='chrome'?'#e3e6e9':f.m==='gold'?'#f0c46c':f.m==='oil'?'#7a5ab8':f.m==='rainbow'?'#e05ab0':f.c;
  x.fillStyle=col;x.font='400 118px "Bebas Neue", Impact, sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,512,66);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
  const tex2=tex.clone();tex2.wrapS=THREE.RepeatWrapping;tex2.repeat.x=-1;tex2.needsUpdate=true;
  const len=0.34,mk=t=>new THREE.MeshPhysicalMaterial({map:t,transparent:true,side:THREE.DoubleSide,roughness:0.25,clearcoat:1,metalness:NOCOLOR.includes(f.m)?0.9:0,polygonOffset:true,polygonOffsetFactor:-3});
  const mid=v(M2(a,b,0.5)),ang=Math.atan2(b.y-a.y,b.x-a.x);
  [-1,1].forEach(s=>{const gr=new THREE.Group();gr.position.copy(mid);gr.rotation.z=ang;B.add(gr);
    const pl=new THREE.Mesh(new THREE.PlaneGeometry(len,len/8),mk(s<0?tex:tex2));pl.position.z=s*off;gr.add(pl)});
}

/* ---------- gaffel ---------- */
// lokalt gaffelsystem: a = avstand ned fra kronen langs styreaksen, f = fremover, z = sideveis
function FP(a,f,z){return v(A(A(GM.CR,K(GM.d,a)),K(GM.n,f)),z)}
function taperTube(pts,r0,r1,m,seg=56){const cv=new THREE.CatmullRomCurve3(pts,false,'centripetal');const rs=18;const g=new THREE.TubeGeometry(cv,seg,1,rs,false);
  const pa=g.attributes.position,c=new V3();for(let i=0;i<=seg;i++){cv.getPointAt(i/seg,c);const r=r0+(r1-r0)*Math.pow(i/seg,1.2);
    for(let j=0;j<=rs;j++){const k=i*(rs+1)+j;pa.setXYZ(k,c.x+(pa.getX(k)-c.x)*r,c.y+(pa.getY(k)-c.y)*r,c.z+(pa.getZ(k)-c.z)*r)}}
  pa.needsUpdate=true;return put(new THREE.Mesh(g,m))}
function gaiter(a,b,r){const d=new V3().subVectors(b,a),L=d.length(),n=Math.max(4,Math.round(L/0.009)),pts=[];
  for(let i=0;i<=n*2;i++)pts.push(new THREE.Vector2(i%2?r*1.28:r,i/(n*2)*L));
  const g=new THREE.LatheGeometry(pts,28);const me=put(new THREE.Mesh(g,M.boot));me.position.copy(a);me.quaternion.copy(qFrom(new V3(0,1,0),d));return me}
function crownPlate(a,f0,f1,width,thick,m){const me=rbox(f1-f0,thick,width,Math.min(0.01,thick/2.2),m);me.position.copy(FP(a,(f0+f1)/2,0));me.rotation.z=Math.atan2(GM.n.y,GM.n.x);return me}
function discTab(){return;const FA=GM.FA,up=GM.up,n=GM.n;
  const t=rbox(0.05,0.02,0.007,0.006,M.fork);t.position.copy(v(A(A(FA,K(up,0.05)),K(n,-0.018)),0.058));t.rotation.z=Math.atan2(up.y,up.x)+0.25}
// retning langs gaffelbeinet foran: rett gaffel med offset i kronen følger styreaksen
function frontLeg(){return ['susp','susp90','dual'].includes(st.forkType)?GM.up:U2(Sb(GM.CR,GM.FA))}
function rimBosses(){return;/* soklene tegnes nå av bremsen selv */const wd=wheelDims(),leg=U2(Sb(GM.CR,GM.FA)),piv=A(GM.FA,K(leg,wd.bead-0.037));
  [-1,1].forEach(s=>cyl(v(piv,s*(zl-0.004)),v(piv,s*(zl+0.004)),0.0075,M.fork,16))}
const FORK_ZS={susp:0.062,susp90:0.058};
const suspZS=T=>Math.max(FORK_ZS[T]||0.062,wheelDims().w/2+0.002+(T==='susp90'?0.0185:0.0205)+0.006);
function fork(){
  const fm=M.fork,FA=GM.FA,CR=GM.CR,up=GM.up,n=GM.n,a2c=GM.a2c,off=st.geo.offset;
  const lf={thin:0.8,std:1,fat:1.3}[st.forkLeg]||1,T=st.forkType;
  const dualX=T==='dual'?0.034:0;
  const steerTop=v(A(GM.HTT,K(up,0.012+dualX+st.spacers/1000+(st.stemType==='quill'?0.01:st.stemType==='integrated'&&BARS[st.barType].drop?0.02:0.042))));
  cyl(v(A(GM.HTB,K(up,-0.006))),steerTop,0.0143,M.steel,28);
  FOCUS.fork=FP(a2c*0.45,off*0.5,0);if(T==='susp'||T==='susp90')FOCUS.fork=null;
  const zB=0.051;
  if(T==='susp'||T==='susp90'){
    // Ekte proporsjoner: beina står parallelt med styreaksen gjennom akselen, offseten ligger i kronen.
    // Høyde h måles langs beinet fra akselen. Kronen sitter rett under nedre styrelager (høyde a2c).
    const old=T==='susp90',out=wheelDims().out;
    const rs=old?0.0145:0.016,rlB=old?0.016:0.0175,rlT=old?0.0185:0.0205,crownH=old?0.026:0.03;
    const zs=suspZS(T);   // plass til brede dekk
    const ang=Math.atan2(up.y,up.x)-Math.PI/2,H=(h,f=0)=>A(A(FA,K(up,h)),K(n,f));
    // tetningene ligger omtrent i høyde med toppen av dekket; buens underside skal ha ca. 20 mm klaring til dekket
    const ARCH_CLR=0.02,ar=old?0.0085:0.0105,bands=[[0,0],[-0.0065,-0.001],[-0.012,-0.002]],archDepth=-bands[2][0]+ar;
    const L=Math.max(out-0.01,a2c-crownH-0.15),cB=a2c-crownH,archF=rlT+0.013;
    const archTop=Math.sqrt(Math.max(0,(out+ARCH_CLR)**2-archF**2))+archDepth;
    const fm2=fm;
    [-1,1].forEach(s=>{const z=s*zs;
      // nedre bein: konisk rør, avrundet bunn, dropout på innsiden
      cyl(v(H(-0.012),z),v(H(L),z),rlB,fm2,40,rlT);
      const cap=sph(v(H(-0.012),z),rlB,fm2);cap.scale.set(1,0.55,1);
      const dp=rbox(0.032,0.046,0.009,0.006,fm2);orient(dp,v(H(0.004,0.002),s*(0.0505+0.0045)),ang);
      cyl(v(H(L-0.006),z),v(H(L+0.004),z),rlT+0.0006,M.black,40,rlT-0.001);           // støvtetning
      if(old)cyl(v(H(L+0.004),z),v(H(L+0.008),z),rs+0.003,M.black,32);
      // standrør
      cyl(v(H(L),z),v(H(cB+0.004),z),rs,M.stanch,40);
      if(old)gaiter(v(H(L+0.008),z),v(H(cB-0.004),z),rs+0.0035);
      // krone: krage rundt hvert standrør
      cyl(v(H(cB),z),v(H(a2c),z),rs+0.0062,fm2,40);
      bolt(v(H(cB+crownH/2,rs+0.0062),z+s*0.004),v(n),0.0032,M.bolts);
      // topplokk (luftventil venstre, låsehendel høyre)
      cyl(v(H(a2c),z),v(H(a2c+0.006),z),rs*0.88,M.dark,32);
      if(s<0){const kb=cyl(v(H(a2c+0.006),z),v(H(a2c+0.016),z),old?0.009:0.011,M.dark,8,old?0.009:0.011);
        const lv=rbox(0.03,0.006,0.008,0.003,M.levers);orient(lv,v(H(a2c+0.013,0.012),z),ang)}
      else cyl(v(H(a2c+0.006),z),v(H(a2c+0.011),z),0.0055,M.steel,16);
    });
    // kronebro mellom kragene og styrerøret
    const span=zs*2,cC=a2c-crownH/2;
    const br=rbox(off+0.03,crownH*0.82,span,0.009,fm);orient(br,v(A(CR,A(K(GM.d,crownH/2),K(n,off/2-0.004)))),ang);
    cyl(v(A(CR,K(GM.d,crownH))),v(A(CR,K(GM.d,-0.002))),0.0215,fm,40);
    // bremsebue foran: reiser seg over dekket
    const arch=[];const pts=s=>[v(H(L-0.055,rlB*0.55),s*zs),v(H(L-0.012,rlT+0.004),s*(zs-0.004)),v(H(archTop-0.014,rlT+0.011),s*zs*0.56)];
    // buen bygges som et bredt bånd (tre parallelle rør) slik den ser ut på ekte gafler
    bands.forEach(([dh,df],i)=>{const P=s=>[v(H(L-0.06+dh,rlB*0.55+df),s*zs),v(H(L-0.015+dh,rlT+0.004+df),s*(zs-0.004)),v(H(archTop-0.012+dh,archF-0.002+df),s*zs*0.56)];
      tube([...P(-1),v(H(archTop+dh,archF+df),0),...P(1).reverse()],ar-i*0.0006,fm,60,false,null,16)});
    // bremsefeste (post mount) bak på venstre bein

    // returdemping nederst på høyre bein
    if(!old){const rk=cyl(v(H(-0.019),-zs),v(H(-0.028),-zs),0.006,new THREE.MeshStandardMaterial({color:0xc4202a,roughness:0.4,metalness:0.6}),12)}
    // aksel: hurtigkobling
    cyl(v(FA,-(zs+rlB)),v(FA,zs+rlB),0.0045,M.steel,12);
    const ldir=v(U2(A(K(up,1),K(n,-0.35))));[-1,1].forEach(s=>axleEnd(v(FA),zs+rlB-0.002,s,st.geo.axle==='nut'?'qr':st.geo.axle||'qr',ldir,true));
    FOCUS.fork=v(H(L*0.7,0.02),0);
  }else if(T==='carbon'){
    // moderne karbongaffel: rette aeroblad (dype forfra og bak, smale fra siden) som står parallelt utenfor dekket, og en bred krone
    // som buer over dekket og flyter inn i hodestammen. Kaius har BMCs «Halo»-krone: ekstra bred, med tydelige skuldre.
    const halo=!!st.geo.forkHalo,wd=wheelDims(),Rc=wd.bead+wd.h/2,rh=rimHW(),ht=GM.T,htR=Math.max(0.022,(ht.htB||0.05)/2);
    const halfAt=d=>{let hw=0;const u=(d-Rc)/(wd.h/2+0.004);if(Math.abs(u)<1)hw=(wd.w/2+0.002)*Math.sqrt(1-u*u);if(d<wd.bead+0.004&&d>wd.bead-0.05)hw=Math.max(hw,rh);return hw};
    const aT=halo?0.04:0.036,fT=Math.min(off*0.25,0.01),NB=24;
    const dep=t=>(halo?0.019:0.0165)-(halo?0.0085:0.007)*t,side=t=>0.0105-0.0035*t;     // halv dybde forfra/bak og halv bredde sideveis
    const bl=t=>[aT+(a2c-aT)*t,fT+(off-fT)*t];
    const zreq=[];for(let i=0;i<=NB;i++){const t=i/NB,[a,f]=bl(t),P=FP(a,f,0),d=Math.hypot(P.x-FA.x,P.y-FA.y);zreq.push(halfAt(d)+side(t)+0.006)}
    // bladene smalner litt innover mot kronen, som på ekte gafler (Kaius: 6 mm luft per side med 52 mm dekk)
    const zBot=Math.max(zB,zreq[NB]),zTop=Math.max(Math.max(...zreq)+0.001,zBot-0.0085,halo?0.045:0.04);
    const zAtB=t=>Math.max(zTop+(zBot-zTop)*t,zreq[Math.round(t*NB)]);
    [-1,1].forEach(s=>{
      const pts=[];for(let i=0;i<=NB;i+=4){const t=i/NB,[a,f]=bl(t);pts.push(FP(a,f,s*zAtB(t)))}
      pts.unshift(FP(aT-0.012,fT,s*zTop));
      const tin=u=>u<0.08?0.9+0.1*(u/0.08):1;   // toppen av bladet ligger inne i kronen, så skjøten ikke synes
      sweep(pts,u=>({w:dep(u)*endR(u,0,0.03)*tin(u),h:side(u)*endR(u,0,0.03)*tin(u),n:2.15}),fm,null,{up:new V3(0,0,1),n:48,r:24});
      // dropout for gjennomgående aksel: fortykket ende rundt akselen
      const dp=sph(FP(a2c,off,s*zBot),0.0112,fm);dp.scale.set(1.15,1.15,0.72);
    });
    // krone: én sammenhengende bue fra skulder til skulder, tykkest på midten under hodestammen
    const sh=zTop,cp=[[aT+0.016,fT,-sh],[aT-0.012,fT*0.8,-sh*0.98],[halo?0.02:0.017,fT*0.4,-sh*0.72],[0.012,0,-sh*0.3],[0.011,0,0],[0.012,0,sh*0.3],[halo?0.02:0.017,fT*0.4,sh*0.72],[aT-0.012,fT*0.8,sh*0.98],[aT+0.016,fT,sh]].map(([a,f,z])=>FP(a,f,z));
    // skuldrene er litt kraftigere enn bladet og smalner jevnt inn i det
    sweep(cp,u=>{const c=1-Math.abs(u*2-1),e=Math.min(1,Math.abs(u*2-1)>0.9?(1-Math.abs(u*2-1))/0.1:1);return{w:(0.0105+0.0018*c)*(0.97+0.06*e),h:(dep(0)+(htR*1.02-dep(0))*Math.pow(c,1.6))*(0.98+0.05*e),n:2.3}},fm,null,{up:v(n),n:72,r:28});
    // overgang mot hodestammen: kort konus i gaffelfargen som fortsetter hodestammens form
    const hr0=htR+0.0018;cyl(FP(-0.016,0,0),FP(0.012,0,0),hr0,fm,40,hr0*1.03);if(!halo)cyl(FP(-0.0125,0,0),FP(-0.0105,0,0),hr0+0.0006,M.headset,40);
    FOCUS.fork=FP(a2c*0.45,off*0.5,0);FOCUS.crown=FP(0.06,0.01,0);
  }else if(T==='rigid'||T==='truss'){
    const crown=T==='truss'?'flat':T==='carbon'?'uni':st.forkCrown,blade=T==='carbon'?'straight':st.forkBlade;
    const r0=(T==='carbon'?0.017:0.0135)*lf,r1=(T==='carbon'?0.0095:0.0085)*lf;
    // bladets midtlinje (a,f) fra kronen til akselen
    const aT=crown==='uni'?0.03:0.022;
    const fT=blade==='straight'?Math.min(off,0.012):0;
    const zT=crown==='uni'?0.03:0.042;
    const line=blade==='straight'?[[aT,fT],[(aT+a2c)/2,(fT+off)/2],[a2c,off]]
      :blade==='curve'?[[aT,fT],[a2c*0.55,fT+0.002],[a2c*0.82,off*0.42],[a2c*0.94,off*0.85],[a2c,off]]
      :[[aT,fT],[a2c*0.32,-0.004],[a2c*0.62,off*0.12],[a2c*0.84,off*0.62],[a2c*0.95,off*0.95],[a2c,off+0.004]];
    const zAt=t=>zT+(zB-zT)*Math.min(1,t*1.6);
    // dekkklaring: bladet må stå utenfor dekket med minst 5 mm luft. Dekkets tverrsnitt regnes som en ellipse (bredde w, høyde h)
    // rundt akselen, og bladets avstand fra akselen bestemmer hvor bredt dekket er akkurat der
    const wd=wheelDims(),Rc=wd.bead+wd.h/2,rimHW_=rimHW();
    const halfAt=d=>{let hw=0;const u=(d-Rc)/(wd.h/2+0.004);if(Math.abs(u)<1)hw=(wd.w/2+0.002)*Math.sqrt(1-u*u);if(d<wd.bead+0.004&&d>wd.bead-0.05)hw=Math.max(hw,rimHW_);return hw};
    const cv2=new THREE.CatmullRomCurve3(line.map(([a,f])=>new V3(a,f,0)),false,'centripetal'),NS=18,dense=cv2.getPoints(NS);
    const zs0=dense.map((p,i)=>{const t=i/NS,P=FP(p.x,p.y,0),d=Math.hypot(P.x-GM.FA.x,P.y-GM.FA.y),r=r0+(r1-r0)*Math.pow(t,1.2);return Math.max(zAt(Math.max(0,(p.x-aT)/(a2c-aT))),halfAt(d)+r+0.005)});
    // jevn ut så bladet bøyer mykt rundt dekket i stedet for å få knekk
    const zsS=zs0.map((z,i)=>{let m=z;for(let k=-3;k<=3;k++){const j=i+k;if(j<0||j>NS)continue;m=Math.max(m,zs0[j]-Math.abs(k)*0.0015)}return m});
    zsS[NS]=Math.max(zB,zsS[NS]);const zBot=zsS[NS];
    [-1,1].forEach(s=>{
      const pts=dense.map((p,i)=>FP(p.x,p.y,s*zsS[i]));
      if(crown==='uni'){pts.unshift(FP(0.004,0,s*0.006),FP(0.014,0,s*Math.max(0.019,zsS[0]-0.008)))}
      taperTube(pts,crown==='uni'?r0*1.05:r0,r1,fm);
      sph(FP(a2c,off,s*zBot),r1,fm);
      const dp=rbox(0.03,0.026,0.006,0.006,fm);dp.position.copy(FP(a2c,off,s*zBot));dp.rotation.z=Math.atan2(up.y,up.x);
    });
    if(crown==='uni'){sph(FP(0.004,0,0),0.0175,fm);cyl(FP(-0.004,0,0),FP(0.008,0,0),0.0175,fm,32)}
    else if(crown==='flat'){crownPlate(0.011,-0.024,0.024,0.13,0.02,fm);[-1,1].forEach(s=>cyl(FP(0.004,0,s*0.042),FP(0.032,0,s*0.042),r0+0.0025,fm,24))}
    else if(crown==='seg'){crownPlate(0.012,-0.022,0.022,0.12,0.026,fm);[-1,1].forEach(s=>{cyl(FP(0.0,0,s*0.042),FP(0.045,fT*0.4,s*0.042),r0+0.003,fm,24);bolt(FP(0.012,0.022,s*0.03),v(n),0.003,M.bolts)})}
    else{ // kraftig klassisk krone
      crownPlate(0.014,-0.02,0.02,0.1,0.03,fm);[-1,1].forEach(s=>{const c=sph(FP(0.02,0,s*0.044),0.022,fm);c.scale.set(1,1.15,1);cyl(FP(0.02,0,s*0.044),FP(0.05,0,s*0.044),r0+0.004,fm,24,r0+0.001)});
      cyl(FP(-0.006,0,0),FP(0.004,0,0),0.02,M.headset,32)}
    if(T==='truss'){
      [-1,1].forEach(s=>{const top=FP(-0.012,0.03,s*0.036),bot=FP(a2c-0.008,off+0.018,s*(zB+0.004));
        tube([top,FP(a2c*0.5,off*0.5+0.04,s*0.046),bot],0.0058*lf,fm,40,false,null,12);
        cyl(FP(a2c*0.5,off*0.5+0.035,s*0.046),FP(a2c*0.5,(fT+off)/2,s*zAt(0.5)),0.004*lf,fm,12);
        bolt(FP(a2c-0.008,off+0.018,s*(zB+0.008)),new V3(0,0,s),0.0035,M.bolts)});
      crownPlate(-0.014,0.0,0.04,0.09,0.012,fm);
    }
    discTab();rimBosses(zB-0.002);
  }else if(T==='dual'){
    const aU=-(st.geo.ht+0.012)-0.018,rU=0.0165*lf,rL=0.0185*lf,zs=0.062;
    crownPlate(0.012,-0.026,off+0.026,zs*2+0.05,0.026,fm);crownPlate(aU,-0.026,off+0.026,zs*2+0.05,0.022,fm);
    [-1,1].forEach(s=>{
      cyl(FP(aU-0.016,off,s*zs),FP(0.12,off,s*zs),rU,M.stanch,32);
      taperTube([FP(0.1,off,s*zs),FP((0.1+a2c)/2,off,s*zs*0.94),FP(a2c,off,s*(zB+0.004))],rL,rL*0.78,fm);
      cyl(FP(0.095,off,s*zs),FP(0.108,off,s*zs),rL+0.002,M.black,32);
      sph(FP(aU-0.016,off,s*zs),rU,M.stanch);
      [aU,0.012].forEach(a=>{bolt(FP(a,off+0.026,s*zs),v(n),0.004,M.bolts)});
    });
    bolt(FP(aU,-0.026,0),v(K(n,-1)),0.0045,M.bolts);
    discTab();rimBosses(zs-0.006);
  }else{
    const b0=A(A(FA,K(up,0.045)),K(n,-0.042)),fr=A(A(CR,K(n,0.05)),K(up,-0.085)),top=A(CR,K(n,0.05));
    const kz=Math.max(1,(wheelDims().w/2+0.002+0.013*lf+0.005)/0.046);   // bredere springergaffel til ballongdekk
    [-1,1].forEach(s=>{s*=kz;
      taperTube([v(b0,s*0.05),v(A(b0,K(up,0.15)),s*0.048),v(A(CR,K(up,-0.006)),s*0.042)],0.013*lf,0.011*lf,fm,30);
      taperTube([v(FA,s*0.058),v(A(FA,K(up,0.17)),s*0.058),v(fr,s*0.058)],0.008*lf,0.0075*lf,fm,30);
      box(v(FA,s*0.056),v(b0,s*0.054),0.016,0.008,fm);bolt(v(b0,s*0.06),new V3(0,0,Math.sign(s)),0.004,M.bolts);
      helix(v(fr,s*0.058),v(top,s*0.058),0.012,7,0.0028,M.chrome);
    });
    const cr=rbox(0.11,0.024,0.14*kz,0.006,fm);cr.position.copy(v(A(CR,K(n,0.022))));cr.rotation.z=Math.atan2(up.y,up.x)-Math.PI/2;
  }
  if(!['susp','susp90'].includes(T)){const ldir=v(U2(Sb(GM.CR,GM.FA)));const kz=T==='springer'?Math.max(1,(wheelDims().w/2+0.002+0.013*lf+0.005)/0.046):1;[-1,1].forEach(s=>axleEnd(v(FA),T==='dual'?0.062:T==='springer'?0.062*kz:0.056,s,st.geo.axle||'qr',ldir,mtbAxle()))}
}

/* ---------- styre, stem, hendler ---------- */
function cockpit(){
  const up=GM.up,n=GM.n,HTT=GM.HTT,sm=M.stem;
  const dx=st.forkType==='dual'?0.034:0,sp=st.spacers/1000+dx;
  // spacere
  if(sp-dx>0.001)cyl(v(A(HTT,K(up,0.01+dx))),v(A(HTT,K(up,0.01+sp))),0.0175,M.headset,36);
  let E,clampDir;
  if(st.stemType==='quill'){
    const Q=A(HTT,K(up,0.01+sp+0.07)),ang=st.stemAng*D2R,dir=p2(Math.cos(ang),Math.sin(ang));E=A(Q,K(dir,st.stemLen/1000));
    cyl(v(A(HTT,K(up,0.006))),v(Q),0.0125,sm,32);sph(v(Q),0.0135,sm);
    tube([v(Q),v(A(Q,K(dir,st.stemLen/2000))).add(new V3(0,0.004,0)),v(E)],0.0115,sm,24,false,null,20);
    bolt(v(A(Q,K(up,0.012))),v(up),0.0045,M.bolts);
  }else if(st.stemType==='integrated'&&BARS[st.barType].drop){
    // integrert cockpit: stem og styre i ett, ingen synlige bolter eller kabler
    const STC=A(HTT,K(up,0.01+sp+0.021)),ang=st.stemAng*D2R,dir=U2(A(K(n,Math.cos(ang)),K(up,Math.sin(ang))));E=A(STC,K(dir,st.stemLen/1000));
    const S0=A(STC,K(dir,-0.022));
    sweep([v(S0),v(M2(S0,E,.5)),v(E)],u=>({w:(0.021-u*0.008)*endR(u,0.18,0),h:0.0175-u*0.002,n:2.8}),sm,null,{up:new V3(0,0,1),n:30,r:28});
    cyl(v(A(HTT,K(up,0.006))),v(A(STC,K(up,-0.012))),0.0205,M.headset,40,0.0175);
  }else{
    const STC=A(HTT,K(up,0.01+sp+0.021)),ang=st.stemAng*D2R,dir=U2(A(K(n,Math.cos(ang)),K(up,Math.sin(ang))));E=A(STC,K(dir,st.stemLen/1000));
    if(st.stemType==='bmx'){const H=0.05;
      cyl(v(A(STC,K(up,-H/2))),v(A(STC,K(up,H/2))),0.0215,sm,40);
      cyl(v(A(STC,K(up,H/2))),v(A(STC,K(up,H/2+0.004))),0.017,M.headset,32);bolt(v(A(STC,K(up,H/2+0.004))),v(up),0.004,M.bolts);
      const bd=rbox(Math.max(0.01,st.stemLen/1000-0.012),0.05,0.06,0.008,sm);bd.position.copy(v(M2(STC,E,.5)));bd.rotation.z=Math.atan2(dir.y,dir.x);
      // bakre klemme: slisset ører bak styrerøret med to bolter på tvers
      const ear=rbox(0.016,H*0.86,0.03,0.004,sm);orient(ear,v(A(STC,K(n,-0.024))),Math.atan2(n.y,n.x));
      [-1,1].forEach(k=>{const c=A(A(STC,K(n,-0.027)),K(up,k*0.012));cyl(v(c,-0.015),v(c,0.015),0.0045,sm,16);bolt(v(c,0.015),new V3(0,0,1),0.0032,M.bolts);hexnut(v(c,-0.015),new V3(0,0,-1),0.0036,0.003,M.bolts)})}
    else aheadStem(STC,E,dir,sm);
  }
  FOCUS.cockpit=v(E);
  const e=v(E),BR=BARS[st.barType],br=0.0111;
  if(BR.drop){dropBar(e,BR.drop);return}
  const mk=a=>new V3(e.x+a[0],e.y+a[1],a[2]);
  const half=BR.p.map(mk);
  const pts=[...half.slice().reverse().map(p=>new V3(p.x,p.y,-p.z)),new V3(e.x,e.y,0),...half];
  const cv=tube(pts,br,M.bar,180,false,null,20);
  cyl(e.clone().setZ(-0.035),e.clone().setZ(0.035),(BR.clamp||0.0318)/2,M.bar,32);
  if(BR.cross){cyl(cv.getPointAt(0.33),cv.getPointAt(0.67),0.008,M.bar,16)}
  // sløyfe foran (Jones): én sammenhengende sløyfe fra hjørne til hjørne foran stemmen
  if(BR.loop){const lp=BR.loop.map(mk);tube([...lp.slice().reverse().map(p=>new V3(p.x,p.y,-p.z)),...lp.slice(1)],0.0111,M.bar,120,false,null,18)}
  // sløyfe på hver side (Moloko): åttetall med stemklemmen i midten
  if(BR.sideLoop){[-1,1].forEach(s=>tube(BR.sideLoop.map(a=>new V3(e.x+a[0],e.y+a[1],s*a[2])),0.0111,M.bar,90,false,null,18))}
  // horn fremover fra knutepunktet (Crazy Bar), litt tykkere grep, med endeplugg
  if(BR.horn){[-1,1].forEach(s=>{const hp=BR.horn.map(a=>new V3(e.x+a[0],e.y+a[1],s*a[2]));tube(hp,0.0119,M.bar,40,false,null,18);const he=hp[hp.length-1],hd=he.clone().sub(hp[hp.length-2]).normalize();cyl(he,he.clone().addScaledVector(hd,0.004),0.0118,M.black,20)})}
  stemFace(e);
  // håndtak, bremsehendler og girhendler. Høyre side (s<0): bakbrems og bakgir. Venstre: forbrems og forgir.
  const Lc=cv.getLength(),D=DRIVES[st.drive],twistS=['nexus3','nexus3c','rohloff'].includes(st.drive),multiF=D.t==='der'&&D.ring.length>1;
  [[-1,0],[1,1]].forEach(([s,end])=>{
    const shiftR=s<0&&(D.t==='der'||D.t==='hub'||D.shift),tw=shiftR&&twistS,shiftF=s>0&&multiF;
    const gL=(tw?0.095:0.13)/Lc,t0=end?1-gL:0,t1=end?1:gL;
    const gp=[];for(let k=0;k<=10;k++)gp.push(cv.getPointAt(t0+(t1-t0)*k/10));tube(gp,0.0165,M.grips,30,false,null,24);
    sph(cv.getPointAt(end),0.0165,M.grips);
    const gi=end?t0:t1,off=(tw?0.036:0)+0.024,tin=end?gi-off/Lc:gi+off/Lc;
    const lp=cv.getPointAt(tin),tan=cv.getTangentAt(tin).multiplyScalar(end?1:-1);
    const g=ctrlGroup(lp,tan,tw?0:-0.5),which=s>0?'F':'R',has=(s>0?st.brakeF:st.brakeR)!=='none';
    if(s>0)ANCH.bell=cv.getPointAt(Math.max(0.05,tin-0.075/Lc));
    if(has)ANCH['lever'+which]=st.lever==='hyd'?hydLever(g):cableLever(g,st.lever);
    if(tw)ANCH.shift=twist(g,0.012,0.046);else if(shiftR)ANCH.shift=trigger(g,-0.03);
    if(shiftF)ANCH.shiftF=trigger(g,-0.03);
    if(s<0)FOCUS.lever=lp.clone();
  });
}
// ahead-stem: delt styrerørsklemme med to bolter bak, formet kropp og frontplate med fire bolter rundt styret
function aheadStem(STC,E,dir,sm){const up=GM.up,H=0.04,rS=0.0186,pr=Rot(dir,Math.PI/2),ang=Math.atan2(dir.y,dir.x),e=v(E);
  cyl(v(A(STC,K(up,-H/2))),v(A(STC,K(up,H/2))),rS,sm,48);
  cyl(v(A(STC,K(up,H/2))),v(A(STC,K(up,H/2+0.0045))),0.0172,M.headset,40,0.0165);bolt(v(A(STC,K(up,H/2+0.0045))),v(up),0.0038,M.bolts);
  const nb=GM.n,bk=A(STC,K(nb,-rS));box(v(A(bk,K(up,-H/2+0.0008))),v(A(bk,K(up,H/2-0.0008))),0.0018,0.0018,M.socket);
  [-0.0095,0.0095].forEach(h=>{const c=A(A(STC,K(nb,-rS+0.001)),K(up,h));cyl(v(c,-0.0125),v(c,0.0125),0.0056,sm,20,0.0056);bolt(v(c,0.0125),new V3(0,0,1),0.0033,M.bolts)});
  const S0=A(STC,K(dir,0.008)),S1=A(E,K(dir,-0.014)),Ls=L2(Sb(S1,S0));
  if(Ls>0.004)sweep([v(S0),v(M2(S0,S1,.5)),v(S1)],u=>{const k=Math.sin(Math.PI*u);return{w:0.0175-0.004*k,h:0.0158-0.003*k,n:2.5}},sm,null,{up:new V3(0,0,1),n:20,r:28});
  const shell=(a0,a1,r0,r1,dz,m)=>{const sh=new THREE.Shape();sh.absarc(0,0,r1,a0,a1,false);sh.absarc(0,0,r0,a1,a0,true);sh.closePath();
    const g=new THREE.ExtrudeGeometry(sh,{depth:dz,bevelEnabled:true,bevelThickness:0.0009,bevelSize:0.0009,bevelSegments:2,curveSegments:24});g.translate(0,0,-dz/2);const me=put(new THREE.Mesh(g,m));me.position.copy(e);return me};
  const back=ang+Math.PI;shell(back-1.3,back+1.3,0.0159,0.0202,0.037,sm);   // bakre halvdel av styreklemmen, del av stemmen
  // frontplate: rund som styret, med vindu i midten og bolter i båndene over og under
  const fp=(a0,a1,dz,zc)=>{const me=shell(a0,a1,0.0161,0.0207,dz,sm);me.position.z=zc};
  fp(ang+0.55,ang+1.5,0.04,0);fp(ang-1.5,ang-0.55,0.04,0);[-1,1].forEach(k=>fp(ang-0.6,ang+0.6,0.0075,k*0.01625));
  [-1,1].forEach(k=>{const a=ang+k*1.05,rd=new V3(Math.cos(a),Math.sin(a),0);[-0.0125,0.0125].forEach(z=>{const c=e.clone().addScaledVector(rd,0.0198).setZ(z);
    cyl(c,c.clone().addScaledVector(rd,0.0026),0.0044,sm,20,0.0042);bolt(c.clone().addScaledVector(rd,0.0026),rd,0.0027,M.bolts)})})}
function stemFace(e){const sm=M.stem;
  // ahead og integrert (med flatt styre brukes ahead-stemmen) har frontplaten sin i aheadStem
  if(st.stemType==='ahead'||st.stemType==='integrated')return;
  const ang=st.stemAng*D2R;
  if(st.stemType==='bmx'){
    // toploader: styret ligger i en vugge på toppen, lokket over har fire loddrette bolter
    const dir=U2(A(K(GM.n,Math.cos(ang)),K(GM.up,Math.sin(ang)))),nd=v(dir),uv=new V3(-nd.y,nd.x,0);
    const cap=rbox(0.034,0.012,0.05,0.004,sm);orient(cap,e.clone().addScaledVector(uv,0.0146),Math.atan2(nd.y,nd.x));
    [-1,1].forEach(a=>[-1,1].forEach(k=>{const c=e.clone().addScaledVector(nd,a*0.0115).addScaledVector(uv,0.0205).setZ(k*0.019);bolt(c,uv,0.003,M.bolts)}));
    return}
  // quill: klemmering rundt styret med en lukket øre under og en bolt på tvers gjennom øret
  const dir=new V3(Math.cos(ang),Math.sin(ang),0),dn=new V3(Math.sin(ang),-Math.cos(ang),0);
  cyl(e.clone().setZ(-0.02),e.clone().setZ(0.02),0.019,sm,32);
  const lug=rbox(0.016,0.016,0.018,0.004,sm);orient(lug,e.clone().addScaledVector(dn,0.022),Math.atan2(dir.y,dir.x));
  const bc=e.clone().addScaledVector(dn,0.024);cyl(bc.clone().addScaledVector(dir,-0.009),bc.clone().addScaledVector(dir,0.009),0.0026,M.bolts,12);
  bolt(bc.clone().addScaledVector(dir,0.009),dir,0.0034,M.bolts);hexnut(bc.clone().addScaledVector(dir,-0.009),dir.clone().negate(),0.0036,0.003,M.bolts)}
// dropstyre: w = bredde c-c ved hoodsene, r = reach, d = drop, fl = flare i dropsene
function dropBarCurve(e,D){const hw=D.w/2,r=D.r,d=D.d,fo=Math.tan(D.fl*D2R)*d*0.62,rd=D.round?1.12:1;
  const P=(x,y,z)=>new V3(e.x+x,e.y+y,z);
  return[P(0,0,0.03),P(0.001,0.0005,0.09),P(0.004,0.0015,hw-0.075),P(r*0.45,0.003,hw-0.03),P(r*0.85,-0.003,hw-0.008),P(r+0.012*rd,-0.018,hw),
    P(r+0.022*rd,-d*0.32,hw+fo*0.25),P(r+0.012*rd,-d*0.62,hw+fo*0.55),P(r-0.022,-d*0.9,hw+fo*0.85),P(r-0.065,-d,hw+fo),P(-0.02,-d+0.006,hw+fo*1.2),P(-0.06,-d+0.012,hw+fo*1.32)]}
function dropBar(e,D){
  const half=dropBarCurve(e,D),pts=[...half.slice().reverse().map(p=>new V3(p.x,p.y,-p.z)),...half],integ=st.stemType==='integrated',hw=D.w/2;
  let cv;
  if(integ){cv=new THREE.CatmullRomCurve3(pts,false,'centripetal');const cvA=cv;
    sweep(pts,u=>{const az=Math.abs(cvA.getPointAt(u).z),a=Math.max(0,Math.min(1,(hw-0.05-az)/0.03));return{w:0.0111+a*0.0062,h:0.0111-a*0.0042,n:2+a*0.6}},M.bar,null,{n:260,r:24,caps:true})}
  else{cv=tube(pts,0.0111,M.bar,260,false,null,20);cyl(e.clone().setZ(-0.035),e.clone().setZ(0.035),0.0159,M.bar,32);stemFace(e)}
  // finn parameter t for et punkt på kurven
  const N=600,samp=[];for(let i=0;i<=N;i++)samp.push(cv.getPointAt(i/N));
  const tAt=f=>{let bi=0,bv=1e9;samp.forEach((p,i)=>{const v_=f(p);if(v_<bv){bv=v_;bi=i}});return bi/N};
  const hood=[1,-1].map(s=>tAt(p=>Math.hypot(p.x-(e.x+D.r+0.004),p.y-(e.y-0.004),p.z-s*D.w/2)+(Math.sign(p.z)===s?0:9)));
  // styrebånd fra 6 cm ut fra stemmen og helt ut i enden
  const tape=mat(st.p.grips,{bumpMap:tapeTex,bumpScale:2.2});
  const tz=integ?hw-0.045:0.065;[[0,tAt(p=>Math.abs(p.z+tz)+(p.z<0?0:9))],[tAt(p=>Math.abs(p.z-tz)+(p.z>0?0:9)),1]].forEach(([t0,t1])=>{const gp=[];for(let k=0;k<=80;k++)gp.push(cv.getPointAt(t0+(t1-t0)*k/80));
    const me=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gp),160,0.0136,20,false),tape);put(me)});
  [0,1].forEach(t=>{const p=cv.getPointAt(t);const d=cv.getTangentAt(t).multiplyScalar(t?1:-1);cyl(p,p.clone().addScaledVector(d,0.004),0.0128,M.black,20)});
  // hendler
  hood.forEach((t,i)=>{const s=i?-1:1,which=s>0?'F':'R',p=cv.getPointAt(t);stiLever(p,s,which,D)});
  FOCUS.hood=cv.getPointAt(hood[1]).clone().add(new V3(0.02,-0.03,0));
  // kabler kommer ut av styrebåndet ved stemmen
  ANCH.leverF=new V3(e.x+0.004,e.y-0.012,0.07);ANCH.leverR=new V3(e.x+0.004,e.y-0.012,-0.07);
  const D2=DRIVES[st.drive];if(D2.t==='der'||D2.t==='hub'||D2.shift)ANCH.shift=new V3(e.x+0.0,e.y-0.013,-0.055);if(D2.t==='der'&&D2.ring.length>1)ANCH.shiftF=new V3(e.x,e.y-0.013,0.055);
  ANCH.bell=cv.getPointAt(tAt(p=>Math.abs(p.z-0.1)+(p.z>0?0:9)));
}
// sweep: profil langs en bane. sec(u) gir {w,h,n,oy}: halv bredde langs binormal, halv høyde langs normal (up), superellipse-eksponent og forskyvning langs normal
function sweep(path,sec,m,p,o={}){
  const cv=new THREE.CatmullRomCurve3(path,false,'centripetal'),N=o.n||40,R=o.r||20,up=o.up||new V3(0,1,0),pos=[],idx=[];
  for(let i=0;i<=N;i++){const u=i/N,P=cv.getPointAt(u),T=cv.getTangentAt(u).normalize();
    let Nn=up.clone().addScaledVector(T,-up.dot(T));if(Nn.lengthSq()<1e-8)Nn=new V3(1,0,0);Nn.normalize();const Bn=new V3().crossVectors(T,Nn);
    const s=sec(u),ex=2/(s.n||2),oy=s.oy||0;
    for(let j=0;j<R;j++){const a=j/R*Math.PI*2,c=Math.cos(a),si=Math.sin(a);
      const x=s.w*Math.sign(c)*Math.pow(Math.abs(c),ex),y=(si>=0?(s.ht??s.h):(s.hb??s.h))*Math.sign(si)*Math.pow(Math.abs(si),ex)+oy;
      pos.push(P.x+Bn.x*x+Nn.x*y,P.y+Bn.y*x+Nn.y*y,P.z+Bn.z*x+Nn.z*y)}}
  for(let i=0;i<N;i++)for(let j=0;j<R;j++){const a=i*R+j,b=i*R+(j+1)%R,c=(i+1)*R+j,d=(i+1)*R+(j+1)%R;idx.push(a,c,b,b,c,d)}
  if(o.caps!==false){const cap=(i,flip)=>{let cx=0,cy=0,cz=0;for(let j=0;j<R;j++){cx+=pos[(i*R+j)*3];cy+=pos[(i*R+j)*3+1];cz+=pos[(i*R+j)*3+2]}
      const ci=pos.length/3;pos.push(cx/R,cy/R,cz/R);for(let j=0;j<R;j++){const a=i*R+j,b=i*R+(j+1)%R;flip?idx.push(ci,b,a):idx.push(ci,a,b)}};cap(0,false);cap(N,true)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();
  return put(new THREE.Mesh(g,m),p)}
// avrundet ende: faktor som går mot 0 de siste (eller første) e av banen
const endR=(u,e0,e1)=>{let f=1;if(e1&&u>1-e1){const k=(u-(1-e1))/e1;f=Math.sqrt(Math.max(0.04,1-k*k))}if(e0&&u<e0){const k=(e0-u)/e0;f=Math.min(f,Math.sqrt(Math.max(0.04,1-k*k)))}return f};
// lokal ramme for betjening på flatt styre: x frem, y opp, z utover langs styret (speiles på venstre side)
function ctrlGroup(lp,tan,rot=0){const g=new THREE.Group(),out=tan.clone().normalize(),mir=out.z<0;
  const Z=mir?out.clone().negate():out.clone(),Y=new V3(0,1,0).addScaledVector(Z,-Z.y).normalize(),X=new V3().crossVectors(Y,Z);
  g.matrix.makeBasis(X,Y,Z).setPosition(lp);if(mir)g.matrix.multiply(new THREE.Matrix4().makeScale(1,1,-1));if(rot)g.matrix.multiply(new THREE.Matrix4().makeRotationZ(rot));g.matrixAutoUpdate=false;B.add(g);
  g.toB=p=>p.clone().applyMatrix4(g.matrix);return g}
const ringC=(g,z0,z1,r,m)=>lathe([[0.0111,z0],[r-0.0006,z0],[r,z0+0.0008],[r,z1-0.0008],[r-0.0006,z1],[0.0111,z1]],m,40,g);
// hydraulisk MTB-hendel: klemme, horisontal hovedsylinder med reservoar og lokk, svingtapp og formet blad
function hydLever(g){const lm=M.blevers,P=(x,y,z)=>new V3(x,y,z);
  ringC(g,-0.007,0.007,0.0152,lm);
  const sb=rbox(0.011,0.009,0.012,0.003,lm,g);sb.position.set(-0.002,-0.0165,0);bolt(P(-0.002,-0.021,0),new V3(0,-1,0),0.0026,M.bolts,g);
  const arm=rbox(0.022,0.013,0.013,0.004,lm,g);arm.position.set(0.013,0.006,-0.004);
  cyl(P(0.025,0.008,-0.031),P(0.025,0.008,0.01),0.0082,lm,32,0.0082,g);
  const ec=sph(P(0.025,0.008,-0.031),0.0082,lm,g);ec.scale.set(1,1,0.45);
  const rv=rbox(0.025,0.012,0.036,0.0045,lm,g);rv.position.set(0.023,0.0168,-0.011);
  const lid=rbox(0.021,0.0022,0.031,0.001,M.dark,g);lid.position.set(0.023,0.0236,-0.011);
  [-0.022,0.0].forEach(z=>cyl(P(0.023,0.024,z),P(0.023,0.0254,z),0.0019,M.bolts,12,0.0019,g));
  cyl(P(0.031,-0.007,0.012),P(0.031,0.016,0.012),0.0066,lm,24,0.0066,g);
  [-0.0075,0.0165].forEach(y=>cyl(P(0.031,y,0.012),P(0.031,y+(y<0?-0.0015:0.0015),0.012),0.003,M.bolts,12,0.003,g));
  cyl(P(0.02,0.012,0.009),P(0.02,0.012,0.02),0.0028,M.dark,12,0.0028,g);sph(P(0.02,0.012,0.02),0.0028,M.dark,g);
  const path=[P(0.031,0.003,0.013),P(0.043,0.002,0.028),P(0.057,0.001,0.048),P(0.064,0,0.072),P(0.066,0,0.093),P(0.07,0,0.104)];
  sweep(path,u=>({w:0.0037*(1-u*0.15),h:(0.0092-u*0.003)*endR(u,0,0.06),n:3.2}),lm,g,{n:44,r:18});
  cyl(P(0.025,0.006,-0.031),P(0.025,0.006,-0.038),0.0048,lm,16,0.0048,g);bolt(P(0.025,0.006,-0.038),new V3(0,0,-1),0.0028,M.bolts,g);
  return g.toB(P(0.023,-0.001,-0.039))}
// wirehendel (V-brems, cantilever, cruiser, BMX): perch med justerskrue for wire
function cableLever(g,type){const lm=M.blevers,P=(x,y,z)=>new V3(x,y,z),vint=type==='vintage',bmxL=type==='bmx',long=type==='long';
  ringC(g,-0.006,0.006,0.0145,lm);
  const pb=rbox(0.03,0.016,0.022,0.005,lm,g);pb.position.set(0.016,0.004,-0.003);
  bolt(P(0.0,-0.016,0),new V3(0,-1,0),0.0025,M.bolts,g);
  cyl(P(0.025,0.006,-0.013),P(0.025,0.006,-0.026),0.0052,M.bolts,12,0.0052,g);cyl(P(0.025,0.006,-0.014),P(0.025,0.006,-0.016),0.0062,M.dark,24,0.0062,g);
  cyl(P(0.03,-0.005,0.007),P(0.03,0.013,0.007),0.0056,lm,20,0.0056,g);
  const Lb=long?0.118:bmxL?0.09:vint?0.1:0.097;
  const path=bmxL?[P(0.03,0.002,0.008),P(0.043,0,0.028),P(0.053,-0.002,0.058),P(0.056,-0.003,Lb)]
    :[P(0.03,0.002,0.008),P(0.043,0,0.026),P(0.057,-0.001,Lb*0.5),P(0.063,-0.002,Lb*0.84),P(0.067,-0.002,Lb)];
  if(vint)sweep(path,u=>({w:0.0042,h:0.0042*endR(u,0,0.05),n:2}),lm,g,{n:40,r:14});
  else sweep(path,u=>({w:long?0.0036:0.0032,h:(long?0.0088:0.0078)*(1-u*0.28)*endR(u,0,0.06),n:3}),lm,g,{n:40,r:16});
  if(bmxL)sph(path[3],0.0072,lm,g);if(vint)sph(path[path.length-1],0.0052,lm,g);
  return g.toB(P(0.025,0.006,-0.028))}
// tommelgirhendel (trigger) under styret, innenfor bremsehendelen
function trigger(g,z0){const sm=M.levers,P=(x,y,z)=>new V3(x,y,z);
  ringC(g,z0-0.005,z0+0.005,0.0142,M.dark);
  const br=rbox(0.012,0.016,0.01,0.003,M.dark,g);br.position.set(-0.002,-0.016,z0);
  sweep([P(-0.02,-0.027,z0-0.006),P(0.0,-0.028,z0-0.008),P(0.026,-0.025,z0-0.008)],u=>({w:0.0145*endR(u,0.12,0.14),h:0.011*endR(u,0.12,0.14),n:2.6}),M.dark,g,{n:24,r:20});
  const win=rbox(0.012,0.002,0.012,0.0008,new THREE.MeshPhysicalMaterial({color:0x9aa3aa,roughness:0.1,transmission:0,metalness:0.2,clearcoat:1}),g);win.position.set(-0.004,-0.0162,z0-0.011);
  sweep([P(0.006,-0.035,z0-0.004),P(0.011,-0.045,z0+0.002),P(0.013,-0.051,z0+0.007)],u=>({w:0.0021,h:(0.0068+u*0.0035)*endR(u,0,0.12),n:3}),sm,g,{up:new V3(0,0,1),n:16,r:14});
  sweep([P(0.024,-0.02,z0-0.012),P(0.04,-0.021,z0-0.009),P(0.05,-0.025,z0-0.004)],u=>({w:0.0018,h:0.0058*endR(u,0,0.15),n:3}),sm,g,{n:16,r:14});
  cyl(P(-0.006,-0.027,z0-0.02),P(-0.006,-0.027,z0-0.03),0.0042,M.bolts,12,0.0042,g);
  return g.toB(P(-0.006,-0.027,z0-0.032))}
// vrigirhendel (navgir): ring med tall-vindu, ligger inntil håndtaket
function twist(g,z0,z1){const P=(x,y,z)=>new V3(x,y,z);
  lathe([[0.0111,z0],[0.0158,z0],[0.0168,z0+0.003],[0.0168,z1-0.006],[0.0185,z1-0.004],[0.0185,z1],[0.0111,z1]],M.dark,40,g);
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const r=rbox(0.003,0.002,(z1-z0)-0.012,0.0008,M.grips,g);r.position.set(Math.cos(a)*0.0168,Math.sin(a)*0.0168,(z0+z1)/2-0.003);r.rotation.z=a}
  const hs=rbox(0.022,0.014,0.016,0.004,M.dark,g);hs.position.set(0.004,-0.017,z1+0.006);
  const w=rbox(0.008,0.002,0.008,0.0006,M.steel,g);w.position.set(0.004,-0.0095,z1+0.006);
  cyl(P(0.004,-0.022,z1+0.014),P(0.004,-0.022,z1+0.024),0.0038,M.bolts,12,0.0038,g);
  return g.toB(P(0.004,-0.022,z1+0.026))}
// landeveishendel (STI): hood med topp foran, formet bremseblad og girhendel bak bladet (Shimano) eller kort padle (SRAM)
function stiLever(p,s,which,D){
  const type=s>0?st.brakeF:st.brakeR,has=type!=='none',hyd=type==='hyd',g=new THREE.Group(),DR=DRIVES[st.drive];
  const sram=st.drive==='apex',di2=st.drive==='grxdi2';
  g.position.copy(p);const fo=Math.tan(D.fl*D2R)*D.d*0.62*0.55;g.rotation.set(-s*Math.atan2(fo,0.12),0,-0.1);B.add(g);
  const P=(x,y,z=0)=>new V3(x,y,z),L=hyd?0.1:0.088,pk=hyd?(sram?0.033:0.036):0.027;
  const tp=[[0,.013],[.25,.0145],[.5,.0158],[.68,.019],[.8,pk*0.82],[.89,pk],[.95,pk*0.9],[1,.016]],bt=[[0,-.012],[.4,-.0135],[.72,-.019],[.9,-.022],[1,-.015]],wd=[[0,.0138],[.3,.0136],[.55,.0118],[.78,.0126],[.9,.0119],[1,.0085]];
  const xs=[],path=[];for(let i=0;i<=12;i++){const u=i/12;path.push(P(-0.008+u*L,(ip(tp,u)+ip(bt,u))/2))}
  sweep(path,u=>{const t=ip(tp,u),b=ip(bt,u),f=endR(u,0.03,0.05);return{w:ip(wd,u)*f,h:(t-b)/2*f,n:2.5}},M.hoods,g,{up:new V3(0,1,0),n:48,r:28});
  // riller på hooden der hånden ligger
  for(let i=0;i<5;i++){const x=0.012+i*0.008;[-1,1].forEach(k=>{const r=rbox(0.0026,0.0012,0.0018,0.0005,M.hoods,g);r.position.set(x,ip(tp,(x+0.008)/L)*0.55,k*(ip(wd,(x+0.008)/L)-0.0004))})}
  // hendelhus foran under hooden
  const hb=rbox(0.022,0.018,0.016,0.005,M.dark,g);hb.position.set(L-0.024,-0.014,0);
  if(has){const bl=[P(L-0.017,-0.006),P(L-0.009,-0.034),P(L-0.009,-0.068),P(L-0.02,-0.103),P(L-0.036,-0.126),P(L-0.046,-0.132)];
    sweep(bl,u=>({w:0.0036-u*0.001,h:(0.0104-u*0.0038)*endR(u,0,0.05),n:3.4}),M.blevers,g,{up:new V3(0,0,1),n:40,r:18});
    if(DR.t==='der'&&!sram&&!di2){const sp=[P(L-0.026,-0.016,-0.003),P(L-0.02,-0.05,-0.004),P(L-0.026,-0.085,-0.004),P(L-0.034,-0.098,-0.004)];
      sweep(sp,u=>({w:0.0022,h:0.0058*endR(u,0,0.08),n:3}),M.levers,g,{up:new V3(0,0,1),n:28,r:14})}
    if(sram&&DR.t==='der'){const sp=[P(L-0.025,-0.014,-0.002),P(L-0.021,-0.04,-0.003),P(L-0.025,-0.062,-0.003)];
      sweep(sp,u=>({w:0.0024,h:0.0066*endR(u,0,0.1),n:3}),M.levers,g,{up:new V3(0,0,1),n:24,r:14})}
    if(di2){[[-0.026,-0.036],[-0.04,-0.05]].forEach(([a,b])=>sweep([P(L-0.0175,a,-0.001),P(L-0.0165,b,-0.001)],u=>({w:0.0016,h:0.0042*endR(u,0.2,0.2),n:3}),M.dark,g,{up:new V3(0,0,1),n:10,r:12}))}}
  // klemmebånd under hooden og bolten man når fra toppen
  cyl(P(0.004,0,-0.012),P(0.004,0,0.012),0.0128,M.dark,24,0.0128,g);
  bolt(P(0.02,0.0185,0),new V3(0,1,0),0.0022,M.bolts,g);
}

/* ---------- bremser ---------- */
function brakes(){unit(true,st.brakeF);unit(false,st.brakeR)}
function unit(front,type){
  if(type==='none')return;
  const C=front?GM.FA:GM.RA,cm=M.calipers,wd=wheelDims();
  const leg=front?frontLeg():U2(Sb(GM.SST,GM.RA));
  const key=front?'brakeF':'brakeR';
  if(type==='hyd'||type==='mech'){
    const rr=st.rotor/2000,z=front?(st.geo.axle==='ta'&&mtbAxle()?0.04:0.036):0.053,g=new THREE.Group();g.position.copy(v(C));B.add(g);
    const s=new THREE.Shape();s.absarc(0,0,rr,0,Math.PI*2,false);const h=new THREE.Path();h.absarc(0,0,rr-0.02,0,Math.PI*2,true);s.holes.push(h);
    for(let i=0;i<18;i++){const a=i/18*Math.PI*2,hh=new THREE.Path();hh.absarc(Math.cos(a)*(rr-0.011),Math.sin(a)*(rr-0.011),0.0032,0,Math.PI*2,true);s.holes.push(hh)}
    const rg=new THREE.ExtrudeGeometry(s,{depth:0.0018,bevelEnabled:false,curveSegments:40});rg.translate(0,0,z-0.0009);put(new THREE.Mesh(rg,M.rotors),g);
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.3;
      box(new V3(Math.cos(a)*0.02,Math.sin(a)*0.02,z),new V3(Math.cos(a+0.32)*(rr-0.018),Math.sin(a+0.32)*(rr-0.018),z),0.009,0.0024,M.rotors,g);
      bolt(new V3(Math.cos(a)*0.0215,Math.sin(a)*0.0215,z+0.0012),new V3(0,0,1),0.0034,M.bolts,g)}
    cyl(new V3(0,0,z-0.004),new V3(0,0,z+0.001),0.022,M.rotors,40,0.022,g);
    // kaliper
    // kaliperen sitter tett inntil rammedelen den er festet til: bak gaffelbeinet foran, på setestaget (post mount) eller kjedestaget (flat mount) bak
    const flat=st.geo.bmount==='flat',csd=U2(Sb(GM.BB,GM.RA)),mem=front?leg:flat?csd:leg;
    const cdir=front?U2(Rot(leg,flat?0.6:0.72)):flat?U2(Rot(csd,0.34)):U2(Rot(leg,-0.62));
    const cp=A(C,K(cdir,rr-0.006)),ang=Math.atan2(cdir.y,cdir.x)-Math.PI/2;
    {const ear=A(C,K(cdir,rr+0.008)),dd=(ear.x-C.x)*mem.x+(ear.y-C.y)*mem.y,foot=A(C,K(mem,dd)),dv=Sb(foot,ear),dl=L2(dv);
      if(dl>0.004){const pl=rbox(dl+0.022,flat?0.03:0.026,0.008,0.005,flat?M.frame:front?M.fork:M.frame);orient(pl,v(M2(ear,foot,0.5),z+(flat?0.012:0.016)),Math.atan2(dv.y,dv.x))}}
    const body=rbox(0.058,0.03,0.022,0.009,cm);orient(body,v(cp,z+0.011),ang);
    const inner=rbox(0.05,0.026,0.01,0.006,cm);orient(inner,v(cp,z-0.008),ang);
    const tang=p2(Math.cos(ang),Math.sin(ang));
    // ører med festebolter som går radielt ned i festet, og klosser på hver side av skiven
    [-1,1].forEach(k=>{const ep=A(A(C,K(cdir,rr+0.008)),K(tang,k*0.024)),er=rbox(0.012,0.008,0.012,0.003,cm);orient(er,v(ep,z+0.014),ang);
      bolt(v(A(ep,K(cdir,0.004)),z+0.014),v(cdir),0.0032,M.bolts);
      const pd=rbox(0.034,0.012,0.003,0.002,M.pad);orient(pd,v(cp,z+k*0.0028),ang)});
    if(type==='hyd'){const bj=v(A(cp,K(tang,0.026)),z+0.011);cyl(bj.clone().add(new V3(0,0,-0.006)),bj.clone().add(new V3(0,0,0.006)),0.0055,cm,20);bolt(bj.clone().add(new V3(0,0,0.006)),new V3(0,0,1),0.004,M.bolts);
      const bn=v(A(cp,K(tang,-0.022)),z+0.02);cyl(bn,bn.clone().add(new V3(0,0,0.006)),0.002,M.steel,8);ANCH[key]=bj.clone().add(new V3(0,0,0.002));}
    else{const arm=v(A(A(cp,K(tang,0.02)),K(cdir,0.012)),z+0.026);box(v(cp,z+0.024),arm,0.01,0.004,cm);bolt(arm,new V3(0,0,1),0.0028,M.bolts);
      const bar=v(A(A(cp,K(tang,0.04)),K(cdir,0.004)),z+0.02);cyl(bar,bar.clone().add(v(K(tang,0.012))),0.004,M.steel,12);ANCH[key]=bar.clone().add(v(K(tang,0.012)));}
    FOCUS[key]=v(cp,z);
  }else if(type==='vbrake'||type==='canti'){
    // soklene sitter på utsiden av gaffelbeina / setestagene under felgen, klossene treffer bremsebanen på felgen
    // standard soklesenter er ca. 80 mm (±40 mm). På dempegafler sitter soklene bak på de nedre beina, ellers på utsiden av gaffelbladene og setestagene.
    // bremsen sitter foran gaffelen og bak setestagene: klossene treffer felgen litt foran gaffelbeinet (bak setestaget),
    // soklene står på en kort brakett fra beinet/staget
    const wideFork=front&&['susp','susp90','dual','springer'].includes(st.forkType),legR=front?(wideFork?(st.forkType==='susp90'?0.016:0.0175):0.012):0.008;
    const perp=front?GM.n:Rot(leg,Math.PI/2),o=legR+0.016,Rb=wd.bead-0.03,Rp=wd.bead-0.0062;
    const onRim=(R)=>{const sn=Math.min(0.9,o/R),cs=Math.sqrt(1-sn*sn);return A(C,K(U2(A(K(leg,cs),K(perp,sn))),R))};
    const piv=onRim(Rb),padP=onRim(Rp),rw=rimHW(),bm=front?M.fork:M.frame;
    const zs=front?(wideFork?0.05:0.043):Math.max(0.04,ssZ(Rb)-0.002);
    // brakett fra beinet/staget ut til sokkelen
    [-1,1].forEach(s=>{const lz=front?(wideFork?(FORK_ZS[st.forkType]?suspZS(st.forkType):0.062):0.046):ssZ(Rb);const a0=v(A(C,K(leg,Rb)),s*lz);box(a0,v(piv,s*(zs-0.004)),0.014,0.01,bm)});
    const pang=Math.atan2(padP.y-C.y,padP.x-C.x)+Math.PI/2,tg=v(Rot(leg,Math.PI/2)),L3=v(leg);
    const pivS=[];
    [-1,1].forEach(s=>{
      // sokkel, fjærhus og bolt
      cyl(v(piv,s*(zs-0.01)),v(piv,s*(zs+0.004)),0.0062,bm,16);
      cyl(v(piv,s*(zs+0.004)),v(piv,s*(zs+0.011)),0.0085,M.dark,20);
      const z0=s*(zs+0.014);pivS.push(z0);
      if(type==='vbrake'){
        // V-arm: flat og litt bøyd utover, ca. 110 mm lang
        const top=A(piv,K(leg,0.112)),P0=v(piv,z0),P1=v(A(piv,K(leg,0.056)),z0+s*0.006),P2=v(top,z0+s*0.002);
        sweep([P0,P1,P2],u=>({w:(0.0068-u*0.0012)*endR(u,0.04,0.05),h:0.0032,n:2.6}),cm,null,{up:new V3(0,0,1),n:24,r:16});
        // klosspost med skiver mot armen
        cyl(v(padP,s*(zs+0.012)),v(padP,s*(rw+0.009)),0.003,M.steel,12);
        [zs+0.012,rw+0.012].forEach(zz=>cyl(v(padP,s*(zz-0.002)),v(padP,s*(zz+0.002)),0.0062,M.dark,16));
        hexnut(v(padP,s*(zs+0.019)),new V3(0,0,1),0.0042,0.004,M.bolts);
        if(s<0){// wireklemme på høyre arm
          bolt(v(A(top,K(leg,-0.006)),-(zs+0.018)),new V3(0,0,-1),0.0034,M.bolts)}
        else{// nudel på venstre arm: wiren kommer ned, bøyer 90° og går tvers over dekket
          const h0=v(A(top,K(leg,-0.004)),zs+0.012),n1=h0.clone().addScaledVector(L3,0.05).add(new V3(0,0,0.004)),n2=h0.clone().addScaledVector(L3,0.018).add(new V3(0,0,0.002)),n3=h0.clone().add(new V3(0,0,-0.012)),n4=h0.clone().add(new V3(0,0,-0.02));
          tube([n1,n2,h0.clone().addScaledVector(L3,0.004).add(new V3(0,0,-0.004)),n3,n4],0.0034,M.steel,30,false,null,12);
          box(v(A(top,K(leg,-0.004)),zs+0.016),v(A(top,K(leg,-0.004)),zs+0.004),0.012,0.008,cm);
          const bt=n4.clone().add(new V3(0,0,-0.024));cyl(n4,bt,0.0042,M.boot,14,0.0036);
          cyl(bt,v(A(top,K(leg,-0.006)),-(zs+0.014)),0.0008,M.inner,6);
          ANCH[key]=n1.clone();ANCH[key+'In']=n1.clone().addScaledVector(L3,0.045)}   // wirestrømpa går rett inn i nudelen
      }else{
        // cantilever: kort arm som stikker ut, straddle-wire til åket over dekket
        const tip=v(A(piv,K(leg,0.034)),s*(zs+0.058));
        sweep([v(piv,z0),v(A(piv,K(leg,0.02)),s*(zs+0.036)),tip],u=>({w:0.0065*endR(u,0.05,0.08),h:0.004,n:2.6}),cm,null,{up:new V3(0,0,1),n:20,r:16});
        cyl(v(padP,s*(zs+0.012)),v(padP,s*(rw+0.009)),0.003,M.steel,12);
        hexnut(v(padP,s*(zs+0.016)),new V3(0,0,1),0.0045,0.004,M.bolts);
        const yoke=v(A(C,K(leg,wd.out+0.045)),0);cyl(tip,yoke,0.0008,M.inner,6);
        if(s>0){const yk=rbox(0.016,0.014,0.01,0.004,cm);orient(yk,yoke,pang);
          // wireheng: foran på gaffelkronen, bak på en bro mellom setestagene. Strømpa stopper i hylsa, ren wire går ned til åket
          let hp;
          if(front){const dc=Math.max(GM.a2c-0.008,wd.out+0.085);hp=A(A(C,K(leg,dc)),K(GM.n,0.03));const cb=A(A(C,K(leg,Math.min(dc,GM.a2c-0.008))),K(GM.n,0.012));box(v(cb,0),v(hp,0),0.012,0.003,M.steel)}
          else{const dh=wd.out+0.088;hp=A(C,K(leg,dh));const zz=ssZ(dh);cyl(v(hp,-zz),v(hp,zz),0.0048,M.frame,14)}
          const fe=v(hp,0);cyl(fe.clone().addScaledVector(L3,-0.004),fe.clone().addScaledVector(L3,0.01),0.0034,M.steel,12);
          cyl(yoke,fe,0.0008,M.inner,6);ANCH[key]=fe.clone().addScaledVector(L3,0.01);ANCH[key+'In']=fe.clone().addScaledVector(L3,0.05)}
      }
      // bremsekloss vinklet langs felgen
      const pd=rbox(0.034,0.0095,0.009,0.003,M.pad,null);orient(pd,v(padP,s*(rw+0.0048)),pang);
      const ph=rbox(0.036,0.012,0.004,0.0015,M.dark,null);orient(ph,v(padP,s*(rw+0.011)),pang);
    });
    FOCUS[key]=v(padP);
  }else if(type==='caliper'){
    // dobbeltpivot kaliper: festes gjennom gaffelkronen / broen mellom setestagene, armene går rundt dekket ned til bremsebanen
    const perpC=front?GM.n:Rot(leg,Math.PI/2),oC=front?0.024:0.018,Rp=wd.bead-0.0062,snC=oC/Rp,dirP=U2(A(K(leg,Math.sqrt(1-snC*snC)),K(perpC,snC)));
    const out=wd.out,mount=A(C,K(leg,out+0.016)),pad=A(C,K(dirP,Rp)),rw=rimHW(),hwT=wd.w/2+0.006,pang=Math.atan2(dirP.y,dirP.x)+Math.PI/2,L3=v(leg);
    const fwd=front?v(GM.n):v(Rot(leg,Math.PI/2));const m3=v(mount).addScaledVector(fwd,0.012);
    if(front&&GM.a2c-(out+0.016)>0.004)cyl(v(mount),v(A(C,K(leg,GM.a2c-0.004))),0.004,M.steel,12);
    const body=rbox(0.024,0.03,0.022,0.006,cm);orient(body,m3,pang);
    cyl(v(mount),m3,0.004,M.steel,12);hexnut(m3.clone().addScaledVector(fwd,0.012),fwd,0.0045,0.006,M.bolts);
    [-1,1].forEach(s=>{
      const P0=m3.clone().setZ(s*0.008),P1=m3.clone().addScaledVector(L3,-0.006).setZ(s*(hwT+0.004)),P2=v(A(pad,K(leg,0.014)),s*(Math.max(hwT,rw+0.012))).addScaledVector(fwd,0.006),P3=v(pad,s*(rw+0.011)).addScaledVector(fwd,0.006);
      sweep([P0,P1,P2,P3],u=>({w:0.0055,h:0.0034,n:2.6}),cm,null,{up:new V3(0,0,1),n:30,r:16});
      const ph=rbox(0.032,0.011,0.004,0.0015,M.dark);orient(ph,v(pad,s*(rw+0.0105)).addScaledVector(fwd,0.004),pang);
      const pd=rbox(0.03,0.0085,0.008,0.003,M.pad);orient(pd,v(pad,s*(rw+0.0048)).addScaledVector(fwd,0.004),pang)});
    // justeringsskrue og hurtigutløser
    const ba=m3.clone().addScaledVector(L3,0.012).setZ(-0.012);cyl(ba,ba.clone().addScaledVector(L3,0.012),0.0042,M.steel,12);
    const ql=rbox(0.022,0.004,0.006,0.0015,cm);orient(ql,m3.clone().addScaledVector(L3,0.008).setZ(0.016),pang+0.4);
    ANCH[key]=ba.clone().addScaledVector(L3,0.012);ANCH[key+'In']=ba.clone().addScaledVector(L3,0.05);FOCUS[key]=v(pad);
  }else if(type==='drum'){
    const arm=front?A(C,K(leg,0.12)):A(C,K(U2(Sb(GM.BB,GM.RA)),0.13));box(v(C,0.05),v(arm,0.05),0.016,0.006,cm);
    // bremsearm på navet, wirestopp på en brakett foran gaffelbeinet / bak setestaget, ren wire ned til armen
    const pD=front?GM.n:Rot(leg,Math.PI/2),zl=0.052,lt=A(C,K(U2(A(leg,K(pD,0.3))),0.05));box(v(C,zl),v(lt,zl),0.01,0.004,cm);
    const dS=0.105,base=A(C,K(leg,dS)),sp=A(base,K(pD,0.0144+(front?0.006:0.004))),zS=front?zl:Math.max(zl,ssZ(dS)+0.004),L3=v(leg);
    box(v(base,front?0.05:ssZ(dS)),v(sp,zS),0.009,0.004,cm);
    const fe=v(sp,zS);cyl(fe.clone().addScaledVector(L3,-0.003),fe.clone().addScaledVector(L3,0.012),0.0034,M.steel,12);
    cyl(fe,v(lt,zl),0.0008,M.inner,6);
    ANCH[key]=fe.clone().addScaledVector(L3,0.012);ANCH[key+'In']=fe.clone().addScaledVector(L3,0.06);FOCUS[key]=v(C,0.05);
  }
}

/* ---------- drivverk ---------- */
function drivetrain(){
  const D=DRIVES[st.drive],zc=-0.05,cm=M.crank,bb=v(GM.BB),ra=v(GM.RA),rings=D.ring,ringR=pitchR(rings[0]);
  rings.forEach((n,i)=>{const gm=gear(n,pitchR(n)-0.016,0.0028,M.ring,null,rings.length>1?0:5);gm.position.copy(bb).setZ(rings.length>1?-0.059+i*0.0068:zc)});
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.4;bolt(bb.clone().add(new V3(Math.cos(a)*(ringR-0.013),Math.sin(a)*(ringR-0.013),0)).setZ(zc-0.004),new V3(0,0,-1),0.0035,M.bolts)}
  let cogR;
  if(D.t==='der'){const [mn,mx,cnt]=D.cs,spc=cnt>=11?0.0039:0.0044;
    for(let i=0;i<cnt;i++){const n=Math.round(mx*Math.pow(mn/mx,i/(cnt-1)));const gm=gear(n,0.012,0.0018,M.cassette,null,n>28?5:0);gm.position.copy(ra).setZ(-0.026-i*spc)}
    cyl(ra.clone().setZ(-0.026-cnt*spc),ra.clone().setZ(-0.024),0.016,M.dark,24);
    cogR=pitchR(Math.round(mx*Math.pow(mn/mx,rings.length>1?0.6:0.55)))}
  else{const gm=gear(D.cog,0.012,0.003,M.cassette);gm.position.copy(ra).setZ(zc);cogR=pitchR(D.cog)}
  FOCUS.cassette=ra.clone().setZ(-0.05);FOCUS.chainTop=ra.clone().add(new V3(0,cogR*0.95,-0.05));
  if(D.t==='coaster'){const e=v(A(GM.RA,K(U2(Sb(GM.BB,GM.RA)),0.12)),0.06);box(ra.clone().setZ(0.06),e,0.016,0.006,M.hubs);const cl=rbox(0.022,0.022,0.03,0.005,M.dark);cl.position.copy(e).setZ(0.045)}
  if(D.t==='hub'||D.shift)ANCH.hubShift=ra.clone().add(new V3(0.03,0,-0.065));
  // kjede
  const arc=(c,rad,a0,a1,n)=>{const out=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*D2R;out.push(p2(c.x+rad*Math.cos(a),c.y+rad*Math.sin(a)))}return out};
  // bakgir: styretrinse 12T rett under og litt bak kassetten (ca. 7 mm luft), strammetrinse 12T/14T nede og litt foran.
  // Kjedet går i S: bak rundt tannhjulet, foran på styretrinsen, bak og under strammetrinsen, og frem til klingen. Tangentene regnes ut eksakt.
  const nP2=rings.length>1?12:14,rP1=pitchR(12),rP2=pitchR(nP2);
  const cage=D.t==='der'?(rings.length>2?0.068:rings.length>1?(D.road?0.054:0.058):Math.min(0.08,0.058+(D.cs[1]-32)*0.0011)):0,ca=0.24;
  const G=A(GM.RA,p2(-0.3*cogR,-(cogR+rP1+0.007))),Tn=A(G,p2(Math.sin(ca)*cage,-Math.cos(ca)*cage));
  const loop=D.t==='der'?[[GM.RA,cogR],[G,-rP1],[Tn,rP2],[GM.BB,ringR]]:[[GM.RA,cogR],[GM.BB,ringR]];
  const tang=([c1,r1],[c2,r2])=>{const d=Sb(c2,c1),L=L2(d),phi=Math.atan2(d.y,d.x),ac=Math.acos(Math.max(-1,Math.min(1,(r1-r2)/L)));
    for(const sg of [1,-1]){const a=phi+sg*ac,nn=p2(Math.cos(a),Math.sin(a)),q1=A(c1,K(nn,r1)),q2=A(c2,K(nn,r2)),t=Sb(q2,q1);if(-t.x*nn.y+t.y*nn.x>0)return[q1,q2]}
    const nn=p2(Math.cos(phi+ac),Math.sin(phi+ac));return[A(c1,K(nn,r1)),A(c2,K(nn,r2))]};
  const segs=loop.map((c,i)=>tang(c,loop[(i+1)%loop.length]));let path=[];
  loop.forEach(([c,r],i)=>{const pin=segs[(i-1+loop.length)%loop.length][1],pout=segs[i][0];let a0=Math.atan2(pin.y-c.y,pin.x-c.x),a1=Math.atan2(pout.y-c.y,pout.x-c.x);
    if(r>0){while(a1<a0)a1+=Math.PI*2}else{while(a1>a0)a1-=Math.PI*2}
    const R=Math.abs(r),nA=Math.max(3,Math.ceil(Math.abs(a1-a0)/0.1));for(let k=0;k<=nA;k++){const a=a0+(a1-a0)*k/nA;path.push(p2(c.x+R*Math.cos(a),c.y+R*Math.sin(a)))}});
  path.push(path[0]);
  const zch=rings.length>1?-0.052:zc,P3=path.map(p=>v(p,zch));let total=0;const seg=[];for(let i=1;i<P3.length;i++){const l=P3[i].distanceTo(P3[i-1]);seg.push(l);total+=l}
  // et helt antall ledd (partall, innerledd og ytterledd annenhver gang) rundt hele kjedebanen, så kjedet er lukket uten hull
  const cnt=Math.max(2,2*Math.round(total/0.0127/2)),pitch=total/cnt,mi=[],mo=[],mr=[];
  for(let k=0;k<cnt;k++){let d=k*pitch+pitch/2,i=0;while(i<seg.length-1&&d>seg[i]){d-=seg[i];i++}
    const a=P3[i],b=P3[i+1],t=Math.min(1,d/seg[i]);const p=a.clone().lerp(b,t);const q=new THREE.Quaternion().setFromAxisAngle(new V3(0,0,1),Math.atan2(b.y-a.y,b.x-a.x));
    (k%2?mo:mi).push(mtx(p,q));const pr=p.clone().add(new V3((b.x-a.x),(b.y-a.y),0).normalize().multiplyScalar(pitch/2));mr.push(mtx(pr,new THREE.Quaternion().setFromAxisAngle(new V3(1,0,0),Math.PI/2)))}
  const plate=new THREE.ExtrudeGeometry(rrect(pitch*1.2,0.0072,0.0034),{depth:0.0011,bevelEnabled:false});
  const pl2=plate.clone();
  const zI=new THREE.Matrix4().makeTranslation(0,0,0.0028),zO=new THREE.Matrix4().makeTranslation(0,0,-0.0028-0.0011);
  const mk=(arr,off)=>arr.map(m=>m.clone().multiply(off));
  inst(plate,M.chain,mk(mi,zI).concat(mk(mi,zO)));inst(pl2,M.chain,mk(mo,new THREE.Matrix4().makeTranslation(0,0,0.0042)).concat(mk(mo,new THREE.Matrix4().makeTranslation(0,0,-0.0042-0.0011))));
  inst(new THREE.CylinderGeometry(0.0018,0.0018,0.0098,8),M.dark,mr);
  // girfører
  if(D.t==='der'){const dm=M.der,sram=/^SRAM/.test(D.n),E=D.e,udh=!!D.udh,dk=E==='di2'?M.dark:M.black;
    // Oppbygging som et ekte bakgir sett fra drivsiden: festebolt i girhengeren (H), B-knoke bakover, parallellogram skrått ned og bakover
    // til P-knoken (burets dreiepunkt, litt bak og over styretrinsen), og buret som henger ned og litt frem med de to trinsene.
    const zOut=zch-0.0088,zIn=zch+0.0084;
    const H=udh?p2(GM.RA.x,GM.RA.y):A(GM.RA,p2(-0.003,-0.027)),P=A(G,p2(-0.026,0.01)),Bp=udh?A(H,p2(-0.016,-0.03)):A(H,p2(-0.012,-0.008));
    const zB0=-(TZ+(udh?0.012:0.007)),zB1=zB0-0.017,zBc=(zB0+zB1)/2,zP0=zOut-0.0012,zP1=zOut-0.019,zPc=(zP0+zP1)/2;
    // B-knoke: avrundet støpt kropp fra festebolten bakover, festebolt med unbrako og B-skrue bak
    sweep([v(A(H,p2(0.006,0.002)),zBc),v(M2(H,Bp,0.5),zBc),v(Bp,zBc)],u=>({w:0.0115-0.001*u,h:0.0085,n:3}),dm,null,{up:new V3(0,0,1),n:16,r:24});
    cyl(v(H,zB0+0.001),v(H,zB1-0.0008),udh?0.017:0.0118,dm,32);
    bolt(v(H,zB1-0.0008),new V3(0,0,-1),udh?0.008:0.0056,M.bolts);cyl(v(H,zB1-0.0015),v(H,zB1-0.0022),udh?0.0038:0.0028,M.socket,6);
    if(!udh){const bs=A(H,p2(-0.011,0.009));bolt(v(bs,zBc),new V3(-0.5,0.85,0).normalize(),0.002,M.bolts)}
    // parallellogram: kropp, mørk dekselplate på yttersiden og fire leddpinner
    const B3=v(Bp,zBc),P3=v(P,zPc),bd=U2(Sb(P,Bp)),bn=Rot(bd,Math.PI/2),Lbp=L2(Sb(P,Bp)),bw=udh||E?0.0128:0.0115;
    sweep([B3,B3.clone().lerp(P3,0.5),P3],u=>({w:bw*(1-0.1*Math.sin(Math.PI*u)),h:0.0072,n:3.2}),dm,null,{up:new V3(0,0,1),n:20,r:24});
    sweep([B3.clone().setZ(zBc-0.0082),B3.clone().lerp(P3,0.5).setZ((zBc+zPc)/2-0.0082),P3.clone().setZ(zPc-0.0082)],u=>({w:bw*1.06*endR(u,0.1,0.1),h:0.0011,n:3.6}),dk,null,{up:new V3(0,0,1),n:20,r:24});
    if(!E)[0.14,0.86].forEach(u=>[-1,1].forEach(k=>{const c=v(A(M2(Bp,P,u),K(bn,k*bw*0.62)),zBc+(zPc-zBc)*u-0.0094);cyl(c,c.clone().add(new V3(0,0,-0.0012)),0.0021,M.steel,12)}));
    // P-knoke: sylinder utenfor ytre burplate, med clutchdeksel (Shimano har clutchbryter på toppen)
    cyl(v(P,zP0),v(P,zP1),0.0135,dm,36);cyl(v(P,zP1),v(P,zP1-0.0025),0.012,dk,36);
    if(!sram&&!E){const lv=rbox(0.017,0.005,0.007,0.002,dk);orient(lv,v(A(P,p2(0.003,0.0135)),zPc),0.3)}
    else if(sram&&!E){cyl(v(A(P,p2(-0.009,0.006)),zP1-0.0005),v(A(P,p2(-0.009,0.006)),zP1-0.003),0.0028,M.steel,12)}
    // kabel: wirestopp med justeringsskrue på toppen av B-knoken, wiren går ned til klemmebolten på parallellogrammet
    const top=A(M2(H,Bp,0.45),p2(0,0.0125));
    if(!E){const be=A(top,p2(0.013,0.003));cyl(v(top,zBc-0.002),v(be,zBc-0.002),0.0034,dm,14);cyl(v(A(top,p2(0.006,0.0015)),zBc-0.002),v(be,zBc-0.002),0.0045,M.dark,14);
      const pin=A(M2(Bp,P,0.58),K(bn,bw+0.001));cyl(v(top,zBc-0.002),v(pin,(zBc+zPc)/2-0.004),0.0007,M.inner,6);bolt(v(pin,(zBc+zPc)/2-0.004),new V3(0,0,-1),0.0026,M.bolts);
      ANCH.der=v(be,zBc-0.002);ANCH.derIn=v(A(be,p2(0.045,0.004)),zBc+0.006)}
    else if(E==='di2'){const pe=A(top,p2(0.008,0.002));cyl(v(top,zBc-0.002),v(pe,zBc-0.002),0.0028,M.black,12);ANCH.der=v(pe,zBc-0.002);ANCH.derIn=v(A(pe,p2(0.04,0.004)),zBc+0.006)}
    else{// AXS: batteri på toppen av parallellogrammet, med knapp og lys. Trådløs, ingen kabel
      const tp=A(M2(Bp,P,0.45),K(bn,bw+0.0072)),zm=(zBc+zPc)/2,bat=rbox(0.036,0.0135,0.022,0.004,M.black);orient(bat,v(tp,zm),Math.atan2(bd.y,bd.x));
      const btn=A(tp,K(bn,0.007));cyl(v(btn,zm-0.006),v(btn,zm-0.006).add(v(K(bn,0.0016))),0.0028,M.steel,16);
      sph(v(A(btn,K(bd,-0.009)),zm-0.006).add(v(K(bn,0.0005))),0.0011,new THREE.MeshStandardMaterial({color:0x2fd06a,emissive:0x2fd06a,emissiveIntensity:0.8}))}
    // bur: ytre plate fra P-knoken rundt begge trinsene (tennene synes utenfor platen), mindre indre plate
    const hull=(cs,z,dz,m)=>{const pts=[];cs.forEach(([c,r])=>{for(let i=0;i<32;i++){const a=i/32*Math.PI*2;pts.push(new THREE.Vector2(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r))}});
      pts.sort((p,q)=>p.x-q.x||p.y-q.y);const cr=(o,a,b)=>(a.x-o.x)*(b.y-o.y)-(a.y-o.y)*(b.x-o.x),lo=[],up=[];
      pts.forEach(p=>{while(lo.length>=2&&cr(lo[lo.length-2],lo[lo.length-1],p)<=0)lo.pop();lo.push(p)});
      for(let i=pts.length-1;i>=0;i--){const p=pts[i];while(up.length>=2&&cr(up[up.length-2],up[up.length-1],p)<=0)up.pop();up.push(p)}
      const g=new THREE.ExtrudeGeometry(new THREE.Shape(lo.slice(0,-1).concat(up.slice(0,-1))),{depth:dz,bevelEnabled:true,bevelThickness:0.0005,bevelSize:0.0007,bevelSegments:2});g.translate(0,0,z-dz/2);return put(new THREE.Mesh(g,m))};
    hull([[P,0.0098],[G,0.0112],[Tn,0.0122]],zOut,0.0018,dm);
    hull([[G,0.0098],[Tn,0.0108]],zIn,0.0014,dm);
    [[G,12],[Tn,nP2]].forEach(([c,nT])=>{const j=v(c,zch),gm=gear(nT,0.006,0.0034,M.black);gm.position.copy(j);
      cyl(j.clone().setZ(zOut+0.0009),j.clone().setZ(zIn-0.0007),0.006,M.dark,16);bolt(j.clone().setZ(zOut-0.0009),new V3(0,0,-1),0.0042,M.bolts)});
    FOCUS.der=v(M2(P,Tn,0.45),zch-0.01);FOCUS.derG=v(G,zch);
    if(rings.length>1){const zr=-0.059,R0=ringR+0.006,R1=ringR+0.024,sa=Math.atan2(GM.s.y,GM.s.x),a0=sa-0.42,a1=sa+0.12;
      [zr-0.0058,zr+0.0058].forEach((z,k)=>{const sh=new THREE.Shape();sh.absarc(0,0,R1,a0,a1,false);sh.absarc(0,0,R0,a1,a0,true);sh.closePath();
        const gg=new THREE.ExtrudeGeometry(sh,{depth:0.0016,bevelEnabled:true,bevelThickness:0.0005,bevelSize:0.0005,bevelSegments:2,curveSegments:16});gg.translate(0,0,z-0.0008);const me=put(new THREE.Mesh(gg,dm));me.position.copy(bb)});
      const hR=ringR+0.03,cp=v(K(GM.s,hR));
      box(v(A(GM.BB,K(p2(Math.cos(sa-0.1),Math.sin(sa-0.1)),R1+0.002)),zr),cp.clone().setZ(zr+0.002),0.012,0.008,dm);
      const lk=rbox(0.024,0.016,0.03,0.004,dm);lk.position.copy(v(A(K(GM.s,hR-0.006),p2(-0.012,0)),zr+0.016));
      cyl(v(K(GM.s,hR),-0.014),v(K(GM.s,hR),0.014),GM.T.st/2+0.003,M.dark,32);bolt(v(A(K(GM.s,hR),p2(0.018,0)),0.0),new V3(0,0,1),0.0028,M.bolts);
      if(D.e==='di2'){const mo=rbox(0.03,0.024,0.024,0.006,M.black);mo.position.copy(v(A(K(GM.s,hR+0.002),p2(-0.024,0.004)),zr+0.026));cyl(v(A(K(GM.s,hR-0.004),p2(-0.024,0)),zr+0.034),v(A(K(GM.s,hR-0.004),p2(-0.03,0)),zr+0.034),0.0026,M.black,12)}
      ANCH.fd=v(A(K(GM.s,hR-0.01),p2(-0.024,0)),zr+0.02)}
  }
  // kjedebeskytter
  if(st.guard==='yes'){
    // kjedebeskytter (halvdeksel): en sigd over toppen av klingen og en arm over den øvre kjedeparten, med en kant bøyd innover over kjedet.
    // Platen står mellom kjedet og krankarmen, og er festet med en klemme på setestammen og en brakett på kjedestaget.
    const ringTop=A(GM.BB,p2(0,ringR)),cogTop=A(GM.RA,p2(0,cogR)),dRun=U2(Sb(cogTop,ringTop)),Lrun=L2(Sb(cogTop,ringTop));let nU=Rot(dRun,Math.PI/2);if(nU.y<0)nU=K(nU,-1);
    const R1=ringR+0.02,Rlow=ringR-0.013,aN=Math.atan2(nU.y,nU.x),a0=-18*D2R,zP=zch-0.011,gw=0.018;
    const tail=A(ringTop,K(dRun,Math.max(0.12,Lrun-cogR-0.075)));
    const P=(c,r,a)=>p2(c.x+r*Math.cos(a),c.y+r*Math.sin(a)),outer=[],line=[];
    for(let i=0;i<=28;i++)outer.push(P(GM.BB,R1,a0+(aN-a0)*i/28));
    const tT=A(tail,K(nU,0.02)),tB=A(tail,K(nU,-0.013));
    for(let i=1;i<=10;i++)outer.push(M2(A(GM.BB,K(nU,R1)),tT,i/10));
    const tc=A(tail,K(nU,0.0035)),tr=0.0165;const tailArc=[];for(let i=1;i<12;i++){const a=aN-Math.PI*i/12;tailArc.push(P(tc,tr,a))}
    const lower=[];for(let i=0;i<=10;i++)lower.push(M2(tB,A(GM.BB,K(nU,Rlow)),i/10));
    const inner=[];for(let i=1;i<=28;i++)inner.push(P(GM.BB,Rlow,aN+(a0-aN)*i/28));
    const sh=new THREE.Shape([...outer,...tailArc,...lower,...inner].map(p=>new THREE.Vector2(p.x,p.y)));
    const g=new THREE.ExtrudeGeometry(sh,{depth:0.0012,bevelEnabled:true,bevelThickness:0.0006,bevelSize:0.0008,bevelSegments:2,curveSegments:24});g.translate(0,0,zP-0.0006);put(new THREE.Mesh(g,M.guard));
    // kant bøyd innover over kjedet, med rullet ytterkant
    const edge=[...outer,...tailArc.slice(0,6)],pos=[],idx=[];edge.forEach((p,i)=>{pos.push(p.x,p.y,zP,p.x,p.y,zP+gw);if(i){const k=(i-1)*2;idx.push(k,k+2,k+1,k+1,k+2,k+3)}});
    const fg=new THREE.BufferGeometry();fg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));fg.setIndex(idx);fg.computeVertexNormals();
    const fl=new THREE.Mesh(fg,M.guard);fl.material=M.guard;put(fl);
    tube(edge.filter((_,i)=>i%2===0).map(p=>v(p,zP)),0.0016,M.guard,60,false,null,8);tube(edge.filter((_,i)=>i%2===0).map(p=>v(p,zP+gw)),0.0013,M.guard,60,false,null,8);
    // feste: klemme på setestammen og stag ned til platen
    const sp=K(GM.s,Math.min(0.13,R1+0.05)),stp=A(GM.BB,K(nU,R1));cyl(v(sp,-0.022),v(sp,0.004),GM.T.st/2+0.0025,M.dark,24);
    box(v(A(sp,p2(0,-0.006)),-0.02),v(A(stp,K(dRun,0.04)),zP+gw*0.6),0.008,0.003,M.dark);bolt(v(sp,-0.022),new V3(0,0,-1),0.0035,M.bolts);
    // brakett på kjedestaget under armen
    const csP=M2(GM.BB,GM.RA,0.62),tb2=A(tail,K(dRun,-0.03));box(v(csP,-0.058),v(A(tb2,K(nU,-0.01)),zP+0.002),0.01,0.003,M.dark);bolt(v(A(tb2,K(nU,-0.01)),zP-0.001),new V3(0,0,-1),0.0028,M.bolts);
    FOCUS.guard=v(M2(GM.BB,tail,0.4),zP);
  }
  // kranker og pedaler
  cyl(bb.clone().setZ(-0.076),bb.clone().setZ(0.076),0.012,M.steel,24);
  const cl=st.crankLen/1000,ang=-55*D2R;FOCUS.crank=bb.clone();
  [[-1,ang],[1,ang+Math.PI]].forEach(([s,a])=>{
    const dir=p2(Math.cos(a),Math.sin(a)),pd2=A(GM.BB,K(dir,cl)),zA=s*0.074,pd=v(pd2,zA);
    if(st.crank==='onepiece'){const k1=v(A(GM.BB,K(dir,0.03)),s*0.07),k2=v(A(GM.BB,K(dir,cl*0.75)),s*0.085);tube([bb.clone().setZ(s*0.045),k1,k2,pd.clone().setZ(s*0.087)],0.0085,cm,40,false,null,16);
      cyl(bb.clone().setZ(s*0.04),bb.clone().setZ(s*0.05),0.026,M.headset,32)}
    else if(st.crank==='bmx'){box(bb.clone().setZ(zA),pd,0.022,0.018,cm);cyl(bb.clone().setZ(zA-0.01),bb.clone().setZ(zA+0.01),0.017,cm,32);bolt(bb.clone().setZ(zA+s*0.009),new V3(0,0,s),0.005,M.bolts)}
    else{const sh=new THREE.Shape();const w0=st.crank==='modern'?0.02:0.016,w1=0.011;sh.moveTo(0,-w0);sh.lineTo(cl,-w1);sh.absarc(cl,0,w1,-Math.PI/2,Math.PI/2,false);sh.lineTo(0,w0);sh.absarc(0,0,w0,Math.PI/2,Math.PI*1.5,false);
      const th=st.crank==='modern'?0.016:0.012;const g=new THREE.ExtrudeGeometry(sh,{depth:th,bevelEnabled:true,bevelThickness:0.003,bevelSize:0.003,bevelSegments:4,curveSegments:16});g.translate(0,0,-th/2);
      const me=put(new THREE.Mesh(g,cm));me.position.copy(bb).setZ(zA);me.rotation.z=a;
      if(st.crank==='square')cyl(bb.clone().setZ(zA+s*0.008),bb.clone().setZ(zA+s*0.012),0.0115,cm,32);
      bolt(bb.clone().setZ(zA+s*(th/2+0.003)),new V3(0,0,s),0.006,M.bolts)}
    pedal(pd,s);
  });
}
// pedaler bygges i en gruppe med lokal z utover fra kranken, x fremover og y opp
function plate(shapeFn,th,m,bev=0.0012){const sh=shapeFn();const g=new THREE.ExtrudeGeometry(sh,{depth:th,bevelEnabled:true,bevelThickness:bev,bevelSize:bev,bevelSegments:3,curveSegments:10});g.translate(0,0,-th/2);return new THREE.Mesh(g,m)}
function rrectPath(cx,cy,w,h,r,hole){const p=hole?new THREE.Path():new THREE.Shape(),x=cx-w/2,y=cy-h/2;r=Math.min(r,w/2,h/2);
  p.moveTo(x+r,y);p.lineTo(x+w-r,y);p.quadraticCurveTo(x+w,y,x+w,y+r);p.lineTo(x+w,y+h-r);p.quadraticCurveTo(x+w,y+h,x+w-r,y+h);p.lineTo(x+r,y+h);p.quadraticCurveTo(x,y+h,x,y+h-r);p.lineTo(x,y+r);p.quadraticCurveTo(x,y,x+r,y);return p}
function serrated(len,h,tooth,pitch){const s=new THREE.Shape(),n=Math.round(len/pitch);s.moveTo(0,-h/2);
  for(let i=0;i<n;i++){s.lineTo(i*pitch+pitch*0.35,-h/2-tooth);s.lineTo(i*pitch+pitch*0.65,-h/2-tooth);s.lineTo((i+1)*pitch,-h/2)}
  s.lineTo(len,h/2);for(let i=n-1;i>=0;i--){s.lineTo(i*pitch+pitch*0.65,h/2+tooth);s.lineTo(i*pitch+pitch*0.35,h/2+tooth);s.lineTo(i*pitch,h/2)}s.lineTo(0,-h/2);return s}
function pedal(pd,s){
  const g=new THREE.Group();g.position.copy(pd).setZ(s*0.084);g.scale.z=s;B.add(g);const pm=M.pedals,type=st.pedals;
  if(s<0)FOCUS.pedal=g.position.clone().add(new V3(0,0,s*0.05));
  const flat=m=>{m.rotation.x=Math.PI/2;return m}; // form i x-z planet, tykkelse langs y
  const Pz=0.056; // senter av plattformen langs akselen
  // aksel og lagerhus
  cyl(new V3(0,0,-0.002),new V3(0,0,0.012),0.0075,M.steel,6,0.0075,g);
  const bodyLen=type==='road'?0.062:type==='spd'?0.066:0.1;
  cyl(new V3(0,0,0.01),new V3(0,0,0.01+bodyLen),type==='rat'||type==='block'?0.0105:0.0115,type==='road'||type==='spd'?M.dark:pm,28,undefined,g);
  if(type==='flat'||type==='plastic'){
    const plast=type==='plastic',W=0.104,D=plast?0.1:0.102,th=plast?0.019:0.013;
    const body=plate(()=>{const sh=rrectPath(0,0,W,D,plast?0.016:0.012);
      const wx=plast?0.024:0.03,wz=plast?0.05:0.066;[-1,1].forEach(k=>sh.holes.push(rrectPath(k*0.031,0,wx,wz,0.007,true)));
      if(plast)[-1,1].forEach(k=>sh.holes.push(rrectPath(k*0.031,k*0.038,0.016,0.012,0.004,true)));return sh},th,pm,0.0018);
    flat(body);body.position.set(0,0,Pz);put(body,g);
    // konkav plattform: senteret ligger litt lavere enn kantene
    body.scale.y=1;
    if(!plast){const pins=[];for(const k of [-1,1]){for(const zz of [-0.042,-0.021,0,0.021,0.042])pins.push([k*0.046,zz]);pins.push([k*0.016,-0.046],[k*0.016,0.046])}
      const m4=[];pins.forEach(([x,z])=>[1,-1].forEach(u=>m4.push(mtx(new V3(x,u*(th/2+0.0028),Pz+z),new THREE.Quaternion()))));
      inst(new THREE.CylinderGeometry(0.0019,0.0021,0.0065,10),M.bolts,m4,g);
      const m5=[];pins.forEach(([x,z])=>[1,-1].forEach(u=>m5.push(mtx(new V3(x,u*(th/2+0.0002),Pz+z),new THREE.Quaternion()))));
      inst(new THREE.CylinderGeometry(0.0032,0.0032,0.0012,6),M.dark,m5,g)}
    else{const nubs=[];for(const k of [-1,1])for(const zz of [-0.04,-0.02,0,0.02,0.04])nubs.push([k*0.047,zz]);
      const m4=[];nubs.forEach(([x,z])=>[1,-1].forEach(u=>m4.push(mtx(new V3(x,u*(th/2+0.0015),Pz+z),new THREE.Quaternion()))));inst(new THREE.BoxGeometry(0.006,0.004,0.008),pm,m4,g);
      [-1,1].forEach(k=>{const rf=rbox(0.004,0.009,0.03,0.002,new THREE.MeshStandardMaterial({color:0xff8a1a,roughness:0.3,metalness:0.1,emissive:0x3a1600}));rf.position.set(k*(W/2+0.0015),0,Pz);g.add(rf)})}
    cyl(new V3(0,0,Pz+D/2-0.004),new V3(0,0,Pz+D/2+0.002),0.009,M.dark,20,undefined,g);
  }else if(type==='rat'){
    const pitch=0.0085,len=0.088;
    [-1,1].forEach(k=>{const pl=plate(()=>serrated(len,0.016,0.0045,pitch),0.0028,pm,0.0004);pl.rotation.y=-Math.PI/2;pl.position.set(k*0.042,0,0.012);put(pl,g)});
    [0.012,0.1].forEach(zz=>{const ep=plate(()=>{const sh=rrectPath(0,0,0.094,0.024,0.009);sh.holes.push(rrectPath(0,0,0.016,0.016,0.008,true));return sh},0.003,pm,0.0005);ep.position.set(0,0,zz);put(ep,g)});
    [-1,1].forEach(k=>cyl(new V3(k*0.018,0,0.012),new V3(k*0.018,0,0.1),0.0024,pm,10,undefined,g));
    const rf=rbox(0.003,0.012,0.04,0.002,new THREE.MeshStandardMaterial({color:0xff8a1a,roughness:0.3,emissive:0x3a1600}));rf.position.set(0.0445,0,Pz);g.add(rf);
  }else if(type==='block'){
    const rub=mat({m:'rubber',c:'#1a1a1a'});
    [-1,1].forEach(k=>{const bl=rbox(0.03,0.026,0.078,0.006,rub);bl.position.set(k*0.026,0,Pz);g.add(bl);
      for(const zz of [-0.026,0,0.026])[1,-1].forEach(u=>{const gr=rbox(0.031,0.003,0.006,0.001,M.black);gr.position.set(k*0.026,u*0.0125,Pz+zz);g.add(gr)})});
    [0.014,0.098].forEach(zz=>{const ep=plate(()=>{const sh=new THREE.Shape();sh.moveTo(-0.055,-0.012);sh.lineTo(0.055,-0.012);sh.quadraticCurveTo(0.06,0,0.055,0.012);sh.lineTo(-0.055,0.012);sh.quadraticCurveTo(-0.06,0,-0.055,-0.012);sh.holes.push(rrectPath(0,0,0.014,0.014,0.007,true));return sh},0.0025,pm,0.0005);ep.position.set(0,0,zz);put(ep,g)});
    [-1,1].forEach(k=>{const rf=rbox(0.003,0.014,0.03,0.002,new THREE.MeshStandardMaterial({color:0xff8a1a,roughness:0.3,emissive:0x3a1600}));rf.position.set(k*0.0575,0,Pz);g.add(rf)});
  }else if(type==='spd'){
    // to-sidig klikkpedal: mekanisme på begge sider av et smalt lagerhus
    const Pz2=0.04;
    [1,-1].forEach(u=>{const fr=plate(()=>{const sh=rrectPath(0,0,0.064,0.05,0.012);sh.holes.push(rrectPath(0,0,0.034,0.028,0.006,true));return sh},0.004,pm,0.0008);flat(fr);fr.position.set(0,u*0.0105,Pz2);put(fr,g);
      [-1,1].forEach(k=>{const cl=rbox(0.008,0.006,0.026,0.002,M.steel);cl.position.set(k*0.018,u*0.0135,Pz2);g.add(cl)});
      const sp=rbox(0.03,0.004,0.006,0.001,M.dark);sp.position.set(0.022,u*0.013,Pz2+0.024);g.add(sp);bolt(new V3(-0.027,u*0.013,Pz2+0.02),new V3(0,u,0),0.0022,M.bolts,g)});
    const side=rbox(0.064,0.024,0.006,0.004,pm);side.position.set(0,0,Pz2+0.028);g.add(side);
  }else{
    // landevei: ensidig, trekantet kropp med stålplate oppå
    const body=plate(()=>{const sh=new THREE.Shape();sh.moveTo(-0.032,0.02);sh.quadraticCurveTo(-0.038,0.042,-0.026,0.064);sh.lineTo(0.03,0.074);sh.quadraticCurveTo(0.05,0.072,0.052,0.05);
      sh.lineTo(0.052,0.03);sh.quadraticCurveTo(0.05,0.008,0.03,0.006);sh.lineTo(-0.02,0.008);sh.quadraticCurveTo(-0.032,0.01,-0.032,0.02);return sh},0.013,pm,0.002);
    body.rotation.x=Math.PI/2;body.position.set(0,0.004,0);put(body,g);
    const plt=rbox(0.03,0.0015,0.05,0.004,M.steel);plt.position.set(0.012,0.0118,0.04);g.add(plt);
    const rear=rbox(0.016,0.016,0.044,0.004,M.dark);rear.position.set(-0.03,0.006,0.04);g.add(rear);bolt(new V3(-0.038,0.008,0.04),new V3(-1,0,0),0.0024,M.bolts,g);
  }
}

/* ---------- sete ---------- */
// sete: bygges som en loft-flate langs lengden, med ekte tverrsnitt
// monoton kubisk interpolasjon (Fritsch-Carlson): glatte kurver uten bølger
const _ipc=new WeakMap();
function ip(arr,u){const n=arr.length;if(u<=arr[0][0])return arr[0][1];if(u>=arr[n-1][0])return arr[n-1][1];
  let m=_ipc.get(arr);if(!m){const d=[];for(let i=0;i<n-1;i++)d.push((arr[i+1][1]-arr[i][1])/(arr[i+1][0]-arr[i][0]));m=[d[0]];
    for(let i=1;i<n-1;i++)m.push(d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2);m.push(d[n-2]);
    for(let i=0;i<n-1;i++){if(d[i]===0){m[i]=m[i+1]=0;continue}const a=m[i]/d[i],b=m[i+1]/d[i],h=a*a+b*b;if(h>9){const t=3/Math.sqrt(h);m[i]=t*a*d[i];m[i+1]=t*b*d[i]}}_ipc.set(arr,m)}
  let i=0;while(u>arr[i+1][0])i++;const [x0,y0]=arr[i],[x1,y1]=arr[i+1],hh=x1-x0,t=(u-x0)/hh,t2=t*t,t3=t2*t;
  return (2*t3-3*t2+1)*y0+(t3-2*t2+t)*hh*m[i]+(-2*t3+3*t2)*y1+(t3-t2)*hh*m[i+1]}
function endF(SD,u){const a=SD.hw,u0=a[0][0],u1=a[a.length-1][0];if(u<u0){const k=u/u0;return Math.sqrt(Math.max(0,1-(1-k)*(1-k)))}if(u>u1){const k=(u-u1)/(1-u1);return Math.sqrt(Math.max(0,1-k*k))}return 1}
function halfW(SD,u){const a=SD.hw,u0=a[0][0],u1=a[a.length-1][0];return Math.max(0.0006,(u<u0?a[0][1]:u>u1?a[a.length-1][1]:ip(a,u))*endF(SD,u))}
// polstret sete: tverrsnitt med svakt avrundet topp som faller mot kantene (vinger), avrundet kant og et skall under.
// Endene rundes både sett ovenfra (bredden) og fra siden (tykkelsen), og utsparing eller kanal senkes inn i toppen.
const NT=31,NE=6,NB=11;
const padT=(SD,u)=>ip(SD.t,u)*(0.4+0.6*endF(SD,u));
const padC=(SD,u)=>ip(SD.c,u)-(1-endF(SD,u))*ip(SD.t,u)*0.28;
function padDip(SD,u,z){let d=0;const sm=(e0,e1,x)=>{const k=Math.min(1,Math.max(0,(x-e0)/(e1-e0)));return k*k*(3-2*k)};
  if(SD.cut){const [u0,u1,cw]=SD.cut,g=sm(u0,u0+0.05,u)*(1-sm(u1-0.07,u1,u)),wv=cw*(0.55+0.45*Math.sin(Math.PI*Math.min(1,Math.max(0,(u-u0)/(u1-u0)))));
    d=Math.max(d,g*padT(SD,u)*0.92*(1-sm(0.7,1.05,Math.abs(z)/Math.max(1e-4,wv))))}
  if(SD.chan){const [u0,u1,cw,dep]=SD.chan,g=sm(u0,u0+0.08,u)*(1-sm(u1-0.12,u1,u));d=Math.max(d,g*dep*(1-sm(0.35,1.15,Math.abs(z)/cw)))}
  return d}
const WING0=[[0,.003],[1,.008]];
function padSection(SD,u){const w=halfW(SD,u),f=endF(SD,u),t=padT(SD,u),c=padC(SD,u),wing=ip(SD.wing||WING0,u)*f,pts=[],fl=[];
  const te=Math.max(0.002,t*(SD.soft?0.8:0.62)),re=Math.min(te/2,w*0.45),wi=Math.max(1e-5,w-re);
  const yt=z=>c-wing*Math.pow(Math.min(1,Math.abs(z)/Math.max(1e-5,wi)),2.3)-padDip(SD,u,z)+(SD.soft?0.003*f*(1-(z/Math.max(1e-5,wi))**2):0);
  const ye=yt(wi),yb0=Math.min(c-t,ye-2*re),yb=z=>yb0+(ye-2*re-yb0)*Math.pow(Math.abs(z)/Math.max(1e-5,wi),2);
  for(let j=0;j<NT;j++){const z=-wi+2*wi*j/(NT-1);pts.push([z,yt(z)]);fl.push(0)}
  for(let j=1;j<=NE;j++){const a=Math.PI/2-Math.PI*j/(NE+1);pts.push([wi+re*Math.cos(a),ye-re+re*Math.sin(a)]);fl.push(Math.sin(a)<-0.2?1:0)}
  for(let j=0;j<NB;j++){const z=wi-2*wi*j/(NB-1);pts.push([z,yb(z)]);fl.push(1)}
  for(let j=1;j<=NE;j++){const a=-Math.PI/2-Math.PI*j/(NE+1);pts.push([-wi+re*Math.cos(a),ye-re+re*Math.sin(a)]);fl.push(Math.sin(a)<-0.2?1:0)}
  return{pts,fl}}
function leatherSection(SD,u){const w=halfW(SD,u),f=endF(SD,u),c=ip(SD.c,u),rr=Math.min(0.01,w*0.35),sk=Math.max(rr+0.002,ip(SD.skirt,u)*(0.35+0.65*f)),th=SD.thin?0.0035:0.0045;
  const out=[[-(w+0.0012),c-sk]];
  for(let k=0;k<=4;k++){const a=Math.PI-k/4*Math.PI/2;out.push([-(w-rr)+rr*Math.cos(a),c-rr+rr*Math.sin(a)])}
  for(let k=1;k<=7;k++){const zz=-(w-rr)+2*(w-rr)*k/8;out.push([zz,c+0.003*f*(1-(zz/Math.max(1e-4,w-rr))**2)])}
  for(let k=0;k<=4;k++){const a=Math.PI/2-k/4*Math.PI/2;out.push([(w-rr)+rr*Math.cos(a),c-rr+rr*Math.sin(a)])}
  out.push([w+0.0012,c-sk]);
  const ctr=[0,c-sk*0.5],inn=out.map((p,i)=>{const a=out[Math.max(0,i-1)],b=out[Math.min(out.length-1,i+1)];let nz=-(b[1]-a[1]),ny=b[0]-a[0];const l=Math.hypot(nz,ny)||1;nz/=l;ny/=l;
    if((ctr[0]-p[0])*nz+(ctr[1]-p[1])*ny<0){nz=-nz;ny=-ny}return[p[0]+nz*th,p[1]+ny*th]});
  const pts=out.concat(inn.reverse()),fl=pts.map((_,i)=>i>=out.length?1:0);return{pts,fl}}
function loftMesh(xs,secs,mats){const n=secs.length,m=secs[0].pts.length,pos=new Float32Array(n*m*3);let k=0;
  secs.forEach((sc,i)=>sc.pts.forEach(([z,y])=>{pos[k++]=xs[i];pos[k++]=y;pos[k++]=z}));
  const ia=[[],[]],fl=secs[0].fl;
  for(let i=0;i<n-1;i++)for(let j=0;j<m;j++){const j2=(j+1)%m,a=i*m+j,b=(i+1)*m+j,c=(i+1)*m+j2,d=i*m+j2,g=fl[j]&&fl[j2]?1:0;ia[g].push(a,b,d,b,c,d)}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setIndex(ia[0].concat(ia[1]));
  const uv=new Float32Array(n*m*2);for(let i=0;i<n*m;i++){uv[i*2]=pos[i*3]/0.024;uv[i*2+1]=pos[i*3+2]/0.0208}geo.setAttribute('uv',new THREE.BufferAttribute(uv,2));   // i meter, til gittermønsteret
  geo.addGroup(0,ia[0].length,0);geo.addGroup(ia[0].length,ia[1].length,1);geo.computeVertexNormals();return new THREE.Mesh(geo,mats)}
function seat(){
  const SD=SADDLES[st.saddle],PT=A(GM.STT,K(GM.s,st.saddleH)),pt=v(PT);
  const post=st.geo.post||'round',sv=v(GM.s),cl=v(GM.STT),p0=v(A(GM.STT,K(GM.s,-0.08)));
  if(post==='aero')sweep([p0,p0.clone().lerp(pt,0.5),pt],u=>({w:0.0128,h:0.0082,n:2.4}),M.post,null,{up:new V3(0,0,1),n:8,r:28});
  else{cyl(p0,pt,0.0159,M.post,36);
    if(post==='vcls'){[-1,1].forEach(k=>{const a=cl.clone().addScaledVector(sv,0.012).setZ(k*0.0158),b=pt.clone().addScaledVector(sv,-0.03).setZ(k*0.0158);box(a,b,0.0022,0.0012,M.socket)})}}
  if((st.geo.clamp||'collar')==='collar'){cyl(cl.clone().addScaledVector(sv,-0.012),cl.clone().addScaledVector(sv,0.008),0.021,M.clamp,36);
    bolt(cl.clone().add(new V3(-0.024,-0.002,0.008)),new V3(0,0,1),0.004,M.bolts);hexnut(cl.clone().add(new V3(-0.024,-0.002,-0.012)),new V3(0,0,1),0.005,0.004,M.bolts)}
  else{const tb=GM.tubes&&GM.tubes.st;const W=tb?ip(tb.W,1)+0.0008:0.02,Hh=tb?ip(tb.H,1)+0.0008:0.02;sweep([cl.clone().addScaledVector(sv,-0.002),cl.clone().addScaledVector(sv,0.004)],u=>({w:W,h:Hh,n:tb?tb.n:2}),M.black,null,{up:new V3(0,0,1),n:2,r:28})}
  const under=SD.under,G2=new THREE.Group();G2.position.copy(pt);G2.rotation.z=0.02;B.add(G2);
  const P=(x,y,z)=>new V3(x,y,z);
  if(under!=='pivotal'){const hd=rbox(0.05,0.018,0.04,0.006,M.post);hd.position.copy(pt).add(new V3(0,0.008,0));
    bolt(pt.clone().add(new V3(0.016,-0.002,0)),new V3(0,-1,0),0.0045,M.bolts);bolt(pt.clone().add(new V3(-0.016,-0.002,0)),new V3(0,-1,0),0.0045,M.bolts)}
  const L=SD.L,banana=st.saddle==='banana',noseX=banana?0.12:L*0.52,tailX=noseX-L,N=56;
  const leather=SD.type==='leather',secs=[],xs=[];
  for(let i=0;i<=N;i++){const u=i/N;xs.push(noseX-u*L);secs.push(leather?leatherSection(SD,u):padSection(SD,u))}
  const uC=noseX/L,cC=leather?ip(SD.c,uC):padC(SD,uC);
  let lift=leather?0.05-cC:0.03-(cC-padT(SD,uC));
  if(under==='springs'||under==='springs2')lift+=0.035;if(under==='cruiser')lift+=0.035;if(under==='solo')lift+=0.07;if(under==='pivotal')lift=0.012-(cC-ip(SD.t,uC));
  let top=M.saddle;top.side=THREE.DoubleSide;
  if(SD.mirror){// Mirror: 3D-printet bikakegitter. Mørke hull, stag i setets farge (lysnet hvis fargen er svart)
    const c0=new THREE.Color(st.p.saddle.c||'#141516'),hsl={};c0.getHSL(hsl);if(hsl.l<0.25)c0.setHSL(hsl.h,hsl.s,0.3);
    top=new THREE.MeshStandardMaterial({color:c0,map:latticeTex(),bumpMap:latticeTex(),bumpScale:3,roughness:0.55,metalness:0,side:THREE.DoubleSide})}
  const base=leather?new THREE.MeshStandardMaterial({color:new THREE.Color(st.p.saddle.c||'#6b4325').multiplyScalar(0.55),roughness:0.95,side:THREE.DoubleSide})
    :new THREE.MeshStandardMaterial({color:0x17181a,roughness:0.6,metalness:0.1,side:THREE.DoubleSide});
  const me=loftMesh(xs,secs,[top,base]);me.position.y=lift;put(me,G2);
  const yTop=u=>lift+(leather?ip(SD.c,u):padC(SD,u)),yBot=u=>lift+(leather?ip(SD.c,u)-ip(SD.skirt,u)*(0.35+0.65*endF(SD,u)):padC(SD,u)-padT(SD,u));
  const xAt=u=>noseX-u*L,wAt=u=>halfW(SD,u);
  FOCUS.saddle=pt.clone().add(new V3((noseX+tailX)/2,lift,0));
  const rail=M.chrome,rr=0.0035,railM=SD.rail==='carbon'?M.dark:M.steel;
  if(leather){
    // nese med strammebolt, skinner under, nagler
    const nb=rbox(0.03,0.016,0.02,0.005,rail);nb.position.set(noseX-0.022,yTop(0.08)-0.014,0);G2.add(nb);
    bolt(P(noseX-0.006,yTop(0.08)-0.014,0),new V3(1,0,0),0.0035,M.bolts,G2);
    const rails=(dz,dy)=>[-1,1].forEach(k=>tube([P(noseX-0.03,yTop(0.08)-0.016+dy,k*0.006),P(noseX-0.09,0.006+dy,k*(0.018+dz)),P(0.0,dy,k*(0.022+dz)),P(-0.06,0.002+dy,k*(0.026+dz)),
      P(tailX+0.05,0.016+dy,k*(0.04+dz)),P(tailX+0.022,yBot(0.96)+0.004+dy,k*(wAt(0.9)*0.75))],rr,rail,40,false,G2,10));
    if(under==='leatherframe'){rails(0,0);tube([P(tailX+0.022,yBot(0.96)+0.004,-wAt(0.9)*0.75),P(tailX+0.012,yBot(0.96)+0.008,0),P(tailX+0.022,yBot(0.96)+0.004,wAt(0.9)*0.75)],rr,rail,20,false,G2,10)}
    else{const sy0=0.012,sr=under==='springs2'?0.015:0.011,sx=tailX+0.04,sz=wAt(0.9)*0.6;
      [-1,1].forEach(k=>{tube([P(noseX-0.03,yTop(0.08)-0.016,k*0.006),P(noseX-0.09,0.006,k*0.018),P(0,0,k*0.022),P(-0.06,0.002,k*0.026),P(sx+0.01,sy0,k*sz)],rr,rail,40,false,G2,10);
        helix(P(sx,sy0-0.006,k*sz),P(sx,yBot(0.93)+0.004,k*sz),sr,under==='springs2'?7:6,0.0028,M.chrome,G2);
        cyl(P(sx,yBot(0.93)+0.002,k*sz),P(sx,yBot(0.93)+0.008,k*sz),sr*0.8,rail,16,sr*0.8,G2);
        if(under==='springs2')tube([P(noseX-0.05,yTop(0.1)-0.02,k*0.01),P(0.02,-0.012,k*0.03),P(sx+0.012,sy0-0.012,k*(sz+0.006))],rr*0.9,rail,30,false,G2,10)});
      tube([P(sx,yBot(0.93)+0.008,-sz),P(sx-0.01,yBot(0.93)+0.01,0),P(sx,yBot(0.93)+0.008,sz)],rr,rail,20,false,G2,10)}
    const rv=SD.thin?M.steel:M.copper;
    for(let i=0;i<5;i++){const a=(i/4-0.5)*1.5,u=0.985-0.02*Math.abs(Math.sin(a));const z=Math.sin(a)*wAt(0.9)*0.8;const r=sph(P(xAt(u)+0.002,yTop(u)-0.004-0.01*Math.abs(Math.sin(a)),z),0.0042,rv,G2);r.scale.set(0.6,1,1)}
    sph(P(noseX-0.012,yTop(0.04)+0.0015,0),0.0035,rv,G2);
  }else if(under==='rails'||under==='cruiser'){
    // utsparing: bunnen av fordypningen er det mørke skallet under, så det ser ut som et hull gjennom setet
    if(SD.cut){const [u0,u1]=SD.cut,n=28,pos=[],idx=[];for(let i=0;i<=n;i++){const u=u0+0.03+(u1-u0-0.07)*i/n,x=xAt(u);let hw0=0;for(let z=0;z<0.03;z+=0.0005){if(padDip(SD,u,z)<padT(SD,u)*0.6)break;hw0=z}
        const y=yTop(u)-padT(SD,u)*0.9+0.0004;pos.push(x,y,-hw0,x,y,hw0);if(i<n){const k=i*2;idx.push(k,k+2,k+1,k+1,k+2,k+3)}}
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();
      G2.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x060607,roughness:0.9,side:THREE.DoubleSide})))}
    // skinner: festet i nesen og i bakkant av skallet, rette der klemmen sitter (karbonskinner er ovale 7 × 9 mm)
    const rr2=SD.rail==='carbon'?0.0045:rr,uN=SD.cut||SD.hw[0][1]>0.015?0.06:0.1;
    [-1,1].forEach(k=>{const pts=[P(xAt(uN)-0.004,yBot(uN)+0.003,k*0.007),P(xAt(uN)-0.045,0.007,k*0.018),P(0.01,0,k*0.021),P(-0.05,0,k*0.023),P(tailX+0.06,0.009,k*Math.min(0.032,wAt(0.82)*0.5)),P(tailX+0.028,yBot(0.9)+0.003,k*Math.min(0.04,wAt(0.9)*0.62))];
      if(SD.rail==='carbon'){const cv=sweep(pts,u=>({w:0.0047,h:0.0036,n:2.2}),railM,G2,{up:new V3(0,0,1),n:40,r:14})}else tube(pts,rr2,railM,40,false,G2,10)});
    if(under==='cruiser'){const sx=tailX+0.045,sz=wAt(0.85)*0.55;[-1,1].forEach(k=>{helix(P(sx,0.006,k*sz),P(sx,yBot(0.85)+0.002,k*sz),0.016,6,0.003,M.chrome,G2);tube([P(-0.04,0,k*0.023),P(sx+0.01,0.006,k*sz)],rr,M.steel,10,false,G2,8)})}
  }else if(under==='pivotal'){const bp=rbox(0.09,0.006,0.034,0.003,M.dark);bp.position.set(0,0.004,0);G2.add(bp);bolt(P(0,0.007,0),new V3(0,1,0),0.005,M.bolts,G2)}
  else if(under==='solo'){const sx=tailX+0.06,sz=0.055;[-1,1].forEach(k=>{helix(P(sx,-0.005,k*sz),P(sx,yBot(0.85)+0.002,k*sz),0.02,7,0.0036,M.chrome,G2);cyl(P(sx,-0.008,k*sz),P(sx,-0.002,k*sz),0.016,M.chrome,16,0.016,G2)});
    cyl(P(sx,-0.006,-sz-0.01),P(sx,-0.006,sz+0.01),0.005,M.chrome,12,0.005,G2);tube([P(0.01,0,0),P(sx,-0.006,0)],0.006,M.chrome,10,false,G2,10);
    box(P(0.01,0.004,0),P(noseX-0.04,yBot(0.15)+0.002,0),0.016,0.02,M.chrome,G2)}
  else if(under==='banana'){
    const bk=rbox(0.06,0.012,0.04,0.004,M.chrome);bk.position.set(0,0.01,0);G2.add(bk);
    ROOT.updateMatrixWorld(true);const ra=v(GM.RA);
    const tl=B.worldToLocal(G2.localToWorld(P(tailX+0.04,yBot(0.9)+0.004,0))),top=tl.y+0.28;
    const side=k=>[ra.clone().add(new V3(0.005,0.005,k*0.074)),new V3(ra.x+0.04,ra.y+0.12,k*0.07),new V3(tl.x+0.03,tl.y-0.01,k*0.06),new V3(tl.x-0.03,top-0.05,k*0.05)];
    tube([...side(-1),new V3(tl.x-0.025,top,0),...side(1).reverse()],0.0062,M.chrome,120,false,null,14);
    box(B.worldToLocal(G2.localToWorld(P(-0.02,0.01,0))),new V3(tl.x+0.03,tl.y-0.01,0),0.008,0.012,M.chrome)}
}

/* ---------- tilbehør ---------- */
function accessories(){
  if(st.bottle!=='none'&&st.geo.dt!=='bow'){const bb=v(GM.BB),dt=v(GM.DTF),dd=dt.clone().sub(bb).normalize(),nrm=new V3(-dd.y,dd.x,0),Lg=bb.distanceTo(dt),cg=M.cage;
    // standard flaskeholder: to bolter med 64 mm avstand på oversiden av skrårøret. Flasken (74 mm, ca. 21 cm) står med korken mot hodestammen
    const tB=Math.max(0.17,Lg*0.33),surf=t=>GM.dtH(Math.min(0.98,t/Lg))+0.0006,P=(t,h,z=0)=>bb.clone().addScaledVector(dd,t).addScaledVector(nrm,surf(t)+h).add(new V3(0,0,z));
    const Rb=0.0365,gap=0.0065,tb=tB-0.05,tL=0.215,ax=t=>P(t,gap+Rb),wr=0.0024;
    FOCUS.cage=P(tB+0.04,0.03);
    // bosser og bolter
    [tB,tB+0.064].forEach(t=>{cyl(P(t,-0.002),P(t,0.0015),0.0052,M.dark,16);bolt(P(t,0.0042),nrm,0.0042,M.bolts)});
    // ryggrad: to stenger tett mot røret, med flate ører rundt boltene
    [-1,1].forEach(k=>tube([P(tb+0.004,0.002,k*0.007),P(tB-0.012,0.0028,k*0.008),P(tB+0.08,0.0028,k*0.008),P(tB+0.094,0.004,k*0.006)],wr,cg,30,false,null,10));
    [tB,tB+0.064].forEach(t=>{const pl=rbox(0.014,0.0022,0.024,0.004,cg);pl.position.copy(P(t,0.0028));pl.rotation.z=Math.atan2(dd.y,dd.x)});
    // bunnkrok som flasken står i
    [-1,1].forEach(k=>tube([P(tb+0.004,0.002,k*0.007),P(tb-0.004,0.008,k*0.009),P(tb-0.006,gap+Rb*0.9,k*0.012),P(tb-0.002,gap+Rb*1.55,k*0.008),P(tb+0.008,gap+Rb*1.75,k*0.003)],wr,cg,30,false,null,10));
    // sidearmer rundt flasken, møtes foran i en bøyle med en liten leppe
    const ring=(t,phi,k)=>{const c=ax(t),r=Rb+wr+0.0006;return c.clone().addScaledVector(nrm,-Math.cos(phi)*r).add(new V3(0,0,k*Math.sin(phi)*r))};
    const arm=k=>[P(tB+0.005,0.003,k*0.008),ring(tB+0.02,k*0.5,1),ring(tB+0.05,k*1.15,1),ring(tB+0.085,k*1.75,1),ring(tB+0.105,k*2.45,1),ring(tB+0.112,k*Math.PI*0.995,1)];
    const L=arm(-1),Rr=arm(1);tube([...L,...Rr.slice().reverse()],wr,cg,90,false,null,10);
    if(st.bottle==='bottle'){
      const prof=[[0,0],[0.026,0],[0.033,0.003],[Rb,0.012],[Rb,0.07],[Rb-0.004,0.085],[Rb-0.004,0.1],[Rb,0.115],[Rb,0.168],[0.031,0.183],[0.0215,0.19],[0.0215,0.2],[0.016,0.204],[0.016,tL-0.006],[0.008,tL],[0,tL]];
      const bt=lathe(prof,M.bottle,48,null);bt.geometry.rotateX(-Math.PI/2);bt.position.copy(ax(tb));bt.quaternion.copy(qFrom(new V3(0,1,0),dd));
      const cap=lathe([[0,0],[0.0225,0],[0.0225,0.012],[0,0.012]],M.black,32,null);cap.geometry.rotateX(-Math.PI/2);cap.position.copy(ax(tb+0.19));cap.quaternion.copy(qFrom(new V3(0,1,0),dd))}}
  if(st.bell==='yes'&&ANCH.bell){const p=ANCH.bell,bm=M.bell;cyl(p.clone().add(new V3(0,0,-0.009)),p.clone().add(new V3(0,0,0.009)),0.0135,M.dark,20);
    const d=sph(p.clone().add(new V3(0.012,0.026,0)),0.026,bm);d.scale.set(1,0.62,1);cyl(p.clone().add(new V3(0.012,0.012,0)),p.clone().add(new V3(0.012,0.02,0)),0.006,bm,16);
    box(p.clone().add(new V3(0.0,0.006,0.008)),p.clone().add(new V3(0.024,0.016,0.03)),0.006,0.004,M.dark);sph(p.clone().add(new V3(0.012,0.043,0)),0.004,bm)}
}
/* ---------- skjermer, støtte ---------- */
function fenders(){
  if(st.fender==='none')return;
  const wd=wheelDims(),hw=Math.max(0.026,wd.w/2+0.013),dep=Math.min(0.016,hw*0.42),fm=M.fender;
  // skjermflate: buet tverrsnitt (høyest på midten, kantene trukket ned mot dekket) langs en sirkelbue rundt akselen, med rullede kanter
  const shell=(c,R,a0,a1,hw,dep,m)=>{const nA=Math.max(24,Math.round(Math.abs(a1-a0)*40)),nZ=14,pos=[],idx=[],uv=[];
    for(let i=0;i<=nA;i++){const a=a0+(a1-a0)*i/nA,ca=Math.cos(a),sa=Math.sin(a);
      for(let j=0;j<=nZ;j++){const u=j/nZ*2-1,z=u*hw,rr=R+dep*(1-u*u)*0.5-dep*0.5*u*u*0.0;pos.push(c.x+ca*(rr),c.y+sa*(rr),z);uv.push(i/nA,j/nZ)}}
    for(let i=0;i<nA;i++)for(let j=0;j<nZ;j++){const k=i*(nZ+1)+j;idx.push(k,k+nZ+1,k+1,k+1,k+nZ+1,k+nZ+2)}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
    put(new THREE.Mesh(g,m));
    // rullede kanter
    [-1,1].forEach(s=>{const pts=[];for(let i=0;i<=nA;i+=2){const a=a0+(a1-a0)*i/nA;pts.push(new V3(c.x+Math.cos(a)*R,c.y+Math.sin(a)*R,s*hw))}tube(pts,0.0022,m,nA,false,null,10)});
    // avrundet ende
    [a0,a1].forEach(a=>{const pts=[];for(let j=0;j<=nZ;j++){const u=j/nZ*2-1,rr=R+dep*(1-u*u)*0.5;pts.push(new V3(c.x+Math.cos(a)*rr,c.y+Math.sin(a)*rr,u*hw))}tube(pts,0.0018,m,24,false,null,8)})};
  const at=(c,R,a,z)=>new V3(c.x+Math.cos(a)*R,c.y+Math.sin(a)*R,z);
  const stay=(p0,p1)=>{cyl(p0,p1,0.0019,M.steel,8);const e=sph(p1,0.0035,M.dark)};
  const R=wd.out+0.016,RA=v(GM.RA),FA=v(GM.FA);
  if(st.fender==='full'){
    // bak: starter bak setestammen (eller ved kjedestagbroen), går over hjulet og ned til ca. 25° under vannrett bak
    let aS=-0.08;const stp=[];for(let i=0;i<=40;i++){const q=K(GM.s,i/40*st.geo.st);const d=L2(Sb(q,GM.RA));if(d<R+0.012){const a=Math.atan2(q.y-GM.RA.y,q.x-GM.RA.x);aS=Math.max(aS,a+0.07)}}
    const aE=Math.PI+0.42;shell(RA,R,aS,aE,hw,dep,fm);
    // stag fra øyet ved dropouten til skjermkanten, to par
    [Math.PI*0.72,Math.PI*0.93].forEach(a=>[-1,1].forEach(s=>stay(v(A(GM.RA,p2(-0.006,-0.012)),s*(TZ+0.006)),at(RA,R+0.001,a,s*(hw+0.0015)))));
    [-1,1].forEach(s=>{const e=v(A(GM.RA,p2(-0.006,-0.012)),s*(TZ+0.006));cyl(e.clone().setZ(s*(TZ+0.002)),e.clone().setZ(s*(TZ+0.009)),0.0042,M.bolts,10)});
    // brakett til setestagbroen
    const Lss=L2(Sb(GM.SST,GM.RA)),sb=A(GM.RA,K(U2(Sb(GM.SST,GM.RA)),Math.min(Lss-0.03,wd.out+0.016))),asb=Math.atan2(sb.y-GM.RA.y,sb.x-GM.RA.x);
    box(at(RA,R+dep*0.5+0.001,asb,0),v(sb,0),0.012,0.003,M.dark);bolt(v(sb,0).add(v(K(U2(Sb(sb,GM.RA)),0.004))),v(U2(Sb(sb,GM.RA))),0.0028,M.bolts);
    // foran: under gaffelkronen, fra ca. 15° over vannrett foran til 40° under vannrett bak, med sprutlapp
    const up=GM.up,a0=Math.atan2(GM.n.y,GM.n.x)+0.2,a1=Math.PI+0.72;shell(FA,R,a0,a1,hw,dep,fm);
    const fl=at(FA,R,a1,0),tg=new V3(Math.sin(a1),-Math.cos(a1),0);const flap=rbox(0.07,hw*1.9,0.002,0.006,M.black);flap.position.copy(fl.clone().addScaledVector(tg,-0.03).addScaledVector(new V3(Math.cos(a1),Math.sin(a1),0),0.002));flap.rotation.set(0,0,Math.atan2(tg.y,tg.x));
    const fz=['susp','susp90'].includes(st.forkType)?suspZS(st.forkType)+0.004:0.058;
    [a0+0.35].forEach(a=>[-1,1].forEach(s=>stay(v(A(GM.FA,K(GM.n,0.006)),s*fz),at(FA,R+0.001,a,s*(hw+0.0015)))));
    // brakett opp til kronen
    const ac=Math.atan2(up.y,up.x),cr=v(A(GM.CR,K(GM.d,-0.002)));if(GM.a2c-R<0.08)box(at(FA,R+dep*0.5+0.001,ac,0),v(A(GM.FA,K(up,GM.a2c-0.004)),0),0.012,0.003,M.dark);
  }else{
    // clip-on bak: kort skjerm som henger i en stag fra setepinnen
    const R2=wd.out+0.03,a0=Math.PI*0.42,a1=Math.PI*0.98;shell(RA,R2,a0,a1,Math.max(0.03,hw),dep*0.9,fm);
    const sp=v(A(GM.STT,K(GM.s,0.035))),fa=at(RA,R2+dep*0.45,Math.PI*0.5,0);
    const cl=cyl(sp.clone().addScaledVector(v(GM.s),-0.012),sp.clone().addScaledVector(v(GM.s),0.012),0.0175,M.dark,24);bolt(sp.clone().add(new V3(-0.018,0,0)),new V3(-1,0,0),0.003,M.bolts);
    tube([sp.clone().add(new V3(-0.016,0,0)),sp.clone().lerp(fa,0.5).add(new V3(-0.012,0.01,0)),fa],0.0055,M.dark,24,false,null,12)}
}
function kickstand(){if(st.kick!=='side')return;
  const wd=wheelDims(),mount=A(GM.RA,K(U2(Sb(GM.BB,GM.RA)),0.1)),gy=GM.RA.y-wd.out+0.006;
  const top=v(mount,0.05),foot=new V3(mount.x-0.12,gy,0.2);cyl(top,foot,0.007,M.kick,16,0.009);const ft=rbox(0.04,0.006,0.03,0.003,M.kick);ft.position.copy(foot);
  const pl=rbox(0.05,0.02,0.012,0.004,M.kick);pl.position.copy(top);bolt(top.clone().add(new V3(0,0,0.008)),new V3(0,0,1),0.005,M.bolts)}

/* ---------- wirer og slanger ---------- */
// kabelføring: ext = utvendig, semi = inn i hodestammen og ut ved krankboksen, int = helt intern ut ved dropoutene, hidden = gjennom styrelageret (og styret når cockpiten er integrert)
function cables(){
  const hyd=t=>t==='hyd',HTT=GM.HTT,up=GM.up,n=GM.n,T=GM.T,R=st.geo.route||'ext',integ=st.stemType==='integrated'&&!!BARS[st.barType].drop;
  const route=(pts,r,m)=>tube(pts,r,m,Math.max(40,pts.length*18),false,null,10);
  const hm=t=>hyd(t)?M.hose:M.housing,hr=t=>hyd(t)?0.0026:0.0025;
  const inner=R!=='ext';
  // inngang: port på siden av hodestammen, eller toppen av styrelageret (hidden)
  const entry=(s,dh=0)=>{if(R==='hidden'){const p=v(A(A(HTT,K(up,0.008+st.spacers/1000)),K(n,0.021)),s*0.006+dh*0.4);return{p}}
    const P=ANCH.portHT(s);P.p.addScaledVector(v(up),dh);const q=port(P);return{p:q}};
  // jevn bue fra hendelen, frem og ned foran hodestammen og inn i porten fra forsiden
  const leverTo=(a,E)=>{const pp=E.p,sz=Math.sign(pp.z)||1,hid=R==='hidden';
    return hid?[a,a.clone().add(new V3(0.04,-0.035,-Math.sign(a.z)*Math.min(0.05,Math.abs(a.z)*0.2))),new V3(pp.x+0.05,pp.y+0.025,pp.z+sz*0.012),new V3(pp.x+0.016,pp.y+0.01,pp.z),pp]
      :[a,a.clone().add(new V3(0.045,-0.05,-Math.sign(a.z)*Math.min(0.06,Math.abs(a.z)*0.25))),new V3(pp.x+0.075,pp.y+0.03,sz*Math.max(0.04,Math.abs(pp.z)+0.02)),new V3(pp.x+0.025,pp.y+0.002,pp.z+sz*0.012),pp]};
  // forbrems: alltid langs gaffelen, unntatt helt skjult (integrert cockpit) der slangen går inne i gaffelen
  const front=ANCH.leverF;
  if(ANCH.brakeF){const m=hm(st.brakeF),z=0.03,leg=frontLeg();
    if(R==='hidden'&&integ&&['hyd','mech'].includes(st.brakeF)){const pp=port({p:v(A(A(GM.FA,K(leg,0.13)),K(GM.n,-0.012)),0.05),nrm:new V3(0,0,1)});route([pp,pp.clone().add(v(K(leg,-0.04))).setZ(0.058),ANCH.brakeF],hr(st.brakeF),m)}
    else if(front){const pts=[front,front.clone().add(new V3(0.09,-0.06,-0.03)),v(A(A(HTT,K(n,0.07)),K(up,0.03)),z+0.01)];if(!ANCH.brakeFIn||st.brakeF==='drum')pts.push(v(A(GM.CR,K(n,0.04)),z+0.035));
      if(['hyd','mech'].includes(st.brakeF))pts.push(v(A(A(GM.CR,K(leg,-0.12)),K(GM.n,-0.03)),0.062),v(A(A(GM.FA,K(leg,0.12)),K(GM.n,-0.03)),0.062));
      if(ANCH.brakeFIn)pts.push(ANCH.brakeFIn);pts.push(ANCH.brakeF);route(pts,hr(st.brakeF),m)}}
  // bakbrems
  const rear=ANCH.leverR,discR=['hyd','mech'].includes(st.brakeR);
  if(ANCH.brakeR){const m=hm(st.brakeR),r=hr(st.brakeR);
    if(!inner||!discR){if(rear){const tt=GM.ttDir,dn=Rot(tt,-Math.PI/2);
      const pts=[rear,rear.clone().add(new V3(0.1,-0.07,0.02)),v(A(A(HTT,K(n,0.06)),K(up,0.02)),-0.02),v(A(A(GM.TTF,K(tt,-0.06)),K(dn,T.tt/2+0.004)),0.008),v(A(A(GM.SC,K(tt,0.08)),K(dn,T.tt/2+0.004)),0.008),
        v(A(GM.SST,p2(-0.01,-0.02)),0.03)];if(!rimBrake(false))pts.push(v(M2(GM.SST,GM.RA,.5),0.05));if(ANCH.brakeRIn)pts.push(ANCH.brakeRIn);pts.push(ANCH.brakeR);route(pts,r,m)}}
    else{const E=entry(-1);if(rear&&!integ)route(leverTo(rear,E),r,m);
      if(R==='semi'){const q=port(ANCH.portBB(1));route([q,v(A(GM.BB,p2(-0.03,-0.035)),0.03),v(M2(GM.BB,GM.RA,.35),0.056).add(new V3(0,-0.016,0)),v(M2(GM.BB,GM.RA,.75),0.066).add(new V3(0,-0.012,0)),ANCH.brakeR],r,m)}
      else{const q=port(ANCH.portCS(1,0.16));route([q,q.clone().add(new V3(0.0,0.02,0.004)),ANCH.brakeR],r,m)}}}
  // bakgir (Di2: tynn elektrisk ledning i stedet for wirestrømpe, SRAM AXS: ingen kabel)
  const DE=DRIVES[st.drive].e,sR=DE==='di2'?0.0014:0.0025,sM=DE==='di2'?M.black:M.housing;
  const sh=ANCH.shift,dst=ANCH.der||ANCH.hubShift;
  if(sh&&dst){
    if(!inner||!ANCH.der){const dd=U2(Sb(GM.DTF,GM.BB)),dn=Rot(dd,-Math.PI/2);
      route([sh,sh.clone().add(new V3(0.1,-0.08,0.03)),v(A(A(GM.HTB,K(n,0.05)),K(up,0.02)),-0.015),v(A(A(GM.DTF,K(dd,-0.08)),K(dn,GM.dtH(0.85)+0.004)),-0.008),v(A(K(dd,0.08),K(dn,GM.dtH(0.1)+0.004)),-0.01),v(A(GM.BB,p2(-0.03,-0.03)),-0.03),v(M2(GM.BB,GM.RA,.5),-0.05),...(ANCH.derIn?[ANCH.derIn]:[]),dst],sR,sM)}
    else{const E=entry(-1,-0.016);if(!integ)route(leverTo(sh,E),sR,sM);
      if(R==='semi'){const q=port(ANCH.portBB(-1));route([q,v(A(GM.BB,p2(-0.03,-0.035)),-0.03),v(M2(GM.BB,GM.RA,.4),-0.058).add(new V3(0,0.016,0)),v(M2(GM.BB,GM.RA,.85),-0.068).add(new V3(0,0.012,0)),...(ANCH.derIn?[ANCH.derIn]:[]),dst],sR,sM)}
      else{const q=port(ANCH.portCS(-1,0.075));route(ANCH.derIn?[q,q.clone().lerp(ANCH.derIn,0.5).add(new V3(0,0.004,-0.006)),ANCH.derIn,dst]:[q,q.clone().add(new V3(-0.02,-0.01,-0.012)),dst.clone().add(new V3(0.012,0.02,0)),dst],sR,sM)}}}
  // forgir
  if(ANCH.shiftF&&ANCH.fd){const f=ANCH.shiftF;
    if(!inner){const dd=U2(Sb(GM.DTF,GM.BB)),dn=Rot(dd,-Math.PI/2);
      route([f,f.clone().add(new V3(0.1,-0.08,-0.03)),v(A(A(GM.HTB,K(n,0.05)),K(up,0.02)),0.015),v(A(A(GM.DTF,K(dd,-0.08)),K(dn,GM.dtH(0.85)+0.004)),0.008),v(A(K(dd,0.08),K(dn,GM.dtH(0.1)+0.004)),0.01),v(A(GM.BB,p2(-0.025,-0.032)),0.0),v(A(K(GM.s,0.05),p2(-0.024,0)),0.005),ANCH.fd],sR,sM)}
    else{const E=entry(1);if(!integ)route(leverTo(f,E),sR,sM);
      const sp=K(GM.s,pitchR(DRIVES[st.drive].ring[0])-0.01),q=port({p:v(A(sp,p2(-(GM.tubes.st?ip(GM.tubes.st.W,0.4):T.st/2)+0.0004,0)),-0.004),nrm:new V3(-1,0,0)});route([q,q.clone().add(new V3(-0.004,0.02,-0.01)),ANCH.fd],sR,sM)}}
}

/* ===================== KAMERA ===================== */
const cam={theta:0.75,phi:1.27,r:3.1,target:new V3(0,0.55,0),spin:false};let tween=null;
function setCam(){const t=cam.target;camera.position.set(t.x+cam.r*Math.sin(cam.phi)*Math.sin(cam.theta),t.y+cam.r*Math.cos(cam.phi),t.z+cam.r*Math.sin(cam.phi)*Math.cos(cam.theta));camera.lookAt(t);
  camera.near=Math.max(0.003,cam.r*0.02);camera.updateProjectionMatrix()}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function animTo(th,ph,r,tg){let d=th;while(d-cam.theta>Math.PI)d-=2*Math.PI;while(cam.theta-d>Math.PI)d+=2*Math.PI;setSpin(false);
  const to={th:d,ph,r,tg:tg?tg.clone():cam.target.clone()};if(reduce){cam.theta=to.th;cam.phi=to.ph;cam.r=to.r;cam.target.copy(to.tg);return}
  tween={from:{th:cam.theta,ph:cam.phi,r:cam.r,tg:cam.target.clone()},to,t0:performance.now()}}
function goView(k){const V={q:[0.75,1.27,3.1],r:[0,1.52,3.0],l:[Math.PI,1.52,3.0],f:[Math.PI/2,1.42,3.1],t:[0.3,0.35,3.2]}[k];animTo(V[0],V[1],V[2],new V3(0,0.55,0))}
function focusPart(k){const p=FOCUS[k]||FOCUS[{brakeF:'hubF',brakeR:'hubR'}[k]];if(!p)return;const sideTh={fork:Math.PI-0.3,brakeF:Math.PI-0.5,brakeR:Math.PI-0.6,hubF:Math.PI-0.4,hubR:Math.PI-0.5,cassette:0.4,crank:0.5,cockpit:1.2,saddle:0.6,seat:0.6}[k]??cam.theta;
  let ph=1.3,r=k==='cockpit'?0.75:k==='fork'?1.0:k==='saddle'?0.62:0.42,th=sideTh;
  if(k==='fork'){ph=1.45;r=1.15}if(k==='brakeR'&&rimBrake(false)){th=-2.3;ph=1.05;r=0.6}if(k==='brakeF'&&rimBrake(true)){th=2.2;ph=1.1;r=0.6}
  animTo(th,ph,r,p)}
function setSpin(on){cam.spin=on;const b=document.querySelector('[data-spin]');if(b)b.setAttribute('aria-pressed',on)}
function loop(){requestAnimationFrame(loop);
  if(needBuild){needBuild=false;build();dirty=true;if(PH.on)photoScene()}
  if(tween){const k=Math.min(1,(performance.now()-tween.t0)/700),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;const f=tween.from,t=tween.to;
    cam.theta=f.th+(t.th-f.th)*e;cam.phi=f.ph+(t.ph-f.ph)*e;cam.r=f.r+(t.r-f.r)*e;cam.target.lerpVectors(f.tg,t.tg,e);if(k>=1)tween=null;dirty=true}
  if(cam.spin){cam.theta+=0.004;dirty=true}
  if(PH.on){photoTick();return}
  if(!dirty)return;dirty=false;   // tegn bare når noe har endret seg
  setCam();render()}
const ptrs=new Map();let pinch0=0,r0=0,mid0=null,lastTap=0,moved=0;
function pan(dx,dy){const h=canvas.clientHeight||1,s=2*cam.r*Math.tan(camera.fov*D2R/2)/h;const right=new V3().setFromMatrixColumn(camera.matrix,0),upv=new V3().setFromMatrixColumn(camera.matrix,1);
  cam.target.addScaledVector(right,-dx*s).addScaledVector(upv,dy*s)}
function zoomAt(f,cx,cy){const rect=canvas.getBoundingClientRect(),nd=new THREE.Vector2(((cx-rect.left)/rect.width)*2-1,-((cy-rect.top)/rect.height)*2+1);
  const ray=new THREE.Raycaster();ray.setFromCamera(nd,camera);const p=camera.position.clone().addScaledVector(ray.ray.direction,cam.r);
  const nr=Math.max(0.06,Math.min(7,cam.r*f));const k=1-nr/cam.r;cam.target.addScaledVector(p.sub(cam.target),k);cam.r=nr}
function pickAt(cx,cy){const rect=canvas.getBoundingClientRect(),nd=new THREE.Vector2(((cx-rect.left)/rect.width)*2-1,-((cy-rect.top)/rect.height)*2+1);
  const ray=new THREE.Raycaster();ray.setFromCamera(nd,camera);const hit=ray.intersectObjects(pickables,false)[0];
  if(hit)animTo(cam.theta,cam.phi,Math.min(cam.r,Math.max(0.18,cam.r*0.35)),hit.point)}
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,b:e.button,sh:e.shiftKey});tween=null;setSpin(false);moved=0;
  if(ptrs.size===2){const [a,b]=[...ptrs.values()];pinch0=Math.hypot(a.x-b.x,a.y-b.y);r0=cam.r;mid0={x:(a.x+b.x)/2,y:(a.y+b.y)/2}}});
canvas.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId))return;dirty=true;const p=ptrs.get(e.pointerId),dx=e.clientX-p.x,dy=e.clientY-p.y;ptrs.set(e.pointerId,{...p,x:e.clientX,y:e.clientY});moved+=Math.abs(dx)+Math.abs(dy);
  if(ptrs.size===1){if(p.b===2||p.sh||e.shiftKey)pan(dx,dy);else{cam.theta-=dx*0.008;cam.phi=Math.max(0.12,Math.min(1.66,cam.phi-dy*0.006))}}
  else if(ptrs.size===2){const [a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y),m={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
    if(pinch0){cam.r=Math.max(0.06,Math.min(7,r0*pinch0/d))}if(mid0){pan(m.x-mid0.x,m.y-mid0.y);mid0=m}}});
const up=e=>{const p=ptrs.get(e.pointerId);ptrs.delete(e.pointerId);pinch0=0;mid0=null;
  if(p&&e.pointerType!=='mouse'&&moved<6){const now=performance.now();if(now-lastTap<320)pickAt(e.clientX,e.clientY);lastTap=now}};
canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
canvas.addEventListener('dblclick',e=>pickAt(e.clientX,e.clientY));
canvas.addEventListener('wheel',e=>{e.preventDefault();dirty=true;zoomAt(Math.exp(e.deltaY*0.0012),e.clientX,e.clientY)},{passive:false});
document.getElementById('views').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;dirty=true;if(b.hasAttribute('data-quality')){setQuality(quality==='high'?'fast':'high');return}if(b.hasAttribute('data-spin')&&PH.on)return;if(b.dataset.view)goView(b.dataset.view);else if(b.dataset.focus)focusPart(b.dataset.focus);else setSpin(!cam.spin)});

/* ===================== TEKST ===================== */
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function colName(c){const m=CLASSIC.find(x=>x[0].toLowerCase()===String(c).toLowerCase());return m?m[1]:c}
function finTxt(f){if(NOCOLOR.includes(f.m))return FINL[f.m];const n=colName(f.c);return `${FINL[f.m]}, ${n}${n!==f.c?' ('+f.c+')':''}${f.m==='fade'?' mot dekorfargen':''}`}
const fmtW=w=>{let t=String(Math.round(w*1000)/1000);if(!t.includes('.'))t+='.0';if(t.split('.')[1].length<2)t+='0';return t.replace('.',',')},wTxt=w=>w.replace('.',',');
function tireSizeTxt(t,w,x){const T=TIRES[t];return T.mm?`${w==='29'?'700':w==='27.5'?'650B':'559'}×${x}C`:`${(T.m&&T.m[w])||wTxt(w)}×${fmtW(x)}`}
function tireTxt(){return `${TIRES[st.tire].n} ${tireSizeTxt(st.tire,st.geo.wheel,st.tireW)}`}
function forkTxt(){const T=st.forkType;let t=FORKS[T].n;if(T==='rigid')t+=`, ${BLADES[st.forkBlade].toLowerCase()}, ${CROWNS[st.forkCrown].toLowerCase()}`;if(['rigid','truss','dual','springer'].includes(T)&&st.forkLeg!=='std')t+=`, ${LEGS[st.forkLeg].toLowerCase()} bein`;return t}
function bikeName(){return BIKES[st.bike]?BIKES[st.bike].n+(st.geoEdited?' (justert)':''):'Egen geometri'}
function notes(){const n=[],g=st.geo,mounts=g.mounts,G0=computeGeo(),T=st.forkType;
  if((rimBrake(true)||rimBrake(false))&&RIMDB[st.rim]&&RIMDB[st.rim].b==='disc')n.push(`${RIMDB[st.rim].n} er laget for skivebrems og har ingen bremsebane. Velg en felg med bremsebane eller bytt til skivebrems.`);
  if(BIKES[st.bike]&&BIKES[st.bike].wheel!==g.wheel)n.push(`Hjulstørrelsen er endret fra ${wTxt(BIKES[st.bike].wheel)}" til ${wTxt(g.wheel)}". ${+g.wheel<+BIKES[st.bike].wheel?'Mindre hjul senker krankboksen og gir mer pedalslag mot bakken.':'Større hjul krever klaring i ramme og gaffel og hever krankboksen.'} Felgbremser treffer ikke felgen ved annen hjulstørrelse.`);
  if(BIKES[st.bike]&&BIKES[st.bike].est)n.push(`${BIKES[st.bike].n}: geometrien er anslått, ikke hentet fra produsent.`);
  {const mx=!st.geoEdited&&maxTire(st.bike);if(mx&&inchesOf(st.tireW)>mx.in+0.01){const dt=tireSizeTxt(st.tire,st.geo.wheel,st.tireW);n.push(mx.src?`${dt} er bredere enn ${BIKES[st.bike].n} er laget for. Maks er ${mx.mm} mm (${mx.src}).`:`${dt} er trolig bredere enn rammen er laget for (anslått maks ${mx.mm?mx.mm+' mm':fmtW(mx.in)+'"'}). Mål klaringen før montering.`)}}
  if(Math.abs(st.forkDelta)>=5)n.push(`Gaffelen er ${Math.abs(st.forkDelta)} mm ${st.forkDelta<0?'kortere':'lengre'} enn originalen. Effektiv styrevinkel blir ${G0.haEff.toFixed(1).replace('.',',')}° (fra ${String(g.ha).replace('.',',')}°).`);
  if(G0.a2cRaise>0.004)n.push(`${FORKS[T].n} med ${fmtW(st.tireW)}" dekk trenger lengre akse-til-krone enn rammen er tegnet for. Fronten er hevet ${Math.round(G0.a2cRaise*1000)} mm, og styrevinkelen blir ${G0.haEff.toFixed(1).replace('.',',')}°.`);
  if(T==='dual')n.push('Dobbeltkrone: krever lang nok styrerørlengde og stopper for styreutslag, ellers slår beina i overrøret.');
  if(T==='susp90')n.push('90-talls dempegafler har ofte 1 1/8" eller 1" gjenget styrerør og elastomerfjæring; sjekk mål og at elastomerne ikke er stive eller smuldret.');
  if((T==='rigid'&&st.forkBlade!=='straight')&&['hyd','mech'].includes(st.brakeF))n.push('Klassiske buede stålgafler har sjelden skivebremsfeste; se etter en med post mount eller IS-feste.');
  if(['rigid','truss','dual'].includes(T)&&rimBrake(true)&&st.brakeF!=='caliper')n.push('Felgbrems foran krever sokler på gaffelen.');
  if(T==='springer')n.push('Springer: de fleste er laget for cruiserrammer og 26". Sjekk hjulstørrelse, styrerørslengde og bremsefeste.');
  if(st.stemType==='quill'&&g.tubes!=='steel')n.push('Quill-look: et threadless styrerør tar ikke ekte quill-stem. Bruk en ahead-stem med høy rise, eller en quill-adapter.');
  const rimF=rimBrake(true),rimR=rimBrake(false),disc=t=>t==='hyd'||t==='mech';
  if((disc(st.brakeF)||disc(st.brakeR))&&mounts==='rim')n.push('Skivebrems: rammen eller gaffelen i dette oppsettet har ikke skivebremsfeste.');
  if((st.brakeR==='vbrake'||st.brakeR==='canti')&&mounts==='disc')n.push('Felgbrems bak: rammen har ikke sokler for V-brems eller cantilever. Det trengs en adapter eller annen ramme.');
  if((st.brakeF==='vbrake'||st.brakeF==='canti')&&T==='susp')n.push('V-brems eller cantilever foran krever en dempegaffel med sokler; de fleste moderne har bare skivefeste.');
  if(st.lever==='hyd'&&!['hyd'].includes(st.brakeF)&&!['hyd'].includes(st.brakeR))n.push('Hydrauliske hendler passer bare med hydrauliske bremser.');
  if(!['hyd','road'].includes(st.lever)&&(st.brakeF==='hyd'||st.brakeR==='hyd'))n.push('Hydrauliske bremser krever hydrauliske hendler.');
  if((rimF||rimR)&&!['box','mtb','deepv'].includes(st.rim))n.push('Felgbrems krever felg med bremsebane.');
  if(st.brakeR==='none'&&DRIVES[st.drive].t!=='coaster')n.push('Ingen bakbrems og ingen fotbrems: sykkelen må ha to uavhengige bremser for å være lovlig på vei.');
  const D=DRIVES[st.drive];
  if(D.t!=='der'&&g.dropouts==='vert')n.push('Vertikale dropouts: singlespeed og girnav krever kjedestrammer, halvlenke eller eksentrisk løsning.');
  if(D.t==='der'&&D.ring.length===1)n.push(`1×-drivverk: krever krank med smal-bred klinge og nav med riktig frihjulskropp for ${D.cs[2]}-gir (HG, Micro Spline eller XD).`);
  if(D.t==='der'&&D.cs[1]>=50)n.push(`Kassett opp til ${D.cs[1]}T krever girfører laget for det spennet.`);
  if(D.t==='coaster')n.push('Fotbremsnav trenger klemme for bremsearmen på kjedestaget.');
  if(D.t==='hub')n.push('Girnav: sjekk navbredde mot rammens bakre avstand.');
  if(st.crank==='onepiece')n.push('Ett-delt krank krever stort krankboks-skall (amerikansk standard); de fleste MTB-rammer har BSA og trenger annen løsning.');
  if(inchesOf(st.tireW)>=2.5)n.push(`${fmtW(st.tireW)}" dekk: sjekk klaring mot stag og gaffelbue.`);
  if(BARS[st.barType].drop&&['susp','susp90','dual','springer'].includes(st.forkType))n.push('Dropstyre med dempegaffel er uvanlig; vanligvis brukes stiv karbon- eller stålgaffel.');
  if(DRIVES[st.drive].road&&!BARS[st.barType].drop)n.push('Landeveis-gir trenger landeveishendler (STI) på dropstyre, eller egne girhendler for flatt styre.');
  if(!DRIVES[st.drive].road&&BARS[st.barType].drop&&DRIVES[st.drive].t==='der')n.push('MTB-gir med landeveishendler: trekkforholdet passer ofte ikke. Velg et landeveis- eller gravel-drivverk, eller en adapter.');
  if(BARS[st.barType].clamp===.0254)n.push('Nitto Albatross har 25,4 mm klemme; stemmen må passe den.');
  if(['cruiser','bmx','jones'].includes(st.barType)||st.stemAng>20)n.push('Høyt styre: gir- og bremsekabler må som regel byttes til lengre.');
  if(['oil','rainbow'].includes(st.p.frame.m))n.push('Oil slick og regnbue er PVD- eller anodiseringsfinish; på hele rammer er det spesialbestilling.');
  return n}
function listText(){const p=st.p,L=['Sykkelbygg','',
 'RAMME',bikeName(),`Geometri: ${BIKES[st.bike]?BIKES[st.bike].n:'egen'}${st.geoEdited?', justert':''}`,`Farge: ${finTxt(p.frame)}`,`Dekor: ${finTxt(p.accent)}${st.decalStyle!=='none'?`, ${({stripes:'striper ved hodet',panel:'panel på skrårøret',pin:'pinstriping'})[st.decalStyle]}`:''}${['stripes','panel'].includes(st.decalStyle)?`, dekor 2 ${finTxt(p.decal2).toLowerCase()}`:''}${st.decal.trim()?`, tekst "${st.decal.trim().toUpperCase()}"`:''}`,`Styrelager: ${finTxt(p.headset)}`,`Kabelføring: ${({ext:'utvendig',semi:'delvis intern',int:'intern',hidden:'gjennom styrelageret'})[st.geo.route||'ext']}`,`Aksler: ${({qr:'hurtigkobling',ta:'gjennomgående',nut:'mutter'})[st.geo.axle||'qr']}${(st.brakeF==='hyd'||st.brakeF==='mech'||st.brakeR==='hyd'||st.brakeR==='mech')?`, ${st.geo.bmount==='flat'?'flat mount':'post mount'} bremsefeste`:''}`,'',
 'GAFFEL',`${forkTxt()}${st.forkDelta?` (${st.forkDelta>0?'+':''}${st.forkDelta} mm akse-krone)`:''}: ${finTxt(p.fork)}`,['susp','susp90','dual'].includes(st.forkType)?`Standrør: ${finTxt(p.stanch)}`:'','',
 'COCKPIT',`Styre: ${BARS[st.barType].n} (${BARS[st.barType].s}), ${finTxt(p.bar)}`,`Stem: ${STEMS[st.stemType]} ${st.stemLen} mm, ${st.stemAng}°, ${st.spacers} mm spacere, ${finTxt(p.stem)}`,`Håndtak: ${finTxt(p.grips)}`,`Hendler: ${LEVERS[st.lever]}, ${finTxt(p.blevers)}, girhendler ${finTxt(p.levers).toLowerCase()}`,BARS[st.barType].drop?`Hoods: ${finTxt(p.hoods)}, styrebånd ${finTxt(p.grips).toLowerCase()}`:'','',
 'BREMSER',`Foran: ${BRAKES[st.brakeF].n}`,`Bak: ${BRAKES[st.brakeR].n}`,(st.brakeF==='hyd'||st.brakeF==='mech'||st.brakeR==='hyd'||st.brakeR==='mech')?`Skiver: ${st.rotor} mm, ${finTxt(p.rotors)}`:'',`Kalipere/armer: ${finTxt(p.calipers)}`,`Wirestrømper: ${finTxt(p.housing)}`,(st.brakeF==='hyd'||st.brakeR==='hyd')?`Slanger: ${finTxt(p.hose)}`:'','',
 'DRIVVERK',`${DRIVES[st.drive].n} (${DRIVES[st.drive].s})`,`Krank: ${CRANKS[st.crank]}, ${String(st.crankLen).replace('.',',')} mm, ${finTxt(p.crank)}`,`Drev: ${finTxt(p.ring)}`,`Kassett/tannhjul: ${finTxt(p.cassette)}`,`Kjede: ${finTxt(p.chain)}`,DRIVES[st.drive].t==='der'?`Girfører: ${finTxt(p.der)}`:'',`Pedaler: ${PEDALS[st.pedals]}, ${finTxt(p.pedals)}`,'',
 'HJUL',`Dekk: ${tireTxt()}, ${SIDEWALLS[st.wall].n.toLowerCase()} sidevegg`,`Felger: ${RIMS[st.rim]} (${rimTxt(RIMDB[st.rim]||RIMDB.mtb)}), ${finTxt(p.rims)}`,`Eiker: ${st.spokesN} stk, ${finTxt(p.spokes)}`,`Nipler: ${finTxt(p.nipples)}`,`Nav: ${finTxt(p.hubs)}`,'',
 'SETE',`${SADDLES[st.saddle].n} (${SADDLES[st.saddle].s}): ${finTxt(p.saddle)}`,`Setepinne: ${finTxt(p.post)}`,`Klemme: ${finTxt(p.clamp)}`,'',
 'SKRUER',`Skruer: ${finTxt(p.bolts)}`,'',
 'TILBEHØR',st.fender!=='none'?`Skjermer: ${({clip:'Clip-on bak',full:'Fulle'})[st.fender]}, ${finTxt(p.fender)}`:'',st.guard==='yes'?`Kjedebeskytter: ${finTxt(p.guard)}`:'',st.kick==='side'?`Støtte: ${finTxt(p.kick)}`:'',
   st.bottle!=='none'?`Flaskeholder: ${finTxt(p.cage)}${st.bottle==='bottle'?', flaske '+finTxt(p.bottle).toLowerCase():''}`:'',st.bell==='yes'?`Ringeklokke: ${finTxt(p.bell)}`:'',(st.fender==='none'&&st.guard!=='yes'&&st.kick!=='side'&&st.bottle==='none'&&st.bell!=='yes')?'Ingen':''].filter(x=>x!==null&&x!==undefined).filter((x,i,a)=>x!==''||i===1||/^[A-ZÆØÅ]+$/.test(a[i+1]||''));
 const n=notes();if(n.length)L.push('','NOTATER',...n.map(x=>'- '+x));return L.join('\n')}
function renderText(){
  document.getElementById('spec').innerHTML=[['Sykkel',bikeName()],['Gaffel',FORKS[st.forkType].n],['Drivverk',DRIVES[st.drive].n],['Bremser',`${BRAKES[st.brakeF].n} / ${BRAKES[st.brakeR].n}`],['Styre',BARS[st.barType].n],['Dekk',tireTxt()]].map(([a,b])=>`<span>${a} <b>${esc(b)}</b></span>`).join('');
  const n=notes();document.getElementById('notes').innerHTML=`<h3>Verkstednotater</h3>`+(n.length?`<ul>${n.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<span class="hint">Ingen ombyggingspunkter.</span>`);
  document.getElementById('list').textContent=listText();
  try{localStorage.setItem('styler-current',JSON.stringify(st))}catch(e){}
}
function changed(){needBuild=true;renderText()}

/* ===================== KONTROLLER ===================== */
const GEOSL=[['ha','Styrevinkel','°',60,76,.1],['sa','Setevinkel','°',64,77,.1],['stack','Stack','mm',.48,.72,.001],['reach','Reach','mm',.33,.5,.001],['ht','Hodestamme','mm',.08,.22,.001],
 ['st','Setestamme','mm',.32,.58,.001],['cs','Kjedestag','mm',.39,.6,.001],['drop','BB-drop','mm',0,.09,.001],['offset','Gaffeloffset','mm',.025,.065,.001],['ttJoin','Overrør under setestammetopp','mm',0,.16,.001]];
const TABS=[
 {id:'sykkel',name:'Sykkel',items:[{t:'picker'},{t:'geo'}]},
 {id:'ramme',name:'Ramme',items:[{t:'factory'},{t:'paint',k:'frame'},{t:'choice',k:'decalStyle',l:'Dekorstriper',o:[['none','Ingen'],['stripes','Striper ved hodet'],['panel','Panel på skrårøret'],['pin','Pinstriping']]},
   {t:'paint',k:'accent'},{t:'paint',k:'decal2',when:()=>['stripes','panel'].includes(st.decalStyle)},{t:'text',k:'decal',l:'Tekst på skrårøret',h:'Egen tekst i dekorfargen. Produsentlogoer tegnes ikke.'},{t:'paint',k:'headset'},{t:'paint',k:'bolts'}]},
 {id:'gaffel',name:'Gaffel',items:[{t:'cat',k:'forkType',l:'Gaffeltype',c:FORKS},
   {t:'choice',k:'forkBlade',l:'Bladform',o:Object.entries(BLADES),when:()=>st.forkType==='rigid'},
   {t:'choice',k:'forkCrown',l:'Krone',o:Object.entries(CROWNS),when:()=>st.forkType==='rigid'},
   {t:'choice',k:'forkLeg',l:'Tykkelse på beina',o:Object.entries(LEGS),when:()=>['rigid','truss','dual','springer'].includes(st.forkType)},
   {t:'range',k:'forkDelta',l:'Akse til krone, endring',u:'mm',min:-90,max:40,step:5,h:'Kortere gaffel gir brattere styrevinkel og lavere front.'},
   {t:'paint',k:'fork'},{t:'paint',k:'stanch',when:()=>['susp','susp90','dual'].includes(st.forkType)}]},
 {id:'cockpit',name:'Cockpit',items:[{t:'cat',k:'barType',l:'Flate og høye styrer',c:BARS,f:b=>!b.drop},{t:'cat',k:'barType',l:'Dropstyrer (landevei og gravel)',c:BARS,f:b=>!!b.drop},{t:'choice',k:'stemType',l:'Stem',o:Object.entries(STEMS)},{t:'range',k:'stemLen',l:'Stemlengde',u:'mm',min:30,max:130,step:5},
   {t:'range',k:'stemAng',l:'Stemvinkel',u:'°',min:-17,max:45,step:1},{t:'range',k:'spacers',l:'Spacere',u:'mm',min:0,max:50,step:5},{t:'choice',k:'lever',l:'Hendler',o:Object.entries(LEVERS).filter(([k])=>k!=='road'),when:()=>!BARS[st.barType].drop},{t:'note',h:'Dropstyre bruker landeveishendler (STI) med brems og gir i samme hendel.',when:()=>!!BARS[st.barType].drop},
   {t:'paint',k:'bar'},{t:'paint',k:'stem'},{t:'paint',k:'grips'},{t:'paint',k:'hoods',when:()=>!!BARS[st.barType].drop},{t:'paint',k:'blevers'},{t:'paint',k:'levers',when:()=>{const D=DRIVES[st.drive];return D.t==='der'||D.t==='hub'||!!D.shift}}]},
 {id:'bremser',name:'Bremser',items:[{t:'brakeBoth'},{t:'cat',k:'brakeF',l:'Bare forbrems',c:BRAKES},{t:'cat',k:'brakeR',l:'Bare bakbrems',c:BRAKES},{t:'choice',k:'rotor',l:'Skivestørrelse',o:[[160,'160 mm'],[180,'180 mm'],[203,'203 mm']],when:()=>['hyd','mech'].includes(st.brakeF)||['hyd','mech'].includes(st.brakeR)},
   {t:'paint',k:'blevers'},{t:'paint',k:'calipers'},{t:'paint',k:'rotors'},{t:'paint',k:'housing'},{t:'paint',k:'hose'}]},
 {id:'drivverk',name:'Drivverk',items:[{t:'cat',k:'drive',l:'Drivverk',c:DRIVES},{t:'choice',k:'crank',l:'Krank',o:Object.entries(CRANKS)},{t:'choice',k:'crankLen',l:'Kranklengde',o:[[165,'165 mm'],[170,'170 mm'],[172.5,'172,5 mm'],[175,'175 mm']]},
   {t:'choice',k:'pedals',l:'Pedaler',o:Object.entries(PEDALS)},
   {t:'paint',k:'crank'},{t:'paint',k:'ring'},{t:'paint',k:'cassette'},{t:'paint',k:'chain'},{t:'paint',k:'der',when:()=>DRIVES[st.drive].t==='der'},{t:'paint',k:'pedals'}]},
 {id:'hjul',name:'Hjul og dekk',items:[{t:'wheel'},{t:'tire'},{t:'rimpicker'},{t:'choice',k:'spokesN',l:'Antall eiker',o:[[28,'28'],[32,'32'],[36,'36']]},
   {t:'paint',k:'rims'},{t:'paint',k:'spokes'},{t:'paint',k:'nipples'},{t:'paint',k:'hubs'}]},
 {id:'sete',name:'Sete',items:[{t:'cat',k:'saddle',l:'Sete',c:SADDLES},{t:'range',k:'saddleH',l:'Setepinne over rammen',u:'mm',min:.04,max:.3,step:.005,scale:1000},{t:'paint',k:'saddle'},{t:'paint',k:'post'},{t:'paint',k:'clamp'}]},
 {id:'tilbehor',name:'Tilbehør',items:[{t:'note',h:'Tilbehør er av som standard. Legg til det du vil ha med.'},
   {t:'choice',k:'fender',l:'Skjermer',o:[['none','Ingen'],['clip','Clip-on bak'],['full','Fulle skjermer']]},{t:'choice',k:'guard',l:'Kjedebeskytter',o:[['no','Ingen'],['yes','Kjedebeskytter']]},
   {t:'choice',k:'kick',l:'Støtte',o:[['none','Ingen'],['side','Sidestøtte']]},{t:'choice',k:'bottle',l:'Flaskeholder',o:[['none','Ingen'],['cage','Flaskeholder'],['bottle','Med flaske']]},
   {t:'choice',k:'bell',l:'Ringeklokke',o:[['no','Ingen'],['yes','Ringeklokke']]},
   {t:'paint',k:'fender',when:()=>st.fender!=='none'},{t:'paint',k:'guard',when:()=>st.guard==='yes'},{t:'paint',k:'kick',when:()=>st.kick!=='none'},
   {t:'paint',k:'cage',when:()=>st.bottle!=='none'},{t:'paint',k:'bottle',when:()=>st.bottle==='bottle'},{t:'paint',k:'bell',when:()=>st.bell==='yes'}]}];
let tab='sykkel',tireFilter=false;const openParts=new Set(['frame']);
function renderTabs(){document.getElementById('tabs').innerHTML=TABS.map(g=>`<button role="tab" aria-selected="${g.id===tab}" data-tab="${g.id}">${g.name}</button>`).join('')}
const dot=f=>NOCOLOR.includes(f.m)?`<i class="dot fx-${f.m}"></i>`:`<i class="dot" style="background:${f.c}"></i>`;
function swatches(k,cur,off){return `<div class="swgs ${off?'off':''}">${PALETTE.map(g=>`<div class="swg"><span>${g.g}</span><div class="sws">${g.c.map(([c,n])=>`<button class="sw" title="${n}" aria-label="${n}" data-k="${k}" data-c="${c}" aria-pressed="${String(cur).toLowerCase()===c.toLowerCase()}" style="background:${c}"></button>`).join('')}</div></div>`).join('')}</div>
  <label class="custom">Egen farge <input type="color" id="c-${k}" data-k="${k}" value="${cur}"> <span>${esc(colName(cur))}</span></label>`}
function pick(k,val,n,s,pressed,dis){return `<button class="chip pick" data-k="${k}" data-v="${val}" aria-pressed="${pressed}" ${dis?'disabled':''}><b>${esc(n)}</b>${s?`<small>${esc(s)}</small>`:''}</button>`}
function renderItem(it){
  if(it.t==='choice')return `<div class="item"><div class="lab">${it.l}</div><div class="chips">${it.o.map(([val,l])=>`<button class="chip" data-k="${it.k}" data-v="${val}" aria-pressed="${String(st[it.k])===String(val)}">${l}</button>`).join('')}</div></div>`;
  if(it.t==='cat')return `<div class="item"><div class="lab">${it.l}</div><div class="picks">${Object.entries(it.c).filter(([,c])=>!it.f||it.f(c)).map(([val,c])=>pick(it.k,val,c.n,c.s,st[it.k]===val)).join('')}</div></div>`;
  if(it.t==='range'){const sc=it.scale||1,val=st[it.k]*sc;return `<div class="item"><label class="lab" for="r-${it.k}">${it.l}<b>${Math.round(val)} ${it.u}</b></label><input type="range" id="r-${it.k}" data-k="${it.k}" data-scale="${sc}" min="${it.min}" max="${it.max}" step="${it.step}" value="${st[it.k]}">${it.h?`<div class="hint">${it.h}</div>`:''}</div>`}
  if(it.t==='paint'){const f=st.p[it.k],P=PARTS[it.k],off=NOCOLOR.includes(f.m);
    return `<details class="part" data-part="${it.k}" ${openParts.has(it.k)?'open':''}><summary>${dot(f)}<span>${P.n}</span><small>${esc(finTxt(f))}</small></summary><div class="pbody">
      <div class="chips">${P.f.map(m=>`<button class="chip sm ${['oil','rainbow'].includes(m)?'fx-'+m:''}" data-pk="${it.k}" data-m="${m}" aria-pressed="${f.m===m}">${FINL[m]}</button>`).join('')}</div>
      ${swatches('p:'+it.k,f.c,off)}${off?`<div class="hint">${FINL[f.m]} har egen farge. Trykk en fargeprøve for å gå over til lakk.</div>`:''}</div></details>`}
  if(it.t==='color')return `<div class="item"><div class="lab">${it.l}<b>${esc(colName(st[it.k]))}</b></div>${swatches(it.k,st[it.k],false)}<div class="hint">Produsentens farger: ${esc(TIRES[st.tire].w)}.</div></div>`;
  if(it.t==='text')return `<div class="item"><label class="lab" for="t-${it.k}">${it.l}</label><input type="text" id="t-${it.k}" data-k="${it.k}" value="${esc(st[it.k])}" maxlength="14">${it.h?`<div class="hint">${it.h}</div>`:''}</div>`;
  if(it.t==='note')return `<div class="hint">${esc(it.h)}</div>`;
  if(it.t==='factory'){const f=FACTORY[st.bike];return `<div class="item"><div class="lab">Fabrikkfarger<b>${esc(BIKES[st.bike]?BIKES[st.bike].n:'Egen ramme')}</b></div>${f?`<div class="row"><button class="chip" data-factory="1">${swatch(f.p.frame)} Bruk ${esc(f.name)}</button></div><div class="hint">${f.typical?'Typisk farge for denne typen. ':''}Kilde: ${esc(f.src)}. Fargekoden er tilnærmet.</div>`:`<div class="hint">Ingen fabrikkfarge registrert for denne rammen.</div>`}<div class="hint">Farger og striper, uten produsentlogoer.</div></div>`}
  if(it.t==='wheel'){const orig=BIKES[st.bike]?BIKES[st.bike].wheel:null;return `<div class="item"><div class="lab">Hjulstørrelse${orig?`<b>Rammen er laget for ${wTxt(orig)}"</b>`:''}</div><div class="chips">${[['26','26"'],['27.5','27,5" (650B)'],['29','29" / 28" (622)']].map(([val,l])=>`<button class="chip" data-wheel="${val}" aria-pressed="${st.geo.wheel===val}">${l}</button>`).join('')}</div></div>`}
  if(it.t==='tire'){const w=st.geo.wheel,mk=t=>(TIRES[t].m&&TIRES[t].m[w])||wTxt(w),walls=t=>[...new Set(tireSizes(t,w).flatMap(x=>tireWalls(t,w,x)))];
    const list=Object.keys(TIRES).filter(t=>!tireFilter||walls(t).some(x=>x!=='black'));
    const cur=TIRES[st.tire],xs=tireSizes(st.tire,w),ws=tireWalls(st.tire,w,st.tireW);
    return `<div class="item"><div class="lab">Dekk for ${wTxt(w)}" hjul<b>${esc(tireTxt())}</b></div>
    <div class="chips"><button class="chip sm" data-tfilter="1" aria-pressed="${tireFilter}">Bare dekk med farget sidevegg</button></div>
    <div class="picks">${list.map(t=>{const sz=tireSizes(t,w),wl=walls(t);return `<button class="chip pick" data-k="tire" data-v="${t}" aria-pressed="${st.tire===t}" ${sz.length?'':'disabled'}><b>${esc(TIRES[t].n)}</b><small>${sz.length?sz.map(x=>mk(t)+'×'+fmtW(x)).join(', '):'Ikke i '+wTxt(w)+'"'}</small>${sz.length?`<span class="wl">${wl.map(x=>`<i class="dot" title="${SIDEWALLS[x].n}" style="background:${SIDEWALLS[x].c}${SIDEWALLS[x].stripe?`;box-shadow:inset 0 0 0 3px ${SIDEWALLS[x].stripe}`:''}"></i>`).join('')}</span>`:''}</button>`}).join('')}</div>
    <div class="lab">Bredde</div><div class="chips">${xs.map(x=>`<button class="chip sm" data-k="tireW" data-v="${x}" aria-pressed="${+st.tireW===x}">${mk(st.tire)}×${fmtW(x)}"</button>`).join('')}</div>
    <div class="lab">Sidevegg<b>${esc(SIDEWALLS[st.wall].n)}</b></div><div class="chips">${ws.map(x=>`<button class="chip sm wallc" data-k="wall" data-v="${x}" aria-pressed="${st.wall===x}"><i class="dot" style="background:${SIDEWALLS[x].c}${SIDEWALLS[x].stripe?`;box-shadow:inset 0 0 0 3px ${SIDEWALLS[x].stripe}`:''}"></i>${SIDEWALLS[x].n}</button>`).join('')}</div>
    <div class="hint">${cur.gen?'Generisk cruiserdekk: finnes fra flere produsenter i disse fargene.':ws.length===1&&ws[0]==='black'?'Denne bredden selges bare med sort sidevegg. Prøv en annen bredde eller et annet dekk for tanwall.':'Størrelser og sidevegger slik de selges.'}${cur.reflex?' Schwalbe-dekkene har refleksstripe.':''}</div></div>`}
  if(it.t==='picker'){const b=BIKES[st.bike],f=FACTORY[st.bike],kit=KIT[st.bike];
    const status=st.geoEdited?'Egen geometri, justert fra '+(b?b.n:'ukjent'):b?`Geometri: ${b.src}${b.est?'. Formen er anslått.':''}`:'';
    return `<div class="item"><label class="lab" for="bike-q">Velg sykkel<b>${Object.keys(BIKES).length} modeller og typer</b></label>
    ${pkMarkup('bike',f?swatch(f.p.frame):'',bikeName(),b?`${b.g} · ${b.y}`:'')}
    <div class="hint">${esc(status)}</div>
    ${f?`<div class="hint">Fabrikkfarge: <b>${esc(f.name)}</b>${f.typical?' (typisk farge)':''}. Kilde: ${esc(f.src)}. Fargekoden er tilnærmet.</div>`:''}
    <div class="hint">${kit&&kit.src?`Standarddeler: ${esc(kit.src)}. Dekk og deler vises med nærmeste modell i appen.`:'Standarddelene er typiske for denne typen sykkel.'}</div></div>`}
  if(it.t==='brakeBoth'){const same=st.brakeF===st.brakeR;
    return `<div class="item"><div class="lab">Bremser foran og bak<b>${same?esc(BRAKES[st.brakeF].n):'Ulik foran og bak'}</b></div><div class="picks">${['hyd','mech','vbrake','canti','caliper'].map(k=>`<button class="chip pick" data-bb="${k}" aria-pressed="${same&&st.brakeF===k}"><b>${esc(BRAKES[k].n)}</b><small>${esc(BRAKES[k].s)}</small></button>`).join('')}</div>
    <div class="hint">Setter samme bremsetype foran og bak. Skivene fjernes ved felgbrems, og felgen får bremsebane.</div></div>`}
  if(it.t==='rimpicker'){const r=RIMDB[st.rim]||RIMDB.mtb,w=st.geo.wheel,nFit=Object.values(RIMDB).filter(x=>rimFits(x,w)).length,rb=rimBrake(true)||rimBrake(false);
    return `<div class="item"><label class="lab" for="rim-q">Felg<b>${nFit} felger i ${wTxt(w)}"</b></label>
    ${pkMarkup('rim',`<i class="dot" style="background:${r.mat==='carbon'?'#1b1c1e':'linear-gradient(160deg,#f6f7f8,#8f989f 45%,#fff 55%,#5d666e)'}"></i>`,r.n,rimTxt(r))}
    <div class="hint">${r.gen?'Generisk felgform.':`Mål fra ${esc(r.src)}.`} Listen viser felger som finnes i ${wTxt(w)}". Merkelogoer tegnes ikke.${rb&&r.b==='disc'?' <b>Denne felgen har ingen bremsebane og passer ikke til felgbrems.</b>':''}</div></div>`}
  if(it.t==='geo'){const g=st.geo;return `<details class="part" data-part="geo" ${openParts.has('geo')?'open':''}><summary><span>Juster geometri og rammeform</span><small>Lag en hvilken som helst sykkel</small></summary><div class="pbody">
     ${GEOSL.map(([k,l,u,mn,mx,stp])=>{const val=g[k],show=u==='mm'?Math.round(val*1000)+' mm':(+val).toFixed(1).replace('.',',')+'°';return `<div class="item"><label class="lab" for="g-${k}">${l}<b>${show}</b></label><input type="range" id="g-${k}" data-g="${k}" min="${mn}" max="${mx}" step="${stp}" value="${val}"></div>`}).join('')}
     ${[['wheel','Hjulstørrelse',[['26','26"'],['27.5','27,5"'],['29','29"']]],['tubes','Rørsett',Object.entries(TUBESETS).map(([k,t])=>[k,t.n])],['stays','Setestag',[['std','Vanlig'],['triple','Triple triangle (GT)'],['dropped','Senket'],['twinlat','Twin laterals'],['cantilever','Cantilever']]],
       ['tt','Overrør',[['straight','Rett'],['bow','Buet']]],['dt','Skrårør',[['straight','Rett'],['bow','Buet']]],['gussets','Forsterkning ved hodestammen',[[false,'Nei'],[true,'Ja']]],['dropouts','Dropouts',[['vert','Vertikale'],['horiz','Horisontale']]],['mounts','Bremsefester',[['disc','Skive'],['rim','Felg'],['both','Begge'],['coaster','Ingen (fotbrems)']]],
       ['bmount','Skivebremsfeste',[['post','Post mount'],['flat','Flat mount']]],['route','Kabelføring',[['ext','Utvendig'],['semi','Delvis intern'],['int','Intern'],['hidden','Gjennom styrelageret']]],
       ['axle','Aksel',[['qr','Hurtigkobling'],['ta','Gjennomgående'],['nut','Mutter']]],['post','Setepinne',[['round','Rund'],['aero','Aero (D-formet)'],['vcls','Delt bladfjær (VCLS)']]],
       ['clamp','Seteklemme',[['collar','Utvendig'],['hidden','Skjult']]],['ttFlat','Flatt overrør',[[false,'Nei'],[true,'Ja']]],['ttBoss','Bolter for overrørsveske',[[false,'Nei'],[true,'Ja']]]]
       .map(([k,l,o])=>`<div class="item"><div class="lab">${l}</div><div class="chips">${o.map(([val,t])=>`<button class="chip sm" data-gc="${k}" data-v="${val}" aria-pressed="${String(g[k])===String(val)}">${t}</button>`).join('')}</div></div>`).join('')}
     </div></details>`}
  return '';
}
function renderGroup(){const tb=TABS.find(x=>x.id===tab);document.getElementById('group').innerHTML=tb.items.filter(it=>!it.when||it.when()).map(renderItem).join('')}
const grp=document.getElementById('group');
function swatch(f){return NOCOLOR.includes(f.m)?`<i class="dot fx-${f.m}"></i>`:`<i class="dot" style="background:${f.c}"></i>`}
// søkbare nedtrekkslister (sykkel og felg). Listen ligger i vanlig flyt under søkefeltet, så den virker i alle nettlesere og ikke havner bak tastaturet
const PK={bike:{open:false,q:'',act:0,items:[]},rim:{open:false,q:'',act:0,items:[]}};
const normTxt=t=>String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/æ/g,'ae').replace(/ø/g,'o');
const GROUP_ORDER=['Moderne hardtail','Retro MTB','Cruiser og klunker','Gravel','Landevei'];
const GROUP_WORDS={'Moderne hardtail':'mtb terreng hardtail stisykkel','Retro MTB':'mtb terreng retro 90-tallet 26','Cruiser og klunker':'cruiser klunker clunker bmx strand','Gravel':'gravel grus eventyr','Landevei':'landevei racer road'};
const toksOf=q=>normTxt(q).split(/\s+/).filter(Boolean);
function bikeItems(q){const out=[];
  for(const [k,b] of Object.entries(BIKES))out.push({k,g:b.g,n:b.n,meta:`${b.y}${b.est?' · anslått form':''}`,dot:FACTORY[k]?swatch(FACTORY[k].p.frame):'',hay:normTxt([b.n,b.y,b.g,GROUP_WORDS[b.g],b.wheel+'"',FACTORY[k]?FACTORY[k].name:''].join(' '))});
  const t=toksOf(q);return out.filter(o=>t.every(x=>o.hay.includes(x))).sort((a,b)=>GROUP_ORDER.indexOf(a.g)-GROUP_ORDER.indexOf(b.g))}
function rimItems(q){const w=st.geo.wheel,out=[];
  for(const [k,r] of Object.entries(RIMDB)){if(!rimFits(r,w))continue;
    out.push({k,g:r.g,n:r.n,meta:rimTxt(r),dot:`<i class="dot" style="background:${r.mat==='carbon'?'#1b1c1e':'linear-gradient(160deg,#f6f7f8,#8f989f 45%,#fff 55%,#5d666e)'}"></i>`,
      hay:normTxt([r.n,r.g,r.mat==='carbon'?'karbon carbon':'alu aluminium',r.d+' mm',r.d+'mm',r.b==='disc'?'skivebrems disc':r.b==='rim'?'felgbrems rim':'',r.prof==='aero'?'aero dyp':r.prof==='v'?'dyp v':'',r.g==='Klassisk og retro'?'klassisk retro fixie':''].join(' '))})}
  const t=toksOf(q);return out.filter(o=>t.every(x=>o.hay.includes(x))).sort((a,b)=>RIM_ORDER.indexOf(a.g)-RIM_ORDER.indexOf(b.g))}
const PKDEF={
 bike:{label:'Sykler',ph:'Søk: merke, modell, gravel, 29 …',items:bikeItems,isSel:o=>st.bike===o.k&&!st.geoEdited,pick:o=>selectBike(o.k),empty:'Ingen treff. Prøv merke, modell eller type.'},
 rim:{label:'Felger',ph:'Søk: Zipp, DT Swiss, ENVE, karbon, 40 mm …',items:rimItems,isSel:o=>st.rim===o.k,pick:o=>selectRim(o.k),empty:'Ingen felger passer søket i denne hjulstørrelsen.'}};
const SEARCH_IC='<svg class="combo-ic" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13 13l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
function pkMarkup(pk,dot,name,small){const P=PK[pk],D=PKDEF[pk];
  return `<div class="combo" data-pk="${pk}" id="combo-${pk}">
      <button type="button" class="combo-cur" aria-controls="${pk}-list" aria-expanded="${P.open}">${dot}<span><b>${esc(name)}</b><small>${esc(small)}</small></span><i aria-hidden="true">${P.open?'▴':'▾'}</i></button>
      <div class="combo-q">${SEARCH_IC}<input type="text" class="combo-in" id="${pk}-q" role="combobox" inputmode="search" enterkeyhint="search" aria-expanded="${P.open}" aria-controls="${pk}-list" aria-autocomplete="list" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${D.ph}" value="${esc(P.q)}"><button type="button" class="combo-x" aria-label="Tøm søket" ${P.q?'':'hidden'}>×</button></div>
      <ul class="combo-list" id="${pk}-list" role="listbox" aria-label="${D.label}" ${P.open?'':'hidden'}>${P.open?pkList(pk):''}</ul>
    </div>`}
function pkList(pk){const P=PK[pk],D=PKDEF[pk];P.items=D.items(P.q);if(P.act>=P.items.length)P.act=Math.max(0,P.items.length-1);
  if(!P.items.length)return `<li class="empty" role="option" aria-disabled="true">${D.empty}</li>`;
  let g='',h='';P.items.forEach((o,i)=>{if(o.g!==g){g=o.g;h+=`<li class="grp" role="presentation">${esc(g)}</li>`}const sel=D.isSel(o);
    h+=`<li role="option" id="${pk}-opt-${i}" data-i="${i}" aria-selected="${sel}" class="${i===P.act?'act':''}">${o.dot||'<i class="dot"></i>'}<span><b>${esc(o.n)}</b><small>${esc(o.meta)}</small></span>${sel?'<em>Valgt</em>':''}</li>`});return h}
const pkEl=(pk,sel)=>{const c=document.getElementById('combo-'+pk);return c?c.querySelector(sel):null};
function pkRefresh(pk){const P=PK[pk],ul=pkEl(pk,'.combo-list');if(!ul)return;ul.innerHTML=pkList(pk);const q=pkEl(pk,'.combo-in');if(q)q.setAttribute('aria-activedescendant',P.items.length?`${pk}-opt-${P.act}`:'');
  const x=pkEl(pk,'.combo-x');if(x)x.hidden=!P.q;const a=ul.querySelector('.act');if(a&&P.q)a.scrollIntoView({block:'nearest'})}
const narrow=()=>matchMedia('(max-width:959px)').matches;
function pkOpen(pk,on,scroll){const P=PK[pk];P.open=on;const ul=pkEl(pk,'.combo-list'),q=pkEl(pk,'.combo-in'),cur=pkEl(pk,'.combo-cur');if(!ul)return;
  ul.hidden=!on;if(q)q.setAttribute('aria-expanded',on);if(cur){cur.setAttribute('aria-expanded',on);const i=cur.querySelector('i[aria-hidden]');if(i)i.textContent=on?'▴':'▾'}
  document.body.classList.toggle('picking',Object.values(PK).some(x=>x.open)&&narrow());
  if(on){const idx=PKDEF[pk].items('').findIndex(o=>PKDEF[pk].isSel(o));P.act=P.q?0:Math.max(0,idx);pkRefresh(pk);
    if(scroll&&narrow()){const c=document.getElementById('combo-'+pk);setTimeout(()=>c&&c.scrollIntoView({block:'start',behavior:'smooth'}),60)}
    else if(!narrow()){const a=ul.querySelector('.act');if(a)ul.scrollTop=Math.max(0,a.offsetTop-ul.clientHeight/2)}}}
function pkSet(pk,v){const P=PK[pk];if(v===P.q&&P.open)return;P.q=v;P.act=0;if(!P.open)pkOpen(pk,true);else pkRefresh(pk)}
function pkClose(pk){PK[pk].open=false;PK[pk].q='';document.body.classList.toggle('picking',Object.values(PK).some(x=>x.open)&&narrow())}
function selectBike(k){const prev=clone(st);st.bike=k;st.finn=null;st.geo=geoOf(k);st.geoEdited=false;applyStock(k);
  pkClose('bike');renderGroup();changed();const f=FACTORY[k];toast(`${bikeName()} i ${f?f.name:'standardfarge'}`,prev)}
function selectRim(k){const prev=clone(st),r=RIMDB[k];st.rim=k;
  if(!r.gen)st.p.rims=r.mat==='carbon'?P_('matt','#141516'):r.g==='Klassisk og retro'?P_('alu'):P_('matt','#141516');
  pkClose('rim');renderGroup();changed();toast(`${r.n} lagt på`,prev)}
const pkOf=t=>{const b=t&&t.closest?t.closest('.combo[data-pk]'):null;return b?b.dataset.pk:null};
grp.addEventListener('click',e=>{const t=e.target,pk=pkOf(t);if(!pk)return;const P=PK[pk];
  if(t.closest('.combo-cur')){e.stopPropagation();pkOpen(pk,!P.open,true);if(P.open&&!narrow()){const q=pkEl(pk,'.combo-in');if(q)q.focus()}return}
  if(t.closest('.combo-x')){e.stopPropagation();const q=pkEl(pk,'.combo-in');if(q){q.value='';q.focus()}pkSet(pk,'');return}
  if(t.closest('.combo-in')){e.stopPropagation();if(!P.open)pkOpen(pk,true,true);return}
  const li=t.closest('.combo-list [data-i]');if(li){e.stopPropagation();const o=P.items[+li.dataset.i];if(o)PKDEF[pk].pick(o)}},true);
grp.addEventListener('focusin',e=>{const t=e.target;if(t.classList&&t.classList.contains('combo-in')){const pk=pkOf(t);if(pk&&!PK[pk].open)pkOpen(pk,true,true)}});
// input, keyup og compositionend: noen mobiltastatur sender ikke input-hendelser for hvert tegn
['input','keyup','compositionend','search'].forEach(ev=>grp.addEventListener(ev,e=>{const t=e.target;if(!t.classList||!t.classList.contains('combo-in'))return;if(ev==='keyup'&&['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key))return;pkSet(pkOf(t),t.value)}));
grp.addEventListener('keydown',e=>{const t=e.target;if(!t.classList||!t.classList.contains('combo-in'))return;const pk=pkOf(t),P=PK[pk],n=P.items.length,ul=pkEl(pk,'.combo-list');
  const vis=()=>{const a=ul&&ul.querySelector('.act');if(a)a.scrollIntoView({block:'nearest'})};
  if(e.key==='ArrowDown'){e.preventDefault();if(!P.open){pkOpen(pk,true);return}P.act=Math.min(n-1,P.act+1);pkRefresh(pk);vis()}
  else if(e.key==='ArrowUp'){e.preventDefault();P.act=Math.max(0,P.act-1);pkRefresh(pk);vis()}
  else if(e.key==='Enter'){e.preventDefault();if(!P.open){pkOpen(pk,true);return}const o=P.items[P.act];if(o)PKDEF[pk].pick(o)}
  else if(e.key==='Escape'){e.preventDefault();if(P.q){t.value='';pkSet(pk,'')}else pkOpen(pk,false)}});
document.addEventListener('click',e=>{for(const pk in PK)if(PK[pk].open&&!e.target.closest('#combo-'+pk))pkOpen(pk,false)});

// felgbrems trenger bremsebane: bytt til en generisk felg med bremsebane hvis valgt felg bare er for skivebrems
function brakeRimFix(){const r=RIMDB[st.rim];if((rimBrake(true)||rimBrake(false))&&r&&r.b==='disc'){st.rim=r.prof==='aero'&&st.geo.wheel!=='26'?'aero':'mtb';return ` Felgen er byttet til ${RIMDB[st.rim].n.toLowerCase()} med bremsebane.`}return ''}
// hendeltype følger styre og bremser
function syncLever(){if(BARS[st.barType].drop){st.lever='road';return}const anyHyd=st.brakeF==='hyd'||st.brakeR==='hyd';if(anyHyd)st.lever='hyd';else if(st.lever==='hyd'||st.lever==='road')st.lever='mtb'}
document.getElementById('tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;renderTabs();renderGroup()});
grp.addEventListener('change',e=>{if(e.target.type==='color'){clearTimeout(ct);ct=setTimeout(renderGroup,50)}});
grp.addEventListener('toggle',e=>{const d=e.target;if(d.dataset&&d.dataset.part){d.open?openParts.add(d.dataset.part):openParts.delete(d.dataset.part)}},true);
grp.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.dataset.bike){selectBike(b.dataset.bike,b.dataset.finn||null);return}
  if(b.dataset.bb){const prev=clone(st);st.brakeF=st.brakeR=b.dataset.bb;const msg=brakeRimFix();syncLever();renderGroup();changed();toast(`${BRAKES[b.dataset.bb].n} foran og bak.${msg}`,prev);return}
  if(b.dataset.gc){const k=b.dataset.gc;let val=b.dataset.v;if(val==='true')val=true;else if(val==='false')val=false;st.geo[k]=val;st.geoEdited=true;if(k==='wheel')fixTire(st);renderGroup();changed();return}
  if(b.dataset.pk){st.p[b.dataset.pk].m=b.dataset.m;renderGroup();changed();return}
  if(b.dataset.tfilter){tireFilter=!tireFilter;renderGroup();return}
  if(b.dataset.wheel){st.geo.wheel=b.dataset.wheel;st.geoEdited=BIKES[st.bike]?BIKES[st.bike].wheel!==b.dataset.wheel||st.geoEdited:true;fixTire(st,st.wall);renderGroup();changed();return}
  if(b.dataset.factory){const prev=clone(st);applyFactory(st.bike);renderGroup();changed();toast(`${FACTORY[st.bike].name} lagt på`,prev);return}
  const k=b.dataset.k;if(!k)return;
  if(b.dataset.c){if(k.startsWith('p:')){const pk=k.slice(2);st.p[pk].c=b.dataset.c;if(NOCOLOR.includes(st.p[pk].m))st.p[pk].m=['grips'].includes(pk)?'rubber':pk==='saddle'?'leather':'gloss'}else st[k]=b.dataset.c}
  else if(b.dataset.v!==undefined){const raw=b.dataset.v;st[k]=['tireW','rotor','crankLen','spokesN'].includes(k)?+raw:raw;if(k==='tire'||k==='tireW')fixTire(st,st.wall);
    if(k==='brakeF'||k==='brakeR'){const msg=brakeRimFix();if(msg)toast(msg.trim())}
    if(k==='barType'||k==='brakeF'||k==='brakeR')syncLever()}
  else return;renderGroup();changed()});
let ct;grp.addEventListener('input',e=>{const t=e.target;
  if(t.id==='bike-q')return;
  if(t.dataset.g){st.geo[t.dataset.g]=+t.value;st.geoEdited=true;const lb=t.previousElementSibling.querySelector('b');const u=GEOSL.find(x=>x[0]===t.dataset.g)[2];lb.textContent=u==='mm'?Math.round(t.value*1000)+' mm':(+t.value).toFixed(1).replace('.',',')+'°';changed();return}
  const k=t.dataset.k;if(!k)return;
  if(t.type==='range'){st[k]=+t.value;const lb=t.previousElementSibling.querySelector('b');const it=TABS.flatMap(x=>x.items).find(x=>x.k===k);lb.textContent=Math.round(st[k]*(it.scale||1))+' '+it.u;changed();return}
  if(t.type==='color'){if(k.startsWith('p:')){const pk=k.slice(2);st.p[pk].c=t.value;if(NOCOLOR.includes(st.p[pk].m))st.p[pk].m='gloss'}else st[k]=t.value;
    t.nextElementSibling.textContent=colName(t.value);
    const det=t.closest('details');if(det){const pk=k.slice(2),sm=det.querySelector('summary small'),dt=det.querySelector('summary .dot');if(sm)sm.textContent=finTxt(st.p[pk]);if(dt){dt.className='dot';dt.style.background=t.value}
      det.querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed','false'))}}
  else st[k]=t.value;changed()});
document.querySelectorAll('.bgsel [data-bg]').forEach(b=>{b.addEventListener('click',e=>{e.stopPropagation();setBg(b.dataset.bg)})});setBg(bgStyle);
document.getElementById('ph-save').addEventListener('click',photoSave);document.querySelectorAll('#photo [data-rq]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();setRQ(b.dataset.rq)}));document.getElementById('ph-close').addEventListener('click',photoStop);
document.querySelector('.renderbtn').addEventListener('click',e=>{e.stopPropagation();if(PH.on||PH.busy)photoStop();else photoStart()});
canvas.addEventListener('pointerdown',()=>{const sg=document.getElementById('stage');if(sg)sg.classList.add('used')},{once:true});   // hjelpeteksten forsvinner etter første berøring
document.getElementById('presets').innerHTML=Object.keys(LOOKS).map(k=>`<button class="btn" data-p="${k}">${k}</button>`).join('');
document.getElementById('presets').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;const prev=clone(st);applyLook(b.dataset.p);renderGroup();changed();toast(keepLook?`${b.dataset.p} lagt på ${bikeName()}. Farge og dekor er beholdt`:`${b.dataset.p} lagt på ${bikeName()} med stilens farger og dekor`,prev)});
{const kb=document.getElementById('keeplook');if(kb){kb.checked=keepLook;kb.addEventListener('change',()=>{keepLook=kb.checked;try{localStorage.setItem('styler-keeplook',keepLook?'1':'0')}catch(e){}})}}
function toast(t,undo,label){const el=document.getElementById('snack');if(!el)return;el.innerHTML=`<span>${esc(t)}</span>${undo?`<button type="button" class="btn" id="snack-undo">${esc(label||'Angre')}</button>`:''}`;el.hidden=false;
  if(undo)document.getElementById('snack-undo').onclick=()=>{st=migrate(undo);renderGroup();changed();el.hidden=true};
  clearTimeout(toast.t);toast.t=setTimeout(()=>{el.hidden=true},undo?(label?15000:6000):2600)}
document.getElementById('copy').addEventListener('click',()=>{const txt=document.getElementById('list').textContent||listText();   // teksten slik den vises (norsk eller engelsk)

  // utklippstavlen kan mangle (http, innebygd i iframe), så det finnes to reserveløsninger
  const mark=()=>{const r=document.createRange();r.selectNodeContents(document.getElementById('list'));const s=getSelection();s.removeAllRanges();s.addRange(r);toast('Teksten er markert, kopier manuelt')};
  const legacy=()=>{try{const ta=document.createElement('textarea');ta.value=txt;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:-9999px;top:0;opacity:0';document.body.appendChild(ta);ta.select();
      const ok=document.execCommand&&document.execCommand('copy');ta.remove();if(ok){toast('Byggelisten er kopiert');return}}catch(e){}mark()};
  try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(()=>toast('Byggelisten er kopiert')).catch(legacy);else legacy()}catch(e){legacy()}});
// lagrede bygg ligger i nettleseren. Er lagring blokkert (privat modus o.l.), holdes de i minnet til siden lukkes
let memSaved=null;
function getSaved(){if(memSaved)return clone(memSaved);try{const a=JSON.parse(localStorage.getItem('styler-builds')||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
function setSaved(a){try{localStorage.setItem('styler-builds',JSON.stringify(a));memSaved=null;return true}catch(e){memSaved=clone(a);return false}}
function renderSaved(){document.getElementById('saved').innerHTML=getSaved().map((b,i)=>`<div><span>${esc(b.name)}</span><span class="row"><button class="btn" data-load="${i}">Last inn</button><button class="btn" data-del="${i}">Slett</button></span></div>`).join('')}
document.getElementById('save').addEventListener('click',()=>{const nm=document.getElementById('bname').value.trim()||`Bygg ${getSaved().length+1}`;const a=getSaved();a.unshift({name:nm,st:clone(st)});const ok=setSaved(a.slice(0,25));renderSaved();toast(ok?`${nm} er lagret`:`${nm} er lagret til siden lukkes. Nettleseren tillater ikke varig lagring her`)});
document.getElementById('saved').addEventListener('click',e=>{const l=e.target.closest('[data-load]'),d=e.target.closest('[data-del]');const a=getSaved();
  if(l&&a[+l.dataset.load]){st=migrate(a[+l.dataset.load].st);renderGroup();changed();toast(`${a[+l.dataset.load].name} lastet`)}
  if(d){a.splice(+d.dataset.del,1);setSaved(a);renderSaved()}});

applyStock(st.bike);
if(location.hash==='#debug')window.__dbg={get camera(){return camera},build:()=>{build()},LOOKS,BIKES,TABS,get tab(){return tab},get M(){return M},get GM(){return GM},get ROOT(){return B},THREE,selectBike,photoStart,photoStop,get PH(){return PH},RQ,setRQ,phFinalize,phExport:()=>phExport().toDataURL(),snap(pt){if(pt){PH.pt.renderSample();return canvas.toDataURL()}const bg=scene.background,gv=ground.visible;scene.background=null;ground.visible=false;ROOT.traverse(o=>{if(o.userData.fx)o.visible=false});renderer.render(scene,camera);const u=canvas.toDataURL();scene.background=bg;ground.visible=gv;ROOT.traverse(o=>{if(o.userData.fx)o.visible=true});return u},get st(){return st},changed,renderGroup,setQuality,get composer(){return !!composer},get scene(){return scene},set ao(v){if(gtao)gtao.enabled=v;dirty=true},set gtaoOut(v){if(gtao)gtao.output=v;dirty=true},cam(th,ph,r,k){const p=FOCUS[k||'fork'];tween=null;setSpin(false);cam.theta=th;cam.phi=ph;cam.r=r;if(p)cam.target.copy(p);dirty=true}};
renderTabs();renderGroup();renderText();renderSaved();
if(prevSession&&JSON.stringify(prevSession)!==JSON.stringify(st))toast(`Startet med ${bikeName()}`,prevSession,'Fortsett forrige');
try{initThree();if(document.fonts)document.fonts.ready.then(()=>{needBuild=true})}catch(e){document.getElementById('loading').textContent='3D kunne ikke startes: '+e.message}
