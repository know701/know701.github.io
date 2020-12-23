---
date: 2020-12-19
title: "collection"
categories: Java
tags: Java
# 목차
toc: true
toc_sticky: true
---


## 컬렉션 프레임워크
- 컬렉션
  - 사전적 의미로 요소(객체)를 수집해 저장하는것
- 배열의 문제점
  - 저장할 수 있는 객체 수가 배열을 생성할 때 결정
    - 불특정 다수의 객체를 저장하기에는 문제
  - 객체를 삭제했을 때 해당 인덱스가 비게됨.
    - 객체를 저장하기위해선 어디가 비었는지 확인해아함.
- 컬렉션 프레임워크
  - 객체들을 효율적으로 추가, 삭제, 검색 할수있도록 제공되는 컬렉션 라이브러리
  - java.util 패키지에 포함
  - 인터페이스를 통해서 정형화된 방법으로 다양한 컬렉션 클래스를 이용

### 컬렉션 프레임워크의 주요 인터페이스
- **List**
  - 배열과 유사하게 인덱스로 관리
- **Set**
  - 집합과 유사, 구슬 주머니에 객체를 저장하는 것과 같은 형태
- **Map**
  - 키와 값의 쌍으로 관리

인터페이스의 종류| 분류 | 특징 | 구현 클래스
---|---|---|---
Collection | List | 순서를 유지하고 저장, 중복 저장 가능 | ArrayList, Vector, LinkedList
Collection | Set | 순서를 유지하지않고 저장, 중복저장 안됨 | HashSet, TreeSet
 | Map | 키와 값의 쌍으로 저장, 키는 중복 저장 안됨 | HashMap, Hashtable, TreeMap, Properties


## List 컬렉션
### List 컬렉션의 특징 및 주요 메소드
- 특징
  - 인덱스로 관리
  - 객체 자체를 저장하는것이 아닌 객체의 번지를 참조
  - 중복해서 객체 저장 가능 (중복된 객체의 번지가 참조됨.)
- 구현 클래스
  - ArrayList
  - Vector
  - LinkedList

기능|메소드|설명
---|---|---
객체 추가 | boolean add(E e) | 주어진 객체를 맨끝에 추가
 | void add(int index, E element) | 주어진 인덱스에 객체를 추가
 | E set(int index, E element) | 주어진 인덱스에 저장된 객체를 주어진 객체로 바꿈
객체 검색 | boolean contains(Object o) | 주어진 객체가 저장되어 있는지 여부
 | E get(int index) | 주어진 인덱스에 저장된 객체를 리턴
 | boolean isEmpty() | 컬렉션이 비어 있는지 조사
 | int size() | 저장되어 있는 전체 객체 수를 리턴
객체 삭제 | void clear() | 저장된 모든 객체를 삭제
 | E remove(int index) | 주어진 인덱스에 저장된 객체를 삭제
 | boolean remove(Object o) | 주어진 객체를 삭제

- 전체 객체를 대상으로 반복해서 얻기(저장된 총 객체수만큼 루핑)

```java
List<String> list =  new ArrayList<>;
for(int i = 0; i < list.size(); i++){
  String str = list.get(i);
}
또는
for(String str : list){
  ...
}
```

### ArrayList
- 저장 용량(capacity)
  - 초기 : 10
  - 초기 용량 지정 가능
  - 저장 용량을 초과한 객체들이 들어오면 자동적으로 늘어남.
- 객체 제거
  - 바로 뒤 인덱스부터 마지막 인덱스까지 모두 앞으로 1씩 당겨짐.
- 고정된 객체들로 구성된 List 생성
  ```java
  List<T> list = Arrays.asList(T ... a);
  ```
  - 자동 언박싱
  
  ```java
  List<String> list1 = Arrays.asList("java0", "java1","java2");
  for(String name : list1){
   ...
  }
  List<Integer> list2 = Arrays.asList(1,2,3);
  for(int val : list2){
    ...
  }
  ```
### Vector

```java
List<E> list = new Vector<>();
```
- 특징
  - Vector는 스레드 동기화(synchronization)가 되어있기 때문에 복수의 스레드가 동시에 Vector 에 접근해서 객체를 추가,삭제 하더라도 안전하다.
  - 그렇기 때문에 멀티스레드 환경에서 index로 데이터를 관리하고싶은 경우 Vector 를 사용하는것이 안전
  - 반면 싱글스레드 환경에서는 ArrayList를 사용하는것이 더 빠름(synchronized 처리가 되어있지 않기때문)

