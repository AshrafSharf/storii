import {Directive,ElementRef} from 'angular2/core';

declare var jQuery: any;

@Directive({
  selector: '[hover]',
  host: {
    '(mouseenter)': 'invert()'
  }
})

export class Hover {
  private el:HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }

    invert(){
        jQuery('.'+this.el['nextElementSibling']['className']).slideToggle('fast');
        var arrow = jQuery('.'+this.el['className']).find('i');
        var classes = arrow.attr('class');
        if(classes == 'fa fa-angle-up'){
            arrow.removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
        }else if(classes == 'fa fa-angle-down'){
            arrow.removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
        }
    }

}