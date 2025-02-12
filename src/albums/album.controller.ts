import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumsDocument } from '../schemas/album.schema';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumsDocument>,
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  getAllAlbums() {
    return this.albumModel.find();
  }

  @Get(':id')
  async getOneAlbum(@Param('id') id: string) {
    const album = await this.albumModel.findOne({ id: id });

    if (!album) throw new NotFoundException(`Album with id ${id}`);
    return album;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async createOneAlbum(
    @Body() albumData: CreateAlbumDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const artist = await this.artistModel.findById(albumData.artist);
    if (!artist) throw new NotFoundException(`Artist not found`);
    const album = new this.albumModel({
      name: albumData.name,
      image: file ? `/uploads/albums/${file.filename}` : null,
      artist: albumData.artist,
      year: new Date().getFullYear(),
    });

    return album.save();
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const deletedAlbum = await this.albumModel.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return { message: `Album not found` };
    }
    return { message: `Album was deleted` };
  }
}
