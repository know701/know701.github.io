---
date: 2020-12-02
title: "Multi Thread"
categories: Java
# 목차
toc: true  
toc_sticky: true 
---


# 멀티스레드 개념
### 프로세스와 스레드
- 실행중인 하나의 프로그램
  - 멀티 프로세스는 독립적으로 프로그램을 실행하고 여러가지 작업 처리
  - 멀티스레드는 하나의 프로그램을 이용해 내부적으로 여러가지 작업처리

### 메인스레드
- 모든 자바 애클리케이션은 메인스레드 가 main() 메소드 실행하면서 시작됨.
  - 메인 스레드는 필요에 따라 작업 스레드들을 만들어 병렬로 코드를 실행할 수 있음. (멀티 스레드를 생성해서 멀티 태스킹 수행)
  
  - 프로세스 종료
    * 싱글 스레드의 경우 메인스레드가 종료되면 프로세스도 종료
    * 멀티 스레드의 경우 실행중인 스레드가 하나라도 있으면 프로세스는 종료되지 않음.


## 작업 스레드 생성과 실행
- 몇개의 작업을 병렬로 실행할지 결정해야 함.
  * java.lang.Thread 클래스를 직접 객체화해서 생성
  * Thread 상속해서 하위 클래스를 만들어 생성할수도 있음.

### Thread 클래스로부터 직접 생성
- java.lang.Thread 클래스로부터 작업 스레드 객체를 생성하려면 다음과 같이 Runnable 을 매개값으로 갖는 생성자를 호출
  - Runnable 에는 run() 메소드가 하나 정의되어 있는데, 구현 클래스는 run()을 재정의해서 작업스레드가 실행 할 코드를 작성해야함.

```java
Thread thread = new Thread(Runnable target);
```
- Runnable 은 인터페이스 타입이기 때문에 구현 객체를 만들어 대입

```java
class Task implements Runnable {
  public void run(){
    스레드가 실행 할 코드;
  }
}
```
- Runnable 은 작업 내용을 가지고있는 객체이지 실제 스레드가 아님. 
  - 구현 객체를 생성 후 이것을 매개값으로 해서 Thread 생성자를 호출하면 비로소 작업스레드가 생성됨.

```java
Runnable task = new Task();
Thread thread = new Thread(task);

//익명 구현객체를 생성하는 방법으로 사용
Thread thread = new Thread(new Runnable(){
  public void run(){
    실행할 코드;
  }
});

//람다식을 매개값으로 사용
Thread thread = new Thread( ()-> {
  스레드 실행 코드;
});
```
- Runnable 인터페이스는 run() 메소드 하나만 정의되어 있기 때문에 함수적 인터페이스임.

- 작업스레드는 생성되는 즉시 실행오는것이 아니라 start() 메소드를 다음과 같이 호출해야 비로소 실행됨.
```java
thread.start();
```

### Thread 하위 클래스로부터 생성
- 작업 스레드가 실행할 작업을 Runnable로 만들지 않고 하위 클래스로 작업 스레드를 정의하면서 작업내용을 포함시킬수 있음.
  - Thread 클래스 상속 후 run 메소드를 overriding 후 스레드가 실행 할 코드 작성

```java
public class WorkerThread extends Thread{
  @Override
  public void run(){
    //스레드 실행코드;
  }
}
Thread thread = new WorkerThread();

//Thread 익명 객체로 작업 스레드를 객체 생성
Thread thread = new Thread(){
  public void run(){
    스레드 실행코드
  }
};
//호출
thread.start();
```

### 스레드의 이름
- 메인 스레드 이름 : main
- 작업 스레드 이름 : Thread - n
```java
thread.setName("스레드 이름"); // 자동으로설정되어있는 이름 변경
thread.getName(); // 이름 받아오기
```
- 코드를 실행하는 스레드의 참조 얻기
```java
Thread thread = Thread.currentThread();
```

## 스레드 우선순위
- 멀티 스레드는 동시성(Concurrency) 또는 병렬성(Parallelism) 으로 실행됨.
  1. 동시성
    - 멀티 작업을 위해 하나 코어에서 멀티 스레드가 번갈아가며 실행하는 성질
  2. 병렬성
    - 멀티 작업을 위해 멀티 코어에서 개별 스레드를 동시에 실행하는 성질

