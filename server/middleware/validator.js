/**
 * 
 * 
 * @class Validate
 */
class Validate {
  /**
   * This method validates request body
   * 
   * @static
   * @param {object} request 
   * @returns 
   * @memberof Validate
   */
  static validateRequestBody(requestBody, option = {}) {
    const errors = {};
    const entries = Object.entries(requestBody).some((entry) => {
      if (entry[1].trim().length < 2) {
        errors[entry[0]] = `${entry[0]} cannot be less than 2 characters`;
      }
      return entry[1].trim() < 2;
    });
    
    return {
      errors,
      isValid: !entries,
    };
  }
}

export default Validate;