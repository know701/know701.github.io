---
date: 2020-11-27
title: "상속"
categories: Java
tags: Java
# 목차
toc: true  
toc_sticky: true 
---

# 상속
- 부모클래스의 멤버를 자식클래스에게 물려주는것.
- 부모 클래스 = 상위 클래스, 자식 클래스= 하위 클래스 / 파생 클래스
- 부모클래스에서 **private** 접근 제한을 갖는 멤버(필드,메소드) 는 상속 대상에서 제외

## 클래스 상속
```java
class 자식클래스 extends 부모클래스{}
```
- 다중상속 허용하지 않음 extends 뒤에는 하나의 부모클래스만 옴.

## 부모생성자 호출
- 생성자가 명시적으로 선언되지 않았다면 컴파일러는 기본생성자 ``` super(); ``` 를 생성함.
- **super()**는 부모의 기본 생성자(접근제한자 className(){})를 호출 (기본 생성자가 존재해야함.)
- super() 는 반드시 **자식 생성자 첫줄에 위치** 해야함.

## 메소드 재정의 (@OVerride)
- 자식클래스가 사용하기에는 적합하지 않은 메소드가 있다면 상속된 일부 메소드는 자식 클래스에서 다시 수정 해야함

- 오버라이딩 주의사항
1. 부모의 메소드와 동일한 시그니처(리턴 타입, 메소드 이름, 매개변수 리스트) 를 가져야함.
2. 접근 제한을 더 강하게 오버라이딩할 수 없다. (default > public 변환가능)
3. 새로운 예외(Exception)를 throws 할수 없음.

- Overriding 메소드 자동생성 기능
> Source > Override/Implement Methods...

### 부모 메소드 호출(super)
- 자식 클래스에서 부모 클래스의 메소드를 오버라이딩 시 부모 클래스의 메소드는 숨겨짐.
> 명시적으로 ```super.부모메소드``` 를 호출하면 호출 가능함.

## final 클래스와 final 메소드

### 상속 불가 final 클래스
- 클래스 선언 시 final 키워드를 class 앞에 붙이게 되면 최정적인 클래스이므로 **상속 할 수 없는 클래스**가 된다.
```java
public final class 클래스{}
```

### 오버라이딩 불가 final 메소드
- 메소드 선언 시 **final 키워드를 붙이면 오버라이딩 할수 없는 메소드**가 됨.

## protected 접근 제한자
- **다른 패키지에서는 자식 클래스만 접근 허용**함.(필드,생성자,메소드 선언에 사용 될수있음)

## 타입 변환과 다형성
- 다형성이란 하나의 객체를 여러 개의 타입으로, 하나의 타입으로 여러 종류의 객체를 여러 가지 모습으로 해석될 수 있는 성격
> 여러 객체를 대입함으로써 다양한 기능을 이용하도록 해주며 부모 타입에 모든 자식 객체 대입 가능
- 타입 변환이란 데이터 타입을 다른 데이터 타입으로 변환하는 행위

### 자동 타입 변환(Promotion)
- 자동 타입변환이란 프로그램 실행 중 자동적으로 타입변환이 일어나는것을 말함.
> 자식은 부모의 특징과 기능을 상속받기 때문에 부모와 동일하게 취급될 수 있다는 것 (ex : 고양이는 동물의 특징과 기능을 상속받음)
```java
Cat cat = new Cat();
Animal animal = cat;
또는 Animal animal = new Cat(); 선언 시 자동타입 변환이 일어남
```
- 메소드가 자식 클래스에서 오버라이딩 되었다면 자식클래스의 메소드가 대신 호출되며, 타입변환 이후에는 자식클래스에서만 가지고있는 메소드는 호출 불가능함.

### 필드의 다형성
- 다형성을 구현하는 기술적 방법 때문에 사용, 다형성이란 동일한 타입을 사용하지만, 다양한 결과가 나오는 성질을 말한다.주로 필드의 값을 다양화 함으로써 실행 결과가 다르게 나오도록 구현하는데 필드의 타입은 변함이 없지만, 실행 중 어떤 객체를 필드로 저장하느냐에 따라 실행 결과가 달라짐

### 하나의 배열로 객체 관리
```java
class Car{
 Tire[] tires ={
   new Tire("앞 왼쪽", 6),
   new Tire("앞 오른쪽", 3),
   ...
 };
}
```
- 배열타입은 부모객체 지만, 실제 저장항목이 자식객체라면 자동 타입 변환이 발생하기 때문에 문제 없이 대입 가능

```tires[i] = new KumhoTire("앞오른쪽", 13);```
### 매개 변수의 다형성
- 자동타입 변환은 필드값 대입할때도 발생하지만, 주로 메소드를 호출할때 많이 발생함.
```java
class Driver{
    void drive(Vehicle vehicle){
        vehicle.run();
    }
}
Driver driver = new Driver();
Vehicle vehicle = new Vehicle();
driver.drive(vehicle); // 자동 타입변환 발생
```
- 메소드 호출 시 매개변수의 타입과 동일한 매개값을 지정하는것이 정석이지만, 매개값을 다양화 하기위해 매개변수에 자식타입 객체를 지정 가능함.
> 만약 Vehicle 의 자식 클래스인 Bus 객체를 drive(); 메소드에 매개값으로 넘기면 자동타입 변환 발생 함.

