import { Component } from '@angular/core';
//import { Plat } from '../models/models';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  plats:any[]=[
    {nom:'Foie Gras Poêlé',
    prix:'130',
    image:'https://www.foie-gras-sarlat.com/content/upload/images/recette-foie-gras-poele.jpg'},
    {nom:'Filet de Bœuf Rossini',
    prix:'180',
    image:'https://resize.elle.fr/portrait/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/tournedos-rossini-sauce-perigueux-2066736/21651872-1-fre-FR/Tournedos-Rossini-sauce-Perigueux.png'},
    {nom:'Soufflé au Fromage',
    prix:'100',
    image:'https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2020-05/hd-7souffle-fromage.jpg'},
  ]
}
