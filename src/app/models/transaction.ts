import { TransactionType } from "../enums/transactionType"

export class Transaction {
	constructor(
		public readonly type: TransactionType, 
		public readonly value: number) {
		
	}
}
