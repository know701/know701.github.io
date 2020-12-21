---
date: 2020-12-15
title: "Generic"
categories: Java
tags: Java
# 목차
toc: true  
toc_sticky: true 
---

# 제네릭

## 왜 제네릭을 사용해야 하는가?
- 제네릭 타입을 이용함으로써 잘못된 타입이 사용될 수있는 문제를 컴파일 과정에서 제거할 수 있음.
- 제네릭은 클래스와 인터페이스 그리고 메소드를 정의할때 타입(type)을 파라미터(parameter)로 사용할 수 있도록 해줌.

**컴파일 시 강한 타입 체크를 할 수있음.**
- 실행 시 타입 에러가 나는것보다는 컴파일 시 미리 타입을 강하게 체크해서 에러를 사전에 방지함.

**타입변환(casting)을 제거한다.**
- 비제네릭 코드는 불필요한 타입 변환을 하기 때문에 프로그램 성능에 악영향을 끼침

```java
List list = new ArrayList();
list.add("hello");  //list.add 시 자동 Object 타입으로 타입변환됨.
String str = (String) list.get(0); // Object 타입에서 String 타입 변환 후 변수에 담을 수 있음

//제네릭 코드로 수정
List<string> list = new ArrayList<String>(); //String 으로 지정된 타입만 받을수 있도록 정해둠.
list.add("hello");
String str = list.get(0); //타입변환을 하지않음.
```


## 제네릭 타입 (class<T>, interface<T>)
- 제네릭 타입은 **타입을 파라미터로 가지는 클래스와 인터페이스**를 말함.
  - 제네릭 타입은 **이름뒤에 <> 부호가 붙고, 사이에 파라미터가 위치**

```java
public class 클래스명<T>{...}
public interface 인터페이스명<T>{...}
```
- 타입 파라미터는 대문자 일파벳 한글자로 표현, 실제 코드에서 사용 시 타입 파라미터에 구체적인 타입을 지정해서 사용

```java
//타입 파라미터 사용 이유
public void set(Object object){ this.objec = object; }
public Object get(){ return object; }
```
- Object 타입으로 선언한 이유는 필드에 모든 종류의 객체를 담기 위해서
  > 자식 객체는 부모타입에 대입할 수 있다는 성질때문에 모든 자바 객체는 Object 타입으로 자동 타입변환 후 저장

- 만약 필드에 저장된 원래 타입의 객체를 얻으려면 강제 타입 변환을 해야함.
- Object 타입을 사용하면 모든 종류의 자바 객체를 저장할 수있다는 장점은 있지만, 저장할 때 타입변환 후 읽어올 때 또 한번 타입변환이 발생하므로 성능에 좋지못한 결과를 가져옴

```java
public class Box<T>{ //타입 파라미터 T를 사용
  private T t;
  public T get() { return t; }
  public void set(T t) {this.t = t;}
}

// 필드 타입이 String 으로 변경되어 String 타입만 매개값으로 받을 수 있게 변경 가능.
public class Box<String>{
  private String t;
  public void set(String t) {this.t = t;}
  public String get() {return t;}  
}

// T는 Box 클래스로 객체를 생성할 때 구체적인 타입으로 변경 됨.
Box<String> box = new Box<String>();
box.set("hello");
String str = box.get();
```
- 제네렉은 클래스를 설계할 때 구체적인 타입을 명시하지 않고, **타입 파라미터로 대체 했다가 실제 클래스가 사용될 시 구체적인 타입을 지정함**으로 써 타입변환을 최소화 함.



## 멀티 타입 파라미터(class<K,V...>, interface<K,V,...>)
```java
class 클래스명<K,V...>{}
interface 인터페이스명<K,V,...>{}
 
Product<int, String> product = new Product<int, String>();

Product<int, String> product = new Product<>(); //위와 동일 코드, 유추해서 자동으로 설정해줌.
```
- 제네릭 타입은 두개 이상의 멀티 타입 파라미터를 사용 가능함.



## 제네릭 메소드(<T,R>R method(T t))
- **매개 타입과 리턴타입으로 타입 파라미터를 갖는 메소드**
 
