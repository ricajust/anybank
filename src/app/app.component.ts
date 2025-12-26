import { Component, computed, output, signal } from '@angular/core';
import { BannerComponent } from "./components/banner/banner.component";
import { FormNewTransactionComponent } from "./components/form-new-transaction/form-new-transaction.component";
import { Transaction } from './models/transaction';
import { TransactionType } from './enums/transactionType';

@Component({
  selector: 'app-root',
  imports: [BannerComponent, FormNewTransactionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anybank';

  transactions = signal<Transaction[]>([]);
  insufficientBalance: boolean = false;

  balance = computed(() => {
    return this.transactions().reduce((acc, actualTransaction) => {
      switch (actualTransaction.type) {
        case TransactionType.DEPOSIT:
          return acc + actualTransaction.value;
        case TransactionType.WITHDRAWAL:
          return acc - actualTransaction.value;
        default:
          throw new Error("Transaction type not identified");
      }
    }, 0);
  });

  constructor() { }

  processTransaction(transaction: Transaction) {
    console.log("TRANSACOES: ", this.transactions());
    if(transaction.type === TransactionType.WITHDRAWAL) {
      if (this.balanceIsSufficient(transaction)) {
        this.transactions.update((actualArray) => [transaction, ...actualArray]);
        this.insufficientBalance = false;
      } else {
        this.insufficientBalance = true;
        throw new Error("Saldo insuficiente...");
      }
    } else {
      this.transactions.update((actualArray) => [transaction, ...actualArray]);
      this.insufficientBalance = false;
    }
  }

  balanceIsSufficient(transaction: Transaction): boolean {
    if(this.balance() < transaction.value) {
      console.log("Saldo insuficiente: ", this.balance());
      return false;
    }
    return true;
  }

}
