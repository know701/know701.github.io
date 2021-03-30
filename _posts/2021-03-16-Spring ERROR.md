---
date: 2021-03-16
title: "Spring error"
categories: spring error
# 목차
toc: true  
toc_sticky: true
---

# 스프링 관련 발생 에러 및 해결방법

## Setting 
1. Description Resource Path Location Type An error occurred while filtering resources ex00 line 1 Maven Java EE Configuration Problem
  - 해결방법 : Maven > update Project > 해당 프로젝트 선택 하여 메이븐 업데이트하니 에러 해결되었음.


2. class 에서 Log4j 사용 시 org.apache.log4j.Logger cannot be resolved to a type 에러 발생
- 해결방법
  ```java
  <dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.15</version>
    <exclusions>
      <exclusion>
        <groupId>javax.mail</groupId>
        <artifactId>mail</artifactId>
      </exclusion>
      <exclusion>
        <groupId>javax.jms</groupId>
        <artifactId>jms</artifactId>
      </exclusion>
      <exclusion>
        <groupId>com.sun.jdmk</groupId>
        <artifactId>jmxtools</artifactId>
      </exclusion>
      <exclusion>
        <groupId>com.sun.jmx</groupId>
        <artifactId>jmxri</artifactId>
      </exclusion>
    </exclusions>
  <!--<scope>runtime</scope> -->
  </dependency>
  ```
  - scope 값 주석 후 에러 해결되었음.


3. log4j.xml 파일에서 log4j.dtd 파일을 찾을수 없다는 에러 발생
- 해결 방법
 - `<!DOCTYPE log4j:configuration PUBLIC "-//LOGGER" "log4j.dtd">` 에서
 - `<!DOCTYPE log4j:configuration SYSTEM "http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/xml/doc-files/log4j.dtd">` 으로 변경 시 에러 해결


4. 유효한 문자들은 RFC 7230과 RFC 3986에 정의되어 있습니다.
- 파라미터 값으로 리스트값 처리 시 대괄호([])가 있어 발생하는 문제

```java
//server.xml  `relaxedQueryChars="[,]"`  추가
 <Connector connectionTimeout="20000" port="8008" protocol="HTTP/1.1" redirectPort="8443" relaxedQueryChars="[,]"/>
```

## Annotation
1. The annotation @RequestMapping is disallowed for this location
  - 어노테이션의 선언 위치가 잘못되어 발생한 문제
    - 어노테이션의 위치를 변경해 해결


## Junit
* java.io.FileNotFoundException: \src\main\webapp\WEB-INF\spring\root-context.xml (지정된 경로를 찾을 수 없습니다) 경로에러 발생함.
  - @ContextConfiguration("file:/src/main/webapp/WEB-INF/spring/root-context.xml") 파일 지정 시 src 앞 슬래쉬로 인한 에러
  - @ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml") 와 같이 에러 해결하였음.

- Method con() should be public / initializationError
  - Test의 값을 private 로 설정해둬 클래스내에서만 사용가능하게 설정해서 발생한 에러
  - public void con() {} 으로 변경 후 테스트 시 정상작동 확인함.



