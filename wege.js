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
karte.setView([47.208333, 13, 038240], 10);

karte.addControl(new L.Control.Fullscreen());

// Grenzen des NPHT eingefügt
const Grenze = L.geoJson(Border, {
  color: "#006400"
}).addTo(karte);
layerControl.addOverlay(Grenze, "Grenze NPHT");


// POIs eingefügt, daten mit QGIS konvertiert :))
const POIClusterGruppe = L.markerClusterGroup();
const POI_WGS = L.geoJson(POI, {});
POIClusterGruppe.addLayer(POI_WGS);

/// TODOOOO Fix it !
for (let p of POI){
  //console.log(p)
  POIClusterGruppe.bindPopup(
  `<h3>Name:${p.properties.NAME}</h3>
  <h2> Höhe: ${p.properties.SEEHOEHE}</h2>`
  );

};
karte.addLayer(POIClusterGruppe);
layerControl.addOverlay(POIClusterGruppe, "Points of Interest");


//einfügen von Zonen erfolgt. toDo: für die Zonentypen farblich abstimmen, und Clickable Popup erstellen!!!!
const makeZonen = L.geoJson(Zonen, {
  color: "#FF4000"

}).addTo(karte);
layerControl.addOverlay(makeZonen, "Zonen NPHT");


const Themenwege = L.geoJson(wege, {
  color: "#006400"
}).addTo(karte);
layerControl.addOverlay(Themenwege, "Themenwege");

// Minimap 

new L.Control.MiniMap(
  L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
      subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
  }), {
      zoomLevelOffset: -4,
      toggleDisplay: true,
      minimized: true
  }
).addTo(karte);