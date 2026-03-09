import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

import { RoutesService } from './routes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RouteResponseDto } from './dto/route-response.dto';
import { DeleteResultDto } from './dto/delete-result.dto';
import { UploadImageResponseDto } from './dto/upload-image-response.dto';
import {
  buildRouteImageUrl,
  routeImageUploadConfig,
} from '../common/upload/upload.config';

@Controller('routes')
@ApiTags('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @ApiOperation({ summary: 'Get all routes' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @ApiOperation({ summary: 'Get public routes only' })
  @ApiOkResponse({ type: RouteResponseDto, isArray: true })
  @Get('/public')
  findPublic() {
    return this.routesService.findPublic();
  }

  @ApiOperation({ summary: 'Get route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.routesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Upload image for route' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['image'],
    },
  })
  @ApiCreatedResponse({ type: UploadImageResponseDto })
  @ApiBadRequestResponse({
    description: 'Only jpg, jpeg, png, webp files are allowed',
  })
  @ApiUnprocessableEntityResponse({
    description: 'File is larger than 5MB or file is missing',
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid' })
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image', routeImageUploadConfig))
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): UploadImageResponseDto {
    return {
      imageUrl: buildRouteImageUrl(file.filename),
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create route' })
  @ApiCreatedResponse({ type: RouteResponseDto })
  @Post()
  create(@Body() dto: CreateRouteDto, @Request() req) {
    return this.routesService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Publish route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Patch(':id/publish')
  publish(@Param('id') id: number) {
    return this.routesService.publish(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Mark route as completed by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Patch(':id/complete')
  complete(@Param('id') id: number) {
    return this.routesService.complete(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: RouteResponseDto })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateRouteDto) {
    return this.routesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete route by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: DeleteResultDto })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.routesService.delete(id);
  }
}
