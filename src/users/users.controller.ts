import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { instanceToPlain } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return instanceToPlain(this.userService.findAll());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return instanceToPlain(this.userService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { affected } = await this.userService.update(id, updateUserDto);
    if (!affected) throw new NotFoundException(`User with id ${id} not found`);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const { affected } = await this.userService.remove(id);
    if (!affected) throw new NotFoundException(`User with id ${id} not found`);
  }
}
