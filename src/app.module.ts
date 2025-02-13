import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artists/artist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { AlbumController } from './albums/album.controller';
import { Album, AlbumsSchema } from './schemas/album.schema';
import { TrackController } from './tracks/tracks.controller';
import { Track, TrackSchema } from './schemas/track.schema';
import { Fixtures } from './fixtures';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumsSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistController,
    AlbumController,
    TrackController,
  ],
  providers: [AppService, Fixtures],
})
export class AppModule {}
