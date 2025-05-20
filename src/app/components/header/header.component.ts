import { Component } from '@angular/core';

@Component({
  selector: 'app-header', // O seletor HTML que você usará para este componente (<app-header>)
  templateUrl: './header.component.html', // O arquivo HTML associado
  styleUrls: ['./header.component.scss'] // O arquivo de estilos associado
})
export class HeaderComponent {
  // Não precisamos de lógica complexa para um cabeçalho simples.
  // Poderíamos adicionar propriedades aqui se quiséssemos um título dinâmico, por exemplo:
  appTitle = 'Vestibular Fácil';
  appSubtitle = 'Questões de Física para Vestibular';
}