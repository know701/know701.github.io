---
date: 2021-01-04
title: "oracle/tomcat port change"
categories: java 
# 목차
toc: true  
toc_sticky: true 
---

# port
- tomcat 과 oracle 동시 사용 시 포트 충돌로 인해 포트번호 변경

## ORACLE port change
1. DOS 화면 진입
2. oracle 진입 (sqlplus sys as sysdba 명령어 입력)
3. 비밀번호 입력 후 화면 진입
4. EXEC DBMS_XDB.SETHTTPPORT(변경할 포트번호);
5. 변경 후 확인을 위한 명령어 SELECT DBMS_XDB.GETHTTPPORT() FROM DUAL;
6. 변경확인

## TOMCAT port change
1. 톰캣 디렉토리
2. conf 폴더
3. server.xml 텍스트 에디터로 오픈
4. 파일의 중간정도에 `Connector` 부분에 있는 port 번호를 원하는 번호로 지정
5. 저장 후 사용