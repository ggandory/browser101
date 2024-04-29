Promise 구문

Promise는 하나의 객체이다. 최종값이나 작동 여부에 대한 약속

Promise는 값이나 오류에 대한 최종 결과이지만 그 값을 얻는 것은 아니다.

성공이나 실패 콜백은 필요하지 않다. 그냥 호출하면된다.

const fakeRequestPromise = (url) => {
return new Promise((resolve, reject) => {
const delay = Math.floor(Math.random() \* (4500)) + 500;
setTimeout(() => {
if (delay > 4000) {
reject('Connection Timeout :(')
} else {
resolve(`Here is your fake data from ${url}`)
}
}, delay)
})
}
fakeRequestPromise('asdfasfd') // Promise{<pending>}
pending 을 열어보면 resolved인지 rejected인지 나온다

[[PromiseStatus]] : "resoloved"
[[PromiseValue]] : "Here is your fake data from asdfasfd"
이렇게!

const res = fakeRequestPromise('hikingtrails.com/api/nearname')
res // Promise {<resolved> : Here is your fake data from hikingtrails.com/api/nearname"}
이처럼 promise는 최종값을 보여주는 객체이다.

​

​

​

let response = const res = fakeRequestPromise('hikingtrails.com/api/nearname')
response
[[PromiseStatus]] : "pending" // 보류중
[[PromiseValue]] : undefined
상태이다가 한번 더 입력하면

[[PromiseStatus]] : "rejected"
[[PromiseValue]] : "Connection Timeout :("
이렇게 뜨기도 한다.

즉, Promise의 상태는 총 3가지이다.

pending은 무언가를 기다리는 상태

Promise는 비동기적 값이 최종적으로 resolved일지 rejected일지 알려준다.

하지만 처음에는 결과가 바로 나올 수도 있고 한 시간씩 pending상태일 수도 있다.

​

여기서 중요한 점은 Promise가 rejected 또는 resolved 일 때 특정 코드를 실행한다는 것이다.

그러려면 함수 안에 콜백을 전달하는게 아니라 Promise 객체 안에 콜백을 첨부해야한다.

​

그리고 함수가 Promise 객체를 반환하기를 기다리면 된다.

const request = fakeRequestPromiss('yelp.com/api/coffee');
여기서 객체가 나오고 이 Promise가 resolved일 때 이 코드를 실행하고 싶다면

request뒤에 then을 넣는다.

request.then( () => {
console.log('It worked!!!');
})
이렇게 하면 콘솔에 Promise가 resolved일 때마다

It worked!!!가 뜬다

​

request를 콘솔에 입력하면

[[PromiseStatus]] : "resolved"
[[PromiseValue]] : "Here is your fake data from yelp.com/api/coffee"
이렇게 나온다.

​

Promise가 rejected일 때도 코드를 실행할 수 있는데

그러려면 .catch라는 메서드가 필요하다.

const request = fakeRequestPromiss('yelp.com/api/coffee');

request.then( () => {
console.log('It worked!!!');
}).catch( () => {
console.log('Oh no, Error!!');
})
좀 더 눈에 띄게 하기 위해서

request
.then( () => {
console.log('PROMISE RESOLVED!');
console.log('It worked!!!');
}).catch( () => {
console.log('PROMISE REJECTED!');
console.log('Oh no, Error!!');
})
이렇게 쓰기도한다.

request는 객체이다. then과 catch는 각각의 메서드이다.

둘다 콜백을 넣는다. 둘 중 하나만 실행되는데 resolved이면 then ,

rejected이면 catch의 콜백이 실행된다.

​

​

fakeRequestPromiss('yelp.com/api/coffee/page1');
.then( () => {
console.log('PROMISE RESOLVED!');
console.log('It worked!!!');
}).catch( () => {
console.log('PROMISE REJECTED!');
console.log('Oh no, Error!!');
})
fakeRequestPromiss여기서 성공을 뜻하는 then 안에 fakeRequestPromiss을 또 만들수 있다.

