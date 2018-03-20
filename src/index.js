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
                return self.render(name, Object.assign(data ||
                    {}, {
                    "template": {
                        "name": name,
                        "params": params
                    }
                }));
            }
        });
    }

    render(name, data) {
        const self = this;
        return new Promise((resolve, reject) => {
            self.env.render(name, data, (err, content) => {
                if (err) {
                    return reject(err);
                }
                resolve(content);
            });
        });
    }
}

module.exports = NunjucksTemplateProvider;
module.exports.nunjucks = nunjucks;
