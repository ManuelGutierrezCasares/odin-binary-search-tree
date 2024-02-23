export function unbalanceTree (tree, amount) {
  while (amount) {
    tree.insert(parseInt(Math.random() * 1000 + 100));
    amount--;
  }
  return tree;
}

export function populateArray (arr, length) {
  for (let i = 0; i < length; i++) {
    let tmp = getRandomInt();
    arr.forEach(e => {
      if (e === tmp) {
        tmp = getRandomInt();
      }
    });
    arr[i] = tmp;
  }
  return arr;
}

function getRandomInt () {
  return parseInt(Math.random() * 100);
}
