1. CallBack함수란??
   먼저 쉽게 말해준다! => 다른 함수가 실행을 끝낸 뒤 실행되는 callback되는 함수 를 말한다. 그리고, 함수를 만들때, parameter 를 함수로 받아서 쓸 수 있는데 그 함수는 callback이다.다시 전화하는거 아니다!! 드립 죄송...;;

자세히 말해준다! => js에서 함수는 object라고 한다. 그래서, 함수는 다른 함수의 인자로 쓰일 수도 어떤 함수에 의해 리턴될 수도 있다. 이런 함수를 고차 함수라고 한다. 결국, 인자로 넘겨지는 함수를 콜백 함수라고 한다. 또한, 단지 함수를 등록하기만 하고 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수!
functio func(callback) {
callback();
}
function callback() {
console.log("callback이다");
}

func(callback);

결과 : callback이다
위 예제는 callback함수의 기본 형태이다. 함수f1을 호출했을 때, 밑에 있는 특정 callback함수가 실행된다. 제어권은 f1에게 있다.
function introduce (lastName, firstName, callback) {
var fullName = lastName + firstName;
callback(fullName);
}

introduce("홍", "길동", function(name) {
console.log(name);
};

// 결과 -> 홍길동

출처: https://inpa.tistory.com/entry/JS-📚-자바스크립트-콜백-함수 [👨‍💻 Dev Scroll]
위 예제를 보면, introduce 함수를 실행하면, callback자리를 새로운 함수 function(name)으로 지정 해주면서 함수 안에서 callback(fullname)으로 실행 되는 함수가 된다. 2. 필요한 이유
콜백함수를 설명할 때에는 변수의 유효범위(scope)에 대한 이야기, 동기/비동기(synchronous/Asynchronous)처리에 대한 이야기도 하면 좋을 것 같다.

1. 동기 : 하나의 요청이 오면 완료가 된 후 다음 요청을 실행하는 방식 - 순차적 로직흐름
2. 비동기 : 어떤 요청이 오면 완료가 되기 전에 다음 요청을 실행하는 방식

- 동시 효율적 처리 가능, 즉시 응답X 때문에 예상 밖 결과 나올수도 있음.,

콜백함수는 때로는 가독성이나 코드 재사용 면에서도 사용 된다.
비동기 방식으로 작성된 함수를 동기 처리하기 위해 필요 하다. 3. 예제
function findUserAndCallBack(id, cb) {
const user = {
id: id,
name: "User" + id,
email: id + "@test.com",
};
cb(user);
}

findUserAndCallBack(1, function (user) {
console.log("user:", user);
});
10번째 줄 함수 findUserAndcallBack의 인자로 id 와 콜백 함수를 선언 하여 호출 하였다. 그래서 7번째 줄의 cb 매개변수는 10번째 function익명 함수를 콜백 함수로 할당 받으며, cb(user); 가 실행될 때 이 콜백 함수는 실행되게 된다. => 콜백 함수를 넣음에 따라 함수 내부에서 수행해주 때문에 결과값을 return 할 필요가 없다!!!
function findUser(id) {
let user;
setTimeout(function () {
console.log("waited 0.1 sec.");
user = {
id: id,
name: "User" + id,
email: id + "@test.com",
};
}, 100);
return user;
}

const user = findUser(1);
console.log("user:", user);

결과
user: undefined
waited 0.1 sec.
위 예제는 setTimeout같은 비동기 함수를 썼을 때의 예제이다.
setTime()은 비동기 함수의 호출이기 때문에 실행 완료를 기다리지 않고 다음 라인인 11번째 줄로 넘어가 버린다. 즉, user객체는 무시하고 넘어가 버린다. findUser(1)은 Undefined가 할당된다. 그러고나서, 0.1초 후에 setTimeout()함수의 첫번째 인자로 넘어간 콜백 함수가 실행되면서 waited 0.1 sec. 가 출력되고 user 로컬 변수에 원하는 객체가 할당되었지만 이미 때는 늦었다.
function findUserAndCallBack(id, cb) {
setTimeout(function () {
console.log("waited 0.1 sec.");
const user = {
id: id,
name: "User" + id,
email: id + "@test.com",
};
cb(user);
}, 100);
}

findUserAndCallBack(1, function (user) {
console.log("user:", user);
});

결과
waited 0.1 sec.
user: {id: 1, name: "User1", email: "1@test.com"}
위에 예제는 결과값을 바로 리턴받지 않고, 그 결과값을 통해 처리할 로직을 콜백 함수로 넘겨서 제대로 구현을 하였다.

callback함수는 조금 어려워서 개인적으로 더 공부해야할듯
