import { db } from "../config/configdb.js";
import { Op } from "sequelize";

// Add a comment to a product
const addComment = async (userId, productId, content, rating = null) => {
  try {
    const comment = await db.Comment.create({
      userId,
      productId,
      content,
      rating,
    });

    const commentWithUser = await db.Comment.findByPk(comment.id, {
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return { success: true, comment: commentWithUser };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: error.message };
  }
};

// Get comments for a product
const getProductComments = async (productId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.Comment.findAndCountAll({
      where: { productId },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,
      comments: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Error getting product comments:", error);
    return { success: false, error: error.message };
  }
};

// Update a comment
const updateComment = async (commentId, userId, content, rating = null) => {
  try {
    const comment = await db.Comment.findOne({
      where: { id: commentId, userId },
    });

    if (!comment) {
      return { success: false, error: "Comment not found or unauthorized" };
    }

    await comment.update({ content, rating });

    const updatedComment = await db.Comment.findByPk(commentId, {
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return { success: true, comment: updatedComment };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { success: false, error: error.message };
  }
};

// Delete a comment
const deleteComment = async (commentId, userId) => {
  try {
    const result = await db.Comment.destroy({
      where: { id: commentId, userId },
    });
    return { success: true, deleted: result > 0 };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, error: error.message };
  }
};

// Get comment count for a product
const getCommentCount = async (productId) => {
  try {
    const count = await db.Comment.count({
      where: { productId },
    });
    return { success: true, count };
  } catch (error) {
    console.error("Error getting comment count:", error);
    return { success: false, error: error.message };
  }
};

// Get average rating for a product
const getAverageRating = async (productId) => {
  try {
    const result = await db.Comment.findOne({
      where: { productId, rating: { [Op.ne]: null } },
      attributes: [
        [db.sequelize.fn("AVG", db.sequelize.col("rating")), "averageRating"],
        [db.sequelize.fn("COUNT", db.sequelize.col("rating")), "ratingCount"],
      ],
    });

    return {
      success: true,
      averageRating: parseFloat(result?.dataValues?.averageRating || 0).toFixed(
        1
      ),
      ratingCount: parseInt(result?.dataValues?.ratingCount || 0),
    };
  } catch (error) {
    console.error("Error getting average rating:", error);
    return { success: false, error: error.message };
  }
};

export default {
  addComment,
  getProductComments,
  updateComment,
  deleteComment,
  getCommentCount,
  getAverageRating,
};
