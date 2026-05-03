import type {
  ApiSpec, SchemaObject, Parameter, ApiResponse,
} from '../types/api-doc';

/* ─── Reusable schemas ─── */

const errorSchema: SchemaObject = {
  type: 'object',
  required: ['code', 'message'],
  properties: {
    code:    { type: 'string', example: 'NOT_FOUND', description: 'Machine-readable error code' },
    message: { type: 'string', description: 'Human-readable error message' },
    details: { type: 'array', items: { type: 'object' }, nullable: true, description: 'Field-level validation errors' },
  },
};

const tokenSchema: SchemaObject = {
  type: 'object',
  required: ['accessToken', 'tokenType', 'expiresIn'],
  properties: {
    accessToken:  { type: 'string', description: 'JWT access token' },
    tokenType:    { type: 'string', example: 'Bearer' },
    expiresIn:    { type: 'integer', description: 'Seconds until the access token expires', example: 3600 },
    refreshToken: { type: 'string', description: 'Opaque refresh token (httpOnly cookie in web flow)', nullable: true },
  },
};

const productSchema: SchemaObject = {
  type: 'object',
  required: ['productId', 'sku', 'name', 'price', 'currency', 'stock', 'category', 'active'],
  properties: {
    productId:   { type: 'string', format: 'uuid', readOnly: true },
    sku:         { type: 'string', description: 'Stock-keeping unit', example: 'SHOE-BLK-42' },
    name:        { type: 'string', minLength: 1, maxLength: 200 },
    description: { type: 'string', nullable: true },
    price:       { type: 'number', minimum: 0, example: 49.99 },
    currency:    { type: 'string', example: 'USD', description: 'ISO 4217 currency code' },
    stock:       { type: 'integer', minimum: 0, example: 120 },
    category:    { type: 'string', enum: ['footwear', 'apparel', 'accessories', 'electronics', 'home'] },
    imageUrl:    { type: 'string', format: 'uri', nullable: true },
    active:      { type: 'boolean', default: true },
    createdAt:   { type: 'string', format: 'date-time', readOnly: true },
    updatedAt:   { type: 'string', format: 'date-time', readOnly: true, nullable: true },
  },
};

const createProductSchema: SchemaObject = {
  type: 'object',
  required: ['sku', 'name', 'price', 'currency', 'stock', 'category'],
  properties: {
    sku:         { type: 'string', minLength: 1, maxLength: 100 },
    name:        { type: 'string', minLength: 1, maxLength: 200 },
    description: { type: 'string', nullable: true },
    price:       { type: 'number', minimum: 0 },
    currency:    { type: 'string', example: 'USD' },
    stock:       { type: 'integer', minimum: 0 },
    category:    { type: 'string', enum: ['footwear', 'apparel', 'accessories', 'electronics', 'home'] },
    imageUrl:    { type: 'string', format: 'uri', nullable: true },
    active:      { type: 'boolean', default: true },
  },
};

const orderItemSchema: SchemaObject = {
  type: 'object',
  required: ['productId', 'quantity', 'unitPrice'],
  properties: {
    productId:  { type: 'string', format: 'uuid' },
    sku:        { type: 'string', readOnly: true },
    name:       { type: 'string', readOnly: true },
    quantity:   { type: 'integer', minimum: 1 },
    unitPrice:  { type: 'number', minimum: 0, readOnly: true },
    lineTotal:  { type: 'number', readOnly: true },
  },
};

