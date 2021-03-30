---
date: 2021-03-16
title: "Spring 특징, 의존성 주입, 테스트"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

## 스프링의 주요 특징
- POJO(**Plain Old Java Object**) 기반의 구성
> 가벼운 프레임워크지만, 내부에는 객체간의 관계를 구성할 수 있는특징을 가짐. 관계를 구성할 때 별도의 API 등을 사용하지않는 POJO 의 구성만으로 가능하도록 제작(비종속적), 일반적인 Java 코드를 이용해 객체를 구성하는 방식을 그대로 사용가능.

- 의존성 주입(DI)을 통한 객체간의 관계 구성
> 의존성은 하나의 객체가 다른 객체 없이 제대로 된 역할을 할 수 없다는것을 의미, 주입은 말그대로 외부에서 밀어넣는것을 의미, 스프링에서는 **ApplicationContext**라는 존재가 필요한 객체들을 생성하고, 필요한 객체들을 주입하는 역할을 해주는 구조, 객체를 분리해서 생성하고, 객체들을 엮는(wiring) 작업을 하는 형태의 개발을 하게됨. ApplicationContext 가 관리하는 객체들을 빈(Bean) 이라는 용어로 부름

- AOP(Aspect-Oriented-Programming)지원
> 시스템이 공통으로 가지고있는 보안,로그,트랜잭션과 같이 비지니스 로직은 아니지만 반드시 처리해야하는 부분을 횡단관심사(cross-concern) 이라 함. 스프링은 횡단관심사를 분리해서 제작하는것이 가능. AOP(Aspect Oriented Programming)는 이런 횡단 관심사를 모듈로 분리하는 프로그래밍의 패러다임

- 편리한 MVC 구조
- WAS 의 종속적이지 않은 개발 환경 
- 트랜잭션 지원

- Spring 2.5 V : 어노테이션을 활용하는 설정을 도입하면서 편리한 설저오가 개발이 가능하도록 지원
- Spring 3.0 V : 별도의 설정 없이도 Java 클래스만으로 설정 파일을 대신할 수 있게 지원
- Spring 4.0 V : 모바일 환경과 웹 환경에서 많이 사용되는 REST 방식의 컨트롤러 지원
- Spring 5.0 V : Reactor 를 이용한 Reactive 스타일 개발 환경 지원

## 스프링 동작
1. 스프링 시작 시 사용하는 메모리영역을 만들게됨. 이를 컨텍스트(Context)라고함. 스프링에서는 ApplicationContext 라는 이름의 객체가 만들어짐.
2. 객체를 생성하고 관리해야하는 객체들에 대한 설정이 필요함.(root-context.xml)
3. root-context.xml 에 설정되어있는`<context:component-scan>` 태그 내용을 통해 패키지를 스캔함.
4. 해당 패키지의 클래스 중 @component 라는 어노테이션이 존재하는 클래스의 인스턴스 생성
5. 하나의 객체에서 다른 객체가 필요하다는 어노테이션(@Autowired) 설정이 되어있으면 스프링은 객체의 레퍼런스를 설정 객체에 주입함.(Restaurant 는 Chef 객체가 필요함. Chef 객체의 레퍼런스를 Restaurant 객체에 주입)


## 의존성 주입 테스트

```java
@Data //Lombok 의 setter 를 생성하는 기능과 생성자, toString() 을 자동생성하는 어노테이션
@Component
public class Chef {

}
```

```java
@Component // 해당 클래스가 스프링에서 관리해야하는 대상임을 표시하는 어노테이션
@Data
public class Restaurant {
	
	// 자동으로 setChef() 를 컴파일 시 생성
	@Setter(onMethod_ = @Autowired)
	private Chef chef;
	
}
```
- 스프링은 클래스에서 객체를 생성하고 객체들의 의존성에 대한 처리 작업까지 내부에서 모든것이 처리됨.
  - **스프링에서 관리되는 객체를 빈(Bean)**이라고함.
  
  - src 폴더 내에서 root-context.xml 은 스프링 프레임워크에서 관리해아하는 객체를 설정하는 설정파일임.
    - context파일에서 하단 Namespace 탭 선택 > context 클릭

    ```java
    //Soucre 탭 코드 추가
    <context:component-scan base-package="org.zerock.sample">
	  </context:component-scan>
    ```  
  - xml 저장 후 Bean Graph 탭을 클릭하면 객체가 설정되어있는 화면 확인가능함.

