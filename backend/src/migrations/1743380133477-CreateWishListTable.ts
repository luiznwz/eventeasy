import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWishListTable1743380133477 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'wish_list',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        default: '1',
                    },
                    {
                        name: 'priority',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'event_id',
                        type: 'uuid',
                    },
                    {
                        name: 'catalog_id',
                        type: 'uuid',
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
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('wish_list');
    }
}
