---
date: 2020-11-25
title: "Java Programing"
categories: Java
# 목차
toc: true  
toc_sticky: true 
---


# 자바의 특징
* 이식성이 높은 언어
* 객체 지향 언어
* 함수적 스타일 코딩을 지원
* 메모리를 자동으로 관리
* 다양한 어플리케이션 개발 가능
* 멀티 스레드를 쉽게 구현 가능
* 동적 로딩(Dynamic Loading) 지원
* 막강한 오픈소스 라이브러리 풍부

## 자바 개발도구(JDK) 설치
* JRE = JVM + 표준 클래스 라이브러리
* JDK = JRE + 개발에 필요한 도구

## 변수
- 프로그램은 작업을 처리하는 과정에서 필요에 따라 데이터를 메모리에 저장함.
- 이때 변수를 사용하는데 변수(Variable) 은 값을 저장할 수 있는 메모리의 공간을 의미

### 변수의 선언
```java
int age;
```
타입 변수이름 이와같이 선언함.
변수 이름은 자바 언어에서 정한 명명 규칙(naming convention) 을 따름

#### 작성규칙
1. 첫번째 글자는 문자이거나 $,_ 이어야 하고 숫자로 시작할 수 없다.
2. 영어 대소문자가 구분된다.
3. 첫 문자는 영어 소문자로 시작하되, 다른 단어가 붙을 경우 첫문자를 대문자로 한다.
4. 문자수의 제한은 없다.
5. 자바 예약어는 사용불가
(변수 이름을 보고 이 변수가 어떤 값을 저장하고 있는지 쉽게 알 수 있도록 의미 있는 변수 이름을 지어주는게 좋음)
### 변수의 사용

#### 변수값 저장
- 변수에 값을 저장 할 때에는 대입 연산자'=' 를 사용한다.
- 변수를 선언하고 처음 값을 저장할 경우 이러한 값을 **초기값** 이라고한다.
- 변수의 초기값은 코드에서 직접 입력하는 경우가 많은데 소스 코드내에서 직접 입력된 값을 **리터럴(literal)** 이라함.
- 리터럴은 상수(constant) 와 같은 의미지만 프로그램에서는 상수를 "값을 한번 저장하면 변경 할 수 없는 변수" 로 정의하기 때문에 리터럴 이라는 용어를 사용

#### 정수 리터럴
- 소수점이 없는 정수 리터럴은 10진수
- 0으로 시작되는 리터럴은 8진수로 간주
- 0x, 0X 시작하고 0~9 숫자나 A,B,C,D,E,F 또는 a,b,c,d,e,f 로 구성된 리터럴은 16진수로 간주
- 정수 리터럴은 **byte, char, short, int, long** 존재

