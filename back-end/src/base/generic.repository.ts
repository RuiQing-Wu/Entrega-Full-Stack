export abstract class IGenericRepository<T> {
  abstract create(item: T): Promise<T>;

  abstract get(id: string): Promise<T>;

  abstract getAll(): Promise<T[]>;

  abstract update(id: string, item: T): Promise<T>;

  abstract delete(id: string): Promise<T>;
}
