import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasinmazService } from '../services/tasinmaz.service';
import { Tasinmaz } from '../models/tasinmaz';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { MapComponent } from '../map/map.component';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-tasinmaz-update',
  templateUrl: './tasinmaz-update.component.html',
  styleUrls: ['./tasinmaz-update.component.css']
})
export class TasinmazUpdateComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  showWarningAlert=false;

  tasinmazForm: FormGroup;
  updatedTasinmaz: Tasinmaz = new Tasinmaz();
  selectedTasinmazlar: Tasinmaz[] = [];
  tasinmazId: number;
  sehirler: any[] = [];
  ilceler: any[] = [];
  mahalleler: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tasinmazService: TasinmazService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {
    this.tasinmazForm = this.fb.group({
      sehir: [''],
      ilce: [''],
      mahalleId: [''],
      ada: [''],
      parsel: [''],
      nitelik: [''],
      adres: [''],
      koordinatX: [''],
      koordinatY: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tasinmazId = +params.get('id');
    });
    this.tasinmazService.getTasinmaz(this.tasinmazId).subscribe(tasinmaz => {
      this.tasinmazForm.patchValue(tasinmaz);
    });

    this.tasinmazService.getSehirler().subscribe(data => {
      this.sehirler = data;
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
      this.tasinmazService.getMahallelerByIlceId(selectedIlceId).subscribe(mahalleler => {
        this.mahalleler = mahalleler;
      });
    }
  }
  ngAfterViewInit() {
    this.mapComponent.coordinateClicked.subscribe((coordinate: [number, number]) => {
      this.tasinmazForm.patchValue({
        
        koordinatX: coordinate[0].toString(), // sayıyı dizeye dönüştür
        koordinatY: coordinate[1].toString() // sayıyı dizeye dönüştür
      });
      console.log(coordinate[0])
    });
  }

  updateTasinmaz() {
    const alertDisplayTime = 3000; // 3 saniye

    if (this.tasinmazForm.valid) {
      const updatedTasinmaz: Tasinmaz = {
        ...this.tasinmazForm.value,
        id: this.tasinmazId
      };
          this.updatedTasinmaz.ilce = parseInt(this.tasinmazForm.get('ilce').value);
          this.updatedTasinmaz.sehir = parseInt(this.tasinmazForm.get('sehir').value);
          this.updatedTasinmaz.mahalleId = parseInt(this.tasinmazForm.get('mahalleId').value);
          this.updatedTasinmaz.ada = this.tasinmazForm.get("ada").value;
          this.updatedTasinmaz.parsel = this.tasinmazForm.get("parsel").value;
          this.updatedTasinmaz.nitelik = this.tasinmazForm.get("nitelik").value;
          this.updatedTasinmaz.adres = this.tasinmazForm.get("adres").value;
          this.updatedTasinmaz.koordinatX = this.tasinmazForm.get("koordinatX").value;
          this.updatedTasinmaz.koordinatY = this.tasinmazForm.get("koordinatY").value;
          

          
      this.tasinmazService.updateTasinmaz(this.tasinmazId, this.updatedTasinmaz).subscribe(() => {
        this.showWarningAlert = true;

        // Belirlenen süre sonunda uyarı mesajını gizlemek için setTimeout kullanın
        setTimeout(() => {
          this.showWarningAlert = false;
        }, alertDisplayTime);

        // Yönlendirme işlemi
        // this.router.navigate(['/tasinmaz-liste']);
      });
    }
  }
}