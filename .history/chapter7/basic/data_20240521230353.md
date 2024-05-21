자바스크립트로 HTML Data 속성 다루기

1. Data 속성 이해하기
   HTML5에서는 data-로 시작하는 사용자 정의 속성을 만들 수 있습니다. 예를 들어, 다음과 같이 사용할 수 있습니다:

<div id="myDiv" data-user-id="12345" data-role="admin"></div>
위의 예제에서 data-user-id와 data-role은 모두 사용자 정의 데이터 속성입니다. 이제 자바스크립트를 사용하여 이 데이터 속성에 접근하고 조작하는 방법을 알아보겠습니다.

2. Data 속성 읽기
   자바스크립트에서는 dataset 객체를 사용하여 data 속성에 접근할 수 있습니다. 다음 예제를 보세요:

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Data 속성 읽기</title>
</head>
<body>
    <div id="myDiv" data-user-id="12345" data-role="admin"></div>
 
    <script>
        const myDiv = document.getElementById('myDiv');
        const userId = myDiv.dataset.userId; // "12345"
        const role = myDiv.dataset.role; // "admin"
 
        console.log(`User ID: ${userId}`);
        console.log(`Role: ${role}`);
    </script>
</body>
</html>
위 코드에서 dataset.userId와 dataset.role을 사용하여 data-user-id와 data-role 속성에 접근했습니다. 자바스크립트는 data- 이후의 속성명을 camelCase로 변환하여 dataset 객체의 속성으로 만듭니다.

3. Data 속성 쓰기
   data 속성에 새로운 값을 설정하는 것도 매우 간단합니다. dataset 객체를 사용하여 값을 할당하면 됩니다:

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Data 속성 쓰기</title>
</head>
<body>
    <div id="myDiv" data-user-id="12345" data-role="admin"></div>
 
    <script>
        const myDiv = document.getElementById('myDiv');
        myDiv.dataset.userId = '67890';
        myDiv.dataset.role = 'user';
 
        console.log(`New User ID: ${myDiv.dataset.userId}`);
        console.log(`New Role: ${myDiv.dataset.role}`);
    </script>
</body>
</html>
위 코드에서는 dataset.userId와 dataset.role에 새로운 값을 할당하여 data 속성을 업데이트했습니다. 이제 콘솔에 출력되는 값을 확인해보세요.

4. Data 속성 삭제
   data 속성을 삭제하려면 removeAttribute 메서드를 사용하면 됩니다:

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Data 속성 삭제</title>
</head>
<body>
    <div id="myDiv" data-user-id="12345" data-role="admin"></div>
 
    <script>
        const myDiv = document.getElementById('myDiv');
        myDiv.removeAttribute('data-user-id');
 
        console.log(myDiv.dataset.userId); // undefined
    </script>
</body>
</html>
위 코드에서는 data-user-id 속성을 삭제하여 더 이상 해당 속성에 접근할 수 없도록 했습니다.

5. 결론
   이제 자바스크립트를 사용하여 HTML data 속성을 읽고, 쓰고, 삭제하는 방법을 알게 되었습니다. data 속성은 HTML 요소에 추가적인 정보를 저장할 수 있는 매우 유용한 방법입니다. 이를 활용하여 웹 페이지를 더욱 동적으로 만들 수 있습니다.
