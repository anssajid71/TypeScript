export const ERROR_CODES = {
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    MISSING_ARGUMENTS: 419,
    INVALID_ARGUMENTS: 420,
    INTERNAL_SERVER: 500,
  };
  
  export const ERROR_MESSAGES = {
    BAD_REQUEST: 'Invalid syntax for this request was provided.',
    UN_AUTHORIZED: 'You are unauthorized to access the requested resource. Please log in.',
    FORBIDDEN: 'Your account is not authorized to access the requested resource.',
    NOT_FOUND: 'We could not find the resource you requested. Please refer to the documentation for the list of resources.',
    NOT_ACCEPTABLE: 'Acceptance header is invalid for this endpoint resource.',
    MISSING_ARGUMENTS: 'The requested resource is missing required arguments.',
    INVALID_ARGUMENTS: 'The requested resource does not support one or more of the given parameters.',
  };
  
  export const SUCCESS_CODE = 200;
  
  export const ROLE = {
    USER: 'USER',
    AGENT: 'AGENT',
    ADMIN: 'ADMIN',
    SUB_ADMIN: 'SUB_ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN',
  };
  
  export const CHAT_STATUS = {
    ASSIGNED: 'ASSIGNED',
    PENDING: 'PENDING',
    ONHOLD: 'ONHOLD',
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
  };
  
  export const TICKET_PRIORITY = {
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
  };
  
  export const TICKET_STATUS = {
    RESOLVED: 'RESOLVED',
    PENDING: 'PENDING',
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
  };
  
  export const LEAD_LABEL = {
    HOT: 'HOT',
    COLD: 'COLD',
    WARM: 'WARM',
  };
  
  export const MESSAGE_STATUS = {
    SIMPLE: 'SIMPLE',
    SPECIAL: 'SPECIAL',
  };
  
  export const MEETING_STATUS = {
    PENDING: 'PENDING',
    ASSIGNED: 'ASSIGNED',
    ATTENDED: 'ATTENDED',
    UN_ATTENDED: 'UN_ATTENDED',
    CANCELED: 'CANCELED',
  };
  
  export const NOTIFICATIONS = {
    MESSAGE: 'MESSAGE',
    MEETING: 'MEETING',
  };
  
  export const CORS_ORIGIN = [
    'https://widget.invocom.io',
    'https://app.invocom.io',
    'http://localhost:3050',
    'http://localhost:3051',
    'http://localhost:3000',
    'http://localhost:3052',
    '*',
  ];
  