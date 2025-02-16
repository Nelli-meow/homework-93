import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.schema';

export type AlbumsDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  image: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Artist' })
  artist: Artist;

  @Prop({ required: true })
  year: string;
}

export const AlbumsSchema = SchemaFactory.createForClass(Album);
