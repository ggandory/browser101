call
​원래 함수는 선언한 후 호출해야 실행되죠.
호출하는 방법으로는 함수 뒤에 ()를 붙이는 것과, call 그리고 apply하는 방법이 있습니다.
javascriptvar example = function (a, b, c) {
return a + b + c;
};
example(1, 2, 3);
example.call(null, 1, 2, 3);
example.apply(null, [1, 2, 3]);Copy
보면 call은 보통 함수와 똑같이 인자를 넣고, apply는 인자를 하나로 묶어 배열로 만들어 넣는 것을 알 수 있습니다.
그렇다면 call과 apply가 공통적으로 가진 null 인자의 역할은 뭘까요?
​
바로 this를 대체하는 겁니다.
javascriptvar obj = {
string: 'zero',
yell: function() {
alert(this.string);
}
};
var obj2 = {
string: 'what'
};

obj.yell(); // 'zero';
obj.yell.call(obj2); // 'what'
// obj1.yell()을 obj2.yell()로 바꾼 효과라고 보면 된다.Copy
마지막 줄에서 obj.yell.call(obj2)로 this가 가리키는 것을 obj에서 obj2로 바꾸었습니다.
yell은 obj의 메소드인데도 zero 대신에 what?이 alert되었습니다.
javascriptvar kim = { name:"kim", first:10, second:20 }
var lee = { name:"lee", first:100, second:200 }

function sum(num) {
return num + this.first + this.second;
}

sum.call(kim, 500); //sum을 call하는데 this값을 kim객체로 한다!Copy
자바스크립트에서는 함수도 객체이기 때문에, 본래라면 전역window에 this가 걸린것을 저런식으로도 지정이 가능합니다.
​
즉 call을 써서 this를 정의해준다면 다른 객체의 파라미터나 메소드를 자기 것마냥 사용할 수 있는 겁니다.

            Tip


.call(this, 파라미터1, 파라미터2 ...)
.apply(this, [ ]);

💬
this는 기본적으로 전역객체의 window로 정해져 있습니다.
하지만 몇 가지 방법으로 window를 다른 것으로 바꿀 수 있는데요.
call, apply, bind에서 첫 번째 인자로 다른 것을 넣어주는 게 this를 바꾸는 방법 중 하나입니다.
​
위 메소드들을 쓰는 예로, 함수의 arguments를 조작할 때 사용합니다. ​
arguments는 함수라면 처음부터 갖고 있는 숨겨진 속성인데요. 바로 함수에 들어온 인자를 배열 형식으로 반환합니다. (배열은 아닙니다. 유사 배열이라고 부릅니다.)
javascriptfunction example() {
console.log(arguments);
}
example(1, 'string', true); // [1, 'string', true]Copy
생긴 건 배열이지만, 배열이 아니라 유사 배열이기 때문에, 배열의 메소드는 쓸 수 없습니다.
javascriptfunction example2() {
console.log(arguments.join()); // Array.prototype.join() 메소드는 사용할 수 없다.
}
example2(1, 'string', true); // Uncaught TypeError: arguments.join is not a functionCopy
에러가 발생하죠? arguments는 모양만 배열이지 실제 배열이 아니라서 배열의 메소드를 쓰면 에러가 발생합니다.

이 때 바로 call이나 apply가 효력을 발휘합니다.

javascriptfunction example3() {
console.log(Array.prototype.join.call(arguments));
}
example3(1, 'string', true); // '1,string,true'Copy
배열의 프로토타입에 있는 join 함수를 빌려 쓰는겁니다. this는 arguments를 가리키게 하고요.
​

