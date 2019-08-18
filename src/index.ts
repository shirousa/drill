import Drill from './drill'

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

function main () : void {
    
    console.log ("output > " + 
        new Drill (sample).
            query(["dessert", "fruits", 0, "name"]).
            value());
    
    console.log ("output > " + 
        new Drill (sample).
            query(["dessert"]).
            query(["fruits"]).
            query([0]).
            query(["name"]).
            value());
    

     
}

main();