```java
//예제
public static void main(String[] args) {
		List<Board> list = new Vector<Board>();
		
		list.add(new Board("뻘글1", "뻘글", "익명"));
		list.add(new Board("뻘글2", "뻘글", "익명"));
		list.add(new Board("뻘글3", "뻘글", "익명"));
		list.add(new Board("뻘글4", "뻘글", "익명"));
		list.add(new Board("뻘글5", "뻘글", "익명"));
		
		list.remove(2); //2번 인덱스 삭제 시 뒤의 인덱스 하나씩 당겨짐.
		list.remove(3);
		
		for(Board board : list) {
			System.out.println(board);
		}
	}
```

### LinkedList

```java
List<E> list = new LinkedList<>();
```
- 특징
  - 인접 참조를 링크해서 체인처럼 관리
  - 특정 인덱스에서 객체를 제거하거나, 추가하게되면 바로 앞뒤 링크만 변경
  - 빈번한 객체 삭제와 삽입이 일어나는곳에서는 ArrayList보다 좋은 성능을 발휘(특정 인덱스일 경우 훨씬 더)

```java
//예제
	public static void main(String[] args) {
		List<String> arrayList = new ArrayList<>();
		List<String> linked = new LinkedList<>();
		
		long startTime;
		long endTime;
		
		startTime = System.nanoTime();
		for(int i =0; i < 100000; i++) {
			arrayList.add(0, String.valueOf(i));
		}
		endTime = System.nanoTime();
		System.out.println("걸린시간  : " + (endTime - startTime));
		
		startTime = System.nanoTime();
		for(int i =0; i < 100000; i++) {
			linked.add(0, String.valueOf(i));
		}
		endTime = System.nanoTime();
		System.out.println("걸린시간  :"+(endTime - startTime));
	}

```

## Set
- 특징
  - 저장순서가 유지되지 않음.
  - 객체를 중복저장 할수 없음 
  - 하나의  null 만 저장 가능.
  - 수학의 집합에 비유될 수 있음

- 구현 클래스
  - HashSet,LinkedHashSet,TreeSet

기능 | 메소드 | 설명
--- | --- | ---
객체추가| boolean add(E e) | 주어진 객체를 저장, 객체가 성공적으로 저장되면 true를 리턴하고 중복객체면 false 를 리턴
객체검색| boolean contains(Object o) | 주어진 객체가 저장되어 있는지 여부
 | boolean isEmpty() | 컬렉션이 비어 있는지 조사
 | Iterator<`E`> iterator() | 저장된 객체를 한번씩 가져오는 반복자 리턴
 | int size() | 저장되어 있는 전체 객체 수 리턴
객체삭제| void clear() | 저장된 모든 객체를 삭제
 | boolean remove(Object o) | 주어진 객체를 삭제

```java
//객체 추가 및 삭제
Set<String> set = ...;
set.add("이름"); //객체 추가
Set.remove("이름"); //객체 삭제
```
- Set은 인덱스로 객체를 검색해서 가져오는 메소드가 없음.
- 대신 전체 객체를 대상으로 한번씩 반복해서 가져오는 반복자(Iterator)을 제공

```java
Set<String> set = ...;
Iterator<String> iterator = set.iterator();
```

리턴타입 | 메소드명 | 설명
boolean | hasNext() | 가져올 객체가 있으면 true를 리턴하고 없으면 false를 리턴
E | next() | 컬렉션에서 하나의 객체를 가져옴
void | remove() | Set 컬렉션에서 객체를 제거

```java
Set<String> set = ...;
Iterator<String> iterator = set.iterator();
while(iterator.hasNext()){
  String str = iterator.next();
}
or
for(String str : set){
  ...;
}

```
- 반복자를 통한 객체 제거
  - iterator 의 메소드이지만 set컬렉션의 객체가 제거됨.

```java
while(iterator.hasNext()){
  String str = iterator.next();
  if(str.equals("홍길동")){
    iterator.remove();
  }
}
```

### HashSet

