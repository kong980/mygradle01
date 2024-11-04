// 객체 리터럴 패턴을 활용한 app 객체
const app = {
    // 내부 전역 변수
    data: {
        items: [] // 서버에서 가져온 Home 목록
    },

    // 초기화 함수
    init: function () {
        this.bindEvents(); // 이벤트 바인딩
        this.loadItems(); // 초기 데이터 로드
        // this.render(); // AJAX 요청을 통해 데이터를 비동기적으로 가져오기 때문에 사용하지 X
    },

    // 이벤트 바인딩
    bindEvents: function () {
        /*
        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', this.addItem.bind(this)); // 버튼 클릭 시 항목 추가
         */

        // jquery로 변환
        // $('#addButton').on('click', this.addItem.bind(this));
        $('#addButton').click(this.addItem.bind(this)); // 버튼 클릭 시 항목 추가
    },

    // 서버에서 아이템 목록을 가져오는 AJAX 요청
    loadItems: function () {
        $.ajax({
            url: '/home', // 서버 API 경로
            method: 'GET',
            success: (data) => {
                // 데이터가 배열인지 확인
                if (Array.isArray(data)) {
                    this.data.items = data; // 서버에서 받은 데이터를 items에 저장
                    this.render(); // 목록 렌더링
                } else {
                    console.error('받은 데이터가 배열이 아닙니다 : ', data);
                }
            },
            error: (error) => {
                console.error('데이터를 가져오는 데 실패했습니다.', error);
            }
        });
    },

    // 항목 추가
    addItem: function () {
        /*
        const inputField = document.getElementById('itemInput');
        const newItem = inputField.value.trim(); // 입력값 가져오기
         */

        const newItem = $('#itemInput').val().trim(); // 입력값 가져오기

        if (newItem) {
            // 새로운 아이템을 추가하는 로직
            const newHome = {
                item: newItem,
                deleted: 'N',
                createDate: new Date().toISOString() // 현재 타임스탬프로 설정
            };

            // 서버에 새로운 항목 추가 요청
            $.ajax({
                url: '/home', // 데이터 추가를 위한 API 경로
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newHome), // JSON 문자열로 반환
                success: (response) => {
                    this.data.items.push(response); // 서버에서 반환된 새 항목을 추가
                    $('#itemInput').val(''); // 입력 필드 초기화
                    this.render(); // 변경된 목록 렌더링
                },
                error: (error) => {
                    console.error('항목 추가에 실패했습니다.', 'error');
                }
            });
        } else {
            alert('항목을 입력하세요!'); // 입력이 비어있을 경우 경고
        }
    },

    // 목록 렌더링
    render: function () {
        /*
        const listContainer = document.getElementById('itemList');
        listContainer.innerHTML = ''; // 이전 목록 초기화
        */

        $('#itemList').html(''); // 이전 목록 초기화

        // items 배열을 기반으로 목록 생성
        this.data.items.forEach(item => {
            /*
            const li = document.createElement('li');
            li.textContent = item; // 항목 텍스트 설정
            listContainer.appendChild(li); // 목록에 항목 추가
             */

            const $li = $('<li>').text(item.item); // Home에서 item 필드를 가져와서 표시
            $('#itemList').append($li); // 목록에 항목 추가
        });
    }
};

// 문서가 로드되면 앱 초기화
/*
document.addEventListener('DOMContentLoaded', function() {
    app.init();
 */

$(document).ready(function () {
    app.init();
});
