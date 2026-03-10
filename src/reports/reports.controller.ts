import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Generate account report in HTML or XML' })
  @ApiQuery({
    name: 'format',
    required: false,
    enum: ['html', 'xml'],
    description: 'Report output format. Default is html',
  })
  @ApiOkResponse({
    description: 'Report file generated successfully',
  })
  @Get('account')
  async getAccountReport(
    @Request() req,
    @Query('format') format = 'html',
    @Res() res: Response,
  ) {
    const normalizedFormat = format.toLowerCase();

    if (normalizedFormat !== 'html' && normalizedFormat !== 'xml') {
      throw new BadRequestException('format must be html or xml');
    }

    const report = await this.reportsService.getAccountReport(req.user.userId);

    if (normalizedFormat === 'xml') {
      const xml = this.reportsService.toXml(report);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="account-report.xml"',
      );
      return res.send(xml);
    }

    const html = this.reportsService.toHtml(report);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="account-report.html"',
    );
    return res.send(html);
  }
}
