# React Diary App (QA Portfolio Project)

## 📌 프로젝트 개요

React를 활용해 CRUD 기능을 갖춘 일기장 웹 애플리케이션입니다.  
본 프로젝트는 **기능 구현 자체보다 QA 관점에서의 테스트, 버그 분석, 재현 과정 정리**에 초점을 두고 진행되었습니다.

---

## 🛠 기술 스택

- React (Vite)
- React Router
- Context API / useReducer
- JavaScript (ES6)
- CSS

---

## ✨ 주요 기능

- 일기 작성 / 수정 / 삭제 (CRUD)
- 날짜 기반 일기 관리
- 감정 선택 기능
- 페이지 라우팅
  - Home
  - New
  - Diary
  - Edit
  - NotFound

---

## 🔍 QA 관점 테스트 포인트

### 1. 라우팅 관련

- 존재하지 않는 ID로 접근 시 처리 여부
- 새로고침 시 상태 유지 여부
- 뒤로가기 / replace 옵션 동작 확인

### 2. 상태 관리

- Context 상태 변경 시 렌더링 정상 여부
- 삭제 후 잘못된 데이터 접근 방지
- id 타입(string / number) 불일치로 인한 오류 가능성

### 3. UX / 예외 처리

- 잘못된 접근 시 alert 노출
- 삭제 확인(confirm) UX
- 빈 데이터 상태에서 화면 표시 여부

---

## 🐞 실제 발생했던 버그 사례

### 🔴 버그 1: 수정 페이지 접근 시 "존재하지 않는 일기입니다" alert 발생

**재현 조건**

1. Home → Diary → 수정하기 버튼 클릭
2. 즉시 alert 발생 후 메인 페이지로 이동

**원인**

- URL param의 id는 string
- 상태 데이터의 id는 number
- strict equality 비교(`===`)로 인해 매칭 실패

**해결**

```js
item.id === Number(params.id);
```
