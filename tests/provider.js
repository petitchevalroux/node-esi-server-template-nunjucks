"use strict";
const path = require("path"),
    assert = require("assert"),
    Provider = require(path.join(__dirname, "..")),
    nunjucks = Provider.nunjucks;
describe("provider", () => {
    const provider = new Provider(new nunjucks.FileSystemLoader(path.join(
        __dirname, "views")));
    it("render article view", () => {
        return provider
            .get("article.html")
            .then(template => {
                assert.equal(
                    template.render({
                        "title": "My first article",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    }),
                    "<article>\n" +
                    "    <h1 class=\"title\">My first article</h1>\n" +
                    "    <div class=\"body\">\n" +
                    "        Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n" +
                    "    </div>\n" +
                    "</article>"
                );
                return;
            });
    });
    it("give access to template name and params", () => {
        return provider
            .get("template.html",
                "Curabitur luctus lectus libero")
            .then(template => {
                assert.equal(
                    template.render(),
                    "<dl>\n\n" +
                    "    <dt>name</dt>\n" +
                    "    <dd>template.html</dd>\n\n" +
                    "    <dt>params</dt>\n" +
                    "    <dd>Curabitur luctus lectus libero</dd>\n\n" +
                    "</dl>"
                );
                return;
            });
    });
});
