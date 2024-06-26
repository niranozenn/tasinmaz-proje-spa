import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasinmazService } from "../services/tasinmaz.service";
import { Sehir } from "../models/sehir";
import { Ilce } from "../models/ilce";
import { Mahalle } from "../models/mahalle";
import { Tasinmaz } from "../models/tasinmaz";
import { AlertifyService } from "../services/alertify.service";
import { Router } from "@angular/router";
import 'ol/ol.css';
import { MapComponent } from '../map/map.component';
import { AuthService } from "../services/auth.service";
import { Coordinate } from 'ol/coordinate';





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
  showSuccessAlert: boolean = false; 


  constructor(
    private formBuilder: FormBuilder,
    private tasinmazService: TasinmazService,
    private alertifyService: AlertifyService,
    private router: Router,
    private authService: AuthService

  ) {}

  ngOnInit() {
    this.tasinmazForm = this.formBuilder.group({
      sehir: ['', Validators.required],
      ilce: ['', Validators.required],
      mahalleId: ['', Validators.required],
      ada: ['', Validators.required],
      parsel: ['', Validators.required],
      nitelik: ['', Validators.required],
      adres: ['', Validators.required],
      koordinatX: ['', Validators.required],
      koordinatY: ['', Validators.required]
    });

  this.tasinmazService.getSehirler().subscribe((data) => {
    this.sehirler = data;
});
  

  }
  ngAfterViewInit() {
    this.mapComponent.coordinatedClicked();
    this.mapComponent.coordinateClicked.subscribe((coordinate: [number, number]) => {
      this.tasinmazForm.patchValue({
        
        koordinatX: coordinate[0].toString(), 
        koordinatY: coordinate[1].toString() 
      });
    });
  
  }

  onSehirChange() {
    const selectedSehirId = this.tasinmazForm.get('sehir').value;
    if (selectedSehirId) {
      this.tasinmazService.getIlcelerBySehirId(selectedSehirId).subscribe(ilceler => {
        this.ilceler = ilceler;
        this.mahalleler = []; 
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
    Object.keys(this.tasinmazForm.controls).forEach(field => {
      const control = this.tasinmazForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
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


 

