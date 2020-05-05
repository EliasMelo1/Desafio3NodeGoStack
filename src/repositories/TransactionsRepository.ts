import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private balance: Balance;

  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.value);
            break;

          case 'outcome':
            accumulator.outcome += Number(transaction.value);
            break;

          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    // this.balance = { income: 0, outcome: 0, total: 0 };
    // const transactions: Transaction[] = await this.find();

    // transactions.forEach(transaction => {
    //   if (transaction.type === 'income') {
    //     this.balance.income += transaction.value;
    //   } else {
    //     this.balance.outcome += transaction.value;
    //   }
    // });
    // this.balance.total = this.balance.income - this.balance.outcome;
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
