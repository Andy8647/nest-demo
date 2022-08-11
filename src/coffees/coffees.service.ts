import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeEntity } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: CoffeeEntity[] = [
    {
      id: 1,
      name: 'Cappuccino',
      brand: 'Starbucks',
      flavors: ['vanilla', 'caramel'],
    },
  ];

  findAll(): CoffeeEntity[] {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id === Number(id));
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update
    } else {
      // todo
    }
  }

  remove(id: string) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // remove
      this.coffees.splice(this.coffees.indexOf(existingCoffee), 1);
    } else {
      // todo
    }
  }
}
