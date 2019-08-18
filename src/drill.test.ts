import * as chai from 'chai';

import Drill from './drill';


let sample = 
{
    "dessert" : 
    {
        "fruits" : 
        [
            {
                "name" : "Muskmelon",
                "emoji" : "🍈",
                "wiki" : "https://en.wikipedia.org/wiki/Muskmelon",
                "class" : 
                [
                    { "class" : "Kingdom" , "name" : "Plantae" },
                    { "class" : "Clade" , "name" : "Angiosperms" },
                    { "class" : "Clade" , "name" : "Eudicots" },
                    { "class" : "Clade" , "name" : "Rosids" },
                    { "class" : "Order" , "name" : "Cucurbitales" },
                    { "class" : "Family" , "name" : "Cucurbitaceae" },
                    { "class" : "Genus" , "name" : "Cucumis" },
                    { "class" : "Species" , "name" : "C.melo" }
                ]
            }, 
            {
                "name" : "Banana",
                "emoji" : "🍌",
                "wiki" : "https://en.wikipedia.org/wiki/Banana",
                "class" : 
                [
                    { "class" : "Kingdom" , "name" : "Plantae" },
                    { "class" : "(unranked)" , "name" : "Angiosperms" },
                    { "class" : "(unranked)" , "name" : "Monocots" },
                    { "class" : "(unranked)" , "name" : "Commelinids" },
                    { "class" : "Order" , "name" : "Zingiberales" },
                    { "class" : "Family" , "name" : "Musaceae" },
                    { "class" : "Genus" , "name" : "Musa" }
                ]
            }, 
            {
                "name" : "Strawberry",
                "emoji" : "🍓",
                "wiki" : "https://en.wikipedia.org/wiki/Strawberry",
                "class" : 
                [
                    { "class" : "Kingdom" , "name" : "Plantae" },
                    { "class" : "Clade" , "name" : "Angiosperms" },
                    { "class" : "Clade" , "name" : "Eudicots" },
                    { "class" : "Clade" , "name" : "Rosids" },
                    { "class" : "Order" , "name" : "Rosales" },
                    { "class" : "Family" , "name" : "Rosaceae" },
                    { "class" : "Genus" , "name" : "Fragaria" },
                    { "class" : "Species" , "name" : "F. × ananassa" }
                ]
            }
        ],
        "cake" : 
        [
            {
                "name" : "Mont Blanc" ,
                "origin" : "Italy"
            },
            {
                "name" : "Yokan",
                "origin" : "Japan"
            }
        ]
    },
    "author" : {
        "name" : "Shirousa",
        "github" : "https://github.com/shirousa/drill"
    }
}

describe ('Drill class inner function unit test.',()=>{
    it ("Drill._query(sample, ['dessert', 'fruits', 0, 'name']);", () => {
        const result = Drill._query(sample, ['dessert', 'fruits', 0, 'name']);
        chai.expect(result).to.equal('Muskmelon');
    });
    
    it ("Drill._query(sample, ['dessert', 'fruits', 1, 'name']);", () => {
        const result = Drill._query(sample, ['dessert', 'fruits', 1, 'name']);
        chai.expect(result).to.equal('Banana');
    });
    
    it ("Drill._query(sample, ['dessert', 'fruits', -1, 'name']);", () => {
        const result = Drill._query(sample, ['dessert', 'fruits', -1, 'name']);
        chai.expect(result).to.be.undefined;
    });
    
    it ("Drill._query(sample, ['dessert', 'fruits', 4, 'name']);", () => {
        const result = Drill._query(sample, ['dessert', 'fruits', 4, 'name']);
        chai.expect(result).to.be.undefined;
    });
        
    it ("Drill._query(sample, ['dessert', 'sushi', 0, 'name']);", () => {
        const result = Drill._query(sample, ['dessert', 'sushi', 0, 'name']);
        chai.expect(result).to.be.undefined;
    })
})

describe ('Drill class unit Normal test.',()=> {
    it ("Test Drill.query list method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert', 'fruits', 0, 'name']).
                value();
        chai.expect(result).to.equal('Muskmelon');
    });
    
    it ("Test Drill.query chain method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert']).
                query(['fruits']).
                query([0]).
                query(['name']).
                value();
        chai.expect(result).to.equal('Muskmelon');
    });
        
    it ("Test Drill.subquery method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                subquery(['name']).
                value();
        chai.expect(result).to.eql(['Muskmelon','Banana','Strawberry']);
    });
    
    it ("Test Drill.subquery chain method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                subquery(['class']).
                subquery(['name']).
                value();
        chai.expect(result).to.eql(
            [
                ["Plantae","Angiosperms","Eudicots","Rosids","Cucurbitales","Cucurbitaceae","Cucumis","C.melo"],
                ["Plantae","Angiosperms","Monocots","Commelinids","Zingiberales","Musaceae","Musa"],
                ["Plantae","Angiosperms","Eudicots","Rosids","Rosales","Rosaceae","Fragaria","F. × ananassa"]
            ]
       );
    });
    
    it ("Test Drill.find method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                find(['emoji'], '🍓').
                query(['name']).
                value();
        chai.expect(result).to.eql(['Strawberry']);
    });   
    
    it ("Test Drill.find chain method.", () => {
        const result = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                find(['emoji'], '🍓').
                query(['class']).
                find(['class'],'Genus').
                query(['name']).
                value();
        chai.expect(result).to.eql([['Fragaria']]);
    });
})


describe ('Drill class unit Short method test.',()=> {
    it ("Test Drill.query method.", () => {
        const a = 
            new Drill(sample).
                query(['dessert', 'fruits', 0]).
                value();
        const b = 
            new Drill(sample).
                q(['dessert', 'fruits', 0]).
                value();
        chai.expect(a).to.eql(b);
    });
    
    it ("Test Drill.subquery method.", () => {
        const a = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                subquery(['name']).
                value();
        const b = 
            new Drill(sample).
                q(['dessert', 'fruits']).
                sq(['name']).
                value();
        chai.expect(a).to.eql(b);
    });
    
    
    it ("Test Drill.find method.", () => {
        const a = 
            new Drill(sample).
                query(['dessert', 'fruits']).
                find(['emoji'], '🍓').
                query(['name']).
                value();
        const b = 
            new Drill(sample).
                q(['dessert', 'fruits']).
                f(['emoji'], '🍓').
                q(['name']).
                value();
        chai.expect(a).to.eql(b);
    });
})