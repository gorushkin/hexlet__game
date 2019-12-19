const print = str => console.log(str);

const values = [9, 6, 13, 11, 2, 15, 14, 8, 12, 10, 5, 4, 7, 1, 3];

const generatePlayingField = () => {
  const tableEl = document.createElement('table');

  // print(tableEl);

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

const table = generatePlayingField();
const div = document.querySelector('.gem-puzzle');
div.append(table);

const isNearEmptyBlock = (a, b) => {
  if ((a.x === b.x && Math.abs(a.y - b.y) === 1) || (a.y === b.y && Math.abs(a.x - b.x) === 1))  {
    return true
  } 
  return false;
}

const findCoord = (element) => {
  const x = (element.cellIndex + 1);
  const y = element.closest('tr').rowIndex + 1;
  return {x, y};
}

const handle = (e) => {
  e.preventDefault();
  const currentBlock = e.target;
  const emptyBlock = table.querySelector('.table-active');
  const emptyBlockCoord = findCoord(emptyBlock);
  const currentBlockCoord = findCoord(currentBlock);
  if (isNearEmptyBlock(currentBlockCoord, emptyBlockCoord)) {
    console.log('near');
    emptyBlock.textContent = e.target.textContent;
    currentBlock.textContent = '';
    emptyBlock.classList.remove('table-active');
    currentBlock.classList.add('table-active');
  }
}

table.addEventListener('click', handle);