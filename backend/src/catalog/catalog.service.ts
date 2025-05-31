import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) { }

  async create(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    try {
      const catalog = this.catalogRepository.create(createCatalogDto);

      return await this.catalogRepository.save(catalog);
    } catch (error) {
      throw new InternalServerErrorException('Error creating catalog');
    }
  }

  async findAll(): Promise<Catalog[]> {
    try {
      return await this.catalogRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving catalogs');
    }
  }

  async findOne(id: string): Promise<Catalog> {
    try {
      const catalog = await this.catalogRepository.findOne({ where: { id } });

      if (!catalog) {
        throw new NotFoundException(`Catalog with id ${id} not found`);
      }

      return catalog;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Error retrieving catalog');
    }
  }
}
