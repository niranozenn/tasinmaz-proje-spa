import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TasinmazService } from "../services/tasinmaz.service";
import { Tasinmaz } from "../models/tasinmaz";
import "ol/ol.css";
import { MapComponent } from "../map/map.component";
import { AlertifyService } from "../services/alertify.service";
import { Sehir } from "../models/sehir";
import { Ilce } from "../models/ilce";
import { Mahalle } from "../models/mahalle";

@Component({
  selector: "app-tasinmaz-update",
  templateUrl: "./tasinmaz-update.component.html",
  styleUrls: ["./tasinmaz-update.component.css"],
})
export class TasinmazUpdateComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  showWarningAlert = false;

  tasinmazForm: FormGroup;
  updatedTasinmaz: Tasinmaz = new Tasinmaz();
  selectedTasinmazlar: Tasinmaz[] = [];
  tasinmazId: number;
  sehirler: Sehir[] = [];
  ilceler: Ilce[] = [];
  mahalleler: Mahalle[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tasinmazService: TasinmazService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {
    this.tasinmazForm = this.fb.group({
      sehir: ["", Validators.required],
      ilce: ["", Validators.required],
      mahalleId: ["", Validators.required],
      ada: ["", Validators.required],
      parsel: ["", Validators.required],
      nitelik: ["", Validators.required],
      adres: ["", Validators.required],
      koordinatX: ["", Validators.required],
      koordinatY: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.tasinmazId = +params.get("id");
    });
    this.tasinmazService.getTasinmaz(this.tasinmazId).subscribe((tasinmaz) => {
      this.tasinmazForm.patchValue(tasinmaz);
      this.tasinmazForm.patchValue({
        sehir: tasinmaz.mahalle.ilce.sehir.id,
        ilce: tasinmaz.mahalle.ilce.id,
        mahalleId: tasinmaz.mahalle.id,
      });
      console.log(this.tasinmazForm);
    });

    this.tasinmazService.getSehirler().subscribe((data) => {
      this.sehirler = data;
    });
  }
//buraya dikkat et!!
//e[0] çünkü tek eleman seçiyoruz
  onSehirChange(e: any) {
    if (e[0].value > 0) {
      const selectedSehirId = e[0].value;
      if (selectedSehirId) {
        this.tasinmazService
          .getIlcelerBySehirId(selectedSehirId)
          .subscribe((ilceler) => {
            this.ilceler = ilceler;
          });
      }
    }
  }

  onIlceChange(e: any) {
    if (e[0].value > 0) {
    const selectedIlceId = e[0].value;
    if (selectedIlceId) {
      this.tasinmazService
        .getMahallelerByIlceId(selectedIlceId)
        .subscribe((mahalleler) => {
          this.mahalleler = mahalleler;
        });
    }
  }
  }
  ngAfterViewInit() {
    this.mapComponent.coordinateClicked.subscribe(
      (coordinate: [number, number]) => {
        this.tasinmazForm.patchValue({
          koordinatX: coordinate[0].toString(),
          koordinatY: coordinate[1].toString(),
        });
        console.log(coordinate[0]);
      }
    );
  }

  updateTasinmaz() {
    const alertDisplayTime = 3000; // 3 saniye

    if (this.tasinmazForm.valid) {
      const updatedTasinmaz: Tasinmaz = {
        ...this.tasinmazForm.value,
        id: this.tasinmazId,
      };
      this.updatedTasinmaz.ilce = parseInt(this.tasinmazForm.get("ilce").value);
      this.updatedTasinmaz.sehir = parseInt(
        this.tasinmazForm.get("sehir").value
      );
      this.updatedTasinmaz.mahalleId = parseInt(
        this.tasinmazForm.get("mahalleId").value
      );
      this.updatedTasinmaz.ada = this.tasinmazForm.get("ada").value;
      this.updatedTasinmaz.parsel = this.tasinmazForm.get("parsel").value;
      this.updatedTasinmaz.nitelik = this.tasinmazForm.get("nitelik").value;
      this.updatedTasinmaz.adres = this.tasinmazForm.get("adres").value;
      this.updatedTasinmaz.koordinatX =
        this.tasinmazForm.get("koordinatX").value;
      this.updatedTasinmaz.koordinatY =
        this.tasinmazForm.get("koordinatY").value;

      this.tasinmazService
        .updateTasinmaz(this.tasinmazId, this.updatedTasinmaz)
        .subscribe(() => {
          this.showWarningAlert = true;

          setTimeout(() => {
            this.showWarningAlert = false;
            this.router.navigate(["/tasinmaz-liste"]);
          }, alertDisplayTime);
        });
    }
  }
}
