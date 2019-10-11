import { Pipe, PipeTransform } from '@angular/core';



@Pipe({ name: 'default' })

export class Custom implements PipeTransform {
  transform(value: string, fallback: string): string {
    let image = "";
    const extn = value.match(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.jpeg)$/i);

    if (extn!=null) {
      console.log(extn.input);
      image = value;
    }
    else {
      console.log(value);
      image = fallback;
    }
    return image;
  }
}

