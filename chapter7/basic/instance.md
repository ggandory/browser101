생성자 vs 객체 리터럴
"생성자를 굳이 만들어야 하나?"라는 생각을 가질 수 있습니다. 다음 예제처럼 객체 리터럴을 활용하여 객체를 생성할 수 있기 때문이죠.
let userInfo = {
name: '홍길동',
age: 20,
addresss: '서울'
}
동일한 프로퍼티(name, age, address)를 가지는 3개의 객체가 필요한 경우 다음 예제처럼 객체를 생성할 수 있습니다.
let userInfo1 = {
name: '홍길동',
age: 20,
addresss: '서울'
}

let userInfo2 = {
name: '홍길동',
age: 20,
addresss: '서울'
}

let userInfo3 = {
name: '홍길동',
age: 20,
addresss: '서울'
}
소스코드가 중복되어 가독성이 떨어집니다.

다음 예제처럼 객체 usrInfo2와 userInfo3을 userInfo1으로 초기화하면 코드가 심플해집니다. 하지만, 치명적인 단점이 존재합니다.
let userInfo1 = {
name: '홍길동',
age: 20,
addresss: '서울'
}

let userInfo2 = userInfo1;
let userInfo3 = userInfo1;

userInfo3.name = '마이콜';

console.log(userInfo1.name);
console.log(userInfo2.name);
console.log(userInfo3.name);
[실행 결과]
마이콜
마이콜
마이콜
userInfo3.name을 변경했는데, userInfo1.name, userInfo2.name도 변경되는 문제가 발생합니다. 각 객체가 독립적으로 동작하지 않고 동일한 객체를 가리키고 있기 때문입니다.

다음 예제처럼 생성자를 사용하여 3개의 객체를 생성하고 userInfo3.name의 값을 변경해봅시다.
function UserInfo() {
this.name = '홍길동';
this.age = 20;
this.addresss = '서울';
}

let userInfo1 = new UserInfo();
let userInfo2 = new UserInfo();
let userInfo3 = new UserInfo();

userInfo3.name = '마이콜'

console.log(userInfo1.name);
console.log(userInfo2.name);
console.log(userInfo3.name);
[실행 결과]
홍길동
홍길동
마이콜
생성자를 사용하여 생성된 객체는 독립적으로 동작하는 것을 확인할 수 있습니다.

생성자 함수는 동일한 프로퍼티를 가지는 객체를 심플하게 생성할 수 있으며, 각 객체의 독립성을 보장합니다.

생성자 함수의 함수
생성자 함수에 함수가 존재할 수 있습니다. 다음 예제처럼 function 키워드를 사용하여 함수를 정의합니다.
function UserInfo(name, age, address) {
this.name = name;
this.age = age;
this.addresss = address;

this.info = function() {
return `${name}의 나이는 ${age}살이며, 주소는 ${address}입니다.`;
}
}

let userInfo = new UserInfo('둘리', 20, '평양');

console.log(userInfo.info());
[실행 결과]
둘리의 나이는 20살이며, 주소는 평양입니다.
함수를 호출하는 방법과 동일합니다.

생성자 함수에서 return문
생성자 함수도 함수이므로 일반 함수처럼 return문이 존재할 수 있습니다.

생성자 함수에 return문이 존재하는 경우 this 대신 return문에 존재하는 값이 반환됩니다.

그러므로 instanceof 연산자를 사용하여 객체의 타입을 확인하면 예상과 다른 결과를 확인할 수 있습니다.

다음 예제는 생성자 함수에 return문이 존재하는 경우입니다.
function UserInfo(name, age, address) {
this.name = name;
this.age = age;
this.addresss = address;
return {
name: '또치',
age: 10
}
}

let userInfo = new UserInfo('둘리', 20, '서울');

console.log(userInfo);
console.log(userInfo instanceof UserInfo);
[실행 결과]
{name: '또치', age: 10}
false