**스레드 스케줄링**
- 스레드가 개수의 코어 수보다 많을경우 
  * 스레드를 어떤 순서에 의해 동시성으로 실행할것인가를 결정해야하는데 이것을 **스케줄링**  이라고함.
- 자바의 스레드 스케줄링
  * 우선순위(Priority) 방식과 순환 할당(Round-Robin) 방식을 이용
    + 우선순위 방식 : 우선순위가 높은 스레드가 실행 상태를 더 많이 가지도록 스케줄링 하는것(코드로 제어 가능)
    + 순환 할당 방식 : 시간 할당량(Time slice)을 정해서 하나의 스레드를 정해진 시간만큼 실행(코드로 제어 불가능, JVM 에서 의해 정해짐)

- 우선순위 방식은 1이 순위가 가장낮고, 10이 가장높음
  - 모든 스레드들은 기본적으로 5 의 우선순위를 할당받음

```java
//우선순위 변경방법
thread.setPriority(우선순위); 
thread.setPriority(Thread.MAX_PRIORITY);
thread.setPriority(Thread.NORM_PRIORITY);
thread.setPriority(Thread.MIN_PRIORITY); //우선순위에 가독성을 위해 상수를 대입해도 상관없음
```
**우선순위 효과**
- 싱글 코어
  * 우선순위가 높은 스레드가 실행기회를 더많이 가짐, 우선순위가 낮은 스레드보다 계산작업을 빨리끝냄 
- 멀티 코어
  * 쿼드의 경우 4개의 스레드가 병렬성으로 실행될 수 있기 때문에
  * 4개 이하의 스레드를 실행할 경우엔 우선 순위 방식은 크게 영향을 미치지 못함.
  * 최소 5개 이상의 스레드가 실행되어야 우선순위의 영향을 받음.



## 동기화 메소드와 동기화 블록
### 공유 객체를 사용할때 주의할점
- 멀티 스레드가 하나의 객체를 공유함에 따라 생기는 오류
  - 스레드 A를 사용하던 객체가 스레드 B에 의해 상태가 변경될 수 있기 때문에 스레드 A가 의도했던 것과는 다른 결과를 산출할 수 있음


### 동기화 메소드 및 동기화 블록
- 멀티 스레드 프로그램에서 단 하나의 스레드만 실행할 수 있는 코드영역을 임계 영역(critical section) 이라 함.
- 자바는 임계 영역을 지정하기 위해 **동기화(synchronized) 메소드와 동기화 블록을 제공**함.

```java
public synchronized void method(){
  임계영역; //단 하나의 스레드만 실행
}
```
- 동기화 메소드는 메소드 전체 내용이 임계 영역이므로 스레드가 동기화 메소드를 실행하는 즉시 객체에는 잠금이 일어남.

```java
public void method(){
  //여러 스레드가 실행 가능 영역 
  ...
  synchronized(공유 객체 ){ //공유객체가 객체 자신이면 this 를 넣을수있음.
    임게 영역 // 단 하나의 스레드만 실행 동기화 블록
  }
}
```
- 메소드 전체 내용이 아닌 일부 내용만 임계 영역으로 만들고싶다면 동기화 블록 사용
- 만약 동기화 메소드와 동기화 블록이 여러개 있을 경우 스레드가 이들중 하나를 실행할 때 다른 스레드는 해당 메소드는 물론이고 다른 동히과 메소드 및 블록도 실행할 수없다. 하지만 일반 메소드는 실행 가능하다.


## 스레드 상태
- 스레드가 객체를 생성하고 start() 메소드를 호출하면 곧바로 스레드가 실행되는것처럼 보이지만, 사실은 실행대기 상태임.
  - 실행대기 상태란 스케줄링이 아직 되지않아 실행을 기다리고 있는 상태
- 스레드 중에서 스레드 스케줄링으로 선택된 스레드가 비로서 CPU를 점유하고 run()메소드를 실행함. 이때를 실행(Running) 상태라고함.
- 실행 상태에서 run() 메소드가 종료되면 더이상 실행할 코드가 없어 스레드의 실행이 멈추게되는데 이상태를 종료 상태라고 함.

- 경우에 따라 스레드는 실행상태에서 실행대기 상태로 가지않을수도 있으며 다시 실행 상태로 가기위해선 실행대기 상태로 가야함.
  - 일시정지 상태로 돌아가기도하는데 스레드가 실행할수 없는 상태임. (WAITING, TIMED_WATING, BLOCKED)

