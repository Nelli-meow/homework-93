import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('artists')
export class ArtistController {
  constructor(
    @InjectModel(Artist.name)
    private readonly artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAllArtists() {
    return this.artistModel.find();
  }

  @Get(':id')
  getOneArtist(@Param('id') id: string) {
    return this.artistModel.findById(id);
  }

  @Post()
  createOneArtist() {
    return { message: 'Artist was created' };
  }

  @Delete(':id')
  deleteArtist(@Param('id') id: string) {
    return { message: 'Artist was deleted' + id };
  }
}
