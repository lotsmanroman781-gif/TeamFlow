import test from 'node:test';
import assert from 'node:assert/strict';
import {restoreApiPath} from '../../api/_routing.js';

test('restore API path and preserve ordinary query params', () => {
  const req = {url:'/api/index?__path=organizations/abc/projects/xyz/tasks&limit=50&search=hello'};
  restoreApiPath(req);
  assert.equal(req.url,'/api/organizations/abc/projects/xyz/tasks?limit=50&search=hello');
});

test('restore nested auth route and remove rewrite marker', () => {
  const req = {url:'/api/index?__path=auth%2Fregister'};
  restoreApiPath(req);
  assert.equal(req.url,'/api/auth/register');
});

test('accept Vercel request.query helper if URL lacks rewrite params', () => {
  const req = {url:'/api/index',query:{__path:'health'}};
  restoreApiPath(req);
  assert.equal(req.url,'/api/health');
});
