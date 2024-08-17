import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemService } from './item.service';
import { Item } from './item.iterface';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() item: Item,
  ): Promise<Item> {
    if (file) {
      item.image = file.filename;
    }
    console.log('Received item:', item);
    return this.itemService.create(item);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    const item = await this.itemService.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() item: Item,
  ): Promise<Item> {
    if (file) {
      item.image = file.filename; // Met à jour l'image si un fichier est fourni
    }
    const updatedItem = await this.itemService.update(id, item);
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Item> {
    const deletedItem = await this.itemService.deleteById(id);
    if (!deletedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return deletedItem;
  }
}
