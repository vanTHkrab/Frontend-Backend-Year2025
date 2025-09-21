const notificationService = require('./notification.service');
const createNotificationSchema = require('./dto/create-notification.dto');
const updateNotificationSchema = require('./dto/update-notification.dto');

class notificationController {
    constructor(db) {
        this.service = new notificationService(db);
    }

    async getNotifications(req, res) {
        try {
            const {q, sort = "created_at", page = '1', limit = '10'} = req.query;

            const result = await this.service.getNotifications({
                q, sort, page, limit
            });

            res.json(result);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({
                error: 'Internal server error', message: error.message
            });
        }
    }

    async getNotification(req, res) {
        try {
            const {id} = req.params;
            const notification = await this.service.getNotification(id);

            if (!notification) {
                return res.status(404).json({error: 'Notification not found'});
            }

            res.json(notification);
        } catch (error) {
            console.error('Error fetching notification:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async createNotification(req, res) {
        try {
            const {error, value} = createNotificationSchema.validate(req.body);
            if (error) {
                return res.status(400).json({error: error.details[0].message});
            }
            const newNotification = await this.service.createNotification(value);
            res.status(201).json(newNotification);
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({error: 'Internal server error', message: error.message});
        }
    }

    async updateNotification(req, res) {
        try {
            const {id} = req.params;

            const { error, value } = updateNotificationSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const updated = await this.service.updateNotification(id, value);

            if (!updated) {
                return res.status(404).json({error: 'Notification not found'});
            }

            res.json(updated);
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).json({error: 'Internal server error', message: error.message});
        }
    }

    async deleteNotification(req, res) {
        try {
            const {id} = req.params;
            const deleted = await this.service.deleteNotification(id);

            if (!deleted) {
                return res.status(404).json({error: 'Notification not found'});
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({error: 'Internal server error', message: error.message});
        }
    }
}

module.exports = notificationController;