```java
Set<E> set = new HashSet<E>();
```
- 특징
  - 동일 객체 및 동등 객체는 중복 저장하지 않음.
  - 동등 객체 판단 방법
    - 두 객체의 hashCode()의 리턴값이 같을 경우, 다시 두 객체의 equals()의 리턴값을 비교하여 같을 경우 동등한 객체로 판단
    - hashCode() 리턴값이 다르거나, hashCode() 리턴값은 같지만 equals() 의 리턴값이 다른경우 다른객체로 판단

```java
//hashCode(), equals() Override
public class Member {
	public String name;
	public int age;
	
	public Member(String name, int age) {
		this.name = name;
		this.age = age;
	}

	@Override
	public boolean equals(Object object) {
		if(object instanceof Member) {
			Member member =  (Member)object;
			return member.name.equals(name) && member.age == age;
		} else {
			return false;
		}
	}
	@Override
	public int hashCode() {
		return Objects.hash(name, age);
	}
}


public class HashSetHashCode {
	public static void main(String[] args) {
		Set<Member> set = new HashSet<>();
		
		set.add(new Member("홍길동", 27));
		set.add(new Member("홍길동", 27));
		
		System.out.println("총객체 수 : " + set.size());
	
	}
}
```

## Map
- 특징
  - 키와 값으로 구성된 Map.Entry 객체를 저장하는 구조
  - 기존 저장된 키값과 동일한 키로 값을 저장 시 기존 값은 없어지고 새로운 값으로 대체됨.
  - 키와 값은 모두 객체
  - 키는 중복될 수 없지만 값은 중복 저장 가능
- 구현 클래스
  - HashMap, Hashtable, LinkedHashMap, Properties.TreeMap

기능 | 메소드 | 설명
객체추가| V put(K key, V value) | 주어진 키로 값을 저장. 새로운 키면 null 을 리턴하고 동일한 키가 있을 경우 값 대체, 이전값 리턴
객체검색| boolean containsKey(Object key) | 주어진 키가 있는지 여부
 | boolean containsValue(Object value) | 주어진 값이 있는지 여부
 | Set<`Map.Entry<K,V>>entrySet()`> | 키와 값의 쌍으로 구성된 모든 Map.Entry 객체를 Set에 담아서 리턴
 | V get(Object key) | 주어진 키가 있는 값을 리턴
 | boolean isEmpty() | 컬렉션이 비어있는지 여부
 | Set<`K`> keySet() | 모든 키를 Set 객체에 담아서 리턴
 | int size() | 저장된 키의 총 수를 리턴
 | Collection<`V`> values() | 저장된 모든 값을 Collection에 담아서 리턴
객체삭제| void clear() | 모든 Map.Entry(키와 값)을 삭제
 | V remove(Object key) | 주어진 키와 일치하는 Map.Entry 를 삭제하고 값을 리턴

- 객체 추가, 찾기 삭제

```java
Map<String, Integer> map = ...;
map.put("홍길동", 30);
int score = map.get("홍길동");
map.remove("홍길동");
```

- 전체 객체 대상으로 반복해서 얻기
  - Key-Value 쌍을 반복적으로 다루기 위해서 Set인터페이스 형태로 keySet 과 entrySet을 저장하고 iterator를 이용해 반복 접근

```java
Map<K,V> map = ...;
Set<K> keySet = map.keySet();
Iterator<K> keyIterator = keySet.iterator();
while(keyIterator.hashNext()){
  K key = keyIterator.next();
  V value = map.get(key);
}
```

```java
Set<Map.Entry<K,V>> entrySet = map.entrySet();
ITerator<Map.Entry<K,V>> entryIterator = entrySet.iterator();
while(entryIterator.hashNext()){
  Map.Entry<K,V> entry = entryIterator.next();
  K key = entry.getKey();
  V value = entry.getValue();
}
```

### HashMap

```java
Map<K,V> map = new HashMap<K,V>();
```
- 특징
  - 키 객체는 hashCode()와 equals()를 재정의해서 동등객체가 될 조건을 정해야 함.
    - 두 객체의 hashCode()의 리턴값이 같을 경우 다시 두객체의 equals()의 리턴값을 비교해서 같을경우 동등 객체로 판단
    - hashCode() 리턴값이 다르거나, hashCodE() 리턴값은 같지만 equals의 리턴값이 다른경우 다른 객체로 판단
  - 키 타입은 String 을 많이 사용함.
    - String 은 문자열이 같을 경우 동등 객체가 될 수 있도록 hashCode()와 equals 메소드가 재정의 되어있기 때문

