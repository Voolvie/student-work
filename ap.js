// // const numbers = [2, 5, 7, 10, 34, 16, 879, 1]
// // const parzyste = () => {
// //     return numbers.filter(number => number % 2 === 0)
// // }
// // console.log(parzyste())

// // const osoba = { name: "Jill", age: 25, hobby: "sports" }

// // const sayHello = (name) => {
// //     return name ? `Hello, ${name}!` : `Hello`
// // }
// // console.log(sayHello(osoba.name))

// // const students = ["John", "Bill", "Emma", "Stella", "Rob"]

// // const losuj = (list) => {
// //     return list[Math.floor(Math.random() * list.length)]
// // }
// // console.log(losuj(students))

// // const People = {
// //     peopleCount: 0,
// //     peopleArray: [],
    
// //     addPerson: function (name, age) {
// //         const person = {
// //             name: name,
// //             age: age
// //         }
// //         this.peopleCount ++,
// //         this.peopleArray.push(person)
// //         return person
// //     },
    
// //     printStats: function() {
// //         console.log("Ilosc ludzi to: " + this.peopleCount)
// //     },
// //     printPeople: function() {
// //         console.log("Ludzie to " + this.peopleArray)
// //     }
// // }

// // const Szymon = People.addPerson("Szymon", 23)
// // People.printPeople()
// // People.printStats()

// const ShoppingCart = {
//     items: [],
//     addItem: function (name, price) {
//         this.items.push({
//             name: name,
//             price: price
//         })
//     },
//     printInfo: function () {
//         let totalPrice = 0;
//         for (i = 0; i < this.items.length; i++) {
//             totalPrice += this.items[i].price
//         }
//         this.items.map(item => console.log("w koszyku: " + item.name + ", cena: " + item.price))
//         console.log("Wartosc koszyka: " + totalPrice)   
//     },
//     removeByindex: function(i) {
//         if (i >= this.items.length) return; 
//             this.items.splice(i, 1)
        
//     }
// }

// ShoppingCart.addItem("TV", 2000)
// ShoppingCart.addItem("TV2", 2000)
// ShoppingCart.addItem("TV3", 2000)
// ShoppingCart.printInfo()
// ShoppingCart.removeByindex(0)
// ShoppingCart.printInfo()

const input = "123456789dsds20"

const myFunction = (input) => {
    const numbers = [0,1,2,3,4,5,6,7,8,9];

for(let i = 0 ; i < input.length; i++) {
  if(numbers.includes(Number(input[i]))) {
    numbers.splice(numbers.indexOf(Number(input[i])), 1)
  }
}

return numbers.length === 0
}
console.log(myFunction(input))

