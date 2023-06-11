const fileListContent = document.getElementById('file-list-content');

function createFileElement(file, index) {
    const li = document.createElement('li');
    if (file.path.endsWith('/')) { // Check if it's a folder
        li.classList.add('folder');
        li.appendChild(document.createTextNode(file.path));
    } else { // It's a file
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('file-checkbox');
        checkbox.addEventListener('change', toggleSelectAllCheckbox);
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(`0000${index}.zip (${file.size})`));
    }
    fileListContent.appendChild(li);
}

function updateFileList(data) {
    fileListContent.innerHTML = '';

    data.forEach((file, index) => {
        createFileElement(file, index);
    });

    toggleSelectAllCheckbox();

    const folders = Array.from(document.getElementsByClassName('folder'));
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            folder.classList.toggle('open');
        });
    });
}

function selectAllFiles() {
    const checkboxes = document.getElementsByClassName('file-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = selectAllCheckbox.checked;
    }
}

function toggleSelectAllCheckbox() {
    const checkboxes = document.getElementsByClassName('file-checkbox');
    let allChecked = true;
    let anyUnchecked = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            anyUnchecked = true;
            break;
        }
    }

    if (anyUnchecked) {
        selectAllCheckbox.checked = false;
    } else {
        selectAllCheckbox.checked = true;
    }
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        updateFileList(data);
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });

const selectAllCheckbox = document.getElementById('select-all-checkbox');
selectAllCheckbox.addEventListener('change', selectAllFiles);

const menuHeader = document.querySelector('.menu-header');
const sidebar = document.querySelector('.sidebar');

menuHeader.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
