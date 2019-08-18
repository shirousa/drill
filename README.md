
# これはなに

JSON オブジェクトを掘り進めて、目的のオブジェクトにたどり着くためのライブラリ。

# 使い方

#### サンプルファイル

``` javascript
let sample = 
{
    "dessert" : 
    {
        "fruits" : 
        [
            {
                "name" : "Muskmelon",
                "emoji" : "🍈",
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
        ]
    }
}
```


#### 直列式

Muskmelon がほしい式

``` javascript
console.log (
    new Drill(sample).
        query(['dessert', 'fruits', 0, 'name']).
        value();
);
// "Muskmelon"

console.log (
    new Drill(sample).
        query(['dessert']).
        query(['fruits']).
        query([0]).
        query(['name']).
        value();
);
// "Muskmelon"
```

#### 並列式

``` javascript
console.log (
    new Drill(sample).
        query(['dessert', 'fruits']).
        subquery(['name']).
        value();
);
// ['Muskmelon','Banana','Strawberry']
```

#### 探索式

``` javascript
console.log (
    new Drill(sample).
        query(['dessert', 'fruits']).
        find(['emoji'], '🍓').
        query(['class']).
        find(['class'],'Genus').
        query(['name']).
        value();
);
// [['Fragaria']]
```