#### 실수 리터럴
- 소수점이 있는 리터럴은 10진수 실수로 간주
- 대문자 E 또는 소문자 e가 있는 리터럴은 10진수 지수와 가수로 간주
```java
5E7      //5x10^7
0.12E-5  //0.12x10^5
```
- 실수 리터럴은 **float, double** 존재
#### 문자 리터럴
- 작은따옴표(') 로 묶은 문자는 문자 리터럴로 간주
- 역슬래쉬 가 붙은 문자 리터럴은 이스케이프(escape) 문자
- 문자리터럴은 **char **존재
#### 문자열 리터럴
- 큰 따옴표(") 로 묶은 텍스트는 문자열 리터럴로 간주
- 큰따옴표 안에는 텍스트가 없어도 문자열 리터럴로 간주
- 문자열 리터럴 내부에서도 이스케이프 문자 사용 가능
- 문자열 리터럴은 **String **존재
#### 논리 리터럴
- true, false 는 논리 리터럴
- **boolean **타입 하나뿐

### 변수의 사용범위
- 메소드 블록 내에서 선언된 변수를 로컬변수(local variable) 라고 부름.
- 로컬 변수는 메소드 실행이 끝나면 메모리에서 자동으로 없어진다.
- 변수는 선언된 블록 내에서만 사용이 가능하다.

```java
public static void main(String[] args){
    int var1;
    
    if(...) {
         int var2; // if 블록에서 선언(변수 var1, var2 사용가능)
    }
    for(...){
         int var3; // for 블록에서 선언 (변수 var1, var3 사용가능)
    }
var1 변수 사용가능
}
//variableName cannot be resolved to a variable - 변수를 해석 불가능하다는 에러 
```

## 데이터 타입
### 기본(primitive) 타입
- 기본 타입이란 정수, 실수, 문자, 논리 리터럴을 직접 저장하는 타입을 말함.
- 메모리 사용 크기
 1. byte    : 1byte / 8bit
 2. char    : 2byte / 16bit
 3. short   : 2byte / 16bit
 4. int     : 4byte / 32bit 
 5. long    : 8byte / 64bit - 정수
 6. float   : 4byte / 32bit
 7. double  : 8byte / 64bit - 실수
 8. boolean : 1byte / 8bit  - 논리

#### 정수타입
> byte 타입
 - byte 경우 -128(최소값) 부터 시작해서 127(최대값) 을 넘으면 다시 -128부터 다시 시작하게 된다.
 - 이와 같이 저장할 수 있는 값의 범위를 초과해서 값이 저장될 경우 엉터리 값이 변수에 저장되는데, 이러한 값을 쓰레기값이라고 한다.
 - byte = 128 와 같이 초과하는 값이 byte 타입 변수에 저장될 경우 컴파일 에러("**Type mismatch: cannot convert from int to byte**")

> char 타입
 - char 타입 변수는 단 하나의 문자만 저장함.
 - 만약 문자열을 저장하고 싶다면 String 타입을 사용
 - String은 기본타입이 아님, String 는 클래스 타입이고, String 변수는 참조 변수
 - 문자열 String 변수에 대입하면 문자열이 변수에 직접 저장되는게 아니라 String 객체가 생성되고, String 변수는 String 객체의 번지를 참조

> short 타입

> int 타입
- byte 또는 short 타입의 변수를 + 연산하면 int 타입으로 변환 후 연산되고 연산 결과 역시 int 타입으로 변함.
- 메모리가 크게 부족하지 않다면 정수를 저장할 때는 일반적으로 int 타입을 사용함.

> long 타입
- 수치가 큰 데이터를 다루는 프로그램에서는 long 타입이 필수적으로 사용
- int 타입의 저장 범위를 넘어서는 정수는 반드시 소문자 'l' 이나 대문자 'L' 을 붙여야함. (보통 대문자 'L'사용)

> 실수(float, double)
- 실수는 정수와 달리 부동 소수점(floating-point) 방식으로 저장
- 부동 소수점 '+(부호) m(가수) x 10n(지수)'
- 높은 정밀도를 요구하는 계산에서는 double 를 사용
- 자바는 기본 실수 리터럴의 기본 타입을 double 로 간주
- float 타입 변수에 저장 시 리터럴 뒤 'f' 또는 'F' 를 붙여야함.

>논리(boolean)
- 논리값(true/false)을 저장하는 데이터 타입
- 상태값에 따라 조건문과 제어문의 실행 흐름을 변경하는데 주로 이용

### 타입 변환
데이터 타입을 다른 데이터 타입으로 변환하는것을 말함.

#### 자동 타입 변환
- 자동 타입변환(Promotion) 은 프로그램 실행 중 자동적으로 타입 변환이 일어나는것
- 정수타입이 실수타입으로 변환하는 것은 무조건 자동 타입 변환이 된다. 
- char 은 2byte의 크기를 가지지만, char 의 범위는 0~65535 이므로 음수가 저장될 수 없음. 음수가 저장될 수있는 byte 타입을 char 타입으로 자동 변환 시킬수 없음.

#### 강제 타입 변환
- 큰 크기의 타입은 작은 크기의 타입으로 자동 타입 변환을 할 수 없다.
- 강제적으로 큰 데이터 타입을 작은 데이터 타입으로 쪼개어 저장하는것을 강제 타입 변환(Casting) 이라고함.
```java
public static void main(String[] args) {
	int i = 128;
		
	((i<Byte.MIN_VALUE) || i>Byte.MAX_VALUE) { //데이터 값을 검사하기 위해 boolean 과 char 타입을 제외한 모든 기본 타입에 대해 최대값 과 최소값을 제공함
		System.out.println("타입변환 error"); // 해당문구 출력
	} else {
		byte b = (byte) i;
		System.out.println(b);
	}
}
```
- 정수타입을 실수 타입으로 변환 할 때 정밀도 손실을 피해야함.
```java
public static void main(String[] args) {
	num1 = 123456780;
	num2 = 123456780;
		
	float num3 = num2;
	num2 = (int)num3;
		
	int result = num1 - num2;
		
	System.out.println(num2); // -4 
  //int 값을 손실없이 flaot 타입으로 변환 할 수 있으려면 가수 23비트로 표현 가능한 값이어야함.
  // 123456780은 23비트로 표현할수 없기 때문에 근사치로 변환(정밀도 손실)
}
```
#### 연산식에서의 자동 타입 변환
- 연산은 기본적으로 같은 타입의 피션산자(operand) 간에만 수행되기 때문에 서로 
  다른 타입의 피연산자가 있을경우 두 연산자중 크기가 큰 타입으로 자동 변환 후 연산을 수행

##연산자

#### 연산자와 연산식
- 부호 연산자와 증가/감소 연산자는 피연산자 하나만을 요구하므로 단항 연산자
- 조건 연산자는 조선식 A,B와 같이 세개의 피연산자가 필요하므로 삼항 연산자
- 이외의 연산자는 두개의 피연산자를 요구하므로 모두 이항 연산자
```java
단항 연산자 : ++x;
이항 연산자 : x + y;
삼항 연산자 : (sum>90) ? "A" : "B";
```

###연산의 방향과 우선순위
1. 증감 (++ , --),부호(+ , -),비트(~),논리(!)
2. 산술 (* , / , %)
3. 산술 ( + , -)
4. 쉬프트 (<< , >> , >>>)
5. 비교 (< ,  > , <= ,  >= , instanceof)
6. 비교 (== , !=)
7. 논리 (&)
8. 논리 (^)
9. 논리 (|)
10. 논리 (&&)
11. 논리 (||)
12. 조건 (?:)
13. 대입 (=, +=, -=, *=, /=, %=, &=, ^=, |=, <<=, >>=, >>>=)
(먼저 연산을 하고싶다면 괄호()를 사용)
- 단항,이항,삼항 연산자 순으로 우선순위를 가진다.
- 산술, 비교, 논리, 대입 연산자 순으로 우선순위를 가짐
- **단항과 대입 연산자를 제외한 모든 연산의 방향은 왼쪽에서 오른쪽이**다 (>)
- 복잡한 연산식에는 괄호 () 를 사용해서 우선순위를 정해준다.

### 단항 연산자
단항 연산자는 피연산자가 단 하나뿐인 연산자를 말함. 부호(+, -) 증감(++, --) 논리부정(!) 비트(~) 연산자가 있음 

#### 부호 연산자
- 부호 연산자는 양수 및 음수를 표시하는 +, - 를 말함.
- boolean 타입과 char 타입을 제외한 나머지 기본타입에 사용 가능함.
- 산출 타입은 int 타입이 된다는 것.
```java
short s =100;
short result = -s; // 컴파일 에러
-----------------------------------------
short s =100;
int result = -s;
```
#### 증감 연산자
- 변수의 값을 1 증가(++) 시키거나 1감소(--) 시키는 연산자를 말한다.
```java
연산식              설명
++ / 피연산자        : 다른 연산을 수행하기 전에 피연산자의 값을 1증가시킴
-- / 피연산자        : 다른 연산을 수행하기 전에 피연산자의 값을 1감소시킴
피연산자 / ++        : 다른 연산을 수행한 후에 피연산자의 값을 1증가시킴
피연산자 / --        : 다른 연산을 수행한 후에 피연산자의 값을 1감소시킴
```
#### 논리 부정 연산자(!)
조건문과 제어문에서 사용되어 조건식의 값을 부정하도록 해서 실행 흐름을 제어할때 주로 사용 토글 기능 구현할때 주로 사용

### 이항 연산자
피연산자가 두개인 연산자
#### 산술 연산자
- 더하기(+), 빼기(-), 곱하기(*), 나누기(/), 나머지(%)
- 정수타입 연산의 결과가 int 타입으로 나오는 이유는 JVM 이 기본적으로 32단위로 계산하기 때문
- 올바른 계산을 위해 값을 미리 검정하고, 정확한 계산을 위해 실수 타입을 피애햐 하며, 특수값 처리에 신경써야함.
##### 오버플로우
산출 타입으로 표현할 수 없는 값이 산출 되었을 경우, 오버플로우가 발생하고 쓰레기값(엉뚱한 값) 을 얻을수 있기 때문
- 피연산자의 값을 직접 리터럴로 주는 경우는 드뭄, 대부분 사용자로부터 입력받거나, 프로그램이 실행 중 생성되는 데이터로 산술 연산이 수행
- 이런 경우 바로 산순ㄹ연산자를 사용하지말고 메소드를 이용하는것이 좋음
##### 정확한 계산은 정수 사용
- 정확하게 계산을 해야할때는 근사치로 표현되기 때문에 부동소수점(실수) 타입을 사용하지 않는게 좋음
##### NaN 과 Infinity 연산
- 또는 % 연산자 사용 시 좌측 피연산자가 정수 타입인 경우 나누는 우측 피연산자는 0을 사용 못함.(ArithmeticException)
```java
5 / 0.0 > Infinity(무한대)
5 % 0.0 > NaN(Not a Number)

public static void main(String[] args) {
	
		int x = 5;
		double y = 0.0;
		
		double z = x / y;

		System.out.println(Double.isInfinite(z)); //  true
		z = x % y;
		
		System.out.println(Double.isNaN(z)); // true
		System.out.println(z +2);  // NaN 발생
		if(Double.isInfinite(z) || Double.isNaN(z)) {
			System.out.println("error"); // error
		} else {
			System.out.println(z + 2);
		}
	}
```
#### 문자 연결 연산자(+)
- 문자열 연결 연산자인 + 는 문자열을 서로 결합하는 연산자
- 부호 연산자인 동시에 문자열 연결 연산자이기도 함.

#### 비교 연산자(<,<=,>,>=,==,!=)
- 비교 후 boolean 타입인 true/false 를 산출
```java
0.1 == 0.1f > flase 
// 모든 부동소수점 타입은 0.1을 정확히 표현할 수가없어서 0.1f 는 0.1의 근사값으로 표현
```
- String 타입의 문자열을 비교할때는 == 연산자를 사용하면 원하지 않는 결과값이 나올수 있음.
- 자바는 문자열 리터럴이 동일하다면 동일한 String 객체를 참조하도록 되어있음.
```java
String str1 = "A";
String str2 = "A"; // 두개의 변수는 동일한 번지를 참조함
String str3 = new String("A"); // 객체 생성 연산자인 new 로 생성한 새로운 String 객체의 번지값을 가지고있음.
```

#### 논리 연산자(&&, ||, &, |, ^, !)
- && 앞의 피연산자가 false 면 뒤의 피연산자를 평가하지않고 바로 false 값을 산출 (하나라도 false 면 false) AND
- || 앞의 피연산자가 true 라면 뒤의 피연산자를 평가하지않고 true 값을 산출 (하나라도 true 면 true) OR
#### 비트 연산자
#### 대입 연산자(=, +=, -=, *=, /=, %=, %=, &=, ^=, |=, <<=, >>=, >>>=)

### 삼항 연산자 (?:)
- 세개의 피연산자를 필요로 하는 연산자
- ? 앞의 조건식에 따라 콜론: 앞뒤의 피연산자가 선택된다고 해서 조건 연산식이라고 부르기도 함.

## 조건문과 반복문(if,switch)
### if문
- 조건식의 결과에 따라 블록 실행 여부가 결정 됨.
- 조건식에는 ture 또는 false 값을 산출 할 수 있는 연산식이나, boolean 변수가 올수 있음.
- 조건식이 true 가 될때 실행해야 할 문장이 하나밖에 없다면 생략가능(코드의 가독성 때문에 생략하지않는것을 추천)
#### if-else 문
- 조건식의 결과에 따라 실행 블록을 선택
#### if-else if-else 문
- 조건문이 여러개인 if문

#### 중첩 if문
- if문의 블록 내부에 또다른 if문을 사용가능함.이것을 중첩 if문이라 부름
- 중첩의 단계는 제한이 없기 때문에 실행 흐름을 잘 판단해서 작성하면 됨.
```java
		if(score >=90){
			if(score>=95) { //if 중첩
				grade = "A+";
			} else {
				grade = "A";
			} 
		}else {
			if(score>=85) { //if 중첩
				grade = "B+";
			} else {
				grade = "B";
			}
		}
```
### switch
- if문과 마찬가지로 조건 제어문
- switch 문은 **변수가 어떤 값을 갖느냐**에 따라 실행문이 선택 됨.
- 괄호안의 case 가 없으면 default 로 가서 실행문을 실행 (생략 가능함)
- case 끝 break 는 다음 case 를 실행하지말고 switch 문을 빠져나가기 위해 존재
```java
	int num = (int)(Math.random()*6)+1;
		
		switch(num) {
		case 1:
			System.out.println("1");
			break;
		case 2:
			System.out.println("2");
			break;
		case 3:
			System.out.println("3");
			break;
		case 4:
			System.out.println("4");
			break;
		case 5:
			System.out.println("5");
			break;
		case 6:
			System.out.println("6");
			break;
		default:
			System.out.println("error");
			break;
		}
```
### for 문
- 초기화식 실행 > 조건식 평가 true > 실행문 실행 > 증감식 실행 > 조건식 평가 true > 실행문 실행 > 증감식 실행 > ...
- 초기화식 실행 > 조건식 평가 false > for 문 중지
- 경우에 따라 초기화 또는 증감식이 둘이상 있을수 있음. 이런경우 쉼표로 구분
```java
int i = 1;
for(; i < 100; i++){...}
// 초기화 식이 필요없는 경우 생략 가능함.

	for(float x=0.1f; x<= 1.0f; x+=0.1f) {
		System.out.println(x);
	}
// 0.1 은 float 타입으로 정확하게 표현할수 없어, x에 더해지는 실제값은 0.1보다 약간 큼. 루프는 결국 9번만 실행됨
```
### while 문
- 조건식 평가 > true > 실행문 > 조건식 평가 > true > 실행문 ...
- 조건식 평가 > false > 종료
#### do-while 문
- 실행문을 우선 실행 시키고 실행결과에 따라 반복 실행을 계속할지 결정하는 경우 사용
- while() 뒤에 반드시 세미콜론(;) 을 붙여야함.
- 실행문을 우선 실행 > 조건식 평가 > true > 실행문 > 조건식 평가 > true > 실행문 > ...
#### break
- switch, for, while, do-while 문을 실행 중지할 때 사용
- 반복문이 중첩되어 있을 경우 break 문은 가장 가까운 반복문만 종료하고 바깥쪽 반복문은 종료시키지 않음.
- 중첩 반복문에서 바깥쪽 반복문까지 종료 시키려면 바깥쪽 반복문에 이름(라벨) 을 붙이고 break 이름; 을 사용
#### continue
- for,while, do-while 문에서만 사용
- 반복문을 종료하지않고 계속 반복을 수행한다는점이 break 문과 다름.


## 참조타입
### 데이터 타입 분류
- 데이터 타입은 크게 기본타입(정수,실수,문자,논리 리터럴을 저장), 참조타입(객체(Object) 의 번지를 참조하는 타입, 배열, 열거, 클래스, 인터페이스)
- 두개의 차이점은 저장되는 값이 무엇이냐의 차이
- 기본 타입은 byte, char,short, int, long, double, boolean 을 이용해서 선언된 변수는 실제값을 변수안에 저장
- 참조 타입은 배열, 열거, 클래스, 인터페이스를 이용해 선언된 변수는 메모리의 번지를 값으로 갖는다. (번지를 통해 객체를 참조한다는 뜻에서 참조타입)
- 변수가 stack 영역에 생성되고 객체는 heap 영역에 생성됨.
```java
int age = 27; // 직접 값을 저장함.
String name = "A"; // heap 영역의 String 객체 주소값을 가짐.
```
### 메소드(Method) 영역
- 메소드 영역에는 코드에서 사용되는 클래스(class) 들을 클래스 로더로 읽어 클래스별로 런타임, 필드, 데이터, 메소드 데이터, 메소드 코드, 생성자 코드 등을 분류 저장
- JVM 이 시작할 때 생성되고 모든 스레드가 공유하는 영역

### 힙(Heap) 영역
- 객체와 배열이 생성되는 영역
- 생성된 객체와 배열은 JVM 스택 영역의 변수나 다른 객체의 필드에서 참조
- 참조하는 변수나 필드가 없다면 의미 없는 객체가 되어 JVM 은 GC 를 실행시켜 쓰레기 객체를 힙 영역에서 자동 제거(코드로 객체를 직접 제거시키는 방법 미제공)

### JVM 스택(Stack)영역
- JVM 스택 영역은 각 스레드마다 하나씩 존재하며 스레드가 시작될때 할당
- JVM 스택은 메소드를 호출할 때마다 프레임(Frame) 을 추가(push) 하고 메소드가 종료되면 해당 프레임을 제거(pop) 하는 동작을 수행
```java
char v1 = 'A'; //1    스택 영역 > v1 / A
		
	if(v1== 'A') {      //2     스택 영역 > v1 / A, v2 / 100, v3 / 3.14 
		int v2 = 100;
		double v3 = 3.14;
	}
boolean v4 = true; //3        스택영역 > v1 / A , v4 / true
  선언된 변수는 실행 순서에 따라 스택에 생성되고 소멸되며, v2,v3 은 if블록 내부가 실행 되고 있을때만 스택 영역에 존재하고
  실행 흐름이 if 블록을 빠져나가면 소멸 
------
int[] _scores_ = {10, 20, 30}; //   스택영역 > scores / 5번지     >>>>>>>>>>    힙영역(5번지) > 10, 20, 30 
자바에서는 배열을 객체로 취급
```

### 참조변수의 ==, != 연산
- ==, != 연산은 동일한 객체를 참조하는지. 다른객체를 참조하는지 알아볼 때 사용됨.
- **참조 타입 변수의 값은 힙영역의 객체 주소이므로 결국 주소 값을 비교하는 것**이 된다.
```java
v1 == v2 // 같은경우 true
v1 != v2 // 같은경우 flase 

```
### null과 NullPointerException
- 참조 타입 변수는 힙 영역의 객체를 참조하지 않는다는 뜻으로 null(널) 값을 가질 수 있음.
- null 값도 초기값으로 사용할 수 있기 때문에 null 로 초기화 된 참조 변수는 스택 영역에 생성됨.
- 참조타입 변수가 null값을 가지는지 확인하려면 ==, != 연산을 수행
- 자바는 프로그램 실행 중 발생하는 오류를 예외(Exception) 로 부름.
- 참조 타입 변수를 사용하는것은 곧 객체를 사용하는 것을 의미하는데, 차몾할 객체가 없으므로 사용 할 수가 없어 나오는 오류
```java
int[] intArray = null;
intArray[0] = 10; // NullPointerException
```
### String
- 자바는 문자열 리터럴이 동일하다면 String 객체를 공유하도록 되어 있음.
- new 연산자는 힙 영역에 새로운 객체를 만들 때 사용하는 연산자로 객체 생성 연산자라고 함.
- 참조를 잃은 String 객체는 쓰레기 객체로 취급하고 쓰레기 수집기(Gabage Collector) 를 구동시켜 메모리에서 자동 제거 함.
```java
String str1 = "자바";
String str2 = "자바"; 일 경우 동일한 String 객체를 참조하게 됨.

String str1 = new String("자바");
String str2 = new String("자바"); 힙영역의 서로 다른 String 객체를 참조함.
```
## 배열
- 같은 타입의 데이터를 연속된 공간에 나열시키고 각 데이터의 인덱스(index) 를 부여해놓은 자료구조
- 인덱스는 각 항목의 데이터를 읽거나, 저장하는데 사용되며 배열 이름 옆에 대괄호 []  에 기입
- 배열은 같은 타입의 데이터만 저장 가능하며, 선언과 동시에 데이터 타입이 결정 됨. (Type mismatch)
- 한번 생성된 배열은 길이를 늘리거나, 줄일 수 없다.
### 배열 선언
```java
타입 [] 변수;     /     타입 변수[];
```
- 배열 변수는 참조 변수에 속하며, 배열 변수는 힙 영역의 배열 객체를 참조하게됨. (참조할 배열 객체가 없으면 null 값으로 초기화 될 수 있음)
### 값 목록으로 배열 생성
```java
데이터 타입[] 변수 = {값0, 값1, 값 2, ...};
스택                  힙
변수                변수[0] 변수[1]
                     값0     값1
주소 (ex : 5번지)      주소 5번지 참조

타입[] 변수;
변수 = {값0, 값1, 값2, ...}; //컴파일 에러
변수 = new 타입[] {값0, 값1, 값2, ...}
배열 변수를 이미 선언 후에 다른 실행문에서 중괄호를 사용한 배열 생성은 허용되지 않음.

int add(int[] scores){...}
int result = add ({95,85,90}); // 컴파일 에러
int result = add (new int[] {95, 85, 90} );
//메소드 매개값이 배열일 경우 반드시 new 연산자 사용해야함.
```
### new 연산자로 배열 생성
- 값의 목록을 가지고 있진 않지만, 향후 값들을 저장할 배열을 미리 만들고 싶다면 new 연산자 배열 객체를 생성 시킬수 있음.
```java
타입[] 변수 = new 타입[길이]; // 길이는 배열이 저장할 수 있는 값의 수를 말함.

타입[] 변수 = null;
변수 = new 타입[길이];
```
### 초기값
1. 기본타입 (정수)
 * byte[] : 0
 * char[] : ''
 * short[] : 0
 * int[] : 0
 * long[] : 0L

2. 기본 타입 (실수)
 * float[] : 0.0F
 * double[] : 0.0

3. 기본 타입 (논리)
 * boolean[] : false

4. 참조타입
 * 클래스[] : null
 * 인터페이스[] : null

### 배열 길이
- 배열에 저장할 수 있는 전체 항목 수를 말함.
- 배열의 길이를 얻으려면 배열 객체의 길이 필드(객체 내부의 데이터) 를 읽으면 됨.
### 다차원 배열
- 행과 열로서 구성된 배열을 2차원 배열이라고 함.
- 가로 인덱스와 세로 인덱스를 사용함.

```java
int[][] scores = new int[2][3]; // 이코드는 힙(heap) 영역에 세개의 배열 객체를 생성함
int[][] score = ((95,80) , (92,96));
score[0][0]; // 95
score[1][1]; // 96
```
### 객체를 참조하는 배열
- 기본타입 배열은 각 항목에 직접 값을 갖고 있지만, 참조타입 배열은 각 항목에 객체의 번지를 가지고있음.
- String 은 클래스 타입이므로 String[] 배열은 각 항목에 문자열이 아니라 String 객체의 주소를 가짐.(String 객체를 참조하게 됨)
### 배열 복사
배열은 한 번 생성하면 크기를 변경할 수 없기때문에 더 많은 저장 공간이 필요하다면 보다 큰 배열을 만들고 새로 만들고 값들을 복사해야함.

```java
// 배열을 복사하는 2가지 방식
int[] oldArr = {1,2,3};
int[] newArr = new int[5];
for(int i=0; i<oldArr.length; i++){
newArr[i] = oldArr[i]; 
} // 복사되지 않은 항목(newArr[3], newArr[4])은 int[] 배열의 기본 초기값 0이 그대로 유지됨.

System.arraycopy(oldArr, 0, newArr, 0, oldArr.length);
//System.arraycopy(원본 배열, 원본배열에서 복사할 항목의 시작 인덱스, 새 배열, 새배열에서 붙여넣을 시작 인덱스, 복사할 개수);
```
참조 타입배열일 경우 배열 복사가 되면 복사되는 값이 객체의 번지임.

새 배열의 항목은 이전 배열의 항목이 참조하는 객체와 동일함 > 얕은 복사 (shallow copy)

참조하는 객체도 별도로 생성하는 깊은 복사(deep copy)

### 향상된 for 문 (java 5)
배열 및 컬렉션 객체 를 조금 더 쉽게 처리할 목적으로 향상된 for 문 제공

반복 실행을 하기 위해 카운터 변수와 증감식을 사용하지 않고, 배열 및 컬렉션 항목의 개수만큼 반복하고 자동으로 for문을 빠져나감.
```java
for(2.타입 변수 : 1.배열){
3. 실행문
}
// for 문 괄호 () 에는 배열에서 꺼낸 항목을 저장할 변수 선언과 콜론(:) 그리고 배열을 나란히 작성
// 1.배열에서 가져올 첫 번째 값이 존재하는지 평가 > 2.변수에 저장 > 3.실행문 실행
// 실행문이 모두 실행되면 다시 루프돌아 1번 배열에서 가져올 다음 값이 존재하는지 평가 > 존재하면 2 3 1 다시 진행 없으면 종료
	
        int[] scores = {97, 71, 84, 83, 87};
	int sum = 0;
	for(int score(타입 변수) : scores(배열)) {
		sum = sum + score;(실행문)
	}
	System.out.println("점수 총합 = " + sum) // 점수 총합 = 422
```
## 열거 타입
한정된 값만 갖는 데이터 타입이 열거 타입(enumeration type) (예시 : 월,화,수,목,금,토,일 (요일) / 봄, 여름, 가을, 겨울(계절))

열거 타입은 몇개의 열거 상수(enumeration constant) 중에서 하나의 상수를 저장하는 데이터 타입

### 열거타입 선언
- 열거타입을 선언하기 위해선 먼저 열거타입의 이름을 정하고 열거 타입 이름으로 소스파일을 생성 해야함.
- 열거 타입 이름은 관례적으로 첫문자를 대문자, 나머지는 소문자로 구성 함. 여러 단어로 구성되면 단어 첫 문자는 대문자로 하는것이 관례
```java
Week.java
public enum 열거타입이름 {...} // public enum 키워드는 열거타입을 선언하기 위한 키워드, 반드시 소문자로 입력
public enum Week{ // 열거타입 이름은 소스파일명과 대소문자가 모두 일치해야함.
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY, ...
} // 열거상수는 열거 타입의 값으로 사용되는데, 열거상수는 모두 대문자로 작성(관례)
  // 열거상수에서 여러 단어로 구성될 경우 단어 사이 언더바( _ ) 로 연결하는것이 관례
```

#### 열거타입 변수
- 열거 타입도 하나의 데이터 타입이므로 변수를 선언 후 사용해야함.

```java
열거타입 변수;
Week today;
```
- 열거타입 변수를 선언했다면 열거 상수를 저장할 수 있음. 열거 상수는 단독으로 사용 할 수는없고 반드시 열거타입.열거상수로 사용

```java
열거타입 변수 = 열거타입.열거상수;
Week today = Week.THURSDAY;

Week birthday = null; // 열거 타입 변수는 null 값을 저장할수 있음.(참조 타입)
```
- 열거 상수는 열거 객체로 생성 되며, 열거 타입 Week 의 경우 MONDAY 부터 SUNDAY 까지 열거 상수는 다음과 같이 총 7개의 Week 객체로 생성됨.
- **메소드 영역**에 생성 된 **열거 상수가 heap 영역에 생성된 Week 객체를 각각 참조**하게 됨.
```java
Week today = Week.THURSDAY;

today == Week.THURSDAY; //true
  --
Week week1 = Week.THURSDAY;
Week week2 = Week.THURSDAY;
week1 == week2 //true (같은 객체의 주소값을 참조하기 때문에 true)
```
- 열거 타입 변수 today 는 스택영역에 생성
- today 에 저장되는 값은 Week.THURSDAY **열거 상수가 참조하는 객체의 번지**(주소를 복사해서 사용), 따라서 열거 상수 Week.THURSDAY 와 today 변수는 서로 같은 Week 객체를 참조 하기때문에 연산결과가 true 임.
```java
        Week today = null; //열거 타입 변수 선언
		
	Calendar cal = Calendar.getInstance();
	int week = cal.get(Calendar.DAY_OF_WEEK); // 일(1) ~ 토(7) 까지 리턴
	
	switch(week) {
	case 1 :
		today = Week.SUNDAY; break; //열거 상수 대입
	case 2 :
		today = Week.MONDAY; break;
	case 3 :
		today = Week.TUESDAY; break;
	case 4 :
		today = Week.WEDNESDAY; break;
	case 5 :
		today = Week.THURSDAY; break;
	case 6 :
		today = Week.FRIDAY; break;
	case 7 :
		today = Week.SATURDAY; break;
```
### 열거 객체의 메소드
리턴타입 / 메소드(매개 변수) : 설명
- String / name() : 열거 객체의 문자열 리턴
- int / ordinal() : 열거 객체의 순번(0부터 시작) 을 리턴
- int / compareTo() : 열거 객체를 비교해서 순번 차이를 리턴
- 열거 타입 / valueOf(String name) : 주어진 문자열의 열거 객체를 리턴
- 열거 배열 / values() : 모든 열거 객체들을 배열로 리턴

> name() 메소드
열거 객체가 가지고있는 문자열을 리턴, 리턴 되는 문자열은 열거 타입을 정의할 때 사용한 상수 이름과 동일
```java
Week today = Week.THURSDAY;
String name = today.name(); 
// today 가 참조하는 열거 객체에서 name() 메소드를 호출하여 문자열을 얻어냄. name() 메소드는 객체 내부의 문자열인 "THURSDAY" 을 리턴하고 name 변수에 저장
```
> ordinal() 메소드
전체 열거 객체 중 몇번째 열거 객체인지 알려줌.(타입을 정의할때 주어진 순번을 말함)
```java
Week today = Week.SUNDAY;
int ordinal = today.ordinal();
```
> compareTo() 메소드
매개값으로 주어진 열거 객체를 기준으로 전후 몇 번째 위치하는 지 비교함. 열거 객체가 매개값의 열거 객체보다 순번이 빠르다면 음수, 순번이 늦으면 양수 리턴
```java
Week day1 = Week.MONDAY;
Week day2 = Week.WEDNESDAY;
int result1 = day1.compareTo(day2); // -2 
int result2 = day2.compareTo(day1); // 2  서로 상대적 위치를 비교하는 코드
```
> valueOf() 메소드
매개값으로 주어지는 문자열과 동일한 문자열을 가지는 열거 객체를 리턴, 외부로 문자열을 입력받아 열거 객체로 변환할때 유용
```java
Week weekDay = Week.valueOf("THURSDAY");
```
> values() 메솓,
모든 열거 객체를 배열로 만들어 리턴
```java
Week[] days = Week.values();
for(Week day : days){
    System.out.println(day);
}
```