


mapajs = M.map({
    //container: "map",controls:['Scale','ScaleLine','layerswitcher','location','mouse'],
    container: "map",controls:['Scale','ScaleLine','location','mouse'],
    center: {
    	x: 345248,
    	y: 4193762
    //draw: true
},
zoom: 7
  // wmcfiles: ["cdau"],
//wmcfiles: ["cdau","cdau_satelite","cdau_hibrido"]
  //   layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true",
  //     new M.layer.WMS({
  //       url: 'http://www.callejerodeandalucia.es/servicios/base/wms?',
  //       name: 'batimetria',
  //       legend: 'Batimetria',
  //       transparent: true,
  //       tiled: false
  //     })
  //   ]
});

mapajs.addPlugin(new M.plugin.Searchstreet({
	"locality": "14021"
}));

var panelExtra = new M.ui.Panel('toolsExtra', {
	"collapsible": true,
	"className": 'm-tools',
	"collapsedButtonClass": 'g-cartografia-herramienta',
	"position": M.ui.position.TL
});
panelExtra.addControls([new M.control.Location()]);
mapajs.addPanels([panelExtra]);


//mapajs.setMaxExtent ([316171,4169011,389226,4211627]);

let estilo2 = new M.style.Point({
	radius: 5, 
	fill: {  
		color: 'green'
     //opacity: 0.5
 },
 stroke: {
  	color: '#FFFFFF',   // Color del borde. Hexadecimal, nominal
     width: 2           // Grosor en pixeles
     //linedash: [5,5,20], // Patrón de distancias
     //linedashoffset: 1,  // Offset de fase
     //linecap: 'square',  // Estilo de final de linea. round|square|butt
     //linejoin: 'miter',  // Estilo de conexión de segmentos. miter|round|bevel
     //miterlimit: 15      // Tamaño máximo segmento de conexión
 }
   // Etiquetado
   // label: {
   //   text: 'Etiqueta',                // Texto a escribir
   //   //font: 'bold 19px Comic Sans MS', // Fuente y caracteristicas
   //   font: 'bold 19px', // Fuente y caracteristicas
   //   color: '#FF0000',                // Color de la fuente
   //   rotate: false,                   // Debe o no rotar con la pantalla
   //   scale: 0.9,                      // Factor de escala de la fuente
   //   //offset: [10, 20],
   //   // Halo de la fuente
   //   // stroke: {
   //   //   color: 'yellow',     // Color de relleno del halo
   //   //   width: 2,            // Grosor en pixeles del halo
   //   //   linedash: [5,5,20],  // Patrón de distancias de la linea
   //   //   linedashoffset: 1,   // Offset de fase
   //   //   linecap: 'square',   // Estilo de final de linea. round|square|butt
   //   //   linejoin: 'miter',   // Estilo de conexión de segmentos. miter|round|bevel
   //   //   miterlimit: 15       // Tamaño máximo segmento de conexión
   //   // },
   //   //rotation: 0.5,                  // Rotacion de la etiqueta 
   //   align: M.style.align.RIGHT,     // Alineacion. RIGHT|LEFT|CENTER|JUSTIFY
   //   baseline: M.style.baseline.TOP  // Altura de la etiqueta. TOP|BOTTOM|MIDDLE
   // }
   // icon: {
   //  form: M.style.form.LOZENGE,    // Forma del fontsymbol.
   //  // BAN|BLAZON|BUBBLE|CIRCLE|LOZENGE|MARKER
   //  // NONE|SHIELD|SIGN|SQUARE|TRIANGLE
   //  class: "g-cartografia-alerta",
   //  fontsize: 0.5,
   //  radius: 8,                    // Tamaño
   //  rotation: 0,                  // Giro del icono en radianes
   //  rotate: false,                // Activar rotacion con dispositivo
   //  offset: [0, 0],               // Desplazamiento en pixeles en los ejes x,y
   //  color: 'blue',
   //  fill: '#8A0829',              // Color de relleno
   //  gradientcolor: '#088A85',     // Color del borde
   //  gradient: true,               // Degradado entre color de borde e interior
   //  opacity: 0.5                  // Transparencia. 0(transparente)|1(opaco)
   // }
});


var layerAyuntamiento = new M.layer.WFS({
	url: "http://www.ideandalucia.es/services/dera_servicios/wfs?",
  // namespace: "tematicos",
  name: "dera_servicios:sv10_ayuntamiento",
  legend: "Ayuntamientos",
  geometry: 'POINT',
  extract: true
  //ids:"3,4"
},{
	vendor:{
		getFeature: {
			'filter': '<Filter><PropertyIsEqualTo><PropertyName>cod_mun</PropertyName><Literal>14021</Literal></PropertyIsEqualTo></Filter>'
		}
	}
});
layerAyuntamiento.setStyle(estilo2);
mapajs.addWFS(layerAyuntamiento);


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

/*var layerDeraCentrosSalud1 = new M.layer.WFS({
	url: "http://www.ideandalucia.es/services/dera_servicios/wfs?",
  // namespace: "tematicos",
  name: "dera_servicios:sv01_sanidad_centro_salud",
  legend: "Centros de salud",
  geometry: 'POINT',
  extract: true
  //ids:"3,4"
},{
	vendor:{
		getFeature: {
			'filter': '<Filter><PropertyIsEqualTo><PropertyName>municipio</PropertyName><Literal>C%F3rdoba</Literal></PropertyIsEqualTo></Filter>'
       //'CQL_FILTER': 'municipio=%//C%F3rdoba%27'
   }
}
});
*/


var layerDeraCentrosSalud = new M.layer.GeoJSON(
	{name: "Centros de Salud", 
	source: geo

});

layerDeraCentrosSalud.setStyle(estiloBlue);
mapajs.addLayers(layerDeraCentrosSalud);

let estiloOrange = new M.style.Point({
	radius: 5, 
	fill: {  
		color: 'orange'
     //opacity: 0.5
 },
 stroke: {
  	color: '#FFFFFF',   // Color del borde. Hexadecimal, nominal
     width: 2           // Grosor en pixeles
 }
 
});

var layerDeraFarmacias = new M.layer.GeoJSON(
	{name: "Farmacias", 
	source: derafarmacias

});

layerDeraFarmacias.setStyle(estiloOrange);
mapajs.addLayers(layerDeraFarmacias);

