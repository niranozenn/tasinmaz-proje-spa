import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Tasinmaz } from "../models/tasinmaz";
import { TasinmazService } from "../services/tasinmaz.service";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { LoginGuardService } from "../services/login-guard.service";
import { MapComponent } from "../map/map.component";
import { Coordinate } from 'ol/coordinate';
import * as XLSX from 'xlsx';


@Component({
  selector: "app-tasinmaz-liste",
  templateUrl: "./tasinmaz-liste.component.html",
  styleUrls: ["./tasinmaz-liste.component.css"],
  providers: [TasinmazService],
})
export class TasinmazListeComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent;
  @Output() coordinateClicked = new EventEmitter<Coordinate>();
  @Output() tasinmazCoordinates = new EventEmitter<[number, number][]>();


  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private tasinmazService: TasinmazService,
    private authService: AuthService,
    private loginGuard: LoginGuardService,
  ) {}

  selectedTasinmazId: number | null = null;
  tasinmazlar: Tasinmaz[] = [];
  paginatedTasinmazlar: Tasinmaz[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  filteredTasinmazlar: Tasinmaz[] = [];
  searchTerm: string = '';
  tasinmazFormIsOpen: boolean = true;

  showDangerAlert: boolean = false;
  showWarningAlert: boolean = false;
  showUpdateAlert: boolean = false;

  ngOnInit() {
    
    this.userLogin();
  
  }


  userLogin() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.tasinmazService.getTasinmazByUserId(userId).subscribe((data) => {
        this.tasinmazlar = data;
        this.filteredTasinmazlar = this.tasinmazlar;
        this.totalPages = Math.ceil(this.filteredTasinmazlar.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.paginateTasinmazlar(); 
      this.sendCoordinatesToMap();
      });
    } else {
      console.error("User ID bulunamadı");
    }
   
  }
  sendCoordinatesToMap() {
    this.mapComponent.setTasinmazCoordinates(this.filteredTasinmazlar);
  }
  
  
  
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredTasinmazlar);
    const workbook: XLSX.WorkBook = { Sheets: { 'Tasinmazlar': worksheet }, SheetNames: ['Tasinmazlar'] };
    XLSX.writeFile(workbook, 'Tasinmazlar.xlsx');
  }
 
  paginateTasinmazlar() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredTasinmazlar.length);
    this.paginatedTasinmazlar = this.filteredTasinmazlar.slice(startIndex, endIndex);
  }
  
  goToPage(page: number) {
    this.currentPage = page;
    this.paginateTasinmazlar();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateTasinmazlar();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateTasinmazlar();
    }
  }
  onSearch() {
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredTasinmazlar = this.tasinmazlar.filter(tasinmaz =>
        
        tasinmaz.ada.toString().includes(this.searchTerm) ||
        tasinmaz.parsel.toString().includes(this.searchTerm) ||
        tasinmaz.nitelik.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tasinmaz.adres.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTasinmazlar = this.tasinmazlar;
    }
    this.totalPages = Math.ceil(this.filteredTasinmazlar.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.goToPage(1);
  }

  onCheckboxChange(tasinmazId: number, event: any) {
    if (event.target.checked) {
      this.selectedTasinmazId = tasinmazId;
    } else {
      this.selectedTasinmazId = null;
    }
  }

  navigateToAddPage() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/tasinmaz-add"]);
    }
  }

  navigateToUpdatePage() {
    const alertDisplayTime = 3000;
    if (this.selectedTasinmazId) {
      this.router.navigate(["/tasinmaz-update", this.selectedTasinmazId]);
    } else {
      this.showUpdateAlert = true;
      setTimeout(() => {
        this.showUpdateAlert = false;
      }, alertDisplayTime);
    }
  }
  navigateToDeletePage() {
    const alertDisplayTime = 3000;

    if (this.selectedTasinmazId) {
      this.alertifyService.confirm(
        "Silmek istediğinize emin misiniz?",
        () => {
          this.deleteTasinmaz(this.selectedTasinmazId);
        },
        () => {
         
        }
      );
    } else {
      this.showWarningAlert = true;
      setTimeout(() => {
        this.showWarningAlert = false;
      }, alertDisplayTime);
    }
  }

  deleteTasinmaz(selectedTasinmazId: number) {
    if (selectedTasinmazId) {
      this.tasinmazService.deleteTasinmaz(selectedTasinmazId).subscribe(
        () => {
          this.alertifyService.error("Taşınmaz başarıyla silindi.");
          this.tasinmazFormIsOpen = false;
          setTimeout(() => {
            this.tasinmazFormIsOpen = true;
            this.userLogin();
            this.selectedTasinmazId = null;
        });

        },
       
        (error) => {
          this.alertifyService.error("Taşınmaz silinirken hata oluştu.");
        }
      );
    }
  }

  refreshPage(): void {
    window.location.reload();
  }
}


