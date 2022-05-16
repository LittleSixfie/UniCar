import { DocumentData, DocumentReference } from '@angular/fire/firestore';

export class User {
    id?: string;
    userName?: string;
    userAge?: Number;
    userPassword?: string;
    userEmail?: string;
    userTlf?: String;
    userDriver?: Boolean;
    userDriverLicense?: string;
    userPic?: string;
    driverPoints?: Number;
    passengerPoints?: Number;
    favTrips?: DocumentReference<DocumentData>
    createdTrips?: DocumentReference<DocumentData>
    requestedTrips?: DocumentReference<DocumentData>
}
