import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArtistDto } from './create-artist.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { RolesGuard } from '../roles-guard/roles-guard.guard';

@Controller('artists')
export class ArtistController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAllArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOneArtist(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  async createOneArtist(
    @Body() artistData: CreateArtistDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const artist = new this.artistModel({
      name: artistData.name,
      image: file ? `/uploads/artists/${file.filename}` : null,
      description: artistData.description,
    });

    return artist.save();
  }

  @UseGuards(TokenAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    const deletedArtist = await this.artistModel.findByIdAndDelete(id);
    if (!deletedArtist) {
      return { message: `Artist not found` };
    }
    return { message: `Artist was deleted` };
  }
}
