import { RepositoryError } from "src/base/repositoryError";
import { UsuarioSeguimiento } from "../domain/usuario_seguimiento";
import { SeguidorRepository } from "./seguidor.repository";
import neo4j, { Driver, RecordShape } from 'neo4j-driver';
import { EntityNotFoundError } from "src/base/entityNotFounError";

export class SeguidorRepositoryNeo4j implements SeguidorRepository {

    private readonly driver: Driver;
    constructor(
    ) {
        this.driver = neo4j.driver(
            process.env.NEO4J_URI as string,
            neo4j.auth.basic(process.env.NEO4J_USER as string, process.env.NEO4J_PASSWORD as string)
        );
    }

    private toUsuarioSeguimientoDomain(usuarioSeguimiento: RecordShape): UsuarioSeguimiento {

        if (usuarioSeguimiento) {
            const usuarioSeguimientoDomain = new UsuarioSeguimiento({
                idUsuario: usuarioSeguimiento.properties.idUsuario,
                username: usuarioSeguimiento.properties.username,
            });

            return usuarioSeguimientoDomain;
        }
    }

    async create(item: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        const session = await this.driver.session()
        const txc = await session.beginTransaction()
        try {
            const result = await txc.run(
                'MERGE (seguidor:UsuarioSeguimiento {idUsuario: $idUser, username: $username}) RETURN seguidor',
                {
                    idUser: item.idUsuario,
                    username: item.username,
                }
            )

            const userNode = result.records[0].get('seguidor');
            await txc.commit();

            return this.toUsuarioSeguimientoDomain(userNode);
        } catch (error) {
            await txc.rollback()
            throw new RepositoryError('Error al crear el usuario de seguimiento');
        } finally {
            await session.close()
        }
    }

    async get(id: string): Promise<UsuarioSeguimiento> {
        const session = await this.driver.session()
        const txc = await session.beginTransaction()
        try {
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento {idUsuario: $idUser}) RETURN seguidor',
                {
                    idUser: id,
                }
            )

            const userNode = result.records[0].get('seguidor');
            if (userNode === null) {
                throw new EntityNotFoundError('Usuario de seguimiento no encontrado con id ' + id);
            }

            await txc.commit()
            return this.toUsuarioSeguimientoDomain(userNode);
        } catch (error) {
            // await txc.rollback()
            if (error instanceof EntityNotFoundError) {
                throw error;
            }

            throw new RepositoryError('Error al obtener el usuario de seguimiento');
        } finally {
            await session.close()
        }
    }

    async getAll(): Promise<UsuarioSeguimiento[]> {
        const session = await this.driver.session()
        const txc = await session.beginTransaction()
        try {
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento) RETURN seguidor',
            )

            const userNodes = result.records.map((record) => record.get('seguidor'));
            await txc.commit()
            return userNodes.map((userNode) => this.toUsuarioSeguimientoDomain(userNode));
        } catch (error) {
            await txc.rollback()
            throw new RepositoryError('Error al obtener los usuarios de seguimiento');
        } finally {
            await session.close()
        }
    }

    async update(id: string, item: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        const session = await this.driver.session();
        const txc = await session.beginTransaction();
        try {

            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento {idUsuario: $idUser}) SET seguidor = $seguidor RETURN seguidor',
                {
                    idUser: id,
                    seguidor: {
                        idUsuario: item.idUsuario,
                        username: item.username,
                    },
                }
            );

            await txc.commit();
            return item;
        } catch (error) {
            txc.rollback();
            throw new RepositoryError('Error al actualizar el usuario de seguimiento');
        } finally {
            await session.close();
        }
    }

    async delete(id: string): Promise<UsuarioSeguimiento> {
        const item = await this.get(id);
        const session = await this.driver.session();
        const txc = await session.beginTransaction();
        try {
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento {idUsuario: $idUser}) DELETE seguidor',
                {
                    idUser: id,
                }
            );

            await txc.commit();
            return item;
        } catch (error) {
            await txc.rollback();
            throw new RepositoryError('Error al eliminar el usuario de seguimiento');
        } finally {
            await session.close();
        }
    }

    async seguir(seguidorOrigen: UsuarioSeguimiento, seguidorDestino: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        const session = await this.driver.session();
        const txc = await session.beginTransaction();
        console.log('seguir repository', seguidorOrigen, seguidorDestino);
        try {
            const result = await txc.run(
                'MERGE (p1:UsuarioSeguimiento {idUsuario: $idUser, username: $username}) MERGE (p2:UsuarioSeguimiento {idUsuario: $idUser2, username: $username2}) MERGE (p1)-[:SEGUIR_TO]->(p2) RETURN p1, p2',
                {
                    idUser: seguidorOrigen.idUsuario,
                    username: seguidorOrigen.username,
                    idUser2: seguidorDestino.idUsuario,
                    username2: seguidorDestino.username,
                }
            );

            const seguidorOrigenNode = result.records[0].get('p1');
            const seguidorDestinoNode = result.records[0].get('p2');

            await txc.commit();
            return this.toUsuarioSeguimientoDomain(seguidorDestinoNode);
        } catch (error) {
            await txc.rollback();
            throw new RepositoryError('Error al crear la relación de seguimiento');
        } finally {
            await session.close();
        }
    }

    async getUsuariosSeguidos(id: string): Promise<UsuarioSeguimiento[]> {
        const session = await this.driver.session();
        const txc = await session.beginTransaction();
        try {
            const result = await txc.run(
                'MATCH (p1:UsuarioSeguimiento {idUsuario: $idUser})-[:SEGUIR_TO]->(p2:UsuarioSeguimiento) RETURN p2',
                {
                    idUser: id,
                }
            );

            const seguidores = result.records.map((record) => record.get('p2'));
            await txc.commit();
            return seguidores.map((seguidor) => this.toUsuarioSeguimientoDomain(seguidor));
        } catch (error) {
            await txc.rollback();
            throw new RepositoryError('Error al obtener los usuarios seguidos');
        } finally {
            await session.close();
        }
    }

    async getUsuariosSeguidores(id: string): Promise<UsuarioSeguimiento[]> {
        const session = await this.driver.session();
        const txc = await session.beginTransaction();
        try {
            const result = await txc.run(
                'MATCH (p1:UsuarioSeguimiento)-[:SEGUIR_TO]->(p2:UsuarioSeguimiento {idUsuario: $idUser}) RETURN p1',
                {
                    idUser: id,
                }
            );

            const seguidores = result.records.map((record) => record.get('p1'));
            await txc.commit();
            return seguidores.map((seguidor) => this.toUsuarioSeguimientoDomain(seguidor));
        } catch (error) {
            await txc.rollback();
            throw new RepositoryError('Error al obtener los usuarios seguidores');
        } finally {
            await session.close();
        }
    }
}
