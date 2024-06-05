
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Tasinmaz } from "../models/tasinmaz";
import { TasinmazService } from "../services/tasinmaz.service";
import { AlertifyService } from "../services/alertify.service";
import { AuthService } from "../services/auth.service";
import { LoginGuardService } from "../services/login-guard.service";

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
    private tasinmazService: TasinmazService,
    private authService: AuthService,
    private loginGuard: LoginGuardService
  ) {}

  selectedTasinmazId: number | null = null;
  tasinmazlar: Tasinmaz[] = [];
  paginatedTasinmazlar: Tasinmaz[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];

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
        this.totalPages = Math.ceil(this.tasinmazlar.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.paginateTasinmazlar();
      });
    } else {
      console.error("User ID bulunamadı");
    }
  }

  paginateTasinmazlar() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasinmazlar = this.tasinmazlar.slice(startIndex, endIndex);
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

  navigateToAddPage() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/tasinmaz-add"]);
    }
  }

  onCheckboxChange(tasinmazId: number, event: any) {
    if (event.target.checked) {
      this.selectedTasinmazId = tasinmazId;
    } else {
      this.selectedTasinmazId = null;
    }
  }
}