fakeRequestPromiss('yelp.com/api/coffee/page1');
.then( () => {
console.log('PROMISE RESOLVED!');
console.log('It worked!!!');
fakeRequestPromiss('yelp.com/api/coffee/page2')
.then(() => {
console.log('PROMISE RESOLVED! (2)');
console.log('It worked!!!');
}
}).catch( () => {
console.log('PROMISE REJECTED!');
console.log('Oh no, Error!!');
})
중첩이 없지는 않다.

fakeRequestPromiss('yelp.com/api/coffee/page1');
.then( () => {
console.log('PROMISE RESOLVED!');
console.log('It worked!!!');
fakeRequestPromiss('yelp.com/api/coffee/page2')
.then(() => {
console.log('PROMISE RESOLVED! (2)');
console.log('It worked!!!');
}
.catch(() => {
console.log('PROMISE RESOLVED! (2)');
console.log('It worked!!! (2)');
}
}).catch( () => {
console.log('PROMISE REJECTED!');
console.log('Oh no, Error!!');
})
이렇게 두번째 실패했을 경우도 만들 수 있다.

​

​

​

이전 콜백함수를 활용했을 때에는 함수 안에다가 중첩을 만들었다.

콜백을 가짜 콜백안에 전달했음. Promise는 fakeRequestPromiss 함수 안에 있는

then, .catch 메서드를 활용해서 반환된 Promsie를 활용했다.

요청이 중첩되는 것은 동일. 함수 내부에서 계속 콜백을 하느냐 , 메서드를 이용하느냐의 차이

​

​

​

Promise의 마법은 .then 안에서 나 자신에게 Promise를 반환할 수 있다는 점이다.

Promise가 Promise를 돌려주기 때문에 길게 중첩하지 않아도된다.

fakeRequestPromise('yelp.com/api/coffee/page1')
.then(() => {
console.log("IT WORKED!!!!!! (page1)")
return fakeRequestPromise('yelp.com/api/coffee/page2')
})
.then(() => {
console.log("IT WORKED!!!!!! (page2)")
return fakeRequestPromise('yelp.com/api/coffee/page3')
})
.then(() => {
console.log("IT WORKED!!!!!! (page3)")
return fakeRequestPromise('yelp.com/api/coffee/page4')
})
이렇게 then 뒤에 then을 이어붙일 수 있는데, 첫번째 then에서 return으로 resolved가

나오면 그 값이 다음 then에 그대로 전달되기 때문에 중첩효과가 똑같이 일어난다.

fakeRequestPromise('yelp.com/api/coffee/page1')
.then(() => {
console.log("IT WORKED!!!!!! (page1)")
return fakeRequestPromise('yelp.com/api/coffee/page2')
})
.then(() => {
console.log("IT WORKED!!!!!! (page2)")
return fakeRequestPromise('yelp.com/api/coffee/page3')
})
.then(() => {
console.log("IT WORKED!!!!!! (page3)")
return fakeRequestPromise('yelp.com/api/coffee/page4')
})
.catch(() => {
console.log("OH NO, A REQUEST FAILED!!!")
})
여기 어디서든 Promise가 reject되면 catch() 로 이동한다.

catch()가 하나만 있어도 된다는 것!!!

then 콜백 함수 안에서 Promise(resolved, rejected)를 반환할 수 있기 때문에 가능한것!!

​

​

Promise는 값으로 resolve 또는 reject를 넘길 수 있다.

위의 then메서드에는 매개변수가 없다. 하지만 promise는 전달받은 값으로 resolve 또는 reject를 전달한다.

실제 요청을 작성한다면 데이터가 필요할 것

fakeRequestPromise('yelp.com/api/coffee/page1')
.then((data) => {
console.log("IT WORKED!!!!!! (page1)")
console.log(data)
return fakeRequestPromise('yelp.com/api/coffee/page2')
})
.then((data) => {
console.log("IT WORKED!!!!!! (page2)")
console.log(data)
return fakeRequestPromise('yelp.com/api/coffee/page3')
})
.then((data) => {
console.log("IT WORKED!!!!!! (page3)")
console.log(data)
return fakeRequestPromise('yelp.com/api/coffee/page4')
})
.catch(() => {
console.log("OH NO, A REQUEST FAILED!!!")
})
이렇게 첫번째 then에 매개변수로 data를 전달해보자

그러면 resolve나 reject안에 있는 값이 전달된다.

예를들어

IT WORKED!!!!!! (page1)
Here is your fake data from yelp.com/api/coffee/page1
IT WORKED!!!!!! (page2)
Here is your fake data from yelp.com/api/coffee/page2
이런식으로 나온다.

​

​

실제 Promise 작성하기

.then과 catch등을 미리 만들어 놓은 Promise에서 호출하는 것에 중점

Promise를 실제로 만드는 것은 알아만 두자(알면 좋은 정도 - 나중에 제대로 할 것)

new Promise((resolve, reject) => {

})
위의 모습이 기본 모습(resolve, reject의 이름은 바뀔 수 있다)

new Promise(() => {
resolve();
})
이렇게 쓰면 콘솔에 상태가 resolved인 Promise가 나온다.(reject넣으면 refected, 아무것도 안넣으면 pending)

const fakeRequest = (url) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve();
})
}, 1000)
}
1초 후에 resolved상태인 Promise를 반환하는 fakeRequest

