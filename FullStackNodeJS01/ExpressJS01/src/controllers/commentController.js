import commentService from "../services/commentService.js";

// Add a comment
const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, content, rating } = req.body;

    if (!productId || !content) {
      return res.status(400).json({
        success: false,
        message: "Product ID and content are required",
      });
    }

    const result = await commentService.addComment(
      userId,
      productId,
      content,
      rating
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: result.comment,
    });
  } catch (error) {
    console.error("Error in addComment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get product comments
const getProductComments = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await commentService.getProductComments(
      productId,
      page,
      limit
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      comments: result.comments,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("Error in getProductComments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;
    const { content, rating } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const result = await commentService.updateComment(
      commentId,
      userId,
      content,
      rating
    );

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: result.comment,
    });
  } catch (error) {
    console.error("Error in updateComment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.params;

    const result = await commentService.deleteComment(commentId, userId);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.deleted
        ? "Comment deleted successfully"
        : "Comment not found or unauthorized",
    });
  } catch (error) {
    console.error("Error in deleteComment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default {
  addComment,
  getProductComments,
  updateComment,
  deleteComment,
};