const orderSchema: SchemaObject = {
  type: 'object',
  required: ['orderId', 'customerId', 'items', 'subtotal', 'total', 'currency', 'status'],
  properties: {
    orderId:    { type: 'string', format: 'uuid', readOnly: true },
    customerId: { type: 'string', format: 'uuid' },
    items:      { type: 'array', items: orderItemSchema },
    subtotal:   { type: 'number', readOnly: true },
    discount:   { type: 'number', readOnly: true, nullable: true },
    total:      { type: 'number', readOnly: true },
    currency:   { type: 'string', example: 'USD' },
    status:     { type: 'string', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'] },
    notes:      { type: 'string', nullable: true },
    createdAt:  { type: 'string', format: 'date-time', readOnly: true },
    updatedAt:  { type: 'string', format: 'date-time', readOnly: true, nullable: true },
  },
};

const paginatedProductsSchema: SchemaObject = {
  type: 'object',
  properties: {
    data:     { type: 'array', items: productSchema },
    total:    { type: 'integer', description: 'Total matching items', example: 247 },
    page:     { type: 'integer', example: 1 },
    pageSize: { type: 'integer', example: 20 },
    pages:    { type: 'integer', description: 'Total pages', example: 13 },
  },
};

const paginatedOrdersSchema: SchemaObject = {
  type: 'object',
  properties: {
    data:     { type: 'array', items: orderSchema },
    total:    { type: 'integer', example: 89 },
    page:     { type: 'integer', example: 1 },
    pageSize: { type: 'integer', example: 20 },
    pages:    { type: 'integer', example: 5 },
  },
};

/* ─── Reusable parameters ─── */

const pageParam: Parameter      = { parameterId: 'p-page',     name: 'page',      in: 'query', description: 'Page number (1-based)',    schema: { type: 'integer', minimum: 1,   default: 1,  example: 1  } };
const pageSizeParam: Parameter  = { parameterId: 'p-pagesize', name: 'pageSize',  in: 'query', description: 'Items per page (max 100)', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20, example: 20 } };
const productIdParam: Parameter = { parameterId: 'p-pid',      name: 'productId', in: 'path',  required: true, description: 'Product UUID', schema: { type: 'string', format: 'uuid' } };
const orderIdParam: Parameter   = { parameterId: 'p-oid',      name: 'orderId',   in: 'path',  required: true, description: 'Order UUID',   schema: { type: 'string', format: 'uuid' } };

/* ─── Reusable responses ─── */

const r400: ApiResponse = { responseId: 'r-400', statusCode: '400', description: 'Bad request — invalid input',                        content: { 'application/json': { schema: errorSchema } } };
const r401: ApiResponse = { responseId: 'r-401', statusCode: '401', description: 'Unauthorized — missing or invalid credentials',       content: { 'application/json': { schema: errorSchema } } };
const r403: ApiResponse = { responseId: 'r-403', statusCode: '403', description: 'Forbidden — insufficient permissions',                content: { 'application/json': { schema: errorSchema } } };
const r404: ApiResponse = { responseId: 'r-404', statusCode: '404', description: 'Resource not found',                                 content: { 'application/json': { schema: errorSchema } } };
const r422: ApiResponse = { responseId: 'r-422', statusCode: '422', description: 'Unprocessable entity — business rule violation',      content: { 'application/json': { schema: errorSchema } } };
const r429: ApiResponse = { responseId: 'r-429', statusCode: '429', description: 'Too many requests — rate limit exceeded',             content: { 'application/json': { schema: errorSchema } } };

/* ─── Spec ─── */

