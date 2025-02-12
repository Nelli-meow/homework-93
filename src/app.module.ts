import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artists/artist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { AlbumController } from './albums/album.controller';
import { Album, AlbumsSchema } from './schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/spotify'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumsSchema },
    ]),
  ],
  controllers: [AppController, ArtistController, AlbumController],
  providers: [AppService],
})
export class AppModule {}
