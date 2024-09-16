import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

    transform(value: string, fontSize: number = 16): string {
      if (!value) return value;
  
      const pixelsPerCharacter = fontSize * 0.6; // Aproximadamente, depende de la fuente
      const maxCharsPerLine = Math.floor(150 / pixelsPerCharacter);
      let result = '';
      let line = '';
  
      for (let char of value) {
        if ((line.length + 1) * pixelsPerCharacter > 150) {
          result += line + '%%%';
          line = char;
        } else {
          line += char;
        }
      }
  
      result += line; // Añadir el resto de la línea
  
      return result;
    }

}
