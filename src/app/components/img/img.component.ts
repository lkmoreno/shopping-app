import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
   // console.log('change just img  =>' ,this.img);
    // code
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // before render no correr cosas asincronas y el constructor corre una sola vez
    // NO async -- once time
    //console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
     //antes  y durante del render
    // estar actualizando los cambios en los inputs -- puede correr las veces que se cambie
    // before - during render
    // changes inputs -- multiples times
   // console.log('ngOnChanges', 'imgValue =>', this.img);
    //console.log('changes', changes);
    // if (changes.) {
    //   // code
    // }
  }

  ngOnInit(): void {
    //antes del render
    // aqui se pueden correr cosas asincronas ejem fetch, llamados api y se corre una sola vez
    // before render
    // async - fetch -- once time
    //console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }

  ngAfterViewInit() {
    //despues del render
    // aqui se manejan los componentes hijos
    // after render
    // handler children -- once time
    //console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    //cuando se elimina el componente una sola vez
    //console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    //console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
