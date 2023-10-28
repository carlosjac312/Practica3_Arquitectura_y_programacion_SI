import mongoose from "npm:mongoose@7.6.3";

export enum formato {
  LP = 'LP',
  CD = 'CD',
  single = 'single',
  cassette = 'cassette',
  reel_to_reel = 'reel_to_reel',
  minidisc = 'minidisc', 
  videocd = 'videocd',
  vinyl = 'vinyl'
}

export type Disc = {
    name: string;
    author: string;
    format: formato;
    matrix?: string;
    country: string;
    id: string;
  };