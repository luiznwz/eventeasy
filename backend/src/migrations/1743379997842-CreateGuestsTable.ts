import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGuestsTable1620000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'guests',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '150',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'event_id',
                        type: 'uuid',
                    },
                    {
                        name: 'is_attending',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
                uniques: [
                    {
                        name: 'UQ_guest_user_event',
                        columnNames: ['user_id', 'event_id'],
                    },
                ],
                checks: [
                    {
                        name: 'CHK_guest_user_or_name_email',
                        expression: '("user_id" IS NOT NULL) OR ("name" IS NOT NULL AND "email" IS NOT NULL)',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('guests');
    }
}