### Hashtable

```java
Map<K,V> map = new Hashtable<>();
```
- 특징
  - 키 객체는 hashCode()와 equals()를 재정의해서 동등객체가 될 조건을 정해야 함.
    - 두 객체의 hashCode()의 리턴값이 같을 경우 다시 두객체의 equals()의 리턴값을 비교해서 같을경우 동등 객체로 판단
    - hashCode() 리턴값이 다르거나, hashCodE() 리턴값은 같지만 equals의 리턴값이 다른경우 다른 객체로 판단
  - Hashtable은 스레드 동기화(synchronization)가 되어 있기 때문에 복소의 스레드가 동시에 Hashtable에 접근 후 객체를 추가, 삭제 하더라도 스레드에 안전 함.
    - ArrayList 와 Vector의 관계와 같음.
    - 멀티스레드 환경에서는 Hashtable 을 사용하는것이 안전하며, 싱글스레드 환경에서는 동기화 처리가 되지않은 HashMap을 이용하는것이 성능에 더 좋음.
- 기본 사용법은 HashMap 과 같음(Thread Safe 여부만 다름)

### Properties
- 특징
  - 키와 값을 String 타입으로 제한한 Map 컬렉션
  - Properties 는 프로퍼티(~.properties) 파일을 읽어 들일 때 주로 사용함.

- 프로퍼티 파일
  - 옵션정보, 데이터베이스 연결정보, 국제화(다국어) 정보를 기록한 텍스트 파일로 활용
  - 애플리케이션에서 주로 변경이 잦은 ㅁ문자열을 저장해서 유지보수를 펺리하게 만들어줌.

```java
driver=oracle.jdbc.Oracledriver
url=jdbc:oracle:thin@localhost:1521:orcl
username=username
password=password
```
- 키와 값이 '=' 기호로 연결되어있는 텍스트 파일로 ISO 8859-1 문자셋으로 저장
- 한글은 유니코드로 변환되어 저장

- Properties 객체 생성
  - 파일 시스템 경로 이용
  ```java
  Properties properties = new Properties();
  properties.load(new FileReader("C:/~/database.properties"));
  ```

  - ClassPath 이용

  ```java
  //패키지가 다를경우
  String path = A.class.getResource("config/database.properties").getPath();
  
  String path = 클래스.class.getResource("database.properties").getPath();
  path = URLDecoder.decode(path, "utf-8");
  Properties properties = new Properties();
  properties.load(new FileReader(path));
  ```
- 값 읽기

```java
String value = properties.getProperty("key");
```

## 검색 기능을 강화시킨 컬렉션
### 검색기능을 강화시킨 컬렉션
- TreeSet, TreeMap
  - 이진트리(binary tree)를 사용하기 때문에 검색 속도 향상

### 이진트리 구조
- 부모 노드와 자식 노드로 구성
  - 왼쪽 자식 노드 : 부모 보다 작은 값
  - 오른쪽 자식 노드 : 부모보다 큰 값
- 정렬이 쉬움
  - 오름 차순 : 왼쪽 노드 -> 부모 노드 -> 오른쪽 노드
  - 내림 차순 : 오른쪽 노드 -> 부모 노드 -> 왼쪽 노드
- 범위 검색이 쉽다
  - 노드를 기준으로 왼쪽 자식트리(작은 값들)와 오른쪽 자식트리(큰 값들)의 속성이 결정되어 있음.

### TreeSet

```java
TreeSet<E> treeSet = new TreeSet<>();
```
> TreeSet은 Set 인터페이스의 구현 클래스이므로 Set 인터페이스 타입의 변수에 대입해도 되지만, TreeSet 타입의 변수에 대입한 이유는 TreeSEt 이 가지고 있는 검색 기능 메소드를 사용하기 위함임.

- 특징
  - 이진 트리(Binary Tree)를 기반으로 한 Set 컬렉션
  - 왼쪽과 오른쪽 자식노드를 참조하기 위한 두개의 변수로 구성
