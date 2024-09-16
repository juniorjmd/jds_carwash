import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {


  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, fontSize: number = 16): SafeHtml {
    if (!value) return value;

    const pixelsPerCharacter = fontSize * 0.6; // Aproximadamente, depende de la fuente
    const maxCharsPerLine = Math.floor(350 / pixelsPerCharacter);
    let result = '';
    let line = '';

    for (let char of value) {
      if ((line.length + 1) * pixelsPerCharacter > 350) {
        result += line + '<br>';
        line = char;
      } else {
        line += char;
      }
    }

    result += line; // Añadir el resto de la línea

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

}
