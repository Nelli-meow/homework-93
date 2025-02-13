import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist } from './schemas/artist.schema';
import { Album } from './schemas/album.schema';
import { Track } from './schemas/track.schema';

@Injectable()
export class Fixtures {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
  ) {}

  async seed() {
    await this.artistModel.deleteMany({});
    await this.albumModel.deleteMany({});
    await this.trackModel.deleteMany({});

    const [oxxymiron, noize] = await this.artistModel.create([
      {
        name: 'Oxxymiron',
        photo: './fixtures/artists/scale_1200.jpg',
        information: 'Российский рэпер',
      },
      {
        name: 'Noize MC',
        photo: './fixtures/artists/Noize_MC_MRPL_City_2018.jpg',
        information: 'Российский музыкант',
      },
    ]);

    const [gorgorod, newAlbum] = await this.albumModel.create([
      {
        name: 'Горгород',
        artist: oxxymiron._id,
        image: './fixtures/albums/Cover_of_Gorgorod.jpg',
        year: 2015,
      },
      {
        name: 'Новый альбом',
        artist: noize._id,
        image: './fixtures/albums/Noize_MC_-_Новый_альбом.jpg',
        year: 2020,
      },
    ]);

    await this.trackModel.create([
      {
        name: 'Кто убил Марка?',
        album: gorgorod._id,
        duration: '3:15',
        number: 1,
      },
      {
        name: 'Выдыхай',
        album: newAlbum._id,
        duration: '4:20',
        number: 2,
      },
    ]);
  }
}
