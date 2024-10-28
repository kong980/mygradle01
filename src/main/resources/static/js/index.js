// 객체 리터럴 패턴을 활용한 app 객체
const app = {
    // 내부 전역 변수
    data: {
        items: [] // 사용자로부터 입력받은 항목들을 저장
    },

    // 초기화 함수
    init: function() {
        this.bindEvents(); // 이벤트 바인딩
        this.render(); // 초기 렌더링
    },

    // 이벤트 바인딩
    bindEvents: function() {
        const addButton = document.getElementById('addButton');
        addButton.addEventListener('click', this.addItem.bind(this)); // 버튼 클릭 시 항목 추가
    },

    // 항목 추가
    addItem: function() {
        const inputField = document.getElementById('itemInput');
        const newItem = inputField.value.trim(); // 입력값 가져오기

        if (newItem) {
            this.data.items.push(newItem); // 배열에 항목 추가
            inputField.value = ''; // 입력 필드 초기화
            this.render(); // 변경된 목록 렌더링
        } else {
            alert('항목을 입력하세요!'); // 입력이 비어있을 경우 경고
        }
    },

    // 목록 렌더링
    render: function() {
        const listContainer = document.getElementById('itemList');
        listContainer.innerHTML = ''; // 이전 목록 초기화

        this.data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item; // 항목 텍스트 설정
            listContainer.appendChild(li); // 목록에 항목 추가
        });
    }
};

// 문서가 로드되면 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    app.init();
});
