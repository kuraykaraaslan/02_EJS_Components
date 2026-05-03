/* =========================================================
   API DOC TYPES
   Plain TypeScript interfaces (no Zod) mirroring the
   OpenAPI 3.x data model used by the api-doc components.
========================================================= */

export type HttpMethod =
  | 'GET' | 'POST' | 'PUT' | 'PATCH'
  | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE';

export type ParameterLocation = 'path' | 'query' | 'header' | 'cookie';

export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null';

export type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect' | 'mutualTLS';

export type ApiVersionStatus = 'DRAFT' | 'ACTIVE' | 'DEPRECATED' | 'SUNSET';

/* ─── Schema Object (JSON Schema subset) ─── */

export interface SchemaObject {
  type?:        SchemaType | null;
  format?:      string | null;
  title?:       string | null;
  description?: string | null;
  default?:     unknown;
  example?:     unknown;
  enum?:        unknown[] | null;
  minLength?:   number | null;
  maxLength?:   number | null;
  pattern?:     string | null;
  minimum?:     number | null;
  maximum?:     number | null;
  items?:       SchemaObject | null;
  minItems?:    number | null;
  maxItems?:    number | null;
  properties?:  Record<string, SchemaObject> | null;
  required?:    string[] | null;
  nullable?:    boolean | null;
  readOnly?:    boolean | null;
  writeOnly?:   boolean | null;
  deprecated?:  boolean | null;
  $ref?:        string | null;
  allOf?:       SchemaObject[] | null;
  anyOf?:       SchemaObject[] | null;
  oneOf?:       SchemaObject[] | null;
}

/* ─── Info ─── */

export interface ApiContact {
  name?:  string | null;
  url?:   string | null;
  email?: string | null;
}

export interface ApiLicense {
  name:        string;
  url?:        string | null;
  identifier?: string | null;
}

export interface ApiInfo {
  infoId:          string;
  title:           string;
  version:         string;
  description?:    string | null;
  summary?:        string | null;
  termsOfService?: string | null;
  contact?:        ApiContact | null;
  license?:        ApiLicense | null;
}

/* ─── Server ─── */

export interface ApiServer {
  serverId:    string;
  url:         string;
  description?: string | null;
  environment?: 'production' | 'staging' | 'development' | 'sandbox' | null;
}

/* ─── Tag ─── */

export interface ExternalDocs {
  url:          string;
  description?: string | null;
}

export interface ApiTag {
  tagId:        string;
  name:         string;
  description?: string | null;
  externalDocs?: ExternalDocs | null;
}

/* ─── Security Scheme ─── */

export interface OAuthScope {
  name:        string;
  description: string;
}

export interface OAuthFlow {
  authorizationUrl?: string | null;
  tokenUrl?:         string | null;
  refreshUrl?:       string | null;
  scopes:            OAuthScope[];
}

export interface SecurityScheme {
  schemeId:         string;
  name:             string;
  type:             SecuritySchemeType;
  description?:     string | null;
  apiKeyName?:      string | null;
  apiKeyIn?:        'query' | 'header' | 'cookie' | null;
  scheme?:          string | null;
  bearerFormat?:    string | null;
  flows?:           Record<string, OAuthFlow> | null;
  openIdConnectUrl?: string | null;
}

/* ─── Parameter ─── */

export interface Parameter {
  parameterId:   string;
  name:          string;
  in:            ParameterLocation;
  description?:  string | null;
  required?:     boolean;
  deprecated?:   boolean;
  schema?:       SchemaObject | null;
  example?:      unknown;
}

/* ─── Request Body ─── */

export interface MediaTypeObject {
  schema?:  SchemaObject | null;
  example?: unknown;
}

export interface RequestBody {
  requestBodyId: string;
  description?:  string | null;
  required?:     boolean;
  content:       Record<string, MediaTypeObject>;
}

/* ─── Response ─── */

export interface HeaderObject {
  description?: string | null;
  required?:    boolean;
  schema?:      SchemaObject | null;
  example?:     unknown;
}

export interface ApiResponse {
  responseId:   string;
  statusCode:   string;
  description:  string;
  headers?:     Record<string, HeaderObject> | null;
  content?:     Record<string, MediaTypeObject> | null;
}

/* ─── Code Sample ─── */

export interface CodeSample {
  lang:   string;
  label?: string | null;
  source: string;
}

/* ─── Operation ─── */

export interface Operation {
  operationId:  string;
  operationKey: string;
  method:       HttpMethod;
  summary?:     string | null;
  description?: string | null;
  tags?:        string[];
  parameters?:  Parameter[];
  requestBody?: RequestBody | null;
  responses?:   ApiResponse[];
  security?:    Record<string, string[]>[] | null;
  deprecated?:  boolean;
  codeSamples?: CodeSample[] | null;
}

/* ─── Path Item ─── */

export interface PathItem {
  pathItemId:  string;
  path:        string;
  summary?:    string | null;
  description?: string | null;
  operations?: Operation[];
  parameters?: Parameter[];
}

/* ─── Components ─── */

export interface ApiComponents {
  schemas?:        Record<string, SchemaObject> | null;
  securitySchemes?: Record<string, SecurityScheme> | null;
}

/* ─── API Spec (root document) ─── */

export interface ApiSpec {
  specId:      string;
  openapi:     string;
  status:      ApiVersionStatus;
  info:        ApiInfo;
  servers:     ApiServer[];
  paths:       PathItem[];
  tags:        ApiTag[];
  components?: ApiComponents | null;
  security?:   Record<string, string[]>[] | null;
}
