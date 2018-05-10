import { Component, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AfAuthService } from '../services/af-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private afAuthService: AfAuthService,
		@Inject(MAT_DIALOG_DATA) public data: any)
	{
		this.afAuthService.getAuthState$.subscribe(user => {
			if (user) this.dialogRef.close();
		});
	}

  login() {
		this.afAuthService.login();
	}

}
