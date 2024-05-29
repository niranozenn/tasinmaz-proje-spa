
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import ScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Output() coordinateClicked = new EventEmitter<Coordinate>();
  map: Map;
  vectorSource: VectorSource;
  mousemove: Coordinate; // Fare konumunu tutacak değişken
  mousemoves: string;
  mouseX: number;
  mouseY: number;
  isMouseOver: boolean;

  constructor() { }

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([35, 39]), 
        zoom: 5
      }),
      controls: []
    });

    var scale = new ScaleLine({
      bar: true
    });  
    this.map.addControl(scale);

    this.mousePosition(); // Fare konumunu alma işlevini çağırın
  }

  mousePosition() {
    this.map.on('pointermove', (evt) => {
      this.mousemove = evt.coordinate; // Fare konumunu değişkene ata
      console.log(this.mousemove); // Fare konumunu konsola yazdır
    });
  }
  

  coordinatedClicked() {
    this.map.on('click', (evt) => {
      var coordinate = evt.coordinate; // Tıklanan konumu al
      this.coordinateClicked.emit(coordinate); // Koordinatları emit et
      console.log(coordinate); 
    });
  }

}
