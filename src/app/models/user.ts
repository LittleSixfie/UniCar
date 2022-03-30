import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export class User {
    userName!: String;
    userAge?: Number;
    userPassword?: String;
    userEmail?: String;
    userTlf?: String;
    userDriver?: Boolean;
    userDriverLicense?: String;
    userPic?: String;
    driverPoints?: Number;
    passengerPoints?: Number;
    favTrips?: DocumentReference<DocumentData>
    createdTrips?: DocumentReference<DocumentData>
    requestedTrips?: DocumentReference<DocumentData>
}
