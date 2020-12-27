---
date: 2020-12-19
title: "Oracle sql error"
categories: oracle sql
# 목차
toc: true  
toc_sticky: true 
---
# ERROR
- ORA - 01950 : 테이블 스페이스에 대한 권한이 없어 발생하는 문제
  - 해결방법
    ```
    -- 모든 유저 조회
    SELECT * FROM ALL_USERS;

    -- 해당하는 유저에게 default tablespace 에 대한 권한 부여
    alter user 유저명 default tablespace 테이블스페이스명 quota unlimited on users;
    
    -- 해당 유저에게 tablespace 권한 부여
    alter user 유저명 quota unlimited on 테이블스페이스명;
    ```
  
- ORA-00947: not enough values
  - 데이터 추가 시 지정한 VALUES 값을 모두 적지 않아 발생하는 문제
  - 해결방법
  ```
  INSERT INTO '테이블명(컬럼명)' VALUES(지정한 컬럼의 값);
  ```