import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}


  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
   
    const existingVehicle = await this.vehicleRepository.findOne({ where: { licensePlate: createVehicleDto.licensePlate } });
    if (existingVehicle) {
      throw new ConflictException('License plate must be unique');
    }

    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(newVehicle);
  }

  async findAll(status?: string): Promise<Vehicle[]> {
    if (status) {
      return this.vehicleRepository.find({ where: { status } });
    }
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID=${id} not found`);
    }
    return vehicle;
  }
  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {

    if (updateVehicleDto.licensePlate) {
      const conflictVehicle = await this.vehicleRepository.findOne({
        where: {
          licensePlate: updateVehicleDto.licensePlate,
          id: Not(id), 
        },
      });
      if (conflictVehicle) {
        throw new ConflictException('License plate must be unique');
      }
    }
  
 
    const updateResult = await this.vehicleRepository.update({ id }, updateVehicleDto);
    
 
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
  
   
    const updatedVehicle = await this.vehicleRepository.findOneBy({ id });
    return updatedVehicle;
  }

  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }
}
