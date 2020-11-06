import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clienteJudocaInterface } from 'src/app/util/clienteJudoca';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { entidadeInterface } from 'src/app/util/entidade';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private clientRegisterUrl : string = environment.baseUrl + 'Teste/NA/{registerType}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}';
  private clientUpdateUrl : string = environment.baseUrl + 'Teste/NA/atualizar/{id}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}/{tipo}';
  private entityRegisterUrl : string = environment.baseUrl + 'Teste/NA/entidade/{nome}/{cnpj}';

  constructor(
    private http : HttpClient,
  ) { }

  registerClient(newClient : clienteJudocaInterface, registerType : number) : Observable<JSON> {

    let clientRegisterUrl = this.clientRegisterUrl
      .replace('{nome}', newClient.nome)
      .replace('{dataNasc}', newClient.dataNasc)
      .replace('{cbj}', newClient.cbj)
      .replace('{tel1}', newClient.tel1)
      .replace('{tel2}', newClient.tel2)
      .replace('{email}', newClient.email)
      .replace('{cpf}', newClient.cpf)
      .replace('{rg}', newClient.rg)
      .replace('{org}', newClient.org);
      newClient.ob ? clientRegisterUrl = clientRegisterUrl.replace("{ob?}", newClient.ob) : clientRegisterUrl = clientRegisterUrl.replace("/{ob?}", "");
    
    if( registerType == 1 ) clientRegisterUrl = clientRegisterUrl.replace('{registerType}','aluno');
    else if( registerType == 2 ) clientRegisterUrl = clientRegisterUrl.replace('{registerType}','professor');

    return this.http.get<JSON>(clientRegisterUrl);
  }

  updateClient(client : clienteJudocaInterface) : Observable<JSON> {
    //  private clientUpdateUrl : string = environment.baseUrl + 'Teste/NA/atualizar/{id}/{nome}/{dataNasc}/{cbj}/{tel1}/{tel2}/{email}/{cpf}/{rg}/{org}/{ob?}/{tipo}';
    let clientUpdateUrl = this.clientUpdateUrl
      .replace('{id}', client.id)
      .replace('{nome}', client.nome)
      .replace('{dataNasc}', client.dataNasc)
      .replace('{cbj}', client.cbj)
      .replace('{tel1}', client.tel1)
      .replace('{tel2}', client.tel2)
      .replace('{email}', client.email)
      .replace('{cpf}', client.cpf)
      .replace('{rg}', client.rg)
      .replace('{org}', client.org)
      .replace('{tipo}', client.tipo);
      client.ob ? clientUpdateUrl = clientUpdateUrl.replace("{ob?}", client.ob) : clientUpdateUrl = clientUpdateUrl.replace("{ob?}", "null");

      return this.http.get<JSON>(clientUpdateUrl);
  }

  registerEntity(newEntity : entidadeInterface) : Observable<JSON> {
    let entityRegisterUrl = this.entityRegisterUrl
      .replace('{nome}', newEntity.nome)
      .replace('{cnpj}', newEntity.cnpj);

    return this.http.get<JSON>(entityRegisterUrl);
  }

}