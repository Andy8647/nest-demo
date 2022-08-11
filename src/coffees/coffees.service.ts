import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeEntity } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,
  ) {}

  findAll(): Promise<CoffeeEntity[]> {
    return this.coffeeRepository.find();
  }

  async findOne(id: number): Promise<CoffeeEntity> {
    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID "${id}" not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID "${id}" not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
