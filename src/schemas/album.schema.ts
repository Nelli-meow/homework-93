import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Artist } from './artist.schema';

export type AlbumsDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ default: null, type: String })
  image: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Artist' })
  artist: Artist;

  @Prop({ required: true, type: String })
  year: string;
}

export const AlbumsSchema = SchemaFactory.createForClass(Album);