const request = fakeRequest(); // Promise{<resolved>: undefined}
->
[[PromiseStatus]] : "resolved"
[[PromiseVaed]] : undefined
이제 catch와 then을 fakeRequest에 호출할 수 있다.

const fakeRequest = (url) => {
return new Promise((resolve, reject) => {
const rand = Math.random();
setTimeout(() => {
if (rand < 0.7) {
resolve('YOUR FAKE DATA HERE');
}
reject('Request ERROR');
}, 1000)
})
}

fakeRequest('/dogs/1')
.then((data) => {
console.log('DONE WITH REQUEST!!!');
console.log('data is ', data)
})
.catch((error) => {
console.log("Oh NO!", error)
})
​

​

​

​

예제로 만들어 본 것

​

Promise를 만들려면 함수의 두 매개변수를 전달해야 한다.

첫번째는 resolve함수, 두번째는 reject함수

const delayedColorChange = (newColor, delay, doNext) => {
setTimeout(() => {
document.body.style.backgroundColor = newColor;
doNext && doNext();
}, delay)
}

delayedColorChange('red', 1000, () => {
delayedColorChange('orange', 1000, () => {
delayedColorChange('yellow', 1000, () => {
delayedColorChange('green', 1000, () => {
delayedColorChange('blue', 1000, () => {
delayedColorChange('indigo', 1000, () => {
delayedColorChange('violet', 1000, () => {

                        })
                    })
                })
            })
        })
    })

});
이렇게 중첩되어 있는 콜백지옥을 Promise를 이용해 수정해보자.

const delayColorCHange = (color, delay) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
document.body.style.backgroundColor = color;
resolve();
}, delay)
})
}

delayColorCHange('red', 1000)
.then(() => delayColorCHange('orange', 1000))
.then(() => delayColorCHange('yellow', 1000))
.then(() => delayColorCHange('green', 1000))
.then(() => delayColorCHange('blue', 1000))
.then(() => delayColorCHange('purple', 1000))
요렇게

​

​

비동기 함수

비동기 코드를 아주 깔끔하게 작성하도록 도와줌

Promise 위에 적용됨

async / await 키워드

async는 깔끔하게 만든다.(AJAX를 다룰 때 사용할 예정)

async 자체가 함수를 비동기 함수로 선언해주는 키워드이다.

함수내부에 Promise를 반환하는 메서드가 있다면 비동기 함수로 선언해야 한다.

