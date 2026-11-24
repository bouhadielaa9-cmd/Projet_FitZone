import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Administrateur } from '../models/administrateur';
const URL='http://localhost:3000/admins'
@Service()
export class Auth {
    private readonly _http=inject(HttpClient);
    private readonly _admin=signal<Administrateur[]>([]);
    admin=this._admin.asReadonly();
    getlogin():Observable<Administrateur[]>{
        return this._http.get<Administrateur[]>(URL).pipe(
            tap(
                login=>this._admin.set(login)
            )
        )
    }
    updatelogin(a:Administrateur):Observable<Administrateur>{
return this._http.put<Administrateur>(`${URL}/${a.id}`,a).pipe(
    tap(updateadmin =>
this._admin.update(alllogin=>
    alllogin.map(p=>(p.id==a.id)?updateadmin:p)
)
    )
)
    }
}
