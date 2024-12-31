import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {
  nombre: any;
  username: any;
  imageUsr: any
  fecha: any;
  hora: any;
  favoritos:any

  constructor() {
    this.getNameLastName()
    this.getDate()
  }

  getDate(){
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours();
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // Convierte 0 a 12 para formato de 12 horas

    this.fecha = `${year}-${month}-${day}`;
    this.hora = `${formattedHours}:${minutes} ${ampm}`;

  }

  getNameLastName() {
    this.nombre = sessionStorage.getItem('nombre');
    const nombres = this.nombre.split(' ');
    let name = nombres[0];
    let lastName = '';

    if (nombres.length > 2) {
      lastName = nombres[2];
    } else if (nombres.length > 1) {
      lastName = nombres[1];
    }

    this.nombre = (lastName ? lastName + ' ' : '') + name ;
    return this.nombre;
  }

}
