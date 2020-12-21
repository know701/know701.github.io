---
date: 2020-12-19
title: "람다식"
categories: Java
tags: Java
# 목차
toc: true  
toc_sticky: true 
---

{% raw %}
# 람다식
- 함수적 프로그래밍
- 자바 8부터 함수적 프로그래밍 지원
  - 람다식의 형태는 매개 변수를 가진 코드 블록이지만 런타임 시에는 익명 구현 객체를 생성

```java
람다식 > 매개변수를 가진 코드 블록 > 익명 구현 객체

Runnable runnable = new Runnable(){ //익명 구현객체
	public void run(){
		.. 
	}
};

//람다식 표현 시
Runnable runnable = () -> { //람다식

};
```

## 람다식 기본 문법
```java
(타입 매개변수, ...) -> {실행문;...}
```
- 타입 매개변수 는 오른쪽 {} 블록을 실행하기 위한 값을 제공하는 역할
  - -> 기호는 매개변수를 이용해 {} 를 실행한다는 뜻

```java
(int a) -> {System.out.println(a);}

// 람다식에서는 매개 변수의 타입을 일반적으로 언급하지 않음.
(a) -> {System.out.println(a);}

// 하나의 매개변수,실행문 만 있다면 괄호 생략 가능
a -> System.out.println(a);
```
- 만약 매개변수가 없다면 람다식에서는 매개변수 자리가 없어지므로 빈괄호 반드시 사용

```java
(x,y) -> {return x+y;};
//return 문만 있을경우 return 문을 사용하지않음.
(x,y) -> x+y;
```

## 타겟 타입과 함수적 인터페이스

- 람다식이 대입되는 인터페이스를 말함.
	> 인터페이스 변수 = 람다식;
  - 익명 구현 객체를 만들 때 사용할 인터페이스임.
  > 람다식은 대입될 인터페이스의 종류에 따라 작성 방법이 달라지기 때문에 람다식이 대입될 인터페이스를 **람다식의 타겟타입**이라함

### 함수적 인터페이스(@FunctionalInterface)
람다식은 하나의 메소드를 정의하기 때문에 하나의 추상 메소드만 선언된 인터페이스만 타겟 타입이 될 수 있음.

- 함수적 인터페이스는 하나의 추상 메소드만 선언된 인터페이스를 뜻함.

- @FunctionalInterface 어노테이션
  - 두개 이상의 추상 메소드가 선언되지 않도록 체크해줌.
  - 어노테이션은 선택사항

```java
@FunctionalInterface
public interface FunctionalInterface{
	public void method();
	// public void method2(); 컴파일 오류
}
```

### 매개변수와 리턴값이 없는 람다식

```java
@FunctionalInterface
public interface FunctionalInterface{
  public void method();

  FunctionalInterface fi = () -> { ... }
  fi.method();
}
```
  * 람다식을 인터페이스에 변수에 대입하게 되면 익명구현 객체가 만들어짐.
  * 실행은 이터페이스 변수를 통해 메소드를 호출해주면 됨,

**매개변수가 있는 람다식**
```java
@FunctionalInterface
public interface FunctionalInterface {
  public int method(int x);
}

FunctionalInterface fi = (x) -> {...}
//또는
FunctionalInterface fi = x -> {...}

fi.method(5); //매개변수 5 사용
```

**리턴값이 있는 람다식**
```java
@FunctionalInterface
public interface FunctionalInterface{
  public int method(int x);
}

FunctionalInterface fi = (x,y) -> {...; return 값;}
int result = fi.method(5,2);
```  
  * 약식 표현

  ```java
  FunctionalInterface fi = (x,y) -> {
    return x+y;
  }
  FunctionalInterface fi = (x,y) -> x + y;
  ```

  ```java
  FunctionalInterface fi = (x,y) -> {
    return sum(x,y);
  }
  FunctionalInterfacefi = (x,y) -> sum(x,y);
  ```

## 클래스 멤버와 로컬 변수 사용
- 클래스 멤버 사용
  - 람다식 실행 블록에는 클래의 멤버인 필드와 메소드를 제약없이 사용 가능
  - 람다식 실행 블록내에서의 **this 는 람다식을 실행한 객체의 참조**

