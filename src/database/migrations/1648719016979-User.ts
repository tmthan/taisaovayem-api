import { UserRole, UserStatus } from 'src/modules/auth/types';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1648719016979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
            default: UserStatus.Active,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: false,
            default: UserRole.Member,
          },
          {
            name: 'createdAt',
            default: 'now()',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            default: 'now()',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            default: null,
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(): Promise<void> {}
}
