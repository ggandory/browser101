자바스크립트 {...} [...] 문법 (비구조화 할당/구조분해 할당)

자바스크립트의 문법에 대한 글을 검색하면 대부분 let, const 혹은 화살 함수(arrow function)에 대한 이야기가 주를 이룹니다.

이번 시간에는 흔히 알려지지 않았지만 유용한 비구조화 할당 문법을 소개하고자 합니다.

정의

모질라 형님들의 문서에 의하면 '비구조화 할당(destructuring assignment) 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 자바스크립트 표현식(expression)'입니다.

간단하게 정리하면 배열 [], 혹은 객체 {} 안의 값을 편하게 꺼내 쓸 수 있는 문법입니다.

기본 문법(배열)

배열에서의 적용은 아래와 같습니다.

[a1, a2, ...rest_a] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(a1); // 1
console.log(a2); // 2
console.log(rest_a); // [3, 4, 5, 6, 7, 8, 9]
좌항이 호출될 변수명 집합, 우항이 할당할 값 입니다.

좌항의 각 요소에는 같은 index를 가지는 배열값이 할당됩니다.

또한 전개 연산자( ... )를 사용하여 좌항에서 명시적으로 할당되지 않은 나머지 배열 값들을 사용할 수 있습니다.

그리고 var, let, const를 사용해 변수들의 유효 범위를 명시적으로 선언할 수 있습니다.