상태 | 열거상수 | 설명
--- | --- | ---
객체 생성 | NEW | 스레드 객체가 생성, 아직 start()메소드가 호출되지 않은 상태
실행 대기 | RUNNABLE | 실행 상태로 언제든지 갈 수 있는 상태
일시 정지 | WAITING | 다른 스레드가 통지할 때까지 기다리는 상태
일시 정지 | TIMED_WAITING | 주어진 시간 동안 기다리는 상태
일시 정지 | BLOCKED | 사용하고자 하는 객체의 락이 풀릴 때까지 기다리는 상태
종료 | TERMINATED | 실행을 마친 상태

```java
//스레드 상태 얻기
Thread.State state = 스레드명.getState();
```

## 스레드 상태 제어
- 실행중인 스레드 상태를 변경하는것을 스레드 상태 제어라고 함.

메소드|설명
---|---
interrupt() | 일시정지 상태의 스레드에서 InterruptedException 예외를 발생시켜, 예외처리 코드(catch)에서 실행대기 상태로 가거나 종료 상태로 갈수있도록 함.
notify(),notifyAll() | 동기화 블록 내에서 wait() 메소드에 의해 일시정지 상태에 있는 스레드를 실행대기 상태로 만듬
sleep(long millis) | 주어진 시간동안 스레드를 일시정지 상태로 만들고 주어진 시간이 지나면 자동적으로 실행 대기 상태가 된다.
join() | join() 메소드를 호출한 스레드는 일시정지 상태가 됨, 실행대기 상태로 가려면 , join() 메소드를 멤버로 가지는 스레드가 종료되거나, 매개값으로 주어진 시간이 지나야 함.
wait() | 동기화 블록 내에서 스레드를 일시정지 상태로 만든다. 매개값으로 주어진 시간이 지나면 자동적으로 실행대기 상태가 되며, 시간이 주어지지 않으면 notify() 메소드에 의해 실행대기 상태로 돌아갈수있음.
yield() | 실행 중에 우선순위가 동일한 다른 스레드에게 실행을 양보하고 실행대기 상태가 된다.

### 다른 스레드에게 실행 양보(yield())
- 스레드가 처리하는 작업은 반복적인 실행을 위해 반복문을 포함하는 경우가 많다. 가끔은 이 반복문들이 무의미한 반복을 하는 경우가 있음.
```java
public void run(){
  while(true){
    if(work){
      System.out.println("ThreadA 작업 내용")
    } else{
      Thread.yield();
    }
  }
}
```
- work 의 값이 false 가 오기전까지 무의미한 반복을 하는데 의미없는 반복을 줄이기 위해 yield() 메소드를 호출해 실행대기 상태로 돌아가고 다른 스레드에게 실행 기회를 주도록 수정 


### 다른 스레드의 종료를 기다림(join())
- 스레드는 다른 스레드와 독립적으로 실행하는 것이 기본이지만, 다른 스레드가 종료될 때까지 기다렸다가 실행해야 하는 경우가 발생할 수도 있음.
  - 이런경우 Thread.join() 메소드를 사용함
```java
	public static void main(String[] args) {
		SumThread sumThread = new SumThread();  //해당 클래스는 100까지 합 더하는 로직 구현
		sumThread.start();
		
		try {
			sumThread.join(); // sumThread 가 종료할때까지 메인스레드를 일시정지
		} catch(Exception e) {
			
		}
		System.out.println("합  : "+ sumThread.getSum());
	}
```
 
### 스레드 간 협업(wait(), notify(), notifyAll())
- 정확한 교대 작업이 필요할 경우, 자신의 작업이 끝나면 상대방 스레드를 일시정지 상태에서 풀어주고, 자신은 일시정지로 상태로 만드는것.
  - 이 방법의 핵심은 공유 객체에 있음.
    - 공유 객체는 두 스레드가 작업할 내용을 각각 동기화 메소드로 구분해놓고 한 스레드가 작업을 완료하면 notify() 메소드를 호출해서 일시정지 상태에있는 다른 스레드를 실행대기 상태로 만들고 자신은 두번 작업을 하지 않도록 wait() 메소드를 호출하여 일시정지 상태로 만듬
    - 메소드들은 동기화 메소드 또는 동기화 블록 내에서만 사용할 수 있음.

