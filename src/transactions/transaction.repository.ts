import { CreateGetTransactionSummary } from './dto/create-get-transaction-summary.dto';
import { GetTransactionSummary } from './dto/get-transaction-summary.dto';
import { Transactions } from './transactions.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

export class TransactionRepository extends EntityRepository<Transactions> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Transactions);
  }
  async createTransaction(transactions: Transactions) {
    await this.entityManager.persistAndFlush(transactions);
    return transactions;
  }
  async getMonthlyPaymentSummaries(
    createSummary: CreateGetTransactionSummary,
  ): Promise<GetTransactionSummary[]> {
    const { month, year } = createSummary;

    const sql = `
    SELECT
      DATE_PART('month', t."created_at") AS month,
      DATE_PART('year', t."created_at") AS year,
      SUM(t."amount") AS "totalAmount"
    FROM
      transactions t
    WHERE
      DATE_PART('year', t."created_at") = ${year}
      AND DATE_PART('month', t."created_at") = ${month}
    GROUP BY
      DATE_PART('month', t."created_at"),
      DATE_PART('year', t."created_at");
  
  `;
    const result = await this.entityManager.getConnection().execute(sql);

    return result.map(
      (row: any) =>
        ({
          month: row.month,
          year: row.year,
          totalAmount: row.totalAmount,
        } as GetTransactionSummary),
    );
  }
}