- java 설정을 이용하는 의존성 주입
  - RootConfig 클래스를 이용
  - xml 로 설정된 내용을 @ComponentScan 어노테이션을 이용해 처리가능함.

  ```java
  @Configuration
  @ComponentScan(basePackages = {"org.zerock.sample"})
  public class RootConfig {
    
  }
  ```

## 테스트 코드

```java
// 현재 테스트 코드가 스프링을 실행하는 역할이라는것을 나타냄
@RunWith(SpringJUnit4ClassRunner.class)

// 지정된 클래스나 문자열을 이용해 필요한 객체들을 스프링 내에 객체로 등록하는 어노테이션, 이후의 문자열은 classpath, file 을 이용함.
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")

//Lombok 을 이용해 로그를 기록하는 Logger를 변수로 생성함. src/text/resources/log4j.xml 파일에 로그 존재
@Log4j
public class SampleTests {
	
	// 해당 인스턴스 변수가 스프링으로부터 자동으로 주입해달라는 표시
	@Setter(onMethod_ = { @Autowired } )
	private Restaurant restaurant;
	
	// 테스트 대상임을 표시
	@Test
	public void testExist() {
		//null 이 아니어야만 테스트가 성공한다는것을 의미
		assertNotNull(restaurant);
		log.info(restaurant);
		log.info(restaurant.getChef());
	}
}
```

실행결과
```java
INFO : org.springframework.test.context.support.DefaultTestContextBootstrapper - Loaded default TestExecutionListener class names from location [META-INF/spring.factories]: [org.springframework.test.context.web.ServletTestExecutionListener, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener, org.springframework.test.context.support.DependencyInjectionTestExecutionListener, org.springframework.test.context.support.DirtiesContextTestExecutionListener, org.springframework.test.context.transaction.TransactionalTestExecutionListener, org.springframework.test.context.jdbc.SqlScriptsTestExecutionListener]
INFO : org.springframework.test.context.support.DefaultTestContextBootstrapper - Using TestExecutionListeners: [org.springframework.test.context.web.ServletTestExecutionListener@4501b7af, org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener@523884b2, org.springframework.test.context.support.DependencyInjectionTestExecutionListener@5b275dab, org.springframework.test.context.support.DirtiesContextTestExecutionListener@61832929]
INFO : org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loading XML bean definitions from URL [file:src/main/webapp/WEB-INF/spring/root-context.xml]
INFO : org.springframework.context.support.GenericApplicationContext - Refreshing org.springframework.context.support.GenericApplicationContext@6e1ec318: startup date [Tue Mar 16 11:30:29 KST 2021]; root of context hierarchy
INFO : org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor - JSR-330 'javax.inject.Inject' annotation found and supported for autowiring
INFO : org.zerock.sample.SampleTests - Restaurant(chef=Chef())
INFO : org.zerock.sample.SampleTests - Chef()
INFO : org.springframework.context.support.GenericApplicationContext - Closing org.springframework.context.support.GenericApplicationContext@6e1ec318: startup date [Tue Mar 16 11:30:29 KST 2021]; root of context hierarchy
```

- 테스트 결과 확인 사항
  - new Restaurant() 와 같이 **객체를 생성한적이 없는데도 객체**가 만들어짐.
    - 관리가 필요한 객체를 어노테이션 등을 이용해 객체를 생성하고 관리하는 일종의 컨테이너,팩토리 기능을 가짐

  - Restaurant 클래스의 **@Data 어노테이션으로 Lombok 을 이용해 메서드가 만들어짐**
    - Lombok 은 자동으로 getter/setter 등을 만드는데 생성자 주입이나 setter 주입을 이용해 동작함. 
    - Lombok 을 통해 getter/setter 등을 자동으로 생성하고 onMethod 속성을 이용해 작성된 setter에 @Autowired 어노테이션을 추가함.

  - Restaurant 객체의 Chef **인스터스 변수(멤버 변수)에 Chef 타입의 객체가 주입되어있음.**
    - @Autowired 어노테이션을 통해 객체들의 관계를 자동으로 관리되도록 함.