```java
public class WorkObject {
	public synchronized void methodA() {
		System.out.println("ThreadA 의 methodA() 작업 실행");
		notify(); // 일시정지 되어있는 ThreadB 를 실행대기 상태로 만듬
		try {
			wait(); // ThreadA 를 일시정지 상태로 만듬
		}catch(Exception e) {
			
		}
	}
	public synchronized void methodB() {
		System.out.println("ThreadB 의 methodB() 작업 실행");
		notify();
		try {
			wait(); //ThreadB 일시정지
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
```
### 스레드의 안전한 종료(stop 플래그, interrupt())
- 스레드는 자신의 run() 메소드가 모두 실행되면 자동적으로 종료됨.
  - 하지만 경우에 따라 중간에 종료시켜야 할 경우도 있음.

**stop 플래그를 이용하는 방법**
- 스레드는 run() 메소드가 끝나면 자동적으로 종료되므로, run() 메소드가 정상적으로 종료되도록 유도하는것이 최선
```java
public class XXXThread extends Thread{
  private boolean stop; // stop 플래그
  
  public void run(){
    while(!stop){ //stop 이 true 가 되면 run()이 종료된다.
      스레드가 반복하는 실행 코드;
    }
    //스레드가 사용한 자원 정리
  }
}
```
**interrupt() 메소드를 이용하는방법**
- interupt() 메소드는 스레드가 일시 정지 상태에 있을 때 InterruptedException 예외를 발생시키는 역할

```java
public class InterrputExample {
	public static void main(String[] args) {
		Thread thread = new PrintThread2();
		thread.start(); // 스레드 시작
		
		try {
			Thread.sleep(1); // 스레드 일시정지
		} catch (Exception e) {
			System.out.println("스레드 종료");
		}
		
		thread.interrupt(); // 스레드 종료
	}
}
```
- 스레드가 실행대기 또는 실행 상태에 있을 때 interrupt() 메소드가 실행되면 즉시 InterruptedException 예외가 발생하지 않고, 스레드가 미래에 일시정지 상태가 되면 예외가 발생함.
  - 스레드가 일시 정지 상태가 되지않으면 interrupt() 메소드 호출은 아무런 의미가 없음.(위에 코드에서는 일시정지 시키기 위해 Thread.sleep(1) 코드 사용)

- 일시정지를 만들지 않고도 종료되었는지 확인 하는 방법은 interrupt() 메소드가 호출 되었다면 스레드의 interrupted() 와 isInterrupted() 메소드는 true 를 리턴한다.
  - interrupted()는 정적 메소드로 현재 스레드가 interrupted 되었는지 확인할 때 사용
  - isInterrupted()는 인스턴스 메소드로 현재 스레드가 interrupted 되었는지 확인할 때 사용
```java
boolean status = Thread.interrupted();
boolean status = objThread.isInterrupted();
```

## 데몬 스레드
- 데몬(daemon) 스레드는 주 스레드의 작업을 돕는 보조적인 역할을 수행하는 스레드
  - 보조 역할을 수행하므로 주 스레드가 종료되면 데몬스레드도 강제적으로 자동 종료됨.

```java
public static void main(String[] args){
  AutoSaveThread thread = new AutoSaveThread(); //AutoSaveThread 가 데몬스레드가 됨.
  thread.setDaemon(true); // 스레드 호출 전 선언해야 예외 발생하지않음.
  thread.start();
}
```
- 스레드 데몬으로 만들기 위해서는 주 스레드가 데몬이 될 스레드의 setDaemon(true) 를 호출해주면 됨.


## 스레드 그룹
- 스레드 그룹(ThreadGroup)은 관련된 스레드를 묶어서 관리할 목적으로 이용
  - 명시적으로 스레드 그룹에 포함시키지 않으면 기본적으로 자신을 생성한 스레드와 같은 스레드 그룹에 속함.


### 스레드 그룹 이름얻기
```java
ThreadGroup group = Thread.currentThread().getThreadGroup();
String groupName = group.getName();
```

-  Thread 의 정적 메소드인 getAllStackTraces() 를 이용하면 프로세스 내에서 실행하는 모든 스레드에 대한 정보를 얻음
```java
Map<Thread, StackTraceElement[]> map =  Thread.getAllStackTraces();
```

