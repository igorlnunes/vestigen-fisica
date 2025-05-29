import { CommonModule } from '@angular/common';
import { marked } from 'marked';
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
        this.convertMarkdownToHtml(this.resolution).then((safeHtml) => {
      this.renderedResolution = safeHtml;
      setTimeout(() => {
      if (typeof MathJax !== 'undefined' && typeof MathJax.typesetPromise === 'function') {
        MathJax.typesetPromise();
      }
    }, 0);
    });
    }}

  ngAfterViewInit(): void {
    if (this.resolution && MathJax) {
      MathJax.typesetPromise();
    }
  }


  async convertMarkdownToHtml(md: string): Promise<SafeHtml> {
  const html = await marked.parse(md);
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
}