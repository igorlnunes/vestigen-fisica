import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var MathJax: any; // Declaração para que o TypeScript reconheça MathJax

@Component({
  selector: 'app-resolution-display',
  templateUrl: './resolution-display.component.html',
  styleUrls: ['./resolution-display.component.scss'],
  imports: [CommonModule]
})
export class ResolutionDisplayComponent implements OnChanges, AfterViewInit {
  @Input() resolution: string | null = null;
  renderedResolution: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resolution'] && this.resolution) {
      this.renderedResolution =
        this.sanitizer.bypassSecurityTrustHtml(this.resolution);
      // Re-renderiza MathJax se a resolução mudar
      if (MathJax) {
        MathJax.typesetPromise();
      }
    }
  }

  ngAfterViewInit(): void {
    // Garante que MathJax seja processado na inicialização, caso a resolução já esteja presente
    if (this.resolution && MathJax) {
      MathJax.typesetPromise();
    }
  }
}