- 로컬 변수의 사용
  - 람다식은 함수적 인터페이스의 익명 구현 객체 생성
  - 람다식에서 사용하는 외부 로컬 변수는 final 특성을 가져야함.
  - 매개변수 또는 로컬변수를 람다식에서는 읽는것은 허용되지만, 람다식 내부또는 외부에서는 변경할수없음.

```java
public interface MyfunctionalInterface {
	public void method();
}

public class UsingLocalVarialbe {

	public void method(int arg) {
		int localvar = 40; // final 특성을 가짐
//		arg = 30; 변경 시 컴파일 에러
//		localvar = 35; 변경 시 컴파일 에러
	
		MyfunctionalInterface fi = () -> {
			System.out.println(arg);
			System.out.println(localvar);
		};
		fi.method();
	}
	public static void main(String[] args) {
		UsingLocalVarialbe vi = new UsingLocalVarialbe();
		vi.method(50);
	}
}

```

## 표준 API의 함수적 인터페이스
- 자바 8부터 추가되거나 변경된 API에서 이 함수적 인터페이스들을 매개 타입으로 많이 사용 함.

### Consumer 함수적 인터페이스
- 리턴값이 없는 accept() 메소드를 가지고있음
- accept() 메소드는 단지 매개값을 소비하는 역할 (리턴값 없음)
 
인터페이스명 | 추상 메소드 | 설명
---|---|---
Consumer<'T> | void accept | 객체 T를 받아 소비
Biconsumer<'T,U> | void accept(T t,U u) | 객체 T와 U를 받아 소비
DoubleConsumer | void accept(double value) | double 값을 받아 소비
IntConsumer | void accept(int value) | int 값을 받아 소비
LongConsumer | void accept(long value) | long 값을 받아 소비
ObjDoubleConsumer<'T> | void accept(T t, Double value) | 객체 T, Double 값을 받아 소비
ObjIntConsumer<'T> | void accept(T t, int value) | 객체 T와 int 값을 받아 소비
ObjLongConsumer<'T> | void accept(T t, Long value ) | 객체 T와 Long 값을 받아 소비

```java
// Consumer<T> 인터페이스를 타겟 타입으로 하는 람다식
Consumer<String> consumer = t -> { t를 소비하는 실행문; }

// BiConsumer<T,U> 인터페이스를 타겟 타입으로 하는 람다식
BiConsumer<String , String> consumer = (t, u) -> { t와 u를 소비하는 실행문; }

// DoubleConsumer 인터페이스를 타겟타입으로 하는 람다식
DoubleConsumer consumer = d -> { d를 소비하는 실행문; }
```


### Supplier 함수적 인터페이스
- 이 인터페이스는 매개 변수가 없고 리턴값이 있는 getXXX() 메소드를 가지고 있음.
- 실행 후 호출한 곳으로 데이터를 리턴하는 역할

인터페이스명 | 추상메소드 | 설명
---|---|---
Supplier<'T> | T get() | T 객체를 리턴
BooleanSupplier | boolean getAsBoolean() | boolean 값을 리턴
DoubleSupplier | double getAsDouble() | double 값을 리턴
IntSupplier | int getAsInt() | int 값을 리턴
LongSupplier | long getAsLong() | long 값을 리턴

```java
// Supplier<T> 인터페이스를 타겟타입으로하는 람다식은 get() 메소드가 매개값을 가지지 않으므로 람다식도 ()을 사용
Supplier<String> supplier = () -> { ...; return "문자열"; }

// Intsupplier supplier = () -> { ...; return int값; }
IntSupplier supplier = () -> { ...; return int값; }
```

### Function 함수적 인터페이스
- 매개값과 리턴값이 있는 applyXXX() 메소드를 가짐
- applyXXX() 메소드는 **매개값을 리턴값으로 매핑(타입변환)** 하는 역할

