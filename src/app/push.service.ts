import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class PushService {

  pushData:any = []

  constructor(private http:Http) { }

  // Providers function that triggers a push operation
  generatePush(pushData) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'key=AAAAoF8fNy4:APA91bFQnmivEDtfwqIfERO33sOeo_028neLxBDiFK7xIxiM8ZMt8dxtAP0QCaFel2tG3fVMJ1AoLgS0B6I7FBLN3HVsXZxZyCPt1LSOCNbSX1w8BrtwfAr4hgldQ15Mm_soBXVpaolt'})
    let options = new RequestOptions({ headers: headers })
    return this.http.post('https://fcm.googleapis.com/fcm/send', pushData, options)
        .map(data => {console.log("Successfully Sent")})
  }

}