const sing = async () => {

}
sing() // Promise {<resolved>: undfined}
이렇게 화살표 함수도 비동기 선언을 할 수 있다.

함수가 값을 반환할 때 resoleved 상태로 반환한다.

const sing = async () => {
return 'LA LA LA';
}

sing() // Promise {<resolved>: LA LA LA}

const sing = async () => {
return 'LA LA LA';
}

sing().then((data) => {
console.log('PORMISE RESOLVED WITH : ', data)
})

PORMISE RESOLVED WITH LA LA LA
​

​

​

const sing = async () => {
return 'LA LA LA';
}
여기에서 비동기 처리가 실행되지 않았다. 그저 문자열이 반환될 뿐

aync함수를 쓸 이유가 없다. 하지만 필요한 이유를 곧 배울 것이다.

​

Promise가 실패로 뜨게 하기 위한 방법은 비동기 함수에 오류를 던지면 된다.

어떤 것이든 오류가 될 수 있는데

const sing = async () => {
asdfasdf.caosd();
return 'LA LA LA';
}
sing // Promise {<rejected>: blabla}
asdfasdf라는 것은 정의되어 있지 않기 때문에 참조오류가 발생해서 sing()이 rejected가 나온다.

const sing = async () => {
throw new Error("UH OH")
return 'LA LA LA';
}
sing() //
[[PromiseStatus]] : "rejected"
[[PromiseValue]] : Error : UH OH
상태가 실패이고 값도 UH OH가 나타났다

const sing = async () => {
throw "OH NO, PROBLEM!"
return 'LA LA LA';
}
sing // Promise {<rejected> : "OH NO, Problem!"}
앞서 본 것처럼 비동기 함수에 오류가 있으면 Promise의 상태는 rejected로 뜬다.

오류가 없고 값이 있으면 resolved가 나타난다.

​

sing()
.then((data) => {
console.log('PORMISE RESOLVED WITH : ', data)
})
.catch(err => {
console.log('OH NO, PROMISE REJECTED!')
console.log(err)
})

//OH NO, PROMISE REJECTED!
//OH NO, Problem!
이렇게 나타나는데, sing()의 promise가 rejected이기 때문에 .catch()가 실행되어서

위의 문장이 뜨고, 아래 err에는 sing 내부의 오류문장이 떠서 위와 같이 실행된 것

이 경우에 return은 실행되지 않는다. 오류로 인해 rejected된 promise이기 때문에

​

​

​

로그인을 수행하는 것은 시간이 걸리는 작업인데 어딘가에 있는 서버에 접속해야 하기때문이다. 데이터베이스에서 암호화된 정보를 확인하는 과정이 시간이 걸린다. 즉각적인 반응이 아니기 때문에 비동기 함수를 사용할 것이다.

const login = async (username, password) => {
if (!username || !password) throw 'Missing Credentials'
if (pasword === 'corgifeetarecute') return 'WELCOME'
throw 'Invaild Password'
}

login('asdfasdf')
.then(msg => {
console.log('LOGGED IN');
console.log(msg)
})
.catch(err => {
console.log('ERROR');
console.log(err);
})
이렇게 쓸 경우 login에 변수를 두개 넣어야 하는데 하나만 넣었으므로 catch가 작동될 것이다.

따라서

ERROR
Missing Credentials가 나온다.

​

즉, 첫번째 if문에 !username은 username이 string이라 1이 전달되어 false가되고 두번째는 공란으로 false인데 !이 붙었으므로 true가 되니까 if(0 || 1)은 if(1)이 되어 if문이 실행되고 throw가 실행된다. throw는 실행되면 함수를 중지시키므로 더이상 진행되지 않는다.

const login = async (username, password) => {
if (!username || !password) throw 'Missing Credentials'
if (pasword === 'corgifeetarecute') return 'WELCOME'
throw 'Invaild Password'
}

