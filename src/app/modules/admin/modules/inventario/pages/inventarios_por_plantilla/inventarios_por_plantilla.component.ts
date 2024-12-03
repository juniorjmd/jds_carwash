import { Component, type OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventarios-por-plantilla', 
  templateUrl: './inventarios_por_plantilla.component.html',
  styleUrls: ['./inventarios_por_plantilla.component.css'],
})
export class InventariosPorPlantillaComponent implements OnInit {
  fileUploaded: boolean = false;
  validationPassed: boolean = false;
  selectedFile: File | null = null;
  validationErrors: string[] = [];

  constructor(private inventoryService: InventoryService) {}
  ngOnInit(): void { }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.selectedFile = file;
      this.fileUploaded = true;
      this.validationPassed = false;
      this.validationErrors = [];
    } else {
      alert('Por favor, sube un archivo CSV válido.');
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.fileUploaded = false;
    (document.getElementById('fileInput') as HTMLInputElement).value = ''; // Resetear el input
  }

  validateFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      
      this.inventoryService.validateFile(formData).subscribe({
        next: (errors) => {
          if (errors.length > 0) { 
            this.validationErrors = errors;
            this.validationPassed = false;
          } else {
            this.validationErrors = [];
            this.validationPassed = true;
          }
        },
        error: (e) => {Swal.fire('Error al validar el archivo.' + JSON.stringify(e)) ; 
          this.clearFile();},
      });
    }
  }

  processFile(): void {
    if (this.selectedFile && this.validationPassed) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.inventoryService.processFile(formData).subscribe({
        next: () => Swal.fire('Archivo procesado exitosamente.'),
        error: () => Swal.fire('Error al procesar el archivo.'),
      });
    }
  }

}
