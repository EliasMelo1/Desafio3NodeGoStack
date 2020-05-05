import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class ForeignKeyTransactionCategory1588125345421
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        // Nome da coluna aqui dentro
        columnNames: ['category_id'],
        // ELe se relaciona com qual Coluna da outra tabela?
        referencedColumnNames: ['id'],
        // Nome da tabela que faz referencia que faz referencia com esse campo?
        referencedTableName: 'categories',
        name: 'TrasactionCategory',
        // Restrict, Set null, Cascade
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TrasactionCategory');
    await queryRunner.dropColumn('transactions', 'category_id');
  }
}
