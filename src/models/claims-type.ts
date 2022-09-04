export type ClaimsType = {
  readonly email: string;
  readonly iat: number;
  readonly exp: number;
  readonly sub: string;
};

// ClaimsType: Contains read-only email, iat, exp, and sub. The shapes here are
// patterned from the payload of the decoded access token or JWT.
// iat - (issued at claim): Identifies the issuance time of the JWT.
// exp - (expiration time claim): Sets the expiration time on or after which the
// access token MUST NOT be accepted for processing. sub - (subject claim): Identifies the subject of the access token or JWT.
// There are still a lot of reserved JSON Web Token claims, and if you want to read more,
// you can visit sites like iana.org or https://tools.ietf.org/.
