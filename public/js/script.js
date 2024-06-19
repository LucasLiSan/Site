//SLIDER
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    breakpoints: {
        // Responsividade
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    }
});

//MERGESORT
function mergeSort(arr, compare) {
    if (arr.length < 2) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left, compare), mergeSort(right, compare), compare);
}

function merge(left, right, compare) {
    const result = [];

    while (left.length && right.length) {
        if (compare(left[0], right[0]) <= 0) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left.slice()).concat(right.slice());
}

function compare(a, b, columnIndex, isNumeric) {
    let aValue = a.cells[columnIndex].innerText;
    let bValue = b.cells[columnIndex].innerText;

    if (isNumeric) {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
    }

    if (aValue < bValue) {
        return -1;
    }
    if (aValue > bValue) {
        return 1;
    }
    return 0;
}

function sortTable(columnIndex, isNumeric) {
    const table = document.querySelector('.sortTable tbody');
    const rows = Array.from(table.rows);

    const sortedRows = mergeSort(rows, (a, b) => compare(a, b, columnIndex, isNumeric));

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    sortedRows.forEach(row => table.appendChild(row));
}

document.querySelectorAll('.material-symbols-outlined').forEach((icon, index) => {
    icon.addEventListener('click', () => {
        const isNumeric = index === 2; // Supondo que apenas a terceira coluna (valorEntrada) é numérica
        sortTable(index, isNumeric);
    });
});