const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de blagues',
      version: '1.0.0',
      description: 'Endpoints versionnés pour gérer des blagues via Sequelize/SQLite',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur local',
      },
    ],
    components: {
      schemas: {
        Joke: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
            },
            question: {
              type: 'string',
              example: 'Pourquoi les plongeurs plongent-ils en arrière ?',
            },
            answer: {
              type: 'string',
              example: 'Parce que sinon ils tombent dans le bateau.',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
          required: ['id', 'question', 'answer', 'createdAt', 'updatedAt'],
        },
        JokeInput: {
          type: 'object',
          properties: {
            question: {
              type: 'string',
            },
            answer: {
              type: 'string',
            },
          },
          required: ['question', 'answer'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
        },
      },
    },
    paths: {
      '/api/v1/blagues': {
        get: {
          summary: 'Liste toutes les blagues',
          tags: ['Blagues'],
          responses: {
            200: {
              description: 'Liste des blagues',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Joke',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: 'Ajoute une blague',
          tags: ['Blagues'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/JokeInput',
                },
                example: {
                  question:
                    'Pourquoi les plongeurs plongent-ils toujours en arrière ?',
                  answer:
                    'Parce que sinon ils tombent dans le bateau.',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Blague créée',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Joke',
                  },
                },
              },
            },
            400: {
              description: 'Validation échouée',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/blagues/random': {
        get: {
          summary: 'Retourne une blague aléatoire',
          tags: ['Blagues'],
          responses: {
            200: {
              description: 'Blague aléatoire',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Joke',
                  },
                },
              },
            },
            404: {
              description: 'Aucune blague disponible',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/blagues/{id}': {
        get: {
          summary: 'Récupère une blague par son ID',
          tags: ['Blagues'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
              description: 'Identifiant de la blague',
            },
          ],
          responses: {
            200: {
              description: 'Blague trouvée',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Joke',
                  },
                },
              },
            },
            404: {
              description: 'Blague introuvable',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