### 스레드 그룹 생성
- 명시적으로 스레드 그룹을 만들고 싶다면 다음 생성자 중 하나를 이용해서 ThreadGroup 객체를 만들면 됨.
```java
ThreadGroup tg = new ThreadGroup(String name);
ThreadGroup th = new ThreadGroup(ThreadGroup parent, String name);
```
- 스레드 그룹 생성 시 부모(Parent) 스레드 그룹을 지정하지 않으면 현재 스레드가 속한 그룹의 하위 그룹으로 생성됨.

### 스레드 그룹의 일괄 interrupt()
- 스레드 그룹에서 제공하는 interrupt() 메소드를 이용 시 그룹 내 에 포함된 모든 스레드들을 일괄 interrupt 할수있음.

- ThreadGroup 이 가지고 있는 주요메소드

메소드 | 설명
---|---
int / activeCount() | 현재 그룹 및 하위 그룹에서 활동중인 모든 스레드의 수를 리턴
int / activeGroupCount() | 현재 그룹에서 활동 중인 모든 하위 그룹의 수를 리턴
void / checkAccess() | 현재 스레드가 스레드 그룹을 변경할 권한이 있는지 체크한다. 권한이 없으면 SecurityException 을 발생시킴
void / destroy() | 현재 그룹 및 하위 그룹을 모두 삭제한다. 단 그룹 내에 포함된 모든 스레드들이 종료 상태가 되어야 함.
boolean / isDestroy() | 현재 그룹이 삭제 되었는지 여부를 리턴
int / getMaxPriority() | 현재 그룹에 포함된 스레드가 가질 수 이씨는 최대 우선순위를 리턴함.
void / setMaxPriority(int pri) | 현재 그룹에 포함된 스레드가 가질 수 있는 최대 우선순위를 설정
String / getName() | 현재 그룹의 이름을 리턴
ThreadGroup / getParent() | 현재 그룹의 부모 그룹을 리턴
boolean / parentOf(ThreadGroup g) | 현재 그룹이 매개값으로 지정한 스레드 그룹의 부모인지 여부를 리턴
boolean / isDaemon() | 현재 그룹이 데몬 그룹인지 여부를 리턴
void / setDaemon(boolean daemon) | 현재 그룹을 데몬 그룹으로 설정
void / list() | 현재 그룹에 포함된 스레드와 하위 그룹에 대한 정보를 출력
void / interrupt() | 현재 그룹에 포함된 모든 스레드들을 interrupt


## 스레드풀(ExecutorService)
- 갑작스러운 병렬 작업의 폭증으로 인한 스레드의 폭증을 막으려면 **스레드풀(ThreadPool)** 을 사용
 
  - 스레드풀은 작업 처리에 사용되는 스레드를 **제한된 개수**만큼 정해놓고 작업 큐(Queue)에 들어오는 작업들을 하나씩 스레드가 맡아 처리함.
  - 작업 처리가 끝난 스레드는 작업 결과를 애플리케이션으로 전달하고, 다시 작업큐에서 새로운 작업을 가져와 처리함.

- Executors 클래스의 다양한 정적 메소드를 이용해서 ExecutorService 구현 객체를 만드는데 이것이 스레드 풀임

### 스레드 풀 생성 및 종료
**스레드 풀 생성**

메소드명(매개변수) | 초기 스레드 수 | 코어 스레드 수 | 최대 스레드 수
---|---|---|---
newCachedThreadPool() | 0 | 0 | Integer.MAX_VALUE
newFixedThreadPool(int nThreads) | 0 | nThreads | nThreads

- 초기 스레드 수 : ExecutorService 객체가 생성될 때 기본적으로 생성되는 스레드 수
- 코어 스레드 수 : 스레드 수가 증가 된 후 사용되지 않는 스레드를 스레드 풀에서 제거 할 때 최소한 유지해야 할 스레드 수
- 최대 스레드 수 : 스레드 풀에서 관리하는 최대 스레드 수

1. newCachedThreadPool()
  - 초기 스레드 개수와 코어 스레드 개수는 0개, 스레드 개수보다 작업 개수가 많으면 새 스레드를 생성시켜 작업을 처리, 이론적으로는 int 값이 가질수 있는 최대값만큼 스레드가 추가되지만, 성능에 따라 달라짐, 1개 이상의 스레드를 생성 후 60초 동안 스레드가 아무작업을 하지 않으면 추가된 스레드를 종료하고 풀에서 제거