인터페이스명 | 추상 메소드 | 설명
---|---|---
Function<'T,R> | R apply(T t) | 객체 T를 객체 R로 매핑
BiFunction<'T,U,R> | R apply(T t,U u) | 객체 T와 U를 객체 R로 매핑
DoubleFunction<'R> | R apply(double value) | double 객체를 R로 매핑
IntFunction<'R> | R apply(int value) | int를 객체 R로 매핑
IntToDoubleFunction | double applyAsDouble(int value) | int double로 매핑
IntToLongFunction | long applyAsLong(int value) | int를 long으로 매핑
LongToDoubleFunction | double applyAsDouble(long value) | long을 double로 매핑
LongToIntFunction | int applyAsInt(long value) | long을 int로 매핑

```java
// Function<T,R> 인터페이스를 타겟 타입으로 하는 람다식
Function<Student, String> function = t -> { return t.getName(); }
Function<Student, String> function = t -> t.getName();

// ToIntFunction<T> 인터페이스를 타겟 타입으로 하는 람다식
ToIntfunction<Student> function = t -> { return t.getScore(); }
ToIntfunction<Student> function = t -> t.getScore();

```

### Operator 함수적 인터페이스
- Function 와 동일하게 매개변수와 리턴값이 있는 applyXXX() 메소드 가짐
- 매개값을 리턴값으로 매핑 하는 역할보다는 매개값을 이용해서 연산 후 동일한 타입으로 리턴값을 제공하는 역할을 함.

인터페이스명 | 추상 메소드 | 설명
---|---|---
BinaryOperator<'T> | T apply(Tt, Tt) | T와 T를 연산 후 T리턴
UnaryOperator<'T> | T apply(Tt) | T를 연한 후 T리턴
DoubleBinaryOperator | double applyAsDouble(double, double) | 두개의 double 연산
DoubleUnaryOperator | double applyAsDouble(double) | 한개의 double 연산
IntBinaryOperator | int applyAsInt(int,int) | 두개의 int 연산
IntUnaryOperator | int applyAsInt(int) | 한개의 int 연산
LongBinaryOperator | long applyAsLong(long, long) | 두개의 long 연산
LongUnaryOperator | long applyAsLong(long) | 한개의 long 연산


- 작성방법

```java
IntBinaryOperator operator = (a,b) -> {
    ...;
    return int값;
}
```

### Predicate 함수적 인터페이스
- 매개변수와 boolean 리턴값이 있는 testXXX() 메소드를 가지고있음.

인터페이스명 | 추상메소드 | 설명
---|---|---
Predicate<'T> | boolean test(T t) | 객체 T를 조사
BiPredicate<'T,U> | boolean test(T t, U u) | 객체 T와 U를 비교 조사
DoublePredicate | boolean test(double value) | double 값을 조사
IntPredicate | boolean test(int value) | int 값을 조사
LongPredicate | boolean test(long value) | long 값을 조사

- 작성방법

```java
Predicate<Student> predicate = t -> {
  return t.getSex().equals("남");
}
//또는

Predicate<Student> predicate = t -> t.getSex().equals("남");
```

### andThen()와 compose() 디폴트 메소드
- 함수적 인터페이스가 가지고있는 디폴트 메소드
- 두개의 함수적 인터페이스를 순차적으로 연결해 실행함.
- 첫번째 리턴값을 두번째 매개값으로 제공해서 최종결과를 리턴
- andThen()과 compose()의 차이점은 함수적 인터페이스부터 처리하느냐 임.
- andThen() 디폴트 메소드
  1. 인터페이스AB 의 method를 실행 시
  2. 인터페이스A 의 람다식의 결과값을 받아
  3. 인터페이스B 의 매개값으로 전달
  4. 최정결과를 리턴함.

```java
인터페이스 AB = 인터페이스 A.andThen(인터페이스 B);
최종결과 = 인터페이스 AB.method();
```
- compose() 디폴트 메소드
  1. 인터페이스 AB의 method 를 실행 시
  2. 인터페이스 B의 람다식의 결과값을 받아
  3. 인터페이스 A의 매개값으로 전달
  4. 최종결과를 리턴함.

