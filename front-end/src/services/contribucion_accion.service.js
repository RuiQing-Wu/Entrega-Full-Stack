import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // La URL del servidor GraphQL
  cache: new InMemoryCache(),
});

const crearContribucionAccion = async (
  idUsuario,
  idAccion,
  nombre,
  email,
  contribucion,
) => {
  try {
    const { data, errors, extensions } = await client.mutate({
      mutation: gql`
        mutation CrearContribucionAccion(
          $idUsuario: String!
          $idAccion: String!
          $nombre: String!
          $email: String!
          $contribucion: Float!
        ) {
          crearContribucionAccion(
            idUsuario: $idUsuario
            idAccion: $idAccion
            nombre: $nombre
            email: $email
            contribucion: $contribucion
          ) {
            id
            idUsuario
            idAccion
            nombre
            email
            contribucion
          }
        }
      `,
      variables: { idUsuario, idAccion, nombre, email, contribucion },
    });

    const status = extensions?.response?.status;

    return { data, errors, extensions };
  } catch (error) {
    console.error('Error al crear contribución de acción:', error);
    throw error;
  }
};

const getListaContribuciones = async () => {
  try {
    const { data, errors, extensions } = await client.query({
      query: gql`
        query GetListaContribuciones {
          listarContribuciones {
            id
            idUsuario
            idAccion
            nombre
            email
            contribucion
          }
        }
      `,
    });

    const status = extensions?.response?.status;

    return { data, status, errors };
  } catch (error) {
    console.error('Error al obtener lista de contribuciones:', error);
    throw error;
  }
};

const getContribucionByID = async (id) => {
  try {
    const { data, errors, extensions } = await client.query({
      query: gql`
        query GetContribucionByID($id: String!) {
          getContribucionByID(id: $id) {
            id
            idUsuario
            idAccion
            nombre
            email
            contribucion
          }
        }
      `,
      variables: { id },
    });

    const status = extensions?.response?.status;

    return { data, status, errors };
  } catch (error) {
    console.error('Error al obtener contribución por ID:', error);
    throw error;
  }
};

const getContribucionByIDAccion = async (idAccion) => {
  try {
    const { data, errors, extensions } = await client.query({
      query: gql`
        query GetContribucionByIDAccion($idAccion: String!) {
          getContribucionByIDAccion(idAccion: $idAccion) {
            id
            idUsuario
            idAccion
            nombre
            email
            contribucion
          }
        }
      `,
      variables: { idAccion },
    });

    const status = extensions?.response?.status;

    return { data, extensions, errors };
  } catch (error) {
    console.error('Error al obtener contribución por ID de acción:', error);
    throw error;
  }
};

export {
  crearContribucionAccion,
  getListaContribuciones,
  getContribucionByID,
  getContribucionByIDAccion,
};
