/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {
  return jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name === "Sebastian" && student.handedInOnTime) {
    return "VG";
  }
  return "IG";
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class Temp {
  constructor(
    public location: string,
    public currentDate: Date,
    public temperature: number
  ) {}
}

function averageWeeklyTemperature(temps: Temp[]) {
  const aWeekInMilliSec: number = 604800000;
  const aWeekInDays = 7;

  return (
    temps.reduce((previousValue: number, currentValue: Temp) => {
      if (
        currentValue.location === "Stockholm" &&
        currentValue.currentDate.getTime() > Date.now() - aWeekInMilliSec
      ) {
        return previousValue + currentValue.temperature;
      }
      return previousValue;
    }, 0) / aWeekInDays
  );
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

interface Products {
  name: string;
  price: number;
  amount?: number;
  description?: string;
  image: string;
  parent: HTMLElement;
}

function showProduct(products: Products) {
  let container = document.createElement("div");
  let title = createTitle(products.name);
  let price = createPrice(products.price);
  let image = createImg(products.image);

  container.appendChild(title);
  container.appendChild(price);
  container.appendChild(image);
  products.parent.appendChild(container);
}

function createTitle(name: string): HTMLHeadingElement {
  let productHeading = document.createElement("h4") as HTMLHeadingElement;
  productHeading.innerHTML = name;

  return productHeading;
}

function createPrice(price: number) {
  let productPrice = document.createElement("strong") as HTMLElement;
  productPrice.innerHTML = price.toString();

  return productPrice;
}

function createImg(imageSrc: string) {
  let productImg = document.createElement("img") as HTMLImageElement;
  productImg.src = imageSrc;

  return productImg;
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function createStudentHtml(handedInOntime: boolean) {
  let container = document.createElement("div");
  let checkbox = document.createElement("input");
  if (handedInOntime) {
    checkbox.type = "checkbox";
    checkbox.checked = true;
  }
  container.appendChild(checkbox);
  let listOfStudents = document.querySelector("ul#passedstudents");
  listOfStudents?.appendChild(container);
}

function presentStudents(students: Student[]) {
  students.forEach((student) => {
    createStudentHtml(student.handedInOnTime);
  });
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings(): string {
  const loremTexts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return loremTexts.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
interface User {
  name: string;
  birthday: Date;
  email: string;
  password: string;
  address?: string;
  avatar?: string;
}

function createUser(user: User) {
  const minimumAge = 20;
  const unixStart = 1970;

  let ageDiffInMilliSec = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiffInMilliSec);
  let userAge = Math.abs(ageDate.getUTCFullYear() - unixStart);
  if (!(userAge < minimumAge)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
