const logger = require("app/lib/logger");
const UserShare = require("app/model/index").user_shareds;
const User = require("app/model/index").users;
const crypto = require("crypto");

module.exports = {
  getYoutubeVideos: async (req, res, next) => {
    let { offset, limit, order_by } = req.query;
    offset = parseInt(offset || 0);
    limit = parseInt(limit || 10);
    if (limit > 100) {
      limit = 100;
    }
    let order = [["created_at", "desc"]];

    try {
      const { count: total, rows: videos } = await UserShare.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["email"],
            as: "user",
            required: false,
          },
        ],
        attributes: ["id", "user_id", "user.email", "youtube_id"],
        where: {
          is_delete: false,
        },
        order: order,
        offset,
        limit,
      });

      let obj = {
        items: videos,
        limit: limit,
        offset: offset,
        total: total,
      };
      return res.ok(obj);
    } catch (error) {
      logger.error("USER::USER INFO", error);
      next(error);
    }
  },
};
