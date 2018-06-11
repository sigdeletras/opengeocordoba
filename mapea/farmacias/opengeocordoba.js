mapajs = M.map({
    //container: "map",controls:['Scale','ScaleLine','layerswitcher','location','mouse'],
    container: "map",controls:["panzoombar",'Scale','ScaleLine','location','mouse','layerswitcher'],
    center: {
    	x: 345248,
    	y: 4193762
    },
    zoom: 7,
    wmcfiles: ["cdau_satelite","cdau"]

  });


let estiloPol = new M.style.Polygon({
   // fill: {
   //   color: 'pink',
   //   opacity: 0.5,
   // },
   stroke: {
   	color: '#FF0000',
   	width: 2
   }
 });

var layerTM = new M.layer.WFS({
	url: "http://www.ideandalucia.es/services/dera_div_admin/wfs?",
  // namespace: "tematicos",
  name: "dera_div_admin:da02_term_munic",
  legend: "TM",
  geometry: 'POLYGON',
  extract: true
  //ids:"3,4"
},{
	vendor:{
		getFeature: {
			'filter': '<Filter><PropertyIsEqualTo><PropertyName>cod_mun</PropertyName><Literal>14021</Literal></PropertyIsEqualTo></Filter>'
		}
	}
});
layerTM.setStyle(estiloPol);
mapajs.addWFS(layerTM);




let estiloBlue = new M.style.Point({
	radius: 5, 
	fill: {  
		color: 'blue'
     //opacity: 0.5
   },
   stroke: {
  	color: '#FFFFFF',   // Color del borde. Hexadecimal, nominal
     width: 2           // Grosor en pixeles
   }

 });




var layerDeraFarmacias = new M.layer.GeoJSON(
	{name: "Farmacias", 
	source: geo

});

layerDeraFarmacias.setStyle(estiloBlue);
mapajs.addLayers(layerDeraFarmacias);

