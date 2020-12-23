---
date: 2020-12-19
title: "스트림과 병렬처리"
categories: Java
tags: Java
# 목차
toc: true  
toc_sticky: true 
---

## 스트림 소개
#### 스트림은 반복자
컬렉션(배열 포함)의 요소를 하나씩 참조해서 람다식으로 처리할 수 있는 반복자임.

- java 7 이전 코드
```java
List<String> list = Arrays.asList("홍길동", "도우너", "마이콜");
Iterator<String> iterator = list.iterator();
while(iterator.hasNext()){
    String name = iterator.next();
    System.out.println(name);
}
```
- java 8 이후 코드
```java
List<String> list = Arrays.asList("홍길동", "도우너", "마이콜");
Stream<String> stream = list.stream();
stream.forEach(name -> System.out.println(name));
```

#### 스트림 특징
- 람다식으로 요소 처리 코드를 제공
  - 스트림이 제공하는 대부분의 요소 처리 메소드는 함수적 인터페이스 매개타입을 가짐.
  - 매개값으로 람다식 또는 메소드 참조를 대입할 수 있음.
```java
public static void main(String[] args) {
    List<Student> list = Arrays.asList(
            new Student("홍길동", 100),
            new Student("고길동", 50)
            );
    
    Stream<Student> stream = list.stream();
    stream.forEach(s ->{
        String name = s.getName();
        int score = s.getScore();
        System.out.println(name + score);
    });
}
```
- 내부 반복자를 사용하므로 병렬 처리가 쉬움.
  - 외부 반복자(external iterator)
    - 개발자가 코드로 직접 컬렉션 요소를 반복해서 요청하고 가져오는 코드 패턴
  - 내부 반복자(internal iterator)
    - 컬렉션 내부에서 요소들을 반복시키고 개발자는 요소당 처리해야할 코드만 제공하는 코드 패턴
  - 내부 반복자 이점
    - 개발자는 요소 처리 코드에만 집중
    - 멀티코어 CPU를 최대한 활용하기 위해 요소들을 분배시켜 병렬 처리 작업을 할 수 있음.
  - 병렬(parallel)처리
    - 한가지 작업을 서브 작업으로 나눈 뒤
      - 서브 작업들을 분리된 스레드에서 병렬적으로 처리 후
        - 서브 작업들을 최종 결합하는 방법
    - 자바는 ForkJoinPool 프레임워크를 이용해 병렬 처리 함.

- 병렬처리 코드 예제
```java
public static void main(String[] args) {
		List<String> list = Arrays.asList("고길동","마이콜","도우너","둘리","희동이");
		
		Stream<String> stream = list.stream();
		stream.forEach(ParallelEx::print);
		
		Stream<String> parallelStream = list.parallelStream();
		parallelStream.forEach(ParallelEx::print);
	}
	public static void print(String string) {
		System.out.println(string + " : " + Thread.currentThread().getName());
	}
```
```java
고길동 : main
마이콜 : main
도우너 : main
둘리 : main
희동이 : main
도우너 : main
둘리 : ForkJoinPool.commonPool-worker-2
고길동 : ForkJoinPool.commonPool-worker-2
희동이 : main
마이콜 : ForkJoinPool.commonPool-worker-1
```

- 스트림은 중간 처리와 최종 처리를 할 수 있음.
  - 중간 처리 : 요소들의 매핑, 필터링, 정렬
  - 최종 처리 : 반복, 카운트, 평균, 총합
```java
public static void main(String[] args) {
    List<Student> list = Arrays.asList(
        new Student("고길동", 90),
        new Student("도우너", 92),
        new Student("마이콜", 100)			
    );

    double avg = list.stream().mapToInt(Student::getScore).average().getAsDouble();
    System.out.println("평균 : " + avg);
}
```

## 스트림의 종류
#### 스트림으 포함된 패키지
- 자바 8부터 java.util.stream 패키지에서 인터페이스 타입으로 제공
  - 모든 스트림에서 사용할 수 있는 공통 메소드들이 정의되어 있는 BaseStream 아래에 객체와 타입 요소를 처리하는 스트림이 있음.
  - BaseStream은 공통 메소드들이 정의되어 있고, 코드에서 직접적으로 사용하지 않음.
  - BaseStream
    - Stream
    - IntStream
    - LongStream
    - DoubleStream

#### 컬렉션으로부터 스트림 얻기
```java

```