**java 이용 시 테스트 설정**

```java
// 현재 테스트 코드가 스프링을 실행하는 역할이라는것을 나타냄
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {RootConfig.class})
//Lombok 을 이용해 로그를 기록하는 Logger를 변수로 생성함. src/text/resources/log4j.xml 파일에 로그 존재
@Log4j
public class SampleTests {
}
```

**코드에서 사용된 어노테이션**
Lombok 관련 | Spring 관련 | 테스트 관련
--- | --- | ---
@Setter | @Autowired | @RunWith
@Data | @Component | ContextConfigration
@Log4j | | @Test


**lombok 관련**
- 컴파일 시 흔하게 코드를 작성하는 기능들을 완성해주는 라이브러리
- @Setter
  - Setter 메서드를 만들어주는 역할을 함.
  - @Setter 3가지 속성

속성명 | 의미
--- | ---
value | 접근 제한 속성을 의미함. 기본값은 lombok accssLevel,PUBLIC
onMethod | setter 메서드의 생성 시 메서드에 추가할 어노테이션을 지정, 코드는 특이하게 '_' 가 사용되는데 JDK 버전에 따라 차이가 있음. JDK7 : (onMethod=@_({@annotationsGoHere})), JDK8 : (onMethod_={@AnnotationsGoHere}) 
onParam | setter 메서드의 파라미터에 어노테이션을 사용하는경우에 적용

- @Log4j 
  - 로그 객체를 생성함.
- @Data
  - @ToString, @EqualsAndHashCode, @Getter/Setter, @RequiredArgsConstructor 모두 결합한 형태, 세부적인 설정이 필요없으면 @Data 를 주로 사용


**Spring 관련**
- @Component 
  - 해당 클래스가 스프링에서 객체로 만들어서 관리하는 대상임을 명시하는 어노테이션
  - @ComponentScan 을 통해 @Component 가 존재하는 클래스들을 객체로 생성해서 빈으로 관리함.
- @Autowired 
  - 자신이 특정한 객체에 의존적이므로 자신에게 해당 타입의 빈을 주입해주라는 표시

**테스트 관련**
- @ContextConfiguration
  - 스프링이 실행되면서 어떤 설정 정보를 읽어 들여야 하는지 명시
- @Runwith
  - 테스트 시 필요한 클래스를 지정
- @Test
  - junit 에서 해당 메서드가 jUnit 상에서 단위 테스트의 대상인지 알려줌
  

## 스프링 4.3 이후 단일 생성자의 묵시정 자동 주입
>기존 스프링에서는 생성자 주입, Setter 주입을 사용하였음. 주입을 위해 생성자를 정의하고, @Autowired 어노테이션을 추가해야만 생성자 주입이 이뤄졌지만 4.3 이후에는 묵시적으로 생성자 주입이 가능함.

```java
@Component
@ToString
@Getter
public class SampleHotel {
	private Chef chef;
  // @Autowired 어노테이션 없이 처리됨.
	public SampleHotel(Chef chef) {
		this.chef = chef;
	}
}


// @AllArgsConstructor 인스턴스 변수로 선언된 모든것을 파라미터로 받는 생성자를 작성함.
@Component
@ToString
@Getter
@AllArgsConstructor
public class SampleHotel {
	private Chef chef;
}

// @RequiredArgsConstructor 는 @NonNull 이나 final 이 붙은 인스턴스 변수에 대한 생성자를 작성함. 
@Component
@ToString
@Getter
@RequiredArgsConstructor
public class SampleHotel {
	@NonNull
	private Chef chef;
}
```