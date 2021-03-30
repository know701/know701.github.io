---
date: 2021-03-25
title: "Spring MVC Controller"
categories: spring
# 목차
toc: true  
toc_sticky: true
---

# 스프링 MVC
- MVC를 이용한 Controller 의 특징
  1. HttpServletRequest, HttpServletResopnse 를 거의 사용할 필요없이 기능 구현
  2. 다양한 타입의 파라미터 처리, 다양한 타입의 리턴 타입 사용 가능
  3. GET,POST 전송 박식에 대한 처리를 어노테이션으로 처리 가능
  4. 상속/인터페이스 방식 대신 어노테이션으로도 필요 설정 가능

- **스프링 MVC 는 어노테이션을 중심으로 구성**되기때문에 어노테이션의 의미에 대해 주의깊게 학습할것.

## @Controller, @RequestMapping

```java
@Controller
@RequestMapping("/sample/*")
public class SampleController {
	
  @RequestMapping("/aaa")
	public void aaa() {
		log.info("aaa...............");
	}	

}

//servlet-context.xml
<context:component-scan base-package="org.zerock.controller" />
```
- **@Controller**
  - Controller 역할을 수행한다고 명시
  - Bean 으로 등록
  - @Component 의 구체화 된 어노테이션
- **@RequestMapping**
  - 현재 클래스의 모든 메소드들의 기본적인 URL 경로 (/지정경로/모든경로)
  - 클래스의 선언과 메소드 선언에 사용 가능함.

### @RequestMapping 의 변화

```java
@Controller
@RequestMapping(value = "/sample/*", method = {RequestMethod.GET, RequestMethod.POST})
@Log4j
public class SampleController {
	
	@GetMapping("/mapping")
	public void aaa() {
		log.info("aaa...............");
	}	
}
```
- method 속성을 추가가능함(Get, Post)
  - GET,POST 모두 지원해야하는 경우 배열로 처리해 지정 가능함.
- 스프링 4.3 부터는 @GetMapping, @PostMapping 처럼 축약형표현으로 사용가능함.

### @Controller의 파라미터 수집
> @Controller 작성 시 가장 편리한 기능은 파라미터가 자동으로 수집되는 기능임.

```java
//SampleDTO
@Data
public class SampleDTO {
	private String name;
	private int age;	
}
//SampleController 에 추가
@GetMapping("/ex01")
public String ex01(SampleDTO dto) {
  log.info(dto);
  return "ex01";
}
```
- @GetMapping 이 사용되어 필요한 파라미터 뒤 값 입력 후 호출 시 로그에 출력되는걸 볼수있음.
  - 자동으로 타입변환처리함.

**파라미터의 수집과 변환**

```java
@GetMapping("/ex02")
public String ex02(@RequestParam("name") String name, @RequestParam("age") int age) {
  log.info("name = " +  name);
  log.info("age = " +age);
  return "ex02";
}
@GetMapping("/ex03")

public String ex03(@RequestParam("ids")ArrayList<?> ids ) { //또는  String[] 사용
  log.info("ids = " + ids);
  return "ex03";
}
```
- @RequestParam 은 파라미터로 사용된 변수의 이름과 전달되는 파라미터의 이름이 다른경우에 유용하게 사용됨.

- 파라미터가 여러개 전달될 경우 ArrayList<> 를 사용
  - 파라미터의 타입은 실제적인 클래스 타입을 지정함.


**객체 리스트**
- 여러 객체 타입의 파라미터를 처리해야할 시 사용

```java
// 객체를 담을 리스트 클래스 추가
@Data
public class SampleDTOList {
	private List<SampleDTO> list;

	public SampleDTOList() {
		list = new ArrayList<>();
	}
}

// 테스트
	@GetMapping("/ex05")
	public String ex05(SampleDTOList list) {
		log.info("list =" + list);
		return "list";
	}
```

**@InitBinder**
> 파라미터의 수집을 다른용어로 binding 이라 함. 변환이 가능한 데이터는 자동으로 변환되지만 경우에 따라 파라미터를 변환해 처리해야하는 경우 사용하는 어노테이션.('2020-12-12' 와 같이 문자열로 받은 데이터값)

```java
@Data
public class TodoDTO {
	private String title;
	private Date date;
}
```


**@DateTimeFormat**
> @InitBinder 를 이용할수도 있지만 파라미터로 사용되는 인스턴스 변수에 @DateTimeFormat 을 이용해도 변환 가능

```java
@Data
public class TodoDTO {
	private String title;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date date;
}
```
- 위와같이 변환 시 @InitBinder 어노테이션 사용 안해도 됨.

### Model 데이터 전달자
- Model 객체는 JSP에 데이터를 담아 전달하는 역할임.
  - 파라미터에 Model 타입이 지정된 경우 Model 타입의 객체를 만든뒤 주입함.
  - request.setAttribute()와 유사한 역할을 함.

**@ModelAttribute**

```java
//SampleController.java 
@GetMapping("/ex07")
public void ex07(SampleDTO dto, @ModelAttribute("page") int page) {
  log.info(dto);
  log.info(page);
}
// jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	
	<h2>sampleDTO ${sampleDTO }</h2>
	<h2>page ${page }</h2>

</body>
</html>
```
- 강제로 전달받은 파라미터를 Model 에 담아서 전달하도록 할 때 사용하는 어노테이션
  - 타입에 관계없이 무조건 Model 에 담아서 전달됨.
  - 파라미터로 전달된 데이터를 다시 화면에 사용할때 사용함.
  - @ModelAttribute 사용 시 value 를 지정할것.

