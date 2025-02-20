import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('vehicles') 
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({ status: 201, description: 'The vehicle has been successfully created.' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all vehicles' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter vehicles by status' })
  @ApiResponse({ status: 200, description: 'Return all vehicles.' })
  findAll(@Query('status') status: string) {
    return this.vehiclesService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: Number })
  @ApiResponse({ status: 200, description: 'Return a single vehicle.' })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: Number })
  @ApiResponse({ status: 200, description: 'The vehicle has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiParam({ name: 'id', description: 'ID of the vehicle', type: Number })
  @ApiResponse({ status: 200, description: 'The vehicle has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