```java
void dirve(Vehicle Vehicle){
   Vehicle.run();
}
```
- **매개변수의 타입이 클래스일 경우, 해당 클래스의 객체 뿐 아니라, 자식객체까지도 매개값으로 사용할 수 있음.**
> 매개값으로 어떤 자식 객체가 제공되느냐에 따라 메소드의 실행 결과는 다양해짐(매개변수의 다형성), 자식 객체가 부모의 메소드를 재정의(오버라이딩) 했다면 메소드 내부에서 오버라이딩된 메소드를 호출함으로써 메소드의 실행 결과는 다양해짐.

### 강제 타입 변환 (Casting)
- 강제 타입 변환(Casting)은 부모 타입을 자식 타입으로 변환하는것
- 자식 타입이 부모타입으로 자동 변환 후 다시 **자식타입으로 변환할때 강제 타입변환 사용 가능**
- 강제 타입변환은 자식 타입이 부모타입으로 변환되어 있는 상태에서만 가능함.
> 부모타입의 변수가 부모 객체를 참조할 경우 자식타입으로 변환 불가

``` java
   자식클래스 변수 = (자식클래스) 부모클래스타입;
                               // 자식타입이 부모타입으로 변환된 상태                     
Parent parent = new Parent();
Child child = (Child) parent; // 타입 변환 불가

```

### 객체 타입 확인 (instanceof)
- 부모 변수가 참조하는 객체가 부모 객체인지 자식객체인지 확인하는 연산자
``` boolean result = 좌항(객체) instanceof 우항(타입)```

## 추상 클래스(abstract)
- 추상은 실체간에 공통되는 특성을 추출한 것을 말함.
> 객체를 직접 생성할 수 있는 클래스를 **실체 클래스**, 실체 클래스들의 **공통적인 특성을 추출해서 선언한 클래스를 추상 클래스** 라고 함. 추상,실체 클래스는 서로 상속의 관계를 가지고 있는데 추상클래스는 부모이고, 
실체 클래스가 자식으로 구현되어 실체 클래스는 추상클래스의 모든 특성(필드, 메소드)을 물려받고, 추가적인 특성을 가질 수 있다. 추상클래스는 실체 클래스의 공통되는 특성을 추출해서 만들었기 때문에 new 연산자를 사용해 인스턴스를 생성하지 못며 추상 클래스는 새로운 실체 클래스를 만들기 위해 부모 클래스로만 사용된다. ``` class Ant extends Animal{...}```

- 추상 메소드를 0개이상 가지고있는경우, 추상메소드를 하나이상 가지고있다면, 해당 클래스는 반드시 추상 클래스, 일반 필드, 일반 메소드를 가질 수 있음.


### 추상클래스의 용도
1. 실체 클래스들의 공통된 필드와 메소드의 이름을 통일할 목적
  - 실체 클래스를 설계하는 사람이 여러 사람일 경우, 실체 클래스마다 필드와 메소드가 제각기 다른 이름을 가지게 될 수있으며, 또한 동일한 데이터와 기능임에도 불구하고 이름이 다르다 보니, 객체마다 사용 방법이 달라짐.(필드와 메소드 이름을 통일 시킬수 있음)
2. 실체 클래스를 작성할 때 시간을 절약
  - 실체 클래스마다 다른점만 실체 클래스에 선언하게 되면 실체 클래스를 작성하는데 시간을 절약 가능함. 설계 시 내용을 추려내어 추상클래스로 설계 규격을 만드는것이 좋음.

### 추상클래스 선언
- 추상클래스를 선언할 때에는 클래스 선언에 abstract 키워드를 붙이며, abstract 를 붙이게 되면 new  연산자를 이용해 객체를 만들지 못하고 상속을 통해 자식클래스만 만들 수 있음.
```java
public abstract class 클래스{
    //필드
    //생성자
    //메소드
}
```

### 추상 메소드와 오버라이딩
- 추상클래스는 실체 클래스가 공통적으로 가져야 할 필드와 메소드들을 정의해 놓은 추상적인 클래스 이므로 실체 클래스의 멤버를 통일화 하는데 목적이 있음.
- 모든 실체들이 가지고 있는 메소드의 실행 내용이 동일하다면 추상 클래스에 메소드를 작성하는것이 좋음.
> 그러나 메소드만 통일화 하고 실행 내용은 실체 클래스마다 달라야 하는 경우도 존재 하는데, 이런 경우 추상클래스는 추상 메소드 선언이 가능함. 추상 메소드는 추상 클래스에서만 선언이 가능하며, 메소드 선언부만 있고 메소드 실행 내용인 중괄호 {}가 없는 메소드, 추상 클래스를 설계할때 하위클래스가 반드시 실행 내용을 채우도록 강요하고 싶은 메소드가 있을 경우, 해당 메소드를 추상 메소드로 선언
```java
[public || protected] abstract 리턴타입 메소드명(매개변수);  // 중괄호 미존재
``` 