```java
// newCachedThreadPool()을 호출해 ExecutorService 구현 객체를 얻는 코드
ExecutorService executorService = Executors.newCachedThreadPool(); 
```

2. newFixedThreadPool(int nThreads)
  - 초기 스레드 개수는 0개, 코어 스레드 수는 nThreads, 스레드 개수보다 작업 개수가 많으면 새 스레드를 생성시키고 작업을 처리, 최대 스레드 수는 매개값으로 준 nThreads 이다. 이 스레드 풀은 스레드가 작업을 처리하지 않고 있더라도 스레드 개수가 줄지 않는다.

```java
// cpu 코어의 수만큼 최대 스레드를 사용하는 스레드풀 생성
ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors()) 
```
3. ThreadPoolExecutor
  - 코어 스레드 개수와 최대 스레드 개수를 설정하고 싶다면 직접 ThreadPoolExecutor 객체를 생성, 위 두가지 메소드도 내부적으로 ThreadPoolExecutor 객체를 생성해서 리턴함.
```java
ExecutorService threadPool = new ThreadPoolExecutor(
    3, //코어 스레드 개수
    100, // 최대 스레드 개수
    120L, // 놀고 있는 시간
    TimeUnit.SECONDS, //놀고있는 시간 단위
    new SynchronousQueue<Runnable>() //작업 큐
);
```

**스레드풀 종료**
- 스레드풀의 스레드는 기본적으로 데몬 스레드가 아니기 때문에 main 스레드가 종료 되더라도 작업을 처리하기 위해 계속 실행 상태로 남아있음.

리턴타입|메소드명(매개변수)| 설명
---|---|---
void | shutdown() | 현재 처리중인 작업뿐만 아니라 작업 큐에 대기하고 있는 모든 작업을 처리한 뒤에 스레드풀을 종료 시킴.
List'<'Runnable'>' | shutdownNow() | 현재 작업 처리중인 스레드를 interrupt 해서 작업 중지를 시도하고 스레드 풀을 종료시킴, 리턴값은 작업큐에 있는 미처리된 작업(Runnable)의 목록
boolean | awaitTermination(long timeout, TimeUnit unit) | shutdown() 메소드 호출 이후, 모든 작업 처리를 timeout 시간 내에 완료하면 true를 리턴하고, 완료하지 못하면 작업 처리중인 스레드를 interrupt 하고 false 를 리턴함.

```java
executorService.shutdown(); // 작업을 마무리하고 스레드풀 종료 시 사용
또는
executorService.shutdownNow(); // 작업과 상관없이 강제 종료 시 사용
```

### 작업 생성과 처리 요청
**작업 생성**
- 하나의 작업은 Runnable 또는 Callable 구현 클래스로 표현함.
  - Runnalbe 과 Callable 의 차이점은 작업처리 완료 후 리턴값이 있느냐 없느냐임.

```java
Runnable task = new Runnable(){
  @Override
  public void run(){
    //스레드 처리 내용
  }
}

Callable<T> task = new Callable<T>(){
  @Override
  public T call() throws Exception{
    //스레드 처리 내용
    return T;
  }
}
```

**작업 처리 요청**
- 작업 처리 요청이란 ExecutorService 의 작업 큐에 Runnable 또는 Callable 객체를 넣는 행위

리턴타입 | 메소드명(매개변수) | 설명
---|---|---
void | execute(Runnable command) | Runnable을 작업 큐에 저장, 작업 처리 결과를 받지 못함
Future<?>, Future<'V'>,Future<'V'> | submit(Runnable task), submit(Runnable task, V result), submit(Callable<'V'> task) | Runnable 또는 Callable을 작업 큐에 저장, 리턴된 Future 를 통해 작업 처리 결과를 얻을 수 있음.

- 두 메소드의 차이점
  - execute() 는 작업 처리 결과를 받지 못함
  - submit() 은 작업처리 결과를 받을수 있도록 Future 를 리턴  
    - execute() 는 작업처리 도중 예외가 발생하면 스레드가 종료되고, 해당 스레드는 스레드 풀에서 제거되고 다른 작업 처리를 위해 새로운 스레드 생성
    - submit() 은 작업 처리 도중 예외가 발생하더라도 스레드는 종료되지 않고 다음작업을 위해 재사용됨.


