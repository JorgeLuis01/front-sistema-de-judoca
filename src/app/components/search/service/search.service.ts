import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { entidadeInterface } from 'src/app/util/entidade';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchUrl : string = environment.baseUrl + 'Teste/NA/pesquisa/{cpf}';
  private searchEntityList : string = environment.baseUrl + 'Teste/NA/entidade/busca';

  constructor(
    private http : HttpClient,
  ) { }

  getClientData(cpf : string) : Observable<clienteJudocaInterface> {
    let searchUrl = this.searchUrl.replace('{cpf}', cpf);
    return this.http.get<JSON>(searchUrl).pipe(
      map( ( responseJson : any ) => {
        let newClientJudoca : clienteJudocaInterface = {
          "nome" : responseJson.nome,
          "dataNasc" : responseJson.aniversario,
          "dataCadastro" : responseJson.dataCadastro,
          "cbj" : responseJson.registroCbj,
          "tel1" : responseJson.telefone1,
          "tel2" : responseJson.telefone2,
          "email" : responseJson.email,
          "cpf" : responseJson.cpf,
          "rg" : responseJson.rg,
          "org" : responseJson.orgaoExp,
          "ob" : responseJson.observacao,
          "id" : responseJson.id,
          "tipo" : responseJson.tipo,
        }

        return newClientJudoca;
      })
    )
  }

  getEntityList() : Observable<entidadeInterface[]> {
    return this.http.get<JSON>(this.searchEntityList).pipe(
      map( (entityJsonArray : any) => {
        let newEntityArray : entidadeInterface[] = [];
        entityJsonArray.forEach( (entityJson : any) => {
          let newEntity : entidadeInterface = {
            "nome" : entityJson.nome,
            "id" : entityJson.id,
            "dataCadastro" : entityJson.dataCadastro,
            "cnpj" : entityJson.cnpj
          }

          newEntityArray.push(newEntity);
        });

        return newEntityArray;
      })
    )
  }
}
