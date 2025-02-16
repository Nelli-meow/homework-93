import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { Album, AlbumsDocument } from '../schemas/album.schema';
import { Track, TrackDocument } from '../schemas/track.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumsDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
  ) {}

  async seed() {
    await this.artistModel.deleteMany({});
    await this.albumModel.deleteMany({});
    await this.trackModel.deleteMany({});

    const [oxxymiron, noize] = await this.artistModel.create([
      {
        name: 'Oxxymiron',
        image: './fixtures/artists/scale_1200.jpg',
        description: 'Российский рэпер',
      },
      {
        name: 'Noize MC',
        image: './fixtures/artists/Noize_MC_MRPL_City_2018.jpg',
        description: 'Российский музыкант',
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