login('asdfasdf','asdf')
.then(msg => {
console.log('LOGGED IN');
console.log(msg)
})
.catch(err => {
console.log('ERROR');
console.log(err);
})
이처럼 유효하지 않은 비밀번호를 넣어도 마찬가지로

ERROR
Invaild Password
가 나온다.

​

​

\*\*자바스크립트에서 throw는 예외를 발생시킬 수 있다. 예외가 발생하면 함수가 중지되고

catch문으로 전달된다. catch문이 없다면 종료된다.

​

여기서 username, password가 모두 string이므로 true이고 !가 붙으면 false가 되므로 if안에서는 if ( 0 || 0 ) 이되어 첫번째 if문이 실행되지 않는다. 그렇다고 두번째 if문의 조건도 if(false)이니, 결국 Invalid Password가 작동하는 것이다.

​

login('asdfasdf','corgifeetarecute')
.then(msg => {
console.log('LOGGED IN');
console.log(msg)
})
.catch(err => {
console.log('ERROR');
console.log(err);
})
이렇게 올바른 password를 넣을 경우,

위와 마찬가지로 첫번재 if문은 false가 되어 두번째 if문만 작동하는데, true라서 그대로 if만에서 작동된다. return이 존재하므로 더이상 함수가 진행되지 않고 두번째 if문에서 종료되어

LOGGED IN!
WECOME!
await 키워드는 비동기 코드를 쓰면서 동기적으로 보이게 해준다.

await 키워드의 역활은 기다리게 하는 것인데 Promise가 값을 반환할 때 까지 기다리기 위해

비동기 함수의 실행을 일시 정지시킨다.

비동기 함수에서만 적용하기 때문에 await는 항상 비동기 함수와 쌍으로 다닌다.

await를 단독으로 사용할 수는 없다.

const delayedColorChange = (color, delay) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
document.body.style.backgroundColor = color;
resolve();
}, delay)
})
}
delayedColorChange('red', 1000)
.then(() => delayedColorChange('orange', 1000))
.then(() => delayedColorChange('yellow', 1000))
.then(() => delayedColorChange('green', 1000))
.then(() => delayedColorChange('blue', 1000))
.then(() => delayedColorChange('indigo', 1000))
.then(() => delayedColorChange('violet', 1000))
이 구문을 비동기 함수를 이용해서 다시 만들어보자

async function rainbow() {
delayedColorChange('red', 1000)
}
rainbow() // 배경색이 빨간색으로 바뀐다.

async function rainbow() {
delayedColorChange('red', 1000)
delayedColorChange('orange', 1000)
}
rianbow() // 배경색이 빨간색 -> 주황색이 되는게 아니라 바로 주황색이 된다.(동시에됨)

async function rainbow() {
await delayedColorChange('red', 1000)
delayedColorChange('orange', 1000)
}
이렇게 await 키워드를 쓰면 promise가 결과를 낼 때 까지 기다린다.

위에 있는 delayedColorChange의 Promise가 해결될 때 까지 잠시 정지

rainbow() // 빨간색 -> 주황색으로 넘어간다.

async function rainbow() {
await delayedColorChange('red', 1000)
console.log('HI')
await delayedColorChange('orange', 1000)
}
rainbow() // 빨간색 + 1초 경과 -> HI(콘솔) + 주황색 바뀜
async function rainbow() {
await delayedColorChange('orange', 1000))
await delayedColorChange('yellow', 1000))
await delayedColorChange('green', 1000))
await delayedColorChange('blue', 1000))
await delayedColorChange('indigo', 1000))
await delayedColorChange('violet', 1000))
}
이렇게 .then을 사용하지 않아도 된다.

​

Promise를 반환하는 함수나 Promise에만 await를 사용한다.

async function rainbow() {
await delayedColorChange('orange', 1000)
await delayedColorChange('yellow', 1000)
await delayedColorChange('green', 1000)
await delayedColorChange('blue', 1000)
await delayedColorChange('indigo', 1000)
await delayedColorChange('violet', 1000)
return "ALL DOEN"
}

