import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { SearchService } from '../search/service/search.service';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, AfterViewInit {

  faSearch = faSearch;

  registerType : number = 0; //0 = Não definido, 1 = Aluno, 2 = Professor, 3 = update, 4 = entidade
  message : string = "Insira aqui imagem/título irado";

  searchText : string = "";
  newClient : clienteJudocaInterface = {
    "cbj" : "",
    "cpf" : "",
    "dataNasc" : "",
    "email" : "",
    "nome" : "",
    "ob" : "",
    "org" : "",
    "rg" : "",
    "tel1" : "",
    "tel2" : "",
    "tipo" : "",
  };

  newEntity : entidadeInterface = {
    "nome" : "",
    "cnpj" : "",
    "id" : "",
    "dataCadastro" : "",
  }

  constructor(
    private searchService : SearchService,
    private registerService : RegisterService,
    private Router : Router,
    private ActivatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.Router.url.slice(1,7) == 'update') {
      this.ActivatedRoute.params.subscribe( params => {
        if( params && params.cpf ) {
          this.registerType = 3;
          this.message = "Carregando dados do usuário";
          this.newClient = {
            "cbj" : "...",
            "cpf" : "...",
            "dataNasc" : "...",
            "email" : "...",
            "nome" : "...",
            "ob" : "...",
            "org" : "...",
            "rg" : "...",
            "tel1" : "...",
            "tel2" : "...",
            "tipo" : "...",
          };
          this.searchService.getClientData(params.cpf).subscribe( clientData => {
            this.message = '';
            this.newClient = clientData;
            this.newClient.dataNasc = this.newClient.dataNasc.slice(0,10)
          })
        }
      })
    }
  }

  ngAfterViewInit(): void {
    document.getElementById('registerBody').style.height = window.innerHeight - 71 + 'px';
  }

  registerClient() : void {
    this.registerService.registerClient(this.newClient, this.registerType).subscribe( (responseJSON : any) => {
      if( responseJSON.id == -1 ) this.message = "CPF já cadastrado";
      else this.message = "Cliente cadastrado com sucesso! ID de cadastro: " + responseJSON.id;    
    },
    () => {
      this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
    },
    () => {
      this.registerType = 0;
      
      this.newClient = {
        "cbj" : "",
        "cpf" : "",
        "dataNasc" : "",
        "email" : "",
        "nome" : "",
        "ob" : "",
        "org" : "",
        "rg" : "",
        "tel1" : "",
        "tel2" : "",
        "tipo" : "",
      };

      setTimeout(() => {
        this.message = "Insira aqui imagem/título irado";
      }, 10000);
    })
  }

  updateClient() : void {
    this.registerService.updateClient(this.newClient).subscribe( (responseJson : any) => {
      this.message = "Perfil atualizado com sucesso!";
    },
    () => {
      this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
    },
    () => {
      scroll({
        top: 0,
        behavior: "smooth"
      });
    })
  }

  registerEntity() : void {
    this.registerService.registerEntity(this.newEntity).subscribe( (responseJSON : any) => {
      if( responseJSON.id == -1 ) this.message = "CNPJ já cadastrado";
      else this.message = "Entidade cadastrada com sucesso! Id do cadastro: " + responseJSON.id;  
    },
    () => {
      this.message = "Ocorreu um erro inesperado, contate o administrador da aplicação.";
    },
    () => {
      this.registerType = 0;
      
      this.newEntity = {
        "nome" : "",
        "cnpj" : "",
        "id" : "",
        "dataCadastro" : ""
      }

      setTimeout(() => {
        this.message = "Insira aqui imagem/título irado";
      }, 10000);
    })
  }

  isAllFieldFulfilled() : boolean {
    return true;    
  }

  redirectTo(to : string): void {
    this.Router.navigateByUrl(to);
  }
}
