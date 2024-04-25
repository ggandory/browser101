비동기식 자바스크립트를 처리하는 첫번째 방법인 콜백함수이다. 잘 쓰이는 방법은 아니지만, 알아는 두자

searchMoviesAPI('amadeus', () => {
saveToMyDB(movies, () => {
// if it works, run this
}, () => {
// if it doesn't work, run this
})
() => {
});
searchMoviesAPI는 API에 요청해주는 메서드로, 서버에 요청 한 후 resolve 값을 받거나 rejected 값을 받는 메서드이다.

resolve되면 요청에 응답 성공한거고, rejected는 실패한 거다.

saveToMyDB가 작동할 수 있고(resolve) 인터넷이 멈추거나 데이터베이스가 존재하지 않거나

권한이 없습니다 꽉 찼습니다 등 그러면 작동하지 않는다.(reject)

따라서 두가지 가능한 결과에 대해 예상해야 하고 몇초후 발생할 때 까지 알수가 없다.

API 검색도 같은 것이다. 작동할 수도 있고 데이터를 다시 얻을 수 있지만

전체 두 번째 콜백이 있을 수 있다.

​

이런 중첩은 좋지 않지만 실제로는 하나 이상의 콜백이 있는 경우가 흔하다.

예를 들어, 가짜 영화검색이나 데이터베이스 저장과 같은 비동기 작업을 위해 각 함수에 전달했을 때 작동할수도, 하지 않을 수도 있다.

그래서 많은 프로그래머와 자바스크립트 개발자가 수많은 상황에 대처하기 위해 콜백을 계속 중첩하고, 이를 콜백지옥이라고 부른다.

많은 양의 콜백을 전달해야하기 때문에 코드가 복잡하게 중첩되어 있고 보기 좋지 않으며 혼란스럽다.

​

좀 더 쉽게 할 수 있는 언어에 대한 새로운 추가사항이 Promise라는 비동기 함수이다.

​

그러나 왜 콜백으로 작업할 때 힘든지도 알아두어야 한다.

setTimeout을 한번만 사용한다면 문제가 없지만 5-6개의 종속적인 작업이 있다면

갑자기 코드에 중첩이 많이 생긴다. 각각이 다수의 콜백을 가질 수 있지만

작동하거나 작동하지 않는 경우가 생긴다면 중첩이 많이 생기고 콜백 지옥에 빠지게 된다.

따라서 Promises가 필요하게 된다.

​

​

​

여기까지 인강보고 이해 안되서 따로 정리한 내용이 있다. 다른 블로그 보고 정리한 것임

​

자바스크립트 동기적 처리와 비동기 처리에 대해 알아보자.

만약 작업을 동기적으로 처리한다면 작업이 끝날 때까지 기다리는 동안 중지상태가 되기 때문에 다른작업을 할 수 없다.

그리고 작업이 끝나야 비로소 그 다음 예정된 작업을 할 수 있다.

하지만 이를 비동기적으로 처리한다면 흐름이 멈추지 않기 때문에 동시에 여러가지 작업을 처리할 수 있고, 기다리는 과정에서 다른 함수도 호출할 수 있다.

다음과 같은 작업들은 주로 비동기적으로 처리하게 된다.

​

​

1. Ajax Web API 요청 : 만약 서버쪽에서 데이터를 받아와야할 때는, 요청을 하고 서버에서 응답을 할 때 까지 대기를 해야하기 때문에 작업을 비동기적으로 처리한다.

​

2. 파일 읽기 : 주로 서버쪽에서 파일을 읽어야 하는 상황에는 비동기적으로 처리한다.

암호화,복호화 : 암호화, 복호화 과정이 바로 처리되지 않고 시간이 어느정도 걸리는 경우가

있기 때문에 비동기적으로 처리한다.

3. 작업예약 : 단순히 어떤 작업을 몇초 후에 스케쥴링해야하는 상황에는 setTiimeout을

사용하여 비동기적으로 처리한다.

​

비동기 작업을 다룰 때에는 콜백함수외에도 Promises, 그리고 async/await라는 문법을 사용해 처리할 수 있다.

​

비동기 처리의 가장 흔한 사례는 jQuery의 ajax이다. 제이쿼리로 실제 웹 서비스를 개발할 때 ajax통신을 빼놓을 수가 없다.

보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시 해야 하는데 이 때 ajax통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문이다.

이부분은 나중에 인강 보고 다시 정리하자.

​

여기서 제이쿼리란 HTML 요소들을 쉽게 조작하고 편리하게 사용할 수 있게 만든

라이브러리로 자바스크립트를 미리 작성해둔 것이다.

document.getElementById("element").style.display = "none";
자바스크립트를 사용한경우

$('#element').hide();
제이쿼리를 사용한 경우

​

​

제이쿼리는 자바스크립트와 다른 소프트웨어가 아니라 미리 작성된 자바스크립트 코드로

전문 개발자들이 짜둔 코드를 가져와서 사용하는 것이다. 따라서 사용하기전에 꼭 import해야한다

​

ajax는 Asynchronous Javascript and XML의 약자이다.

빠르게 동작하는 동적인 웹페이지를 만들기 위한 개발 기법의 하나이다.

비동기 자바스크립트와 XML을 말한다. 간단히 말하면 서버와 통신하기 위해 XMLHttpRequest 객체를 사용하는 것을 말한다.

​

​

동기식 : 먼저 시작된 하나의 작업이 끝날 때 까지 다른작업을 시작하지 않고 기다렸다가 다 끝나면 새로운 작업을 시작하는 방식.

한번에 하나만 처리함

비동기식 : 먼저 실행된 작업이 끝날 때 까지 기다리지 않고 다음 작업을 수행하는 방식.

한번에 여러 작업을 처리함
AJAX란?

서버와 비동기적으로 통신할 때 사용하는 API.

AJAX를 사용하면 백그라운드 영역에서 서버와 비동기적으로 통신하여 웹 페이지의 일부분에

표시한다. 즉, 새로고침하지 않고도 웹페이지의 일부분을 갱신할 수 있다.

​

API는 사용설명서다. 프로그램마다 사용자와 인터페이스가 다 다른데 이 때 어떤 요청을 할 경우 어떻게 응답하라고 써져있는 메뉴얼이다. 따라서 우리는 다른 프로그램에 요청을 할 때 그 프로그램에 맞게 코드를 짤 필요 없이, API에 맞는 형식으로 요청을 할 경우 API가 해당 프로그램에 맞는 방식으로 전환하여 프로그램에 전달해준다. API를 프로그램의 번역기라고 생각하면 좋을듯. 예를들어, WebAPI로 자바스크립트가 보낼 때, Web서버에 맞는 형식으로 API가 변환한 후 브라우저에 전달하고, 브라우저에게서 받은 응답을 API가 다시 변환 후 자바스크립트에 전달한다. 이 때 서버로 부터 받은 데이터를 예전에는 XML 형식, 요즘에는 JSON 형식으로 받는다.

​

JSON란?

데이터를 저장하거나 전송할 때 많이 사용되는 경량의 DATA 교환 형식

JSON은 사람과 기계 모두 이해하기 쉬우며 용량이 작아서 최근에는 JSON이 XML을 대체해서 데이터 전송 등에 많이 사용된다.

JSON문서 형식은 자바스크립트 객체의 형식을 기반으로 만들어져서 자바스크립트 객체표기법과 아주 유사하다.

특정 언어에 종속되지 않기 때문에 다른 프로그래밍 언어를 이용에서도 쉽게 만들 수 있다.

​

​

당시에는 이것을 봐도 이해가 안되서 한번 더 찾아봤다... 나는 평균이하의 사람 ㅠㅠ

​

자바스크립트 비동기식 처리

1. 자바스크립트는 싱글 스레드

자바스크립트는 싱글스레드(하나의 메인스레드) 런타임을 가진 동기식 언어이다.

분기문, 반복문, 함수 호출등이 동기적으로 실행되며, 이 때 코드의 처리는 코드의 흐름과 동일하다.

싱글 스레드 환경에서 메인스레드를 긴 시간 점유하면 프로그램이 멈출 수도 있다.

​

하지만 자바스크립트는 브라우저에서 별도의 API를 사용하여 비동기적으로 작업을 처리할 수 있다.

​

자바스크립트에서 비동기 코드를 처리하는 모듈은 이벤트 루프(event loop), 태스크 큐(task queue), 잡 큐(job queue)등으로 구성된다.

API 모듈은 비동기 요청을 처리 한 후 태크스 큐에 콜백함수를 넣는다. 자바스크립트 엔진은 콜 스택이 비워지면, 태스크 큐의 콜백함수를 실행한다.

​

자바스크립트의 비동기 내장함수

자바스크립트는 비동기 내장함수를 제공하는데, 그것은 바로 setTimeout, XMLHttpRequest, fecth()이다.

setTimeout / claerTimeout(setTimout을 취소, 중지시킨다. setTimeout([식별자]);)
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
다음과 같은 코드를 살펴보자

- bar가 호출되면 setTimeout을 반환하고 콜스택에 추가된다.

setTimeout 함수는 비동기 함수이기 때문에 타이머가 완료될 때까지 하염없이 콜스택에 머물지 않고 Web API에서 넘겨받는다.

이 때 넘겨받은 bar()의 내용을 콜백함수(콜백함수는 함수 내부에 있는 함수이다)라고 한다.

- Web API에서 콜백함수의 타이머가 실행되는 동안 foo가 호출되어 콜스택에 추가된다.

실행 완료 후 콜스택을 빠져나가며 "First"을 기록한다.

- baz도 마찬가지

- foo와 baz가 실행되는 동안 콜백함수의 타이머가 완료되면 콜백함수는 태스크 큐에 들어가서 콜 스택이 비워질 때까지 기다린다.

이 때, 이벤트루프가 콜스택과 태스크 큐의 상태를 확인하며 콜스택이 비워지면 콜백함수를 콜스택으로 이동시킨다.

이렇게 해서 콜백 함수의 실행이 완료되면 콜스택을 빠져나간다.

​

2. 콜백 지옥

콜백함수는 파라미터로 함수를 전달받아 함수의 내부에서 실행하는 함수이다.

콜백함수는 콜백지옥을 발생시킬 수 있는데 콜백 지옥이란 함수의 매개변수로 넘겨지는

콜백함수가 반복되어 코드의 들여쓰기 수준이 감당하기 힘들어질 정도로 깊어지는 현상이다.

​

이러한 콜백 지옥을 해결하기 위해 새로운 비동기 처리방법으로 Promise가 탄생했다.

​

3. Promise

Promise는 자바스크립트에서 제공하는 비동기를 간편하게 처리할 수 있도록 도와주는 객체이다.

인강 보고

https://velog.io/@kim_unknown_/JavaScript-Asynchronous

여기서 더 공부해보자

​

​

​

​

​

강의 내용(콜백함수)

Promise는 어떤 연산, 비동기 연산이 최종적으로 완료 혹은 성공했는지 실패했는지 알려주는 객체이다. 일반적으로 요청을 보내 다른위치에서 데이터를 받는 상황이 많은데 대표적인 것이 IMDB AMPI나 넷플릭스 API이다. 정보를 얻는 곳은 그 외에도 다양하다. Amazon API, Goodreads API, Weather API 등등

그런데 이곳들에 접속할 때 시간이 오래걸리기도 하고 아예 접속이 안될 때가 있다.

접근 권한이 없거나 URL을 잘못 썼거나 API나 인터넷이 다운되었거나 등등

​

예전에는 이런식으로 작성했다.

makeRequest(() => {

},
() => {}
)
이렇게 두개의 콜백을 넣는다. 성공 콜백 / 실패 콜백으로 둘 중 하나만 실행된다.

그리고 뭐가 성공했는지는 실행하는 함수인 makeRequest가 확인한다.

그래서 하나의 요청에 두개의 콜백이 들어간다.

만약 성공한 다음에 또 무언가를 하려면 중첩에 중첩을 거듭해야 한다.

아주 복잡한 모양이 될 거다

fakeRequestCallback('books.com/page1',
function (response) {
console.log("IT WORKED!!!!")
console.log(response)
fakeRequestCallback('books.com/page2',
function (response) {
console.log("IT WORKED AGAIN!!!!")
console.log(response)
fakeRequestCallback('books.com/page3',
function (response) {
console.log("IT WORKED AGAIN (3rd req)!!!!")
console.log(response)
},
function (err) {
console.log("ERROR (3rd req)!!!", err)
})
},
function (err) {
console.log("ERROR (2nd req)!!!", err)
})
}, function (err) {
console.log("ERROR!!!", err)
})
​

이런식으로 매우 복잡해짐

​

예제

const fakeRequestCallback = (url, success, failure) => {
const delay = Math.floor(Math.random() \* 4500) + 500;
setTimeout(() => {
if (delay > 4000) {
failure('Connection Timeout :(')
} else {
success(`Here is your fake data from ${url}`)
}
}, delay)
}
url을 넣고 성공 콜백과 실패 콜백을 넣는다.

대기시간이 난수기반으로 500 ~ 5000ms 대기시간

대기시간이 4초를 넘으면 실패 콜백을 호출

여기에

fakeRequestCallback('books.com', function () {
console.log('it worked!!!');
}, function () {
console.log('ERROR!!');
})
이렇게 쓸 경우 앞에 function은 성공 콜백함수, 뒤의 function은 실패 콜백함수이다.

fakeRequestCallback('books.com',
function (response) {
console.log('it worked!!!');
console.log(response)
}, function (err) {
console.log('ERROR!!', err);
})
이렇게 함수를 쓸 경우

it worked!!!
Here is your fake data from ${url}
혹은

ERROR!! Connection Timeout :(
이렇게 나온다.

생각해보자

delay = 5000이라고 하면,

fakeRequestCallback함수 안에 있는 if문에 의해 failure를 반환할 것이다

이 failure는 실패객체로 실패 콜백함수를 호출하여 'error'을 반환한다.

하지만 여기에 function(err)을 붙임으로써, err = failure가 되고 failure안에 있는 string이

표시된다.

​

delay가 3000이면 fakeRequestCallback 함우 한에 있는 if문에 의해 success를 반환하고 이 success는 function의 response가 된다.

err이나 response가 없었다면 단지 성공했는지 실패했는지만 알려주지만,

각각 function이 success나 err를 전달받음으로써 그 안에 있는 문자열도 반환한 것!

​

fakeRequestCallback('books.com/page1',
function (response) {
console.log('it worked!!!');
console.log(response)
fakeRequestCallback('books.com/page2',
function (response) {
console.log('it worked again!!!');
console.log(response)
}, function (err) {
console.log('ERROR!!', err);
})
}, function (err) {
console.log('ERROR!!', err);
})
이렇게 중첩할 경우

예를들어 delay가 3초이면

success가 response로 들어가고,

it worked!!!
Here is your fake data from books.com/page1
가 나온뒤 다시 함수로 돌아가 delay가 결정되는데 이 때 delay가 4000보다 작으면

it worked!!!
Here is your fake data from books.com/page2
가 나오고 4000보다 크면

ERROR!! Connection Timeout :(
가 나온다.

​

fakeRequestCallback('books.com/page1',
function (response) {
console.log('it worked!!!');
console.log(response)
fakeRequestCallback('books.com/page2',
function (response) {
console.log('it worked again!!!');
console.log(response)
fakeRequestCallback('books.com/page3',
function (response) {
console.log('it worked again (3rd req)!!!');
console.log(response)
},
function (err) {
console.log('ERROR!! (2nd req)', err)
})
}, function (err) {
console.log('ERROR!!', err);
})
}, function (err) {
console.log('ERROR!!', err);
})
이게 바로 콜백지옥이다..

실패가 뜨면 바로 끝나버리고, 성공이 뜨면 계속 이어진다.

​

요청을 보내고 성공과 실패의 콜백을 받는다.
