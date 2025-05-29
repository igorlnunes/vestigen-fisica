import { Component } from '@angular/core';

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  appTitle = 'Vestibular Fácil';
  appSubtitle = 'Questões de Física para Vestibular';
}