var [b1, b2, ...rest_b] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let [c1, c2, ...rest_c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const [d1, d2, ...rest_d] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
전개 연산자 이후에 변수를 입력하거나, 좌 우항이 다른 속성일 경우 에러가 발생합니다.

[a1, a2, ...rest_a, a3] = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // error
[a1, a2, ...rest_a] = {a1 : 10, a2: 20}; // error

기본 문법(객체)

객체에서의 적용은 아래와 같습니다.

var { a1, a2, ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
console.log(a1); // 10
console.log(a2); // 20
console.log(rest_a); // { a3: 30, a4: 40 }
객체의 경우에는 우항의 key 값이 좌항의 변수명과 매칭됩니다.

배열과 마찬가지로 var, let, const가 적용 가능합니다.

원래의 key 값과 다른 이름의 변수를 사용하는 방법은 아래와 같습니다.

var { a1 : awesome_name, a2 : dumb , ...rest_a } = { a1 : 10, a2 : 20, a3 : 30, a4 : 40 };
console.log(awesome_name); // 10
console.log(dumb); // 20
나머지 값을 뜻하는 전개 연산자는 우항의 key에 영향을 받지 않기 때문에 ...rest_a : blah 와 같은 표현식은 무의미하며, 실제로 에러가 발생합니다.

또한 우항의 key값에 변수명으로 사용 불가능한 문자열이 있을경우 아래와 같은 방식으로 비구조화 할 수 있습니다.

var key = 'it is key';
var { 'an-apple':an_apple, [key]:it_is_key } = { 'an-apple' : 10, 'it is key' : 20};
console.log(an_apple); // 10
console.log(it_is_key); // 20
다만 이 경우에는 'an-apple'과 매칭할 변수명(an_apple)을 작성하지 않으면 에러가 발생하게 됩니다.

마지막으로 객체 비구조화에서 주의해야 할 점은 변수 선언에 대한 명시(var, let, const)가 없을 경우 괄호를 사용하여 묶어주어야 한다는 것 입니다.

({ a, b } = { a : 10, b : 20});
console.log(a); // 10
console.log(b); // 20
{ c, d } = { c : 30, d : 40}; // error

기본값 할당

비구조화의 범위를 벗어나는 값 할당을 시도하면 undefined를 반환하게 됩니다.

[a, b] = [10];
console.log(a); // 10
console.log(b); // undefined

var {c, d} = { c : 20};
console.log(c); // 20
console.log(d); // undefined
이런 경우를 방어하기 위해 호출될 변수명들에 기본값 할당을 할 수 있습니다.

[a=10, b=20] = [10];
console.log(a); // 10
console.log(b); // 20

var {c = 30, d : new_name = 40} = { };
console.log(c); // 30
console.log(new_name); // 40
위와 같은 방법으로 변수명들에 할당 연산자(=)를 사용하여 기본값 할당을 할 수 있습니다.

5, 7번 줄처럼 객체에서 새로운 변수명에 할당하는 방식에도 기본값 할당을 사용할 수 있습니다.

복사(copy)

전개 연산자를 사용하여 배열, 객체의 깊은 복사를 할 수 있습니다.

var arr = [1,2,3];
var copy1 = arr;
var [...copy2] = arr;
var copy3 = [...arr];

arr[0] = 'String';
console.log(arr); // [ 'String', 2, 3 ]
console.log(copy1); // [ 'String', 2, 3 ]
console.log(copy2); // [ 1, 2, 3 ]
console.log(copy3); // [ 1, 2, 3 ]
얕은 복사인 copy1은 arr을 참조하기 때문에 0번 요소가 변경되었지만 전개 연산자를 사용한 copy2, copy3는 깊은 복사가 된 것을 볼 수 있습니다.

객체 역시 전개 연산자로 깊은 복사를 사용할 수 있습니다.

무엇보다도 강력한 점은 복사와 함께 새로운 값을 할당할 수 있다는 점 입니다.

var prevState = {
name: "yuddomack",
birth: "1996-11-01",
age: 22
};

var state = {
...prevState,
age: 23
};

console.log(state); // { name: 'yuddomack', birth: '1996-11-01', age: 23 }
위와 같이 ...prevState를 사용하여 기존 객체를 복사함과 동시에 age키에 새로운 값(23)을 할당할 수 있습니다.

리액트의 props나 state처럼 이전 정보를 이용하는 경우 유용하게 사용할 수 있습니다.

함수에서의 사용

함수의 파라미터 부분에서도 비구조화 할당을 사용할 수 있습니다.

이러한 문법은 특히 API 응답 값을 처리하는데에 유용하게 사용됩니다.

function renderUser({name, age, addr}){
console.log(name);
console.log(age);
console.log(addr);
}

const users = [
{name: 'kim', age: 10, addr:'kor'},
{name: 'joe', age: 20, addr:'usa'},
{name: 'miko', age: 30, addr:'jp'}
];

users.map((user) => {
renderUser(user);
});
마찬가지로 map함수의 파라미터에도 바로 사용할 수 있습니다.

const users = [
{name: 'kim', age: 10, addr:'kor'},
{name: 'joe', age: 20, addr:'usa'},
{name: 'miko', age: 30, addr:'jp'}
];

users.map(({name, age, addr}) => {
console.log(name);
console.log(age);
console.log(addr);
});

for of 문

뿐만 아니라 배열 내 객체들은 for of 문을 사용하여 비구조화 할 수 있습니다.

const users = [
{name: 'kim', age: 10, addr:'kor'},
{name: 'joe', age: 20, addr:'usa'},
{name: 'miko', age: 30, addr:'jp'}
];

for(var {name : n, age : a} of users){
console.log(n);
console.log(a);
}

중첩된 객체 및 배열의 비구조화

중첩된 객체 및 배열 역시 비구조화 할 수 있습니다.

const kim = {
name: 'kim',
age: 10,
addr: 'kor',
friends: [
{name: 'joe', age: 20, addr:'usa'},
{name: 'miko', age: 30, addr:'jp'}
]
};

var { name: userName, friends: [ ,{ name: jpFriend }] } = kim;
console.log(userName); // kim
console.log(jpFriend); // miko
friends 배열의 호출 변수를 명시하는 대신, 배열을 한번 더 비구조화한 모습이 시선을 강탈합니다.

개인적으로 한 번 생각만으로 비구조화 하기에는 헷갈리는 부분이기도 합니다.
