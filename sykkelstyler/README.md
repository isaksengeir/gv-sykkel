# Sykkelstyler (GV Sykkel)

index.html er hele appen i én fil (HDRI-lyset ligger innebygd). Den kan åpnes direkte eller legges på en nettside.

## Struktur
- index.html: ferdig bygget app
- src/app.js: all logikk, 3D-modellering, lys og rendring
- src/shell.html: HTML og CSS, med plassholderen /*APP*/ der app.js settes inn
- assets/studio_small_03_1k.hdr: studiolys (HDRI), bygges inn i index.html som base64
- build.py: bygger index.html på nytt etter endringer i src eller assets

## Jobbe i VS Code
1. Åpne mappen i VS Code.
2. Rediger src/app.js eller src/shell.html.
3. Kjør `python build.py` i terminalen.
4. Åpne index.html med utvidelsen Live Server (høyreklikk, "Open with Live Server").

## Biblioteker (hentes fra cdn.jsdelivr.net, krever internett)
- three.js 0.165.0 (MIT)
- three-gpu-pathtracer 0.0.23 og three-mesh-bvh 0.7.6 (MIT), lastes bare når Rendre bilde brukes
- Skrifter fra Google Fonts

## Lys
- HDRI: "Studio Small 03" fra Poly Haven (CC0, ingen krav om kreditering)
- I tillegg legges det inn hvite lysflater i HDRI-en i koden (funksjonen addCards), så krom får tydelige refleksjoner
- ENV_ROT dreier lyset, ENV_I styrer styrken

## Stiler
Bryteren «Behold farge og dekor» over stilknappene (standard på) gjør at en stil bare bytter deler og delefarger. Rammefarge, dekorfarger, tekst og striper beholdes. Valget huskes i nettleseren.

## Rendre bilde
Kameraknappen «Rendre bilde» oppe til høyre i 3D-visningen regner bildet med path tracing (three-gpu-pathtracer).
- Tre kvaliteter, valgt i panelet og husket i nettleseren (RQ i app.js: budget, cap, floor, ss):
  - Rask: rundt 40 sekunder i skjermoppløsning.
  - Beste (standard): rundt 2 minutter, dobbel oppløsning og litt dybdeskarphet.
  - Ultra: rundt 5 minutter (4 på mobil), 2,5 ganger oppløsning på PC og 2 ganger på mobil.
- Antall runder tilpasses maskinen etter noen sekunder.
- Når rendringen er ferdig, fjernes kornet. På PC (opptil ca. 2,4 megapiksler) brukes AI (Intel Open Image Denoise via biblioteket «denoiser» 0.0.11 og TensorFlow.js), med 60 s tidsgrense. På mobil, og hvis AI har krasjet siden én gang på maskinen (merket styler-ai-run i localStorage), brukes rask støyfjerning i skyggeleggeren (phExport). localStorage-nøkkelen styler-ai-off=1 slår AI av.
  To rene hjelpebilder (albedo og normaler) lages av samme utsnitt, så detaljer holdes skarpe. Vektene ligger i assets/rt_ldr_calb_cnrm.tza (Apache 2.0, se OIDN-weights-LICENSE.txt) og bygges inn i index.html.
  Biblioteket hentes fra cdn.jsdelivr.net. Feiler det, brukes en enklere støyfjerner (phExport).
- Rendringen har eget lysoppsett (ptEnv): taklampen i HDRI-en dempes, og hovedlyset legges inn som en softboks i samme retning som i visningen (KEY_AZ, KEY_EL).
- PT_GAIN styrer lysstyrken i rendringen, FILL og KEY forholdet mellom fyll- og hovedlys.

## På gvsykkel.no
- Last opp index.html (f.eks. som /sykkelstyler/index.html) og lenk til den, eller
- bygg den inn på en side: <iframe src="/sykkelstyler/" style="width:100%;height:1400px;border:0"></iframe>
Lagrede bygg og valg ligger i nettleserens localStorage hos hver bruker.
