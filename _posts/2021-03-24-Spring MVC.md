---
date: 2021-03-24
title: "Spring MVC"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

# 스프링 MVC
> 스프링은 원래 목적 자체가 웹 어플리케이션을 목적으로 나온 프레임워크가 아니기 때문에 달라지는 영역에 대해서는 완전히 분리하고 연동하는 방식으로 구현 되있음.

```java
// pom.xml 초기설정
<properties>
	<java-version>1.8</java-version>
	<org.springframework-version>5.0.7.RELEASE</org.springframework-version>
	<org.aspectj-version>1.6.10</org.aspectj-version>
	<org.slf4j-version>1.6.6</org.slf4j-version>
</properties>

// 추가
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-test</artifactId>
	<version>${org.springframework-version}</version>
</dependency>	
<dependency>
	<groupId>org.projectlombok</groupId>
	<artifactId>lombok</artifactId>
	<version>1.18.0</version>
	<scope>provided</scope>
</dependency>

// servlet 3.0 이상을 사용
<dependency>
	<groupId>javax.servlet</groupId>
	<artifactId>javax.servlet-api</artifactId>
	<version>3.1.0</version>
</dependency>
// maven 컴파일 옵션 1.8버전으로 변경
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
```

**java 이용 시**
```java
// pom.xml 위와 동일 셋팅 후 plugin 설정 추가
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-war-plugin</artifactId>
	<version>3.2.0</version>
	<configuration>
		<failOnMissingWebXml>false</failOnMissingWebXml>
	</configuration>
</plugin>

//RootConfig.java
@Configuration
public class RootConfig {}

//WebConfig.java
public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] {RootConfig.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] {ServletConfig.class};
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] {"/"};
	}
}

//ServletConfig.java
@EnableWebMvc
@ComponentScan(basePackages = {"org.zerock.controller"})
public class ServletConfig implements WebMvcConfigurer {
	
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		InternalResourceViewResolver bean = new InternalResourceViewResolver();
		bean.setViewClass(JstlView.class);
		bean.setPrefix("/WEB-INF/views/");
		bean.setSuffix(".jsp");
		registry.viewResolver(bean);	
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry reg) {
		reg.addResourceHandler("/resources/**").addResourceLocations("/resources");
	}	
}
```

- web.xml(Tomcat), root-context.xml, servlet-context.xml 이 프로젝트 구동시 관여(XML)
  - root-context.xml 에 정의된 객체(bean)들은 스프링의 영역(context) 안에 생성되고 객체들 간의 의존성이 처리됨.


## 스프링 MVC 처리 순서

1. Request 는 DispatcherServlet 통해 처리 함.
2. HandlerMapping 은 Request 처리를 담당하는 컨트롤러를 찾기위해 존재 함. 구현한 여러 객체들중 RequestMappingHandlerMapping 같은 경우는 @RequestMapping 어노테이션이 적용된 것을 기준으로 판단함.
3. 적절한 컨트롤러가 찾아지면 HandlerAdapter를 이용해 해당 컨트롤러를 작동시킴
4. Controller 실제 Request 처리하는 로직을 작성하게 됨. 다양한 타입의 결과를 반환 하는데 이에대한 처리는 ViewResolver 를 이용하게 됨.
5. ViewResolver 는 Controller 가 반환한 결과를 어떤 View를 통해 처리하는것이 좋을지 해석하는 역할임.(servlet-context.xml 정의된 InternalResourceViewResolver)
6. View 는 데이터를 JSP 등을 이용해 생성하는 역할을 함.
7. 응답은 DispatcherServlet 을 통해 전송함.

- 모든 Request는 DispatcherServlet 을 통하도록 설계되는데 이런 방식을 Front-Controller 패턴이라고 함.