let karte = L.map("map");


const kartenLayer = {
  osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }),
  geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
  }),
  stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }),
  stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }),
  stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
    subdomains: ["a", "b", "c"],
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
  })
};

const layerControl = L.control.layers({
  "Geoland Basemap": kartenLayer.geolandbasemap,
  "Geoland Basemap Grau": kartenLayer.bmapgrau,
  "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
  "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
  "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
  "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
  "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
  "OpenStreetMap": kartenLayer.osm,
  "Stamen Toner": kartenLayer.stamen_toner,
  "Stamen Terrain": kartenLayer.stamen_terrain,
  "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);
karte.setView([47.208333, 13.038240], 10);

karte.addControl(new L.Control.Fullscreen());

// Grenzen des NPHT eingefügt
const Grenze = L.geoJson(Border, {
  color: "#505B19"
}).addTo(karte);
layerControl.addOverlay(Grenze, "Grenze NPHT");


//--------------------POI POPUP-----------------------//
let PointsofInterest = L.markerClusterGroup();
const poi_json = L.geoJson(POI)

PointsofInterest.addLayer(poi_json);
karte.fitBounds(PointsofInterest.getBounds());
PointsofInterest.bindPopup(function(layer) {
  const props = layer.feature.properties;
  const NAME = (props.NAME)
  const popupText = `<h3>${props.NAME}</h3>
  <p>Seehöhe in m: ${props.SEEHOEHE}</p>
  <p> <a target = "blank", href="${props.URL_INTERN}"> Weitere Informationen</a> </p>`;
  return popupText;
});
karte.addLayer(PointsofInterest);
layerControl.addOverlay(PointsofInterest, "Points of Interest");



//--------------THemenwege-------------//
var Themenwege = L.markerClusterGroup();
const Themenwege_json = L.geoJson(wege, {
  color: "#344961"
})

Themenwege.addLayer(Themenwege_json);
karte.fitBounds(Themenwege.getBounds());
Themenwege.bindPopup(function(layer) {
  const props_wege = layer.feature.properties;
  const NAME_wege = (props_wege.NAME_DE)
  const popupText = `<h3>${props_wege.NAME_DE}</h3>
  <p>Gehzeit in Stunden: ${props_wege.GEHZEIT}</p>
  <footer> <a target = "blank", href="${props_wege.URL_KRUMPERN}"> Link zum Weg</a><//footer>`;
  return popupText;

});

karte.addLayer(Themenwege);
layerControl.addOverlay(Themenwege, "Themenwege");


function makeMarker(feature, latlng) { //Marker definieren
  const fotoIcon = L.icon({ //Icon definieren
    iconUrl: 'http://www.data.wien.gv.at/icons/sehenswuerdigogd.svg',
    iconSize: [16, 16]
  });
  const wegeMarker = L.marker(latlng, { //marker setzen und icon verwenden
    icon: fotoIcon
  });
  //Popup definieren: mit den Properties Namen und Bemerkung
  wegeMarker.bindPopup(`
         <h3>${feature.properties.NAME_DE}</h3>
         <p>${feature.properties.GEHZEIT}</p>  `);
  return wegeMarker; //Marker ausgeben
}

// Suchleiste einfügen
const suchFeld_Name = new L.Control.Search({
  layer: Themenwege_json,
  propertyName: 'NAME_DE',
  zoom: 14,
  marker: false,
  initial: false,
  collapsed: false,
  textPlaceholder: "Suche nach Name",
  position: 'topright',
  container: 'findbox',
  autoCollapse: true,
  autoCollapseTime: 1200,

});


const suchFeld_Gehzeit = new L.Control.Search({
  container: 'findbox2',
  layer: Themenwege_json,
  propertyName: 'GEHZEIT',
  zoom: 14,
  marker: false,
  initial: false,
  collapsed: false,
  textPlaceholder: "Suche nach Gehzeit",
  textErr: "Kein Treffer bitte weitersuchen",
  autoCollapse: true,
  autoCollapseTime: 1200,

});


const suchFeld_Schwierigkeit = new L.Control.Search({
  layer: Themenwege_json,
  propertyName: 'SCHWIERIGKEIT',
  zoom: 14,
  marker: false,
  initial: false,
  collapsed: false,
  textPlaceholder: "Suche nach Schwierigkeit",
  position: 'topright',
  container: 'findbox3',
  autoCollapse: true,
  autoCollapseTime: 1200,
});



const suchFeld_Jahreszeit = new L.Control.Search({
  layer: Themenwege_json,
  propertyName: 'JAHRESZEIT',
  zoom: 14,
  marker: false,
  initial: false,
  collapsed: false,
  textPlaceholder: "Suche nach Jahreszeit",
  position: 'topright',
  container: 'findbox4',
  autoCollapse: true,
  autoCollapseTime: 1200,
});

karte.addControl(suchFeld_Jahreszeit);
karte.addControl(suchFeld_Schwierigkeit);
karte.addControl(suchFeld_Gehzeit);
karte.addControl(suchFeld_Name);
