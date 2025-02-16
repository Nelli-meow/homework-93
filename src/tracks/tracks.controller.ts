import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumsDocument } from '../schemas/album.schema';
import { Model } from 'mongoose';
import { Track, TrackDocument } from '../schemas/track.schema';
import { CreateTrackDto } from './create-track.dto';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { RolesGuard } from '../roles-guard/roles-guard.guard';

@Controller('tracks')
export class TrackController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
    @InjectModel(Album.name)
    private albumModel: Model<AlbumsDocument>,
  ) {}

  @Get()
  getAllTracks() {
    return this.trackModel.find();
  }

  @Get(':id')
  async getOneTrack(@Param('id') id: string) {
    const track = await this.trackModel.findOne({ id: id });

    if (!track) throw new NotFoundException(`Album with id ${id}`);
    return track;
  }

  @UseGuards(TokenAuthGuard)
  @Post()
  async createOneTrack(@Body() trackData: CreateTrackDto) {
    const album = await this.albumModel.findById(trackData.album);
    if (!album) throw new NotFoundException(`Album not found`);

    const newTrack = new this.trackModel({
      name: trackData.name,
      album: trackData.album,
    });

    return newTrack.save();
  }

  @UseGuards(TokenAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    if (!deletedTrack) {
      return { message: `track not found` };
    }
    return { message: `track was deleted` };
  }
}
