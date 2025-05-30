const tableCon = document.getElementById('tableCon');
let mapTable = document.createElement('table');

let direc;

for(let i = 0; i < 32; i++){
    const row = document.createElement('tr');
    for(let j = 0; j < 32; j++){
        const cell = document.createElement('td');
        cell.textContent = '';
        cell.style.color = 'lightgreen';
        cell.style.border = '1px solid black';
        cell.style.height = '20px';
        cell.style.width = '20px';
        cell.style.textAlign = 'center';
        cell.style.padding = '0px';
        cell.style.borderColor = 'white';
        row.appendChild(cell);
    }
    mapTable.appendChild(row);
}

tableCon.appendChild(mapTable);

// карта
const map = [];
for(let i = 0; i < 32; i++){
    const r = [];
    for(let j = 0; j < 32; j++){
        r.push(0);
    }
    map.push(r);    
}

// массив компиляций
const isComp = [];
for(let i = 0; i < 32; i++){
    const ra = [];
    for(let j = 0; j < 32; j++){
        ra.push(1);
    }
    isComp.push(ra);
}
// Создание начальной змейки
map[14][15] = 2;
map[14][14] = 3;

const period = setInterval(() => {
    for(let i = 0; i < 32; i++){ // проходимся по всем элементам массива
        for(let j = 0; j < 32; j++)
        {
            if(map[i][j] === 0){ // пустота
                mapTable.rows[i].cells[j].textContent = '';
            }
            if(map[i][j] === 1){ // тело
                mapTable.rows[i].cells[j].textContent = '#';

                // Перемещение змейки
                if(direc === 0){ // если направление вверх
                    map[i - 1][j] = 1;
                    map[i][j] = 0;
                }
                if(direc === 1){ // если направление направо
                    map[i][j + 1] = 1;
                    map[i][j] = 0;
                }
                if(direc === 2){ // если направление вниз
                    map[i + 1][j] = 1;
                    map[i][j] = 0;
                }
                if(direc === 3){ // если направление влево
                    map[i][j - 1] = 1;
                    map[i][j] = 0;
                }
            }
            if(map[i][j] === 2){ // голова
                mapTable.rows[i].cells[j].textContent = '@';

                // Перемещение змейки
                if(direc === 0 && isComp[i][j] === 1){ // если направление вверх
                    if(i != 0){
                        map[i - 1][j] = 2;
                        isComp[i - 1][j] = 0;
                        map[i][j] = 0;
                    }
                    else{
                        console.log('YOU DIE');
                    }
                }
                if(direc === 1){ // если направление направо
                    if(j != 31){
                        map[i][j + 1] = 2;
                        map[i][j] = 0;
                    }
                    else{
                        console.log('YOU DIE');
                    }
                }
                if(direc === 2){ // если направление вниз
                    if(i != 31){
                        map[i + 1][j] = 2;
                        map[i][j] = 0;
                    }
                    else{
                        console.log('YOU DIE');
                    }
                }
                if(direc === 3){ // если направление влево
                    if(j != 0){
                        map[i][j - 1] = 2;
                        map[i][j] = 0;
                    }
                    else{
                        console.log('YOU DIE');
                    }
                }
            }
            if(map[i][j] === 3){ // хвост
                mapTable.rows[i].cells[j].textContent = '%';

                // Перемещение змейки
                if(direc === 0){ // если направление вверх
                    map[i - 1][j] = 3;
                    map[i][j] = 0;
                }
                if(direc === 1){ // если направление направо
                    map[i][j + 1] = 3;
                    map[i][j] = 0;
                }
                if(direc === 2){ // если направление вниз
                    map[i + 1][j] = 3;
                    map[i][j] = 0;
                }
                if(direc === 3){ // если направление влево
                    map[i][j - 1] = 3;
                    map[i][j] = 0;
                }
            }
            if(map[i][j] === 4){ // яблоки
                mapTable.rows[i].cells[j].textContent = 'Я';
                mapTable.rows[i].cells[j].style.color = 'pink';
            }
        }
    }

    for(let i = 0; i < 32; i++){
        for(let j = 0; j < 32; j++){
            isComp[i][j] = 1;
        }
    }
}, 500);


// =========================== ВАСЯ ==============================

document.addEventListener('keydown', function(event) {
    if (event.key === "w") {
        direc = 0;
        console.log(direc);
    }
    else if (event.key === "d") {
        direc = 1;
        console.log(direc);
    }
    else if (event.key === "s") {
        direc = 2;
        console.log(direc);
    }
    else if (event.key === "a") {
        direc = 3;
        console.log(direc);
    }
});
