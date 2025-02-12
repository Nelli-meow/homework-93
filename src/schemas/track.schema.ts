import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Album } from './album.schema';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ default: null, type: mongoose.Types.ObjectId, ref: 'Album' })
  album: Album;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
