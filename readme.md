# 경품추첨을 위한 클리커 게임

## RULE
- 1분 = 00초 ~ 59.9999999초
- 1초간 4회 초과시 실격
- 4회 초과는 슬라이딩 윈도우로 판단
- 회원가입하지 않으면 참여 불가
- 첫 클릭으로부터 시작(참여)
- 첫 클릭으로부터 10초간 입력이 없다면 실격(종료)
- 실격한 회원 재참여 불가
- 우승자는 한명 클릭수가 같다면 시간(1마이크로 단위)으로 정렬

## RESTRICTIONS
- 클릭은 TCP
- 회원가입은 HTTP
- e2e(end to end)테스트, 유닛별 테스트 준비
- 요청은 클러스터 모드로 받기(멀티 프로세스)
- 우승자의 아이디,주소지,클릭횟수 출력
- 외부 소스 사용 금지
- DB는 내장 SQLite

## DB

### User
- int UserId(PK), int ID, string PassWord, string ADD, int ClickCount, int Disqualification

