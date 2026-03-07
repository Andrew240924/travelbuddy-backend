import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutePointDto } from './create-route-point.dto';

export class UpdateRoutePointDto extends PartialType(CreateRoutePointDto) {}
