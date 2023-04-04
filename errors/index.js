const CustomAPIError = require('./custom-error');
const BadRequest = require('./bad-request');
const NotFound = require('./not-found');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {
    CustomAPIError,
    BadRequest,
    NotFound,
    UnauthenticatedError
}