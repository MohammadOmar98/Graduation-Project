import { Component, Input, OnInit } from '@angular/core';
import { FormControlName, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IAdress } from 'src/app/shared/models/address';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
 @Input() checkoutForm: FormGroup;

 constructor(private accountService: AccountService, private toastr: ToastrService) { }

 // tslint:disable-next-line:typedef
 ngOnInit() {
 }

 // tslint:disable-next-line:typedef
 saveUserAddress() {
   this.accountService.updateUserAddress(this.checkoutForm.get('addressForm').value)
     .subscribe((address: IAdress) => {
       this.toastr.success('Address saved');
       this.checkoutForm.get('addressForm').reset(address);
     }, error => {
       this.toastr.error(error.message);
       console.log(error);
     });
 }

}
