const express = require('express');
const router = express.Router();
const notificationController = require('./notification.controller');
const {requireAuth} = require('../middleware/auth');

const NotificationRoute = (db) => {
    const controller = new notificationController(db);

    // GET /notifications?userId=&page=&limit=
    router.get('/', (req, res) => controller.getNotifications(req, res));

    // GET /notifications/:id
    router.get('/:id', (req, res) => controller.getNotification(req, res));

    // POST /notifications
    router.post('/', requireAuth, (req, res) => controller.createNotification(req, res));

    // PUT /notifications/:id
    router.put('/:id', requireAuth, (req, res) => controller.updateNotification(req, res));

    // DELETE /notifications/:id
    router.delete('/:id', requireAuth, (req, res) => controller.deleteNotification(req, res));

    return router;
}

module.exports = NotificationRoute;