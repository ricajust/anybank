import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../enums/transactionType';

@Component({
  selector: 'app-form-new-transaction',
  imports: [ FormsModule, CommonModule, KeyValuePipe ],
  templateUrl: './form-new-transaction.component.html',
  styleUrl: './form-new-transaction.component.css'
})
export class FormNewTransactionComponent {

  transactionValue: string = "";
  transactionType: string = "";

  transactionCreated = output<Transaction>();
  transactionIsPossible = input.required<boolean>();

  transactionTypeEnum = TransactionType;

  constructor() { }

  onSubmit() {
    const transaction = new Transaction(
      this.transactionType as TransactionType,
      Number(this.transactionValue)
    );

    this.transactionCreated.emit(transaction);

    this.transactionType = "";
    this.transactionValue = "";
  }

}
