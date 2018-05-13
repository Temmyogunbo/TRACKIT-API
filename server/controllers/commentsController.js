import Comments from '../models/comments.js';
import Issues from "../models/issues";

/**
 * 
 * 
 * @class CommentsController
 */
class CommentsController {
  static addComment(request, response) {
    const { _id, rating, comment, author } = request.body;

    Issues.findById(_id, (error, issue) => {
      if (error) {
        response.statusCode = 400;
        return response.end(JSON.stringify(error));
      };

      issue.comments.push({ _id, rating, comment, author });
      issue.save(((error, isssueAndComment) => {
        if (error) {
          response.statusCode = 404;
          return response.end(JSON.stringify(error));
        };

        response.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(isssueAndComment)));
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 201;
        return response.end(JSON.stringify(isssueAndComment));
      }))
    })
  }
  /**
   * 
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * @memberof CommentsController
   */
  static deleteComment(request, response) {
    const { issueId, commentId } = request.params;

    issue.findById(issueId, (error, issue) => {
      if (error) {
        response.statusCode = 404;
        return response.end(JSON.stringify(error));
      };

      issue.comment.forEach((comment) => comment._id === commentId).remove();
      issue.save((error, result) => {
        if (error) {
          response.statusCode = 404;
          return response.end(JSON.stringify(error));
        };

        response.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(result)));
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        return response.end(JSON.stringify(result));
      })
    })
  }
}

export default CommentsController;
