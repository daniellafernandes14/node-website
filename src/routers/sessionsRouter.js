const express = require('express');
const sessionsRouter = express.Router();
const debug = require('debug')('app:sessionsRouter');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');
require('dotenv').config();

const password = process.env.PASSWORD;

sessionsRouter.route('/')
  .get((req, res) => {
    const url = `mongodb+srv://fernandesdaniella:${password}@daniellatools.kljessr.mongodb.net/?retryWrites=true&w=majority`
    const dbName = 'daniellaTools';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the Mongo DB');

        const db = client.db(dbName);

        const sessions = await db.collection('sessions').find().toArray();
        res.render('sessions', { sessions });
      } catch (error) {
        debug(error.stack);
      }
    }())
  })

sessionsRouter.route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    ; res.render('session', {
      session: sessions[id],
    });
  })

  module.exports = sessionsRouter;
