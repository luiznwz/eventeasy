import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeys1743380344851 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // FK: events.user_id -> users.id
        await queryRunner.createForeignKey(
            'events',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // FK: guests.event_id -> events.id
        await queryRunner.createForeignKey(
            'guests',
            new TableForeignKey({
                columnNames: ['event_id'],
                referencedTableName: 'events',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // FK: guests.user_id -> users.id
        await queryRunner.createForeignKey(
            'guests',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

        // FK: wish_list.event_id -> events.id
        await queryRunner.createForeignKey(
            'wish_list',
            new TableForeignKey({
                columnNames: ['event_id'],
                referencedTableName: 'events',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // FK: wish_list.catalog_id -> catalogs.id
        await queryRunner.createForeignKey(
            'wish_list',
            new TableForeignKey({
                columnNames: ['catalog_id'],
                referencedTableName: 'catalogs',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // FK: event_wish_list.wish_list_id -> wish_list.id
        await queryRunner.createForeignKey(
            'event_wish_list',
            new TableForeignKey({
                columnNames: ['wish_list_id'],
                referencedTableName: 'wish_list',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // event_wish_list.wish_list_id
        const tableEventWishList = await queryRunner.getTable('event_wish_list');
        if (tableEventWishList) {
            const fkEventWishList = tableEventWishList.foreignKeys.find(fk =>
                fk.columnNames.includes('wish_list_id'),
            );
            if (fkEventWishList) {
                await queryRunner.dropForeignKey('event_wish_list', fkEventWishList);
            }
        }

        // wish_list.catalog_id
        const tableWishList = await queryRunner.getTable('wish_list');
        if (tableWishList) {
            const fkWishListCatalog = tableWishList.foreignKeys.find(fk =>
                fk.columnNames.includes('catalog_id'),
            );
            if (fkWishListCatalog) {
                await queryRunner.dropForeignKey('wish_list', fkWishListCatalog);
            }

            // wish_list.event_id
            const fkWishListEvent = tableWishList.foreignKeys.find(fk =>
                fk.columnNames.includes('event_id'),
            );
            if (fkWishListEvent) {
                await queryRunner.dropForeignKey('wish_list', fkWishListEvent);
            }
        }

        // guests.user_id e guests.event_id
        const tableGuests = await queryRunner.getTable('guests');
        if (tableGuests) {
            const fkGuestsUser = tableGuests.foreignKeys.find(fk =>
                fk.columnNames.includes('user_id'),
            );
            if (fkGuestsUser) {
                await queryRunner.dropForeignKey('guests', fkGuestsUser);
            }

            const fkGuestsEvent = tableGuests.foreignKeys.find(fk =>
                fk.columnNames.includes('event_id'),
            );
            if (fkGuestsEvent) {
                await queryRunner.dropForeignKey('guests', fkGuestsEvent);
            }
        }

        // events.user_id
        const tableEvents = await queryRunner.getTable('events');
        if (tableEvents) {
            const fkEventsUser = tableEvents.foreignKeys.find(fk =>
                fk.columnNames.includes('user_id'),
            );
            if (fkEventsUser) {
                await queryRunner.dropForeignKey('events', fkEventsUser);
            }
        }
    }
}
