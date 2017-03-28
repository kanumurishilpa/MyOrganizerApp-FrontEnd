import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataProvider {
  constructor(private angFire: AngularFire) {}

  push(path: string, data: any): Observable<any> {
    return Observable.create(observer => {
      this.angFire.database.list(path).push(data).then(firebaseNewData => {
        // Return the uid created
        let newData: any = firebaseNewData;
        observer.next(newData.path.o[newData.path.o.length - 1]);
      }, error => {
        observer.error(error);
      });
    });
  }

  update(path: string, data: any) {
    this.angFire.database.object(path).update(data);
  }

  list(path: string): FirebaseListObservable<any> {
    return this.angFire.database.list(path);
  }

  object(path: string): FirebaseObjectObservable<any> {
    return this.angFire.database.object(path);
  }

  remove(path: string): Observable<any> {
    return Observable.create(observer => {
      this.angFire.database.object(path).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }
}
