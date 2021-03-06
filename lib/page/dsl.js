/*global protractor, browser */
'use strict';

const { expect } = require('chai').use(require('chai-as-promised'));
const { getPathTo } = require('./methods');

/**
 * Use to navigate within the views for a Page.
 *
 * @method goTo
 * @memberof Page.prototype
 * @param {String} [pathOrRequest] - the path to navigate to relative to this page
 *
 * @example
 * // /todo/create
 * Todo.goTo("create");
 *
*//**
 * @method goTo
 * @memberof Page.prototype
 * @param {Object} [pathOrRequest] - a map of params to add to path as a query string
 *
 * @example
 * // /todo?priority=high
 * Todo.goTo({priority: 'high'});
 *
*//**
 * @method goTo
 * @memberof Page.prototype
 * @param {String} [pathOrRequest] - the path to navigate to relative to this page
 * @param {Object} [request] - a map of params to add to path as a query string
 *
 * @example
 * //todo/edit?id=foo
 * Todo.goTo("edit", {id: 'foo'});
 *
 */
exports.goTo = function (pathOrRequest, request) {
    const path = getPathTo.call(this, pathOrRequest, request);
    browser.get(path);
};

/**
 * Performs an expectation on whether the browser is at the path defined for a Page
 *
 * @method at
 * @memberof Page.prototype
 */
exports.at = function () {
    expect(protractor.getCurrentUrl()).to.match(this.path);
};
