import mongoose from "npm:mongoose@7.6.3";

export enum formato {//tipos de formatos
  LP = 'LP',
  CD = 'CD',
  single = 'single',
  cassette = 'cassette',
  reel_to_reel = 'reel_to_reel',
  minidisc = 'minidisc', 
  videocd = 'videocd',
  vinyl = 'vinyl'
}

export type Disc = {//tipo disco
    name: string;
    author: string;
    format: formato;
    matrix?: string;
    country: string;
    id: string;
  };