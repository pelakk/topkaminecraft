export interface CompleteServer {
  id: number;
  name: string;
  online: number;
  maxPlayers: number;
  versionName: string;
  friendlyVersionName: string;
  versions: string[];
  motd: string;
  likes: number;
  createdAt: number;
  categories: string[];
  onlineHistory: Record<number, string>;
  likesHistory: Record<number, string>;
  premiumTimeExpire: number;
  realHostname: string;
  realPort: number;
  image: string;
  isActive: boolean;
  usefulUrl: Record<string, string>;

}

