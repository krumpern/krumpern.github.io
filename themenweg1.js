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
//karte.setView([47.208333, 13.038240], 10);

//karte.addControl(new L.Control.Fullscreen());

// Grenzen des NPHT eingefügt
const Grenze = L.geoJson(Border, {
  color: "#505B19"
}).addTo(karte);
layerControl.addOverlay(Grenze, "Grenze NPHT");


//--------------------POI POPUP-----------------------//
let PointsofInterest = L.markerClusterGroup();
const poi_json = L.geoJson(POI)

PointsofInterest.addLayer(poi_json);
PointsofInterest.bindPopup(function(layer) {
  const props = layer.feature.properties;
  const NAME = (props.NAME)
  const popupText = `<h3>${props.NAME}</h3>
  <p>Seehöhe: ${props.SEEHOEHE}</p>
  <p>Link: ${props.URL_INTERN}</p>`;
  return popupText;
});
//karte.addLayer(PointsofInterest);
layerControl.addOverlay(PointsofInterest, "Points of Interest");




//--------------THemenwege-------------//
let Themenwege = L.markerClusterGroup();
const Themenwege_json = L.geoJson(wege[0],{
  color:"#344961"
})

Themenwege.addLayer(Themenwege_json);
karte.fitBounds(Themenwege.getBounds());
Themenwege.bindPopup(function(layer) {
  const props_wege = layer.feature.properties;
  const NAME_wege = (props_wege.NAME_DE)
  const popupText = `<h3>${props_wege.NAME_DE}</h3>
  <p>Gehzeit in Stunden: ${props_wege.GEHZEIT}</p>
  <p>Länge: ${props_wege.LENGTH/1000} km</p>
  <p>Schwierigkeit: ${props_wege.SCHWIERIGKEIT}</p>
  <p>Jahreszeit: ${props_wege.JAHRESZEIT}</p>
  <p>Ausgangspunkt: ${props_wege.AUSGANGSPUNKT}</p>
  <p>Zielpunkt: ${props_wege.ZIELPUNKT}</p>

  `
  

        
  return popupText;
});
karte.addLayer(Themenwege);
layerControl.addOverlay(Themenwege, "Themenwege");

//--------------------- gpx track laden.---------------------

var gpx = 'data/1_Natur-und_Kulturlehrweg_Debanttal.gpx'; // URL to your GPX file or the GPX itself
new L.GPX(gpx, {
  async: true,
  marker_options: {
    startIconUrl: 'images/pin-icon-start.png',
    endIconUrl: 'images/pin-icon-end.png',
    shadowUrl: 'images/pin-shadow.png'
  }
}).on('loaded', function(e) {
  karte.fitBounds(e.target.getBounds());


  const minSpan = document.getElementById("min");
  const maxSpan = document.getElementById("max");
  const diffSpan = document.getElementById("diff");

  minSpan.innerHTML = e.target.get_elevation_min();
  maxSpan.innerHTML = e.target.get_elevation_max();
  diffSpan.innerHTML = Math.round(e.target.get_elevation_gain());
  
 console.log(e.target)



}).on('addline', function(e) {
console.log(gpx);




  const controlElevation = L.control.elevation({
    collapsed: true,        //für in Karte Implementierte Höhenprofile.
    //detachedView: true,
    position: "bottomleft",
  //  elevationDiv: "#elevation-div",
  });




  controlElevation.addTo(karte);
  controlElevation.addData(e.line);
  const gpxline = e.line.getLatLngs();
  //console.log(gpxline);
  for (let i=1; i< gpxline.length; i+=1){
    //console.log(gpxline[i]);
    let p1 = gpxline[i-1];
    let p2 = gpxline[i];
    let dist = karte.distance(
      [p1.lat,p1.lng],
      [p2.lat,p2.lng]
    );
    let delta = (p2.meta.ele - p1.meta.ele);
    let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1);
    //console.log("Distanze: ", dist, 'höhendif: ', delta, 'steigung: ', proz);
    let farbe =
    proz >= 10? '#d73027':
    proz >= 6? '#fc8d59':
    proz >= 2? '#fee08b':
    proz >= 0? '#ffffbf':
    proz >= -6? '#d9ef8b':
    proz >= -10? '#91cf60':
      '#1a9850';

    L.polyline(
      [
        [p1.lat,p1.lng],
        [p2.lat,p2.lng],
      ], {
        color:farbe,
      }
    ).addTo(karte);
}
});

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



/* Versuch: Zonentypen farblich abstimmen -> Fail :(
const makeZonen = L.geoJson(Zonen);
const farbPaletteZonen = [
  [0, "#01DF01"],
  [1, "#FF0000"]
];
console.log(farbPaletteZonen)
L.geoJson(Zonen, {
pointToLayer: function (feature, latlng) {
  if (feature.properties.KERNZONE) {
    let color = farbPaletteZonen[farbPaletteZonen.length - 1][1];
    for (let i = 0; i < farbPaletteZonen.length; i++) {
      if (feature.properties.KERNZONE < farbPaletteZonen[i][0]) {
        color = farbPaletteZonen[i][1];
        break;
      } else {

      }

    }
  }

}
}).addTo(makeZonen);
layerControl.addOverlay(makeZonen, "Zonen NPHT");

makeZonen.addTo(karte)


*/
