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
        $('#addButton')
            .css('margin-right', '50px')
            .click(this.addItem.bind(this)); // 버튼 클릭 시 항목 추가

        $('#searchButton')
            .css('margin-right', '50px')
            .click(this.searchItem.bind(this)); // 버튼 클릭 시 항목 검색

        $('#processSearch').click(function (e) {
            e.preventDefault(); // 기본 제출 동작 방지
            this.searchProcess();
        }.bind(this));
    },

    // 서버에서 아이템 목록을 가져오는 AJAX 요청 (Read)
    loadItems: function () {
        $.ajax({
            url: '/home', // 서버 API 경로
            method: 'GET',
            dataType: 'json', // 서버 응답이 JSON임을 명시
            success: (data) => {
                // 데이터(homes)가 배열인지 확인
                if (Array.isArray(data)) {
                    this.data.items = data; // 서버에서 받은 데이터를 items에 저장
                    this.render(); // 목록 렌더링
                    $('#homeButton').hide(); // 목록으로 돌아가면 돌아가기 버튼을 숨김
                    $('#itemSearch').val(''); // 입력 필드 초기화
                } else {
                    console.error('받은 데이터가 배열이 아닙니다 : ', data);
                }
            }, error: (error) => {
                console.error('데이터를 가져오는 데 실패했습니다.', error);
            }
        });
    },

    // 항목 검색을 위한 AJAX 요청 함수
    searchAPI: function (params) {
        $.ajax({
            url: '/home/search?' + $.param(params), // 검색 요청을 보낼 url
            method: 'GET',
            success: (data) => {
                this.data.items = data; // 서버에서 받은 데이터로 업데이트
                this.render();
                this.toggleHomeButton();
            },
            error: (error) => {
                console.error('검색에 실패했습니다.', error);
            }
        });
    },

    // 전체 목록으로 돌아가기
    toggleHomeButton: function () {
        // 전체 목록으로 돌아가는 버튼 추가 (버튼이 존재하지 않을 때만)
        if ($('#homeButton').length === 0) {
            const $homeButton = $('<button id="homeButton">')
                .text('전체 목록으로 돌아가기')
                .on('click', () => {
                    this.loadItems(); // 전체 목록 로드
                    $('#homeButton').hide(); // 목록으로 돌아가면 돌아가기 버튼을 숨김
                })
            $('#lists').append($homeButton);
        } else {
            $('#homeButton').show(); // 버튼이 이미 존재하면 다시 보이게 함
        }
    },

    // 내용으로 검색 (Search)
    searchItem: function () {
        const searchText = $('#itemSearch').val().trim(); // 입력값 가져오기

        // 항목 검색
        if (searchText) {
            this.searchAPI({item: searchText});
        } else {
            alert('검색어를 입력해주세요'); // 검색어를 입력하지 않을 경우 경고
        }
    },

    // 진행 상태로 검색 (Search)
    searchProcess: function () {
        const searchProc = $('#proc').val(); // 진행 상태 가져오기

        // 항목 검색
        if (searchProc) {
            this.searchAPI({process: searchProc});
        } else {
            alert('검색에 실패하였습니다.'); // 검색에 실패하였을 경우
        }
    },

    // 항목 추가 (Create)
    addItem: function () {
        /*
        const inputField = document.getElementById('itemInput');
        const newItem = inputField.value.trim(); // 입력값 가져오기
         */

        const newItem = $('#itemInput').val().trim(); // 입력값 가져오기

        if (newItem) {
            // 새로운 아이템을 추가하는 로직
            const newHome = {
                item: newItem, deleted: 'N', createDate: new Date().toISOString(), process: 'ing' // 생성 날짜는 현재 타임스탬프로, 진행 상태는 'ing'(진행중)으로 설정
            };

            // 서버에 새로운 항목 추가 요청
            $.ajax({
                url: '/home', // 데이터 추가를 위한 API 경로
                method: 'POST', contentType: 'application/json', data: JSON.stringify(newHome), // JSON 문자열로 반환
                success: (response) => {
                    this.data.items.push(response); // 서버에서 반환된 새 항목을 추가
                    $('#itemInput').val(''); // 입력 필드 초기화
                    this.loadItems(); // 변경된 목록 렌더링

                }, error: (error) => {
                    console.error('항목 추가에 실패했습니다.', 'error');
                }
            });

        } else {
            alert('추가할 내용을 입력해주세요.'); // 입력이 비어있을 경우 경고
        }
    },

    // 항목 수정 (Update)
    updateItem: function (id) {
        // 기존 텍스트와 진행 상태를 가져오기
        const currentText = this.data.items.find(item => item.id === id).item;
        const currentProcess = this.data.items.find(item => item.id === id).process;

        // 입력 박스 생성
        const $input = $('<input>')
            .val(currentText) // 현재 텍스트를 입력 박스에 설정
            .attr('id', 'edit-input-' + id) // 입력 박스에 고유 ID 설정
            .css('margin-right', '10px') // 오른쪽 여백 추가

        // 진행 상태 변경
        const $select = $('<select>')
            .css('margin-right', '10px') // 오른쪽 여백 추가

        // 옵션 추가
        const options = [
            {text: '진행중', value: 'ing'},
            {text: '완료', value: 'success'},
            {text: '미완료', value: 'fail'}
        ];

        // 현재 상태에 따라 selected 속성 추가
        options.forEach(option => {
            const $option = $('<option>')
                .text(option.text)
                .val(option.value);
            if (option.value === currentProcess) {
                $option.attr('selected', 'selected') // 현재 상태를 선택된 옵션으로 설정
            }
            $select.append($option); // select에 옵션 추가
        })

        // 저장 버튼 생성
        const $saveButton = $('<button>')
            .text('저장') // 버튼 텍스트를 '저장'으로 설정
            .on('click', () => {
                const newItemText = $input.val() // 입력 박스에서 새 텍스트 가져오기
                const newProcess = $select.val(); // 선택된 진행 상태 가져오기
                if (newItemText === currentText && newProcess === currentProcess) {
                    alert('기존의 내용과 동일합니다.');
                } else {
                    this.performUpdate(id, newItemText, newProcess); // 새로운 상태로 업데이트 수행
                }
            });

        // 항목을 수정할 수 있는 UI로 변경
        const $listItem = $('#item' + id); // 항목을 찾기 위한 선택자
        $listItem.empty(); // 기존 내용 제거
        $listItem.append($input, $select, $saveButton); // 입력 박스, select, 저장 버튼 추가
    },

    // 업데이트 내용을 서버에 요청 (Update)
    performUpdate: function (id, newItemText, newProcess) {
        if (newItemText || newProcess) {
            // 서버에 수정 요청 보내기
            $.ajax({
                url: '/home/update/' + id, // 수정할 항목의 경로
                method: 'PUT', // HTTP PUT 메서드 사용
                contentType: 'application/json', // 전송할 데이터의 형식
                data: JSON.stringify({item: newItemText, process: newProcess}), // 수정할 데이터
                success: () => {
                    // 수정 성공 후 목록 다시 로드
                    this.loadItems();
                }, error: (error) => {
                    console.error('항목 수정에 실패했습니다.', error);
                }
            });
        } else {
            alert("수정할 항목의 텍스트를 입력해주세요.") // 텍스트가 비어있을 경우 경고
        }
    },

    // 항목 삭제 (Delete)
    deleteItem: function (id) {
        // 서버에 Delete 요청
        $.ajax({
            url: '/home/delete/' + id,
            method: 'PUT',
            success: () => {
                alert('삭제가 완료 되었습니다.');
                // 삭제 성공 후 다시 목록을 로드
                this.loadItems(); // 필요에 따라 목록을 새로 고침
            },
            error: (error) => {
                console.error('항목 삭제에 실패했습니다.', error);
            }
        });
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

            const $li = $('<li>')
                .attr('id', 'item' + item.id) // <li>에 id 설정
                .css({
                    display: 'flex', // Flexbox 사용
                    alignItems: 'center', // 세로 중앙 정렬
                    margin: '10px 0', // 위아래 간격 추가 (옵션)
                })

            // 리스트 마크 추가
            const $marker = $('<span>')
                .html('&#10004;')
                .css({
                    marginRight: '10px', // 오른쪽 여백 추가
                });

            // 텍스트를 감싸는 <span> 추가
            const $textSpan = $('<span>')
                .text(item.item) // Home에서 item 필드를 가져와서 표시
                .css({
                    width: '135px', // 원하는 너비 설정
                    whiteSpace: 'nowrap', // 줄 바꿈 방지
                    overflow: 'hidden', // 넘치는 텍스트 숨기기
                    textOverflow: 'ellipsis' // 넘치는 텍스트를 '...'로 표시
                });

            // 진행 상태
            const $processBox = $('<select>')
                .attr('disabled', true)
                .css({
                    marginRight: '30px',
                    width: '80px'
                });

            // process 상태에 따라 옵션 추가
            if (item.process === 'ing') {
                $processBox.append($('<option>').text('진행중').val('ing'));
            } else if (item.process === 'success') {
                $processBox.append($('<option>').text('완료').val('success'));
            } else {
                $processBox.append($('<option>').text('미완료').val('fail'));
            }

            // 수정 버튼
            const $updateButton = $('<button>')
                .text('수정') // 버튼 텍스트 설정
                .attr('id', 'update' + item.id) // 모든 버튼에 upgrad ID 추가
                .css('margin-right', '10px') // 오른쪽 여백 추가
                .on('click', () => this.updateItem(item.id)); // 버튼 클릭 시 수정 함수 호출

            // 삭제 버튼
            const $deleteButton = $('<button>')
                .text('삭제') // 버튼 텍스트 설정
                .attr('id', 'delete' + item.id) // 모든 버튼에 delete ID 추가
                .on('click', () => this.deleteItem(item.id)); // 버튼 클릭 시 삭제 함수 호출

            // <li>에 item, 수정 버튼, 삭제 버튼 추가
            $li.append($marker).append($textSpan).append($processBox).append($updateButton).append($deleteButton);

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
