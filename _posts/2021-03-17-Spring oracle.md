---
date: 2021-03-17
title: "Spring 오라클 연동"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

# 오라클 연동 셋팅
- 오라클 계정 생성
- JDBC 연결 시 드라이버 필요 > 오라클 드라이버 11g 은 Maven을 지원하지 않음
  - Build Path > libraries > jdbc 드라이버 add
  - 이후 Web Deployment Assembly > 항목에도 jdbc 드라이버 add

- jDBC 테스트

```java
@Log4j
public class JDBCTests {
	static {
			try {
				Class.forName("oracle.jdbc.driver.OracleDriver");
			} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void test() {
		try (
			Connection con = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "spring_user", "spring_user")){
			log.info(con);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
// 성공 시 INFO : org.zerock.persistence.JDBCTests - oracle.jdbc.driver.T4CConnection@14bf9759
```

## 커넥션풀 설정
- HikariCP 라이브러리 사용

```java
//pom.xml 추가
<dependency>
    <groupId>com.zaxxer</groupId>
    <artifactId>HikariCP</artifactId>
    <version>2.7.4</version>
</dependency>
```

- 스프링에서 root-context 은 스프링이 로딩되면서 읽어들이는 문서
  - 주로 이미 만들어진 클래스들을 이용해 스프링의 빈으로 등록할때 사용
  - 외부 jar 파일 등으로 사용하는 클래스들은 bean 태그를 이용해 작성하는 경우가 대부분

```java
// root-context.xml 추가
<bean id="hikariConfig" class="com.zaxxer.hikari.HikariConfig">
    <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"></property>
    <property name="jdbcUrl" value="jdbc:oracle:thin:@localhost:1521:xe"></property>
    <property name="username" value="spring_user"></property>
    <property name="password" value="spring_user"></property>
</bean>

<bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource" destroy-method="close">
    <constructor-arg ref="hikariConfig" />	
</bean>
```

**Java 설정을 이용하는 경우**
- RootConfig 클래스와 @Bean 을 이용해 처리함.
  - @Bean 은 XML 에서 설정한 bean 태그와 동일한 역할을 함.

```java
@Configuration
@ComponentScan(basePackages = {"org.zerock.sample"})
public class RootConfig {
	
	@Bean
	public DataSource dataSource() {
		HikariConfig config = new HikariConfig();
		config.setDriverClassName("oracle.jdbc.driver.OracleDriver");
		config.setJdbcUrl("jdbc:oracle:thin:@localhost:1521:xe");
		config.setUsername("spring_user");
		config.setPassword("spring_user");
		
		HikariDataSource dataSource = new HikariDataSource(config);
		
		return dataSource;
	}
}
```

- Connection 테스트

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Log4j
public class DataSourceTests {
	
	@Setter(onMethod_ = {@Autowired})
	private DataSource dataSource;
	
	@Test
	public void con() {
		
		try (Connection con = dataSource.getConnection()){
			log.info(con);
		} catch (Exception e) {
			fail(e.getMessage());
		}
	}
}

```