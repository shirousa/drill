"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function main() {
    console.log("output > " +
        new drill_1.default(sample).
            query(["dessert", "fruits", 0, "name"]).
            value());
    console.log("output > " +
        new drill_1.default(sample).
            query(["dessert"]).
            query(["fruits"]).
            query([0]).
            query(["name"]).
            value());
}
main();
