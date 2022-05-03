import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  //Get API 
  danhsachbenhnhanApi(data: any) {
    return this.http.post<any>("http://localhost:3000/danhsachbenhnhan/", data);
  }

  getdanhsachbenhnhanApi() {
    return this.http.get<any>("http://localhost:3000/danhsachbenhnhan/");
  }
  putdanhsachbenhnhanApi(data:any,id:any){
    return this.http.put<any>("http://localhost:3000/danhsachbenhnhan/"+id,data)
  }
  deletedanhsachbenhnhanApi(id:number){
    return this.http.delete<any>("http://localhost:3000/danhsachbenhnhan/"+id)
  }
}