1. join() 으로 배열을 문자열로 반환하려고 합니다.
2. 함수 인자로 값들을 넘깁니다. arguments로 배열형태로 받겠지만, 유사배열이라 arguments.join()같은 게 될리가 없죠.
3. 그래서 우선은 프로토타입 메서드 Array.prototype.join()을 불러오고 그 뒤에 .call()로 join함수를 조작합니다.
4. callI(arguments)로 this를 유사배열로 가리키게 합니다. 본래는 Array객체를 가리키고 있지만 바꾼 것이죠. 그러면 Array.prototype.join()이 최종적으로 [1, 'string', true].join() 이 되게 됩니다.
   ​
   join 외에도 slice, concat 등등 모든 메소드를 이 방식으로 사용할 수 있습니다.

윗 내용을 요약해보면 이런식으로 되게 됩니다.
javascriptconst items = [1, 4];

items.join() // "1,4"
Array.prototype.join.call(items); // "1,4"
[].join.call(items); // "1,4"Copy

apply
apply() 메소드의 대표적인 용도는 arguments 객체와 같은, 유사 배열 객체에 배열 메소드를 사용하는 경우입니다.
​
arguments 객체는 배열이 아니기 때문에 Array객체의 slice() 같은 배열의 메소드를 사용할 수 없으나 apply() 메소드를 이용하면 가능합니다.
javascriptfunction convertArgsToArray() {
console.log(arguments);

// arguments 유사배열 겍체를 this로 사용
// slice: 배열의 특정 부분에 대한 복사본을 생성한다.
var arr = Array.prototype.slice.apply(arguments); // arguments.slice
// var arr = [].slice.apply(arguments);

console.log(arr);
return arr;
}

convertArgsToArray(1, 2, 3); // [1,2,3]Copy
Array.prototype.slice.apply(arguments)는,
“Array.prototype.slice() 메소드를 호출하라. 단 this는 arguments 객체로 바인딩하라”는 의미가 됩니다.
결국 Array.prototype.slice() 메소드를 arguments 객체 자신의 메소드인 것처럼 arguments.slice()와 같은 형태로 호출하라는 입니다.

bind  
​bind 함수는 함수가 가리키는 this만 바꾸고 호출하지는 않는 겁니다.
정확히 말하면 this를 정의하고 나서 그 함수를 복사해 새로운 함수를 만들어 리턴 하는 겁니다.
javascriptvar obj = {
string: 'zero',
yell: function() {
alert(this.string);
}
};
var obj2 = {
string: 'what'
};

var yell2 = obj.yell.bind(obj2);
yell2(); // 'what'
obj.yell.bind(obj2)(); // 'what'Copy
obj.yell.bind(obj2) 했더니 yell 함수의 this가 obj2로 바뀌었습니다.
즉 call이나 apply와 비슷하지만 호출은 하지 않지 않고 함수만 반환하는 겁니다.

            Tip


call(this, 1, 2, 3)은 bind(this)(1, 2, 3)과 같다

📝 정리 :
call,apply,bind 이놈은 더도 말고 그냥 참조하는 함수 조작이다.
뭘 조작하냐면, this를 바꿔서 마치 해당 함수가 어느 객체 안에 있게 할수 있다.
javascriptvar obj = { ..., yell(){} };
var obj2 = { ... };

obj.yell.call(obj2); == obj2.yell();Copy
javascriptvar arr = [ ... ];

Array.prototype.join.call(arr) == [].join.call(arr) == arr.join();Copy
​
call, apply는 바로 적용때려버리기.
bind는 적용은 안하고 반환한다. 단 bind()()하면 call처럼 사용 가능.
​
apply는 인수를 배열로 받는 call이다.
뭔가 여러개의 인수를 적용하고 싶은데, 상수가 아닌 변수로 적용하려고 할때 쓰인다.
예로 (1,2,100,200) 같은 인수를 줄려고할때, 상수가 아닌 변수나 묶음으로 관리하며 주고 싶을때 [1,2,100,200]을 주고 apply하면 마치 인수 call(arr, 1,2,100,200) 주는 꼴이 된다.
javascriptvar arr = [1,2,3,4];
var inputArgument = [1,2,100,200];

[].splice.apply(arr, inputArgument); // [1, 100, 200, 4]
// == [].splice.call(arr, 1,2,100,200);
