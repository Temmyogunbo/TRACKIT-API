import Users from '../models/users';

import Validate from '../middleware/validator';
import Authentication from '../middleware/authentication';

/**
 * 
 * 
 * @class UsersController
 */
class UsersController {
  /**
   * A method that creates a user
   * 
   * @static
   * 
   * @param {object} request 
   * @param {object} response 
   * 
   * @return {object} user
   * @memberof UsersController
   */
  static createUser(request, response) {
    const { fullName, email, userName } = request.body;
    const validity = Validate.validateRequestBody({ fullName, email, userName });

    if (!validity.isValid) {
      response.statusCode = 400;
      return response.end(JSON.stringify(validity));
    };

    Users.create({ fullName, email, userName }, (error, result) => {
      if (error) {
        response.statusCode = 409;
        return response.end(JSON.stringify(error));
      };

      const { _id, fullName, email, userName } = result;
      const token = Authentication.getToken({ _id, fullName, email, userName });
      response.writeHead(201,
        {
          'Content-Length': Buffer.byteLength(JSON.stringify(result)),
          'Content-Type': 'application/json'
        })
      response.end(JSON.stringify({ _id, fullName, email, userName, token }));
    });
  }
}

export default UsersController;
