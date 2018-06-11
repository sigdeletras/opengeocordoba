


mapajs = M.map({
    container: "map",controls:['Scale','ScaleLine','layerswitcher','location','mouse'],
    center: {
    x: 345248,
    y: 4193762
    //draw: true
  },
  zoom: 7
  // wmcfiles: ["cdau"],

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

//mapajs.setMaxExtent ([316171,4169011,389226,4211627]);

let estilo2 = new M.style.Point({
   radius: 5, 
   fill: {  
     color: 'green',
     opacity: 0.5
   },
   stroke: {
     color: '#FF0000'
   }
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