**@RedirectAttributes**

```java
//Serlvet redirect 방식
response.sendRedirect("/home?name=aaa&age=10");

//Spring MVC 방식
rttr.addFlashAttribute("name", "AAA");
rttr.addFlashAttribute("age",10);
```
- 일회성으로 데이터를 전달하는 용도로 사용됨.
  - response.sendRedirect()를 사용할때와 동일한 용도

### Controller 리턴 타입
- Controller 의 메소드가 사용할 수 있는 타입

타입|용도 
---|---
String | jsp 를 이용하는 경우 jsp 파일의 경로와 파일이름을 나타내기 위해 사용
void | 호출하는 URL 과 동일한 이름의 jsp를 의미
VO, DTO | 주로 JSON 타입의 데이터를 만들어 반환하는 용도로 사용
ResponseEntity | response 할 때 Http 헤더 정보와 내용을 가공하는 용도로 사용
Model, ModelAndView | Model 로 데이터를 반환하거나 화면까지 같이 지정하는 경우에 사용
HttpHeaders | 응답에 내용없이 Http 헤더 메시지만 전달하는 용도

```java
@GetMapping("/ex08")
	private void ex08() {	
}	
```
- void
  - 리해당 URL 의 경로를 그대로 jsp 파일의 이름으로 사용하게됨.


```java
@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
}
```
- String
  - 상황에 따라 다른 화면을 보여줄 필요가 있을경우 사용(if~else 와 같은 처리가 필요한 상황)
  - String 타입은 JSP 파일의 이름을 의미함.
  - String 타입에는 특별한 키워드를 붙여 사용가능함.
    - redirect : 리다이렉트 방식으로 처리하는경우
    - forward : 포워드 방식으로 처리하는 경우


```java
@GetMapping("/ex09")
public @ResponseBody SampleDTO ex09() {
  log.info("//ex09");
  SampleDTO dto = new SampleDTO();
  dto.setAge(10);
  dto.setName("AAA");
  return dto;
}
```
- 객체 타입
  - JSON 데이터를 만들어내는 용도로 사용함.

```java
//pom.xml 라이브러리 추가
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.9.4</version>
</dependency>

@GetMapping("/ex10")
public ResponseEntity<String> ex10(){
  log.info("ex10------------");
  String msg = "{\"name\": \"홍길동\"}";
  
  HttpHeaders header = new HttpHeaders();
  header.add("Content-Type", "application/json;charset=UTF-8");
  
  return new ResponseEntity<String>(msg, header, HttpStatus.OK);
}
```
- ResponseEntity 타입
  - 원하는 헤더 정보나 데이터를 전달 가능함.

```java
// pom.xml 라이브러리 추가
<dependency>
  <groupId>commons-fileupload</groupId>
  <artifactId>commons-fileupload</artifactId>
  <version>1.3.3</version>
</dependency>

//servlet-context.xml
<beans:bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
  <beans:property name="defaultEncoding" value="utf-8" />	
  <beans:property name="maxUploadSize" value="104857560" />
  <beans:property name="maxUploadSizePerFile" value="2097152" />	
  <beans:property name="uploadTempDir" value="file:/C:/upload/tmp" />	
  <beans:property name="maxInMemorySize" value="10485756" />	
</beans:bean>

//controller
@GetMapping("/upload")
private void upload() {
  log.info("upload...........");
}
//jsp
<form action="/sample/uploadPost" method="post" enctype="multipart/form-data">
  <div>
    <input type="file" name="files" />
  </div>
  <div>
    <input type="submit" />
  </div>		
</form>
//controller
@PostMapping("/uploadPost")
private void uploadPost(ArrayList<MultipartFile> files) {
  log.info(files);
  files.forEach(f -> {
    log.info("--------------");
    log.info(f.getOriginalFilename());
    log.info(f.getSize());
    log.info("--------------");
  });
}
```
- 파일 업로드 처리  
  - servlet-context.xml 설정
- java 이용시

```java
@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getResolver() throws Exception{
		CommonsMultipartResolver res = new CommonsMultipartResolver();
		
		res.setMaxUploadSize(1024 * 1024 * 10);
		res.setMaxUploadSizePerFile(1024 * 1024 * 2);
		res.setMaxInMemorySize(1024 * 1024);
		res.setUploadTempDir(new FileSystemResource("C:\\upload\\tmp"));
		res.setDefaultEncoding("utf-8");
		
		return res;
  }
```
  
### Controller Exception 처리
- 스프링 MVC 에서 예외상황 처리방법
  - @ExceptionHandler 와 @ControllerAdvice 를 이용한 처리
  - @ResponseEntity 를 이용하는 메시지 구성

- @ControllerAdvice 
> AOP(Aspect-Oriented-Programming)을 이용하는 방식(AOP란 공통적인 관심사를 분리 하자는 개념)

```java
@ControllerAdvice
@Log4j
public class CommonExceptionAdvice {
	@ExceptionHandler(Exception.class)
	public String ex(Exception ex, Model model) {
		log.error("에러" + ex.getMessage());
		model.addAttribute("exception",ex);
		log.error(model);
		return "error_page";
	}	
}

```
- @ControllerAdvice 는 해당 객체가 스프링의 컨트롤러에서 발생하는 예외를 처리하는 존재임을 명시하는 용도로 사용
- @ExceptionHandler 는 해당 메소드가 () 들어가는 예외 타입을 처리하는다는것을 의미
