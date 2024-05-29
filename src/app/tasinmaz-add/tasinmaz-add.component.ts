import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasinmazService } from "../services/tasinmaz.service";
import { Sehir } from "../models/sehir";
import { Ilce } from "../models/ilce";
import { Mahalle } from "../models/mahalle";
import { Tasinmaz } from "../models/tasinmaz";
import { AlertifyService } from "../services/alertify.service";
import { Router } from "@angular/router";
import alertify from 'alertifyjs';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../map/map.component';
import { AuthService } from "../services/auth.service";
import {  Output, EventEmitter } from '@angular/core';
import 'ol/ol.css';
import { Coordinate } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import ScaleLine from 'ol/control/ScaleLine';




@Component({
  selector: "app-tasinmaz-add",
  templateUrl: "./tasinmaz-add.component.html",
  styleUrls: ["./tasinmaz-add.component.css"],
  providers: [TasinmazService],
})
export class TasinmazAddComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @Output() coordinateClicked = new EventEmitter<Coordinate>();
 
  newTasinmaz: Tasinmaz = new Tasinmaz();
  tasinmazForm: FormGroup;
  sehirler: Sehir[] = [];
  ilceler: Ilce[] = [];
  mahalleler: Mahalle[] = [];
  showSuccessAlert: boolean = false; // Yeni özellik


  constructor(
    private formBuilder: FormBuilder,
    private tasinmazService: TasinmazService,
    private alertifyService: AlertifyService,
    private router: Router,
    private authService: AuthService

  ) {}

  ngOnInit() {
    this.tasinmazForm = this.formBuilder.group({
      sehir: ['', Validators],
      ilce: ['', Validators],
      mahalleId: ['', Validators],
      ada: ['', Validators],
      parsel: ['', Validators],
      nitelik: ['', Validators],
      adres: ['', Validators],
      koordinatX: ['', Validators],
      koordinatY: ['', Validators]
  });
  this.tasinmazService.getSehirler().subscribe((data) => {
    this.sehirler = data;
});
  

  }
  ngAfterViewInit() {
    this.mapComponent.coordinatedClicked();
    this.mapComponent.coordinateClicked.subscribe((coordinate: [number, number]) => {
      this.tasinmazForm.patchValue({
        
        koordinatX: coordinate[0].toString(), // sayıyı dizeye dönüştür
        koordinatY: coordinate[1].toString() // sayıyı dizeye dönüştür
      });
      console.log(coordinate[0])
    });
  }

  onSehirChange() {
    const selectedSehirId = this.tasinmazForm.get('sehir').value;
    if (selectedSehirId) {
      this.tasinmazService.getIlcelerBySehirId(selectedSehirId).subscribe(ilceler => {
        this.ilceler = ilceler;
        this.mahalleler = []; // İlçe seçildiğinde mahalleleri temizleyin
      });
    }
  }

  onIlceChange(){
    const selectedIlceId = this.tasinmazForm.get("ilce").value;
    if (selectedIlceId) {
      this.tasinmazService.getMahallelerByIlceId(selectedIlceId).subscribe(mahalleler=>{
        this.mahalleler = mahalleler;
      });
    }
  }
  

  
  tasinmazAdd(): void 
  {
    const userId = this.authService.getUserId();
    const alertDisplayTime=3000;
    if (this.tasinmazForm.valid) 
    {
      this.newTasinmaz.sehir = parseInt(this.tasinmazForm.get("sehir").value);
      this.newTasinmaz.ilce = parseInt(this.tasinmazForm.get("ilce").value);
      this.newTasinmaz.mahalleId = parseInt(this.tasinmazForm.get("mahalleId").value);
      this.newTasinmaz.ada = this.tasinmazForm.get("ada").value;
      this.newTasinmaz.parsel = this.tasinmazForm.get("parsel").value;
      this.newTasinmaz.nitelik = this.tasinmazForm.get("nitelik").value;
      this.newTasinmaz.adres = this.tasinmazForm.get("adres").value;
      this.newTasinmaz.koordinatX = this.tasinmazForm.get("koordinatX").value;
      this.newTasinmaz.koordinatY = this.tasinmazForm.get("koordinatY").value;
      this.newTasinmaz.userId=userId;

      this.tasinmazService.addTasinmaz(this.newTasinmaz).subscribe(response => 
      {
        this.alertifyService.successNotification
        this.showSuccessAlert = true; 
        setTimeout(()=>{
          this.showSuccessAlert=false;
          this.router.navigate(["/tasinmaz-liste"]);

        },alertDisplayTime)
      }, error => 
      {
        console.error('Taşınmaz eklenirken bir hata oluştu', error);
      });
    } 
    else 
    {
      console.error('Form geçersiz');
    }
  }
}


 

