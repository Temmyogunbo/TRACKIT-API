import { parse } from 'querystring';

// controllers
import IssuesController from '../controllers/issuesController';
import CommentsController from '../controllers/commentsController';

const maxData = 2 * 1024 * 1024;

export const routes = (request, response) => {
  switch (request.method) {
    case 'POST':
      let body = '';
      request.on('data', (buffer) => {
        body += buffer.toString();
        if (body.length > maxData) {
          body = '';
          request.pause();
          response.statusCode = 413;
          response.end('Entity too large');
        };
      });
      switch (request.url) {
        case '/api/v1/issue':
          request.on('end', () => {
            parse(body);
            request.body = JSON.parse(body);
            IssuesController.createIssue(request, response);
          });
          break;

        case '/api/v1/issue/comment':
          request.on('end', () => {
            parse(body);
            request.body = JSON.parse(body);
            CommentsController.addComment(request, response);
          });
          break;

        default:
          response.statusCode = 404;
          response.end('The Url does not exist');
          break;
      }
      break;

    case 'GET':
      switch (request.url) {
        case '/':
          response.statusCode = 200;
          response.end('Welcome to trackit API. Kindly read the documentation to get started.');
          break;

        case '/api/v1/issue':
          IssuesController.allIssues(request, response);
          break;

        default:
          response.statusCode = 404;
          response.end('The Url does not exist');
          break;
      }
      break;

    case 'DELETE':
      const id = request.url.split('/');
      const commentId = id.pop();
      const issueId = id[4];

      switch (request.url) {
        case `/api/v1/issue/${issueId}/comment/${commentId}`:
          request.params = {};
          request.params.issueId = issueId;
          request.params.commentId = commentId;
          CommentsController.deleteComment(request, response);
          break;

        default:
          response.statusCode = 404;
          response.end('The comment cannot be found');
          break;
      }
      break;
    default:
      response.statusCode = 404;
      response.end('The method did not exist');
      break;
  }
}

export default routes;
