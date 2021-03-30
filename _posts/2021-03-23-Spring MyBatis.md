---
date: 2021-03-19
title: "Spring MyBatis 연동"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

# MyBatis
> myBatis 는 SQL 매핑 프레임워크로 분류

전통적인 JDBC 프로그램 | MYBatis
--- | ---
직접 Connection 을 맺고 마지막에 close() | 자동으로 Connection close() 가능
preparedstatement 직접 생성 및 처리 | mybatis 내부적으로 preparedstatement 처리
preparedstatement 의 set() 에 대한 모든 작업 개발자가 처리 | #{prop} 같이 속성 지정하면 내부적으로 자동처리
select 의 경우 resultSet 처리 | 리턴 타입 지정 시 자동으로 객체 생성 및 resultSet 처리

## 라이브러리 추가

```java
//pom.xml 에 추가
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis</artifactId>
	<version>3.4.6</version>
</dependency>
<dependency>
	<groupId>org.mybatis</groupId>
	<artifactId>mybatis-spring</artifactId>
	<version>1.3.2</version>
</dependency>
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-tx</artifactId>
	<version>${org.springframework-version}</version>
</dependency>
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jdbc</artifactId>
	<version>${org.springframework-version}</version>
</dependency>
```
- spring-jdbc/spring-tx : 스프링에서 데이터베이스 처리와 트랜잭션 처리
  - 해당 라이브러리들은 mybatis 와 무관하게 보이지만 추가하지않을경우 에러발생
- mybatis/mybatis-spring : mybatis 와 스프링 연동 라이브러리

## SQLSessionFactory
- SQLSessionFactory : SQLSession 이라는것을 만들어내는 존재
  - SQLSession 을 통해 Connection 을 생성, 원하는 SQL 을 전달, 결과 리턴받는 구조로 작성하게 됨.

```java
//root-context.xml bean 값 추가
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
	<property name="dataSource" ref="dataSource"></property>
</bean>
```
- SQLSessionFactoryBean 을 이용해 sqlSessionFactory 를 등록하는 작업을 함.

**자바 설정**

```java
@Bean
public SqlSessionFactory factory() throws Exception{
	SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
	factory.setDataSource(dataSource());
	return (SqlSessionFactory) factory.getObject();
}
```

- 연동 테스트

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
//	java 이용 시
// @ContextConfiguration(classes = {RootConfig.class})
@Log4j
public class DataSourceTests {
	
	@Setter(onMethod_ = {@Autowired})
	private DataSource dataSource;
	
	@Setter(onMethod_ = {@Autowired})
	private SqlSessionFactory factory;
	
	@Test
	public void testMybatis() {
		try (
		SqlSession session = factory.openSession();
		Connection con = session.getConnection();
		){
			log.info(factory);
			log.info(session);
			log.info(con);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
```

## 스프링과의 연동 처리
> SQL을 어떻게 처리할 것인지를 별도의 설정을 분리해주고, 자동으로 처리되는 방식으로 이용하는거싱 좋음. 이를 위해 MyBatis Mapper 라는 존재를 작성해줘야 함.
- Mapper : SQL 과 그에대한 처리를 지정하는 역할을 함.

**Mapper 인터페이스**

```java
//Mapper 작성
public interface TimeMapper {
	@Select("select sysdate from dual")
	public String getTime();
}
```
- Mapper 설정
  - root-context.xml > Namespaces > mybatis-spring 선택
  - 코드추가
  
  ```java
  <mybatis-spring:scan base-package="org.zerock.mapper"/>
  ```
- base-package 속성은 지정된 패키지의 모든 MyBatis 관련 어노테이션을 찾아 처리함.


**java 설정**
```java
// 설정파일 진입 후 어노테이션 추가
@MapperScan(basePackages = {"org.zerock.mapper"})
```

- 테스트 코드

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class TimeMapperTests {
	@Setter(onMethod_ = @Autowired)
	private TimeMapper timeMapper;
	
	@Test
	public void test() {
		log.info("log 시작-----" + timeMapper.getClass().getName());
		log.info(timeMapper.getTime());
	}
	
}
```

**XML 매퍼와 같이 쓰기**
> SQL 이 복잡하거나 길어지는 경우 어노테이션보다 XML 을 이용하는방식을 더 선호함. MyBatis-Spring 의 경우 Mapper 인터페이스와 XML을 동시에 사용 가능

- xml 파일의 위치
  - Mapper 인터페이스가 있는곳에 같이 작성
  - src/main/resources 구조에 xml 저장할 폴더를 생성 후 작성
  
```java
//TimeMapper.java
public interface TimeMapper {
	
	@Select("select sysdate from dual")
	public String getTime();

	public String getTime2();
}
// src/main/resources/org/zerock/mapper/TimeMapper.xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper 
	PUBLIC "-//mybatis.org//DTO Mapper 3.0//EN"
	"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.zerock.mapper.TimeMapper">
	
	<select id="getTime2" resultType="string">
	SELECT sysdate FROM dual
	</select>
	
</mapper>
```

- MyBatis 는 Mapper 인터페이스와 XML을 인터페이스의 이름과 namespace 속성값을 가지고 판단함.
  - org.zerock.mapper.TimeMapper 인터페이스가 존재하고 XML의 `<mapper namespace="org.zerock.mapper.TimeMapper">` 와 같이 동일한 이름이 존재하면 이를 병합해 처리함.
  - select 의 id 속성의 값은 메소드의 이름과 동일해야하며, resultType 이 값은 인터페이스에 선언된 메소드의 리턴타입과 동일하게 작성함.

## log4jdbc-log4j2 설정
- MyBatis 는 PreparedStatement 를 이용해 SQL 을 처리함.
  - ?로 나오는 값이 어떤값으로 처리되는지 확인하기위해 라이브러리를 사용함.

```java
//pom.xml
<!-- logjdbc-log4j2 설정 -->
<dependency>
	<groupId>org.bgee.log4jdbc-log4j2</groupId>
	<artifactId>log4jdbc-log4j2-jdbc4</artifactId>
	<version>1.16</version>
</dependency>
```
- 라이브러리 추가 후엔 로그 설정 파일을 추가하는작업과 JDBC 연결 정보를 수정해야 함.

```java
//properties 파일추가
log4jdbc.spylogdelegator.name=net.sf.log4jdbc.log.slf4j.Slf4jSpyLogDelegator

//root-context.xml 변경
<property name="driverClassName" value="net.sf.log4jdbc.sql.jdbcapi.DriverSpy"><property>
<property name="jdbcUrl" value="jdbc:log4jdbc:oracle:thin:@localhost:1521:xe"></property>
```

**java 이용 시**

```java
//RootConfig.java
	@Bean
	public DataSource dataSource() {
		HikariConfig config = new HikariConfig();
//		config.setDriverClassName("oracle.jdbc.driver.OracleDriver");
//		config.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:xe");
		config.setDriverClassName("net.sf.log4jdbc.sql.jdbcapi.DriverSpy");
		config.setJdbcUrl("jdbc:log4jdbc:oracle:thin:@localhost:1521:xe");
		config.setUsername("spring_user");
		config.setPassword("spring_user");
		
		HikariDataSource dataSource = new HikariDataSource(config);
		
		return dataSource;
	}
```