- 주요 메소드
- 특정 객체를 찾는 메소드
  - first(), last(), lower(), higher(), floor()... 

```java
public static void main(String[] args) {
  TreeSet<Integer> integers = new TreeSet<Integer>();
  integers.add(new Integer(30));
  integers.add(new Integer(40));
  integers.add(new Integer(50));
  integers.add(new Integer(60));
  integers.add(new Integer(70));
  
  Integer n = null;
  
  n = integers.first();
  System.out.println("가장 첫번째 값 : " + n);
  
  n = integers.last();
  System.out.println("가장 마지막 값 : " + n);

  n = integers.lower(new Integer(90));
  System.out.println("90 아래점수 : " + n);
  
  n = integers.higher(new Integer(50));
  System.out.println("50 위 점수 : " + n);
  
  n = integers.floor(new Integer(65));
  System.out.println("70이거나 70 아래 : " + n);
  
  n = integers.ceiling(new Integer(35));
  System.out.println("40이거나 40 바로 위 : " + n);
  
  while(!integers.isEmpty()) {
    n = integers.pollFirst();
    System.out.println(n + " : " + integers.size());
  }
}
```

- 정렬 메소드
  - descendingIterator(), descendingSet()

```java
public static void main(String[] args) {
  TreeSet<Integer> scores = new TreeSet<>();
  
  scores.add(87);
  scores.add(98);
  scores.add(85);
  scores.add(95);
  scores.add(80);
  scores.add(100);
  System.out.println(scores);
  
  NavigableSet<Integer> descendingSet = scores.descendingSet();
  System.out.println("descendingSet");
  for(int score : descendingSet) {
    System.out.println(score + " ");
  }
  System.out.println();
  System.out.println("ascendingSet");
  NavigableSet<Integer> ascendSet = descendingSet.descendingSet();
  for(int score : ascendSet) {
    System.out.println(score + " ");
  }
}
```
- 범위 검색 메소드
  - headSet(), tailSet, subSet()

```java
public static void main(String[] args) {
  TreeSet<String> treeSet = new  TreeSet<>();
  
  treeSet.add("apple");
  treeSet.add("forever");
  treeSet.add("description");
  treeSet.add("ever");
  treeSet.add("zoo");
  treeSet.add("base");
  treeSet.add("guess");
  treeSet.add("cherry");
  treeSet.add("f");
  treeSet.add("c");
  
  System.out.println("[c~f 사이의 단어 검색]");
  NavigableSet<String> rangSet = treeSet.subSet("c", true, "f", true);
  System.out.println(rangSet);
}
```

### TreeMap

```java
TreeMap<K,V> treemap = new TreeMap<K, V>();
```
- 검색속도를 향상 시키기 위해서 제공되는 컬렉션, 제공되는 객체를 MapEntry 형태로 제공하는 컬렉션

- 특징
  - 이진 트리(Binary Tree)를 기반으로한 Map 컬렉션
  - 키와 값이 저장된 Map.Entry를 저장
  - 왼쪽과 오른쪽 자식노드를 참조하기 위한 두개의 변수로 구성
- 주요 메소드
  - 단일 노드 객체를 찾는 메소드
    - firstEntry(), lastEntry(), lowerEntry(), higherEntry(), ...

    ```java
    public static void main(String[] args) {
      TreeMap<Integer, String> scores = new TreeMap<Integer, String>();
      scores.put(87, "홍");
      scores.put(90, "길");
      scores.put(95, "동");
      scores.put(85, "고");
      scores.put(88, "길");
      scores.put(97, "동");
    
      Map.Entry<Integer, String> entry = scores.firstEntry();
      System.out.println("가장 작은 키값을 가진 객체 : " + entry);
      
      entry = scores.lastEntry();
      System.out.println("가장 큰 키값을 가진 객체 : " + entry);
      
      entry = scores.lowerEntry(95);
      System.out.println("95점 미만의 키값을 가진 객체 : " + entry);
      
      entry = scores.higherEntry(95);
      System.out.println("95점 초과의 키값을 가진 객체 : " + entry);
      
      entry = scores.floorEntry(95);
      System.out.println("95점 이상의 키값을 가진 객체 : " + entry);
      
      entry = scores.ceilingEntry(95);
      System.out.println("95점 이하의 키값을 가진 객체 : " + entry);
    
      System.out.println("키의 최소값과 최대값 객체 추출후 Map에서 제거");
      while(!scores.isEmpty()) {
        entry = scores.pollLastEntry();
        System.out.println(entry + ("\t남은 객체 수 " + scores.size()));
      }
    }
    ```
