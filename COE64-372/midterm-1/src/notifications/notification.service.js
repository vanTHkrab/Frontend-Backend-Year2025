class notificationService {
    constructor(db) {
        this.db = db;
    }

    async getNotifications({ q, sort = "created_at", page = 1, limit = 10 }) {
        const query = q ? q.trim() : null;
        const p = parseInt(page, 10) || 1;
        const l = Math.min(parseInt(limit, 10) || 10, 100);

        const notifications = await this.db('notifications')
            .modify(function(queryBuilder) {
                if (query) {
                    queryBuilder.where('title', 'like', `%${query}%`);
                }
            })
            .orderBy(sort, 'desc')
            .limit(l)
            .offset((p - 1) * l);

        const totalResult = await this.db('notifications')
            .modify(function(queryBuilder) {
                if (query) {
                    queryBuilder.where('title', 'like', `%${query}%`);
                }
            })
            .count('* as count')
            .first();
        const total = parseInt(totalResult.count, 10);

        // Safely parse JSON tags back to arrays
        const processedNotifications = notifications.map(notification => ({
            ...notification,
            tags: this.parseTagsField(notification.tags)
        }));

        return { notifications: processedNotifications, total, page: p, limit: l };
    }

    async getNotification(id) {
        const notification = await this.db('notifications').where({ id }).first();
        if (notification && notification.tags) {
            notification.tags = this.parseTagsField(notification.tags);
        }
        return notification;
    }

    // Helper method to safely parse tags field
    parseTagsField(tags) {
        if (!tags) return [];

        // If it's already an array, return it
        if (Array.isArray(tags)) return tags;

        // If it's a string, try to parse as JSON first
        if (typeof tags === 'string') {
            try {
                const parsed = JSON.parse(tags);
                // If parsing succeeds and result is an array, return it
                if (Array.isArray(parsed)) return parsed;
                // If parsing succeeds but result is not an array, wrap it in an array
                return [parsed];
            } catch (e) {
                // If JSON parsing fails, treat it as a plain string and wrap in array
                return [tags];
            }
        }

        // For any other type, wrap in array
        return [tags];
    }

    async createNotification(notificationData) {
        // Ensure tags is properly formatted as JSON array
        const processedData = {
            ...notificationData,
            created_at: new Date(),
        };

        // If tags is provided, ensure it's a proper JSON array
        if (processedData.tags) {
            if (typeof processedData.tags === 'string') {
                // Convert single string to array
                processedData.tags = [processedData.tags];
            }
            // Convert array to JSON string for MySQL
            processedData.tags = JSON.stringify(processedData.tags);
        }

        const [id] = await this.db('notifications').insert(processedData);

        const createdNotification = await this.getNotification(id);
        return { ...createdNotification };
    }

    async updateNotification(id, updateData) {
        const existingNotification = await this.db('notifications').where('id', id).first();
        if (!existingNotification) {
            return null;
        }

        const processedData = {
            ...updateData,
            updated_at: new Date()
        };

        // If tags is provided, ensure it's a proper JSON array
        if (processedData.tags) {
            if (typeof processedData.tags === 'string') {
                // Convert single string to array
                processedData.tags = [processedData.tags];
            }
            // Convert array to JSON string for MySQL
            processedData.tags = JSON.stringify(processedData.tags);
        }

        await this.db('notifications').where('id', id).update(processedData);

        return this.getNotification(id);
    }

    async deleteNotification(id) {
        const existingNotification = await this.db('notifications').where('id', id).first();
        if (!existingNotification) {
            return null;
        }

        await this.db('notifications').where('id', id).del();
        return true;
    }
}

module.exports = notificationService;