```java
인터페이스 AB = 인터페이스 A.compose(인터페이스 B);
최종결과 = 인터페이스 AB.method();
```

- 함수적 인터페이스가 andThen()과 compose()를 제공하는지 알아보고 사용할것.
- andThen()의경우 대부분 제공하지만 compose()의 경우 아래의 메소들만 제공함.
  - compose() 디폴트 메소드를 제공하는 함수적 인터페이스
    - Function<'T,R>
    - DoubleUnaryOperator
    - IntUnaryOperator
    - LongUnaryOperator

#### Consumer 의 순차적 연결
- Consumer 종류의 함수적 인터페이스는 처리결과를 리턴하기 때문에 andThen() 디폴트 메소드는 함수적 인터페이스의 호출 순서만 정함.

```java
public static void main(String[] args) {
		Consumer<Member> consumerA = m -> {
			System.out.println(m.getName());
		};
		Consumer<Member> consumerB = m ->{
			System.out.println(m.getId());
		};
		Consumer<Member> consumerAB = consumerA.andThen(consumerB);
		consumerAB.accept(new Member("홍", "hong", null));
	}
```

### Function의 순차적 연결
- Function, Operator 종류의 함수적 인터페이스는 먼저 실행한 함수적 인터페이스의 결과를 다음 함수적 인터페이스의 매개값으로 넘겨주고 최종 결과를 리턴함.

```java
//예시
Function<Member, Address> functionA;
Function<Address, String> functionB;
Function<Member, String> functionAB;
String city;
functionA = m -> m.getAddress();
functionB = a -> a.getCity;

functionAB = functionA.andThen(functionB);
city = functionAB.apply(
  new Member("홍길동","hong",new Address("조선","한양"))
);

functionAB = functionB.compose(functionA);
city = functionAB.apply(
  new Member("홍길동","hong",new Address("조선","한양"))
);
```
- functionA의 두번째 매개변수 A는 functionB로 전달되는 매개값의 타입이고, functionB 의 첫번재 매개변수로 정의 되어있음.

- Address는 functionA 에서 functionB 로 전달되는 타입이고, 최종적으로 functionAB에서는 Member객체를 이용해 String 타입의 결과를 얻음


### and(), or() negate() 디폴트 메소드와 isEqual() 정적 메소드
- and(), or(), negate() 디폴트 메소드
  - Predicate 함수적 인터페이스의 디폴트 메소드
- and() : &&과 동일 - 두 Predicate 가 모두 true 를 리턴하면 최종적으로 true를 리턴
  - predicateAB = predicateA.and(predicateB);
- or() : `||`과 동일 - 두 predicate 중 하나만 true 리턴하면 최종적으로 true 를 리턴
  - predicateAB = predicateA.or(predicateB);
- negate() : !과 동일 - Predicate의 결과가 true 라면 false, false 라면 true를 리턴

- isEqual() 정적 메소드
  - Predicate<'T> 정적 메소드
  
  ```java
  Predicate<Object> predicate = Predicate.isEqual(targetObject);
  boolean result = predicate.test(sourceObject);
  ```
- Objects.equals(sourceObject, targetObject) 는 다음과 같은 리턴값을 제공함.

sourceObject | targetObject | 리턴값
---|---|---
null | null | true(주의 해야 함)
not null | null | false
null | not null | false
not null | not null | sourceObject.equals(targetObject)의 리턴값

### minBy(), maxBy() 정적 메소드
- BinaryOperator<`T`> 함수적 인터페이스의 정적 메소드
- comparator를 이용해 최대 T와 최소 T를 얻는 BinaryOperator<`T`> 를 리턴

리턴타입 | 정적 메소드
--- | ---
BinaryOperator<`T`> | minBy(Comparator<? super T> comperator)
BinaryOperator<`T`> | maxBy(Comparator<? super T> comperator)

- Comparator<`T`> 는 다음과 같이 선언된 함수적 인터페이스임. o1과 o2를 비교해서 o1이 작으면 음수를 동일하면 0, o1 이 크면 양수를 리턴해야하는 compare() 메소드가 선언되어있음.

