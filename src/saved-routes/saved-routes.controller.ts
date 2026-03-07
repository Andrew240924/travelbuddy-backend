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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SavedRoutesService } from './saved-routes.service';

@Controller('saved')
export class SavedRoutesController {

  constructor(private savedRoutesService: SavedRoutesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':routeId')
  saveRoute(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.savedRoutesService.saveRoute(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':routeId')
  removeSavedRoute(
    @Param('routeId', ParseIntPipe) routeId: number,
    @Request() req,
  ) {
    return this.savedRoutesService.removeSavedRoute(routeId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findMySavedRoutes(@Request() req) {
    return this.savedRoutesService.findMySavedRoutes(req.user);
  }
}