rainbow().then(() => console.log("END OF RAINBOW!") )

rainbow() // 색 변화가 끝난 후 END OF RAINBOW! 가 콘솔에 나타난다.
ALL DONE은 나타나지 않는다. string이 rainbow()의 리턴값으로 전달될 뿐 표시되지는 않음

async function rainbow() {
await delayedColorChange('orange', 1000)
await delayedColorChange('yellow', 1000)
await delayedColorChange('green', 1000)
await delayedColorChange('blue', 1000)
await delayedColorChange('indigo', 1000)
await delayedColorChange('violet', 1000)
return "ALL DOEN"
}

async function printRainbow() {
await rainbow();
console.log("END OF RAINBOW!")
}
printRainbow() //
이겋게 할 경우 printRainbow()에서 색 변화가 일어난 후 END OF RAINBOW가 뜬다
(then을 쓰지 않아도!)
const fakeRequest = (url) => {
return new Promise((resolve, reject) => {
const delay = Math.floor(Math.random() \* (4500)) + 500;
setTimeout(() => {
if (delay > 2000) {
reject('Connection Timeout :(')
} else {
resolve(`Here is your fake data from ${url}`)
}
}, delay)
})
}

async function makeTwoRequest() {
let datq1 = await fakeRequest('/page1')
console.log(data1)
}
이렇게도 쓸 수 있다

fakeRequest에 promise가 뜰 때까지 기다린 후 콘솔에 표시된다(그리고 그렇게 나온 promise가 변수에 저장되기도 한다.)

​

const fakeRequest = (url) => {
return new Promise((resolve, reject) => {
const delay = Math.floor(Math.random() \* (4500)) + 500;
setTimeout(() => {
if (delay > 4000) {
reject('Connection Timeout :(')
} else {
resolve(`Here is your fake data from ${url}`)
}
}, delay)
})
}

async function makeTwoRequest() {
let datq1 = await fakeRequest('/page1')
console.log("helloo!!!")
}
이렇게 delay를>4000으로 바꾸고,

console.log("helloo!!!")를 추가하면

콘솔에 Connection Timeout :(라는 경고문구는 나오지만 "helloo!!!"는 표시되지 않는다.)

promise가 reject되었기 때문에 거기서 실행이 끝난 것이다. (오류가 난것으로 간주)

그래서

    let datq1 = await fakeRequest('/page1')
    console.log("helloo!!!")

이 부분이 실행되지 않은 것이다.

​

try안에 오류가 될 코드를 적으면 실행했을 때 코드가 멈추지 않고 catch문으로 넘어간다.

catch(e)에서 e는 오류를 나타낸다.

console.log(e)를 하면 try문 안에서 어떤 오류가 나타났는지 표시해준다.

catch(e)가 있어야 왜 promise가 reject되었는지 알수가 있다.

const fakeRequest = (url) => {
return new Promise((resolve, reject) => {
const delay = Math.floor(Math.random() \* (4500)) + 500;
setTimeout(() => {
if (delay > 4000) {
reject('Connection Timeout :(')
} else {
resolve(`Here is your fake data from ${url}`)
}
}, delay)
})
}

async function makeTwoRequest() {
try {
let data1 = await fakeRequest('/page1')
console.log(data1)
let data2 = await fakeRequest('/page2')
console.log(data2)
} catch (e) {
console.log("CAUGHT AAN ERROR!")
console.log("error is: ", e)
}

}
promise가 resoleved였으면

Here is your fake data from /page1
또는

Here is your fake data from /page2
가 나왔을 것이다.(요청이 두번 모두 resolve된 경우)

​

​

만약 둘 중 하나라도 rejected가 되었다면 오류가 발생해서 catch문으로 넘어가

CAUGHT AAN ERROR!
error is: Connection Timeout :

이렇게 catch문 안에 있는 내용으로 넘어간다.
