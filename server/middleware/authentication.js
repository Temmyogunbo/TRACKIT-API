import jwt from 'jsonwebtoken';

class Authentication {
  /**
   * It signs on user payload and return a string
   * 
   * @static
   * @param {object} user 
   * @returns 
   * @memberof Authentication
   */
  static getToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
  }

  /**
   * It checks if a user is looged in
   * 
   * @static
   * 
   * @param {object} request 
   * @param {object} response 
   * 
   * @returns {string}
   * 
   * @memberof Authentication
   */
  static isLoggedIn(request, response) {
    const token = request.headers.authorization || request.body.token ||
      request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          response.statusCode = 401;
          return response.end(JSON.stringify({ message: 'You are not authenticated' }));
        }
        request.decoded = decoded;
      });
    } else {
      response.statusCode = 401;
      return response.end(JSON.stringify({ message: 'You are not logged in' }));
    };
  }
}

export default Authentication;