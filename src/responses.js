const respond = (request, response, status, object, type) => {
    let content;
    if (type === 'application/json') {
      content = JSON.stringify(object);
    } else{
      content = object;
    }

    response.writeHead(status, {
        'Content-Type': type,
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
    response.write(content);
    response.end();
};

const success = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += `<message>This is a successful response</message>`;
      responseXML += '</response>';
      return respond(request,response,200,responseXML,'text/xml');
    }

    const responseJSON = {message: 'This is a successful response',};
    respond(request,response,200,responseJSON,'application/json');
};

const badRequest = (request, response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += `<message>This request has the required parameters</message>`;
    responseXML += '</response>';

    if (!request.query.valid || request.query.valid !== 'true') {
      responseXML = '<response>';
      responseXML += `<message>Missing valid query parameter set to true</message>`;
      responseXML += `<id>badRequest</id>`;
      responseXML += '</response>';
      return respond(request, response, 400, responseXML, 'text/xml');
    }

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respond(request, response, 400, responseJSON, 'application/json');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response) => {
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += `<message>You have successfully viewed the content</message>`;
    responseXML += '</response>';

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      responseXML = '<response>';
      responseXML += `<message>Missing loggedIn query parameter set to yes</message>`;
      responseXML += `<id>unauthorized</id>`;
      responseXML += '</response>';
      return respond(request, response, 401, responseXML, 'text/xml');
    }

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respond(request, response, 401, responseJSON, 'application/json');
  }

  return respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += `<message>You do not have access to this content</message>`;
      responseXML += `<id>forbidden</id>`;
      responseXML += '</response>';
      return respond(request,response,403,responseXML,'text/xml');
    }

    const responseJSON = {
      message: 'You do not have access to this content',
      id: 'forbidden'
    };
    respond(request,response,403,responseJSON,'application/json');
};

const internal = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += `<message>Internal server error. Something went wrong</message>`;
      responseXML += `<id>internalError</id>`;
      responseXML += '</response>';
      return respond(request,response,500,responseXML,'text/xml');
    }

    const responseJSON = {
      message: 'Internal server error. Something went wrong',
      id: 'internalError'
    };
    respond(request,response,500,responseJSON,'application/json');
};

const notImplemented = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += `<message>A get request for this page has not been implemented yet. Check again later for updated content</message>`;
      responseXML += `<id>notImplemented</id>`;
      responseXML += '</response>';
      return respond(request,response,501,responseXML,'text/xml');
    }
  
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content',
      id: 'notImplemented'
    };
    respond(request,response,501,responseJSON,'application/json');
};

const notFound = (request,response) => {
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += `<message>The page you are looking for was not found</message>`;
      responseXML += `<id>notFound</id>`;
      responseXML += '</response>';
      return respond(request,response,404,responseXML,'text/xml');
    }

    const responseJSON = {
      message: 'The page you are looking for was not found',
      id: 'notFound'
    };
    respond(request,response,404,responseJSON,'application/json');
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
}