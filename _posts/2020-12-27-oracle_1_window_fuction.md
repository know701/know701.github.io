---
date: 2020-12-27
title: "Oracle sql Function"
categories: oracle sql
# 목차
toc: true  
toc_sticky: true 
---
### Function
#### 문자열 함수

용도 | 사용
문자열 추출함수 | SUBSTR(문자열, 시작위치, 길이)
문자열 덧셈함수 | CONCAT(더할 문자열,더할 문자열)
문자열 트림 함수 | TRIM(공백을 제거할 문자열)
문자열 소문자 또는 대문자( UPPER() )로 변경 | LOWER() or UPPER()
문자열 대치 함수 | REPLACE(문자열, 찾는 문자열, 대치할 문자열),TRANSLATE(문자열, 바뀔문자열, 바꿀문자열)
문자열 패딩 함수 | L,RPAD(문자열,문자열길이(BYTE 단위), 남은길이에 채울 문자),
첫글자를 대문자로 바꾸는 함수 | INITCAP(문자열)
문자열 검색 함수 | INSTR(문자열, 검색문자열, 위치, 찾을 수)
문자열 길이를 얻는 함수 | LENGTH()

  ```
  SELECT SUBSTR('HELLO', 1,3) FROM DUAL
  SELECT CONCAT('홍', '길동') FROM DUAL
  SELECT TRIM('   #   ') FROM DUAL
  SELECT * FROM MEMBER WHERE UPPER(ID) = UPPER('NEWID')
  SELECT RPAD(NAME,6,'_') FROM MEMBER;
  SELECT INITCAP('the important')FROM DUAL;
  SELECT INSTR('ALL WE NEED TO JUST IS TO', 'TO', 1, 2) FROM DUAL;
  SELECT LENGTH('HI') FROM DUAL;
  ```

#### 숫자열 함수

용도 | 사용
절대값(양수)을 구하는 함수 | ABS(n)
음수/양수를 알려주는 함수 | SIGN(n)
숫자의 반올림값을 알려주는 함수 | ROUND(n,반올림 위치)
숫자의 나머지값을 반환하는 함수 | MOD(n1,n2)
숫자의 소숫점을 절삭 <br>날짜형식의 날짜,시간 이후의 값을 절삭 | TRUNC(숫자, 소숫점 절삭 위치) <br>TRUNC(날짜, 절삭위치)
숫자의 제곱을 구하는 함수<BR> 제곱근을 구하는 함수 | POWER(n1,n2)<BR> SQRT(25)

  ```
  SELECT ABS(-3),ABS(3) FROM DUAL;
  SELECT SIGN(35),SIGN(-35),SIGN(0)FROM DUAL;
  SELECT ROUND(34.4123 , 2), ROUND(34.5) FROM DUAL;
  SELECT TRUNC(TO_DATE('20201227041010','YYYYMMDDHH24MISS')) FROM DUAL;
  SELECT POWER(3,2), SQRT(9) FROM DUAL;
  ```

#### 날짜 함수

용도 | 사용
현재 시간을 얻는 함수<BR> | SYSDATE<BR>CURRENT_DATE<BR>SYSTIMESTAMP<BR>SURRENT_TIMESTAMP
날짜 추출 함수 | EXTRACT(YEAR/MONTH/DAY/HOUR/MINUTE/SECOND FROM SYSDATE)
날짜를 누적하는 함수 | ADD_MONTH(날짜,정수)
날짜의 차이를 알아내는 함수 | MONTHS_BETWEEN(날짜, 날짜)
다음 요일을 알려주는 함수 | NEXT_DAY(현재날짜, 다음요일)
월의 마지막 일자를 알려주는 함수 | LAST_DAY(날짜)

  ```
  SELECT SYSDATE, CURRENT_DATE, SYSTIMESTAMP, CURRENT_TIMESTAMP FROM DUAL;
  SELECT EXTRACT(MONTH FROM SYSDATE) FROM DUAL;
  SELECT ADD_MONTHS(SYSDATE, -1) FROM DUAL;
  
  SELECT TRUNC(MONTHS_BETWEEN
       (SYSDATE,
        TO_DATE('01-01-2020','MM-DD-YYYY') ) ) "Months"
  FROM DUAL;
  SELECT NEXT_DAY(SYSDATE,'일') FROM DUAL;
  SELECT LAST_DAY(SYSDATE) FROM DUAL;
  ```

#### 변환 함수

용도 | 사용
숫자를 문자로 바꾸는 함수<BR> 날짜를 문자열로 바꾸는 함수 | TO_CHAR(NUMBER)
문자열을 날짜로 바꾸는 함수 | TO_DATE()
문자열을 숫자로 바꾸는 함수 | TO_NUMBER()

  ```
  -- '$' 는 앞에 $ 표시, ',' 는 천단위 구분자 표시, '.' 소수점 표시, '0' 빈자리를 채우는 문자
  SELECT TO_CHAR(12345, '$09,999,999,999.99') FROM DUAL;
  ```

