import { ApoyoCausa } from "../domain/apoyoCausa.domain";

export abstract class IApoyoService {
    abstract get(prefix: string, key: string): Promise<number | 0>;
    abstract incr(prefix: string, key: string): Promise<number | -1>;
    abstract delete(prefix: string, key: string): Promise<void>;
  }
  