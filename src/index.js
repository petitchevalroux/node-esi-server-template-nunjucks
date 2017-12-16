"use strict";
const Promise = require("bluebird");
const nunjucks = require("nunjucks");
class NunjucksTemplateProvider {

    constructor(opts) {
        this.env = new nunjucks.Environment(opts);
    }

    get(name, params) {
        const self = this;
        return Promise.resolve({
            render: (data) => {
                return self.env.render(name, Object.assign(data ||
                    {}, {
                    "template": {
                        "name": name,
                        params: params
                    }
                }));
            }
        });
    }
}

module.exports = NunjucksTemplateProvider;
module.exports.nunjucks = nunjucks;
