import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Post('newStudent')
  // Definiáljuk, hogy a newProduct végpontot milyen szerepkörökkel lehet elérni
  @Roles(Role.Admin, Role.Student)
  // Mindkét Guard kell a működéshez!
  @UseGuards(AuthGuard('bearer'), RolesGuard)
  newProduct() {
    // Új terméket hoz létre
    return "New product successfully created"
  }
}
