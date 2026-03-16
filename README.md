# 📔 React Diary App (QA Portfolio Project)
> Focus: Testing, Bug Analysis, and Quality Assurance Documentation


##　プロジェクト概要
本プロジェクトは、Reactで開発した日記帳アプリケーションです。
単なる機能実装にとどまらず、QA（品質保証）の視点からテスト設計、バグ分析、再現手順のドキュメント化に注力して取り組みました。

### 本プロジェクトでのQA実績
1. ユーザーシナリオに基づくテスト: 実際の利用状況を想定したバグの再現と検証
2. 根本原因分析 (RCA): データ型の不一致など、技術的な要因の特定
3. バグレポートの作成: 開発者と円滑に連携するための標準的な報告書の作成
4. Gitによる履歴管理: 修正（Fix）コミットを通じた体系的な履歴管理

---

## 프로젝트 개요 (Project Overview)
React를 활용해 CRUD 기능을 갖춘 일기장 웹 애플리케이션입니다.  
단순한 기능 구현을 넘어 QA 관점에서의 테스트 설계, 버그 분석 및 재현 과정 문서화에 초점을 두고 진행되었습니다.

---

## QA Perspective & Core Strengths
이 프로젝트를 통해 다음과 같은 QA 역량을 실습했습니다
1. Scenario-based Testing: 사용자 시나리오 기반 버그 재현 및 검증
2. Root Cause Analysis (RCA): 데이터 타입 불일치 등 기술적 원인 분석
3. Professional Documentation: 개발자와의 원활한 소통을 위한 표준 버그 리포트 작성
4. Git History Management: 버그 수정(Fix) 커밋을 통한 체계적인 이력 관리

---

## 기술 스택 (Tech Stack)
- Frontend: React (Vite), React Router
- State Management: Context API, useReducer
- Language: JavaScript (ES6)
- Styling: CSS

---

## 주요 기능 (Key Features)
- CRUD: 일기 작성 / 수정 / 삭제 기능
- Filtering: 날짜 및 감정 기반 일기 관리/조회
- Routing: `react-router-dom`을 활용한 페이지 전환 (Home, New, Diary, Edit, NotFound)

---

## QA 관점 테스트 포인트 (Test Points)

### 1. 라우팅 (Routing)
- 존재하지 않는 ID로 접근 시 예외 처리 (NotFound 페이지 연결)
- 새로고침 시 데이터 유지 및 초기화 여부 확인
- 뒤로가기(Navigate) 옵션 동작의 무결성 검증

### 2. 상태 관리 (State Management)
- Context 상태 변경 시 리렌더링 정상 동작 여부
- 삭제된 데이터에 대한 접근 시나리오 차단
- 데이터 타입(String vs Number) 불일치로 인한 런타임 오류 가능성 체크

### 3. UX / 예외 처리 (Exception Handling)
- 부적절한 접근 시 사용자 Alert 제공
- 삭제 확인(Confirm) UX 적용
- 빈 데이터 상태에서의 레이아웃 대응

---

## QA Bug Report #1

### Bug Title
일기 수정 페이지에서 '작성 완료' 시 "존재하지 않는 일기입니다" 경고 발생

### Environment
- OS: Windows 11
- Browser: Chrome
- Framework: React (v18), React Router (v6)

### Steps to Reproduce (재현 절차)
1. 메인 페이지에서 기존 일기 항목을 선택합니다.
2. [수정하기] 버튼을 클릭하여 수정 페이지로 진입합니다.
3. 일기 내용을 수정하고 [작성 완료] 버튼을 누릅니다.
4. 확인 팝업에서 [확인]을 선택합니다.

### Actual Result (실제 결과)
- "존재하지 않는 일기입니다"라는 Alert 메시지가 발생합니다.
- 수정된 데이터가 저장되지 않고 유실됩니다.

### Root Cause Analysis (원인 분석)
- 타입 불일치(Type Mismatch): URL 파라미터(`params.id`)는 문자열(String) 타입이나, 상태 데이터의 `id`는 숫자(Number) 타입입니다.
- `Array.find()` 메서드 내에서 엄격한 비교(`===`)를 사용함에 따라 데이터를 찾지 못하는 오류가 발생했습니다.

```javascript
// ❌ Fix 전: 타입 불일치로 항상 false 반환
data.find((item) => item.id === params.id);
