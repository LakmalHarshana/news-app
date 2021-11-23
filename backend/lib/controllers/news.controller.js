const Boom = require('@hapi/boom')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const logger = require('../helpers/logging').getLogger('server')
const moment = require('moment')

exports.createNews = async (request) => {
  try {
    console.log('request.auth.credentials.role', request.auth.credentials.role)
    if (request.auth.credentials.role !== 'admin') {
      return Boom.forbidden('forbidden')
    }
    const { News } = request.getDb(process.env.DB_NAME).models
    request.payload.data.forEach((news) => {
      news.sourceName = news.source.name
    })
    console.log(request.payload.data)
    const data = await News.bulkCreate(request.payload.data)
    return { data: data }
  } catch (error) {
    console.log('exports.createNews -> error', error)
    logger.error('exports.createNews -> error', error)
    Boom.badImplementation()
    throw error
  }
}

exports.getNewsList = async (request) => {
  try {
    const { title, start, end, offset, limit } = request.query
    const { News } = request.getDb(process.env.DB_NAME).models
    console.log(start, end, moment(start))
    const whereClause = {
      publishedAt: {
        [Op.between]: [moment(start).startOf('day'), moment(end).endOf('day')],
      },
      urlToImage: { [Op.ne]: 'null' },
    }
    if (title) {
      whereClause[Op.or] = [{ title: { [Op.like]: '%' + title + '%' } }]
    }
    const data = await News.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [['publishedAt', 'DESC']],
    })
    const getLastCreated = await News.findOne({
      order: [['createdAt', 'DESC']],
    })
    return {
      data: data.rows,
      count: data.count,
      lastUpdated: getLastCreated ? getLastCreated.createdAt : null,
    }
  } catch (error) {
    console.log('exports.getNewsList -> error', error)
    logger.error('exports.getNewsList -> error', error)
    Boom.badImplementation()
    throw error
  }
}

exports.getNewsById = async (request) => {
  try {
    const { id } = request.params
    const { News } = request.getDb(process.env.DB_NAME).models

    const news = await News.findByPk(id)
    if (!news) return Boom.notFound(`News not found with id ${id}`)
    return { data: news }
  } catch (error) {
    console.log('exports.getNewsById -> error', error)
    logger.error('exports.getNewsById -> error', error)
    Boom.badImplementation()
    throw error
  }
}
