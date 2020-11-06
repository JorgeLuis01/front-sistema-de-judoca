import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  message : string = "Buscando...";
  customer : clienteJudocaInterface;
  entityList : entidadeInterface[];

  constructor(
    private ActivatedRoute : ActivatedRoute,
    private SearchService : SearchService,
    private Router : Router,
  ) { }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe( (params : any) => {
      if( params.cpf != 'entities' ) this.SearchService.getClientData(params.cpf).subscribe( res => {
        if( res.id == '-1' ) this.message = "Nenhum cliente foi encontrado!";
        else { this.customer = res; this.message = "Dados cadastrais do(a) " + this.customer.nome; }
      })
      else {
        this.SearchService.getEntityList().subscribe( res => {
          this.entityList = res; this.message = "Existem " + this.entityList.length + " entidades cadastradas";
        });
      }
    });
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }

}
