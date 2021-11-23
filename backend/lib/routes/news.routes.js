'use strict'
const Joi = require('@hapi/joi')
const {
  createNews,
  getNewsList,
  getNewsById,
} = require('../controllers/news.controller')
module.exports = [
  {
    method: 'POST',
    path: '/api/v1/news',
    options: {
      auth: 'jwt',
      description: 'Create news',
      validate: {
        // can't make properties as requried because of the inconsistent data from newsapi.org
        // so had to add this to the below code ".allow(null, 'null', '')"

        // payload: Joi.object({
        //   data: Joi.array().items({
        //     title: Joi.string().required().max(250).trim(),
        //     author: Joi.string().required().max(250).trim(),
        //     description: Joi.string().required().trim(),
        //     source: Joi.object({
        //       id: Joi.string(),
        //       name: Joi.string().required(),
        //     }),
        //     url: Joi.string().required().uri(),
        //     urlToImage: Joi.string().required().uri().allow(null, 'null'),
        //     publishedAt: Joi.date().required(),
        //     content: Joi.string().required().trim(),
        //   }),
        // }),
        payload: Joi.object({
          data: Joi.array().items({
            title: Joi.string().max(250).trim().allow(null, 'null', ''),
            author: Joi.string().max(250).trim().allow(null, 'null', ''),
            description: Joi.string().trim().allow(null, 'null', ''),
            source: Joi.object({
              id: Joi.string().allow(null, 'null', ''),
              name: Joi.string().allow(null, 'null', ''),
            }),
            url: Joi.string().uri().allow(null, 'null', ''),
            urlToImage: Joi.string().uri().allow(null, 'null', ''),
            publishedAt: Joi.date().allow(null, 'null', ''),
            content: Joi.string().trim().allow(null, 'null', ''),
          }),
        }),
      },
      tags: ['api'],
      handler: createNews,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/news/{id}',
    options: {
      auth: 'jwt',
      description: 'Get news by Id',
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
      tags: ['api'],
      handler: getNewsById,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/news',
    options: {
      auth: 'jwt',
      description: 'Get news list',
      validate: {
        query: Joi.object({
          start: Joi.date().iso().required(),
          end: Joi.date().iso().required(),
          title: Joi.string(),
          offset: Joi.number().default(0),
          limit: Joi.number().default(25),
        }),
      },
      tags: ['api'],
      handler: getNewsList,
    },
  },
]
