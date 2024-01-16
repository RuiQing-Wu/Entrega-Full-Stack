import { UsuarioSeguimiento } from "../domain/usuario_seguimiento";
import { SeguidorRepository } from "./seguidor.repository";
import neo4j, { Driver, QueryResult, RecordShape } from 'neo4j-driver';
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
        const session = this.driver.session()
        const txc = session.beginTransaction()
        try {
            const result = await txc.run(
                'MERGE (seguidor:UsuarioSeguimiento {idUsuario: $idUser, username: $username}) RETURN seguidor',
                {
                    idUser: item.idUsuario,
                    username: item.username,
                }
            )

            const userNode = result.records[0].get('seguidor');
            await txc.commit()
            return this.toUsuarioSeguimientoDomain(userNode);
        } catch (error) {
            console.log(error)
            await txc.rollback()
            console.log('rolled back')
        } finally {
            await session.close()
        }

        return null;
    }

    async get(id: string): Promise<UsuarioSeguimiento> {
        const session = this.driver.session()
        const txc = session.beginTransaction()
        try {
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento {idUsuario: $idUser}) RETURN seguidor',
                {
                    idUser: id,
                }
            )

            const userNode = result.records[0].get('seguidor');
            await txc.commit()
            return this.toUsuarioSeguimientoDomain(userNode);
        } catch (error) {
            console.log(error)
            await txc.rollback()
            console.log('rolled back')
        } finally {
            await session.close()
        }

        return null;
    }

    async getAll(): Promise<UsuarioSeguimiento[]> {
        const session = this.driver.session()
        const txc = session.beginTransaction()
        try {
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento) RETURN seguidor',
            )

            const userNodes = result.records.map((record) => record.get('seguidor'));
            await txc.commit()
            return userNodes.map((userNode) => this.toUsuarioSeguimientoDomain(userNode));
        } catch (error) {
            console.log(error)
            await txc.rollback()
            console.log('rolled back')
        } finally {
            await session.close()
        }

        return [];
    }

    async update(id: string, item: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        const session = this.driver.session();
        const txc = session.beginTransaction();
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
            console.log(error);
            txc.rollback();
            console.log('rolled back');
        } finally {
            session.close();
        }

        return null;
    }

    async delete(id: string): Promise<UsuarioSeguimiento> {
        const session = this.driver.session();
        const txc = session.beginTransaction();
        try {
            const item = await this.get(id);
            const result = await txc.run(
                'MATCH (seguidor:UsuarioSeguimiento {idUsuario: $idUser}) DELETE seguidor',
                {
                    idUser: id,
                }
            );

            await txc.commit();
            return item;
        } catch (error) {
            console.log(error);
            txc.rollback();
            console.log('rolled back');
        } finally {
            session.close();
        }

        return null;
    }

    async seguir(seguidorOrigen: UsuarioSeguimiento, seguidorDestino: UsuarioSeguimiento): Promise<UsuarioSeguimiento> {
        const session = this.driver.session();
        const txc = session.beginTransaction();
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
            console.log(error);
            txc.rollback();
            console.log('rolled back');
        } finally {
            session.close();
        }

        return null;
    }

    async getUsuariosSeguidos(id: string): Promise<UsuarioSeguimiento[]> {
        const session = this.driver.session();
        const txc = session.beginTransaction();
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
            console.log(error);
            txc.rollback();
            console.log('rolled back');
        } finally {
            session.close();
        }

        return [];
    }

    async getUsuariosSeguidores(id: string): Promise<UsuarioSeguimiento[]> {
        const session = this.driver.session();
        const txc = session.beginTransaction();
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
            console.log(error);
            txc.rollback();
            console.log('rolled back');
        } finally {
            session.close();
        }

        return [];
    }
}