### 블로킹 방식의 작업 완료 통보
- ExecutorService 의 submit() 메소드는 매개값으로 준 Runnable 또는 Callable 작업을 스레드 풀의 작업큐에 저장하고 즉시 Future 객체를 리턴함.

- Future 객체는 작업 결과가 아니라 작업이 완료될 때까지 기다렸다가(지연했다가=블로킹되었다가) 최종 결과를 얻는데 사용
  > Future를 지연 완료(pending completion) 객체라고 함.

- Future 의 get() 메소드를 호출하면 스레드가 작업을 완료할 때가지 블로킹되었다가 작업을 완료하면 처리 결과를 리턴함.
  - 블로킹을 사용하는 작업 오나료 통보 방식
  
리턴타입 | 메소드명(매개변수) | 설명
--- | --- | ---
V | get() | 작업이 완료될 때까지 블로킹되었다가 처리 결과 V를 리턴
V | get(long timeout, TimeUnit unit) | timeout 시간 전에 작업이 완료되면 결과 V를 리턴하지만, 작업이 완료되지 않으면 TimeoutException 을 발생 시킴

- submit() 메소드별로 Future 의 get() 메소드가 리턴하는값

메소드 | 작업처리 완료 후 리턴 타입 | 작업처리 도중 예외 발생
---|---|---
submit(Runnable task) | future.get() -> null | future.get() -> 예외발생
submit(Runnable task, Integer result) | future.get() -> int 타입값 | future.get() -> 예외발생
submit(Callable<'String> task) | future.get() -> String 타입값 | future.get() -> 예외발생

- future 이용한 블로킹 방식의 작업완료 통보에서 주의할점은 **작업을 처리하는 스레드가 작업을 완료하기 전까지는 get() 메소드가 블로킹 되므로 다른 코드를 실행할 수 없음.**

```java
//새로운 스레드를 생성해서 호출
new Thread(new Runnable(){
  @Override
  public void run(){
    try{
      future.get(); //지연 완료 객체
    }catch(Exception e){
      e.printStackTrace();
    }
  }
}).start();

//스레드풀의 스레드가 호출
executorService.submit(new Runnable(){
  @Override
  public void run(){
    try{
      future.get(); //지연 완료 객체
    } catch(Exception e){
      e.printStackTrack();
    }
  }
});
```

**리턴값이 없는 작업 완료 통보**
- 리턴값이 없는 작업일 경우에는 **Runnable 객체**로 생성

```java
Runnable task = new Runnable(){
  @Override
  public void run(){
    //스레드 작업 처리내용
  }
};
```
- 결과값이 없는 작업 처리 요청은 submit(Runnable task)메소드를 이용하면 됨.

```java
Future future = executorService.submit(task);
try{
  future.get();
} catch(InterruptedException e){
  //작업 처리 중 스레드가 interrupt 될 경우 실행될 코드
} catch(ExecutionException e){
  //작업 처리 중 예외 발생 된 경우 실행할 코드
}
```
- 결과값이 없음에도 Future 객체를 리턴하는데 이것은 스레드가 작업 처리를 정상적으로 완료했는지 예외가 발생했느지 확인하기 위해서임. (완료되었다면 null, 예외 발생 시 Exec0
**리턴값이 있는 작업 완료 통보**
- 스레드풀의 스렏드가 작업을 완료 후 애플리케이션이 처리 결과를 얻어야 한다면 작업 객체를 Callable 로 생성

```java
Callable<T> task = new Callable<T>(){
  @Override
  public T call() throws Exception{
    //스레드가 처리할 작업 내용
    return T;
  }
};
```

- sbumit() 메소드는 작업 큐에 Callable 객체를 저장하고 즉시 Future<'T>를 리턴한다. 이때 T는 call() 메소드가 리턴하는 타입

```java
Future<T> future = executorService.submit(task);
```

- 스레드풀의 스레드가 Callable 객체의 call() 메소드를 모두 실행하고 T 타입의 값을 리턴하면, Future<'T>의 get() 메소드는 블로킹이 해제되고 T타입의 값을 리턴

```java
try{
  T result = future.get();
} catch(InterruptedException e){
  //작업 처리 중 스레드가 interrupt 될 경우 실행될 코드
} catch(ExecutionException e){
  //작업 처리 중 예외 발생 된 경우 실행할 코드
}
```

**작업 처리 결과를 외부 객체에 저장**
- 두개 이상의 스레드 작업을 취합할 목적으로 ExecutorService 의 submit(Runnable task, V result) 메소드를 사용

```java
// 공유 객체 스레드가 공통적으로 사용하는 객체 생성
Result result = ...; 

// 작업 객체 안에 공용 객체를 넣어둠(result), 스레드가 작업 후 처리결과를 누적시키려면 참조를 알고있어야 하므로 넣어둠
Runnable task = new Task(result);

// submit 호출 시 작업 객체, 공유 객체를 넣어둠, 그러면 Future 를 리턴함 <Result> 도 공유 객체와 타입 동일해야함.
Future<Result> future = executorService.submit(task, result);

//submit 에 저장된 공유 객체를 리턴함.
result = future.get();
```

**작업 완료 순으로 통보**
- CompletionServices 를 이용해 작업 처리가 완료된것만 통보 받음.

리턴타입 | 메소드명(매개 변수) | 설명
---|---|---
Future<'V> | poll() | 완료된작업의 Future를 가져옴, 완료된 작업이 없다면 null 을 리턴함.
Future<'V> | poll(long imteout, TimeUnit unit) | 완료된작업의 Future를 가져옴, 완료된 작업이 없다면 timeout 까지 블로킹 됨.
Future<'V> | take() | 완료된작업의 Future를 가져옴, 완료된 작업이 없다면 있을때까지 블로킹 됨.
Future<'V> | submit(Callable<'V>)task | 스레드풀에 Callable 작업 처리 요청 
Future<'V> | submit(Runnable task, V result) | 스레드풀에 Runnable 작업 처리 요청

```java
ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors()); //참조타입 변수 선언

CompletionService<V> completionService = new ExecutorCompletionService<V>(executorService); // 매개변수로 참조 타입 넣을것
```

- poll()과 take() 메소드를 이용해서 처리완료된 작업의 Future 를 얻기 위해선 CompletionService 의 submit()메소드로 작업 처리 요청 해야함.

```java
completionService.submit(Callable<V> task);
completionService.submit(Runnable task, V result);
```

- take() 메소드를 호출하여 완료된 Callable 작업이 있을때까지 블로킹 되었다가 완료된 작업의 Future 를 얻고, get() 메소드로 결과값을 얻어내는 코드

```java
executorService.submit(new Runnable(){
  @Override
  public void run(){
    while(ture){
      try{
        Future<Integer> future = completionService.take(); // 완료되느 작업이 있을때까지 블로킹, 완료된 작업이 있으면 Future 를 리턴
        int value = future.get(); // get()은 블로킹 되지 않고 바로 작업 결과를 리턴
        System.out.println("처리결과" + value); 
      } catch(Exception e){
        break;
      }
    }
  }
});
```

### 콜백 방식의 작업 완료 통보
- 콜백이란 애플리케이션이 스레드에게 작업 처리를 요청한 후 스레드가 작업을 완료하면 특정 메소드를 자동 실행하는 기법
  - 이때 자동 실행되는 메소드를 콜백 메소드라고 함.

- 블로킹 방식은 작업 처리를 요청한 후 작업이 완료될때까지 블로킹 되지만, 콜백 방식은 작업처리를 요청 한 후 결과를 기다릴 필요없이 다른 기능을 수행
- Runnable 구현 클래스를 작성 시 콜백 기능을 구현 가능함.
  - 먼저 콜백 메소드를 가진 클래스가 있어야 하는데, 직접 정의해도 되고, java.nio.channels.CompletionHandler 를 이용해도 됨.

```java
CompletionHandler<V, A> callback = new ComplteionHandler<V, A>(){
  @Override
  public void completed(V result, A attachment){
    
  }
  @Override
  public void failed(Throwable exc, A attachment){
    
  }
}
```
- CompletionHandler는 completed()와 failed() 메소드가 있음
  - completed() 는 작업을 정상처리 완료 했을때 호출되는 콜백 메소드
  - failed() 는 작업 중 예외가 발생 했을 때 호출되는 콜백 메소드
  
- CompletionHandler의 V 타입 파라미터는 결과값의 타입이고, A는 첨부값의 타입
  - 첨부값은 콜백 메소드에 결과값 이외에 추가적으로 전달하는 객체, 첨부값이 필요없다면 A는 void 로 지정
