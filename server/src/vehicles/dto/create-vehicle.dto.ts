import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'The license plate of the vehicle',
    example: 'ABC123',
  })
  @IsNotEmpty()
  @IsString()
  licensePlate: string;

  @ApiProperty({
    description: 'The manufacturer of the vehicle',
    example: 'Toyota',
  })
  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @ApiProperty({
    description: 'The model of the vehicle',
    example: 'Corolla',
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiPropertyOptional({
    description: 'The status of the vehicle',
    example: 'active',
  })
  @IsOptional()
  @IsString()
  status?: string;
}
