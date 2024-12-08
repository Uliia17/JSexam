const topForm = document.getElementsByTagName('form')[0];// оголошую змінну за тегом, у мене їх 2 - ставлю індекс 0, щоб вибрати перший елемент у документі
const nameValuePairInput = document.getElementById('NameValuePair');// оголошую змінну за айді та присвоюю їй елемент
const nameValuePairTextArea = document.getElementById('NameValuePairTextArea');// оголошую змінну за айді та присвоюю їй елемент
const sortByNameButton = document.getElementById('sortByName');// оголошую змінну за айді та присвоюю їй елемент
const sortByValueButton = document.getElementById('sortByValue');// оголошую змінну за айді та присвоюю їй елемент
const deleteButton = document.getElementById('delete');// оголошую змінну за айді та присвоюю їй елемент

let pairs = JSON.parse(localStorage.getItem('pairs')) || [];//оголошую змінну, отримую значення з локального сховища, виводжу пару(и) name=value, які перетворені в масив об'єктів, або пустий масив

updateList(pairs);// зберігаю оновлений масив

topForm.onsubmit = function(event) {// призначаю обробник події (коли форма буде відправлена, то виконається ф-ція)
    event.preventDefault();// цей метод допомагає обробляти дані форми без перезавантаження сторінки
    const inputValue = nameValuePairInput.value;//  отримую значення з поля вводу

    let parts = inputValue.split('=');// цим методом розділяю значення на частини за знаком рівно

    if (parts.length === 2) {// перевіряю, що мої значення складаються з 2 частин
        let name = remove(parts[0]);// за допомогою ф-ції видаляю пробіли з 1-ої частини
        let value = remove(parts[1]);// за допомогою ф-ції видаляю пробіли з 2-ої частини
        pairs.push({ name, value });// додаю новий об'єкт до масиву
        updateList(pairs);// оновлюю список
        nameValuePairInput.value = ''; // очищаю поле
    } else {
        alert('name=value');// виводжу повідомлення, якщо невірно вписали значення
    }
};
sortByNameButton.onclick = function() {// призначаю обробник події для кнопки
    pairs.sort((a, b) => {// сортую за ім'ям у алфавітному порядку
        if (a.name < b.name) return -1;// якщо менше, то a повинна бути перед b
        if (a.name > b.name) return 1;// якщо більше, то a повинна бути після b
        return 0;// якщо однакові, то повертає без змін
    });
    updateList(pairs);// оновлюю список
};
sortByValueButton.onclick = function() {// теж саме тільки сортую за значенням від меншого числа до більшого
    pairs.sort((a, b) => {
        if (a.value < b.value) return -1;
        if (a.value > b.value) return 1;
        return 0;
    });
    updateList(pairs);
};
deleteButton.onclick = function() {// призначаю обробник події для кнопки
       const selectedText = nameValuePairTextArea.value.substring(// використовую цей метод для отримання з текстової області текст, який користувач виділив
        nameValuePairTextArea.selectionStart,
        nameValuePairTextArea.selectionEnd
);
    if (selectedText) {// якщо виділений текст існує, виконую наступні дії
            const selectedPairs = selectedText.split('\n').map(line => {// розділяю текст на рядки (стовпцем)та використовую метод для перетворення кожного рядка в об'єкт
            const parts = line.split('=');// розділяю кожен рядок на частини за знаком рівно
            if (parts.length === 2) {//  перевіряю, що мій рядок складаються з 2 частин
                return { name: remove(parts[0]), value: remove(parts[1]) };// повертаю об'єкт, видаляючи зайві пробіли за допомогою функції
            }
        }).filter(pair => pair !== undefined);// видаляю з масиву undefined, якщо рядок не має двох частин

            pairs = pairs.filter(pair => {// використовую метод для створення нового масиву, який не містить виділених пар.
            return !selectedPairs.some(selectedPair =>// перевіряю, чи є ще пари з такими значеннями і видаляю, ті, що інші - залишаються в масиві
                selectedPair.name === pair.name && selectedPair.value === pair.value);
        });

            updateList(pairs);// оновлюю список
    }
};
function updateList(updatedPairs) { // це функція для оновлення списку пар у текстовій області та збереження оновленого масиву у локальному сховищі.
        localStorage.setItem('pairs', JSON.stringify(updatedPairs));// методом localStorage.setItem зберігаю оновлений масив у локальному сховищі
        let textAreaValue = '';// створюю пустий рядок
    for (let i = 0; i < updatedPairs.length; i++) {// цикл, який проходить через всі елементи масиву
        textAreaValue += `${updatedPairs[i].name}=${updatedPairs[i].value}`;// додаю пари до рядка
        if (i < updatedPairs.length - 1) {// новий рядок після додавання, крім останнього
            textAreaValue += '\n';
        }
    }
    nameValuePairTextArea.value = textAreaValue;// значення textAreaValue дорівняють текстовій області

    console.log(updatedPairs);// виводжу оновлений масив у консоль
}
function remove(str) {
    let start = 0;// змінна для початку рядка без пробілів
    let end = str.length - 1;// змінна для кінця рядка без пробілів

    while (start <= end && str[start] === ' ') {// цикл шукає символ, який не є пробілом на початку
        start++;
    }

    while (end >= start && str[end] === ' ') {// цикл шукає символ, який не є пробілом в кінці
        end--;
    }

    return str.slice(start, end + 1);// метод повертає рядок, який не містить пробілів
}









