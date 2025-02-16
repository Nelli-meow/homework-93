import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  image: string;

  @Prop({ required: true })
  description: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
