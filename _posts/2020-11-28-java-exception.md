---
date: 2020-11-28
title: "Exception"
categories: Java
tags: Java
# 목차
toc: true  
toc_sticky: true 
---

# 예외와 예외 클래스
- 예외란 사용자의 잘못된 조작 또는 개발자의 잘못된 코딩으로 인해 발생하는 프로그램 오류

- 일반예외(Exception)
  - 일반 예외는 컴파일러 체크 예외라고도 하는데, 자바 소스를 컴파일 하는 과정에서 예외 처리코드가 필요한지 검사하기 때문

- 실행예외(Runtime Exception)
  - 컴파일 과정에서 예외 처리 코드를 검사하지 않는 예외를 말함
  - 실행 예외는 자바 컴파일러가 체크를 하지 않기 때문에 오로지 개발자의 경험에 의해 예외처리 코드를 삽입해야 함.
`
- JVM 은 프로그램을 실행하는 중 예외가 발생하면 해당 예외를 클래스로 객체를 생성함.
  - 예외처리코드에서 예외 객체를 이용할 수 있도록 해줌.

# 예외 처리 코드
- 프로그램에서 예외가 발생했을 경우 프로그램의 갑작스러운 종료를 막고, 정상 실행을 유지할 수 있도록 처리하는 코드를 예외 처리 코드라고 함.
  - 예외 처리 코드는 try-catch-finally 블록을 이용함.

# 예외 종류에 따른 처리 코드
### 다중 catch
- 예외별로 예외 처리 코드를 다르게 하려면 다중 catch 블록을 사용
### catch 순서
- 다중 catch 블록을 작성할 때 주의할 점은 상위 예외 클래스가 하위 예외 클래스보다 아래쪽에 위치해야함.
### 멀티 catch
- catch 괄호 () 안에 동일하게 처리하고싶은 예외를 | 로 연결해서 사용
```java
try{
실행 블록
}catch (예외처리 코드 | 예외처리 코드){
  e.printeStackTrace();
}
```

### 자동 리소스 닫기
- 예외 발생 여부와 상관없이 사용했던 리소스 객체의 close() 메소드를 호출해서 안전하게 리소스를 닫아줌.
  - 리소스란 데이터를 읽고쓰는 객체라 생각
  - 파일 데이터를 읽는 FileInputStream 객체와 파일에 쓰는 FileOutputStream은 리소스 객체라고 보면됨.

```java
//java 6 이전 사용하던 방식
FileInputStream fis = null;
try{
  fis = new FileInputStream("file.text");
  ..
} catch(Exception e){
  ..
} finally{
  try{
    fis.close();
  }catch(Exception e){
    
  }
}

// java 7 에서 추가된 try-with-resources 사용
try(FileInputStream fis = new FileInputStream("file.text")){
  
}catch(Exception e){

}

```
- try-with-resources 를 사용 시 close() 를 사용하지 않아도 됨.
  - 정상적으로 실행을 완료하거나, 예외 발생 시 자동으로  FileInputStream 의 close() 메소드가 호출됨.

```java
// 다수의 리소스를 사용
public class className implements AutoCloseable {}
  try(
    FileInputStream fis = new FileInputStream("file.text")
    FileOutputStream ois = new FileOutputStrea("file.text")
  ){
    ...
  } catch(Exception e){
    ...
  }
}
```

- try-with-resources 를 사용하기 위해서는 리소스 객체는 java.lang.AutoCloseable 인터페이스를 구현하고 있어야 함.

# 예외 떠넘기기
- 메소드 내부에서 예외가 발생할 수 있는 코드를 작성할 대 try-catch 블록으로 예외를 처리하는것이 기본이자만 경우에 따라 메소드를 호출한곳으로 예외를 넘길 수 있음.

```java
리턴타입 메소드명(매개변수, ...) throws Exception {
}
```
- throws 키워드가 붙어있는 메소드는 반드시 try 블록 내에서 호출되어야 하며, catch블록에서 넘겨받은 예외를 처리 해야함.

# 사용자 정의 예외와 예외 발생
- 애플리케이션 서비스와 관련된 예외를 애플리케이션 예외(Application Exception)라고 함.
  - 애플리케이션 예외는 개발자가 직접 정의해서 만들어야 하므로 사용자 정의 예외라고도 함.

## 사용자 정의 예외 클래스 선언
- 사용자 정의 예외 클래스는 컴파일러가 체크하는 일반예외로 선언할 수도 있고, 컴파일러가 체크하지않는 실행예외로 선언할 수도있음.
  - 일반 예외로 선언할 경우 Exception을 상속, 실행 예외로 선언할 경우 RuntimeException 을 상속
```java
public class XXXException extends [Exception | RuntimeException]{
  public XXXException(){}
  public XXXException(String message){ super(message); }
}
```
- 사용자 정의 예외 클래스 이름은 Exception 으로 끝나는것이 좋다.
- 사용자 정의 예외 클래스도 필드, 생성자, 메소드선언들을 포함할 수는 있지만, 대부분 생성자 선언만을 포함함.
  - 매개변수가 없는 기본 생성자, 예외 발생 원인(예외 메세지)을 전달하기 위해 String 타입의 매개 변수를 갖는 생성자 두개를 선언하는것이 일반적임.
    - 예외 메세지의 용도는 catch{} 블록의 예외 처리 코드에서 이용하기 위해서임.

### 예외 발생시키기
```java
throw new XXXException();
throw new XXXException("Erorr");
```
- 예외 객체를 생성할때는 기본 생성자 또는 예외 메세지를 갖는 생성자중 어떤것을 사용해도 됨.
  - 예외 발생 코드를 가지고있는 메소드는 내부에서 try-catch 블록으로 예외 처리를 할순 있지만, 대부분은 자신을 **호출한 곳**에서 예외처리를 하도록 throws 키워드로 예외를 넘김

### 예외 정보 얻기
- 가장 많이 사용되는 메소드는 getMessage(),printStackTrace()
  - 예외가 가지고있는 Message 를 얻기 위해서는 getMessage() 메소드를 예외 발생 경로를 추적하기 위해서는 printStackTrace() 를 사용한다.

```java
try{
  throw new Exception("Error");
} catch(Exception e){
  
  String meg = e.getMessage();
  //or
  e.printStackTrace();
}
```
