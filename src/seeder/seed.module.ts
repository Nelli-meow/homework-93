import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from '../schemas/artist.schema';
import { Album, AlbumsSchema } from '../schemas/album.schema';
import { Track, TrackSchema } from '../schemas/track.schema';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify-2'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumsSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
  providers: [SeederService],
})
export class SeedModule {}
