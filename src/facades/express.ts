import express, { Express, Request, Response, NextFunction, Router } from 'express';

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

interface ParamsDictionary {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomRequest<Params = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>
  extends Request<Params, ResBody, ReqBody, ReqQuery> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomResponse<ResBody = any> extends Response<ResBody> {}

export { express, CustomRequest as Request, CustomResponse as Response, NextFunction, Express, Router };
