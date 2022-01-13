import {ListedServer} from "./ListedServer";

export interface PagedResponse {
  servers: ListedServer[];
  totalServers: number;
}