- 정렬메소드
  - descendingKetSet(), descendingMap()
  
  ```java
  public static void main(String[] args) {
		TreeMap<Integer, String> scores = new TreeMap<Integer, String>();
		scores.put(80, "홍길동");
		scores.put(85, "고길동");
		scores.put(90, "둘리");
		scores.put(95, "도우너");
		scores.put(100, "마이콜");
		
		NavigableMap<Integer, String> desc = scores.descendingMap();
		Set<Map.Entry<Integer, String>> descEntrySet = desc.entrySet();
		for(Map.Entry<Integer, String>entry : descEntrySet) {
			System.out.print(entry);
		}
		System.out.println();
		
		NavigableMap<Integer, String> ascnedingMap = desc.descendingMap();
		Set<Map.Entry<Integer, String>> ascEntrySet = ascnedingMap.entrySet();
		for(Map.Entry<Integer, String> entry : ascEntrySet) {
			System.out.print(entry);
		}
	} 
  ```
- 범위 검색 메소드
  - headMap(), tailMap(), subMap()
  
  ```java
  	public static void main(String[] args) {
		TreeMap<String, Integer> treeMap = new TreeMap<String, Integer>();
		treeMap.put("apple", 10);
		treeMap.put("ever", 20);
		treeMap.put("zoo", 30);
		treeMap.put("base", 40);
		treeMap.put("java", 50);
		treeMap.put("f", 60);
		treeMap.put("a", 70);
		treeMap.put("new", 80);
		treeMap.put("description", 90);
		treeMap.put("Abase", 100);
		
		NavigableMap<String, Integer> rangeMap = treeMap.subMap("a", true, "f", true);
		for(Map.Entry<String, Integer> entry : rangeMap.entrySet()) {
			System.out.println(entry);
		}
	}
  ```

### Comparable 과 Comparator
- TreeSet 과 TreeMap 의 자동 정렬
  - TreeSet 의 객체와 TreeMap 의 키는 저장과 동시에 자동 오름차순으로 정렬
  - 숫자(Integer, Double) 타입일 경우에는 값으로 정렬
  - 문자열(String) 타입일 경우에는 값으로 정렬
  - TreeSet과 TreeMap 은 정렬을 위해 java.lang.Comparable을 구현한 객체를 요구
    - Integer, Double, String 은 Comparable 인터페이스를 구현한 클래스이기 때문에, TreeSet과 TreeMap 에 저장할 때 자동으로 오름차순으로 정렬될 수 있음.
    - 사용자가 정의하는 객체를 TreeSet, TreeMap에 저장하려고 할 때, Comparable 을 구현하고 있지 않을 경우에는 저장하는 순간 ClassCastException 이 발생

- 사용자 정의 객체를 정렬하고 싶을 경우
  * 방법1: 사용자 정의 클래스가 Comparable을 구현
  
  리턴타입 | 메소드 | 설명
  ---|---|---
  int | compareTo(To) | 주어진 객체가 같으면 0을 리턴, 주어진 객체보다 적으면 음수를 리턴, 주어진 객체보다 크면 양수를 리턴
  
  ```java
  public static void main(String[] args) {
		TreeSet<Person> treeSet = new TreeSet<Person>();
		treeSet.add(new Person("고길동", 50));
		treeSet.add(new Person("둘리", 20));
		treeSet.add(new Person("마이콜", 33));
		System.out.println(treeSet);
		
		Iterator<Person> iterator = treeSet.iterator();
		while(iterator.hasNext()) {
			Person person = iterator.next();
			System.out.println(person);
		}
	}
  ```
  * 방법2: TreeSet, TreeMap 생성 시 Comparator 구현 객체 제공
  
  리턴타입 | 메소드 | 설명
  ---|---|---
  int | compare(T o1, T 02) | o1과 o2가 동등하다면 0을 리턴, o1이 o2보다 앞에 오게 하라면 음수를 리턴, o1이 o2보다 뒤에 오게 하려면 양수를 리턴
  
  ```java
  public class DescendingComparator implements Comparator<Person> {

	@Override
    public int compare(Person o1, Person o2) {
      if(o1.getAge() < o2.getAge()) return -1;
      else if(o1.getAge() == o2.getAge()) return 0;
      else return 1;
    }
  }
   ```
  ```java
  public static void main(String[] args) {
		TreeSet<Person> treeSet = new TreeSet<Person>(new DescendingComparator());
			//저장 시 나이를 기준으로 내림차순 정렬됨.
			treeSet.add(new Person("홍길동", 30));
			treeSet.add(new Person("고길동", 50));
			treeSet.add(new Person("마이콜", 20));
			
			Iterator<Person> iterator = treeSet.iterator();
			while(iterator.hasNext()) {
				Person person = iterator.next();
				System.out.println(person.getName() + person.getAge());
			}
	}
  ```

