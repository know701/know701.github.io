---
date: 2021-03-15
title: "Spring Setting"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

# Spring Eclipse 환경설정
- 이클립스 설치된 폴더 내의 ini 파일 수정해야함.

```java
-vm
C:\dev\java-1.8.0-openjdk-1.8.0.265-1.b01.ojdkbuild.windows.x86_64\bin\javaw.exe //추가
```
- workspace 인코딩 설정
  - 운영체제에 따라 문자열 인코딩 방식을 다르게 지원함. utf-8 설정하여 에러를 방지
  - Window > Preferences > Workspace > 인코딩 utf-8 설정
    - web > css, html, jsp utf-8 설정

- 이클립스로 스프링 개발 시 스프링 플러그인 설치해야함.
  - help > eclipse marketplace > sts 설치

- tomcat 서버 설정
  - Tomcat 사용 시 항상 http://tomcat.apache.org/whichversion.html 문서 참조 해 자신의 환경에 맞는 버전을 이용해야함.
  - 설치 후 Window > Preferences > Server > Runtime Environments > 서버 생성


## Spring 프로젝트 생성
- 프로젝트 구조
  - Java Resources
    - src/main/java > 작성되는 코드의 경로
    - src/main/resources > 실행 시 참고하는 기본 경로(주로 설정 파일들을 넣어둠)
    - src/test/java > 테스트 코드의 경로
    - src/test/resources > 테스트 관련 설정 파일 보관 경로
  - src > main > webapp > spring
    - appServlet > servlet-context.xml > 웹과 관련된 스프링 설정 파일
    - root-context.xml > 스프링 설정 파일
  - src > main > webapp > view 
    - web.xml > Tomcat 의 web.xml 파일
  - src > target > pom.xml > Maven 이 사용하는 pom.xml
  
* 스프링과 관련된 버전은 maven spring 으로 검색해 Maven Repository 의 스프링 링크를 찾아 사용 (https://mvnrepository.com/artifact/org.springframework/spring-core)

- 버전 수정 시 pom.xml 파일에서 수정
  - 수정 완료 시 Maven Dependencies 에서 라이브러리가 변경되었는지 확인할것.
  

## 흔하게 발생하는 문제들
- pom.xml 의 문제
> 해당 라이브러리를 다운로드를 받지못할때 생기는 문제인 경우가 많음. Maven 으로 다운로드 되는 파일들은 '사용자 이름' 폴더 내 '.m2' 폴더에 모임. 따라서 이클립스 종료 후 '.m2' 폴더 내의 모든내용 삭제 후 재실행 시 프로젝트의 유효성을 점검하기때문에 Maven 으로 다시 관련 라이브러리를 다운로드함.

- Tomcat 실행 시 'invalid loc header(bad signature)'
> 라이브러리 관련 문제임. Tomcat 쪽 라이브러리가 처리되지 않아 생기는 문제임. 위의 방식으로 해결되는 경우가 대부분이고, Maven 을 강제로 업데이트 시킬수도 있음.

## Lombok 라이브러리 설치
> Lombok 이용 시 자주 사용되는 생성자 등을 자동으로 생성해 주므로, 약간의 코드만으로도 필요한 클래스를 설계할 때 유용함.

- https://projectlombok.org 에서 다운로드 가능함. 


## Java Configuration 을 하는 경우
- Spring Legacy Project 의 경우 XML 기반으로 스프링 관련 설정을 하도록 되어잇으나, 스프링 3버전 이후에는 JAVA 클래스 파일을 이용하는 설정을 지원함.

- java Configuration 시 설정방법
  
  - web.xml파일 삭제 스프링 관련 파일 삭제
    - WEB-INF 하위 spring 폴더 삭제
    - web.xml 파일 삭제
  
  - pom.xml 수정 및 스프링 버전 변경
    ```java
    <properties>
        <java-version>1.8</java-version>
        <org.springframework-version>5.0.7.RELEASE</org.springframework-version>
        <org.aspectj-version>1.6.10</org.aspectj-version>
        <org.slf4j-version>1.6.6</org.slf4j-version>
    </properties>
    // spring 버전 5.0.7 으로 수정

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.5.1</version>
        <configuration>
            <source>1.8</source>
            <target>1.8</target>
            <compilerArgument>-Xlint:all</compilerArgument>
            <showWarnings>true</showWarnings>
            <showDeprecation>true</showDeprecation>
        </configuration>
    </plugin>
    // 1.8로 수정

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
            <failOnMissingWebXml>false</failOnMissingWebXml>
        </configuration>
    </plugin>
    // 해당 플러그인 추가
    ```
    - 이후 maven update 진행 **자바, spring 버전 변경 확인**

  - Java 설정 관련 패키지 생성
    - @Configuration
    >Java 설정을 이용하는 경우엔 Xml 대신 설정파일을 직접 작성해야함. 스프링은 **@Configuration 어노테이션을 이용해 해당 클래스의 인스턴스를 이용해 설정 파일을 대신함.** xml 의 역할을 대신할 클래스를 작성해서 처리함.
    
    ```java
    //RootConfig.java
    @Configuration
        public class RootConfig {
    }
    ```

    ```java
    //webConfig.java
    public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

        @Override
        protected Class<?>[] getRootConfigClasses() {
            return new Class[] {RootConfig.class};
            // RootCofig 를 사용
        }

        @Override
        protected Class<?>[] getServletConfigClasses() {
            return null;
        }

        @Override
        protected String[] getServletMappings() {
            return null;
        }
    }
    ```


