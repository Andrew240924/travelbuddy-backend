import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SavedRoutesService } from './saved-routes.service';
import { SavedRouteResponseDto } from './dto/saved-route-response.dto';
import { MessageResponseDto } from '../common/dto/message-response.dto';

@Controller('saved')
@ApiTags('saved-routes')
export class SavedRoutesController {

  constructor(private savedRoutesService: SavedRoutesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Save route' })
  @ApiParam({ name: 'routeId', type: Number })
  @ApiCreatedResponse({ type: SavedRouteResponseDto })
  @Post(':routeId')
  saveRoute(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.savedRoutesService.saveRoute(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove saved route' })
  @ApiParam({ name: 'routeId', type: Number })
  @ApiOkResponse({ type: MessageResponseDto })
  @Delete(':routeId')
  removeSavedRoute(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.savedRoutesService.removeSavedRoute(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get my saved routes' })
  @ApiOkResponse({ type: SavedRouteResponseDto, isArray: true })
  @Get()
  findMySavedRoutes(@Request() req) {
    return this.savedRoutesService.findMySavedRoutes(req.user);
  }
}
