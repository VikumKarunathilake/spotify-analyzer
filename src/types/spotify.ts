export type Track = {
    name: string;
    artist: string;
    albumArt: string;
    playCount: number;
  };
  
  export type Artist = {
    name: string;
    profileImage: string;
    totalListeningTime: number;
    genres: string[];
  };