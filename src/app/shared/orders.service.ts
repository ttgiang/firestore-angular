import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) {}

  form = new FormGroup({
    customerName: new FormControl(""),
    orderNumber: new FormControl(""),
    coffeeOrder: new FormControl(""),
    completed: new FormControl(false),
  });

  //Firestore CRUD actions example
  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("coffeeOrders")
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  updateCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  getCoffeeOrders() {
    // ref.where('state', '>=', 'CA').where('population', '>', 100000)
    // ref.where("population", ">", 100000).orderBy("country");
    // ref.where('tags.awesome', '==', true).orderBy('population')

    /*
    https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md

    Dynamic querying

    const size$ = new Subject<string>();
    const queryObservable = size$.pipe(
      switchMap(size => 
        afs.collection('items', ref => ref.where('size', '==', size)).valueChanges()
      )
    );

    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems);  
    });

    // trigger the query
    size$.next('large');

    // re-trigger the query!!!
    size$.next('small');
    */

    //afs.collection('items', ref => ref.where('size', '==', 'large'))
    return this.firestore
      .collection("coffeeOrders", (ref) => ref.orderBy("orderNumber", "desc"))
      .snapshotChanges();
  }

  deleteCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .delete();
  }
}