export const SAMPLE_SPEC: ApiSpec = {
  specId:  'commerce-api-v2',
  openapi: '3.1.0',
  status:  'ACTIVE',

  info: {
    infoId:  'info-1',
    title:   'Commerce API',
    version: '2.4.0',
    summary: 'Multi-tenant e-commerce platform API',
    description:
      'The Commerce API provides a complete set of endpoints for managing products, orders, customers, and authentication. ' +
      'All requests must include a valid bearer token obtained from the `/auth/login` endpoint, except where otherwise noted. ' +
      'Rate limits are enforced per API key at 1 000 requests / minute for standard plans and 10 000 for enterprise.',
    contact: {
      name:  'Commerce Platform Team',
      email: 'api@commerce.io',
      url:   'https://commerce.io/support',
    },
    license:        { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' },
    termsOfService: 'https://commerce.io/terms',
  },

  servers: [
    { serverId: 'srv-prod', url: 'https://api.commerce.io/v2',         description: 'Production',        environment: 'production'   },
    { serverId: 'srv-stg',  url: 'https://staging-api.commerce.io/v2', description: 'Staging',           environment: 'staging'      },
    { serverId: 'srv-dev',  url: 'http://localhost:4000/v2',            description: 'Local development', environment: 'development'  },
  ],

  tags: [
    { tagId: 'tag-auth',     name: 'Auth',     description: 'Authentication and token management' },
    { tagId: 'tag-products', name: 'Products', description: 'Product catalogue — create, read, update, delete' },
    { tagId: 'tag-orders',   name: 'Orders',   description: 'Order lifecycle management' },
  ],

  paths: [
    /* ── Auth ── */
    {
      pathItemId: 'pi-login',
      path: '/auth/login',
      description: 'Exchange credentials for access and refresh tokens.',
      operations: [{
        operationId:  'op-auth-login',
        operationKey: 'auth-login',
        method:       'POST',
        tags:         ['Auth'],
        summary:      'Obtain access token',
        description:  'Authenticates a user with email and password and returns a short-lived JWT access token plus an opaque refresh token.',
        parameters:   [],
        requestBody: {
          requestBodyId: 'rb-login',
          required:      true,
          description:   'User credentials',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email:    { type: 'string', format: 'email',    example: 'jane@example.com' },
                  password: { type: 'string', format: 'password', minLength: 8 },
                  remember: { type: 'boolean', description: 'Issue a long-lived refresh token (30 days)', default: false },
                },
              },
            },
          },
        },
        responses: [
          { responseId: 'r-login-200', statusCode: '200', description: 'Token issued',               content: { 'application/json': { schema: tokenSchema  } } },
          { responseId: 'r-login-401', statusCode: '401', description: 'Invalid email or password',  content: { 'application/json': { schema: errorSchema  } } },
          r429,
        ],
        codeSamples: [
          {
            lang: 'curl', label: 'cURL',
            source: "curl -X POST https://api.commerce.io/v2/auth/login \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"email\":\"jane@example.com\",\"password\":\"s3cr3t!\"}'",
          },
          {
            lang: 'javascript', label: 'JavaScript',
            source: "const res = await fetch('https://api.commerce.io/v2/auth/login', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ email: 'jane@example.com', password: 's3cr3t!' }),\n});\nconst { accessToken } = await res.json();",
          },
          {
            lang: 'python', label: 'Python',
            source: "import requests\n\nresp = requests.post(\n    'https://api.commerce.io/v2/auth/login',\n    json={'email': 'jane@example.com', 'password': 's3cr3t!'},\n)\naccess_token = resp.json()['accessToken']",
          },
        ],
      }],
    },
    {
      pathItemId: 'pi-refresh',
      path: '/auth/refresh',
      operations: [{
        operationId:  'op-auth-refresh',
        operationKey: 'auth-refresh',
        method:       'POST',
        tags:         ['Auth'],
        summary:      'Refresh access token',
        description:  'Issues a new access token using a valid refresh token. The old refresh token is rotated.',
        parameters:   [],
        requestBody: {
          requestBodyId: 'rb-refresh',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: {
                  refreshToken: { type: 'string', description: 'Opaque refresh token from the login response' },
                },
              },
            },
          },
        },
        responses: [
          { responseId: 'r-refresh-200', statusCode: '200', description: 'New tokens issued',                  content: { 'application/json': { schema: tokenSchema  } } },
          { responseId: 'r-refresh-401', statusCode: '401', description: 'Refresh token invalid or expired',   content: { 'application/json': { schema: errorSchema  } } },
        ],
      }],
    },
    {
      pathItemId: 'pi-logout',
      path: '/auth/logout',
      operations: [{
        operationId:  'op-auth-logout',
        operationKey: 'auth-logout',
        method:       'DELETE',
        tags:         ['Auth'],
        summary:      'Revoke session',
        description:  'Revokes the current access token and its associated refresh token.',
        parameters:   [],
        responses: [
          { responseId: 'r-logout-204', statusCode: '204', description: 'Session revoked successfully' },
          r401,
        ],
        security: [{ BearerAuth: [] }],
      }],
    },

    /* ── Products ── */
    {
      pathItemId: 'pi-products',
      path: '/products',
      operations: [
        {
          operationId:  'op-list-products',
          operationKey: 'list-products',
          method:       'GET',
          tags:         ['Products'],
          summary:      'List products',
          description:  'Returns a paginated, filterable list of products in the catalogue.',
          parameters: [
            pageParam,
            pageSizeParam,
            { parameterId: 'p-search',   name: 'search',   in: 'query', description: 'Full-text search on name and description', schema: { type: 'string' } },
            { parameterId: 'p-category', name: 'category', in: 'query', description: 'Filter by product category', schema: { type: 'string', enum: ['footwear', 'apparel', 'accessories', 'electronics', 'home'] } },
            { parameterId: 'p-active',   name: 'active',   in: 'query', description: 'Filter by active status',    schema: { type: 'boolean' } },
            { parameterId: 'p-sort',     name: 'sort',     in: 'query', description: 'Sort field',                  schema: { type: 'string', enum: ['name', 'price', 'stock', 'createdAt'], default: 'createdAt' } },
            { parameterId: 'p-order',    name: 'order',    in: 'query', description: 'Sort direction',              schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } },
          ],
          responses: [
            { responseId: 'r-lp-200', statusCode: '200', description: 'Paginated product list', content: { 'application/json': { schema: paginatedProductsSchema } } },
            r401,
            r429,
          ],
          security: [{ BearerAuth: [] }],
          codeSamples: [
            {
              lang: 'curl', label: 'cURL',
              source: "curl -G https://api.commerce.io/v2/products \\\n  -H 'Authorization: Bearer <token>' \\\n  -d page=1 \\\n  -d pageSize=20 \\\n  -d category=footwear",
            },
            {
              lang: 'javascript', label: 'JavaScript',
              source: "const params = new URLSearchParams({ page: '1', pageSize: '20', category: 'footwear' });\nconst res = await fetch(`https://api.commerce.io/v2/products?${params}`, {\n  headers: { Authorization: `Bearer ${token}` },\n});\nconst { data, total } = await res.json();",
            },
          ],
        },
        {
          operationId:  'op-create-product',
          operationKey: 'create-product',
          method:       'POST',
          tags:         ['Products'],
          summary:      'Create product',
          description:  'Adds a new product to the catalogue. Requires `products:write` permission.',
          parameters:   [],
          requestBody: {
            requestBodyId: 'rb-create-product',
            required: true,
            content: { 'application/json': { schema: createProductSchema } },
          },
          responses: [
            { responseId: 'r-cp-201', statusCode: '201', description: 'Product created', content: { 'application/json': { schema: productSchema } } },
            r400, r401, r403,
            { responseId: 'r-cp-409', statusCode: '409', description: 'SKU already exists', content: { 'application/json': { schema: errorSchema } } },
          ],
          security: [{ BearerAuth: [] }],
        },
      ],
    },
    {
      pathItemId: 'pi-product-detail',
      path: '/products/{productId}',
      parameters: [productIdParam],
      operations: [
        {
          operationId:  'op-get-product',
          operationKey: 'get-product',
          method:       'GET',
          tags:         ['Products'],
          summary:      'Get product',
          parameters:   [productIdParam],
          responses: [
            { responseId: 'r-gp-200', statusCode: '200', description: 'Product detail', content: { 'application/json': { schema: productSchema } } },
            r401, r404,
          ],
          security: [{ BearerAuth: [] }],
        },
        {
          operationId:  'op-update-product',
          operationKey: 'update-product',
          method:       'PATCH',
          tags:         ['Products'],
          summary:      'Update product',
          description:  'Partially updates a product. Only supplied fields are changed.',
          parameters:   [productIdParam],
          requestBody: {
            requestBodyId: 'rb-update-product',
            required: true,
            content: { 'application/json': { schema: createProductSchema } },
          },
          responses: [
            { responseId: 'r-up-200', statusCode: '200', description: 'Updated product', content: { 'application/json': { schema: productSchema } } },
            r400, r401, r403, r404,
          ],
          security: [{ BearerAuth: [] }],
        },
        {
          operationId:  'op-delete-product',
          operationKey: 'delete-product',
          method:       'DELETE',
          tags:         ['Products'],
          summary:      'Delete product',
          description:  'Soft-deletes a product. Orders referencing this product are unaffected.',
          parameters:   [productIdParam],
          responses: [
            { responseId: 'r-dp-204', statusCode: '204', description: 'Deleted' },
            r401, r403, r404,
          ],
          security: [{ BearerAuth: [] }],
        },
      ],
    },

    /* ── Orders ── */
    {
      pathItemId: 'pi-orders',
      path: '/orders',
      operations: [
        {
          operationId:  'op-list-orders',
          operationKey: 'list-orders',
          method:       'GET',
          tags:         ['Orders'],
          summary:      'List orders',
          description:  'Returns a paginated list of orders. Non-admin users see only their own orders.',
          parameters: [
            pageParam,
            pageSizeParam,
            { parameterId: 'p-status', name: 'status', in: 'query', description: 'Filter by order status', schema: { type: 'string', enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'] } },
            { parameterId: 'p-from',   name: 'from',   in: 'query', description: 'Created at or after (ISO 8601)', schema: { type: 'string', format: 'date-time' } },
            { parameterId: 'p-to',     name: 'to',     in: 'query', description: 'Created before (ISO 8601)',      schema: { type: 'string', format: 'date-time' } },
          ],
          responses: [
            { responseId: 'r-lo-200', statusCode: '200', description: 'Paginated order list', content: { 'application/json': { schema: paginatedOrdersSchema } } },
            r401, r429,
          ],
          security: [{ BearerAuth: [] }],
        },
        {
          operationId:  'op-create-order',
          operationKey: 'create-order',
          method:       'POST',
          tags:         ['Orders'],
          summary:      'Place order',
          description:  'Creates a new order. Stock is reserved atomically at creation time.',
          parameters:   [],
          requestBody: {
            requestBodyId: 'rb-create-order',
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['customerId', 'items'],
                  properties: {
                    customerId: { type: 'string', format: 'uuid' },
                    items: {
                      type: 'array',
                      minItems: 1,
                      items: {
                        type: 'object',
                        required: ['productId', 'quantity'],
                        properties: {
                          productId: { type: 'string', format: 'uuid' },
                          quantity:  { type: 'integer', minimum: 1 },
                        },
                      },
                    },
                    notes:  { type: 'string', nullable: true },
                    coupon: { type: 'string', nullable: true, description: 'Coupon code to apply' },
                  },
                },
              },
            },
          },
          responses: [
            { responseId: 'r-co-201', statusCode: '201', description: 'Order placed', content: { 'application/json': { schema: orderSchema } } },
            r400, r401, r422,
          ],
          security: [{ BearerAuth: [] }],
          codeSamples: [
            {
              lang: 'curl', label: 'cURL',
              source: "curl -X POST https://api.commerce.io/v2/orders \\\n  -H 'Authorization: Bearer <token>' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n  \"customerId\": \"cust-uuid\",\n  \"items\": [\n    { \"productId\": \"prod-uuid-1\", \"quantity\": 2 }\n  ]\n}'",
            },
            {
              lang: 'javascript', label: 'JavaScript',
              source: "const res = await fetch('https://api.commerce.io/v2/orders', {\n  method: 'POST',\n  headers: {\n    Authorization: `Bearer ${token}`,\n    'Content-Type': 'application/json',\n  },\n  body: JSON.stringify({\n    customerId: 'cust-uuid',\n    items: [{ productId: 'prod-uuid-1', quantity: 2 }],\n  }),\n});\nconst order = await res.json();",
            },
          ],
        },
      ],
    },
    {
      pathItemId: 'pi-order-detail',
      path: '/orders/{orderId}',
      operations: [{
        operationId:  'op-get-order',
        operationKey: 'get-order',
        method:       'GET',
        tags:         ['Orders'],
        summary:      'Get order',
        parameters:   [orderIdParam],
        responses: [
          { responseId: 'r-go-200', statusCode: '200', description: 'Order detail', content: { 'application/json': { schema: orderSchema } } },
          r401, r403, r404,
        ],
        security: [{ BearerAuth: [] }],
      }],
    },
    {
      pathItemId: 'pi-order-status',
      path: '/orders/{orderId}/status',
      operations: [{
        operationId:  'op-update-order-status',
        operationKey: 'update-order-status',
        method:       'PATCH',
        tags:         ['Orders'],
        summary:      'Update order status',
        description:  'Transitions an order to a new status. Only valid state transitions are accepted.',
        parameters:   [orderIdParam],
        requestBody: {
          requestBodyId: 'rb-order-status',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: { type: 'string', enum: ['confirmed', 'shipped', 'delivered', 'cancelled', 'refunded'] },
                  reason: { type: 'string', nullable: true, description: 'Required when cancelling or refunding' },
                },
              },
            },
          },
        },
        responses: [
          { responseId: 'r-uos-200', statusCode: '200', description: 'Order status updated', content: { 'application/json': { schema: orderSchema } } },
          r400, r401, r403, r404, r422,
        ],
        security: [{ BearerAuth: [] }],
      }],
    },
  ],

  components: {
    securitySchemes: {
      BearerAuth: {
        schemeId:     'ss-bearer',
        name:         'BearerAuth',
        type:         'http',
        scheme:       'bearer',
        bearerFormat: 'JWT',
        description:  'Short-lived JWT (1 h). Obtain via POST /auth/login.',
      },
      ApiKey: {
        schemeId:   'ss-apikey',
        name:       'ApiKey',
        type:       'apiKey',
        apiKeyName: 'X-API-Key',
        apiKeyIn:   'header',
        description: 'Server-to-server API key. Issued per integration in the dashboard.',
      },
    },
  },
};