```java
@Function
public interface Comparator<T>{
  public int compare(T o1, T o2);
}
```
- Comparator<T> 를 타겟 타입으로하는 람다식

```java
(o1, o2) -> {...; return int값;}
```

- 만약 o1과 o2가 int 타입이라면 다음과같이 integer.compare(int,int) 메소드를 이용가능
  - 만약 int 타입이 아니라면 직접 비교해서 return 하도록 작성

(o1, o2) -> integer.compare(o1,o2);


## 메소드 참조
- 메소드를 참조해서 매개변수의 정보 및 리턴 타입을 알아내어, 람다식에서 불필요한 매개 변수를 제거하는 것이 목적
- 종종 람다식은 기존 메소드를 단순하게 호출만 하는 경우가 있음.
  - (left, right) -> Math.max(left, right);
  - 위의 형태에서 left와 right 중복 사용을 줄여 아래와 같이 메소드 참조 형태로 사용 가능
  - Math::max;
- 메소드 참조도 람다식과 마찬가지로 인터페이스의 익명 구현 객체로 생성됨.
  - 타겟 타입에서 추상메소드의 매개변수 및 리턴타입에 따라 메소드 참조도 달라짐.
  - IntBinaryOperator 인터페이스는 두개의 int 매개값을 받아 int값을 리턴하므로 동일한 매개값과 리턴타입을 갖는 Math 클래스의 max() 메소드를 참조할 수 있음.
  - IntBinaryOperator operator = Math::max;

### 정적 메소드와 인스턴스 메소드 참조
- 정적메소드 참조 
  - 클래스::메소드
-인스턴스 메소드
  - 참조변수::메소드

### 매개변수의 메소드 참조

```java
(a,b) -> {a.instanceMethod(b)} -> 클래스::instanceMethod
```
- 왼쪽의 람다식을 메소드 참조로 구현하면 오른쪽과 같음
- 위에서 클래스는 a의 타입, a의 타입이 String 이면 클래스는 String 임
- 메소드 참조로 구현한 것을 보면, 클래스가 가지고있는 static 메소드를 참조한것처럼 보이지만 사실은 클래스의 인스턴스 메소드를 호출한 것.
- 그렇다면 static 메소드를 참조한것인지, 인스턴스 메소드를 참조한것인지 알수 있나??
  - 함수적 인터페이스의 추상메소드의 매개변수와 리턴타입을 보고 결정함.
  
  ```java
  public static void main(String[] args) {
		ToIntBiFunction<String, String> function;
		
		function = (a,b) -> a.compareToIgnoreCase(b);
		print(function.applyAsInt("jaja", "ajaj"));
		
		function = String::compareToIgnoreCase;
		print(function.applyAsInt("jaju", "jaju"));
	 }
		
		public static void print(int order) {
			if(order<0) {System.out.println("사전순");}
			else if(order == 0) {System.out.println("동일문자");}
			else {System.out.println("다른문자");}
		}
  ```

### 생성자 참조
```java
(a,b) -> {return new 클래스(a,b);} -> 클래스::new
```
- 람다식의 실행부에 객체를 생성하고 리턴하는 코드만있다면 오른쪽과 같이 생성자 참조를 사용 가능함.
- 생성자의 매개값의 타입과 수는 생성자 참조가 대입되는 함수적 인터페이스의 추상 메소드가 어떻게 선언되어 있느냐에 따라서 결정 됨.

```java
	public static void main(String[] args) {
		Function<String, nMember> function1 = nMember::new;
		nMember member = function1.apply("하이");
		
		BiFunction<String, String, nMember> function2 = nMember::new;
		nMember member2 = function2.apply("매개", "두놈");
	}

  public class nMember {
	private String name;
	private String id;
	
	public nMember() {
		System.out.println("Member() 실행");
	}
	public nMember(String id) {
		System.out.println("String id 실행");
		this.id = id;
	}
	public nMember(String name, String id) {
		System.out.println("Member(name,id) 실행");
		this.name = name;
		this.id = id;
	}
	public String getId() {
		return id;
	}
}
```
{% endraw %}
