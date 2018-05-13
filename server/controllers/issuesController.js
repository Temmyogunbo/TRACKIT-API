import Issues from '../models/issues';

import Validate from "../middleware/validator";

/**
 * 
 * 
 * @class Issues
 */
class IssuesController {
  /**
   * This method create an issue
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * @memberof Issues
   */
  static createIssue(request, response) {
    const { title, author, description } = request.body;
    const validity = Validate.validateRequestBody({ title, author, description });

    if (!validity.isValid) {
      response.statusCode = 400;
      return response.end(JSON.stringify(validity));
    };

    Issues.create({
      title,
      author,
      description
    }, (error, result) => {
      if (error) {
        response.statusCode = 400;
        return response.end(JSON.stringify(error));
      };
      response.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(result)));
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 201;
      return response.end(JSON.stringify(result));
    });
  }
/**
 * This method returns all issues
 * 
 * @static
 * @param {any} request 
 * @param {any} response 
 * @memberof IssuesController
 */
static allIssues(request, response) {
    Issues.find({}, (error, result) => {

      if (error) {
        response.statusCode = 400;
        return response.end(JSON.stringify(error));
      }

      response.setHeader('Content-Length', Buffer.byteLength(JSON.stringify(result)));
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 200;
      return response.end(JSON.stringify(result));
    })
  }
};

export default IssuesController;
