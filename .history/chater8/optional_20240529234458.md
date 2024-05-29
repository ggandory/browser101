Optional chaining (?.)
옵셔널 체이닝은 존재하지 않을 수 있는 프로퍼티 또는 메서드를 안전하게 호출할 수 있도록 도와줍니다.

Optional chaining 연산자 ?.는 체인의 각 참조가 유효한지 명시적으로 검증하지 않고, 연결된 객체 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있다.
쉽게 말하자면 프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있다.
?.은 ?.앞의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환한다.

const food = {
breakfast: {
meal: 'apple',
desert: {
drink: 'juice',
},
},
lunch: {
drink: 'coffee',
meal: 'pasta',
},
};

console.log(food.lunch.desert.drink); //Cannot read properties of undefined (reading 'drink')
위 코드 같은 음식 데이터를 가지고 있는 객체가 있을 때 console에 적힌 객체에 접근하게 되면 타입에러가 뜹니다. 만약 옵셔널 체이닝을 몰랐을 경우 아래와 같이 console을 찍었을 겁니다.

console.log(food.lunch && food.lunch.desert && food.lunch.desert.drink);
검사를 해야할 항목이 많아지다보니 코드도 길어지고 가독성도 떨어지죠. 그래서 이럴 때 옵셔널 체이닝을 이용하면 아래 코드처럼 변경할 수 있습니다.

console.log(food.lunch?.desert?.drink);
?. 연산자의 왼쪽에 있는 것을 평가한 뒤 undefined또는 null이 맞다면 undefined를 반환하고 평가가 끝난다.

📌 옵셔널 체이닝 장점
if문을 줄여준다.
const person = {
name: "John",
address: {
city: "New York",
state: "NY",
country: "USA"
}
};

const zipCode = person && person.address && person.address.zipCode;
이를 간단하게 표현하기 위해서는 옵셔널 체이닝 연산자 ?.를 사용할 수 있다.

const zipCode = person?.address?.zipCode;
이제 객체 person이 null 또는 undefined인 경우, zipCode 변수는 undefined가 된다. 따라서 if문을 사용하여 zipCode 변수가 정상적으로 값을 갖는지 체크할 필요가 없다.

if (zipCode) {
// zipCode가 존재하는 경우 실행할 코드
} else {
// zipCode가 존재하지 않는 경우 실행할 코드
}
// zipCode가 존재하는 경우 실행할 코드
person?.address?.zipCode && 코드 실행;
// zipCode가 존재하지 않는 경우 실행할 코드
person?.address?.zipCode || 코드 실행;
위 코드에서 person?.address?.zipCode가 undefined 또는 null일 경우에는 뒤의 코드가 실행되지 않으므로 if문을 사용하여 체크할 필요가 없다.

nullish연산자와 함께 쓰면 기본값 주기에 용이하다.
const user = {};
const userAddress = user.info?.address ?? '모르는 주소'; // '모르는 주소'
대괄호 표기법에도 옵셔널 체이닝이 가능하다.
let nestedProp = obj?.['prop' + 'Name'];
존재하지 않을 수 있는 메서드를 호출할 때도 유용하다.
const person = {
name: "John",
address: {
city: "New York",
state: "NY",
country: "USA"
},
sayHello: function() {
console.log("Hello!");
}
};
이 객체에서 sayHello 메서드를 안전하게 호출하기 위해서는 다음과 같은 코드를 사용할 수 있다.

person?.sayHello?.();
이제 객체 person이 null 또는 undefined인 경우, sayHello 메서드가 호출되지 않는다. 따라서 if문을 사용하여 sayHello 메서드가 존재하는지 체크할 필요가 없다.

if (person?.sayHello) {
person.sayHello();
}
위 코드를 옵셔널 체이닝 연산자를 사용하여 간단하게 줄일 수 있다.

person?.sayHello?.();
위 코드에서 person?.sayHello?.()가 undefined 또는 null일 경우에는 메서드가 호출되지 않으므로 if문을 사용하여 체크할 필요가 없다. 5. 배열 항목에 접근 가능하다.

let arrayItem = arr?.[42];
📌 옵셔널 체이닝 주의점
지원하지 않는 브라우저에서는 동작하지 않는다. 따라서, 옵셔널 체이닝을 사용하는 경우에는 브라우저 호환성을 고려해야 한다다.

옵셔널 체이닝은 프로퍼티나 메서드가 null 또는 undefined인 경우에만 동작한다. 다른 falsy 값, 예를 들어 0, "", false 등은 체이닝 연산의 결과가 아니라 그대로 반환된다.

옵셔널 체이닝을 남발하면 코드 가독성이 저하될 수 있다.

옵셔널 체이닝 연산자 ?.는 함수 호출 시 인자로 사용할 수 없다. 대신, 함수 호출 전에 체이닝 연산자를 사용하여 안전하게 객체의 프로퍼티나 메서드를 호출해야 한다.

옵셔널 체이닝은 객체 체이닝을 위해 만들어진 것이므로, 배열에서는 사용할 수 없다.(접근만 가능)
