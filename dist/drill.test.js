"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai = __importStar(require("chai"));
var drill_1 = __importDefault(require("./drill"));
var sample = {
    "dessert": {
        "fruits": [
            {
                "name": "Muskmelon",
                "emoji": "🍈",
                "wiki": "https://en.wikipedia.org/wiki/Muskmelon",
                "class": [
                    { "class": "Kingdom", "name": "Plantae" },
                    { "class": "Clade", "name": "Angiosperms" },
                    { "class": "Clade", "name": "Eudicots" },
                    { "class": "Clade", "name": "Rosids" },
                    { "class": "Order", "name": "Cucurbitales" },
                    { "class": "Family", "name": "Cucurbitaceae" },
                    { "class": "Genus", "name": "Cucumis" },
                    { "class": "Species", "name": "C.melo" }
                ]
            },
            {
                "name": "Banana",
                "emoji": "🍌",
                "wiki": "https://en.wikipedia.org/wiki/Banana",
                "class": [
                    { "class": "Kingdom", "name": "Plantae" },
                    { "class": "(unranked)", "name": "Angiosperms" },
                    { "class": "(unranked)", "name": "Monocots" },
                    { "class": "(unranked)", "name": "Commelinids" },
                    { "class": "Order", "name": "Zingiberales" },
                    { "class": "Family", "name": "Musaceae" },
                    { "class": "Genus", "name": "Musa" }
                ]
            },
            {
                "name": "Strawberry",
                "emoji": "🍓",
                "wiki": "https://en.wikipedia.org/wiki/Strawberry",
                "class": [
                    { "class": "Kingdom", "name": "Plantae" },
                    { "class": "Clade", "name": "Angiosperms" },
                    { "class": "Clade", "name": "Eudicots" },
                    { "class": "Clade", "name": "Rosids" },
                    { "class": "Order", "name": "Rosales" },
                    { "class": "Family", "name": "Rosaceae" },
                    { "class": "Genus", "name": "Fragaria" },
                    { "class": "Species", "name": "F. × ananassa" }
                ]
            }
        ],
        "cake": [
            {
                "name": "Mont Blanc",
                "origin": "Italy"
            },
            {
                "name": "Yokan",
                "origin": "Japan"
            }
        ]
    },
    "author": {
        "name": "Shirousa",
        "github": "https://github.com/shirousa/drill"
    }
};
describe('Drill class inner function unit test.', function () {
    it("Drill._query(sample, ['dessert', 'fruits', 0, 'name']);", function () {
        var result = drill_1.default._query(sample, ['dessert', 'fruits', 0, 'name']);
        chai.expect(result).to.equal('Muskmelon');
    });
    it("Drill._query(sample, ['dessert', 'fruits', 1, 'name']);", function () {
        var result = drill_1.default._query(sample, ['dessert', 'fruits', 1, 'name']);
        chai.expect(result).to.equal('Banana');
    });
    it("Drill._query(sample, ['dessert', 'fruits', -1, 'name']);", function () {
        var result = drill_1.default._query(sample, ['dessert', 'fruits', -1, 'name']);
        chai.expect(result).to.be.undefined;
    });
    it("Drill._query(sample, ['dessert', 'fruits', 4, 'name']);", function () {
        var result = drill_1.default._query(sample, ['dessert', 'fruits', 4, 'name']);
        chai.expect(result).to.be.undefined;
    });
    it("Drill._query(sample, ['dessert', 'sushi', 0, 'name']);", function () {
        var result = drill_1.default._query(sample, ['dessert', 'sushi', 0, 'name']);
        chai.expect(result).to.be.undefined;
    });
});
describe('Drill class unit Normal test.', function () {
    it("Test Drill.query list method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert', 'fruits', 0, 'name']).
            value();
        chai.expect(result).to.equal('Muskmelon');
    });
    it("Test Drill.query chain method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert']).
            query(['fruits']).
            query([0]).
            query(['name']).
            value();
        chai.expect(result).to.equal('Muskmelon');
    });
    it("Test Drill.subquery method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            subquery(['name']).
            value();
        chai.expect(result).to.eql(['Muskmelon', 'Banana', 'Strawberry']);
    });
    it("Test Drill.subquery chain method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            subquery(['class']).
            subquery(['name']).
            value();
        chai.expect(result).to.eql([
            ["Plantae", "Angiosperms", "Eudicots", "Rosids", "Cucurbitales", "Cucurbitaceae", "Cucumis", "C.melo"],
            ["Plantae", "Angiosperms", "Monocots", "Commelinids", "Zingiberales", "Musaceae", "Musa"],
            ["Plantae", "Angiosperms", "Eudicots", "Rosids", "Rosales", "Rosaceae", "Fragaria", "F. × ananassa"]
        ]);
    });
    it("Test Drill.find method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            find(['emoji'], '🍓').
            query(['name']).
            value();
        chai.expect(result).to.eql(['Strawberry']);
    });
    it("Test Drill.find chain method.", function () {
        var result = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            find(['emoji'], '🍓').
            query(['class']).
            find(['class'], 'Genus').
            query(['name']).
            value();
        chai.expect(result).to.eql([['Fragaria']]);
    });
});
describe('Drill class unit Short method test.', function () {
    it("Test Drill.query method.", function () {
        var a = new drill_1.default(sample).
            query(['dessert', 'fruits', 0]).
            value();
        var b = new drill_1.default(sample).
            q(['dessert', 'fruits', 0]).
            value();
        chai.expect(a).to.eql(b);
    });
    it("Test Drill.subquery method.", function () {
        var a = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            subquery(['name']).
            value();
        var b = new drill_1.default(sample).
            q(['dessert', 'fruits']).
            sq(['name']).
            value();
        chai.expect(a).to.eql(b);
    });
    it("Test Drill.find method.", function () {
        var a = new drill_1.default(sample).
            query(['dessert', 'fruits']).
            find(['emoji'], '🍓').
            query(['name']).
            value();
        var b = new drill_1.default(sample).
            q(['dessert', 'fruits']).
            f(['emoji'], '🍓').
            q(['name']).
            value();
        chai.expect(a).to.eql(b);
    });
});
