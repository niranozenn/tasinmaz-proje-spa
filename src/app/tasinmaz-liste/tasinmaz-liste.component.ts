import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Tasinmaz } from "../models/tasinmaz";
import { TasinmazService } from "../services/tasinmaz.service";
import { FormGroup, FormControl } from "@angular/forms";
import { AlertifyService } from "../services/alertify.service";

@Component({
  selector: "app-tasinmaz-liste",
  templateUrl: "./tasinmaz-liste.component.html",
  styleUrls: ["./tasinmaz-liste.component.css"],
  providers: [TasinmazService],
})
export class TasinmazListeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private tasinmazService: TasinmazService
  ) {}

  selectedTasinmazId: number | null = null;
  tasinmazlar: Tasinmaz[] = []; //çektiğimiz datayı Tasinmaz arrayinde toplayacağız. (models class oluşturuldu)
  showDangerAlert: boolean = false; // Yeni özellik
  showWarningAlert: boolean = false;

  ngOnInit() {
    //uygulama açılınca çalışacak blok
    this.getTasinmazlar().subscribe((data) => {
      this.tasinmazlar = data; //array bölümüne datayı atar
    });
  }
  navigateToAddPage() {
    this.router.navigate(["/tasinmaz-add"]); // Yönlendirme yap
  }
  getTasinmazlar() {
    return this.http.get<Tasinmaz[]>(
      "https://localhost:44364/api/tasinmaz/getValues"
    ); //datayı get edip gelen datayı <Tasinmaz[]> arrayine map eder.
  }

  onCheckboxChange(tasinmazId: number, event: any) {
    if (event.target.checked) {
      this.selectedTasinmazId = tasinmazId;
    } else {
      this.selectedTasinmazId = null;
    }
  }
  navigateToUpdatePage() {
    const alertDisplayTime = 3000; // 3 saniye
    if (this.selectedTasinmazId) {
      this.router.navigate(["/tasinmaz-update", this.selectedTasinmazId]);
    } else if(this.selectedTasinmazId==null) {
      
        this.alertifyService.warning("Lütfen taşınmaz seçiniz.", ()=>{});
    
      
    }
  }
  navigateToDeletePage() {
    if (this.selectedTasinmazId) {
      this.alertifyService.confirm(
        "Silmek istediğinize emin misiniz?",
        () => { // Evet'e tıklandığında
          this.deleteTasinmaz(this.selectedTasinmazId);
        },
        () => { // Hayır'a tıklandığında
          // Hiçbir işlem yapma, sadece onay kutusunu kapat
        }
      );
    } else {
      alert("Lütfen silinecek taşınmazı seçin.");
    }
  }
  
  deleteTasinmaz(selectedTasinmazId) {
    const alertDisplayTime = 3000;
    if (selectedTasinmazId) {
      this.tasinmazService.deleteTasinmaz(selectedTasinmazId).subscribe(
        () => {
          this.alertifyService.error("Taşınmaz başarıyla silindi.");
          this.getTasinmazlar().subscribe((data) => {
            this.tasinmazlar = data;
          });
          this.selectedTasinmazId = null;
        },
        (error) => {
          console.error("Taşınmaz silinirken hata oluştu:", error);
          this.alertifyService.error("Taşınmaz silinirken hata oluştu.");
        }
      );
    }
  }
      }