#### NULL 관련 함수
용도 | 사용
반환 값이 NULL 일 경우에 대체 값을 제공하는 함수 |  NVL(NULL, 대체값) 
NVL 에서 조건을 하나 더 확장한 함수 | NV2(NULL, NULL 이 아닌경우 연산, 대체값)
두값이 같은경우 NULL 그렇지않은경우 첫번째 값 반환 함수 | NULLIF(값1,값2)
조건에 따른 값 선택 | DECODE(기준값, 비교값, 출력값, 비교값, 출력값, 기본값)

  ```
  SELECT TRUNC(NVL(AGE, 0)/10)*10 FROM MEMBER;
  SELECT NVL2(AGE, TRUNC(AGE/10)*10,0) FROM MEMBER;
  SELECT NAME, NULLIF(AGE, 20) FROM MEMBER;
  SELECT DECODE(SUBSTR(NAME, 2,1), '길', NAME, '이', NAME, '그외') FROM MEMBER;
  ```

# window function
- 행과 행간의 관계를 쉽게 정의하기 위해 만든함수
- 분석(ANALYTIC), 순위(RANK)함수라고 불림
- 중첩해서는 사용이 불가능하나 서브쿼리에서 사용 가능

## WINDOW FUNCTION 구조
  ```
  SELECT WINDOW_FUNCTION(ARGS) 
    OVER([PARTITION BY 컬럼명][ORDER BY 절][WINDOWING 절])
    FROM 테이블명;
  ```
  - WINDOW_FUNCTION : 함수명(SUM,MAX,MIN)
  - ARGS : 0~N개의 인자를 전달
  - OVER : 분석함수임을 표시(필수)
  - PARTITION : 대상을 그룹화할 기준
  - ORDER BY : 그룹에 대한 정렬 기준
  - WINDOWING 절 : 대상 행을 설정


## 순위 함수

용도 | 사용
동일한 값에 대해 같은 순위 부여 | ROW_NUMBER() OVER(ORDER BY 컬럼)
동일한 값에 대해 같은 순위 부여, 동일한 순위를 하나의 건수로 취급 | RANK() OVER(ORDER BY 컬럼)
동일한 값에 대해 다른순위 부여, 동일한 순위를 하나의 건수로 취급 | DENSE_RANK() OVER(`[PARTITION BY 컬럼명] [ORDER BY 컬럼]`)

  ```
  SELECT ROW_NUMBER() OVER(ORDER BY AGE) 나이순, M.* FROM MEMBER M;
  SELECT RANK() OVER(ORDER BY AGE) 나이순, M.* FROM MEMBER M;
  SELECT DENSE_RANK() OVER(ORDER BY AGE) 나이순, M.* FROM MEMBER M;
  SELECT DENSE_RANK() OVER(PARTITION BY NAME ORDER BY AGE) 나이순, M.* FROM MEMBER M;
  ```

## 집계 함수

파티션별 윈도우의 합 | SUM()
INLINE VIEW 로 파티션별 최대값을 가진 행 추출 | MAX()
INLINE VIEW 로 파티션별 최소값을 가진 행 추출 | MIN()
파티션별 ROWS 윈도우를 통해 평균값을 구함 | AVG()
TRUE 값의 개수 구함 | COUNT()

  ```
  SELECT SUM(AGE) OVER(PARTITION BY AGE) FROM MEMBER;
  SELECT MAX(AGE) OVER() FROM MEMBER;
  SELECT MIN(AGE) OVER() FROM MEMBER;
  SELECT AVG(AGE) OVER() FROM MEMBER;
  SELECT COUNT(AGE) OVER() FROM MEMBER;
  ```

## 순서 함수

가장 먼저나온값 출력,공동등수 인정 X,처음나온 행만 처리 | FIRST_VALUE()
가장 나중에 나온 값 출력 | LAST_VALUE ()
이전 몇번째 행까지의 값을 가져올 수 있음 | LAG()
이후 몇번째 행의 값을 가져옴 | LEAD()

  ```
  SELECT FIRST_VALUE(AGE) OVER(PARTITION BY NAME) FROM MEMBER;
  SELECT M.* ,LAST_VALUE(AGE) OVER(PARTITION BY NAME) FROM MEMBER M;
  SELECT LAG(AGE) OVER(ORDER BY AGE) FROM MEMBER M;
  SELECT LEAD(AGE) OVER(ORDER BY AGE) FROM MEMBER;
  ```

## 그룹 내 비율 함수

SUM() 에 대한 행별 컬럼값의 백분율을 소수점으로 구함 | RATIO_TO_REPORT()
값이 아닌 행의 순서별 백분율을 구함 | PERCENT_RANK()
전체건수에서 현재 행보다 작거나 같은 거수에 대한 누적백분율을 구함 | CUME_DIST()
파티션 별 전체 건수를 ARGUMENT 값으로 N 등분한 결과를 구함 | NTILE()

  ```
  SELECT RATIO_TO_REPORT(AGE) OVER() FROM MEMBER;
  SELECT PERCENT_RANK() OVER(ORDER BY AGE) FROM MEMBER;
  SELECT CUME_DIST() OVER(ORDER BY AGE) FROM MEMBER;
  SELECT NTILE(3) OVER(ORDER BY AGE) FROM MEMBER;
  ```