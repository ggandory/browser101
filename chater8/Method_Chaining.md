Method Chaining 이란?
메서드가 객체를 반환하게 되면 메서드의 반환 값인 객체를 통해 또 다른 함수를 호출할 수 있다. 이러한 프로그래밍 패턴을 메서드 체이닝(Method Chaining)이라 부른다.

배열에서의 메서드 체이닝
배열메서드를 사용할 때 이미 메서드 체이닝을 사용하고 있었다. (메서드 체이닝을 지나치게 사용하면 가독성이 떨어지는 코드가 될 수 있다. 사고의 흐름대로 적다보면 저렇게.. ㅇㅅㅇ)

아래 예제는 정수 n을 매개변수로 입력받아 n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴하는 함수이다.

function solution(n) {
return parseInt(String(n).split('').sort().reverse().join(''));
}
parseInt 함수를 제외하고 String(n).split('').sort().reverse().join('') 부분만 살펴보자.
n으로 숫자 118372가 주어졌다고 가정할 때 진행과정은 아래와 같다.

초록색 글씨에 해당하는 부분이 이전 메서드(노란색 블럭)가 리턴하는 값이다. 이전 메서드가 리턴하는 값에 다음에 연결된 메서드가 적용된다는 점이 메서드 체이닝의 핵심이다.

Method Chaining 사용하기
이제 그 원리를 알기 위해, 메서드 체이닝이 아닌 코드를 먼저 살펴보자.

const Human = function () {
this.\_name = '';
this.\_age = 0;
this.\_sibling = [];
}

Human.prototype.setName = function (name) {
this.\_name = name;
}

Human.prototype.setAge = function (age) {
this.\_age = age;
}

Human.prototype.getSibling = function (...sibling) {
this.\_sibling.push(...sibling);
}

Human.prototype.getInfo = function () {
console.log(this.\_name);
console.log(this.\_age);
console.log(this.\_sibling);
};

// 인스턴스 생성
const jake = new Human();
jake.setName('Jake');
jake.setAge(20);
jake.getSibling('Jay', 'Sunghoon');
jake.getInfo();
/_
Jake
20
[ 'Jay', 'Sunghoon' ]
_/
위 코드의 경우 메서드가 리턴하는 것이 없기 때문에 메서드를 연결해서 사용할 수 없기 때문에 매번 jake 객체를 불러와야 한다.

위 코드에 아래와 같이 메서드를 연결해서 사용하면 에러가 발생한다.

// Human 내용은 생략
const jake = new Human();
jake.setName('Jake').setAge(20).getSibling('Jay', 'Sunghoon').getInfo();
// Uncaught TypeError: Cannot read property 'setAge' of undefined
setName 메서드가 리턴하는 값이 없기 때문에 jake.setName('Jake') 자체는 undefined가 된다. (그래서 undefined의 setAge 메서드를 읽을 수 없다는 에러 메시지가 나오는 것)
그렇다면 메서드 체이닝이 가능하게 하려면 어떻게 해야할까??
방법은 간단하다. 메서드가 객체를 리턴해주면 된다. 위 예제를 메서드 체이닝이 가능하도록 바꿔보자.

const Human = function () {
this.\_name = '';
this.\_age = 0;
this.\_sibling = [];
}

Human.prototype.setName = function (name) {
this.\_name = name;
return this; // 자기 자신(객체)을 리턴해주자.
}

Human.prototype.setAge = function (age) {
this.\_age = age;
return this; // 자기 자신(객체)을 리턴해주자.
}

Human.prototype.getSibling = function (...sibling) {
this.\_sibling.push(...sibling);
return this; // 자기 자신(객체)을 리턴해주자.
}

Human.prototype.getInfo = function () {
console.log(this.\_name);
console.log(this.\_age);
console.log(this.\_sibling);
};
이제 setName, setAge, getSibling 메서드 모두 리턴값을 객체로 가지고 있으므로, 메서드를 연결해서 사용할 수 있다.

// 인스턴스 생성
const jake = new Human();
jake.setName('Jake').setAge(20).getSibling('Jay', 'Sunghoon').getInfo();
/_
Jake
20
[ 'Jay', 'Sunghoon' ]
_/
jake.setName('Jake')는 setName 메서드가 적용된 jake 객체가 된다. 따라서 다음에 오는 setAge 메서드를 실행할 수 있게 된다. (setAge, getSibling도 마찬가지)

이렇게 자기 자신을 반환하면서 다른 함수를 지속적으로 호출하는 릴레이 방식의 프로그래밍 패턴을 메서드 체이닝(Method Chaining)이라 부른다. 자주 쓰이는 패턴이라고 하니 기억해두자.

+) 추가
prototype을 연습하기 위해 pseudoclassical 방법으로 예제를 작성했을 뿐 class 키워드를 이용해도 메서드 체이닝을 이용하는 방법은 동일하다.

class Human {
constructor() {
this.\_name = '';
this.\_age = 0;
this.\_sibling = [];
}
setName(name) {
this.\_name = name;
return this;
}
setAge(age) {
this.\_age = age;
return this;
}
getSibling(...sibling) {
this.\_sibling.push(...sibling);
return this;
}
getInfo() {
console.log(this.\_name);
console.log(this.\_age);
console.log(this.\_sibling);
};
}

// 인스턴스 생성
const jake = new Human();
jake.setName('Jake').setAge(20).getSibling('Jay', 'Sunghoon').getInfo();
/_
Jake
20
[ 'Jay', 'Sunghoon' ]
_/