## LIFO와 FIFO 컬렉션
- Last In First Out, First In First Out
  - 후입선출(LIFO), 선입선출(FIFO)

#### Stack 클래스
```java
Stack<E> stack = new Stack<>();
```
- 특징
  - 후입선출(LIFO) 구조
  - JVM 스택 메모리
- 주요 메소드

리턴타입 | 메소드 | 설명
E | push(E item) | 주어진 객체를 스택에 넣음
E | peek() | 스택의 맨위 객체를 가져옴. 객체를 스택에서 제거하지 않음
E | pop() | 스택의 맨위 객체를 가져옴. 객체를 스택에서 제거함

```java
public class Coin {
	private int value;

	public int getValue() {
		return value;
	}

	public Coin(int value) {
		super();
		this.value = value;
	}
}
```
```java
public static void main(String[] args) {
  Stack<Coin> coin = new Stack<Coin>();
  
  coin.push(new Coin(100));
  coin.push(new Coin(50));
  coin.push(new Coin(10));
  coin.push(new Coin(500));
  coin.push(new Coin(300));
  
  while(!coin.isEmpty()) {
    Coin coins = coin.pop();
    System.out.println(coins.getValue());
  }
}
```

#### Queue 클래스
```java
Queue queue = new LinkedList();
```
- 특징
  - 선입선출(FIFO) 구조
  - 작업큐, 메시지큐 등에 사용
  - 구현클래스 : LinkedList
- 주요 메소드
리턴타입 | 메소드 | 설명
boolean | offer(E e) | 주어진 객체를 넣음
E | peek() | 객체 하나를 가져옴. 객체를 큐에서 제거하지않음
E | poll() | 객체 하나를 가져옴. 객체를 큐에서 제거함
 
```java
public static void main(String[] args) {
  Queue<Coin> coins = new LinkedList<Coin>();
  coins.offer(new Coin(100));
  coins.offer(new Coin(500));
  coins.offer(new Coin(50));
  coins.offer(new Coin(300));	

  while(!coins.isEmpty()) {
    Coin coin = coins.poll();
    System.out.println(coin.getValue());
  }	
}
```

### 동기화된 컬렉션
**비동기화 된 컬렉션을 동기화된 컬렉션으로 래핑**
비동기화된 컬렉션을 멀티스레드 환경에서 사용해야 할 경우 동기화된 컬렉션으로 래핑하여 사용하는것이 안전

**List 컬렉션**
```java
List<T> list = Collections.synchronizedList(new ArrayList<T>());
```
- 비동기화된 컬렉션인 ArrayList 를 Collections 클래스의 정적메소드를 통해서 래핑시켜주면 Thread Safe 한 컬렉션을 만들수 있음.

**Set 컬렉션**
```java
Set<E> set = Collections.synchronizedSet(new HashSet<E>);
```
- 비동기화된 컬렉션인 HashSet을 Collections 클래스의 정적메소드를 통해서 래핑시켜주면 Thread Safe 하게 만들 수 있음.

**Map 컬렉션**
```java
Map<K,V> map = Collections.synchronizedMap(new HashMap<K,V>);
```
- 비동기화된 컬렉션인 HashMap을 Collections 클래스의 정적메소드를 통해서 래핑시켜주면 Thread Safe 하게 만들 수 있음.