```java
public <타입파라미터> 리턴타입 메소드명(매개변수){..}

public <T> Box<T> boxing(T t) {...}  
```
- 리턴 타입 앞에 <>기호 추가하고 타입 파라미터를 기술
- 타입 파라미터를 리턴타입과 매개변수에 사용

- 제네릭 메소드 호출 방식

```java
리턴타입 변수 = <구체적 타입> 메소드명(매개값);
Box<Integer> box = <Integer>boxing(100);
//명시적으로 구체적 타입 지정

리턴타입 변수 = 메소드명(매개값);
Box<Integer> box =  boxing(100);
// 매개값을 보고 구체적 타입을 추정
```

**실습예제**

```java
public class Util {
	public static <K, V> boolean compare(Pair<K,V> p1, Pair<K,V> p2) {
		boolean keyCompare = p1.getKey().equals(p2.getKey());
		boolean valueCompare = p1.getValue().equals(p2.getValue());
		return keyCompare && valueCompare;
	}
}
```

```java
public class Pair<K, V> {
	private K key;
	private V value;
	
	public Pair(K key, V value){
		this.key = key;
		this.value = value;
	}

	public K getKey() {
		return key;
	}

	public void setKey(K key) {
		this.key = key;
	}

	public V getValue() {
		return value;
	}

	public void setValue(V value) {
		this.value = value;
	}
}

```

```java
public class CompareMethod {
	public static void main(String[] args) {
		Pair<Integer, String> pa = new Pair<Integer, String>(1, "타입"); //제네릭 메소드
		Pair<Integer, String> pb = new Pair<Integer, String>(100, "String"); //제네릭 메소드
		//Util 의 메소드를 명시적으로 지정
		boolean result1 = Util.<Integer, String>compare(pa, pb); //Util 메소드 불러옴.
                   // Util.compare(pa, pb); 유추 하도록 지정 가능함.
		System.out.println(result1); //false
	}
}
```

## 제한된 타입 파라미터
**타입 파라미터에 지정되는 구체적인 타입을 제한**

```java
public <T extends 상위타입> 리턴타입 메소드(매개변수, ...){...}
```
- 제한된 파라미터 선언
  - 타입 파라미터 뒤에 extends 키워드를 붙인뒤 상위 타입 명시
    - 상위 타입은 클래스와 인터페이스 가능(인터페이스 implements 사용안함)
    - 메소드의 중괄호 {}안에 타입 파라미터 변수로 사용 가능한것은 상위 타입의 멤버로 제한, 하위 타입에만 있는 필드와 메소드는 사용 불가

```java
public <T extends Number> int compare(T t1, T t2){
  double v1 = t1.doubleValue(); // Number 의 doubleValue() 메소드 사용
  double v2 = t2.doubleValue(); // Number 의 doubleValue() 메소드 사용
  return Double.compare(v1, v2);
}
```
## 와일드카드(?) 타입
-  제네릭 타입을 매개값이나 리턴타입으로 사용할 때 구체적인 타입 대신 와일드 카드 사용 가능
  
  1. 제네릭타입<?> : Unbounded wildcards(제한 없음)
    - 타입 파라미터를 대치하는 구체적인 타입으로 모든 클래스나 인터페이스 타입 올 수 있음.
  2. 제네릭타입<? extends 상위타입> : Upper Bounded Wildcards(상위 클래스 제한)
    - 타입 파라미터를 대치하는 구체적인 타입으로 상위 타입이나 하위타입만 올 수 있음. (상위 타입이 해당자리에 들어갈 수 있는 가장 상위 타입)
  3. 제네릭타입<? super 하위타입> : Lower Bounded Wildcards(하위 클래스 제한)
    - 타입 파라미터를 대치하는 구체적인 타입으로 하위 타입이나 상위타입이 올 수 있음. ( 하위 타입이 해당 자리에 들어갈 수 있는 가장 하위 타입)


## 제네릭 타입의 상속과 구현
- 제네릭 타입도 부모 클래스가 될 수 있다.

```java
public class Child<T,M,C> extends Parent<T, M> {...}
```
- 자식 제네릭 타입은 추가적으로 타입 파라미터를 가질 수 있음.
