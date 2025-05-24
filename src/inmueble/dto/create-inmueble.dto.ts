import { IsString, IsNumber, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export enum HouseStatus {
    AVAILABLE = 'disponible',
    SOLD = 'vendido',
}

export class CreateInmuebleDto {

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    price: number;

    @IsEnum(HouseStatus)
    status: HouseStatus;

    @IsNumber()
    sellerId: number;
}
